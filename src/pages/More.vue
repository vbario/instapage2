<template>
  <div class="product-wrapper df fdc aic f1 w100p">

    <div class="top-bar-global w100p df jcsb aic top-bar-override plpr30 only-big">
      <div class="breadcrumb df fdc">
        <h2 class="header-style header-style-big">More</h2>
        <!-- <div v-if="$store.getters['AUTH.email']" class='your-email aic your-email-2'>
          <p>{{$store.getters['AUTH.email']}}</p>
        </div> -->
      </div>
    </div>


    <div class="w100p df g__ plpr30 fww">
      <div class="df fdc aic jcc more-link" @click="goToTab('income')">
        <!-- <div class="more-icon-image-wrapper">
          <i class="fa-solid fa-money-check-dollar"></i>
        </div> -->
        <h5>Income</h5>
      </div>
      <div class="df fdc aic jcc more-link" @click="goToTab('shipping')">
        <!-- <div class="more-icon-image-wrapper">
          <i class="fa-solid fa-truck"></i>
        </div> -->
        <h5>Shipping</h5>
      </div>
      <div class="df fdc aic jcc more-link" @click="goToTab('audience')">
        <!-- <div class="more-icon-image-wrapper">
          <i class="fa-solid fa-people-group"></i>
        </div> -->
        <h5>Audience</h5>
      </div>
      <div class="df fdc aic jcc more-link" @click="goToTab('messages')">
        <!-- <div class="more-icon-image-wrapper">
          <i class="fa-solid fa-people-group"></i>
        </div> -->
        <h5>Messages</h5>
      </div>
      <!-- <div class="df fdc aic jcc more-link" @click="goToTab('products')">
        <div class="more-icon-image-wrapper">
          <i class="fa-solid fa-people-group"></i>
        </div>
        <h5>[Products]</h5>
      </div> -->
      <!-- <div class="df fdc aic jcc more-link" @click="goTo('/inventory')">
        <div class="more-icon-image-wrapper">
          <img class="more-icon-image" src="../../static/images/momentum/icon-inventory.png"/>
        </div>
        <h5>Inventory</h5>
      </div> -->
    </div>

    <hr class="w100p"/>

    <Income v-if="currentTab == 'income'" />
    <Shipping v-if="currentTab == 'shipping'" />
    <Audience v-if="currentTab == 'audience'" />
    <ContactFormMessages v-if="currentTab == 'messages'" />
    <Products v-if="currentTab == 'products'" />

    <!-- <div class="w100p plpr30 mb20 only-small more-below-link">
      <p class="text-dark curp" @click="goTo('/settings?back=more')">Settings</p>
    </div> -->

  </div>
</template>

<script>

import common from '@/util/common'
import products from '@/util/products'
import LandingProduct from '@/components/LandingProduct'
import Income from '@/pages/Income'
import Shipping from '@/pages/Shipping'
import Audience from '@/pages/Audience'
import ContactFormMessages from '@/pages/ContactFormMessages'
import Products from '@/pages/Products'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import router from '@/router'

