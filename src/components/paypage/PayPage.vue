<template>
  <div class="paypage-wrapper df fdc aic f1 w100p">
    <PayBox :user="user" :uniqueid="uniqueid"/>
<!--     <p class="powered">
      Copyright Tap-In Technology © 2021
    </p> -->
  </div>
</template>

<script>

import router from '@/router'
import PayBox from './PayBox'

export default {
  name: 'PayPage',
  data () {
    return {
      loading: false,
      user: null,
      uniqueid: null
    }
  },
  props: ['mode'],
  components: {
    PayBox
  },
  methods: {
    goTo (route) {
      router.push(route)
    },
    getProductId () {
      let route = this.$route
      let uniqueid = route.params.uniqueid
      let user = route.params.user
      this.uniqueid = uniqueid
      this.user = user
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    this.getProductId()
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/settings.scss";

  .paypage-wrapper {
    height: 100%;
    /*padding-bottom: 40px;*/
    padding-top: 30px;
  }

  .powered {
    /*position: fixed;*/
    bottom: 10px;
    font-size: 12px;
    /*margin-top: 20px;*/
    position: relative;
    flex: 1;
    justify-self: flex-end;
    height: 20px; 
    margin-top: 34px;
    max-height: 20px;
    margin-bottom: 4px;
  }

  @media (max-width: $max-size-2) {
    .paypage-wrapper {
      padding-bottom: 0;
    }
    .powered {
      margin-top: 20px;
      position: relative;
    }
  }
</style>
