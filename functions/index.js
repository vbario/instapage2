const functions = require('firebase-functions');
const cors = require('cors')({origin: true})
require('dotenv').config()

const paths = require('./services/paths').paths

const activityService = require('./services/activity.js')
const connectedAccountsService = require('./services/connected-accounts.js')
const firebaseService = require('./services/firebase')
const mandrillService = require('./services/mandrill')
const stripeService = require('./services/stripe')
const rewardsService = require('./services/rewards')
const googleSheetsService = require('./services/google-sheets')
const shippingZones = require('./services/shippingZones')
const unsplashService = require('./services/unsplash')
const calendarService = require('./services/calendar')

const ai = require('./services/ai')
const stripHtml = require('./services/strings')
const sanitizeHtml = require('sanitize-html');

const sendActivityAlert = activityService.sendActivityAlert
const sendEmailAlert = activityService.sendEmailAlert
const firebase = firebaseService.firebase
const admin = firebaseService.admin
const mandrill = mandrillService.mandrill
const stripe = stripeService.stripe
const unsplash = unsplashService.unsplash


const axios = require('axios');

const fetch = require("node-fetch")
let SHIPSTATION_PRODUCTS_URL = `https://ssapi.shipstation.com/products`
let SHIPSTATION_CARRIERS_URL = `https://ssapi.shipstation.com/carriers`
let SHIPSTATION_SHIPPING_RATE_URL = `https://ssapi.shipstation.com/shipments/getrates`
let SHIPSTATION_CREATE_ORDER_URL = `https://ssapi.shipstation.com/orders/createorder`

let randomString = (length, chars) => {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{"role": "system", "content": "You are a helpful assistant."},
//         {"role": "user", "content": "Who won the world series in 2020?"},
//         {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
//         {"role": "user", "content": "Where was it played?"}],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }
// main();

// let tryAIAPI = async () => {
//     // POST
//     let region = 'us-central'
//     let projectId = 'tap-in-7704f'

//     let url = `https://`
//     url = url + region + '-'
//     url = url + 'aiplatform.googleapis.com/v1/projects/'
//     url = url + projectId + '/'
//     url = url + 'locations/'
//     url = url + region + '/'
//     url = url + 'publishers/google/models/gemini-1.0-pro:streamGenerateContent'

//     console.log('Google API URL')
//     console.log('url', url)

//     let requestbody = {
//       "contents": [
//         {
//           "role": 'string',
//           "parts": [
//             {
//               // Union field data can be only one of the following:
//               "text": 'string',
//               // "inlineData": {
//               //   "mimeType": string,
//               //   "data": string
//               // },
//               "fileData": {
//                 "mimeType": 'string',
//                 "fileUri": 'string'
//               },
//               // End of list of possible types for union field data.

//               // "videoMetadata": {
//               //   "startOffset": {
//               //     "seconds": integer,
//               //     "nanos": integer
//               //   },
//               //   "endOffset": {
//               //     "seconds": integer,
//               //     "nanos": integer
//               //   }
//               // }
//             }
//           ]
//         }
//       ],
//       // "tools": [
//       //   {
//       //     "functionDeclarations": [
//       //       {
//       //         "name": string,
//       //         "description": string,
//       //         "parameters": {
//       //           object (OpenAPI Object Schema)
//       //         }
//       //       }
//       //     ]
//       //   }
//       // ],
//       // "safetySettings": [
//       //   {
//       //     "category": enum (HarmCategory),
//       //     "threshold": enum (HarmBlockThreshold)
//       //   }
//       // ],
//       // "generationConfig": {
//       //   "temperature": number,
//       //   "topP": number,
//       //   "topK": number,
//       //   "candidateCount": integer,
//       //   "maxOutputTokens": integer,
//       //   "stopSequences": [
//       //     string
//       //   ]
//       // }
//     }

//     let token = {
//         // access_token: 'KEY_WeDyGFYrDGgrl8nApUqhaguQSGLc0CVG0kyxBNgflptWRy'
//     }
//     let headers = {
//         // 'Authorization': `Bearer ${token.access_token}`,
//         // 'Content-Type': 'application/json'
//     }
//     let data = requestbody

//     let makeWebsite = await axios({
//       url,
//       method: 'post',
//       headers,
//       data
//     }).catch((err) => {
//         console.log('error', err)
//     })

//     console.log('makeWebsite', makeWebsite)
// }

// tryAIAPI()




// let tryAIAPI2 = async () => {
//     // POST


//     let token = {
//         // access_token: 'KEY_WeDyGFYrDGgrl8nApUqhaguQSGLc0CVG0kyxBNgflptWRy'
//     }
//     let headers = {
//         'Authorization': `Bearer ${apiKey_}`,
//         'OpenAI-Organization': orgId,
//         'Content-Type': 'application/json'
//     }

//     let makeWebsite = await axios({
//       url: `https://api.openai.com/v1/chat/completions`,
//       method: 'post',
//       headers,
//       data: {
//         'model': 'gpt-3.5',
//         'messages': [{'role': 'user', 'content': 'Say this is a test!'}],
//         'temperature': 0.7
//       }
//     }).catch((err) => {
//         console.log('error', err)
//     })

//     console.log('makeWebsite', makeWebsite)
// }

// tryAIAPI2()

exports.uploadHtml = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        // console.log('data', data)
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        // let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        let htmlString = data.htmlString || ''
        let _randomString = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        let _randomString2 = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        
        let sanitizedHtml = sanitizeHtml(htmlString)

        let aiHtml = await ai.generateWebsite(sanitizedHtml)

        let pageObject = {
            sanitizedHtml,
            htmlString,
            aiHtml: aiHtml || '-',
            created: now,
            ownerId: uid || '',
        }

        await db.ref('/htmlStrings/' + (_randomString || 'f')).set(pageObject)
        await db.ref('/pageCodes/' + _randomString).set(_randomString2)
        await db.ref('/myHtmlPages/' + (uid || 'f') + '/' + _randomString).set({pageCode: _randomString2})

        return resolve({
            status: 200,
            message: 'success',
            pageId: _randomString,
            pageCode: _randomString2
        })
    })
})

exports.getNewPageId = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        console.log('data', data)
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        // let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        let _randomString = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        let _randomString2 = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        
        let pageObject = {
            htmlString: '',
            created: now,
            ownerId: uid || '',
        }

        await db.ref('/htmlStrings/' + (_randomString || 'f')).set(pageObject)
        await db.ref('/pageCodes/' + _randomString).set(_randomString2)
        await db.ref('/myHtmlPages/' + (uid || 'f') + '/' + _randomString).set({pageCode: _randomString2})

        return resolve({
            status: 200,
            message: 'success',
            pageId: _randomString,
            pageCode: _randomString2
        })
    })
})

let checkOwnership = async (data) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = data.uid
        let pageId = data.pageId
        let pageCode = data.pageCode

        // check if the page has an owner
        let _checkPage = await db.ref('htmlStrings/' + pageId).once('value')
        let checkPage = _checkPage.val()

        // if owner exists and current user is not owner, deny
        if (checkPage.ownerId && (checkPage.ownerId !== uid)) { 
            return resolve({status: 400, message: 'The current user is not the owner of this page.'})
        }

        // get the page code
        let _checkCode = await db.ref('pageCodes/' + pageId).once('value')
        let checkCode = _checkCode.val()

        if (uid && (checkPage.ownerId == uid)) { // if the current user is the owner
            // don't check pagecode
        } else {
            if (pageCode && checkCode && (pageCode !== checkCode)) {
                return resolve({status: 400, message: 'The current user is not the owner of this page.'})
            }
        }

        return resolve({status: 200, message: 'Ok'})
    })
}


exports.unpublishPage = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        console.log('data', data)
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let now = (new Date()).getTime()

        let pageId = data.pageId
        let pageCode = data.pageCode
        let htmlString = data.htmlString

        let ownershipObject = await checkOwnership({uid, pageId, pageCode})
        if (ownershipObject.status == 400) {
            return resolve(ownershipObject)
        }

        let updatedObject = {
            published: false,
            updated: now
        }

        if (uid) {
            updatedObject.ownerId = uid
            await db.ref('/myHtmlPages/' + (uid || 'f') + '/' + pageId).set({pageCode: pageCode || 'claimed'})
        }

        await db.ref('/htmlStrings/' + (pageId || 'f')).update(updatedObject)

        return resolve({status: 200, message: 'success'})
    })
})


exports.publishPage = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        console.log('data', data)
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let now = (new Date()).getTime()

        let pageId = data.pageId
        let pageCode = data.pageCode
        let htmlString = data.htmlString

        let ownershipObject = await checkOwnership({uid, pageId, pageCode})
        if (ownershipObject.status == 400) {
            return resolve(ownershipObject)
        }

        let updatedObject = {
            published: true,
            updated: now
        }

        if (uid) {
            updatedObject.ownerId = uid
            await db.ref('/myHtmlPages/' + (uid || 'f') + '/' + pageId).set({pageCode: pageCode || 'claimed'})
        }

        await db.ref('/htmlStrings/' + (pageId || 'f')).update(updatedObject)

        return resolve({status: 200, message: 'success'})
    })
})

exports.savePage = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        console.log('data', data)
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let now = (new Date()).getTime()

        let pageId = data.pageId
        let pageCode = data.pageCode
        let htmlString = data.htmlString

        let ownershipObject = await checkOwnership({uid, pageId, pageCode})
        if (ownershipObject.status == 400) {
            return resolve(ownershipObject)
        }

        let updatedObject = {
            htmlString,
            updated: now
        }

        if (uid) {
            updatedObject.ownerId = uid
            await db.ref('/myHtmlPages/' + (uid || 'f') + '/' + pageId).set({pageCode: pageCode || 'claimed'})
        }

        await db.ref('/htmlStrings/' + (pageId || 'f')).update(updatedObject)

        return resolve({status: 200, message: 'success'})
    })
})

// const stripe = Stripe('sk_test_51Je8m2I0NXyTXqSuoGIS7tIVlVtdy6B0Cthr0rMsHNbDxJHNzg3dqi7hvisgT7t6WtizKgW6O661QOUeQAIq72zq00oop8uk0L');

// let createAccount = async () => {
//     const account = await stripe.accounts.create({
//       country: 'CA',
//       type: 'express',
//       capabilities: {card_payments: {requested: true}, transfers: {requested: true}},
//       business_type: `individual`,
//       business_profile: {url: `https://pickupmomme.com`},
//     });

//     console.log('account', account)

//     const accountLink = await stripe.accountLinks.create({
//       account: account.id,
//       refresh_url: `https://example.com/reauth`,
//       return_url: `https://example.com/return`,
//       type: 'account_onboarding',
//     });

//     // record user's connect account id
//     // send link to user

//     console.log('accountLink', accountLink)
// }
// createAccount()



// prod
// const stripe = require("stripe")("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");


let my_products_path = 'myProducts/'
let public_products_path = 'publicProducts/'
let order_intents_path = 'orderIntents/'
let pre_order_details_path = 'preOrderDetails/'
let cart_pre_order_details_path = 'cartPreorderDetails/'
let completed_orders_by_user_path = 'completedOrdersByUser/'
let fulfillments_by_user_path = 'fulfillmentsByUser/'
let display_data_by_user = 'displayDataByUser/'
let order_update_path = 'orderUpdates/'

let generateCustomerLists = async () => {
    let db = admin.database()
    return new Promise(async (resolve, reject) => {

        let _allSales = await db.ref(completed_orders_by_user_path).once('value')
        let allSales = _allSales.val()

        let salesByUserByCustomer = {}

        for (let userId in allSales) {
            if (!salesByUserByCustomer[userId]) {
                salesByUserByCustomer[userId] = {}
            }
            let userSales = allSales[userId]
            for (let orderId in userSales) {
                let order = userSales[orderId]
                let _buyerEmail = order.fulfillmentDetails ? order.fulfillmentDetails.email : 'f'
                // buyerEmail = btoa(buyerEmail).replace('+', '-').replace('/', '_').replace('=', '');
                buyerEmail = Buffer.from(_buyerEmail).toString('base64').replace('+', '-').replace('/', '_').replace(/=+$/, '');
                if (!buyerEmail) {
                    buyerEmail = '-'
                }
                // buyerEmail = buyerEmail.replace(/@/g, "(AT)");
                // buyerEmail = buyerEmail.replace(/./g, "(DOT)");
                console.log('buyerEmail', buyerEmail)
                if (!salesByUserByCustomer[userId][buyerEmail]) {
                    salesByUserByCustomer[userId][buyerEmail] = {
                        email: _buyerEmail,
                        sales: 0
                    }
                }

                // for () {
                  // salesByUserByCustomer[userId][buyerEmail].sales = salesByUserByCustomer[userId][buyerEmail].sales + parseFloat(order.order ? order.order[0].price : 0)  
                // }
                
                //
            }


        }

        let allSalesPath = 'allSales/'
        db.ref(allSalesPath).set(salesByUserByCustomer)

    })
}

exports.generateCustomerLists = functions.pubsub.schedule('every 5 minutes').onRun((context) => {
    generateCustomerLists()
})

// generateCustomerLists()
exports.getPhotosBy = functions.https.onCall(async (data, context) => {
    let query = data.query
    let page = data.page || 1
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        // let username = data.username
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        let photos = await unsplashService.getPhotosBy(query, page)
        return resolve(photos)
    })
})
exports.getRandomPhotos = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        // let username = data.username
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        let photos = await unsplashService.getRandomPhotos()
        return resolve(photos)
    })
})

// generateCustomerLists()
exports.checkIfUsernameExists = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let username = data.username
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        // let res = connectedAccountsService.createAccount(uid, email)

        console.log('checkIfUsernameExists', data)

        let checkThisUsername = username

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return resolve({usernameIsAvailable: false})
        }

        let restrictedUsernames = [
            'admin',
            'user',
            'contact',
            'contactus',
            'pushable',
            'app',
            'pushable',
            'login',
            'logout',
            'privacy',
            'terms',
            'return',
            'plan',
            'linkinbio',
            'shipping',
            'audience',
            'inventory',
            'reauth',
            'pay',
            'me',
            'income',
            'products',
            'settings',
            'more',
            'fulfillment',
            'appointments',
            'start',
            'account',
            'faq',
            '500',
            '404'
        ]

        if (restrictedUsernames.indexOf(checkThisUsername.toLowerCase()) > -1 ) {
            return resolve({usernameIsAvailable: false})
        }

        let userPublicInfoPath = 'customer_info/public/'
        let _users = await db.ref(userPublicInfoPath).once('value')
        let users = _users.val()

        for (let u in users) {
            let user = users[u]
            let _username = user.displayName && user.displayName.displayName
            console.log('compare', _username, 'with', checkThisUsername)
            if ((_username && _username.toLowerCase()) == checkThisUsername.toLowerCase()) {
                return resolve({usernameIsAvalable: false})
            }
        }
        return resolve({usernameIsAvailable: true})
    })
})

