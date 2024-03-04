<template>
  <div class="appointment-length-options-2 w100p df fdc posrel">

    <!-- <select v-if="showTimeSelector && !appointmentTimeSelected" id="appt-time" @change="timeInputChanged($event)">
      <option :value="false"></option>
      <option v-for="(slot, s) in availableAppointmentTimesToShow" :value="s">{{slot[0]}} – {{slot[1]}}</option>
    </select> -->
    <div class="w100p df fdc">
      <div class="w100p df fdc" v-if="!showTimeSelector">
        <h4 class="text-dark mb10">Duration</h4>
        <div class="w100p df fww g_">
          <span v-for="(time, t) in calendarDetails.appointmentLengths" @click="selectAppointmentTime(t)"
            class="df aic appointment-length-2"
            :class="{'selected-time': selectedAppointmentTime === t}"
            >
            <p class="f1 df fdc aic">
              <span>{{time.time}} minutes</span>
              <span class="time-price">${{time.price}}</span>
            </p>
          </span>
        </div>
      </div>
      <h4 v-if="calendarReady && !showTimeSelector" class="text-dark mt20 mb10">Date & Hour</h4>
      <VCalendar
        @transition-end="transitionEnd($event)"
        @did-move="didMove($event)"
        @update="updatePages($event)"
        @dayclick="selectCalendarDay($event)"
        :class="{'hide-element': !calendarReady || showTimeSelector}"
        :available-dates="availableDates"
        :disabled-dates="disabledDates"
        :min-page="minPage()"
        :max-page="maxPage()"
        id="calendar"
      />
    </div>
    <!-- <input step="300" ref="timeInput" type="time" name="" :model="appointmentTimeSelected" class="_o0" @input="timeInputChanged($event)"> -->

    <!-- <label for="appt-time">Choose an appointment time: </label> -->
    <!-- <input id="appt-time"
            class="_o0"
            ref="timeInput"
            list="times"
            type="time"
            name="appt-time"
            :model="appointmentTimeSelected"
            step="300"
            @change="timeInputChanged($event)"> -->


    <div v-if="showTimeSelector && !appointmentTimeSelected" id="appt-time" class="appointment-time-selector w100p df fdc">
      <h3 class="mb10">Appointment time ({{selectedCalendarDay.label}})</h3>
      <h4 v-for="(slot, s) in availableAppointmentTimesToShow" class="button-0 select-time" @click="timeInputChanged(s)">
        {{minutesToHhMm(slot[0])}} – {{minutesToHhMm(slot[1])}}
      </h4>
    </div>

    <p v-if="(showTimeSelector && !appointmentTimeSelected) || (selectedAppointmentTime || (selectedAppointmentTime === 0))" class="timezone w100p mt10">Event timezone: {{productData.myTimezone}}</p>


    <p v-if="appointmentTimeSelected || (appointmentTimeSelected === 0)" id="appointment-time curp" class="time-booked mt5 df aic" @click="startShowTimeSelector()">
      {{minutesToHhMm(availableAppointmentTimesToShow[appointmentTimeSelected][0])}} – {{minutesToHhMm(availableAppointmentTimesToShow[appointmentTimeSelected][1])}} <img class="ml_" src="../../../static/brand-icons/chevron-down-brand-color.svg"></p>
  </div>
</template>

