<template>
  <div class="add-link-outer" @click="closeLinkEditor()">
    <div class="add-link-wrapper">
      <div class="w100p add-link-box" @click="stopProp($event)">
        <img class="x-close" src="../../../static/brand-icons/x-close.svg" @click="closeLinkEditor()">
        <h3 class="w100p add-link-box-title">Join The Mailing List</h3>
        <div class="w100p df fdc aifs mb_x">
          <h5 class="add-link-box-heading"
            :class="{'field-error-text': error.hasError && (error.field == 'myEmail')}">
            Your Email
          </h5>
          <input
            v-model="myEmail"
            type="text"
            placeholder="Enter your email"
            class="add-link-box-input"
            :class="{'field-error-exists': error.hasError && (error.field == 'myEmail')}"
            name="">
          <p class="field-error-text" v-if="error.hasError && (error.field == 'myEmail')">{{error.text}}</p>
        </div>
        <!-- <div class="w100p df fdc aifs mb_x">
          <h5 class="add-link-box-heading"
            :class="{'field-error-text': error.hasError && (error.field == 'linkUrl')}">
            Link Url
          </h5>
          <input
            v-model="linkUrl"
            type="text"
            placeholder="Where does the link go?"
            class="add-link-box-input"
            :class="{'field-error-exists': error.hasError && (error.field == 'linkUrl')}"
            name="">
          <p class="field-error-text" v-if="error.hasError && (error.field == 'linkUrl')">{{error.text}}</p>
        </div>
        <div class="w100p df fdc aifs mb_x">
          <h5 class="add-link-box-heading">
            Link Image
          </h5>
          <DropzoneUploader 
            :image="linkImage"
            @uploadedImage="uploadedImage"
            @removeImage="removeImage"
          />
        </div> -->
        <div class="w100p actions df fd jcsb aic" :class="{'waiting-for-action': saving}">
          <h4 class="action-button button-cancel" @click="closeLinkEditor()">Cancel</h4>
          <div class="f1"></div>
          <h4 class="action-button button-primary" @click="joinList()">
            <img
              v-if="saving"
              class="button-loading-spinner"
              src="../../../static/images/pushable/loader-black.png">
            {{saving ? '' : 'Join'}}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import DropzoneUploader from '@/components/common/DropzoneUploader'

export default {
  name: 'MailingListModal',
  data () {
    return {
      saving: false,
      myEmail: '',
      error: {
        hasError: false,
        field: '',
        text: ''
      }
    }
  },
  props: ['ownerId'],
  components: {
    DropzoneUploader
  },
  methods: {
    isValidEmail (email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    },
    isValidUrl (urlString) {
      var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i') // validate fragment locator
      return !!urlPattern.test(urlString)
    },
    validateData () {
      this.setError(false)
      if (!this.isValidEmail(this.myEmail)) {
        this.setError('myEmail', 'Please enter a valid email.')
        return false
      }
      return true
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
    joinList () {
      if (!this.validateData()) {
        return false
      }
      this.saving = true
      this.$store.dispatch('AUTH.joinMailingList', {
        email: this.myEmail,
        ownerId: this.ownerId
      }).then((res) => {
        console.log('Joined mailing list')
        this.closeLinkEditor()
        this.saving = false
        this.setError(false)
        this.$emit('flashJoinedMailingList')
      })
    },
    closeLinkEditor () {
      this.$emit('closeMailingListModal')
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
    if (this.$store.getters['AUTH.email']) {
      this.myEmail = this.$store.getters['AUTH.email']
    } else {
      this.myEmail = ''
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
