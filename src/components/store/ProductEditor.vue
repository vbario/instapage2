<template>
  <div class="add-link-outer">
    <div class="add-link-wrapper"
          :class="{'wide-wrapper': showScheduleEditor}">
      <div class="w100p add-link-box" @click="stopProp($event)">
        <ScheduleEditor
          v-if="showScheduleEditor"
          class="schedule-editor-wrapper"
          :mySchedules="mySchedules"
          :selectedSchedule="selectedSchedule"
          @getMySchedules="getMySchedules"
          @saveSchedules="saveSchedules"
          @setScheduleData="setScheduleData"
          @closeScheduleEditor="closeScheduleEditor"/>
        <img v-if="!showScheduleEditor" class="x-close" src="../../../static/brand-icons/x-close.svg" @click="closeProductEditor()">

        <StepMarkers
          v-if="!showScheduleEditor"
          @clickedStep1="clickedStep1"
          @clickedStep2="clickedStep2"
          @clickedStep3="clickedStep3"
          :currentStep="currentStep"/>

        <div v-if="!showScheduleEditor" class="add-product-steps w100p" :style="'margin-top:' + ((currentStep == 1) ? 48 : 24) + 'px;'">
          <div v-if="currentStep === 1" class="step-1 df fdc jcc aic">
            <p class="editor-heading">Select the type of product or service you'd like to add</p>
            <ServiceTypeSelector @startNewProductWithType="startNewProductWithType" />
          </div>
          <div v-else-if="currentStep === 2" class="step-2 w100p df fdc jcc aic">
            <p class="editor-heading">Add your product details</p>
            <ProductEditorDetails
              :productType="productType"
              :heading="heading"
              :description="description"
              :productImage="productImageUrl"
              :error="error"
              @changeProductImages="changeProductImages"
              @changeDescription="changeDescription"
              @changeHeading="changeHeading"/>
          </div>
          <div v-else-if="currentStep === 3" class="step-3 w100p df fdc jcc aic">
            <p v-if="productType == 'calendar-event'" class="editor-heading">Set your availability</p>
            <p v-else class="editor-heading">Add your product's checkout details</p>
            <ProductEditorFulfillment
              :productType="productType"
              :error="error"
              :sizes="sizes"
              :redirectUrl="redirectURL"
              :price="price"
              :saleDateRange="saleDateRange"
              :salePrice="salePrice"
              :freeProduct="freeProduct"
              :productDeliveryFile="productDeliveryFile"
              :appointmentLengths="appointmentLengths"
              :customAppointmentLengths="customAppointmentLengths"
              :calendarEventDateRange="calendarEventDateRange"
              :useScheduleRange="useScheduleRange"
              :calendarEventFutureTime="calendarEventFutureTime"
              :calendarEventFutureTimePeriod="calendarEventFutureTimePeriod"
              :calendarEventMinimumNoticeTime="calendarEventMinimumNoticeTime"
              :calendarEventMinimumNoticeTimePeriod="calendarEventMinimumNoticeTimePeriod"
              :calendarEventDailyLimit="calendarEventDailyLimit"
              :mySchedules="mySchedules"
              :selectedSchedule="selectedSchedule"
              @setPrice="setPrice"
              @setSalePrice="setSalePrice"
              @setFreeProduct="setFreeProduct"
              @setSaleDateRange="setSaleDateRange"
              @setSelectedSchedule="setSelectedSchedule"
              @openScheduleEditor="openScheduleEditor"
              @setCalendarEventFutureTime="setCalendarEventFutureTime"
              @setCalendarEventFutureTimePeriod="setCalendarEventFutureTimePeriod"
              @setCalendarEventMinimumNoticeTime="setCalendarEventMinimumNoticeTime"
              @setCalendarEventMinimumNoticeTimePeriod="setCalendarEventMinimumNoticeTimePeriod"
              @setCalendarEventDailyLimit="setCalendarEventDailyLimit"
              @setUseScheduleRange="setUseScheduleRange"
              @setCalendarEventDateRange="setCalendarEventDateRange"
              @addAppointmentTime="addAppointmentTime"
              @removeAppointmentTime="removeAppointmentTime"
              @setSizeSaleDateRange="setSizeSaleDateRange"
              @setSizeName="setSizeName"
              @setProductSku="setProductSku"
              @setSizePrice="setSizePrice"
              @setSizeSalePrice="setSizeSalePrice"
              @setSizeFreeProduct="setSizeFreeProduct"
              @setSizeStock="setSizeStock"
              @setSizeWeight="setSizeWeight"
              @setProductDeliveryFile="setProductDeliveryFile"
              @changeRedirectUrl="changeRedirectUrl"/>
          </div>
        </div>

        <ProductEditorActions
          v-if="!showScheduleEditor"
          @goBackAStep="goBackAStep"
          @closeProductEditor="closeProductEditor"
          @continueToStep3="continueToStep3"
          @saveLink="saveLink"
          @saveOnLastStep="saveOnLastStep"
          :currentStep="currentStep"
          :deleting="deleting"
          :saving="saving"
          :addingOrEditing="addingOrEditing()" />
      </div>
    </div>
  </div>
