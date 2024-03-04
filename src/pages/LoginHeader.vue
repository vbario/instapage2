<template>
  <div class="header-wrapper df fdr jcc aic w100p">

    <div class="box-shadow-box" id="box-shadow-box" style="opacity: 0;"></div>

    <div class="header-inner f1 df aic w100p">
      <div class="df aic jcc curp">
        <div class="header-logo" @click="goTo('/')">i</div>
        <h1 v-if="mode == 'editor'" class="logo-font text-primary-color df" @click="goTo('/' + pageId)">
          instapage.me/{{pageId}}
          <a class="copy-url">
            <img
            src="../../static/brand-icons/copy.svg"
            class="copy-store-link"
            @click="copyStoreLink($event)">
          </a>
          <span class="df aic copy-wrapper"
              :class="{'copied-store-link': showCopied}">
            <p class="copied">copied</p>
          </span>
        </h1>
        <h1 v-else class="logo-font text-primary-color site-name" @click="goTo('/')">
          instapage.me
        </h1>
      </div>
      <div v-if="($route.name !== 'EditorPage')" class="res-2"></div> 
      <div v-if="($route.name == 'EditorPage')" class="f1 posrel df jcfe">
        <!-- <div class="f1 header-links" v-if="($route.name !== 'PlansPage')" ></div> -->
        <div class="df jcc aic">
          <p class="login-button curp text-dark" @click="savePage()">save</p>
          <!-- <button class="button-1" @click="savePage()">save</button> -->
          <button v-if="pagePublic" class="button-1" @click="unpublishPage()">unpublish</button>
          <button v-else class="button-1" @click="publishPage()">publish</button>
        </div>
      </div>
      <div v-else class="f1 name-plus-initial posrel df">
        <!-- <div class="f1 header-links" v-if="($route.name !== 'PlansPage')" ></div> -->
        <div class="header-actions df jcc aic">
          <button v-if="$store.getters['AUTH.email']" class="button-1" @click="goToEditor()">new page</button>
          <button v-else class="button-1" @click="goToEditor()">get started</button>

          <p v-if="!$store.getters['AUTH.email']" class="login-button curp text-dark" @click="goTo('/start?mode=login')">login</p>
        </div>
      </div>
      <div class="menu posrel menu-responsive" v-if="($route.name !== 'EditorPage') && !$store.getters['AUTH.email']">
        <img class="menu-button" src="../../static/instapage/menu.svg" @click="openUserMenu">
        <div v-if="showUserMenu" class="open-menu df fdc dn" v-click-outside:delay="closeUserMenu">
          <button class="button-1" @click="goToEditor()">{{$store.getters['AUTH.email'] ? 'new page' : 'get started'}}</button>
          <p v-if="!$store.getters['AUTH.email']" class="already-have w100p df jcc aic">
            <!-- Already have an account? -->
            <a class="w100p tac" @click="goTo('/start?mode=login')">login</a>
          </p>
        </div>
      </div>
      <div v-if="$store.getters['AUTH.email']" class="df jcc aic curp menu-2 posrel">
        <div class="df jcc aic" @click="openUserMenu2">
          <span class="user-icon">
            <p>
              {{$store.getters['AUTH.email'].substring(0, 2)}}
            </p>
          </span>
          <img class="menu-chevron-down" src="../../static/instapage/chevron-down-black.svg">
        </div>
        <div v-if="showUserMenu2" class="open-menu df fdc" v-click-outside:delay="closeUserMenu2">
          <a class="bold">My Pages</a>
          <div class="my-pages df fdc">
            <p class="no-pages" v-if="!$store.getters['AUTH.myPages']">No pages yet</p>
            <span class="w100p df jcsb"
                v-for="(key, index) in Object.keys($store.getters['AUTH.myPages'])">
              <a
                class="page-short"
                @click="goToPage(key)">
                {{index}}. {{$store.getters['AUTH.myPages'][key].title || 'Untitled'}}
              </a>
              <a @click="goToPageEditor(key)">edit</a>
            </span>
          </div>
          <hr/>
          <!-- <a>Features</a> -->
          <!-- <hr/> -->
          <a @click="logout()">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import router from '@/router'
