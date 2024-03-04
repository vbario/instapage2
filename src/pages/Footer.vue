<template>
  <div class="footer-wrapper-outer df aic jcc w100p">
    <div class="sidebar-links w100p df jcsb">
      <div class="sidebar-link f1" @click="goTo('/me')" v-bind:class="{
        'sidebar-link-current': $route.path == '/me'
      }">
        <!-- <div class="icon icon-home"></div> -->
        <div class="sidebar-icon-image-wrapper">
          <i class="sidebar-icon fa-solid fa-house footer-icon"></i>
        </div>
        <h4>Home</h4>
      </div>
      <div class="sidebar-link f1" @click="goTo('/products')" v-bind:class="{
        'sidebar-link-current': $route.path == '/products'
      }">
        <!-- <div class="icon icon-products"></div> -->
        <div class="sidebar-icon-image-wrapper">
          <i class="fa-solid fa-boxes-stacked footer-icon"></i>
        </div>
        <h4>My Products</h4>
      </div>
      <div class="sidebar-link f1 posrel"
            @click="goTo('/fulfillment')" v-bind:class="{
        'sidebar-link-current': $route.path == '/fulfillment'
      }">
        <div class="sidebar-icon-image-wrapper">
          <i class="fa-solid fa-clipboard-check footer-icon"></i>
        </div>
        <h4 class="f1">Fulfill Orders</h4>
        <p class="fulfillment-remaining" v-if="$store.getters['AUTH.displayData'] && $store.getters['AUTH.displayData'].fulfillments">
          {{$store.getters['AUTH.displayData'].fulfillments}}
        </p>
      </div>
      <div class="sidebar-link f1 posrel"
            @click="goTo('/linkinbio')" v-bind:class="{
        'sidebar-link-current': $route.path == '/linkinbio'
      }">
        <div class="sidebar-icon-image-wrapper">
          <i class="fa-solid fa-grid footer-icon"></i>
        </div>
        <h4 class="f1">My Page</h4>
      </div>
      <!-- <div class="sidebar-link f1" @click="goTo('/income')" v-bind:class="{
        'sidebar-link-current': $route.path == '/income'
      }">
        <div class="icon icon-dollar"></div>
        <h4>Income</h4>
      </div> -->
      <div class="sidebar-link f1" @click="goTo('/more')" v-bind:class="{
        'sidebar-link-current': $route.path == '/more'
      }">
        <!-- <div class="icon"></div> -->
        <div class="sidebar-icon-image-wrapper">
          <i class="fa-solid fa-circle-plus footer-icon"></i>
        </div>
        <h4>More</h4>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'Footer',
  data () {
    return {
      some: 'data',
    }
  },
  props: ['mode'],
  components: {
  },
  methods: {
    goTo (path) {
      window.scrollTo(0, 0)
      router.push(path)
    },
  },
  computed: {

  },
  watch: {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";
  .footer-wrapper-outer {
    background-color: #333;
    height: 100px;
    min-height: 100px;
    padding: 15px;
    position: fixed;
    bottom: 0;
    z-index: 119;

    p {
      font-size: 13px;
      line-height: 1.7;
      letter-spacing: .7px;
      font-family: 'Rubik'
    }
  }
  @media (max-width: 550px) {
    .footer-wrapper-outer {
      padding: 0;
      height: 70px;
      min-height: 70px;
    }
  }
  @media (min-width: 980px) {
    .footer-wrapper-outer {
      display: none;
    }
  }
  p, a, button, input {
    color: $color-black;
  }
  input {
    border: 1.5px solid black;
    width: 310px;
  }
  .icon {
    width: 29px !important;
    height: 24px !important;
    background-size: contain !important;
    background-position: bottom !important;;
    margin-bottom: 5px;

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
  .sidebar-link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h4 {
      color: #ddd;
      font-weight: 400;
      text-align: center;
      text-transform: lowercase;
      letter-spacing: 0.02em;
      font-size: 12px;
      /*font-size: 14px;*/
    }

    &:hover {
      h4, i {
        color: $color-primary;
      }
    }
  }
  .sidebar-link-current {
    h4, i {
      color: $color-primary;
    }
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

  .fulfillment-remaining {
    position: absolute;
    top: -6px;
    right: calc(50% + -20px);

    min-width: 16px;
    height: 16px;
    text-align: center;
    font-weight: 500;
    border-radius: 4px;
    font-size: 12px;
    line-height: 12px !important;

    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    background-color: $color-primary;
    color: white;
    /*font-family: 'CA SaygonText', sans-serif;*/
    margin-right: 0;
  }
  .sidebar-icon-image {
    width: 32px;
    object-fit: contain;
    margin-bottom: 2px;

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
      /*margin-right: 10px;*/
    }
  }
  .footer-icon {
    color: #ddd;
    font-size: 18px;
  }

  .sidebar-links {
    margin-bottom: 4px;
  }
  @media (max-width: 420px) {
    .sidebar-links {
      .sidebar-link {
        i {
          /*font-size: 20px;*/
        }
        h4 {
          display: none;
        }
      }
    }
  }
</style>
