<template>
  <!-- LOADING -->
  <div v-if="productData.loaded == false" class="paybox df fdc jcc aic f1 w100p">
    <h3 class="df aic jcc tac">
      <img class="spinner-1 mb-spinner o-spinner" src="../../../static/images/pushable/loader-black-2.png">
    </h3>
  </div>
  <!-- ORDER COMPLETE -->
  <div v-else-if="$store.getters['AUTH.orderComplete']" class="paybox df fdc jcc aic f1 w100p">
    <h3 class="df aic jcc tac">
      Order Complete
    </h3>
  </div>
  <!-- PRODUCT DELETED -->
  <div v-else-if="!productData.public || productData.deleted" class="paybox df fdc jcc aic f1 w100p">
    <h3 class="df aic jcc tac">
      This product is not active.
      {{productData}}
    </h3>
  </div>
  <!-- WHOLE PAGE -->
  <div v-else class="paybox df fdc jcc aic f1 w100p">
    <div class="paybox-top df jcsb">
      <PayBoxImage :data="productData.productImageUrl" />
      <div class="paybox-v-split df fdc">
        <PayBoxHeading :heading="productData.heading" :name="productData.userInfo && productData.userInfo.displayName" class="paybox-heading-spacing" />
        <PayBoxPrice
          :productType="productData.productType"
          :quantity="quantity"
          :setQuantity="setQuantity"
          :subscriptionQuantities="subscriptionQuantities"
          :setSubscriptionQuantity="setSubscriptionQuantity"
          :subscriptionProducts="productData.subscriptionProducts"
          :data="productData.price"
          class="paybox-price-spacing" />
        <PayBoxDescription
          :data="productData.description"
          class="paybox-description-spacing" />
        <div class="paybox-bottom df fdc w100p">
          <PayBoxCC
            v-if="productData"
            :quantity="quantity"
            :dev="false"
            :price="productData.price"
            :weight="productData.weightLb"
            :calendarDetails="calendarDetails"
            :productType="productData.productType"
            :ctaHeader="productData.secondaryHeading"
            :callToActionText="productData.callToActionText"
            :subscriptionQuantities="subscriptionQuantities"
            :subscriptionProducts="productData.subscriptionProducts"
            :productId="productData.uniqueProductId" />
        </div>
      </div>
    </div>
    <!-- <PayBoxOutcome /> -->
  </div>
</template>

<script>

import PayBoxImage from './PayBoxImage'
import PayBoxHeading from './PayBoxHeading'
import PayBoxPrice from './PayBoxPrice'
import PayBoxDescription from './PayBoxDescription'
import PayBoxHeading2 from './PayBoxHeading2'
import PayBoxCTAText from './PayBoxCTAText'
import PayBoxOutcome from './PayBoxOutcome'
import PayBoxCC from './PayBoxCC'

import router from '@/router'

export default {
  name: 'PayBox',
  data () {
    return {
      loading: false,
      productData: {loaded: false},
      yourEmail: '',
      calendarDetails: {},
      quantity: 1,
      subscriptionQuantities: []
    }
  },
  props: ['user', 'uniqueid'],
  components: {
    PayBoxImage,
    PayBoxHeading,
    PayBoxPrice,
    PayBoxDescription,
    PayBoxHeading2,
    PayBoxCTAText,
    PayBoxOutcome,
    PayBoxCC
  },
  methods: {
    setSubscriptionQuantity (item, quantity) {
      let subscriptionQuantities = this.subscriptionQuantities
      subscriptionQuantities[item] = quantity.target.value
      this.subscriptionQuantities = subscriptionQuantities
    },
    setQuantity (quantity) {
      this.quantity = quantity.target.value
    },
    goTo (route) {
      router.push(route)
    },
    getProduct () {
      this.$store.dispatch('AUTH.registerPayBoxView', {productId: this.uniqueid})
      this.$store.dispatch('AUTH.getProductById', {user: this.user, uniqueid: this.uniqueid}).then((res) => {
        this.productData = {...res, loaded: true}
        console.log('res==>', res)
        this.calendarDetails = {
          appointmentLength: res.appointmentLength,
          appointmentLengths: res.appointmentLengths,
          calendarFrom: res.calendarFrom,
          calendarTo: res.calendarTo,
          myTimezone: res.myTimezone,
        }
      })
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    this.getProduct()
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/settings.scss";

  * {
    color: $color-background-dark !important;
  }

  .paybox {
    height: 100%;
    min-height: calc(100vh - 90px);
  }

  .paybox-v-split {
    width: 500px;
    /*max-height: 400px;*/
    overflow-x: visible;
  }

  .paybox-heading-spacing {
    margin-bottom: 6px;
  }

  .paybox-price-spacing {
    margin-bottom: 12px;
  }

  .paybox-description-spacing {
    /*margin-bottom: 24px;*/
  }

  .paybox-cc-spacing {

  }

  .label {
    font-size: 16px;
  }
  @media (max-width: $max-size-1) {
    .paybox-v-split {
      height: 320px;
      max-height: 320px;
      width: 440px;
      min-width: 440px;
      max-width: 440px;
    }
  }

  @media (max-width: $max-size-2) {
    .paybox {
      justify-content: flex-start;
    }
    .paybox-top {
      flex-direction: column;
      align-items: center;
    }
    .paybox-v-split {
      height: unset;
      max-height: unset;
      width: 340px;
      min-width: 340px;
      max-width: 340px;
    }
    .label {
      font-size: 16px;
    }
    .paybox-bottom {
      position: sticky;
      bottom: 4px;
    }
  }
  @media (max-width: $max-size-3) {
    .paybox-v-split {
      width: 320px;
      min-width: 320px;
      max-width: 320px;
    }
    .cc-temp {
      width: 320px;
    }
  }
</style>
