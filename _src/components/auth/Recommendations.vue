<template>
  <div class="wrapper-signup df fdc jcc aifs jcsb">
    <h3 class="space-1">Recommended for you</h3>
    <p class="p-1 space-3">Because of these reasons</p>
    <!-- <button class="button button-1 button-dark w100p space-2" @click="showSignUp()">Sign Up</button> -->
    <span class="one-post df fdc aifs curp"
            v-for="(post, id) in $store.getters.exploreArray"
            v-if="id > 3 &&
                  id < 16 &&
                  id%2 == 0"
            @click="goTo('/post/' + post.posterid + '/' + post.postid)">
        <span class="post-contents w100p df fdrc jcsb"
            :style="[
                      post.bgColor ? {'background-color': post.bgColor} : {},
                      post.textColor ? {'color': post.textColor} : {},
                    ]">
          <span class="left-post-side f1 df fdc jcc">
            <h4>{{ post.title }}</h4>
            <p class="post-date"
              :style="[
                        true ? {'color': post.textColor} : {},
                      ]">{{ formatDate(post.created) }}</p>  
          </span>
          <span class="right-post-side df aic jcc">
            <p>{{post.show > 0 ? '+' : ''}}</p>
            <p>{{post.show}}</p>
          </span>
        </span>

        <!-- <p class="tags">{{ post.tags ? post.tags.join(', ') : '-' }}</p> -->
      </span>
  </div>
</template>

<script>

import router from '@/router'
import common from '@/util/common'

export default {
  name: 'SignUpBox',
  data () {
    return {
    }
  },
  props: [],
  components: {
  },
  methods: {
    formatDate (date) {
      return common.formatDate(date)
    },
    goTo(route) {
      router.push(route)
    },
  },
  computed: {

  },
  watch: {
  },
  mounted () {
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/settings.scss";
  .wrapper-signup {
    width: 100%;
    padding: $padding1;
    border-radius: $borderRadius1;
    border: 1px solid $borderColor1;
    padding-left: 15px;
    padding-right: 15px;
  }
  .space-1 {
    margin-bottom: 10px;
  }
  .space-2 {
    margin-bottom: 4px;
  }
  .space-3 {
    margin-bottom: 13px;
  }
</style>
