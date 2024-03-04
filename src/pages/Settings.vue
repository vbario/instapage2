<template>
  <div class="product-wrapper df fdc aic f1 w100p">

    <div class="top-bar-global posrel w100p df jcfs aic">
      <img v-if="$route.query.back" @click="goTo('/' + $route.query.back)" class="go-back-to-my-products curp" src="../../static/images/back.svg" >
      <h2 class="text-dark">Settings</h2>
    </div>

    <!-- <div v-if="$store.getters['AUTH.email']" class="text-dark your-email aic your-email-2">
      <p>{{$store.getters['AUTH.email']}}</p>
    </div> -->

    <div class="whole-page-box-global w100p df fdc">


      <div class="digital-download-details df jcsb aifs f1">
        
        <div class="df fdc product-second">
          <div v-if="profileImageUrl" class="dropzone-wrapper image-dropzone-wrapper posrel df fdc aic jcc">
            <img class="image-uploaded" :src="profileImageUrl">
            <a class="w100p tac image-uploaded-under text-dark" @click="removeProductImage()">Change Image</a>
          </div>
          <div v-else class="dropzone-wrapper image-dropzone-wrapper posrel">
            <vue-dropzone ref="myVueDropzone" 
                    id="dropzone-a"
                    class="image-upload"
                    @vdropzone-file-added="uploadedProductImage"
                    :options="dropzoneOptions">
            </vue-dropzone>
            <div class="dropzone-overlay df fdc">
              <p class="text-dark">Drag Profile Image Here</p>
              <p class="text-dark">or</p>
              <a class="button-b df aic jcc">Upload File</a>
            </div>
          </div>
        </div>
        <div class="product-basics f1 df fdc">
          <div class="username-wrapper mb20">
            <div v-if="!changingUsername" class="w100p df fdc">
              <h3 class="my-username">@{{displayName}}</h3>
              <a class="text-dark edit-username" @click="startChangeUsername()">change your username</a>
            </div>
            <div v-else class="product-detail f1 df fdc">
              <h3>Choose a new username</h3>
              <div class="w100p df jcsb posrel">
                <div class="w100p df fdc">
                  <input v-model="displayName" @input="setCheckInterval()" type="text" name="" class="mt5 mb0" placeholder="Your Username">
                  <p v-if="notAvailableMessage" class="username-not-available">This username is unavailable. Try again!</p>
                </div>
                <span class="checking" v-if="checkingUsername">
                  <img class="spinner-1" src="../../static/images/pushable/loader-black.png">
                </span>
                <span class="checking" v-if="newUsernameIsAvailable">
                  <img class="check-ok" src="../../static/images/pushable/check.svg">
                </span>
              </div>
              <div class="w100p df g20 mt20">
                <button v-if="saving" class="button-1 f1 mw200" :class="{'disabled-save' : checkingUsername || notAvailableMessage}">
                  <img class="spinner-1" src="../../static/images/pushable/loader-black.png"></button>
                <button v-if="!saving" class="button-1 f1 mw200" :class="{'disabled-save' : checkingUsername || notAvailableMessage}" @click="saveProfile(true)">
                Save</button>
                <button class="button-0 button-0-alt f1 mw200" @click="endChangeUsername(true)">Cancel</button>
              </div>
            </div>
          </div>
          <!-- <div class="df w100p jcsb product-detail-outer">
            <div class="product-detail f1">
              <h4>Full Name</h4>
              <input placeholder="Your Full Name" v-model="fullName" type="" name="">
            </div>
          </div> -->



          <div class="product-detail f1 df fdc my-image-responsive">
            <div v-if="profileImageUrl" class="dropzone-wrapper image-dropzone-wrapper posrel df fdc aic jcc">
              <img class="image-uploaded" :src="profileImageUrl">
              <a class="w100p tac image-uploaded-under text-dark" @click="removeProductImage()">Remove Image</a>
            </div>
            <div v-else class="dropzone-wrapper image-dropzone-wrapper posrel">
              <vue-dropzone ref="myVueDropzone" 
                      id="dropzone-a"
                      class="image-upload"
                      @vdropzone-file-added="uploadedProductImage"
                      :options="dropzoneOptions">
              </vue-dropzone>
              <div class="dropzone-overlay df fdc">
                <p class="text-dark">Drag Profile Image Here</p>
                <p class="text-dark">or</p>
                <a class="button-b df aic jcc">Upload File</a>
              </div>
            </div>
          </div>

          <div class="df">
            <h3 class="text-dark">{{$store.getters['AUTH.email']}}</h3>
            <!-- <a class="text-dark ml10 fz14" @click="logout()">Logout</a> -->
          </div>


          <a v-if="!changingPassword" class="mw200 change-your-password" @click="startChangePassword()">
            Change your password
          </a>
          <div v-if="changingPassword" class="df w100p product-detail-outer">
            <div class="product-detail f1">
              <h3>Current Password</h3>
              <input class="input" placeholder="Password" v-model="currentPassword" type="password" name="">
            </div>
            <div class="product-detail f1">
              <!-- <h4>Confirm Password</h4> -->
              <!-- <input placeholder="Password" v-model="newPasswordConfirm" type="" name=""> -->
            </div>
          </div>
          <div v-if="changingPassword" class="df w100p product-detail-outer">
            <div class="product-detail f1">
              <h3>New Password</h3>
              <input class="input" placeholder="Password" v-model="newPassword" type="password" name="">
            </div>
            <div class="product-detail f1">
              <h3>Confirm Password</h3>
              <input class="input" placeholder="Password" v-model="newPasswordConfirm" type="password" name="">
            </div>
          </div>
          <div v-if="changingPassword" class="w100p df g20">
            <button class="button-1 f1 mw200" @click="setNewPassword()">Set New Password</button>
            <button class="button-0 button-0-alt f1 mw200" @click="endChangePassword()">Cancel</button>
          </div>

          <!-- <div class="product-detail df"> -->
            <!-- <div class="f1"></div> -->
            <!-- <button class="just-save reset-button" @click="saveProfile()">Reset</button> -->
            <!-- <button @click="deactivateProduct()" v-else>De-Activate</button> -->
          <!-- </div> -->

          <hr class="separator"/>

          <h3 v-if="!($store.getters['AUTH.myConnectId'] && $store.getters['AUTH.myConnectId'].verified)" class="w100p _m">Connect a Bank Account</h3>
          <div v-if="!($store.getters['AUTH.myConnectId'] && $store.getters['AUTH.myConnectId'].verified)" class="whole-page-box-global-2 w100p df jcfs">
          <div class="title-box df">
            <h3 class="text-dark title-right _m">Start receiving payments</h3>
            <h4 class="button-1 new-product-button" @click="startOnboarding()">
                Start
            </h4>
          </div>
        </div>
        <div v-else-if="$store.getters['AUTH.myConnectId'] && !$store.getters['AUTH.myConnectId'].verified" class="whole-page-box-global-2 w100p mb20 df jcfs">
          <div class="title-box df">
            <h3 class="text-dark title-right">Complete onboarding to receive payments</h3>
            <h4 class="button-1 new-product-button" @click="startOnboarding()">
                Continue
            </h4>
          </div>
        </div>

          <!-- <h3>Your Subscription</h3>
          <div class="df w100p product-detail-outer">
            <div class="product-detail f1">
              <h4>Plan</h4>
              <div class="placeholder-detail"></div>
            </div>
            <div class="product-detail f1">
              <h4>Payment Details</h4>
              <div class="placeholder-detail"></div>
            </div>
          </div> -->
          
          <!-- <p class="text-dark fz14" v-if="!showingMore" @click="showMore()">More +</p>
          <div class="df w100p product-detail-outer" v-if="showingMore">
            <div class="logout df mt30 g20">
              <p class="curp text-dark fz14" @click="cancelSubscription()">close my account</p>
              <p class="curp text-dark fz14" @click="showLess()">cancel</p>
            </div>
          </div> -->
        <!-- <p v-if="this.productType == 'digital-download'" class="reference">The customer will be asked to provide their e-mail address.</p>
          <p v-else-if="this.productType == 'digital-service'" class="reference">The customer will be asked to provide their e-mail address and upload reference files.</p>
          <p v-else-if="this.productType == 'calendar-event'" class="reference">The customer will be asked to select a time to book an appointment.</p>
          <div class="product-detail df" v-if="this.productType == 'digital-download'">
            <div class="check-fulfillment">
              <input v-model="addFile" type="checkbox" class="check-fulfillment-box" name="">
            </div>
            <div class="check-detail f1">
              <h4>Send File</h4>
              <p class="sub-line">Files will be sent automatically after purchase</p>
              <div v-if="productDeliveryFile" class="product-delivery-file dropzone-wrapper posrel">
                <div class="df fdc aic jcc">
                  <img class="file-icon" src="../../static/images/file-icon.png">
                  <p class="file-text">
                    {{productDeliveryFile.name}}
                  </p>
                  <a class="file-remove-text" @click="removeProductDeliveryFile()">Remove File</a>
                </div>
              </div>
              <div v-else class="dropzone-wrapper posrel">
                <vue-dropzone ref="myVueDropzone" 
                        id="dropzone"
                        class="file-upload"
                        @vdropzone-file-added="uploadedProductDeliveryFile"
                        :options="dropzoneOptions2">
                </vue-dropzone>
                <div class="dropzone-overlay df fdc">
                  <p>Drag File Here</p>
                  <p>or</p>
                  <a class="button-b df aic jcc">Upload File</a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="productType == 'calendar-event'" class="product-detail df">
            <div class="check-detail f1">
              <h4>My Availability</h4>
              <p class="sub-line">When would you like to take this appointment?</p>
              <div class="my-availability df fdc">
                <div class="one-day df jcsb w100p aic" v-for="(day, i) in [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ]">
                  <p class="f1">{{day}}</p>
                  <p>From</p>
                  <select v-model="calendarFrom[i]" class="r0 r1">
                    <option>12 am</option>
                    <option>1 am</option>
                    <option>2 am</option>
                    <option>3 am</option>
                    <option>4 am</option>
                    <option>5 am</option>
                    <option>6 am</option>
                    <option>7 am</option>
                    <option>8 am</option>
                    <option>9 am</option>
                    <option>10 am</option>
                    <option>11 am</option>
                    <option>12 pm</option>
                    <option>1 pm</option>
                    <option>2 pm</option>
                    <option>3 pm</option>
                    <option>4 pm</option>
                    <option>5 pm</option>
                    <option>6 pm</option>
                    <option>7 pm</option>
                    <option>8 pm</option>
                    <option>9 pm</option>
                    <option>10 pm</option>
                    <option>11 pm</option>
                  </select>
                  <p>to</p>
                  <select v-model="calendarTo[0]" class="r1">
                    <option>12 am</option>
                    <option>1 am</option>
                    <option>2 am</option>
                    <option>3 am</option>
                    <option>4 am</option>
                    <option>5 am</option>
                    <option>6 am</option>
                    <option>7 am</option>
                    <option>8 am</option>
                    <option>9 am</option>
                    <option>10 am</option>
                    <option>11 am</option>
                    <option>12 pm</option>
                    <option>1 pm</option>
                    <option>2 pm</option>
                    <option>3 pm</option>
                    <option>4 pm</option>
                    <option>5 pm</option>
                    <option>6 pm</option>
                    <option>7 pm</option>
                    <option>8 pm</option>
                    <option>9 pm</option>
                    <option>10 pm</option>
                    <option>11 pm</option>
                  </select>

                </div>
              </div>
            </div>
          </div>
          <div v-if="productType == 'calendar-event'" class="product-detail df">
            <div class="check-detail max-detail f2">
              <h4>Timezone</h4>
              <select v-model="myTimezone" class="">
                <option v-for="(item, i) in allTimezones">
                  {{item.label}}
                </option>
              </select>
            </div>
            <div class="check-detail f1">
              <h4>Appointment Length</h4>
                  <select v-model="appointmentLength" class="">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>half day</option>
                    <option>full day</option>
                  </select>
            </div>
          </div>
          <div class="product-detail df">
            <div class="check-fulfillment">
              <input v-model="addURL" type="checkbox" class="check-fulfillment-box" name="">
            </div>
            <div class="check-detail f1">
              <h4>Redirect to url</h4>
              <p class="sub-line">The customer will be redirected to the URL after purchase</p>
              <input placeholder="http://" v-model="redirectURL" class="mw2" type="" name="">
            </div>
          </div> -->
        </div>
      </div>
    </div>
    
    <div class="spacer"></div>

  </div>
