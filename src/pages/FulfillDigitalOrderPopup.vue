<template>
  <div class="wrapper df fdc f1 w100p" @click="closeDigitalServiceFulfillMenu()">

    <div class="whole-page-box-global w100p df fdc min100 posrel" @click="stopProp($event)">

      <div class="close-x" @click="closeDigitalServiceFulfillMenu()">
        <img src="../../static/images/xmark-light.svg">
      </div>

      <h2 class="product-name">
        {{$store.getters['AUTH.digitalOrderPopup'].v.heading || $store.getters['AUTH.digitalOrderPopup'].v.title}} x {{$store.getters['AUTH.digitalOrderPopup'].v.quantity || 1 }}
      </h2>
      <div v-if="$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails" class="income-row income-heading-row df jcsb">
        <div class="income-heading">
          <p class="order-number">
            Order #{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.orderId}}
          </p>
        </div>
      </div>
      <div v-if="$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails" class="df fdc messages-box">
          <!-- <h4>Order Correspondence</h4> -->
          <div class="product-detail f1 df fdc buyer-message" v-if="$store.getters['AUTH.digitalOrderPopup'].v.productType == 'physical-product'">
            <h3 class="text-dark mb20">Ship to:</h3>

            <div v-if="$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails" class="df fdc">
              <p>{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shipToName}}</p>
              <p>{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shippingAddress.address1}}</p>
              <p v-if="$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shippingAddress.address2">{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shippingAddress.address2}}</p>
              <p>{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shippingAddress.city}}, {{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shippingAddress.state}}</p>
              <p>{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shippingAddress.postalCode}}</p>
              <p>{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shippingAddress.country}}</p>
              <br/>
              <p>{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.email}}</p>
              <p>{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shipToPhoneNumber}}</p>
            </div>
            <div v-else-if="$store.getters['AUTH.digitalOrderPopup'].fulfillmentDetails" class="df fdc">
              <p>{{$store.getters['AUTH.digitalOrderPopup'].fulfillmentDetails.shipToName}}</p>
              <p>{{$store.getters['AUTH.digitalOrderPopup'].fulfillmentDetails.shippingAddress.address1}}</p>
              <p v-if="$store.getters['AUTH.digitalOrderPopup'].fulfillmentDetails.shippingAddress.address2">{{$store.getters['AUTH.digitalOrderPopup'].fulfillmentDetails.shippingAddress.address2}}</p>
              <p>{{$store.getters['AUTH.digitalOrderPopup'].fulfillmentDetails.shippingAddress.city}}, {{$store.getters['AUTH.digitalOrderPopup'].fulfillmentDetails.shippingAddress.state}}</p>
              <p>{{$store.getters['AUTH.digitalOrderPopup'].fulfillmentDetails.shippingAddress.postalCode}}</p>
              <p>{{$store.getters['AUTH.digitalOrderPopup'].fulfillmentDetails.shippingAddress.country}}</p>
              <br/>
              <p>{{$store.getters['AUTH.digitalOrderPopup'].fulfillmentDetails.email}}</p>
              <p>{{$store.getters['AUTH.digitalOrderPopup'].fulfillmentDetails.shipToPhoneNumber}}</p>
            </div>
            <!-- <p>{{shippingName()}}</p>
            <p>{{shippingPhoneNumber()}}</p>
            <p>{{shippingAddress().address1}}</p>
            <p>{{shippingAddress().city}}, {{shippingAddress().state}}</p>
            <p>{{shippingAddress().postalCode}}, {{shippingAddress().country}}</p> -->
          </div>
          <div class="product-detail f1 df fdc buyer-message" v-if="$store.getters['AUTH.digitalOrderPopup'].v.productType == 'custom-service'">

            <h4 v-if="$store.getters['AUTH.digitalOrderPopup'].v.productType == 'custom-service'" class="">{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.email}}</h4>
            <p v-if="$store.getters['AUTH.digitalOrderPopup'].v.productType == 'custom-service'" class="f1 instruction">
              {{$store.getters['AUTH.digitalOrderPopup'].v.serviceInstructions || 'No instructions'}}
            </p>
            <p class="attached-file">Attached file:</p>
            <div v-if="$store.getters['AUTH.digitalOrderPopup'].v.productType == 'custom-service'" class="df aic download-file-from-buyer" @click="goTo($store.getters['AUTH.digitalOrderPopup'].v.serciceInstructionsFiles.url, true)">
              <img class="file-icon file-icon-message" src="../../static/images/file-icon.png">
              <div class="df fdc aifs">
                <p v-if="$store.getters['AUTH.digitalOrderPopup'].v.serciceInstructionsFiles" class="file-text message-file-text">
                  {{fileText($store.getters['AUTH.digitalOrderPopup'].v.serciceInstructionsFiles.name)}}
                </p>
                <a class="df aic jcc download-file-button">
                  <i class="fal fa-arrow-to-bottom"></i>
                  Download File
                </a>
              </div>
            </div>
          </div>
          <div v-if="$store.getters['AUTH.digitalOrderPopup'].v.productType == 'custom-service'" class="product-detail f1 df fdc">
            <h2>Fulfill Order</h2>
            <div class="check-detail f1">
              <h4 class="mt_1">Attach File</h4>
              <p class="sub-line">Attach the finished order file. This file will be sent to the buyer.</p>
              <div v-if="productFulfillmentFile" class="product-delivery-file dropzone-wrapper posrel">
                <div class="df fdc aic jcc">
                  <div class="df jcc aic">
                    <img class="file-icon" src="../../static/images/file-icon.png">
                    <p class="file-text upload-file-text">
                      {{fileText(productFulfillmentFile.name)}}
                    </p>
                  </div>
                  <a class="file-remove-text text-dark" @click="removeProductDeliveryFile()">Remove File</a>
                </div>
              </div>
              <div v-else class="dropzone-wrapper posrel">
                <vue-dropzone ref="myVueDropzone" 
                        id="dropzone"
                        class="file-upload"
                        @vdropzone-file-added="uploadedProductDeliveryFile"
                        :options="dropzoneOptions">
                </vue-dropzone>
                <div class="dropzone-overlay df fdc">
                  <p>Drag File Here</p>
                  <p>or</p>
                  <a class="button-b df aic jcc">Upload File</a>
                </div>
              </div>
            </div>
            <h4 class="mt_1">Message to Buyer</h4>
            <textarea placeholder="Message to the buyer" :value="messageToTheBuyer" :maxlength="maxlength" class="f1" @input="setMessageToTheBuyer"></textarea>
          </div>
            <div v-if="$store.getters['AUTH.digitalOrderPopup'].v.productType == 'calendar-event'" class="check-calendar">
              <p>
                {{$store.getters['AUTH.digitalOrderPopup'].v.newAppointment.selectedCalendarDay}} at {{minutesToHhMm($store.getters['AUTH.digitalOrderPopup'].v.newAppointment.appointmentStartTime)}} ({{$store.getters['AUTH.digitalOrderPopup'].v.newAppointment.times[$store.getters['AUTH.digitalOrderPopup'].v.newAppointment.selectedAppointmentTime].time}} minutes)
              </p>
              <br/>
              <p v-if="$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shipToName">{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shipToName}}</p>
              <p v-if="$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shipToPhoneNumber">{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shipToPhoneNumber}}</p>
              <p>{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.email}}</p>
              <!-- <p>The buyer <strong>{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.email}}</strong> requested a call with you at <strong>{{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.selectedTimeAvailabe.time}} {{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.selectedTimeAvailabe.letters}} on {{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.selectedDay.weekday}}, {{month($store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.selectedDay.month)}} {{$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.selectedDay.day}}</strong>.</p> -->
            </div>
      </div>
      <div v-else>
        <p>-</p>
      </div>
      <div class="product-detail df complete-buttons">
        <button v-if="$store.getters['AUTH.digitalOrderPopup'].v.productType == 'custom-service'" class="just-save f1" @click="saveFulfillmentData()">Save</button>
        <button class="button-1 f2" @click="finishFulfillment()">
          {{ $store.getters['AUTH.digitalOrderPopup'].v.productType == 'custom-service' ? 'Send and ' : '' }}Mark Fulfilled
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import router from '../router'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'FulfillDigitalOrderPopup',
  data () {
    return {
      messageToTheBuyer: '',
      loading: false,
      maxlength: 2000,
      dropzoneOptions: {
          autoProcessQueue: false,
          url: 'https://',
          thumbnailWidth: 100,
          maxFilesize: 0.5,
          // headers: { "My-Awesome-Header": "header value" },
          // dictDefaultMessage: 'Check',
          // previewTemplate: document.querySelector('#template-container').innerHTML
          dictDefaultMessage: ``
      },
      productFulfillmentFile: ''
    }
  },
  props: ['mode'],
  components: {
    vueDropzone: vue2Dropzone
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
    setMessageToTheBuyer (event) {
      console.log('messageToTheBuyer', event.target.value)
      this.messageToTheBuyer = event.target.value
    },
    shippingName () {
      return this.$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shipToName
    },
    shippingPhoneNumber () {
      return this.$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shipToPhoneNumber
    },
    shippingAddress () {
      return this.$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.shippingAddress
    },
    fileText (text) {
      console.log('fileText', text)
      let maxLength = 20
      if (text.length > maxLength) {
        return '...' + text.substring(text.length - maxLength, text.length)
      }
      return text
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
    orderType () {
      let type = this.$store.getters['AUTH.digitalOrderPopup'].v.productType
      if (type == 'custom-service') {
        return 'Digital Service'
      } else if (type == 'calendar-event') {
        return 'Calendar Event'
      }
    },
    goTo (file, newTab) {
      console.log('file', file)
      if (newTab) {
        window.open(file, '_blank');
      } else {
        window.location = file
      }
    },
    saveFulfillmentData (o, i) {
      console.log('saveFulfillmentData')
      console.log('o', this.$store.getters['AUTH.digitalOrderPopup'].o)
      console.log('i', this.$store.getters['AUTH.digitalOrderPopup'].i)
      console.log('order', this.$store.getters['AUTH.digitalOrderPopup'].order)
      console.log('item', this.$store.getters['AUTH.digitalOrderPopup'].v)
      console.log('orderId', this.$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.orderId)

      this.$store.dispatch('AUTH.saveFulfillmentData', {
        messageToTheBuyer: this.messageToTheBuyer,
        productFulfillmentFile: this.productFulfillmentFile,
        orderId: this.$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.orderId,
        i: this.$store.getters['AUTH.digitalOrderPopup'].i
      })
    },
    finishFulfillment () {
      this.$store.dispatch('AUTH.finishFulfillment', {
        messageToTheBuyer: this.messageToTheBuyer,
        productFulfillmentFile: this.productFulfillmentFile,
        orderId: this.$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentDetails.orderId,
        i: this.$store.getters['AUTH.digitalOrderPopup'].i
      }).then((res) => {
        console.log('finished', res)
        if (res == 'ok') {
          // console.log('then', then)
          this.$store.getters['AUTH.digitalOrderPopup'].then && this.$store.getters['AUTH.digitalOrderPopup'].then()
          this.closeDigitalServiceFulfillMenu()
          // this.$store.dispatch('AUTH.notifyFulfillments', null)
        }
      })
    },
    stopProp (event) {
      event.stopPropagation()
    },
    closeDigitalServiceFulfillMenu () {
      this.$store.dispatch('AUTH.setFulfillmentMenu', null)
    },
    removeProductDeliveryFile () {
      this.productFulfillmentFile = ''
    },

    uploadedProductDeliveryFile (file) {
      let item = {
        productId: this.productId,
        file
      }
      this.$store.dispatch('AUTH.uploadProductFulfillmentFile', item).then((res) => {
        this.productFulfillmentFile = res
      })
    },
    getExistingFulfillmentData () {
      console.log(this.$store.getters['AUTH.digitalOrderPopup'].order)
      let existingFulfillment = this.$store.getters['AUTH.digitalOrderPopup'].order.fulfillmentResponse
      console.log('existingFulfillment', existingFulfillment)
      for (let item in existingFulfillment) {
        this[item] = existingFulfillment[item]
      }
      this.then = this.$store.getters['AUTH.digitalOrderPopup'].then
      // console.log('*****', )
      // this.$store.dispatch('AUTH.getExistingFulfillmentData', item).then((res) => {
      //   console.log('res', res)
      //   // this.productFulfillmentFile = res
      // })
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('....', this.$store.getters['AUTH.digitalOrderPopup'])
    // this.getExistingFulfillmentData()
  },
  mounted () {
    console.log('mounted')
    this.messageToTheBuyer = this.$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentResponse && this.$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentResponse.messageToTheBuyer
    this.productFulfillmentFile = this.$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentResponse && this.$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentResponse.productFulfillmentFile
    console.log('this.messageToTheBuyer', this.messageToTheBuyer)
    console.log('this.productFulfillmentFile', this.productFulfillmentFile)
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">
@import "../styles/settings.scss";

h2 {
  letter-spacing: -0.03em;
}

h2, p {
  color: $color-background-dark;
}

.wrapper {
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100vh;
  /*position: absolute;*/
  position: fixed;
  z-index: 100000;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  min-height: 100vh;

  & > div {
    /*min-height: 100vh;*/
    border-radius: 0;
  }
  /*@import "../styles/settings.scss";*/
}


  .product-delivery-file {
    & > div {
      border: 1px solid rgba(50, 50, 93, 0.1);
      border-radius: 6px;
      width: 100%;
      height: 100px;
    }
  }
  .file-upload {
    width: 100%;
    /*max-width: 500px;*/
    height: 100px;
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
          color: #fff;
        }
      }
    }
  }
  $image-upload-size: 200px;
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
.whole-page-box-global {
  max-width: 800px;
  padding: 29px;
  /*padding-top: 14px;*/
}
.income-row {
  min-width: 100px;
  margin-bottom: 10px;

  .income-heading {
    flex: 1;
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
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
  $placeholderColor: #898989;
  input, textarea {
    /*max-width: 540px;*/
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
      color: #fff;
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
  .file-icon-message {
    height: 30px;
    margin-bottom: 0;
    margin-right: 8px;
  }
  .file-text {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .file-remove-text {
    font-size: 10px;
    text-decoration: underline;
  }
  .mt_1 {
    margin-top: 14px;
    margin-bottom: 4px;
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
    background-color: #1a3684;
  }
  .just-save {
    background-color: transparent;
    box-shadow: none;
    color: #2b2b2b;
  }
  .complete-buttons {
    margin-top: 30px;
  }
  .close-x {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 25px;
    text-align: right;

    img {
      height: 27px;
      opacity: 0.85;
    }
  }
  .min100 {
    min-height: calc(100vh - 200px);
  }
  @media (max-width: 800px) {
    .min100 {
      min-height: 100vh;
    }
  }
  .product-name {
    letter-spacing: -0.03em;
    color: $color-primary;
  }
  .order-number {
    margin-top: 4px;
    margin-bottom: 20px;
    letter-spacing: -0.03em;
    font-size: 12px;
  }

  .messages-box {
/*    border: 1px solid grey;
    padding: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 20px;*/
  }

  .buyer-message {
    padding: 15px;
    border-radius: 20px;
    border-bottom-left-radius: 0;
    background-color: #f8f8f8;
    border: 1px solid #f0f0f0;
    margin-bottom: 30px;
  }
  .download-file-from-buyer {

  }
  .download-file-button {
    font-size: 12px;
    line-height: 1em;
    color: $color-primary;
    display: flex;
    align-items: center;
    i {
      font-size: 14px;
      line-height: 1em;
      color: $color-primary;
      margin-right: 4px;
    }
  }
  .instruction {
    margin-bottom: 8px;
  }
  .message-file-text {
    margin-bottom: 4px;
  }
  .attached-file {
    font-weight: 600;
    font-size: 14px;
  }
  .upload-file-text {
    max-width: 150px;
  }
  .dropzone-wrapper {
    & > div, & > #dropzone {
      height: 100px !important;
      min-height: 100px !important;
    }
  }
</style>
