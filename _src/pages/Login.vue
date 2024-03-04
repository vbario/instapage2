<template>
  <div class="login-wrapper df fdc aic f1 w100p">

    <!-- LOGIN INPUTS -->

    <!-- SPLASH -->
    <div class="login-splash df fdr jcsb aic w100p">
      <div class="login-big-text f1 df fdc">
        <h1>Sell content directly from your social media</h1>
        <p class="convert-line">Convert customers anywhere with <span class="highlighted-text">embedded one-click <span class="no-word-break">cartless checkout</span></span></p>
        <button @click="setLoginMode('register')" v-if="loginMode == 'login'">Start Here</button>
        <a @click="setLoginMode('login')" v-else>Login to your account</a>
      </div>
      <!-- <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat metus vel urna sodales, pellentesque fermentum mi molestie. Donec lacinia id mauris vitae vestibulum.
      </p> -->

      <div class="login-inputs df fdc" v-if="loginMode == 'login'">
        <p class="already-have-account-line">Already have an account?</p>
        <input v-model="email" placeholder="E-mail" type="text" name="">
        <input v-model="password" placeholder="Password" type="password" name="">
        <div class="df w100p jcsb">
          <!-- <input type="checkbox" name=""> -->
          <!-- <p>Remember me</p> -->
          <!-- <a @click="setLoginMode('password-recovery')">Forgot password?</a> -->
        </div>
        <a class="w100p tar" @click="login()">Login</a>
      </div>

      <div class="login-inputs df fdc" v-if="loginMode == 'register'">
        <h4>Create An Account</h4>
        <input type="text" name="">
        <input type="password" name="">
        <input type="password" name="">
        <a>Login</a>
      </div>

      <div class="login-inputs df fdc" v-if="loginMode == 'password-recovery'">
        <h4>Password Recovery: Enter your email</h4>
        <input type="text" name="">
        <button>Recover Password</button>
      </div>

    </div>

  </div>
</template>

<script>

import router from '../router'

export default {
  name: 'Login',
  data () {
    return {
      loginMode: 'login',
      loading: false,
      email: '',
      password: ''
    }
  },
  props: [],
  components: {
  },
  methods: {
    login () {
      this.$store.dispatch('AUTH.login', {
        email: this.email,
        password: this.password,
      })
    },
    setLoginMode (loginMode) {
      this.loginMode = loginMode
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    console.log('* Landing page created')
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  h1 {
    margin-bottom: 20px;
    font-size: 50px;

    & + p {
      font-size: 24px;
    }
  }

  .login-wrapper {
    /*background-color: #292929;*/
    padding: 30px;
    padding-top: 30px;
  }
  .login-splash {
    width: 100%;
    padding: 85px 90px;
    border: 1px solid $color-white;

    & > div {
      &:first-child {
        margin-right: 120px;
      }
    }

    .login-inputs {
      width: 330px;
    }
  }
  .convert-line {
    margin-bottom: 20px;
    font-weight: 300;

    span {
      font-weight: 300 !important;
    }
  }
  .already-have-account-line {
    margin-bottom: 10px;
  }
  .no-word-break {
    white-space: nowrap;
    /*white-space: none;*/
  }
  .convert-line {
    .highlighted-text {
      font-weight: 600 !important;
      span {
        font-weight: 600 !important;
      }
      color: #5469d4;
    }
  }
</style>
