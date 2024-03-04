<template>
  <div class="faq-wrapper df fdc aic f1 w100p">

    <div class="video-module">
      <div class="container">
        <video id="video" ref="input_video" width="100%" height="100%"></video>
        <canvas
          class="output_canvas"
          ref="output_canvas"
          :width="width"
          :height="height"
        ></canvas>
      </div>
    </div>

    <div class="faq-splash df fdc aic">
      <h1 class="w100p">Work Time Tracking</h1>

      <div
        v-for="(index, i) in $store.getters['AUTH.myWork']"
        v-if="$store.getters['AUTH.myWork'][i].status == 1"
        class="w100p period df fww jcsb aic" :class="{'mt20': firstOfDay(i)}">

        <div v-if="firstOfDay(i)" class="w100p df fdc day-title-wrapper">
          <div class="w100p df jcsb aic day-row">        
            <h3 class="w100p">{{dayLabel($store.getters['AUTH.myWork'][i].time)}}</h3>
            <p class="f1">{{totalTime(totalTimes()[dayLabel($store.getters['AUTH.myWork'][i].time)])}}</p>
            <p class="curp chevron" @click="collapse(dayLabel($store.getters['AUTH.myWork'][i].time))">
              {{collapsed.indexOf(dayLabel($store.getters['AUTH.myWork'][i].time)) < 0 ? '▲' : '▼'}}
            </p>
          </div>
          <div v-if="!(collapsed.indexOf(dayLabel($store.getters['AUTH.myWork'][i].time)) < 0)" class="w100p df jcsb aic title-row">
            <h4 class="f1">From</h4>
            <h4 class="f1">To</h4>
            <h4 class="f1">Length</h4>
            <h4 class="f1">Break</h4>
          </div>
        </div>

        <div v-if="!(collapsed.indexOf(dayLabel($store.getters['AUTH.myWork'][i].time)) < 0)" class="w100p df jcsb fww data-row">
          <p class="f1">
            {{time($store.getters['AUTH.myWork'][i].time)}}
          </p>
          <p class="f1" v-if="i + 1 < $store.getters['AUTH.myWork'].length">
            {{time($store.getters['AUTH.myWork'][i + 1].time)}}
          </p>
          <p class="f1" v-else>-</p>
          <p class="f1" v-if="i + 1 < $store.getters['AUTH.myWork'].length">
            {{totalTime($store.getters['AUTH.myWork'][i + 1].time - $store.getters['AUTH.myWork'][i].time)}}
          </p>
          <p class="f1" v-else>-</p>
          <p class="f1" v-if="i + 2 < $store.getters['AUTH.myWork'].length">
            {{totalTime($store.getters['AUTH.myWork'][i + 2].time - $store.getters['AUTH.myWork'][i + 1].time)}}
          </p>
          <p class="f1" v-else>-</p>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

import router from '../router'
import LandingProduct from '@/components/LandingProduct'
import common from '@/util/common'

import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