<script>
export default {
  name: 'Scheduler',
  data () {
    return {
      showTimeSelector: false,
      availableAppointmentTimesToShow: [],
      schedule: {},
      bookedTimes: {},
      productData: {},
      appointmentTimeSelected: false,
      calendarDetails: {},
      calendarReady: false,
      disabledDates: [
        { start: null, end: new Date() }
      ],
      availableDates: [
        { start: new Date(), end: null }
      ],
      selectedAppointmentTime: false,
      maxDaysForward: 180,
      selectedCalendarDay: false
    }
  },
  props: [
    'user',
    'uniqueid',
    'readyToAdd',
    'setNewAppointmentDate',
  ],
  components: {

  },
  methods: {
    minutesToHhMm (mm) {
      let hours = Math.floor(mm/60)
      let minutes = mm % 60

      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }

      return hours + ':' + minutes
    },
    timeInputChanged (event) {
      console.log('1', this.appointmentTimeSelected)
      console.log('2', this.selectedAppointmentTime)
      console.log('3', event)
      console.log('4', this.availableAppointmentTimesToShow)


      this.appointmentTimeSelected = event

      // let appointmentStartTime = this.calendarDetails.show[this.appointmentTimeSelected]
      let appointmentStartTime = this.availableAppointmentTimesToShow[event][0]
      console.log('appointmentStartTime', appointmentStartTime)

      // this.selectedAppointmentTime = true
      
      this.$nextTick(() => {
        // document.getElementById('appointment-time').scrollIntoView();

        this.setNewAppointmentDate({
          times: this.calendarDetails.appointmentLengths,
          selectedAppointmentTime: this.selectedAppointmentTime,
          selectedCalendarDay: this.selectedCalendarDay.id,
          appointmentTimeSelected: this.appointmentTimeSelected,
          appointmentStartTime
        })

        this.showTimeSelector = false
        this.readyToAdd(true)

        console.log('!!!!!!')
        console.log(this.selectedCalendarDay.id)

        let el = document.getElementById('item-options')
        console.log('el', el)

        setTimeout(() => {
          el.scrollTo(0, el.scrollHeight + 120);
        }, 100)
      })
      
    },
    selectAppointmentTime (t) {
      console.log('selectAppointmentTime', t)
      let length = this.calendarDetails.appointmentLengths[t]
      let el = document.getElementById('selected-date')
      el ? el.id = '' : null
      el ? el.classList.remove('selected-date') : null
      this.selectedAppointmentTime = t
      this.appointmentTimeSelected = false
      this.showTimeSelector = false
      this.readyToAdd(false)
      this.loadAvailableDatesToCalendar()
    },
    transitionEnd (event) {
      console.log('transitionEnd', event)
    },
    didMove (event) {
      console.log('didMove', event)
    },
    updatePages (event) {
      console.log('updatePages', event)
    },
    minDate () {
      var someDate = new Date()
      return someDate
    },
    maxDate () {
      var someDate = new Date()
      var numberOfDaysToAdd = this.maxDaysForward
      var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd)
      return someDate
    },
    minPage () {
      var today = new Date()
      return {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
      }
    },
    maxPage () {
      var today = this.maxDate()
      return {
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear()
      }
    },
    selectCalendarDay (event) {
      console.log('selectCalendarDay', event.id)
      let available = this.availableDates.filter(v => {
        return v == event.id
      })
      if (available[0]) {
        let el = document.getElementById('selected-date')
        el ? el.id = '' : null
        el ? el.classList.remove('selected-date') : null
        this.selectedCalendarDay = {id: event.id, label: event.ariaLabel, el: event.el}
        this.appointmentTimeSelected = false
        this.readyToAdd(false)


        let appointment = this.calendarDetails.appointmentLengths[this.selectedAppointmentTime]
        event.el.id = 'selected-date'
        event.el.classList.add('selected-date')
        console.log('HERE!!! 1', event.el)
        console.log('HERE!!! 2', event)
        this.loadAvailableTimeSlots(event.id, appointment.time) // day, appointmentLength
        
      }
    },
    loadAvailableTimeSlots (day, appointmentLength) {
      console.log('loadAvailableTimeSlots', day, appointmentLength)
      let schedule = this.schedule
      let dailyTimes = schedule.dailyTimes
      let dateSpecificTimes = schedule.dateSpecificTimes || []
      let availableTimesThisDay = []
      let availableTimeSlots = []
      if (dateSpecificTimes.filter(v => v[0] == day)[0]) {
        let _v = dateSpecificTimes.filter(v => v[0] == day)[0]
        let _i = dateSpecificTimes.indexOf(_v)
        availableTimesThisDay = _v[2]
      } else {
        let thisDay = new Date(day)
        let dayOfWeek = thisDay.getDay()
        availableTimesThisDay = dailyTimes[dayOfWeek]
      }
      console.log('availableTimesThisDay ====>', availableTimesThisDay)
      for (let rangeId in availableTimesThisDay) {
        let range = availableTimesThisDay[rangeId]
        console.log('range', range[0], range[1])
        console.log('range2', range[0].split(':'), range[1].split(':'))
        let hhStart = parseInt(range[0].split(':')[0])
        let mmStart = parseInt(range[0].split(':')[1])
        let hhEnd = parseInt(range[1].split(':')[0])
        let mmEnd = parseInt(range[1].split(':')[1])
        let hh = parseInt(hhEnd) - parseInt(hhStart)
        let mm = parseInt(mmEnd) - parseInt(mmStart)
        let minutesAtStart = hhStart * 60 + mmStart
        let minutesAtEnd = hhEnd * 60 + mmEnd
        let minutesAvailable = hh * 60 + mm
        console.log('minutesAtStart', minutesAtStart)
        console.log('minutesAtEnd', minutesAtEnd)
        console.log('minutesAvailable', minutesAvailable)

        let tryThisManySlots = Math.floor(minutesAvailable/appointmentLength)

        for (let i = 0; i < tryThisManySlots; i = i + 1) {
          let startTimeMinutes = minutesAtStart + (i * appointmentLength)
          let endTimeMinutes = startTimeMinutes + appointmentLength
          availableTimeSlots.push([startTimeMinutes, endTimeMinutes])
        }
        console.log('availableTimeSlots', availableTimeSlots)
        this.availableAppointmentTimesToShow = availableTimeSlots
      }
      this.startShowTimeSelector()
      // this.$refs.timeInput.showPicker()
    },
    loadAvailableDatesToCalendar () {
      this.selectedCalendarDay = false
      let startDate = new Date()
      let endDate = new Date()
      endDate = new Date(endDate.setDate(endDate.getDate() + (365 * 2)))

      console.log('1 *********************************************')
      // console.log('startDate', startDate)
      // console.log('endDate', endDate)
      // console.log('2 *********************************************')
      console.log('useScheduleRange:', this.productData.useScheduleRange)
      console.log('calendarEventDateRange:', this.productData.calendarEventDateRange)
      console.log('calendarEventFutureTime:', this.productData.calendarEventFutureTime)
      console.log('calendarEventFutureTimePeriod:', this.productData.calendarEventFutureTimePeriod)
      console.log('calendarEventMinimumNoticeTime:', this.productData.calendarEventMinimumNoticeTime)
      console.log('calendarEventMinimumNoticeTimePeriod:', this.productData.calendarEventMinimumNoticeTimePeriod)
      console.log('calendarEventDailyLimit:', this.productData.calendarEventDailyLimit)
      console.log('2 *********************************************')

      let availableDates = [
        // { start: new Date(), end: null }
      ]
      let disabledDates = [
        // { start: new Date(), end: null }
      ]

      let schedule = this.schedule
      let dailyTimes = schedule.dailyTimes
      let dailyTimesEnabled = schedule.dailyTimesEnabled
      let dateSpecificTimes = schedule.dateSpecificTimes

      if (this.productData.useScheduleRange === 0) {
        if (this.productData.calendarEventFutureTimePeriod == 'day') {
          endDate = new Date()
          endDate = new Date(endDate.setDate(endDate.getDate() + (parseInt(this.productData.calendarEventFutureTime))))
        } else if (this.productData.calendarEventFutureTimePeriod == 'weekday') {
          endDate = new Date()
          endDate = new Date(endDate.setDate(endDate.getDate() + (this.productData.calendarEventFutureTime * 7/5)))
        }
      } else if (this.productData.useScheduleRange === 1) {
        startDate = new Date(this.productData.calendarEventDateRange[0])
        endDate = new Date(this.productData.calendarEventDateRange[1])
      } else if (this.productData.useScheduleRange === 2) {
      }

      let daysBetweenStartAndEnd = (endDate.getTime() - startDate.getTime())/(1000 * 60 * 60 * 24)
      daysBetweenStartAndEnd = parseInt(daysBetweenStartAndEnd)

      for (let d = 0; d < daysBetweenStartAndEnd; d = d + 1) {
        let thisDay = new Date()
        thisDay = new Date(thisDay.setDate(thisDay.getDate() + (d)))
        let dayOfWeek = (thisDay.getDay() + 6) % 7
        if (dailyTimesEnabled[dayOfWeek]) {
          availableDates.push(thisDay.toISOString().split('T')[0])
        }
      }

      for (let d in dateSpecificTimes) {
        let overrideDate = dateSpecificTimes[d]
        if (!overrideDate[2]) {
          let _i = availableDates.indexOf(overrideDate[0])
          if (_i > -1) {
            availableDates.splice(_i, 1)
          }
        } else {
          availableDates.push(overrideDate[0])
          // add day to availableDates with overriding time set
        }
      }

      if (this.productData.calendarEventMinimumNoticeTime > 0) {
        if (this.productData.calendarEventMinimumNoticeTimePeriod == 'hour') {
          //
        } else if (this.productData.calendarEventMinimumNoticeTimePeriod == 'day') {
          for (let d = 0; d < this.productData.calendarEventMinimumNoticeTime; d = d + 1) {
            let thisDay = new Date()
            thisDay = new Date(thisDay.setDate(thisDay.getDate() + (d)))
            let thisDayString = thisDay.toISOString().split('T')[0]
            let _i = availableDates.indexOf(thisDayString)
            if (_i > -1) {
              availableDates.splice(_i, 1)
            }
          }
        }
      }

      // add disabled dates
      for (let d = 0; d < (365 * 2); d = d + 1) {
        let thisDay = new Date()
        thisDay = new Date(thisDay.setDate(thisDay.getDate() + (d)))
        let thisDayString = thisDay.toISOString().split('T')[0]
        let _i = availableDates.indexOf(thisDayString)
        if (_i < 0) {
          disabledDates.push(thisDayString)
        }
      }
      for (let d = 0; d < 35; d = d + 1) {
        let thisDay = new Date()
        thisDay = new Date(thisDay.setDate(thisDay.getDate() - d))
        let thisDayString = thisDay.toISOString().split('T')[0]
        disabledDates.push(thisDayString)
        let _i = availableDates.indexOf(thisDayString)
        if (_i > -1) {
          availableDates.splice(_i, 1)
        }        
      }
      console.log('5 *********************************************')
      console.log('availableDates', availableDates)
      console.log('disabledDates', disabledDates)

      // handle daily limit
        // for each day in availableDates
        // if more than dailyLimit # of this event exists in day
          // remove day from availableDates
      // handle existing bookings
        // for each day in availableDates
          // take bookings for this date
          // if no gap exists for selected session time due to date being full
            // remove day from availableDates 


      this.availableDates = availableDates
      this.disabledDates = disabledDates
      this.calendarReady = true
      this.$nextTick(() => this.showCalendar())
    },
    showCalendar () {
        document.getElementById('calendar').scrollIntoView();
    },
    startShowTimeSelector () {
      console.log('showTimeSelector', this.showTimeSelector)
      this.showTimeSelector = true
      
      // this.appointmentTimeSelected = false

      // document.getElementById('appt-time').scrollIntoView();
    },
    getSchedulerDetails () {
      this.$store.dispatch('AUTH.getProductById', {
        user: this.user,
        uniqueid: this.uniqueid
      }).then((res) => {
        this.productData = {...res, loaded: true}
        this.calendarDetails = {
          appointmentLength: res.appointmentLength,
          appointmentLengths: res.appointmentLengths,
          calendarFrom: res.calendarFrom,
          calendarTo: res.calendarTo,
          myTimezone: res.myTimezone,
        }
        // get user's schedule with id productData.selectedSchedule
        console.log('getUserSchedule', this.productData.ownerId, this.productData.selectedSchedule)
        this.$store.dispatch('AUTH.getUserSchedule', {
          user: this.productData.ownerId,
          scheduleId: this.productData.selectedSchedule
        }).then((res2) => {
          console.log('SET SCHEDULE', res2)
          this.schedule = res2.schedule
        })
        this.$store.dispatch('AUTH.getUserBookings', {
          user: this.productData.ownerId,
          scheduleId: this.productData.selectedSchedule
        }).then((res2) => {
          this.bookedTimes = res2
        })
      })
    }
  },
  computed: {

  },
  created () {
    this.getSchedulerDetails()
  }
}
</script>

