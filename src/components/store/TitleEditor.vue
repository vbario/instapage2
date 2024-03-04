<template>
  <div class="add-link-outer" @click="closeTitleEditor()">
    <div class="add-link-wrapper">
      <div class="w100p add-link-box" @click="stopProp($event)">
        <img class="x-close" src="../../../static/brand-icons/x-close.svg" @click="closeTitleEditor()">
        <h3 class="w100p add-link-box-title">{{addingOrEditing() ? 'Add' : 'Edit'}} Title</h3>
        <div class="w100p df fdc aifs mb_x">
          <h5 class="add-link-box-heading"
            :class="{'field-error-text': error.hasError && (error.field == 'titleText')}">
            Title Text
          </h5>
          <input
            v-model="titleText"
            type="text"
            placeholder="Enter title"
            class="add-link-box-input"
            :class="{'field-error-exists': error.hasError && (error.field == 'titleText')}"
            name="">
          <p class="field-error-text" v-if="error.hasError && (error.field == 'titleText')">{{error.text}}</p>
        </div>
        <div class="w100p actions df fd jcsb aic" :class="{'waiting-for-action': saving || deleting}">
          <h4 class="action-button button-cancel" @click="closeTitleEditor()">Cancel</h4>
          <div class="f1"></div>
          <h4 v-if="addingOrEditing()" class="action-button button-primary" @click="addNewTitle()">
            <img
              v-if="saving"
              class="button-loading-spinner"
              src="../../../static/images/pushable/loader-black.png">
            {{saving ? '' : 'Add'}}
          </h4>
          <h4 v-else class="action-button button-primary" @click="saveTitle()">
            <img
              v-if="saving"
              class="button-loading-spinner"
              src="../../../static/images/pushable/loader-black.png">
            {{saving ? '' : 'Save'}}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import DropzoneUploader from '@/components/common/DropzoneUploader'

export default {
  name: 'TitleEditor',
  data () {
    return {
      saving: false,
      deleting: false,
      titleText: '',
      error: {
        hasError: false,
        field: '',
        text: ''
      }
    }
  },
  props: ['data', 'showTitleEditor', 'numberOfItemsInStore'],
  components: {
    DropzoneUploader
  },
  methods: {
    validateData () {
      this.setError(false)
      if (this.titleText == '') {
        this.setError('titleText', 'Please enter a title.')
        return false
      }
      return true
    },
    addNewTitle () {
      console.log('addNewTitle')

      if (!this.validateData()) {
        return false
      }

      this.saving = true

      console.log('numberOfItemsInStore', this.numberOfItemsInStore)

      this.$store.dispatch('AUTH.addTextToStore', {
        text: this.titleText,
        position: this.numberOfItemsInStore
      }).then((res) => {
        console.log('addTextToStore result', res.url)
        this.titleText = ''
        this.saving = false
        this.closeTitleEditor()
        this.setError(false)
        this.$emit('reloadStore')
      }).catch((error) => {
      })
    },
    setError (field, error) {
      if (!field) {
        this.error = {
          hasError: false,
          field: '',
          text: ''
        }
      } else {
        this.error = {
          hasError: true,
          field,
          text: error
        }
      }
    },
    saveTitle () {
      if (!this.validateData()) {
        return false
      }

      this.saving = true

      let title = {
        titleText: this.titleText,
      }
      this.$store.dispatch('AUTH.saveTitle', {
        titleKey: this.data.key,
        title
      }).then((res) => {
        console.log('new title added')
        this.closeTitleEditor()
        this.saving = false
        this.setError(false)
        this.$emit('reloadStore')
      })
    },
    addingOrEditing () { // true, false if editing
      return this.showTitleEditor == 'new'
    },
    closeTitleEditor () {
      this.$emit('closeTitleEditor')
    },
    stopProp (event) {
      event && event.stopPropagation()
    }
  },
  computed: {

  },
  created () {
  },
  mounted () {
    if (this.addingOrEditing()) {
      this.titleText = ''
    } else {
      this.titleText = this.data && this.data.text
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";

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
      padding: 32px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 24px;

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

  @media (max-width: 700px) {
    .add-link-wrapper {
      width: 100%;
      max-width: unset;
      height: 100%;
      top: 0;
      left: 0;
      transform: unset;
      border-radius: 0;
    }
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

  .actions {
    gap: 8px;
  }

  .x-close {
    top: 16px;
    right: 16px;
    cursor: pointer;
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

  $error-red: #DD0000;

  @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
  }

  .field-error-exists {
    border-color: $error-red;
  }
  .field-error-text {
    color: $error-red;
  }
</style>
