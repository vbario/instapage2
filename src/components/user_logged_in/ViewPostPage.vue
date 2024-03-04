<template>
  <div class="wrapper-post df fdc jcc aifs jcsb">

    <!-- Title -->
    <span class="field-wrapper title df fdc">
      <span class="df fdr aic space5">
        <p class="post-title">{{ title }}</p>
        <p class="post-date space1">{{ formatDate(created) }}</p>
      </span>
      <span class="space6">
        <p class="post-date curp" @click="goTo('/profile/' + $route.params.uid)">{{username}}</p>
      </span>
    </span>

    <!-- Date -->
<!--     <span class="field-wrapper text post-date">
    </span> -->

    <!-- Text -->
    <span class="field-wrapper text post-text">
      <p>{{ text }}</p>
    </span>

    <!-- Media -->
    <!-- <span class="field-wrapper media"> -->
      <!-- <span class="add-media">
        + Add Media
      </span> -->
    <!-- </span> -->

    <!-- Question -->
    <!-- <span class="field-wrapper question"> -->
      <!-- <input type="checkbox" name="" v-model="show_question">
      <input type="text"
              v-model="question"
              placeholder="My Question"
              v-bind:disabled="!show_question" /> -->
    <!-- </span> -->

    <!-- Poll -->
    <!-- <span class="field-wrapper poll"> -->
      <!-- <input type="checkbox" name="" v-model="show_poll">
      <input type="text"
              v-model="poll"
              placeholder="My Poll Title"
              v-bind:disabled="!show_poll" /> -->
    <!-- </span> -->

    <!-- Show To Others? -->
    <span class="field-wrapper df w100p fdc jcc space2">
      <h5 class="df aic jcc">Vote</h5>
      <span class="df jcc aic space4">
        <p class="plus-minus" v-bind:class="[
              myVote == -1 ? 'my-vote' : '' 
            ]" @click="ratePost(-1)">-</p>
        <p class="space3">{{show}}</p>
        <p class="plus-minus space3" v-bind:class="[
              myVote == 1 ? 'my-vote' : '' 
            ]" @click="ratePost(1)">+</p>
      </span>
    </span>

    <!-- Actions -->
    <span class="field-wrapper rating">
      <!-- <p @click="savePost()">Save</p> -->
      <!-- <p @click="publishPost()">Post</p> -->
    </span>

  </div>

  <!-- Messenger -->
</template>

<script>
import router from '@/router'
import common from '@/util/common'
import firebaseInstance from '@/util/firebase'

export default {
  name: 'ViewPostPage',
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
      created: 0,
      status: '',
      loading: true,
      myVote: null,
      posterid: null,
      username: ''
    }
  },
  props: ['mode'],
  components: {
  },
  methods: {
    formatDate (date) {
      return common.formatDate(date)
    },
    closePopup () {
    },
    goTo (route) {
      router.push(route)
    },
    onAuthStateChange (state, item) {
      const _this =  this
      firebaseInstance.auth().onAuthStateChanged(user => {
        if (user) {
          _this.getPost(user.uid)
        } else {
          this.$store.dispatch('clearState', {});
          _this.getPost(null)
        }
      });
    },
    getPost (myId) {
      const postid = this.$route.params.postid
      const uid = this.$route.params.uid
      this.posterid = uid
      firebaseInstance.database().ref('/app/posts/' + uid + '/' + postid).once('value', (snap) => {
        if (myId) {
          firebaseInstance.database().ref('/app/votes/' + uid + '/' + postid + '/' + myId).once('value', (snap2) => {
            firebaseInstance.database().ref('/app/user_public_info/' + uid + '/username').once('value', (snap3) => {
              const postData = snap.val()
              const myVote = snap2.val()
              const posterUsername = snap3.val()
              this.myVote = myVote
              this.username = posterUsername
              for (let one in postData) {
                this[one] = postData[one]
              }
              this.loading = false
            })
          })
        } else {
            const postData = snap.val()
            for (let one in postData) {
              this[one] = postData[one]
            }
            this.loading = false
        }
      })
    },
    ratePost (val) {
      if (this.$store.getters.uid) {
        const postid = this.$route.params.postid
        const uid = this.$route.params.uid
        const myId = this.$store.getters.uid
        this.$store.dispatch('ratePost', {
          postid: postid,
          posterid: uid,
          raterid: myId,
          val: val
        })
        let actualVal = val < 0 ? -1 : 1

        if (this.myVote == 1) {

            console.log('1111', this.show, actualVal)

          if (actualVal == 1) {

          } else {
            this.show = this.show + actualVal
          }
        } else if (this.myVote == -1) {
            console.log('2222', this.show, actualVal)
          if (actualVal == -1) {

          } else {
            this.show = this.show + actualVal
          }
        } else {
          this.show = this.show + actualVal
        }
        this.myVote = actualVal
      } else {
        this.$store.dispatch('popup', {
          type: 'SignUpNow'
        })
      }
    },
    savePost () {
      // this.$store.dispatch('savePost', {
      //   title: this.title,
      //   text: this.text,
      //   media: this.media,
      //   show_quest: this.show_questionion,
      //   question: this.question,
      //   show_poll: this.show_poll,
      //   poll: this.poll,
      //   show: this.show
      // })
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
    this.onAuthStateChange()
    // console.log('==>', this.$route);
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/settings.scss";
  .wrapper-post {
    padding: $padding2 $padding3;
  }
  .space1 {
    margin-left: 8px;
  }
  .space2 {
    margin-top: 20px;
  }
  .space3 {
    margin-left: 5px;
  }
  .space4 {
    margin-top: 8px;
  }
  .space5 {
    margin-bottom: 2px;
  }
  .space6 {
    margin-bottom: 5px;
  }
  .plus-minus {
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .my-vote {
    background-color: #ddd;
  }
</style>
