<template>
  <div class="w100p df fdc aic admin-wrapper">
    <div class="w100p df fdc admin-section">
      <div class="w100p df jcsb aic">
        <div class="w100p one-user mb_ bgc_">
          <div class="df">
            <p class="text-dark">User #</p>
            <p class="text-dark">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p class="text-dark f1">Created</p>
            <p class="text-dark f1">Username</p>

            <p class="text-dark f1">Email</p>
            <p class="text-dark w__">Started Onboarding</p>
            <p class="text-dark w__ ml_">Finished Onboarding</p>
          </div>
        </div>
      </div>
      <div class="w100p df fdc all-sales">
        <div class="one-user mb_ bgc_" v-for="(user, u) in orderedUsers">
          <div class="df">
            <p class="text-dark">#{{orderedUsers.length - u}}</p>
            <p class="text-dark">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p class="text-dark f1">{{date(user.created)}}</p>
            <p class="text-dark f1">{{usernamesById[user.uid] || '-'}}</p>

            <p class="text-dark f1">{{emailsById[user.uid] || '-'}}</p>
            <p class="text-dark w__">{{connectIds[user.uid] ? '✔️' : ''}}</p>
            <p class="text-dark w__ ml_">{{(connectIds[user.uid] && connectIds[user.uid].verified) ? '✅' : ''}}</p>
          </div>
          <hr v-if="stores[user.uid] || products[user.uid]"/>
          <div class="w100p df aic">
            <div class="f1 df fdc">
              <a v-if="stores[user.uid]"
                :href="'/' + usernamesById[user.uid]"
                class="store-heading curp">
                Store
              </a>
              <img v-if="stores[user.uid] && stores[user.uid].banner" :src="stores[user.uid].banner.url" class="store-banner">
              <div class="one-sale store-item" v-for="(item, i) in (stores[user.uid] || {}).items">
                <p class="one-sale store-item">
                  {{item.title}}
                </p>
              </div>
            </div>
            <div class="f1 df fdc">
              <h4 v-if="products[user.uid]" class="store-heading">Items</h4>
              <a :href="'/' + usernamesById[user.uid] + '/' + item.uniqueProductId" class="one-sale store-item" v-for="(item, i) in products[user.uid]">
                {{item.name}}
              </a>
            </div>
            <div class="f2 df fdc">
              <h4 v-if="products[user.uid]" class="store-heading">Sales</h4>
              <a class="one-sale store-item df jcsb" v-for="(order, o) in orders[user.uid]">
                <p class="f3">{{order.order[0].heading}}</p>
                <p class="f1">{{order.order[0].quantity}}x</p>
                <p class="f2">${{order.order[0].price}}</p>
                <p class="f3">{{date(order.created)}}</p>
                <!-- <p class="f4">{{order.fulfillmentDetails.email}}</p> -->
              </a>
              <!-- <a class="one-sale store-item" v-for="(sale, s) in sales[user.uid]">
                <p>{{sale.order[0].heading}}</p>
                <p>{{sale.order[0].quantity}}</p>
                <p>{{sale.order[0].price}}</p>
              </a> -->
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

import router from '@/router'
import common from '@/util/common'

export default {
  name: 'Logout',
  data () {
    return {
      sales: {},
      orders: {},
      emails: {},
      stores: {},
      products: {},
      usernames: {},
      connectIds: {},
      usernamesById: {},
      emailsById: {},
      orderedUsers: []
    }
  },
  props: [],
  components: {

  },
  methods: {
    displayTime (d) {
      return (new Date(d)).getTime()
    },
    newDate (d) {
      return new Date(d)
    },
    date (d) {
      return common.timeAgo(d)
    },
    dateFromatted (d) {
      return common.formatDate(d)
    },
    goTo (route) {
      console.log('goTo', route)
      router.push(route)
    },
    goToTab (route) {
      // console.log('goToTab', route)
    },
    getAllSales () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getAllSales', {}).then((res) => {
          this.sales = res
        })
        this.$store.dispatch('AUTH.getCompletedOrders', {}).then((res) => {
          this.orders = res
        })
      } else {
        setTimeout(() => {
          this.getAllSales()
        }, 100)
      }
    },
    getAllEmailsCollected () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getAllEmailsCollected', {}).then((res) => {
          console.log('collectedEmails', res)
          this.emails = res
        })
      } else {
        setTimeout(() => {
          this.getAllEmailsCollected()
        }, 100)
      }
    },
    getAllStores () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getAllStores', {}).then((res) => {
          console.log('stores', res)
          this.stores = res
        })
      } else {
        setTimeout(() => {
          this.getAllStores()
        }, 100)
      }
    },
    getAllProducts () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getAllProducts', {}).then((res) => {
          console.log('products', res)
          this.products = res
        })
      } else {
        setTimeout(() => {
          this.getAllProducts()
        }, 100)
      }
    },
    getAllUsernames () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getAllUsernames', {}).then((res) => {
          let usernamesById = {

          }
          for (let username in res) {
            usernamesById[res[username]] = username
          }
          this.usernames = res
          this.usernamesById = usernamesById
        })
      } else {
        setTimeout(() => {
          this.getAllUsernames()
        }, 100)
      }
    },
    getAllConnectIds () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getAllConnectIds', {}).then((res) => {
          console.log('connectIds', res)
          this.connectIds = res
        })
      } else {
        setTimeout(() => {
          this.getAllConnectIds()
        }, 100)
      }
    },
    getAllUserEmails () {
      if (this.$store.getters['AUTH.uid']) {
        this.$store.dispatch('AUTH.getAllUserEmails', {}).then((res) => {
          console.log('Emails', res)
          let _res = res.data.sort((a, b) => {
            return (new Date(b.created).getTime()) - (new Date(a.created).getTime())
          }).filter(v => {
            let hasLowerprofileEmail = v.email.indexOf('lowerprofile') > -1
            let andresEmail = v.email.indexOf('andre@lowerprofile') > -1

            return ((new Date(v.created)).getTime() > 1694563673253) && (!hasLowerprofileEmail || andresEmail)
          })
          console.log('Emails2', res)
          let emailsById = {

          }
          for (let user in _res) {
            emailsById[_res[user].uid] = _res[user].email
          }
          this.orderedUsers = _res
          this.emailsById = emailsById
        })
      } else {
        setTimeout(() => {
          this.getAllUserEmails()
        }, 100)
      }
    },
  },
  computed: {

  },
  created () {
    this.getAllSales()
    this.getAllEmailsCollected()
    this.getAllStores()
    this.getAllProducts()
    this.getAllUsernames()
    this.getAllConnectIds()
    this.getAllUserEmails() // user records
  }
}
</script>

<style scoped lang="scss">
  .admin-wrapper {
  }
  .admin-section {
    max-width: 1600px;
    padding: 30px;
  }
  .one-sale {
    margin-left: 20px;
  }
  .go-to-button {
    margin-left: 20px;
    cursor: pointer;
    font-weight: 400;
  }
  .ml20 {
    margin-left: 20px;
  }
  .product-image {
    margin-right: 20px;
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
  .w_ {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .bgc_ {
    background-color: #f0f0f0;
    padding: 20px;
  }
  .w__ {
    width: 50px;
  }
  .mb_ {
    margin-bottom: 10px;
  }
  .ml_ {
    margin-left: 30px;
  }
  .store-heading {
    color: green;
  }
  .store-banner {
    width: 100px;
  }
  .store-item {
    color: green;
  }
</style>
