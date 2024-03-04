<template>
  <div class="sidebar-wrapper w100p" v-bind:class="{
    'show-sidebar': sidebarShown
  }" v-click-outside="closeSidebarIfNeeded">

    <div class="inside-wrap df fdc aic jcsb f1 w100p">

      <!-- Sidebar Top -->
      <a class="sidebar-top df">
        <div class="df jcc aic" @click="goTo('/me')">
          <img class="header-logo" src="../../static/images/pushable/pushable-logo-5.png"/>
          <h1 class="logo-font text-primary-color">pushable</h1>
        </div>
      </a>

<!--       <div class="sidebar-slideout" @click="showSidebar()">
        <p>
          >
        </p>
      </div> -->

      <!-- Sidebar Middle -->
      <div class="sidebar-middle f1 w100p">

<!--         <div class="sidebar-title-wrapper w100p">
          <h3>
            {{$store.getters['AUTH.myInfo'] ? $store.getters['AUTH.myInfo'].displayName.displayName : ''}}
          </h3>
          <p>
            What Am I Selling?
          </p>
        </div> -->

        <div class="sidebar-link" @click="goTo('/me')">
          <div class="sidebar-icon-image-wrapper">
            <i class="sidebar-icon fa-solid fa-house"></i>
          </div>
          <h4>Home</h4>
        </div>
        <div class="sidebar-link" @click="goTo('/products')">
          <div class="sidebar-icon-image-wrapper">
            <i class="fa-solid fa-boxes-stacked"></i>
          </div>
          <h4>My Products & Services</h4>
        </div>
        <!-- <i class="icon fa-light fa-barcode"></i> -->
        <!-- <div class="sidebar-link" @click="goTo('/colletions')">
          <div class="icon icon-plus"></div>
          <h4>Collections</h4>
        </div> -->
        <!-- <div class="sidebar-link" @click="goTo('/income')">
          <div class="icon icon-dollar"></div>
          <h4>Income</h4>
        </div> -->
        <div class="sidebar-link fulfill-link"
              @click="goTo('/fulfillment')">
          <div class="sidebar-icon-image-wrapper">
            <i class="fa-solid fa-clipboard-check"></i>
          </div>
          <h4 class="f1">Fulfill Orders</h4>
          <p class="fulfillment-remaining" v-if="$store.getters['AUTH.displayData'] && $store.getters['AUTH.displayData'].fulfillments">{{$store.getters['AUTH.displayData'].fulfillments}}</p>
        </div>
        <div class="sidebar-link"
              @click="goTo('/linkinbio')">
          <div class="sidebar-icon-image-wrapper">
            <i class="fa-solid fa-grid"></i>
          </div>
          <div class="w100p df fdc">
            <h4 class="f1">My Page</h4>
            <!-- <p class="text-dark sub-text">
              For Instagram, TikTok & more
            </p> -->
          </div>
        </div>
        <div class="sidebar-link" @click="goTo('/more')">
          <div class="sidebar-icon-image-wrapper">
            <i class="fa-solid fa-circle-plus"></i>
          </div>
          <h4>More</h4>
        </div>
  <!--       <div class="sidebar-link sidebar-link-expandable"
              v-bind:class="{
                'sidebar-link-active': showFulfilment
              }"
              @click="goTo('/fulfillment')">
          <p class="icon">I</p>
          <h4 class="f1">Fulfillment</h4>
          <p>></p>
        </div> -->
  <!--       <div class="fulfilment-items df fdc" v-if="showFulfilment">
          <div class="sidebar-link">
            <p class="icon">-</p>
            <h4>My Services</h4>
          </div>
          <div class="sidebar-link">
            <p class="icon">-</p>
            <h4>My Appointments</h4>
          </div>
        </div> -->
  <!--       <div class="sidebar-link" @click="goTo('/appointments')">
          <p class="icon">I</p>
          <h4>Appointments</h4>
        </div> -->
 <!--        <br/>
        <div class="sidebar-title-wrapper w100p">
          <h3>
            My Products
          </h3>
          <p>
            What Am I Selling?
          </p>
        </div> -->