</template>

<script>

import router from '@/router'
import common from '@/util/common'
import products from '@/util/products'
import LandingProduct from '@/components/LandingProduct'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'Settings',
  data () {
    return {
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
      saving: false
    }
  },
  props: ['feel'],
  components: {
    LandingProduct,
    vueDropzone: vue2Dropzone
  },
  methods: {
    showMore () {
      this.showingMore = true
    },
    showLess () {
      this.showingMore = false
    },
    // startOnboarding () {
    //   this.$store.dispatch('AUTH.startOnboarding', {}).then(async (res) => {
    //     console.log('startOnboarding', res)
    //     if (res.url) {
    //       window.location = res.url
    //     }
    //   })  
    // },
    startOnboarding () {
      this.$store.dispatch('AUTH.setOnboardingPopup', {open: true})
    },
    endChangeUsername () {
      this.changingUsername = false
    },
    startChangeUsername () {
      this.changingUsername = true
    },
    endChangePassword () {
      this.changingPassword = false
    },
    startChangePassword () {
      this.changingPassword = true
    },
    setCheckInterval () {
      this.checkingUsername = true
      this.newUsernameIsAvailable = false
      this.notAvailableMessage = false
      clearInterval(this.typingTimer)
      this.typingTimer = setTimeout(() => {
        this.checkUsername()
      }, 700)
    },
    checkUsername () {
      this.$store.dispatch('AUTH.checkUsername', {username: this.displayName}).then((res) => {
        if (res.data.usernameIsAvailable) {
          this.newUsernameIsAvailable = true
        } else {
          this.newUsernameIsAvailable = false
          this.notAvailableMessage = true
        }
        this.checkingUsername = false
      })
    },
    cancelSubscription () {
      let go = confirm('Are you sure you want to cancel your subscription?')
      if (go) {
        this.$store.dispatch('AUTH.cancelSubscription', {})
      }
    },
    goTo (route) {
      router.push(route)
    },
    startEnablePayouts () {
      console.log('enable payouts')
      // this.$store.dispatch('AUTH.startEnablePayouts', {})
    },
    logout () {
      this.$store.dispatch('AUTH.logout', {})
    },
    changePrice (e) {
      let price = e.target.value
      console.log('price', price)
      this.price = price * 100
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
      if (this.notAvailableMessage || this.checkingUsername) {
        return false
      }
      let productObject = {
        profileImageUrl: this.profileImageUrl,
        // fullName: this.fullName,
        displayName: this.displayName,
        newPassword: this.newPassword,
        newPasswordConfirm: this.newPasswordConfirm,
      }

      this.saving = true

      console.log('productObject', productObject)

      this.$store.dispatch('AUTH.saveProfile', productObject).then((res) => {
        this.saving = false
        let product = res
        console.log('after saveProfile', res)
        this.changingUsername = false
      })
    },
    setNewPassword () {
      this.$store.dispatch('AUTH.setNewPassword', {p: this.currentPassword, p2: this.newPassword}).then((res) => {
        console.log('password changed')
        if (res == 'ok') {
          this.currentPassword = ''          
          this.newPassword = ''          
          this.newPasswordConfirm = ''          
          this.changingPassword = false
        }
      })
    },
    removeProductImage () {
      this.profileImageUrl = ''
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
    }
  },
  computed: {
  },
  watch: {
  // '$route.params': {
  //     handler: function (params) {
  //       let id = params.id
  //        if (id) {
  //         this.getProductData()
  //        } else {
  //         this.loadDefaultProduct()
  //        }
  //     },
  //     // deep: true,
  //     immediate: true
  //   }
  },
  created () {
    this.loadProfile()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  ._position1 {
    margin-top: 8px;
  }

  h1 {
    text-transform: capitalize;
  }

  h2 {
    /*font-size: 24px;*/
    /*font-weight: 500;*/
    /*font-family: 'Rubik', 'sans-serif';*/
    /*letter-spacing: .04em !important;*/
    color: #2b2b2b;
  }

  h3 {
    margin-bottom: 18px;
    text-align: left;
    color: $color-primary;
  }
  h4 {
    font-family: Kollektif;
  }

  hr {
    margin-bottom: 45px;
  }

  .product-wrapper {
    padding: 19px;
    padding-top: 0;
    background-color: $light-grey;
  }
  .product-splash, .product-choose-your-feel {
    width: 100%;
    height: 566px;
    margin-bottom: 120px;
  }
  .product-products {
    flex-wrap: wrap;
  }
  .product-product-image {
    width: 515px;
    min-width: 515px;
    height: 566px;
  }
  .top-bar-global {
    height: 68px;
  }
  .whole-page-box-global {
  }
  $image-upload-size: 200px;
  .image-upload {
    border-radius: 6px;
    /*padding: 12px;*/
    font-size: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: $image-upload-size;
    height: $image-upload-size;
    object-fit: cover;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    background-color: #fff;
    z-index: 2;
    /*border: 4px solid #fff;*/
    border: 4px dashed rgba(50, 50, 93, 0.12);

    &:hover {
      & + .dropzone-overlay {
        /*background-color: #fdfdfd;*/
        
        a {
          /*background-color: #5469d4;*/
          /*color: $color-white;*/
        }
      }
    }

    & > * {
      margin: 0 !important;
    }
  }
  .image-uploaded {
    width: $image-upload-size;
    height: $image-upload-size;
    object-fit: cover;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    background-color: #eaeaea;
    z-index: 2;
    border: 4px solid #fff;
  }
  .image-uploaded-under {
    margin-top: 6px;
    font-size: 12px;
  }
  .file-upload {
    width: 100%;
    /*max-width: 500px;*/
    height: 150px;
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
      .button-b {
        background-color: #fdfdfd;
      }
      & + .dropzone-overlay {
        border: 1px dashed rgba(50, 50, 93, 0.12);
        
        a {
          background-color: #5469d4;
          color: $color-white;
        }
      }
    }
  }
  .product-delivery-file {
    & > div {
      border: 1px solid rgba(50, 50, 93, 0.1);
      border-radius: 6px;
      width: 100%;
      height: 150px;
    }
  }
  .dropzone-overlay {
    border-radius: 10px;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    max-width: 200px;
    /* background-color: #aaa; */
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #fbfbfb;
    border: 1px dashed rgba(50, 50, 93, 0.12); */

    p, {
      font-size: 14px;
      margin-bottom: 6px;
    }

  }
  .product-basics {
    /*height: 200px;*/
    min-height: 200px;
  }
  textarea {
    border-radius: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    height: 44px;
    font-size: 16px;
    width: 100% !important;
    background: white;
    margin-bottom: 6px;
  }
  .digital-download-details {
    height: 100%;
  }
  .product-detail {
    margin-bottom: 20px;
    max-width: 500px;

    &:last-child {
      margin-right: 0 !important;
    }
  }
  .product-detail-outer {
    max-width: 500px;

    & > .product-detail {
      /*flex: 1;*/
      &:first-child {
        /*flex: 2;*/
        margin-right: 20px;
      }
    }
  }
  $placeholderColor: #898989;
  input, textarea, select {
    max-width: 540px;
    border-color: #efefef !important;
    background-color: #fff;
    font-size: 14px;
    padding: 12px 10px;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: 'Rubik', 'sans-serif';
    color: rgb(43, 43, 43);


    ::-webkit-input-placeholder { /* Edge */
      color: $placeholderColor;
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: $placeholderColor;
    }

    ::placeholder {
      color: $placeholderColor;
    }
  }
  .sub-line {
    margin-bottom: 8px;
  }
  .check-fulfillment {
    margin-right: 20px;

    input {
      width: 20px;
    }
  }
  .check-fulfillment-box {
    display: flex;
    flex-direction: column;
    height: 20px;
    margin: 0;
  }
  .mw2 {
    /*max-width: 500px;*/
  }
  .mw3 {
    /*max-width: 500px;*/
  }
  .just-save {
    background-color: transparent;
    box-shadow: none;
    color: #2b2b2b;
  }
  .button-b {
    border: 1px solid $color-primary;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: $color-primary;
    padding: 2px 6px;
    height: 30px;

    &:hover {
      border: 1px solid transparent;
      background-color: $color-primary;
      color: $color-white;
    }
  }
  .image-dropzone-wrapper {
    margin-right: 20px;
  }
  .file-icon {
    opacity: 0.5;
    height: 35px;
    margin-bottom: 10px;
  }
  .file-text {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .file-remove-text {
    font-size: 10px;
    text-decoration: underline;
  }
  .r0 {
    margin-right: 10px;
  }
  .r1 {
    margin-left: 10px;
  }
  .one-day {
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .max-detail {
    /*max-width: 350px;*/
    select {
      max-width: 300px;
    }
  }
  .reference {
    margin-top: 4px;
    font-size: 12px;
    margin-bottom: 12px;
  }
  .previews {
    div {
      a {
        font-size: 14px;
        color: #444;
      }
    }
  }
  .your-email {
    margin-top: 15px;
    p {
      font-family: 'CA SaygonText', sans-serif;
      font-size: 16px;
      font-weight: 400;

      &:first-child {
        font-size: 12px;
      }
    }
  }
  .placeholder-detail {
    width:: 100%;
    height: 50px;
    background-color: #e0e0e088;
  }
  .logout {
    h4 {
      font-weight: 400;
      font-size: 12px;
      margin-top: 20px;
    }
  }

  .your-email-2 {
    display: none;
  }
  .my-image-responsive {
    display: none;
  }

  @media (max-width: 680px) {
    .my-image-responsive {
      display: flex;
    }
    .top-bar-override {
      height: unset;
    }
    .product-second {
      display: none;
    }
    .your-email-2 {
      display: flex;
      margin-top: 0;

      p {
        font-size: 14px !important;
        margin-top: 6px;
        margin-bottom: 2px;
      }
    }
    .image-dropzone-wrapper {
      /*align-items: flex-start;*/
      margin-right: 0;
    }
  }
  .reset-button {
    font-weight: 400;
    font-size: 14px;
  }
  .payouts-tag {
    font-size: 14px;
    margin-bottom: 20px;
  }
  .spacer {
    display: none;
    height: 110px;
  }

  @media (max-width: 1000px) {
    .spacer {
      display: block;
    }
  }
  .disabled-save {
    opacity: 0.5;
  }
  .checking {
    position: absolute;
    width: 20px;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .mb0 {
    margin-bottom: 0 !important;
  }
  .check-ok {
    width: 16px;
  }
  .spinner-1 {
    width: 16px;
    pointer-events: none;
    animation-name: spin;
    animation-duration: 5000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
  }

  @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
  }

  .username-not-available {
    font-size: 14px;
    color: $color-background-dark;
    margin-top: 5px;
  }
  .my-username {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 0;
  }
  .edit-username {
    font-size: 14px;
    /*margin-left: 10px;*/
    transform: translateY(5px);
  }
  .mw200 {
    max-width: 200px;
  }
  .fz14 {
    font-size: 14px;
  }
  .change-your-password {
    color: #bbb;
    font-size: 14px;
    cursor: pointer;
  }
  .input {
    font-family: Kollektif;
    color: #999;
  }
  ._m {
    margin-bottom: 0;
  }

  .username-wrapper {
    padding: 20px;
    background-color: #f6f6f6;
    border-radius: 14px;
  }
  .separator {
    height: 1px;
    width: 100%;
    border: none;
    background-color: #bbb;
    margin-top: 20px;
    margin-bottom: 20px;
  }

</style>
