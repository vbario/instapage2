<template>
  <div class="landing-product-wrapper df fdc jcsb aic w100p">
    <a @click="goTo('/feel#' + feel, true)">
      <img src="" class="landing-product-image">
    </a>
    <div class="df fdc aic">
      <h3>Feel {{feel}}</h3>
      <p>WHOLE BEAN COFFEE | 340G (3/4LB)</p>
      <p>$19</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat metus vel urna sodales, pellentesque.</p>
      <button class="add-to-cart">
        Add To Cart
      </button>
    </div>
  </div>
</template>

<script>
import router from '@/router'
  
export default {

  name: 'LandingProduct',
  data () {
    return {
      // mode: 'login' // login/register
    }
  },
  props: ['feel'],
  components: {

  },
  methods: {
    goTo (path, toTop) {
      if (toTop) {
        window.scrollTo(0, 0)
      }
      router.push(path)
    }
  },
  computed: {

  },
  created () {
    // console.log('** Login Component Loaded')
  }
}
</script>

<style scoped lang="scss">
@import "../styles/settings.scss";

.landing-product-wrapper {
  max-width: 330px;
  height: 650px;

  & > div {
    height: 285px;
  }
}

.landing-product-image {
  width: 315px;
  height: 345px;
}
</style>
