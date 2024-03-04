<template>
  <div class="product-wrapper df fdc aic f1 w100p">

    <!-- SPLASH -->
    <div class="product-splash df jcsb">
      <div class="df fdc jcc aifs">
        <h3>Product</h3>
      </div>
      <img src="" class="product-product-image">
    </div>

  </div>
</template>

<script>

import products from '@/util/products'

import LandingProduct from '@/components/LandingProduct'


export default {
  name: 'Landing',
  data () {
    return {
      loading: false,
      feelName: '',
      feelPrice: '',
      feelTextLong: ''
    }
  },
  props: ['feel'],
  components: {
    LandingProduct
  },
  watch: {
  },
  methods: {
    product () {
      return products[this.feel]
    },
    otherTypes () {
      let otherTypes = []
      for (let product in products) {
        if (product !== this.feel) {
          otherTypes.push(product)
        }
      }
      return otherTypes
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  h1 {
    text-transform: capitalize;
  }

  h3 {
    margin-bottom: 18px;
    text-align: left;
  }

  hr {
    margin-bottom: 45px;
  }

  .product-wrapper {
    background-color: #292929;
    padding: 30px;
    padding-top: 30px;
  }
  .product-splash, .product-choose-your-feel {
    width: 100%;
    height: 566px;
    margin-bottom: 120px;
  }
  .product-products {
    flex-wrap: wrap;
  }
  .product-product-image {
    width: 515px;
    min-width: 515px;
    height: 566px;
  }
</style>
