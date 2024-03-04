<template>
  <div class="">

    <div class="w100p df jcfe aic" v-if="((calculcatedPrice() || 0) + quotedShipping.price) > 0">
      <p>Total ({{numberOfItemsText()}}): ${{calculcatedPrice().toFixed(2)}}</p>
    </div>

    <div v-if="addressRequired() && !addressSelected" class="df w100p">
      <vue-google-autocomplete id="map" classname="your-email" placeholder="Shipping Address" v-on:placechanged="getAddressData">
      </vue-google-autocomplete>
    </div>

    <!-- (productType == 'physical-product') || (productType == 'subscription-physical-product') -->
    <div v-if="addressRequired() && addressSelected" class="w100p df fdc posrel p10px mt20">
      <div class="w100p df jcsb">
        <a class="label paybox-label text-dark-important fz_y w_">Ship To:&nbsp;</a>
        <p class="address-selected f1 df fdr fww fz_x">
          <span v-for="(item) in formattedAddress()">{{item}}</span>
        </p>
        <a v-if="!shippingNotAvailable" class="edit-button text-primary-color ml10" @click="editAddress()">edit</a>
      </div>
      <div class="w100p df" v-if="shippingNotAvailable">
        <!-- <a class="label paybox-label text-dark-important">Shipping:</a> -->
        <p class="address-selected">Shipping to this address is not available.<a class="edit-button text-primary-color" @click="editAddress()">Ship to a different address</a></p>
        <!-- <p class="address-selected" v-else>${{quotedShipping.price ? quotedShipping.price.toFixed(2) : '-'}}</p> -->
        <!-- <a class="label paybox-label text-dark-important ml10" v-if="!loadingShipping">Subtotal:</a> -->
        <!-- <p class="address-selected" v-if="!loadingShipping">${{(parseFloat(quotedShipping.price) + parseFloat(price)).toFixed(2)}}</p> -->
      </div>
      <div class="w100p df" v-else>
        <a class="label paybox-label text-dark-important fz_y w_">Shipping:&nbsp;</a>
        <p class="address-selected fz_x" v-if="loadingShipping">calculating...&nbsp;</p>
        <p class="address-selected fz_x" v-else>{{quotedShipping.price ? '$' + quotedShipping.price.toFixed(2) : 'free'}}</p>
        <a class="label paybox-label text-dark-important ml10 fz_y" v-if="!loadingShipping">Subtotal:&nbsp;</a>
        <p class="address-selected fz_x" v-if="!loadingShipping">${{(parseFloat(quotedShipping.price) + calculcatedPrice()).toFixed(2)}} US</p>
      </div>
      <h4 class="button-0 mw400 button-override-1" @click="startAddingNameAndPhoneNumber()" v-if="!loadingShipping && !shippingNotAvailable && !addNameAndPhoneNumber">
        + Add Name & Phone Number
      </h4>
      <div class="w100p df fdc mt20 name-and-phone-number" v-else-if="!loadingShipping && !shippingNotAvailable">
        <input class="your-email" v-model="shipToName" type="text" placeholder="Name" name="">
        <input class="your-email" v-model="shipToPhoneNumber" type="text" placeholder="Phone Number" name="">
      </div>
    </div>


    <input class="your-email" v-model="yourEmail" type="text" placeholder="Your E-mail" name="">
    <div v-if="noPay()" class="no-payment-form">
      <p class="save-product-error mt10 mb15" v-if="saveProductError">{{saveProductError.message}}</p>
      <button id="submit" class="button-1 submit" @click="pay($event)">
        <img class="spinner-1" v-if="getting" src="../../../static/brand-icons/loader-white.png">
        <span v-else id="button-text">{{'Get It Free'}}</span>
      </button>
      <p id="card-error" role="alert"></p>
    </div>
    <form v-else id="payment-form" class="w100p payment-form"> <!-- start -->
      <div id="card-element"></div>
      <p class="save-product-error mb15" v-if="saveProductError">{{saveProductError.message}}</p>
      <button class="button-1" id="submit" @click="pay($event)">
        <div class="spinner hidden" id="spinner"></div>
        <span id="button-text">{{callToActionText || 'Purchase'}}</span>
      </button>
      <p id="card-error" role="alert"></p>
      <!-- <p class="result-message hidden">
        Payment succeeded, see the result in your
        <a href="" target="_blank">Stripe dashboard.</a> Refresh the page to pay again.
      </p> -->
    </form> <!-- end -->
  </div>
</template>

<script>

import VueGoogleAutocomplete from "vue-google-autocomplete";

import { firebaseInstance } from '@/util/firebase'