let getOrderItems = async (productIds) => {
    let db = admin.database()
    return new Promise(async (resolve, reject) => {

        let products = []

        for (let productId in productIds) {
            let public_products_ref = public_products_path + (productIds[productId] || 'f')
            db.ref(public_products_ref).once('value', (snap) => {
                let product = snap.val()
                products.push(product)
                if (products.length >= productIds.length) {
                    resolve(products)
                }
            })
        }

    })
}
let getTotalFromItems = async (products, quantities) => {
    return new Promise(async (resolve, reject) => {
        let total = 0
        for (let product in products) {
            console.log('product', products[product])
            let quantity = quantities[product]
            total = (total + parseFloat(products[product].price) * quantity) || false
        }
        resolve(total)
    })
}
let generateUniqueOrderId = async () => {
    return new Promise(async (resolve, reject) => {
        let id = randomString(14, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        // check if ID exists
        resolve(id)
    })
}
let generateUniqueProductId = async () => {
    return new Promise(async (resolve, reject) => {
        let id = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        // check if ID exists
        resolve(id)
    })
}
let sendReceiptEmail = async (fullOrder) => {
    return new Promise(async (resolve, reject) => {
        let orderPlaced = fullOrder.created 
        let orderId = fullOrder.fulfillmentDetails.orderId
        let buyerEmail = fullOrder.fulfillmentDetails.email
        let order = fullOrder.order[0]

        let itemName = order.heading
        let itemPrice = order.price

        let emailText = 'Hello. This is your receipt for order #' + orderId + '. '
        emailText += 'Price: ' + itemPrice
        emailText += '. Item: ' + itemName

        let fulfillmentObject = {
            to: buyerEmail,
            subject: 'Receipt for order #' + orderId,
            text: emailText
        }

        mandrill('/messages/send', {
            message: {
                to: [{email: fulfillmentObject.to}],
                from_email: 'noreply@pushableapp.com',
                subject: fulfillmentObject.subject,
                text: fulfillmentObject.text
            }
        }, function(error, response)
        {
            if ('mandril error', error) {
                console.log( JSON.stringify(error) );
            } else {
                console.log('mandrill ok', response);
                resolve('ok')
            }
        });
    })
}
let triggerPhysicalOrderFulfillment = async (fullOrder) => {
    return new Promise(async (resolve, reject) => {
        console.log('triggerPhysicalOrderFulfillment')
        console.log('full order', fullOrder)
        return resolve('ok')
        // let orderCountryCode = fullOrder.fulfillmentDetails.countryCode
        // console.log('country code', orderCountryCode)
        // // let order = fullOrder.order[0]
        // // if customer has auto fulfill for this order
        // // if (zoneProvider.type == 1) { // ShipMyOrders.com
        // if ((orderCountryCode == 'CA') || (orderCountryCode == 'US')) { // ShipMyOrders.com
        //     // console.log('zoneProvider.type == 1', zoneProvider)
        //     // trigger push order to ShipMyOrders.com
        //     return resolve('ok')
        //     // let orderResponse = sendOrderToSMO(fullOrder)
        //     // return resolve(orderResponse)
        // } else { // Export to Google Sheets
        //     // console.log('zoneProvider.type == 2', zoneProvider)
        //     // trigger push order to google sheet
        //     // let orderResponse = sendOrderToGoogleSheet(fullOrder)
        //     return resolve('ok')
        //     // return resolve(orderResponse)
        // }
    })
}
let sendAutoFulfillEmail = async (fullOrder) => {
    return new Promise(async (resolve, reject) => {

        let orderPlaced = fullOrder.created 
        let orderId = fullOrder.fulfillmentDetails.orderId
        let buyerEmail = fullOrder.fulfillmentDetails.email
        let order = fullOrder.order[0]

        let emailText = 'Hello. Your order has been fulfilled. Please download your files here: '

        if (order.addFile) {
            emailText += order.productDeliveryFile ? order.productDeliveryFile.url : '. Follow this url: '
        }
        
        if (order.addURL) {
            emailText += order.redirectURL ? order.redirectURL : '. '
        }



        let fulfillmentObject = {
            to: buyerEmail,
            subject: 'Order #' + orderId + ' fulfilled',
            text: emailText
        }

        mandrill('/messages/send', {
            message: {
                to: [{email: fulfillmentObject.to}],
                from_email: 'noreply@pushableapp.com',
                subject: fulfillmentObject.subject,
                text: fulfillmentObject.text
            }
        }, function(error, response)
        {
            if ('mandrill error', error) {
                console.log( JSON.stringify(error) );
            } else {
                console.log('mandrill ok', response);
                resolve('ok')
            }
        });

    })
}
let sendFulfillmentEmail = async (emailData) => {
    return new Promise(async (resolve, reject) => {
        //  let fulfillmentEmail = {
        //     email, // buyeremail
        //     uid, // owner of product
        //     orderNumber, // unique order number
        //     messageToTheBuyer,
        //     productFulfillmentFile
        // }

        let fulfillmentObject = {
            to: emailData.email,
            subject: 'Order #' + emailData.orderNumber + ' fulfilled',
            text: `Hello. Your order has been fulfilled: ` + emailData.messageToTheBuyer + `. Please download your file here: ` + emailData.productFulfillmentFile.url
        }

        mandrill('/messages/send', {
            message: {
                to: [{email: fulfillmentObject.to}],
                from_email: 'noreply@pushableapp.com',
                subject: fulfillmentObject.subject,
                text: fulfillmentObject.text
            }
        }, function(error, response)
        {
            if ('mandril error', error) {
                console.log( JSON.stringify(error) );
            } else {
                console.log('mandril ok', response);
                resolve('ok')
            }
        });
    })
}

exports.testEmail = functions.https.onCall(async (data, context) => {
    let db = admin.database()
    let uid = context.auth.uid
    console.log('testEmail', uid)

    // var config = {
    //     templateSlug: 'tap-in-test',
    //     subject: 'Test test test',
    //     toEmail: 'vlad@lowerprofile.com',
    //     uid,
    //     test: '123456'
    // }

    // const params = {
    //     template_name: config.templateSlug,
    //     template_content: [],
    //     message: {
    //         merge_language: 'handlebars',
    //         subject: config.subject,
    //         to: [{
    //             email: config.toEmail,
    //             type: 'to'
    //         }],
    //         global_merge_vars: [{
    //             name: 'test',
    //             content: config.test
    //         }, {
    //             name: 'uid',
    //             content: config.uid
    //         }]
    //     },
    //     async: false
    // };

    // mandrill_client.messages.sendTemplate(params, result => {
    //     console.log('Email sent:', result);
    // }, e => {
    //     console.log(`'A mandrill error occurred: ${e.name} - ${e.message}`);
    // });

    mandrill('/messages/send', {
        message: {
            to: [{email: 'main@lowerprofile.com'}],
            from_email: 'vlad@tapinpay.com',
            subject: "Hey, what's up?",
            text: "Hello, I sent this message using mandrill." + uid
        }
    }, function(error, response)
    {
        //uh oh, there was an error
        if (error) console.log( JSON.stringify(error) );

        //everything's good, lets see what mandrill said
        else console.log(response);
    });

    return 'ok'
    // let orderId = data.orderId
    // console.log('setPreOrderDetails', data) // { email: 'vlad@lowerprofile.com', orderId: 893221827223760000 }
    // return new Promise(async (resolve, reject) => {
    //     // check if real & current order, other check?

    //     let pre_order_path = pre_order_details_path + '/' + (orderId || 'f')
    //     await db.ref(pre_order_path).update(data)
    //     resolve('Ok')
    // }) // ok
})

// let db = admin.database()
// let scottsZones = shippingZones.shippingZones()
// console.log('scottsZones', scottsZones)
// db.ref('/shippingZones/' + 'm1UXzAbnptSL5EbjUIP6KJKj4g03').set(scottsZones)



exports.turnOnLed = functions.https.onRequest((req, res) => { // ok
    let db = admin.database()
    cors(req, res, async () => {
        await db.ref('/ledState').set(1)

        let now = new Date()
        let today = now.toISOString().split('T')[0]
        let time = now.getTime()
        // await db.ref('/workHistory/' + (today || 'f') + '/' + time).set(1)
        await db.ref('/workHistory/' + time).set(1)

        res.status(200).send({response: 'ok'})
    })
})

exports.turnOffLed = functions.https.onRequest((req, res) => { // ok
    let db = admin.database()
    cors(req, res, async () => {
        await db.ref('/ledState').set(0)

        let now = new Date()
        let today = now.toISOString().split('T')[0]
        let time = now.getTime()
        // await db.ref('/workHistory/' + (today || 'f') + '/' + time).set(0)
        await db.ref('/workHistory/' + time).set(0)

        res.status(200).send({response: 'ok'})
    })
})

exports.getLedState = functions.https.onRequest((req, res) => { // ok
    let db = admin.database()
    cors(req, res, async () => {
        let _ledState = await db.ref('/ledState').once('value')
        let ledState = _ledState ? _ledState.val() : 0
        res.status(200).send({ledState})
    })
})
/* Cart */
exports.addToMyCart = functions.https.onRequest((req, res) => { // ok
    let db = admin.database()
    cors(req, res, async () => {
        console.log('req', req)
        let event = req.body
        let item = (JSON.parse(event) || {}).item
        console.log('item', item)

        if (item) {
            await db.ref('/carts/' + '123abc').push(item)
            let _myCart = await db.ref('/carts/' + '123abc').once('value')
            let myCart = _myCart.val()
            res.status(200).send({ 
                received: true,
                data: 'Success!',
                cart: myCart || {}
            })
        } else {
            res.status(400).send({ 
                received: true,
                data: 'No item'
            })
        }

    })
})
exports.getMyCart = functions.https.onRequest((req, res) => { // ok
    let db = admin.database()
    console.log('getMyCart ==>')
    cors(req, res, async () => {
    console.log('getMyCart ==> 2')
        let event = req.body;
        console.log('event', event)

        let _myCart = await db.ref('/carts/' + '123abc').once('value')
        let myCart = _myCart.val()

        res.status(200).send({ 
            received: true,
            data: 'Success!',
            cart: myCart || {}
        })



        // console.log('EVENT1', event.data.object)
        // console.log('EVENT2', event.data.object.metadata)

        // let metadata = event.data.object.metadata // customer, orderNumber, items, 
        // let customerId = metadata.customer
        // let orderNumber = metadata.orderNumber

        // let new_order_intents_path = order_intents_path + '/' + orderNumber
        // let _fullOrder = await db.ref(new_order_intents_path).once('value')
        // let fullOrder = _fullOrder.val()

        // console.log('**fullOrder**', fullOrder)

        // // Handle the event // charge.dispute.created
        // switch (event.type) {
        // case 'payment_intent.succeeded':
        //   const paymentIntent = event.data.object;
        //   console.log('PaymentIntent was successful!');
        //   console.log(customerId); // FOR TEST 1
        //   console.log(orderNumber); // FOR TEST 2
        //   console.log(fullOrder); // FOR TEST 3

        //   let addFile = fullOrder[0].addFile
        //   console.log('addFile', addFile)
        //   let redirect = fullOrder[0].addURL
        //   console.log('redirect', redirect)
        //   let goToUrl = null
        //   let downloadFile = null

        //   if (redirect) {
        //     console.log('redirect', fullOrder)
        //     goToUrl = fullOrder[0].redirectURL
        //   }
        //   // combine with preOrderDetails

        //     let pre_order_path = pre_order_details_path + '/' + (orderNumber || 'f')
        //     let _preOrderData = await db.ref(pre_order_path).once('value')
        //     let preOrderData = _preOrderData.val()

        //     if (addFile) {
        //         console.log('addFile2', fullOrder[0].productDeliveryFile)
        //         downloadFile = fullOrder[0].productDeliveryFile ? fullOrder[0].productDeliveryFile.url : null
        //     }

        //     // do for every later
        //     let OUR_FLAT_FEE = 0.39 * 100
        //     let OUR_VARIABLE_FEE = 0.049
        //     fullOrder[0].earned = parseFloat(fullOrder[0].price) * (1 - OUR_VARIABLE_FEE) - OUR_FLAT_FEE

        //     console.log('a')
        //     fullOrder = {
        //         created: (new Date()).getTime(),
        //         order: fullOrder,
        //         fulfillmentDetails: preOrderData
        //     }
        //     let new_completed_order_path = completed_orders_by_user_path + (customerId || 'f') + '/' + orderNumber
        //     console.log('b1', new_completed_order_path)
        //     await db.ref(new_completed_order_path).set(fullOrder)
        //     console.log('b2', fullOrder)

        //     // ONLY ADD IF SERVICE OR CALENDAR
        //     if ((fullOrder.order[0].productType == 'digital-service') || (fullOrder.order[0].productType == 'calendar-event')) {
        //         console.log('c', fullOrder.order[0])

        //         let ownerId = fullOrder.order[0].ownerId

        //         let fulfillmentsTotalRef = display_data_by_user + (ownerId || 'f')
        //         console.log(fulfillmentsTotalRef)

        //         // Get total count of unfulfilled orders
        //         let fulfillmentsTotal = 0
        //         //

        //         await db
        //             .ref(fulfillmentsTotalRef)
        //             .child('fulfillments')
        //             .set(fulfillmentsTotal)

        //         let new_fulfillment_required = fulfillments_by_user_path + (customerId || 'f') + '/' + orderNumber
        //         let fulfillmentOrderDetails = {...fullOrder, status: 'unfulfilled'}
        //         await db.ref(new_fulfillment_required).set(fulfillmentOrderDetails)
        //     }

        //     let now = (new Date()).getTime()

        //     let watch_order_path = order_update_path + (orderNumber || 'f')
        //     console.log('UPDATE ORDER PATH')
        //     console.log(watch_order_path)
        //     console.log({
        //         completed: now,
        //         goToUrl,
        //         downloadFile
        //     })
        //     await db.ref(watch_order_path).set({
        //         completed: now, 
        //         goToUrl,
        //         downloadFile
        //     })
        //     await sendReceiptEmail(fullOrder)
        //     await sendAutoFulfillEmail(fullOrder)
        //     // Send transaction confirmation email to user
        //     // Send fulfillment email to user:
        //         // with DL URL if present
        //         // with forwarding URL if present
        //   break;
        // case 'payment_method.attached':
        //   const paymentMethod = event.data.object;
        //   console.log('PaymentMethod was attached to a Customer!');
        //   break;
        // // ... handle other event types
        // default:
        //   console.log(`Unhandled event type ${event.type}`);
        // }

        // Return a 200 response to acknowledge receipt of the event
    })
})


/* Handling checkout */
exports.handlePayoutResult = functions.https.onRequest((req, res) => { // ok
    let db = admin.database()
    console.log('handleTransactionResult ==>')
    cors(req, res, async () => {
    console.log('handleTransactionResult ==> 2')
        let event = req.body;
        console.log('EVENT1', event.data.object)
        console.log('EVENT2', event.data.object.metadata)
        // payout.canceled
        // payout.created
        // payout.failed
        // payout.paid
        // payout.reconciliation_completed
        // payout.updated
    })
})

let getCustomerByEmail = async (email) => {
    return new Promise(async (resolve, reject) => {
        admin.auth().getUserByEmail(email)
          .then(function(userRecord) {
            let _userRecord = userRecord.toJSON()
            return resolve(_userRecord.uid)
          })
          .catch(function(error) {
            return resolve(false)
          });
    })
}

let createAccount = async (email) => {
    return new Promise(async (resolve, reject) => {
        await admin.auth().createUser({
            email: email,
            emailVerified: false,
            password: 'q1q1q1q1',
            // phoneNumber: '+11234567890',
            // displayName: 'John Doe',
            // photoURL: 'http://www.example.com/12345678/photo.png',
            // disabled: false,
          })
          .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            let uid = userRecord.uid
            console.log('Successfully created new user:', uid);
            return resolve(uid)
          })
          .catch((error) => {
            return resolve(false)
          });
    })
}
 
