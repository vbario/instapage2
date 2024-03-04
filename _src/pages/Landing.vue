<template>
  <div class="landing-wrapper df fdc aic f1 w100p">

    <!-- SPLASH -->
    <div class="landing-splash df fdc aic">
      <h1 class="_mbx">Landing Page</h1>
      <p class="_mbx">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat metus vel urna sodales, pellentesque fermentum mi molestie. Donec lacinia id mauris vitae vestibulum.
      </p>
      <a @click="goTo('/me')" href="">Login</a>
    </div>

    <!-- CHOOSE YOUR FEEL -->
    <!-- <div class="landing-choose-your-feel df fdc aic w100p">
      <h2>Choose Your Feel</h2>

      <div class="landing-choose-your-feels-list df jcsb w100p">
        <div class="choose-your-feel-button">
          <p>
            Feel Ready
          </p>
        </div>
        <div class="choose-your-feel-button">
          <p>
            Feel Calm
          </p>
        </div>
        <div class="choose-your-feel-button">
          <p>
            Feel Bright
          </p>
        </div>
        <div class="choose-your-feel-button">
          <p>
            Feel Sharp
          </p>
        </div>
      </div>
    </div> -->

    <!-- PRODUCTS -->
<!--     <div class="landing-products df jcsb w100p">
      <LandingProduct :feel="'ready'"/>
      <LandingProduct :feel="'sharp'"/>
      <LandingProduct :feel="'calm'"/>
      <LandingProduct :feel="'bright'"/>
    </div> -->

  </div>
</template>

<script>

import router from '../router'
import LandingProduct from '@/components/LandingProduct'

export default {
  name: 'Landing',
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
    goTo (route) {
      router.push(route)
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Landing page created')
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  ._mbx {
    margin-bottom: 30px
  }

  .landing-wrapper {
    padding: 30px;
    padding-top: 30px;
  }
  .landing-splash, .landing-choose-your-feel {
    width: 100%;
    max-width: 720px;
  }
  .landing-products {
    flex-wrap: wrap;
    max-width: 860px;
  }
</style>
