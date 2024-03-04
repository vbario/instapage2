<template>
  <div class="footer-wrapper-outer df aic jcc w100p">
    <p>Copyright Tap-In Technology © 2021</p>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'Footer',
  data () {
    return {
      some: 'data',
    }
  },
  props: ['mode'],
  components: {
  },
  methods: {
    goTo (path) {
      window.scrollTo(0, 0)
      router.push(path)
    },
  },
  computed: {

  },
  watch: {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";
  .footer-wrapper-outer {
    background-color: $color-white;
    height: 22px;
    min-height: 52px;
    padding: 15px;

    p {
      font-size: 13px;
      line-height: 1.7;
      letter-spacing: .7px;
      font-family: 'Rubik'
    }
  }
  p, a, button, input {
    color: $color-black;
  }
  input {
    border: 1.5px solid black;
    width: 310px;
  }
</style>
