<template>
  <div class="add-link-outer" @click="closeLinkEditor()">
    <div class="add-link-wrapper">
      <div class="w100p add-link-box" @click="stopProp($event)">
        <img class="x-close" src="../../../static/brand-icons/x-close.svg" @click="closeLinkEditor()">
        <h3 class="w100p add-link-box-title">{{addingOrEditing() ? 'Add' : 'Edit'}} Link</h3>
        <div class="w100p df fdc aifs mb_x">
          <h5 class="add-link-box-heading"
            :class="{'field-error-text': error.hasError && (error.field == 'linkText')}">
            Link Text
          </h5>
          <input
            v-model="linkText"
            type="text"
            placeholder="Enter link text"
            class="add-link-box-input"
            :class="{'field-error-exists': error.hasError && (error.field == 'linkText')}"
            name="">
          <p class="field-error-text" v-if="error.hasError && (error.field == 'linkText')">{{error.text}}</p>
        </div>
        <div v-if="(showLinkEditor.i == 'new') || (links[showLinkEditor.i] && (links[showLinkEditor.i].type !== 'mailing-list') && (links[showLinkEditor.i].type !== 'contact'))" class="w100p df fdc aifs mb_x">
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
            :noEdit="true"
            :image="linkImage"
            @uploadedImage="uploadedImage"
            @removeImage="removeImage"
          />
        </div>
        <div class="w100p actions df fd jcsb aic" :class="{'waiting-for-action': saving || deleting}">
          <h4 v-if="!addingOrEditing()" class="action-button button-delete" @click="deleteLink()">
            <img
              v-if="deleting"
              class="button-loading-spinner"
              src="../../../static/images/pushable/loader-black.png">
            {{deleting ? '' : 'Delete'}}
          </h4>
          <div class="f1"></div>
          <h4 class="action-button button-cancel" @click="closeLinkEditor()">Cancel</h4>
          <h4 v-if="addingOrEditing()" class="action-button button-primary" @click="addNewLink()">
            <img
              v-if="saving"
              class="button-loading-spinner"
              src="../../../static/images/pushable/loader-black.png">
            {{saving ? '' : 'Add'}}
          </h4>
          <h4 v-else class="action-button button-primary" @click="saveLink()">
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
  name: 'LinkEditor',
  data () {
    return {
      saving: false,
      deleting: false,
      linkText: '',
      linkUrl: '',
      linkImage: '',
      error: {
        hasError: false,
        field: '',
        text: ''
      }
    }
  },
  props: ['links', 'showLinkEditor'],
  components: {
    DropzoneUploader
  },
  methods: {
    isValidUrl (urlString) {
      var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i') // validate fragment locator
      return !!urlPattern.test(urlString)
    },
    uploadedImage (data) {
      console.log('setting url', data.url)
      this.linkImage = data.url
    },
    removeImage () {
      console.log('removing image')
      this.linkImage = ''
    },
    isLinkToElement () {
      return (this.links[this.showLinkEditor.i]) && (
              (this.links[this.showLinkEditor.i].type == 'mailing-list') ||
              (this.links[this.showLinkEditor.i].type == 'contact') ||
              (this.links[this.showLinkEditor.i].type == 'blog')
            )
    },
    validateData () {
      this.setError(false)
      if (this.linkText == '') {
        this.setError('linkText', 'Please enter a link title.')
        return false
      } else if (!this.isLinkToElement()) {
        if (this.linkUrl == '') {
          this.setError('linkUrl', 'Please enter a link destination.')
          return false
        } else if (!this.isValidUrl(this.linkUrl)) {
          this.setError('linkUrl', 'Please enter a valid url.')
          return false
        }
      }
      return true
    },
    addNewLink () {
      console.log('addNewLink')

      if (!this.validateData()) {
        return false
      }

      this.saving = true

      let link = {
        linkText: this.linkText,
        linkUrl: this.linkUrl,
        linkImage: this.linkImage
      }
      this.$store.dispatch('AUTH.addNewLink', link).then((res) => {
        console.log('new link added')
        this.closeLinkEditor()
        this.saving = false
        this.setError(false)
        this.$emit('reloadStore', {scrollLinksToEnd: true})
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
    saveLink () {
      console.log('saveLink', this.showLinkEditor.i)

      if (!this.validateData()) {
        return false
      }

      console.log('saveLink 2')

      this.saving = true

      let link = {
        linkText: this.linkText,
        linkUrl: this.linkUrl,
        linkImage: this.linkImage
      }
      this.$store.dispatch('AUTH.saveLink', {
        linkIndex: this.showLinkEditor.i,
        link
      }).then((res) => {
        console.log('new link added')
        this.closeLinkEditor()
        this.saving = false
        this.setError(false)
        this.$emit('reloadStore')
      })
    },
    deleteLink () {
      this.deleting = true
      this.setError(false)
      
      console.log('deleteLink', this.showLinkEditor.i)
      this.$store.dispatch('AUTH.deleteLink', {
        linkIndex: this.showLinkEditor.i
      }).then((res) => {
        console.log('new link added')
        this.closeLinkEditor()
        this.deleting = false
        this.$emit('reloadStore')
      })
    },
    addingOrEditing () { // true, false if editing
      return (this.showLinkEditor == 'new') || (this.showLinkEditor && (this.showLinkEditor.i == 'new')) 
    },
    closeLinkEditor () {
      this.$emit('closeLinkEditor')
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
    console.log('opened link editor 1', this.showLinkEditor)
    console.log('opened link editor 2', this.addingOrEditing() ? 'adding' : 'editing')
    if (this.addingOrEditing()) {
      this.linkText = ''
      this.linkUrl = ''
      this.linkImage = ''
    } else {
      let i = this.showLinkEditor.i
      console.log('i', i)
      this.linkText = this.links[i].heading || ''
      this.linkUrl = this.links[i].url || ''
      this.linkImage = this.links[i].image || ''
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
      overflow-y: auto;

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

</style>