export default {
  name: 'Work',
  data () {
    return {
      loading: false,
      work: {},
      collapsed: [],

      number: null,
      ctx: null,
      width: null,
      height: null,
    }
  },
  computed: {
    inputVideo() {
      return this.$refs.input_video;
    }
  },
  props: [],
  components: {
    LandingProduct
  },
  methods: {
    startVideoModule () {
      const video = document.getElementById('video');
      // let video = this.$refs.input_video
      if (video) {
        this.startModule()
      } else {
        setTimeout(() => {
          this.startVideoModule()
        }, 620)
      }
    },
    startModule () {
      this.ctx = this.$refs.output_canvas.getContext('2d');
      this.init();
    },
    init() {
      const hands = new Hands({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });
      hands.setOptions({
        maxNumHands: 2,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      hands.onResults(this.onResults);

      console.log('Starting camera', video)
      const camera = new Camera(video, {
        onFrame: async () => {
          console.log('onFrame', video)
          await hands.send({ image: video });
          // console.log('onFrame', video, video.readyState)
        },
      });
      camera.start();
    },
    onResults(results) {
      console.log('onResults', results)
      this.width = results.image.width;
      this.height = results.image.height;
      this.ctx.save();
      this.ctx.clearRect(0, 0, results.image.width, results.image.height);
      this.ctx.drawImage(
        results.image,
        0,
        0,
        results.image.width,
        results.image.height
      );
      this.findHands(results);
      this.ctx.restore();
    },
    findHands(results, draw = true) {
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(this.ctx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 5,
          });
          if (draw) {
            drawLandmarks(this.ctx, landmarks, {
              color: "#FF0000",
              lineWidth: 2,
            });
          }
        }
      }
    },
    // startVideoRecognizer () {
    //   let run = async () => {
    //     // Create task for image file processing:
    //     const vision = await FilesetResolver.forVisionTasks(
    //       // path/to/wasm/root
    //       'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    //     );
    //     const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    //       baseOptions: {
    //         modelAssetPath: 'https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task'
    //       },
    //       numHands: 2
    //     });

    //     await gestureRecognizer.setOptions({ runningMode: 'video' });

    //     let lastVideoTime = -1;
    //     let renderLoop = () => {
    //       const video = document.getElementById('video');

    //       if (video.currentTime !== lastVideoTime) {
    //         const gestureRecognitionResult = gestureRecognizer.recognizeForVideo(video);
    //         processResult(gestureRecognitionResult);
    //         lastVideoTime = video.currentTime;
    //       }

    //       requestAnimationFrame(() => {
    //         renderLoop();
    //       });
    //     }
    //   }
    //   run()
    // },
    totalTimes () {
      let work = this.$store.getters['AUTH.myWork']
      let workedTimes = {}

      for (let w in work) {
        if (work[w].status == 1) {
          // console.log('w',
          //              w,
          //              parseInt(w) + 1,
          //              work[w],
          //              work[parseInt(w) + 1], // if undefined, end of list
          //              this.dayLabel(work[w].time),
          //              this.dayLabel(work[parseInt(w) + 1].time)
          //            )
          if (work[parseInt(w) + 1]) { // period ended
            if (this.dayLabel(work[w].time) == this.dayLabel(work[parseInt(w) + 1].time)) {
              let workedDuringPeriod = work[parseInt(w) + 1].time - work[w].time
              if (!workedTimes[this.dayLabel(work[w].time)]) {
                workedTimes[this.dayLabel(work[w].time)] = {}
              }
              workedTimes[this.dayLabel(work[w].time)] = ((parseInt(workedTimes[this.dayLabel(work[w].time)])) || 0) + workedDuringPeriod
            } else { // started/ended on different days

            }
          }
        }
      }

      return workedTimes
      // totalTime($store.getters['AUTH.myWork'][i + 1].time - $store.getters['AUTH.myWork'][i].time)
    },
    collapse (dayLabel) {
      let collapsed = this.collapsed
      let index = collapsed.indexOf(dayLabel)
      console.log('collapsed', collapsed, index)
      if (index < 0) {
        console.log('1')
        collapsed.push(dayLabel)
        this.collapsed = collapsed
      } else {
        console.log('2', index)
        collapsed.splice(index, 1)
        this.collapsed = collapsed
        console.log('2.2', collapsed)
      }
      console.log('3', this.collapsed)
    },
    firstOfDay (i) {
      if (this.$store.getters['AUTH.myWork'][i - 1]) {
        let day1label = this.dayLabel(this.$store.getters['AUTH.myWork'][i - 1].time)
        let day2label = this.dayLabel(this.$store.getters['AUTH.myWork'][i ].time)
        return (day1label !== day2label) || (i == 1)
      }
      return false
    },
    dayLabel (d) {
      let date = new Date(parseInt(d) - (5 * 60 * 60 * 1000))
      let today = date.toISOString().split('T')[0]
      return today
    },
    totalsByDay () {
      let myWork = this.$store.getters['AUTH.myWork']
      let totalTime = 0
      for (let day in myWork) {
        if (myWork[day].status == 1) {
          if (myWork[parseInt(day) + 1]) {
            let addTime = myWork[parseInt(day) + 1].time - myWork[day].time
            totalTime = totalTime + addTime
          }
        }
      }
      return totalTime
    },
    totalTime (t) {
      return common.msToHMS(t)
    },
    totalTime2 (t) {
      return common.msToTime(t)
    },
    time (t) {
      // console.log('t', t)
      // let date = new Date(parseInt(t))
      let date = common.formatDateTimeOnly(parseInt(t))
      return date
    },
    getMyWork () {
      this.$store.dispatch('AUTH.getWork')
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Work page created')
    this.getMyWork()
    // this.startVideoModule()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  .faq-wrapper {
    background-color: #292929;
    padding: 30px;
    padding-top: 30px;
  }
  .faq-splash {
    width: 100%;
    max-width: 720px;
  }

  .day-title-wrapper {
    background-color: #ddd;
    border-radius: 20px;
  }

  .title-row, .data-row {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    & > * {
      display: flex;
      justify-content: center;
      align-self: center;
      text-align: center;
    }
  }
  .day-row {
    & > * {
      padding: 8px 20px 6px;
      color: #000;
    }
  }
  .title-row {
    background-color: #888;
    & > * {
      padding: 10px;
    }
  }
  .data-row {
    & > * {
      padding: 8px 10px 0px;
    }
  }
  .chevron {
    width: 20px;
    display: flex;
    justify-content: center;
    align-self: center;
    line-height: 1em;
  }
  #video {
    padding: 20px;
    background-color: #ddd;
  }
</style>
