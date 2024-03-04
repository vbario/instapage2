<template>
  <div class="landing-wrapper df fdc aic f1 w100p">

<!--     <div class="top-bar-global w100p _position1 df jcsb aic">
      <div class="breadcrumb df">
        <h2 class="breadcrumb-other" @click="goTo('/me')">Home</h2>
        <h2 class="breadcrumb-separator">/</h2>
        <h2>New Product</h2>
      </div>
    </div> -->

    <!-- <div class="whole-page-box-global-2 whole-page-box-global-2-bigger w100p mt20 mb20 df jcc" v-if="!$route.query.addproduct && (fulfillmentsOrders.length !== 0)">
      <div class="title-box df curn">
        <h4 class="button-1 new-product-button curp" @click="setAddProduct(true)">
            Add A New Product
        </h4>
        <h3 class="title-right">Add a new product</h3>
      </div>
    </div> -->

    <!-- <div v-if="$route.query.addproduct" class="top-bar-global w100p _position1 df jcsb aic">
      <img @click="goTo('/products')" class="go-back-to-my-products" src="../../static/images/back.svg">
      <h2>Add A Product</h2>
    </div> -->

    <div v-if="$route.query.addproduct" class="top-bar-global posrel w100p _position1 df aic">
      <div @click="goTo('/products')" class="df aic curp">
        <i class="fa-solid fa-arrow-left header-style-back"></i>
        <i class="fa-solid fa-pipe pipe"></i>
      </div>
      <h2 class="text-dark header-style header-style-big">Add A New Product</h2>
    </div>
    <hr v-if="$route.query.addproduct" class="divider">
    <div class="w100p df fdc mb35" v-if="fulfillmentsOrders.length == 0">
      <div class="add-a-product-wrapper df fdc aic">
        <!-- <h1 class="text-dark h1-2 tac lgs">Let's Get Started!</h1> -->
        <h2 class="text-primary-color fw400 tac _ww">What would you like to sell?</h2>
      </div>
    </div>
    <!-- <div class="w100p df jcc"> -->
    <div class="df fww g15" v-if="$route.query.addproduct || (fulfillmentsOrders.length == 0)">
      <div class="product-type-outer df jcc" @click="newProduct('subscription-physical-product')">
        <div class="title-box df fdro">
          <div class="new-product-image-wrapper">
            <i class="fa-solid fa-repeat product-icon"></i>
          </div>
          <div class="df fdc aifs">
            <h3 class="product-type wun">Subscription to Products</h3>
            <p class="product-description">
                Let your customer sign up for physical product subscriptions.
            </p>
          </div>
        </div>
      </div>
      <div class="product-type-outer df jcc" @click="newProduct('physical-product')">
        <div class="title-box df fdro">
          <!-- <i class="new-product-icon fal fa-box"></i> -->
          <div class="new-product-image-wrapper">
            <i class="fa-solid fa-box product-icon"></i>
          </div>
          <div class="df fdc aifs">
            <h3 class="product-type wun">Physical Product</h3>
            <p class="product-description">
                Sell anything and deliver it to your customer.
            </p>
          </div>
        </div>
      </div>
      <div class="product-type-outer df jcc" @click="newProduct('digital-download')">
        <div class="title-box df fdro">
          <!-- <i class="new-product-icon fal fa-arrow-to-bottom"></i> -->
          <div class="new-product-image-wrapper">
            <i class="fa-solid fa-download product-icon"></i>
          </div>
          <div class="df fdc aifs">
            <h3 class="product-type wun">Sell A Download</h3>
            <p class="product-description">
                Sell books, music, cooking recipes, clipart packs, and anything else you can think of!
            </p>
          </div>
        </div>
      </div>
      <div class="product-type-outer df jcc" @click="newProduct('digital-service')">
        <div class="title-box df fdro">
              <!-- <i class="new-product-icon fal fa-concierge-bell"></i> -->
              <div class="new-product-image-wrapper">
                <i class="fa-solid fa-bell-concierge product-icon"></i>
              </div>
              <div class="df fdc aifs">
                <h3 class="product-type wun">Custom Product/Service</h3>
                <p class="product-description">
                    The customer will send you instructions and/or files. You will send back access to completed work.
                </p>
              </div>
        </div>
      </div>
      <div class="product-type-outer df jcc" @click="newProduct('calendar-event')">
        <div class="title-box df fdro">
          <!-- <i class="new-product-icon fal fa-calendar"></i> -->
          <div class="new-product-image-wrapper">
            <i class="fa-solid fa-calendar-days product-icon"></i>
          </div>
          <div class="df fdc aifs">
            <h3 class="product-type wun">Book an Appointment With You</h3>
            <p class="product-description">
               Let customers book an appointment with you.
            </p>
          </div>
        </div>
      </div>
      <div class="product-type-outer df jcc" @click="newProduct('collect-email')">
        <div class="title-box df fdro">
          <div class="new-product-image-wrapper">
            <i class="fa-solid fa-envelope product-icon"></i>
          </div>
          <div class="df fdc aifs">
            <h3 class="product-type wun">Collect E-mails</h3>
            <p class="product-description">
                Instantly collect e-mail addresses from your customers.
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->

    <!-- <div class="whole-page-box-global-2 whole-page-box-global-2-bigger w100p mb20 df jcc" v-if="!$route.query.addproduct && (fulfillmentsOrders.length !== 0)">
      <div class="title-box df curn">
        <h3 class="title-right">Add a new product</h3>
        <h4 class="button-1 new-product-button curp" @click="setAddProduct(true)">
            New Product
        </h4>
      </div>
    </div> -->

    <!-- <h4 class="button-0 button-0-light" v-if="$route.query.addproduct" @click="setAddProduct(false)">
        Cancel
    </h4> -->

    <div v-if="!$route.query.addproduct && (fulfillmentsOrders.length !== 0)" class="top-bar-global posrel w100p _position1 df jcsb aic only-big">
      <h2 class="text-dark header-style header-style-big">
        My Products & Services
      </h2>
    </div>
    <div class="sort-select" v-if="sortingOrders">
      <p class="text-darki w100p tal">Sort by:</p>
      <p @click="selectSort('newest first')">newest first</p>
      <p @click="selectSort('oldest first')">oldest first</p>
      <!-- <p @click="selectSortEvents('highest price')">highest price</p> -->
      <!-- <p @click="selectSortEvents('lowest price')">lowest price</p> -->
    </div>
    <hr v-if="!$route.query.addproduct && (fulfillmentsOrders.length !== 0)" class="divider">
    <div class="w100p df jcsb aic mb30" v-if="!$route.query.addproduct && (fulfillmentsOrders.length !== 0)">
      <h4 class="button-2 add-product-button" v-if="!$route.query.addproduct" @click="setAddProduct(true)">
        <i class="fa-solid fa-plus"></i>
        <span>add product</span>
      </h4>
      <div class="f1"></div>
      <p v-if="!$route.query.addproduct" class="sort-by curp">sort by: <span @click="sortOrders(true)">{{sortByOrders}}</span></p>
    </div>

    <!-- <img @click="goTo('/products')" class="add-a-product mt30" src="../../static/images/momentum/product-box-c.png" > -->

    <!-- <div class="whole-page-box-global-2 whole-page-box-global-2-bigger w100p mb20 df jcc" v-if="fulfillmentsOrders.length == 0">
      <div class="title-box df aic jcc curn">
        <h3 class="title-right">Add your first product</h3>
      </div>
    </div> -->

    <div class="w100p df each-product-box"
          v-for="(product, i) in fulfillmentsOrders"
          v-if="!product.deleted && !$route.query.addproduct">

      <div class="df aic product-type-display">
        <div class="df">
          <div v-if="product.type == 'physical-product'" class="df product-type type-digital-download">
            <div class="existing-product-image-wrapper">
              <i class="fa-solid fa-box existing-product-icon"></i>
            </div>
            <!-- <i class="new-product-icon active-product-icon fal fa-box"></i> -->
          </div>
          <div v-if="product.type == 'subscription-physical-product'" class="df product-type type-digital-download">
            <div class="existing-product-image-wrapper">
              <i class="fa-solid fa-repeat existing-product-icon"></i>
            </div>
            <!-- <i class="new-product-icon active-product-icon fal fa-arrow-to-bottom"></i> -->
          </div>
          <div v-if="product.type == 'digital-download'" class="df product-type type-digital-download">
            <div class="existing-product-image-wrapper">
              <i class="fa-solid fa-download existing-product-icon"></i>
            </div>
            <!-- <i class="new-product-icon active-product-icon fal fa-arrow-to-bottom"></i> -->
          </div>
          <div v-if="product.type == 'calendar-event'" class="df product-type type-calendar-event">
            <div class="existing-product-image-wrapper">
              <i class="fa-solid fa-calendar-days existing-product-icon"></i>
            </div>
            <!-- <i class="new-product-icon active-product-icon fal fa-calendar"></i> -->
          </div>
          <div v-if="product.type == 'digital-service'" class="df product-type type-digital-service">
            <!-- <i class="new-product-icon active-product-icon fal fa-concierge-bell"></i> -->
            <div class="existing-product-image-wrapper">
              <i class="fa-solid fa-bell-concierge existing-product-icon"></i>
            </div>
          </div>
          <div v-if="product.type == 'collect-email'" class="df product-type type-digital-service">
            <!-- <i class="new-product-icon active-product-icon fal fa-envelope"></i> -->
            <div class="existing-product-image-wrapper">
              <i class="fa-solid fa-envelope existing-product-icon"></i>
            </div>
          </div>
        </div>
        <!-- <p>
          {{productTypeDisplay(product.type)}}
        </p> -->
      </div>
      <div class="curp one-product df aic">
        

        <div class="product-wrapper-1 df fdc f1 jcfe aic">
          <div class="h3wrap df aic w100p">
            <h3 class="df aic g_">
              {{product.name}}
              <a @click="goToProduct(product)" class="edit-link edit-link-a">edit</a>
            </h3>
          </div>
          <div class="df w100p">
            <!-- <div class="quantity df aic" v-if="product.type == 'physical-product'" @click="stopProp($event)">
              <p class="text-dark">Stock:</p>
              <input :value="$store.getters['AUTH.inventory'][product.uniqueProductId]" type="number" name="" @input="updateInventoryCount($event, product.uniqueProductId)">
            </div> -->
            <div class="df stats" v-if="product.totalViews">
              <div class="h3wrap df aic w100p">
                <p class="stat-box">
                  <span>{{product.totalViews || ''}}</span>
                  <!-- <i class="fa-solid fa-arrow-pointer stat-icon-2 ml5 mr5"></i> -->
                  <span class="ml_0">click{{product.totalViews == 1 ? '' : 's'}}</span>
                </p>
              </div>
              <div class="h3wrap df aic w100p ml20">
                <p class="stat-box">
                  <span>{{product.totalSales || '0'}}</span>
                  <!-- <i class="fa-solid fa-square-dollar stat-icon-2 ml5 mr5"></i> -->
                  <span class="ml_0">sale{{product.totalSales == 1 ? '' : 's'}}</span>
                </p>
              </div>
            </div>
          </div>
            <a class="edit-link edit-link-b" @click="goToProduct(product)">edit</a>
        </div>

        <a v-if="product.uniqueProductId" class="copy-link copy-link-1" @click="copyLink($event, rootDomain + '/' + myDisplayName() + '/' + product.uniqueProductId)">
          <i class="fa-solid fa-link link-icon ml5 mr5"></i>
          copy link
        </a>
        <!-- <div class="" @click="setShowMore(product)">
          <i class="fa-solid fa-ellipsis ml20"></i>
        </div> -->


        <!-- <div class="f1 maxw100"></div> -->

        <!-- <p>{{product}}</p> -->
        <!-- <p class="df jcfe created">{{formatDate(product.created)}}</p> -->
        <!-- <p>{{productTypeDisplay(product.type)}}</p> -->
      </div>
    </div>
    <div class="spacer"></div>

    <div v-if="loading" class="loading-splash df fdc jcc aic">
      <img class="spinner-1 mb-spinner o-spinner" src="../../static/images/pushable/loader-black-3.png">
      <p>Loading</p>
    </div>
    <!-- <div class="end" v-if="!$route.query.addproduct" v-bind:class="{
      'end-not-empty': fulfillmentsOrders.length > 0
    }">
      <p v-if="fulfillmentsOrders.length !== 0">You've reached the end of the list</p>
    </div> -->

  </div>
