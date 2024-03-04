<template>
  <div class="header-wrapper df fdr jcsb aic w100p">

    <!-- 'abc' -->

    <div class="header-inner f1 df aic jcsb w100p">
<!--       <div class="menu-button" v-if="!sidebarShown" @click="showSidebar()">
        <img class="icon2 curp" src="../../static/images/new-icon-menu-button.svg">
      </div> -->
      <!-- <img src="../../static/images/cup-wise-logo.svg" class="header-logo curp" @click="goTo(($route.name == 'LivePage' ? '/me' : '/'), true)"> -->
      <!-- <p class="cupwise curp" @click="goTo('/me')"><span>Pushable</span></p> -->
      <img @click="goTo('/' + displayName())" class="header-logo curp" src="../../static/images/pushable/pushable-logo-5.png"/>
      <h1 @click="goTo('/' + displayName())" class="logo-font text-primary-color curp dn480">pushable</h1>
      <div class="f1"></div>
      <div class="df aic actions" v-if="mode == 'linkinbio'">
        <a class="copy-link p2 profile-image-s2" @click="goTo('/' + displayName())">see it live</a>
        <a class="copy-link p2 profile-image-s2" @click="copyLink($event, rootDomain + '/' + displayName())">copy link</a>
      </div>

      <div class="only-small">
        <h2 class="text-dark header-style">{{fullName(mode)}}</h2>
      </div>
      <!-- <div v-if="showUserMenu" class="name-plus-initial posrel df"> -->
        <!-- <div class="initial curp">{{initial(this.$store.getters['AUTH.myPublicData'].displayName || ' ')}}</div> -->
        <!-- <p class="name curp">{{this.$store.getters['AUTH.myPublicData'].displayName || 'Settings'}}</p> -->
        

        <!-- <div class="initial curp">Settings</div>
        <img class="chevron-down chevron-up curp" src="../../static/images/new-icon-chevron-down-small.svg"></img> -->


        <!-- <div class="user-menu" v-click-outside:delay="closeUserMenu">
          <span class="df curp menu-option" @click="goTo('/settings')">
            <div class="icon icon-profile"></div>
            <p>Your Profile</p>
          </span>
          <hr class="hr1"/>
          <span class="df curp menu-option" @click="logout()">
            <div class="icon icon-logout"></div>
            <p>Logout</p>
          </span>
        </div> -->
      </div>
      <!-- <div v-else class="name-plus-initial posrel df">
        <p @click="registerAndGoBack()" v-if="$store.getters['AUTH.anonUser']" class="name curp name-small df fdc">
          <span>Sign in</span>
          <span>to save</span>
        </p>
        <p @click="registerAndGoBack()" v-if="$store.getters['AUTH.anonUser']" class="name curp name-big">
          <span>Sign in</span>
          <span>to save scores</span>
        </p>

      </div> -->

        <!-- <div class="initial curp" @click="openUserMenu()">Settings</div>
        <img v-if="!$store.getters['AUTH.anonUser']" class="chevron-down curp" @click="openUserMenu()" src="../../static/images/new-icon-chevron-down-small.svg"/> -->
        

        <!-- <p v-else-if="$store.getters['AUTH.myPublicData'].displayName" class="name curp" @click="openUserMenu()">{{$store.getters['AUTH.myPublicData'].displayName}}</p> -->
        <!-- <p v-else class="name curp" @click="openUserMenu()">{{'Settings'}}</p>       -->


      <!-- </a> -->
      <!-- abc -->
    </div>
  </div>
</template>

      <!-- <div class="f1 df jcfe aic bar-links"> -->
        <!-- <i @click="goTo('/sessions')" class="icon far fa-calendar-star"></i> -->
        <!-- <i @click="goTo('/templates')" class="icon far fa-tasks"></i> -->
        <!-- <i @click="goTo('/coffees')" class="icon far fa-coffee-pot"></i> -->
        <!-- <i @click="goTo('/settings')" class="icon far fa-cogs"></i> -->
        <!-- <i class="icon-coffee icon curp" @click="showCuppingSettings()"></i> -->
        <!-- <p class="logout" @click="logout()">Logout</p> -->
        <!-- <i class="icon-gear icon" @click="showSessionSettings()"></i> -->
      <!-- </div> -->

<script>
import router from '@/router'
import ShopProduct from '@/components/ShopProduct'
import ClickOutside from 'vue-click-outside'
import paths from '@/util/paths'

