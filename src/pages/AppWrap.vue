<template>
  <div class="app-wrap df fdc jcsb aic">
    <span class="df aic copy-wrapper"
        :class="{'copied-store-link': showCopied}">
      <p class="copied tac">{{savedMessageOverride || 'saved'}}</p>
    </span>
    <LoginHeader
        v-if="(mode == 'login') || 
              (mode == 'editor') || 
              (mode == 'privacy') || 
              (mode == 'terms')"
        :mode ="mode"
        :pageContent="pageContent"
        :pagePublic="pagePublic"
        class="header"
        @savePage="savePage"
        @clearPage="clearPage"
        @publishPage="publishPage"
        @unpublishPage="unpublishPage"
        @refreshPage="refreshPage"/>
    <div class="f1 df fdc jcsb aic w100p posrel app-side">
      <Login v-if="mode == 'login'" @clearPage="clearPage" />
      <Editor
        v-if="mode == 'editor'"
        :pageContent="pageContent"
        :pageCreated="pageCreated"
        :ownerId="ownerId"
        :pagePublic="pagePublic"
        @editPageContent="editPageContent"
        @setPageContent="setPageContent" />
      <Page v-if="mode == 'page'" />
      <Privacy v-if="mode == 'privacy'" />
      <Terms v-if="mode == 'terms'" />
      <Start v-if="mode == 'start'" />

      <!-- <Product v-if="mode == 'product'" :feel="feelProduct" /> -->
      <!-- <Account v-if="mode == 'account'" /> -->
      <!-- <Admin v-if="mode == 'admin'" /> -->
      <!-- <Logout v-if="mode == 'logout'" /> -->
      <!-- <Plan v-if="mode == 'plan'" /> -->
      <!-- <Plans v-if="mode == 'plans'" /> -->
      <!-- <Faq v-if="mode == 'faq'" /> -->
    </div>
  </div>
</template>

<script>

import LoginHeader from './LoginHeader'
import Login from './Login'
import Editor from './Editor'
import Page from './Page'
import Start from './Start'

import Privacy from './Privacy'
import Terms from './Terms'

import common from '@/util/common'

