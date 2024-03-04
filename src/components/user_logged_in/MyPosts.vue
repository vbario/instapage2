<template>
  <div class="wrap-my-posts df fdc aifs jcsb w100p">

    <span class="profile-top w100p df fdc">
      <span class="profile-pic df aic jcc space3">Pic</span>
      <span class="df fdr jcsb w100p">
        <span>
          <input v-if="editProfile" class="space2"/>
          <h2 v-else class="space2">{{'Username'}}</h2>

          <p class="user-description space1">I am a something something 123...</p>
        </span>
        <span class="actions df aic jcc">
          <span class="action"
                v-if="loaded && ($route.params.uid == $store.getters.uid)"
                @click="toggleEditProfile()">
            edit
          </span>
          <!-- <span class="action space4" v-if="$store.getters.uid && loaded && ($route.params.uid !== $store.getters.uid)">
            msg
          </span> -->
          <span class="button button-2 button-dark-2 curp df jcc aic action space4" v-if="$store.getters.uid && loaded && ($route.params.uid !== $store.getters.uid)">
            SUBSCRIBE
          </span>
        </span>
      </span>

    </span>

    <span class="all-wrapper w100p df fdr fww">
      <span class="one-post df fdc aifs curp"
            v-for="(post, id) in posts"
            @click="goTo('/post/' + post.uid + '/' + id)">

        <span class="post-contents w100p df fdc jcsb"
            :style="[
                      post.bgColor ? {'background-color': post.bgColor} : {},
                      post.textColor ? {'color': post.textColor} : {},
                    ]">
          <span class="left-post-side f1 df fdc jcsb">
            <h4 class="post-title">{{ post.title }}</h4>
          </span>
          <span class="right-post-side df fdr jcsb">
            <p class="post-date"
             :style="[
                      true ? {'color': post.textColor} : {},
                    ]">{{ timeAgo(post.created) }}</p>  
            <span class="score post-date df">
              <span>[I]</span>
              <p class="spaceA">{{post.show}}</p>
            </span>
          </span>
        </span>

        <!-- <p class="tags">{{ post.tags ? post.tags.join(', ') : '-' }}</p> -->
      </span>
    </span>

  </div>
</template>

<script>
import router from '@/router'
import common from '@/util/common'
// import firebaseInstance from '@/util/firebase'

export default {
  name: 'MyPosts',
  data () {
    return {
      posts: {},
      loaded: false,
      editProfile: false
    }
  },
  props: ['mode'],
  components: {
  },
  methods: {
    formatDate (date) {
      return common.formatDate(date)
    },
    timeAgo (date) {
      return common.timeAgo(date)
    },
    goTo (route) {
      router.push(route)
    },
    onAuthStateChange (state, item) {
      const _this =  this
      const uid = this.$route.params.uid
      // firebaseInstance.auth().onAuthStateChanged(user => {
      //   if (user) {
      //     //
      //   } else {
      //     this.$store.dispatch('clearState', {});
      //     // router.push('/')
      //   }
      //   _this.getPosts(uid)
      //   this.$store.dispatch('loadProfile', {uid});
      // });
    },
    getPosts (uid) {
      // firebaseInstance.database().ref('/app/posts/' + uid).once('value', (snap) => {
      //   const postsData = snap.val()
      //   this.posts = postsData
      //   this.loaded = true
      // })
    },
    toggleEditProfile () {
      this.editProfile = !this.editProfile
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
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/settings.scss";

.space1 {
  margin-bottom: 12px;
}

.space2 {
  margin-bottom: 3px;
}

.space3 {
  margin-bottom: 3px;
}

.space4 {
  margin-left: 12px;
}

.spaceA {
  margin-left: 4px;
}

h2 {
}

h4 {
  font-weight: 500;
  line-height: 1.1em;
}

.profile-top {
  /*border-right: 1px solid #dedede;*/
  border-bottom: 1px solid #dedede;
  padding: $padding4;
  padding-top: 0;
  padding-bottom: 0;
}
.profile-pic {
  height: 100px;
  width: 100px;
  background-color: #ccc;
}
.user-description {
  font-size: 14px;
}

.post-title {
  word-break: break-word;
}
</style>
