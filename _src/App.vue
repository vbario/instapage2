<template>
  <div id="app">
    <main class="df fdr jcc"  v-bind:class="{
      'inverted-colors': invertedColors()
    }">
      <transition name="fade">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import firebaseInstance from './util/firebase'
import router from "./router";

export default {
  name: "App",
  data() {
    return {
      a: 'b'
    };
  },
  props: [],
  components: {},
  methods: {
    invertedColors() {
      let path = this.$route.path
      let paths = [
        '/account',
        '/faq'
      ]
      if (paths.indexOf(path) > -1) {
        return true
      }
      return false
    },
    checkLoginStatus() {
      this.$store.dispatch('AUTH.authStateChange', {})
    },
  },
  computed: {},
  watch: {
  },
  created() {
    let currentPath = router.currentRoute.path
    console.log("* Loaded app root. Path:", currentPath)
    this.checkLoginStatus()
  }
};
</script>

<style lang="scss">
  @import "./styles/settings.scss";

  @font-face {
    font-family: "Nexa";
    font-weight: 300;
    src: url("../static/fonts/Nexa/Nexa-Light.otf")
  }

  body {
      background: $color-background;
  }

  p, a, h1, h2, h3, h4, h5, h6, h7, h8 {
      color: $color-dark;
      font-family: 'Roboto';
  }
  .icon {
    color: $color-dark;;
  }

  .inverted-colors {
    background: $color-white;

    p, a, button, h1, h2, h3, h4, h5, h6, h7, h8, .icon {
        color: $color-black;
    }
  }
</style>








