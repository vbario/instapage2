<template>
  <div class="w100p df fdc aic">
    
    <div class="w100p my-account-bar df jcc aic" v-if="imTheOwner() || (mode !== 'link-in-bio')">
      <div class="w100p my-account-bar-inner df jcsb aic">
        <div class="logo df jcc aic">
          <img @click="goTo('/' + displayNameB())"
            class="header-logo curp"
            src="../../../static/images/pushable/pushable-logo-5.png"/>
          <h1 @click="goTo('/' + displayNameB())"
            class="logo-font text-primary-color curp dn480">
            pushable
          </h1>
        </div>

        <div class="nav-bar larger-display-only" v-if="editingMyStore">
          <a class="nav-item"
            :class="{'nav-item-active': mode == 'link-in-bio'}"
            @click="changeToStore">
            My Pushable
          </a>
          <a class="nav-item"
            :class="{'nav-item-active': mode == 'theme'}"
            @click="goTo('/theme')">
            Theme
          </a>
          <a class="nav-item"
            :class="{'nav-item-active': mode == 'orders'}"
            @click="goTo('/orders')">
            Orders
          </a>
        </div>

        <div class="df aic">
          <div class="df" v-if="editingMyStore || (mode !== 'link-in-bio')">        
            <h4 class="button-secondary" @click="viewStore()">View Store</h4>
          </div>
          <h4 v-else class="button-secondary" @click="editStore()">Edit Store</h4>
          <ProfileIconButton
            class="profile-icon-button"
            @viewStore="viewStore"/>
          <CartIcon 
            v-if="ownerId == $store.getters['AUTH.uid']" 
            :relative="true"
            :brandColor="brandColor || ''"
            :useCustomBrandColor="useCustomBrandColor || ''"
            @showCart="showCart" />
        </div>
      </div>
    </div>

    <div class="w100p smaller-display-wrapper">
      <div class="nav-bar smaller-display-only" v-if="editingMyStore">
        <a class="nav-item"
          :class="{'nav-item-active': mode == 'link-in-bio'}"
          @click="changeToStore">
          My Pushable
        </a>
        <a class="nav-item"
          :class="{'nav-item-active': mode == 'theme'}"
          @click="goTo('/theme')">
          Theme
        </a>
        <a class="nav-item"
          :class="{'nav-item-active': mode == 'orders'}"
          @click="goTo('/orders')">
          Orders
        </a>
      </div>
    </div>

    <div v-if="mode == 'link-in-bio'" class="banner w100p df aic jcc"
        id="banner-abc"
        ref="banner-abc"
        :class="{
          'banner-with-my-account-bar': imTheOwner(),
          'editing-store': editingMyStore
        }"
        :style="bannerStyle()">
    </div>
    <!-- :style="banner ? ('background-image: url(' + banner.url + ');background-position: ' + banner.crop.left + 'px ' + banner.crop.top + 'px;') : ''"> -->
      
    <div v-if="mode == 'link-in-bio'" class="df fdc jcc aic profile-header-wrapper">
      <ButtonWithMenu
        v-if="editingMyStore"
        class="general-add-button"
        :links="links"
        @openLinkEditor="openLinkEditor"
        @openTitleEditor="openTitleEditor"
        @openProductEditor="openProductEditor"
        />
      <img v-if="profileImageUrl" @click="goToMyStore()" class="profile-image curp" :src="profileImageUrl.profileImageUrl">
      <img v-else @click="goToMyStore()" class="profile-image curp" src="../../../static/images/user-solid.svg">
      <div v-if="displayName" class="df fdc profile-texts">
        <h3 class="username-display curp" @click="goToMyStore()">
          @{{displayName.displayName}}
        </h3>
        <span class="df jcc aic copy-wrapper"
            :class="{'copied-store-link': showCopied}">
          <p class="username-url">
            pshbl.co/{{displayName.displayName}}
          </p>
          <img
            src="../../../static/brand-icons/copy.svg"
            class="copy-store-link"
            @click="copyStoreLink($event)">
          <p class="copied">copied</p>
          <!-- <i class="fa-regular fa-copy copy-store-link"></i> -->
        </span>
      </div>
    </div>

  </div>
</template>

<script>

import ButtonWithMenu from '@/components/common/ButtonWithMenu'
import ProfileIconButton from '@/components/common/ProfileIconButton'
import CartIcon from '@/components/cart/CartIcon'

import router from '@/router'

