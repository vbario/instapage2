<template>
  <div v-if="true" class="whole-page">

    <div class="login-wrapper-outer df fdc jcsb aic">
      <div class="header-wrapper df fdr jcc aic w100p">
        <div class="header-inner f1 df aic w100p curp" @click="goTo('/')">
          <img class="header-logo" src="../../static/images/pushable/pushable-logo-5.png"/>
          <h1 class="logo-font text-primary-color">pushable</h1>
        </div>
      </div>
      <div class="page-wrapper login-wrapper df fdc aic f1 w100p">
        <div class="login-splash w100p f1 df fdc">
          


          <div class="df splash-hero splash-hero-2 f1 df aic fdc w100p"">
            <div class="df fdr jcsb aifs f2 w100p mw870">


              <div class="checkout df fdc">
                <h1 class="h1_ mb20 text-dark">start selling<br/><span class="fw400 fz_">like a pro</span></h1>
                <!-- <h2 class="get-cupwise text-dark">Try Pushable <span class="ull">free for 7 days</span></h2> -->


                <span class="first-one-liner df fdc mt__">
                  <span class="df aic">
                    <i class="sell-from-icon fa-solid fa-clock w_x m_x"></i>
                    <p class="ml__ text-dark">Start selling in 5 minutes</p>
                  </span>
                  <span class="df aic">
                    <i class="sell-from-icon fa-solid fa-link-simple w_x m_x"></i>
                    <p class="ml__ text-dark">Link from your social media</p>
                  </span>
                  <span class="df aic">
                    <i class="sell-from-icon fa-solid fa-chart-simple w_x m_x"></i>
                    <p class="ml__ text-dark">Immediate and useful analytics!</p>
                  </span>
                </span>

                <hr class="hr-x"/>
                
                <span class="df aic">
                  <i class="sell-from-icon fa-solid fa-dollar-sign w_x m_x"></i>
                  <h4 class="ml__ text-dark price-highlight">$1 <span>/</span> 3 months</h4>
                </span>
                <span class="df aic">
                  <i class="sell-from-icon fa-solid fa-dollar-sign w_x m_x"></i>
                  <p class="ml__ text-dark">$49/month after</p>
                </span>


                <hr class="checkout-line">
                  <div class="product-detail f1 df fdc" v-bind:class="{
                    'mb20': !$store.getters['AUTH.email'] && !emailChecked
                  }">
                    <h4>email</h4>
                      <input v-if="$store.getters['AUTH.email'] || emailChecked" class="checkout-input" placeholder="Enter Your Email" :value="$store.getters['AUTH.email'] || otherEmail" disabled type="email" name="">
                      <a class="w100p tar logout" v-if="$store.getters['AUTH.email'] || emailChecked" @click="logout()">change</a>
                      <input v-if="!$store.getters['AUTH.email'] && !emailChecked" class="checkout-input" placeholder="Enter Your Email" v-model="otherEmail" type="email" name="" @change="checkEmail()">
                  </div>
                  <!-- <div class="df w100p product-detail-outer">
                    <div class="product-detail f1">
                      <h4>Current Password</h4>
                      <input placeholder="Password" v-model="currentPassword" type="" name="">
                    </div>
                    <div class="product-detail f1">
                    </div>
                  </div> -->
                  <div v-if="!$store.getters['AUTH.email']" class="df w100p product-detail-outer mb20">
                    <div v-if="false" class="w100p landing-signup">
                      <!-- <div class="df or mb15">
                        <div class="f1"></div>
                        <p class="text-light">OR</p>
                        <div class="f1"></div>
                      </div> -->

                      <!-- <p class="mb20 text-dark tac">Sign up free with Google or Microsoft</p> -->
                      <div class="df aic">
                        <p class="text-light">or</p>
                        <button class="df aic jcc ml10" @click="loginWithGoogle()">
                          <img src="../../static/images/momentum/icon-google.svg" class="phone-test ml10">
                          <p class="ml10">Sign up with Google</p>
                        </button>
                        <!-- <button class="button-start-signin-option">
                          <img src="../../static/images/momentum/icon-microsoft.svg" class="phone-test">
                          <p>Sign up with Microsoft</p>
                        </button> -->
                      </div>
                    </div>
                    <div v-if="true" class="product-detail f1 _s2_1">
                      <h4>password</h4>
                      <!-- <input class="checkout-input" placeholder="Password" v-model="newPassword" type="password" name=""> -->
                      <div class="w100p posrel">
                        <input v-if="showPassword" type="text" name="" v-model="newPassword" placeholder="Password">
                        <input v-else-if="!showPassword" type="password" name="" v-model="newPassword" placeholder="Password">
                        <i class="fa-solid fa-eye show-hide-password" v-if="!showPassword" @click="setShowPassword(true)"></i>
                        <i class="fa-solid fa-eye-slash show-hide-password" v-else-if="showPassword" @click="setShowPassword(false)"></i>
                      </div>
                    </div>
                    
                    <!-- <div class="product-detail f1 _s2_2">
                      <h4>Confirm Password</h4>
                      <input class="checkout-input" placeholder="Confirm Password" v-model="newPasswordConfirm" type="password" name="">
                    </div> -->
                  </div>
                <!-- <hr class="checkout-line"> -->
                <div class="df w100p product-detail-outer">
                  <div class="product-detail f1 payment-methods">
                    <h4 class="_s1 df aic">
                      <!-- <img src="../../static/images/icon-card.svg" class="cc-icon"> -->
                      <img src="../../static/images/momentum/icon-card.png" class="point-icon mr__">
                      payment information
                    </h4>
                  </div>
                </div>
                <!--  -->


                <form id="payment-form-plan" class="w100pi2 stripe-plan-form">
                  <div id="card-element"></div>
                  
                  <button id="submit" class="stripe-plan-button" @click="getProPlan($event)">
                    <img class="spinner-1" v-if="activating && !$store.getters['AUTH.authError']" src="../../static/images/pushable/loader-black.png">
                    <span v-else id="button-text text-dark">activate pro account</span>
                  </button>
                  <p id="card-error" v-if="$store.getters['AUTH.authError']" role="alert">{{$store.getters['AUTH.authError'] ? $store.getters['AUTH.authError'] : ''}}</p>
                  <p id="card-error" v-else-if="authError" role="alert">{{authError}}</p>
                  <p class="result-message hidden">
                    Payment succeeded, see the result in your
                    <a href="" target="_blank">Stripe dashboard.</a> Refresh the page to pay again.
                  </p>
                  <div class="df w100p jcsb powered mt10">
                    <p class="checkout-protection"><i class="fal fa-lock stripe-lock"></i>Payments protected by Stripe.</p>
                    <!-- <p>Powered By tapin.com © 2021</p> -->
                    <p class="fz14 text-dark">Powered by Pushable</p>
                  </div>
                  <!-- <div class="df w100p jcc powered"> -->
                    <!-- <p>Accept payments in one click.</p> -->
                    <!-- <p>Powered By tapin.com © 2021</p> -->
                    <!-- <p>Powered by pshable.com © 2022</p> -->
                  <!-- </div> -->
                </form>

                <!-- Payment method == CC, paypal coming soon -->
                <div class="card-error df" v-if="checkoutError">
                  <span class="warning df aic jcc">
                    <img src="../../static/images/icon-warning.svg">
                  </span>
                  <span class="f1 df fdc jcc card-error-message">
                    <p>Double check your information</p>
                    <p>{{checkoutError.message || '-'}}</p>
                  </span>
                </div>
                <!-- <div class="cc-inputs df">
                  <input class="checkout-input cc-card f3 _i1" v-model="checkoutCC" v-mask="'#### #### #### ####'" placeholder="Card Number"></input>
                  <input class="checkout-input cc-date f1 _i2" v-model="checkoutCCDate" v-mask="'##/##'" placeholder="MM/YY"></input>
                  <input class="checkout-input cc-cvv f1 _i3" v-model="checkoutCCCVV" v-mask="'###'" placeholder="CVV"></input>
                </div>
                <p v-if="getPlanError" class="get-plan-error">{{getPlanError}}</p>
                <a v-if="activating" class="button-1 w100p checkout-button">Loading plan...</a>
                <a v-else class="button-1 w100p checkout-button" @click="getProPlan()">Activate Free 7-Day Trial</a> -->
                
              </div>
              <!-- <p class="one-liner-upgrade dn">CupWise Pro lets you host unlimited sessions and host live cuppings for your customers as well as private cuppings for in-house quality control.</p> -->
              <div class="pricing-plans">
                
                <div class="pricing-plan pricing-plan-2">
                  <div class="pricing-plan-header pricing-1">
                    <p class="pricing-plan-header-name">pushable pro</p>
                    <hr/>
                    <p class="pricing-plan-header-price">$49.00/month</p>
                    <p class="pricing-plan-header-subheading mt___">Up to 500 products</p>
                  </div>
                  <!-- <div class="f1"></div> -->
                  <div class="pricing-plan-box pricing-plan-single">
                    <!-- <span class="pricing-plan-two-liner">
                      <p>sell anywhere</p>
                      <p class="smaller df aic">
                        from&nbsp;
                        <img src="../../static/images/momentum/icon-instagram.png" class="sell-from-icon">
                        <img src="../../static/images/momentum/icon-tiktok.png" class="sell-from-icon">
                        <img src="../../static/images/momentum/icon-youtube.png" class="sell-from-icon">
                        <i class="sell-from-icon fa-brands fa-youtube"></i>
                        <i class="sell-from-icon fa-brands fa-square-instagram m_"></i>
                        <i class="sell-from-icon fa-brands fa-square-twitter"></i>
                        &nbsp;& more</p>
                    </span> -->
                    <span class="pricing-plan-two-liner">
                      <p>sell without a website</p>
                      <p class="smaller">physical goods</p>
                      <p class="smaller">appointments</p>
                      <p class="smaller">downloads</p>
                      <p class="smaller">services</p>
                    </span>
                    <p>fulfill your orders</p>
                    <p>pushable sales statistics</p>
                    <p>live onboarding</p>
                    <p>video support</p>
                    <p>0% transaction fee</p>
                    <span class="df jcc aic m1_">
                      <i class="sell-from-icon fa-solid fa-truck"></i>
                      <p class="tal ml10 m0_">get access to pushable worldwide shipping</p>
                    </span>
                    <!-- <p class="df jcc aic">
                    </p> -->
                    <div class="f1"><br/></div>
                    <p class="try-it-free">start selling today!</p>

                    <!-- <div class="f1"></div> -->
                    <!-- <a class="button-1" @click="addQuery('pro', 'getpro')">Get Started</a> -->
                  </div>  
                </div>
                

              </div>
            </div>
            <div class="df fdc jcc aic f3">
            </div>
          </div>




        </div>
      </div>
    </div>
    <div class="page-section df fdc aic">
      <div class="page-section-inner page-section-inner-2">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    </div>

  </div>
