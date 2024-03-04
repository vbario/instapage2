<template>
  <div class="item-options-wrapper" @click="$emit('openItemOptions', false)">
    <div class="item-options w100p" id="item-options" @click="stopProp($event)">
      <img @click="$emit('openItemOptions', false)" class="go-back-to-my-products curp smaller-only" src="../../../static/images/back.svg" >
      <i @click="$emit('openItemOptions', false)" class="fa-solid fa-x x-close only-bigger"></i>
      <div class="item-options-bar w100p df fdc">
        <p class="item-options-bar-title">{{sellerData.items[openedItemOptions].title}}</p>
        <p v-if="(sellerData.items[openedItemOptions].productType == 'digital-download') || (sellerData.items[openedItemOptions].productType == 'digital-service')" class="item-options-bar-price">{{sellerData.items[openedItemOptions].price ? '$' + sellerData.items[openedItemOptions].price : 'free'}}</p>
      </div>
      <p class="m_x">{{sellerData.items[openedItemOptions].description}}</p>
      <img :src="sellerData.items[openedItemOptions].productImage" class="item-options-image mt10">

      <div class="item-options-specific mt20">
        <div v-if="sellerData.items[openedItemOptions].productType == 'digital-download'"
        class="item-options-download">
          <p class="text-muted">You will receive the download immediately.</p>
        </div>
        <div v-if="sellerData.items[openedItemOptions].productType == 'physical-product'"
        class="item-options-physical-product">
          <div v-if="sellerData.items[openedItemOptions].productType == 'physical-product'" class="quantity df jcsb aic">
            <p>{{sellerData.items[openedItemOptions].sizes[newItemSize].name}} - {{!!parseFloat(sellerData.items[openedItemOptions].sizes[newItemSize].price) ? '$' + sellerData.items[openedItemOptions].sizes[newItemSize].price : 'free'}}</p>
            <i class="fa-solid fa-chevron-down"></i>
            <select :value="newItemSize" @change="changeNewItemSize($event)" class="quantity-dropdown">
              <option v-for="(size, s) in sellerData.items[openedItemOptions].sizes" :value="s">
                {{size.name}} - {{!!parseFloat(size.price) ? '$' + size.price : 'free'}}
              </option>
            </select>
          </div>
          <div v-if="sellerData.items[openedItemOptions].productType == 'physical-product'" class="quantity df jcsb aic">
            <p>
              Qty: {{newItemQuantity || 1}}
            </p>
            <i class="fa-solid fa-chevron-down"></i>
            <select :value="newItemQuantity" @change="changeNewItemQuantity($event)" class="quantity-dropdown">
              <option :value="1">1</option>
              <option :value="2">2</option>
              <option :value="3">3</option>
              <option :value="4">4</option>
              <option :value="5">5</option>
              <option :value="6">6</option>
              <option :value="7">7</option>
              <option :value="8">8</option>
              <option :value="9">9</option>
              <option :value="10">10</option>
            </select>
          </div>
        </div>
        <div v-if="sellerData.items[openedItemOptions].productType == 'subscription-physical-product'"
        class="item-options-subscription-physical-product">
          <p>Physical Product subscription</p>
        </div>
        <div v-if="sellerData.items[openedItemOptions].productType == 'calendar-event'"
        class="item-options-calendar-event">

            <!-- :useScheduleRange="useScheduleRange"
            :calendarEventDateRange="calendarEventDateRange"
            :calendarEventFutureTime="calendarEventFutureTime"
            :calendarEventFutureTimePeriod="calendarEventFutureTimePeriod"
            :calendarEventMinimumNoticeTime="calendarEventMinimumNoticeTime"
            :calendarEventMinimumNoticeTimePeriod="calendarEventMinimumNoticeTimePeriod"
            :calendarEventDailyLimit="calendarEventDailyLimit" -->

          <Scheduler
            :setNewAppointmentDate="setNewAppointmentDate"
            :readyToAdd="readyToAdd"
            :user="$route.params.user"
            :uniqueid="sellerData.items[openedItemOptions].productId" />
        </div>
        <div v-if="sellerData.items[openedItemOptions].productType == 'custom-service'"
        class="item-options-custom-service">

            <div class="w100p df fdc jcsb ta-wrap">
              <h4 class="text-dark mb10">Provide instructions</h4>
              <textarea @input="checkServiceValidation($event)" @change="checkServiceValidation($event)" :value="instructions" placeholder="Instructions" class="w100p service-instructions"></textarea>
              <p v-if="instructions.length > minServiceDescriptionLength"
                class="character-count"
                :class="{
                'service-request-too-long': instructions.length > maxServiceDescriptionLength  
              }">{{instructions.length}}/{{maxServiceDescriptionLength}}</p>
              <p v-else class="character-count">(Please enter at least {{minServiceDescriptionLength}} characters)</p>
              <h4 class="text-dark mt20 mb10">Upload a reference file</h4>
              <div v-if="productDeliveryFile" class="product-delivery-file dropzone-wrapper df aic posrel">
                <div class="df aic jcc w100p">
                  <img class="file-icon" src="../../../static/images/file-icon.png">
                  <p class="file-text">
                    {{productDeliveryFile.name}}
                  </p>
                  <a class="file-remove-text" @click="$emit('removeProductDeliveryFile', true)">Remove File</a>
                </div>
              </div>
              <div v-else class="dropzone-wrapper posrel">
                <vue-dropzone ref="myVueDropzone" 
                        id="dropzone"
                        class="file-upload"
                        @vdropzone-file-added="uploadedProductDeliveryFile"
                        :options="dropzoneOptions">
                </vue-dropzone>
                <div class="dropzone-overlay df aic">
                  <p>Drag File Here or</p>
                  <a class="button-b df aic jcc">Upload File</a>
                </div>
              </div>
            </div>

        </div>
      </div>

      <span class="f1"></span>

      <div class="add-to-cart-inner-wrapper">
        <h4 class="button-1 mt20 add-to-cart-inner" id="add-to-cart-button" :class="{
          'disabled-button': (!readyToAddToCart && !((sellerData.items[openedItemOptions].productType == 'digital-download') || (sellerData.items[openedItemOptions].productType == 'custom-service'))) && (sellerData.items[openedItemOptions].productType !== 'physical-product')
        }" :style="brandColor ? 'background-color: ' + brandColor + ';' : ''" @click="$emit('addToCart')">Add to Cart</h4>
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Scheduler from '@/components/item-type-checkout/Scheduler'
export default {
  name: 'OpenItemOptions',
  data () {
    return {
      minServiceDescriptionLength: 10,
      maxServiceDescriptionLength: 2000,
      dropzoneOptions: {
          autoProcessQueue: false,
          url: 'https://',
          thumbnailWidth: 150,
          maxFilesize: 10,
          // headers: { "My-Awesome-Header": "header value" },
          // dictDefaultMessage: 'Check',
          // previewTemplate: document.querySelector('#template-container').innerHTML
          dictDefaultMessage: ``
      },
    }
  },
  props: [
    'sellerData',
    'openedItemOptions',
    'newItemSize',
    'readyToAddToCart',
    'setNewAppointmentDate',
    'readyToAdd',
    'instructions',
    'productDeliveryFile',
    'newItemQuantity',
    'brandColor',
    'useCustomBrandColor'
    ],
  components: {
    vueDropzone: vue2Dropzone,
    Scheduler
  },
  methods: {
    changeNewItemSize (event) {
      let newValue = event.target.value
      this.$emit('changeNewItemSize', newValue)
    },
    changeNewItemQuantity (event) {
      let newValue = event.target.value
      this.$emit('changeNewItemQuantity', newValue)
    },
    uploadedProductDeliveryFile (file) {
      this.$emit('uploadedProductDeliveryFile', file)
    },
    checkServiceValidation (event) {
      let newValue = event.target.value
      this.$emit('changeInstructions', newValue)
      if (newValue) {
        if (newValue.length > this.minServiceDescriptionLength) {
          this.readyToAdd(true)
        } else {
          this.readyToAdd(false)
        }
      } else {
        this.readyToAdd(false)
      }
    },
    stopProp (event) {
      event && event.stopPropagation()
    }
  },
  computed: {

  },
  created () {
  },
  mounted () {
    console.log('** sellerData **', this.sellerData, this.openedItemOptions)
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";
  $padding: 20px;
  .w100p {
    width: 100%;
  }
  .df {
    display: flex;
  }
  .fdc {
    flex-direction: column;
  }
  .jcc {
    justify-content: center;
  }
  .aic {
    align-content: center;
  }
  .jcsb {
    justify-content: space-between;
  }
  .mt20 {
    margin-top: 20px;
  }
  .mb20 {
    margin-bottom: 20px;
  }

  .w100p {
    width: 100%;
  }

  .item-options {
    /*position: fixed;*/
    /*left: 50%;*/
    /*top: 10%;*/
    /*transform: translateX(-50%);*/
    overflow-y: auto;
    background-color: #fff;
    width: 100%;
    max-width: 700px;
    height: 80%;
    padding: 30px;
    /*padding-bottom: calc(#{$padding} + 70px);*/
    border-radius: 20px;

    p {
      color: #000;
      white-space: pre-wrap;
    }
  
    &-wrapper {
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: #00000033;
      z-index: 1000;
    }
      &-bar {
        &-title {
          font-size: 22px;
          font-weight: 600;
        }
      }
  }

  @media (max-width: 680px) {
    .item-options {
      width: 100%;
      height: 100%;
      border-radius: 0;
      left: 0;
      top: 0;
      padding-bottom: 100px;
    }
  }

  .item-options-image {
    height: 250px;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  .x-close {
    cursor: pointer;
    position: absolute;
    right: 19px;
    top: 16px;
  }
  .add-to-cart-inner {
    width: calc(100%);
    margin-top: 0;

    &-wrapper {
      z-index: 100;
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 0;
      background-color: #fff;
      padding: $padding;
    }
  }
  .item-options-bar {
    margin-top: 10px;
  }
  @media (min-width: 680px) {
    .add-to-cart-inner {
      &-wrapper {
        position: relative;
        padding: $padding 0;
      }
    }
  }

  $dropzone-size: 100px;
  $dropzone-margin: 0;

  .service-instructions {
    height: $dropzone-size;
    padding: 10px;
    font-size: 16px;
  }

  .ta-wrap {
    /*width: 400px;*/
    margin-bottom: 6px;
  }

  .file-upload {
    margin-top: $dropzone-margin;
    width: 100%;
    height: $dropzone-size;
    /*max-height: 44px;*/
    min-height: 0px !important;
    border-radius: 6px;
    border: 1px dashed rgba(50, 50, 93, 0.1);
    font-size: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px !important;

    &:hover {
      & + .dropzone-overlay {
        background-color: #fdfdfd;
        border: 1px dashed rgba(50, 50, 93, 0.12);
        
        a {
          background-color: #44d600;
          color: #fff;
        }
      }
    }
  }



  .dropzone-overlay {
    margin-top: $dropzone-margin;
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
    p {
      font-size: 14px;
      /*margin-bottom: 6px;*/
      text-align: center;
    }

    a {
      text-align: center;
    }
  }

  .dropzone-wrapper {
    height: $dropzone-size;
  }
  .file-icon {
    opacity: 0.5;
    height: 25px;
    margin-right: 10px;
  }
  .file-text {
    font-size: 14px;
    margin-right: 10px;
  }
  .file-remove-text {
    font-size: 10px;
    text-decoration: underline;
    color: #000;
  }

  .button-b {
    border: 1px solid #44d600;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #44d600;
    padding: 3px 6px;
    /*height: 44px;*/
    margin-left: 10px;

    &:hover {
      border: 1px solid transparent;
      background-color: #44d600;
      color: #fff;
    }
  }
  .character-count {
    text-align: right;
    font-size: 12.5px;
    margin-top: 4px;
    color: #6e6e6e !important;
  }
  .service-request-too-long {
    color: #ef4f0d !important;
  }
  .quantity {
    background-color: #eaeaea;
    position: relative;
    height: 40px;
    padding: 4px 15px 4px 15px;
    border-radius: 20px;
    margin-bottom: 3px;
    position: relative;
    /*background-color: #ffffff22;*/

    p {
      font-size: 14px;
    }
    i {
      /*display: none;*/
      color: $color-background-dark;
      font-size: 10px;
      transform: translateY(-1px); 
    }
  }
  .quantity-dropdown {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    color: transparent;
    background-color: transparent;
    border: none;
  }
  .disabled-button {
    background-color: #ccc;
    pointer-events: none;
    display: none;
  }
  .m_x {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
