<template>
  <div class="landing-wrapper df fdc aic f1 w100p posrel">

    <!-- <div class="top-bar-global posrel w100p _position1 df jcfs aic only-big">
      <img @click="goTo('/more')" class="go-back-to-my-products curp" src="../../static/images/back.svg" >
      <h2 class="text-dark header-style header-style-big">Shipping</h2>
    </div> -->
    <h2 class="w100p mb10 text-dark header-style header-style-big">My Shipping Rates</h2>
    <hr class="divider">






    <!-- Editing A Zone -->
    <div class="edit-shipping-zone" v-if="editingZone">
      <h3 class="w100p text-dark mb20 df jcsb aic">
        Zone {{Object.keys(myShippingRates.zones || {}).indexOf(editingZone) + 1}}
        <img class="button-menu-item close-icon-2" src="../../static/brand-icons/x-close.svg" @click="editZone($event, '')">
      </h3>
      <p class="fw700">Countries</p>
      <div class="countries w100p df aic fww">
        <p v-if="!myShippingRates.zones[editingZone].countries">No countries selected</p>
        <p class="country" v-for="(country, c) in myShippingRates.zones[editingZone].countries">
          {{countryName(country)[0]}}
          <span class="delete-country" @click="removeCountryFromZone(editingZone, country)">&nbsp;x</span>
        </p>
      </div>
      <p class="fw700 mb10">Add Country</p>
      <select class="select-input mb10" v-model="newCountry">
        <option v-for="(countryOption, co) in countriesList()">{{co}}</option>
      </select>
      <button class="button-2 mb30 mw__" @click="addCountryToZone(editingZone)">
        Add
      </button>
      <h4 class="text-dark mb20">Pricing</h4>
      <div class="pricing w100p fdc">
        <div class="price-heading df w100p">
          <p class="f1">From (lb)</p>
          <p class="f1">To (lb)</p>
          <p class="f1">Price ($ USD)</p>
          <p class="ml_"></p>
        </div>
        <div v-for="(level, l) in myShippingRates.zones[editingZone].weightsLb" class="price df w100p">
          <input type="number" @change="setRowPrice($event, editingZone, l)" :value="level[0]" name="" placeholder="From">
          <input type="number" :value="level[1]" name="" class="disabled-input" placeholder="To">
          <input type="number" :value="level[2]" name="" placeholder="Price">
          <i v-if="(l !== 0) && (l !== (myShippingRates.zones[editingZone].weightsLb.length - 1))" class="fa-solid fa-x df jcc aic ml_ curp" @click="removePriceRow(editingZone, l)"></i>
          <p v-else class="ml_"></p>
        </div>
      </div>
      <p class="add-row" @click="addPriceRow(editingZone)"><i class="fa-solid fa-plus"></i>Add row</p>
      <!-- <button class="button-1 mt20">Save</button> -->
      <!-- <p class="curp mt30" @click="editZone($event, '')"></p> -->
      <!-- editingZone -->
    </div>

    <!-- Shipping Zones -->
    <div class="w100p shipping-zones">
      <div class="shipping-zone posrel"
        v-for="(zone, z) in myShippingRates.zones"
      >
        <img class="button-menu-item more-icon" src="../../static/brand-icons/ellipsis-vertical.svg" @click="toggleZoneOptions($event, z)">
        <div class="inside-ellipsis posrel" @click="stopProp($event)" v-if="showZoneOptions == z">
          <span class="item-options">
            <div class="df fdc">
              <img v-if="adding" class="spinner-2" src="../../static/images/pushable/loader-black.png">
              <div v-else class="w100p df fdc">
                <a class="mb30">
                  <span @click="editZone($event, z)">
                    Edit
                  </span>
                </a>
                <div class="w100p df jcsb aic">
                  <a v-if="!adding" class="fz14i" @click="toggleZoneOptions($event, '')">Cancel</a>
                  <a class="smaller" @click="removeZone($event, z)">
                    Remove
                  </a>
                </div>
                <!-- <a v-if="product.position !== 0">
                  <span @click="moveUp($event, product.key)">
                    Move up
                  </span>
                </a>
                <a>
                  <span v-if="product.position < (storeData.items.length - 1)" @click="moveDown($event, product.key)">
                    Move down
                  </span>
                </a> -->
              </div>
            </div>
          </span>
        </div>
        </i>
        <h4 class="text-dark zone-heading">Zone {{Object.keys(myShippingRates.zones || {}).indexOf(z) + 1}}</h4>
        <div class="zone-countries df fww">
          <!-- <div class="zone-country" v-for="(country, c) in zone.countries"> -->
            <!-- <p class="text-dark"> -->
              <p>
                {{countriesDisplay(zone.countries)}}
              </p>
            <!-- </p> -->
          <!-- </div> -->
        </div>
        <!-- <h4 class="button-0 _mw1">
          Edit Shipping Rates
        </h4> -->
      </div>
      <div class="shipping-zone posrel df fdc aic jcc curp" @click="addZone()">
        <!-- <h4 class="text-dark zone-heading">Zone {{Object.keys(myShippingRates.zones || {}).indexOf(z) + 1}}</h4> -->
        <!-- <div class="zone-countries df fww"> -->
          <!-- <div class="zone-country" v-for="(country, c) in zone.countries"> -->
            <!-- <p class="text-dark"> -->
        <i class="fa-solid fa-square-plus mb5"></i>
        <p class="text-dark">
          Add a Zone
        </p>
            <!-- </p> -->
          <!-- </div> -->
        <!-- </div> -->
        <!-- <h4 class="button-0 _mw1">
          Edit Shipping Rates
        </h4> -->
      </div>
    </div>











    <hr class="divider">
    <!-- Shipping Type - Disabled -->
    <div v-if="false" class="w100p df">
      <h3 class="w100p tal text-dark mb40">Shipping Options</h3>
      <p class="text-dark">How would you like to handle your shipping?</p>
    </div>
    <div v-if="false" class="shipping-types w100p df aic g20">
      <div
        @click="setShippingType('momentum')"
        class="df shipping-type"
        :class="{
          'shipping-type-selected': selectedShippingType == 'momentum'
        }"
      >
        <p class="text-dark">
          Automatic Distribution
        </p>
      </div>
      <!-- <p class="text-dark">or</p> -->
      <div
        @click="setShippingType('other')"
        class="df shipping-type"
        :class="{
          'shipping-type-selected': selectedShippingType == 'other'
        }"
      >
        <p class="text-dark">
          Other Options
        </p>
      </div>
    </div>
    <div v-if="false" class="df fdc w100p bottom-section">

      <div class="w100p df fdc" v-if="selectedShippingType == 'momentum'">
          <!-- <h2 class="text-dark">Worldwide Distribution</h2> -->
          <p class="text-grey mt30 mb20">Let Pushable handle your shipping and returns.</p>

        <div class="w100p mw_ df fdr jcsb g20">
          <h3 class="text-dark">US, Canada</h3>
          <h4 class="button-3" @click="startApplication(1)">Apply</h4>
        </div>

        <div class="w100p mw_ df fdr jcsb g20 mt20">
          <h3 class="text-dark">Worldwide (164 countries)</h3>
          <h4 class="button-3" @click="startApplication(1)">Apply</h4>
        </div>

        <!-- <hr class="divider mt30i"> -->

        <div class="w100p df fdc mt20">
          <h3 class="text-dark">How It Works</h3>
          <p class="text-dark mt10 df">
            <span class="number">1.</span>Make cool stuff.</p>
          <p class="text-dark mt10 df">
            <span class="number">2.</span>Put your stuff in a box.</p>
          <p class="text-dark mt10 df">
            <span class="number">3.</span>
            <span>
              Ship this box to our location in the US or Europe.
            </span>
          <p class="text-dark mt10 df">
            <span class="number">4.</span>Start selling!</p>
        </div>
      </div>

      <div class="w100p df fdc" v-else-if="selectedShippingType == 'other'">
        <div class="top-bar-global posrel w100p _position1 df jcfs aic">
          <h2 class="text-dark">Export All My Orders to a Google Sheet</h2>
        </div>

        <h4 v-if="!iHaveSheetsConnected()" class="button-3 w150" @click="connectGoogleSheet()">
          + Connect a Google Sheet
        </h4>
        <span class="df fdc text-dark mt10" v-if="iHaveSheetsConnected()">
          <p class="text-dark">Export to this Google Sheet Id:</p>
          <input v-model="connectedSheetId" class="mt10" type="" name="" placeholder="Google Sheet Id">
          <h4 class="button-1 w150 mt20" @click="setGoogleSheetId()">
            Set Sheet Id
          </h4>
        </span>
      </div>


      <!-- <div class="top-bar-global posrel w100p _position1 df jcfs aic">
        <h2 class="text-dark">Shipping Rates</h2>
      </div> -->


      <!-- <div class="product-basics f1 df fdc">
        <h3 class="text-dark">My Shipping Network</h3>
        <div class="my-shipping-providers mb20" v-if="Object.keys(myShippingProviders).length > 0">
          <div class="one-shipping-provider" v-for="(provider, p) in myShippingProviders">
            <p class="text-dark" v-if="provider.type == 1">{{provider.provider}} ({{provider.id}})</p>
            <p v-else-if="provider.type == 2" class="df fdc text-dark">{{provider.provider}}
              <input v-model="connectedSheetId" type="" name="">
              <a class="text-dark" @click="setGoogleSheetId()">Set Sheet Id</a>
            </p>
          </div>
        </div>
        <div class="connect-shipping-providers" v-if="openShippingProviderMenu">
          <h4>Select a Shipping Provider</h4>
          <select v-model="newShipperSelected" class="w100p">
            <option>Ship My Orders</option>
            <option>Auto-Export to Google Sheet</option>
          </select>
          <div class="connect-shipping-providers-selected mt20" v-if="newShipperSelected == 'Ship My Orders'">
            <h4>Ship My Orders ID</h4>
            <input placeholder="" v-model="newSMOID" class="w100p mw2" type="" name="">
            <h4>Ship to these countries:</h4>
            <input placeholder="" value="US" disabled class="w100p mw2" type="" name="">
          </div>
          <div class="connect-shipping-providers-selected mt20" v-if="newShipperSelected == 'Auto-Export to Google Sheet'">
            <h4 v-if="Object.keys(connectedSheet).length == 0" class="button-0 w150" @click="connectGoogleSheet()">+ Connect a google sheet</h4>
            <h4>Ship to all countries except:</h4>
            <input placeholder="" value="US" disabled class="w100p mw2" type="" name="">
          </div>
          <h4 class="button-1 mt20" @click="addANewShipper()">Add</h4>
          <h4 class="button-0" @click="connectAShippingProvider(false)">Cancel</h4>
        </div>
        <h4 v-else-if="Object.keys(myShippingProviders).length == 0" class="curp text-dark" @click="connectAShippingProvider(true)">
          + Connect a shipping provider
        </h4>
        <h4 v-else class="curp text-dark" @click="connectAShippingProvider(true)">
          + Connect another shipping provider
        </h4>
      </div> -->
    </div>
    <div class="spacer"></div>

  </div>
