<template>
    <form id="payment-form">
      <div id="card-element"><!--Stripe.js injects the Card Element--></div>
      
      <button id="submit">
        <div class="spinner hidden" id="spinner"></div>
        <span id="button-text">Pay now</span>
      </button>
      <p id="card-error" role="alert"></p>
      <p class="result-message hidden">
        Payment succeeded, see the result in your
        <a href="" target="_blank">Stripe dashboard.</a> Refresh the page to pay again.
      </p>
    </form>
</template>

<script>

import router from '../router'
import LandingProduct from '@/components/LandingProduct'

export default {
  name: 'AcceptCreditCard',
  data () {
    return {
      loading: false
    }
  },
  props: ['mode'],
  components: {
    LandingProduct
  },
  methods: {
    loadCreditCardModule () {
      if (document.querySelector("button")) {
        this.$store.dispatch('AUTH.getPaymentIntent', {})
      } else {
        console.log('no button')
        setTimeout(() => {
          this.loadCreditCardModule()
        }, 1000)
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Landing page created')
    this.loadCreditCardModule()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";
  #payment-form {
    /*height: 100%;*/
  }


</style>
