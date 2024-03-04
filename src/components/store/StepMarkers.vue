<template>
  <div class="step-markers df jcsb aic">
    <span class="step-marker" :class="{
      'current-step': currentStep === 1,
      'completed-step': currentStep > 1
    }" @click="clickedStep1()">
      <p>1</p>
    </span>
    <span class="step-divider step-divider-1-2"></span>
    <span class="step-marker" :class="{
      'current-step': currentStep === 2,
      'completed-step': currentStep > 2
    }" @click="clickedStep2()">
      <p>2</p>
    </span>
    <span class="step-divider step-divider-2-3"></span>
    <span class="step-marker" :class="{
      'current-step': currentStep === 3
    }" @click="clickedStep3()">
      <p>3</p>
    </span>
  </div>
</template>

<script>
export default {
  name: 'StepMarkers',
  data () {
    return {
    }
  },
  props: ['currentStep'],
  components: {

  },
  methods: {
    clickedStep1 () {
      this.$emit('clickedStep1')
    },
    clickedStep2 () {
      this.$emit('clickedStep2')
    },
    clickedStep3 () {
      this.$emit('clickedStep3')
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
  .step-markers {
    width: 100%;
    max-width: 250px;
    cursor: pointer;
  }

  .step-marker {
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    border: 1px solid #BBB;

    p {
      font-family: Kollektif;
      color: #5C5C5C;
      text-align: center;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;

    }
  }
  .step-divider {
    height: 2px;
    flex: 1;
    margin-left: 12px;
    margin-right: 12px;
    background: #BBB;
    /*border-radius: 24px;*/
    /*flex-shrink: 0;*/
    /*align-self: stretch;*/
  }

  .current-step {
    background-color: $color-primary;
    border-color: $color-primary;

    p {
      color: #fff;
    }
  }
  .completed-step {
    border-color: $color-primary;
    background-image: url(../../../static/brand-icons/check-circle.svg);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    p {
      color: transparent;
    }
  }
</style>