<!--         <div class="my-products df fdc w100p">
          <div class="my-product posrel"
                @click="goToProduct(product)"
                v-for="(product, i) in $store.getters['AUTH.myProductsList']">
            <p class="curp one-product">
              <i v-if="product.type == 'digital-service'" class="icon-bell icon icon-product"></i>
              <i v-else-if="product.type == 'digital-download'" class="icon-download icon icon-product"></i>
              <i v-else-if="product.type == 'calendar-event'" class="icon-calendar icon icon-product"></i>
              <span>
                {{product.name}}
              </span>
            </p>
          </div>
        </div> -->
        <br/>
     <!--    <div class="sidebar-link posrel" @click="toggleAddProductsPopup($event)">
          <i class="icon fal fa-plus"></i>
          <h4>Add Product</h4>
          <div class="add-popup" v-if="showAddProductPopup" v-click-outside="closeAddProductsPopup">
            <div class="df fdc">
              <a @click="newProduct('digital-download')">Sell A Digital Download</a>
              <a @click="newProduct('digital-service')">Sell A Digital Service</a>
              <a @click="newProduct('calendar-event')">Sell A Calendar Appointment</a>
            </div>
          </div>
        </div> -->
      </div>

      <!-- Sidebar Bottom -->
<!--       <div class="sidebar-bottom w100p">
        <div class="sidebar-link" @click="goTo('/settings')">
          <i class="icon fal fa-cog"></i>
          <h4>Settings</h4>
        </div>
      </div> -->
      <hr class="hr"/>
      <div class="sidebar-bottom w100p">
        <div class="sidebar-link collapse-link"  @click="goTo('/settings')">
          <div class="sidebar-icon-image-wrapper">
            <i class="fa-solid fa-gears"></i>
          </div>
          <h4>Settings</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import router from '../router'