</template>

<script>

import router from '@/router'
import common from '@/util/common'
import LandingProduct from '@/components/LandingProduct'

export default {
  name: 'Shipping',
  data () {
    return {
      newCountry: '',
      balance: {},
      loading: false,
      income: [],
      myShippingRates: {
        loaded: false,
        providers: {},
        zones: {}
      },
      openShippingProviderMenu: false,
      connectedSheet: {},
      connectedSheetId: '',
      myShippingProviders: {},
      newShipperSelected: '',
      newSMOID: '',
      selectedShippingType: 'momentum',
      newApplcation: 0,
      lastSwitch: 0,
      showZoneOptions: '',
      adding: false,
      editingZone: ''
    }
  },
  props: ['mode'],
  components: {
    LandingProduct
  },
  methods: {
    setRowPrice (event, zone, row) {
      console.log('setRowPrice', event.target.value, zone, row)
      // check value is ok
      let newValue = event.target.value

      if (row === 0) {
        let valueBelow = this.myShippingRates.zones[zone].weightsLb[row + 1][0]
        if (newValue >= valueBelow) {
          newValue = valueBelow - 0.02
        }
      } else if (row === (this.myShippingRates.zones[zone].weightsLb.length - 1)) {
        let valueAbove = this.myShippingRates.zones[zone].weightsLb[row - 1][0]
        if (newValue <= valueAbove) {
          newValue = valueAbove + 0.01
        }
      } else {
        let valueAbove = this.myShippingRates.zones[zone].weightsLb[row - 1][0]
        let valueBelow = this.myShippingRates.zones[zone].weightsLb[row + 1][0]

        if (newValue <= valueAbove) {
          newValue = valueAbove + 0.01
        }
        if (newValue >= valueBelow) {
          newValue = valueBelow - 0.02
        }
      }


      this.$store.dispatch('AUTH.setRowPrice', {
        zone,
        row,
        amount: newValue
      }).then((res) => {
        console.log('savePricing result', res.url)
        this.adding = false
        this.showAddNew = false
        this.showZoneOptions = ''
        this.getMyShippingRates()
      }).catch((error) => {
      })
    },
    addPriceRow(zone) {
      console.log('addPriceRow', zone)
      this.$store.dispatch('AUTH.addPriceRow', {
        zone
      }).then((res) => {
        console.log('addPriceRow result', res.url)
        this.adding = false
        this.showAddNew = false
        this.showZoneOptions = ''
        this.getMyShippingRates()
      }).catch((error) => {
      })
    },
    removePriceRow(zone, r) {
      console.log('removePriceRow', zone, r)
      this.$store.dispatch('AUTH.removePriceRow', {
        zone,
        row: r
      }).then((res) => {
        console.log('removePriceRow result', res.url)
        this.adding = false
        this.showAddNew = false
        this.showZoneOptions = ''
        this.getMyShippingRates()
      }).catch((error) => {
      })
    },
    addCountryToZone (zone) {
      // check if country exists in any zone

      let zones = this.myShippingRates.zones
      let countryCode = common.isoCountries[this.newCountry]

      for (let zone in zones) {
        if (zones[zone].countries) {
          if (zones[zone].countries.indexOf(countryCode) > -1) {
            let zoneNumber = Object.keys(zones || {}).indexOf(zone) + 1
            alert('This country already exists in Zone ' + zoneNumber)
            return false
          }
        }
      }

      console.log('addCountryToZone', zone, this.newCountry)
      this.$store.dispatch('AUTH.addCountryToZone', {
        zone,
        countryCode: common.isoCountries[this.newCountry]
      }).then((res) => {
        console.log('removeCountryFromZone result', res.url)
        this.adding = false
        this.showAddNew = false
        this.newCountry = ''
        this.showZoneOptions = ''
        this.getMyShippingRates()
      }).catch((error) => {
      })
    },
    removeCountryFromZone (zone, countryCode) {
      console.log('removeCountryFromZone', zone, countryCode)
      this.$store.dispatch('AUTH.removeCountryFromZone', {
        zone,
        countryCode
      }).then((res) => {
        console.log('removeCountryFromZone result', res.url)
        this.adding = false
        this.showAddNew = false
        this.showZoneOptions = ''
        this.getMyShippingRates()
      }).catch((error) => {
      })
    },
    countriesList () {
      return common.isoCountries
    },
    editZone (event, z) {
      event && event.stopPropagation()
      this.showZoneOptions = ''
      this.editingZone = z
    },
    addZone () {
      this.$store.dispatch('AUTH.addZone', {}).then((res) => {
        console.log('addZone result', res.url)
        this.adding = false
        this.showAddNew = false
        this.showZoneOptions = ''
        this.getMyShippingRates()
      }).catch((error) => {
      })
    },
    stopProp (event) {
      event.stopPropagation()
    },
    removeZone (event, z) {
      this.adding = true
      // let productToAdd = this.fulfillmentsOrders[this.selectedProductToAdd]
      this.$store.dispatch('AUTH.removeZone', {
        z
      }).then((res) => {
        console.log('removeZone result', res.url)
        this.adding = false
        this.showAddNew = false
        this.showZoneOptions = ''
        this.getMyShippingRates()
      }).catch((error) => {
      })
    },
    toggleZoneOptions (event, z) {
      console.log('*** showZoneOptions', event, z)
      let now = (new Date()).getTime()
        event && event.stopPropagation()
      
      if (this.showZoneOptions == z) {
        this.showZoneOptions = ''
      } else if (now - this.lastSwitch > 200) {
      //   console.log('event, p', event, p) // productId
        this.lastSwitch = now
        this.showZoneOptions = z
      }
      console.log('this.toggleZoneOptions', this.toggleZoneOptions)
    },
    countryName (code) {
      let isoCountries = common.isoCountries
      let countryName = Object.keys(isoCountries).filter((full, short) => {
        return code == isoCountries[full]
      })
      return countryName
    },
    countriesDisplay (countries) {
      let countriesText = ''
      let isoCountries = common.isoCountries
      let counter = 0

      if (!countries) {
        return 'No countries selected.'
      }

      for (let c in countries) {
        let countryName = Object.keys(isoCountries).filter((full, short) => {
          return countries[c] == isoCountries[full]
        })
        countriesText += countryName // CA
        counter += 1
        if (counter > 2) {
          if (countries.length > 3) {
            countriesText += (' and ' + (countries.length - 3) + ' more countries')
          }

          break
        } else if (countries.length > c + 1) {
          countriesText += ', '
        } else if (countries.length == 3) {
          countriesText += ' and '
        } 
      }
      countriesText += '.'

      return countriesText
    },
    startApplication (type) {
      this.newApplcation = type
      // monthly $ volume
      // # of SKUs
      // average order weight
      // what do we need to know for SMO/Heftwerk?
    },
    apply () {
      // submit the form
    },
    setShippingType (selectedShippingType) {
      this.selectedShippingType = selectedShippingType
    },
    iHaveSheetsConnected () {
      let connected = false
      for (let s in this.myShippingProviders) {
        if (this.myShippingProviders[s].type == 2) {
          return true
        }        
      }
      return false
    },
    goTo (route) { 
      router.push(route)
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
    getMyIncome () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyIncome', {}).then((res) => {
          console.log('income', res)
          this.income = res
        })
      } else {
        console.log('wait')
        setTimeout(() => {
          this.getMyIncome()
        }, 500)
      }
    },
    getMyBalance () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyBalance', {}).then((res) => {
          console.log('balance', res)
          this.balance = res.data || {}
        })
      } else {
        console.log('wait')
        setTimeout(() => {
          this.getMyBalance()
        }, 500)
      }
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
    getMyShippingRates () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyShippingRates', {}).then((res) => {
          console.log('this.myShippingRates', this.myShippingRates)
          this.myShippingRates = {
            zones: res.zones,
            providers: res.providers,
            loaded: true
          }
        })
      } else {
        setTimeout(() => {
          this.getMyShippingRates()
        }, 500)
      }
    },
    loadMyShippingProviders () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyShippingProviders', {}).then((res) => {
          this.myShippingProviders = res || {}
        })
      } else {
        setTimeout(() => {
          this.loadMyShippingProviders()
        }, 500)
      }
    },
    connectGoogleSheet () {
      console.log('connectGoogleSheet')
      this.$store.dispatch('AUTH.startConnectingGoogleSheet', {}).then((res) => {
        console.log('startConnectingGoogleSheet response', res)
        if (res) {
          let status = res.status
          let message = res.message
          if ((status == 200) && (message == 'success')) {
            let url = res.url
            window.location = url
          }
        }
      })
    },
    testWritingToSheet () {
      console.log('testWritingToSheet')
      this.$store.dispatch('AUTH.testWritingToSheet', {}).then((res) => {
        console.log('testWritingToSheet response', res)
      })
    },
    setGoogleSheetId () {
      console.log('setGoogleSheetId')
      this.$store.dispatch('AUTH.setGoogleSheetId', {sheetId: this.connectedSheetId}).then((res) => {
        console.log('setGoogleSheetId response', res)
      })
    },
    selectSheet () {
      console.log('selectSheet')
      this.$store.dispatch('AUTH.selectSheet', {}).then((res) => {
        console.log('selectSheet response', res)
        // if (res) {
        //   let status = res.status
        //   let message = res.message
        //   if ((status == 200) && (message == 'success')) {
        //     let url = res.url
        //     window.location = url
        //   }
        // }
      })
    },
    addANewShipper () {
      let shipper = {
        type: 1,
        provider: this.newShipperSelected,
        id: this.newSMOID
        // connectedSheet: this.connectedSheet
      }
      this.$store.dispatch('AUTH.addANewShipper', shipper).then((res) => {
        this.newShipperSelected = ''
        this.newSMOID = ''
        this.connectAShippingProvider(false)
        this.loadMyShippingProviders()
      })
    },
    connectAShippingProvider (openShippingProviderMenu) {
      this.openShippingProviderMenu = openShippingProviderMenu
    },
    getMySheetsData () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMySheetsData', {}).then((res) => {
          this.connectedSheetId = (res || {}).sheetId || ''
        })
      } else {
        setTimeout(() => {
          this.getMySheetsData()
        }, 500)
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Shipping page created')
    this.getMyShippingRates()
    this.getMySheetsData()
    this.loadMyShippingProviders()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  .landing-wrapper {
    padding: 19px;
    padding-top: 0;
    background-color: $light-grey;
    /*background-color: #ddd;*/
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
  @media (max-width: 480px) {
    .balance {
      /*align-self: unset;*/
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
    /*padding-top: 20px;*/
    background-color: $light-grey;
  }

  @media (max-width: 980px) {
    .bottom-section {
      margin-bottom: 60px;
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

  .number {
    width: 25px;
    margin-right: 10px;
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

  .w150 {
    width: 200px;
  }

  .hr_ {
    height: 1px;
    background-color: #ccc;
    border: none;
  }

  .shipping-types {
    .shipping-type {
      border: 2px solid #BBB;
      border-radius: 20px;
      padding: 20px;
      width: 145px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      cursor: pointer;
      background-color: #EAEAEA;
      opacity: 0.7;

      &.shipping-type-selected {
        opacity: 1;
        background-color: #fff;
        border-color: $color-primary;
        p {
          font-weight: 500;
        }
      }
    }
  }

  .mt30i {
    margin-top: 50px !important;
  }

  .shipping-zones {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 40px;


    .shipping-zone {
      /*flex: 1;*/
      width: 300px;
      max-width: 300px;
      height: 140px;
      border-radius: 12px;
      background-color: #fff;
      border: 1px solid #00000011;
      padding: 15px;
      -webkit-box-shadow: 0 0 10px rgba(8, 8, 8, .05);
      box-shadow: 0 0 10px rgba(8, 8, 8, .05);

      .zone-heading {
        font-size: 24px;
        margin-bottom: 10px;
      }

      .zone-countries {
        p {
          color: $color-background-dark;
        }
      }
    }
  }
  .mw_ {
    max-width: 350px;
  }
  .text-grey {
    font-size: 14px;
    color: #888;
  }
  .more-icon {
    cursor: pointer;
    position: absolute;
    right: 16px;
    top: 22px;
    transform: translateY(-50%);
  }
  .close-icon {
    font-size: 14px;
    color: #333;
    cursor: pointer;
    position: absolute;
    right: 18px;
    top: 22px;
    transform: translateY(-50%);
  }
  .close-icon-2 {
    font-size: 14px;
    color: #333;
    cursor: pointer;
    position: absolute;
    right: 12px;
    top: 20px;
    transform: translateY(-50%);
  }
  .item-options {
    width: 200px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    position: absolute;
    right: 0;
    top: 0;
    -webkit-box-shadow: 0 0 20px rgba(8, 21, 66, .1);
    box-shadow: 0 0 20px rgba(8, 21, 66, .1);
    /*z-index: 11;*/

    &:hover {
      -webkit-box-shadow: 0 0 20px rgba(8, 21, 66, .15);
      box-shadow: 0 0 20px rgba(8, 21, 66, .15);
    }

    a {
      font-size: 16px;
      color: $color-background-dark;
    }
  }
  .spinner-2 {
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
  .smaller {
    font-size: 14px !important;
    color: #999 !important;
  }
  .edit-shipping-zone {
    position: absolute;
    left: 15px;
    top: 15px;
    background-color: #fff;
    width: calc(100% - 30px);
    max-width: 400px;
    border-radius: 10px;
    -webkit-box-shadow: 0 0 20px rgba(8, 21, 66, .15);
    box-shadow: 0 0 20px rgba(8, 21, 66, .15);
    padding: 20px;
    p {
      color: $color-background-dark;
    }
    z-index: 20;
  }
  .countries {
    gap: 10px;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 30px;
    max-height: 140px;
    overflow-y: auto;
  }
  .country {
    position: relative;
    padding: 4px 8px;
    border-radius: 10px;
    background-color: #ddd;
    font-size: 14px;
    display: flex;

    i {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 10px;
      margin-left: 8px;
      transform: translateY(-1px);
    }
  }
  .select-input {
    width: 100%;
    max-width: 540px;
    border-color: #bbb !important;
    background-color: #fff;
    font-size: 14px;
    padding: 12px 10px;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: Kollektif;
    color: #2b2b2b;
    border-radius: 10px;
  }
  .price {
    gap: 10px;
  }
  .price-heading {
    p {
      font-weight: 400;
      font-style: italic;
    }
  }
  .fw700 {
    font-weight: 700;
  }
  .mw__ {
    max-width: 100px;
  }
  .disabled-input {
    opacity: 0.4;
    pointer-events: none;
    cursor: unset;
  }
  .ml_ {
    opacity: 0.8;
    font-size: 14px;
    width: 20px;
    min-width: 20px;
    /*margin-left: 2px;*/
  }
  .add-row {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 10px;

    i {
      transform: translateY(-1px);
    }
  }
  .delete-country {
    font-weight: 200;
    color: #777;
    cursor: pointer;
  }
</style>
