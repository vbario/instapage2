<template>
  <div class="landing-wrapper df fdc aic f1 w100p">

    <div class="top-bar-global posrel w100p _position1 df jcfs aic only-big">
      <img @click="goTo('/more')" class="go-back-to-my-products curp" src="../../static/images/back.svg" >
      <h2 class="text-dark header-style header-style-big">Income</h2>
    </div>
    <hr class="divider">

    <div v-if="!($store.getters['AUTH.myConnectId'] && $store.getters['AUTH.myConnectId'].verified)" class="whole-page-box-global-2 whole-page-box-global-2-bigger w100p mb20 mt20 df jcfs">
      <div class="df aic">
        <h3 class="text-dark title-right">Start receiving money</h3>
        <h4 class="button-1 new-product-button" @click="openOnboardingPopup()">
            Go
        </h4>
      </div>
    </div>
    <div v-else-if="$store.getters['AUTH.myConnectId'] && !$store.getters['AUTH.myConnectId'].verified" class="whole-page-box-global-2 whole-page-box-global-2-bigger w100p mb20 mt20 df jcfs">
      <div class="title-box df">
        <h3 class="text-dark title-right">Complete onboarding to receive payments</h3>
        <h4 class="button-1 new-product-button" @click="openOnboardingPopup()">
            Continue
        </h4>
      </div>
    </div>

    <div class="whole-page-box-global w100p mb10 df jcc p30" v-if="$store.getters['AUTH.myConnectId'] && $store.getters['AUTH.myConnectId'].verified">
      <div class="title-box w100p df fdc">
        <!-- <div class="w100p df aic">
          <h1 class="title-right text-dark df">
            <span v-for="(amount, a) in this.availableBalance()" class="df">
              <span class="superscript">$</span>
              {{parseFloat(amount/100).toFixed(2)}}&nbsp;{{a.toString().toUpperCase()}}
            </span> on the way
          </h1>
          <h4 class="w100px button-3 new-product-button" @click="withdraw()">
              Withdraw
          </h4>
        </div> -->
        <div class="w100p df aic">
          <h5 class="w100p title-right">
            <span v-for="(amount, a) in this.pendingBalance()">
              <span class="superscript">$</span>&nbsp;{{a.toString().toUpperCase()}}</span>
              <span class="fw400 f_">pending payout</span>
          </h5>
          <!-- <h4 class="w100px button-3 new-product-button o0">
              Withdraw
          </h4> -->
        </div>
      </div>
    </div>

    
    <div class="df fdc w100p bottom-section">

      <div v-if="$store.getters['AUTH.myConnectId'] && $store.getters['AUTH.myConnectId'].verified" class="top-bar-global posrel w100p _position1 df jcsb aic">
        <h2 class="text-dark">Latest Payouts</h2>
      </div>

      <div v-if="$store.getters['AUTH.myConnectId'] && $store.getters['AUTH.myConnectId'].verified" class="w100p df fdc">
        <p class="text-dark">Your first payout will appear here.</p>
      </div>
      <!-- <div class="w100p df fdc">
        <div v-for="(item, i) in income" class="w100p df jcsb aic">
          <div class="f1 df aic jcc">
            <div class="df fdc h100p aifs f1 mb_">
              <div class="df aic g10_ f1 w100p stack">
                  <p class="text-dark">
                    Sent to RBC Account 3238979... on {{formatDate(item.created)}}
                  </p>
              </div>

              <div class="income-heading order-number">
                <p class="">
                </p>
              </div>
            </div>
          </div>
          <div class="earned df fdc jcc aic">
            <div class="df aic product-type-display">
              <p>
                <span class="superscript">$</span>{{formatCurrency(item.order[0].price)}}
              </p>
            </div>
          </div>
        </div>
      </div> -->

      <div class="top-bar-global posrel w100p _position1 df jcsb aic">
        <h2 class="text-dark">Sales</h2>
      </div>

      <div class="w100p df fdc">

        <div class="w100p df fdc" v-if="income.length == 0">
          <p class="text-dark">Sales will appear here.</p>
        </div>
        <div v-else v-for="(item, i) in income" class="w100p df fdc one-order">
          <div v-for="(one, o) in item.order" class="f1 df aic jcc one-item-in-order">
            <div class="df fdc aic jcc">
              <div class="df">
                <div v-if="one.productType == 'digital-download'" class="df product-type type-digital-download">
                  <!-- <i class="new-product-icon active-product-icon fal fa-arrow-to-bottom"></i> -->
                </div>
                <div v-if="one.productType == 'calendar-event'" class="df product-type type-calendar-event">
                  <!-- <i class="new-product-icon active-product-icon fal fa-calendar"></i> -->
                </div>
                <div v-if="one.productType == 'digital-service'" class="df product-type type-digital-service">
                  <!-- <i class="new-product-icon active-product-icon fal fa-concierge-bell"></i> -->
                </div>
              </div>
            </div>
            <div class="df fdc h100p aifs f1 mb_">
              <div class="df aic g10_ f1 w100p stack">
                <p class="text-dark f3">{{one.heading || one.title}}</p>
                <div class="income-heading order-number f2">
                  <p class="text-dark">
                    {{formatDate(item.created)}}
                  </p>
                </div>
              </div>

              <div class="income-heading order-number">
                <p class="">
                  <!-- M-{{item.orderId}} -->
                </p>
              </div>
            </div>
            <div class="earned df fdc jcc aic">
              <div class="df aic product-type-display">
                <p v-if="formatCurrency(one)">
                  <span class="superscript">$</span>{{formatCurrency(one)}}
                </p>
                <p v-else>
                  free
                </p>
              </div>
            </div>
          </div>
          <!-- <div class="earned df fdc jcc aic">
            <div class="df aic product-type-display">
              <p>
                <span class="superscript">$</span>{{formatCurrency(item.order[0].price)}}
              </p>
            </div>
          </div> -->
        </div>

      </div>

      <br/>

              <!-- <div class="income-heading ">
                <p class="with-icon">
                  <i v-if="item.order[0].productType == 'digital-service'" class="icon-bell icon icon-product"></i>
                  <i v-else-if="item.order[0].productType == 'digital-download'" class="icon-download icon icon-product"></i>
                  <i v-else-if="item.order[0].productType == 'calendar-event'" class="icon-calendar icon icon-product"></i>
                </p>
              </div> -->
