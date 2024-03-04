<template>
  <div class="fdc paybox-wrap">
    <div class="w100p df jcsb aic g20">
      <p class="label paybox-label text-dark">{{ctaHeader || 'Get It Now!'}}</p>
      <p class="label paybox-label text-dark">Total: ${{totalPrice()}}/month</p>
    </div>
    
    <div v-if="!addressSelected && ((productType == 'physical-product') || (productType == 'subscription-physical-product'))" class="df w100p">
      <vue-google-autocomplete id="map" classname="your-email" placeholder="Shipping Address" v-on:placechanged="getAddressData">
      </vue-google-autocomplete>
    </div>




    <div v-if="(productType == 'physical-product') || (productType == 'subscription-physical-product')" class="w100p df fdc posrel p10px">
      <div class="w100p df">
        <a class="label paybox-label text-dark-important">Ship To</a>
        <p class="address-selected">{{formattedAddress()}}</p>
        <a v-if="!shippingNotAvailable" class="edit-button text-primary-color" @click="editAddress()">edit</a>
      </div>
      <div class="w100p df" v-if="shippingNotAvailable">
        <!-- <a class="label paybox-label text-dark-important">Shipping:</a> -->
        <p class="address-selected">Shipping to this address is not available.<a class="edit-button text-primary-color" @click="editAddress()">Ship to a different address</a></p>
        <!-- <p class="address-selected" v-else>${{quotedShipping.price ? quotedShipping.price.toFixed(2) : '-'}}</p> -->
        <!-- <a class="label paybox-label text-dark-important ml10" v-if="!loadingShipping">Subtotal:</a> -->
        <!-- <p class="address-selected" v-if="!loadingShipping">${{(parseFloat(quotedShipping.price) + parseFloat(price)).toFixed(2)}}</p> -->
      </div>
      <div class="w100p df" v-else>
        <a class="label paybox-label text-dark-important">Shipping:</a>
        <p class="address-selected" v-if="loadingShipping">calculating...</p>
        <p class="address-selected" v-else>{{quotedShipping.price ? '$' + quotedShipping.price.toFixed(2) : 'free'}}</p>
        <a class="label paybox-label text-dark-important ml10" v-if="!loadingShipping">Subtotal:</a>
        <p class="address-selected" v-if="!loadingShipping">${{(parseFloat(quotedShipping.price) + calculcatedPrice())}} US</p>
      </div>
      <h4 class="button-0 mw400 button-override-1" @click="startAddingNameAndPhoneNumber()" v-if="!loadingShipping && !shippingNotAvailable && !addNameAndPhoneNumber && ((productType == 'physical-product') || (productType == 'subscription-physical-product'))">
        + Add Name & Phone Number
      </h4>
      <div class="w100p df fdc" v-else-if="!loadingShipping && !shippingNotAvailable && ((productType == 'physical-product') || (productType == 'subscription-physical-product'))">
        <input class="your-email" v-model="shipToName" type="text" placeholder="Name" name="">
        <input class="your-email" v-model="shipToPhoneNumber" type="text" placeholder="Phone Number" name="">
      </div>
    </div>



    <div class="w100p df fdc jcsb ta-wrap" v-if="productType == 'digital-service'">
      <textarea v-model="instructions" placeholder="Instructions" class="w100p"></textarea>
      <div v-if="productDeliveryFile" class="product-delivery-file dropzone-wrapper df aic posrel">
        <div class="df aic jcc w100p">
          <img class="file-icon" src="../../../static/images/file-icon.png">
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
                :options="dropzoneOptions">
        </vue-dropzone>
        <div class="dropzone-overlay df aic">
          <p>Drag File Here or</p>
          <a class="button-b df aic jcc">Upload File</a>
        </div>
      </div>
      <!-- <a class="button-b df aic jcc">Upload File</a> -->
    </div>
    
    <div class="w100p df fdc jcsb" v-if="productType == 'calendar-event'">
      <div class="appointment-length-options-2 w100p df fww">
        <span v-for="(time, t) in calendarDetails.appointmentLengths" @click="selectAppointmentTime(t)"
          class="df aic appointment-length-2"
          :class="{'selected-time': selectedAppointmentTime === t}"
          >
          <p class="f1">
            {{time}} minutes
          </p>
        </span>
        <VCalendar
          @transition-end="transitionEnd($event)"
          @did-move="didMove($event)"
          @update="updatePages($event)"
          @dayclick="selectCalendarDay($event)"
          v-if="calendarReady"
          :available-dates="availableDates"
          :min-page="minPage()"
          :max-page="maxPage()"
        />
      </div>

      <p class="timezone w100p">{{calendarDetails.myTimezone}}</p>
    </div>
    
    <div class="w100p df fdc jcsb calendar-picker" v-if="productType == 'calendar-event-b'">
        <!-- {{calendarDetails}} -->
        <!-- {{next45Days}} -->
      <VueSlickCarousel :slidesPerRow="7" class="days-slider df jcsb w100p" :arrows="true">
        <div class="day df fdc aic jcc" 
              v-for="(day, i) in next45Days"
              @click="selectDay(day)"
              v-bind:class="{
              'day-day-selected': day == selectedDay
            }">   
          <p class="df aic jcc tac day-weekday">{{day.weekday.substr(0, 3)}}</p>
          <p class="df aic jcc tac day-day fdc">
            <span class="day-day-day">{{day.day}}</span>
            <span class="day-month">{{month(day.month).substring(0,3)}}</span>
          </p>
        </div>
      </VueSlickCarousel>
      <VueSlickCarousel :slidesPerRow="5" class="time-slider df jcsb w100p" :arrows="true">
        <div class="time-available df fdc aic jcc"s
              v-bind:class="{
              'selected-time-available': time == selectedTimeAvailabe
            }"
              v-for="(time, i) in timesAvailable"
              @click="selectTimeAvailable(time)">
          <p class="w100p tac">{{time.time}}</p>
          <p class="w100p tac">{{time.letters}}</p>
        </div>
      </VueSlickCarousel>
      <p class="timezone w100p">{{calendarDetails.myTimezone}}</p>
    </div>



    <input class="your-email" v-model="yourEmail" type="text" placeholder="Your E-mail" name="">
    <div v-if="noPay()" class="no-payment-form">
      <p class="save-product-error mt10 mb15" v-if="saveProductError">{{saveProductError.message}}</p>
      <button id="submit" class="submit" @click="pay($event)">
        <img class="spinner-1" v-if="getting" src="../../../static/images/pushable/loader-black.png">
        <span v-else id="button-text">{{callToActionText || 'Pay Now'}}</span>
      </button>
    </div>
    <form v-else id="payment-form">
      <div id="card-element"></div>
      <p class="save-product-error mb15" v-if="saveProductError">{{saveProductError.message}}</p>
      <button id="submit" @click="pay($event)">
        <div class="spinner hidden" id="spinner"></div>
        <span id="button-text">{{callToActionText || 'Pay Now'}}</span>
      </button>
      <p id="card-error" role="alert"></p>
      <p class="result-message hidden">
        Payment succeeded, see the result in your
        <a href="" target="_blank">Stripe dashboard.</a> Refresh the page to pay again.
      </p>
      <div class="df w100p jcsb powered">
        <p>Secured by Stripe</p>
        <p>Powered by Pushable</p>
      </div>
    </form>
  </div>
  <!-- <div class="w100p"> -->
  <!-- </div> -->
  <!-- <div class="days-slider df"> -->
  <!-- </div> -->
        <!-- <div class="time-slider f1 df"> -->
  <!-- </div> -->
  <!-- <img v-if="dev" class="cc-temp paybox-cc-spacing" src="../../../static/images/cc-temp.png"> -->
    <!-- <div class="spinner hidden" id="spinner"></div> -->
    <!-- <input class="your-email" v-model="fullName" type="text" placeholder="Ship To (Name)" name=""> -->
    <!-- <vue-google-autocomplete id="map" classname="address-selected your-email" placeholder="Start typing" v-on:placechanged="getAddressData"> -->
    <!-- </vue-google-autocomplete> -->
  <!-- <input v-if="productType == 'physical-product'" class="your-email" v-model="yourAddress" type="text" placeholder="Your Address" name=""> -->
