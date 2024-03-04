<template>
  <div v-if="image" class="w100p dropzone-wrapper image-dropzone-wrapper posrel df aic jcfs">
    <!-- <img class="image-uploaded" :style="textOverride == 'file' ? 'padding: 25px; object-fit: contain;' : ''" :src="image"> -->
    <div class="df fdc jcc aifs file-text">
      <!-- <p>Filename</p> -->
      <a v-if="!noEdit && !textOverride || (textOverride && textOverride.toLowerCase() == 'image')" class="w100p tal image-uploaded-under mb_" @click="editCrop()">Edit</a>
      <a class="w100p tal image-uploaded-under" @click="removeProductImage()">Remove {{textOverride ? textOverride : 'image'}}</a>
    </div>
  </div>
  <div v-else class="w100p dropzone-wrapper image-dropzone-wrapper posrel">
    <vue-dropzone ref="myVueDropzone" 
            id="dropzone-a"
            class="image-upload"
            @vdropzone-file-added="uploadedProductImage"
            :options="dropzoneOptions">
    </vue-dropzone>
    <div class="dropzone-overlay df fdc jcc aic">
      <img class="doc-file" src="../../../static/instapage/document-3.png">
      <p class="dropzone-text mt10 tac">Drag or <span>upload</span> {{textOverride ? textOverride : 'image'}}</p>
      <p class="support-line">Supports .docx</p>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'DropzoneUploader',
  data () {
    return {
      dropzoneOptions: {
          file: '', // profileImageUrl
          autoProcessQueue: false,
          url: 'https://',
          thumbnailWidth: 120,
          maxFilesize: 10,
          // headers: { "My-Awesome-Header": "header value" },
          // dictDefaultMessage: 'Check',
          // previewTemplate: document.querySelector('#template-container').innerHTML
          dictDefaultMessage: ``
      },
      // profileImageUrl: ''
    }
  },
  props: ['image', 'textOverride', 'public', 'crop', 'noEdit'],
  components: {
    vueDropzone: vue2Dropzone
  },
  methods: {
    editCrop () {
      this.$emit('editCrop')
    },
    goTo (route) {
      router.push(route)
    },
    removeProductImage () {
        this.$emit('removeImage')
    },
    uploadedProductImage (file) {
      let item = {
        uid: this.$store.getters['AUTH.uid'],
        file
      }
      if (this.public) {
        this.$store.dispatch('AUTH.uploadPublicImage', item).then((res) => {
          console.log('uploadPublicImage result', res.url)
          setTimeout(() => {
            this.$emit('uploadedImage', res)
          }, 100)
        })
      } else {
        this.$store.dispatch('AUTH.uploadProfileImage', item).then((res) => {
          console.log('uploadProfileImage result', res.url)
          this.$emit('uploadedImage', res)
        })
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
  /*@import "../../styles/_colors.scss";*/
  
  $image-upload-size: calc(100vh - 300px);
  .dropzone-wrapper {
    width: 100%;
    position: relative;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
  }
  .image-upload {
    cursor: pointer;
    height: $image-upload-size;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    border: 2px dashed #D9D9D9;
    background-color: #F9F9F9;
    /*min-height: 120px !important;*/
    min-height: 260px !important;

    & > * {
      margin: 0 !important;
    }
  }
  .image-uploaded {
    width: $image-upload-size;
    height: $image-upload-size;
    border-radius: 6px;
    /*border: 1px solid rgba(50, 50, 93, 0.1);*/
    object-fit: cover;
  }
  .file-text {
    p {
      overflow: hidden;
      color: #000;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    a {
      color: #5C5C5C;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  $height: 120px;
  .file-upload {
    width: 100%;
    /*max-width: 500px;*/
    height: $image-upload-size;
    border-radius: 6px;
    /*padding: 12px;*/
    border: 1px dashed rgba(50, 50, 93, 0.1);
    font-size: 16px;
    background: white;
    /*margin-right: 20px;*/
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover {
      & + .dropzone-overlay {
        background-color: #fdfdfd;
        border: 1px dashed rgba(50, 50, 93, 0.12);
        
        a {
          background-color: #5469d4;
          color: #fff;
        }
      }
    }
  }
  .product-delivery-file {
    & > div {
      border: 1px solid rgba(50, 50, 93, 0.1);
      border-radius: 6px;
      width: 100%;
      height: $image-upload-size;
    }
  }
  $callout-font-size: 30px;
  .dropzone-overlay {
    border-radius: 10px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-size: $callout-font-size;
      line-height: 1em;
      margin-bottom: 6px;
    }
  }

  .dropzone-text {
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    font-size: $callout-font-size;
    line-height: 1em;
    font-style: normal;
    font-weight: 500;

    & > span {
      text-decoration: underline;
    }
  }

  .file-text {
    margin-left: 16px;
  }
  .mb_ {
    /*color: #44d600 !important;*/
    margin-bottom: 4px;
  }

  .doc-file {
    height: 100px;
  }
  .support-line {
    margin-top: 2px;
    font-size: 14px !important;
  }
</style>
