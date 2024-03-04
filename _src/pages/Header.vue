<template>
  <div class="header-wrapper df fdr jcsb aic w100p">
    <div class="header-left">
      <a @click="goTo('/')">
        <p>
          Callout
        </p>
      </a>
    </div>
    <div class="header-right f1 df jcfe">
      <a class="shop" @click="showShop($event)">Shop</a>
      <a class="shop">About Us</a>
      <a class="shop" @click="goToAccount()">My Account</a>
      <a class="shop">Cart</a>
    </div>
    <div v-click-outside="hide" v-if="$store.getters['AUTH.showHeaderShop']" class="shop-dropdown df jcc">
      <div class="shop-dropdown-wrapper df jcc w100p">
        <ShopProduct :type="'ready'"/>     
        <ShopProduct :type="'sharp'"/>     
        <ShopProduct :type="'bright'"/>     
        <ShopProduct :type="'calm'"/>     
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import ShopProduct from '@/components/ShopProduct'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'Header',
  data () {
    return {
      some: 'data'
    }
  },
  props: ['mode'],
  components: {
    ShopProduct
  },
  methods: {
    hide () {
      this.$store.dispatch('AUTH.showHeaderShop', false)
    },
    goTo (path) {
      this.$store.dispatch('AUTH.showHeaderShop', false)
      router.push(path)
    },
    showShop (event) {
      event.stopPropagation()
      this.$store.dispatch('AUTH.showHeaderShop', !this.$store.getters['AUTH.showHeaderShop'])
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
  created () {
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";
  .header-wrapper {
    background-color: #222;
    height: $header-height;
    padding: 22px 30px;
    z-index: 1;
  }
  .header-right {
    a {
      margin-left: 90px;

      &:first-of-type {
        margin-left: 0;
      }

      &:last-of-type {
        margin-left: 60px;
      }
    }
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
</style>
