<template>
  <p class="paybox-description">
    {{data}}
  </p>
</template>

<script>
export default {
  name: 'PayBoxDescription',
  data () {
    return {
    }
  },
  props: ['data'],
  components: {

  },
  methods: {

  },
  computed: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .paybox-description {
    /*height: 60px;*/
    /*min-height: 60px;*/
    /*overflow-y: auto;*/
  }
</style>
