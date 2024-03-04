<template>
  <div class="product-details-default w100p df fdc mt24">

    <!-- <PhysicalProductFulfillmentEditor/> -->
    <div v-if="productType == 'physical-product'" class="w100p df fdc">
      <div class="product-detail">
        <div class="w100p df jcsb aic">
          <h5 class="add-link-box-heading">Sizes</h5>
          <a class="text-primary-color add-size" @click="addSize()">add size</a>
        </div>
        <div class="product-sizes w100p">
          <VueSlickCarousel
              class="w100p"
              :key="carouselKey"
              :slidesPerRow="1"
              :draggable="false"
              :arrows="true">
            <div v-for="(size, s) in sizes" :key="s" class="product-size w100p df fdc">
              <div class="product-detail m__">
                <h4>Size</h4>
                <input placeholder="small, medium, etc" :value="size.name" type="" name="" @input="setSizeName($event, s)">
              </div>

              <div class="product-detail m__">
                <h4>Product SKU</h4>
                <input placeholder="SKU" :value="size.sku" type="" name="" @input="setProductSku($event, s)">
              </div>

              <hr class="separator"/>
              <div class="product-detail m__">
                <!-- <input placeholder="Price" v-model="sizes[s].price" type="number" name=""> -->
                <div class="product-detail">
                  <h5 class="add-link-box-heading">Price</h5>
                  <div class="df price-input-wrapper" :class="{'disabled-2': size.freeProduct}">
                    <input 
                      v-if="size.freeProduct"
                      min="0"
                      placeholder="0.00"
                      step="0.01"
                      :value="size.price"
                      type="number"
                      name=""
                      class="f1_plus input-text-i price-input-wrapper-input"
                      :class="{'disabled-1': size.freeProduct}"
                      @click="toggleFreeSize(s, false)">
                    <input
                      v-else min="0.99"
                      placeholder="0.00"
                      step="0.01"
                      :value="size.price"
                      type="number"
                      name=""
                      class="f1_plus input-text-i price-input-wrapper-input"
                      :class="{'disabled-1': size.freeProduct}"
                      @change="checkPrice($event, s)"
                      @click="toggleFreeSize(s, false)">

                    <div class="df aic spec or-set-as-free">
                      <p class="or-free disabled-1 or" v-if="!freeProduct">or</p>
                      <div class="f1 checkbox-wrapper" :class="{'disabled-1': !size.freeProduct}" @click="toggleFreeSize(s, !size.freeProduct)">
                        <input @change="adjustPrice(s)" :checked="size.freeProduct" type="checkbox" class="check-fulfillment-box i32 curp" :style="'opacity: ' + (size.freeProduct ? 1 : 0.5) + ';'" name="">
                        <p class="curp set-as-free">{{size.freeProduct ? 'Free' : 'Set as free'}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="!size.freeProduct" class="w100p product-detail df fdr aic jcsb g16" :class="{
                  'not-pro': !($store.getters['AUTH.plan'] && $store.getters['AUTH.plan'].loaded && $store.getters['AUTH.plan'].pro)
                }">
                  <div class="not-pro-overlay">
                    <div class="w100p df jcc aic">
                      <button class="button-1 button-smaller wun" @click="goTo('/plan')">Upgrade to pro</button>
                      <p>to add a sale price</p>
                    </div>
                  </div>
                  <div class="f1 df fdc">
                    <h5 class="add-link-box-heading" v-if="$store.getters['AUTH.plan'] && $store.getters['AUTH.plan'].loaded && $store.getters['AUTH.plan'].pro">Sale price</h5>
                    <div class="df price-input-wrapper f1" :class="{'disabled-2': size.freeProduct}">
                      <input
                        min="0.99"
                        placeholder="0.00"
                        step="0.01"
                        :value="size.salePrice"
                        type="number"
                        name=""
                        class="f1_plus input-text-i price-input-wrapper-input"
                        :class="{'disabled-1': size.freeProduct}"
                        @change="checkSalePrice($event, s)"
                        @click="toggleFreeSize(s, false)">
                    </div>
                  </div>
                  <div class="f1 df fdc">
                    <h5 class="add-link-box-heading" v-if="$store.getters['AUTH.plan'] && $store.getters['AUTH.plan'].loaded && $store.getters['AUTH.plan'].pro">Sale date range</h5>
                    <div class="df f1" :class="{'disabled-2': size.freeProduct}">
                      <date-picker
                        :range-separator="' – '"
                        :value="sizeSaleDateRange(size)"
                        type="date"
                        :editable="false"
                        :confirm="true"
                        :format="'DD-MM-YYYY'"
                        placeholder="DD-MM-YYYY"
                        time-title-format="'YYYY-MM'"
                        @change="setSizeSaleDateRange($event, s)"
                        range>
                      </date-picker>
                    </div>
                  </div>
                </div>
                <!-- <input placeholder="SKU" v-model="productSku" type="" name=""> -->
              </div>
              <hr class="separator"/>

              <div class="w100p df fdr aic jcsb g16">
                <!-- <div v-if="uniqueProductId" class="product-detail m___">
                  <h4>Stock</h4>
                  <input :value="$store.getters['AUTH.inventory'][uniqueProductId]" type="number" name="" @input="updateInventoryCount($event, uniqueProductId)">
                </div> -->
                <div class="product-detail f1">
                  <h4>Stock</h4>
                  <input
                    placeholder="Stock"
                    :value="size.stock"
                    type="number"
                    name=""
                    @input="setSizeStock($event, s)">
                </div>
                <div class="product-detail f1">
                  <h4>Weight (lb)</h4>
                  <input
                    placeholder="Weight (lb)"
                    type="number"
                    :value="size.weightLb"
                    name=""
                    @input="setSizeWeight($event, s)">
                </div>
              </div>

              <div class="size-actions w100p df jcfe aic">
                <p class="text-dark curp" v-if="sizes.length > 1" @click="deleteSize(s)">
                  delete size
                </p>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </div>
      <!-- <div v-if="productType == 'physical-product'" class="product-detail">
        <h5 class="add-link-box-heading df aic">Shipping method</h5>
        <input v-model="redirectUrl" placeholder="Redirect link" type="" name="">
        <div class="shipping-choice">
          <span class="shipping-check"></span>
          <p>Manage shipping yourself</p>
        </div>
        <div class="shipping-choice">
          <span class="shipping-check"></span>
          <p>Let Pushable handle shipping and handling</p>
        </div>
      </div> -->
    </div>

    <!-- <CalendarEventFullfillmentEditor/> -->
    <div v-if="productType == 'calendar-event'" class="w100p df fdc">
      <div>
        <div class="product-detail df product-detail-responsive availability-selector">
          <div class="check-detail f1">
            <h4>Available Hours</h4>
            <div class="w100p work-hours-dropdown-wrapper">
              <select class="dropdown pr_x" :value="selectedSchedule" @change="setSelectedSchedule">
                <option v-for="(schedule, s) in mySchedules" :value="s">{{schedule.name}}{{scheduleText(schedule)}}</option>
              </select>
              <p class="work-hours-edit" @click="openScheduleEditor(selectedSchedule)">edit</p>
            </div>
            <hr class="hr-1"/>
            <div class="check-detail f1 mt__">
              <h4>Appointment Lengths</h4>
              <div class="appointment-length-options-2 df fww">
                <span v-for="(time, t) in appointmentLengths"
                  class="w100p df jcsb aic appointment-length-2 appointment-length-selected">
                  <p class="">
                    {{time.time}} minutes
                  </p>
                  <p class="fzx">
                    &nbsp;${{time.price}}
                  </p>
                  <img
                    src="../../../static/brand-icons/x-close.svg"
                    class="remove-time-option"
                    @click="removeAppointmentTime(t)"/>
                </span>
                <span
                  class="df aic"
                  @click="startAddingCustomTimeSlot()">
                  <i class="fa-solid fa-plus add-time-option"></i>
                  <p class="add-appointment-time">
                    +
                  </p>
                </span>
              </div>
            </div>



            <div class="scheduling-options df fdc mt__">
              <p class="mt10 mb10">Invitees can schedule...</p>
              <span class="df aic" @click="setUseScheduleRange(0)" :class="{'muted': !(useScheduleRange === 0)}">
                <input type="radio" name="" :checked="useScheduleRange === 0">
                <input type="number" @input="setCalendarEventFutureTime" name="" min="0" step="1" :value="calendarEventFutureTime" class="w_1">
                <select :value="calendarEventFutureTimePeriod" @change="setCalendarEventFutureTimePeriod" class="dropdown ml10 w_25">
                  <option value="day">{{'calendar day' + (calendarEventFutureTime == 1 ? '' : 's')}}</option>
                  <option value="weekday">{{'weekday' + (calendarEventFutureTime == 1 ? '' : 's')}}</option>
                </select>
                <p class="no-break ml10">into the future</p>
              </span>
              <span class="df aic" @click="setUseScheduleRange(1)" :class="{'muted': !(useScheduleRange === 1)}">
                <input type="radio" name="" :checked="useScheduleRange === 1">
                <p>Within a date range</p>
                <date-picker
                  :range-separator="' – '"
                  v-if="useScheduleRange === 1"
                  class="w_3 ml10"
                  :value="calendarEventDateRangeFormatted()"
                  type="date"
                  :editable="false"
                  :confirm="true"
                  :format="'DD-MM-YYYY'"
                  placeholder="DD-MM-YYYY"
                  time-title-format="'YYYY-MM'"
                  @change="setCalendarEventDateRange($event)"
                  range>
                </date-picker>
              </span>
              <span class="df aic" @click="setUseScheduleRange(2)" :class="{'muted': !(useScheduleRange === 2)}">
                <input type="radio" name="" :checked="useScheduleRange === 2">
                <p>Indefinitely into the future</p>
              </span>
            </div>
          </div>
        </div>
        <hr class="hr-1">
        <div class="product-detail"> 
          <h4 class="mt20 curp" @click="toggleAdvancedSettings()">
            Advanced Settings
            <img src="../../../static/brand-icons/chevron-expand.svg"/>
          </h4>
          <div v-if="showAdvancedSettings" class="scheduling-options df fdc">
            <span class="df aic">
              <p class="no-break">Minimum notice</p>
              <input type="number" min="0" :value="calendarEventMinimumNoticeTime" @change="setCalendarEventMinimumNoticeTime" class="w_1 ml10" name="">
              <select :value="calendarEventMinimumNoticeTimePeriod" @change="setCalendarEventMinimumNoticeTimePeriod" class="w_25 ml10 dropdown">
                <option value="hour">hours</option>
                <option value="day">days</option>
              </select>
            </span>
            <span class="df aic">
              <p class="no-break">Daily limit</p>
              <input type="number" :value="calendarEventDailyLimit" @change="setCalendarEventDailyLimit" name="" class="w_2 ml10">
            </span>
          </div>
        </div>
      </div>
      <div class="full-screen-select" v-if="addCustomTimeSlot" @click="stopAddingCustomTimeSlot()">
        <div class="options-box" @click="stopProp($event)">
          <!-- <img
            src="../../../static/brand-icons/x-close.svg"
            class="close-custom-menu"
            @click="stopAddingCustomTimeSlot()"/> -->
          <h2>Add an appointment length</h2>
          <br/>
          <div class="product-detail w100p df fdc">
            <br/>
            <h5 class="add-link-box-heading">Time</h5>
            <div class="slot-type w100p df aic" :class="{'disabled-1': !usePresetMinutes}">
              <input class="type-select mb6" :checked="usePresetMinutes" @change="setUsePresetMinutes(true)" type="radio" name="">
              <select v-model="addTimeSelected" class="dropdown" @change="setUsePresetMinutes(true)">
                <option :selected="addTimeSelected == 5" :value="5">5 minutes</option>
                <option :selected="addTimeSelected == 10" :value="10">10 minutes</option>
                <option :selected="addTimeSelected == 15" :value="15">15 minutes</option>
                <option :selected="addTimeSelected == 20" :value="20">20 minutes</option>
                <option :selected="addTimeSelected == 25" :value="25">25 minutes</option>
                <option :selected="addTimeSelected == 30" :value="30">30 minutes</option>
                <option :selected="addTimeSelected == 35" :value="35">35 minutes</option>
                <option :selected="addTimeSelected == 40" :value="40">40 minutes</option>
                <option :selected="addTimeSelected == 45" :value="45">45 minutes</option>
                <option :selected="addTimeSelected == 50" :value="50">50 minutes</option>
                <option :selected="addTimeSelected == 55" :value="55">55 minutes</option>
                <option :selected="addTimeSelected == 60" :value="60">1 hour</option>
                <option :selected="addTimeSelected == 90" :value="90">90 minutes</option>
                <option :selected="addTimeSelected == 120" :value="120">2 hours</option>
                <option :selected="addTimeSelected == 180" :value="180">3 hours</option>
                <option :selected="addTimeSelected == 240" :value="240">4 hours</option>
                <option :selected="addTimeSelected == 300" :value="300">5 hours</option>
                <option :selected="addTimeSelected == 360" :value="360">6 hours</option>
                <option :selected="addTimeSelected == 420" :value="420">7 hours</option>
                <option :selected="addTimeSelected == 480" :value="480">8 hours</option>
                <option :selected="addTimeSelected == 540" :value="540">9 hours</option>
                <option :selected="addTimeSelected == 600" :value="600">10 hours</option>
                <option :selected="addTimeSelected == 660" :value="660">11 hours</option>
                <option :selected="addTimeSelected == 720" :value="720">12 hours</option>
                <option :selected="addTimeSelected == 1440" :value="1440">24 hours</option>
              </select>
            </div>
            <div class="slot-type w100p df aic" :class="{'disabled-1': usePresetMinutes}">
              <input class="type-select mb6" :checked="!usePresetMinutes" @change="setUsePresetMinutes(false)" type="radio" name="">
              <input class="type-custom" @click="setUsePresetMinutes(false)" placeholder="Custom time" type="text" name="">
            </div>
          </div>
          <br/>
          <div class="product-detail w100p">
            <h5 class="add-link-box-heading">Price</h5>
            <div class="df price-input-wrapper" :class="{'disabled-2': freeProduct}">
              <input 
                v-if="newCalSlotFreeProduct"
                min="0"
                placeholder="0.00"
                step="0.01"
                :value="newCalSlotPrice"
                type="number"
                name=""
                class="f1_plus input-text-i price-input-wrapper-input"
                :class="{'disabled-1': freeProduct}"
                @click="toggleFree(false)">
              <input
                v-else min="0.99"
                placeholder="0.00"
                step="0.01"
                :value="newCalSlotPrice"
                type="number"
                name=""
                class="f1_plus input-text-i price-input-wrapper-input"
                :class="{'disabled-1': freeProduct}"
                @change="checkNewCalSlotPrice($event)"
                @click="toggleFree(false)">
              <div class="df aic spec or-set-as-free">
                <p class="or-free disabled-1 or" v-if="!newCalSlotFreeProduct">or</p>
                <div @click="toggleNewCalSlotFree(!newCalSlotFreeProduct)" class="f1 checkbox-wrapper" :class="{'disabled-1': !newCalSlotFreeProduct}">
                  <input :checked="newCalSlotFreeProduct" :value="newCalSlotFreeProduct" type="checkbox" class="check-fulfillment-box i32 curp" :style="'opacity: ' + (newCalSlotFreeProduct ? 1 : 0.5) + ';'" name="">
                  <p class="curp set-as-free">{{newCalSlotFreeProduct ? 'Free' : 'Set as free'}}</p>
                </div>
              </div>
            </div>
          </div>

          <br/>
          <br/>

          <button @click="addAppointmentTime()" class="button-1 button-smaller">Add</button>
          <button @click="stopAddingCustomTimeSlot()" class="button-0 button-smaller">Cancel</button>
        </div>
      </div>
    </div>

    <!-- <SinglePriceSelector/> -->
    <div v-if="(productType == 'digital-download') || (productType == 'custom-service')" class="product-detail">
      <h5 class="add-link-box-heading">Price</h5>
      <div class="df price-input-wrapper" :class="{'disabled-2': freeProduct}">
        <input 
          v-if="freeProduct"
          min="0"
          placeholder="0.00"
          step="0.01"
          :value="price"
          type="number"
          name=""
          class="f1_plus input-text-i price-input-wrapper-input"
          :class="{'disabled-1': freeProduct}"
          @click="toggleFree(false)">
        <input
          v-else min="0.99"
          placeholder="0.00"
          step="0.01"
          :value="price"
          type="number"
          name=""
          class="f1_plus input-text-i price-input-wrapper-input"
          :class="{'disabled-1': freeProduct}"
          @change="checkSinglePrice($event)"
          @click="toggleFree(false)">

        <div class="df aic spec or-set-as-free">
          <p class="or-free disabled-1 or" v-if="!freeProduct">or</p>
          <div class="f1 checkbox-wrapper" :class="{'disabled-1': !freeProduct}" @click="toggleFree(!freeProduct)">
            <input :value="freeProduct" type="checkbox" class="check-fulfillment-box i32 curp" :style="'opacity: ' + (freeProduct ? 1 : 0.5) + ';'" name="" :checked="freeProduct">
            <p class="curp set-as-free">{{freeProduct ? 'Free' : 'Set as free'}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!freeProduct && ((productType == 'digital-download') || (productType == 'custom-service'))" class="w100p product-detail df fdr aic jcsb g16" :class="{
      'not-pro': !($store.getters['AUTH.plan'] && $store.getters['AUTH.plan'].loaded && $store.getters['AUTH.plan'].pro)
    }">
      <div class="not-pro-overlay">
        <div class="w100p df jcc aic">
          <button class="button-1 button-smaller wun" @click="goTo('/plan')">Upgrade to pro</button>
          <p>to add a sale price</p>
        </div>
      </div>
      <div class="f1 df fdc">
        <h5 class="add-link-box-heading" v-if="$store.getters['AUTH.plan'] && $store.getters['AUTH.plan'].loaded && $store.getters['AUTH.plan'].pro">Sale price</h5>
        <div class="df price-input-wrapper f1" :class="{'disabled-2': freeProduct}">
          <input
            min="0.99"
            placeholder="0.00"
            step="0.01"
            :value="salePrice"
            type="number"
            name=""
            class="f1_plus input-text-i price-input-wrapper-input"
            :class="{'disabled-1': freeProduct}"
            @change="checkSingleSalePrice($event)"
            @click="toggleFree(false)">
        </div>
      </div>
      <div class="f1 df fdc">
        <h5 class="add-link-box-heading" v-if="$store.getters['AUTH.plan'] && $store.getters['AUTH.plan'].loaded && $store.getters['AUTH.plan'].pro">Sale date range</h5>
        <div class="df f1" :class="{'disabled-2': freeProduct}">
          <date-picker
            :range-separator="' – '"
            :value="saleDateRangeFormatted()"
            type="date"
            :editable="false"
            :confirm="true"
            :format="'DD-MM-YYYY'"
            placeholder="DD-MM-YYYY"
            time-title-format="'YYYY-MM'"
            @change="setSaleDateRange($event)"
            range>
          </date-picker>
          <!-- <input
            min="0.99"
            placeholder="0.00"
            step="0.01"
            :value="price"
            type="number"
            name=""
            class="f1_plus input-text-i price-input-wrapper-input"
            :class="{'disabled-1': freeProduct}"
            @change="checkPrice($event)"
            @click="toggleFree(false)"> -->
        </div>
      </div>
    </div>

    <!-- For digital download, send this file -->
    <div v-if="productType == 'digital-download'" class="w100p df fdc aifs mb_x">
      <h5 class="add-link-box-heading">
        Send this file after purchase
      </h5>
      <DropzoneUploader
        :image="productDeliveryFile.url ? '../../../static/brand-icons/file-icon.png' : ''"
        :textOverride="'file'"
        @uploadedImage="uploadedImage"
        @removeImage="removeImage"
      />
    </div>


    <!-- <div class="product-detail">
      <h5 class="add-link-box-heading df aic">Redirect after purchase
        <img class="ml4" src="../../../static/brand-icons/tooltip.svg" v-tooltip="`The buyer will be sent to this URL after purchase. The buyer will be sent to a default 'thank you' page if no URL is provided.`"/>
      </h5>
      <input :value="redirectUrl" @input="changeRedirectUrl" placeholder="Redirect link" type="" name="">
    </div> -->

  </div>
</template>

<script>

import router from '@/router'

import DropzoneUploader from '@/components/common/DropzoneUploader'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: 'ProductEditorFulfillment',
  data () {
    return {
      carouselKey: 1,
      addCustomTimeSlot: false,
      usePresetMinutes: true,
      
      addTimeSelected: 30,
      newCalSlotFreeProduct: false,
      newCalSlotPrice: 30,

      showAdvancedSettings: false,

      calendarFrom: [
        '9 am',
        '9 am',
        '9 am',
        '9 am',
        '9 am',
        '9 am',
        '9 am',
      ],
      calendarTo: [
        '5 pm',
        '5 pm',
        '5 pm',
        '5 pm',
        '5 pm',
        '5 pm',
        '5 pm',
      ],
    }
  },
  props: [
    'productType',
    'error',
    'sizes',
    'productDeliveryFile',
    'redirectUrl',
    'price',
    'saleDateRange',
    'salePrice',
    'freeProduct',
    'appointmentLengths',
    'customAppointmentLengths',
    'useScheduleRange',
    'calendarEventDateRange',
    'calendarEventFutureTime',
    'calendarEventFutureTimePeriod',
    'calendarEventMinimumNoticeTime',
    'calendarEventMinimumNoticeTimePeriod',
    'calendarEventDailyLimit',
    'mySchedules',
    'selectedSchedule'
  ],
  components: {
    DropzoneUploader,
    VueSlickCarousel,
    DatePicker
  },
  methods: {
    goTo (route) {
      router.push(route)
    },
    saleDateRangeFormatted () {
      let range = this.saleDateRange
      return [new Date(range[0]), new Date(range[1])]
    },
    compareArrays (arr1, arr2) {
      for (let a in arr1) {
        for (let b in arr1[a]) {
          if (!(arr2 && arr2[a] && arr2[a][b]) || (arr1[a][b] !== arr2[a][b])) {
            return false
          }
        }
      }
      return true
    },
    scheduleText (schedule) {
      console.log('scheduleText', schedule)
      let dailyTimesEnabled = schedule.dailyTimesEnabled
      let dailyTimes = schedule.dailyTimes
      let daysStrings = [[]]
      let stringsCounter = daysStrings.length - 1

      for (let day in [0, 1, 2, 3, 4, 5, 6]) {
        if (dailyTimesEnabled[day]) {
          daysStrings[stringsCounter].push(day)
          console.log('1', daysStrings, daysStrings[stringsCounter])
        } else if (daysStrings[stringsCounter].length > 0) {
          daysStrings.push([])
          stringsCounter = daysStrings.length - 1
        }
      }
      // make string based on dates
      console.log('2', daysStrings, daysStrings.length - 1, daysStrings[daysStrings.length - 1], daysStrings[daysStrings.length - 1].length == 0)
      if (daysStrings[daysStrings.length - 1].length == 0) {
        console.log('3')
        daysStrings.splice(daysStrings.length - 1, 1)
      }
      let stringText = ' ('

      if (daysStrings.length > 0) {
        for (let day in daysStrings) {
          stringText = stringText + this.dayName(daysStrings[day][0], true)
          if (daysStrings[day].length > 1) {
            stringText = stringText + ' – ' + this.dayName(daysStrings[day][daysStrings[day].length - 1], true)
          }
          stringText = stringText + (day < daysStrings.length - 1 ? ', ' : '')
        }
      }

      let hasString = false
      let checkString = null
      let hoursVary = false

      for (let s in daysStrings) {
        if (hoursVary) { break }
        for (let t in daysStrings[s]) {
          console.log('check', daysStrings[s][t])
          if (!hasString) {
            checkString = dailyTimes[daysStrings[s][t]]
            hasString = true
          } else {
            if (!this.compareArrays(checkString, dailyTimes[daysStrings[s][t]])) {
              hoursVary = true
              break
            }
          }
        }
      }

      let hours = ''
      if (!hoursVary) {
        for (let i in checkString) {
          hours = hours + checkString[i][0] + ' – ' + checkString[i][1]
        }
      }

      // schedule.dateSpecificTimes
        // 

      stringText = stringText + (hoursVary ? ', Hours Vary' : ', ' + hours)
      stringText = stringText + ')'

      return stringText
      // return ' (Weekdays, hours vary)'
    },
    dayName (d, shorten) {
      let arr = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]
      console.log('dayName', arr, d, arr[d])
      if (shorten) {
        return arr[d]
        // return arr[d].substr(0, 1)
      } else {
        return arr[d]
      }
    },
    setFreeProduct (freeProduct) {
      this.$emit('setFreeProduct', freeProduct)
    },
    openScheduleEditor (selectedSchedule) {
      this.$emit('openScheduleEditor', selectedSchedule)
    },
    setSelectedSchedule (data) {
      this.$emit('setSelectedSchedule', data)
    },
    setCalendarEventFutureTime (data) {
      this.$emit('setCalendarEventFutureTime', data)
    },
    setCalendarEventFutureTimePeriod (data) {
      this.$emit('setCalendarEventFutureTimePeriod', data)
    },
    setCalendarEventMinimumNoticeTime (data) {
      this.$emit('setCalendarEventMinimumNoticeTime', data)
    },
    setCalendarEventMinimumNoticeTimePeriod (data) {
      this.$emit('setCalendarEventMinimumNoticeTimePeriod', data)
    },
    setCalendarEventDailyLimit (data) {
      this.$emit('setCalendarEventDailyLimit', data)
    },
    toggleAdvancedSettings () {
      this.showAdvancedSettings = !this.showAdvancedSettings
    },
    setUseScheduleRange (useScheduleRange) {
      this.$emit('setUseScheduleRange', useScheduleRange)
    },
    setCalendarEventDateRange (calendarEventDateRange) {
      console.log('setCalendarEventDateRange', calendarEventDateRange)
      this.$emit('setCalendarEventDateRange', calendarEventDateRange)
    },
    setUsePresetMinutes (usePresetMinutes) {
      this.usePresetMinutes = usePresetMinutes
    },
    sizeSaleDateRange (size) {
      let _range = [size.sizeSaleDateRange ? size.sizeSaleDateRange[0] : '', size.sizeSaleDateRange ? size.sizeSaleDateRange[1] : '']
      let range = [
        new Date(_range[0]),
        new Date(_range[1])
      ]
      return range
    },
    calendarEventDateRangeFormatted () {
      let calendarEventDateRange = this.calendarEventDateRange
      let _range = [calendarEventDateRange ? calendarEventDateRange[0] : '', calendarEventDateRange ? calendarEventDateRange[1] : '']
      let range = [
        new Date(_range[0]),
        new Date(_range[1])
      ]
      return range
    },
    addAppointmentTime () {
      let appointment = {
        time: this.addTimeSelected,
        price: this.newCalSlotPrice
      }
      console.log('addAppointmentTime', appointment)
      this.$emit('addAppointmentTime', appointment)
      this.stopAddingCustomTimeSlot()
    },
    removeAppointmentTime (t) {
      console.log('removeAppointmentTime', t)
      this.$emit('removeAppointmentTime', t)
    },
    setSizeSaleDateRange (sizeSaleDateRange, s) {
      console.log('setSizeSaleDateRange', s, sizeSaleDateRange)
      this.$emit('setSizeSaleDateRange', {s, sizeSaleDateRange})
    },
    setSaleDateRange (setSaleDateRange) {
      console.log('setSaleDateRange', setSaleDateRange)
      this.$emit('setSaleDateRange', setSaleDateRange)
    },
    setSizeName (event, s) {
      this.$emit('setSizeName', {s, name: event.target.value})
    },
    setProductSku (event, s) {
      this.$emit('setProductSku', {s, sku: event.target.value})
    },
    setSizePrice (s, price) {
      this.$emit('setSizePrice', {s, price})
    },
    setPrice (price) {
      this.$emit('setPrice', price)
    },
    setSalePrice (price) {
      this.$emit('setSalePrice', price)
    },
    setSizeFreeProduct (s, freeProduct) {
      this.$emit('setSizeFreeProduct', {s, freeProduct})
    },
    setSizeSalePrice (s, salePrice) {
      this.$emit('setSizeSalePrice', {s, salePrice})
    },
    setSizeStock (event, s) {
      this.$emit('setSizeStock', {s, stock: event.target.value})
    },
    setSizeWeight (event, s) {
      this.$emit('setSizeWeight', {s, weight: event.target.value})
    },
    changeRedirectUrl (event) {
      this.$emit('changeRedirectUrl', event)
    },
    stopProp (event) {
      event && event.stopPropagation()
    },
    startAddingCustomTimeSlot () {
      this.addCustomTimeSlot = true
    },
    stopAddingCustomTimeSlot () {
      this.addCustomTimeSlot = false
    },
    toggleAppointmentLength (length) {
      let appointmentLengths = this.appointmentLengths
      let index = appointmentLengths.indexOf(length)

      if (index == -1) {
        appointmentLengths.push(length)
      } else {
        appointmentLengths.splice(index, 1)
      }

      this.appointmentLengths = appointmentLengths
    },
    priceOnStep2 () {
      return (this.productType == 'digital-download')
    },
    uploadedImage (data) {
      console.log('setting url', data.url)
      // this.productImage = data.url
      this.$emit('setProductDeliveryFile', data)
    },
    removeImage () {
      console.log('removing image')
      // this.productImage = ''
      this.$emit('setProductDeliveryFile', {})
    },
    checkNewCalSlotPrice (event) {
      let newPrice = event.target.value
      if (newPrice < 0.99) {
        this.newCalSlotPrice = 0.99
      } else {
        this.newCalSlotPrice = newPrice
      }
    },
    checkPrice (event, s) {
      let newPrice = event.target.value
      if (newPrice < 0.99) {
        this.setSizePrice(s, 0.99)
      } else {
        this.setSizePrice(s, newPrice)
      }
    },
    checkSinglePrice (event) {
      let newPrice = event.target.value
      if (newPrice < 0.99) {
        this.setPrice(0.99)
      } else {
        this.setPrice(newPrice)
      }
    },
    checkSalePrice (event, s) {
      let newPrice = event.target.value
      if (newPrice < 0.99) {
        this.setSizeSalePrice(s, 0.99)
      } else {
        this.setSizeSalePrice(s, newPrice)
      }
    },
    checkSingleSalePrice (event) {
      let newPrice = event.target.value
      if (newPrice < 0.99) {
        this.setSalePrice(0.99)
      } else {
        this.setSalePrice(newPrice)
      }
    },
    toggleFree (freeProduct, fromInput) {
      if (freeProduct) {
        console.log('from price0', this.freeProduct)
        this.setPrice(0)
      } else {
        console.log('from price', this.freeProduct)
        if (this.price == 0) {
          console.log('from price2')
          this.setPrice(0.99)
        }
      }
      this.setFreeProduct(freeProduct)
    },
    toggleNewCalSlotFree (freeProduct, fromInput) {
      if (freeProduct) {
        console.log('from price0', this.newCalSlotFreeProduct)
        this.newCalSlotPrice = 0
      } else {
        console.log('from price', this.newCalSlotFreeProduct)
        if (this.newCalSlotPrice == 0) {
          console.log('from price2')
          this.newCalSlotPrice = 0.99
        }
      }
      this.newCalSlotFreeProduct = freeProduct
    },
    adjustNewCalSlotPrice () {
      console.log('adjustNewCalSlotPrice', this.newCalSlotFreeProduct)
      if (this.newCalSlotFreeProduct) {
        // this.price = 0
        this.newCalSlotPrice = 0
      } else {
        // this.price = 0.99
        this.newCalSlotPrice = 0.99
      }
    },
    
    
    toggleFreeSize (s, freeProduct, fromInput) {
      console.log('toggleFreeSize (s, freeProduct, fromInput)', s, freeProduct, fromInput)
      if (freeProduct) {
        console.log('from price0', this.sizes[s].freeProduct)
        // this.sizes[s].price = 0
        this.setSizePrice(s, 0)
        this.setSizeFreeProduct(s, true)
      } else {
        console.log('from price', this.sizes[s].freeProduct)
        if (this.sizes[s].price == 0) {
          console.log('from price2')
          // this.sizes[s].price = 0.99
          this.setSizePrice(s, 0.99)
          this.setSizeFreeProduct(s, false)
        }
      }
      // this.sizes[s].freeProduct = freeProduct
      this.setSizeFreeProduct(s, freeProduct)
    },
    adjustPrice (s) {
      console.log('adjustPrice', this.freeProduct)
      if (this.freeProduct) {
        // this.price = 0
        this.setPrice(0)
      } else {
        // this.price = 0.99
        this.setPrice(0.99)
      }
    },
    adjustSinglePrice() {
      console.log('adjustPrice', this.freeProduct)
      if (this.freeProduct) {
        // this.price = 0
        this.setPrice(0)
      } else {
        // this.price = 0.99
        this.setPrice(0.99)
      }
    },
    addSize () {
      let sizes = this.sizes
      sizes.push({
        name: 'large',
        sku: '',
        weightLb: 0
      })
      this.sizes = sizes
    },
    deleteSize (s) {
      let sizes = this.sizes
      sizes.splice(s, 1)
      this.sizes = sizes
    },
  },
  computed: {

  },
  created () {
  },
  mounted () {
    if (!this.selectedSchedule) {
      if (Object.keys(this.mySchedules || {})[0]) {
        console.log('this.setSelectedSchedule(Object.keys(this.mySchedules || {})[0])')
        console.log({target: {value: Object.keys(this.mySchedules || {})[0]}})
        // console.log(this.setSelectedSchedule(Object.keys(this.mySchedules || {})[0]))
        this.setSelectedSchedule({target: {value: Object.keys(this.mySchedules || {})[0]}})
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
      justify-content: center;
      align-items: center;
      /*gap: 24px;*/

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
  .i32 {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    border-radius: 1px !important;
    border-color: #bbb;
  }
  .f1_plus {
    width: unset;
    flex: 1;
  }
  .or-set-as-free {
    margin-left: 16px;
    gap: 16px;

    .or {
      color: #5C5C5C;
      text-align: center;
      font-size: 9px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-transform: uppercase;
    }

    .set-as-free {
      color: #000;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
    }
  }
  .input-text-i {
    overflow: hidden;
    /*color: #5C5C5C;*/
    text-overflow: ellipsis;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
  }
  .price-input-wrapper {
    position: relative;

    &-input {
      padding-left: calc(16px + 9px);
    }

    &::after {
      position: absolute;
      display: block;
      width: 20px;
      height: 20px;
      top: 50%;
      left: 16px;
      content: '$';
      font-size: 14px;
      font-family: Kollektif;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      transform: translate(0, calc(-50% - 4.5px));
    }
  }
  .disabled-1 {
    opacity: 0.5;
  }
  .disabled-2 {
    &::after {
      opacity: 0.5;
    }
  }
  .g16 {
    gap: 16px;
  }
  .ml4 {
    margin-left: 4px;
  }

  ._tooltip {
    &-wrap {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-info {
      position: absolute;
      /*display: none;*/
    }
  }

.product-size {
  background-color: #f6f6f6;
  border-radius: 10px;
  padding: 10px;
  margin-right: 20px;
}

.add-size {
  font-size: 14px;
  text-decoration: underline;
}
.size-actions {
  p {
    font-size: 12px;
  }
}

.separator {
  height: 1px;
  border: none;
  background-color: #ccc;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
}


.no-all-cap {
  text-transform: none;
}

.appointment-length {
  cursor: pointer;
  opacity: 0.375;
  
  input {
    cursor: pointer;
    width: 24px;
    flex: unset;
    margin: 0;
  }

  p {
    margin-left: 20px;
    color: #000;
  }

  &.appointment-length-selected {
    opacity: 1;
    p {
      font-weight: 600;
    }
  }
}

.appointment-length-options-2 {
  gap: 20px;
}

.appointment-length-2 {
  width: 160px;
  cursor: pointer;
  opacity: 0.375;
  border-radius: 10px;
  border: 0.5px solid transparent;
  height: 36px;
  display: flex;
  padding-left: 12px;
  padding-right: 30px;
  /*justify-content: center;*/
  align-items: center;
  background-color: #fbfbfb;
  border: 1px solid #f6f6f6;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.27);
  position: relative;
  
  p {
    font-size: 13px;
    text-align: center;
    color: #000;
  }

  .fzx {
    /*font-size: 12px;*/
    font-weight: 600;
    color: #44d600;
  }

  &.appointment-length-selected {
    opacity: 1;
    p {
    }
  }

  .remove-time-option {
    position: absolute;
    right: 4px;
    top: 5px;
    opacity: 0.5;
    width: 15px;
  }

  &.appointment-add-time {
    background-color: transparent;
    border-color: #8a8a8a;
    i {
      font-size: 14px
    }

    p {
      margin-left: 5px !important;
    }
  }
}
.full-screen-select {
  background-color: #00000033;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
}
.options-box {
  h2 {
    color: #000;
  }
  background-color: #fff;
  border-radius: 14px;
  padding: 20px;
  min-width: 400px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
}
.slot-type {
  input.type-select {
    width: unset;
    margin: 0;
  }
  input.type-custom {

  }
}
.close-custom-menu {
  cursor: pointer;
  position: absolute;
  right: 16px;
  top: 16px;
  font-size: 14px;
  opacity: 0.615;
}

.fz14 {
  font-size: 12px;
  line-height: 1em;
}

.dropdown {
  border-radius: 6px;
  margin-bottom: 6px;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  height: 44px;
  font-size: 16px;
  width: 100%;
  background: white;
}

.mb6 {
  margin-bottom: 6px !important;
  margin-right: 10px !important;
}

.scheduling-options {
  & > span {
    input[type=radio] {
      width: 16px;
      min-width: 16px;
      margin-right: 10px;
    }
  }
}
.no-break {
  white-space: nowrap;
}

.w_1 {
  width: 80px;
  max-width: 80px;
}

.w_2 {
  max-width: 140px;
}

.w_25 {
  max-width: 160px;
}

.w_3 {
  max-width: 220px;
}

.w_4 {
  max-width: 100px;
}

.mt__ {
  margin-top: 18px;
}

.hr-1 {
  width: 100%;
  height: 1px;
  max-height: 1px;
  border: none !important;
  background-color: #999;
}
.button-0 {
  box-shadow: none !important;
  color: #999 !important;
  font-weight: 400;
  margin-top: 10px;
}

.add-appointment-time {
  font-size: 18px;
  line-height: 1em;
  cursor: pointer;
}
.work-hours-dropdown-wrapper {
  position: relative;
}
.work-hours-edit {
  position: absolute;
  background-color: #fff;
  padding-right: 20px;
  padding-left: 5px;
  right: 18px;
  top: 50%;
  font-size: 14px;
  transform: translateY(calc(-50% - 2.5px));
  color: #44d600;
  line-height: 1em;
  cursor: pointer;
}
.muted {
  opacity: 0.5;
}

.not-pro-overlay {
  display: none;
}

.not-pro {
  position: relative;
  .not-pro-overlay {
    display: block;
    position: absolute;
    width: 100%;
    height: 45px;
    bottom: 5px;
    left: 0;
    background-color: #f3f3f3ee;
    border-radius: 6px;
    z-index: 40;
    & > div {
      height: 100%;
      gap: 10px;

      p {
        font-size: 14px;
      }
    }
  }
}

.wun {
  width: unset !important;
}

.pr_x {
  /*padding-right: 70px;*/
}

</style>
