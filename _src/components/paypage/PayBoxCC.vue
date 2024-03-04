<template>
  <div class="fdc paybox-wrap">
    <p class="label paybox-label">{{ctaHeader || 'Buy This Product'}}</p>
    <input class="your-email" v-model="yourEmail" type="text" placeholder="E-mail" name="">




    <div class="w100p df fdc jcsb ta-wrap" v-if="productType == 'digital-service'">
      <textarea v-model="instructions" placeholder="Instructions"></textarea>
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


    <div class="w100p df fdc jcsb calendar-picker" v-if="productType == 'calendar-event'">
        <!-- {{calendarDetails}} -->
        <!-- {{next45Days}} -->
      <!-- <div class="days-slider df"> -->

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
      <!-- </div> -->
      <!-- <div class="time-slider f1 df"> -->
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
      <!-- </div> -->
      <p class="timezone w100p">{{calendarDetails.myTimezone}}</p>
    </div>

    <img v-if="dev" class="cc-temp paybox-cc-spacing" src="../../../static/images/cc-temp.png">
    <form v-else id="payment-form">
      <div id="card-element"></div>
      
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
        <!-- <p>Powered By tapin.com © 2021</p> -->
        <p>Powered by tapinpay.com © 2021</p>
      </div>
    </form>
  </div>
</template>

<script>

import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import router from '@/router'

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'PayBoxCC',
  data () {
    return {
      selectedTimeAvailabe: '',
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
      orderNumber: ''
    }
  },
  props: ['calendarDetails', 'ctaHeader', 'callToActionText', 'productId', 'productType', 'dev'],
  components: {
    vueDropzone: vue2Dropzone,
    VueSlickCarousel,
  },
  methods: {
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
    // month (m) {
    //   switch (m) {
    //     case 'payment_intent.succeeded':
    //       const paymentIntent = event.data.object;
    //       console.log('PaymentIntent was successful!');
    //       break;
    //     case 'payment_method.attached':
    //       const paymentMethod = event.data.object;
    //       console.log('PaymentMethod was attached to a Customer!');
    //       break;
    //     // ... handle other event types
    //     default:
    //       console.log(`Unhandled event type ${event.type}`);
    //   }
    // },
    setTimesAvailable () {

      let calendarFrom = this.calendarDetails.calendarFrom
      let calendarTo = this.calendarDetails.calendarTo
      console.log('calendarDetails', calendarFrom, calendarTo)

      let timesAvailable = []
      let d = new Date(this.selectedDay.today)
      d = d.getDay()
      let from = calendarFrom[d]
      let to = calendarTo[d]
      console.log('d', d)
      console.log('from', calendarFrom[d])
      console.log('to', calendarTo[d])

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


      console.log('timesAvailable', timesAvailable)

      this.timesAvailable = timesAvailable
      this.selectedTimeAvailabe = timesAvailable[0]



      console.log('fromLetters', fromLetters)
      console.log('toLetters', toLetters)

      // for (from...to) {
      //   // add time
      // }


      // appointmentLength
      // myTimezone

    },
    setNext45Days () {
      let next45Days = []
      let today = new Date()
      for (let d = 0; d < 45; d = d + 1) {
        let today = new Date()
        today.setDate(today.getDate()+d);
        next45Days.push({
          weekday: this.day(today.getDay()),
          day: today.getDate(),
          year: today.getYear(),
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

    pay (event) {
      event.preventDefault()
      if (this.then) {
        this.$store.dispatch('AUTH.setPreOrderDetailsAndPay', {
          orderDetails: {
            // timesAvailable
            // next45Days
            selectedTimeAvailabe: this.selectedTimeAvailabe,
            selectedDay: this.selectedDay,
            email: this.yourEmail,
            orderId: this.orderNumber,
            productDeliveryFile: this.productDeliveryFile,
            productDeliveryInstructions: this.instructions,

          },
          then: this.then
        })
      }
    },
    loadCreditCardModule () {
      console.log('loading CC module with id', this.productId)
      if (document.querySelector("button")) {
        this.$store.dispatch('AUTH.getPaymentIntent', [this.productId]).then((res) => {
          this.then = res.after
          this.orderNumber = res.orderNumber
        })
      } else {
        console.log('no button')
        setTimeout(() => {
          this.loadCreditCardModule()
        }, 1000)
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Landing page created')
    if (!this.dev) {
      this.loadCreditCardModule()
    }
    this.setNext45Days()
    this.setTimesAvailable()
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/components/_paybox.scss";
  .cc-temp {
    width: 400px;
    height: 108px;
    object-fit: cover;
    margin-bottom: 10px;
    /*-webkit-box-shadow: 0 0 20px rgba(8, 21, 66, .05);*/
    /*box-shadow: 0 0 20px rgba(8, 21, 66, .05);*/
  }
  .paybox-label {
    font-family: 'Rubik', 'sans-serif';
    font-size: 14px;
    letter-spacing: 0.2px;
    font-weight: 500;
    margin-bottom: 0.5rem;
    /*color: #2b2b2b;*/
    color: #5469d4;
  }

  .paybox-wrap {
    background-color: #f8f8f8;
    padding-top: 10px;
  }

  #payment-form {
    padding: 0 !important;
    position: relative;
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
    width: 400px !important;
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
    width: 400px;
    font-size: 14px;
    font-family: 'Rubik', 'sans-serif';
  }

  textarea, .calendar-picker {
    border-radius: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    height: 44px;
    max-height: 44px;
    font-size: 14px;
    background: white;
    margin-bottom: 6px;
    font-family: 'Rubik', 'sans-serif';
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
    width: 400px;
    max-width: 400px;
  }

  @media (max-width: $max-size-1) {
    #payment-form {
      width: 360px !important;
    }
    .your-email {
      width: 360px;
    }
    .ta-wrap, .calendar-picker {
      width: 360px;
      max-width: 360px;
    }
    .cc-temp {
      width: 360px;
      height: 108px;
      object-fit: cover;
    }
  }
  @media (max-width: $max-size-2) {
    #payment-form {
      width: 340px !important;
    }
    .your-email {
      width: 340px;
    }
    .ta-wrap, .calendar-picker {
      width: 340px;
      max-width: 340px;
    }
    .cc-temp {
      width: 340px;
      height: 108px;
      object-fit: cover;
    }

  }
  @media (max-width: $max-size-3) {
    #payment-form {
      width: 290px !important;
    }
    .your-email {
      width: 290px;
    }
    .ta-wrap, .calendar-picker {
      width: 290px;
      max-width: 290px;
    }
    .cc-temp {
      width: 290px;
    }
  }
  .button-b {
    border: 1px solid #5469d4;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #5469d4;
    padding: 3px 6px;
    /*height: 44px;*/
    margin-left: 10px;

    &:hover {
      border: 1px solid transparent;
      background-color: #5469d4;
      color: #fff;
    }
  }


  

  form {
    /*margin-top: 6px;*/
  }

  .ta-wrap {
    width: 400px;
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
          background-color: #5469d4;
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
</style>
