<template>
  <div class="open-cart-wrapper" @click="$emit('showCart', false)">
    <div class="open-cart w100p" @click="stopProp($event)">
      <img @click="$emit('showCart', false)" class="go-back-to-my-products curp smaller-only mb10" src="../../../static/images/back.svg" >
      <img @click="$emit('showCart', false)" src="../../../static/brand-icons/x-close.svg" class="fa-solid fa-x x-close only-bigger"></i>

      <div v-if="!orderCompleted" class="w100p fdc">
        <div class="item-options-bar w100p df jcsb aic">
          <p class="item-options-bar-title">Your Cart</p>
          <div class="cart-items w100p df fdc mt20">
            <div v-for="(item, i) in $store.getters['AUTH.cart'].items" class="cart-item w100p df jcsb mb20">
              <img class="cart-item-image" :src="item.productImage"/>
              <div class="df fdc f1">
                <p class="cart-item-title bold-title">{{item.title}}</p>
                <p v-if="(item.productType == 'physical-product') && item.sizes && (item.newItemSize || item.newItemSize === 0)" class="cart-item-price font-product-modifiers">
                  {{item.sizes[item.newItemSize].name}}
                </p>
                <p v-if="(item.productType == 'calendar-event')" class="cart-item-price font-product-modifiers">
                  {{customDateString(item.newAppointment.selectedCalendarDay)}}
                </p>
                <p v-if="(item.productType == 'calendar-event')" class="cart-item-price font-product-modifiers">
                  {{minutesToHhMm(item.newAppointment.appointmentStartTime)}} – {{minutesToHhMm(item.newAppointment.appointmentStartTime + (item.newAppointment.times ? item.newAppointment.times[item.newAppointment.selectedAppointmentTime].time : 0))}}
                </p>
                <p v-if="(item.productType == 'custom-service')" class="cart-item-price font-product-modifiers">
                  {{item.serviceInstructions}}
                </p>
                <p v-if="(item.productType == 'digital-download')" class="cart-item-price font-product-modifiers item-description">
                  {{item.description}}
                </p>
                <div class="df aic g10">
                  <p v-if="item.productType == 'physical-product'" class="cart-item-price bold-price">{{parseFloat(item.sizes[item.newItemSize].price) ? '$' + (parseFloat(item.sizes[item.newItemSize].price)) : 'free'}}</p>
                  <p v-else-if="item.productType == 'calendar-event'" class="cart-item-price bold-price">{{item.newAppointment.times && (item.newAppointment.times[item.newAppointment.selectedAppointmentTime].price ? '$' + (item.newAppointment.times[item.newAppointment.selectedAppointmentTime].price) : 'free')}}</p>
                  <p v-else class="cart-item-price bold-price">{{item.price ? '$' + (item.price) : 'free'}}</p>
                  <!-- <p class="cart-item-price bold-price">{{item.newItemQuantity ? 'x' + item.newItemQuantity : ''}}</p> -->
                </div>
                <p v-if="(shippingByOwner[item.ownerId] == 'NA') && (item.productType == 'physical-product')" class="item-cannot-be-delivered">This item cannot be delivered to this address.</p>
              </div>
              <!-- <p>{{item.price ? '$' + item.price * (item.newItemQuantity || 1) : 'free'}}</p> -->
              <span class="cart-item-quantity-selector df aic">
                <span v-if="item.productType == 'physical-product'" class="quantity-minus" @click="$emit('reduceQuantity', item.cartIndex)">
                  <i v-if="!item.newItemQuantity || (item.newItemQuantity == 1)" class="fa-solid fa-trash change-quantity">–</i>
                </span>
                <p v-else class="remove-item" @click="$emit('reduceQuantity', item.cartIndex)">remove</p>
                <span v-else>remove</span>
                <span class="quantity-amount" v-if="item.productType == 'physical-product'">
                  <p>{{item.newItemQuantity || 1}}</p>
                </span>
                <span class="quantity-plus" v-if="item.productType == 'physical-product'">
                  <i class="fa-solid fa-plus change-quantity" @click="$emit('increaseQuantity', item.cartIndex)">+</i>
                </span>
              </span>
              <br/>
            </div>
          </div>
        </div>
        <hr class="cart-hr"/>
        <CheckOutButton
          :setShippingByOwner="setShippingByOwner"
          @orderCompleted="setOrderCompleted"/>
        <h4 @click="$emit('showCart', false)" class="button-1 disabled-button h42">
          Add items
        </h4>
        <div class="df w100p jcsb powered mt10">
          <p>Secured by Stripe</p>
          <p>Powered by Pushable</p>
        </div>
      </div>
      <div v-else class="w100p">
        <div class="item-options-bar w100p df jcsb aic">
          <p class="item-options-bar-title">Thank you for your order!</p>
          <div class="cart-items w100p df fdc mt20">
            <div v-for="(item, i) in pastCart.items" class="cart-item w100p df jcsb mb20">
              <img class="cart-item-image" :src="item.productImage"/>
              <div class="df fdc f1">
                <p class="cart-item-title bold-title">{{item.title}}</p>
                <p v-if="(item.productType == 'physical-product') && item.sizes && (item.newItemSize || item.newItemSize === 0)" class="cart-item-price font-product-modifiers">
                  {{item.sizes[item.newItemSize].name}}
                </p>
                <p v-if="(item.productType == 'calendar-event')" class="cart-item-price font-product-modifiers">
                  {{customDateString(item.newAppointment.selectedCalendarDay)}}
                </p>
                <p v-if="(item.productType == 'calendar-event')" class="cart-item-price font-product-modifiers">
                  {{minutesToHhMm(item.newAppointment.appointmentStartTime)}} – {{minutesToHhMm(item.newAppointment.appointmentStartTime + (item.newAppointment.times ? item.newAppointment.times[item.newAppointment.selectedAppointmentTime].time : 0))}}
                </p>
                <p v-if="(item.productType == 'custom-service')" class="cart-item-price font-product-modifiers">
                  {{item.serviceInstructions}}
                </p>
                <p v-if="(item.productType == 'digital-download')" class="cart-item-price font-product-modifiers item-description">
                  {{item.description}}
                </p>
                <div class="df aic g10">
                  <p v-if="item.productType == 'physical-product'" class="cart-item-price bold-price">{{parseFloat(item.sizes[item.newItemSize].price) ? '$' + (parseFloat(item.sizes[item.newItemSize].price)) : 'free'}}</p>
                  <p v-else-if="item.productType == 'calendar-event'" class="cart-item-price bold-price">{{item.newAppointment.times && (item.newAppointment.times[item.newAppointment.selectedAppointmentTime].price ? '$' + (item.newAppointment.times[item.newAppointment.selectedAppointmentTime].price) : 'free')}}</p>
                  <p v-else class="cart-item-price bold-price">{{item.price ? '$' + (item.price) : 'free'}}</p>
                  <!-- <p class="cart-item-price bold-price">{{item.newItemQuantity ? 'x' + item.newItemQuantity : ''}}</p> -->
                </div>
                <p v-if="(shippingByOwner[item.ownerId] == 'NA') && (item.productType == 'physical-product')" class="item-cannot-be-delivered">This item cannot be delivered to this address.</p>
              </div>
              <!-- <p>{{item.price ? '$' + item.price * (item.newItemQuantity || 1) : 'free'}}</p> -->
              <span class="cart-item-quantity-selector df aic">
                <!-- <span class="quantity-minus" @click="$emit('reduceQuantity', item.cartIndex)">
                  <i v-if="!item.newItemQuantity || (item.newItemQuantity == 1)" class="fa-solid fa-trash">-</i>
                  <i v-else class="fa-solid fa-minus"">-</i>
                </span> -->
                <span class="quantity-amount quantity-amount-order-completed">
                  <p>{{item.newItemQuantity || 1}}</p>
                </span>
                <!-- <span class="quantity-plus">
                  <i class="fa-solid fa-plus" @click="$emit('increaseQuantity', item.cartIndex)">+</i>
                </span> -->
              </span>
              <br/>
            </div>
          </div>
        </div>
        <h4 @click="$emit('showCart', false)" class="button-1 disabled-button h42">
          Back to {{storeOwnerUsername}}
        </h4>
      </div>

    </div>
  </div>