/* Handling checkout */
// exports.freeCheckout = functions.https.onRequest((req, res) => { // ok
exports.freeCheckout = functions.https.onCall(async (data, context) => { // ok
    let db = admin.database()

    console.log('freeCheckout ==>', data)

    let loggedInCustomerId = context.auth ? context.auth.uid : false
    let existingCustomerId = false
    let newCustomerId = false
    let orderNumber = data.orderNumber

    let new_order_path = cart_pre_order_details_path + orderNumber
    let _newOrder = await db.ref(new_order_path).once('value')
    let newOrder = _newOrder.val()
    let orderEmail = newOrder.email

    newOrder = {...newOrder, orderNumber}

    console.log('**newOrder**', newOrder)
    console.log('loggedInCustomerId', loggedInCustomerId)

    let checkoutId = false

    if (loggedInCustomerId) { // is the customer logged in?
        checkoutId = loggedInCustomerId
    } else {
        let existingCustomerId = await getCustomerByEmail(orderEmail)
        if (existingCustomerId) { // does the customer have an account with this email
            checkoutId = existingCustomerId
        } else { // create a new account for this email address
            newCustomerId = await createAccount(orderEmail)
            checkoutId = newCustomerId
        }
    }

    console.log('Use this buyer ID for checkout (checkoutId)', checkoutId)

    if (newCustomerId) {
        // send welcome email to buyer
        await activityService.sendWelcomeEmailAsBuyer(newCustomerId, orderEmail)
    }

    let sellerId = newOrder.cart.items[0].ownerId
    let _username = await db.ref('customer_info/public/' + sellerId + '/displayName/displayName').once('value')
    let username = _username.val()
    console.log('username', username)
    let userRecord = await admin.auth().getUser(sellerId)
    console.log('userRecord', userRecord)
    let sellerUsername = username
    let sellerEmail = userRecord.email

    // send order receipt to buyer
    await activityService.sendCartOrderReceipt(newOrder, orderEmail, sellerUsername)
    await activityService.sendCartOrderToSeller(newOrder, sellerEmail, sellerUsername, orderEmail)
    // add order to buyer's purchases
    await activityService.addOrderToBuyerPurchases(checkoutId, newOrder)
    // for all physical products together, send email to buyer 
    // await activityService.sendPhysicalOrderEmail(newOrder, orderEmail)

    // let pre_order_path = pre_order_details_path + '/' + (orderNumber || 'f')
    // let _preOrderData = await db.ref(pre_order_path).once('value')
    // let preOrderData = _preOrderData.val()

    let fullOrder = {
        created: (new Date()).getTime(),
        order: newOrder.cart.items,
        fulfillmentDetails: {
            email: newOrder.email || '',
            orderId: newOrder.orderNumber || '',
            name: newOrder.name || '',
            shipToName: newOrder.shipToName || '',
            shipToPhoneNumber: newOrder.shipToPhoneNumber || '',
            shippingAddress: newOrder.shippingAddress || ''
        },
        status: 'unfulfilled'
    }

    let new_completed_order_path = completed_orders_by_user_path + (sellerId || 'f') + '/' + orderNumber
    await db.ref(new_completed_order_path).set(fullOrder)

    let new_fulfillment_required = fulfillments_by_user_path + (sellerId || 'f') + '/' + orderNumber
    let fulfillmentOrderDetails = fullOrder
    await db.ref(new_fulfillment_required).set(fulfillmentOrderDetails)

    let now = (new Date()).getTime()

    let watch_order_path = order_update_path + (orderNumber || 'f')
    console.log('UPDATE ORDER PATH')
    console.log(watch_order_path)
    console.log({
        completed: now
        // goToUrl,
        // downloadFile
    })
    await db.ref(watch_order_path).set({
        completed: now
        // goToUrl,
        // downloadFile
    })


    // for each item
    let orderItems = newOrder.cart.items
    console.log('orderItems', orderItems)
    for (let i in orderItems) {
        let orderItem = orderItems[i]
        let itemOwnerId = orderItem.ownerId
        console.log('*********', orderItem.productType)
        if (orderItem.productType == 'physical-product') {
            // console.log('ITEM', i, 'physical-product', orderItem)
            // add item to seller's fulfillments
        } else if (orderItem.productType == 'digital-download') {
            console.log('ITEM', i, 'digital-download', orderItem)
        } else if (orderItem.productType == 'custom-service') {
            console.log('ITEM', i, 'custom-service', orderItem)
            // let addFile = orderItem.addFile
            // let downloadFile = null
            // if (addFile) {
            //     downloadFile = orderItem.productDeliveryFile ? orderItem.productDeliveryFile.url : null
            // }
            // let itemFulfillment = {
            //     created: (new Date()).getTime(),
            //     orderItem
            // }

            // ,,,

            // let new_fulfillment_path = completed_orders_by_user_path + (ownerId || 'f') + '/' + orderNumber
            // await db.ref(new_completed_order_path).set(fullOrder)

            // send email to buyer with how to proceed with the service
            // add to seller's fulfillments
        } else if (orderItem.productType == 'calendar-event') {
            // console.log('ITEM', i, 'calendar-event', orderItem)
            // send email to buyer regarding your booking
            // send calendar invite
            // book time off in seller's schedule

            // get seller's name and email from sellerId
            // sellerId

            let newAppointment = orderItem.newAppointment

            // newAppointment = {
            //     appointmentStartTime: 630,
            //     appointmentTimeSelected: 3,
            //     selectedAppointmentTime: 0,
            //     selectedCalendarDay: '2024-01-18',
            //     times: [
            //         {price:0, time:30}
            //     ]
            // }

            let selectedCalendarDaySplit = newAppointment.selectedCalendarDay.split('-')
            let appointmentStartMinutes = newAppointment.appointmentStartTime % 60
            let appointmentStartHours = (newAppointment.appointmentStartTime - appointmentStartMinutes) / 60

            let minutesSelected = newAppointment.times[newAppointment.selectedAppointmentTime].time
            let minutes = minutesSelected % 60
            let hours = (minutesSelected - minutes) / 60
            let duration = {minutes}
            if (hours) {duration.hours = hours}

            console.log('DURATION')
            console.log(minutesSelected)
            console.log(minutes)
            console.log(hours)
            console.log(duration)

            let start = [
                selectedCalendarDaySplit[0],
                selectedCalendarDaySplit[1],
                selectedCalendarDaySplit[2],
                appointmentStartHours,
                appointmentStartMinutes
            ]

            let inviteData = {
                fromEmail: sellerEmail,
                fromName: sellerUsername,
                toEmail: orderEmail,
                toName: newOrder.shipToName || '',
                start, // [2021, 5, 22, 6, 30]
                duration, // { hours: 18, minutes: 30 }
                title: (orderItem.header || orderItem.title),
                description: orderItem.description,
                emailSubjectForHost: 'New booking: ' + (orderItem.header || orderItem.title),
                emailSubjectForInvitee: 'Your booking with ' + sellerUsername
            }

            calendarService.sendInvite(inviteData)
        }
    }

    // do tracking for items above

    // update preorder path




    // let redirect = orderItem.addURL
    // let goToUrl = null
    // if (redirect) {
    //     console.log('redirect', fullOrder)
    //     goToUrl = fullOrder[0].redirectURL
    // }
    
    return 'ok' 








    //

    // let addFile = fullOrder[0].addFile
    // console.log('addFile', addFile)
    // let redirect = fullOrder[0].addURL
    // console.log('redirect', redirect)
    // let goToUrl = null
    // let downloadFile = null

    // if (redirect) {
    // console.log('redirect', fullOrder)
    //     goToUrl = fullOrder[0].redirectURL
    // }
    // // combine with preOrderDetails

    // let pre_order_path = pre_order_details_path + '/' + (orderNumber || 'f')
    // let _preOrderData = await db.ref(pre_order_path).once('value')
    // let preOrderData = _preOrderData.val()

    // if (addFile) {
    //     console.log('addFile2', fullOrder[0].productDeliveryFile)
    //     downloadFile = fullOrder[0].productDeliveryFile ? fullOrder[0].productDeliveryFile.url : null
    // }

    // let ownerId = fullOrder[0].ownerId

    // do for every later
    // let OUR_FLAT_FEE = 0.39 * 100
    // let OUR_VARIABLE_FEE = 0.049
    // fullOrder[0].earned = parseFloat(fullOrder[0].price) * (1 - OUR_VARIABLE_FEE) - OUR_FLAT_FEE

    // console.log('a')
    // fullOrder = {
    //     created: (new Date()).getTime(),
    //     order: fullOrder,
    //     fulfillmentDetails: preOrderData
    // }
    // let new_completed_order_path = completed_orders_by_user_path + (ownerId || 'f') + '/' + orderNumber
    // await db.ref(new_completed_order_path).set(fullOrder)
    // console.log('b1', new_completed_order_path)
    // console.log('b2', fullOrder)

    // ONLY ADD IF SERVICE OR CALENDAR
    // if (
    //     (fullOrder.order[0].productType == 'digital-service') || 
    //     (fullOrder.order[0].productType == 'calendar-event') ||
    //     (fullOrder.order[0].productType == 'physical-product')
    // ) {
    //     console.log('c', fullOrder.order[0])

    //     let ownerId = fullOrder.order[0].ownerId

    //     let fulfillmentsTotalRef = display_data_by_user + (ownerId || 'f')
    //     console.log(fulfillmentsTotalRef)

    //     // Get total count of unfulfilled orders
    //     let fulfillmentsTotal = 0
    //     //

    //     await db
    //         .ref(fulfillmentsTotalRef)
    //         .child('fulfillments')
    //         .set(fulfillmentsTotal)

    //     let new_fulfillment_required = fulfillments_by_user_path + (ownerId || 'f') + '/' + orderNumber
    //     let fulfillmentOrderDetails = {...fullOrder, status: 'unfulfilled'}
    //     await db.ref(new_fulfillment_required).set(fulfillmentOrderDetails)
    // }

    // let now = (new Date()).getTime()

    // let watch_order_path = order_update_path + (orderNumber || 'f')
    // console.log('UPDATE ORDER PATH')
    // console.log(watch_order_path)
    // console.log({
    //     completed: now,
    //     goToUrl,
    //     downloadFile
    // })
    // await db.ref(watch_order_path).set({
    //     completed: now, 
    //     goToUrl,
    //     downloadFile
    // })

    // let d = new Date()
    // let today = d.toISOString().split('T')[0]

    // await activityService.sendOrderReceipt(fullOrder)
    // let dataRef = '/tracking/sales/' + (fullOrder.order[0].uniqueProductId || 'f') + '/' + (today || 'fd')
    // await db
    // .ref(dataRef)
    // .child('totalCount')
    // .set(firebase.database.ServerValue.increment(1))
    
    // if (fullOrder.order[0].productType == 'digital-download') {
    //     await sendAutoFulfillEmail(fullOrder)
    // }
    // if (fullOrder.order[0].productType == 'physical-product') {
    //     await triggerPhysicalOrderFulfillment(fullOrder)
    // }
    
    // Send transaction confirmation email to user
    // Send fulfillment email to user:
        // with DL URL if present
        // with forwarding URL if present
})
exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  console.log('user', user)
  let email = user.email
  await activityService.sendWelcomeEmailAsSeller(email)
  return 'success'
});
exports.handleTransactionResult = functions.https.onRequest((req, res) => { // ok
    let db = admin.database()
    cors(req, res, async () => {
        let event = req.body;
        console.log('EVENT1', event.data.object)
        let metadata = event.data.object.metadata // customer, orderNumber, items, 
        let customerId = metadata.customer
        let orderNumber = metadata.orderNumber

        let new_order_intents_path = order_intents_path + '/' + orderNumber
        let _fullOrder = await db.ref(new_order_intents_path).once('value')
        let fullOrder = _fullOrder.val()

        console.log('**fullOrder**', fullOrder)

        // Handle the event // charge.dispute.created
        switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          console.log('PaymentIntent was successful!');
          console.log(customerId); // FOR TEST 1
          console.log(orderNumber); // FOR TEST 2
          console.log(fullOrder); // FOR TEST 3

          let addFile = fullOrder[0].addFile
          console.log('addFile', addFile)
          let redirect = fullOrder[0].addURL
          console.log('redirect', redirect)
          let goToUrl = null
          let downloadFile = null

          if (redirect) {
            console.log('redirect', fullOrder)
            goToUrl = fullOrder[0].redirectURL
          }
          // combine with preOrderDetails ,,,,,

            let pre_order_path = cart_pre_order_details_path + '/' + (orderNumber || 'f')
            let _preOrderData = await db.ref(pre_order_path).once('value')
            let preOrderData = _preOrderData.val()

            // ,, preorderData should be fulfillmentDetails

            if (addFile) {
                console.log('addFile2', fullOrder[0].productDeliveryFile)
                downloadFile = fullOrder[0].productDeliveryFile ? fullOrder[0].productDeliveryFile.url : null
            }

            let _proAccount = await db.ref('/customer_info/private/' + (customerId || 'f') + '/type').once('value')
            let proAccount = _proAccount.val()

            let isPro = proAccount == 'pro'

            // do for every later
            let OUR_FLAT_FEE = 0.30 * 100
            let OUR_VARIABLE_FEE = isPro ? 0.039 : 0.1
            fullOrder[0].earned = parseFloat(fullOrder[0].price) * (1 - OUR_VARIABLE_FEE) - OUR_FLAT_FEE

            console.log('a')
            fullOrder = {
                created: (new Date()).getTime(),
                order: fullOrder,
                fulfillmentDetails: {...preOrderData, orderNumber}
            }
            let new_completed_order_path = completed_orders_by_user_path + (customerId || 'f') + '/' + orderNumber
            console.log('b1', new_completed_order_path)
            await db.ref(new_completed_order_path).set(fullOrder)
            console.log('b2', fullOrder)

            // ONLY ADD IF SERVICE OR CALENDAR
            let orderHasFulfillment = fullOrder.order.filter(v => {
                return (v.productType == 'custom-service') ||
                        (v.productType == 'calendar-event') ||
                        (v.productType == 'physical-product')
            })
            if (orderHasFulfillment) {
                console.log('c', fullOrder.order[0])

                let ownerId = fullOrder.order[0].ownerId

                let fulfillmentsTotalRef = display_data_by_user + (ownerId || 'f')
                console.log(fulfillmentsTotalRef)

                // Get total count of unfulfilled orders
                let fulfillmentsTotal = 0
                //

                await db
                    .ref(fulfillmentsTotalRef)
                    .child('fulfillments')
                    .set(fulfillmentsTotal)

                let new_fulfillment_required = fulfillments_by_user_path + (customerId || 'f') + '/' + orderNumber
                let fulfillmentOrderDetails = {...fullOrder, status: 'unfulfilled'}
                await db.ref(new_fulfillment_required).set(fulfillmentOrderDetails)
            }

            let now = (new Date()).getTime()

            let watch_order_path = order_update_path + (orderNumber || 'f')
            console.log('UPDATE ORDER PATH')
            console.log(watch_order_path)
            console.log({
                completed: now,
                goToUrl,
                downloadFile
            })
            await db.ref(watch_order_path).set({
                completed: now, 
                goToUrl,
                downloadFile
            })

            let d = new Date()
            let today = d.toISOString().split('T')[0]

            if (!fullOrder.fulfillmentDetails) {
                fullOrder.fulfillmentDetails = {orderId: orderNumber}
            }

            let sellerId = customerId
            let _username = await db.ref('customer_info/public/' + sellerId + '/displayName/displayName').once('value')
            let username = _username.val()
            console.log('username', username)
            let userRecord = await admin.auth().getUser(sellerId)
            console.log('userRecord', userRecord)
            let sellerUsername = username
            let sellerEmail = userRecord.email

            // send order receipt to buyer
            await activityService.sendCartOrderReceipt(fullOrder, fullOrder.fulfillmentDetails.email, sellerUsername)
            await activityService.sendCartOrderToSeller(fullOrder, sellerEmail, sellerUsername, fullOrder.fulfillmentDetails.email)

            let dataRef = '/tracking/sales/' + (fullOrder.order[0].uniqueProductId || 'f') + '/' + (today || 'fd')
            await db
            .ref(dataRef)
            .child('totalCount')
            .set(firebase.database.ServerValue.increment(1))

            let SCOTT_ID = 't8q2bV79pNSwKsNSJR5Lig5UL1s1' 

            if (fullOrder.order.filter(v => v.productType == 'physical-product')[0] && (customerId == SCOTT_ID)) {
                await triggerPhysicalOrderFulfillment(fullOrder)
            }
            // if (fullOrder.order[0].productType == 'digital-download') {
            //     await sendAutoFulfillEmail(fullOrder)
            // }
            // if (fullOrder.order[0].productType == 'physical-product') {
            // }
            
            
            // ,,,,, send calendar invite


            // for each item
            let orderItems = fullOrder.order
            console.log('orderItems', orderItems)
            for (let i in orderItems) {
                let orderItem = orderItems[i]
                let itemOwnerId = orderItem.ownerId
                console.log('*********', orderItem.productType)
                if (orderItem.productType == 'physical-product') {
                    // console.log('ITEM', i, 'physical-product', orderItem)
                    // add item to seller's fulfillments
                } else if (orderItem.productType == 'digital-download') {
                    console.log('ITEM', i, 'digital-download', orderItem)
                } else if (orderItem.productType == 'custom-service') {
                    console.log('ITEM', i, 'custom-service', orderItem)
                    // let addFile = orderItem.addFile
                    // let downloadFile = null
                    // if (addFile) {
                    //     downloadFile = orderItem.productDeliveryFile ? orderItem.productDeliveryFile.url : null
                    // }
                    // let itemFulfillment = {
                    //     created: (new Date()).getTime(),
                    //     orderItem
                    // }

                    // ,,,

                    // let new_fulfillment_path = completed_orders_by_user_path + (ownerId || 'f') + '/' + orderNumber
                    // await db.ref(new_completed_order_path).set(fullOrder)

                    // send email to buyer with how to proceed with the service
                    // add to seller's fulfillments
                } else if (orderItem.productType == 'calendar-event') {
                    // console.log('ITEM', i, 'calendar-event', orderItem)
                    // send email to buyer regarding your booking
                    // send calendar invite
                    // book time off in seller's schedule

                    // get seller's name and email from sellerId
                    // let sellerId = customerId

                    // let _username = await db.ref('customer_info/public/' + sellerId + '/displayName/displayName').once('value')
                    // let username = _username.val()
                    // console.log('username', username)
                    // let userRecord = await admin.auth().getUser(sellerId)
                    // console.log('userRecord', userRecord)

                    // let sellerUsername = username
                    // let sellerEmail = userRecord.email

                    let newAppointment = orderItem.newAppointment

                    // newAppointment = {
                    //     appointmentStartTime: 630,
                    //     appointmentTimeSelected: 3,
                    //     selectedAppointmentTime: 0,
                    //     selectedCalendarDay: '2024-01-18',
                    //     times: [
                    //         {price:0, time:30}
                    //     ]
                    // }

                    let selectedCalendarDaySplit = newAppointment.selectedCalendarDay.split('-')
                    let appointmentStartMinutes = newAppointment.appointmentStartTime % 60
                    let appointmentStartHours = (newAppointment.appointmentStartTime - appointmentStartMinutes) / 60

                    let minutesSelected = newAppointment.times[newAppointment.selectedAppointmentTime].time
                    let minutes = minutesSelected % 60
                    let hours = (minutesSelected - minutes) / 60
                    let duration = {minutes}
                    if (hours) {duration.hours = hours}

                    console.log('DURATION')
                    console.log(minutesSelected)
                    console.log(minutes)
                    console.log(hours)
                    console.log(duration)

                    let start = [
                        selectedCalendarDaySplit[0],
                        selectedCalendarDaySplit[1],
                        selectedCalendarDaySplit[2],
                        appointmentStartHours,
                        appointmentStartMinutes
                    ]

                    let orderEmail = fullOrder.fulfillmentDetails.email
                    let shipToName = fullOrder.fulfillmentDetails.shipToName

                    let inviteData = {
                        fromEmail: sellerEmail,
                        fromName: sellerUsername,
                        toEmail: orderEmail,
                        toName: shipToName || '-',
                        start, // [2021, 5, 22, 6, 30]
                        duration, // { hours: 18, minutes: 30 }
                        title: (orderItem.header || orderItem.title),
                        description: orderItem.description,
                        emailSubjectForHost: 'New booking: ' + (orderItem.header || orderItem.title),
                        emailSubjectForInvitee: 'Your booking with ' + sellerUsername
                    }

                    calendarService.sendInvite(inviteData)
                }
            }
            // ,,,,, end of send calendar invite

          break;
        case 'payment_method.attached':
          const paymentMethod = event.data.object;
          console.log('PaymentMethod was attached to a Customer!');
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        res.status(200).send({ received: true })
    })
})
exports.updateInventoryCount = functions.https.onCall(async (data, context) => {
    let uid = context.auth.uid
    let db = admin.database()

    let productId = data.productId
    let count = data.count

    let inventoryRef = 'inventory/' + (uid || 'f') + '/' + (productId || 'f')
    let inventoryRef2 = 'inventoryByProduct/' + (productId || 'f')
    await db.ref(inventoryRef).set(count)
    await db.ref(inventoryRef2).set(count)
    return 'ok'
})
exports.setScheduleData = functions.https.onCall(async (data, context) => {
    let uid = context.auth.uid
    let db = admin.database()

    let editorSelectedSchedule = data.editorSelectedSchedule
    let type = data.type
    let newData = data[type]

    console.log('setScheduleData', editorSelectedSchedule, type, newData)

    // let inventoryRef = 'inventory/' + (uid || 'f') + '/' + (productId || 'f')
    // let inventoryRef2 = 'inventoryByProduct/' + (productId || 'f')
    // await db.ref(inventoryRef).set(count)
    // await db.ref(inventoryRef2).set(count)
    return 'ok'
})
exports.getPaymentIntentForOrder = functions.https.onCall(async (_data, context) => {
    let db = admin.database()
    let data = JSON.parse(_data)

    let order = data.order
    let noPay = data.noPay
    let shipping = data.shipping ? (data.shipping.price || 0) : 0

    // validate total
    // validate shipping

    console.log('getPaymentIntentForOrder shipping:', shipping)
    console.log('getPaymentIntentForOrder order:', order)
    
    let orderId = await generateUniqueOrderId()
    let orderTotal = 0
    let orderItems = order.items

    for (let i in orderItems) {
        let item = orderItems[i]
        if (item.productType == 'digital-download') {
            orderTotal = orderTotal + parseFloat(item.price)
        } else if (item.productType == 'custom-service') {
            orderTotal = orderTotal + parseFloat(item.price)
        } else if (item.productType == 'calendar-event') {
            let newAppointment = item.newAppointment
            orderTotal = orderTotal + parseFloat(newAppointment.times[newAppointment.selectedAppointmentTime].price)
        } else if (item.productType == 'physical-product') {
            let sizePrice = parseFloat(item.sizes[item.newItemSize].price) * parseInt(item.newItemQuantity)
            orderTotal = orderTotal + sizePrice
        }
    }

    // create an order id
    // calculate total
    // create payment intent for total
    // save pre-order details
    // return order id

    let ownerId = orderItems[0] && orderItems[0].ownerId
    if (!ownerId) {
        return false
    }
    let uid = ownerId
    console.log('ownerId', ownerId)

    // let public_product_ref = public_products_path + '/' + (oneId || 'f') + '/ownerId'
    // let item = await db.ref(public_product_ref).once('value')
    // let uid = item.val()

    // console.log('paymentIntent uid', uid)

    let newActivityObjectRef = paths.USER_CONNECT_IDS + (uid || 'f')
    let snap = await db.ref(newActivityObjectRef).once('value')
    let account = snap.val() || {}
    let connectedAccountId = account.id

    let customerEmail = data.email // [uniqueProductID] 

    console.log('TOTAL 1', orderTotal)

    let items = await getOrderItems(Object.keys(orderItems))
    // let total = await getTotalFromItems(items, itemQuantities)
    let total = orderTotal

    console.log('TOTAL 2', items, total)

    let _proAccount = await db.ref('/customer_info/private/' + (uid || 'f') + '/type').once('value')
    let proAccount = _proAccount.val()
    let isPro = proAccount == 'pro'

    // let OUR_FLAT_FEE = isPro ? 0.0 : (0.30 * 100)
    let OUR_FLAT_FEE = 0
    let OUR_VARIABLE_FEE = isPro ? 0.0 : 0.065
    let totalFee = (total * OUR_VARIABLE_FEE * 100) + OUR_FLAT_FEE

    var rString = randomString(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    let randomNumber = rString

    console.log('*******', orderId)
    let fullOrder = {
        order: orderItems,
        created: (new Date()).getTime(),
        // fulfillmentDetails: {orderId: randomNumber}
    }

    // let _items = []

    // for (let i in items) {
    //     _items.push({...items[i], quantity: itemQuantities[i]})
    // }  

    let new_order_intents_path = order_intents_path + '/' + randomNumber
    // await db.ref(new_order_intents_path).set(_items)
    await db.ref(new_order_intents_path).set(orderItems)

    console.log('payment intent', randomNumber)
    console.log('total 1', total)
    console.log('total 2', parseInt(total * 100) + parseInt(shipping.loaded == true ? shipping.price * 100 : 0))
    console.log('total 3', parseInt(totalFee.toFixed(2)))

    let paymentIntent
    if (data.noPay) {
        paymentIntent = {}
    } else {
        paymentIntent = await stripe.paymentIntents.create({
            metadata: {
                customer: uid,
                customerEmail: customerEmail,
                orderNumber: randomNumber
            },
            amount: parseInt(total * 100) + parseInt(shipping.loaded == true ? shipping.price * 100 : 0),
            application_fee_amount: parseInt(totalFee.toFixed(2)),
            currency: "usd"
        }, {
            stripeAccount: connectedAccountId,
        }).catch((error) => {
            console.log('error', error)
        })
    }

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: 1000,
    //   currency: 'cad',
    // }, {
    //   stripeAccount: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',

    // });

    console.log('paymentIntent', paymentIntent)

    return {
        total,
        clientSecret: paymentIntent.client_secret,
        orderNumber: randomNumber,
        accountid: connectedAccountId
    } // ok
})
exports.getPaymentIntent = functions.https.onCall(async (_data, context) => {
    let db = admin.database()
    let data = JSON.parse(_data)

    // let uid = context.auth.uid
    let itemIds = data.items // [uniqueProductID] 
    let itemQuantities = data.quantities // [uniqueProductID] 
    let shipping = data.shipping

    console.log('shipping', shipping)
    console.log('getPaymentIntent DATA', data)

    let oneId = itemIds[0]
    if (!oneId) {
        return false
    }

    let public_product_ref = public_products_path + '/' + (oneId || 'f') + '/ownerId'
    let item = await db.ref(public_product_ref).once('value')
    let uid = item.val()

    console.log('paymentIntent uid', uid)

    let newActivityObjectRef = paths.USER_CONNECT_IDS + (uid || 'f')
    let snap = await db.ref(newActivityObjectRef).once('value')
    let account = snap.val() || {}
    let accountid = account.id

    let customerEmail = data.email // [uniqueProductID] 

    let items = await getOrderItems(itemIds)
    let total = await getTotalFromItems(items, itemQuantities)

    let _proAccount = await db.ref('/customer_info/private/' + (uid || 'f') + '/type').once('value')
    let proAccount = _proAccount.val()
    let isPro = proAccount == 'pro'

    // do for every later
    let OUR_FLAT_FEE = isPro ? 0.0 : (0.30 * 100)
    let OUR_VARIABLE_FEE = isPro ? 0.0 : 0.065
    let totalFee = (total * OUR_VARIABLE_FEE * 100) + OUR_FLAT_FEE

    let momentumCut = 0.05
    let applicationFee = total * momentumCut * 100

    var rString = randomString(12, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    // let randomNumber = Math.floor(Math.random() * 1000000000000)
    let randomNumber = rString

    let _items = []

    for (let i in items) {
        _items.push({...items[i], quantity: itemQuantities[i]})
    }  

    let new_order_intents_path = order_intents_path + '/' + randomNumber
    await db.ref(new_order_intents_path).set(_items)

    console.log('payment intent', randomNumber)

    console.log('total', total)
    // console.log('applicationFee', parseFloat(applicationFee.toFixed(2)))
    // console.log('1, 2', total * 100, parseInt(applicationFee.toFixed(2)))
    let paymentIntent
    if (data.noPay) {
        paymentIntent = {}
    } else {
        paymentIntent = await stripe.paymentIntents.create({
            metadata: {
                customer: uid,
                customerEmail: customerEmail,
                orderNumber: randomNumber
            },
            amount: parseInt(total * 100) + parseInt(shipping.loaded == true ? shipping.price * 100 : 0),
            application_fee_amount: parseInt(totalFee.toFixed(2)),
            currency: "usd"
        }, {
            stripeAccount: accountid,
        }).catch((error) => {
            console.log('error', error)
        })
    }

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: 1000,
    //   currency: 'cad',
    // }, {
    //   stripeAccount: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',

    // });

    console.log('paymentIntent', paymentIntent)

    return {
        clientSecret: paymentIntent.client_secret,
        orderNumber: randomNumber,
        accountid: accountid
    } // ok
})
exports.setPreOrderDetails = functions.https.onCall(async (data, context) => {
    let db = admin.database()
    let orderId = data.orderId || await generateUniqueOrderId()

    console.log('setPreOrderDetails', data)

    return new Promise(async (resolve, reject) => {
        // check if real & current order, other check?randomNumber
        let pre_order_path = cart_pre_order_details_path + (orderId || 'f')
        await db.ref(pre_order_path).update(data)
        resolve({orderId, message: 'Ok', status: 200})
    })
})
exports.registerPayBoxView = functions.https.onCall(async (data, context) => {
    let db = admin.database()
    // let uid = context.auth.uid
    let productId = data.productId
    console.log('registerPayBoxView', data) // { email: 'vlad@lowerprofile.com', orderId: 893221827223760000 }
    return new Promise(async (resolve, reject) => {
        let d = new Date()
        let today = d.toISOString().split('T')[0]

        let dataRef = '/tracking/views/' + (productId || 'f') + '/' + (today || 'fd')
        await db
        .ref(dataRef)
        .child('totalCount')
        .set(firebase.database.ServerValue.increment(1))
        resolve('Ok')
    }) // ok
})
exports.getMyBalance = functions.https.onCall(async (data, context) => {
    let db = admin.database()
    let uid = context.auth.uid
    let now = (new Date()).getTime()

    let balance = await connectedAccountsService.getBalance(uid)

    return balance
})

/* Schedules */
exports.addASchedule = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context && context.auth && context.auth.uid
        let now = (new Date()).getTime()

        let defaultNewSchedule = {
          "dailyTimes": [
            [
              [
                "09:00",
                "17:00"
              ]
            ],
            [
              [
                "09:00",
                "17:00"
              ]
            ],
            [
              [
                "09:00",
                "17:00"
              ]
            ],
            [
              [
                "09:00",
                "17:00"
              ]
            ],
            [
              [
                "09:00",
                "17:00"
              ]
            ]
          ],
          "dailyTimesEnabled": [
            true,
            true,
            true,
            true,
            true
          ],
          "default": false,
          "name": "My Hours",
          "timezone": "-5"
        }

        let ref = '/schedules/' + (uid || 'f')
        await db.ref(ref).push(defaultNewSchedule)

        return resolve({
            status: 200,
            message: 'Ok'
        })
    })
})
exports.saveSchedules = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context && context.auth && context.auth.uid
        let now = (new Date()).getTime()

        let mySchedules = data.schedules 

        console.log('mySchedules', mySchedules)

        let ref = '/schedules/' + (uid || 'f')
        await db.ref(ref).set(mySchedules)

        return resolve({
            status: 200,
            message: 'Ok'
        })
    })
})

