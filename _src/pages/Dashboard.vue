<template>
  <div class="landing-wrapper df fdc aic f1 w100p">

    <div class="top-bar-global w100p _position1 df jcsb aic">
      <h2>Dashboard</h2>
<!--       <div class="previews df jcsb aic">
        <a class="balance-text">Balance:</a>
        <p class="balance-amount">$54.00</p>
      </div> -->
    </div>

    <div class="whole-page-box-global w100p df fdc">
 <!--      <div class="income-row income-heading-row df jcsb">
        <div class="income-heading">
          <h3>
            Stuff
          </h3>
        </div>
      </div>
      <br/>
      <br/>
      <div class="income-row df jcsb">
        <div class="income-heading curp"">
          <p>
          </p>
        </div>
      </div> -->
    </div>

  </div>
</template>

<script>

import router from '../router'
import LandingProduct from '@/components/LandingProduct'
import AcceptCreditCard from '@/components/AcceptCreditCard'

export default {
  name: 'Dashboard',
  data () {
    return {
      loading: false
    }
  },
  props: ['mode'],
  components: {
    LandingProduct,
    AcceptCreditCard
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
    padding-top: 12px;
  }
  .landing-splash, .landing-choose-your-feel {
    width: 100%;
    max-width: 720px;
  }
  .landing-products {
    flex-wrap: wrap;
    max-width: 860px;
  }
  iframe {
    width: 100%;
    height: 400px;
  }
</style>