</template>

<script>
import CheckOutButton from '@/components/cart/CheckOutButton'
export default {
  name: 'OpenCart',
  data () {
    return {
      orderCompleted: false
    }
  },
  props: ['shippingByOwner', 'setShippingByOwner', 'storeOwnerUsername'],
  components: {
    CheckOutButton
  },
  methods: {
    setOrderCompleted () {
      this.pastCart = this.$store.getters['AUTH.cart']
      this.orderCompleted = true
    },
    customDateString (dateString) {
      console.log('dateString', dateString)
      const date = new Date(dateString); // Getting full month name (e.g. "September")
      let _date = new Date(date.getTime() + Math.abs(date.getTimezoneOffset()*60000))

      const month = _date.toLocaleString('default', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      return month
    },
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
    stopProp (event) {
      event && event.stopPropagation()
    }
  },
  computed: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";
  $padding: 20px;
  .w100p {
    width: 100%;
  }
  .open-cart {
    position: fixed;
    overflow-y: auto;
    background-color: #f8f8f8;
    width: 100%;
    height: 100%;
    padding: 20px;
    padding-bottom: calc(#{$padding} + 70px);

    p {
      color: #000;
    }
  
    &-wrapper {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #00000033;
      z-index: 1000;
    }
    .cart-item {
      &-title {
        font-size: 18px;
      }
      &-price {
        font-size: 14px;
      }
      &-image {
        width: 80px;
        height: 80px;
        margin-right: 15px;
        border-radius: 4px;
        object-fit: cover;
      }
      .quantity-minus, .quantity-plus {
        font-size: 14px;
        transform: translateY(1px);
      }
      .quantity-minus {

      }
      .quantity-amount {
        width: 27px;
        height: 27px;
        border-radius: 4px;
        border: 2px solid #bbb;
        margin-left: 9px;
        margin-right: 9px;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 14px;
          line-height: 1em;
          /*transform: translateY(0.5px);*/
        }
      }
      .quantity-plus {

      }
    }
  }

  .item-options-bar {
    margin-top: 20px;
    flex-direction: column;
    align-items: flex-start;
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
  .only-bigger {
    display: none;
  }

  @media (min-width: 680px) {
    .smaller-only {
      display: none;
    }
    .only-bigger {
      display: block
    }
  }
  .add-to-cart-inner {
    &-wrapper {
      position: relative;
    }
  }
  .item-options-bar {
    margin-top: 0;
    &-title {
      font-size: 22px;
      font-weight: 600;
    }
  }
  .bold-price {
    font-weight: 600;
    font-size: 16px !important;
    color: $color-primary !important;
    margin-top: 4px;
  }
  .x-close {
    cursor: pointer;
    position: absolute;
    right: 19px;
    top: 16px;
  }

  @media (min-width: 680px) {
    .open-cart {
      max-width: 540px;
      height: 80vh;
      position: relative;
      display: flex;
      flex-direction: column;
      padding-bottom: 0;
      border-radius: 15px;

      &-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &-bar {
        flex-direction: column;
        align-items: flex-start;

        &-price {

        }
      }
    }
    .item-options-bar {
      flex-direction: column;
      align-items: flex-start;

      &-title {
        font-size: 22px;
        font-weight: 600;
      }
      &-price {

      }
    }
  }
  .disabled-button {
    background-color: #ccc;
  }
  .powered {
    p {
      font-size: 12px;
      color: #888;
    }
  }
  .cart-hr {
    width: 100%;
    height: 1px;
    min-height: 1px;
    background-color: #000;
    border: none;
    margin-bottom: 20px;
  }
  .item-cannot-be-delivered {
    color: orange !important;
  }
  .font-product-modifiers {
    color: #888 !important;
    margin-top: 4px;
  }
  .quantity-minus, .quantity-plus {
    cursor: pointer;
  }

  .vc-text-gray-400 {
    pointer-events: none;
  }

  .h42 {
    height: 42px;
    min-height: 42px;
  }
  .item-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .quantity-amount-order-completed {
    border-color: transparent !important;
  }
  .change-quantity {
    font-size: 22px;
  }
  .remove-item {
    font-family: Kollektif;
    color: #777 !important;
    font-size: 13px;
    font-weight: 200;
    cursor: pointer;
  }
</style>
