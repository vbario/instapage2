<template>
  <div v-if="$store.getters['AUTH.cart'].loaded && ($store.getters['AUTH.cart'].items.length > 0)"
    class="cart" @click="$emit('showCart', true)" :style="relative ? 'position: relative; height: 36px; width: 36px; top: unset; left: 0 !important; transform: unset; margin-left: 8px;' : ''">
    <div v-if="!brandColor" class="cart-icon" :style="relative ? 'transform: unset; left: 0; top: 0; width: 36px; height: 36px;' : ''"></div>
    <div v-else class="cart-icon" :style="'background-color: ' + brandColor + ';' + (relative ? 'transform: unset; left: 0; top: 0; width: 36px; height: 36px;' : '')"></div>
    <img src="../../../static/brand-icons/cart.svg" class="cart-cart">
    <span v-if="!relative" class="cart-hover-effect"></span>
    <p class="cart-items" :style="relative ? 'left: -3px; top: 2px;' : ''">
      {{$store.getters['AUTH.cart'].items.length}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CartIcon',
  data () {
    return {
    }
  },
  props: ['brandColor', 'useCustomBrandColor', 'relative'],
  components: {
  },
  methods: {
  },
  computed: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .cart {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: fixed;
    right: 10px;
    top: 10px;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    z-index: 300;
    transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;

    &-cart {
      z-index: 200;
      /*transform: translateX(-0.5px);*/
    }

    &-items {
      position: absolute;
      left: 4px;
      top: 4px;
      z-index: 210;
      display: flex;
      width: 12px;
      height: 12px;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: #000;
      color: #FFF;
      font-size: 8px;
      font-style: normal;
      font-weight: 700 !important;
      padding-top: 1px;
      line-height: normal;
    }


    &:hover {
      transform: scale(1.01);
    }

    .cart-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: #7CB5EC;
      box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
      -webkit-box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.05);
    }


    .cart-hover-effect {
      position: absolute;
      opacity: 0;
      width: 62px;
      height: 62px;
      left: 50%;
      top: 50%;
      transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
      transform: translate(calc(-50% + 1px), calc(-50% - 1px));
      background-color: #ffffff00;
      z-index: 1;
      border-radius: 50%;
    }

    &:hover {
      .cart-hover-effect {
        opacity: 1;
      }
    }

  }
</style>
