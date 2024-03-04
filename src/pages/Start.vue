<template>
  <div class="w100p df fdc aic start-wrapper posrel" :class="{'mt20': !showClose}">
    <div class="email-sent-popup" v-if="flashingRecoveryEmailSent">
      <h2>Check your email</h2>
      <p class="mt10">Instructions for resetting your password was sent to {{email}}.</p>
    </div>
    <!-- <div class="df aic curp" @click="goTo('/')">
      <img class="header-logo" src="../../static/images/pushable/pushable-logo-5.png"/>
      <h1 class="logo-font text-primary-color">pushable</h1>
    </div> -->
    <img v-if="showClose" @click="$emit('hideLogin')" src="../../static/brand-icons/x-close.svg" class="x-close"></i>
    <img v-else @click="goTo('/')" class="go-back curp" src="../../static/images/back.svg" >

    <h2 class="text-dark" v-if="loginMode == 'register'">Get an Instapage account</h2>
    <h2 class="text-dark" v-if="loginMode == 'login'">
      {{showFullLoginOptions ? 'Welcome back ' + email + '!' : 'Welcome back to Instapage'}}
    </h2>
    <div class="w100p login-inputs df fdc mt20" v-if="loginMode == 'login'">
      <h4 v-if="!showFullLoginOptions" tabindex="0" class="text-dark">Enter your email to get started.</h4>
      <h4 v-if="showFullLoginOptions" tabindex="1" class="text-dark">Enter your password.</h4>


      <div class="w100p posrel" v-if="showFullLoginOptions">
        <input v-if="showPassword" tabindex="2" type="text" name="" v-model="password" placeholder="Password">
        <input v-else-if="!showPassword" tabindex="3" type="password" name="" v-model="password" placeholder="Password">
        <i class="fa-solid fa-eye-slash show-hide-password" v-if="!showPassword" @click="setShowPassword(true)"></i>
        <i class="fa-solid fa-eye show-hide-password" v-else-if="showPassword" @click="setShowPassword(false)"></i>
      </div>

      <input v-if="!showFullLoginOptions" tabindex="4" v-model="email" placeholder="E-mail" type="text" name="" @change="setEmail" @input="resetAuthError()">
      <p class="login-error" v-if="authError">{{authError}}</p>
      <div class="df w100p jcsb">
      </div>
      <a v-if="!showFullLoginOptions" tabindex="5" class="w100p tar button-1 button-1-m" @click="continueLogin()">
        {{checkingEmail ? '' : 'continue'}}
        <img v-if="checkingEmail" class="spinner-1" src="../../static/images/pushable/loader-black.png">
      </a>
      <a v-else class="w100p tar button-1 button-1-m" tabindex="6" @click="login()">
        {{loggingIn ? '' : 'continue'}}
        <img v-if="loggingIn" class="spinner-1" src="../../static/images/pushable/loader-black.png">
      </a>
      <!-- <a class="w100p tar button-1 button-1-m" @click="login()">Login</a> -->
    </div>
    <div class="login-below df fdc jcc aic" v-if="loginMode == 'login'">
      <p class="already-have-account-line mt10 taci" v-if="showFullLoginOptions">I forgot my password. Please <a @click="triggerRecoveryEmail()">send me a recovery email</a>.</p>
      <p class="already-have-account-line mt10 taci">Don't have an account? <a @click="setLoginMode('register')">Sign up</a>.</p>
    </div>


    <div class="w100p login-inputs df fdc mt20" v-if="loginMode == 'register'">
      <h4 class="text-dark">Enter your email to get started.</h4>
      <input v-if="!showFullRegisterOptions" tabindex="20" type="text" name="" v-model="email" placeholder="E-mail" @input="resetAuthError()">
      <p class="set-email" v-if="showFullRegisterOptions">{{email}}</p>
      <a class="w100p tar logout" v-if="showFullRegisterOptions" @click="changeEmail()">change</a>
      <!-- <h4 v-if="showFullRegisterOptions" class="text-dark">Enter your full name.</h4>
      <input v-if="showFullRegisterOptions" type="text" name="" v-model="fullName" placeholder="Full Name"> -->
      <h4 v-if="showFullRegisterOptions" class="text-dark">Choose a password.</h4>
      <div class="w100p posrel" v-if="showFullRegisterOptions">
        <input v-if="showPassword" tabindex="21" type="text" name="" v-model="password" placeholder="Password">
        <input v-else-if="!showPassword" tabindex="22" type="password" name="" v-model="password" placeholder="Password">
        <i class="fa-solid fa-eye-slash show-hide-password" v-if="!showPassword" @click="setShowPassword(true)"></i>
        <i class="fa-solid fa-eye show-hide-password" v-else-if="showPassword" @click="setShowPassword(false)"></i>
      </div>
      <p class="login-error" v-if="authError">{{authError}}</p>
      <!-- <input v-if="showFullRegisterOptions" type="password" v-model="password2" name="" placeholder="Repeat Password"> -->
      <hr v-if="showFullRegisterOptions" class="hr1"/>
      <a v-if="!showFullRegisterOptions" tabindex="23" class="button-1 button-1-m mb20" @click="checkEmail()">
        {{checkingEmail ? '' : 'get started'}}
        <img v-if="checkingEmail" class="spinner-1" src="../../static/images/pushable/loader-black.png">
      </a>
      <a v-if="showFullRegisterOptions" tabindex="24" class="button-1 button-1-m button-1-m-2 mb20" @click="register()">
        {{loggingIn ? '' : 'continue'}}
        <img v-if="loggingIn" class="spinner-1" src="../../static/images/pushable/loader-black.png">
      </a>

      <!-- <div v-if="!showFullRegisterOptions" class="w100p landing-signup">
        <div class="df or mb15">
          <hr class="f1"/>
          <p class="text-dark">OR</p>
          <hr class="f1"/>
        </div>

        <p class="mb20 text-dark tac">Sign up free with Google or Microsoft</p>
        <div class="start-signup-options mb20">
          <button class="button-start-signin-option mb20" @click="loginWithGoogle()">
            <img src="../../static/images/momentum/icon-google.svg" class="phone-test">
            <p>Sign up with Google</p>
          </button>
          <button class="button-start-signin-option">
            <img src="../../static/images/momentum/icon-microsoft.svg" class="phone-test">
            <p>Sign up with Microsoft</p>
          </button>
        </div>
      </div> -->


      <p v-if="!showFullRegisterOptions" class="already-have-account-line">Already have an account? <a @click="setLoginMode('login')">Login</a></p>
    </div>
    <div class="login-below df fdc jcc aic" v-if="showFullRegisterOptions">
      <p class="already-have-account-line already-have-account-line-2 mt10 taci">By creating a Pushable account, you agree to Pushable's <a @click="goTo('/terms')">Terms</a> and <a @click="goTo('/privacy')">Privacy Policy</a></p>
    </div>
    <div class="w100p login-inputs df fdc mt20" v-if="loginMode == 'password-recovery'">
      <h4>Password Recovery: Enter your email</h4>
      <input type="text" name="">
      <button>Recover Password</button>
    </div>
  </div>

    <!-- <div class="login-wrapper login-wrapper-2 df fdc aic f1 w100p">
      <p>Fulfillment</p>
      <p>Sell from Social Media</p>
      <p>No need for a store!</p>
    </div>
    <br/>
    <br/>
    <br/>
    <button class="button-1" @click="setLoginMode('register')" v-if="loginMode == ''">Get Started</button> -->

    <!-- <div class="f1 df">
      <h1><span>Sell direct</span><br/>from your social media</h1>
      <p class="convert-line">Sell and fulfill direct from any social media. <span class="highlighted-text no-word-break">No need for a store!</span></p>
    </div>
    <div class="f1 df">
      <input class="email input-1" placeholder="Enter your email" />
      <button class="go button-1 button-1-alt">Sign Up</button>
    </div>
    <div class="f1 df">
    </div> -->

  <!-- <div class="login-wrapper-outer df fdc aic jcc">
    <img class="login-logo-temp mb21" src="../../static/images/momentum/logo-b.png"/>
    <h1 class="logo-font text-primary-color">momentum</h1>
    <h3>Transact where you interact – sell anything, anywhere.</h3>
    <div class="login-inputs df fdc mt30" v-if="loginMode == 'login'">
      <input v-model="email" placeholder="E-mail" type="text" name="">
      <input v-model="password" placeholder="Password" type="password" name="">
      <div class="df w100p jcsb">
      </div>
      <a class="w100p tar button-1 button-1-m" @click="login()">Sign In</a>
      <p class="already-have-account-line mt10">Create an account <a @click="setLoginMode('register')">here.</a></p>
    </div>
    <div class="login-inputs df fdc" v-if="loginMode == 'register'">
      <h4>Create An Account</h4>
      <input type="text" name="" v-model="email" placeholder="E-mail">
      <input type="password" name="" v-model="password" placeholder="Password">
      <input type="password" v-model="password2" name="" placeholder="Repeat Password">
      <a class="button-1 button-1-m" @click="register()">Start</a>
      <p class="already-have-account-line">Already have an account? <a @click="setLoginMode('login')">Sign in.</a></p>
    </div>
  </div> -->
