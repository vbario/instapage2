<template>
  <div class="landing-wrapper df fdc aic f1 w100p" @click="closeEmailCollection()"
      v-bind:style="">

    <!-- BACKGROUND -->
    <!-- <div class="w100p profile-banner-background posrel" :style="'background-color: ' + (sellerData.selectedTheme === 0 ? '#fff' : '#000') + ';'">
    </div>
    <div class="full-background" 
      v-bind:style="
        'background-image: url(' + (sellerData.banner ? sellerData.banner.url : '') + '); filter: blur(' + (sellerData.backgroundImageBlur || 0) + 'px); opacity: ' + (1 - parseInt(sellerData.backgroundImageFade || 0)/100) + '; left: -' + (sellerData.backgroundImageBlur || 0) + 'px; top: -' + (sellerData.backgroundImageBlur || 0) + 'px; width: calc(100% + 2 * ' + (sellerData.backgroundImageBlur || 0) + 'px); height: calc(100% + 2 * ' + (sellerData.backgroundImageBlur || 0) + 'px);'">
    </div> -->

    <!-- CART -->
    <div v-if="$store.getters['AUTH.cart'].loaded && ($store.getters['AUTH.cart'].items.length > 0)"
      class="cart df jcc aic" @click="showCart(true)">
      <i class="fa-light fa-cart-arrow-down cart-icon"></i>
      <span class="cart-hover-effect"></span>
      <!-- <i class="fa-regular fa-cart-shopping"></i> -->
      <p>
        {{$store.getters['AUTH.cart'].items.length}}
      </p>
    </div>
    <div v-if="cartIsOpen" class="open-cart-wrapper" @click="showCart(false)">
      <div class="open-cart w100p" @click="stopProp($event)">
        <img @click="showCart(false)" class="go-back-to-my-products curp smaller-only" src="../../static/images/back.svg" >
        <i @click="showCart(false)" class="fa-solid fa-x x-close only-bigger"></i>
        <div class="item-options-bar w100p df jcsb aic">
          <p class="item-options-bar-title">Your Cart</p>
          <div class="cart-items w100p df fdc mt20">
            <div v-for="(item, i) in $store.getters['AUTH.cart'].items" class="cart-item w100p df jcsb mb20">
              <img class="cart-item-image" :src="item.productImage"/>
              <div class="df fdc f1">
                <p class="cart-item-title bold-title">{{item.title}}</p>
                <p v-if="(item.productType == 'physical-product') && item.sizes && (item.newItemSize || item.newItemSize === 0)" class="cart-item-price font-product-modifiers">
                  {{item.sizes[item.newItemSize].name}}
                </p>
                <p v-if="(item.productType == 'calendar-event')" class="cart-item-price font-product-modifiers">
                  {{item.newAppointment.selectedCalendarDay}} at {{item.newAppointment.appointmentTimeSelected}}
                </p>
                <p v-if="(item.productType == 'calendar-event')" class="cart-item-price font-product-modifiers">
                  {{item.newAppointment.times[item.newAppointment.selectedAppointmentTime]}} minutes
                </p>
                <div class="df aic g10">
                  <p v-if="item.productType == 'physical-product'" class="cart-item-price bold-price">${{parseFloat(item.sizes[item.newItemSize].price)}}</p>
                  <p v-else class="cart-item-price bold-price">{{item.price ? '$' + (item.price) : 'free'}}</p>
                  <!-- <p class="cart-item-price bold-price">{{item.newItemQuantity ? 'x' + item.newItemQuantity : ''}}</p> -->
                </div>
                <p v-if="(shippingByOwner[item.ownerId] == 'NA') && (item.productType == 'physical-product')" class="item-cannot-be-delivered">This item cannot be delivered to this address.</p>
              </div>
              <!-- <p>{{item.price ? '$' + item.price * (item.newItemQuantity || 1) : 'free'}}</p> -->
              <span class="cart-item-quantity-selector df aic">
                <span class="quantity-minus" @click="reduceQuantity(i)">
                  <i v-if="!item.newItemQuantity || (item.newItemQuantity == 1)" class="fa-solid fa-trash"></i>
                  <i v-else class="fa-solid fa-minus""></i>
                </span>
                <span class="quantity-amount">
                  <p>{{item.newItemQuantity || 1}}</p>
                </span>
                <span class="quantity-plus">
                  <i class="fa-solid fa-plus" @click="increaseQuantity(i)"></i>
                </span>
              </span>
              <br/>
            </div>
          </div>
        </div>
        <hr class="cart-hr"/>
        <CheckOutButton :setShippingByOwner="setShippingByOwner"/>
        <!-- <h4 class="button-1">
          Purchase
        </h4> -->
        <h4 @click="showCart(false)" class="button-1 disabled-button">
          Add items
        </h4>
        <div class="df w100p jcsb powered mt10">
          <p>Secured by Stripe</p>
          <p>Powered by Pushable</p>
        </div>
      </div>
    </div>

    <!-- ITEM OPTIONS -->
    <div v-if="openedItemOptions || (openedItemOptions === 0)" class="item-options-wrapper" @click="openItemOptions(false)">
      <div class="item-options w100p" @click="stopProp($event)">
        <img @click="openItemOptions(false)" class="go-back-to-my-products curp smaller-only" src="../../static/images/back.svg" >
        <i @click="openItemOptions(false)" class="fa-solid fa-x x-close only-bigger"></i>
        <div class="item-options-bar w100p df jcsb aic">
          <p class="item-options-bar-title">{{sellerData.items[openedItemOptions].title}}</p>
          <p class="item-options-bar-price">{{sellerData.items[openedItemOptions].price ? '$' + sellerData.items[openedItemOptions].price : 'free'}}</p>
        </div>
        <p class="mt10">{{sellerData.items[openedItemOptions].description}}</p>
        <img :src="sellerData.items[openedItemOptions].productImage" class="item-options-image mt10">

        <div class="item-options-specific mt20">
          <div v-if="sellerData.items[openedItemOptions].productType == 'digital-download'"
          class="item-options-download">
            <p class="text-muted">You will receive the download immediately.</p>
          </div>
          <div v-if="sellerData.items[openedItemOptions].productType == 'physical-product'"
          class="item-options-physical-product">
            <div v-if="sellerData.items[openedItemOptions].productType == 'physical-product'" class="quantity df jcsb aic">
              <!-- <p>
                {{(sellerData.items[openedItemOptions][newItemSize] || sellerData.items[openedItemOptions][newItemSize] === 0) ? sellerData.items[openedItemOptions].sizes[sellerData.items[openedItemOptions][newItemSize]].name : sellerData.items[openedItemOptions].sizes[newItemSize].name}}
              </p> -->
              <p>{{sellerData.items[openedItemOptions].sizes[newItemSize].name}} - ${{sellerData.items[openedItemOptions].sizes[newItemSize].price}}</p>
              <i class="fa-solid fa-chevron-down"></i>
              <select v-model="newItemSize" class="quantity-dropdown">
                <option v-for="(size, s) in sellerData.items[openedItemOptions].sizes" :value="s">{{size.name}} - ${{size.price}}</option>
              </select>
            </div>
            <div v-if="sellerData.items[openedItemOptions].productType == 'physical-product'" class="quantity df jcsb aic">
              <p>
                Qty: {{newItemQuantity || 1}}
              </p>
              <i class="fa-solid fa-chevron-down"></i>
              <select v-model="newItemQuantity" class="quantity-dropdown">
                <option :value="1">1</option>
                <option :value="2">2</option>
                <option :value="3">3</option>
                <option :value="4">4</option>
                <option :value="5">5</option>
                <option :value="6">6</option>
                <option :value="7">7</option>
                <option :value="8">8</option>
                <option :value="9">9</option>
                <option :value="10">10</option>
              </select>
            </div>
          </div>
          <div v-if="sellerData.items[openedItemOptions].productType == 'subscription-physical-product'"
          class="item-options-subscription-physical-product">
            <p>Physical Product subscription</p>
          </div>
          <div v-if="sellerData.items[openedItemOptions].productType == 'calendar-event'"
          class="item-options-calendar-event">
            <Scheduler
              :setNewAppointmentDate="setNewAppointmentDate"
              :readyToAdd="readyToAdd"
              :user="$route.params.user"
              :uniqueid="sellerData.items[openedItemOptions].productId" />
          </div>
          <div v-if="sellerData.items[openedItemOptions].productType == 'digital-service'"
          class="item-options-custom-service">

              <div class="w100p df fdc jcsb ta-wrap">
                <h4 class="text-dark mb10">Provide instructions</h4>
                <textarea @input="checkServiceValidation($event)" @change="checkServiceValidation($event)" v-model="instructions" placeholder="Instructions" class="w100p service-instructions"></textarea>
                <p v-if="instructions.length > minServiceDescriptionLength"
                  class="character-count"
                  :class="{
                  'service-request-too-long': instructions.length > maxServiceDescriptionLength  
                }">{{instructions.length}}/{{maxServiceDescriptionLength}}</p>
                <p v-else class="character-count">(Please enter at least {{minServiceDescriptionLength}} characters)</p>
                <h4 class="text-dark mt20 mb10">Upload a reference file</h4>
                <div v-if="productDeliveryFile" class="product-delivery-file dropzone-wrapper df aic posrel">
                  <div class="df aic jcc w100p">
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
                          :options="dropzoneOptions">
                  </vue-dropzone>
                  <div class="dropzone-overlay df aic">
                    <p>Drag File Here or</p>
                    <a class="button-b df aic jcc">Upload File</a>
                  </div>
                </div>
              </div>

          </div>
        </div>

        <span class="f1"></span>

        <div class="add-to-cart-inner-wrapper">
          <h4 class="button-1 mt20 add-to-cart-inner" :class="{
            'disabled-button': !readyToAddToCart
          }" @click=addToCart()>Add to Cart</h4>
        </div>
        <!-- <h4 class="button-2 mt10" @click="openItemOptions(false)">Back</h4> -->
      </div>
    </div>

    <!-- MAIN AREA -->
    <!-- <div class="w100p df fdc aic bottom-section" :class="{
      'theme-0': sellerData.selectedTheme === 0,
      'theme-1': sellerData.selectedTheme !== 0
    }"> -->
    <div class="w100p df fdc aic bottom-section theme-0" :class="">

      <!-- <BannerWithTag
        :displayName="sellerData.displayName"
        :profileImageUrl="sellerData.profileImageUrl"
        :banner="sellerData.banner"
      /> -->
      <BannerStyle2
        :displayName="sellerData.displayName"
        :profileImageUrl="sellerData.profileImageUrl"
        :banner="sellerData.banner"
      />

      <Links />

      <hr class="hr-x">

      <!-- GRID/LIST -->
      <div class="link-in-bio-grid-wrapper">
        <div class="link-in-bio-grid">

          <div v-for="(product, p) in sellerData.items"
          class=""
          :class="{
            'link-in-bio-grid-item-wrapper df fdc posrel': (product.type == 'buy') && !(product.productType == 'collect-email'),
            'link-in-bio-list-item df jcc aic fz20p posrel': (product.type !=='buy') || (product.productType == 'collect-email'),
            'text-block': product.type == 'text',
            'link-in-bio-list-item-expanded': expandedListItems.indexOf(p) > -1,
          }"
            @click="((product.type == 'buy') && !(product.productType == 'collect-email')) ? openItemOptions(p) : ((product.type =='link') ? goToLink(product.url, true, product.key) : null)">

            <!-- Collecting email -->
            <div v-if="collectEmail == product.productId" @click="stopProp($event)" class="list-collect-email w100p df jcsb aic">
              <input placeholder="Your email" class="your-email" v-model="yourEmail"/>
              <button v-if="submittingEmail" class="submit-email">
                <img class="spinner-x" src="../../static/images/pushable/loader-black-3.png">
              </button>
              <button v-else class="submit-email" @click="submitEmail()">Submit</button>
            </div>
            <div class="w100p df aic" v-if="((product.type !== 'buy') && (product.type !== 'buy')) || ((product.productType == 'collect-email') && (collectEmail !== product.productId))">

              <img class="list-item-image" v-if="product.productImage || product.image" :src="product.productImage || product.image">
              <i class="fa-solid fa-box list-item-icon" v-else-if="product.productType == 'physical-product'"></i>
              <i class="fa-solid fa-download list-item-icon" v-else-if="product.productType == 'digital-download'"></i>
              <i class="fa-solid fa-bell-concierge list-item-icon" v-else-if="product.productType == 'digital-service'"></i>
              <i class="fa-solid fa-calendar-days list-item-icon" v-else-if="product.productType == 'calendar-event'"></i>
              <i class="fa-solid fa-link-simple list-item-icon" v-else-if="product.type == 'link'"></i>

              <p :class="{
                'color-white': product.type == 'text',
                'collect-email-title': product.productType == 'collect-email',
              }" v-if="collectEmail !== product.productId">{{product.title || product.text}}</p>

              <h4 v-if="(collectEmail !== product.productId) && (product.type == 'buy') && (product.productType == 'collect-email')" class="list-item-button button-1 button-smaller" @click="startCollectEmail($event, product.productId)">{{product.callToAction || 'Join'}}</h4>
            </div>

            <!-- Grid items -->
            <div
                class="w100p h100p df fdc jcc aic curp"
                v-else-if="(collectEmail !== product.productId) && (product.type == 'buy')">
              <div if="product.productImage" class="w100p link-in-bio-grid-item" v-bind:style="backgroundStyle(product.productImage)">
              </div>
              <div class="link-in-bio-grid-item-text w100p df fdc f1" v-if="collectEmail !== product.productId">
                <p :style="product.type == 'buy' ? '' : ''" class="text-dark fw500 link-in-bio-grid-item-title">
                  {{product.title}}
                </p>
                <p :style="product.type == 'buy' ? '' : ''" class="product-price text-dark fw400 card-price">
                  {{product.price ? '$' + product.price : 'free'}}
                </p>
                <!-- <p :style="product.type == 'buy' ? '' : ''" class="product-price text-dark fw400 mt10">
                  {{product.description}}
                </p> -->
                <!-- <h4 class="button-0 button-smaller" @click="cardClick(product.productId)">{{product.callToAction || 'See Item'}}</h4> -->

                <!-- <div v-if="product.productType == 'physical-product'" class="quantity df jcsb aic">
                  <p>
                    {{(sizes[p] || sizes[p] === 0) ? product.sizes[sizes[p]].name : product.sizes[0].name}}
                  </p>
                  <i class="fa-solid fa-chevron-down"></i>
                  <select v-model="sizes[p]" class="quantity-dropdown">
                    <option v-for="(size, s) in product.sizes" :value="s">{{size.name}}</option>
                  </select>
                </div>
                <div v-if="product.productType == 'physical-product'" class="quantity df jcsb aic">
                  <p>
                    Qty: {{quantities[p] || 1}}
                  </p>
                  <i class="fa-solid fa-chevron-down"></i>
                  <select v-model="quantities[p]" class="quantity-dropdown">
                    <option :value="1">1</option>
                    <option :value="2">2</option>
                    <option :value="3">3</option>
                    <option :value="4">4</option>
                    <option :value="5">5</option>
                    <option :value="6">6</option>
                    <option :value="7">7</option>
                    <option :value="8">8</option>
                    <option :value="9">9</option>
                    <option :value="10">10</option>
                  </select>
                </div> -->

                <!-- <div v-if="product.productType == 'subscription-physical-product'" class=" df jcsb aic">
                  <p>Test</p>
                </div> -->
                <!-- <div v-if="product.productType == 'subscription-physical-product'" class="quantity df jcsb aic _o0">
                </div>
                <div v-if="product.productType == 'subscription-physical-product'" class="quantity df jcsb aic _o0">
                </div> -->

                <!-- <h4 v-if="(product.type == 'buy') && (product.productType !== 'collect-email')"
                  class="button-1 button-smaller action-button"
                  @click="cardClick(product.productId)">
                    {{product.productType == 'subscription-physical-product' ? 'Choose Subscription' : (product.callToAction || 'Add To Cart')}}
                </h4> -->
                <!-- <span class="buy-button"></span> -->
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <div class="df aic curp mt30 pushable-branding">
      <img class="header-logo" @click="goTo('/')" src="../../static/images/pushable/pushable-logo-5.png"/>
      <h1 class="logo-font text-primary-color" @click="goTo('/')">pushable</h1>
    </div>

    <!-- LOADING VISUAL -->
    <div v-if="loading" class="loading-splash df fdc jcc aic">
      <img class="spinner-1 mb-spinner o-spinner" src="../../static/images/pushable/loader-black-3.png">
      <p>Loading</p>
    </div>


  </div>