</template>

<script>

import router from '@/router'
import paths from '@/util/paths'
import LandingProduct from '@/components/LandingProduct'

export default {
  name: 'Products',
  data () {
    return {
      showMore: {},
      rootDomain: process.env.NODE_ENV == '' ? paths.devPath : paths.productionShortPath,
      addProduct: false,
      loading: true,
      income: [],
      sortByOrders: 'newest first',
      sortingOrders: false,
      fulfillmentsOrders: [],
      tracking: {},
    }
  },
  props: ['mode'],
  components: {
    LandingProduct
  },
  methods: {
    updateInventoryCount (event, productId) {
      this.$store.dispatch('AUTH.updateInventoryCount', {productId, count: event.target.value})
    },
    setShowMore (product) {
      this.showMore = product
    },
    stopProp (event) {
      event && event.stopPropagation()
    },
    copyLink (e, link) {
      e.stopPropagation()
      navigator.clipboard.writeText(link);
      // this.flashCopied()
      // console.log('a', link)
      // console.log('b', link)
      // console.log('c', link)
    },
    loadProductList () {
      if (this.$store.getters['AUTH.myProductsList']) {
        this.fulfillmentsOrders = JSON.parse(JSON.stringify(this.$store.getters['AUTH.myProductsList']))
        console.log('go', this.fulfillmentsOrders)
        this.sortFulfillments()
      } else {
        setTimeout(() => {
          this.loadProductList()
        }, 100)
      }
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
      } else if (this.sortByOrders == 'oldest first') {
        this.fulfillmentsOrders = this.fulfillmentsOrders.sort((a, b) => a.created - b.created)
      }
      this.loading = false
      // else if (this.sortByOrders == 'highest price') {
      //   this.fulfillmentsOrders = this.fulfillmentsOrders.sort((a, b) => a.order[0].price - b.order[0].price)
      // } else if (this.sortByOrders == 'lowest price') {
      //   this.fulfillmentsOrders = this.fulfillmentsOrders.sort((a, b) => b.order[0].price - a.order[0].price)
      // }
    },
    myDisplayName () {
      if (this.$store.getters['AUTH.myInfo']) {
        return this.$store.getters['AUTH.myInfo'].displayName && this.$store.getters['AUTH.myInfo'].displayName.displayName
      }
      return ''
    },
    setAddProduct (val) {
      console.log('setAddProduct', val)
      if (val) {
        window.scroll(0, 0)
        this.$router.push('/products?addproduct=' + val)
      } else {
        window.scroll(0, 0)
        this.$router.push('/products')
      }
      // this.$route.query.addproduct = val
    },
    newProduct (product) {
      this.goTo('/add/' + product)
    },
    goTo (route) {
      window.scroll(0, 0)
      router.push(route)
    },
    goToProduct (product) {
      let path = '/add/' + product.type + '/' + product.internalId
      console.log('go to scroll 0')
      window.scroll(0, 0)
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
      } else if (type == 'collect-email') {
        return 'Collect Email'
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
    this.loadProductList()
    console.log('* Landing page created')
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  h3.title-right {
    color: black;
  }

  .landing-wrapper {
    padding: 19px;
    padding-top: 14px;
    padding-top: 0;
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
    /*color: #5469d4;*/
    /*color: $color-primary;*/
  }
  .icon-product {
    /*color: #5469d4;*/
    color: $color-primary;
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
    width: 100%;
    h3 {
      /*margin-left: 8px;*/
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
    width: 150px;
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
      color: #000;
      /*margin-left: 10px;*/
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
      line-height: 1.2em;
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 0.02em;
      /*margin-left: 10px;*/
    }
  }

  @media (max-width: 1000px) {
    .h3wrap {
      h3 {
        margin-left: 0;
      }
    }
  }
  @media (max-width: 480px) {
    .h3wrap {
      h3 {
        margin-left: 0;
        white-space: unset;
        overflow: unset;
        text-overflow: unset;
      }

      .product-type {
        margin-right: 10px; 
      }
    }    
  }

  i {
    font-size: 20px;
  }
  .product-type {
    width: 20px;
    display: flex;
    justify-content: center;
    text-align: left;
    color: $color-background-dark;
    font-size: 16px;
  }
  .title-box {
    cursor: pointer;
    flex: 1
  }
  ._abc {
    align-items: flex-start;
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
      margin-bottom: 15px;
    }
    .title-box {
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }

  .product-type {
    width: 100%;
    text-transform: lowercase;
    letter-spacing: 0.02em;
    /*text-align: center;*/
    /*margin-bottom: 0;*/
  }

  .g15 {
    gap: 15px;
  }

  .product-type-outer {
    width: 500px;
    padding: 30px 20px;
    background-color: $color-white;
    border-radius: 10px;
    cursor: pointer;

    -webkit-box-shadow: 0 2px 3px 1px rgba(8, 8, 8, .07);
    box-shadow: 0 2px 3px 1px rgba(8, 8, 8, .07);

    &:last-child {
      margin-bottom: 0;
    }
    

    &:hover {
      background-color: #eee;
    }
  }

  @media (max-width: 1400px) {
    .product-type-outer {
      width: calc(50% - 7.5px);
      /*flex: 1;*/
      /*width: unset;*/
    }
  }

  @media (max-width: 1290px) {
    .product-type-outer {
      width: 100%;
    }
  }

  /*@media (max-width: 680px) {
    .product-type-outer {
      width: 100%;
    }
  }*/

  .product-type-outer.last {
    /*margin-bottom: 8px;*/
  }
  .button-0-light {
    font-weight: 400;
    color: #474747 !important;
  }
  .icon-new-product {}

  .wun {
    width: unset;
    font-weight: 600;
  }

  .fdro {
    flex-direction: row !important;
    justify-content: flex-start;
    position: relative;
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

  .new-product-image {
    width: 45px;
    object-fit: contain;

    &-wrapper {
      height: 60px;
      width: 60px;
      min-height: 60px;
      min-width: 60px;
      max-height: 60px;
      max-width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      /*background-color: $color-background-dark;*/
      border: 2px solid $color-primary;
      margin-right: 15px;
    }
  }

  .existing-product-image {
    width: 25px;
    object-fit: contain;

    &-wrapper {
      height: 50px;
      width: 50px;
      min-height: 50px;
      min-width: 50px;
      max-height: 50px;
      max-width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background-color: #DDD;
      /*border: 1px solid $color-background-dark;*/
      margin-right: 15px;
    }
  }
  .active-product-icon {
    width: 30px;
    height: 30px;
    min-width: 30px;
    min-height: 30px;
    font-size: 16px;
    color: $color-mint;
    background-color: #444;
  }

  .icon-1 {
    display: none;
  }

  $product-display-type-color: #4b4b4b;

  .icon-1, .icon-2 {
    margin-right: 5px;

    & > div > i {
      font-size: 16px;
      color: $product-display-type-color !important;
    }
  }

  .product-type-display {
    /*margin-top: 6px;*/

    p {
      color: $product-display-type-color !important;
      font-size: 12px;
    }
  }

  .each-product-box {
    align-self: flex-start;
    margin-bottom: 10px;
    -webkit-box-shadow: 0 2px 3px 1px rgba(8, 8, 8, .07);
    box-shadow: 0 2px 3px 1px rgba(8, 8, 8, .07);

    &:last-child {
      margin-bottom: 0;
    }
  }
  @media (max-width: 1100px) {
    .each-product-box {
      margin-bottom: 20px;
    }
  }
  .product-wrapper-1 {
    margin-left: 10px;
  }
  @media (max-width: 1000px) {
    .each-product-box {
      margin-bottom: 20px;
    }
    .one-product {
      /*flex-direction: column;*/
    }
    .product-wrapper-1 {
      flex-direction: column;
      align-items: flex-start;

      .stats {
        margin-top: 4px;
      }
    }
  }
  @media (max-width: 680px) {
    .one-product {
      /*flex-direction: column;*/
      /*align-items: flex-start;*/

      .copy-link {
        /*margin-left: 0;*/
        /*margin-top: 4px;*/
      }
    }
    .product-wrapper-1 {
/*      flex-direction: column;
      align-items: flex-start;

      .stats {
        margin-top: 4px;
      }*/
    }
  }

  @media (max-width: 480px) {
    .product-type-display {
      margin-top: 0;
    }
    .each-product-box {
      /*flex-direction: column;*/

      .one-product {
        /*flex-direction: column;*/
      }
    }
    .icon-1 {
      display: flex;
    }
    .icon-2 {
      display: none;
    }
  }

  .end {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .end-not-empty {
    margin-top: 10px;
  }

  .sort-by {
    font-size: 12px;
    span {
      text-decoration: underline;
      color: $color-primary; 
      letter-spacing: 0.02em;
    }
  }

  .product-description {
    margin-top: 6px;
    letter-spacing: 0.02em;
    color: #777;
    font-style: italic;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    .box-override-1 {
      height: 145px;
    }
  }
/*
  .go-back-to-my-products {
    margin-right: 15px;
    width: 25px;
  }*/

  .sort-select {
    position: absolute;
    top: 20px;
    right: 0px;
    background-color: #fff;
    padding: 15px 30px;
    border-radius: 8px;
    border: 1px solid #eaeaea;
    z-index: 100;

    p {
      cursor: pointer;
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: 500;
      color: $color-primary;
      text-align: center;
      letter-spacing: 0.02em;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .curn {
    cursor: default;
  }

  .add-a-product-wrapper {
    padding-top: 40px;
    max-width: 1015px;
  }

  .add-a-product {
    width: 300px;
  }

  .spacer {
    display: none;
    height: 110px;
  }

  @media (max-width: 1000px) {
    .spacer {
      display: block;
    }
  }

  .stat-icon {
    width: 20px;
  }

  .stat-box {
    display: flex;
    justify-content: center;
    align-self: center;
    gap: 0;
    color: #999;

    img {
      object-position: 50% 100%;
    }

    span {
      font-size: 12px;
      letter-spacing: 0.02em;
      font-style: italic;
    }
  }

  .ml_0 {
    margin-left: 4px;
  }

  .copy-link {
    letter-spacing: 0.02em;
    color: $color-primary;
    border: 1px solid $color-primary;
    padding: 2px;
    border-radius: 5px;
    font-size: 12px;
    line-height: 12px;
    margin-left: 10px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    kerning: 100;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 4px;
    padding-right: 4px;
    img {
      height: 16px;
      height: 16px;
      object-fit: contain;
    }
    &:hover {
      background-color: $color-primary;
      color: $color-white;
    }
  }

  .copy-link-2 {
    margin-left: 20px;
    display: none;
  }

  @media (max-width: 680px) {
    .copy-link-1 {
      display: none;
    }    
    .copy-link-2 {
      display: flex;
    }
  }

  .text-darki {
    color: $color-background-dark !important;
  }

  @media (max-width: 980px) {
    .lgs {
      font-size: 38px;
    }
  }
  .edit-link {
    color: $color-primary;
    font-size: 13px;
    text-decoration: underline;
    letter-spacing: 0.02em;
    /*margin-left: 7px;*/
  }

  @media (max-width: 1000px) {
    .edit-link {
      margin-top: 5px;
    }
  }

  .edit-link-a {
    margin-left: 12px;
  }

  .edit-link-b {
    display: none;
  }

  @media (max-width: 1000px) {
    .edit-link-a {
      display: none;
    }
    .edit-link-b {
      display: flex;
    }
  }

  .g_ {
    gap: 5px;
  }

  .quantity {
    margin-right: 20px;
    p {
      font-size: 14px;
      margin-right: 5px;
    }
    input {
      width: 60px;
      height: 20px;
      margin-bottom: 0;
    }
  }

  .product-icon {
    color: $color-primary;
    font-size: 30px;
  }

  .existing-product-icon {
    color: $color-background-dark;
    font-size: 26px;
  }

  .stat-icon-2 {
    font-size: 14px;
    color: #777;
  }
  .link-icon {
    font-size: 14px;
  }

  .add-product-text {
    color: $color-primary;
    margin-left: 8px;
    font-size: 15px;
    /*text-decoration: underline;*/
  }

  .add-product-button {
    i {
      font-size: 18px;
      margin-right: 10px;
    }
    span {
      margin-top: 1px;
    }

    &:hover {
      background-color: $color-primary;
      i, span {
        color: $color-white;
      }
    }
  }

  .each-product-box {
    padding: 20px;
    border-radius: 10px;
    background-color: $color-white;
  }

  .go-back-to-my-products {

  }

  ._ww {
    text-transform: lowercase;
    font-weight: bold;
  }

</style>