/* COLLECT EMAIL */
exports.submitEmail = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context && context.auth && context.auth.uid
        let now = (new Date()).getTime()
        let ownerId = data.ownerId

        let ref = '/emailsCollected/' + (ownerId || 'f')
        let newEmailObject = {
            uid: uid || '-',
            submitted: now,
            productId: data.productId,
            email: data.email
        }

        await db.ref(ref).push(newEmailObject)

        // let d = new Date()
        // let today = d.toISOString().split('T')[0]

        // let dataRef = '/tracking/sales/' + (data.productId || 'f') + '/' + (today || 'fd')
        // await db
        // .ref(dataRef)
        // .child('totalCount')
        // .set(firebase.database.ServerValue.increment(1))

        return resolve({
            status: 200,
            message: 'Ok'
        })
    })
})
exports.startConfigureZones = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth.uid
        let now = (new Date()).getTime()

        await shippingZones.setupShippingZones(uid)
        return resolve('ok')
    })
})



/* Fulfillment */
exports.finishFulfillment = functions.https.onCall(async (data, context) => {
    let db = admin.database()
    let uid = context.auth.uid
    let orderNumber = data.orderId
    let i = data.i
    let now = (new Date()).getTime()
    let new_fulfillment_email_path = fulfillments_by_user_path + (uid || 'f') + '/' + (orderNumber || 'f') + '/fulfillmentDetails/email'
    let new_fulfillment_required = fulfillments_by_user_path + (uid || 'f') + '/' + (orderNumber || 'f') + '/order/' + i + '/fulfillmentResponse'
    let new_fulfillment_required2 = fulfillments_by_user_path + (uid || 'f') + '/' + (orderNumber || 'f') + '/order/' + i + '/status'

    let messageToTheBuyer = data.messageToTheBuyer || ''
    let productFulfillmentFile = data.productFulfillmentFile || ''

    let _email = await db.ref(new_fulfillment_email_path).once('value')
    let email = _email.val()

    // send fulfillment email to customer
    let fulfillmentEmail = {
        email, // recipient email
        uid, // owner of product
        orderNumber, // unique order number
        messageToTheBuyer,
        productFulfillmentFile
    }

    console.log('fulfillmentEmail', fulfillmentEmail)

    await sendFulfillmentEmail(fulfillmentEmail)

    await db.ref(new_fulfillment_required).update({
        messageToTheBuyer,
        productFulfillmentFile,
        saved: now
    })
    await db.ref(new_fulfillment_required2).set('fulfilled')

    // let fulfillmentsTotalRef = display_data_by_user + (uid || 'f')
    // console.log('abc', fulfillmentsTotalRef)

    // // Get total count of unfulfilled orders
    // let fulfillmentsTotal = 0
    // //

    // await db
    //     .ref(fulfillmentsTotalRef)
    //     .child('fulfillments')
    //     .set(fulfillmentsTotal)

    return 'ok'
});
exports.saveFulfillmentData = functions.https.onCall(async (data, context) => {
    let db = admin.database()
    let uid = context.auth.uid
    let orderNumber = data.orderId
    let i = data.i
    let now = (new Date()).getTime()
    let new_fulfillment_required = fulfillments_by_user_path + (uid || 'f') + '/' + (orderNumber || 'f') + '/order/' + ((i || (i === 0)) ? i : 'f') + '/fulfillmentResponse'
    await db.ref(new_fulfillment_required).update({
        messageToTheBuyer: data.messageToTheBuyer || '',
        productFulfillmentFile: data.productFulfillmentFile || '',
        saved: now
    })
    return 'ok'
});
exports.unfulfill = functions.https.onCall(async (data, context) => {

    // console.log('data 1', data)
    // console.log('data 2', data.order.fulfillmentDetails.orderId)

    let db = admin.database()
    let uid = context.auth.uid
    let item = data.item
    let orderId = data.order.fulfillmentDetails.orderId
    let i = data.i
    let order = data.item.order

    console.log('deleting product')
    console.log(data)
    console.log(orderId)

    if (!orderId) {
        return {
            message: 'Missing order ID.'
        }
    }
    let my_products_ref = fulfillments_by_user_path + '/' + (uid || 'f') + '/' + (orderId || 'f') + '/order/' + ((i || (i === 0)) ? i : 'f') + '/status'
    console.log('set this path unfulfilled', my_products_ref)
    await db.ref(my_products_ref).set('unfulfilled')

    // let fulfillmentsTotalRef = display_data_by_user + (uid || 'f')
    // console.log(fulfillmentsTotalRef)
    // await db
    //     .ref(fulfillmentsTotalRef)
    //     .child('fulfillments')
    //     .set(firebase.database.ServerValue.increment(1))

    let message = 'ok'

    let responseData = {
        message
    }
    return responseData
});
exports.deleteFulfilledProduct = functions.https.onCall(async (data, context) => {
    let db = admin.database()
    let uid = context.auth.uid
    let now = (new Date()).getTime()
    let item = data.item
    let orderId = data.order.fulfillmentDetails.orderId
    let i = data.i
    let order = data.order

    let undelete = data.undelete

    console.log('deleting product')
    console.log(orderId, undelete)

    if (!orderId) {
        return {
            message: 'Missing order ID.'
        }
    }
    let newArchivedValue = undelete ? null : true
    // Add to 'My Products' => /myProducts/:uid/:productId/product

    let my_products_ref = fulfillments_by_user_path + '/' + (uid || 'f') + '/' + (orderId || 'f') + '/order/' + ((i || (i === 0)) ? i : 'f') + '/archived'
    await db.ref(my_products_ref).set(newArchivedValue)

    let message = 'ok'

    let responseData = {
        message
    }
    return responseData
});