</template>

<script>

import router from '@/router'

export default {
  name: 'Start',
  data () {
    return {
      showPassword: false,
      loggingIn: false,
      checkingEmail: false,
      showFullLoginOptions: false,
      showFullRegisterOptions: false,
      loginMode: 'register',
      loading: false,
      email: '',
      fullName: '',
      password: '',
      password2: '',
      authError: '',
      flashingRecoveryEmailSent: false
    }
  },
  props: ['showClose'],
  components: {
  },
  methods: {
    setShowPassword (showPassword) {
      this.showPassword = showPassword
    },
    changeEmail () {
      this.email = ''
      this.showFullRegisterOptions = false
    },
    triggerRecoveryEmail () {
      this.$store.dispatch('AUTH.resetMyPassword', {email: this.email}).then((res) => {
        console.log('res', res)
        if (res == 'ok') {
          this.flashingRecoveryEmailSent = true
          setTimeout(() => {
            this.flashingRecoveryEmailSent = false
          }, 2000)
        }
      })
    },
    loginWithGoogle () {
      this.$store.dispatch('AUTH.loginWithGoogle')
    },
    resetAuthError () {
      this.authError = ''
    },
    goTo (path) {
      router.push(path)
    },
    setEmail (event) {
      console.log('setEmail', event)
      let newEmail = event.target.value

      let isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      }

      let emailFormatValid = isValidEmail(newEmail)

      if (emailFormatValid) {
        // check if this email exists?... why
      }
    },
    continueLogin () {
      if (this.checkingEmail) {
        return false
      }
      this.checkEmail(true)
    },
    login () {
      if (this.loggingIn) {return false}
      this.loggingIn = true
      this.$store.dispatch('AUTH.login', {
        email: this.email,
        password: this.password,
      }).then((res) => {
        console.log('res', res)
        this.$emit('hideLogin')
        // if (res == 'ok') {
          // router.push('/')
          // let tryToGoToMyPage = () => {
          //   console.log('tryToGoToMyPage', this.$store.getters['AUTH.myInfo'])
          //   let myUsername = this.$store.getters['AUTH.myInfo'] && this.$store.getters['AUTH.myInfo'].displayName
          //   console.log('===>', this.$store.getters['AUTH.myInfo'])
          //   if (this.$store.getters['AUTH.myInfo'] && this.$store.getters['AUTH.myInfo'].loaded) {
          //     if (myUsername) {
          //       console.log('myUsername', myUsername)
          //       router.push('/' + myUsername.displayName)
          //     } else {
          //       router.push('/me')
          //     }
          //   } else {
          //     setTimeout(() => {
          //       tryToGoToMyPage()
          //     }, 500)
          //   }
          // }
          // tryToGoToMyPage()
        // }
        // this.loggingIn = false
        let message = res.message
        this.authError = res.message
      }).catch((error) => {
        console.log('error caught')
        this.loggingIn = false
        let message = error.message
        this.authError = error.message
      })
    },
    register () {
      if (this.loggingIn) {return false}
      this.loggingIn = true
      this.$store.dispatch('AUTH.register', {
        email: this.email,
        password: this.password
      }).then((res) => {
        this.$emit('hideLogin')
        console.log('res', res)
        this.loggingIn = false
        let message = res.message
        this.authError = res.message
        
        // router.push('/me')
        let tryToGoToMyPage = () => {
          console.log('tryToGoToMyPage', this.$store.getters['AUTH.myInfo'])
          let myUsername = this.$store.getters['AUTH.myInfo'] && this.$store.getters['AUTH.myInfo'].displayName
          console.log('===>', this.$store.getters['AUTH.myInfo'])
          if (this.$store.getters['AUTH.myInfo'] && this.$store.getters['AUTH.myInfo'].loaded) {
            if (myUsername) {
              console.log('myUsername', myUsername)
              router.push('/' + myUsername.displayName)
            } else {
              router.push('/me')
            }
          } else {
            setTimeout(() => {
              // tryToGoToMyPage()
            }, 500)
          }
        }
        // tryToGoToMyPage()
      }).catch((error) => {
        console.log('error caught')
        this.loggingIn = false
        let message = error.message
        this.authError = error.message
      })
    },
    checkEmail (login) { // true for login, false for register
      if (this.checkingEmail) {return false}
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!(this.email).match(validRegex)) {
        this.authError = 'Please enter a valid email.'
        return false
      }



      this.checkingEmail = true
      this.authError = ''
      this.$store.dispatch('AUTH.checkEmail', {
        email: this.email
      }).then((res) => {
        this.checkingEmail = false
        console.log('checkEmail res', res)
        let userExists = res.data.userExists
        if (userExists) {
          if (login) {
            this.showFullLoginOptions = true
          } else {
            this.authError = `An account already exists with this email address.` 
          }
        } else {
          if (login) {
            this.authError = `No user exists with this email address.`
          } else {
            this.showFullRegisterOptions = true
          }
        }
      }).catch((error) => {
        this.checkingEmail = false
        console.log('error', error)
      })
    },
    setModeFromRoute () {
      let route = this.$route
      let params = route.query
      let mode = params.mode || 'register'
      this.loginMode = mode
    },
    setLoginMode (loginMode) {
      this.loginMode = loginMode
    },
    startWatching () {
      
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    this.setModeFromRoute()
    document.getElementsByTagName('body')[0].onkeyup = (e) => { 
      if (e.keyCode == 13) { // enter
        console.log('this.showFullLoginOptions', this.showFullLoginOptions)
        if (this.loginMode == 'login') {
          if (this.showFullLoginOptions) {
            this.login()
          } else if (!this.showFullLoginOptions) {
            this.checkEmail(true)
          }
        } else if (this.loginMode == 'register') {
          if (this.showFullRegisterOptions) {
            console.log('register =>')
            this.register()
          } else if (!this.showFullRegisterOptions) {
            console.log('check email =>')
            this.checkEmail()
          }
        }
      } 
    }
    console.log('* Landing page created')
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  h1 {
    /*margin-bottom: 20px;*/
    /*font-size: 44px;*/
    /*line-height: 1.1em;*/
    /*font-weight: 500;*/
  }

  h4 {
    margin-bottom: 10px;
  }

  $padding_1: 30px;

  .start-wrapper {
    padding: $padding_1;
    max-width: calc(492px + 2 * #{$padding_1});
  }

  .login-wrapper {
    /*background-color: #292929;*/
  }
  .login-wrapper-2 {
    background-color: $light-grey;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .login-follower-section {
    background-color: #FEFEFE;
  }
  .login-splash {
    width: 100%;
  }
  .login-inputs {
    width: 100%;
    max-width: 492px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    .login-splash {
      padding: 0;
      border: none;
      flex-direction: column !important;

      & > div {
        &:first-child {
          margin-right: unset;
        }
      }
    }
  }

  .login-section-2 {
    background-image: url('../../static/images/momentum/home-bg-2.png');
    background-position: 50% -13%;
    background-repeat: repeat-x;
  }

  .convert-line {
    margin-bottom: 20px;
    font-weight: 300;
    font-family: "Nexa";
    font-size: 16px;

    span {
      font-family: "Nexa";
      font-weight: 500 !important;
    }
  }
  .already-have-account-line {
    margin-bottom: 10px;
    width: 100%;
    text-align: left;
    font-size: 14px;
    color: #333;

    span {
      font-weight: 600;
    }

    a {
      color: $color-primary;
      font-weight: 400;
    }
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
      /*color: #5469d4;*/
      /*color: $color-primary;*/
    }
  }
  .button-1-m {
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .button-1-m-2 {
    width: 100px;
    align-self: flex-end;
  }
  .phone-test {
    /*height: 300px;*/
    /*width: 300px;*/
    /*margin-bottom: 10px;*/
  }
  .button-1-alt {
    margin-top: 8px;
    width: 50%;
    max-width: 100px;
  }
  .login-logo-temp {
    height: 300px;
  }

  h3 {
    font-weight: 400;
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
  }

  .mb21 {
    margin-bottom: 21px;
    width: 170px;
    height: 170px;
    object-fit: contain;
  }
  .whole-page {
    width: 100%;
    height: 100%;
    min-height: 100vh; 
  }
  .login-wrapper-outer {
    width: 100%;
    background-image: url('../../static/images/momentum/home-bg.png');
    background-position: 50% 40%;
  }
  .landing-header {
    margin-right: 30px;
    width: 100%;
    max-width: 768px;
  }
  .login-clients {
    p {
      color: $color-background-dark;
    }
  }
  .mt_x {
    margin-top: 180px;
  }
  .login-section-3 {
    background-color: #f2f6fe;
  }
  .header-logo {
    width: 48px;
    height: 41px;
    max-height: 41px;
    min-height: 41px;
    object-fit: contain;
    margin-right: 5px;
  }
  .logo-font {
    transform: translateY(-2px);
    font-size: 25px;
  }

  .mb20 {
    margin-bottom: 20px;
  }

  .taci {
    text-align: center !important;
  }

  .login-error {
    font-size: 14px;
    color: #C84545;
    margin-bottom: 20px;
  }

  .hr1 {
    width: 100%;
    border-radius: 5px;
    height: 6px;
    background-color: #f2f2f2;
    border: none;
    margin-bottom: 20px;
  }

  .already-have-account-line-2 {
    font-size: 12px;
  }

  .spinner-1 {
    width: 20px;
    pointer-events: none;
    animation-name: spin;
    animation-duration: 5000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
  }

  @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
  }
  .email-sent-popup {
    position: absolute;
    top: 100px;
    width: 100%;
    left: 50%;
    max-width: 250px;
    background-color: $color-white;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid #ddd;
    transform: translate(-50%, -50%);

    * {
      text-align: center;
      color: $color-background-dark;
    }
  }
  .logout {
    font-size: 14px;
    color: $color-primary;
  }
  .set-email {
    height: 44px;
    color: $color-background-dark;
    display: flex;
    align-items: center;

    border: 1px solid #ddd;
    background-color: #fdfdfd;

    padding: 12px;
    border-radius: 6px;
  }

  .show-hide-password {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    right: 12px;
    top: calc(50% - 3px);
    opacity: 0.4;

    &:hover {
      opacity: 0.3;
    }
  }

  .x-close {
    position: absolute;
    top: 10px;
    right: 0;
  }
  .go-back {
    position: fixed;
    left: 30px;
    top: 20px;
    width: 20px;
  }
</style>
