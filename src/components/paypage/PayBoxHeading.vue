<template>
  <div class="paybox-heading-wrap df fdc">
    <h1 class="paybox-heading">{{heading}}</h1>
    <p class="paybox-heading-name">{{name ? 'by' : ' '}} @{{name ? name.displayName : '-'}}</p>
  </div>
</template>

<script>
export default {
  name: 'PayBoxHeading',
  data () {
    return {
    }
  },
  props: ['heading', 'name'],
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
  * {
    color: $color-background-dark !important;
  }
  .paybox-heading {
    font-size: 32px;
    /*color: #5469d4;*/
  }
  .paybox-heading-name {
    font-size: 14px;
    margin-top: 4px;
  }
  @media (max-width: $max-size-1) {
    .paybox-heading {
      font-size: 28px;
    }
  }
</style>
