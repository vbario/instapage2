<template>
  <div class="landing-wrapper df fdc f1" v-if="($store.getters['AUTH.myInfo'] && ($store.getters['AUTH.myInfo'].loaded && !$store.getters['AUTH.myInfo'].displayName))">
    <!-- <div class="top-bar-global posrel w100p _position1 df jcsb aic">
      <h2 class="text-dark">Link-In-Bio</h2>
      <div class="df">
        <a class="copy-link" @click="goTo('/tester')">see it live</a>
        <a class="copy-link" @click="copyLink($event, rootDomain + '/tester')">copy link</a>
      </div>
      <div class="f1"></div>
      <div class="display-options df g20">
        <h4 class="button-3" @click="setDisplayStyle('list')">List</h4>
        <h4 class="button-3" @click="setDisplayStyle('grid')">Grid</h4>
      </div>
    </div> -->
    <div class="df fdc bottom-section mt30">

      <a class="sidebar-top df mb20 responsive-1">
        <div class="df jcc aic" @click="goTo('/')">
          <img class="header-logo" src="../../static/images/pushable/pushable-logo-5.png"/>
          <h1 class="logo-font text-primary-color">pushable</h1>
        </div>
      </a>

      <div class="w100p w400max df fdc jcc">
        <h1 class="text-dark">
          Choose a username<br/>to start
        </h1>
        <h3 class="text-dark mt20 mb10">Username</h3>
        <div class="w100p df jcsb posrel">
          <div class="w100p df fdc">
            <input v-model="newUsername" @input="setCheckInterval()" type="text" name="" class="mt5 mb0" placeholder="Your Username">
            <p v-if="notAvailableMessage" class="username-not-available">This username is unavailable. Try again!</p>
          </div>
          <span class="checking" v-if="checkingUsername">
            <img class="spinner-1" src="../../static/images/pushable/loader-black.png">
          </span>
          <span class="checking" v-if="newUsernameIsAvailable">
            <img class="check-ok" src="../../static/images/pushable/check.svg">
          </span>
        </div>
        <span>
          <a class="button-1 mt20" :class="{'disabled-save' : !newUsernameIsAvailable}" @click="save()">
            {{ savingUsername ? '' : 'Select username' }}
            <img v-if="savingUsername" class="spinner-1" src="../../static/images/pushable/loader-black.png">
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

import router from '@/router'
import paths from '@/util/paths'
import LandingProduct from '@/components/LandingProduct'

