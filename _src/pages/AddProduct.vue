<template>
  <div class="product-wrapper minh df fdc aic jcc f1 w100p" v-if="deleted">
    This project has been deleted
  </div>
  <div class="product-wrapper df fdc aic f1 w100p" v-else>

    <div class="top-bar-global w100p _position1 df jcsb aic">
      <div class="breadcrumb df">
        <h2 class="breadcrumb-other" @click="goTo('/me')">Home</h2>
        <h2 class="breadcrumb-separator">/</h2>
        <h2>{{newOrEdit()}} {{productTypeDisplay()}}</h2>
      </div>
      <div class="previews df jcsb aic">
        <div class="df" v-if="uniqueProductId">
          <a>URL:&nbsp;</a>
          <a :href="'http://localhost:8080/pay/' + uniqueProductId" target="_blank">/pay/{{uniqueProductId}}</a>
        </div>
        <div class="df" v-else>
          <a>Save this product to get your live URL</a>
        </div>
<!--         <a>Preview:</a>
        <p>(PHONE)</p>
        <p>(COMP)</p>
        <p>(TAB)</p> -->
      </div>
    </div>

    <div class="whole-page-box-global w100p df fdc">
      <div class="digital-download-details df jcsb aifs f1">
        <div v-if="productImageUrl" class="dropzone-wrapper image-dropzone-wrapper posrel df fdc aic jcc">
          <img class="image-uploaded" :src="productImageUrl">
          <a class="w100p tac image-uploaded-under" @click="removeProductImage()">Remove Image</a>
        </div>
        <div v-else class="dropzone-wrapper image-dropzone-wrapper posrel">
          <vue-dropzone ref="myVueDropzone" 
                  id="dropzone-a"
                  class="image-upload"
                  @vdropzone-file-added="uploadedProductImage"
                  :options="dropzoneOptions">
          </vue-dropzone>
          <div class="dropzone-overlay df fdc">
            <p>Drag Image Here</p>
            <p>or</p>
            <a class="button-b df aic jcc">Upload File</a>
          </div>
        </div>
        <div class="product-basics f1 df fdc">
          <h3>{{productTypeDisplay()}}</h3>
          <div class="df w100p jcsb product-detail-outer">
            <div class="product-detail">
              <h4>Heading</h4>
              <input placeholder="Product Heading" v-model="heading" type="" name="">
            </div>
            <div class="product-detail">
              <h4>Price ($US)</h4>
              <div class="df">
                <input placeholder="$0.00" step="0.01" @change="changePrice($event)" :value="(price/100).toFixed(2)" type="number" name="">
              </div>
            </div>
          </div>
          <div class="product-detail f1 df fdc">
            <h4>Description</h4>
            <textarea placeholder="Describe the product" v-model="description" :maxlength="maxlength" class="f1"></textarea>
          </div>
          <div class="product-detail">
            <h4>Secondary Heading</h4>
            <input placeholder="Secondary Heading" v-model="secondaryHeading" type="" name="">
          </div>
          <div class="product-detail">
            <h4>Call To Action Text</h4>
            <input placeholder="Call To Action" v-model="callToActionText" type="" name="">
          </div>
          <h3>Fulfillment</h3>
          <p v-if="this.productType == 'digital-download'" class="reference">The customer will be asked to provide their e-mail address.</p>
          <p v-else-if="this.productType == 'digital-service'" class="reference">The customer will be asked to provide their e-mail address and upload reference files.</p>
          <p v-else-if="this.productType == 'calendar-event'" class="reference">The customer will be asked to select a time to book an appointment.</p>
          <div class="product-detail df" v-if="this.productType == 'digital-download'">
            <div class="check-fulfillment">
              <input v-model="addFile" type="checkbox" class="check-fulfillment-box" name="">
            </div>
            <div class="check-detail f1">
              <h4>Send File</h4>
              <p class="sub-line">Files will be sent automatically after purchase</p>
              <div v-if="productDeliveryFile" class="product-delivery-file dropzone-wrapper posrel">
                <div class="df fdc aic jcc">
                  <img class="file-icon" src="../../static/images/file-icon.png">
                  <p class="file-text">
                    {{productDeliveryFile.name}}
                  </p>
                  <a class="file-remove-text" @click="removeProductDeliveryFile()">Remove File</a>
                </div>
              </div>
              <div v-else class="dropzone-wrapper posrel">
                <vue-dropzone ref="myVueDropzone" 
                        id="dropzone"
                        class="file-upload"
                        @vdropzone-file-added="uploadedProductDeliveryFile"
                        :options="dropzoneOptions2">
                </vue-dropzone>
                <div class="dropzone-overlay df fdc">
                  <p>Drag File Here</p>
                  <p>or</p>
                  <a class="button-b df aic jcc">Upload File</a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="productType == 'calendar-event'" class="product-detail df">
            <div class="check-detail f1">
              <h4>My Availability</h4>
              <p class="sub-line">When would you like to take this appointment?</p>
              <div class="my-availability df fdc">
                <div class="one-day df jcsb w100p aic" v-for="(day, i) in [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ]">
                  <p class="f1">{{day}}</p>
                  <p>From</p>
                  <select v-model="calendarFrom[i]" class="r0 r1">
                    <option>12 am</option>
                    <option>1 am</option>
                    <option>2 am</option>
                    <option>3 am</option>
                    <option>4 am</option>
                    <option>5 am</option>
                    <option>6 am</option>
                    <option>7 am</option>
                    <option>8 am</option>
                    <option>9 am</option>
                    <option>10 am</option>
                    <option>11 am</option>
                    <option>12 pm</option>
                    <option>1 pm</option>
                    <option>2 pm</option>
                    <option>3 pm</option>
                    <option>4 pm</option>
                    <option>5 pm</option>
                    <option>6 pm</option>
                    <option>7 pm</option>
                    <option>8 pm</option>
                    <option>9 pm</option>
                    <option>10 pm</option>
                    <option>11 pm</option>
                  </select>
                  <p>to</p>
                  <select v-model="calendarTo[0]" class="r1">
                    <option>12 am</option>
                    <option>1 am</option>
                    <option>2 am</option>
                    <option>3 am</option>
                    <option>4 am</option>
                    <option>5 am</option>
                    <option>6 am</option>
                    <option>7 am</option>
                    <option>8 am</option>
                    <option>9 am</option>
                    <option>10 am</option>
                    <option>11 am</option>
                    <option>12 pm</option>
                    <option>1 pm</option>
                    <option>2 pm</option>
                    <option>3 pm</option>
                    <option>4 pm</option>
                    <option>5 pm</option>
                    <option>6 pm</option>
                    <option>7 pm</option>
                    <option>8 pm</option>
                    <option>9 pm</option>
                    <option>10 pm</option>
                    <option>11 pm</option>
                  </select>

                </div>
              </div>
              <!-- <input placeholder="http://" v-model="redirectURL" class="mw2" type="" name=""> -->
            </div>
          </div>
          <div v-if="productType == 'calendar-event'" class="product-detail df">
            <div class="check-detail max-detail f2">
              <h4>Timezone</h4>
              <!-- <p class="sub-line">The customer will be redirected to the URL after purchase</p> -->
              <select v-model="myTimezone" class="">
                <option v-for="(item, i) in allTimezones">
                  {{item.label}}
                </option>
              </select>
            </div>
            <div class="check-detail f1">
              <h4>Appointment Length</h4>
              <!-- <p class="sub-line">The customer will be redirected to the URL after purchase</p> -->
                  <select v-model="appointmentLength" class="">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>half day</option>
                    <option>full day</option>
                  </select>
            </div>
          </div>
          <div class="product-detail df">
            <div class="check-fulfillment">
              <input v-model="addURL" type="checkbox" class="check-fulfillment-box" name="">
            </div>
            <div class="check-detail f1">
              <h4>Redirect to url</h4>
              <p class="sub-line">The customer will be redirected to the URL after purchase</p>
              <input placeholder="http://" v-model="redirectURL" class="mw2" type="" name="">
            </div>
          </div>
          <div class="product-detail df">
            <button class="just-save" @click="saveProduct()">Save</button>
            <button @click="saveProduct(true)" v-if="!public">Activate</button>
            <button @click="deactivateProduct()" v-else>De-Activate</button>
          </div>
          <div class="product-detail delete-product df">
            <p class="just-save" @click="deleteProduct()">delete product</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import router from '@/router'
