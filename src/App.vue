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
    font-family: "Avenir";
    font-weight: 200;
    src: url("../static/fonts/Avenir/Avenir-Light.ttf")
  }
  @font-face {
    font-family: "Avenir";
    font-weight: 300;
    src: url("../static/fonts/Avenir/Avenir-Book.ttf")
  }
  @font-face {
    font-family: "Avenir";
    font-weight: 400;
    src: url("../static/fonts/Avenir/Avenir-Regular.ttf")
  }
  @font-face {
    font-family: "Avenir";
    font-weight: 700;
    src: url("../static/fonts/Avenir/Avenir-Heavy.ttf")
  }
  @font-face {
    font-family: "Avenir";
    font-weight: 900;
    src: url("../static/fonts/Avenir/Avenir-Black.ttf")
  }

  @font-face {
    font-family: "Etna Sans Serif";
    font-weight: 400;
    src: url("../static/fonts/Etna-Sans-Serif/Etna-Sans-Serif.otf")
  }
  @font-face {
    font-family: "Evolve Sans";
    font-weight: 100;
    src: url("../static/fonts/Evolve-Sans/Evolve-Sans-Thin.otf")
  }
  @font-face {
    font-family: "Evolve Sans";
    font-weight: 300;
    src: url("../static/fonts/Evolve-Sans/Evolve-Sans-Light.otf")
  }
  @font-face {
    font-family: "Evolve Sans";
    font-weight: 400;
    src: url("../static/fonts/Evolve-Sans/Evolve-Sans-Regular.otf")
  }
  @font-face {
    font-family: "Evolve Sans";
    font-weight: 500;
    src: url("../static/fonts/Evolve-Sans/Evolve-Sans-Medium.otf")
  }
  @font-face {
    font-family: "Evolve Sans";
    font-weight: 700;
    src: url("../static/fonts/Evolve-Sans/Evolve-Sans-Bold.otf")
  }

  @font-face {
    font-family: "Kollektif";
    font-weight: 400;
    src: url("../static/fonts/kollektif/kollektif.ttf")
  }

  @font-face {
    font-family: "Kollektif";
    font-weight: 400;
    font-style: italic;
    src: url("../static/fonts/kollektif/kollektif-Italic.ttf")
  }

  @font-face {
    font-family: "Kollektif";
    font-weight: 700;
    src: url("../static/fonts/kollektif/kollektif-Bold.ttf")
  }

  @font-face {
    font-family: "Kollektif";
    font-weight: 700;
    font-style: italic;
    src: url("../static/fonts/kollektif/kollektif-BoldItalic.ttf")
  }

  body {
      /*background: $color-background;*/
      /*background: #efeff0;*/
  }

  p, a, h1, h2, h3, h4, h5, h6, h7, h8 {
      color: $color-dark;
      font-family: 'Kollektif';
  }
  .icon {
    color: $color-dark;
  }

  main {
    /*background-color: #efeff0;*/
  }

  .inverted-colors {
    background: $color-white;

    p, a, button, h1, h2, h3, h4, h5, h6, h7, h8, .icon {
        color: $color-black;
    }
  }
</style>








