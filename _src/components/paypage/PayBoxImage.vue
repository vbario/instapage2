<template>
  <div class="paybox-image">
    <img v-if="data" :src="data" >
    <div v-else></div>
  </div>
</template>

<script>
export default {
  name: 'PayBoxImage',
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
  @import "../../styles/settings.scss";

  .paybox-image {
    height: 400px;
    width: 400px;
    min-width: 400px;
    max-width: 400px;
    background-color: #fff;
    border-radius: 20px;
    margin-right: 36px;
    -webkit-box-shadow: 0 0 20px rgba(8, 21, 66, .03);
    box-shadow: 0 0 20px rgba(8, 21, 66, .03);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }

  @media (max-width: $max-size-1) {
    .paybox-image {
      height: 320px;
      width: 320px;
      min-width: 320px;
      max-width: 320px;
    }
  }
  @media (max-width: $max-size-2) {
    .paybox-image {
      height: 340px;
      width: 340px;
      min-width: 340px;
      max-width: 340px;
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
  @media (max-width: $max-size-3) {
    .paybox-image {
      height: 290px;
      width: 290px;
      min-width: 290px;
      max-width: 290px;
      margin-right: 0;
      margin-bottom: 14px;
    }
  }
</style>
