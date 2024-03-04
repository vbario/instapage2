<template>
  <div class="landing-wrapper df fdc aic f1 w100p">

    <div class="top-bar-global w100p _position1 df jcsb aic">
      <div class="breadcrumb df">
        <h2 class="breadcrumb-other" @click="goTo('/me')">Home</h2>
        <h2 class="breadcrumb-separator">/</h2>
        <h2>New Product</h2>
      </div>
    </div>

    <div class="df jcsb w100p new-product">
      <div class="whole-page-box-global new-product-wrap f1 df fdc aic jcc" @click="newProduct('digital-download')">
        <h3 class="tac w100p">Sell A Digital Download</h3>
      </div>
      <div class="whole-page-box-global new-product-wrap f1 df fdc aic jcc" @click="newProduct('digital-service')">
        <h3 class="tac w100p">Sell A Digital Service</h3>
      </div>
      <div class="whole-page-box-global new-product-wrap f1 df fdc aic jcc" @click="newProduct('calendar-event')">
        <h3 class="tac w100p">Sell A Calendar Appointment</h3>
      </div>
    </div>


    <div class="top-bar-global w100p _position1 df jcsb aic">
      <h2>My Products</h2>
    </div>

    <div class="whole-page-box-global w100p df fdc"
          @click="goToProduct(product)"
          v-for="(product, i) in $store.getters['AUTH.myProductsList']"
          v-if="!product.deleted">
      <!-- <p class="icon">=></p> -->
      <p class="curp one-product df">
        <i v-if="product.type == 'digital-service'" class="icon-bell icon icon-product"></i>
        <i v-else-if="product.type == 'digital-download'" class="icon-download icon icon-product"></i>
        <i v-else-if="product.type == 'calendar-event'" class="icon-calendar icon icon-product"></i>
        <div class="h3wrap">
          <h3>
            {{product.name}}
          </h3>
        </div>
        <p class="df jcfe created">Created {{formatDate(product.created)}}</p>
        <!-- <p>{{productTypeDisplay(product.type)}}</p> -->
      </p>
    </div>

  </div>
</template>

<script>

import router from '../router'
import LandingProduct from '@/components/LandingProduct'

export default {
  name: 'Products',
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
    newProduct (product) {
      this.goTo('/add/' + product)
    },
    goTo (route) {
      router.push(route)
    },
    goToProduct (product) {
      let path = '/add/' + product.type + '/' + product.internalId
      router.push(path)
    },
    productTypeDisplay (type) {
      // let type = this.productType
      if (type == 'digital-download') {
        return 'Digital Download'
      } else if (type == 'digital-service') {
        return 'Service'
      } else if (type == 'calendar-event') {
        return 'Calendar Invite'
      }
      return ''
    },
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
  h3 {
    color: #5469d4;
  }
  .icon-product {
    color: #5469d4;
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
  .one-product {
    h3 {
      margin-left: 8px;
    }
  }
  .whole-page-box-global {
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;

    &:hover {
      background-color: #5469d4;
      border: none;

      h3, .icon-product, p {
        color: white;
      }
    }

    &:last-child {
      margin-right: 0;
    }

    &:last-child {
      /*margin-bottom: 0;*/
    }
  }
  .new-product-wrap {

  }
  .created {
    font-size: 14px;
    margin-left: 20px;
  }
  .new-product {
    & > div {
      border: 2px solid #5469d4;
      height: 120px;
      margin-right: 20px;
      &:hover {
        border: 2px solid transparent;
        h3 {
          /*font-size: 18px;*/
        }
      }
    }
  }
  .h3wrap {
    /*width: 100%;*/
    flex: 1;

    h3 {
      margin-left: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
