<template>
  <div class="w100p whole-page df fdc jcsb">
    <div class="w100p df fdc jcsb aic posrel">
      <div class="hero-wrapper hero-wrapper-1 w100p df fdc aic mt10">
        <!-- <img class="landing-splash" @click="goTo('/')" src="../../static/instapage/full-page.svg"/> -->
        <h1 class="text-dark tac res-high">Turn a document into a website</h1>
        <h1 class="text-dark tac less-line-height res-low">Turn a document<br/>into a website</h1>
      </div>
    </div>

    <div class="hero-wrapper hero-wrapper-2 w100p df fdc aic mt50">
      <div class="start-here w100p">
        <DropzoneUploader
          :noEdit="true"
          :image="linkImage"
          :textOverride="'a document'"
          @uploadedImage="uploadedImage"
          @removeImage="removeImage"
        />
      </div>
      <div class="start-here w100p df jcc aic">
          <h4 class="button-0 res-0" @click="goToEditor()"><span class="t1"></span><span class="t2">start with an empty document</span></h4>
      </div>
    </div>

    <div class="f1"></div>

    <div class="w100p login-footer df jcc aic g40 mt30 mb30">
      <p class="text-dark">© 2024 Instapage.me</p>
      <!-- <a class="text-dark text-smaller" @click="goTo('/terms')">Terms</a>
      <a class="text-dark text-smaller" @click="goTo('/privacy')">Privacy Policy</a>
      <a class="text-dark text-smaller" href="mailto:info@pushableapp.com">Contact Us</a> -->
    </div>

    <div id="ooo"></div>
  </div>
</template>

<script>

import router from '@/router'
import DropzoneUploader from '@/components/common/DropzoneUploader'

export default {
  name: 'Login',
  data () {
    return {
      linkImage: '',
      loginMode: 'login',
      loading: false,
      email: '',
      password: '',
      password2: ''
    }
  },
  metaInfo: {
    // Children can override the title.
    title: 'Instapage.me - Make a one-page website in a minute',
    // Result: My Page Title ← My Site
    // If a child changes the title to "My Other Page Title",
    // it will become: My Other Page Title ← My Site
    // titleTemplate: '%s ← My Site',
    // Define meta tags here.
    meta: [
      {property: 'og:title', content: 'Instapage.me - Make a one-page website in a minute'},
      // {property: 'og:title', content: 'Plans ← My Site'},
      {property: 'og:site_name', content: 'Instapage.me'},
      // The list of types is available here: http://ogp.me/#types
      {property: 'og:type', content: 'website'},
      // {http-equiv: 'Content-Type', content: 'text/html; charset=utf-8'},
      // {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'description', content: 'Make a single website with a simple editor.'}
    ],
    link: [
      {rel: 'canonical', href: 'https://www.instapage.me'}
    ]
  },
  props: [],
  components: {
    DropzoneUploader
  },
  methods: {
    uploadedImage (data) {
      console.log('uploadedImage', data)
      let pageId = data.result.data.pageId
      let pageCode = data.result.data.pageCode
      this.goTo('/' + pageId + '/' + pageCode)
    },
    removeImage () {
      this.linkImage = ''
    },
    goTo (route) {
      router.push(route)
    },
    goToEditor () {
      this.$store.dispatch('AUTH.getNewPageId', {}).then((res) => {
        this.$emit('clearPage')
        let pageId = res.data.pageId
        let pageCode = res.data.pageCode
        this.goTo('/' + pageId + '/' + pageCode)
      })
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Landing page created')
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  .whole-page {
    margin-top: 95px;
    max-width: 1000px;
    padding-right: 30px;
    padding-left: 30px;
    min-height: calc(100vh - 95px);
  }

  .landing-splash {
    width: 100%;
    max-width: 600px;
    margin-top: 1vw;
  }

  .start-here {
    flex: 1;
  }

  .or {
    color: #000;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .button-1-2 {
    height: 100%;
    border-radius: 8px;
  }

  #ooo {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .hero-wrapper {
    max-width: 1000px;
  }
  .button-0 {
    margin-top: 40px;
    margin-bottom: 20px;
    height: unset;

    span.t1 {
      font-weight: 400;
    }
    span.t2 {
      font-weight: 400;
      text-decoration: underline;
    }
  }
  .res-high {

  }
  .res-low {
    display: none;
  }
  .less-line-height {
    line-height: 1.3em;
  }
  @media (max-width: 620px) {
    .res-high {
      display: none;
    }
    .res-low {
      display: flex;
    }
    .hero-wrapper-1 {
      margin-top: 5px;
    }
    .hero-wrapper-2 {
      margin-top: 40px;
    }
    .res-0 {
      margin-top: 30px;
    }
  }
</style>