export default {
  name: 'CheckoutButton',
  data () {
    return {
      getting: false,
      shipToName: '',
      shipToPhoneNumber: '',
      addNameAndPhoneNumber: true,
      addressSelected: false,
      addressSelectedData: {},
      yourEmail: '',
      fullName: '',
      saveProductError: false,
      loadingShipping: false,
      shippingNotAvailable: false,
      quotedShipping: {
        loaded: false,
        price: 0
      },
      orderNumber: ''
    }
  },
  props: ['callToActionText', 'setShippingByOwner'],
  components: {
    VueGoogleAutocomplete
  },
  methods: {
    numberOfItemsText () {
      let cart = this.$store.getters['AUTH.cart']
      let items = cart.items
      let owners = {}
      let total = 0
      let subscriptionTotal = 0

      for (let i in items) {
        let item = items[i]
        if (item.productType == 'physical-product') {
          let lineItemQuantity = (parseInt(item.newItemQuantity) || 1)
          total = total + lineItemQuantity 
        } else {
          total = total + 1
        }
      }

      let s = total > 1 ? 's' : ''

      return total + ' item' + s
    },
    addressRequired () {
      let cart = this.$store.getters['AUTH.cart']
      let items = cart.items
      for (let i in items) {
        if ((items[i].productType == 'physical-product') ||
            (items[i].productType == 'subscription-physical-product')) {
          return true
        }
      }
      return false
    },
    editAddress () {
      this.shippingNotAvailable = false
      this.addressSelected = false
      this.setShippingByOwner({})
    },
    calculcatedPrice () {
      let cart = this.$store.getters['AUTH.cart']
      let items = cart.items
      let owners = {}
      let total = 0
      let subscriptionTotal = 0

      for (let i in items) {
        let item = items[i]
        if (item.productType == 'physical-product') {
          let q = item.newItemQuantity
          let s = item.sizes[item.newItemSize].price
          let lineItemPrice = parseFloat(q) * parseFloat(s)
          total = total + lineItemPrice 
        } 
        if (item.productType == 'calendar-event') {
          let s = item.newAppointment.times[item.newAppointment.selectedAppointmentTime].price
          let lineItemPrice = parseFloat(s)
          total = total + lineItemPrice 
        } else if (item.productType !== 'subscription-physical-product') {
          let lineItemPrice = item.price * (item.newItemQuantity || 1)
          total = total + lineItemPrice 
        } else if (item.productType == 'subscription-physical-product') {
          // handle subscription items
        }
      }
      return parseFloat(total.toFixed(2))
    },
    formattedAddress () {
      let address = this.addressSelectedData
      let addressString = [address.address1, address.city + ', ' + address.state + ', ' + address.postalCode + ', ' + address.country]
      return addressString
    },
    getAddressData: function (addressData, placeResultData, id) {
      console.log('data', addressData, placeResultData, id, this.weight)

      let weight = this.weight || 0
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

      // let countryCode = this.addressSelectedData.countryCode
      // let weight = this.weight || 0

      let totalWeight = 2

      this.loadingShipping = true
      this.$store.dispatch('AUTH.getShippingForCartOrder', {
        order: {
          cart: this.$store.getters['AUTH.cart']
        },
        address: this.addressSelectedData
        // orderId // will be set at this stage
        // weight: totalWeight,
      }).then((res) => {
        console.log('getShippingForCartOrder result', res)

        let shippingByOwner = res.shippingByOwner
        let shippingNa = false
        for (let o in shippingByOwner) {
          let shipping = shippingByOwner[o]
          if (shipping == 'NA') {
            shippingNa = true
            break
          }
        }

        this.setShippingByOwner(shippingByOwner)

        if (res.status !== 200) {
          this.loadingShipping = false
          this.shippingNotAvailable = true
          this.quotedShipping = {
            loaded: true,
            price: 0
          }
        } else if (shippingNa) {
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
          console.log('loadCreditCardModule()')
          this.loadCreditCardModule()
        }

      })
    },
    loadCreditCardModule () {
      console.log('loading CC module')
      if (document.querySelector("button")) {
        this.$store.dispatch('AUTH.getPaymentIntentForOrder', {
          order: this.$store.getters['AUTH.cart'],
          shipping: this.quotedShipping,
          // items: [this.productId],
          // quantities: [this.quantity],
          noPay: this.noPay()
        }).then((res) => {
          console.log('paymentIntent =>', res)
          if (res.orderNumber) {
            this.then = res.after
            this.orderNumber = res.orderNumber
          } else {
            // error loading order
          }
        })
      } else {
        // console.log('no button')
        setTimeout(() => {
          this.loadCreditCardModule()
        }, 1000)
      }
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
      return true
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

      this.getting = true

      // else if (this.description == '') {
      //   this.setProductError('validation-description', 'The description cannot be empty.')
      //   return false
      // }

      let cart = this.$store.getters['AUTH.cart']
      if (this.noPay()) {
        console.log('noPay')
        // this.getting = true

        let orderDetails = {
          orderId: this.orderNumber,
          name: this.fullName,
          email: this.yourEmail,
          shippingAddress: this.addressSelectedData,
          shipToName: this.shipToName,
          shipToPhoneNumber: this.shipToPhoneNumber,
          cart
          // selectedAppointmentTime: this.selectedAppointmentTime,
          // selectedTimeAvailabe: this.selectedTimeAvailabe,
          // selectedDay: this.selectedDay,
          // productDeliveryFile: this.productDeliveryFile,
          // productDeliveryInstructions: this.instructions,
        }

        console.log('orderDetails', orderDetails)
        console.log('cart', cart)

        this.$store.dispatch('AUTH.setPreOrderDetailsAndPay', {
          orderDetails,
          noPay: true
        }).then((res) => {
          console.log('THEN!', res)
          let _orderId = res.orderId
          console.log('orderNumber', _orderId)

          let order_update_path = 'orderUpdates/'
          let watch_order_path = order_update_path + (_orderId || 'f')
          console.log('watch_order_path', watch_order_path)
          console.log('_firebase 2-1', firebaseInstance)
          // console.log('_firebase 2-2', __firebaseInstance)
          // console.log('_firebase 2-3', _firebase)
          firebaseInstance.database().ref(watch_order_path).on('value', (snap) => {
            let orderStatus = snap.val()
            console.log('orderStatus', orderStatus)
            if (orderStatus.completed) {
              console.log('show order completion screen')
              console.log('cart', this.$store.getters['AUTH.cart'])
              let sellerId = this.$store.getters['AUTH.cart'].items[0].ownerId
              this.$emit('orderCompleted')
              this.$store.dispatch('AUTH.clearMyCartForSeller', {sellerId})
            }
          })

        })
      } else {
        console.log('pay')
        if (this.then) {
          this.$store.dispatch('AUTH.setPreOrderDetailsAndPay', {
            orderDetails: {
              email: this.yourEmail,
              name: this.fullName,
              shippingAddress: this.addressSelectedData,
              shipToName: this.shipToName,
              shipToPhoneNumber: this.shipToPhoneNumber,
              orderId: this.orderNumber,
              cart,
              quotedShipping: this.quotedShipping
              // timesAvailable
              // next45Days
              // selectedAppointmentTime: this.selectedAppointmentTime,
              // selectedTimeAvailabe: this.selectedTimeAvailabe,
              // selectedDay: this.selectedDay,
              // productDeliveryFile: this.productDeliveryFile,
              // productDeliveryInstructions: this.instructions,
            },
            then: this.then
          })

          let _orderId = this.orderNumber
          console.log('orderNumber', _orderId)

          let order_update_path = 'orderUpdates/'
          let watch_order_path = order_update_path + (_orderId || 'f')
          console.log('watch_order_path', watch_order_path)
          console.log('_firebase 2-1', firebaseInstance)
          // console.log('_firebase 2-2', __firebaseInstance)
          // console.log('_firebase 2-3', _firebase)
          firebaseInstance.database().ref(watch_order_path).on('value', (snap) => {
            let orderStatus = snap.val()
            console.log('orderStatus', orderStatus)
            if (orderStatus.completed) {
              console.log('show order completion screen')
              console.log('cart', this.$store.getters['AUTH.cart'])
              let sellerId = this.$store.getters['AUTH.cart'].items[0].ownerId
              this.$emit('orderCompleted')
              this.$store.dispatch('AUTH.clearMyCartForSeller', {sellerId})
            }
          })

        }
      }
    },
    noPay () {
      return (this.calculcatedPrice() + this.quotedShipping.price) == 0
    }
  },
  computed: {

  },
  created () {
    if (this.noPay()) {
      //
    } else {
      console.log('Checkout Button: loading credit card module')
      this.loadCreditCardModule()
    }

    if (this.$store.getters['AUTH.email']) {
      this.yourEmail = this.$store.getters['AUTH.email']
    }
  }
}
</script>

<style scoped lang="scss">
  .w100p {
    width: 100%;
  }
  .payment-form {
    padding: 0;
  }
  #submit {
    margin-top: 6px;
  }
  .fz_x {
    font-size: 16px;
  }
  .fz_y {
    font-size: 14px;
    font-weight: 600;
  }
  .w_ {
    width: 70px;
  }
  .name-and-phone-number {
    width: calc(100% - 40px);
    align-self: center;
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
</style>
