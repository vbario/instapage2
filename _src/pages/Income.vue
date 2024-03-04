<template>
  <div class="landing-wrapper df fdc aic f1 w100p">

    <div class="top-bar-global w100p _position1 df jcsb aic">
      <div class="breadcrumb df">
        <h2 class="breadcrumb-other" @click="goTo('/me')">Home</h2>
        <h2 class="breadcrumb-separator">/</h2>
        <h2>My Income</h2>
      </div>
      <div class="previews df jcsb aic">
<!--         <div class="df" v-if="uniqueProductId">
          <a>Link:</a>
          <a :href="'http://localhost:8080/pay/' + uniqueProductId" target="_blank">/pay/{{uniqueProductId}}</a>
        </div> -->
        <a class="balance-text">Balance:</a>
        <p class="balance-amount">${{balance()}}</p>
      </div>
    </div>

    <div class="whole-page-box-global w100p df fdc">
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
    </div>

  </div>
</template>

<script>

import router from '../router'
import LandingProduct from '@/components/LandingProduct'

export default {
  name: 'Income',
  data () {
    return {
      loading: false,
      income: []
    }
  },
  props: ['mode'],
  components: {
    LandingProduct
  },
  methods: {
    balance () {
      let balance = 0
      let income = this.income
      for (let item in income) {
        let earned = income[item].order[0].earned ? parseFloat(income[item].order[0].earned) : parseFloat(income[item].order[0].price)
        balance = balance + earned
      } 
      return parseFloat(balance/100).toFixed(2)
    },
    formatCurrency (c) {
      return (c/100).toFixed(2)
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
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Landing page created')
    this.getMyIncome()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  .landing-wrapper {
    padding: 30px;
    padding-top: 12px;
  }
  .landing-splash, .landing-choose-your-feel {
    width: 100%;
    max-width: 720px;
  }
  .landing-products {
    flex-wrap: wrap;
    max-width: 860px;
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
  .income-heading-row {
    margin-bottom: 20px;
    div {
      h3 {
        color: #5469d4;
        /*font-weight: 600;*/
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
</style>
