<template>
  <div class="loading-splash">
    <img class="spinner-1 mb-spinner o-spinner" src="../../../static/images/pushable/loader-black-3.png">
    <p>Loading</p>
  </div>
</template>

<script>
export default {
  name: 'FullPageSpinner',
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
  }
}
</script>

<style scoped lang="scss">
  .loading-splash {
    z-index: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: #fff;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-bottom: 2px;
  }
  .spinner-1 {
    pointer-events: none;
    animation-name: spin;
    animation-duration: 5000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
  }

  @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
  }

  .mb-spinner {
    margin-bottom: 100px;
  }

  .o-spinner {
    opacity: 0.8;
  }
  
</style>