/* Products */
exports.deleteProduct = functions.https.onCall(async (data, context) => {
    let db = admin.database()
    let uid = context.auth.uid
    let now = (new Date()).getTime()

    let uniqueProductId = data.uniqueProductId
    let productId = data.productId

    console.log('deleting product')
    console.log(uniqueProductId, productId)

    if (!uniqueProductId || !productId) {
        return {
            message: 'Missing product ID or unique product ID.'
        }
    }
    // Add to 'My Products' => /myProducts/:uid/:productId/product
    let my_products_ref = my_products_path + '/' + (uid || 'f') + '/' + (productId || 'f') + '/deleted'
    await db.ref(my_products_ref).set(true)

    // Add to public product details => /publicProducts/:productId/product
    let public_products_ref = public_products_path + '/' + (uniqueProductId || 'f') + '/public'
    await db.ref(public_products_ref).set(null)

    let message = 'ok'

    let responseData = {
        message
    }
    return responseData
});
exports.saveProduct = functions.https.onCall(async (data, context) => {
    let db = admin.database()
    let uid = context.auth.uid
    let now = (new Date()).getTime()

    let productDetails = {...data, ownerId: uid}
    let productId = productDetails.productId

    console.log('saving product details')
    console.log(productDetails)

    let uniqueProductId = productDetails.uniqueProductId
    if (!uniqueProductId) {
        uniqueProductId = await generateUniqueProductId()
        productDetails.uniqueProductId = uniqueProductId
    }

    // Add to 'My Products' => /myProducts/:uid/:productId/product
    let myProductData = {
        name: productDetails.heading,
        type: productDetails.productType,
        internalId: productDetails.productId,
        productImageUrl: productDetails.productImageUrl,
        created: productDetails.created,
        public: productDetails.public || false,
        modified: now,
        uniqueProductId
    }
    let my_products_ref = my_products_path + '/' + (uid || 'f') + '/' + (productId || 'f')
    await db.ref(my_products_ref).update(myProductData)

    // Add to public product details => /publicProducts/:productId/product
    productDetails.modified = now
    let public_products_ref = public_products_path + '/' + (uniqueProductId || 'f')
    await db.ref(public_products_ref).update(productDetails)

    console.log('productDetails', productDetails.public, productDetails.public == true)
    let message = 'ok'
    if (productDetails.public == true) {
        message = 'public'
    }

    // check my store and update product with same ID if I have it
    let _myStoreItems = await db.ref('/stores/' + (uid || 'f') + '/items').once('value')
    let myStoreItems = _myStoreItems.val()

    for (let i in myStoreItems) {
        let item = myStoreItems[i]
        console.log('ITEM =>', item)
        if (item.productId == uniqueProductId) {
            console.log('match item.productId == uniqueProductId')
            myStoreItems[i] = {
                productId: uniqueProductId,
                description: productDetails.description,
                appointmentLengths: productDetails.appointmentLengths,
                productImage: productDetails.productImageUrl,
                productType: productDetails.productType,
                freeProduct: productDetails.freeProduct,
                title: productDetails.heading,
                price: productDetails.price,
                position: item.position,
                public: productDetails.public || false,
                type: 'buy',
                sizes: productDetails.sizes
            }
        }
    }
    
    await db.ref('/stores/' + (uid || 'f') + '/items').set(myStoreItems)

    let responseData = {
        message,
        updatedProductData: productDetails
    }
    return responseData
});
exports.deactivateProduct = functions.https.onCall(async (data, context) => {
    let db = admin.database()
    let uid = context.auth.uid
    let now = (new Date()).getTime()

    let uniqueProductId = data.uniqueProductId
    let productDetails = {}
    productDetails.modified = now
    productDetails.public = null

    let public_products_ref = public_products_path + '/' + (uniqueProductId || 'f')
    await db.ref(public_products_ref).update(productDetails)

    let responseData = {
        message: 'ok',
        updatedProductData: productDetails
    }
    return responseData
});

/* Profile/Settings */
exports.saveProfile = functions.https.onCall(async (data, context) => {
    let db = admin.database()
    let uid = context.auth.uid
    let now = (new Date()).getTime()

    let displayName = data.displayName
    let fullName = data.fullName
    let profileImageUrl = data.profileImageUrl

    let privateData = {fullName, profileImageUrl}

    console.log('data', data)

    if (displayName) {
        let my_profile_ref1 = 'customer_info/public/' + (uid || 'f') + '/displayName/'
        let _updatedProfile1 = await db.ref(my_profile_ref1).update({displayName})
        db.ref('/usernames/' + (displayName ? displayName.toLowerCase() : '')).set(uid)
    }
    // if (fullName) {
    //     let my_profile_ref2 = 'customer_info/private/' + (uid || 'f') + '/fullName/'
    //     let _updatedProfile2 = await db.ref(my_profile_ref2).update({fullName})
    // } 
    if (profileImageUrl) {
        let my_profile_ref3 = 'customer_info/public/' + (uid || 'f') + '/profileImageUrl/'
        let _updatedProfile3 = await db.ref(my_profile_ref3).update({profileImageUrl})
    } 
    return({updatedProfileData: {displayName, fullName, profileImageUrl}})

    return 'ok'



    // TO DEPLOY:
    // saveProduct


    // let productDetails = {...data, ownerId: uid}
    // let productId = productDetails.productId

    // console.log('saving product details')
    // console.log(productDetails)

    // let uniqueProductId = productDetails.uniqueProductId
    // if (!uniqueProductId) {
    //     uniqueProductId = await generateUniqueProductId()
    //     productDetails.uniqueProductId = uniqueProductId
    // }

    // // Add to 'My Products' => /myProducts/:uid/:productId/product
    // let myProductData = {
    //     name: productDetails.heading,
    //     type: productDetails.productType,
    //     internalId: productDetails.productId,
    //     created: productDetails.created,
    //     modified: now,
    //     uniqueProductId
    // }
    // let my_products_ref = my_products_path + '/' + (uid || 'f') + '/' + (productId || 'f')
    // await db.ref(my_products_ref).update(myProductData)

    // // Add to public product details => /publicProducts/:productId/product
    // productDetails.modified = now
    // let public_products_ref = public_products_path + '/' + (uniqueProductId || 'f')
    // await db.ref(public_products_ref).update(productDetails)

    // console.log('productDetails', productDetails.public, productDetails.public == true)
    // let message = 'ok'
    // if (productDetails.public == true) {
    //     message = 'public'
    // }
    // console.log('message', message)

    // let responseData = {
    //     message,
    //     updatedProductData: productDetails
    // }
    // return responseData
});

/* Stripe Connect Onboarding */
exports.checkConnectOnboarding = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let uid = context.auth && context.auth.uid
        let res = connectedAccountsService.checkAccount(uid)
        return resolve(res)
    })
})
exports.finishOnboarding = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let now = (new Date()).getTime()
        let res = connectedAccountsService.finishOnboarding(uid)
        return resolve(res)
    })
})
exports.checkIfUserExists = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        // let res = connectedAccountsService.createAccount(uid, email)

        console.log('checkIfUserExists', data)

        let checkThisEmail = data.email

        try {
            const userRecord = await admin.auth().getUserByEmail(checkThisEmail);
            console.log('User exists:', userRecord.toJSON());
            return resolve({userExists: true})
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                console.log('User does not exist.');
                return resolve({userExists: false})
            }
            console.error('An error occurred:', error);
            return resolve({userExists: false})
        }
        return resolve(res)
    })
})
exports.startOnboarding = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let country = data.country || 'US'
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let res = connectedAccountsService.createAccount(uid, email, country)
        return resolve(res)
    })
})
exports.countLinkClick = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let now = (new Date()).getTime()

        let linkId = data.id

        let d = new Date()
        let today = d.toISOString().split('T')[0]

        let dataRef = '/storeItemClicks/' + (uid || 'f') + '/' + (linkId || 'f') + '/' + (today || 'fd')
        await db
        .ref(dataRef)
        .child('totalCount')
        .set(firebase.database.ServerValue.increment(1))

        return resolve('countLinkClick success')
    })
})
exports.countStoreView = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let now = (new Date()).getTime()

        let d = new Date()
        let today = d.toISOString().split('T')[0]

        let dataRef = '/storeViews/' + (uid || 'f') + '/' + (today || 'fd')
        await db
        .ref(dataRef)
        .child('totalCount')
        .set(firebase.database.ServerValue.increment(1))

        return resolve('countStoreView success')
    })
})
exports.activateMyStore = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let now = (new Date()).getTime()

        let storeObject = {...data, ownerId: uid}

        // URLS
        // /:username/:product          product                     client-side
        // /:username                   store/links                 client-side

        // DB REFS
        // /usernames/:username/uid     get the UID from username   done
        // /stores/:uid                 load the store from uid     backend done  

        await db.ref('/stores/' + (uid || 'f')).set(storeObject)

        // set default schedule
        let defaultSchedule = {
          "dailyTimes": [
            [
              [
                "09:00",
                "17:00"
              ]
            ],
            [
              [
                "09:00",
                "17:00"
              ]
            ],
            [
              [
                "09:00",
                "17:00"
              ]
            ],
            [
              [
                "09:00",
                "17:00"
              ]
            ],
            [
              [
                "09:00",
                "17:00"
              ]
            ]
          ],
          "dailyTimesEnabled": [
            true,
            true,
            true,
            true,
            true
          ],
          "default": true,
          "name": "Work Hours",
          "timezone": "-5"
        }
        await db.ref('/schedules/' + (uid || 'f') + '/schedule1').set(defaultSchedule)

        let _defaultShippingZones = await db.ref('/shippingZones/default').once('value')
        let defaultShippingZones = _defaultShippingZones ? _defaultShippingZones.val() : {}

        await db.ref('/shippingZones/' + (uid || 'f')).set(defaultShippingZones)

        return resolve('activateMyStore success')
    })
})
exports.setDefaultViewForMyStore = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let now = (new Date()).getTime()
        let displayStyle = data.displayStyle || '' 
        await db.ref('/stores/' + (uid || 'f') + '/displayStyle').set(displayStyle)
        return resolve('displayStyle success')
    })
})
exports.skipIntro = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let now = (new Date()).getTime()


        // URLS
        // /:username/:product          product                     client-side
        // /:username                   store/links                 client-side

        // DB REFS
        // /usernames/:username/uid     get the UID from username   done
        // /stores/:uid                 load the store from uid     backend done  

        await db.ref('/customer_info/private/' + (uid || 'f') + '/skippedIntro').set(true)
        return resolve('activateMyStore success')
    })
})

/* Shipping Network */
exports.addANewShipper = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let now = (new Date()).getTime()

        let body = data
        await db.ref('/shippingProvidersByUser/' + (uid || 'f')).push(body)
        return resolve('addANewShipper success')
    })
})

