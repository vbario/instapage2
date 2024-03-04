<template>
  <div class="">

  </div>
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

  },
  computed: {

  },
  created () {
    this.$store.dispatch('AUTH.logout', {})
  }
}
</script>

<style scoped lang="scss">
</style>
