<template>
  <div class="pushable-branding">
    <img class="header-logo" @click="goTo('/')" src="../../../static/images/pushable/pushable-logo-5.png"/>
    <h1 class="logo-font" @click="goTo('/')">pushable</h1>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'PushableBranding',
  data () {
    return {
    }
  },
  props: [],
  components: {

  },
  methods: {
    goTo (route) {
      router.push(route)
    }
  },
  computed: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";
  .pushable-branding {
    transform: scale(0.8);
    z-index: 10;
    display: flex;
    align-items: center;  
    cursor: pointer;
    margin-top: 30px;
  }
  .header-logo {
    z-index: 10;
    width: 48px;
    height: 41px;
    max-height: 41px;
    min-height: 41px;
    object-fit: contain;
    margin-right: 5px;
  }
  .logo-font {
    z-index: 10;
    transform: translateY(-2px);
    font-size: 25px;
    color: $color-primary;
  }
</style>