/* Incoming Order Object Format */
let randomOrderObject = (fullOrder) => {
    console.log('randomOrderObject', fullOrder)

    let items = []
    // let numberOfItems = 1 + Math.ceil(Math.random() * 3)
    // let numberOfItems = order.quantity || 1
    let totalItems = 0
    let priceTotal = 0 
    let totalWeight = 0

    let order = fullOrder.order[0] // 
    // for (let i = 0; i < numberOfItems; i = i + 1) {
    let quantityOfItem = order.quantity || 1
    let itemPrice = order.price || 0
    items.push({
        id_line_item: 0,
        id_sku: order.productSku || '',
        id_sku_alt: order.productSkuAlt || '', // optional
        oli_desc: order.description || '',
        oli_price_ext: itemPrice, // total for the line item
        oli_qtty: quantityOfItem = order.quantity || 1
    })
    totalItems = totalItems + quantityOfItem
    priceTotal = priceTotal + itemPrice * quantityOfItem
    totalWeight = totalWeight + order.weightLb * quantityOfItem
    // }

    let orderObject = {
        id_Client: `COFFE`,
        OrderID: randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
        PriceTotal: priceTotal,
        TotalItems: totalItems,
        WeightTotal: totalWeight,
        id_OrderAPI: '', // optional
        id_OrderAlt: '', // optional
        shipTo: {
            ShipName: 'Vladimir Baranov',
            ShipCountry: 'US',
            ShipState: 'NJ',
            ShipCity: 'East Orange',
            ShipStreet: Math.ceil(Math.random() * 1000) + ' Glenwood Ave',
            ShipStreet_2: '', // optional
            ShipZip: '01234',
            PO: '', // optional
            ShipCarrier: '', // optional
            ShipCompany: 'The Testing Company Inc.', // optional
            ShipEmail: '', // optional_for_customer_notification_from_SMO@single_email_address_only.com
            ShipPhone: '' // optional
        },
        shippingMethod: {
            ShipProfileID: 99, // optional - used to white-label shipping
            ShipService: 'US Shipping Standard'
        },
        LineItems: { // All Line Items should have unique "id_sku" nodes
            LineItem: items
        }
    }


    return orderObject
}

// randomOrderObject()

/* HANDLING PHYSICAL ORDERS WITH Heftwerk */
let HEFTWERK_SHEET_JSON = (fullOrder) => {
    let now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const year = now.getFullYear()
    let dmYYYY =  `${month}/${day}/${year}`
    let orderObject = randomOrderObject(fullOrder)

    let heftwerkJson = []

    for (let item in orderObject.LineItems.LineItem) {
        let itemObject = orderObject.LineItems.LineItem[item]
        heftwerkJson.push([
            orderObject.OrderID, // order Id
            orderObject.shipTo.ShipCompany, // Business Name
            orderObject.shipTo.ShipName, // Full Name
            orderObject.shipTo.ShipStreet, // Adress 1
            orderObject.shipTo.ShipStreet_2, // Adress 2
            orderObject.shipTo.ShipZip, // ZIP
            orderObject.shipTo.ShipCity, // City
            orderObject.shipTo.ShipState, // State
            orderObject.shipTo.ShipCountry, // Country ISOCode
            itemObject.id_sku, // Item
            itemObject.oli_qtty, // Quantity
            orderObject.shipTo.ShipEmail, // email
            orderObject.shipTo.ShipPhone, // telephone
            '' // Shipping Method
        ])
    }

    return heftwerkJson
}

/* HANDLING PHYSICAL ORDERS WITH ShipMyOrders */
let SMO_JSON = (fullOrder) => {
    let now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const year = now.getFullYear()
    let dmYYYY =  `${month}/${day}/${year}`
    let orderObject = randomOrderObject(fullOrder)

    let smoJSON = {
        Order: {
            Created: now,
            Date: dmYYYY,
            Updated: now,
            LineItems: orderObject.LineItems,
            OrderID: orderObject.OrderID,
            PO: orderObject.shipTo.PO,
            Platform: `MomentumWebhook`,
            ShipCarrier: orderObject.shipTo.ShipCarrier,
            ShipCity: orderObject.shipTo.ShipCity,
            ShipCompany: orderObject.shipTo.ShipCompany,
            ShipCountry: orderObject.shipTo.ShipCountry,
            ShipEmail: orderObject.shipTo.ShipEmail,
            ShipName: orderObject.shipTo.ShipName,
            ShipPhone: orderObject.shipTo.ShipPhone,
            ShipService: orderObject.shippingMethod.ShipService,
            ShipProfileID: orderObject.shippingMethod.ShipProfileID,
            id_ShipService: "", // 01-this would be based on SMO's internal code, optional, but precise
            ShipState: orderObject.shipTo.ShipState,
            ShipStreet: orderObject.shipTo.ShipStreet,
            ShipStreet_2: orderObject.shipTo.ShipStreet_2,
            ShipZip: orderObject.shipTo.ShipZip,
            Status: `NewOrder`,
            WeightTotal: orderObject.WeightTotal,
            id_Channel: 999999,
            id_Client: orderObject.id_Client,
            id_OrderAPI: orderObject.id_OrderAPI,
            id_OrderAlt: orderObject.id_OrderAlt
        },
        PriceTotal: orderObject.PriceTotal,
        TotalItems: orderObject.TotalItems
    }

    return smoJSON
}

