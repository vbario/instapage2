<template>
  <p class="paybox-price" v-if="data">
    ${{((data)/100).toFixed(2)}}
  </p>
  <p v-else></p>
</template>

<script>
export default {
  name: 'PayBoxPrice',
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
.paybox-price {
  font-size: 28px;
}
</style>
