<template>
  <div class="select-type df jcc aic fww g32" :style="mt ? 'margin-top:' + mt + 'px;' : ''">
    <div class="one-type" @click="startNewProductWithType('physical-product', 'new')">
      <img src="../../../static/brand-icons/add-physical-product.svg">
      <div class="df fdc aic jcc">
        <p>Physical Product</p>
        <p class="sub">
          Sell anything – sweaters, coffee, toys – and deliver it to your customers.
        </p>
      </div>
    </div>
    <div class="one-type" @click="startNewProductWithType('digital-download', 'new')">
      <img src="../../../static/brand-icons/add-download.svg">
      <div class="df fdc aic jcc">
        <p>Download</p>
        <p class="sub">Sell books, music, cooking recipes, clipart packs, and anything else you can think of!
        </p>
      </div>
    </div>
    <div class="one-type" @click="startNewProductWithType('calendar-event', 'new')">
      <img style="background-color: #fff; border-radius: 4px;" src="../../../static/brand-icons/add-calendar-event.svg">
      <div class="df fdc aic jcc">
        <p>Appointment</p>
        <p class="sub">
           Let customers book an appointment with you.
        </p>
      </div>
    </div>
    <div class="one-type" @click="startNewProductWithType('custom-service', 'new')">
      <img src="../../../static/brand-icons/add-custom.svg">
      <div class="df fdc aic jcc">
        <p>Custom Product or Service</p>
        <p class="sub">
          The customer will send you instructions and/or files. You will send back access to completed work.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceTypeSelector',
  data () {
    return {
    }
  },
  props: ['mt'],
  components: {

  },
  methods: {
    startNewProductWithType (type, id) {
      this.$emit('startNewProductWithType', {type, id})
    },
  },
  computed: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";
  .select-type {
    margin-top: 48px;
  }
  .one-type {
    display: flex;
    width: 180px;
    height: 180px;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 22px;
    align-self: stretch;
    border-radius: 12px;
    border: 1px solid #BBB;
    background: #fff;
    cursor: pointer;

    & > img {
      object-fit: contain;
      /*transition: transform 0.75s ease;*/
    }

    p {
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 22px; /* 157.143% */

      &.sub {
        text-align: center;
        font-size: 12px;
        font-style: normal;
        font-weight: 400 !important;
        line-height: 18px;
        margin-top: 8px;
        opacity: 0;
        transition: opacity 0.75s ease;
      }
    }

    & > * {
      transition: transform 0.75s ease;
      transform: translateY(32px);
    }

    &:hover {
      /*background-color: #eaeaea;*/
      background-color: #ecfbe5;
      border-color: #ecfbe5;

      & > img {
        /*transform: translateY(-71px);*/
      }

      p {
        /*transform: translateY(-71px);*/
        &.sub {
          opacity: 1;
        }
      }

      & > * {
        transform: translateY(-37px);
      }
    }
  }

  .g32 {
    gap: 32px;
  }
</style>