let sendOrderToSMO = async (order) => {
    return new Promise(async (resolve, reject) => {

        // get customer's token here
        let token = {
            access_token: 'KEY_WeDyGFYrDGgrl8nApUqhaguQSGLc0CVG0kyxBNgflptWRy'
        }
        let headers = {
            'Authorization': `Bearer ${token.access_token}`,
            'Content-Type': 'application/json'
        }
        let data = SMO_JSON(order)
        let url = `https://shipmyorders.org:3030/receiver/OttoReceiver.fmp12/COFFE_Test`

        let orderStatus = await axios({
          url,
          method: 'post',
          headers,
          data
        })

        console.log('orderStatus', orderStatus)
    })
}
let testStatusWebhook = async (order) => {
    return new Promise(async (resolve, reject) => {
        // get customer's token here
        let token = {
            access_token: 'KEY_WeDyGFYrDGgrl8nApUqhaguQSGLc0CVG0kyxBNgflptWRy'
        }
        let testToken = '3rfdsdf3323g563563535635h978hytr'

        let headers = {
            'Authorization': `Bearer ${testToken}`,
            'Content-Type': 'application/json'
        }
        let data = {
                time: '1/1/2023 8:05:00 PM',
                id_Client: 'COFFE',
                OrderID: 'Order #',
                status: 'status',
                message: 'Status-related message'
            }

        let url = `https://us-central1-tap-in-7704f.cloudfunctions.net/smoOrderStatus`

        let testStatus = await axios({
          url,
          method: 'post',
          headers,
          data
        })

        console.log('testStatus', testStatus)
    })
}
exports.smoOrderStatus = functions.https.onRequest(async (req, res) => { // ok
    let now = (new Date()).getTime()
    let db = admin.database()
    cors(req, res, async () => {
        console.log('req', req)
        let body = req.body
        await db.ref('/smoWebhookTests').push(body)

        // expecting: 
        // {
        //     time: "1/1/2023 8:05:00 PM",
        //     id_Client: 'COFFE',
        //     OrderID: 'Order #',
        //     status: 'status',
        //     message: 'Status-related message'
        // }

        res.status(200).send({
            time: now,
                id_Client: 'COFFE',
                OrderID: 'Order #',
            success: true,
            error: 0,
            result: 'Success'
        })

    })
})
exports.startConnectingGoogleSheet = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        console.log('startConnectingGoogleSheet')
        let res = await googleSheetsService.generateAuthUrl()
        console.log('Auth URL:', res)

        return resolve({status: 200, message: 'success', url: res})
    })
})
exports.selectSheet = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        
        let _access_token = await db.ref('/googleSheetsConnected/' + (uid || 'f')).once('value')
        let access_token = _access_token.val()
        let res = await googleSheetsService.getMySheets(access_token)
        console.log('selectSheet response:', res)
        return resolve({status: 200, message: 'success', sheets: res})
    })
})
exports.addTextToStore = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let _text = data.text
        let _position = data.position

        console.log('data', data)

        // let _productObject = await db.ref('/publicProducts/' + (productId || 'f')).once('value')
        // let productObject = _productObject.val()

        // console.log('productObject', productObject)

        let newLink = {
            // productId: productId,
            // productImage: productObject.productImageUrl,
            text: _text,
            // productType: productObject.productType,
            // price: productObject.price,
            // freeProduct: productObject.freeProduct,
            type: 'text',
            position: _position
        }
        
        await db.ref('/stores/' + (uid || 'f') + '/items').push(newLink)
        // let access_token = _access_token.val()
        // let res = await googleSheetsService.getMySheets(access_token)
        // console.log('addLinkToStore response:', res)
        return resolve({status: 200, message: 'success'})
    })
})
exports.addProductToStore = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let productId = data.productId
        let _position = data.position
        let _productObject = await db.ref('/publicProducts/' + (productId || 'f')).once('value')
        let productObject = _productObject.val()

        console.log('productObject', productObject)

        let newLink = {
            productId: productId,
            description: productObject.description,
            productImage: productObject.productImageUrl,
            title: productObject.heading,
            productType: productObject.productType,
            price: productObject.price,
            freeProduct: productObject.freeProduct,
            appointmentLengths: productObject.appointmentLengths,
            sizes: productObject.sizes,
            public: productObject.public || false,
            type: 'buy',
            position: _position
        }
        
        await db.ref('/stores/' + (uid || 'f') + '/items').push(newLink)
        // let access_token = _access_token.val()
        // let res = await googleSheetsService.getMySheets(access_token)
        // console.log('addLinkToStore response:', res)
        return resolve({status: 200, message: 'success'})
    })
})
exports.addNewLink = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()


        // 
        let linkText = data.linkText
        let linkUrl = data.linkUrl
        let linkImage = data.linkImage

        let _storeLinks = await db.ref('/stores/' + (uid || 'f') + '/links').once('value')
        let storeLinks = _storeLinks.val()
 
        let newLink = {
            type: 'url',
            heading: linkText,
            url: linkUrl,
            image: linkImage
        }

        storeLinks.push(newLink)
        
        await db.ref('/stores/' + (uid || 'f') + '/links').set(storeLinks)
        return resolve({status: 200, message: 'success'})
    })
})
exports.saveLink = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        console.log('data', data)
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        // 
        let linkText = data.link.linkText
        let linkUrl = data.link.linkUrl
        let linkImage = data.link.linkImage
        //
        let linkIndex = data.linkIndex
        let sanitizedLinkIndex = (linkIndex || linkIndex === 0) ? linkIndex : 'f'

        let savedLinkData = {
            heading: linkText,
            url: linkUrl,
            image: linkImage
        }

        await db.ref('/stores/' + (uid || 'f') + '/links/' + sanitizedLinkIndex).update(savedLinkData)
        return resolve({status: 200, message: 'success'})
    })
})
exports.saveTitle = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        console.log('data', data)
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        let titleId = data.titleKey
        let titleText = data.title.titleText

        if (!titleId) {
            return resolve({status: 200, message: 'Cannot find item to update'})
        }

        await db.ref('/stores/' + (uid || 'f') + '/items/' + (titleId || 'f')).update({text: titleText})
        return resolve({status: 200, message: 'success'})
    })
})
exports.deleteLink = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        console.log('data', data)
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        //
        let linkIndex = data.linkIndex
        let sanitizedLinkIndex = (linkIndex || linkIndex === 0) ? linkIndex : 'f'


        let _storeLinks = await db.ref('/stores/' + (uid || 'f') + '/links').once('value')
        let storeLinks = _storeLinks.val()
        storeLinks.splice(sanitizedLinkIndex, 1)

        await db.ref('/stores/' + (uid || 'f') + '/links').set(storeLinks)
        return resolve({status: 200, message: 'success'})
    })
})
exports.joinMailingList = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        console.log('joinMailingList data:', data)
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let dataEmail = data.email
        let ownerId = data.ownerId
        let newEmailObject = {
            joined: now,
            email: dataEmail,
            uid: uid || '-'
        }
        await db.ref('/mailingLists/' + (ownerId || 'f')).push(newEmailObject)
        return resolve({status: 200, message: 'success'})
    })
})
exports.sendMessge = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        console.log('sendMessge data:', data)
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let dataEmail = data.email
        let dataMessage = data.message
        let ownerId = data.ownerId
        let newMessageObject = {
            sent: now,
            email: dataEmail,
            message: dataMessage || '-',
            uid: uid || '-'
        }
        await db.ref('/contactFormMessages/' + (ownerId || 'f')).push(newMessageObject)
        return resolve({status: 200, message: 'success'})
    })
})
exports.setBackgroundFade = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        let backgroundImageFade = data.backgroundImageFade 

        await db.ref('/stores/' + (uid || 'f') + '/backgroundImageFade').set(backgroundImageFade)

        return resolve({status: 200, message: 'success'})
    })
})
exports.setBackgroundImageBlur = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        let backgroundImageBlur = data.backgroundImageBlur

        console.log('blur', backgroundImageBlur)

        await db.ref('/stores/' + (uid || 'f') + '/backgroundImageBlur').set(backgroundImageBlur)

        return resolve({status: 200, message: 'success'})
    })
})
exports.setMyStoreTheme = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        let selectedTheme = data.selectedTheme 

        await db.ref('/stores/' + (uid || 'f') + '/selectedTheme').set(selectedTheme)

        return resolve({status: 200, message: 'success'})
    })
})
exports.moveUpItem = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let productId = data.productId

        let _currentItem = await db.ref('/stores/' + (uid || 'f') + '/items/' + (productId || 'f')).once('value')
        let currentItem = _currentItem.val()
        let currentPosition = currentItem.position
        let positionAbove = currentPosition - 1

        let _previousItem = await db.ref('/stores/' + (uid || 'f') + '/items').orderByChild('position').equalTo(positionAbove).once('value')
        let previousItem = _previousItem.val()
        let previousItemKey = Object.keys(previousItem)[0]

        await db.ref('/stores/' + (uid || 'f') + '/items/' + (productId || 'f') + '/position').set(positionAbove)
        await db.ref('/stores/' + (uid || 'f') + '/items/' + (previousItemKey || 'f') + '/position').set(currentPosition)

        return resolve({status: 200, message: 'success'})
    })
})
exports.moveItemFromXtoY = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let productId = data.productId

        // console.log('data', data)
        let x = data.x
        let y = data.y

        let _currentItems = await db.ref('/stores/' + (uid || 'f') + '/items').once('value')
        let currentItems = _currentItems.val()

        let finalItems = {}

        // x == y
            // do nothing

        // x < y
            // 0 to x - 1 => stay same
            // x becomes y
            // x + 1 to y => down 1
            // y and up => stay same
        if (x < y) {
            for (let _i in currentItems) {
                let item = currentItems[_i]
                let i = item.position

                if (i < x) {
                    // 
                } else if (i === x) {
                    item.position = y
                } else if ((i > x) && (i <= y)) {
                    item.position = item.position - 1
                } else if (i > y) {
                    //
                }
                finalItems[_i] = item
            }
        }

        // x > y
            // 0 to y - 1 => stay same
            // y to x - 1 => up 1
            // x becomes y
            // x and up => stays same
        if (x > y) {
            for (let _i in currentItems) {
                let item = currentItems[_i]
                let i = item.position

                if (i < (y - 1)) {
                    // 
                } else if ((i >= y) && (i < x)) {
                    item.position = item.position + 1
                }  else if (i === x) {
                    item.position = y
                } else if (i > x) {
                    //
                }
                finalItems[_i] = item
            }
        }

        await db.ref('/stores/' + (uid || 'f') + '/items').update(finalItems)

        return resolve({status: 200, message: 'success'})
    })
})
exports.moveLinkFromXtoY = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let productId = data.productId

        // console.log('data', data)
        let x = data.x
        let y = data.y

        let _currentItems = await db.ref('/stores/' + (uid || 'f') + '/links').once('value')
        let currentItems = _currentItems.val()

        let array_move = (arr, old_index, new_index) => {
            if (new_index >= arr.length) {
                var k = new_index - arr.length + 1;
                while (k--) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr; // for testing
        };

        let newLinksArray = array_move(currentItems, x, y)

        console.log('newLinksArray', newLinksArray)

        await db.ref('/stores/' + (uid || 'f') + '/links').update(newLinksArray)

        return resolve({status: 200, message: 'success'})
    })
})
exports.moveDownItem = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let productId = data.productId

        let _currentItem = await db.ref('/stores/' + (uid || 'f') + '/items/' + (productId || 'f')).once('value')
        let currentItem = _currentItem.val()
        let currentPosition = currentItem.position
        let positionBelow = currentPosition + 1

        let _nextItem = await db.ref('/stores/' + (uid || 'f') + '/items').orderByChild('position').equalTo(positionBelow).once('value')
        let nextItem = _nextItem.val()
        let nextItemKey = Object.keys(nextItem)[0]

        await db.ref('/stores/' + (uid || 'f') + '/items/' + (productId || 'f') + '/position').set(positionBelow)
        await db.ref('/stores/' + (uid || 'f') + '/items/' + (nextItemKey || 'f') + '/position').set(currentPosition)

        return resolve({status: 200, message: 'success'})
    })
})
exports.addZone = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        let newZone = {
            countries: [],
            weightsLb: [
                [0, 0.01, 0],
                [0.02, 2, 4.95],
                [2.01, 4, 14.95],
                [4.01, 10, 29.95],
                [10.01, 99999, 150]
            ]
        }

        let _zones = await db.ref('/shippingZones/' + (uid || 'f')).once('value')
        let zones = _zones.val() || {}

        let numberOfZonesNow = Object.keys(zones).length
        let nextZoneNumber = numberOfZonesNow + 1

        await db.ref('/shippingZones/' + (uid || 'f') + '/zone' +nextZoneNumber).set(newZone)

        return resolve({status: 200, message: 'success'})
    })
})
exports.removeZone = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let z = data.z

        console.log('removeZone', z)

        let _zones = await db.ref('/shippingZones/' + (uid || 'f')).once('value')
        let zones = _zones.val() || {}

        let items = zones || {}

        let array = []
        let index = 0
        for (let i in items) {
            if (i !== z) {
                array.push({...items[i], key: i, position: index})
                index += 1
            }
        }
        array = array.sort((a, b) => a.position - b.position)

        let positionCounter = 0

        for (let i in array) {
            let currentPosition = array[i].position
            if (currentPosition !== positionCounter) {
                array[i].position = array[i].position - 1
            }
            positionCounter++
        }

        let newItems = {}       
        for (let i in array) {
            let newName = array[i].key.slice(0, -1) + (array[i].position + 1)
            newItems[newName] = array[i]
        }

        console.log('newZones', newItems)

        await db.ref('/shippingZones/' + (uid || 'f')).set(newItems)

        return resolve({status: 200, message: 'success'})
    })
})
exports.addCountryToZone = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let zone = data.zone
        let countryCode = data.countryCode

        console.log('addCountryToZone', zone, countryCode)

        let countriesRef = '/shippingZones/' + (uid || 'f') +
                            '/' + (zone || 'f') + '/countries'

        let _countries = await db.ref(countriesRef).once('value')
        let countries = _countries.val() || {}

        countries.push(countryCode)

        await db.ref(countriesRef).set(countries)

        return resolve({status: 200, message: 'success'})
    })
})
exports.removeCountryFromZone = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let zone = data.zone
        let countryCode = data.countryCode

        console.log('removeCountryFromZone', zone, countryCode)

        let countriesRef = '/shippingZones/' + (uid || 'f') +
                            '/' + (zone || 'f') + '/countries'

        let _countries = await db.ref(countriesRef).once('value')
        let countries = _countries.val() || {}

        var index = countries.indexOf(countryCode);
        if (index !== -1) {
          countries.splice(index, 1);
        }

        console.log('countries', countries)

        await db.ref(countriesRef).set(countries)

        return resolve({status: 200, message: 'success'})
    })
})
exports.removePriceRow = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let zone = data.zone
        let row = data.row

        let pricingRef = '/shippingZones/' + (uid || 'f') +
                            '/' + (zone || 'f') + '/weightsLb'

        let _pricing = await db.ref(pricingRef).once('value')
        let pricing = _pricing.val() || []

        pricing.splice(row, 1)
        if (row === 0) {
            //
        } else if (row === (pricing.length - 1)) {
            //
        } else {
            pricing[row - 1][1] = pricing[row][0] - 0.01 
        }

        await db.ref(pricingRef).set(pricing)

        return resolve({status: 200, message: 'success'})
    })
})
exports.setRowPrice = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let zone = data.zone
        let row = data.row
        let amount = data.amount

        let pricingRef = '/shippingZones/' + (uid || 'f') +
                            '/' + (zone || 'f') + '/weightsLb/'

        let _pricing = await db.ref(pricingRef).once('value')
        let pricing = _pricing.val() || []

        if (pricing[row - 1]) {
            pricing[row - 1][1] = amount - 0.01
        }
        pricing[row][0] = amount

        // let highestWeight = pricing[pricing.length - 1][1]
        // let highestPrice = pricing[pricing.length - 1][2]
        // let moreWeight = highestWeight + 1
        // let morePrice = highestPrice + 10

        // pricing.push([highestWeight + 0.01, moreWeight, morePrice])

        await db.ref(pricingRef).set(pricing)

        return resolve({status: 200, message: 'success'})
    })
})
exports.addPriceRow = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let zone = data.zone

        let pricingRef = '/shippingZones/' + (uid || 'f') +
                            '/' + (zone || 'f') + '/weightsLb'

        let _pricing = await db.ref(pricingRef).once('value')
        let pricing = _pricing.val() || []

        let highestWeight = pricing[pricing.length - 1][1]
        let highestPrice = pricing[pricing.length - 1][2]
        let moreWeight = highestWeight + 1
        let morePrice = highestPrice + 10

        pricing.push([highestWeight + 0.01, moreWeight, morePrice])

        await db.ref(pricingRef).set(pricing)

        return resolve({status: 200, message: 'success'})
    })
})
exports.removeItemFromStore = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let productId = data.productId

        await db.ref('/stores/' + (uid || 'f') + '/items/' + (productId || 'f')).set(null)

        let _store = await db.ref('/stores/' + (uid || 'f')).once('value')
        let store = _store.val()
        let items = store.items || {}

        let array = []
        for (let i in items) {
          array.push({...items[i], key: i})
        }
        array = array.sort((a, b) => a.position - b.position)

        let positionCounter = 0

        for (let i in array) {
            let currentPosition = array[i].position
            if (currentPosition !== positionCounter) {
                array[i].position = array[i].position - 1
            }
            positionCounter++
        }

        let newItems = {}       
        for (let i in array) {
            newItems[[array[i].key]] = array[i]
        }

        await db.ref('/stores/' + (uid || 'f') + '/items/').set(newItems)

        return resolve({status: 200, message: 'success'})
    })
})
exports.archiveItemInStore = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let productId = data.productId
        let archive = data.archive

        await db.ref('/stores/' + (uid || 'f') + '/items/' + (productId || 'f') + '/archive').set(archive || false)

        return resolve({status: 200, message: 'success'})
    })
})
exports.addLinkToStore = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()
        let _url = data.url
        let _title = data.title
        let _image = data.image
        let _position = data.position

        let newLink = {
            url: _url,
            title: _title,
            image: _image,
            type: 'link',
            position: _position
            // image: `https://www.blog.com/images/image.jpg`
        }
        
        await db.ref('/stores/' + (uid || 'f') + '/items').push(newLink)
        // let access_token = _access_token.val()
        // let res = await googleSheetsService.getMySheets(access_token)
        // console.log('addLinkToStore response:', res)
        return resolve({status: 200, message: 'success'})
    })
})
exports.addRowToGoogleSheet = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        let _access_token = await db.ref('/googleSheetsConnected/' + (uid || 'f')).once('value')
        let access_token = _access_token.val()
        let _selected_google_sheet = await db.ref('/selectedGoogleSheets/' + (uid || 'f')).once('value')
        let selected_google_sheet = _selected_google_sheet.val()
        let spreadsheetId = (selected_google_sheet || {}).sheetId
        let data = HEFTWERK_SHEET_JSON()
        let res = await googleSheetsService.writeLastRowToSpreadsheet(access_token, spreadsheetId, data)
        console.log('selectSheet response:', res)
        return resolve({status: 200, message: 'success', sheets: res})
    })
})
exports.setGoogleSheetId = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        console.log('setGoogleSheetId', data)
        db.ref('/selectedGoogleSheets/' + (uid || 'f')).set(data)
        return resolve({status: 200, message: 'success'})
    })
})
exports.sendGoogleSheetsCode = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        // console.log('data', data)

        let code = data.code
        let scope = data.scope
        let state = data.state

        // verify state

        console.log('startConnectingGoogleSheet')
        // get token
        let res = await googleSheetsService.getTokenFromCode(code)
        console.log('aceess token:', res)
        await db.ref('/googleSheetsConnected/' + (uid || 'f')).set({...res, connected: true})
        await db.ref('/shippingProvidersByUser/' + (uid || 'f')).push({type: 2, id: '...', provider: 'Auto-Export to Google Sheets'})

        return resolve({status: 200, message: 'success'})
    })
})
exports.getShippingForProduct = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        let countryCode = data.countryCode
        let weight = data.weight
        let productId = data.productId
        let quantity = data.quantity

        console.log('countryCode, weight, quantity', countryCode, weight, quantity)

        let price = await shippingZones.getShippingRate(productId, countryCode, weight * quantity)

        console.log('price', price)

        // console.log('setGoogleSheetId', data)
        // db.ref('/selectedGoogleSheets/' + (uid || 'f')).set(data)
        return resolve({status: 200, price, message: 'success'})
    })
})
exports.getShippingForOrder = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        let order = data.order
        let address = data.address

        let itemsByOwner = {}
        let totalWeightByOwner = {}
        let shippingByOwner = {}

        for (let i in order.items) {
            let item = order.items[i]
            let ownerId = item.ownerId
            if (!itemsByOwner[ownerId]) {
                itemsByOwner[ownerId] = []
            }
            if (!totalWeightByOwner[ownerId]) {
                totalWeightByOwner[ownerId] = 0
            }
            itemsByOwner[ownerId].push(item)
            totalWeightByOwner[ownerId] = totalWeightByOwner[ownerId] + ((item.weight || 0) * (item.quantity || 1))
        }

        console.log('order', order)
        console.log('address', address)
        console.log('itemsByOwner', itemsByOwner)
        console.log('totalWeightByOwner', totalWeightByOwner)

        let totalShipping = 0

        for (let o in totalWeightByOwner) {
            let weight = totalWeightByOwner[o]
            let _ownerId = o
            let shippingForOwner = await shippingZones.getShippingRateForOrder(_ownerId, address.countryCode, weight)
            
            if (!shippingByOwner[_ownerId]) {
                shippingByOwner[_ownerId] = 0
            }
            shippingByOwner[_ownerId] = shippingForOwner
            totalShipping = totalShipping + (shippingForOwner == 'NA' ? 0 : shippingForOwner)
        }

        return resolve({status: 200, shippingByOwner, price: totalShipping, message: 'success'})

    })
})
exports.getShippingForCartOrder = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context.auth && context.auth.uid
        let email = context.auth && context.auth.token.email
        let now = (new Date()).getTime()

        let order = data.order
        let cart = order.cart
        let address = data.address

        let itemsByOwner = {}
        let totalWeightByOwner = {}
        let shippingByOwner = {}

        for (let i in cart.items) {
            let item = cart.items[i]
            let ownerId = item.ownerId
            if (!itemsByOwner[ownerId]) {
                itemsByOwner[ownerId] = []
            }
            if (!totalWeightByOwner[ownerId]) {
                totalWeightByOwner[ownerId] = 0
            }
            itemsByOwner[ownerId].push(item)
            totalWeightByOwner[ownerId] = totalWeightByOwner[ownerId] + ((item.weight || 0) * (item.quantity || 1))
        }

        // console.log('order', order)
        // console.log('cart', cart)
        // console.log('address', address)
        // console.log('itemsByOwner', itemsByOwner)
        console.log('shippingByOwner', shippingByOwner)

        let totalShipping = 0

        for (let o in totalWeightByOwner) {
            let weight = totalWeightByOwner[o]
            let _ownerId = o
            let shippingForOwner = await shippingZones.getShippingRateForOrder(_ownerId, address.countryCode, weight)
            
            if (!shippingByOwner[_ownerId]) {
                shippingByOwner[_ownerId] = 0
            }
            shippingByOwner[_ownerId] = shippingForOwner
            totalShipping = totalShipping + (shippingForOwner == 'NA' ? 0 : shippingForOwner)
        }

        let responseObject = {
            status: 200,
            shippingByOwner,
            price: totalShipping,
            message: 'success'
        }

        console.log('responseObject')
        console.log(responseObject)

        return resolve(responseObject)

    })
})

/* SUBSCRIPTIONS */

// payments

