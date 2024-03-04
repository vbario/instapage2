<template>
  <div class="landing-wrapper df fdc aic f1 w100p">

    <div class="top-bar-global w100p _position1 df jcsb aic">
      <div class="breadcrumb df">
        <h2 class="breadcrumb-other" @click="goTo('/me')">Home</h2>
        <h2 class="breadcrumb-separator">/</h2>
        <h2>Fulfill Orders</h2>
      </div>
      <div class="archived df jcsb aic">
        <input type="checkbox" v-model="showArchived" name="">
        <a class="balance-text">show archived</a>
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
            Placed
          </h3>
        </div>
        <div class="income-heading">
          <h3>
            Product
          </h3>
        </div>
        <div class="income-heading">
          <h3>
            Customer
          </h3>
        </div>
        <div class="income-heading">
          <h3>
            
          </h3>
        </div>
      </div>
      <div v-for="(item, i) in fulfillments" 
      class="income-row df jcsb" 
      v-if="(item.order[0].productType == 'digital-service') && (!item.archived || showArchived)">
        <div class="income-heading">
          <p>
            {{item.orderId}}
          </p>
        </div>
        <div class="income-heading f1">
          <p>
            {{formatDate(item.created)}} ago
          </p>
        </div>
        <div class="income-heading">
          <p>
            {{item.order[0].heading}}
          </p>
        </div>
        <div class="income-heading">
          <p>
            {{item.fulfillmentDetails.email}}
          </p>
        </div>
        <div class="income-heading">
          <button class="fulfill-button"
                v-if="item.status !== 'fulfilled'"
                @click="showDigitalServiceFulfillMenu(item)"
                >
            Fulfill
          </button>
          <p v-else-if="item.archived">archived - <span @click="deleteProduct(item.orderId, true)">unarchive</span></p>
          <p v-else="">fulfilled (<span @click="unfulfill(item.orderId)">unfulfill</span>, <span @click="deleteProduct(item.orderId)">archive</span>)</p>
        </div>
      </div>
    </div>
    <div class="top-bar-global w100p _position2 df jcsb aic">
      <h2>Calendar Events</h2>
      <div class="previews df jcsb aic">
<!--         <div class="df" v-if="uniqueProductId">
          <a>Link:</a>
          <a :href="'http://localhost:8080/pay/' + uniqueProductId" target="_blank">/pay/{{uniqueProductId}}</a>
        </div> -->
        <!-- <a class="balance-text">Balance:</a> -->
        <!-- <p class="balance-amount">$54.00</p> -->
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
            Placed
          </h3>
        </div>
        <div class="income-heading">
          <h3>
            Product
          </h3>
        </div>
        <div class="income-heading">
          <h3>
            Customer
          </h3>
        </div>
        <div class="income-heading">
          <h3>
            
          </h3>
        </div>
      </div>
      <div v-for="(item, i) in fulfillments" class="income-row df jcsb" v-if="(item.order[0].productType == 'calendar-event') && (!item.archived || showArchived)">
        <div class="income-heading">
          <p>
            {{item.orderId}}
          </p>
        </div>
        <div class="income-heading">
          <p>
            {{formatDate(item.created)}} ago
          </p>
        </div>
        <div class="income-heading">
          <p>
            {{item.order[0].heading}}
          </p>
        </div>
        <div class="income-heading">
          <p>
            {{item.fulfillmentDetails.email}}
          </p>
        </div>
        <div class="income-heading">
          <button class="fulfill-button"
                v-if="item.status !== 'fulfilled'"
                @click="showCalendarFulfillMenu(item)"
                >
            Fulfill
          </button>
          <p v-else-if="item.archived">archived - <span @click="deleteProduct(item.orderId, true)">unarchive</span></p>
          <p v-else="">fulfilled (<span @click="unfulfill(item.orderId)">unfulfill</span>, <span @click="deleteProduct(item.orderId)">archive</span>)</p>
        </div>


      </div>
    </div>

  </div>
</template>

<script>

import router from '../router'
import LandingProduct from '@/components/LandingProduct'

export default {
  name: 'Fulfillment',
  data () {
    return {
      showArchived: false,
      loading: false,
      fulfillments: [],
      digitalServiceFulfillMenu: false
    }
  },
  props: ['mode'],
  components: {
    LandingProduct
  },
  methods: {
    unfulfill (orderId) {
      this.$store.dispatch('AUTH.unfulfill', {orderId}).then((res) => {
        console.log('Product unfulfilled', res)
        this.getMyFulfillments()
        // this.deleted = true
      })
    },
    deleteProduct (orderId, undelete) {
      this.$store.dispatch('AUTH.deleteFulfilledProduct', {orderId, undelete: undelete || null}).then((res) => {
        console.log('Product archived', res)
        this.getMyFulfillments()
        // this.deleted = true
      })
    },
    formatCurrency (c) {
      return (c/100).toFixed(2)
    },
    showCalendarFulfillMenu (v) {
      let then = () => {
        console.log('test')
        this.getMyFulfillments()
      }
      this.$store.dispatch('AUTH.setFulfillmentMenu', {v, then})
    },
    showDigitalServiceFulfillMenu (v) {
      let then = () => {
        console.log('test')
        this.getMyFulfillments()
      }
      this.$store.dispatch('AUTH.setFulfillmentMenu', {v, then})
    },
    formatDate (date) {

      let d = new Date(date)

      function timeSince(_date) {

        var seconds = Math.floor((new Date() - _date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
      }

      return timeSince(d)
    },
    getMyFulfillments () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyFulfillments', {}).then((res) => {
          console.log('fulfillments', res)
          this.fulfillments = res
        })
      } else {
        console.log('wait')
        setTimeout(() => {
          this.getMyFulfillments()
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
    this.getMyFulfillments()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";
  ._position2 {
    margin-top: 18px;
  }

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
      display: flex;
      align-items: center;
      margin-right: 20px;

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
        max-width: 150px;
      }
      &:nth-child(3) {
        width: 25%;
        max-width: 350px;
        flex: 1;
      }
      &:nth-child(4) {
        /*width: 20%;*/
        /*max-width: 120px;*/
        width: 180px;
        flex: unset;
        p {
          font-size: 12px;

          span {
            color: $color-primary;
            cursor: pointer;

            &:hover {
              text-decoration: underline;
            }
          }
        }
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
    margin-bottom: 10px;
    div {
      h3 {
        color: #5469d4;
        /*font-weight: 600;*/
      }
    }
  }
  .fulfill-button {
    border-radius: 4px;
    height: 32px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
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
  .archived {
    display: flex;
    align-items: center;

    input {
      width: 12px;
      height: 12px;
    }
    a {
      font-size: 10px;
      margin-left: 4px;
    }
  }
</style>