export default {
  name: 'AppWrap',
  data () {
    return {
      pageContent: '',
      pageCreated: '',
      ownerId: '',
      pagePublic: '',
      showCopied: false,
      savedMessageOverride: ''
    }
  },
  props: ['mode', 'blog', 'page'],
  components: {
    LoginHeader,
    Login,
    Editor,
    Page,
    Start,
    Terms,
    Privacy
  },
  methods: {
    clearPage () {
       this.pageContent = ''
       this.pageCreated = ''
       this.ownerId = ''
       this.pagePublic = ''
    },
    editPageContent (htmlString) {
      this.pageContent = htmlString
    },
    setPageContent (res) {
      this.pageContent = res.htmlString
      this.pageCreated = res.created
      this.ownerId = res.ownerId
      this.pagePublic = res.published
    },
    savePage () {
      this.$store.dispatch('AUTH.savePage', {
        htmlString: this.pageContent,
        pageId: this.$route.params.pageid,
        pageCode: this.$route.params.pagecode
      }).then((res) => {
        console.log('res', res)
        if (res.data.status == 400) {
          this.flashSaved('Error saving: ' + res.data.message)
        } else {
          console.log('flash copied')
          this.flashSaved()
        }
      })

    },
    refreshPage () {
      let pageId = this.$route.params.pageid
      this.$store.dispatch('AUTH.getPage', pageId).then((res) => {
        if (res) {
          this.setPageContent(res)
        }
      })
    },
    publishPage () {
      this.$store.dispatch('AUTH.publishPage', {
        htmlString: this.pageContent,
        pageId: this.$route.params.pageid,
        pageCode: this.$route.params.pagecode
      }).then((res) => {
        console.log('res', res)
        if (res.data.status == 400) {
          this.flashSaved('Error publishing: ' + res.data.message)
        } else {
          console.log('flash copied')
          this.flashSaved('Published!')
          this.refreshPage()
        }
      })
    },
    unpublishPage () {
      this.$store.dispatch('AUTH.unpublishPage', {
        htmlString: this.pageContent,
        pageId: this.$route.params.pageid,
        pageCode: this.$route.params.pagecode
      }).then((res) => {
        console.log('res', res)
        if (res.data.status == 400) {
          this.flashSaved('Error unpublishing: ' + res.data.message)
        } else {
          console.log('flash copied')
          this.flashSaved('Unpublished!')
          this.refreshPage()
        }
      })
    },
    flashSaved (message) {
      this.savedMessageOverride = message
      this.showCopied = true
      setTimeout(() => {
        this.savedMessageOverride = ''
        this.showCopied = false
      }, 2000)
    },




    startOnboarding () {
      this.onboardError  = ''
      if (!this.country) {
        this.onboardError = 'Please select a country'
        return false
      }
      this.loadingOnboardingAction = true
      this.$store.dispatch('AUTH.startOnboarding', {country: this.country}).then(async (res) => {
        console.log('startOnboarding', res)
        if (res.url) {
          window.location = res.url
        }
      })
    },
    finishOnboarding () {
      // alert('Finish Onboarding')
      // this.$store.dispatch('AUTH.finishOnboarding', {}).then(async (res) => {
      //   console.log('finishOnboarding', res)
      //   if (res.url) {
      //     window.location = res.url
      //     // this.goTo(res.url)
      //   }
      // })
    },
    doGlobalAction (globalPopup) {
      let useSpinner = globalPopup.loadingSpinner
      let action = globalPopup.action
      if (useSpinner) {
        this.loadingGlobalAction = true
        action()
      }
    },
    doGlobalAction2 (globalPopup) {
      let action = globalPopup.action2
      console.log('action', action)
      action()
      this.closeGlobalPopup()
    },
    stopPropagation (event) {
      event.stopPropagation()
    },
    closeOnboardingPopup () {
      this.loadingOnboardingAction = false
      this.$store.dispatch('AUTH.setOnboardingPopup', {})
    },
    closeGlobalPopup () {
      this.loadingGlobalAction = false
      this.$store.dispatch('AUTH.setGlobalPopup', {})
    },
    setSidebarShown (v, m) {
      console.log('setSidebarShown', v, m)
      this.sidebarShown = v
    },
    checkIfSidebarShouldBeCollapsed () {
      let width = window.innerWidth
      let diff = this.lastWidth - width
      if (diff > 0) { // sizing down
        if ((width < 980) && (this.lastWidth >= 980)) {
          this.sidebarShown = false
        }
      } else {
        if ((this.lastWidth < 980) && (width >= 980)) {
          this.sidebarShown = true
        }
      }
      this.lastWidth = width
    },
    loadProduct () {
      let hash = this.$route.hash
      hash = hash.substring(1, hash.length)
      this.feelProduct = hash
    },
    loadPayoutCountries () {

      console.log('loadPayoutCountries')

      let isoCountryCodes = common.isoCountries
      let payoutCountries = common.payoutCountries.map((v) => {
        return {name: v, code: isoCountryCodes[v]}
      })
      this.payoutCountries = payoutCountries
    }
  },
  computed: {

  },
  watch: {
  },
  mounted () {
  },
  created () {
    // this.loadProduct()
    // this.loadPayoutCountries()
    // checkIfSidebarShouldBeCollapsed
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  .app-wrap {
    /*min-height: 100vh;*/
    /*max-width: $max-width;*/
    width: 100%;
  }

  .app-side {
    min-height: calc(100vh - 80px);
    width: 100%;
    background-color: #FFF;
  }

  .sidebar-bg {
    position: fixed;
    z-index: 100;
    background-color: #00000033;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
  }
  @media (max-width: 979px) {
    .app-side {
      /*margin-top: 80px;*/
    }
    /*.app-wrap {
      flex-direction: row;
    }
    .sidebar-bg {
      display: none;
    }*/
  }
  @media (min-width: 980px) {
    .app-side {
      /*max-width: calc(100% - 250px);*/
      /*margin-left: 250px;*/
    }
  }

  .no-top-margin {
    padding-top: 30px;
    padding-bottom: 30px;
    margin-top: 0;
    justify-content: center;
    width: 100% !important;
    max-width: 100% !important;
    margin-left: 0 !important;
  }

  .hu {
    height: unset;
  }

  .x-close {
    position: absolute;
  }
  .m0z {
    margin-left: 0 !important;
  }
  .mw_ {
    max-width: 300px;
  }
  .spinner-1 {
    width: 20px;
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

  .onboard-error {
    font-size: 14px;
    color: #C84545;
    /*margin-bottom: 20px;*/
  }

  .copy-wrapper {
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    position: fixed;
    width: 200px;
    height: 100px;
    z-index: 1111;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;

    .copied {
      display: none;
      position: relative;
      left: unset;
      top: 10px;
      transform: unset;
      transform: translateY(-50%);
      color: #333;
      font-size: 12px;
      font-weight: 200;
      background-color: #eee;
      border-radius: 8px;
      padding: 4px 12px;
    }
  }

  .copy-store-link {
    position: relative;
    transform: translateY(-0.5px);
    margin-left: 4px;
    cursor: pointer;
    width: 16px;
  }

  .copied-store-link {
    /*position: relative;*/
    .copied {
      display: block;
      /*display: none;*/
    }
  }

  /*@media (max-width: 480px) {
    .app-side {
      margin-top: 80px;
    }
  }*/
</style>