export default {
  name: 'DashHeader',
  data () {
    return {
      rootDomain: process.env.NODE_ENV == '' ? paths.devPath : paths.productionShortPath,
      clicked: 0,
      some: 'data',
      showUserMenu: false
    }
  },
  props: ['mode', 'setSidebarShown', 'sidebarShown'],
  components: {
    ShopProduct
  },
  methods: {
    displayName () {
      let info = this.$store.getters['AUTH.myInfo'].displayName || {}
      info = info.displayName
      console.log('info', info)
      return info || 'me'
    },
    fullName (mode) {
      if (mode == 'dashboard') {
        return 'dashboard'
      } else if (mode == 'fulfillment') {
        return 'Fulfill Orders'
      } else if (mode == 'products') {
        return 'My Products & Services'
      } else if (mode == 'linkinbio') {
        return 'my page'
      } else if (mode == 'add-product') {
        if (this.$route.params.id) {
          return 'edit product'
        }
        return 'add a product'
      }
      return mode
    },
    registerAndGoBack () {
      if (this.$route.params.liveSessionId) {
        router.push('/?auth=register&then=' + this.$route.params.liveSessionId)
      } else {
        router.push('/?auth=register')
      }
    },
    initial (text) {
      return text.substring(0,2).toUpperCase()
    },
    logout () {
      this.showUserMenu = false
      this.$store.dispatch('AUTH.logout', {})
    },
    openUserMenu (overrideClose) {
      console.log('open')
      let now = (new Date()).getTime()
      if ((now - this.clicked) > 400) {
        this.clicked = now
        setTimeout(() => {
          console.log('opened')
          this.showUserMenu = true
        }, 100)
      }
    },
    closeUserMenu () {
      console.log('close')
      let now = (new Date()).getTime()
      this.clicked = now
      this.showUserMenu = false
    },
    showSidebar () {
      setTimeout(() => {
        this.setSidebarShown(true)
      }, 100)
      console.log('here')
    },
    logout () {
      this.$store.dispatch('AUTH.logout', {})
    },
    showCuppingSettings () {
      this.$store.dispatch('AUTH.showCuppingSettings', true)
    },
    hide () {
      this.$store.dispatch('AUTH.showHeaderShop', false)
    },
    copyLink (e, link) {
      e.stopPropagation()
      navigator.clipboard.writeText(link);
      // this.flashCopied()
      // console.log('a', link)
      // console.log('b', link)
      // console.log('c', link)
    },
    goTo (path, showSidebar) {
      this.$store.dispatch('AUTH.showHeaderShop', false)
      this.showUserMenu = false
      window.scroll(0,0)
      router.push(path)
      if (showSidebar) {
        this.showSidebar()
      }
    },
    showShop (event) {
      event.stopPropagation()
      this.$store.dispatch('AUTH.showHeaderShop', !this.$store.getters['AUTH.showHeaderShop'])
    },
    goToPrevious () {
      router.push('/previous')
    },
    goToLive () {
      router.push('/live')
    },
    goToAccount () {
      let uid = this.$store.getters['AUTH.uid']
      if (uid) {
        router.push('/myaccount')
      } else {
        router.push('/login')
      }
    }
  },
  computed: {

  },
  watch: {
  },
  mounted () {
  },
  directives: {
    ClickOutside
  },
  mounted () {
    console.log('...route', this.$route.params.id)
    // this.displayName = this.$route.params.id
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  body {
    padding: 50px; 
  }
  .spinbox {
    width: 100px;
    height: 100px;
    /*background-color: #0CB1C4;*/
    animation-name: spin;
    animation-duration: 5000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
    /* transform: rotate(3deg); */
     /* transform: rotate(0.3rad);/ */
     /* transform: rotate(3grad); */ 
     /* transform: rotate(.03turn);  */
  }

  @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
  }

  h1, h2, h3, h4, h5, h6, h7, h8 {
    font-weight: 600,
  }
  $header-height: 60px;
  .header-wrapper {
    height: $header-height;
    z-index: 111;
    position: relative;
    top: 0;
    left: 0;
    background-color: #FAFAFA;
  }
  .header-inner {
    padding-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
    height: 100%;
  }
  .bar-links {
    font-size: 14px;
  }
  .shop-dropdown {
    position: absolute;
    top: 145px;
    left: 0;
    width: 100%;
    height: 355px;
    background-color: #1E1F20;
  }
  .shop-dropdown-wrapper {
    max-width: $max-width;
  }
  .red-dot {
    display: inline-block;
    min-height: 15px;
    min-width: 15px;
    border-radius: 6px;
    background-color: red;
    margin-right: 8px;
    padding: 5px;
    font-weight: 600;
  }
  .powered-by {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .taste-together {
    font-size: 14px;
  }
  .inverted-colors {
  }
  .cupwise {
    color: #000000;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0;
    line-height: 20px;
    /*margin-left: 6px;*/

    span {
      font-weight: 800;
    }
  }

  .icon-gear, .icon-coffee {
    font-size: 22px;
    opacity: 0.75;
  }
  .logout {
    cursor: pointer;
    font-size: 12px;
    margin-left: 20px;
  }
  @media (max-width: 1200px) {
    .header-wrapper-live {
      height: 60px;
    }
  }
  @media (max-width: 420px) {
    .header-wrapper {
      padding-left: 0;
      padding-right: 0;
      .header-inner {
        border-radius: 0;
      }
    }
  }
  .icon2 {
    margin-right: 28px;
    cursor: pointer;
  }
  .fa-bars {
    font-size: 25px;
    margin-right: 10px !important;
    cursor: pointer;
  }
  .fa-cogs {
    font-size: 18px;
    cursor: pointer;
  }
  .header-logo {
    width: 32px;
    height: 41px;
    max-height: 41px;
    min-height: 41px;
    object-fit: contain;
    margin-right: 7px;
  }
  .logo-font {
    transform: translateY(-2px);
    font-size: 25px;
  }
  .user-menu {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    padding: 17px 15px 19px;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(164,164,164,0.5);
    background-color: #fff;
    min-width: 148px;

    & > span {
      display: flex;
      align-items: center;
      img {
        margin-right: 11px;
      }
      p {
        color: #5C5C5C;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0;
        line-height: 16px;
      }
    }
  }
  .hr1 {
    background-color: #979797;
    margin-top: 17px;
    margin-bottom: 11x;
  }

  .icon {
    width: 18px;
    height: 20px;
    margin-right: 11px;
    background-position: center !important;
    background-repeat: no-repeat !important;
    &:before {
      display: none;
    }
  }
  
  .icon-profile {
    background: url('../../static/images/icon-new-profile.svg');
  }
  .icon-logout {
    background: url('../../static/images/icon-new-logout.svg');
  }
  .icon-settings {
    background: url('../../static/images/icon-new-settings.svg');
  }
  .menu-option {
    &:hover {
      p {
        color: $color-primary;
      }
      .icon-profile {
        background: url('../../static/images/icon-new-profile-active.svg');
      }
      .icon-logout {
        background: url('../../static/images/icon-new-logout-active.svg');
      }
      .icon-settings {
        background: url('../../static/images/icon-new-settings-active.svg');
      }
    }
  }
  .chevron-up {
    transform: rotate(180deg);
  }
  .name-plus-initial {
    min-width: 181px;
    justify-content: flex-end;
  }

  .initial {
    color: #000;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 16px;
    margin-right: 9px;
  }

  .name-big {
    span {
      &:last-child {
        /*font-size: 12px;*/
        font-weight: 400;
      }
    }
  }

  .name-small {
    display: none;
    text-align: center;
    span {
      &:last-child {
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
  @media (max-width: 435px) {
    .icon2 {
      margin-right: 14px;
    }
    .name {
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name-plus-initial {
      min-width: unset;
    }
    .name-big {
      display: none;
    }
    .name-small {
      display: flex;
    }
  }

  @media (max-width: 390px) {
    .icon2 {
      margin-right: 14px;
    }
    .name {
      max-width: 60px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .chevron-down {
    /*margin-left: 4px;*/
  }

  @media (min-width: 980px) {
    .menu-button {
      display: none;
    }
    .header-wrapper {
      display: none;
    }
  }
  @media (max-width: 480px) {
    .dn480 {
      display: none;
    }
  }

  .copy-link {
    color: $color-primary;
    border: 1px solid $color-primary;
    padding: 2px;
    border-radius: 5px;
    font-size: 12px;
    margin-left: 10px;

    &:hover {
      background-color: $color-primary;
      color: $color-white;
    }
  }
  .p2 {
    padding-left: 5px;
    padding-right: 5px;
  }
  .actions {
    margin-right: 16px;
  }
</style>
