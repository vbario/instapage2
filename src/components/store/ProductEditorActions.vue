<template>
  <div v-if="currentStep > 1" class="w100p actions df fd jcsb aic" :class="{'waiting-for-action': saving || deleting}">
    <h4 v-if="addingOrEditing || currentStep == 3" class="action-button button-proceed" @click="goBackAStep()">
        <img src="../../../static/brand-icons/back-green.svg" class="mr8">
        Back
    </h4>
    <div class="f1"></div>
    <h4 class="action-button button-cancel" @click="closeProductEditor()">Cancel</h4>
    <h4 v-if="currentStep == 2" class="action-button button-primary" @click="continueToStep3()">
      <img
        v-if="saving"
        class="button-loading-spinner"
        src="../../../static/images/pushable/loader-black.png">
      {{saving ? '' : 'Continue'}}
    </h4>
    <h4 v-else-if="addingOrEditing" class="action-button button-primary" @click="saveOnLastStep()">
      <img
        v-if="saving"
        class="button-loading-spinner"
        src="../../../static/images/pushable/loader-black.png">
      {{saving ? '' : 'Add'}}
    </h4>
    <h4 v-else class="action-button button-primary" @click="saveOnLastStep()">
      <img
        v-if="saving"
        class="button-loading-spinner"
        src="../../../static/images/pushable/loader-black.png">
      {{saving ? '' : 'Save'}}
    </h4>
  </div>
</template>

<script>
export default {
  name: 'ProductEditorActions',
  data () {
    return {
    }
  },
  props: ['currentStep', 'deleting', 'saving', 'addingOrEditing'],
  components: {

  },
  methods: {
    goBackAStep () {
      this.$emit('goBackAStep')
    },
    closeProductEditor () {
      this.$emit('closeProductEditor')
    },
    continueToStep3 () {
      this.$emit('continueToStep3')
    },
    addNewProduct () {
      this.$emit('addNewProduct')
    },
    saveOnLastStep () {
      this.$emit('saveOnLastStep')
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

  .actions {
    gap: 8px;
    margin-top: 18px;
  }


  .waiting-for-action {
    opacity: 0.5;
    pointer-events: none;
  }


  .button-loading-spinner {
    width: 20px;
    pointer-events: none;
    animation-name: spin;
    animation-duration: 5000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
  }

  .action-button {
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 16.5px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 1em;
    cursor: pointer;
  }

  .button-primary {
    background-color: $color-primary;
    border: 1px solid $color-primary;
    color: #fff;
  }

  .button-cancel {
    background-color: transparent;
    border: 1px solid transparent;
    color: #888;
  }

  .button-delete {
    background-color: transparent;
    border: 1px solid transparent;
    color: #D00;
  }

  .button-proceed {
    background-color: transparent;
    border: 1px solid transparent;
    color: $color-primary;
  }
  .mr8 {
    margin-right: 8px;
  }

</style>
