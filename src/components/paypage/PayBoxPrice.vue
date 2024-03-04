<template>
  <p class="paybox-price df aic" v-if="(productType == 'physical-product') && data">
    <span class="df aic" v-if="productType == 'physical-product'">
      <select :value="quantity" class="quantity-tab" @change="setQuantity($event)">
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
      <p class="quantity-x">x</p>
    </span>
    <span>
      ${{data}}
    </span>
  </p>
  <div class="paybox-price df fdc" v-else-if="(productType == 'subscription-physical-product') && data">
    
    <!-- <span class="df aic">
      <select :value="quantity" class="quantity-tab" @change="setQuantity($event)">
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
      <p class="quantity-x">x</p>
    </span>
    <span>
      ${{data}}
    </span> -->

    <div class="w100p df jcsb subscription-items">
      <div v-for="(item, i) in subscriptionProducts" class="subscription-item">
        <img v-if="item.image" :src="item.image" class="subscription-image">
        <i v-else class="fa-solid fa-repeat subscription-image"></i>
        <h4 class="fz14 mtxx">{{item.name}}</h4>
        <div class="quantity df jcsb aic mtx">
          <p>
            Qty: {{subscriptionQuantities[i] || 0}}
          </p>
          <i class="fa-solid fa-chevron-down"></i>
          <select v-model="subscriptionQuantities[i]" class="quantity-dropdown">
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
        <p class="fz14 mtxx">${{price(i) && price(i).toFixed(2) || '0.00'}}</p>
      </div>
    </div>

  </div>
  <p v-else></p>
</template>

<script>
export default {
  name: 'PayBoxPrice',
  data () {
    return {

    }
  },
  props: ['data', 'quantity', 'setQuantity', 'productType', 'subscriptionQuantities', 'setSubscriptionQuantity', 'subscriptionProducts'],
  components: {

  },
  methods: {
    price (i) {
      return (this.subscriptionQuantities[i] || 0) * ((this.subscriptionProducts[i] && this.subscriptionProducts[i].price) || 0)
    },
    totalPrice () {
      let price = 0
      for (let i in this.subscriptionProducts || []) {
        price = price + this.price(i)
      }
      return price
    }
  },
  computed: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
p, h1, h2, h3, h4, h5, h6, input, textarea, select {
  font-family: Kollektif;
}
.paybox-price {
  font-size: 16px;
}
.quantity-tab {
  font-size: 16px;
  width: 50px;
  min-width: 50px;
  margin-right: 10px;
}
.quantity-x {
  margin-right: 10px;
}
.subscription-items {
  gap: 10px;
}
.subscription-item {
  flex: 1;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid black;
}

.quantity {
  position: relative;
  padding: 4px 8px 4px 8px;
  border-radius: 10px;
  margin-bottom: 3px;
  position: relative;
  /*background-color: #ffffff22;*/
  background-color: #00000022;

  p {
    font-size: 12px;
  }

  i {
    font-size: 10px;
    transform: translateY(-1px); 
    color: #000;
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
.subscription-image {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: #ddd;
}
i.subscription-image {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.fz14 {
  font-size: 14px;
}
.mtx {
  margin-top: 4px;
}
.mtxx {
  margin-top: 6px;
}
</style>
