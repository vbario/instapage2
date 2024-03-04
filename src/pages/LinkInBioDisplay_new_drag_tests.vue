<template>
  <div class="landing-wrapper df fdc aic f1 w100p" @click="closeEmailCollection()">
    <div
      class="flash-info-modal joined-mailing-list"
      :style="'opacity: 0; display: none;'"
      ref="joinedMailingList">
      <p>Joined mailing list!</p>
    </div>
    <div
      class="flash-info-modal joined-mailing-list"
      :style="'opacity: 0; display: none;'"
      ref="sentMessage">
      <p>Message sent!</p>
    </div>
    <LinkEditor v-if="showLinkEditor"
                :links="sellerData.links"
                :showLinkEditor="showLinkEditor"
                @reloadStore="getStoreData"
                @closeLinkEditor="closeLinkEditor" />
    <TitleEditor v-if="showTitleEditor"
                :numberOfItemsInStore="Object.keys(sellerData.items).length"
                :showTitleEditor="showTitleEditor"
                :data="sellerData.items[showTitleEditor.i]"
                @reloadStore="getStoreData"
                @closeTitleEditor="closeTitleEditor" />
    <ProductEditor v-if="showProductEditor"
                :items="sellerData.items"
                :showProductEditor="showProductEditor"
                @reloadStore="getStoreData"
                @closeProductEditor="closeProductEditor" />
    <MailingListModal v-if="showingMailingListModal"
                :ownerId="sellerData.ownerId"
                @closeMailingListModal="closeMailingListModal"
                @flashJoinedMailingList="flashJoinedMailingList" />
    <ContactUsModal v-if="showingContactUsModal"
                :ownerId="sellerData.ownerId"
                @closeContactUsModal="closeContactUsModal"
                @flashSubmittedContactForm="flashSubmittedContactForm" />
    
    <CartIcon @showCart="showCart" />
    <OpenCart v-if="cartIsOpen"
              :shippingByOwner="shippingByOwner"
              :setShippingByOwner="setShippingByOwner"
              @showCart="showCart"
              @reduceQuantity="reduceQuantity"
              @increaseQuantity="increaseQuantity" />
    <OpenItemOptions v-if="openedItemOptions || (openedItemOptions === 0)"
      @openItemOptions="openItemOptions"
      @removeProductDeliveryFile="removeProductDeliveryFile"
      @uploadedProductDeliveryFile="uploadedProductDeliveryFile"
      @addToCart="addToCart"
      @changeInstructions="changeInstructions"
      @changeNewItemSize="changeNewItemSize"
      @changeNewItemQuantity="changeNewItemQuantity"
      :sellerData="sellerData"
      :openedItemOptions="openedItemOptions"
      :readyToAddToCart="readyToAddToCart"
      :newItemSize="newItemSize"
      :setNewAppointmentDate="setNewAppointmentDate"
      :readyToAdd="readyToAdd"
      :instructions="instructions"
      :productDeliveryFile="productDeliveryFile"
      :newItemQuantity="newItemQuantity" />
    
    <div class="w100p df fdc aic content-section">
      <Banner
        @editStore="editStore"
        @openLinkEditor="openLinkEditor"
        @openTitleEditor="openTitleEditor"
        @openProductEditor="openProductEditor"
        @viewStore="viewStore"
        @setTab="setTab"
        :openTab="openTab"
        :displayName="sellerData.displayName"
        :editingMyStore="editingMyStore"
        :ownerId="sellerData.ownerId"
        :profileImageUrl="sellerData.profileImageUrl"
        :banner="sellerData.banner" />
      <Links v-if="openTab == 'store'" :editingMyStore="editingMyStore"
             :loaded="loaded"
             :links="sellerData.links"
              @draggingLink="draggingLink"
              @openLinkEditor="openLinkEditor"
              @showMailingListModal="showMailingListModal"
              @showContactUsModal="showContactUsModal" />
      <hr v-if="openTab == 'store'" class="hr-x">
      <div v-if="openTab == 'store'" class="link-in-bio-grid-wrapper">
        
        <Container
          v-for="(product, p) in sellerData.items"
          v-if="showProduct(product)"
          class="link-in-bio-grid group"
          :get-child-payload="()=>{return {name: 'Test title'}}"
          group-name="group1"
          :orientation="'horizontal'"
          :drag-begin-delay="200"
          :auto-scroll-enabled="true"
          :animation-duration="250">
          <p class="section-title">{{product.text}}</p>

          <Draggable
            v-for="(product2, p2) in sellerData.items"
            v-if="(product2.type !== 'text') && (p2 > p)"
            class="draggable-item"
            :class="cardClasses(product2, p2)"
            :style="cardStyles(product2, p2)">
            <div class="w100p h100p df fdc jcc aic curp" :id="p2"
              v-if="showProduct2(product2)">
              <div if="product2.productImage" class="w100p link-in-bio-grid-item pen" v-bind:style="backgroundStyle(product2.productImage)">
                <ButtonWithMenu2
                  v-if="editingMyStore"
                  class="card-menu-button-position"
                  :p="p2"
                  @deleteItem="deleteItem"/>
              </div>
              <div class="link-in-bio-grid-item-text w100p df fdc f1" v-if="collectEmail !== product2.productId">
                <p :style="product2.type == 'buy' ? '' : ''" class="text-dark fw500 link-in-bio-grid-item-title pen">
                  {{product2.title}}
                </p>
                <p :style="product.type == 'buy' ? '' : ''" class="product-price text-dark fw400 card-price pen">
                  {{product2.price ? '$' + product2.price : 'free'}}
                </p>
              </div>
            </div>
          </Draggable>

        </Container>
        <div class="link-in-bio-grid">
          <div v-for="(product, p) in sellerData.items"
            :class="cardClasses(product, p)"
            :style="cardStyles(product, p)">
            <!-- When Title -->
            <div class="w100p df aic posrel" v-if="showProduct(product)">
              <p :class="{
                'collect-email-title': product.productType == 'collect-email',
              }" class="w100p _title" v-if="collectEmail !== product.productId">{{product.title || product.text}}</p>
              <ButtonWithMenu3
                v-if="editingMyStore"
                class="list-menu-button-position"
                :p="p"
                @openTitleEditor="openTitleEditor"
                @deleteItem="deleteItem"/>
            </div>
            <!-- When Grid Item -->
            <div class="w100p h100p df fdc jcc aic curp" :id="p"
              v-if="showProduct2(product)">
              <div if="product.productImage" class="w100p link-in-bio-grid-item pen" v-bind:style="backgroundStyle(product.productImage)">
                <ButtonWithMenu2
                  v-if="editingMyStore"
                  class="card-menu-button-position"
                  :p="p"
                  @deleteItem="deleteItem"/>
              </div>
              <div class="link-in-bio-grid-item-text w100p df fdc f1" v-if="collectEmail !== product.productId">
                <p :style="product.type == 'buy' ? '' : ''" class="text-dark fw500 link-in-bio-grid-item-title pen">
                  {{product.title}}
                </p>
                <p :style="product.type == 'buy' ? '' : ''" class="product-price text-dark fw400 card-price pen">
                  {{product.price ? '$' + product.price : 'free'}}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div v-if="openTab == 'settings'" class="w100p settings">
      <Settings/>
    </div>
    <div v-if="openTab == 'more'" class="w100p settings">
      <More/>
    </div>
    <div v-if="openTab == 'fulfillment'" class="w100p settings">
      <Fulfillment/>
    </div>
    
    <PushableBranding />
    <FullPageSpinner v-if="loading"/>
  </div>