import common from '@/util/common'
import products from '@/util/products'
import LandingProduct from '@/components/LandingProduct'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'AddProduct',
  data () {
    return {
      maxlength: 200,
      allTimezones: common.timezones,
      myTimezone: '(GMT-05:00) Eastern Time (US & Canada)',
      appointmentLength: '15 minutes',
      calendarFrom: [
        '9 am',
        '9 am',
        '9 am',
        '9 am',
        '9 am',
        '9 am',
        '9 am',
      ],
      calendarTo: [
        '5 pm',
        '5 pm',
        '5 pm',
        '5 pm',
        '5 pm',
        '5 pm',
        '5 pm',
      ],
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
      dropzoneOptions2: {
          autoProcessQueue: false,
          url: 'https://',
          thumbnailWidth: 150,
          maxFilesize: 20,
          // headers: { "My-Awesome-Header": "header value" },
          // dictDefaultMessage: 'Check',
          // previewTemplate: document.querySelector('#template-container').innerHTML
          dictDefaultMessage: ``
      },
      loading: false,
      productImageUrl: '',
      productDeliveryFile: '',
      heading: 'My awesome product',
      price: 5.00,
      description: 'About my awesome product',
      secondaryHeading: 'Get it now!',
      redirectURL: '',
      callToActionText: 'Purchase',
      productType: '',
      addFile: true,
      addURL: false,
      created: '',
      modified: '',
      ownerId: null,
      productId: null,
      uniqueProductId: null,
      public: false,
      deleted: false
    }
  },
  props: ['feel'],
  components: {
    LandingProduct,
    vueDropzone: vue2Dropzone
  },
  methods: {
    goTo (path) {
      router.push(path)
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
    deactivateProduct () {
      this.$store.dispatch('AUTH.deactivateProduct', {uniqueProductId: this.uniqueProductId}).then((res) => {
        console.log('PRODUCT deactivated', res)
        if (res == 'ok') {
          this.public = false
        }
      })
    },
    deleteProduct () {
      let productObject = {
        uniqueProductId: this.uniqueProductId,
        productId: this.productId,
      }
      this.$store.dispatch('AUTH.deleteProduct', productObject).then((res) => {
        console.log('Product archived', res)
        this.deleted = true
      })
    },
    saveProduct (activate) {
      let productObject = {
        calendarFrom: this.calendarFrom,
        calendarTo: this.calendarTo,
        myTimezone: this.myTimezone,
        appointmentLength: this.appointmentLength,
        heading: this.heading,
        price: this.price,
        description: this.description,
        secondaryHeading: this.secondaryHeading,
        redirectURL: this.redirectURL,
        callToActionText: this.callToActionText,
        addFile: this.addFile,
        addURL: this.addURL,
        created: this.created,
        modified: this.modified,
        productType: this.productType,
        productImageUrl: this.productImageUrl,
        uniqueProductId: this.uniqueProductId,
        productDeliveryFile: this.productDeliveryFile,
        productId: this.productId,
      }
      if (activate) {
        productObject.public = true
      }
      this.$store.dispatch('AUTH.saveProduct', productObject).then((res) => {
        let product = res
        for (let i in product) {
          this[i] = product[i]
        }

      })
    },
    removeProductImage () {
      this.productImageUrl = ''
    },
    removeProductDeliveryFile () {
      this.productDeliveryFile = ''
    },
    uploadedProductImage (file) {
      let item = {
        productId: this.productId,
        file
      }
      this.$store.dispatch('AUTH.uploadProductImage', item).then((res) => {
        this.productImageUrl = res.url
      })
    },
    uploadedProductDeliveryFile (file) {
      let item = {
        productId: this.productId,
        file
      }
      this.$store.dispatch('AUTH.uploadProductDeliveryFile', item).then((res) => {
        this.productDeliveryFile = res
      })
    },
    generateNewInternalProductId () {
    },
    loadDefaultProduct () {
      let randomNumber = Math.floor(Math.random() * 100000000000)
      let now = (new Date()).getTime()
      let route = this.$route
      let type = route.params.type

      let defaultProduct = {
        myTimezone: '(GMT-05:00) Eastern Time (US & Canada)',
        calendarFrom: [
          '9 am',
          '9 am',
          '9 am',
          '9 am',
          '9 am',
          '9 am',
          '9 am',
        ],
        calendarTo: [
          '5 pm',
          '5 pm',
          '5 pm',
          '5 pm',
          '5 pm',
          '5 pm',
          '5 pm',
        ],
        appointmentLength: '15 minutes',
        productImageUrl: '',
        productDeliveryFile: '',
        heading: 'My awesome product',
        price: 5.00,
        description: 'About my awesome product',
        secondaryHeading: 'Get it now!',
        redirectURL: '',
        callToActionText: 'Purchase',
        productType: type,
        addFile: true,
        addURL: false,
        created: now,
        modified: '',
        productId: randomNumber,
        uniqueProductId: null
      }
      for (let i in defaultProduct) {
        this[i] = defaultProduct[i]
      }

    },
    getProductData () {
      let route = this.$route
      let productId = route.params.id
      if (productId) {
        this.$store.dispatch('AUTH.getProductDetails', productId).then((product) => {
          for (let i in product) {
            this[i] = product[i]
          }
        })
      }
    },
    setupProduct () {
      this.loadDefaultProduct()
      this.getProductData()
    }
  },
  computed: {
  },
  watch: {
  '$route.params': {
      handler: function (params) {
        let id = params.id
         if (id) {
          this.getProductData()
         } else {
          this.loadDefaultProduct()
         }
      },
      // deep: true,
      immediate: true
    }
  },
  created () {
    this.setupProduct()
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
    color: #5469d4;
  }

  hr {
    margin-bottom: 45px;
  }

  .product-wrapper {
    /*background-color: #292929;*/
    padding: 30px;
    padding-top: 0;
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
    height: 68px;
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
    min-height: 200px;
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
  }
  .product-detail-outer {
    max-width: 500px;

    & > .product-detail {
      flex: 1;
      &:first-child {
        flex: 2;
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
    border: 1px solid #5469d4;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #5469d4;
    padding: 2px 6px;
    height: 30px;

    &:hover {
      border: 1px solid transparent;
      background-color: #5469d4;
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

  @media (max-width: 980px) {
    .digital-download-details {
      flex-direction: column;
      .dropzone-wrapper {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }

  .delete-product {
    font-size: 12px;
    margin-top: 30px;
    margin-left: 40px;
    display: flex;
    justify-content: flex-end;
    padding-right: 40px;
    cursor: pointer;
  }

  .minh {
    height: 100%;
  }
</style>
