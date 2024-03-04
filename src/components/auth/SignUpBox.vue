<template>
  <div class="wrapper-signup df fdc jcc aifs jcsb">
    <h3 class="space-1">Sign up</h3>
    <p class="p-1 space-3">Because of these reasons</p>
    <button class="button button-1 button-dark w100p space-2" @click="showSignUp()">Sign Up</button>
  </div>
</template>

<script>

import router from '@/router'

export default {
  name: 'SignUpBox',
  data () {
    return {
    }
  },
  props: [],
  components: {
  },
  methods: {
    goTo(route) {
      router.push(route)
    },
    showSignUp () {
      this.$store.dispatch('popup', {
        type: 'SignUpNow'
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
  .wrapper-signup {
    width: 100%;
    padding: $padding1;
    border-radius: $borderRadius1;
    border: 1px solid $borderColor1;
    padding-left: 15px;
    padding-right: 15px;
  }
  .space-1 {
    margin-bottom: 10px;
  }
  .space-2 {
    margin-bottom: 4px;
  }
  .space-3 {
    margin-bottom: 13px;
  }
</style>