</template>

<script>

import router from '@/router'

export default {
  name: 'Plan',
  data () {
    return {
      showPassword: false,
      loading: false,
      email: '',
      password: '',
      password2: '',
      checkoutCC: '',
      checkoutCCDate: '',
      checkoutCCCVV: '',
      checkOutOption: true,
      checkOutOptionB: false,
      checkoutError: '',
      getPlanError: '',
      showAuthMenu: false,
      error: '',
      emailSubmitted: false,
      displayName: '',
      newPassword: '',
      newPasswordConfirm: '',
      checkoutEmail: '',
      otherEmail: '',
      activating: false,
      checkingEmail: false,
      showFullLoginOptions: false,
      showFullRegisterOptions: false,
      emailChecked: false,
      then: () => {},
      activatingAccount: false,
      authError: ''
    }
  },
  props: [],
  components: {
  },
  methods: {
    setShowPassword (showPassword) {
      this.showPassword = showPassword
    },
    logout () {
      this.otherEmail = ''
      this.emailChecked = false
      this.$store.dispatch('AUTH.logout', {})
    },
    checkEmail (login) { // true for login, false for register

      let isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      }

      let emailFormatValid = isValidEmail(this.otherEmail)

      if (!emailFormatValid) {
        console.log('invalid')
        this.authError = `The email format is invalid.`
        return false
        // check if this email exists?... why
      }


      if (this.checkingEmail) {return false}
      this.checkingEmail = true
      this.authError = ''
      this.$store.dispatch('AUTH.checkEmail', {
        email: this.otherEmail
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
          this.emailChecked = true
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
    getProPlan (event) {
      event.preventDefault()
      let otherEmail = this.otherEmail
      let password = this.newPassword
      let password2 = this.newPasswordConfirm

      if (!this.$store.getters['AUTH.email'] && password) {
        this.activating = true

        this.$store.dispatch('AUTH.register', {
          email: this.otherEmail,
          password
        }).then(async (res) => {
          if (res.error) {
            if (res.code) {
              this.getPlanError = res.message
            }
          } else {
            this.then(true)
          }
        })
      } else if (this.$store.getters['AUTH.email']) {
        console.log('check out with my account')
        this.$store.dispatch('AUTH.resetAuthError')
        this.activating = true
        this.then(true)
      }

    },
    goTo (route) {
      router.push(route)
    },
    loginWithGoogle () {
      this.$store.dispatch('AUTH.loginWithGoogle')
    },
    login () {
      this.$store.dispatch('AUTH.login', {
        email: this.email,
        password: this.password,
      })
    },
    register () {
      this.$store.dispatch('AUTH.register', {
        email: this.email,
        password: this.password
      })
    },
    loadCreditCardModule () {
      // console.log('loading CC module with id', this.productId)
      if (document && document.getElementById("card-element")) {
        this.$store.dispatch('AUTH.mountCardForPlan',{
          // shipping: this.quotedShipping,
          // items: [this.productId]
        }).then((res) => {
          // console.log('res-', res)
          this.then = res.after
          // this.orderNumber = res.orderNumber
        })
      } else {
        // console.log('no button')
        setTimeout(() => {
          this.loadCreditCardModule()
        }, 1000)
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    this.loadCreditCardModule()
    console.log('* Landing page created')
    window.onload = () => {
       document.getElementsByTagName('body')[0].onkeyup = (e) => { 
          // let ev = e || event
          if (e.keyCode == 13) { // enter
            this.getProPlan()
          }
       }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/settings.scss";

  h1 {
    font-size: 44px;
    /*line-height: 1.1em;*/
    /*font-weight: 500;*/
  }

  h4 {
    margin-bottom: 10px;
  }

  .login-wrapper {
    margin-top: 0;
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

    .login-inputs {
      /*width: 330px;*/
    }
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
    text-align: center;
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
    background-image: url('../../static/images/pushable/curve-top.svg');
    background-size: 100vw;
    background-position: top center;
    background-repeat: no-repeat;
  }
  .login-wrapper-outer {
    width: 100%;
    /*background-position: 50% 0;*/
    /*background-repeat: no-repeat;*/
  }

  @media (max-width: 1050px) {
    .login-wrapper-outer {
      background-position: 50% top;
    }
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
  .text-bold {
    font-weight: 600;
    text-decoration: underline;
  }
  .w100pi {
    width: 100%;
    max-width: unset;
  }
  
  @media (max-width: 1050px) {
    .splash-hero-2 > div {
      flex-direction: column;
      align-items: center;
    }
    .one-liner-upgrade {
      display: block;
      margin-top: 45px;
      font-weight: 600;
      font-size: 16px;

      margin-top: 50px !important;
      margin-bottom: 30px;
    }


    .one-liner-upgrade {
      font-size: 14px;
      letter-spacing: 0;
      line-height: 17px;
      margin-top: 17px;
      max-width: 420px;
    }
    .first-one-liner {
      /*display: none;*/            
    }

    .pricing-plan-2 {
      margin-top: 80px !important;
    }
  }

  .checkout {
    max-width: 420px;
    flex: 1;
    /*margin-right: 124px*/
  }

  @media (max-width: 570px) {
    .wraps {
      flex-direction: column;
      .button-0 {
        margin-top: 5px;
      }
    }
  }
  .mw870 {
    max-width: 870px;
  }

  .checkout-price {
    color: $color-primary;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 29px;
    text-align: center;
  }

  .checkout-price-2 {
    text-align: left;
  }

  .checkout-price-next {
    margin-left: 10px;
    p {
      color: #000000;
      font-size: 14px;
      letter-spacing: 0;
      line-height: 17px;
    }
  }
  .mt___ {
    margin-top: 4px !important;
  }

  .sell-from-icon {
    /*width: 30px;*/
    font-size: 22px;
  }

  .m_ {
    margin-left: 4px;
    margin-right: 4px;
  }

  .point-icon {
    height: 25px;
  }

  .shipping-icon {
    height: 30px;
    width: 40px;
    min-width: 40px;
    object-fit: contain;
    object-position: right;
  }

  .m0_ {
    margin-top: 0 !important;
    font-weight: 400 !important;
    font-size: 14px !important;
    width: 155px;
  }
  .m1_ {
    margin-top: 17px;
  }
  .checkout-line {
    width: 100%;
    height: 1px;
    background-color: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
    border: none;
  }
  .ml__ {
    margin-left: 8px;
    font-size: 16px;
  }
  .mr__ {
    margin-right: 8px;
  }
  .checkout-protection {
    /*margin-top: 26px;*/
    color: $color-dark;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 12px;
  }

  .checkout-button {
    margin-top: 16px;
  }

  .card-error {
    height: 70px;
    background-color: #FFF7D4;
    margin-bottom: 26px;

    .warning {
      width: 50px;
      height: 70px;
      background-color: #FFDA4B;
    }

    .card-error-message {
      padding-left: 15px;
      padding-right: 15px;

      p {
        color: #000000;
        font-size: 12px;
        letter-spacing: 0;
        line-height: 15px;

        &:first-child {
          font-weight: 700;
        }
      }
    }

  }
  .stripe-lock {
    margin-right: 8px;
  }
  .cc-icon {
    margin-right: 8px;
  }

  .cc-inputs {
    margin-bottom: 10px;
  }

  .get-plan-error {
      background-color: #FFDA4B;
      padding: 5px;
      border-radius: 5px;


      padding-left: 15px;
      padding-right: 15px;
      color: #000000;
      font-size: 12px;
      letter-spacing: 0;
      line-height: 15px;

      &:first-child {
        font-weight: 700;
      }
  }

  ._i1 {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  ._i2 {
    border-left: none;
    border-right: none;
    border-radius: 0;
  }

  ._i3 {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .button-start-signin-option {
    border-color: $color-white;
    p {
      color: $color-white !important;
    }
  }

  .logout {
    font-size: 14px;
    color: $color-primary;
  }

  .w100pi2 {
    width: 100% !important;
  }

  .stripe-plan-form {
    padding: 0 !important;
    box-shadow: none;
  }

  .stripe-plan-button {
    background-color: $color-primary;
  }

  .fz14 {
    font-size: 10px;
    letter-spacing: 0;
    line-height: 12px;
  }
  .ull {
    text-decoration: underline;
  }
  .h1_ {
    line-height: 1em;
  }
  .mt__ {
    margin-top: 20px;
  }

  .header-inner {
    /*padding-left: 15px;*/
    /*padding-right: 15px;*/
    height: 100%;
  }
  .header-logo {
    width: 50px;
    height: 50px;
    min-width: 50px;
    min-height: 50px;
  }
  .header-wrapper {
    position: static;
  }
  .fz_ {
    /*font-size: 50px;*/
    color: $color-primary;
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
  .w_x {
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-primary;
  }
  .m_x {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .fa-truck {
    font-size: 18px;
  }
  .spinner-1 {
    width: 16px;
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

  * {
    letter-spacing: 0.02em;
  }

  .smaller {
    color: #777 !important;
    font-style: italic;
  }

  .price-highlight {
    margin-bottom: 0;
    font-size: 28px;
    color: $color-primary;

    & > span {
      /*display: flex;*/
      font-size: 16px;
      color: #000;
      font-weight: 400;
    }
  }

  .hr-x {
    width: 100%;
    height: 1px;
    border: none;
    background-color: #ddd;
    margin-top: 30px;
    margin-bottom: 20px;
  }

</style>
