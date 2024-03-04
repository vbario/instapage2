<template>
    <button @click="logout()">Logout</button>
</template>

<script>
export default {
  name: 'Logout',
  data () {
    return {
    }
  },
  props: [],
  components: {

  },
  methods: {
    logout () {
      this.$store.dispatch('logout', {})
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
