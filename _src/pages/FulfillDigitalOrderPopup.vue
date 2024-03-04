<template>
  <div class="wrapper df fdc jcc aic f1 w100p" @click="closeDigitalServiceFulfillMenu()">

    <div class="whole-page-box-global w100p df fdc posrel" @click="stopProp($event)">

      <div class="close-x" @click="closeDigitalServiceFulfillMenu()">X</div>

      <div class="income-row income-heading-row df jcsb">
        <div class="income-heading">
          <h3>
            Fulfill {{orderType()}} Order #{{$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentDetails.orderId}}-0
          </h3>
        </div>
      </div>
      <div class="df fdc">
        
          <div class="product-detail f1 df fdc">
            <!-- {{$store.getters['AUTH.digitalOrderPopup'].order[0].productType}} -->

            <h4 v-if="$store.getters['AUTH.digitalOrderPopup'].v.order[0].productType == 'digital-service'" class="mt_1">Buyer Message</h4>
            <p v-if="$store.getters['AUTH.digitalOrderPopup'].v.order[0].productType == 'digital-service'" class="f1">
              {{$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentDetails.productDeliveryInstructions || 'No instructions'}}
            </p>
            <div v-if="$store.getters['AUTH.digitalOrderPopup'].v.order[0].productType == 'digital-service'"class="df fdc aic jcc" @click="goTo($store.getters['AUTH.digitalOrderPopup'].v.fulfillmentDetails.productDeliveryFile.url)">
              <img class="file-icon" src="../../static/images/file-icon.png">
              <p class="file-text">
                {{$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentDetails.productDeliveryFile.name}}
              </p>
                  <a class="button-b df aic jcc">Download File</a>
            </div>
          </div>
          <div v-if="$store.getters['AUTH.digitalOrderPopup'].v.order[0].productType == 'digital-service'" class="product-detail f1 df fdc">
            <h4 class="mt_1">Response Message</h4>
            <textarea placeholder="Message to the buyer" v-model="messageToTheBuyer" :maxlength="maxlength" class="f1"></textarea>
          </div>
            <div v-if="$store.getters['AUTH.digitalOrderPopup'].v.order[0].productType == 'digital-service'" class="check-detail f1">
              <h4 class="mt_1">Attach File</h4>
              <p class="sub-line">This file will be sent to the buyer</p>
              <div v-if="productFulfillmentFile" class="product-delivery-file dropzone-wrapper posrel">
                <div class="df fdc aic jcc">
                  <img class="file-icon" src="../../static/images/file-icon.png">
                  <p class="file-text">
                    {{productFulfillmentFile.name}}
                  </p>
                  <a class="file-remove-text" @click="removeProductDeliveryFile()">Remove File</a>
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
            <div v-if="$store.getters['AUTH.digitalOrderPopup'].v.order[0].productType == 'calendar-event'" class="check-calendar">
              <p>The buyer <strong>{{$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentDetails.email}}</strong> requested a call with you at <strong>{{$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentDetails.selectedTimeAvailabe.time}} {{$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentDetails.selectedTimeAvailabe.letters}} on {{$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentDetails.selectedDay.weekday}}, {{month($store.getters['AUTH.digitalOrderPopup'].v.fulfillmentDetails.selectedDay.month)}} {{$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentDetails.selectedDay.day}}</strong>.</p>
            </div>
          <div class="product-detail df complete-buttons">
            <button class="just-save" @click="saveFulfillmentData()">Save</button>
            <button class="fulfill-button" @click="finishFulfillment()">
              Send and Mark Fulfilled
            </button>
          </div>
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
          thumbnailWidth: 150,
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
      let type = this.$store.getters['AUTH.digitalOrderPopup'].v.order[0].productType
      if (type == 'digital-service') {
        return 'Digital Service'
      } else if (type == 'calendar-event') {
        return 'Calendar Event'
      }
    },
    goTo (file) {
      console.log('file', file)
      window.location = file
    },
    saveFulfillmentData () {
      this.$store.dispatch('AUTH.saveFulfillmentData', {
        messageToTheBuyer: this.messageToTheBuyer,
        productFulfillmentFile: this.productFulfillmentFile,
        orderId: this.$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentDetails.orderId,
        product: 0
      })
    },
    finishFulfillment () {
      this.$store.dispatch('AUTH.finishFulfillment', {
        messageToTheBuyer: this.messageToTheBuyer,
        productFulfillmentFile: this.productFulfillmentFile,
        orderId: this.$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentDetails.orderId,
        product: 0
      }).then((res) => {
        console.log('finished', res)
        if (res == 'ok') {
          this.closeDigitalServiceFulfillMenu()
          this.$store.dispatch('AUTH.notifyFulfillments', null)
          this.then()
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
      console.log(this.$store.getters['AUTH.digitalOrderPopup'].v)
      let existingFulfillment = this.$store.getters['AUTH.digitalOrderPopup'].v.order[0].fulfillmentResponse
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
    console.log('....', this.$store.getters['AUTH.digitalOrderPopup'].v.fulfillmentDetails.productDeliveryInstructions)
    console.log('* Landing page created')
    this.getExistingFulfillmentData()
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 100000;
  /*@import "../styles/settings.scss";*/
}

  .product-delivery-file {
    & > div {
      border: 1px solid rgba(50, 50, 93, 0.1);
      border-radius: 6px;
      width: 100%;
      height: 150px;
    }
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
  padding: 40px;
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
  .file-text {
    font-size: 14px;
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
    top: 30px;
    right: 40px;
  }
</style>
