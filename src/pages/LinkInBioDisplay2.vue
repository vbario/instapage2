<template>
  <div class="landing-wrapper df fdc aic f1 w100p"
      v-bind:style="">

    <div class="full-background" 
      v-bind:style="
        'background-image: url(' + (sellerData.banner ? sellerData.banner.url : '') + '); filter: blur(' + (sellerData.backgroundImageBlur || 0) + 'px); opacity: ' + (1 - parseInt(sellerData.backgroundImageFade || 0)/100) + '; left: -' + (sellerData.backgroundImageBlur || 0) + 'px; top: -' + (sellerData.backgroundImageBlur || 0) + 'px; width: calc(100% + 2 * ' + (sellerData.backgroundImageBlur || 0) + 'px); height: calc(100% + 2 * ' + (sellerData.backgroundImageBlur || 0) + 'px);'">
    </div>

    <div class="w100p profile-banner-background posrel" :style="'background-color: ' + (sellerData.selectedTheme === 0 ? '#fff' : '#000') + ';'">
    </div>

    <div class="w100p df fdc aic bottom-section" :class="{
      'theme-0': sellerData.selectedTheme === 0,
      'theme-1': sellerData.selectedTheme !== 0
    }">
      <div class="display-options df g20">
        <h4 class="button-3" @click="setDisplayStyle('list')">
          <i class="fa-solid fa-list"></i>
        </h4>
        <h4 class="button-3" @click="setDisplayStyle('grid')">
          <i class="fa-solid fa-grid"></i>
        </h4>
      </div>
      <div class="df fdc jcc aic z2">
        <img class="profile-image profile-image-s2" :src="sellerData.profileImageUrl ? sellerData.profileImageUrl.profileImageUrl : '../../static/images/user-solid.svg'">
        <h3 class="fz22p text-dark mt__ username-display">
          {{sellerData.displayName ? '@' + sellerData.displayName.displayName : ''}}
        </h3>
      </div>
      <div v-if="displayStyle == 'list'" class="link-in-bio-list-wrapper">
        <div class="link-in-bio-list">
          <div v-for="(product, p) in sellerData.items"
          class="link-in-bio-list-item df jcc aic fz20p posrel"
          :class="{
            'text-block': product.type == 'text',
            'link-in-bio-list-item-expanded': expandedListItems.indexOf(p) > -1,
          }"
          @click="goToLink(product.url, product.type == 'link', product.type == 'link' ? product.key : '')">

            <div class="w100p df fdc jcc aic" v-if="collectEmail !== product.productId">
              <img class="list-item-image" v-if="product.productImage || product.image" :src="product.productImage || product.image">
              <i class="fa-solid fa-box list-item-icon" v-else-if="product.productType == 'physical-product'"></i>
              <i class="fa-solid fa-download list-item-icon" v-else-if="product.productType == 'digital-download'"></i>
              <i class="fa-solid fa-bell-concierge list-item-icon" v-else-if="product.productType == 'digital-service'"></i>
              <i class="fa-solid fa-calendar-days list-item-icon" v-else-if="product.productType == 'calendar-event'"></i>
              <i class="fa-solid fa-link-simple list-item-icon" v-else-if="product.type == 'link'"></i>

              <p :class="{
                'color-white': product.type == 'text',
                'collect-email-title': product.productType == 'collect-email'
              }">{{product.title || product.text}}</p>


              <!-- <div class="w100p expanded-block">
                <div class="add-to-cart-wrapper-inner">
                  <div class="quantity df jcsb aic">
                    <p>
                      1 x 1kg (change)
                    </p>
                    <i class="fa-solid fa-chevron-down"></i>
                  </div>
                  <div class="quantity df jcsb aic">
                    <p>
                      Qty: 1
                    </p>
                    <i class="fa-solid fa-chevron-down"></i>
                  </div>
                  <h4 class="add-to-cart-button">
                    Add To Cart
                  </h4>
                </div>
              </div> -->
              
              <!-- <h4 v-if="(product.type == 'buy')" class="list-item-button button-1 button-smaller" @click="goTo('/' + $route.params.user + '/' + product.productId, product.key)">{{product.callToAction || 'Buy'}}</h4> -->

              <div v-if="(product.type == 'buy') && (product.productType !== 'collect-email')" class="add-to-cart-wrapper">
                <!-- <i class="fa-solid fa-chevron-down card-expand"></i> -->
                <div class="add-to-cart-wrapper-inner">
                  <div class="quantity df jcsb aic">
                    <p>
                      1 x 1kg &nbsp;<a class="green">change</a>
                    </p>
                    <i class="fa-solid fa-chevron-down"></i>
                  </div>
                  <!-- <div class="quantity df jcsb aic">
                    <p>
                      Qty: 1
                    </p>
                    <i class="fa-solid fa-chevron-down"></i>
                  </div> -->
                  <h4 class="add-to-cart-button tac">
                    Add To Cart
                  </h4>
                </div>
              </div>

              <h4 v-if="(product.type == 'buy') && (product.productType == 'collect-email')" class="list-item-button button-1 button-smaller" @click="startCollectEmail($event, product.productId)">{{product.callToAction || 'Join'}}</h4>
            </div>
            <div v-if="collectEmail == product.productId" class="list-collect-email w100p df jcsb aic">
              <input placeholder="Your email" class="your-email" v-model="yourEmail"/>
              <button v-if="submittingEmail" class="submit-email">
                <img class="spinner-x" src="../../static/images/pushable/loader-black-3.png">
              </button>
              <button v-else class="submit-email" @click="submitEmail()">Submit</button>
            </div>

          </div>
        </div>
      </div>
      <div v-if="displayStyle == 'grid'" class="link-in-bio-grid-wrapper">
        <div class="link-in-bio-grid">
          <div v-for="(product, p) in sellerData.items" class="link-in-bio-grid-item-wrapper df fdc" v-if="!product.deleted" :class="{'only-text-block': product.type == 'text'}" @click="cardClick(product.url || product.productId, product.type == 'link', product.type == 'text')"
          >
            <div @click="stopProp($event)" v-if="collectEmail == product.productId" class="grid-collect-email w100p df fdc jcsb aic">
              <input placeholder="Your email" class="your-email-grid" v-model="yourEmail"/>
              <button v-if="submittingEmail" class="submit-email-grid">
                <img class="spinner-x" src="../../static/images/pushable/loader-black-3.png">
              </button>
              <button v-else class="submit-email-grid" @click="submitEmail()">Submit</button>
            </div>
            <div v-else-if="product.productImage" class="link-in-bio-grid-item" v-bind:style="backgroundStyle(product.productImage)">
            </div>
            <div v-else-if="product.image" class="link-in-bio-grid-item" v-bind:style="backgroundStyle(product.image)">
            </div>
            <div v-else-if="product.productType == 'physical-product'" class="link-in-bio-grid-item link-in-bio-grid-item-default">
              <i class="fa-solid fa-box grid-item-icon"></i>
            </div>
            <div v-else-if="product.productType == 'digital-download'" class="link-in-bio-grid-item link-in-bio-grid-item-default">
              <i class="fa-solid fa-download grid-item-icon"></i>
            </div>
            <div v-else-if="product.productType == 'collect-email'" class="link-in-bio-grid-item link-in-bio-grid-item-default">
              <i class="fa-solid fa-envelope grid-item-icon"></i>
            </div>
            <div v-else-if="product.productType == 'digital-service'" class="link-in-bio-grid-item link-in-bio-grid-item-default">
              <i class="fa-solid fa-bell-concierge grid-item-icon"></i>
            </div>
            <div v-else-if="product.productType == 'calendar-event'" class="link-in-bio-grid-item link-in-bio-grid-item-default">
              <i class="fa-solid fa-calendar-days grid-item-icon"></i>
            </div>
            <div v-else-if="product.type == 'link'" class="link-in-bio-grid-item link-in-bio-grid-item-default">
              <i class="fa-solid fa-link-simple grid-item-icon"></i>
            </div>
            <div v-else-if="product.type == 'text'" class="link-in-bio-grid-item link-in-bio-grid-item-default text-block">
              <p>{{product.text}}</p>
            </div>


            <div class="link-in-bio-grid-item-text w100p df fdc jcsb f1" v-if="collectEmail !== product.productId">
              <p :style="product.type == 'buy' ? '' : ''" class="text-dark f1 fw500 link-in-bio-grid-item-title" @click="goToLink(product.url, product.type == 'link')">
                {{product.title}}
              <!-- <h4 v-if="(product.type == 'link') && (product.productType !== 'collect-email')" class="button-0 button-smaller" @click="cardClick(product.productId)">{{product.callToAction || 'See Item'}}</h4> -->
              </p>
              <h4 v-if="(product.type == 'buy') && (product.productType !== 'collect-email')"
                class="button-1 button-smaller"
                @click="cardClick(product.productId)">
                  {{product.callToAction || 'Add To Cart'}}
              </h4>
              <h4 v-if="(product.type == 'buy') && (product.productType == 'collect-email')" class="button-1 button-smaller" @click="startCollectEmail($event, product.productId)">{{product.callToAction || 'Join'}}</h4>
              <span class="buy-button"></span>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="df aic curp mt30 pushable-branding">
      <img class="header-logo" @click="goTo('/')" src="../../static/images/pushable/pushable-logo-5.png"/>
      <h1 class="logo-font text-primary-color" @click="goTo('/')">pushable</h1>
    </div>
    <div v-if="loading" class="loading-splash df fdc jcc aic">
      <img class="spinner-1 mb-spinner o-spinner" src="../../static/images/pushable/loader-black-3.png">
      <p>Loading</p>
    </div>

  </div>