</template>

<script>



import StepMarkers from '@/components/store/StepMarkers'
import ServiceTypeSelector from '@/components/store/ServiceTypeSelector'
import ProductEditorDetails from '@/components/store/ProductEditorDetails'
import ProductEditorFulfillment from '@/components/store/ProductEditorFulfillment'
import ProductEditorActions from '@/components/store/ProductEditorActions'
import ScheduleEditor from '@/components/store/ScheduleEditor'

import paths from '@/util/paths'
import common from '@/util/common'

export default {
  name: 'ProductEditor',
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
        text: '',
        editingProductType: ''
      },
      currentStep: 1,

      subscriptionProducts: [
        {
          name: '',
          sku: '',
          weightLb: 1,
          image: '',
          price: 9.99
        }
      ],
      physicalProductSubscriptionCanBeCustomized: false,
      carouselKey: 1,
      sizes: [
        {
          name: 'Medium',
          sku: '',
          weightLb: 0,
          price: 0,
          freeProduct: true,
          salePrice: 0,
          stock: 0,
          // weight: 0
        }        
      ],
      saveProductError: false,
      price: 0,
      freeProduct: true,
      productSku: '',
      weightLb: 0,
      myShippingProviders: {}, // for physical product
      myShippingRates: {}, // for physical product
      fulfillMyself: true, // for physical product
      useMyNetwork: false, // for physical product
      fulfillMyselfOptions: {
      }, // for physical product
      fulfillAutomaticallyOptions: {
        smoID: '',
        shippingProvider: ''
      }, // for physical product
      uploadingImage: false,
      currentTab: 'product',
      rootDomain: process.env.NODE_ENV == '' ? paths.devPath : paths.productionShortPath,
      maxlength: 200,
      allTimezones: common.timezones,
      myTimezone: '(GMT-05:00) Eastern Time (US & Canada)',

      appointmentLength: '15 minutes',
      appointmentLengths: [
        {
          price: 45,
          time: 30
        },
        {
          price: 60,
          time: 60
        }
      ],
      customAppointmentLengths: [],
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
      dropzoneOptions2: {
          autoProcessQueue: false,
          url: 'https://',
          thumbnailWidth: 150,
          maxFilesize: 20,
          // headers: { "My-Awesome-Header": "header value" },
          // dictDefaultMessage: 'Check',
          // previewTemplate: document.querySelector('#template-container').innerHTML
          dictDefaultMessage: ``
      },
      loading: false,
      productImageUrl: '',
      productDeliveryFile: {},
      heading: '',
      description: 'This is awesome.',
      secondaryHeading: 'Get it now!',
      redirectURL: '',
      callToActionText: 'Get It Now',
      productType: '',
      addFile: true,
      addURL: false,
      created: '',
      modified: '',
      ownerId: null,
      productId: Math.floor(Math.random() * 100000000000),
      uniqueProductId: null,
      public: false,
      deleted: false,
      showCopied: false,
      salePrice: [],
      saleDateRange: [],
      useScheduleRange: 0,
      calendarEventDateRange: [],
      calendarEventFutureTime: null,
      calendarEventFutureTimePeriod: 'day',
      calendarEventMinimumNoticeTime: null,
      calendarEventMinimumNoticeTimePeriod: 'day',
      calendarEventDailyLimit: null,
      showScheduleEditor: false,
      mySchedules: {},
      selectedSchedule: false

    }
  },
  props: ['items', 'showProductEditor', 'editingProductId', 'productInitialType'],
  components: {
    StepMarkers,
    ServiceTypeSelector,
    ProductEditorDetails,
    ProductEditorFulfillment,
    ProductEditorActions,
    ScheduleEditor
  },
  methods: {
    saveSchedules (data) {
      this.$store.dispatch('AUTH.saveSchedules', data).then((res) => {
        console.log('saveSchedules', res)
        if (res.status == 200) {
          this.showScheduleEditor = false
        }
      })
    },
    setScheduleData (data) {
      this.$store.dispatch('AUTH.setScheduleData', data)
    },
    openScheduleEditor (selectedSchedule) {
      console.log('openScheduleEditor', selectedSchedule)
      this.showScheduleEditor = selectedSchedule
    },
    closeScheduleEditor () {
      this.showScheduleEditor = false
    },
    addAppointmentTime (data) {
      let appointmentLengths = this.appointmentLengths
      appointmentLengths.push(data)
      this.appointmentLengths = appointmentLengths
    },
    removeAppointmentTime (t) {
      let appointmentLengths = this.appointmentLengths
      appointmentLengths.splice(t, 1)
      this.appointmentLengths = appointmentLengths
    },
    setSelectedSchedule (data) {
      console.log('setSelectedSchedule', data.target.value)
      this.selectedSchedule = data.target.value
    },
    setUseScheduleRange (useScheduleRange) {
      this.useScheduleRange = useScheduleRange
    },
    setCalendarEventFutureTime (data) {
      console.log('setCalendarEventFutureTime', data.target.value)
      this.calendarEventFutureTime = data.target.value
    },
    setCalendarEventFutureTimePeriod (data) {
      console.log('setCalendarEventFutureTimePeriod', data.target.value)
      this.calendarEventFutureTimePeriod = data.target.value
    },
    setCalendarEventMinimumNoticeTime (data) {
      console.log('setCalendarEventMinimumNoticeTime', data.target.value)
      this.calendarEventMinimumNoticeTime = data.target.value
    },
    setCalendarEventMinimumNoticeTimePeriod (data) {
      console.log('setCalendarEventMinimumNoticeTimePeriod', data.target.value)
      this.calendarEventMinimumNoticeTimePeriod = data.target.value
    },
    setCalendarEventDailyLimit (data) {
      console.log('setCalendarEventDailyLimit', data.target.value)
      this.calendarEventDailyLimit = data.target.value
    },
    setCalendarEventDateRange (data) {
      let calendarEventDateRange = [
        data[0].getTime(),
        data[1].getTime()
      ]
      // this.calendarEventDateRange = calendarEventDateRange
      this.calendarEventDateRange = calendarEventDateRange
      console.log('this.calendarEventDateRange', this.calendarEventDateRange)
    },
    setSizeSaleDateRange (data) {
      let s = data.s
      let _sizeSaleDateRange = data.sizeSaleDateRange
      let sizeSaleDateRange = [
        data.sizeSaleDateRange[0].getTime(),
        data.sizeSaleDateRange[1].getTime()
      ]
      let sizes = this.sizes
      sizes[s].sizeSaleDateRange = sizeSaleDateRange
      this.sizes = sizes
      console.log('sizes', this.sizes)
    },
    setSizeName (data) {
      console.log('......name', data)
      let s = data.s
      let name = data.name
      let sizes = this.sizes
      sizes[s].name = name
      this.sizes = sizes
    },
    setProductSku (data) {
      console.log('......sku', data)
      let s = data.s
      let sku = data.sku
      let sizes = this.sizes
      sizes[s].sku = sku
      this.sizes = sizes
    },


    setPrice (data) {
      console.log('......price', data)
      this.price = data
    },
    setSalePrice (data) {
      console.log('......salePrice', data)
      this.salePrice = data
    },
    setFreeProduct (data) {
      console.log('......freeProduct', data)
      this.freeProduct = data
    },
    setSaleDateRange (data) {
      console.log('......saleDateRange', data)
      this.saleDateRange = [data[0].getTime(), data[1].getTime()]
    },
    setSizePrice (data) {
      console.log('......price', data)
      let s = data.s
      let price = data.price
      let sizes = this.sizes
      sizes[s].price = price
      this.sizes = sizes
    },
    setSizeSalePrice (data) {
      console.log('......salePrice', data)
      let s = data.s
      let salePrice = data.salePrice
      let sizes = this.sizes
      sizes[s].salePrice = salePrice
      this.sizes = sizes
    },
    setSizeFreeProduct (data) {
      console.log('......freeProduct', data)
      let s = data.s
      let freeProduct = data.freeProduct
      let sizes = this.sizes
      sizes[s].freeProduct = freeProduct
      this.sizes = sizes
    },
    setSizeStock (data) {
      console.log('......setSizeStock', data)
      let s = data.s
      let stock = data.stock
      let sizes = this.sizes
      sizes[s].stock = stock
      this.sizes = sizes
    },
    setSizeWeight (data) {
      console.log('......setSizeWeight', data)
      let s = data.s
      let weight = data.weight
      let sizes = this.sizes
      sizes[s].weightLb = weight
      this.sizes = sizes
      console.log('sizes', this.sizes)
    },
    changeHeading (event) {
      let newString = event.target.value
      this.heading = newString
    },
    changeDescription (event) {
      let newString = event.target.value
      console.log('changeDescription newString', newString)
      this.description = newString
    },
    changeProductImages (url) {
      console.log('changeProductImages', url)
      this.productImageUrl = url
    },
    changeRedirectUrl (url) {
      let newString = event.target.value
      console.log('changeRedirectUrl', newString)
      this.redirectURL = newString
    },
    setProductDeliveryFile (data) {
      // let newString = data.url
      console.log('setProductDeliveryFile', data, data.url)
      this.productDeliveryFile = data
    },
    addProduct () {
      this.saving = true
      console.log('addProduct', Object.keys(this.items).length)
      let productToAdd = this.uniqueProductId
      this.$store.dispatch('AUTH.addProductToStore', {
        productId: this.uniqueProductId,
        position: Object.keys(this.items).length
      }).then((res) => {
        console.log('addProduct result', res.url)
        // this.selectedOption = ''
        this.saving = false
        this.closeProductEditor()
        // this.showProductEditor = this.uniqueProductId
        // this.$emit('openProductEditor', this.uniqueProductId)
        // this.getMyPublicStore()
        // this.showAddNew = false
      }).catch((error) => {
      })
    },
    saveProduct (activate, override) {
      console.log('saveProduct', activate, override)
      console.log('this.heading', this.heading)
      console.log('this.heading ==', this.heading == '')
      console.log('this.description', this.description)
      this.setError(false)
      if (this.heading == '') {
        this.setError('heading', 'The heading cannot be empty.')
        return false
      } else if (this.description == '') {
        this.setError('description', 'Please enter a description.')
        return false
      }

      // else if (this.callToActionText == '') {
      //   this.setProductError('validation-call-to-action', 'The call to action cannot be empty.')
      //   return false
      // } else if (this.weightLb < 0) {
      //   this.setProductError('validation-weight', 'The weight cannot be less than 0.')
      //   return false
      // }

      return new Promise(async (resolve, reject) => {
        console.log('HERE', override, this.$store.getters['AUTH.myConnectId'])
        if (!override) {
          console.log('b')
          if (!(this.$store.getters['AUTH.myConnectId'] && this.$store.getters['AUTH.myConnectId'].verified)) {
            console.log('c')
            if (this.productType == 'calendar-event') {
              console.log('event')
              let appointmentLengths = this.appointmentLengths
              for (let l in appointmentLengths) {
                let _l = appointmentLengths[l]
                if (parseFloat(_l.price) > 0) {
                  console.log('2', _l)
                  this.confirmSaveAndOnboard()
                  return false
                }
              }
              // check if even is paid
            } else if (this.productType == 'physical-product') {
              console.log('physical product')
              this.confirmSaveAndOnboard()
              return false
            } else {
              if (this.price > 0) {
                this.confirmSaveAndOnboard()
                return false
              }
            }
          }
        }
        console.log('saveProduct 2')

        this.saving = true

        let productObject = {
          subscriptionProducts: this.subscriptionProducts,
          physicalProductSubscriptionCanBeCustomized: this.physicalProductSubscriptionCanBeCustomized,
          sizes: this.sizes,
          calendarFrom: this.calendarFrom,
          calendarTo: this.calendarTo,
          myTimezone: this.myTimezone,
          appointmentLength: this.appointmentLength,
          appointmentLengths: this.appointmentLengths,
          customAppointmentLengths: this.customAppointmentLengths,
          heading: this.heading,
          price: this.price,
          description: this.description,
          secondaryHeading: this.secondaryHeading,
          redirectURL: this.redirectURL,
          callToActionText: this.callToActionText,
          addFile: this.addFile,
          addURL: this.addURL,
          created: this.created,
          modified: this.modified,
          productType: this.productType,
          productImageUrl: this.productImageUrl,
          uniqueProductId: this.uniqueProductId,
          productDeliveryFile: this.productDeliveryFile,
          productId: this.productId,
          productSku: this.productSku,
          freeProduct: this.freeProduct,
          weightLb: this.weightLb,
          myShippingProviders: this.myShippingProviders,
          myShippingRates: this.myShippingRates,
          fulfillMyself: this.fulfillMyself,
          useMyNetwork: this.useMyNetwork,
          fulfillMyselfOptions: this.fulfillMyselfOptions,
          fulfillAutomaticallyOptions: this.fulfillAutomaticallyOptions,
          salePrice: this.salePrice,
          saleDateRange: this.saleDateRange,
          calendarEventFutureTime: this.calendarEventFutureTime,
          calendarEventFutureTimePeriod: this.calendarEventFutureTimePeriod,
          calendarEventMinimumNoticeTime: this.calendarEventMinimumNoticeTime,
          calendarEventMinimumNoticeTimePeriod: this.calendarEventMinimumNoticeTimePeriod,
          calendarEventDailyLimit: this.calendarEventDailyLimit,
          selectedSchedule: this.selectedSchedule,
          useScheduleRange: this.useScheduleRange,
          calendarEventDateRange: this.calendarEventDateRange
        }
        if (activate) {
          productObject.public = true
        }

        console.log('object to save', productObject)
        // return false

        this.$store.dispatch('AUTH.saveProduct', productObject).then((res) => {
          let product = res
          if (res.uniqueProductId) {
            console.log('saveProduct result', res)
            for (let i in product) {
              this[i] = product[i]
            }
            this.saving = false

            if (this.currentStep == 3) {
              if (this.addingOrEditing()) {
                this.addProduct()
              } else {
                this.closeProductEditor()
              }
            } else if (this.currentStep == 2) {
              this.currentStep = 3
            }

            return resolve(true)
          }
        })
      })
    },
    confirmSaveAndOnboard () {
      let popup = {
        heading: 'Ready to get paid?',
        text: 'Connect an account to receive funds',
        callToAction: 'Save product and link account',
        callToAction2: 'Save product',
        action: async () => {
          console.log('action1a saveProduct')
          await this.saveProduct(false, true)
          console.log('action1b saveProduct')
          this.$store.dispatch('AUTH.setGlobalPopup', {})
          this.openOnboardingPopup()
        },
        action2: async () => {
          console.log('action2 saveProduct')
          this.saveProduct(false, true)
        },
        loadingSpinner: true
      }

      console.log('**** ABCD ****')
      this.$store.dispatch('AUTH.setGlobalPopup', popup)
    },
    openOnboardingPopup () {
      console.log('openOnboardingPopup')
      this.$store.dispatch('AUTH.setOnboardingPopup', {open: true})
    },
    clickedStep1 () {
      console.log('clickedStep1', this.showLinkEditor)
      if (this.addingOrEditing()) {
        console.log('this.addingOrEditing')
        this.goBackToStep1()
      } else {
        //
      }
    },
    clickedStep2 () {
      if (this.currentStep == 1) {
        //
      } else if (this.currentStep == 2) {
        //
      } else if (this.currentStep == 3) {
        this.currentStep = 2
      }
    },
    clickedStep3 () {
      if (this.currentStep == 1) {
        //
      } else {
        this.continueToStep3()
      }
    },
    goBackAStep () {
      if (this.currentStep == 2) {
        this.goBackToStep1()
      } else if (this.currentStep == 3) {
        this.goBackToStep2()
      }
    },
    goBackToStep1 () {
      this.currentStep = 1
    },
    goBackToStep2 () {
      this.currentStep = 2
    },
    startNewProductWithType (type, id) {
      // this.productType = type
      this.productType = type.type || type
      console.log('productType is now', type)
      this.currentStep = 2
    },
    continueToStep3 () {
      this.saveProduct()
    },
    saveOnLastStep () {
      console.log('saveOnLastStep', this.addingOrEditing())
      this.saveProduct(true)
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
    uploadedImage (data) {
      console.log('setting url', data.url)
      this.linkImage = data.url
    },
    removeImage () {
      console.log('removing image')
      this.linkImage = ''
    },
    validateData () {
      this.setError(false)
      if (this.linkText == '') {
        this.setError('linkText', 'Please enter a link title.')
        return false
      } else if (this.linkUrl == '') {
        this.setError('linkUrl', 'Please enter a link destination.')
        return false
      } else if (!this.isValidUrl(this.linkUrl)) {
        this.setError('linkUrl', 'Please enter a valid url.')
        return false
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
        this.closeProductEditor()
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
      // console.log('saveLink', this.showLinkEditor.i)

      // if (!this.validateData()) {
      //   return false
      // }

      // this.saving = true

      // let link = {
      //   linkText: this.linkText,
      //   linkUrl: this.linkUrl,
      //   linkImage: this.linkImage
      // }
      // this.$store.dispatch('AUTH.saveLink', {
      //   linkIndex: this.showLinkEditor.i,
      //   link
      // }).then((res) => {
      //   console.log('new link added')
      //   this.closeProductEditor()
      //   this.saving = false
      //   this.setError(false)
      //   this.$emit('reloadStore')
      // })
    },
    deleteLink () {
      // this.deleting = true
      // this.setError(false)
      
      // console.log('deleteLink', this.showLinkEditor.i)
      // this.$store.dispatch('AUTH.deleteLink', {
      //   linkIndex: this.showLinkEditor.i
      // }).then((res) => {
      //   console.log('new link added')
      //   this.closeProductEditor()
      //   this.deleting = false
      //   this.$emit('reloadStore')
      // })
    },
    addingOrEditing () { // true, false if editing
      return this.showProductEditor == 'new'
    },
    closeProductEditor () {
      this.$emit('closeProductEditor')
    },
    stopProp (event) {
      event && event.stopPropagation()
    },
    getMySchedules () {
      console.log('getMySchedules')
      this.$store.dispatch('AUTH.getMySchedules').then((res) => {
        this.mySchedules = res || {}
        // this.selectedSchedule = Object.keys(res || {})[0] || false
      })
    },
    getProductData (productId) {
      console.log('getProductData', productId)
      if (productId) {
        this.$store.dispatch('AUTH.getProductDetails', productId).then((product) => {
          for (let i in product) {
            this[i] = product[i]
          }
        })
      }
    }
  },
  computed: {

  },
  created () {
  },
  mounted () {
    console.log('opened link editor', this.addingOrEditing() ? 'adding' : 'editing')
    if (this.addingOrEditing()) {
      if (this.productInitialType) {
        console.log('this.productInitialType', this.productInitialType)
        this.startNewProductWithType(this.productInitialType)
      }
      // this.linkText = ''
      // this.linkUrl = ''
      // this.linkImage = ''
    } else {
      let i = this.showProductEditor
      console.log('i', i)
      this.getProductData(i)
      this.currentStep = 2
      // this.linkText = this.links[i].heading || ''
      // this.linkUrl = this.links[i].url || ''
      // this.linkImage = this.links[i].image || ''
    }
    this.getMySchedules()
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
      padding: 48px 32px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      max-height: calc(100vh - 100px);
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
    .add-link-box {
      max-height: unset;
    }
  }


  .x-close {
    top: 16px;
    right: 16px;
    cursor: pointer;
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
  .add-product-steps {
    margin-top: 48px;
  }
  .editor-heading {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
  }
  .product-details-default {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .mt24 {
    margin-top: 24px;
  }
  .schedule-editor-wrapper {
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    width: 100%;
    height: 100%;
  }
  .wide-wrapper {
    max-width: 700px;
  }
</style>
