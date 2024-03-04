<template>
  <div class="df fdc">
    <p class="heading">
      Login
    </p>
    <input type="text" placeholder="E-mail" name="" v-model="email">
    <input type="password" placeholder="Password" name="" v-model="password">
    <p v-if="$store.getters.authError">{{ $store.getters.authError }}</p>
    <button @click="login()">Login</button>
  </div>
</template>

<script>
export default {
  // import Login from '../components/Login'

  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  props: [],
  components: {

  },
  methods: {
    login () {
      // this.$store.dispatch('login', {
      //   email: this.email,
      //   password: this.password
      // })
    }
  },
  computed: {
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
</style>
