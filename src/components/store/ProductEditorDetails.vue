<template>
  <div class="product-details-default w100p df fdc mt24">
    <div class="product-detail">
      <h5 class="add-link-box-heading">Product title</h5>
      <input @input="changeHeading"
        :value="heading"
        :class="{'field-error-exists': error.hasError && (error.field == 'heading')}"
        placeholder="Product title"
        type=""
        name="">
      <p class="field-error-text" v-if="error.hasError && (error.field == 'heading')">{{error.text}}</p>
    </div>

    <!-- <div class="product-detail">
      <h4>Secondary heading</h4>
      <input placeholder="Product Heading" v-model="heading" placeholder="Product title" type="" name="">
    </div> -->

    <!-- <div class="product-detail">
      <h5 class="add-link-box-heading">Price</h5>
      <div class="df price-input-wrapper" :class="{'disabled-2': freeProduct}">
        <input 
          v-if="freeProduct"
          min="0"
          placeholder="0.00"
          step="0.01"
          v-model="price"
          type="number"
          name=""
          class="f1_plus input-text-i price-input-wrapper-input"
          :class="{'disabled-1': freeProduct}"
          @click="toggleFree(false)">
        <input
          v-else min="0.99"
          placeholder="0.00"
          step="0.01"
          v-model="price"
          type="number"
          name=""
          class="f1_plus input-text-i price-input-wrapper-input"
          :class="{'disabled-1': freeProduct}"
          @change="checkPrice($event)"
          @click="toggleFree(false)">

        <div class="df aic spec or-set-as-free">
          <p class="or-free disabled-1 or" v-if="!freeProduct">or</p>
          <div class="f1 checkbox-wrapper" :class="{'disabled-1': !freeProduct}">
            <input @change="adjustPrice()" v-model="freeProduct" type="checkbox" class="check-fulfillment-box i32 curp" :style="'opacity: ' + (freeProduct ? 1 : 0.5) + ';'" name="">
            <p class="curp set-as-free" @click="toggleFree(!freeProduct)">{{freeProduct ? 'Free' : 'Set as free'}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w100p product-detail df fdr aic jcsb g16" v-if="!freeProduct">
      <div class="f1 df fdc">
        <h5 class="add-link-box-heading">Sale price</h5>
        <div class="df price-input-wrapper f1" :class="{'disabled-2': freeProduct}">
          <input
            min="0.99"
            placeholder="0.00"
            step="0.01"
            v-model="price"
            type="number"
            name=""
            class="f1_plus input-text-i price-input-wrapper-input"
            :class="{'disabled-1': freeProduct}"
            @change="checkPrice($event)"
            @click="toggleFree(false)">
        </div>
      </div>
      <div class="f1 df fdc">
        <h5 class="add-link-box-heading">Sale date range</h5>
        <div class="df price-input-wrapper f1" :class="{'disabled-2': freeProduct}">
          <input
            min="0.99"
            placeholder="0.00"
            step="0.01"
            v-model="price"
            type="number"
            name=""
            class="f1_plus input-text-i price-input-wrapper-input"
            :class="{'disabled-1': freeProduct}"
            @change="checkPrice($event)"
            @click="toggleFree(false)">
        </div>
      </div>
    </div> -->

    <div class="w100p df fdc aifs mb_x">
      <h5 class="add-link-box-heading">
        Product Image
      </h5>
      <DropzoneUploader 
        :image="productImage"
        :noEdit="true"
        @uploadedImage="uploadedImage"
        @removeImage="removeImage"
      />
    </div>
    <div class="w100p df fdc aifs mb_x">
      <h5 class="add-link-box-heading">
        Product Description
      </h5>
      <textarea
        @input="changeDescription"
        :value="description"
        :class="{'field-error-exists': error.hasError && (error.field == 'description')}"
        placeholder="Description"
        class="product-text-area">    
      </textarea>
      <p class="field-error-text" v-if="error.hasError && (error.field == 'description')">{{error.text}}</p>
    </div>
  </div>
</template>

<script>

import DropzoneUploader from '@/components/common/DropzoneUploader'

export default {
  name: 'ProductEditorDetails',
  data () {
    return {
      price: 0.99,
      freeProduct: false
    }
  },
  props: ['productType', 'heading', 'description', 'productImage', 'error'],
  components: {
    DropzoneUploader,
  },
  methods: {
    changeHeading (event) {
      this.$emit('changeHeading', event)
    },
    changeDescription (event) {
      this.$emit('changeDescription', event)
    },
    priceOnStep2 () {
      return (this.productType == 'digital-download')
    },
    uploadedImage (data) {
      console.log('uploadedImage', data.url)
      this.$emit('changeProductImages', data.url)
      // this.productImage = data.url
    },
    removeImage () {
      console.log('removing image')
      this.$emit('changeProductImages', '')
      // this.productImage = ''
    },
    checkPrice (event) {
      let newPrice = event.target.value
      if (newPrice < 0.99) {
        this.price = 0.99
      }
    },
    toggleFree (freeProduct, fromInput) {
      if (freeProduct) {
        console.log('from price0', this.freeProduct)
        this.price = 0
      } else {
        console.log('from price', this.freeProduct)
        if (this.price == 0) {
          console.log('from price2')
          this.price = 0.99
        }
      }
      this.freeProduct = freeProduct
    },
    adjustPrice () {
      console.log('adjustPrice', this.freeProduct)
      if (this.freeProduct) {
        this.price = 0
      } else {
        this.price = 0.99
      }
    },

  },
  computed: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .add-link {
    &-outer {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #0000008F;
      z-index: 200;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    &-wrapper {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      width: 100%;
      max-width: 600px;
      border-radius: 12px;
      border: 1px solid #ddd;
      background-color: #fff;
    }
    &-box {
      position: relative;
      display: flex;
      padding: 48px 32px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /*gap: 24px;*/

      &-title {
        color: #000;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        text-align: center;
      }

      &-heading {
        color: #000;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        margin-bottom: 6px;
      }
    }
  }
  .i32 {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    border-radius: 1px !important;
    border-color: #bbb;
  }
  .f1_plus {
    width: unset;
    flex: 1;
  }
  .or-set-as-free {
    margin-left: 16px;
    gap: 16px;

    .or {
      color: #5C5C5C;
      text-align: center;
      font-size: 9px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-transform: uppercase;
    }

    .set-as-free {
      color: #000;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
    }
  }
  .input-text-i {
    overflow: hidden;
    /*color: #5C5C5C;*/
    text-overflow: ellipsis;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
  }
  .price-input-wrapper {
    position: relative;

    &-input {
      padding-left: calc(16px + 9px);
    }

    &::after {
      position: absolute;
      display: block;
      width: 20px;
      height: 20px;
      top: 50%;
      left: 16px;
      content: '$';
      font-size: 14px;
      font-family: Kollektif;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      transform: translate(0, calc(-50% - 5px));
    }
  }
  .disabled-1 {
    opacity: 0.5;
  }
  .disabled-2 {
    &::after {
      opacity: 0.5;
    }
  }
  .g16 {
    gap: 16px;
  }

</style>