</template>

<script>

import router from '@/router'
import paths from '@/util/paths'
import LandingProduct from '@/components/LandingProduct'

export default {
  name: 'LinkInBioDisplay2',
  data () {
    return {
      expandedListItems: [],
      submittingEmail: false,
      yourEmail: '',
      collectEmail: false,
      rootDomain: process.env.NODE_ENV == '' ? paths.devPath : paths.productionShortPath,
      balance: {},
      loading: true,
      income: [],
      displayStyle: 'grid',
      boxesAcross: 3,
      boxHeight: 250,
      sellerData: {
        loaded: false
      }
    }
  },
  props: ['mode'],
  components: {
    LandingProduct
  },
  methods: {
    backgroundStyle (imageUrl) {
      let style = `background-image: url('` + imageUrl + `');`
      console.log('background style', style)
      return style
    },
    stopProp (event) {
      event.stopPropagation()
    },
    submitEmail () {
      let productId = this.collectEmail
      let email = this.yourEmail
      let ownerId = this.sellerData.ownerId

      this.submittingEmail = true

      this.$store.dispatch('AUTH.submitEmail', {productId, email, ownerId}).then(async (res) => {
        console.log('submitEmail', res)
        if (res.status == '200') {
          this.collectEmail = false
          this.yourEmail = ''
        }
        this.submittingEmail = false
      })
    },
    cardClick (url, isLink, blockClick) {
      console.log('cardClick', url, isLink, blockClick)
      console.log('route', this.$route)
      let username = this.$route.params.user
      if (isLink) {
        this.goToLink(url, true)
      } else if (blockClick) {
        return false
      } else {
        this.goTo('/' + username + '/' + url)
      }
    },
    startCollectEmail (event, productId) {
      event.stopPropagation()
      console.log('startCollectEmail')
      this.collectEmail = productId
    },
    goTo (route, linkId) {
      router.push(route)

      if (linkId) {
        this.countLinkClick(linkId)
      }
    },
    goToLink (route, isLink, linkId) {
      console.log('goToLink', route, isLink, linkId)
      if (isLink) {
        let first7 = route.substring(0, 7)
        let first8 = route.substring(0, 8)
        if (first7 == 'http://') {
          window.location.assign(route)
        } else if (first8 == 'https://') {
          window.location.assign(route)
        } else {
          window.location.assign('https://' + route)
        }
      }

      if (linkId) {
        this.countLinkClick(linkId)
      }
    },
    myProductsList () {
      return JSON.parse(JSON.stringify(this.$store.getters['AUTH.myProductsList'] || {}))
    },
    setDisplayStyle (displayStyle) {
      this.displayStyle = displayStyle
    },
    startOnboarding () {
      this.$store.dispatch('AUTH.startOnboarding', {}).then(async (res) => {
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
    withdraw () {
      console.log('withdraw')
    },
    availableBalance () {
      let balance = this.balance
      let totals = {}
      for (let i in balance.available) {
        if (!totals[balance.available[i].currency]) {
          totals[balance.available[i].currency] = balance.available[i].amount
        } else {
          totals[balance.available[i].currency] = totals[balance.available[i].currency] + balance.available[i].amount
        }
      }
      return totals
    },
    pendingBalance () {
      let balance = this.balance
      let totals = {}
      for (let i in balance.pending) {
        if (!totals[balance.pending[i].currency]) {
          totals[balance.pending[i].currency] = balance.pending[i].amount
        } else {
          totals[balance.pending[i].currency] = totals[balance.pending[i].currency] + balance.pending[i].amount
        }
      }
      return totals
    },
    // balance () {
    //   let balance = 0
    //   let income = this.income
    //   for (let item in income) {
    //     let earned = income[item].order[0].earned ? parseFloat(income[item].order[0].earned) : parseFloat(income[item].order[0].price)
    //     balance = balance + earned
    //   } 
    //   return parseFloat(balance/100).toFixed(2)
    // },
    formatCurrency (c) {
      return c
    },
    formatDate (date) {

      Number.prototype.padLeft = function(base,chr){
         var  len = (String(base || 10).length - String(this).length)+1;
         return len > 0? new Array(len).join(chr || '0')+this : this;
      }

    var d = new Date(date),
        dformat = [ (d.getMonth()+1).padLeft(),
                    d.getDate().padLeft(),
                    d.getFullYear()].join('/')+
                    ' ' +
                  [ d.getHours().padLeft(),
                    d.getMinutes().padLeft()].join(':');

               return dformat
    },
    countStoreView () {
      this.$store.dispatch('AUTH.countStoreView', {}).then((res) => {
      })
    },
    countLinkClick (id) {
      console.log('countLinkClick')
      this.$store.dispatch('AUTH.countLinkClick', {id}).then((res) => {
      })
    },
    getStoreData () {
      this.$store.dispatch('AUTH.getStoreData', {
        sellerUsername: this.$route.params.user
      }).then((res) => {
        console.log('getStoreData response', res)
        let data = res || {}

        let items = res.items
        let array = []
        for (let i in items) {
          array.push({...items[i], key: i})
        }
        array = array.sort((a, b) => a.position - b.position)
        // add to array
        //sort array
        let _res = {...res, items: array}

        this.sellerData = {..._res, loaded: true}

        this.displayStyle = this.sellerData.displayStyle || 'grid'
        this.loading = false
      })
    },
    productTypeDisplay (type) {
      if (type == 'digital-download') {
        return 'Download'
      } else if (type == 'digital-service') {
        return 'Service'
      } else if (type == 'calendar-event') {
        return 'Calendar Invite'
      }
      return ''
    },
    setPageTitle () {
      const DEFAULT_TITLE = 'Some Default Title';
      router.afterEach((to, from) => {
        // Use next tick to handle router history correctly
        // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
        Vue.nextTick(() => {
          console.log('setPageTitle')
          document.title = to.meta.title || DEFAULT_TITLE;
        });
      });
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Link In Bio Display created')
    this.getStoreData()
    this.countStoreView()
    // this.setPageTitle()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  .landing-wrapper {
    padding: 19px;
    /*padding-top: 14px;*/
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    background-color: $light-grey;
    background-size: cover;
  }
  @media (max-width: 800px) {
    .landing-wrapper {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .landing-splash, .landing-choose-your-feel {
    width: 100%;
    max-width: 720px;
  }
  .landing-products {
    flex-wrap: wrap;
    max-width: 860px;
  }
  .balance {
    align-self: flex-start;
    margin-top: 18px;
    margin-bottom: 25px;

    p {
      color: #222;
      line-height: 1em;
      &:first-child {
        font-size: 45px;
        color: $color-primary;
      }

      &:last-child {
        margin-bottom: 8px;
        margin-left: 6px;
      }
    }
  }
  @media (max-width: 480px) {
    .balance {
      /*align-self: unset;*/
    }
  }
  .balance-text {
    margin-right: 10px
  }
  .balance-amount {

  }
  .income-row {
    min-width: 100px;
    margin-bottom: 10px;
    height: 32px;

    p {
      font-family: 'CA SaygonText', sans-serif;
      font-size: 14px;
      font-weight: 400;
    }

    .income-heading {
      flex: 1;
      margin-right: 20px;
      display: flex;
      align-items: center;

      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:nth-child(1) {
        width: 15%;
        max-width: 150px;
      }
      &:nth-child(2) {
        width: 15%;
      }
      &:nth-child(3) {
        width: 10%;
        max-width: 60px;
      }
      &:nth-child(4) {
        width: 15%;
        max-width: 200px;
      }
      &:nth-child(5) {
        width: 15%;
        max-width: 120px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .title-bar {
    margin-bottom: 16px;
  }
  .income-heading-row {
    margin-bottom: 20px;
    div {
      h3 {
        /*color: #5469d4;*/
        color: $color-primary;
        font-weight: 500;
      }
    }
  }
  .income-heading {
    .with-icon {
      align-self: center;
      justify-self: center;
      text-align: center;
    }
  }
  .icon-product {
    font-size: 24px;
  }

  h2 {

    font-weight: 700;
  }

  .balance, .bottom-section {
    /*padding-left: 19px;*/
    /*padding-right: 19px;*/
  }

  .bottom-section {
    /*max-width: calc(100vw - 20px);*/
    /*padding-top: 20px;*/
    /*max-width: 1000px;*/
  }

  @media (max-width: 980px) {
    .bottom-section {
      /*margin-bottom: 60px;*/
    }
  }

  .earned {
    margin-left: 15px;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    p {
      font-weight: 600;
      color: $color-primary;
    }
  }

  .mb_y {
    margin-top: 4px;
  }

  .mb_z {
    margin-bottom: 12px;
  }

  .order-number {
    p {
      font-size: 12px;
    }
  }
  .heading-pressed {
    letter-spacing: -0.01em;
  }
  .income-item-meta {
    font-size: 14px;
  }
  .superscript {
    margin-right: .15em;
    vertical-align: super;
    font-size: 60%;
  }
  .each-product-box {
    padding-left: 20px;
    padding-right: 20px;
    p {
      color: $color-background-dark;
    }

    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: 480px) {
    .each-product-box {
      flex-wrap: wrap;
     
      .earned {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
      }
    }
  }

  .new-product-icon {
    margin-right: 15px;
    color: $color-primary;
    background-color: $color-background-dark;
    height: 50px;
    width: 50px;
    min-height: 50px;
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-size: 34px;
    font-weight: 400;
    /*position: absolute;*/
    /*left: 0;*/
  }
  .active-product-icon {
    color: $color-yellow;
    /*color: #aaa;*/
  }

  .icon-1 {
    display: none;
  }

  $gap: 10px;


  @mixin flex-wrap-fix($flex-basis, $max-viewport-width: 800px) {
    flex-grow: 1;
    flex-basis: $flex-basis;
    max-width: 100%;

    $multiplier: 1;
    $current-width: 0px;

    @while $current-width < $max-viewport-width {
      $current-width: $current-width + $flex-basis;
      $multiplier: $multiplier + 1;

      @media(min-width: $flex-basis * $multiplier) {
        max-width: percentage(1/$multiplier);
      }
    }
  }

  .link-in-bio-list, .link-in-bio-grid {
    margin-top: 35px;
  }

  .link-in-bio-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    &-wrapper {
      width: 100%;
      max-width: 680px;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    &-item {
      width: 100%;
      max-width: 680px;
      min-height: 57px;
      background-color: #fff;
      border-radius: 14px;
      transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
      cursor: pointer;
      max-width: 600px;

      .expanded-block {
        display: none;
      }

      &-expanded {
        display: flex;
      }

      &:hover {
        transform: scale(1.02);
      }

      p {
        color: $color-background-dark;
      }

      & > div > p {
        font-size: 18px;
        text-align: center;
        max-width: calc(100% - 140px);
        margin-top: 16px;
        margin-bottom: 16px;
      }

      .collect-email-title {
        max-width: calc(100% - 180px);
      }

      .list-collect-email {
        & > input, & > button {
          height: 100% !important;
          min-height: 57px;
          margin: 0;
          border: none;
        }

        & > input {
          flex: 1;
          background-color: transparent;
          font-size: 18px;
          font-weight: 600;
        }

        & > button {
          flex: unset;
          width: unset;
          background-color: transparent;
          border-left: 2px solid #000;
          border-radius: 0;
          padding-left: 16px;
          padding-right: 16px;
          min-width: 82px;
        }
      }

      .grid-collect-email {
        flex: 1;
        & > input, & > button {
          height: 100% !important;
          min-height: 57px;
          margin: 0;
          border: none;
        }

        & > input {
          flex: 1;
          background-color: transparent;
          font-size: 18px;
          font-weight: 600;
        }

        & > button {
          flex: unset;
          width: unset;
          background-color: transparent;
          border-left: 2px solid #000;
          border-radius: 0;
          padding-left: 16px;
          padding-right: 16px;
          min-width: 82px;
        }
      }

      @media (max-width: 700px) {
        & > div > p {
          font-size: 16px;
        }
      }
    }
  }


  $grid-breakpoint-1: 600px;
  $grid-breakpoint-2: 768px;
  $grid-max-width: 1200px;

  $grid-item-wrapper-width-1: calc(50%);
  $grid-item-wrapper-width-2: calc(33.33%);
  $grid-item-wrapper-width-3: calc(25%);
  $grid-item-wrapper-width-4: calc(#{$grid-max-width} / 4);
  $grid-item-wrapper-height-1: calc(50vw - 7.5px);
  $grid-item-wrapper-height-2: calc(33.33vw - 5px);
  $grid-item-wrapper-height-3: calc(25vw - 4px);
  $grid-item-wrapper-height-4: calc(#{$grid-max-width} / 4);
  $grid-additional-height-1: 110px;
  $grid-additional-height-2: 120px;
  $grid-additional-height-3: 130px;
  $grid-additional-height-4: 140px;
  $grid-border-radius-1: 14px;
  $grid-border-radius-2: 14px;
  $grid-border-radius-3: 14px;

  $grid-gap-1: 10px;
  $grid-gap-2: 15px;
  $grid-gap-3: 20px;

  $grid-padding-1: 10px;
  $grid-padding-2: 15px;
  $grid-padding-3: 20px;

  $text-padding-1: 10px;

  $wrapper-padding: 6px;


  .link-in-bio-grid {
    width: 100%;
    z-index: 111;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    position: relative;
    gap: $grid-gap-1;
    padding-left: $grid-padding-1;
    padding-right: $grid-padding-1;

    &-wrapper {
      width: 100%;
      max-width: $grid-max-width;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    &-item {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: $color-white;
      cursor: pointer;
      height: calc(#{$grid-item-wrapper-height-1} - 20px);
      min-height: calc(#{$grid-item-wrapper-height-1} - 20px);
      max-height: calc(#{$grid-item-wrapper-height-1} - 20px);
      border-radius: $grid-border-radius-1;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;

      &-default {
        background-size: 50px;
      }


      &-wrapper {
        padding: $wrapper-padding;
        -webkit-box-shadow: 0 0 20px rgba(8, 21, 8, .1);
        box-shadow: 0 0 20px rgba(8, 21, 8, .1);
        background-color: #fff;
        border-radius: $grid-border-radius-1;
        width: calc(#{$grid-item-wrapper-width-1} - #{$grid-gap-1}/2);
        height: calc(#{$grid-item-wrapper-height-1} - #{$grid-gap-1}/2 - #{$grid-padding-1} + #{$grid-additional-height-1});
      
        &:hover {
          transform: scale(1.02);
        }

        .collect-email-title {
          max-width: calc(100% - 180px);
        }

        .grid-collect-email {
          flex: 1;
          & > input, & > button {
            height: 100% !important;
            min-height: 57px;
            margin: 0;
            border: none;
          }

          & > input {
            flex: 1;
            background-color: transparent;
            font-size: 18px;
            font-weight: 600;
          }

          & > button {
            flex: unset;
            width: 100%;
            background-color: transparent;
            border-top: 2px solid #000;
            border-radius: 0;
            padding-left: 16px;
            padding-right: 16px;
            height: 60px !important;
          }
        }
      }

      &-title {
        max-height: calc(100% - 30px - #{$text-padding-1} * 2);
        overflow-y: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: hidden;
      }

      &-text {
        padding: $text-padding-1 $text-padding-1;
        color: #000;
        max-height: calc(#{$grid-additional-height-1} - #{$wrapper-padding});
        height: calc(#{$grid-additional-height-1} - #{$wrapper-padding});
        min-height: calc(#{$grid-additional-height-1} - #{$wrapper-padding});
        overflow-y: hidden;

        p {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          /*text-align: center;*/
        }
      }
    }
  }

  @media (min-width: $grid-breakpoint-1) {
    .link-in-bio-grid {
      padding-left: $grid-padding-2;
      padding-right: $grid-padding-2;
      gap: $grid-gap-2;

      &-item {
        height: calc(#{$grid-item-wrapper-height-2} - 20px);
        min-height: calc(#{$grid-item-wrapper-height-2} - 20px);
        max-height: calc(#{$grid-item-wrapper-height-2} - 20px);
      /*border-radius: $grid-border-radius-2;*/
      /*border-top-left-radius: $grid-border-radius-2;*/
      /*border-top-right-radius: $grid-border-radius-2;*/

        &-wrapper {
          /*border-radius: $grid-border-radius-2;*/
          width: calc(#{$grid-item-wrapper-width-2} - #{$grid-gap-2}*(2/3));
          height: calc(#{$grid-item-wrapper-height-2} - #{$grid-gap-2}*(2/3) - #{$grid-padding-2}*(2/3) + #{$grid-additional-height-2});
        }

        &-title {
          max-height: calc(100% - 30px - #{$text-padding-1} * 2 - 6px);
          margin-bottom: 6px;
          overflow-y: hidden;
        }

        &-text {
          max-height: calc(#{$grid-additional-height-2} - #{$wrapper-padding});
          height: calc(#{$grid-additional-height-2} - #{$wrapper-padding});
          min-height: calc(#{$grid-additional-height-2} - #{$wrapper-padding});
        }
      }
    }
  }
  @media (min-width: $grid-breakpoint-2) {
    .link-in-bio-grid {
      padding-left: $grid-padding-3;
      padding-right: $grid-padding-3;
      gap: $grid-gap-3;

      &-item {
        height: calc(#{$grid-item-wrapper-height-3} - 20px);
        min-height: calc(#{$grid-item-wrapper-height-3} - 20px);
        max-height: calc(#{$grid-item-wrapper-height-3} - 20px);

        &-wrapper {
          border-radius: $grid-border-radius-3;
          width: calc(#{$grid-item-wrapper-width-3} - #{$grid-gap-3}*(3/4));
          height: calc(#{$grid-item-wrapper-height-3} - #{$grid-gap-3}*(3/4) - #{$grid-padding-3}*(2/4) + #{$grid-additional-height-3});
        }

        &-title {
          max-height: calc(100% - 30px - #{$text-padding-1} * 2 - 8px);
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: hidden;
        }

        &-text {
          max-height: calc(#{$grid-additional-height-3} - #{$wrapper-padding} * 2);
          height: calc(#{$grid-additional-height-3} - #{$wrapper-padding} * 2);
          min-height: calc(#{$grid-additional-height-3} - #{$wrapper-padding} * 2);
        }
      }
    }

  }
  @media (min-width: calc(#{$grid-max-width} + 2 * #{$grid-padding-3})) {
    .link-in-bio-grid {

      &-item {
        height: calc(#{$grid-item-wrapper-height-4} - #{$grid-padding-3});
        min-height: calc(#{$grid-item-wrapper-height-4} - #{$grid-padding-3});
        max-height: calc(#{$grid-item-wrapper-height-4} - #{$grid-padding-3});

        &-wrapper {
          border-radius: $grid-border-radius-3;
          width: calc(#{$grid-item-wrapper-width-4} - #{$grid-gap-3}*(3/4) - #{$grid-padding-3}*(2/4));
          height: calc(#{$grid-item-wrapper-height-4} - #{$grid-gap-3}*(3/4) - #{$grid-padding-3}*(2/4) + #{$grid-additional-height-4});
        }
        &-title {
          max-height: calc(100% - 30px - #{$text-padding-1} * 2);
          -webkit-line-clamp: 3;
        }
        &-text {
          max-height: calc(#{$grid-additional-height-4} - #{$wrapper-padding} - #{$grid-padding-3}*(2/4));
          height: calc(#{$grid-additional-height-4} - #{$wrapper-padding} - #{$grid-padding-3}*(2/4));
          min-height: calc(#{$grid-additional-height-4} - #{$wrapper-padding} - #{$grid-padding-3}*(2/4));
        }
      }
    }
  }
  .copy-link {
    color: $color-primary;
    border: 1px solid $color-primary;
    padding: 2px;
    border-radius: 5px;
    font-size: 12px;
    margin-left: 10px;
  }
  .add-list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #999;
  }
  .add-grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ddd;
  }
  .profile-image {
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    height: 106px;
    width: 106px;
    /*opacity: 0.6;*/
    border: 2px solid #000;
    background-color: #eaeaea;
  }

  @media (max-width: 800px) {
    .profile-image {
      width: 96px;
      height: 96px;
    }
  }

  .fz20p {
    font-size: 20px;
  }
  .fz22p {
    font-size: 22px;
  }
  .mt__ {
    margin-top: 12px;
  }

  .list-item-image {
    position: absolute;
    height: 48px;
    width: 48px;
    object-fit: cover;
    object-position: center;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 14px;
  }
  .profile-banner {
    height: 156px;
    min-height: 156px;
    margin-top: 30px;
    margin-bottom: 85px;
    background-size: cover;
    border-radius: 14px;
    z-index: 1;
    /*border-bottom-left-radius: 14px;*/
    /*border-bottom-right-radius: 14px;*/
  }
  .profile-banner-background {
    position: absolute;
    width: calc(100% + 38px);
    transform: translateX(-19px);
    height: 100%;
    z-index: 0;
  }
  .z2 {
    z-index: 2;
    /*position: absolute;*/
    /*left: 50%;*/
    /*top: 50%;*/
    /*top: calc(100% + 43px);*/
    /*transform: translate(-50%, -50%);*/
  }
  .list-item-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .grid-item-icon {
    font-size: 20px;
    /*position: absolute;*/
    /*left: 10px;*/
    /*top: 50%;*/
    /*transform: translateY(-50%);*/
  }
  .display-options {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    z-index: 5;
    padding-right: 15px;

    i {
      color: $color-background-dark !important;;
    }

    h4 {
      border-color: $color-background-dark !important;
      &:hover {
          border-color: $color-primary !important;
          i {
            /*color: $color-white !important;;*/
          }
      }
    }

  }


  @media (max-width: 800px) {
    .link-in-bio-grid {
      /*padding-left: $grid-padding-3;*/
      /*padding-right: $grid-padding-3;*/
    }
  }
  .profile-banner {
    position: absolute;
    height: 100vh;
    border-radius: 0;
    margin-top: 0;
    /*border-bottom-left-radius: 14px;*/
    /*border-bottom-right-radius: 14px;*/
  }
  .link-in-bio-list {
    z-index: 15;

    &-wrapper {
      max-width: unset;
    }
  }
  .link-in-bio-list {
    padding-left: 30px;
    padding-right: 30px;
  }
  .header-logo {
    z-index: 10;
    width: 48px;
    height: 41px;
    max-height: 41px;
    min-height: 41px;
    object-fit: contain;
    margin-right: 5px;
  }
  .logo-font {
    z-index: 10;
    transform: translateY(-2px);
    font-size: 25px;
  }

  @media (max-width: 400px) {
    .logo-font {
      /*display: none;*/
    }
  }
  .h1 {
    height: 1px !important;
    min-height: 1px !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .full-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1;
  }

  .theme-0 {
    .link-in-bio-list-item, .link-in-bio-grid-item {
      background-color: #444;
      p, i {
        color: #fff;
      }
    }
    .add-list-item, .add-grid-item {
      background-color: #00000088;
    }
    .link-in-bio-grid-item-wrapper {
      background: none;
      border: 2px solid #000;
    }
    .link-in-bio-grid-item-text {
      p {
        color: #000;
      }
    }
    .text-block {
      p {
        color: #000 !important;
      }
    }
    .submit-email {
      color: #fff;
    }
  }

  .theme-1 {
    .submit-email-grid {
      color: #fff !important;
      border-color: #fff !important;
    }
    .your-email-grid {
      color: #fff !important;
    }

    .username-display, .set-view {
      color: #fff;
    }
    .display-options, .profile-options {
      h4, p, i {
        border-color: #fff !important;
        color: #fff !important;
      }
    }
    .profile-image {
      border-color: #fff;
    }
    .link-in-bio-grid-item-wrapper {
      background: none;
      border: 2px solid #fff;
    }
    .link-in-bio-grid-item-text {
      p {
        color: #fff;
      }
    }
    .add-grid-item {
      p, i {
        color: #fff;
      }
    }
    .submit-email {
      color: #000;
    }
  }
  .text-block {
    background-color: transparent !important;
    p {
      font-size: 20px;
    }
  }
  .color-white {
    color: $color-white !important;
  }
  @media (max-width: 768px) {
    .link-in-bio-list {
      /*padding-left: 15px;*/
      /*padding-right: 15px;*/
    }
  }
  @media (max-width: 480px) {
    .link-in-bio-list {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
  .pushable-branding {
    transform: scale(0.8);
    z-index: 10;
  }
  .only-text-block {
    width: 100%;
    height: 40px !important;
    min-height: 40px !important;
    background-color: transparent !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border-color: transparent !important;

    .text-block {
      min-height: unset;
      max-height: unset;
    }

    .link-in-bio-grid-item-text {
      display: none;
      /*height: 40px !important;*/
      /*min-height: 40px !important;*/
      /*max-height: 40px !important;*/
    }

    .more-icon-grid {
      /*display: none;*/
    }

    .link-in-bio-grid-item {
      height: 100%;
    }
  }
  .spinner-x {
    height: 20px;
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

  .list-item-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    min-width: unset;
  }

  .add-to-cart {
    &-wrapper {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);

      .card-expand {
        transform: translateX(-4px);
        font-size: 16px;
      }

      &-inner {
        display: flex;
        flex-direction: column;

        .quantity {
          /*background-color: #eaeaea;*/
          padding: 4px 8px 4px 8px;
          border-radius: 10px;
          margin-bottom: 3px;
          p {
            font-size: 12px;
          }
          i {
            display: none;
            font-size: 10px;
            transform: translateY(-1px); 
          }
        }
      }
    }

    &-button {
      background-color: $color-primary;
      color: $color-background-dark;
      min-width: unset;
      font-size: 12px;
      font-weight: 400;
      padding: 4px 8px;
      border-radius: 10px;
    }
  }
  .green {
    color: $color-primary;
  }
  /*}*/
</style>
