<template>
  <div class="wrapper-popup df jcc aifs" @click="hideSignUp()">
    <SignUpModule class="test" v-if="$store.getters.popup.type == 'SignUpNow'" />
    <!-- popup == 'SignUpModule' -->
  </div>
</template>

<script>

import router from '@/router'

import SignUpModule from '@/components/auth/SignUpModule'

export default {
  name: 'Popup',
  data () {
    return {
    }
  },
  props: ['popup'],
  components: {
    SignUpModule
  },
  methods: {
    goTo(route) {
      router.push(route)
    },
    hideSignUp () {
      this.$store.dispatch('popup', {
        type: false
      })
    }
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
  @import "../../styles/settings.scss";
  .wrapper-popup {
    width: 100%;
    min-height: 100vh;
    background-color: $primaryColor;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: $popupBackgroundColor;
  }
  .test {
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
