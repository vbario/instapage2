<template>
  <div class="landing-wrapper df fdc aic f1 w100p">

    <div class="top-bar-global posrel w100p _position1 df jcfs aic">
      <img @click="goTo('/more')" class="go-back-to-my-products curp" src="../../static/images/back.svg" >
      <h2 class="text-dark">Inventory</h2>
    </div>
    
    <div class="df fdc w100p bottom-section">

      <div class="w100p df fdc">

        <p class='text-dark'>Inventory</p>

      </div>

      <br/>

    </div>

  </div>
</template>

<script>

import router from '@/router'
import LandingProduct from '@/components/LandingProduct'

export default {
  name: 'Inventory',
  data () {
    return {
      balance: {},
      loading: false,
      income: []
    }
  },
  props: ['mode'],
  components: {
    LandingProduct
  },
  methods: {
    goTo (route) {
      router.push(route)
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
        console.log('wait')
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
    // get my inventory #s (/inventory/:productId/{available: Positive Integer})
    // for every physical procut that I have, show inventory
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
</style>
