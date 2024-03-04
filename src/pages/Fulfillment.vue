<template>
  <div class="landing-wrapper df fdc aic f1 w100p">

    <!-- <div class="top-bar-global posrel w100p _position1 df jcsb aic only-big">
      <h2 class="text-dark header-style header-style-big">Fulfill Orders</h2>
    </div>
    <hr class="divider"> -->
    
    <!-- <ProductDetailTabs /> -->
    <div class="product-detail-tabs df w100p">
      <div class="product-detail-tabs-tab df jcc aic curp"
       v-bind:class="{
        'product-detail-tabs-tab-active': currentTab == 'products'
      }" @click="goToTab('products')">
        <i class="fa-solid fa-box"></i>
        <a class="ml10">
          Ship Your Products
        </a>
      </div>
      <div class="product-detail-tabs-tab df jcc aic curp" 
            v-bind:class="{
              'product-detail-tabs-tab-active': currentTab == 'custom-orders'
            }" @click="goToTab('custom-orders')">
        <i class="fa-solid fa-bell-concierge"></i>
        <a class="ml10">
          Custom Orders
        </a>
      </div>
      <div class="product-detail-tabs-tab df jcc aic curp" 
            v-bind:class="{
              'product-detail-tabs-tab-active': currentTab == 'schedule'
            }" @click="goToTab('schedule')">
        <i class="fa-solid fa-calendar-days"></i>
        <a class="ml10">
          Your Schedule
        </a>
      </div>
      <div class="f1"></div>
    </div>

    <div class="product-detail-box w100p df fdc w2">

      <!-- <PhysicalProductFulfillment /> -->
      <div class="w100p df fdc jcc aic" v-if="currentTab == 'products'">
        <div class="w100p df fdc order-box">
          <div v-for="(order, o) in fulfillmentsProducts" class="w100p income-row df jcsb one-order res__">
            <div class="df fdc">
              <h5 class="order-title">Order {{order.orderId}}</h5>
              <h5 class="order-subtitle">Placed {{formatDate(order.created)}} ago</h5>
            </div>
            
            <div class="w100p df jcsb aic res_" v-for="(item, i) in order.order" v-if="(item.productType == 'physical-product') && (!item.archived || showArchived)">

              <div class="w100p income-heading df aic">
                {{item.heading || item.title}} x {{item.quantity || 1}}
              </div>
              <div class="income-heading">
                <p>
                  {{formatDate(order.created)}} ago
                </p>
              </div>
              <div class="income-heading">
                <p>
                  {{order.fulfillmentDetails && order.fulfillmentDetails.email}}
                </p>
              </div>
              <div class="income-heading res___">
                <button class="button-2 button-smaller"
                      v-if="item.status !== 'fulfilled'"
                      @click="showPhysicalOrderFulfillMenu(item, o, i, order)"
                      >
                  Fulfill
                </button>
                <p class="fulfill-order-after" v-else-if="item.archived">archived -&nbsp;<span @click="deleteProduct(item, o, i, order, true)">unarchive</span></p>
                <p class="fulfill-order-after" v-else="">fulfilled (<span @click="unfulfill(item, o, i, order)">unfulfill</span>,&nbsp;<span @click="deleteProduct(item, o, i, order)">archive</span>)</p>
              </div>
              <!-- <hr class="hr_"/> -->
            </div>



          </div>
        </div>
        <div class="end" v-bind:class="{
          'end-not-empty': fulfillments.length > 0
        }">
          <p>You've reached the end of the list</p>
        </div>
      </div>

      <!-- <CustomOrderFulfillment /> -->
      <div class="w100p df fdc" v-if="currentTab == 'custom-orders'">
        <div class="w100p df fdc order-box">
          <div v-for="(order, o) in fulfillmentsOrders" 
          class="w100p income-row df jcsb one-order res__"
          >

            <div class="w100p df jcsb aic res_" v-for="(item, i) in order.order" v-if="item.productType == 'custom-service'">
              <div class="w100p income-heading df aic mb10">
                {{item.heading || item.title}}
              </div>
              <div class="income-heading">
                <p class="responsive-title">
                  Placed
                </p>
                <p>
                  {{formatDate(order.created)}} ago
                </p>
              </div>
              <div class="income-heading">
                <p class="responsive-title">
                  Customer
                </p>
                <p>
                  {{order.fulfillmentDetails && order.fulfillmentDetails.email}}
                </p>
              </div>
              <div class="f1"></div>
              <div class="income-heading res___">
                <button class="button-2 button-smaller"
                      v-if="item.status !== 'fulfilled'"
                      @click="showDigitalServiceFulfillMenu(item, o, i, order)"
                      >
                  Fulfill
                </button>
                <p class="fulfill-order-after" v-else-if="item.archived">archived -&nbsp;<span @click="deleteProduct(item, o, i, order, true)">unarchive</span></p>
                <p class="fulfill-order-after" v-else="">fulfilled (<span @click="unfulfill(item, o, i, order)">unfulfill</span>,&nbsp;<span @click="deleteProduct(item, o, i, order)">archive</span>)</p>
              </div>
              <hr class="hr_"/>

            </div>

          </div>
        </div>

        <div class="end" v-bind:class="{
          'end-not-empty': fulfillments.length > 0
        }">
          <p>You've reached the end of the list</p>
        </div>
      </div>

      <!-- v-if="(item.order[0].productType == 'calendar-event') && (!item.archived || showArchived)" -->

      <!-- <AppointmentFulfillment /> -->
      <div class="w100p df fdc" v-if="currentTab == 'schedule'">
        <div class="w100p df fdc order-box">
          <div v-for="(order, o) in fulfillmentsEvents" class="w100p income-row res__ df jcsb one-order">
            <div class="w100p df jcsb aic res_" v-for="(item, i) in order.order" v-if="item.productType == 'calendar-event'">
              <div class="w100p income-heading df aic mb10">
                {{item.heading || item.title}}
              </div>
              <div class="income-heading">
                <p v-if="item.newAppointment">
                  {{item.newAppointment.selectedCalendarDay}} at {{minutesToHhMm(item.newAppointment.appointmentStartTime)}} ({{item.newAppointment.times[item.newAppointment.selectedAppointmentTime].time}} minutes)
                  <!-- {{formatDate2(item.fulfillmentDetails.selectedDay)}} -->
                </p>
                <p v-else></p>
              </div>
              <div class="income-heading">
                <p>
                  Scheduled {{formatDate(order.created)}} ago
                </p>
              </div>
              <div class="income-heading">
                <p>
                  {{order.fulfillmentDetails.email}}
                  <!-- see customer -->
                </p>
              </div>
              <div class="income-heading res___">
                <button class="button-2 button-smaller"
                      v-if="item.status !== 'fulfilled'"
                      @click="showCalendarFulfillMenu(item, o, i, order)"
                      >
                  Fulfill
                </button>
                <p class="fulfill-order-after" v-else-if="item.archived">archived -&nbsp;<span @click="deleteProduct(item, o, i, order, true)">unarchive</span></p>
                <p class="fulfill-order-after" v-else="">fulfilled (<span @click="unfulfill(item, o, i, order)">unfulfill</span>,&nbsp;<span @click="deleteProduct(item, o, i, order)">archive</span>)</p>
              </div>
              <hr class="hr_"/>
            </div>
          </div>
        </div>
        <div class="end" v-bind:class="{
          'end-not-empty': fulfillments.length > 0
        }">
          <p>You've reached the end of the list</p>
        </div>
      </div>

    </div>

    <div class="spacer"></div>
    <div v-if="loading" class="loading-splash df fdc jcc aic">
      <img class="spinner-1 mb-spinner o-spinner" src="../../static/images/pushable/loader-black-3.png">
      <p>Loading</p>
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
      currentTab: 'products',
      showArchived: true,
      loading: true,
      fulfillments: [],
      digitalServiceFulfillMenu: false,
      sortByOrders: 'newest first',
      sortByEvents: 'newest first',
      sortingOrders: false,
      sortingEvents: false,
      fulfillmentsProducts: [],
      fulfillmentsOrders: [],
      fulfillmentsEvents: []
    }
  },
  props: ['mode'],
  components: {
    LandingProduct
  },
  methods: {
    minutesToHhMm (mm) {
      let hours = Math.floor(mm/60)
      let minutes = mm % 60

      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }

      return hours + ':' + minutes
    },
    month (m) {
      switch (m) {
        case 0:
        return 'January'
          break;
        case 1:
        return 'February'
          break;
        case 2:
        return 'March'
          break;
        case 3:
        return 'April'
          break;
        case 4:
        return 'May'
          break;
        case 5:
        return 'June'
          break;
        case 6:
        return 'July'
          break;
        case 7:
        return 'August'
          break;
        case 8:
        return 'September'
          break;
        case 9:
        return 'October'
          break;
        case 10:
        return 'November'
          break;
        case 11:
        return 'December'
          break;
        default:
          return '';
      }
    },
    goToTab (currentTab) {
      this.currentTab = currentTab
    },
    sortEvents (sortingEvents) {
      this.sortingEvents = sortingEvents
    },
    selectSortEvents (sortByEvents) {
      this.sortByEvents = sortByEvents
      this.sortFulfillments()
      this.sortingEvents = false
    },
    sortOrders (sortingOrders) {
      this.sortingOrders = sortingOrders
    },
    selectSort (sortByOrders) {
      this.sortByOrders = sortByOrders
      this.sortFulfillments()
      this.sortingOrders = false
    },
    sortFulfillments () {
      if (this.sortByOrders == 'newest first') {
        this.fulfillmentsOrders = this.fulfillmentsOrders.sort((a, b) => b.created - a.created)
        this.fulfillmentsEvents = this.fulfillmentsEvents.sort((a, b) => b.created - a.created)
        this.fulfillmentsProducts = this.fulfillmentsProducts.sort((a, b) => b.created - a.created)
      } else if (this.sortByOrders == 'oldest first') {
        this.fulfillmentsOrders = this.fulfillmentsOrders.sort((a, b) => a.created - b.created)
      } else if (this.sortByOrders == 'highest price') {
        this.fulfillmentsOrders = this.fulfillmentsOrders.sort((a, b) => a.order[0].price - b.order[0].price)
      } else if (this.sortByOrders == 'lowest price') {
        this.fulfillmentsOrders = this.fulfillmentsOrders.sort((a, b) => b.order[0].price - a.order[0].price)
      }

      if (this.sortByEvents == 'soonest first') {
        this.fulfillmentsEvents = this.fulfillmentsEvents.sort((a, b) => this.time(a.fulfillmentDetails) - this.time(b.fulfillmentDetails))
      } else if (this.sortByEvents == 'latest first') {
        this.fulfillmentsEvents = this.fulfillmentsEvents.sort((a, b) => this.time(b.fulfillmentDetails) - this.time(a.fulfillmentDetails))
      } else if (this.sortByEvents == 'highest price') {
        this.fulfillmentsEvents = this.fulfillmentsEvents.sort((a, b) => a.order[0].price - b.order[0].price)
      } else if (this.sortByEvents == 'lowest price') {
        this.fulfillmentsEvents = this.fulfillmentsEvents.sort((a, b) => b.order[0].price - a.order[0].price)
      }

      this.loading = false
    },
    time (fulfillmentDetails) {
      let day = fulfillmentDetails.selectedDay
      let time = fulfillmentDetails.selectedTimeAvailabe

      if (!day) {return '-'}

      let date = new Date((day.month + 1) + '/' + day.day + '/2022 : ' + time.time + ' ' + time.letters )

      // console.log('day', day)
      // console.log('time', time)
      // console.log('date', date.getTime())

      return date.getTime()
    },
    ordersCompleted () {
      let completed = this.fulfillments.filter(v => v.status == 'fulfilled')
      let archived = this.fulfillments.filter(v => v.archived)
      return completed.length - archived.length
    },
    ordersArchived () {
      let archived = this.fulfillments.filter(v => v.archived)
      return archived.length
    },
    flipArchived () {
      this.showArchived = !this.showArchived
    },
    unfulfill (item, o, i, order) {
      this.$store.dispatch('AUTH.unfulfill', {item, o, i, order}).then((res) => {
        console.log('Product unfulfilled', res)
        this.getMyFulfillments()
        // this.deleted = true
      })
    },
    deleteProduct (item, o, i, order, undelete) {
      this.$store.dispatch('AUTH.deleteFulfilledProduct', {item, o, i, order, undelete: undelete || null}).then((res) => {
        console.log('Product archived', res)
        this.getMyFulfillments()
        // this.deleted = true
      })
    },
    formatCurrency (c) {
      return (c/100).toFixed(2)
    },
    showPhysicalOrderFulfillMenu (v, o, i, order) {
      console.log('showPhysicalOrderFulfillMenu', v, o, i, order)
      let then = () => {
        console.log('test')
        this.getMyFulfillments()
      }
      this.$store.dispatch('AUTH.setFulfillmentMenu', {v, o, i, order, then})
    },
    showCalendarFulfillMenu (v, o, i, order) {
      let then = () => {
        console.log('test')
        this.getMyFulfillments()
      }
      this.$store.dispatch('AUTH.setFulfillmentMenu', {v, o, i, order, then})
    },
    showDigitalServiceFulfillMenu (v, o, i, order) {
      console.log('showDigitalServiceFulfillMenu', v)
      let then = () => {
        console.log('test')
        this.getMyFulfillments()
      }
      this.$store.dispatch('AUTH.setFulfillmentMenu', {v, o, i, order, then})
    },
    formatDate2 (date) {
      if (!date) {return '--'}
      // console.log('date', date)
      let dateText = ''
      dateText += date.weekday + ', '
      dateText += this.month(date.month) + ' ' + date.day + ', '
      dateText += date.year

      return dateText
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

          if (!res) {return false}

          console.log('res', res)

          this.fulfillmentsOrders = res.filter(v => v.order && v.order.filter(v => v.productType == 'custom-service').length > 0)
          this.fulfillmentsEvents = res.filter(v => v.order && v.order.filter(v => v.productType == 'calendar-event').length > 0)
          this.fulfillmentsProducts = res.filter(v => v.order && v.order.filter(v => v.productType == 'physical-product').length > 0)
          console.log('*', this.fulfillmentsOrders)
          console.log('**', this.fulfillmentsEvents)
          console.log('***', this.fulfillmentsProducts)
          this.sortFulfillments()
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
  ._mb {
    margin-bottom: 14px;
  }
  ._position2 {
    margin-top: 12px;
  }
  ._position3 {
    margin-bottom: 4px;
  }
  .mr-x {
    margin-right: 8px;
  }

  .landing-wrapper {
    padding: 19px;
    /*padding-top: 14px;*/
    /*padding-top: 0;*/
    background-color: $light-grey;
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
    /*height: 32px;*/
    font-family: Kollektif;

    p {
      /*font-family: 'CA SaygonText', sans-serif;*/
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
        /*width: 40px;*/
        /*max-width: 40px;*/
        width: 35%;
        max-width: 200px;
      }
      &:nth-child(2) {
        width: 15%;
        /*flex: 2;*/
        /*max-width: 150px;*/
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
      margin-bottom: 0;
      margin-top: 0;
      border-color: #444;
    }
    a {
      font-size: 10px;
      margin-left: 4px;
      margin-right: 0;
      color: #444;
    }
  }
  .fulfill-order-after {
    display: flex;
    justify-content: center;
    span {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .title-box {
    flex: 1;
    width: 100%;

    h3 {
      margin-bottom: 15px;
    }
    &:last-child {
      h3 {
        margin-bottom: 0;
      }
    }
  }
  ._abc {
    align-items: flex-start;
  }
  .responsive-title {
    display: none;
  }
  .responsive-order-box {
    display: none;
  }
  .x-wrap {
    display: none;
  }
  .order-fulfilled-wrap {
    display: flex;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
    p {
      color: $color-primary;
      font-size: 22px !important;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 0 !important;
    }
  }
  $order-fulfilled-icon-height: 30px;
  .order-fulfilled {
    width: $order-fulfilled-icon-height;
    height: $order-fulfilled-icon-height;
    margin-right: 8px;
  }
  $download-file-icon-height: 24px;
  .download-file {
    width: $download-file-icon-height;
    height: $download-file-icon-height;
    margin-right: 8px;
  }
  .special-box {    
    padding-left: 40px;
    padding-right: 40px;
    margin-bottom: 12px;
  }
  .special-box-2 {
    background-color: $light-grey;
    padding-top: 8px;
    padding-left: 19px;
    padding-right: 19px;
    padding-bottom: 32px;
  }
  @media (max-width: 680px) {
    .fulfill-order-after {
      /*width: 100%;*/
      justify-self: center;
    }
    .x-wrap {
      display: flex;
      .responsive-order-box {
        display: flex;
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .order-box {
      /*display: none;*/
      flex-direction: column !important;
    }
    .responsive-order-box-last {
      margin-bottom: 0;
    }
    .income-row {
      height: unset;
      flex-direction: column;
      min-width: unset;

      p {
        font-size: 14px !important;
        /*margin-bottom: 10px;*/
      }

      .no-attachments {
        font-size: 12px !important;
        font-weight: 400 !important;
        margin-bottom: 0 !important;
      }

      .responsive-order-name {
        letter-spacing: 0.01em !important;
        font-size: 18px !important;
        color: $color-primary;
        font-weight: 600;
        letter-spacing: 0.01em;
        margin-bottom: 10px !important;
      }

      .income-heading {
        width: 100% !important;
        max-width: unset !important;
        margin-right: unset;
      }

      .responsive-title {
        display: flex;
        flex: 1;
      }
    }
    .order-fulfilled-wrap {
      display: flex;
      p {
        color: $color-primary;
        font-size: 15px !important;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 0 !important;
      }
    }
    .income-heading-row {
      display: none;
    }
  }
  .whole-page-box-global-2-bigger {
    padding-bottom: 20px;
    height: unset;
  }
  @media (max-width: 425px) {
    .whole-page-box-global-2-bigger {
      height: unset;
      padding-top: 30px;
      padding-bottom: 30px;
    }
    .title-right {
      text-align: center;
      margin-right: 0;
      margin-top: 8px;
      margin-bottom: 7px;
    }
    .title-box {
      /*justify-content: center;*/
      align-items: center;
      /*flex-direction: column;*/
    }
    .special-box {
      padding-top: 18px;
      padding-bottom: 18px;

      h3 {
        margin-top: 8px;
        margin-bottom: 7px;
      }
    }
  }

  .one-order {
    margin-bottom: 30px;
    gap: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 15px;

    p {
      color: $color-background-dark;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
  .responsive-order-box {
    .income-heading {
      p {
        letter-spacing: 0.02em;
      }
      p:first-child {
        margin-bottom: 4px;
        font-weight: 600;
      }
      p:last-child {
        margin-bottom: 4px;
      }
    }
  }
  .instructions {
    display: flex;
    flex-direction: column;
    align-items: flex-start !important;

    p:first-child {
      /*flex: unset !important;*/
      /*margin-bottom: 4px;*/
      /*font-weight: 600;*/
    }
    p:last-child {
      /*margin-bottom: 4px;*/
      /*font-weight: 600;*/
      /*margin-bottom: 8px !important;*/
    }
  }
  .instructions2 {
    flex-direction: row;
    align-items: center !important;
    /*justify-content: center;*/
    margin-bottom: 16px;

    p {
      flex: 1 !important;
    }

    a {
      font-size: 14px !important;
      font-weight: 600;
      color: $color-primary;
      margin-bottom: 0 !important;
    }
  }
  .fu {
    flex: unset !important;
    margin-right: 6px;
  }

  .end {
    font-size: 14px;
    margin-top: 25px;
    /*margin-bottom: 10px;*/
    p {
      text-align: center;
    }
  }
  .end-not-empty {
    margin-top: 20px;
  }
  .archived {
    /*margin-top: 1px;*/
  }

  .anti-hover {
    text-decoration: none !important;

    & .mini-button {
      text-decoration: none !important;
    }
  }

  .sort-by {
    font-size: 12px;
    span {
      text-decoration: underline;
      color: $color-primary; 
    }
  }

  .sort-select {
    position: absolute;
    right: 0;
    background-color: #fff;
    padding: 25px 50px;
    border-radius: 8px;
    border: 1px solid #eaeaea;

    p {
      cursor: pointer;
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: 500;
      color: $color-primary;
      text-align: center;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .aifsi {
    align-items: flex-start !important;
  }

  .product-detail-tabs {
    &-tab {
      padding: 20px;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;

      /*background-color: #fdfdfd;*/
      a {
        color: $color-background-dark;
        font-weight: 700;
        /*font-weight: 16px;*/
        text-transform: lowercase;
        letter-spacing: 0.02em;
        font-weight: 400;
      }
      &-active {
        background-color: $color-white;
        -webkit-box-shadow: 0 2px 3px 1px rgba(8, 8, 8, .07);
        box-shadow: 0 2px 3px 1px rgba(8, 8, 8, .07);
        a {
          }
      }
    }
  }

  .product-detail-box {
    background-color: $color-white;
    padding: 20px;
    letter-spacing: 0.5px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    -webkit-box-shadow: 0 2px 3px 1px rgba(8, 8, 8, .07);
    box-shadow: 0 2px 3px 1px rgba(8, 8, 8, .07);
  }

  .fulfillment-item-each {
    & > div {
      width: 150px;
      /*min-width: 100px;*/
    }
  }
  .end {
    p {
      color: $color-background-dark;
    }
  }
  .existing-product-image {
    width: 25px;
    object-fit: contain;

    &-wrapper {
      height: 35px;
      width: 35px;
      min-height: 35px;
      min-width: 35px;
      max-height: 35px;
      max-width: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background-color: #DDD;
      /*border: 1px solid $color-background-dark;*/
      margin-right: 15px;
    }
  }

  @media (max-width: 480px) {
    .product-detail-tabs {
      margin-bottom: 20px;
      flex-direction: column;
      &-tab {
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
      }
    }
    .product-detail-box {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
  }

  .button-smaller {
    max-width: 100px;
  }

  .hr_ {
    width: 100%;
    height: 1px;
    background-color: #ddd;
    border: none;
    margin-top: 20px;
    display: none;
  }

  .income-row {

  }

  .income-row.one-order {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1000px) {
    .res_ {
      flex-direction: column;
      align-items: flex-start;
    }

    .res__ {
      height: unset;
    }

    .res___ {
      margin-top: 10px;
    }

    .income-row {
      .income-heading {
        width: 100% !important;
        &:nth-child(1) {
          width: 100%;
          max-width: unset;
        }
      }
    }
    .hr_ {
      display: block;
    }
  }

  .order-title {
    font-size: 18px;
    margin-bottom: 0;
    line-height: 1em;
  }
  .order-subtitle {
    margin-top: 0;
    font-size: 14px;
    line-height: 1em;
    color: #777;
    margin-top: 6px;
  }

</style>
