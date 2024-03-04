<template>
  <div class="faq-wrapper df fdc aic f1 w100p">

    <!-- SPLASH -->
    <div class="faq-splash df fdc aic">
      <h1>FAQ</h1>
      <!-- <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat metus vel urna sodales, pellentesque fermentum mi molestie. Donec lacinia id mauris vitae vestibulum.
      </p> -->
    </div>

  </div>
</template>

<script>

import router from '../router'
import LandingProduct from '@/components/LandingProduct'

export default {
  name: 'FAQ',
  data () {
    return {
      loading: false
    }
  },
  props: [],
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

  .faq-wrapper {
    background-color: #292929;
    padding: 30px;
    padding-top: 30px;
  }
  .faq-splash {
    width: 100%;
    max-width: 720px;
  }
</style>
