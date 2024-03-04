<template>
  <div class="wrapper" @click="$event.stopPropagation()">
    <h1>SIGN UP</h1>

    <Register />
    <Login />
    <Logout />

    <!-- <p>{{ $store.getters.popup.type }}</p> -->
  </div>
</template>

<script>
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Logout from '@/components/auth/Logout'

import router from '@/router'

export default {
  name: 'SignUpNow',
  data () {
    return {
    }
  },
  props: ['popup'],
  components: {
    Login,
    Register,
    Logout
  },
  methods: {
    goTo(route) {
      router.push(route)
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
  .wrapper {
    max-width: 400px;
    max-height: 400px;
    background-color: $whiteA;
  }
</style>
