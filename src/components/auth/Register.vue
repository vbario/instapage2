<template>
  <div class="df fdc">
    <p class="heading">
      Register
    </p>
    <input type="text" placeholder="Your Name" name="" v-model="name">
    <input type="text" placeholder="E-mail" name="" v-model="email">
    <input type="password" placeholder="Password" name="" v-model="password">
    <input type="password" placeholder="Password" name="" v-model="password2">
    <p v-if="$store.getters.authError">{{ $store.getters.authError }}</p>
    <button @click="register()">Register</button>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  },
  props: [],
  components: {

  },
  methods: {
    register () {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
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
