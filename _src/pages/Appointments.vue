<template>
  <div class="landing-wrapper df fdc aic f1 w100p">

    <!-- SPLASH -->
    <div class="landing-splash df fdc aic">
      <h1>Appointments</h1>
<!--       <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat metus vel urna sodales, pellentesque fermentum mi molestie. Donec lacinia id mauris vitae vestibulum.
      </p> -->
    </div>

  </div>
</template>

<script>

import router from '../router'
import LandingProduct from '@/components/LandingProduct'

export default {
  name: 'Appointments',
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
