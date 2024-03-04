<template>
  <div class="whole-page">

    <div class="login-wrapper-outer df fdc jcsb aic">
      <div class="header-wrapper df fdr jcc aic w100p">
        <div class="header-inner f1 df aic w100p">
          <div class="df aic curp" @click="goTo('/')">
            <img class="header-logo" src="../../static/images/pushable/pushable-logo-5.png"/>
            <h1 class="logo-font text-primary-color">pushable</h1>
          </div>
          <div class="f1"></div>
        </div>
      </div>
      <div class="page-wrapper login-wrapper df fdc aic f1 w100p">
        
        <div class="top-bar-global posrel w100p _position1 df jcsb aic mb20">
          <h2 class="text-dark header-style header-style-big">Choose your plan</h2>
        </div>

        <div class="login-splash w100p f1 df fdc">
          
          <div class="df splash-hero splash-hero-2 f1 df aic fdc w100p"">
            <div class="df fdr jcc aifs f2 w100p">

              <div class="pricing-plans jcc">
                
                <div class="pricing-plan pricing-plan-2">
                  <div class="pricing-plan-header pricing-1">
                    <p class="pricing-plan-header-name">free</p>
                    <hr/>
                    <p class="pricing-plan-header-price">Free forever</p>
                    <p class="pricing-plan-header-subheading mt___">Up to 10 products</p>
                  </div>
                  <!-- <div class="f1"></div> -->
                  <div class="pricing-plan-box pricing-plan-single">
                    <!-- <span class="pricing-plan-two-liner">
                      <p>mobile-optimized <br/>one page store</p>
                      <p class="smaller df aic">
                        sell from&nbsp;
                        <img src="../../static/images/momentum/icon-instagram.png" class="sell-from-icon">
                        <img src="../../static/images/momentum/icon-tiktok.png" class="sell-from-icon">
                        <img src="../../static/images/momentum/icon-youtube.png" class="sell-from-icon">
                        <i class="sell-from-icon fa-brands fa-youtube"></i>
                        <i class="sell-from-icon fa-brands fa-square-instagram m_"></i>
                        <i class="sell-from-icon fa-brands fa-square-twitter"></i>
                        &nbsp;& more</p>
                    </span> -->
                    <span class="pricing-plan-two-liner">
                      <p>start selling right away</p>
                      <p class="smaller">calendar invites & bookings, courses, merch, downloads, services</p>
                    </span>
                    <p>1-step product checkout</p>
                    <p>fulfill your orders</p>
                    <p>email list/newsletter builder</p>
                    <p>audience and product analytics</p>
                    <p>6.5% transaction fee</p>
                    <!-- <p class="df jcc aic">
                    </p> -->
                    <div class="f1"><br/></div>
                    <h4 class="button-1" @click="goTo('/start?mode=register')">Start free</h4>
                    <p class="no-cc">No credit card required</p>
                    <!-- <p class="try-it-free">start selling today!</p> -->

                    <!-- <div class="f1"></div> -->
                    <!-- <a class="button-1" @click="addQuery('pro', 'getpro')">Get Started</a> -->
                  </div>  
                </div>
                
                <div class="pricing-plan pricing-plan-2">
                  <div class="pricing-plan-header pricing-1">
                    <p class="pricing-plan-header-name">pushable pro</p>
                    <hr/>
                    <p class="pricing-plan-header-price">$49.00/month</p>
                    <p class="pricing-plan-header-subheading mt___">Up to 500 products</p>
                  </div>
                  <!-- <div class="f1"></div> -->
                  <div class="pricing-plan-box pricing-plan-single">
                    <span class="pricing-plan-two-liner">
                      <p>everything in the free plan</p>
                    </span>
                    <br/>
                    <p class="plus-plan">plus</p>
                    <br/>
                    <span class="pricing-plan-two-liner">
                      <p>email & video support</p>
                      <p class="smaller">From real people, not a chatbot :)</p>
                      <!-- <p class="smaller">appointments</p> -->
                      <!-- <p class="smaller">downloads</p> -->
                      <!-- <p class="smaller">services</p> -->
                    </span>
                    <!-- <p>live onboarding</p> -->
                    <!-- <p>email & video support<br/>from real humans (not a chatbot)</p> -->
                    <p>0% transaction fee</p>
                    <span class="df jcc aic m1_">
                      <i class="sell-from-icon fa-solid fa-truck"></i>
                      <p class="tal ml10 m0_">get access to pushable worldwide shipping</p>
                    </span>
                    <!-- <p class="df jcc aic">
                    </p> -->
                    <div class="f1"><br/></div>
                    <h4 class="button-1" @click="goTo('/plan')">Get started</h4>
                    <!-- <p class="no-cc">&nbsp;</p> -->

                    <!-- <div class="f1"></div> -->
                    <!-- <a class="button-1" @click="addQuery('pro', 'getpro')">Get Started</a> -->
                  </div>  
                </div>
                
                <div class="pricing-plan pricing-plan-2">
                  <div class="pricing-plan-header pricing-1">
                    <p class="pricing-plan-header-name">sell more</p>
                    <hr/>
                    <p class="pricing-plan-header-price">Contact us</p>
                    <p class="pricing-plan-header-subheading mt___">Over 500 products</p>
                  </div>
                  <!-- <div class="f1"></div> -->
                  <div class="pricing-plan-box pricing-plan-single">
                    <span class="pricing-plan-two-liner">
                      <p>solutions for enterprise</p>
                      <p class="smaller">multi-user access</p>
                      <p class="smaller">custom API</p>
                      <p class="smaller">integrate your flow</p>
                    </span>
                    <!-- <p>pushable sales statistics</p>
                    <p>live onboarding</p>
                    <p>e-mail support</p>
                    <span class="df jcc aic m1_">
                      <i class="sell-from-icon fa-solid fa-truck"></i>
                      <p class="tal ml10 m0_">get access to pushable worldwide shipping</p>
                    </span> -->
                    <!-- <p class="df jcc aic">
                    </p> -->
                    <div class="f1"><br/></div>
                    <h4 class="button-1">
                      <a href="mailto:info@pushableapp.com">
                        contact us
                      </a>
                    </h4>
                    <!-- <p class="no-cc">&nbsp;</p> -->

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
      activatingAccount: false
    }
  },
  metaInfo: {
    // Children can override the title.
    title: 'Plans',
    // Result: My Page Title ← My Site
    // If a child changes the title to "My Other Page Title",
    // it will become: My Other Page Title ← My Site
    // titleTemplate: '%s ← My Site',
    // Define meta tags here.
    meta: [
      {property: 'og:title', content: 'Plans'},
      // {property: 'og:title', content: 'Plans ← My Site'},
      {property: 'og:site_name', content: 'Pushable'},
      // The list of types is available here: http://ogp.me/#types
      {property: 'og:type', content: 'website'},
      // {http-equiv: 'Content-Type', content: 'text/html; charset=utf-8'},
      // {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'description', content: 'Free Forever - Pro - Enterprise'}
    ],
    link: [
      {rel: 'canonical', href: 'https://www.pushableapp.com/plans'}
    ]
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
      document.body.scrollTop = document.documentElement.scrollTop = 0
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

  .page-wrapper {
    padding-top: 0;
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

  .pricing-plan-2 {
    margin-left: 20px;
    margin-right: 20px;
    height: 710px;
  }

  .pricing-plan-single {
    flex: 1;
  }

  .pricing-plan-box {
    padding-bottom: 30px;
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
      /*margin-top: 80px !important;*/
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
    margin-top: 10px !important;
  }

  .pricing-plans {
    width: 100%;
    display: flex;
    justify-content: center !important;
    align-items: flex-start !important;
  }

  .no-cc {
    margin-top: 8px !important;
    font-weight: 400 !important;
  }
  ._position1 {
    padding-top: 0;
  }
  .plus-plan {
    font-size: 16px !important;
    color: #777 !important;
    font-weight: 400 !important;
  }

</style>