</template>

<script>

import router from '@/router'
import paths from '@/util/paths'
import LandingProduct from '@/components/LandingProduct'
import CartIcon from '@/components/cart/CartIcon'
import OpenCart from '@/components/cart/OpenCart'
import OpenItemOptions from '@/components/cart/OpenItemOptions'
import BannerWithTag from '@/components/store/BannerWithTag'
import Banner from '@/components/store/BannerStyle2'
import Links from '@/components/store/Links'
import LinkEditor from '@/components/store/LinkEditor'
import TitleEditor from '@/components/store/TitleEditor'
import ProductEditor from '@/components/store/ProductEditor'
import FullPageSpinner from '@/components/common/FullPageSpinner'
import PushableBranding from '@/components/common/PushableBranding'
import ButtonWithMenu2 from '@/components/common/ButtonWithMenu2'
import ButtonWithMenu3 from '@/components/common/ButtonWithMenu3'
import MailingListModal from '@/components/common/MailingListModal'
import ContactUsModal from '@/components/common/ContactUsModal'
import More from '@/pages/More'
import Settings from '@/pages/Settings'
import Fulfillment from '@/pages/Fulfillment'

import { Container, Draggable } from "vue-smooth-dnd";

export default {
  name: 'LinkInBioDisplay',
  data () {
    return {
      newAppointment: {},
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
      loaded: false,
      income: [],
      displayStyle: 'list',
      boxesAcross: 3,
      boxHeight: 250,
      sellerData: {
        loaded: false
      },
      instructions: '',
      productDeliveryFile: '',
      editingMyStore: false,
      showCardEditMenu: false,
      showLinkEditor: false,
      showTitleEditor: false,
      showProductEditor: false,
      showingMailingListModal: false,
      showingContactUsModal: false,
      draggingItem: false,
      draggingOver: false,
      itemDropped: false,
      draggingLinkNow: false,
      openTab: 'store'
    }
  },
  props: ['mode'],
  components: {
    LandingProduct,
    CartIcon,
    OpenCart,
    OpenItemOptions,
    BannerWithTag,
    Banner,
    Links,
    LinkEditor,
    TitleEditor,
    ProductEditor,
    FullPageSpinner,
    PushableBranding,
    ButtonWithMenu2,
    ButtonWithMenu3,
    MailingListModal,
    ContactUsModal,
    Container,
    Draggable,
    More,
    Settings,
    Fulfillment
  },
  methods: {
    nextTitleIndex (p) {
      let items = this.sellerData.items
      items = items.slice(p)
      let nextTitleItem = items.filter((v) => {
        return (v.type == 'text')
      })[0]
      if (nextTitleItem) {
        let nextIndexOfTitle = items.indexOf(nextTitleItem)
        return nextIndexOfTitle
      }
      return 999999999999999999999
    },
    setTab (openTab) {
      this.openTab = openTab
    },
    handleContextMenu (event, p) {
      console.log('handleContextMenu', event, p)
      event && event.preventDefault()
      // this.draggingLinkNow = draggingLinkNow
    },
    handleDragB (event, p) {
      console.log('handleDragB', p)
      if (this.editingMyStore && !this.draggingLinkNow) {
        console.log('itemDragEnter', '-', p)
        setTimeout(() => {
          this.draggingOver = p
        }, 50)
      }
      // event && event.preventDefault()
      // this.draggingLinkNow = draggingLinkNow
    },
    draggingLink (draggingLinkNow) {
      this.draggingLinkNow = draggingLinkNow
    },
    itemDragEnter (event, type, p) {
      if (this.editingMyStore && !this.draggingLinkNow && (this.draggingItem || (this.draggingItem === 0))) {
        console.log('itemDragEnter', type, p)
        setTimeout(() => {
          this.draggingOver = p
        }, 50)
      }
    },
    itemDragLeave (event, type, p) {
      if (this.editingMyStore && !this.draggingLinkNow && !this.draggingLinkNow) {
        console.log('itemDragLeave', type, p)
        this.draggingOver = false
      }
    },
    itemDrop (event, type, p) {
      console.log('itemDrop', type, p)
      if (this.editingMyStore && !this.draggingLinkNow) {
        this.itemDropped = p
        this.draggingOver = false
      }
    },
    dragStart (event, type, p) {
      console.log('dragStart ***', type, p)
      if (this.editingMyStore && !this.draggingLinkNow) {
        console.log('dragStart', type, p)
        this.itemDropped = false
        this.draggingItem = p
      }
    },
    dragEnd (event, type, p) {
      console.log('dragEnd', type, p)
      if (this.editingMyStore && !this.draggingLinkNow) {
        console.log('dragEnd2')
        if (this.itemDropped || (this.itemDropped === 0)) {
          console.log('move item', p, 'to', this.itemDropped)
          this.moveItemFromXtoY(p, this.itemDropped)
        } else if (event.changedTouches) {
          console.log('event.changedTouches', event.changedTouches)
          let x = event.changedTouches[0].clientX
          let y = event.changedTouches[0].clientY
          console.log('x, y', x, y)
          if (x && y) {
            let droppedOnElement = document.elementFromPoint(x, y);
            console.log('droppedOnElement', droppedOnElement)
            if (droppedOnElement) {
              let droppedOnElementPosition = parseInt(droppedOnElement.id)
              console.log('droppedOnElementPosition', droppedOnElementPosition)
              console.log('move item 2: from', p, 'to', droppedOnElementPosition)
              console.log('types', isNaN(p), isNaN(droppedOnElementPosition))

              if (!isNaN(p) && !isNaN(droppedOnElementPosition)) {
                this.moveItemFromXtoY(p, droppedOnElementPosition)
              }
            }
          }
        } 
        this.draggingItem = false
        this.draggingOver = false
      }
    },
    // dragEnd (event, type, p) {
    //   console.log('dragEnd', type, p)
    //   if (this.editingMyStore && !this.draggingLinkNow) {
    //     console.log('dragEnd2', this.itemDropped, event)

    //     // get element over which we dropped
    //     if (event.changedTouches) {
    //       let x = event.changedTouches[0].clientX
    //       let y = event.changedTouches[0].clientY
    //       console.log('x, y', x, y)
    //       if (x && y) {
    //         let droppedOnElement = document.elementFromPoint(x, y);
    //         console.log('droppedOnElement', droppedOnElement)
    //         if (droppedOnElement) {
    //           let droppedOnElementPosition = parseInt(droppedOnElement.id)
    //           console.log('droppedOnElementPosition', droppedOnElementPosition)
    //           console.log('move item 2: from', p, 'to', droppedOnElementPosition)
    //           this.moveItemFromXtoY(p, droppedOnElementPosition)
    //         }
    //       }
    //     } else {
    //       if (this.itemDropped || (this.itemDropped === 0)) {
    //         console.log('move item', p, 'to', this.itemDropped)
    //         this.moveItemFromXtoY(p, this.itemDropped)
    //       }
    //       this.draggingItem = false
    //       this.draggingOver = false
    //     }

    //   }
    // },
    moveItemFromXtoY (x, y) {
      // this.adding = true
      // let productToAdd = this.fulfillmentsOrders[this.selectedProductToAdd]

      console.log('moveItemFromXtoY')
      console.log('move item from x to 1 before y')

      let xgy = x < y

      if (xgy) {
        console.log('adjust by 1')
        y = y - 1
      }

      this.$store.dispatch('AUTH.moveItemFromXtoY', {
        x, y
      }).then((res) => {
        console.log('moveItemFromXtoY result', res)
        this.getStoreData()
        this.draggingItem = false
        this.draggingOver = false
        // this.adding = false
        // this.getMyPublicStore()
        // this.showAddNew = false
        // this.showProductOptions = ''
      }).catch((error) => {
      })
    },
    flashJoinedMailingList () {
      let joinedMailingList = this.$refs.joinedMailingList
      joinedMailingList.style.opacity = 1
      joinedMailingList.style.display = 'flex'

      setTimeout(() => {
        joinedMailingList.style.opacity = 0
        setTimeout(() => {
          joinedMailingList.style.display = 'none'
        }, 500)
      }, 1000)
    },
    flashSubmittedContactForm () {
      let sentMessage = this.$refs.sentMessage
      sentMessage.style.opacity = 1
      sentMessage.style.display = 'flex'

      setTimeout(() => {
        sentMessage.style.opacity = 0
        setTimeout(() => {
          sentMessage.style.display = 'none'
        }, 500)
      }, 1000)
    },
    closeLinkEditor () {
      this.showLinkEditor = false
    },
    closeTitleEditor () {
      this.showTitleEditor = false
    },
    closeProductEditor () {
      this.showProductEditor = false
    },
    closeMailingListModal () {
      this.showingMailingListModal = false
    },
    closeContactUsModal () {
      this.showingContactUsModal = false
    },
    openLinkEditor (i) {
      console.log('openLinkEditor', i)
      this.showLinkEditor = i
    },
    openTitleEditor (i) {
      console.log('openTitleEditor 2', i)
      this.showTitleEditor = i
    },
    openProductEditor (i) {
      console.log('openProductEditor 2', i)
      this.showProductEditor = i
    },
    deleteItem (i) {
      console.log('deleteItem', i, this.sellerData.items[i.i].key)
      // this.showTitleEditor = i
      let itemKey = this.sellerData.items[i.i].key
      if (itemKey) {
        this.removeItemFromStore(itemKey)
      }
    },
    removeItemFromStore (productId) {
      this.$store.dispatch('AUTH.removeItemFromStore', {
        productId
      }).then((res) => {
        console.log('removeItemFromStore result', res)
        this.getStoreData()
      }).catch((error) => {
      })
    },
    showMailingListModal () {
      console.log('showMailingListModal')
      this.showingMailingListModal = true
    },
    showContactUsModal () {
      console.log('showContactUsModal')
      this.showingContactUsModal = true
    },
    openCardEditMenu (event, p) {
      event.stopPropagation()
      this.showCardEditMenu = p
    },
    editStore () {
      this.editingMyStore = true
    },
    viewStore () {
      this.editingMyStore = false
    },
    cardClasses (product, p) {
      let draggingClass = ''
      let draggingOverClass = ''
      if (this.draggingItem === p) {
        draggingClass = ' dragging-item-now'
      }
      if (this.draggingOver === p) {
        draggingOverClass = ' dragging-over-item-now'
      }

      return {
        ['link-in-bio-grid-item-wrapper df fdc posrel' + draggingClass + draggingOverClass]: (product.type == 'buy') && !(product.productType == 'collect-email'),
        ['link-in-bio-list-item df jcc aic fz20p posrel' + draggingClass + draggingOverClass]: (product.type !=='buy') || (product.productType == 'collect-email'),
        ['text-block' + draggingClass]: (product.type == 'text') || (product.type == 'extra'),
        ['link-in-bio-list-item-expanded' + draggingClass]: this.expandedListItems.indexOf(p) > -1,
      }
    },
    cardStyles (product, p) {
      let totalItems = this.sellerData.items ? Object.keys(this.sellerData.items).length : 0
      let positionFromEnd = totalItems - p

      let style = 'z-index: '
      style = style + positionFromEnd + 5
      style = style + ';'
      return style
    },
    cardClick (product, p) {
      ((product.type == 'buy') && !(product.productType == 'collect-email')) ? this.openItemOptions(p) : ((product.type =='link') ? this.goToLink(product.url, true, product.key) : null)
    },
    showProduct (product) {
      return ((product.type !== 'buy') && (product.type !== 'buy')) || ((product.productType == 'collect-email') && (this.collectEmail !== product.productId))
    },
    showProduct2 (product) {
      return (this.collectEmail !== product.productId) && (product.type == 'buy')
    },
    changeInstructions (instructions) {
      this.instructions = instructions
    },
    changeNewItemSize (newItemSize) {
      this.newItemSize = newItemSize
    },
    changeNewItemQuantity (newItemQuantity) {
      this.newItemQuantity = newItemQuantity
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
        if (res.status == '200') {
          this.collectEmail = false
          this.yourEmail = ''
        }
        this.submittingEmail = false
      })
    },
    addToCart (productId) {
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

      this.$store.dispatch('AUTH.addToCart', cartItemData).then(async (res) => {
        if (res == 'ok') {
          this.openItemOptions(false)
          this.newItemSize = 0
          this.newItemQuantity = 1
        }
      })
    },
    startCollectEmail (event, productId) {
      event.stopPropagation()
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
      let first7 = route.substring(0, 7)
      let first8 = route.substring(0, 8)
      if (first7 == 'http://') {
        window.location.assign(route)
      } else if (first8 == 'https://') {
        window.location.assign(route)
      } else {
        window.location.assign('https://' + route)
      }

      if (linkId) {
        this.countLinkClick(linkId)
      }
    },
    countStoreView () {
      this.$store.dispatch('AUTH.countStoreView', {}).then((res) => {
      })
    },
    countLinkClick (id) {
      this.$store.dispatch('AUTH.countLinkClick', {id}).then((res) => {
      })
    },
    getStoreData (params) {
      console.log('params', params)
      let scrollLinksToEnd = params ? params.scrollLinksToEnd : false
      this.$store.dispatch('AUTH.getStoreData', {
        sellerUsername: this.$route.params.user
      }).then((res) => {
        let data = res || {}

        let items = res.items
        let array = []
        for (let i in items) {
          array.push({...items[i], key: i})
        }
        array = array.sort((a, b) => a.position - b.position)
        let _res = {...res, items: array}

        this.sellerData = {..._res, loaded: true}
        this.sellerUid = res.sellerId

        this.loading = false
        this.loaded = true

        let linksBox = document.getElementById('links')
        if (linksBox && scrollLinksToEnd) {
          console.log('linksBox', linksBox, scrollLinksToEnd)
          setTimeout(() => {
            linksBox.scrollTo({
              left: 999999999,
              behavior: 'smooth',
            })
          }, 500)
        }
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
        Vue.nextTick(() => {
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
    console.log('* Store Page Created')
    this.getStoreData()
    this.countStoreView()
    window.addEventListener('contextmenu', function (e) { 
      // do something here... 
      e.preventDefault(); 
    }, false);
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  $grey-a: #e1e1e1;
  $grey-b: #757575;
  $padding: 20px;

  .landing-wrapper {
    padding: 19px;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    background-color: #fff;
    background-size: cover;
    background-color: $profile-grey;
  }
  @media (max-width: 800px) {
    .landing-wrapper {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .content-section {
    z-index: 200;
  }

  .link-in-bio-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    z-index: 15;
    padding-left: 30px;
    padding-right: 30px;

    &-wrapper {
      width: 100%;
      max-width: unset;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    &-item {
      width: 100%;
      min-height: 57px;
      background-color: transparent;
      border-radius: 14px;
      border: 2px solid #fff;
      transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
      cursor: pointer;

      .expanded-block {
        display: none;
      }

      &-expanded {
        display: flex;
      }

      &:hover {
        /*transform: scale(1.01);*/
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
        color: #000;
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
    /*display: flex;*/
    /*justify-content: flex-start;*/
    /*flex-wrap: wrap;*/
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
      position: relative;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: $color-white;
      cursor: pointer;
      flex: 4;
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
        background-color: #fff;
        border-radius: $grid-border-radius-1;
        width: calc(#{$grid-item-wrapper-width-1} - #{$grid-gap-1}/2);
        max-height: calc(#{$grid-item-wrapper-height-1} - #{$grid-gap-1}/2 - #{$grid-padding-1}/2);
        min-height: calc(#{$grid-item-wrapper-height-1} - #{$grid-gap-1} + #{$grid-additional-height-1});
        height: calc(#{$grid-item-wrapper-height-1} - #{$grid-gap-1} + #{$grid-additional-height-1});
        max-height: calc(#{$grid-item-wrapper-height-1} - #{$grid-gap-1} + #{$grid-additional-height-1});
        transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
        border: 1px solid #DADADA;
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.09);

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

        p {
          color: #000;
          font-size: 16px;
          font-weight: 600;
          /*text-align: center;*/
        }
      }

      &-title {
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
        }

        &-text {
          padding-top: 8px;
          height: 32%;
          min-height: 32%;
          max-height: 32%;
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
        &-wrapper {
          border-radius: $grid-border-radius-3;
          width: calc(#{$grid-item-wrapper-width-3} - #{$grid-gap-3}*(3/4));
          min-height: calc(#{$grid-item-wrapper-height-3} + #{$grid-additional-height-3});
          height: calc(#{$grid-item-wrapper-height-3} + #{$grid-additional-height-3});
          max-height: calc(#{$grid-item-wrapper-height-3} + #{$grid-additional-height-3});
        }

        &-title {
        }

        &-text {
        }
      }
    }
  }
  @media (min-width: calc(#{$grid-max-width} + 2 * #{$grid-padding-3})) {
    .link-in-bio-grid {
      &-item {
        &-wrapper {
          border-radius: $grid-border-radius-3;
          width: calc(#{$grid-item-wrapper-width-4} - #{$grid-gap-3}*(3/4) - #{$grid-padding-3}*(2/4));
          min-height: calc(#{$grid-item-wrapper-height-4} + #{$grid-additional-height-4});
          height: calc(#{$grid-item-wrapper-height-4} + #{$grid-additional-height-4});
          max-height: calc(#{$grid-item-wrapper-height-4} + #{$grid-additional-height-4});
        }
        &-title {
        }
        &-text {
        }
      }
    }
  }

  .fz20p {
    font-size: 20px;
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
  .list-item-icon {
    color: #fff;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .text-block {
    background-color: transparent !important;
    margin-bottom: -8px;
    p {
      font-size: 20px;
    }
  }
  .color-white {
    color: $color-white !important;
  }
  @media (max-width: 480px) {
    .link-in-bio-list {
      padding-left: 15px;
      padding-right: 15px;
    }
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
    }

    .more-icon-grid {
    }

    .link-in-bio-grid-item {
      height: 100%;
    }
  }
  .list-item-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    min-width: unset;
  }
  .fw400 {
    font-weight: 400 !important;
  }
  .product-price {
    font-size: 14px !important;
  }
  .card-price {
    font-size: 12px !important;
    color: #5C5C5C !important;
  }
  .h100p {
    height: 100%;
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
  @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
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

  .card-menu-button-position {
    position: absolute;
    right: 12px;
    top: 12px;
  }

  .list-menu-button-position {
    margin-left: 10px;
    /*position: absolute;*/
    /*right: 12px;*/
    /*top: 50%;*/
    /*transform: translateY(-50%);*/
  }

  .flash-info-modal {
    position: absolute;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid #000;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1200;
    pointer-events: none;
    transition: opacity 0.5s ease;

    p {
      color: #000;
    }
  }

  .dragging-item-now {
    &::before {
      content: ' ';
      position: absolute;
      width: calc(100% + 20px);
      height: calc(100% + 20px);
      left: -10px;
      top: -10px;
      border-radius: 15px;
      background-color: #00000022;
    }
  }

  .dragging-over-item-now {
    /*border-top-color: blue !important;*/
    &::after {
      content: ' ';
      position: absolute;
      height: 2px;
      width: 100%;
      top: -10px;
      left: 0;
      background-color: $color-primary;
    }
  }
  .draggable-end {
    height: 50px;
  }

  .pen {
    /*pointer-events: none !important;*/
  }

  ._title {
    max-width: unset !important;
    text-align: left !important;
  }

  .group {
    width: 100%;
    background-color: #ddd;
    margin-bottom: 20px;
    border-radius: 15px;
  }

  .section-title {
    width: 100%;
  }

</style>
