<template>
  <div class="wrapper df fdc jcc aifs jcsb">

    <h2 v-if="show_bgColor_picker">Select Background Color</h2>
    <h2 v-else-if="show_textColor_picker">Select Text Color</h2>
    <h2 v-else>New Post</h2>

    <span class="colors df fdr w100p space1">
      <span v-if="show_bgColor_picker ||
                  show_textColor_picker" class="color-pickers df fdc aic jcc">
        <color-picker v-if="show_bgColor_picker" class="color-pick" v-model="bgColor"></color-picker>
        <color-picker v-if="show_textColor_picker" class="color-pick" v-model="textColor"></color-picker>
        <button class="button button-1 button-dark curp df jcc aic space5 min-width-1"
                v-if="show_textColor_picker"
                @click="showColorPicker('textColor', false)">SET</button>
        <button class="button button-1 button-dark curp df jcc aic space5 min-width-1"
                v-if="show_bgColor_picker"
                @click="showColorPicker('bgColor', false)">SET</button>
      </span>
      <span v-else class="field-wrapper color-swatches df fdr w100p">
        <span class="color-field f1 title df fdc">
          <span class="color-swatch"
              @click="showColorPicker('bgColor', true)"
              :style="[
                        true ? {'background-color': bgColor} : {}
                      ]"></span>
          <p class="bg-color-label space4">Background Color</p>
        </span>
        <span class="field-wrapper color-field f1 title df fdc">
          <span class="color-swatch"
              @click="showColorPicker('textColor', true)"
              :style="[
                        true ? {'background-color': textColor} : {}
                      ]"></span>
          <p class="bg-color-label space4">Text Color</p>
        </span>
      </span>
    </span>


    <span class="new-post space1 df fdc w100p"
          :style="[
            true ? {'background-color': bgColor} : {}
          ]">
      <!-- Title -->
      <span class="field-wrapper title w100p">
        <input type="text"
                v-model="title"
                placeholder="Post Title"
                class="w100p title-input space3"
                :style="[
                    true ? {'color': textColor} : {}
                  ]"/>
      </span>

      <hr class="w100p"/>

      <!-- Text -->
      <span class="field-wrapper text">
        <textarea v-model="text"
                  class="fulltext w100p space3"
                  placeholder="Any text"
                  :style="[
                      true ? {'color': textColor} : {}
                    ]">
        </textarea>
      </span>
    </span>
    <hr class="w100p"/>
    
    <!-- Tags - 3 max -->
    <span class="field-wrapper title w100p df tags-fields">
      <input type="text" v-model="tags[0]" placeholder="Tag 1" class="tag-field" />
      <input type="text" v-model="tags[1]" placeholder="Tag 2" class="tag-field"/>
      <input type="text" v-model="tags[2]" placeholder="Tag 3" class="tag-field"/>
    </span>


    <!-- Media -->
<!--     <span class="field-wrapper media">
      <span class="add-media">
        + Add Media
      </span>
    </span> -->

    <!-- Question -->
<!--     <span class="field-wrapper question">
      <input type="checkbox" name="" v-model="show_question">
      <input type="text"
              v-model="question"
              placeholder="My Question"
              v-bind:disabled="!show_question" />
    </span> -->

    <!-- Poll -->
<!--     <span class="field-wrapper poll">
      <input type="checkbox" name="" v-model="show_poll">
      <input type="text"
              v-model="poll"
              placeholder="My Poll Title"
              v-bind:disabled="!show_poll" />
    </span> -->

    <!-- Show To Others? -->
<!--     <span class="field-wrapper df">
      <p>-</p>
      <p>{{show}}</p>
      <p>+</p>
    </span> -->

    <!-- Actions -->
    <span class="field-wrapper rating df space1 jcsb aic w100p"
          v-if="!(show_bgColor_picker ||
                  show_textColor_picker)">
      <p @click="publishPost()" class="button button-1 button-dark curp df jcc aic post-button">Post</p>
      <p @click="savePost()" class="space2 save-button">Save</p>
    </span>

  </div>

  <!-- Messenger -->
</template>

<script>
import router from '@/router'
import ColorPicker from 'vue-color-picker-wheel';

export default {
  name: 'NewPostPage',
  data () {
    return {
      title: '',
      text: '',
      media: '',
      show_question: false,
      question: '',
      show_poll: false,
      poll: '',
      show: 0,
      tags: [],
      textColor: '#000000',
      bgColor: '#ffffff',
      show_bgColor_picker: false,
      show_textColor_picker: false
    }
  },
  props: ['mode'],
  components: {
    ColorPicker
  },
  methods: {
    closePopup () {
    },
    goTo (route) {
      router.push(route)
    },
    showColorPicker (picker, value) {
      let pickers = [
        'bgColor',
        'textColor'
      ]
      for (let one in pickers) {
        this['show_' + pickers[one] + '_picker'] = false
      }
      this['show_' + picker + '_picker'] = value
    },
    publishPost () {      
      this.$store.dispatch('publishPost', {
        title: this.title,
        text: this.text,
        media: this.media,
        show_quest: this.show_questionion,
        question: this.question,
        show_poll: this.show_poll,
        poll: this.poll,
        show: this.show,
        uid: this.$store.getters.uid,
        status: 'public',
        tags: this.tags,
        textColor: this.textColor,
        bgColor: this.bgColor
      })
    },
    savePost () {      
      this.$store.dispatch('savePost', {
        title: this.title,
        text: this.text,
        media: this.media,
        show_quest: this.show_questionion,
        question: this.question,
        show_poll: this.show_poll,
        poll: this.poll,
        show: this.show
      })
    },
    cancel () {
      router.push('/dash')
    }
  },
  computed: {

  },
  watch: {
  },
  mounted () {
  },
  created () {
    // console.log('==>', this.$route);
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/settings.scss";

.wrapper {
  padding: $outerPadding1;
  padding-top: 0;
  position: relative;
  /*padding: $padding1;*/
}
.space1 {
  margin-top: 20px;
}
.space2 {
  margin-left: 10px;
}
.space3 {
  margin-top: 10px;
}
.space4 {
  margin-top: 4px;
}
.space5 {
  margin-top: 15px;
}
.color-swatch {
  border: 1px solid $blackA;
  width: 100%;
  height: 55px;
}
.color-field {
  max-width: 30%;

  @media (max-width: 1000px) {
    max-width: 40%;
  }

  @media (max-width: 800px) {
    max-width: unset;
  }
}
.fulltext {
  height: 30vh;
  max-height: 400px;
  border: none;
  background-color: transparent;
}
.title-input {
  font-size: 18px;
}
.bg-color-label {
  font-size: 14px;
  color: $greyB;
}
.color-pickers {
  /*position: absolute;*/
  background-color: $white;
  width: 100%;
}
.min-width-1 {
  width: 80px;
}
.tag-field {
  flex: 1;
  text-align: center;
}
.post-button {
  width: 100px;
}
.save-button {
}
.tags-fields {
  @media (max-width: 590px) {
    flex-direction: column;
  }
}

</style>