let setUserPlan = async (uid, plan) => {
    return new Promise(async (resolve, reject) => {
        let now = (new Date()).getTime()
        // let trialEnd = now + 7 * 24 * 60 * 60 * 1000
        console.log('setCompanyPlan', uid, plan)
        admin.database().ref('/customer_info/private/' + (uid || 'f')).update({
            // trialEnd,
            type: plan,
            loaded: true,
            name: ''
        }, ()=>{
            resolve('ok1')
            console.log("Company Plan Set")
        })
    })
}
let addCreditCardToCustomer = async (data) => {
    // console.log('stripe.addCreditCardToCustomer', data)
    let stripeId = data.stripeId

    console.log('CARD DATA', data)

    return new Promise((resolve, reject) => {

        var add_card_to_user = async () => {
            // var _source_id = async () => {
            //     return new Promise((resolve, reject) => {
            //         return stripe.sources.create({
            //           type: 'card',
            //           card: data.card,
            //           currency: 'usd',
            //           // owner: data.ccOwner || {}
            //         }, (err3, source) => {
            //             if (err3) {
            //                 console.log('err3', err3)
            //                 return resolve({status: 500, 'error': err3})
            //             } else {
            //                 console.log('source', source.id)
            //                 return resolve(source.id) 
            //             }
            //         });
            //     })   
            // }
            var addSourceToCustomer = async (card, stripeid) => {
                return new Promise((resolve, reject) => {
                    
                    console.log('here', card.id, stripeid)
                    // create source from credit card
                    // return source_id
                    stripe.customers.createSource(
                        stripeid,
                        {
                            source: card.id
                        },
                      (err, card) => {
                        if (err) {
                            console.log('Error', err)
                            reject(err)
                        } else {
                            // console.log('card added', card)
                            resolve(card)
                        }
                        // asynchronously called
                      }
                    );
                })   
            }
            try {
                // var customer_source_id = await _source_id()
                // var customer_source_id = data.sourceId
                // if (customer_source_id.status == 500) {
                //     return resolve({status: 500, message: customer_source_id.error.raw.message})
                // }
                var add_source = await addSourceToCustomer(data.card, stripeId)
                return resolve(add_source)
            } catch(error) {
                console.log("RETURNING...", error)
                return resolve({
                    status: 500,
                    message: 'Failed to add credit card',
                    code: error.raw
                })
            }
        }

        try {
            add_card_to_user()
        } catch(error) {
            reject(error)
        }
    })
}
let createNewStripeCustomer = async (uid) => {
    return new Promise((resolve, reject) => {
        stripe.customers.create({
            description: uid || 'Unknown'
        }, function (err, customer) {
            if (err) {
                console.log('MADE CUSTOMER ERROR', err)
                reject(err)
            } else {
                console.log('MADE CUSTOMER', customer)
                resolve(customer.id)
            }
        }) 
    })
}
let attachCustomerToPlan = async (uid, customer, plan, couponId) => {
    console.log('attachCustomerToPlan', uid, customer, plan, couponId)
    return new Promise(async (resolve, reject) => {
    // 
        let sevenDayTrial = true
        // let now = (new Date()).getTime()
        // let trialEnd = now + 7 * 24 * 60 * 60 // 7 days

        let subscriptionObject = {
            customer: customer,
            items: [{plan: plan}]
            // trial_period_days: 7
            // items: [{plan: process.env.PRODUCT_PLAN_UNLIMITED}],
        }

        if (couponId) {
            subscriptionObject.coupon = couponId
        }

        stripe.subscriptions.create(subscriptionObject, async (err, subscription) => {
        if (err) {
            console.log('error attaching to plan')
            console.log('error4', err)
        } else {
            console.log('subscription', subscription)
            await setUserPlan(uid, 'pro')
            resolve('ok')
        }
      });
    })
}
let changePlanToFree = async (billingID) => {
    console.log('retrieve', billingID)
    return new Promise(async (resolve, reject) => {
        stripe.subscriptions.list(
          {customer: billingID},
          function(err, customer) {
            // asynchronously called
            console.log('customer-1', customer)
            console.log('customer-error', err)
            console.log('customer-', customer.data[0].id)

                stripe.subscriptions.del(
                  customer.data[0].id,
                  function(err2, confirmation) {
                    // asynchronously called
                    console.log('err2', err2)
                    console.log('confirmation', confirmation)

                    if (err) {
                        resolve({status: 500, error: err})
                    } else {
                        resolve({status: 200, message: confirmation})
                    }
                  }
                );
            
          }
        );
    })
}
exports.checkout = functions.https.onCall((data, context) => {
    console.log('checkout')
    let uid = context.auth && context.auth.uid
    let email = context.auth && context.auth.token && context.auth.token.email
    var db = admin.database();
    let createAccount = true
    let ccData = data.ccData
    let sourceId = data.sourceId
    let card = data.card
    let ccOwner = data.ccOwner
    let sourceid = data.sourceid
    let otherEmail = data.otherEmail
    let cart = data.cart
    let password = data.password

    // console.log('card', card)
    // return false
    // console.log('data', data)
    // console.log('email11', context.auth.token.email)

    return new Promise(async (resolve, reject) => {

        let runCheckout = async () => {

            let _stripeId = await db.ref('/stripeIds/' + uid).once('value')
            let stripeId = _stripeId.val()
            if (stripeId) {
                console.log('stripeId 1', stripeId)
            } else {
                stripeId = await createNewStripeCustomer(uid)
                await db.ref('/stripeIds/' + (uid || 'fail')).set(stripeId)
            }
            //
            console.log('stripeId 2', stripeId)
            let sourceid = await addCreditCardToCustomer({card, stripeId}) // ?
            if (sourceid.status == 500) {
                return resolve(sourceid)
            }
            console.log('uid, stripeId', uid, stripeId)
            // let proPlanId = 'price_1Nn31MI0NXyTXqSuiTEnqFWh' // 29.99
            let proPlanId = 'price_1NzNJSI0NXyTXqSuQ4isPpw1' // $49/month
            let couponId = 'LXUWutLX' // -$48/month for 3 months
            let orderId = await attachCustomerToPlan(uid, stripeId, proPlanId, couponId)

            console.log('ORDER SUCCESSFUL', orderId)
            // Push to Shipstation
            return resolve({status: 200, message: 'ok'})
        }


        try {
            runCheckout()
        } catch(error) {
            return reject(error)
        }
    })
})
exports.cancelSubscription = functions.https.onCall(async (data, context) => {
    let uid = context.auth.uid
    let db = admin.database()
    return new Promise(async (resolve, reject) => {
        let _stripeId = await db.ref('/stripeIds/' + uid).once('value')
        stripeId = _stripeId.val()

        if (stripeId) {
            let plan = await changePlanToFree(stripeId)
            // console.log('Plan**', plan)
            if (plan.status == 200) {
                await setUserPlan(uid, 'cancelled')
                resolve({status: 200, message: 'Plan canceled!'})
            } else {
                resolve({status: 500, error: plan.error || 'Unknown error canceling plan'})
            }
        } else {
            resolve({status: 500, message: 'User does not have billing it.'})
        }
    })

    // console.log('context', context)
    // let uid = context.auth.uid
    // let email = context.auth.email
    // console.log('uid, email', data, uid, email)

    // create customer
    // stripe.customers.create({
    //     description: 'User'
    // }, function(err, customer) {
    //     if (err) {
    //         console.log('new customer error', err)
    //     } else {
    //         return customer.id
    //     }
    // })

    // const customer = await stripe.customers.create({
    //     email: req.body.email,
    //     description: uid
    // });

    // Save the customer.id in your database alongside your user.
    // We're simulating authentication with a cookie.
    // res.cookie('customer', customer.id, { maxAge: 900000, httpOnly: true });

    // res.send({ customer: customer });
    // create subscription
    // set plan, other internal details
})

/* STATS */
exports.getAllUsers = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let run = async () => {
            let uid = context.auth.uid

            if (!uid) return resolve('no uid')

            let users = []
            let printed = false
            const listAllUsers = (nextPageToken) => {
              admin.auth().listUsers(1000, '12345')
                .then((listUsersResult) => {
                    listUsersResult.users.forEach((userRecord) => {
                        let user = userRecord.toJSON()
                        if (!printed) {
                            printed = true
                            console.log('user record', user)
                        }
                        if (user.email) {
                            users.push({
                                created: user.metadata.creationTime,
                                email: user.email,
                                uid: user.uid,
                                phoneNumber: user.phoneNumber,
                                disabled: user.disabled,
                                displayName: user.displayName
                            } )
                        }
                    })
                    resolve(users)
                })
                .catch((error) => {
                  console.log('Error listing users:', error);
                  reject('nope')
                });
            };

            listAllUsers();
        }
        try {
            run()
        } catch (e) {
            return resolve('failed to save profile')
        }
    })
})

exports.userAction = functions.https.onCall(async (data, context) => {
    return new Promise(async (resolve, reject) => {
        let db = admin.database()
        let uid = context && context.auth && context.auth.uid
        let action = data.action || 'any'
        let now = new Date()
        let today = now.toISOString().split('T')[0]

        let dataRef = '/userActions/' + (uid || 'anon') + '/' + (today || 'fd')
        await db
        .ref(dataRef)
        .set(firebase.database.ServerValue.increment(1))

        return resolve({
            status: 200,
            message: 'Ok'
        })
    })
})



// deployed // firebase deploy --only functions:generateCustomerLists,functions:getPhotosBy,functions:getRandomPhotos,functions:checkIfUsernameExists,functions:testEmail,functions:addToMyCart,functions:getMyCart,functions:handlePayoutResult
// deployed // firebase deploy --only functions:freeCheckout,functions:handleTransactionResult,functions:updateInventoryCount,functions:setScheduleData,functions:getPaymentIntentForOrder,functions:getPaymentIntent,functions:setPreOrderDetails,functions:registerPayBoxView,functions:getMyBalance
// deployed // firebase deploy --only functions:addASchedule,functions:saveSchedules,functions:submitEmail,functions:startConfigureZones,functions:finishFulfillment,functions:saveFulfillmentData,functions:unfulfill,functions:deleteFulfilledProduct,functions:deleteProduct,functions:saveProduct,functions:deactivateProduct,functions:saveProfile
// deployed // firebase deploy --only functions:checkConnectOnboarding,functions:finishOnboarding,functions:checkIfUserExists,functions:startOnboarding,functions:countLinkClick,functions:countStoreView,functions:activateMyStore,functions:setDefaultViewForMyStore,functions:skipIntro,functions:addANewShipper,functions:smoOrderStatus,functions:startConnectingGoogleSheet,functions:selectSheet,functions:addTextToStore,functions:addProductToStore,functions:addNewLink
// deployed // firebase deploy --only functions:saveLink,functions:saveTitle,functions:deleteLink,functions:joinMailingList,functions:sendMessge,functions:setBackgroundFade,functions:setBackgroundImageBlur,functions:setMyStoreTheme,functions:moveUpItem,functions:moveItemFromXtoY,functions:moveLinkFromXtoY,functions:moveDownItem,functions:addZone,functions:removeZone
// deployed // firebase deploy --only functions:addCountryToZone,functions:removeCountryFromZone,functions:removePriceRow,functions:setRowPrice,functions:addPriceRow,functions:removeItemFromStore,functions:archiveItemInStore,functions:addLinkToStore,functions:addRowToGoogleSheet,functions:setGoogleSheetId,functions:sendGoogleSheetsCode,functions:getShippingForProduct,functions:getShippingForOrder,functions:getShippingForCartOrder
// deploying// firebase deploy --only functions:checkout,functions:cancelSubscription,functions:getAllUsers,functions:userAction

// npm run build && firebase hosting:channel:deploy staging-2024
// firebase deploy --only functions:deleteFulfilledProduct,functions:unfulfill,functions:saveFulfillmentData,functions:handleTransactionResult,functions:freeCheckout,functions:setPreOrderDetails,functions:getPaymentIntentForOrder

// ** NEW
// freeCheckout

// ** 1
// generateCustomerLists
// getPhotosBy
// getRandomPhotos
// checkIfUsernameExists
// testEmail
// addToMyCart
// getMyCart
// handlePayoutResult

// ** 2
// freeCheckout
// handleTransactionResult
// updateInventoryCount
// setScheduleData
// getPaymentIntentForOrder
// getPaymentIntent
// setPreOrderDetails
// registerPayBoxView
// getMyBalance

// ** 3
// addASchedule
// saveSchedules
// submitEmail
// startConfigureZones
// finishFulfillment
// saveFulfillmentData
// unfulfill
// deleteFulfilledProduct
// deleteProduct
// saveProduct
// deactivateProduct
// saveProfile

// ** 4
// checkConnectOnboarding
// finishOnboarding
// checkIfUserExists
// startOnboarding
// countLinkClick
// countStoreView
// activateMyStore
// setDefaultViewForMyStore
// skipIntro
// addANewShipper
// smoOrderStatus
// startConnectingGoogleSheet
// selectSheet
// addTextToStore
// addProductToStore
// addNewLink

// ** 5
// saveLink
// saveTitle
// deleteLink
// joinMailingList
// sendMessge
// setBackgroundFade
// setBackgroundImageBlur
// setMyStoreTheme
// moveUpItem
// moveItemFromXtoY
// moveLinkFromXtoY
// moveDownItem
// addZone
// removeZone

// ** 6
// addCountryToZone
// removeCountryFromZone
// removePriceRow
// setRowPrice
// addPriceRow
// removeItemFromStore
// archiveItemInStore
// addLinkToStore
// addRowToGoogleSheet
// setGoogleSheetId
// sendGoogleSheetsCode
// getShippingForProduct
// getShippingForOrder
// getShippingForCartOrder

// ** 7
// checkout
// cancelSubscription
// getAllUsers
// userAction





let getShippingRate = async () => {

    let data = {
        shippingFirstName: 'Vladimir',
        shippingLastName: 'Baranov',
        shippingCompany: 'Tipasoft Inc.',
        shippingAddress: '215 Strathearn Av',
        shippingCity: 'Richmond Hill',
        shippingCountry: 'CA',
        shippingRegion: 'ON',
        shippingPostalCode: 'L4B 3C3',
        shippingPhone: '+14163197193',
        totalQuantity: 3
    }


    let email = data.email
    let shippingFirstName = data.shippingFirstName
    let shippingLastName = data.shippingLastName
    let shippingCompany = data.shippingCompany
    let shippingAddress = data.shippingAddress
    let shippingCity = data.shippingCity
    let shippingCountry = data.shippingCountry
    let shippingRegion = data.shippingRegion
    let shippingPostalCode = data.shippingPostalCode
    let shippingPhone = data.shippingPhone
    let numberOfBags = data.totalQuantity

    return new Promise(async (resolve, reject) => {

        let _key = '96c60fa887534a798efb85c058cd71a1'
        let _secret = '3d62693f3b054585bfb1fd25e74803be'

        try {
            console.log('START')
            let decoded = _key + ':' + _secret
            let encoded = Buffer.from(decoded).toString('base64')
            let authorization = 'Basic ' + encoded
            console.log('authorization', authorization)
            var myHeaders = new fetch.Headers();
            myHeaders.append("Host", "ssapi.shipstation.com");
            myHeaders.append("Authorization", authorization);
            myHeaders.append("Content-Type", "application/json");

            let dataObject = (carrierCode) => {
                return {
                    "carrierCode": carrierCode,
                    "serviceCode": null,
                    "packageCode": null,
                    "fromPostalCode": "80301",
                    "toState": shippingRegion,
                    "toCountry": shippingCountry,
                    "toPostalCode": shippingPostalCode,
                    "toCity": shippingCity,
                    "weight":{
                        "value": 12,
                        "units":"Ounces"
                    },
                    // "dimensions":{
                    //     "units":"Inches",
                    //     "length":1.5 * numberOfBags,
                    //     "width":4,
                    //     "height":2.5
                    // },
                    "confirmation": "none",
                    "residential":true
                }
            }

            var rawFedex = JSON.stringify(dataObject('fedex'))
            var rawUsps = JSON.stringify(dataObject('stamps_com'))

            // console.log('raw =>', raw)

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              // body: raw,
              redirect: 'follow'
            };

            let _fedex = await fetch(SHIPSTATION_SHIPPING_RATE_URL, {...requestOptions, body: rawFedex})
            let _usps = await fetch(SHIPSTATION_SHIPPING_RATE_URL, {...requestOptions, body: rawUsps})
            let resFedex = await _fedex.text()
            let resUsps = await _usps.text()
            resFedex = JSON.parse(resFedex)
            resFedex = resFedex.map(v => {
                return {...v, carrierCode: 'fedex'}
            })
            resUsps = JSON.parse(resUsps)
            resUsps = resUsps.map(v => {
                return {...v, carrierCode: 'stamps_com'}
            })
            resUsps = resUsps.filter((v) => {
                return v.serviceCode !== 'usps_media_mail'
            })
            console.log('resUsps', resUsps)
            const res = resFedex.concat(resUsps);
            // res = pickTopNfromAbyPrice(res, 3)
            res.sort((x, y) => {
                // console.log('aa', x, y)
                return (x.shipmentCost + x.otherCost) - (y.shipmentCost + y.otherCost)
            })
            console.log('res', res)
            // res = res.slice(0, 3)
            // console.log('RESPONSE =>', JSON.parse(res))
            // resolve({data: JSON.parse(res)})
            resolve({data: res})
        } catch (e) {
            console.log('ERROR', e)
            resolve({status: 500, message: e})
        }

        //   .then(async (response) => {
        //     let res = await response.text()
        //     console.log('RESPONSE =>', JSON.parse(res))
        //     resolve({data: JSON.parse(res)})
        //   })
        //   .then((result) => {
        //     console.log('RESULT =>')
        //     console.log(result)
        //     resolve({data: 'def'})
        //   })
        //   .catch((error) => {
        //     console.log('ERROR =>')
        //     console.log(error)
        //     reject({data: 'ghi'})
        // })
    })
}

// getShippingRate()


// sendOrderToSMO()


// testStatusWebhook()

// let orderStatus = async (order) => {
//     let db = admin.database()
//     return new Promise(async (resolve, reject) => {
//         // status:
//             // 1 - placed,
//             // 2 - received by shipper
//             // 3 - shipped
//             // 4 - delivered
//             // 11 - problem with order - see error
//         // error: false OR object:
//             // code,
//             // message
            
//         let reqBodyData = {
//             customerKey: 'abcd',
//             orderId: 'efgh',
//             status: 'Received',
//         }

//         // update order status

//         // send response:
//         return resolve({
//             status: 200, // or other
//             result: 'success', // or error
//             error: false // or {code: '', message: ''}
//         })
//     })
// }



// exports.addToMyCart = functions.https.onRequest((req, res) => { // ok
//     let db = admin.database()
//     console.log('getMyCart ==>')
//     cors(req, res, async () => {
//     console.log('getMyCart ==> 2')
//         let event = req.body;
//         console.log('event', event)

//         let _myCart = await db.ref('/carts/' + '123abc').once('value')
//         let myCart = _myCart.val()

//         res.status(200).send({ 
//             received: true,
//             data: 'Success!',
//             cart: myCart || []
//         })
//     })
// })