export default {
  name: 'PickAUsername',
  data () {
    return {
      rootDomain: process.env.NODE_ENV == '' ? paths.devPath : paths.productionPath,
      balance: {},
      loading: false,
      income: [],
      displayStyle: 'grid',
      boxesAcross: 3,
      boxHeight: 250,
      showCopied: false,
      fullName: '',
      displayName: '',
      profileImageUrl: '',
      addNewItem: false,
      activated: false,
      newUsername: '',
      checkingUsername: false,
      newUsernameIsAvailable: false,
      notAvailableMessage: false,
      typingTimer: {},
      savingUsername: false
    }
  },
  props: ['mode'],
  components: {
    LandingProduct
  },
  methods: {
    activate () {
      console.log('activate')
      this.$store.dispatch('AUTH.activateMyStore', {}).then((res) => {
        console.log('after activateMyStore', res)
      })
    },
    save () {
      if (!this.checkingUsername) {
        this.savingUsername = true
        console.log('save')
        let profileObject = {
          displayName: this.newUsername,
        }
        this.$store.dispatch('AUTH.saveProfile', profileObject).then((res) => {
          console.log('after saveProfile', res)
          this.activate()
        })
      }
    },
    activate () {
      let storeObject = {
          defaultStyle: 'list',
          fixedStyle: false,
          selectedTheme: 1,
          items: [],
          links: [
            {
              "heading": "Join mailing list",
              "type": "mailing-list"
            },
            {
              "heading": "Contact",
              "type": "contact"
            }
          ]
      }
      this.$store.dispatch('AUTH.activateMyStore', storeObject).then((res) => {
        console.log('activateMyStore result', res)
        this.goTo('/' + this.newUsername)
      })
    },
    stopAddingAnotherItem (event) {
      event.stopPropagation()
      this.addNewItem = false
    },
    startAddingAnotherItem () {
      if (!this.addNewItem) {
        this.addNewItem = true
      }
    },
    addItemType (type) {
      console.log('addItemType', type)
      // router.push(route)
    },
    goTo (route) {
      console.log('route', route)
      router.push(route)
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
    getMyIncome () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyIncome', {}).then((res) => {
          console.log('income', res)
          this.income = res
        })
      } else {
        setTimeout(() => {
          this.getMyIncome()
        }, 500)
      }
    },
    getMyBalance () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyBalance', {}).then((res) => {
          console.log('balance', res)
          this.balance = res.data || {}
        })
      } else {
        console.log('wait')
        setTimeout(() => {
          this.getMyBalance()
        }, 500)
      }
    },
    setCheckInterval () {
      this.checkingUsername = true
      this.newUsernameIsAvailable = false
      this.notAvailableMessage = false
      clearInterval(this.typingTimer)
      this.typingTimer = setTimeout(() => {
        this.checkUsername()
      }, 700)
    },
    checkUsername () {
      this.$store.dispatch('AUTH.checkUsername', {username: this.newUsername}).then((res) => {
        if (res.data.usernameIsAvailable) {
          this.newUsernameIsAvailable = true
        } else {
          this.newUsernameIsAvailable = false
          this.notAvailableMessage = true
        }
        this.checkingUsername = false
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
    copyLink (e, link) {
      e.stopPropagation()
      this.flashCopied()
      navigator.clipboard.writeText(link);
    },
    flashCopied () {
      this.showCopied = true
      setTimeout(() => {
        this.showCopied = false
      }, 1000)
    },
    loadProfile () {
      if (this.$store.getters['AUTH.myInfo'] && this.$store.getters['AUTH.myPrivateInfo']) {
        // this.fullName = this.$store.getters['AUTH.myPrivateInfo'].fullName.fullName
        this.displayName = this.$store.getters['AUTH.myInfo'] && this.$store.getters['AUTH.myInfo'].displayName && this.$store.getters['AUTH.myInfo'].displayName.displayName
        console.log('private info', this.$store.getters['AUTH.myPrivateInfo'])
        console.log('my info', this.$store.getters['AUTH.myInfo'])
        this.profileImageUrl = this.$store.getters['AUTH.myPrivateInfo'].profileImageUrl ? this.$store.getters['AUTH.myPrivateInfo'].profileImageUrl.profileImageUrl : ''
        // this.profileImageUrl = this.$store.getters['AUTH.myPrivateInfo'].profileImageUrl.profileImageUrl
      } else {
        setTimeout(() => {
          this.loadProfile()
        }, 500)
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    window.scrollTo(0, 0)
    console.log('* Landing page created')
    // this.getMyIncome()
    // this.getMyBalance()
    this.loadProfile()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  .landing-wrapper {
    padding: 19px;
    padding-top: 14px;
    padding-top: 0;
    background-color: $light-grey;
    position: absolute;
    width: 100%;
    height: 100%;
    padding-left: 60px;
    /*left: 60px;*/
    top: 0;
    z-index: 100000;
  }
  @media(max-width: 980px) {
    .landing-wrapper {
    }
  }
  @media(max-width: 640px) {
    .landing-wrapper {
      padding-left: 30px;
    }
  }
  @media(max-width: 480px) {
    .landing-wrapper {
      padding-top: 0;
      padding-left: 19px;
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
    /*padding-top: 20px;*/
    background-color: $light-grey;
  }

  @media (max-width: 980px) {
    .responsive-1 {
      display: none;
    }
    .bottom-section {
      margin-bottom: 60px;
      margin-top: 110px;
    }
  }
  @media (max-width: 640px) {
    .bottom-section {
      margin-top: 100px;
    }
  }
  @media (max-width: 480px) {
    .bottom-section {
      /*margin-top: 40px;*/
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
    }
    &-item {
      width: 100%;
      height: 57px;
      background-color: #CCC;
      border-radius: 14px;
      transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
      cursor: pointer;

      &:hover {
        transform: scale(1.02);
      }
    }
  }
  .link-in-bio-grid {
    display: flex;
    /*justify-content: center;*/
    flex-wrap: wrap;
    /*gap: $gap;*/

    &-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &-item {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
      height: 200px;
      cursor: pointer;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;

      &:hover {
        transform: scale(1.02);
      }

      &-wrapper {
        min-width: 150px;
        @include flex-wrap-fix(225px);
        /*width: calc(25% - #{$gap} * .75);*/
        /*flex-grow: 1;*/
        /*flex-shrink: 1;*/
        /*flex-basis: 0;*/
        /*flex: 1;*/
        /*min-width: 180px;*/
        /*max-width: 275px;*/
        height: 275px;
        min-height: 275px;
        padding: 5px;
      }

      &-text {
        padding: 5px 5px;
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
    background-color: #eee;
  }
  .profile-image {
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    height: 106px;
    width: 106px;
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
    margin-top: 18px;
  }

  .list-item-image {
    position: absolute;
    height: 40px;
    width: 40px;
    object-fit: cover;
    object-position: center;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .list-item-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .fz__ {
    font-size: 14px;
  }

  .add-icon {
    width: 30px;
  }

  .add-icon-2 {
    width: 28px;
  }

  .ml__ {
    margin-left: 8px;
  }
  .w400max {
    max-width: 400px;
  }
  .disabled-save {
    opacity: 0.5;
  }
  .checking {
    position: absolute;
    width: 20px;
    right: 9px;
    top: 50%;
    transform: translateY(calc(-50% + 1px));
  }
  .mb0 {
    margin-bottom: 0 !important;
  }
  .check-ok {
    width: 16px;
  }
  .spinner-1 {
    width: 16px;
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

  .username-not-available {
    font-size: 14px;
    color: $color-background-dark;
    margin-top: 5px;
  }
  .header-logo {
    width: 32px;
    height: 41px;
    max-height: 41px;
    min-height: 41px;
    object-fit: contain;
    margin-right: 7px;
  }
  .logo-font {
    transform: translateY(-2px);
    font-size: 25px;
  }

</style>