<style scoped lang="scss">
  .appointment-length-options-2 {
    gap: 8px;
  }

  .appointment-length-2 {
    width: calc(25% - (8px)*3/4);
    cursor: pointer;
    opacity: 0.375;
    border-radius: 10px;
    border: 1px solid transparent;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    position: relative;
    
    p {
      text-align: center;
      color: #000;
      font-family: Kollektif;
      font-size: 16px;
    }

    &.selected-time {
      opacity: 1;
      background-color: transparent; 
      border-color: #44d600;
    }
  }

  @media (max-width: 680px) {
    .appointment-length-2 {
      width: calc(50% - (8px)*2/4);
    }
  }

  .vc-container {
    width: 100%;
  }

  ._o0 {
    left: 0;
    width: 100%;
    opacity: 0;
    pointer-events: none;
    position: fixed;
  }
  .timezone {
    font-family: Kollektif;
    font-size: 14px;
    color: #888;
  }
  h4 {
    font-family: Kollektif;
  }
  .g_ {
    gap: 8px;
  }
  .time-price {
    font-size: 14px;
    line-height: 1em;
  }
  .ml_ {
    margin-left: 4px;
  }
  #appt-time {
    /*position: absolute;*/
    bottom: 0;
    width: 100%;
    /*height: 320px;*/
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    z-index: 2;
  }
  .appointment-time-selector {
    background-color: #fff;
  }
  .select-time {
    text-align: left !important;
    justify-content: flex-start;
    height: 40px;
  }
  .hide-element {
    opacity: 0;
    pointer-events: none;
    position: fixed;
    z-index: -1;
  }
</style>
