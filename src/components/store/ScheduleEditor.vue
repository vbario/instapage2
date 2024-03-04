<template>
  <div class="w100p df fdc pb_">
    <p class="back-button mb20" @click="closeScheduleEditor()">← back</p>
    <div class="w100p df fdc">
      <h3 class="mb_">Your Schedules</h3>
      <div class="w100p df aic mb___ posrel">
        <select class="dropdown special-input" :value="editorSelectedSchedule" @change="setSelectedSchedule">
          <option v-for="(schedule, s) in editableSchedules" :value="s">{{schedule.name}}</option>
        </select>
        <p class="add-a-schedule" @click="addASchedule()">+</p>
      </div>
    </div>
    <div v-if="editableSchedules[editorSelectedSchedule]" class="schedule-editor mt20">
      <h4 class="mt_">Name</h4>
      <input v-model="editableSchedules[editorSelectedSchedule].name" type="text" name="">
      <h4 class="mt_">Timezone</h4>

      <select class="dropdown fancy-dropdown" :value="editableSchedules[editorSelectedSchedule] ? editableSchedules[editorSelectedSchedule].timezone : ''" @change="setScheduleTimezone">
        <option :value="null" default>Select Timezone</option>
        <option v-for="(timezone, t) in timezones" :value="timezone.value">{{timezone.label}}</option>
      </select>

      <hr class="hr-1">

      <div class="tabs df aic" id="tabs">
        <a
          class="tab"
          :class="{'selected-tab': selectedTab == 'weekly-hours'}"
          @click="setSelectedTab('weekly-hours')">
          Weekly hours
        </a>
        <a
          class="tab"
          :class="{'selected-tab': selectedTab == 'date-specific-overrides'}"
          @click="setSelectedTab('date-specific-overrides')">
          Date overrides
        </a>
      </div>
      <hr class="hr-1 hr-1-2">

      <div v-if="selectedTab == 'weekly-hours'" class="weekly-hours">
        <div class="week">
          <div class="w100p day" v-for="(day, d) in [0, 1, 2, 3, 4, 5, 6]">
            <div class="df aic day-switch">
              <p class="add-time-to-day" @click="addTimeToDay(d)">+</p>
              <span class="f1 add-time-span"></span>
              <p class="day-name">{{dayName(d)}}</p>
              <span class="switch-wrapper">
                <label class="switch">
                  <input class="switch-input" type="checkbox" v-model="editableSchedules[editorSelectedSchedule].dailyTimesEnabled[d]">
                  <span class="slider round"></span>
                </label>
              </span>
            </div>
            <div v-if="editableSchedules[editorSelectedSchedule].dailyTimesEnabled[d]" class="df fdc f2 time-range">
              <span v-if="dailyTimes(d)" class="day-time-range df aic" v-for="(slot, s) in dailyTimes(d)">
                <input type="time" v-model="slot[0]" name="">
                <p>-</p>
                <input type="time" v-model="slot[1]" name="">
                <img class="day-remove-time" v-if="dailyTimes(d).length > 1" src="../../../static/brand-icons/x-close.svg" @click="removeTimeFromDay(d, s)">
              </span>
              <span v-if="!dailyTimes(d)" class="w100p day-time-range df jcc aic">
                <input type="time" @change="setDailyTime($event, d, 0)" name="">
                <p>-</p>
                <input type="time" @change="setDailyTime($event, d, 1)" name="">
              </span>
            </div>
            <div v-else class="df fdc f2 availability-line">
              <p class="unavailable">Unavailable</p>
            </div>
            <a v-if="editableSchedules[editorSelectedSchedule].dailyTimesEnabled[d]" class="day-add-time" @click="addTimeToDay(d)">add time +</a>
            <a v-else class="day-add-time"></a>
          </div>
        </div>
        <!-- {{editableSchedules[editorSelectedSchedule] ? editableSchedules[editorSelectedSchedule].dailyTimes : []}} -->
      </div>
      <div v-if="selectedTab == 'date-specific-overrides'" class="date-specific-overrides">
        <!-- :value="sizeSaleDateRange(size)" -->
        <!-- @change="setSizeSaleDateRange($event, s)" -->
        <div v-if="addOverride" class="w100p df fdc">
          <h3 class="mt10 mb20">Select the date(s) you want to assign specific hours</h3>
          <date-picker
            type="date"
            :editable="false"
            :multiple="true"
            :inline="true"
            :format="'DD-MM-YYYY'"
            placeholder="DD-MM-YYYY"
            time-title-format="'YYYY-MM'"
            id="overrideDatePicker"
            ref="overrideDatePicker"
            class="hidden-date-picker"
            :append-to-body="false"
            :value="newOverrideDates"
            @change="setNewOverrideDates"
            >
          </date-picker>
          <div v-if="newOverrideDates.length > 0" class="w100p override-hours df fdc mb10">
            <div class="w100p df jcsb aic mt20 mb20">
              <h4>What hours are you available?</h4>
              <span class="add-override-hours" @click="addNewOverrideSlot()">+</span>
            </div>
            <div v-if="newOverrideTimes.length > 0" class="w100p override-times df fdc">
              <div class="df aic day-time-range" v-for="(time, t) in newOverrideTimes">
                <input type="time" v-model="time[0]" name="">
                <p>-</p>
                <input type="time" v-model="time[1]" name="">
                <img class="curp remove-override-time" src="../../../static/brand-icons/x-close.svg" @click="removeOverrideHours(t)">
              </div>
            </div>
            <div v-else class="df fdc f2 availability-line">
              <p class="unavailable">Unavailable</p>
            </div>


          </div>
        </div>
        <h4 v-if="!addOverride" class="button-0 mb30" @click="startAddOverride()">
          + Add date-specific hours
        </h4>
        <div v-else class="w100 df fdc">
          <h4 class="action-button button-primary mt20" @click="addNewOverridesToSchedule()">Apply</h4>
          <h4 class="action-button button-cancel mt20" @click="endAddOverride()">Cancel</h4>
        </div>
        <div v-if="!addOverride" class="w100p df jcsb override-day" v-for="(day, d) in editableSchedules[editorSelectedSchedule] ? editableSchedules[editorSelectedSchedule].dateSpecificTimes : []">
          <p>{{day[0]}}</p>
          <p>{{day[1]}}</p>
          <span class="df fdc">
            <span v-for="(slot, s) in day[2]" class="df aic g10 mb__">
              <p>{{slot[0]}}</p>
              <p>–</p>
              <p>{{slot[1]}}</p>
            </span>
            <p v-if="!day[2] || day[2].length == 0" class="unavailable">Unavailable</p>
          </span>
          <p>{{day[3]}}</p>
          <p class="curp" @click="removeDateFromOverrides(d)">X</p>
        </div>
      </div>
      <br/>
      <br/>
      <div class="schedule-actions w100p df jcsb aic" v-if="!addOverride">
        <h4 class="action-button button-cancel" @click="closeScheduleEditor()">Cancel</h4>
        <!-- <div class="f1"></div> -->
        <h4 class="action-button button-primary" @click="saveSchedules()">
          <img
            v-if="saving"
            class="button-loading-spinner"
            src="../../../static/images/pushable/loader-black.png">
          {{saving ? '' : 'Save'}}
        </h4>
      </div>
    </div>
    <div><p class="spacer_">&nbsp;</p></div>
  </div>