import LandingProduct from '@/components/LandingProduct'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'Sidebar',
  data () {
    return {
      loading: false,
      // sidebarShown: true,
      // showFulfilment: true,
      showAddProductPopup: false,
      mediaQueryWidth: 760
    }
  },
  props: ['setSidebarShown', 'sidebarShown'],
  components: {
    LandingProduct
  },
  methods: {
    goToProduct (product) {
      let path = '/add/' + product.type + '/' + product.internalId
      router.push(path)
    },
    goTo (route) {
      this.closeSidebarIfNeeded()
      window.scroll(0,0)
      router.push(route)
    },
    showSidebar () {
      this.sidebarShown = true
    },
    closeSidebarIfNeeded () {
      console.log('closeSidebarIfNeeded')
      // let width = window.innerWidth
      // if (width < this.mediaQueryWidth) {
      this.closeSidebar()
      // }
    },
    closeSidebar () {
      this.setSidebarShown(false)
    },
    closeAddProductsPopup () {
      if (this.showAddProductPopup) {
        this.showAddProductPopup = false
      }
    },
    closeFulfilment () {
      if (this.showFulfilment) {
        this.showFulfilment = false
      }
    },
    expandFulfilment (e) {
      e.stopPropagation()
      this.showFulfilment = !this.showFulfilment
    },
    toggleAddProductsPopup (e) {
      e.stopPropagation()
      this.showAddProductPopup = !this.showAddProductPopup
    },
    newProduct (product) {
      this.goTo('/add/' + product)
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Landing page created')
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";
  h3 {
    font-size: 14px;
    color: $color-primary;
    letter-spacing: 0.40px;
    font-weight: 700;
    
    & + p {
      margin-top: 5px;
      color: #323232;
      font-size: 11px;
      margin-bottom: 0;
      text-transform: capitalize;
      line-height: 1;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  $sidebar-width: 250px;
  .sidebar-wrapper {
    background-color: $color-white;
    left: calc(-1 * #{$sidebar-width});
    top: 0;
    height: 100vh;
    /*width: $sidebar-width;*/
    max-width: $sidebar-width;
    min-width: $sidebar-width;
    z-index: 100;
    transition: all 0.5s ease;
    -webkit-box-shadow: 0 0 21px 0 rgba(89, 102, 122, .1);
    box-shadow: 0 0 21px 0 rgba(89, 102, 122, .1);
    transform: translateX(-100%);
    margin-right: calc(-1 * #{$sidebar-width});
    height: 100%;
    position: absolute;
  }
  @media (max-width: 979px) {
    .sidebar-wrapper {
      /*position: relative;*/
      display: none;
    }
  }
  $slideout-width: 40px;
  .slide-out-temp {
    width: $slideout-width;
    text-align: center;
  }
  .sidebar-slideout {
    position: absolute;
    top: 15px;
    background-color: $color-white;
    height: 40px;
    width: $slideout-width;
    /*border-top-right-radius: 10px;*/
    /*border-bottom-right-radius: 10px;*/
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    left: calc(#{$sidebar-width} - #{$slideout-width} + 15px);
    opacity: 1;
    pointer-events: all;
    cursor: pointer;
    transition: all 0.5s ease;
    z-index: 5;
    transform: translateX(100%);
  }
  .show-sidebar {
    left: 0;
    /*overflow-y: auto;*/
    transform: translateX(0);
    margin-right: 0;
    .sidebar-slideout {
      left: calc(#{$sidebar-width} - #{$slideout-width} - #{$slideout-width} - #{$slideout-width} - #{$slideout-width} - 15px);
      /*opacity: 0;*/
      pointer-events: none;
    }
    .inside-wrap {
      overflow-y: auto;
    }
  }
  @media (max-width: 979px) {
    .sidebar-wrapper {
      position: fixed;
      transform: translateX(0);
      margin-right: 0;
    }
    .sidebar-slideout {
      left: 100%;
      left: calc(#{$sidebar-width} - #{$slideout-width} + 15px);
    }
    .show-sidebar {
      transform: translateX(0);
      margin-right: 0;
      .sidebar-slideout {
        left: calc(#{$sidebar-width} - #{$slideout-width} - #{$slideout-width} - 15px);
        /*opacity: 0;*/
        pointer-events: none;
      }
    }
  }
  .sidebar-top {
    width: 100%;
    z-index: 10;
    padding-left: 16px;
    padding-right: 10px;
    padding-top: 20px;

    /*-webkit-box-shadow: -9px 0 20px rgba(89, 102, 122, 0.1);*/
    /*box-shadow: -9px 0 20px rgba(89, 102, 122, 0.1);*/
  }

  .sidebar-middle {
    /*height: 100vh;*/
    /*top: 0;*/
    /*position: fixed;*/
    background-color: $color-white;
    padding-left: 16px;
    padding-right: 10px;
    padding-top: 15px;
    /*margin-top: 5px;*/
    margin-bottom: 30px;
  }

  .sidebar-bottom {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 15px;
    .sidebar-link {
      h4 {
        // color: #333;
      }
    }
  }

  .sidebar-splash {
    width: 100%;
    max-width: 720px;
  }

  .sidebar-title-wrapper {
    /*background-color: rgba(115,102,255,0.06);*/
    /*padding: 10px 17px;*/
    border-radius: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /*margin-bottom: 10px;*/
    /*margin-top: 20px;*/

    margin-bottom: 0;
    padding: 10px;
    background-color: transparent;
  }

  .sidebar-link {
    padding: 16px 10px;
    border-radius: 5px;
    color: #222222;
    display: flex;
    align-items: center;
    transition: all 0.5s ease;
    cursor: pointer;

    h4, p {
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      text-transform: lowercase;
      letter-spacing: 0.02em;
    }

    &-current {
      h4, .icon {
        color: $color-primary !important;
      }
    }

    &:hover {
      background-color: #F5F5F5;
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;

      h4, i, p {
        color: $color-background-dark;
        color: $color-primary;
      }
      .fulfillment-remaining {
        color: $color-white;
      }
    }

    .icon {
      margin-right: 10px;
      width: 46px;
      height: 26px;
      // font-size: 26px;

      // display: flex;
      // align-items: center;
      // justify-content: center;
    }

    h4 {
      color: #5C5C5C;
      font-size: 16px;
      font-weight: 500;
      /*letter-spacing: 0;*/
      /*line-height: 17px;*/
    }
  }

  .sidebar-link-expandable {
    &:hover {
      background-color: unset;
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;

      h4, .icon {
        color: $color-primary;
      }
    }
  }

  .header-logo {
    margin-right: 8px;
  }

  .add-popup {
    position: absolute;
    left: 80px;
    top: 50%;
    border: 1px solid #ddd;
    width: $sidebar-width;
    background-color: $color-white;
    padding: 20px;
    border-radius: 10px;

    & > div {
      a {
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .sidebar-link-active {
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    position: relative;
    margin-bottom: 10px;
    background-color: #dad6ff;

    * {
      color: $color-primary;
    }

    &:hover {
      background-color: #dad6ff;;
    }
  }

  .fulfilment-items {
    padding-left: 15px;

    .sidebar-link {
      &:hover {
        background: transparent;
      }
    }
  }

  .inside-wrap {
    /*position: sticky;*/

    border-radius: 5px;
    height: 100vh;
    top: 0;
    height: 100%;
    min-height: unset;
    max-height: 100vh;
    position: sticky;
  }
  
  .fulfillment-remaining {
    min-width: 18px;
    height: 18px;
    text-align: center;
    font-weight: 700;
    border-radius: 4px;
    font-size: 12px;
    line-height: 0.9em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $color-primary;
    color: white;
    /*margin-right: 10px;*/
    padding-top: 2px;
    transform: translateY(-2px);
  }
  .one-product {
    margin-bottom: 4px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;

    span {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .icon-product {
    margin-right: 8px;
    margin-left: 24px;
  }
  .my-product {
    margin-bottom: 4px;

    p {
      font-family: 'CA SaygonText', sans-serif;
      font-size: 14px;
      font-weight: 400;
    }
    .icon {
      font-size: 18px;
    }

    &:hover {
      p, .icon {
        color: $color-primary;
      }
    }
  }

  .o05 {
    opacity: 0.3;
    pointer-events: none;
  }
  .cupwise {
    display: flex;
    align-items: center;
    color: #000000;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0;
    line-height: 20px;
    margin-left: 4px;

    span {
      font-weight: 800;
    }
  }
  .icon-bars {
    font-size: 28px;
  }
  .hr {
    width: calc(100% - 56px);
    height: 1px;
    max-height: 1px;
    border: none;
    border-bottom: 1px solid #979797;

    // padding-right: 30px;
    // padding-left: 30px;
  }

  .collapse-link {
    h4 {
      color: #5C5C5C;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0;
      line-height: 13px;
    }
  }
  .icon {
    background-position: center !important;
    background-repeat: no-repeat !important;
    &:before {
      display: none;
    }
  }
  .icon-sessions {
    background: url('../../static/images/icon-new-sessions.svg');
  }
  .icon-analyze {
    background: url('../../static/images/magnifying-glass-light.svg');
  }
  .icon-templates {
    background: url('../../static/images/new-icon-templates.svg');
  }
  .icon-coffees {
    background: url('../../static/images/new-icon-coffee.svg');
  }
  .icon-collapse {
    background: url('../../static/images/icon-new-collapse.svg');
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
  .icon-products {
    background: url('../../static/images/bag-shopping-light.svg');
    /*background: url('../../static/icons/bag-shopping-thin.svg');*/
  }
  .icon-fulfillment {
    background: url('../../static/images/box-open-light.svg');
    /*background: url('../../static/icons/box-open-thin.svg');*/
  }
  .icon-dollar {
    background: url('../../static/images/dollar-sign-light.svg');
    /*background: url('../../static/icons/dollar-sign-thin.svg');*/
  }
  .icon-home {
    background: url('../../static/images/new-icon-home.svg');
    /*background: url('../../static/icons/house-thin.svg');*/
  }
  .sidebar-link:hover, .sidebar-link-current {
      .icon-home {
        background: url('../../static/images/icon-new-home-active.svg');
      }
      .icon-analyze {
        color: $color-primary;
        background-color: $color-primary;
        background: url('../../static/images/magnifying-glass-light-active.svg');
      }
      .icon-sessions {
        background: url('../../static/images/icon-new-sessions-active.svg');
      }
      .icon-templates {
        background: url('../../static/images/new-icon-templates-active.svg');
      }
      .icon-coffees {
        background: url('../../static/images/icon-new-coffees-active.svg');
      }
      .icon-collapse {
        background: url('../../static/images/icon-new-collapse-active.svg');
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

    .icon-products {
      background: url('../../static/images/bag-shopping-light-active.svg');
    }
    .icon-fulfillment {
      background: url('../../static/images/box-open-light-active.svg');
    }
    .icon-dollar {
      background: url('../../static/images/dollar-sign-light-active.svg');
    }
  }

  .sidebar-link-disable {
    pointer-events: none;
    opacity: 0.5;
  }

  .coming-soon {
    position: absolute;
    font-size: 12px;
    bottom: 4px;
    left: 50%;
    opacity: 0.5;
    transform: translateX(-50%);
  }

  .sidebar-icon-image {
    width: 25px;
    object-fit: contain;

    &-wrapper {
      height: 35px;
      width: 35px;
      min-height: 35px;
      min-width: 35px;
      max-height: 35px;
      max-width: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      /*background-color: #DDD;*/
      /*border: 1px solid $color-background-dark;*/
      margin-right: 10px;
    }
  }
  .sub-text {
    font-size: 12px;
  }
  .header-logo {
    width: 32px;
    height: 41px;
    max-height: 41px;
    min-height: 41px;
    object-fit: contain;
    margin-right: 5px;
  }
  .logo-font {
    transform: translateY(-2px);
    font-size: 25px;
  }

  .sidebar-icon {
    /*color: $color-primary;*/
  }

  .fulfill-link {
    & > h4 {
      flex: unset;
    }

    & > p {
      margin-left: 6px;
    }
  }

</style>

</style>
