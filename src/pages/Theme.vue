<template>
  <div class="product-wrapper df fdc aic f1 w100p">

    <div class="cropper-wrapper" v-if="newBannerImage" @click="cancelEditingBanner()">
      <div class="whole-page-box-global cropper df fdc jcc aic" @click="stopProp($event)">
        <img class="cropper-image" :src="newBannerImage">
        <!-- <cropper
          ref="cropper"
          :src="newBannerImage"
          :stencil-props="{
            aspectRatio: 4/1
          }"
          :default-position="{
            left: (cropCoordinates.left || cropCoordinates.left === 0) ? cropCoordinates.left : 100,
            top: (cropCoordinates.top || cropCoordinates.top === 0) ? cropCoordinates.top : 100
          }"
          :default-size="{
            width: cropCoordinates.width || 100,
            height: cropCoordinates.height || ''
          }"
          @change="changeBannerImageCrop"
        /> -->
        <div class="w100p df jcsb aic">
          
          <h4 class="button-3" @click="cancelEditingBanner()">Cancel</h4>
          <h4 class="button-1" @click="setNewBackgroundImage()">Save</h4>

        </div>
      </div>
    </div>


    <div class="w100p max-width-box g_ df fdc">
      <h4 class="w100p tal">Banner</h4>
      <div class="whole-page-box-global w100p df fdc jcc aic g_">
        <h3 class="w100p tal ___rr" v-if="findImagesVisible">Search for a custom banner image</h3>
        <div class="w100p df jcsb aic _r _r2">
          <div class="df jcc aic banner-source-selector" :class="{'__rr': findImagesVisible}">
            <div class="banner-source-selector-tab"
                :class="{'banner-source-selector-tab-selected': bannerTab == 'upload'}"
                @click="setBannerTab('upload')">
              <img src="../../static/brand-icons/upload.svg">
              <p>My Banner</p>
            </div>
            <div class="banner-source-selector-tab"
                :class="{'banner-source-selector-tab-selected': bannerTab == 'generate'}"
                @click="setBannerTab('generate')">
              <img src="../../static/brand-icons/gallery.svg">
              <p>Generate</p>
              <!-- <img src="../../static/brand-icons/tooltip.svg" class="ml__" v-tooltip="`Generate banner images.`"/> -->
            </div>
          </div>
          <span class="f1 __rr" :class="{'____rr': findImagesVisible}"></span>
          <div class="df aic jcc search-wrapper" :class="{'visible-input': findImagesVisible}" v-if="bannerTab == 'generate'">
            <img src="../../static/brand-icons/search.svg">
            <input placeholder="Find images" type="text" name="" @input="getPhotosBy">
          </div>
          <p v-if="(bannerTab == 'generate') && !findImagesVisible" class="__m">or <span class="highlight-click" @click="showFindImages()">find images</span></p>
          <p v-else-if="(bannerTab == 'generate')" class="__m"><span class="click" @click="hideFindImages()">cancel</span></p>
          <span v-if="(bannerTab == 'generate')" :class="{'___rr': !findImagesVisible}" class="f1 __r"></span>
        </div>
        <div v-if="bannerTab == 'upload'" class="w100p df fdc jcc aic">
          <DropzoneUploader 
            :image="removeBanner ? '' : banner.url"
            :imageCrop="banner.crop"
            :public="true"
            @uploadedImage="uploadedImage"
            @removeImage="removeProductImage"
            @editCrop="editCrop"
          />
        </div>
        <div v-else-if="bannerTab == 'generate'" class="w100p df fdc jcc aic">
          <div class="w100p df aic fww random-photos-gallery" id="banner-photos-gallery" ref="banner-photos-gallery">
            <img v-for="(image, i) in randomPhotos" class="random-photos-gallery-image" :src="image.urls.thumb"@click="openCropperWithImage(image)"/>
          </div>
          <div class="w100p df jcc aic">
            <button v-if="!gettingImages" class="load-more-button" @click="getMorePhotos()">
              Load more
            </button>
            <p class="mt_" v-else>
              Loading images...
            </p>
          </div>
        </div>
      </div>
    </div>
    

    <div class="w100p max-width-box g_ df fdc">
      <h4 class="w100p tal">Colors</h4>
      <div class="whole-page-box-global w100p df g__">
        <div class="w100p df fdc f4">
          <p class="type-heading">
            Theme color
            <img src="../../static/brand-icons/tooltip.svg" v-tooltip="`The theme color is your theme's highlight color`"/>
          </p>
          <div class="df aic color-swatch">
            <div v-for="(color, c) in defaultColorOptions" class="color-option-wrapper" :style="'border-color: ' + (tempBrandColor ? (tempBrandColor == color ? color : 'transparent') : (brandColor == color ? (tempSetAsCustom || useCustomBrandColor ? 'transparent' : color) : 'transparent')) + ';'" @click="selectBrandColor(color)">
              <div class="color-option" :style="'background-color: ' + color + ';'">
              </div>
            </div>
            <div class="color-option-wrapper" :style="'border-color: ' + (((defaultColorOptions.indexOf(brandColor) < 0) || useCustomBrandColor || tempSetAsCustom) ? (tempBrandColor ? tempBrandColor : brandColor) : 'transparent') + ';'" @click="selectCustomBrandColor">
              <div class="color-option">
                <div class="color-option-image-outer">
                  <input class="color-option-image-picker" :value="tempBrandColor || brandColor || defaultColorOptions[0]" type="color" name="" @input="changeCustomBrandColor">
                  <img class="color-option-image" src="../../static/brand-icons/color-picker.png">
                </div>
              </div>
            </div>
          </div>
          <!-- <vue-color-picker :predefine="[]" v-model="color" /> -->
        </div>
        <div class="w100p df fdc f3">
          <p class="type-heading">Color preview</p>
          <div class="df aic">
            <button class="custom-button" :style="'background-color: ' + (tempBrandColor ? (tempBrandColor || '#ddd') : (brandColor ? brandColor : '#ddd')) + ';'">Your Buttons Will Look Like This</button>
          </div>
        </div>
      </div>
    </div>
    

    <div class="w100p max-width-box g_ df fdc">
      <h4 class="w100p tal">Other</h4>
      <div class="whole-page-box-global w100p df jcc aic">
        <div class="w100p df jcsb aic fww f3 g___">
          <div class="df aic">
            <label class="switch">
              <input class="switch-input" :disabled="!$store.getters['AUTH.plan'].pro" type="checkbox" :checked="hidePushableBranding" @change="toggleHidePushableBranding($event)">
              <span class="slider round"></span>
            </label>
            <p class="f1 type-heading tal wsnw ml_">Hide Pushable logo</p>
          </div>
          <button v-if="!$store.getters['AUTH.plan'].pro" class="custom-button bgcg" @click="goTo('/plan')">
            Upgrade to Pro to remove
          </button>
        </div>
      </div>
    </div>
    
    <!-- <div class="top-bar-global posrel w100p df jcfs aic">
      <img v-if="$route.query.back" @click="goTo('/' + $route.query.back)" class="go-back-to-my-products curp" src="../../static/images/back.svg" >
      <h2 class="text-dark">Settings</h2>
    </div> -->

    <!-- <div v-if="$store.getters['AUTH.email']" class="text-dark your-email aic your-email-2">
      <p>{{$store.getters['AUTH.email']}}</p>
    </div> -->
    
  </div>