<!--               <div class="income-heading">
                <p>
                  
                </p>
              </div> -->
              <!-- <div class="income-heading"> -->
<!--                 <p>
                  ${{item.order[0].earned ? formatCurrency(item.order[0].earned) : formatCurrency(item.order[0].price)}}
                </p> -->
              <!-- </div> -->
<!--       <div class="whole-page-box-global w100p df fdc">
        <div class="income-row income-heading-row df jcsb">
          <div class="income-heading">
            <h3>
              Order #
            </h3>
          </div>
          <div class="income-heading">
            <h3>
              Product
            </h3>
          </div>
          <div class="income-heading">
            <h3>
              Type
            </h3>
          </div>
          <div class="income-heading">
            <h3>
              Date
            </h3>
          </div>
          <div class="income-heading">
            <h3>
              Earned
            </h3>
          </div>
        </div>
        <div v-for="(item, i) in income" class="income-row df jcsb">
          <div class="income-heading">
            <p>
              {{item.orderId}}
            </p>
          </div>
          <div class="income-heading">
            <p>
              {{item.order[0].heading}}
            </p>
          </div>
          <div class="income-heading">
            <p class="with-icon">
              <i v-if="item.order[0].productType == 'digital-service'" class="icon-bell icon icon-product"></i>
              <i v-else-if="item.order[0].productType == 'digital-download'" class="icon-download icon icon-product"></i>
              <i v-else-if="item.order[0].productType == 'calendar-event'" class="icon-calendar icon icon-product"></i>
            </p>
          </div>
          <div class="income-heading">
            <p>
              {{formatDate(item.created)}}
            </p>
          </div>
          <div class="income-heading">
            <p>
              ${{item.order[0].earned ? formatCurrency(item.order[0].earned) : formatCurrency(item.order[0].price)}}
            </p>
          </div>
        </div>
      </div> -->

    </div>

    <div v-if="loading" class="loading-splash df fdc jcc aic">
      <img class="spinner-1 mb-spinner o-spinner" src="../../static/images/pushable/loader-black-3.png">
      <p>Loading</p>
    </div>

  </div>
</template>

<script>

import router from '@/router'
import LandingProduct from '@/components/LandingProduct'

export default {
  name: 'Income',
  data () {
    return {
      country: '',
      balance: {},
      loading: true,
      income: [],
      incomeLoaded: false,
      balanceLoaded: false
    }
  },
  props: ['mode'],
  components: {
    LandingProduct
  },
  methods: {
    openOnboardingPopup () {
      this.$store.dispatch('AUTH.setOnboardingPopup', {open: true})
    },
    goTo (route) {
      router.push(route)
    },
    startOnboarding () {
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
    formatCurrency (one) {
      if (one.productType == 'physical-product') {
        if (!one.newItemQuantity || !one.sizes) {
          return '-'
        }
        let q = one.newItemQuantity
        let s = one.sizes[one.newItemSize].price
        return parseFloat(q) * parseFloat(s)
      } else if (one.productType == 'calendar-event') {
        if (!one.newAppointment) {
          return '-'
        }
        return one.newAppointment.times[one.newAppointment.selectedAppointmentTime].price
      }
      return one.price
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

          let income = (res || []).sort((a, b) => {return b.created - a.created})

          this.income = income
          this.incomeLoaded = true
          if (this.balanceLoaded) {
            this.loading = false
          }
        })
      } else {
        console.log('wait')
        setTimeout(() => {
          this.getMyIncome()
        }, 100)
      }
    },
    getMyBalance () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyBalance', {}).then((res) => {
          console.log('balance', res)
          this.balance = res.data || {}
          this.balanceLoaded = true
          if (this.incomeLoaded) {
            this.loading = false
          }
        })
      } else {
        console.log('wait')
        setTimeout(() => {
          this.getMyBalance()
        }, 500)
      }
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
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Landing page created')
    this.getMyIncome()
    this.getMyBalance()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  .landing-wrapper {
    padding: 19px;
    padding-top: 0;
    background-color: $light-grey;
    /*background-color: #ddd;*/
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
    .bottom-section {
      margin-bottom: 60px;
    }
  }

  .earned {
    margin-left: 15px;
    width: 120px;
    height: 40px;
    /*border-radius: 5px;*/
    /*border: 1px solid #eaeaea;*/
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
    border: 1px solid $color-background-dark;
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

  .g10_ {
    gap: 10px;
  }

  @media (max-width: 800px) {
    .stack {
      flex-direction: column;
      align-items: flex-start;
    }
    .g10_ {
      gap: 0;
    }
    .mb_ {
      margin-bottom: 15px;
    }
    .earned {
      width: 50px;
      margin-left: 10px;
    }
  }

  .p30 {
    padding: 20px 30px;
  }

  .f_ {
    font-size: 16px;
  }

  .button-2 {
    border-color: $color-background-dark;
    color: $color-background-dark !important;
  }

  .m0z {
    /*margin-left: 0;*/
  }

  select, .button-1 {
    width: 240px;
  }

  .one-order {
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 20px;
    background-color: #eee;

    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
