<template>
  <div class="app-wrap df jcsb aic">
      <!-- <Header :mode="mode" /> -->
      <FulfillDigitalOrderPopup v-if="$store.getters['AUTH.digitalOrderPopup'] !== null" />

      <Sidebar v-if="showSidebar.indexOf(mode) > -1"/>

      <PayPage v-if="mode == 'pay'" />
      
      <div class="app-side f1 df fdc jcsb aic" v-if="mode !=='pay'">
        <Landing v-if="mode == 'landing'" />
        <Dashboard v-if="mode == 'dashboard'" />
        <Settings v-if="mode == 'settings'" />
        <Products v-if="mode == 'products'" />
        <Income v-if="mode == 'income'" />
        <Fulfillment v-if="mode == 'fulfillment'" />
        <Appointments v-if="mode == 'appointments'" />
        <AddProduct v-if="mode == 'add-product'" />

        <Product v-if="mode == 'product'" :feel="feelProduct" />
        <Account v-if="mode == 'account'" />
        <Login v-if="mode == 'login'" />
        <Faq v-if="mode == 'faq'" />
        
        <Footer v-if="(hideFooter.indexOf(mode) < 0)" :mode="mode" />
      </div>

  </div>
</template>

<script>

import Landing from './Landing'
import Dashboard from './Dashboard'
import Settings from './Settings'
import Income from './Income'
import Products from './Products'
import Appointments from './Appointments'
import Fulfillment from './Fulfillment'
import Product from './Product'
import AddProduct from './AddProduct'
import Account from './Account'
import Login from './Login'
import Faq from './Faq'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import PayPage from '@/components/paypage/PayPage'
import FulfillDigitalOrderPopup from './FulfillDigitalOrderPopup'

export default {
  name: 'AppWrap',
  data () {
    return {
      feelProduct: '',
      hideFooter: [
        'account'
      ],
      showSidebar: [
        'dashboard',
        'settings',
        'income',
        'products',
        'appointments',
        'add-product',
        'fulfillment'
      ],
    }
  },
  props: ['mode'],
  components: {
    Landing,
    Dashboard,
    Settings,
    Income,
    Products,
    Appointments,
    Fulfillment,
    Product,
    AddProduct,
    Account,
    Login,
    Faq,
    Header,
    Footer,
    Sidebar,
    PayPage,
    FulfillDigitalOrderPopup,
  },
  methods: {
    loadProduct () {
      let hash = this.$route.hash
      hash = hash.substring(1, hash.length)
      this.feelProduct = hash
    }
  },
  computed: {

  },
  watch: {
    $route (to, from) {
      if (to !== from) {
        this.loadProduct()
      }
    }
  },
  mounted () {
  },
  created () {
    this.loadProduct()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  .app-wrap {
    min-height: 100vh;
    /*max-width: $max-width;*/
    width: 100%;
  }

  .app-side {
    min-height: 100vh;
  }
</style>
