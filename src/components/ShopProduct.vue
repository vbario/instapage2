<template>
  <div class="shop-product-wrapper df fdc jcc aic w100p">
    <a @click="goTo('/feel#' + type, true)">
      <img src="" class="shop-product-image">
    </a>
    <div class="df fdc aic">
<!--       <h3>Feel {{type}}</h3>
      <p>WHOLE BEAN COFFEE | 340G (3/4LB)</p>
      <p>$19</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat metus vel urna sodales, pellentesque.</p> -->
      <button class="add-to-cart">
        {{feelName}}
      </button>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import products from '@/util/products'
  
export default {

  name: 'LandingProduct',
  data () {
    return {
      // mode: 'login' // login/register
      feelName: ''
    }
  },
  props: ['type'],
  components: {

  },
  methods: {
    goTo (path, toTop) {
      if (toTop) {
        window.scrollTo(0, 0)
      }
      this.$store.dispatch('AUTH.showHeaderShop', !this.$store.getters['AUTH.showHeaderShop'])
      router.push(path)
    }
  },
  computed: {

  },
  created () {
    // console.log('** ShopProduct Component Loaded: Feel ' + this.type)
    this.feelName = products[this.type].name
  }
}
</script>

<style scoped lang="scss">
@import "../styles/settings.scss";

.landing-product-wrapper {
  /*max-width: 330px;*/
  /*height: 650px;*/

  & > div {
    /*height: 285px;*/
  }
}

.shop-product-image {
  width: 180px;
  height: 200px;
  margin-bottom: 18px;
}
</style>