</template>

<script>

import router from '@/router'
import common from '@/util/common'
import products from '@/util/products'
import DropzoneUploader from '@/components/common/DropzoneUploader'
// import { ColorPicker } from 'vue-accessible-color-picker'
// import 'vue-accessible-color-picker/styles.css'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

export default {
  name: 'Theme',
  data () {
    return {
      lastGeneratedFromSearchPage: 0,
      tempBrandColor: '',
      tempSetAsCustom: false,
      cropCoordinates: {},
      newBannerImage: '',
      defaultColorOptions: [
        '#44D600',
        '#F87666',
        '#F7DBA7',
        '#6C63FF',
        '#2A1E5C',
        '#177E89',
        '#00A1E4',
        '#D8B4E2'
      ],
      gettingImages: false,
      bannerImage: '',
      bannerTab: 'upload',
      dropzoneOptions: {
          autoProcessQueue: false,
          url: 'https://',
          thumbnailWidth: 150,
          maxFilesize: 1,
          // headers: { "My-Awesome-Header": "header value" },
          // dictDefaultMessage: 'Check',
          // previewTemplate: document.querySelector('#template-container').innerHTML
          dictDefaultMessage: ``
      },
      loading: false,
      profileImageUrl: '',
      fullName: '',
      displayName: '',
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      checkingUsername: false,
      newUsernameIsAvailable: false,
      notAvailableMessage: false,
      typingTimer: {},
      changingUsername: false,
      changingPassword: false,
      showingMore: false,
      saving: false,
      randomPhotos: [],
      getPhotosTimer: {},
      lastGeneratedFrom: 'random',
      lastSearch: '',
      removeBanner: false,
      findImagesVisible: false
    }
  },
  props: ['feel', 'banner', 'brandColor', 'useCustomBrandColor', 'hidePushableBranding'],
  components: {
    DropzoneUploader,
    Cropper
  },
  methods: {
    showFindImages () {
      this.findImagesVisible = true
    },
    hideFindImages () {
      this.findImagesVisible = false
    },
    toggleHidePushableBranding (event) {
      console.log('toggleHidePushableBranding')
      // this.$emit('hidePushableBranding', event.target.value)
      this.$store.dispatch('AUTH.hidePushableBranding', {
        hidePushableBranding: !this.hidePushableBranding
      }).then((res) => {
        this.$emit('reloadStore')
      })
    },
    flip(x,y) {
      this.$refs.cropper.flip(x,y);
    },
    rotate(angle) {
      this.$refs.cropper.rotate(angle);
    },
    stopProp (event) {
      event && event.stopPropagation()
    },
    changeBannerImageCrop ({ coordinates, canvas }) {
      console.log('changeBannerImageCrop', coordinates, canvas)
      this.cropCoordinates = coordinates
    },
    cancelEditingBanner () {
      this.newBannerImage = ''
    },
    selectCustomBrandColor () {
      this.tempSetAsCustom = true
      this.$store.dispatch('AUTH.selectBrandColor', {
        brandColor: this.brandColor,
        useCustomBrandColor: true
      }).then((res) => {
        this.$emit('reloadStore')
      })
    },
    changeCustomBrandColor (event) {
      let color = event.target.value
      console.log('changeCustomBrandColor; color:', color)
      this.selectBrandColor(color, true)
    },
    selectBrandColor (brandColor, setAsCustom) {
      this.tempBrandColor = brandColor
      this.tempSetAsCustom = setAsCustom
      console.log('selectBrandColor', brandColor, setAsCustom)
      this.$store.dispatch('AUTH.selectBrandColor', {brandColor, useCustomBrandColor: setAsCustom || false}).then((res) => {
        this.$emit('reloadStore')
      })
    },
    editCrop () {
      let image = {urls: {regular: this.banner.url}}
      this.openCropperWithImage(image)
    },
    openCropperWithImage (image) {
      this.newBannerImage = image.urls.regular
      this.cropCoordinates = this.banner.crop || {}
    },
    setNewBackgroundImage () {
      let image = this.newBannerImage
      let cropCoordinates = this.cropCoordinates
      this.findImagesVisible = false
      this.bannerTab = 'upload'

      console.log('setAsMyBackgroundImage', image, cropCoordinates)
      this.$store.dispatch('AUTH.setBannerImage', {url: image, crop: cropCoordinates}).then((res) => {
        this.newBannerImage = ''
        this.$emit('reloadStore')
      })
    },
    uploadedImage (data) {
      console.log('setting url', data.url)
      this.openCropperWithImage({urls: {regular: data.url}})
      this.removeBanner = false
      this.$emit('reloadStore')
      // this.$store.dispatch('AUTH.setBannerImage', {url:data.url}).then((res) => {
        // this.saving = false
        // let product = res
        // console.log('after saveProfile', res)
        // this.changingUsername = false
      // })
      // this.bannerImage = data.url
    },
    removeImage () {
      console.log('removing image')
      // this.bannerImage = {}
    },
    setBannerTab (bannerTab) {
      this.bannerTab = bannerTab

      if (bannerTab == 'generate') {
        this.getRandomPhotos(true)
      }
    },
    goTo (route) {
      router.push(route)
    },
    newOrEdit () {
      if (this.uniqueProductId) {
        return 'Edit '
      }
      return 'New '
    },
    productTypeDisplay () {
      let type = this.productType
      if (type == 'digital-download') {
        return 'Digital Download'
      } else if (type == 'digital-service') {
        return 'Service'
      } else if (type == 'calendar-event') {
        return 'Calendar Invite'
      }
      return ''
    },
    saveProfile (activate) {
      console.log('saveProfile')
      // let productObject = {
      //   profileImageUrl: this.profileImageUrl,
      //   // fullName: this.fullName,
      //   displayName: this.displayName,
      //   newPassword: this.newPassword,
      //   newPasswordConfirm: this.newPasswordConfirm,
      // }

      // this.saving = true

      // console.log('productObject', productObject)

      // this.$store.dispatch('AUTH.saveProfile', productObject).then((res) => {
      //   this.saving = false
      //   let product = res
      //   console.log('after saveProfile', res)
      //   this.changingUsername = false
      // })
    },
    removeProductImage () {
      this.removeBanner = true
    },
    removeProductDeliveryFile () {
      this.productDeliveryFile = ''
    },
    uploadedProductImage (file) {
      let item = {
        uid: this.$store.getters['AUTH.uid'],
        file
      }
      this.$store.dispatch('AUTH.uploadProfileImage', item).then((res) => {
        console.log('uploadProfileImage result', res.url)
        this.profileImageUrl = res.url
        this.removeBanner = false
        this.saveProfile()
      })
    },
    generateNewInternalProductId () {
    },
    loadProfile () {
      if (this.$store.getters['AUTH.myInfo'] && this.$store.getters['AUTH.myPrivateInfo']) {
        // this.fullName = this.$store.getters['AUTH.myPrivateInfo'].fullName.fullName
        this.displayName = this.$store.getters['AUTH.myInfo'].displayName.displayName
        console.log('private info', this.$store.getters['AUTH.myPrivateInfo'])
        this.profileImageUrl = this.$store.getters['AUTH.myInfo'].profileImageUrl ? this.$store.getters['AUTH.myInfo'].profileImageUrl.profileImageUrl : ''
        // this.profileImageUrl = this.$store.getters['AUTH.myPrivateInfo'].profileImageUrl.profileImageUrl
      } else {
        setTimeout(() => {
          this.loadProfile()
        }, 500)
      }
    },
    getMorePhotos () {
      if (this.lastGeneratedFrom == 'random') {
        this.getRandomPhotos()
      } else if (this.lastGeneratedFrom == 'search') {
        this.getPhotosBy({
          target: {value: this.lastSearch}
        }, true)
      }
    },
    getRandomPhotos (clear) {
      this.gettingImages = true
      if (clear) {
        this.randomPhotos = []
      }
      console.log('getRandomPhotos')
      this.$store.dispatch('AUTH.getRandomPhotos', {}).then((res) => {
        let randomPhotos = this.randomPhotos
        console.log('a', randomPhotos, res)
        randomPhotos = randomPhotos.concat(res.response || [])
        console.log('b', randomPhotos)
        this.randomPhotos = randomPhotos
        this.lastSearch = ''
        this.lastGeneratedFrom = 'random'
        this.gettingImages = false
        this.lastGeneratedFromSearchPage = 0

        let galleryBox = document.getElementById('banner-photos-gallery')
        if (galleryBox) {
          console.log('galleryBox', galleryBox)
          setTimeout(() => {
            galleryBox.scrollTo({
              top: 999999999,
              behavior: 'smooth',
            })
          }, 15)
        }

      })
    },
    getPhotosBy (event, dontClear) {
      let query = event.target.value

      if (query == '') {
        this.getRandomPhotos()
        return
      }

      let timeout = dontClear ? 0 : 500
      clearInterval(this.getPhotosTimer)
      this.getPhotosTimer = setTimeout(() => {
        if (!dontClear) {
          this.randomPhotos = []
        }
        this.lastSearch = query
        this.gettingImages = true
        this.lastGeneratedFrom = 'search'
        this.lastGeneratedFromSearchPage = dontClear ? this.lastGeneratedFromSearchPage + 1 : 1
        this.$store.dispatch('AUTH.getPhotosBy', {query, page: this.lastGeneratedFromSearchPage}).then((res) => {
          let randomPhotos = this.randomPhotos
          console.log('getPhotosBy response', res)
          if (dontClear) {
            randomPhotos = randomPhotos.concat(res.response.results || [])
          } else {
            randomPhotos = res.response.results
          }
          this.randomPhotos = randomPhotos
          this.gettingImages = false

          let galleryBox = document.getElementById('banner-photos-gallery')
          if (galleryBox) {
            console.log('galleryBox', galleryBox)
            setTimeout(() => {
              galleryBox.scrollTo({
                top: 999999999,
                behavior: 'smooth',
              })
            }, 15)
          }
        })
      }, timeout)

    }
  },
  computed: {
  },
  watch: {
    'brandColor': {
      handler: function (params) {
        this.tempBrandColor = ''

      },
      // deep: true,
      immediate: true
    },
    'useCustomBrandColor': {
      handler: function (params) {
        this.tempSetAsCustom = ''

      },
      // deep: true,
      immediate: true
    },
  },
  created () {
    this.loadProfile()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/_colors.scss";
.product-wrapper {
  padding: 24px;
  gap: 32px;
}
.max-width-box {
  max-width: 1000px;

  h4 {
    color: #615E5C;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
}
.g_ {
  gap: 16px;
}
.whole-page-box-global{
  padding: 24px;
}
.banner-source-selector {
  border-radius: 24px;
  background: #F9F8F7;
  height: 40px;
  &-tab {
    height: 36px;
    display: flex;
    align-items: center;
    border-radius: 24px;
    padding-left: 24px;
    padding-right: 24px;
    cursor: pointer;
    p {
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      color: #000;
      margin-left: 8px;
    }
  }
  &-tab-selected {
    background: rgba(68, 214, 0, 0.20);
  }
}
.search-wrapper {
  position: relative;
  input {
    display: flex;
    flex: 1;
    max-width: 317px;
    height: 40px;
    padding: 0px 16px 0 40px;
    margin-bottom: 0;
    color: #615E5C;
    text-overflow: ellipsis;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
  }

  & > img {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
  }
}
.random-photos-gallery {
  max-height: 300px;
  overflow-y: auto;
  gap: 10px;

  &-image {
    width: 93px;
    height: 93px;
    object-fit: cover;
    object-position: center;
    border-radius: 6px;
    border: 1px solid #BBB;
    cursor: pointer;
  }
}
.load-more-button {
  width: unset !important;
  height: 36px;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 40px;
  background: transparent;
  border: 1px solid #44D600;
  color: #44D600;
  text-align: center;
  font-size: 14px;
  line-height: 1em;
  font-style: normal;
  font-weight: 600;
  box-shadow: none !important;
  margin-top: 16px;
}
.mt_ {
  margin-top: 16px;
}
.type-heading {
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  align-items: center;
  gap: 4px;

  img {
    transform: translateY(-1px);
  }
}
.color-swatch {
  margin-top: 8px;
  flex-wrap: wrap;
  gap: 4px;
}
.color-option {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  cursor: pointer;

  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    top: -4px;
    left: -4px;
    border-radius: 8px;
    border: 2px solid grey;
    transition: border-color 0.2s ease;
  }

  &-image {
    background-image: url(../../static/brand-icons/color-picker.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    position: relative;

    &-outer {
      position: relative;
    }

    &-picker {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      margin-bottom: 0;
      z-index: 1;
      max-height: 40px;
      opacity: 0;
      cursor: pointer;
    }
  }
}
.custom-button {
  width: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 40px;
  background: #ddd;
  height: 36px;
  color: #FFF;
  text-align: center;
  font-size: 14px;
  line-height: 1em;
  font-style: normal;
  font-weight: 600;
  box-shadow: none;
  margin-top: 8px;
}
.g__ {
  gap: 64px;
}

@media (max-width: 900px) {
  .g__ {
    flex-direction: column;
    gap: 20px;
  }
}
.cropper {
  width: 100%;
  /*max-width: 800px;*/
  height: 80%;
  /*max-height: 400px;*/
  gap: 30px;
  padding-top: 60px;
  padding-bottom: 60px;

  &-wrapper {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #00000044;
    z-index: 3333;
  }
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  /*width: 50px;*/
  /*height: 28px;*/
  width: 38px;
  height: 22px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  /*height: 20px;*/
  /*width: 20px;*/
  height: 14px;
  width: 14px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input.switch-input:checked + .slider {
  background-color: $color-primary;
}

input.switch-input:focus + .slider {
  box-shadow: 0 0 1px $color-primary;
}

input.switch-input:checked + .slider:before {
  /*-webkit-transform: translateX(22px);*/
  /*-ms-transform: translateX(22px);*/
  /*transform: translateX(22px);*/
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.ml_ {
  margin-left: 12px;
}

.ml__ {
  margin-left: 4px;
  transform: translateY(-1px);
}

.bgcg {
  background-color: $color-primary;
  margin-top: 0;
}

.wsnw {
  white-space: nowrap;
}

.g___ {
  gap: 20px;
}
/*.cropper {
  background-color: #000;
}*/
.cropper-image {
  background-color: #000;
  height: 100%;
  width: 100%;
  object-fit: contain;
  object-position: center;
}

.__m {
  margin-left: 10px;
  font-size: 14px;
}

.__m, .__r {
  display: none;
}

.___rr {
  display: none;
}

.search-wrapper {
  /*display: flex;   */
}
@media (max-width: 800px) {
}
@media (max-width: 800px) {
  ._r {
    /*align-items: flex-start;*/

    .search-wrapper {
      display: none;
      /*margin-top: 15px;*/
      /*margin-bottom: 10px;*/
    }
  }
  .__m, .__r {
    display: block;
  }

  .__rr {
    display: none;    
  }
  .___rr {
    display: flex;
  }
}
.click {
  cursor: pointer;
}
.highlight-click {
  color: $color-primary;
  cursor: pointer;
}

.visible-input {
  display: flex !important;
}

@media (max-width: 520px) {
  ._r2 {
    flex-direction: column;
    align-items: flex-start;

    .__m {
      margin-top: 10px;
    }
  }
}

</style>
