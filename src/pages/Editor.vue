<template>
  <div class="w100p whole-page df fdc jcsb">
    <!-- <div class="w100p df fdc jcsb aic posrel">
      <div class=" w100p df fdc aic">
        <img class="landing-splash" @click="goTo('/')" src="../../static/instapage/full-page.svg"/>
      </div>
    </div> -->

    <div class="w100p df fdc aic mt10 mb10 h_">
      <wysiwyg class="f1" v-model="xPageContent" @input="editPageContent" />
    </div>

    <div class="f1"></div>

    <div class="w100p login-footer df jcc aic g40 mt30 mb30">
      <p class="text-dark">© 2024 Instapage.me</p>
      <!-- <a class="text-dark text-smaller" @click="goTo('/terms')">Terms</a>
      <a class="text-dark text-smaller" @click="goTo('/privacy')">Privacy Policy</a>
      <a class="text-dark text-smaller" href="mailto:info@pushableapp.com">Contact Us</a> -->
    </div>
  </div>
</template>

<script>
import router from '@/router'
import DropzoneUploader from '@/components/common/DropzoneUploader'

export default {
  name: 'Editor',
  data () {
    return {
      xPageContent: ''
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
  props: ['pageContent', 'pageCreated', 'ownerId', 'pagePublic'],
  components: {
    DropzoneUploader
  },
  methods: {
    editPageContent (event) {
      this.$emit('editPageContent', event.target.value)
    },
    uploadedImage (data) {
      console.log('setting url', data.url)
      this.linkImage = data.url
    },
    removeImage () {
      console.log('removing image')
      this.linkImage = ''
    },
    goTo (route) {
      router.push(route)
    },
    getPage (pageId) {
      this.$store.dispatch('AUTH.getPage', pageId).then((res) => {
        if (res) {
          this.$emit('setPageContent', res)
        }
      })
    }
  },
  computed: {
  },
  watch: {
    'pageContent': {
      handler: function (pageContent) {
        this.xPageContent = pageContent
      },
      immediate: true
    },
    'xPageContent': {
      handler: function (pageContent) {
        this.editPageContent({target: {value: pageContent}})
      },
      immediate: true
    },
  },
  mounted () {
    let pageId = this.$route.params.pageid
    this.getPage(pageId)
  },
  created () {
    let pageId = this.$route.params.pageid
    this.getPage(pageId)
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";
  @import "../styles/wysiwyg.css";

  .whole-page {
    margin-top: 95px;
    max-width: 1000px;
    padding-right: 30px;
    padding-left: 30px;
    min-height: calc(100vh - 95px);
  }

  .landing-splash {
    width: 100%;
    margin-top: 1vw;
  }

  .start-here {
    height: 180px;
    flex: 1;
  }

  .or {
    color: #000;
    margin-left: 20px;
    margin-right: 20px;
  }
  .button-1-2 {
    height: 100%;
    border-radius: 8px;
  }
  .h_ {
    height: 100%;
  }
</style>
