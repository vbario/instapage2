<template>
  <div class="sidebar-wrapper w100p" v-bind:class="{
    'show-sidebar': sidebarShown
  }" v-click-outside="closeSidebarIfNeeded">

    <div class="inside-wrap df fdc aic jcsb f1 w100p">

      <!-- Sidebar Top -->
      <a class="sidebar-top df">
        <img class="header-logo" @click="goTo('/me')" src="../../static/images/tap-in-logo.png">
        <h2 class="f1" @click="goTo('/me')">Tap In</h2>
        <h4 @click="closeSidebar()" class="slide-out-temp"><</h4>
      </a>

      <div class="sidebar-slideout" @click="showSidebar()">
        <p>
          >
        </p>
      </div>

      <!-- Sidebar Middle -->
      <div class="sidebar-middle f1 w100p">

        <div class="sidebar-title-wrapper w100p">
          <h3>
            {{$store.getters['AUTH.myInfo'] ? $store.getters['AUTH.myInfo'].displayName.displayName : ''}}
          </h3>
          <!-- <p>
            What Am I Selling?
          </p> -->
        </div>

        <div class="sidebar-link" @click="goTo('/me')">
          <!-- <p class="icon"></p> -->
          <i class="icon-dashboard icon"></i>
          <h4>Dashboard</h4>
        </div>
        <div class="sidebar-link" @click="goTo('/products')">
          <i class="icon-barcode icon"></i>
          <h4>My Products</h4>
        </div>
        <div class="sidebar-link" @click="goTo('/income')">
          <i class="icon-dollar icon"></i>
          <h4>Income</h4>
        </div>
        <div class="sidebar-link"
              @click="goTo('/fulfillment')">
          <i class="icon-check icon"></i>
          <h4 class="f1">Fulfill Orders</h4>
          <p class="fulfillment-remaining" v-if="$store.getters['AUTH.displayData'] && $store.getters['AUTH.displayData'].fulfillments">{{$store.getters['AUTH.displayData'].fulfillments}}</p>
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
        <div class="sidebar-link posrel" @click="toggleAddProductsPopup($event)">
          <i class="icon-plus icon"></i>
          <h4>Add Product</h4>
          <div class="add-popup" v-if="showAddProductPopup" v-click-outside="closeAddProductsPopup">
            <div class="df fdc">
              <a @click="newProduct('digital-download')">Sell A Digital Download</a>
              <a @click="newProduct('digital-service')">Sell A Digital Service</a>
              <a @click="newProduct('calendar-event')">Sell A Calendar Appointment</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar Bottom -->
      <div class="sidebar-bottom w100p">
        <div class="sidebar-link" @click="goTo('/settings')">
          <p class="icon">I</p>
          <h4>Settings</h4>
        </div>
        <div class="sidebar-link" @click="logout()">
          <p class="icon">I</p>
          <h4>Logout</h4>
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
      sidebarShown: true,
      // showFulfilment: true,
      showAddProductPopup: false,
      mediaQueryWidth: 760
    }
  },
  props: [],
  components: {
    LandingProduct
  },
  methods: {
    goToProduct (product) {
      let path = '/add/' + product.type + '/' + product.internalId
      router.push(path)
    },
    logout () {
      this.$store.dispatch('AUTH.logout', {})
    },
    goTo (route) {
      this.closeSidebarIfNeeded()
      router.push(route)
    },
    showSidebar () {
      this.sidebarShown = true
    },
    closeSidebarIfNeeded () {
      let width = window.innerWidth
      if (width < this.mediaQueryWidth) {
        this.closeSidebar()
      }
    },
    closeSidebar () {
      this.sidebarShown = false
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
    font-size: 16px;
    color: $color-primary;
    letter-spacing: 0.40px;
    font-weight: 700;
    
    & + p {
      margin-top: 5px;
      color: $color-dark;
      font-size: 11px;
      margin-bottom: 0;
      text-transform: capitalize;
      line-height: 1;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  $sidebar-width: 280px;

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
  }
  $slideout-width: 50px;
  .slide-out-temp {
    width: $slideout-width;
    text-align: center;
  }
  .sidebar-slideout {
    position: absolute;
    top: 50px;
    background-color: $color-white;
    height: 50px;
    width: $slideout-width;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    left: calc(#{$sidebar-width} - #{$slideout-width});
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
      left: calc(#{$sidebar-width} - #{$slideout-width} - #{$slideout-width});
      /*opacity: 0;*/
      pointer-events: none;
    }
  }
  @media (max-width: 760px) {
    .sidebar-wrapper {
      position: fixed;
      transform: translateX(0);
      margin-right: 0;
    }
    .sidebar-slideout {
      left: 100%;
      left: calc(#{$sidebar-width} - #{$slideout-width});
    }
    .show-sidebar {
      transform: translateX(0);
      margin-right: 0;
      .sidebar-slideout {
        left: calc(#{$sidebar-width} - #{$slideout-width} - #{$slideout-width});
        /*opacity: 0;*/
        pointer-events: none;
      }
    }
  }
  .sidebar-top {
    height: $header-height;
    background-color: $color-white;
    width: 100%;
    padding: 27px 30px;
    z-index: 10;

    -webkit-box-shadow: -9px 0 20px rgba(89, 102, 122, 0.1);
    box-shadow: -9px 0 20px rgba(89, 102, 122, 0.1);
  }

  .sidebar-middle {
    background-color: $color-white;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 15px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .sidebar-bottom {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
  }

  .sidebar-splash {
    width: 100%;
    max-width: 720px;
  }

  .sidebar-title-wrapper {
    background-color: rgba(115,102,255,0.06);
    padding: 15px 17px;
    border-radius: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 15px;
  }

  .sidebar-link {
    padding: 10px;
    border-radius: 10px;
    color: #222222;
    display: flex;
    align-items: center;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
      background-color: rgba(115,102,255,0.12);
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;

      h4, .icon {
        color: $color-primary;
      }
    }

    .icon {
      margin-right: 10px;
      width: 18px;
      height: 24px;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    h4 {
      font-size: 14px;
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
    min-height: 100vh;
    position: sticky;
    top: 0;
  }
  
  .fulfillment-remaining {
    /*padding: 3px;bg*/
    min-width: 20px;
    text-align: center;
    font-weight: 700;
    border-radius: 4px;
    font-size: 12px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #5468d4;
    color: white;
    font-family: 'CA SaygonText', sans-serif;
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

</style>