export default {
  name: 'More',
  data () {
    return {
      currentTab: '',
      myShippingRates: {
        loaded: false,
        providers: {},
        zones: {}
      },
      dropzoneOptions: {
          autoProcessQueue: false,
          url: 'https://',
          thumbnailWidth: 150,
          maxFilesize: 1,
          // headers: { "My-Awesome-Header": "header value" },
          // dictDefaultMessage: 'Check',
          // previewTemplate: document.querySelector('#template-container').innerHTML
          dictDefaultMessage: ``
      },
      loading: false,
      profileImageUrl: '',
      fullName: '',
      displayName: '',
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    }
  },
  props: ['feel'],
  components: {
    LandingProduct,
    vueDropzone: vue2Dropzone,
    Income,
    Shipping,
    Audience,
    ContactFormMessages,
    Products
  },
  methods: {
    goToTab (currentTab) {
      this.currentTab = currentTab
    },
    logout () {
      this.$store.dispatch('AUTH.logout', {})
    },
    goTo (path) {
      router.push(path)
    },
    startEnablePayouts () {
      console.log('enable payouts')
      // this.$store.dispatch('AUTH.startEnablePayouts', {})
    },
    logout () {
      this.$store.dispatch('AUTH.logout', {})
    },
    changePrice (e) {
      let price = e.target.value
      console.log('price', price)
      this.price = price * 100
    },
    newOrEdit () {
      if (this.uniqueProductId) {
        return 'Edit '
      }
      return 'New '
    },
    productTypeDisplay () {
      let type = this.productType
      if (type == 'digital-download') {
        return 'Digital Download'
      } else if (type == 'digital-service') {
        return 'Service'
      } else if (type == 'calendar-event') {
        return 'Calendar Invite'
      }
      return ''
    },
    saveProfile (activate) {
      let productObject = {
        profileImageUrl: this.profileImageUrl,
        fullName: this.fullName,
        displayName: this.displayName,
        newPassword: this.newPassword,
        newPasswordConfirm: this.newPasswordConfirm,
      }

      this.$store.dispatch('AUTH.saveProfile', productObject).then((res) => {
        let product = res
        console.log('profile', res)
      })
    },
    setNewPassword () {
      this.$store.dispatch('AUTH.setNewPassword', {p: this.currentPassword, p2: this.newPassword}).then((res) => {
        console.log('password changed')
        if (res == 'ok') {
          this.currentPassword = ''          
          this.newPassword = ''          
          this.newPasswordConfirm = ''          
        }
        // let product = res
        // console.log('profile', res)
      })
    },
    removeProductImage () {
      this.profileImageUrl = ''
    },
    removeProductDeliveryFile () {
      this.productDeliveryFile = ''
    },
    uploadedProductImage (file) {
      let item = {
        uid: this.$store.getters['AUTH.uid'],
        file
      }
      this.$store.dispatch('AUTH.uploadProfileImage', item).then((res) => {
        this.productImageUrl = res.url
      })
    },
    generateNewInternalProductId () {
    },
    getMySheetsData () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMySheetsData', {}).then((res) => {
          this.connectedSheetId = (res || {}).sheetId || ''
        })
      } else {
        setTimeout(() => {
          this.getMySheetsData()
        }, 500)
      }
    },
    // loadProductList () {
    //   if (this.$store.getters['AUTH.myProductsList']) {
    //     this.fulfillmentsOrders = JSON.parse(JSON.stringify(this.$store.getters['AUTH.myProductsList']))
    //     console.log('go', this.fulfillmentsOrders)
    //     this.sortFulfillments()
    //   } else {
    //     setTimeout(() => {
    //       this.loadProductList()
    //     }, 500)
    //   }
    // },
    loadProfile () {
      if (this.$store.getters['AUTH.myInfo'] && this.$store.getters['AUTH.myPrivateInfo']) {
        this.fullName = this.$store.getters['AUTH.myPrivateInfo'].fullName.fullName
        this.displayName = this.$store.getters['AUTH.myInfo'].displayName.displayName
        console.log('Profile Image Url', this.$store.getters['AUTH.myPrivateInfo'].profileImageUrl.profileImageUrl)
        this.profileImageUrl = this.$store.getters['AUTH.myPrivateInfo'].profileImageUrl.profileImageUrl
      } else {
        setTimeout(() => {
          this.loadProfile()
        }, 500)
      }
    },
    checkForOAuthCodes () {
      let route = this.$route
      let query = route.query.query
      let code = route.query.code
      let scope = route.query.scope
      let state = route.query.state

      if (code && scope && state) {
        // send code to server
        this.$store.dispatch('AUTH.sendGoogleSheetsCode', {code, scope, state}).then((res) => {
          console.log('sendGoogleSheetsCode response', res)
          if ((res.status == 200) && (res.message == 'success')) {
            // this.loadMyShippingProviders()
            this.$router.replace({
              query: {}
            })

            // this.$router.replace({
            //   query: Object.assign({}, this.$route.query, {
            //     wallet: undefined,
            //   })
            // })


            // this.newShipperSelected = ''
            // this.newSMOID = ''
            // this.connectAShippingProvider(false)
            // this.loadMyShippingProviders()
            // open 'add sheets' dialog and ask to select the sheet to connect
          }
        })
      }

      
      console.log('route', route)
    }
  },
  computed: {
  },
  watch: {
  // '$route.params': {
  //     handler: function (params) {
  //       let id = params.id
  //        if (id) {
  //         this.getProductData()
  //        } else {
  //         this.loadDefaultProduct()
  //        }
  //     },
  //     // deep: true,
  //     immediate: true
  //   }
  },
  created () {
    // this.loadProfile()
    // this.loadMyShippingProviders()
    this.getMySheetsData()
    this.checkForOAuthCodes()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  ._position1 {
    margin-top: 8px;
  }

  h1 {
    text-transform: capitalize;
  }

  h2 {
    /*font-size: 24px;*/
    /*font-weight: 500;*/
    /*font-family: 'Rubik', 'sans-serif';*/
    /*letter-spacing: .04em !important;*/
    color: #2b2b2b;
  }

  h3 {
    margin-bottom: 18px;
    text-align: left;
    color: $color-primary;
  }

  hr {
    margin-bottom: 20px;
  }

  .product-wrapper {
    /*background-color: #292929;*/
    /*padding: 30px;*/
    padding-bottom: 30px;
    padding-top: 0;
  }
  .plpr30 {
    padding-left: 30px;
    padding-right: 30px;
  }
  .product-splash, .product-choose-your-feel {
    width: 100%;
    height: 566px;
    margin-bottom: 120px;
  }
  .product-products {
    flex-wrap: wrap;
  }
  .product-product-image {
    width: 515px;
    min-width: 515px;
    height: 566px;
  }
  .top-bar-global {
    /*height: 68px;*/
  }
  .whole-page-box-global {
  }
  $image-upload-size: 200px;
  .image-upload {
    width: $image-upload-size;
    height: $image-upload-size;
    border-radius: 6px;
    /*padding: 12px;*/
    border: 1px dashed rgba(50, 50, 93, 0.1);
    font-size: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover {
      & + .dropzone-overlay {
        background-color: #fdfdfd;
        border: 1px dashed rgba(50, 50, 93, 0.12);
        
        a {
          background-color: #5469d4;
          color: $color-white;
        }
      }
    }

    & > * {
      margin: 0 !important;
    }
  }
  .image-uploaded {
    width: $image-upload-size;
    height: $image-upload-size;
    border-radius: 6px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    object-fit: cover;
  }
  .image-uploaded-under {
    margin-top: 6px;
    font-size: 12px;
  }
  .file-upload {
    width: 100%;
    /*max-width: 500px;*/
    height: 150px;
    border-radius: 6px;
    /*padding: 12px;*/
    border: 1px dashed rgba(50, 50, 93, 0.1);
    font-size: 16px;
    background: white;
    /*margin-right: 20px;*/
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover {
      & + .dropzone-overlay {
        background-color: #fdfdfd;
        border: 1px dashed rgba(50, 50, 93, 0.12);
        
        a {
          background-color: #5469d4;
          color: $color-white;
        }
      }
    }
  }
  .product-delivery-file {
    & > div {
      border: 1px solid rgba(50, 50, 93, 0.1);
      border-radius: 6px;
      width: 100%;
      height: 150px;
    }
  }
  .dropzone-overlay {
    border-radius: 10px;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    max-width: 200px;
    /*background-color: #aaa;*/
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
/*    background-color: #fbfbfb;
    border: 1px dashed rgba(50, 50, 93, 0.12);*/

    p, {
      font-size: 14px;
      margin-bottom: 6px;
    }

  }
  .product-basics {
    /*height: 200px;*/
    /*min-height: 200px;*/
  }
  textarea {
    border-radius: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    height: 44px;
    font-size: 16px;
    width: 100% !important;
    background: white;
    margin-bottom: 6px;
  }
  .digital-download-details {
    height: 100%;
  }
  .product-detail {
    margin-bottom: 20px;
    max-width: 500px;

    &:last-child {
      margin-right: 0 !important;
    }
  }
  .product-detail-outer {
    max-width: 500px;

    & > .product-detail {
      /*flex: 1;*/
      &:first-child {
        /*flex: 2;*/
        margin-right: 20px;
      }
    }
  }
  $placeholderColor: #898989;
  h4 {
    font-family: 'Rubik', 'sans-serif';
    font-size: 14px;
    letter-spacing: 0.2px;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: rgb(43, 43, 43);
  }
  input, textarea, select {
    max-width: 540px;
    border-color: #efefef !important;
    background-color: #fff;
    font-size: 14px;
    padding: 12px 10px;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: 'Rubik', 'sans-serif';
    color: rgb(43, 43, 43);


    ::-webkit-input-placeholder { /* Edge */
      color: $placeholderColor;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: $placeholderColor;
    }

    ::placeholder {
      color: $placeholderColor;
    }
  }
  .sub-line {
    margin-bottom: 8px;
  }
  .check-fulfillment {
    margin-right: 20px;

    input {
      width: 20px;
    }
  }
  .check-fulfillment-box {
    display: flex;
    flex-direction: column;
    height: 20px;
    margin: 0;
  }
  .mw2 {
    /*max-width: 500px;*/
  }
  .mw3 {
    /*max-width: 500px;*/
  }
  .just-save {
    background-color: transparent;
    box-shadow: none;
    color: #2b2b2b;
  }
  .button-b {
    border: 1px solid $color-primary;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: $color-primary;
    padding: 2px 6px;
    height: 30px;

    &:hover {
      border: 1px solid transparent;
      background-color: $color-primary;
      color: $color-white;
    }
  }
  .image-dropzone-wrapper {
    margin-right: 20px;
  }
  .file-icon {
    opacity: 0.5;
    height: 35px;
    margin-bottom: 10px;
  }
  .file-text {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .file-remove-text {
    font-size: 10px;
    text-decoration: underline;
  }
  .r0 {
    margin-right: 10px;
  }
  .r1 {
    margin-left: 10px;
  }
  .one-day {
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .max-detail {
    /*max-width: 350px;*/
    select {
      max-width: 300px;
    }
  }
  .reference {
    margin-top: 4px;
    font-size: 12px;
    margin-bottom: 12px;
  }
  .previews {
    div {
      a {
        font-size: 14px;
        color: #444;
      }
    }
  }
  .your-email {
    margin-top: 15px;
    p {
      font-family: 'CA SaygonText', sans-serif;
      font-size: 16px;
      font-weight: 400;

      &:first-child {
        font-size: 12px;
      }
    }
  }
  .placeholder-detail {
    width:: 100%;
    height: 50px;
    background-color: #e0e0e088;
  }
  .logout {
    h4 {
      font-weight: 400;
      font-size: 12px;
      margin-top: 20px;
    }
  }

  .your-email-2 {
    display: none;
  }
  .my-image-responsive {
    display: none;
  }

  @media (max-width: 480px) {
    .my-image-responsive {
      display: flex;
    }
    .top-bar-override {
      height: unset;
    }
    .product-second {
      display: none;
    }
    .your-email-2 {
      display: flex;
      margin-top: 0;

      p {
        font-size: 14px !important;
        margin-top: 6px;
        margin-bottom: 2px;
      }
    }
    .image-dropzone-wrapper {
      /*align-items: flex-start;*/
      margin-right: 0;
    }
  }
  .reset-button {
    font-weight: 400;
    font-size: 14px;
  }
  .payouts-tag {
    font-size: 14px;
    margin-bottom: 20px;
  }
  .w150 {
    width: 250px !important;
  }
  .one-shipping-provider {
    p {
      color: $color-background-dark;

      a {
        color: $color-primary;
      }
    }
  }
  @media (min-width: 980px) {
    .only-small {
      display: none;
    }
  }

  .shipping-zone {
    padding: 20px;
    border: 1px solid $color-background-dark;
    border-radius: 10px;
  }

  ._mw1 {
    max-width: 200px;
  }
  .icon {
    background-position: center !important;
    background-repeat: no-repeat !important;
    &:before {
      display: none;
    }
  }
  .icon-dollar {
    background: url('../../static/images/dollar-sign-light.svg');
  }
  .sidebar-link {
    padding: 16px 10px;
    border-radius: 5px;
    color: #222222;
    display: flex;
    align-items: center;
    transition: all 0.5s ease;
    cursor: pointer;

    &-current {
      h4, .icon {
        color: $color-primary !important;
      }
    }

    &:hover {
      // background-color: rgba(115,102,255,0.12);
      background-color: #5469D41A;
      
      // rgba(115, 102, 255, 0.12)
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;

      h4, .icon {
        color: $color-primary;
      }
    }

    .icon {
      margin-right: 10px;
      width: 46px;
      height: 26px;
      // font-size: 26px;

      // display: flex;
      // align-items: center;
      // justify-content: center;
    }

    h4 {
      color: #5C5C5C;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0;
      line-height: 17px;
    }
  }
  .sidebar-link-expandable {
    &:hover {
      background-color: unset;
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;

      h4, .icon {
        color: $color-primary;
      }
    }
  }
  .more-icon-image {
    width: 32px;
    object-fit: contain;
    margin-bottom: 2px;

    &-wrapper {
      cursor: pointer;
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
      /*background-color: #DDD;*/
      /*border: 1px solid $color-background-dark;*/
      /*margin-right: 10px;*/
    }
  }
  .g__ {

    margin-top: 30px;
    gap: 20px;

    & > .more-link {
      /*height: 30px;*/
    }
  }
  .more-link {
    cursor: pointer;
    h5 {
      font-size: 16px;
      line-height: 1em;
      margin-top: 5px;
      text-transform: lowercase;
      letter-spacing: 0.02em;
    }
  }
  .only-small {
    display: none;
  }

  @media (max-width: 980px) {
    .only-small {
      display: block;
    }
  }
  .more-below-link {
    text-transform: lowercase;
    letter-spacing: 0.02em;
  }
</style>
