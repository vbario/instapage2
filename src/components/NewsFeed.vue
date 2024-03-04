<template>
  <div class="news-feed-component">
      <p class="heading">News Feed</p>
      <div class="news-posts df fdc">
          <div class="news-post df" v-for="(post) in news">
              <img src="" alt="" class="post-thumbnail">
              <div class="post-meta df fdc">
                  <p class="post-title">
                      {{post.title}}
                  </p>
                  <span class="df jcfs post-posted-by">
                      <p>Posted by:</p>
                      <a>Username</a>
                      <p>|</p>
                      <p>November 16, 2021</p>
                  </span>
                  <!-- <span class="df post-comments">
                      <i></i>
                      <p>{{'10'}} comments</p>
                  </span> -->
                  <p class="post-short temp_s1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nisi aut illo. Obcaecati, aut dolorem fuga aliquid error earum minus voluptate at? Dicta nisi, commodi fugiat soluta nostrum beatae fugit.
                  </p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'NewsFeed',
  data () {
    return {
        news: {}
    }
  },
  props: [],
  components: {

  },
  methods: {
      getMyNews () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getMyNews', {}).then((res) => {
          console.log('news', res)
          this.news = res
        })
      } else {
        console.log('wait')
        setTimeout(() => {
          this.getMyNews()
        }, 500)
      }
    }
  },
  computed: {

  },
  created () {
      this.getMyNews()
  }
}
</script>

<style scoped lang="scss">
    @import "../styles/_colors.scss";

    .temp_s1 {
        margin-top: 8px;
    }

    .news-feed-component {
        width: 100%;
        max-width: 630px;
    }
    p {
        font-family: Inter;
    }
    .heading {
        color: #5C5C5C;
        font-family: Inter;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 20px;
        margin-bottom: 30px;
        margin-top: 20px;
    }
    .news-post {
        margin-bottom: 34px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .post-thumbnail {
        width: 270px;
        height: 160px;
        background-color: #D8D8D8;
        margin-right: 30px;
    }
    .post-title {
        color: #000000;
        font-family: Inter;
        font-weight: 700;
        font-size: 16px;
        letter-spacing: 0;
        line-height: 25px;
    }
    .post-comments {
        color: #5C5C5C;
        font-family: Inter;
        font-size: 12px;
        letter-spacing: 0;
        line-height: 13px;
        margin-top: 4px;
        margin-bottom: 13px;
    }
    .post-posted-by {
        a {
            margin-left: 4px;
        }
        & > p {
            // &:nth-child(2) {
                // margin-left: 4px;
            // }
            &:nth-of-type(2) {
                font-weight: 600;
                margin-left: 8px;
                margin-right: 8px;
            }
        }
    }
    .post-posted-by, a {
        color: #000000;
        font-family: Inter;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 25px;
    }
    .post-short {
        color: #5C5C5C;
        font-family: Inter;
        font-size: 12px;
        letter-spacing: 0;
        line-height: 13px;
    }
    a {
        font-weight: 700;
        color: $color-primary;
    }
</style>
