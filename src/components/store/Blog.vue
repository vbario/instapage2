<template>
  <div class="blog-wrapper">
    <div v-for="(post, p) in blog" class="one-post df fdc">
      <h3 class="text-dark">{{post.title}}</h3>
      <h4 v-if="post.subtitle" class="text-dark _text">{{post.subtitle}}</h4>
      <p class="blog-post-date">{{dateFormat(post.created)}}</p>
      <p v-html="post.content" class="blog-post-text"></p>
      <hr/>
    </div>
  </div>
</template>

<script>

import common from '@/util/common'

export default {
  name: 'Blog',
  data () {
    return {
      blog: [],
      saving: false,
      deleting: false,
      titleText: '',
      error: {
        hasError: false,
        field: '',
        text: ''
      }
    }
  },
  props: [],
  components: {
  },
  methods: {
    dateFormat (d) {
      return common.formatDate2(d)
      // return 'February 23, 2024'
    },
    stopProp (event) {
      event && event.stopPropagation()
    },
    getBlog () {
      let user = this.$route.params.user
      this.$store.dispatch('AUTH.getBlog', {
        username: user
      }).then((res) => {
        this.blog = (res || []).sort((a, b) => b.created - a.created)
      }).catch((error) => {
        //
      })
    }
  },
  computed: {

  },
  created () {
  },
  mounted () {
    this.getBlog()
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/_colors.scss";

  .blog-wrapper {
    padding: 20px;
    padding-top: 0;
  }

  .one-post {
    margin-bottom: 80px;

    &:last-child {
      margin-bottom: 0;
    }

    & > hr {
      width: 100%;
      height: 1px;
      border: none;
      background-color: #ddd;
      margin-top: 80px;
    }
  }

  .blog-post-date {
    color: #555;
    font-size: 14px;
    line-height: 1em;
    margin-top: 4px;
    margin-bottom: 24px;
  }

  .blog-post-text {
    color: #000;
    font-size: 16px;
    line-height: 1.25em;
    white-space: pre-line;
  }

  span.underline {
    text-decoration: underline;
    display: block;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .link_ {
    color: $color-primary;
  }

  ._text {
    font-weight: 400;
    font-style: italic;
  }
</style>
