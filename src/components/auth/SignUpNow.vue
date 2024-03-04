<template>
  <div class="bar-wrap df fdr jcc">
    <span class="wrapper df fdr jcc"> 
      <span class="left-column">
        <!-- <Sidebar /> -->
        a
      </span>
      <span class="middle-column df fdc jcc f1">
        <h3>Get the word out!</h3>
        <p>Easy, transparent publishing</p>
        <!-- <Header v-bind:mode="mode" /> -->
        <!-- <Landing v-if="mode == 'landing'" /> -->
        <!-- <Dashboard v-else-if="mode == 'dash'" /> -->
        <!-- <Explore v-else-if="mode == 'explore'" /> -->
        <!-- <NewPostPage v-else-if="mode == 'new_post'" /> -->
      </span>
      <span class="right-column f1">
        c
        <!-- <Sidebar2 /> -->
      </span>
    </span>
  </div>
</template>

<script>

import router from '@/router'

export default {
  name: 'SignUpNow',
  data () {
    return {
    }
  },
  props: [],
  components: {
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

  .bar-wrap {
    width: 100%;
    background-color: $primaryColor;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 69px;
  }

  .wrapper {
    width: 100%;
    max-width: 1285px;
    justify-content: space-between;

    @media (max-width: 1000px) {
      justify-content: flex-start;
    }
  }
</style>