import ShopProduct from '@/components/ShopProduct'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'LoginHeader',
  data () {
    return {
      showCopied: false,
      pageId: '',
      clicked: 0,
      clicked2: 0,
      some: 'data',
      showUserMenu: false,
      showUserMenu2: false
    }
  },
  props: ['mode', 'setSidebarShown', 'sidebarShown', 'pagePublic'],
  components: {
    ShopProduct
  },
  methods: {
    goToPage (pageId) {
      this.goTo('/' + pageId)
      this.$emit('refreshPage')
    },
    goToPageEditor (pageId) {
      this.goTo('/' + pageId + '/edit')
      this.$emit('refreshPage')
    },
    goToEditor () {
      this.$store.dispatch('AUTH.getNewPageId', {}).then((res) => {
        this.$emit('clearPage')
        let pageId = res.data.pageId
        let pageCode = res.data.pageCode
        this.goTo('/' + pageId + '/' + pageCode)
      })
    },
    savePage () {
      this.$emit('savePage')
    },
    publishPage () {
      this.$emit('publishPage')
    },
    unpublishPage () {
      this.$emit('unpublishPage')
    },
    copyStoreLink (event) {
      event && event.stopPropagation()
      this.flashCopied()
      let link = 'instapage.me/' + this.pageId
      navigator.clipboard.writeText(link)
    },
    flashCopied () {
      this.showCopied = true
      setTimeout(() => {
        this.showCopied = false
      }, 1000)
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
    openUserMenu2 (overrideClose) {
      console.log('open')
      let now = (new Date()).getTime()
      if ((now - this.clicked2) > 400) {
        this.clicked2 = now
        setTimeout(() => {
          console.log('opened')
          this.showUserMenu2 = true
        }, 100)
      }
    },
    closeUserMenu () {
      console.log('close')
      let now = (new Date()).getTime()
      this.clicked = now
      this.showUserMenu = false
    },
    closeUserMenu2 () {
      console.log('close')
      let now = (new Date()).getTime()
      this.clicked2 = now
      this.showUserMenu2 = false
    },
    showSidebar () {
      setTimeout(() => {
        this.setSidebarShown(true)
      }, 100)
      console.log('here')
    },
    showCuppingSettings () {
      this.$store.dispatch('AUTH.showCuppingSettings', true)
    },
    hide () {
      this.$store.dispatch('AUTH.showHeaderShop', false)
    },
    goTo (path, showSidebar) {
      // this.$store.dispatch('AUTH.showHeaderShop', false)
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
    },
    scrollAction () {
      let headerWrapper = document.getElementById('box-shadow-box')
      let maxScroll = 50

      let scrolling = () => {
        let y = parseFloat(document.documentElement.scrollTop || document.body.scrollTop)
        headerWrapper.style.opacity = Math.min(y / maxScroll, 1)
      }

      if (!headerWrapper) {
        setTimeout(() => {
          this.scrollAction()
        }, 100)
      } else {
        window.addEventListener('scroll', scrolling)
        window.addEventListener('wheel', scrolling)
        document.body.addEventListener('touchmove', scrolling)
        // document.body.onscroll(scrolling)
        scrolling()
      }
    }
  },
  computed: {

  },
  watch: {
    '$route.params.pageid': {
      handler: function (pageid) {
        this.pageId = pageid
      },
      immediate: true
    },
  },
  mounted () {
  },
  directives: {
    ClickOutside
  },
  created () {
    this.scrollAction()
    console.log('LoginHeader, route:', this.$route)
    let pageId = this.$route.params.pageid
    this.pageId = pageId
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";
  h1, h2, h3, h4, h5, h6, h7, h8 {
    font-weight: 600;
  }
  .copy-url {
    color: #000;
    font-size: 14px;
  }
  $header-height: 80px;
  ._b1 {
    margin-bottom: 10px;
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

    @media (max-width: 480px) {
      span {
        display: none;
      }
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
  .header-inner {
    /*justify-content: space-between;*/
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
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 41px;
    min-width: 41px;
    max-width: 41px;
    height: 41px;
    max-height: 41px;
    min-height: 41px;
    object-fit: contain;
    margin-right: 10px;
    border-radius: 50%;
    background-color: #000;
    color: #fff;
    font-family: Avenir;
    font-size: 45px;
    line-height: 1em;
    font-weight: 600;
    padding-top: 1px;
    padding-right: 5px;
  }
  .logo-font {
    /*transform: translateY(-2px);*/
    font-size: 25px;
    line-height: 1em;
  }

  @media (max-width: 400px) {
    .logo-font {
      display: none;
    }
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
    height: 1px;
    border: none;
    background-color: #979797;
    margin-top: 17px;
    margin-bottom: 15px;
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





  .pushable-logo {
    height: 40px;
    width: 40px;
    border-radius: 15px;
    background-color: $color-primary;
    /*background-color: #0742ff;*/
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-right: 10px;

    p {
      text-align: center;
      font-weight: 700;
      position: absolute;
      bottom: -5px;
      left: 50%;
      font-size: 37px;
      line-height: 37px;
      color: #FFF;
      transform: translateX(-11px);
        /*-webkit-text-stroke-width: 1px;*/
      /*-webkit-text-stroke-color: black;*/
    }
  }

  .login-button {
    font-size: 16px;
    font-weight: 500;
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    align-items: center;
  }

  .user-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 3px solid #b0b0b0;

    p {
      font-size: 18px;
      font-weight: 400;
      line-height: 1em;
      text-transform: uppercase;
    }

    & > img {
      width: 18px;
    }
  }

  .box-shadow-box-override {
    opacity: 1 !important;
  }

  .box-shadow-box {
    background-color: $color-white;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    box-shadow: 0 -5px 10px 3px rgba(164,164,164,0.7);
  }

  .copy-wrapper {
    position: relative;

    .copied {
      display: none;
      position: fixed;
      left: 50%;
      top: 40px;
      transform: translateY(-50%);
      color: #333;
      font-size: 12px;
      font-weight: 200;
      background-color: #eee;
      border-radius: 8px;
      padding: 4px 12px;
    }
  }

  .copy-store-link {
    position: relative;
    /*transform: translateY(-0.5px);*/
    margin-left: 4px;
    cursor: pointer;
    width: 18px;
  }

  .copied-store-link {
    /*position: relative;*/
    .copied {
      display: block;
      /*display: none;*/
    }
  }

  .menu {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 18px;
  }

  .menu-2 {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-button {
    height: 36px;
    cursor: pointer;
  }

  .open-menu {
    width: calc(100vw - 60px);
    max-width: 260px;
    position: absolute;
    right: 0;
    top: 0;
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    border: 1px solid #ddd;

    a {
      font-size: 15px;
      color: #000;
    }

    hr {
      width: 100%;
      height: 1px;
      background-color: #ddd;
      border: none;
    }
  }

  .menu-responsive {
    display: none;
  }

  .res-2 {
    display: none;
    flex: 1;
  }

  @media (max-width: 800px) {
    .header-inner {
      justify-content: space-between;
    }
    .header-actions {
      /*display: none;*/
    }
    .menu-responsive {
      display: block;
    }
    .res-1 {
      display: none;
    }
    .res-2 {
      display: flex;
    }
  }

  .user-icon {
    display: block;
    width: 42px;
    height: 42px;
    min-width: 42px;
    min-height: 42px;
    border-radius: 50%;
    background-color: #ddd;
    border: 2px solid #aaa;
    margin-left: 22px;

    display: flex;
    justify-content: center;
    align-items: center;

    p {
      text-align: center;
      color: #000;
    }
  }

  .menu-chevron-down {
    margin-left: 2px;
  }

  .no-pages {
    color: #000;
    font-size: 12px;
    margin-top: 6px;
  }
  .already-have {
    color: #000;
    font-size: 12px;
    margin-top: 21px;
    line-height: 1em;
  }
  .page-short {
  }

  .my-pages {
    min-height: 50%;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }
  @media (max-width: 525px) {
    .site-name {
      display: none;
    }
  }
  .dn {
    display: none !important;
  }

</style>