</template>

<script>

import common from '@/util/common'

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: 'ScheduleEditor',
  data () {
    return {
      editableSchedules: {},
      editorSelectedSchedule: false,
      timezones: common.timezones,
      saving: false,
      selectedTab: 'weekly-hours',
      addOverride: false,

      newOverrideDates: [],
      newOverrideTimes: []
    }
  },
  props: [
    'mySchedules',
    'selectedSchedule'
  ],
  components: {
    DatePicker
  },
  methods: {
    removeTimeFromDay(d, s) {
      let dailyTimes = this.editableSchedules[this.editorSelectedSchedule].dailyTimes[d]
      dailyTimes.splice(s, 1)
      this.editableSchedules[this.editorSelectedSchedule].dailyTimes[d] = dailyTimes
    },
    addASchedule () {
      this.$store.dispatch('AUTH.addASchedule').then((res) => {
        this.$emit('getMySchedules')
      })
    },
    removeDateFromOverrides (index) {
      console.log('removeDateFromOverrides', index)
      let editableSchedules = this.editableSchedules
      let editorSelectedSchedule = this.editorSelectedSchedule
      let dateSpecificTimes = editableSchedules[editorSelectedSchedule].dateSpecificTimes
      console.log('dateSpecificTimes1', dateSpecificTimes)
      dateSpecificTimes.splice(index, 1)
      console.log('dateSpecificTimes2', dateSpecificTimes)
      editableSchedules[editorSelectedSchedule].dateSpecificTimes = dateSpecificTimes
      console.log('editableSchedules', editableSchedules)
      this.editableSchedules = editableSchedules
      this.editableSchedules[this.editorSelectedSchedule].dateSpecificTimes = dateSpecificTimes
    },
    addNewOverridesToSchedule () {
      console.log('add override dates')
      console.log(this.newOverrideDates)
      console.log('with times')
      console.log(this.newOverrideTimes)
      // for each date
      for (let d in this.newOverrideDates) {
        let date = this.newOverrideDates[d]
        console.log('date', date)
        let _day = date.toISOString().split('T')[0]
        console.log('_day', _day)
        let dateLine = [_day, _day, this.newOverrideTimes]
        let dateSpecificTimes = this.editableSchedules[this.editorSelectedSchedule].dateSpecificTimes || []
        dateSpecificTimes.push(dateLine)
        this.editableSchedules[this.editorSelectedSchedule].dateSpecificTimes = dateSpecificTimes
        // remove date from dates if already included
      }
      this.newOverrideDates = []
      this.newOverrideTimes = []
      this.endAddOverride()
    },
    addNewOverrideSlot () {
      let newOverrideTimes = this.newOverrideTimes
      newOverrideTimes.push(['09:00', '17:00'])
      this.newOverrideTimes = newOverrideTimes
    },
    removeOverrideHours (index) {
      console.log('removeOverrideHours', index, this.newOverrideTimes)
      let newOverrideTimes = this.newOverrideTimes
      newOverrideTimes = newOverrideTimes.splice(index, 1)
      console.log('removeOverrideHours2', index, this.newOverrideTimes)
      // this.newOverrideTimes = newOverrideTimes
    },
    setNewOverrideDates (data) {
      console.log('setNewOverrideDates', data)
      this.newOverrideDates = data
    },
    startAddOverride () {
      this.addOverride = true
      // setTimeout(() => {
      //   tabs.scrollIntoView({ block: 'start' });
      // }, 25)
      this.$nextTick(() => {
        let tabs = document.getElementById('tabs')
        tabs.scrollIntoView({ block: 'start' });
      })

      // document.getElementById('overrideDatePicker').click();
      // document.getElementsByClassName('overrideDatePicker').click();

      // console.log(`document.getElementsByClassName('mx-input')`, document.getElementsByClassName('mx-input'))
      // document.getElementsByClassName('mx-input')[0].click();
    },
    endAddOverride () {
      this.addOverride = false
    },
    addTimeToDay(d) {
      console.log('addTimeToDay', d)
      if (!this.editableSchedules[this.editorSelectedSchedule].dailyTimes) {
        this.editableSchedules[this.editorSelectedSchedule].dailyTimes = []
      }
      if (!this.editableSchedules[this.editorSelectedSchedule].dailyTimes[d]) {
        this.editableSchedules[this.editorSelectedSchedule].dailyTimes[d] = []
        let firstPeriod = []
        this.editableSchedules[this.editorSelectedSchedule].dailyTimes[d] = [firstPeriod]
      }
      this.editableSchedules[this.editorSelectedSchedule].dailyTimes[d].push([])
    },
    setDailyTime (event, d, index) {
      console.log('setDailyTime', event.target.value, d, index)
      if (!this.editableSchedules[this.editorSelectedSchedule].dailyTimes) {
        this.editableSchedules[this.editorSelectedSchedule].dailyTimes = []
      }
      this.editableSchedules[this.editorSelectedSchedule].dailyTimes[d] = []
      console.log('dailyTimes', this.editableSchedules[this.editorSelectedSchedule].dailyTimes[d])
      let firstPeriod = []
      firstPeriod[index] = event.target.value
      this.editableSchedules[this.editorSelectedSchedule].dailyTimes[d] = [firstPeriod]
      console.log('***', this.editableSchedules)
    },
    log () {
      console.log('editableSchedules', this.editableSchedules)
    },
    dailyTimes (d) {
      return this.editableSchedules[this.editorSelectedSchedule] ? this.editableSchedules[this.editorSelectedSchedule].dailyTimes[d] : []
    },
    dayName (d) {
      if (d == 0) {
        return 'Monday'
      } else if (d == 1) {
        return 'Tuesday'
      }  else if (d == 2) {
        return 'Wednesday'
      }  else if (d == 3) {
        return 'Thursday'
      }  else if (d == 4) {
        return 'Friday'
      }  else if (d == 5) {
        return 'Saturday'
      }  else if (d == 6) {
        return 'Sunday'
      } 
    },
    setSelectedTab (selectedTab) {
      this.selectedTab = selectedTab
      this.endAddOverride()
    },
    saveSchedules () {
      console.log('saveSchedules')
      this.$emit('saveSchedules', {schedules: this.editableSchedules})
    },
    setScheduleTimezone (timezone) {
      console.log('setScheduleTimezone', timezone.target.value)
      this.editableSchedules[this.editorSelectedSchedule].timezone = timezone.target.value
    },
    setSelectedSchedule (editorSelectedSchedule) {
      console.log('setSelectedSchedule', editorSelectedSchedule.target.value)
      this.editorSelectedSchedule = editorSelectedSchedule.target.value
      this.endAddOverride()
    },
    closeScheduleEditor () {
      this.$emit('closeScheduleEditor')
    }
  },
  computed: {

  },
  watch: {
    'mySchedules': {
      handler: function (editableSchedules) {
        this.editableSchedules = editableSchedules
      },
      deep: true,
      immediate: true
    },
    'selectedSchedule': {
      handler: function (editorSelectedSchedule) {
        this.editorSelectedSchedule = editorSelectedSchedule
      },
      deep: false,
      immediate: true
    }
  },
  created () {
  },
  mounted () {
    console.log('mounted', this.selectedSchedule)
    this.editableSchedules = this.mySchedules
    setTimeout(() => {
      this.editorSelectedSchedule = this.selectedSchedule
    }, 15)
    console.log('this.editorSelectedSchedule', this.editorSelectedSchedule)
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";

  .schedule-editor {
    background-color: #fff;
    border-radius: 12px;
    padding: 20px;
    /*margin-bottom: 20px;*/
    background-color: #f3f3f3;
    /*border: 1px solid #000;*/
  }
  .back-button {
    font-size: 14px;
    cursor: pointer;
  }
  .tabs {
    gap: 20px;
    /*margin-bottom: 20px;*/
  }
  .tab {    
    border-bottom: 4px solid transparent;
    padding-bottom: 12px;
    color: #999;
  }
  .selected-tab {
    border-color: $color-primary;
    color: #000;
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
  .mb_ {
    margin-bottom: 6px;
  }
  .mb__ {
    margin-bottom: 5px;
  }
  .mb___ {
    margin-bottom: 6px;
  }
  .mt_ {
    margin-top: 20px;
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

  .button-proceed {
    background-color: transparent;
    border: 1px solid transparent;
    color: $color-primary;
  }
  .hr-1 {
    width: calc(100% + 40px);
    height: 1px;
    max-height: 1px;
    border: none !important;
    background-color: #999;
    margin-top: 20px;
    margin-bottom: 20px;
    transform: translateX(-20px);
  }

  .hr-1-2 {
    margin-top: 0 !important;
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

  .day {
    min-height: 44px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  $day-row-offset: 10px;

  .day-name {
    font-size: 14px;
    font-weight: 600;
    width: 90px;
    min-width: 90px;
    max-width: 90px;
    margin-top: 10px;
    text-transform: uppercase;
  }
  .switch-wrapper {
    /*flex: 1;*/
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .day-time-range {
    flex: 2;
    gap: 12px;
    input {
      width: 120px;
      margin-bottom: 0;
    }
  }
  .day-remove-time {
    width: 15px;
    font-weight: 400;
    color: #777;
    font-size: 14px;
    /*min-width: 70px;*/
    /*max-width: 70px;*/
    /*margin-left: 10px;*/
    /*color: $color-primary;*/
  }
  .day-add-time {
    width: 70px;
    min-width: 70px;
    max-width: 70px;
    margin-left: 10px;
    font-size: 13px;
    color: $color-primary;
    font-weight: 600;
    margin-top: 10px;
  }
  .special-input {
    border: 1px solid $color-primary;
    margin-bottom: 0;
  }
  .availability-line {
    margin-top: 10px;
  }
  .override-day {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }


  .add-time-to-day {
    font-size: 24px;
    line-height: 24px;
    cursor: pointer;
    margin-top: 10px;
    display: none;
  }
  .add-time-span {
    display: none;
  }

  @media (max-width: 740px) {
    .day {
      flex-direction: column;
      margin-top: 10px;
      margin-bottom: 40px;

      .add-time-span {
        display: block;
      }

      .day-add-time {
        display: none;
      }

      .day-switch {
        width: 100%;
        flex-direction: row-reverse;
        margin-bottom: 10px;

        .switch-wrapper {
          margin-left: 0;
          margin-right: 20px;
        }
      }

      .time-range {
        margin-top: 10px
      }

    }

    .add-time-to-day {
      display: block;
    }
  }

  .button-0 {
    color: #000 !important; 
    border: 1px solid #000;
    height: 30px;
    box-shadow: none;
  }

  .fancy-dropdown {
    font-family: Kollektif;
    background-color: transparent;
    border: none;
    color: $color-primary;
    font-weight: 600;

    &:hover {
      background-color: #00000008;
    }
  }
  .spacer_ {
    color: transparent;
    height: 48px;
  }

  .add-override-hours {
    font-size: 24px;
    cursor: pointer;
  }

  .unavailable {
    opacity: 0.6;
    /*text-align: center;*/
  }

  .day-time-range, .unavailable {
    padding-left: 25px;
  }

  .add-a-schedule {
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    line-height: 24px;
    cursor: pointer;
  }

  .remove-override-time {
    width: 22px;
  }

</style>