</template>

<script>

import router from '@/router'
import paths from '@/util/paths'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import LandingProduct from '@/components/LandingProduct'
import Scheduler from '@/components/item-type-checkout/Scheduler'
import CheckOutButton from '@/components/cart/CheckOutButton'
import BannerWithTag from '@/components/store/BannerWithTag'
import BannerStyle2 from '@/components/store/BannerStyle2'
import Links from '@/components/store/Links'

export default {
  name: 'LinkInBioDisplay',
  data () {
    return {
      newAppointment: {},
      minServiceDescriptionLength: 10,
      maxServiceDescriptionLength: 2000,
      shippingByOwner: {},
      newItemSize: 0,
      newItemQuantity: 1,
      cartIsOpen: false,
      sellerUid: false,
      readyToAddToCart: false,
      openedItemOptions: false,
      sizes: {},
      quantities: {},
      expandedListItems: [],
      submittingEmail: false,
      yourEmail: '',
      collectEmail: false,
      rootDomain: process.env.NODE_ENV == '' ? paths.devPath : paths.productionShortPath,
      balance: {},
      loading: true,
      income: [],
      displayStyle: 'list',
      boxesAcross: 3,
      boxHeight: 250,
      sellerData: {
        loaded: false
      },
      instructions: '',
      productDeliveryFile: '',
      dropzoneOptions: {
          autoProcessQueue: false,
          url: 'https://',
          thumbnailWidth: 150,
          maxFilesize: 10,
          // headers: { "My-Awesome-Header": "header value" },
          // dictDefaultMessage: 'Check',
          // previewTemplate: document.querySelector('#template-container').innerHTML
          dictDefaultMessage: ``
      },
    }
  },
  props: ['mode'],
  components: {
    vueDropzone: vue2Dropzone,
    LandingProduct,
    Scheduler,
    CheckOutButton,
    BannerWithTag,
    BannerStyle2,
    Links
  },
  methods: {
    checkServiceValidation (event) {
      let newValue = event.target.value
      if (newValue) {
        if (newValue.length > this.minServiceDescriptionLength) {
          this.readyToAdd(true)
        } else {
          this.readyToAdd(false)
        }
      } else {
        this.readyToAdd(false)
      }
    },
    removeProductDeliveryFile () {
      this.productDeliveryFile = ''
    },
    uploadedProductDeliveryFile (file) {
      let productId = this.sellerData.items[this.openedItemOptions].productId || 'f'
      let item = {
        productId,
        file
      }
      this.$store.dispatch('AUTH.uploadClientOrderFile', item).then((res) => {
        console.log('file uploaded', res)
        this.productDeliveryFile = res
      })
    },
    reduceQuantity (i) {
      this.$store.dispatch('AUTH.reduceCartItemQuantity', {i})
    },
    increaseQuantity (i) {
      this.$store.dispatch('AUTH.increaseCartItemQuantity', {i})
    },
    setShippingByOwner (shippingByOwner) {
      console.log('setShippingByOwner', shippingByOwner)
      this.shippingByOwner = shippingByOwner
    },
    showCart (cartIsOpen) {
      this.cartIsOpen = cartIsOpen
    },
    readyToAdd (readyToAdd) {
      this.readyToAddToCart = readyToAdd
    },
    setNewAppointmentDate (newAppointment) {
      this.newAppointment = newAppointment
    },
    closeEmailCollection () {
      this.collectEmail = false
    },
    backgroundStyle (imageUrl) {
      let style = `background-image: url('` + imageUrl + `');`
      // console.log('background style', style)
      return style
    },
    stopProp (event) {
      event.stopPropagation()
    },
    submitEmail () {
      let productId = this.collectEmail
      let email = this.yourEmail
      let ownerId = this.sellerData.ownerId

      this.submittingEmail = true

      this.$store.dispatch('AUTH.submitEmail', {productId, email, ownerId}).then(async (res) => {
        console.log('submitEmail', res)
        if (res.status == '200') {
          this.collectEmail = false
          this.yourEmail = ''
        }
        this.submittingEmail = false
      })
    },
    addToCart (productId) {
      console.log('addToCart: productId', productId)
      let user = this.$route.params.user
      let item = this.sellerData.items[this.openedItemOptions]

      let cartItemData = {
        ...item,
        ownerId: this.sellerUid,
        newItemSize: this.newItemSize,
        newItemQuantity: this.newItemQuantity,
        serviceInstructions: this.instructions,
        serciceInstructionsFiles: this.productDeliveryFile,
        newAppointment: this.newAppointment
      }
      console.log('cartItemData', cartItemData)

      this.$store.dispatch('AUTH.addToCart', cartItemData).then(async (res) => {
        console.log('addToCart response', res)
        if (res == 'ok') {
          this.openItemOptions(false)
          this.newItemSize = 0
          this.newItemQuantity = 1
        }
      })
    },
    cardClick (productId) {
      // this.addToCart(productId)
      // console.log('cardClick', url, isLink, blockClick)
      // console.log('route', this.$route)
      // let username = this.$route.params.user
      // if (isLink) {
        // this.goToLink(url, true)
      // } else if (blockClick) {
        // return false
      // } else {
        // url = uniqueProductId
        // this.goTo('/' + username + '/' + url)
      // }
    },
    startCollectEmail (event, productId) {
      event.stopPropagation()
      console.log('startCollectEmail')
      this.collectEmail = productId
    },
    goTo (route, linkId) {
      router.push(route)
      if (linkId) {
        this.countLinkClick(linkId)
      }
    },
    openItemOptions (productId) {
      this.openedItemOptions = productId
      this.readyToAddToCart = false
      if (productId) {
        if (this.sellerData.items[productId].productType == 'digital-download') {
          this.readyToAddToCart = true
        } else if (this.sellerData.items[productId].productType == 'physical-product') {
          // and not sold out
          this.readyToAddToCart = true
        }
      }
    },
    goToLink (route, isLink, linkId) {
      console.log('goToLink', route, isLink, linkId)
      // if (isLink) {
        let first7 = route.substring(0, 7)
        let first8 = route.substring(0, 8)
        if (first7 == 'http://') {
          window.location.assign(route)
        } else if (first8 == 'https://') {
          window.location.assign(route)
        } else {
          window.location.assign('https://' + route)
        }
      // }

      if (linkId) {
        this.countLinkClick(linkId)
      }
    },
    myProductsList () {
      return JSON.parse(JSON.stringify(this.$store.getters['AUTH.myProductsList'] || {}))
    },
    setDisplayStyle (displayStyle) {
      this.displayStyle = displayStyle
    },
    startOnboarding () {
      this.$store.dispatch('AUTH.startOnboarding', {}).then(async (res) => {
        console.log('startOnboarding', res)
        if (res.url) {
          window.location = res.url
        }
      })
    },
    finishOnboarding () {
      // alert('Finish Onboarding')
      // this.$store.dispatch('AUTH.finishOnboarding', {}).then(async (res) => {
      //   console.log('finishOnboarding', res)
      //   if (res.url) {
      //     window.location = res.url
      //     // this.goTo(res.url)
      //   }
      // })
    },
    withdraw () {
      console.log('withdraw')
    },
    availableBalance () {
      let balance = this.balance
      let totals = {}
      for (let i in balance.available) {
        if (!totals[balance.available[i].currency]) {
          totals[balance.available[i].currency] = balance.available[i].amount
        } else {
          totals[balance.available[i].currency] = totals[balance.available[i].currency] + balance.available[i].amount
        }
      }
      return totals
    },
    pendingBalance () {
      let balance = this.balance
      let totals = {}
      for (let i in balance.pending) {
        if (!totals[balance.pending[i].currency]) {
          totals[balance.pending[i].currency] = balance.pending[i].amount
        } else {
          totals[balance.pending[i].currency] = totals[balance.pending[i].currency] + balance.pending[i].amount
        }
      }
      return totals
    },
    // balance () {
    //   let balance = 0
    //   let income = this.income
    //   for (let item in income) {
    //     let earned = income[item].order[0].earned ? parseFloat(income[item].order[0].earned) : parseFloat(income[item].order[0].price)
    //     balance = balance + earned
    //   } 
    //   return parseFloat(balance/100).toFixed(2)
    // },
    formatCurrency (c) {
      return c
    },
    formatDate (date) {

      Number.prototype.padLeft = function(base,chr){
         var  len = (String(base || 10).length - String(this).length)+1;
         return len > 0? new Array(len).join(chr || '0')+this : this;
      }

    var d = new Date(date),
        dformat = [ (d.getMonth()+1).padLeft(),
                    d.getDate().padLeft(),
                    d.getFullYear()].join('/')+
                    ' ' +
                  [ d.getHours().padLeft(),
                    d.getMinutes().padLeft()].join(':');

               return dformat
    },
    countStoreView () {
      this.$store.dispatch('AUTH.countStoreView', {}).then((res) => {
      })
    },
    countLinkClick (id) {
      console.log('countLinkClick')
      this.$store.dispatch('AUTH.countLinkClick', {id}).then((res) => {
      })
    },
    getStoreData () {
      this.$store.dispatch('AUTH.getStoreData', {
        sellerUsername: this.$route.params.user
      }).then((res) => {
        console.log('getStoreData response', res)
        let data = res || {}

        let items = res.items
        let array = []
        for (let i in items) {
          array.push({...items[i], key: i})
        }
        array = array.sort((a, b) => a.position - b.position)
        // add to array
        //sort array
        let _res = {...res, items: array}

        this.sellerData = {..._res, loaded: true}
        this.sellerUid = res.sellerId

        // this.displayStyle = this.sellerData.displayStyle || 'list'
        this.loading = false
      })
    },
    productTypeDisplay (type) {
      if (type == 'digital-download') {
        return 'Download'
      } else if (type == 'digital-service') {
        return 'Service'
      } else if (type == 'calendar-event') {
        return 'Calendar Invite'
      }
      return ''
    },
    setPageTitle () {
      const DEFAULT_TITLE = 'Some Default Title';
      router.afterEach((to, from) => {
        // Use next tick to handle router history correctly
        // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
        Vue.nextTick(() => {
          console.log('setPageTitle')
          document.title = to.meta.title || DEFAULT_TITLE;
        });
      });
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Link In Bio Display created')
    this.getStoreData()
    this.countStoreView()
    // this.setPageTitle()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  $grey-a: #e1e1e1;
  $grey-b: #757575;

  .loading-splash {
    z-index: 500;
  }

  .landing-wrapper {
    padding: 19px;
    /*padding-top: 14px;*/
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    /*background-color: $light-grey;*/
    /*background-color: #f7f7f7;*/
    background-color: #fff;
    background-size: cover;
  }
  @media (max-width: 800px) {
    .landing-wrapper {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .landing-splash, .landing-choose-your-feel {
    width: 100%;
    max-width: 720px;
  }
  .landing-products {
    flex-wrap: wrap;
    max-width: 860px;
  }
  .balance {
    align-self: flex-start;
    margin-top: 18px;
    margin-bottom: 25px;

    p {
      color: #222;
      line-height: 1em;
      &:first-child {
        font-size: 45px;
        color: $color-primary;
      }

      &:last-child {
        margin-bottom: 8px;
        margin-left: 6px;
      }
    }
  }
  .balance-text {
    margin-right: 10px
  }
  .balance-amount {

  }
  .income-row {
    min-width: 100px;
    margin-bottom: 10px;
    height: 32px;

    p {
      font-family: 'CA SaygonText', sans-serif;
      font-size: 14px;
      font-weight: 400;
    }

    .income-heading {
      flex: 1;
      margin-right: 20px;
      display: flex;
      align-items: center;

      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:nth-child(1) {
        width: 15%;
        max-width: 150px;
      }
      &:nth-child(2) {
        width: 15%;
      }
      &:nth-child(3) {
        width: 10%;
        max-width: 60px;
      }
      &:nth-child(4) {
        width: 15%;
        max-width: 200px;
      }
      &:nth-child(5) {
        width: 15%;
        max-width: 120px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .title-bar {
    margin-bottom: 16px;
  }
  .income-heading-row {
    margin-bottom: 20px;
    div {
      h3 {
        /*color: #5469d4;*/
        color: $color-primary;
        font-weight: 500;
      }
    }
  }
  .income-heading {
    .with-icon {
      align-self: center;
      justify-self: center;
      text-align: center;
    }
  }
  .icon-product {
    font-size: 24px;
  }

  h2 {

    font-weight: 700;
  }

  .balance, .bottom-section {
    /*padding-left: 19px;*/
    /*padding-right: 19px;*/
  }

  .bottom-section {
    z-index: 200;
    /*max-width: calc(100vw - 20px);*/
    /*padding-top: 20px;*/
    /*max-width: 1000px;*/
  }

  @media (max-width: 980px) {
    .bottom-section {
      /*margin-bottom: 60px;*/
    }
  }

  .earned {
    margin-left: 15px;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    p {
      font-weight: 600;
      color: $color-primary;
    }
  }

  .mb_y {
    margin-top: 4px;
  }

  .mb_z {
    margin-bottom: 12px;
  }

  .order-number {
    p {
      font-size: 12px;
    }
  }
  .heading-pressed {
    letter-spacing: -0.01em;
  }
  .income-item-meta {
    font-size: 14px;
  }
  .superscript {
    margin-right: .15em;
    vertical-align: super;
    font-size: 60%;
  }
  .each-product-box {
    padding-left: 20px;
    padding-right: 20px;
    p {
      color: $color-background-dark;
    }

    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: 480px) {
    .each-product-box {
      flex-wrap: wrap;
     
      .earned {
        width: 100%;
        margin-left: 0;
        margin-top: 20px;
      }
    }
  }

  .new-product-icon {
    margin-right: 15px;
    color: $color-primary;
    background-color: $color-background-dark;
    height: 50px;
    width: 50px;
    min-height: 50px;
    min-width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    font-size: 34px;
    font-weight: 400;
    /*position: absolute;*/
    /*left: 0;*/
  }
  .active-product-icon {
    color: $color-yellow;
    /*color: #aaa;*/
  }

  .icon-1 {
    display: none;
  }

  $gap: 10px;


  @mixin flex-wrap-fix($flex-basis, $max-viewport-width: 800px) {
    flex-grow: 1;
    flex-basis: $flex-basis;
    max-width: 100%;

    $multiplier: 1;
    $current-width: 0px;

    @while $current-width < $max-viewport-width {
      $current-width: $current-width + $flex-basis;
      $multiplier: $multiplier + 1;

      @media(min-width: $flex-basis * $multiplier) {
        max-width: percentage(1/$multiplier);
      }
    }
  }

  .link-in-bio-list, .link-in-bio-grid {
    /*margin-top: 35px;*/
  }

  .link-in-bio-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    &-wrapper {
      width: 100%;
      max-width: 680px;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    &-item {
      width: 100%;
      /*max-width: 680px;*/
      min-height: 57px;
      /*background-color: #fff;*/
      background-color: transparent;
      border-radius: 14px;
      border: 2px solid #fff;
      transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
      cursor: pointer;
      /*max-width: 600px;*/

      .expanded-block {
        display: none;
      }

      &-expanded {
        display: flex;
      }

      &:hover {
        transform: scale(1.01);
      }

      p {
        color: $color-background-dark;
      }

      & > div > p {
        font-size: 18px;
        text-align: center;
        max-width: calc(100% - 140px);
        margin-top: 16px;
        margin-bottom: 16px;
        color: #fff;
      }

      .collect-email-title {
        max-width: calc(100% - 180px);
      }

      .list-collect-email {
        & > input, & > button {
          height: 100% !important;
          min-height: 54px;
          margin: 0;
          border: none;
        }

        & > input {
          flex: 1;
          background-color: transparent;
          font-size: 18px;
          font-weight: 600;
        }

        & > button {
          flex: unset;
          width: unset;
          background-color: transparent;
          border-left: 2px solid #000;
          border-radius: 0;
          padding-left: 16px;
          padding-right: 16px;
          min-width: 82px;
        }
      }

      .grid-collect-email {
        flex: 1;
        & > input, & > button {
          height: 100% !important;
          min-height: 57px;
          margin: 0;
          border: none;
        }

        & > input {
          flex: 1;
          background-color: transparent;
          font-size: 18px;
          font-weight: 600;
        }

        & > button {
          flex: unset;
          width: unset;
          background-color: transparent;
          border-left: 2px solid #000;
          border-radius: 0;
          padding-left: 16px;
          padding-right: 16px;
          min-width: 82px;
        }
      }

      @media (max-width: 700px) {
        & > div > p {
          font-size: 16px;
        }
      }
    }
  }


  $grid-breakpoint-1: 600px;
  $grid-breakpoint-2: 768px;
  $grid-max-width: 1200px;

  $grid-item-wrapper-width-1: calc(50%);
  $grid-item-wrapper-width-2: calc(33.33%);
  $grid-item-wrapper-width-3: calc(25%);
  $grid-item-wrapper-width-4: calc(#{$grid-max-width} / 4);
  $grid-item-wrapper-height-1: calc(50vw - 7.5px);
  $grid-item-wrapper-height-2: calc(33.33vw - 5px);
  $grid-item-wrapper-height-3: calc(25vw - 4px);
  $grid-item-wrapper-height-4: calc(#{$grid-max-width} / 4);
  /*$grid-additional-height-1: 140px;
  $grid-additional-height-2: 150px;
  $grid-additional-height-3: 160px;
  $grid-additional-height-4: 170px;*/

/*  $grid-additional-height-1: 3.5vw;
  $grid-additional-height-2: 3.5vw;
  $grid-additional-height-3: 3.5vw;
  $grid-additional-height-4: 50px;*/

  $grid-additional-height-1: 1px;
  $grid-additional-height-2: 1px;
  $grid-additional-height-3: 1px;
  $grid-additional-height-4: 50px;

  $grid-border-radius-1: 14px;
  $grid-border-radius-2: 14px;
  $grid-border-radius-3: 14px;

  $grid-gap-1: 23px;
  $grid-gap-2: 25px;
  $grid-gap-3: 30px;

  $grid-padding-1: 15px;
  $grid-padding-2: 20px;
  $grid-padding-3: 20px;

  $text-padding-1: 10px;

  $wrapper-padding: 6px;


  .link-in-bio-grid {
    width: 100%;
    z-index: 111;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    position: relative;
    gap: $grid-gap-1;
    padding-left: $grid-padding-1;
    padding-right: $grid-padding-1;

    &-wrapper {
      width: 100%;
      max-width: $grid-max-width;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    &-item {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: $color-white;
      cursor: pointer;
      flex: 4;
      /*height: calc(#{$grid-item-wrapper-height-1} - 80px);*/
      /*min-height: calc(#{$grid-item-wrapper-height-1} - 80px);*/
      /*max-height: calc(#{$grid-item-wrapper-height-1} - 80px);*/
      /*border-radius: calc(#{$grid-border-radius-1}*.62);*/
      border-radius: $grid-border-radius-1;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;

      &-default {
        background-size: 50px;
      }

      &-wrapper {
        background-color: #fff;
        /*padding: $wrapper-padding;*/
        /*-webkit-box-shadow: 0 0 20px rgba(8, 21, 8, .1);*/
        /*box-shadow: 0 0 20px rgba(8, 21, 8, .1);*/
        background-color: #fff;
        border-radius: $grid-border-radius-1;
        width: calc(#{$grid-item-wrapper-width-1} - #{$grid-gap-1}/2);
        /*height: 100px;*/
        /*max-height: 100px;*/
/*        height: calc(#{$grid-item-wrapper-height-1} - #{$grid-gap-1}/2 - #{$grid-padding-1}/2);
        max-height: calc(#{$grid-item-wrapper-height-1} - #{$grid-gap-1}/2 - #{$grid-padding-1}/2);*/
        min-height: calc(#{$grid-item-wrapper-height-1} - #{$grid-gap-1} + #{$grid-additional-height-1});
        height: calc(#{$grid-item-wrapper-height-1} - #{$grid-gap-1} + #{$grid-additional-height-1});
        max-height: calc(#{$grid-item-wrapper-height-1} - #{$grid-gap-1} + #{$grid-additional-height-1});
        /*max-height: calc(#{$grid-item-wrapper-height-1} - #{$grid-gap-1}/2 - #{$grid-padding-1}/2 + #{$grid-additional-height-1});*/
        transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
        /*margin-top: calc(#{$grid-gap-1} * .15);*/
        /*margin-bottom: calc(#{$grid-gap-1} * .35);*/
      
        &:hover {
          transform: scale(1.01);
        }

        .collect-email-title {
          max-width: calc(100% - 180px);
        }

        .grid-collect-email {
          flex: 1;
          & > input, & > button {
            height: 100% !important;
            min-height: 57px;
            margin: 0;
            border: none;
          }

          & > input {
            flex: 1;
            background-color: transparent;
            font-size: 18px;
            font-weight: 600;
          }

          & > button {
            flex: unset;
            width: 100%;
            background-color: transparent;
            border-top: 2px solid #000;
            border-radius: 0;
            padding-left: 16px;
            padding-right: 16px;
            height: 60px !important;
          }
        }
      }

      &-text {
        padding: 8px;
        padding-top: 8px;
        height: 32%;
        min-height: 32%;
        max-height: 32%;
        /*max-height: calc(#{$grid-additional-height-1} - #{$wrapper-padding});*/
        /*height: calc(#{$grid-additional-height-1} - #{$wrapper-padding});*/
        /*min-height: calc(#{$grid-additional-height-1} - #{$wrapper-padding});*/
        /*overflow-y: hidden;*/

        p {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          /*text-align: center;*/
        }
      }

      &-title {
        /*max-height: calc(100% - 30px - #{$text-padding-1} * 2);*/
        overflow-y: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: hidden;
        max-height: calc(2em + 8px);
        font-size: 14px !important;
        font-weight: 600 !important;
      }
    }
  }

  @media (max-width: 420px) {
    .link-in-bio-grid-item-text {
        padding-top: 8px;
        height: 40%;
        min-height: 40%;
        max-height: 40%;
    }
  }

  @media (min-width: $grid-breakpoint-1) {
    .link-in-bio-grid {
      padding-left: $grid-padding-2;
      padding-right: $grid-padding-2;
      gap: $grid-gap-2;

      &-item {
        /*height: calc(#{$grid-item-wrapper-height-2} - 50px);*/
        /*min-height: calc(#{$grid-item-wrapper-height-2} - 50px);*/
        /*max-height: calc(#{$grid-item-wrapper-height-2} - 50px);*/
        /*border-radius: $grid-border-radius-2;*/
        /*border-top-left-radius: $grid-border-radius-2;*/
        /*border-top-right-radius: $grid-border-radius-2;*/

        &-wrapper {
          border-radius: $grid-border-radius-2;
          width: calc(#{$grid-item-wrapper-width-2} - #{$grid-gap-2}*(2/3));
          height: calc(#{$grid-item-wrapper-height-2} - #{$grid-gap-2}*(2/3) + #{$grid-additional-height-2});
          max-height: calc(#{$grid-item-wrapper-height-2} - #{$grid-gap-2}*(2/3) + #{$grid-additional-height-2});

          min-height: calc(#{$grid-item-wrapper-height-2} + #{$grid-additional-height-2});
          height: calc(#{$grid-item-wrapper-height-2} + #{$grid-additional-height-2});
          max-height: calc(#{$grid-item-wrapper-height-2} + #{$grid-additional-height-2});
        }

        &-title {
          /*max-height: calc(100% - 30px - #{$text-padding-1} * 2 - 6px);*/
          /*margin-bottom: 6px;*/
          /*overflow-y: hidden;*/
        }

        &-text {
          padding-top: 8px;
          height: 32%;
          min-height: 32%;
          max-height: 32%;
          /*max-height: calc(#{$grid-additional-height-2} - #{$wrapper-padding});*/
          /*height: calc(#{$grid-additional-height-2} - #{$wrapper-padding});*/
          /*min-height: calc(#{$grid-additional-height-2} - #{$wrapper-padding});*/
        }
      }
    }
  }
  @media (min-width: $grid-breakpoint-2) {
    .link-in-bio-grid {
      padding-left: $grid-padding-3;
      padding-right: $grid-padding-3;
      gap: $grid-gap-3;

      &-item {
        /*height: calc(#{$grid-item-wrapper-height-3} - 50px);*/
        /*min-height: calc(#{$grid-item-wrapper-height-3} - 50px);*/
        /*max-height: calc(#{$grid-item-wrapper-height-3} - 50px);*/

        &-wrapper {
          border-radius: $grid-border-radius-3;
          width: calc(#{$grid-item-wrapper-width-3} - #{$grid-gap-3}*(3/4));
          /*height: calc(#{$grid-item-wrapper-height-3} - #{$grid-gap-3}*(3/4) - #{$grid-padding-3}*(2/4)/4 + #{$grid-additional-height-3});*/
          min-height: calc(#{$grid-item-wrapper-height-3} + #{$grid-additional-height-3});
          height: calc(#{$grid-item-wrapper-height-3} + #{$grid-additional-height-3});
          max-height: calc(#{$grid-item-wrapper-height-3} + #{$grid-additional-height-3});
        }

        &-title {
          /*max-height: calc(100% - 30px - #{$text-padding-1} * 2 - 8px);*/
          /*margin-bottom: 8px;*/
          /*display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: hidden;*/
        }

        &-text {
          /*max-height: calc(#{$grid-additional-height-3} - #{$wrapper-padding} * 2);*/
          /*height: calc(#{$grid-additional-height-3} - #{$wrapper-padding} * 2);*/
          /*min-height: calc(#{$grid-additional-height-3} - #{$wrapper-padding} * 2);*/
        }
      }
    }

  }
  @media (min-width: calc(#{$grid-max-width} + 2 * #{$grid-padding-3})) {
    .link-in-bio-grid {

      &-item {
        /*height: calc(#{$grid-item-wrapper-height-4} - #{$grid-padding-3});*/
        /*min-height: calc(#{$grid-item-wrapper-height-4} - #{$grid-padding-3});*/
        /*max-height: calc(#{$grid-item-wrapper-height-4} - #{$grid-padding-3});*/

        &-wrapper {
          border-radius: $grid-border-radius-3;
          width: calc(#{$grid-item-wrapper-width-4} - #{$grid-gap-3}*(3/4) - #{$grid-padding-3}*(2/4));
          /*height: calc(#{$grid-item-wrapper-height-4} - #{$grid-gap-3}*(3/4) - #{$grid-padding-3}*(2/4)/2 + #{$grid-additional-height-4});*/
          min-height: calc(#{$grid-item-wrapper-height-4} + #{$grid-additional-height-4});
          height: calc(#{$grid-item-wrapper-height-4} + #{$grid-additional-height-4});
          max-height: calc(#{$grid-item-wrapper-height-4} + #{$grid-additional-height-4});
        }
        &-title {
          /*max-height: calc(100% - 30px - #{$text-padding-1} * 2);*/
          /*-webkit-line-clamp: 3;*/
        }
        &-text {
          /*max-height: calc(#{$grid-additional-height-4} - #{$wrapper-padding} - #{$grid-padding-3}*(2/4));*/
          /*height: calc(#{$grid-additional-height-4} - #{$wrapper-padding} - #{$grid-padding-3}*(2/4));*/
          /*min-height: calc(#{$grid-additional-height-4} - #{$wrapper-padding} - #{$grid-padding-3}*(2/4));*/
        }
      }
    }
  }

  /*.copy-link {
    color: $color-primary;
    border: 1px solid $color-primary;
    padding: 2px;
    border-radius: 5px;
    font-size: 12px;
    margin-left: 10px;
  }*/

  .add-list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #999;
  }
  .add-grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ddd;
  }
  .profile-image {
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    height: 170px;
    width: 170px;
    /*opacity: 0.6;*/
    /*border: 2px solid #000;*/
    background-color: #eaeaea;
  }
  .profile-texts {
    margin-left: 20px;
  }

  @media (max-width: 800px) {
    .profile-image {
      width: 140px;
      height: 140px;
    }
  }

  .fz20p {
    font-size: 20px;
  }
  .fz22p {
    font-weight: 400;
    font-size: 22px;
  }
  .mt__ {
    margin-top: 12px;
  }

  .list-item-image {
    position: absolute;
    height: 48px;
    width: 48px;
    object-fit: cover;
    object-position: center;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 14px;
  }
  .profile-banner {
    height: 156px;
    min-height: 156px;
    margin-top: 30px;
    margin-bottom: 85px;
    background-size: cover;
    border-radius: 14px;
    z-index: 1;
    border-bottom-left-radius: 14px;
    /*border-bottom-right-radius: 14px;*/
  }
  .profile-banner-background {
    position: absolute;
    width: calc(100% + 38px);
    transform: translateX(-19px);
    height: 100%;
    z-index: 0;
  }
  .z2 {
    z-index: 2;
    /*position: absolute;*/
    /*left: 50%;*/
    /*top: 50%;*/
    /*top: calc(100% + 43px);*/
    /*transform: translate(-50%, -50%);*/
  }
  .list-item-icon {
    color: #fff;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .grid-item-icon {
    font-size: 20px;
    /*position: absolute;*/
    /*left: 10px;*/
    /*top: 50%;*/
    /*transform: translateY(-50%);*/
  }
  .display-options {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    z-index: 5;
    padding-right: 15px;

    i {
      color: $color-background-dark !important;;
    }

    h4 {
      border-color: $color-background-dark !important;
      &:hover {
          border-color: $color-primary !important;
          i {
            /*color: $color-white !important;;*/
          }
      }
    }

  }


  @media (max-width: 800px) {
    .link-in-bio-grid {
      /*padding-left: $grid-padding-3;*/
      /*padding-right: $grid-padding-3;*/
    }
  }
  .profile-banner {
    position: absolute;
    height: 100vh;
    border-radius: 0;
    margin-top: 0;
    /*border-bottom-left-radius: 14px;*/
    /*border-bottom-right-radius: 14px;*/
  }
  .link-in-bio-list {
    z-index: 15;

    &-wrapper {
      max-width: unset;
    }
  }
  .link-in-bio-list {
    padding-left: 30px;
    padding-right: 30px;
  }
  .header-logo {
    z-index: 10;
    width: 48px;
    height: 41px;
    max-height: 41px;
    min-height: 41px;
    object-fit: contain;
    margin-right: 5px;
  }
  .logo-font {
    z-index: 10;
    transform: translateY(-2px);
    font-size: 25px;
  }

  @media (max-width: 568px) {
    .profile-image {
      width: 120px;
      height: 120px;
    }
  }

  @media (max-width: 480px) {
    .profile-image {
      width: 104px;
      height: 104px;
    }
  }


  @media (max-width: 400px) {
    .logo-font {
      /*display: none;*/
    }
  }
  .h1 {
    height: 1px !important;
    min-height: 1px !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .full-background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1;
  }

  .theme-0 {
    .link-in-bio-list-item, .link-in-bio-grid-item {
      background-color: transparent;
      p, i {
        color: #fff;
        color: #000;
      }
    }
    .link-in-bio-list-item {
      border: 2px solid #000;
    }
    .link-in-bio-grid-item {
      background-color: #fff;
      /*border: 2px solid #000;*/
    }
    .add-list-item, .add-grid-item {
      background-color: #00000088;
    }
    .link-in-bio-grid-item-wrapper {
      /*background: none;*/
      /*border: 2px solid #000;*/
      border: 1px solid #DADADA;
      /*background: var(--grey-grey-0, #FFF);*/
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.09);
    }
    .link-in-bio-grid-item-text {
      p {
        color: #000;
      }
    }
    .text-block {
      p {
        color: #000 !important;
        margin-top: -8px !important;
        transform: translateY(11px);
      }
    }
    .submit-email {
      color: #fff;
    }
    .button-1 {
      color: #000 !important;
      p {
        color: #000;
      }
    }
    .quantity {
      background-color: #00000022;

      i {
        color: #000;
      }
    }
  }

  .theme-1 {
    .submit-email-grid {
      color: #fff !important;
      border-color: #fff !important;
    }
    .your-email-grid {
      color: #fff !important;
    }

    .username-display, .set-view {
      color: #fff;
    }
    .display-options, .profile-options {
      h4, p, i {
        border-color: #fff !important;
        color: #fff !important;
      }
    }
    .profile-image {
      border-color: #fff;
    }
    .link-in-bio-grid-item-wrapper {
      background: none;
      border: 2px solid #fff;
    }
    .link-in-bio-grid-item-text {
      p {
        color: #fff;
      }
    }
    .add-grid-item {
      p, i {
        color: #fff;
      }
    }
    .submit-email {
      border-left: 2px solid #fff !important;
      color: #fff;
    }
    .your-email {
      color: #fff;

      &::placeholder {
        color: #aaa;
      }
    }
  }
  .text-block {
    background-color: transparent !important;
    p {
      font-size: 20px;
    }
  }
  .color-white {
    color: $color-white !important;
  }
  @media (max-width: 768px) {
    .link-in-bio-list {
      /*padding-left: 15px;*/
      /*padding-right: 15px;*/
    }
  }
  @media (max-width: 480px) {
    .link-in-bio-list {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
  .pushable-branding {
    transform: scale(0.8);
    z-index: 10;
  }
  .only-text-block {
    width: 100%;
    height: 40px !important;
    min-height: 40px !important;
    background-color: transparent !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border-color: transparent !important;

    .text-block {
      min-height: unset;
      max-height: unset;
    }

    .link-in-bio-grid-item-text {
      display: none;
      /*height: 40px !important;*/
      /*min-height: 40px !important;*/
      /*max-height: 40px !important;*/
    }

    .more-icon-grid {
      /*display: none;*/
    }

    .link-in-bio-grid-item {
      height: 100%;
    }
  }
  .spinner-x {
    height: 20px;
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

  .list-item-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    min-width: unset;
  }

  .quantity {
    background-color: #eaeaea;
    position: relative;
    height: 40px;
    padding: 4px 15px 4px 15px;
    border-radius: 20px;
    margin-bottom: 3px;
    position: relative;
    /*background-color: #ffffff22;*/

    p {
      font-size: 14px;
    }
    i {
      /*display: none;*/
      color: $color-background-dark;
      font-size: 10px;
      transform: translateY(-1px); 
    }
  }

  .add-to-cart {
    &-wrapper {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);

      .card-expand {
        transform: translateX(-4px);
        font-size: 16px;
      }

      &-inner {
        display: flex;
        flex-direction: column;
      }
    }

    &-button {
      background-color: $color-primary;
      color: $color-background-dark;
      min-width: unset;
      font-size: 12px;
      font-weight: 400;
      padding: 4px 8px;
      border-radius: 10px;
    }
  }
  .green {
    color: $color-primary;
  }
  .action-button {
    height: 27px;
    margin-top: 2px;
    font-size: 14px;
    font-weight: 400;
  }
  .quantity-dropdown {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    color: transparent;
    background-color: transparent;
    border: none;
  }
  .cart {
    cursor: pointer;
    position: fixed;
    right: 10px;
    top: 10px;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    z-index: 300;
    transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;

    &:hover {
      transform: scale(1.01);
    }

    .cart-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      color: #191919;
      background-color: #fff;
      padding: 10px;
      padding-top: 13.5px;
      padding-right: 11px;
      border-radius: 50%;
      font-size: 17px;
      -webkit-box-shadow: -1px 1px 4px rgba(8, 21, 8, .1);
      box-shadow: -1px 1px 4px rgba(8, 21, 8, .1);
    }

    & > p {
      color: #000 !important;
    }

    .cart-hover-effect {
      position: absolute;
      opacity: 0;
      width: 62px;
      height: 62px;
      left: 50%;
      top: 50%;
      transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
      transform: translate(calc(-50% + 1px), calc(-50% - 1px));
      background-color: #ffffff00;
      z-index: 1;
      border-radius: 50%;
    }

    &:hover {
      .cart-hover-effect {
        opacity: 1;
      }
    }

    p {
      z-index: 2;
      font-size: 10px;
      color: #000 !important;
      /*color: #44d600 !important;*/
      width: 10px;
      transform: translate(0.5px, -6px);
      width: 10px;
      height: 13px;
      text-align: center;
      font-size: 14px;
      font-weight: 400;

      &::before {
        position: absolute;
        content: ' ';
        width: 10px;
        height: 13px;
        left: 50%;
        bottom: -1px;
        transform: translateX(-50%);
        background-color: #fff;
        z-index: -1;
      }
    }
  }
  ._o0 {
    opacity: 0;
    pointer-events: none;
  }
  .fw400 {
    font-weight: 400 !important;
  }
  .product-price {
    font-size: 14px !important;
  }

  $padding: 20px;

  .item-options {
    position: fixed;
    overflow-y: auto;
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 20px;
    padding-bottom: calc(#{$padding} + 70px);

    p {
      color: #000;
    }
  
    &-wrapper {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #00000033;
      z-index: 1000;
    }
      &-bar {
        &-title {
          font-size: 22px;
          font-weight: 600;
        }
      }
  }
  .item-options-image {
    height: 250px;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }


  .add-to-cart-inner {
    width: calc(100%);
    margin-top: 0;

    &-wrapper {
      z-index: 100;
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 0;
      background-color: #fff;
      padding: $padding;
    }
  }

  .disabled-button {
    background-color: #ccc;
  }

  .vc-text-gray-400 {
    pointer-events: none;
  }

  .item-options-bar {
    margin-top: 20px;
    flex-direction: column;
    align-items: flex-start;
  }

  .only-bigger {
    display: none;
  }

  .x-close {
    cursor: pointer;
    position: absolute;
    right: 19px;
    top: 16px;
  }
  .open-cart {
    position: fixed;
    overflow-y: auto;
    background-color: #f8f8f8;
    width: 100%;
    height: 100%;
    padding: 20px;
    padding-bottom: calc(#{$padding} + 70px);

    p {
      color: #000;
    }
  
    &-wrapper {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #00000033;
      z-index: 1000;
    }
    .cart-item {
      &-title {
        font-size: 18px;
      }
      &-price {
        font-size: 14px;
      }
      &-image {
        width: 80px;
        height: 80px;
        margin-right: 15px;
        border-radius: 4px;
        object-fit: cover;
      }
      .quantity-minus, .quantity-plus {
        font-size: 14px;
        transform: translateY(1px);
      }
      .quantity-minus {

      }
      .quantity-amount {
        width: 27px;
        height: 27px;
        border-radius: 4px;
        border: 2px solid #bbb;
        margin-left: 9px;
        margin-right: 9px;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 14px;
          line-height: 1em;
          transform: translateY(1.5px);
        }
      }
      .quantity-plus {

      }
    }
  }

  @media (min-width: 680px) {
    .item-options {
      max-width: 540px;
      height: 80vh;
      position: relative;
      display: flex;
      flex-direction: column;
      padding-bottom: 0;
      border-radius: 15px;

      &-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &-bar {
        flex-direction: column;
        align-items: flex-start;

        &-title {
          font-size: 22px;
          font-weight: 600;
        }
        &-price {

        }
      }
    }
    .open-cart {
      max-width: 540px;
      height: 80vh;
      position: relative;
      display: flex;
      flex-direction: column;
      padding-bottom: 0;
      border-radius: 15px;

      &-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &-bar {
        flex-direction: column;
        align-items: flex-start;

        &-price {

        }
      }
    }
    .smaller-only {
      display: none;
    }
    .add-to-cart-inner {
      &-wrapper {
        position: relative;
      }
    }
    .item-options-bar {
      margin-top: 0;
    }
    .only-bigger {
      display: block
    }
  }
  .card-price {
    font-size: 12px !important;
    color: #5C5C5C !important;
  }
  .text-muted {
    font-size: 14px;
    color: #888 !important;
  }
  .powered {
    p {
      font-size: 12px;
      color: #888;
    }
  }
  .cart-hr {
    width: 100%;
    height: 1px;
    min-height: 1px;
    background-color: #000;
    border: none;
    margin-bottom: 20px;
  }
  .item-cannot-be-delivered {
    color: orange !important;
  }
  .bold-title {
    font-weight: 600;
    font-size: 16px !important;
  }
  .bold-price {
    font-weight: 600;
    font-size: 16px !important;
    color: $color-primary !important;
    margin-top: 4px;
  }
  .font-product-modifiers {
    color: #888 !important;
    margin-top: 4px;
  }
  @media (max-width: 800px) {
    .balance {
      /*align-self: unset;*/
    }
    .link-in-bio-grid {
      /*margin-top: 20px;*/
    }
  }
  @media (max-width: 480px) {
    .balance {
      /*align-self: unset;*/
    }
  }
  .h100p {
    height: 100%;
  }



  .landing-wrapper {
    background-color: $profile-grey;
  }

  .profile-image {
    z-index: 2;
    -webkit-box-shadow: -1px 1px 4px rgba(8, 21, 8, .1);
    box-shadow: -1px 1px 4px rgba(8, 21, 8, .1);
  }
  .profile-texts {
    padding: 8px 13px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-left: 0;
    padding-left: 30px;
    transform: translateX(-16px);
    background-color: #fff;
    z-index: 1;
    -webkit-box-shadow: -1px 1px 4px rgba(8, 21, 8, .1);
    box-shadow: -1px 1px 4px rgba(8, 21, 8, .1);
  }

  .username-display {
    color: #000;
  }

  .username-url {
    color: #999;
    font-size: 14px;
  }

  .copy-store-link {
    margin-left: 5px;
    transform: translateY(-2px);
    font-size: 11px;
    color: #999;
    cursor: pointer;
  }


  $dropzone-size: 100px;
  $dropzone-margin: 0;

  .service-instructions {
    height: $dropzone-size;
    padding: 10px;
    font-size: 16px;
  }

  .ta-wrap {
    /*width: 400px;*/
    margin-bottom: 6px;
  }

  .file-upload {
    margin-top: $dropzone-margin;
    width: 100%;
    height: $dropzone-size;
    /*max-height: 44px;*/
    min-height: 0px !important;
    border-radius: 6px;
    border: 1px dashed rgba(50, 50, 93, 0.1);
    font-size: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px !important;

    &:hover {
      & + .dropzone-overlay {
        background-color: #fdfdfd;
        border: 1px dashed rgba(50, 50, 93, 0.12);
        
        a {
          background-color: #44d600;
          color: #fff;
        }
      }
    }
  }



  .dropzone-overlay {
    margin-top: $dropzone-margin;
    border-radius: 10px;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    /*background-color: #aaa;*/
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
/*    background-color: #fbfbfb;
    border: 1px dashed rgba(50, 50, 93, 0.12);*/

    p {
      font-size: 14px;
      /*margin-bottom: 6px;*/
      text-align: center;
    }

    a {
      text-align: center;
    }

  }

  .dropzone-wrapper {
    height: $dropzone-size;
    /*max-height: 44px;*/
    /*width: 80px;*/
    /*margin-left: 20px;*/
  }
  .file-icon {
    opacity: 0.5;
    height: 25px;
    margin-right: 10px;
  }
  .file-text {
    font-size: 14px;
    margin-right: 10px;
  }
  .file-remove-text {
    font-size: 10px;
    text-decoration: underline;
    color: #000;
  }

  .button-b {
    border: 1px solid #44d600;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #44d600;
    padding: 3px 6px;
    /*height: 44px;*/
    margin-left: 10px;

    &:hover {
      border: 1px solid transparent;
      background-color: #44d600;
      color: #fff;
    }
  }
  .character-count {
    text-align: right;
    font-size: 12.5px;
    margin-top: 4px;
    color: #6e6e6e !important;
  }
  .service-request-too-long {
    color: #ef4f0d !important;
  }

  .hr-x {
    width: 100%;
    height: 1px;
    max-width: 76px;
    background-color: #DBDBDB;
    margin-top: 24px;
    margin-bottom: 24px;
    border: none;
  }

  .text-block {
    border: 2px solid transparent !important;
    height: unset;
    min-height: unset;
    max-height: unset;

    p {
      font-size: 20px !important;
      font-weight: 600;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
  }
  /*}*/
</style>