export default {
  name: 'BannerStyle2',
  data () {
    return {
      x: 0.5,
      showCopied: false
    }
  },
  props: [
    'mode',
    'displayName',
    'profileImageUrl',
    'banner',
    'ownerId',
    'editingMyStore',
    'openTab',
    'brandColor',
    'useCustomBrandColor',
    'links'
  ],
  components: {
    ButtonWithMenu,
    ProfileIconButton,
    CartIcon
  },
  methods: {
    goToMyStore () {
      this.goTo('/' + this.displayName.displayName)
    },
    copyStoreLink (event) {
      event && event.stopPropagation()
      this.flashCopied()
      let link = 'pshbl.co/' + this.displayName.displayName
      navigator.clipboard.writeText(link)
    },
    flashCopied () {
      this.showCopied = true
      setTimeout(() => {
        this.showCopied = false
      }, 1000)
    },
    displayNameB () {
      let info = this.$store.getters['AUTH.myInfo'].displayName || {}
      info = info.displayName
      console.log('info', info)
      return info || 'me'
    },
    showCart (cartIsOpen) {
      this.$emit('showCart', true)
    },
    bannerStyle () {
      let banner = this.banner
      if (!banner) {return ''}
      let style = 'background-image: url(' + banner.url + ');'
      // return style;
      // let bannerDiv = document.getElementById('banner-abc')
      let crop = banner.crop || {}
      let cropWidth = crop.width
      console.log('banner 1', banner)
      if (!cropWidth) return style

      let bannerDiv = this.$refs['banner-abc']
      console.log('banner 2', bannerDiv)
      if (!bannerDiv) return style

      let finalBannerWidth = bannerDiv.offsetWidth
      let finalBannerHeight = bannerDiv.offsetHeight
      let scaleRatio = finalBannerWidth / cropWidth
      console.log('banner 3', finalBannerWidth, scaleRatio)

      // return banner ? ('background-image: url(' + banner.url + ');background-position: ' + 0 + 'px calc(' + (banner.crop.top/(banner.crop.height/2)) + '%);') : ''
      if (banner && bannerDiv ) {
        let imageWidth = finalBannerWidth * scaleRatio
        // style = style + 'background-size: calc(100vw * ' + scaleRatio + ');'
        // style = style + 'background-size: ' + 'cover' + ';'
        // console.log('background-position:  center;')
        // style = style + 'background-position: calc(50% - ' + crop.width/scaleRatio + 'px) center;'
        // style = style + 'background-position: center -' + crop.top + 'px;'
        return style
      }
      return style
    },
    setTab (openTab) {
      this.$emit('setTab', openTab)
    },
    openLinkEditor () {
      console.log('emitting')
      this.$emit('openLinkEditor', 'new')
    },
    openTitleEditor () {
      this.$emit('openTitleEditor', 'new')
    },
    openProductEditor () {
      this.$emit('openProductEditor', 'new')
    },
    imTheOwner () {
      let myUid = this.$store.getters['AUTH.uid']
      return myUid == this.ownerId
    },
    editStore () {
      this.$emit('editStore')
      let _myUsername = this.$store.getters['AUTH.myInfo'].displayName
      let myUsername = _myUsername.displayName
      this.goTo('/' + myUsername)
    },
    viewStore () {
      this.changeToStore()
      this.$emit('viewStore')
    },
    changeToStore () {
      let _myUsername = this.$store.getters['AUTH.myInfo'].displayName
      let myUsername = _myUsername.displayName
      this.goTo('/' + myUsername)
      this.$emit('viewStore')
    },
    goTo (route) {
      router.push(route)
    }
  },
  computed: {

  },
  created () {
    // window.addEventListener('resize', (event) => {
    //   console.log('resize')
    //   this.x = Math.random()
    //   this.$nextTick()
    // })
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/settings.scss";
  $banner-height-4: 120px;
  $banner-height-3: 140px;
  $banner-height-2: 160px;
  $banner-height-1: 220px;
  $profile-image-size-1: 170px;
  $profile-image-size-2: 140px;
  $profile-image-size-3: 120px;
  $profile-image-size-4: 104px;
  $my-account-bar-height: 53px;

  .my-account-bar {
    position: relative;
    z-index: 35;
    width: 100%;
    height: $my-account-bar-height;
    /*background-color: $color-primary;*/
    background-color: #fff;
    display: flex;
    &-inner {
      max-width: 1200px;
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  @media (min-width: 600px) {
    .my-account-bar {
      &-inner {
        padding-left: 20px;
        padding-right: 20px;
        height: 100%;
      }
    }
  }

  .banner {
    width: 100%;
    height: $banner-height-4;
    left: 0;
    top: 0;
    /*background-color: #44D600;*/
    background: linear-gradient(83deg, #44D600 -47.16%, rgba(68, 214, 0, 0.00) 201.11%);
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    position: absolute;
  }

  .banner-with-my-account-bar {
    top: $my-account-bar-height;
  }

  @media (max-width: 768px) {
    .banner-with-my-account-bar {
      top: calc(#{$my-account-bar-height});

      &.editing-store {
        top: calc(#{$my-account-bar-height} * 2);
      }
    }
  }
  
  .profile-header-wrapper {
    width: 100%;
    max-width: 1200px;
    position: relative;
    z-index: 2;
    margin-top: calc(#{$banner-height-4} - #{$profile-image-size-4}/2);
    padding-left: 15px;
    padding-right: 15px;
    z-index: 33;
  }

  @media (min-width: 600px) {
    .profile-header-wrapper {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  .username-display {
    width: 100%;
    text-align: center;
    color: #000;
  }

  .username-url {
    color: #5C5C5C;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .copy-wrapper {
    position: relative;

    .copied {
      display: none;
      position: absolute;
      left: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
      color: #333;
      font-size: 12px;
      font-weight: 200;
      background-color: #eee;
      border-radius: 8px;
      padding: 4px 8px;
    }
  }

  .copy-store-link {
    position: relative;
    transform: translateY(-0.5px);
    margin-left: 4px;
    cursor: pointer;
  }

  .copied-store-link {
    /*position: relative;*/
    .copied {
      display: block;
      position: absolute;
      /*display: none;*/
    }
  }

  .profile-image {
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    height: $profile-image-size-1;
    width: $profile-image-size-1;
    background-color: #eaeaea;
    z-index: 2;
    /*border: 4px solid $profile-grey;*/
    border: 4px solid #fff;
  }

  .profile-texts {
    z-index: 1;
    margin-top: 8px;
  }

  @media (max-width: 800px) {
    .banner {
      height: $banner-height-3;
    }
    .profile-image {
      width: $profile-image-size-2;
      height: $profile-image-size-2;
    }
    .profile-header-wrapper {
      margin-top: calc(#{$banner-height-3} - #{$profile-image-size-2}/2);
    }
  }

  @media (max-width: 568px) {
    .banner {
      height: $banner-height-3;
    }
    .profile-image {
      width: $profile-image-size-3;
      height: $profile-image-size-3;
    }
    .profile-header-wrapper {
      margin-top: calc(#{$banner-height-3} - #{$profile-image-size-3}/2);
    }
  }

  @media (max-width: 480px) {
    .banner {
      height: $banner-height-4;
    }
    .profile-image {
      width: $profile-image-size-4;
      height: $profile-image-size-4;
    }
    .profile-header-wrapper {
      margin-top: calc(#{$banner-height-4} - #{$profile-image-size-4}/2);
    }
  }

  @media (min-width: 568px) {
    .profile-texts {
    }
    .username-display {
      font-size: 28px;
    }
    .username-url {
      font-size: 15px;
    }
  }

  @media (min-width: 800px) {
    .banner {
      height: $banner-height-2;
    }
    .profile-texts {
    }
    .username-display {
      font-size: 30px;
    }
    .username-url {
      font-size: 16px;
    }
    .profile-header-wrapper {
      margin-top: calc(#{$banner-height-2} - #{$profile-image-size-1}/2);
    }
  }

  @media (min-width: 1200px) {
    .banner {
      height: $banner-height-1;
    }
    .profile-texts {
    }
    .username-display {
      font-size: 32px;
    }
    .username-url {
      font-size: 17px;
    }
    .profile-header-wrapper {
      margin-top: calc(#{$banner-height-1} - #{$profile-image-size-1}/2);
    }
  }

  .button-secondary {
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 18px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $color-primary;
    color: $color-primary;
    text-align: center;
    font-size: 14px;
    line-height: 1em;
    font-style: normal;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
  }

  .header-logo {
    width: 32px;
    max-width: 32px;
    height: 41px;
    max-height: 41px;
    min-height: 41px;
    object-fit: contain;
  }
  .logo-font {
    transform: translateY(-1.5px);
    font-size: 25px;
  }

  .nav-bar {
    background-color: #fff;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }

  .nav-item {
    color: #000;
    height: 100%;
    font-size: 14px;
    font-style: normal;
    font-weight: 00;
    line-height: normal;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .nav-item-active {
    border-bottom: 4px solid $color-primary;
    color: $color-primary;
  }
  .general-add-button {
    position: absolute;
    right: 15px;
  }

  .smaller-display-only {
    display: flex;
  }
  .larger-display-only {
    display: none;
  }

  @media (max-width: 768px) {
    .nav-bar {
      width: calc(100% - 40px);
      height: $my-account-bar-height;
      border-top: 1px solid #d9d9d9;
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  @media (max-width: 600px) {
    .nav-bar {
      width: calc(100% - 30px);
      margin-left: 15px;
      margin-right: 15px;
    }
  }
  @media (min-width: 768px) {
    .smaller-display-only {
      display: none;
    }
    .larger-display-only {
      display: flex;
    }
  }
  @media (min-width: 600px) {
    .general-add-button {
      right: 20px;
    }
  }
  .profile-icon-button {
    margin-left: 8px;
  }
  .smaller-display-wrapper {
    background-color: #fff;
  }
</style>