</template>

<script>
import { ref } from 'vue';

import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import router from '@/router'

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  name: 'PayBoxCC',
  data () {
    return {
      calendarReady: false,
      calendarLoading: false,
      // disabledDates: [{}],
      dateSelected: null,
      disabledDates: [
        { start: null, end: new Date() }
      ],
      availableDates: [
        { start: new Date(), end: null }
      ],
      selectedAppointmentTime: false,
      getting: false,
      saveProductError: false,
      shippingNotAvailable: false,
      shipToName: '',
      shipToPhoneNumber: '',
      addNameAndPhoneNumber: true,
      loadingShipping: false,
      addressSelected: false,
      addressSelectedData: {},
      selectedTimeAvailabe: '',
      quotedShipping: {
        loaded: false,
        price: 0
      },
      timesAvailable: [],
      selectedDay: '',
      next45Days: [],
      instructions: '',
      productDeliveryFile: '',
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
      loading: false,
      then: false,
      yourEmail: '',
      fullName: '',
      yourAddress: '',
      orderNumber: '',
      maxDaysForward: 180
    }
  },
  props: ['calendarDetails', 'ctaHeader', 'callToActionText', 'productId', 'productType', 'dev', 'weight', 'price', 'quantity', 'subscriptionQuantities', 'subscriptionProducts'],
  components: {
    // VCalendar,
    vueDropzone: vue2Dropzone,
    VueSlickCarousel,
    VueGoogleAutocomplete
  },
  methods: {
    calculcatedPrice () {
      if (this.productType == 'subscription-physical-product') {
        return this.totalPrice()
      } else {
        return parseFloat(this.price * this.quantity).toFixed(2)
      }
    },
    subscriptionPrice (i) {
      return (this.subscriptionQuantities[i] || 0) * ((this.subscriptionProducts[i] && this.subscriptionProducts[i].price) || 0)
    },
    totalPrice () {
      let subscriptionPrice = 0
      for (let i in this.subscriptionProducts || []) {
        subscriptionPrice = subscriptionPrice + this.subscriptionPrice(i)
      }
      return subscriptionPrice
    },
    transitionEnd (event) {
      console.log('transitionEnd', event)
    },
    didMove (event) {
      console.log('didMove', event)
    },
    updatePages (event) {
      console.log('updatePages', event)
    },
    minDate () {
      var someDate = new Date()
      return someDate
    },
    maxDate () {
      var someDate = new Date()
      var numberOfDaysToAdd = this.maxDaysForward
      var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd)
      return someDate
    },
    minPage () {
      var today = new Date()
      return {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
      }
    },
    maxPage () {
      var today = this.maxDate()
      return {
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear()
      }
    },
    selectCalendarDay (event) {
      console.log('selectCalendarDay', event)
    },
    selectAppointmentTime (t) {
      console.log('selectedAppointmentTime', t)
      let length = this.calendarDetails.appointmentLengths[t]
      console.log('length', length)
      this.selectedAppointmentTime = t
      this.loadAvailableDatesToCalendar()
    },
    loadAvailableDatesToCalendar () {
      let fromByDay = this.calendarDetails.calendarFrom
      let toByDay = this.calendarDetails.calendarTo
      let length = this.calendarDetails.appointmentLengths[this.selectedAppointmentTime]
      console.log('this.calendarDetails', this.calendarDetails, length)

      console.log('this.availableDates start', this.availableDates)

      let availableDates = [
        // { start: new Date(), end: null }
      ]
      let maxDaysForward = this.maxDaysForward

      for (let d = 0; d < maxDaysForward; d++) {
        let today = new Date()
        let day = today.setDate(today.getDate() + d)

        let random = Math.random()

        if (random < .5) {
          availableDates.push({start: new Date(day), end: new Date(day)})
        }
      }
      this.availableDates = availableDates
      console.log('this.availableDates', this.availableDates)
      this.calendarReady = true
    },
    startAddingNameAndPhoneNumber () {
      this.addNameAndPhoneNumber = true
    },
    editAddress () {
      this.shippingNotAvailable = false
      this.addressSelected = false
    },
    formattedAddress () {
      let address = this.addressSelectedData
      let addressString = `${address.address1}, ${address.city}, ${address.postalCode}, ${address.country}`
      return addressString
    },
    getAddressData: function (addressData, placeResultData, id) {
      console.log('data', addressData, placeResultData, id, this.weight)

      let weight = this.weight
      let countryCode = ''
      let components = placeResultData.address_components
      for (let c in components) {
        let component = components[c]
        if (component.types.indexOf('country') > -1) {
          countryCode = component.short_name
          break
        }
      }

      this.addressSelected = true
      this.addressSelectedData = {
        name: '',
        company: '',
        address1: (addressData.street_number ? addressData.street_number + ' ' : '') + addressData.route + (addressData.subpremise ? ' - ' + addressData.subpremise : ''),
        address2: '',
        city: addressData.locality || addressData.administrative_area_level_2,
        state: addressData.administrative_area_level_1,
        country: addressData.country,
        countryCode,
        postalCode: addressData.postal_code,
        email: '',
        phone: '',
      }

      this.getShippingWithAddress()

      console.log('this.addressSelectedData', this.addressSelectedData)
    },
    getShippingWithAddress () {

      let countryCode = this.addressSelectedData.countryCode
      let weight = this.weight

      this.loadingShipping = true
      this.$store.dispatch('AUTH.getShippingForProduct', {
        productId: this.productId,
        countryCode,
        weight,
        quantity: this.quantity
      }).then((res) => {
        console.log('getShippingForProduct result', res)

        if (res.price == 'NA') {
          this.loadingShipping = false
          this.shippingNotAvailable = true
          this.quotedShipping = {
            loaded: true,
            price: 0
          }
        } else {
          this.loadingShipping = false
          this.quotedShipping = {
            loaded: true,
            price: res.price
          }
          this.loadCreditCardModule()
        }
      })
    },
    selectTimeAvailable (time) {
      this.selectedTimeAvailabe = time
    },
    selectDay (day) {
      this.selectedDay = day
      this.setTimesAvailable()
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
    day (d) {
      switch (d) {
        case 0:
        return 'Monday'
          break;
        case 1:
        return 'Tuesday'
          break;
        case 2:
        return 'Wednesday'
          break;
        case 3:
        return 'Thursday'
          break;
        case 4:
        return 'Friday'
          break;
        case 5:
        return 'Saturday'
          break;
        case 6:
        return 'Sunday'
          break;
        default:
          return '';
      }
    },
    setTimesAvailable () {

      let calendarFrom = this.calendarDetails.calendarFrom
      let calendarTo = this.calendarDetails.calendarTo

      let timesAvailable = []
      let d = new Date(this.selectedDay.today)
      d = d.getDay()
      let from = calendarFrom[d]
      let to = calendarTo[d]

      let _toNumber = parseInt(to.substr(0, to.indexOf(' ')))
      let toNumber = _toNumber
      let toLetters = to.substr(to.indexOf(' ') + 1, to.length)
      if (toLetters == 'pm') {
        toNumber += 12
      }
      let _fromNumber = parseInt(from.substr(0, from.indexOf(' ')))
      let fromNumber = _fromNumber
      let fromLetters = from.substr(from.indexOf(' ') + 1, from.length)
      if (fromLetters == 'pm') {
        fromNumber += 12
      }

      for (let i = fromNumber; i < toNumber; i = i + 0.5) {
        timesAvailable.push({
          time: i % 1 == 0 ? i : i - 0.5 + ':30',
          letters: i - 12 > 0 ? 'pm' : 'am'
        })
      }

      this.timesAvailable = timesAvailable
      this.selectedTimeAvailabe = timesAvailable[0]

    },
    setNext45Days () {
      let next45Days = []
      for (let d = 0; d < 45; d = d + 1) {
        let today = new Date()
        today.setDate(today.getDate()+d);
        // console.log('next45day', {
        //   weekday: this.day(today.getDay()),
        //   day: today.getDate(),
        //   year: today.getFullYear(),
        //   month: today.getMonth(),
        //   today
        // })
        next45Days.push({
          weekday: this.day(today.getDay()),
          day: today.getDate(),
          year: today.getFullYear(),
          month: today.getMonth(),
          today
        })
      }
      this.next45Days = next45Days
      this.selectedDay = next45Days[2]
    },
    removeProductDeliveryFile () {
      this.productDeliveryFile = ''
    },
    uploadedProductDeliveryFile (file) {
      let item = {
        productId: this.productId,
        file
      }
      this.$store.dispatch('AUTH.uploadClientOrderFile', item).then((res) => {
        console.log('file uploaded', res)
        this.productDeliveryFile = res
      })
    },
    setProductError (type, message) {
      if (!type) {
        this.saveProductError = null
        return false
      }
      this.saveProductError = {
        type,
        message
      }
    },
    pay (event) {
      event && event.preventDefault()

      // validate
      this.setProductError(null)

      let isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      }

      let emailFormatValid = isValidEmail(this.yourEmail)

      if ((this.yourEmail == '') || !emailFormatValid) {
        this.setProductError('validation-email', 'Please enter a valid email address')
        return false
      }

      if (this.productType == 'physical-product') {
        if (!this.shipToName) {
          this.setProductError('validation-name', 'Please enter your name')
          return false
        } else if (!this.shipToPhoneNumber) {
          this.setProductError('validation-name', 'Please enter a phone number')
          return false
        }
      }
      // else if (this.description == '') {
      //   this.setProductError('validation-description', 'The description cannot be empty.')
      //   return false
      // }

      if (this.noPay()) {
        console.log('noPay')
        this.getting = true
        this.$store.dispatch('AUTH.setPreOrderDetailsAndPay', {
          orderDetails: {
            selectedAppointmentTime: this.selectedAppointmentTime,
            selectedTimeAvailabe: this.selectedTimeAvailabe,
            selectedDay: this.selectedDay,
            email: this.yourEmail,
            name: this.fullName,
            shippingAddress: this.addressSelectedData,
            shipToName: this.shipToName,
            shipToPhoneNumber: this.shipToPhoneNumber,
            orderId: this.orderNumber,
            productDeliveryFile: this.productDeliveryFile,
            productDeliveryInstructions: this.instructions,
          },
          noPay: true
        })
      } else {
        if (this.then) {
          this.$store.dispatch('AUTH.setPreOrderDetailsAndPay', {
            orderDetails: {
              // timesAvailable
              // next45Days
              selectedAppointmentTime: this.selectedAppointmentTime,
              selectedTimeAvailabe: this.selectedTimeAvailabe,
              selectedDay: this.selectedDay,
              email: this.yourEmail,
              name: this.fullName,
              shippingAddress: this.addressSelectedData,
              shipToName: this.shipToName,
              shipToPhoneNumber: this.shipToPhoneNumber,
              orderId: this.orderNumber,
              productDeliveryFile: this.productDeliveryFile,
              productDeliveryInstructions: this.instructions,
            },
            then: this.then
          })
        }
      }
    },
    loadCreditCardModule () {
      console.log('loading CC module with id', this.productId)
      if (document.querySelector("button")) {
        this.$store.dispatch('AUTH.getPaymentIntent', {
          shipping: this.quotedShipping,
          items: [this.productId],
          quantities: [this.quantity],
          noPay: this.noPay()
        }).then((res) => {
          console.log('paymentIntent =>', res)
          this.then = res.after
          this.orderNumber = res.orderNumber
        })
      } else {
        // console.log('no button')
        setTimeout(() => {
          this.loadCreditCardModule()
        }, 1000)
      }
    },
    noPay () {
      return !this.price && (this.productType !== 'physical-product')
    }
  },
  computed: {
  },
  watch: {
    quantity: {
        handler: function (newVal, oldVal) {
          console.log('Quantity changed. Now: ', newVal, ' | was: ', oldVal)
          console.log('this.addressSelected', this.addressSelected)
          console.log('this.loadCreditCardModule', this.loadCreditCardModule)
          console.log('this.getShippingForProduct', this.getShippingWithAddress)
          if (this.addressSelected) {
            console.log('load the module')
            this.getShippingWithAddress()
            // this.loadCreditCardModule()
          }
        }
    }
  },
  created () {
    console.log('* Landing page created')
    if (!this.dev) {
    }
    this.setNext45Days()
    this.setTimesAvailable()
    this.loadCreditCardModule()
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/components/_paybox.scss";
  p {
   font-family: Kollektif; 
  }
  .label {
    font-family: Kollektif;
  }
  .cc-temp {
    width: 400px;
    height: 108px;
    object-fit: cover;
    margin-bottom: 10px;
    /*-webkit-box-shadow: 0 0 20px rgba(8, 21, 66, .05);*/
    /*box-shadow: 0 0 20px rgba(8, 21, 66, .05);*/
  }
  .paybox-label {
    /*font-family: 'Rubik', 'sans-serif';*/
    font-size: 14px;
    letter-spacing: 0.2px;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #2b2b2b;
    /*color: #38D5FF;*/
  }

  .paybox-wrap {
    /*background-color: #efeff0;*/
    background-color: #fff;
    padding-top: 10px;
  }

  #payment-form {
    padding: 0 !important;
    position: relative;
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
    width: 100%;
    /*max-width: 400px !important;*/
    margin-bottom: 10px !important;
  }
  #card-error {
    margin-top: 0 !important;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, calc(100%));
    font-size: 15px;
  }

  .powered {
    margin-top: 4px;
    font-size: 12px;
  }
  .your-email {
    width: 100%;
    /*max-width: 400px;*/
    font-size: 16px;
    color: #32325d;
    /*font-family: 'Rubik', 'sans-serif';*/
    /*font-family: 'Arial', 'sans-serif';*/
  }

  textarea, .calendar-picker {
    border-radius: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    height: 44px;
    max-height: 44px;
    font-size: 16px;
    background: white;
    margin-bottom: 6px;
    /*font-family: 'Rubik', 'sans-serif';*/
    color: #2b2b2b;
    flex: 1;

    &:placeholder {
      color: #efefef;
    }
  }

  $calendar-picker-height: 160px;
  .calendar-picker {
    padding-top: 16px;
    max-height: $calendar-picker-height;
    height: $calendar-picker-height;
    overflow-x: hidden;
    /*width: 400px;*/
    /*max-width: 400px;*/
  }

  @media (max-width: $max-size-1) {
    #payment-form {
      /*width: 360px !important;*/
    }
    .your-email {
      /*width: 360px;*/
    }
    .ta-wrap, .calendar-picker {
      /*width: 360px;*/
      /*max-width: 360px;*/
    }
    .cc-temp {
      /*width: 360px;*/
      height: 108px;
      object-fit: cover;
    }
  }
  @media (max-width: $max-size-2) {
    #payment-form {
      /*width: 340px !important;*/
    }
    .your-email {
      /*width: 340px;*/
    }
    .ta-wrap, .calendar-picker {
      /*width: 340px;*/
      /*max-width: 340px;*/
    }
    .cc-temp {
      /*width: 340px;*/
      height: 108px;
      object-fit: cover;
    }

  }

  $set-width: 290px;

  @media (max-width: $max-size-3) {
    #payment-form {
      max-width: unset;
      width:100%;
      /*width: $set-width !important;*/
    }
    .your-email {
      max-width: unset;
      width:100%;
      /*width: $set-width;*/
    }
    .ta-wrap, .calendar-picker {
      max-width: unset;
      width:100%;
      /*width: $set-width;*/
      /*max-width: $set-width;*/
    }
    .cc-temp {
      max-width: unset;
      width:100%;
      /*width: $set-width;*/
    }
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


  

  form {
    /*margin-top: 6px;*/
  }

  .ta-wrap {
    /*width: 400px;*/
    margin-bottom: 6px;
  }

  .file-upload {
    width: 100%;
    height: 44px;
    max-height: 44px;
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
    height: 44px;
    max-height: 44px;
    /*width: 80px;*/
    /*margin-left: 20px;*/
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
  }
  $day-width: 14.2%;
  .day {
    width: $day-width;
    min-width: $day-width;
    max-width: $day-width;
    cursor: pointer;
    display: inline-flex !important;
  }
  .day-weekday {
    font-size: 14px;
    margin-bottom: 4px;
  }
  .day-day {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color: white;
    font-size: 16px;
    font-weight: 600;
    margin-right: 0 !important;
    color: #5368d4dd;
    border: 1px solid #5368d4dd;
  }
  .day-day-selected {
    .day-weekday {
      color: #5368d4dd;
      font-weight: 600;
    }
    .day-day {
      background-color: #5368d4dd;
      color: white;
    }
  }
  .timezone {
    text-align: right;
    font-size: 12px;
  }
  .time-slider {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .days-slider {

  }
  .time-available {
    margin-right: 8px;
    cursor: pointer;
    width: calc(20% - 8px) !important;
    minwidth: calc(20% - 8px) !important;
    padding: 5px;
    
    &:last-child {
      margin-right: 0;
    }
    border: 1px solid #ddd;
  }
  .day-month {
    font-size: 10px;
    text-align: center;
  }
  .day-day-day {
    line-height: 12px;
  }
  .selected-time-available {
    background-color: #5368d4dd;
    p {
      color: white;
      font-weight: 600;
    }
  }
  .address-selected {
    padding-left: 5px;
  }
  .edit-button {
    /*position: absolute;*/
    /*left: 15px;*/
    /*top: 50%;*/
    /*transform: translateY(-50% - 20);*/
    font-size: 14px;
    padding-left: 5px;
    margin-bottom: 0.5rem;
  }
  .address-selected {
    font-size: 14px;
  }
  .p10px {
    padding: 10px;
  }
  .mw400 {
    max-width: 400px;
  }
  .button-override-1 {
    text-align: left;
    justify-content: flex-start;
    padding-left: 0;
  }
  .save-product-error {
    color: #d62626;
  }
  .spinner-1 {
    width: 16px;
    pointer-events: none;
    animation-name: spin;
    animation-duration: 5000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
  }

  @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
  }
  .submit {
    border-radius: 6px;
  }

  .appointment-length-options-2 {
    gap: 8px;
  }

  .appointment-length-2 {
    width: calc(25% - (8px)*3/4);
    cursor: pointer;
    opacity: 0.375;
    border-radius: 10px;
    border: 1px solid transparent;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    position: relative;
    
    p {
      text-align: center;
      color: #000;
      font-family: Kollektif;
      font-size: 16px;
    }

    &.selected-time {
      opacity: 1;
      background-color: transparent; 
      border-color: #44d600;
    }
  }

  .vc-container {
    width: 100%;
  }

  p, a {
    font-family: Kollektif;
  }
</style>
