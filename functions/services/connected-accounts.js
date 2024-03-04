const stripeService = require('./stripe')
const stripe = stripeService.stripe
const firebaseService = require('./firebase')
const firebase = firebaseService.firebase
const admin = firebaseService.admin
const paths = require('./paths').paths
require('dotenv').config()

let baseUrl = process.env.NODE_ENV == 'production' ? `https://pushableapp.com` : `http://localhost:8080`

/* OBJECTS */
let onboardingObject = (accountid) => {
  return {
    account: accountid,
    refresh_url: `${baseUrl}/reauth`,
    return_url: `${baseUrl}/return`,
    type: 'account_onboarding',
  }
}

let getStatementDescriptor = async (uid, newDescriptor) => {
    let db = admin.database()
    return new Promise(async (resolve, reject) => {
      let accountRef = paths.USER_CONNECT_IDS + (uid || 'f')
      let snap = await db.ref(accountRef).once('value')
      let account = snap.val() || {}
      let accountid = account.id
      const connectAccount = await stripe.accounts.retrieve(accountid)
      return resolve(connectAccount.statement_descriptor)
  })
}

let updateStatementDescriptor = async (uid, newDescriptor) => {
    let db = admin.database()
    return new Promise(async (resolve, reject) => {
      let accountRef = paths.USER_CONNECT_IDS + (uid || 'f')
      let snap = await db.ref(accountRef).once('value')
      let account = snap.val() || {}
      let accountid = account.id
      const updateStatementDescriptorResponse = await stripe.accountLinks.update(accountid, {
        statement_descriptor: newDescriptor
      })
      return resolve(updateStatementDescriptorResponse)
  })
}

let finishOnboarding = async (uid) => {
    let db = admin.database()
    return new Promise(async (resolve, reject) => {
      let accountRef = paths.USER_CONNECT_IDS + (uid || 'f')
      let snap = await db.ref(accountRef).once('value')
      let account = snap.val() || {}
      let accountid = account.id

      const accountLink = await stripe.accountLinks.create(onboardingObject(accountid));
      return resolve(accountLink)
  })
}

let getBalance = async (uid) => {
    let db = admin.database()
    return new Promise(async (resolve, reject) => {
      let newActivityObjectRef = paths.USER_CONNECT_IDS + (uid || 'f')
      let snap = await db.ref(newActivityObjectRef).once('value')
      let account = snap.val() || {}
      let accountid = account.id

      const balance = await stripe.balance.retrieve({ stripe_account: accountid });

      // if (accountid) {
      //   const fullAccount = await stripe.accounts.retrieve(
      //     accountid
      //   )
      //   let express = fullAccount.type == 'express'
      //   let payouts_enabled = fullAccount.payouts_enabled

      //   if (express && payouts_enabled) {
      //     let accountRef = paths.USER_CONNECT_IDS + (uid || 'f')
      //     await db.ref(accountRef).update({
      //       verified: true
      //     })
      //   }
      // }
      return resolve(balance)
    })
}

let createAccount = async (uid, email, country) => {
    let db = admin.database()
    return new Promise(async (resolve, reject) => {
      const account = await stripe.accounts.create({
        // country: 'CA',
        // default_currency: 'usd',
        email,
        country,
        type: 'express',
        capabilities: {
          card_payments: {
            requested: true
          }, 
          transfers: {
            requested: true
          }
        },
        // business_type: `individual`,
        business_profile: {
          url: `https://pushableapp.com/p/` + uid
        },
      });

      const accountLink = await stripe.accountLinks.create(onboardingObject(account.id));

      let newActivityObjectRef = paths.USER_CONNECT_IDS + (uid || 'f')
      await db.ref(newActivityObjectRef).update({
        id: account.id,
        verified: false
      })
      return resolve(accountLink)
  })
}

let checkAccount = async (uid) => {
    let db = admin.database()
    return new Promise(async (resolve, reject) => {
      let newActivityObjectRef = paths.USER_CONNECT_IDS + (uid || 'f')
      let snap = await db.ref(newActivityObjectRef).once('value')
      let account = snap.val() || {}
      let accountid = account.id

      if (accountid) {
        const fullAccount = await stripe.accounts.retrieve(
          accountid
        )
        let express = fullAccount.type == 'express'
        let payouts_enabled = fullAccount.payouts_enabled

        if (express && payouts_enabled) {
          let accountRef = paths.USER_CONNECT_IDS + (uid || 'f')
          await db.ref(accountRef).update({
            verified: true
          })
        }
      }
      return resolve(account)
    })
}


exports.createAccount = createAccount
exports.checkAccount = checkAccount
exports.finishOnboarding = finishOnboarding
exports.getBalance = getBalance


// refresh_url: `http://localhost:8080/reauth`,
// return_url: `http://localhost:8080/return`,