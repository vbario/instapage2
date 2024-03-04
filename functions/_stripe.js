

// // handling currency: stripe
// exports.addCreditCardToCustomer = functions.https.onCall((data, context) => {
//     console.log('stripe.addCreditCardToCustomer', data, context)
//     let uid = context.auth.uid
//     var db = admin.database();
//     // get stripe id

//     return new Promise((resolve, reject) => {

//         var add_card_to_user = async () => {

//             var _source_id = async () => {
//                 return new Promise((resolve, reject) => {
//                     _data = {
//                         number: data.number, // 4242424242424242
//                         exp_month: data.exp_month, // 12
//                         exp_year: data.exp_year, // 2020
//                         cvc: data.cvv // 123
//                       }
//                     data.owner = {
//                         address : {
//                             city: data.city,
//                             country: data.country,
//                             line1: data.address,
//                             line2: data.address2,
//                             postal_code: data.postalCode,
//                             state: data.province
//                         },
//                         name: data.name
//                     }

//                     return stripe.sources.create({
//                       type: 'card',
//                       card: _data,
//                       currency: 'cad',
//                       owner: data.owner
//                     }, function(err3, source) {
//                         if (err3) {
//                             console.log('err3')
//                             return reject({'code': err3.raw.code, 'param': err3.raw.param})
//                         } else {
//                             console.log('source', source.id)
//                             return resolve(source.id) 
//                         }
//                     });
//                 })   
//             }
//             var addSourceToCustomer = async (customer_source_id, stripeid) => {
//                 return new Promise((resolve, reject) => {
                    
//                     // create source from credit card
//                     // return source_id
//                     stripe.customers.createSource(
//                       stripeid,
//                       {source: customer_source_id},
//                       function(err, card) {
//                         if (err) {
//                             console.log('Error', err)
//                             reject(err)
//                         } else {
//                             console.log('card added', card)
//                             resolve(card)
//                         }
//                         // asynchronously called
//                       }
//                     );



//                 })   
//             }
//             try {
//                 var stripeIdQuery = db.ref('/app_private/user_stripe/' + uid + '/stripeid').once('value')
//                 let snap = await stripeIdQuery
//                 let stripeid = snap.val()

//                 var customer_source_id = await _source_id()
//                 var add_source = await addSourceToCustomer(customer_source_id, stripeid)
//                 return resolve(add_source)
//             } catch(error) {
//                 console.log("RETURNING...", error)
//                 return reject(error)
//             }
//         }

//         try {
//             add_card_to_user()
//         } catch(error) {
//             reject(error)
//         }
//     })
// })
// exports.addBankAccountToCustomer = functions.https.onCall((data, context) => {
//     console.log('stripe.addBankAccountToCustomer', data)
//     let uid = context.auth.uid
//     var db = admin.database();
//     // get stripe id

//     return new Promise((resolve, reject) => {

//         var add_card_to_user = async () => {

//             var _source_id = async () => {
//                 return new Promise((resolve, reject) => {

//                     return stripe.tokens.create(data, function(err3, source) {
//                         if (err3) {
//                             console.log('err3')
//                             return reject({'code': err3})
//                         } else {
//                             console.log('source', source.id)
//                             return resolve(source.id) 
//                         }
//                     });

//                 })   
//             }
//             var addSourceToCustomer = async (customer_source_id, stripeid) => {
//                 return new Promise((resolve, reject) => {
                    
//                     // create source from credit card
//                     // return source_id
//                     stripe.customers.createSource(
//                       stripeid,
//                       {source: customer_source_id},
//                       function(err, card) {
//                         if (err) {
//                             console.log('Error', err)
//                             reject(err)
//                         } else {
//                             console.log('bank account added', card)
//                             resolve('bank_account_added')
//                         }
//                         // asynchronously called
//                       }
//                     );



//                 })   
//             }
//             try {
//                 var stripeIdQuery = db.ref('/app_private/user_stripe/' + uid + '/stripeid').once('value')
//                 let snap = await stripeIdQuery
//                 let stripeid = snap.val()

//                 var customer_source_id = await _source_id()
//                 var add_source = await addSourceToCustomer(customer_source_id, stripeid)
//                 return resolve(add_source)
//             } catch(error) {
//                 console.log("RETURNING...", error)
//                 return reject(error)
//             }
//         }

//         try {
//             add_card_to_user()
//         } catch(error) {
//             reject(error)
//         }
//     })
// })
// exports.payoutToPaymentMethod = functions.https.onCall((data, context) => { // option to get default payment method
//         console.log('stripe.payoutToPaymentMethod', data)
//         let amount = 200
//         let sourceid = data.sourceid
//         let uid = context.auth.uid
//         var db = admin.database();
        
//         return new Promise((resolve, reject) => {

//             var order_paid = async () => {

//                 var createPayout = async (stripeid, customer_source_id) => {
//                     return new Promise((resolve, reject) => {
//                         resolve('ok')
//                         // stripe.charges.create(
//                         //   {
//                         //     amount: price,
//                         //     customer: stripeid,
//                         //     currency: 'cad',
//                         //     source: customer_source_id,
//                         //     description: '$10 Deposit',
//                         //   },
//                         //   function(err, charge) {
//                         //     if (err) {
//                         //         console.log('Error', err)
//                         //         // return resolve('charge_id_xx ' + price)
//                         //         reject(err)
//                         //     } else {
//                         //         console.log('charge created', charge)
//                         //         // return resolve('charge_id_xx ' + price)
//                         //         resolve(charge.id)
//                         //     }
//                         //   })
                        

//                     })   
//                 }

//                 try {
//                     var stripeIdQuery = db.ref('/app_private/user_stripe/' + uid + '/stripeid').once('value')
//                     let snap = await stripeIdQuery
//                     let stripeid = snap.val()

//                     var pay_amount = await createPayout(stripeid, sourceid)
//                     return resolve(pay_amount)
//                 } catch(error) {
//                     console.log("RETURNING...", error)
//                     return reject(error)
//                 }
//             }

            

//             try {
//                 order_paid()
//             } catch(error) {
//                 reject(error)
//             }
//         })
// })
// exports.depositFromPaymentMethod = functions.https.onCall((data, context) => { // option to get default payment method
//         console.log('stripe.depositFromPaymentMethod', data)
//         let price = 1000
//         let sourceid = data.sourceid
//         let uid = context.auth.uid
//         var db = admin.database();
        
//         return new Promise((resolve, reject) => {

//             var order_paid = async () => {

//                 var createCharge = async (stripeid, customer_source_id) => {
//                     return new Promise((resolve, reject) => {

//                         let currency = 'cad'
//                         let description = '$10 Deposit'

//                         stripe.charges.create(
//                           {
//                             currency,
//                             amount: price,
//                             customer: stripeid,
//                             source: customer_source_id,
//                             description,
//                           },
//                           function(err, charge) {
//                             let proceed = async () => {
//                                 if (err) {
//                                     console.log('Error', err)
//                                     // return resolve('charge_id_xx ' + price)
//                                     reject(err)
//                                 } else {
//                                     console.log('charge created', charge)
//                                     // return resolve('charge_id_xx ' + price)
//                                     let transactionObject = {
//                                         description,
//                                         currency,
//                                         uid,
//                                         time: (new Date()).getTime(),
//                                         customer: stripeid,
//                                         amount: price,
//                                         source: customer_source_id || 'created',
//                                     }
//                                     let addTransaction = await pushToTransactionHistory(transactionObject)
//                                     resolve(addTransaction)
//                                 }
//                                 // asynchronously called
//                             }
//                             proceed()
//                           })
                        

//                     })   
//                 }

//                 try {
//                     var stripeIdQuery = db.ref('/app_private/user_stripe/' + uid + '/stripeid').once('value')
//                     let snap = await stripeIdQuery
//                     let stripeid = snap.val()
//                     // var customer_default_source = await default_source()

//                     var charge_created = await createCharge(stripeid, sourceid)

//                     db
//                     .ref('app_private/user_balances/' + (uid || 'failed_id'))
//                     .child('cad')
//                     .set(firebase.database.ServerValue.increment(10), ()=> {
//                         return resolve('Added $10 CAD')
//                     })

//                 } catch(error) {
//                     console.log("RETURNING...", error)
//                     return reject(error)
//                 }
//             }

            

//             try {
//                 order_paid()
//             } catch(error) {
//                 reject(error)
//             }
//         })
// })
// exports.getCustomerPaymentSources = functions.https.onCall((data, context) => {
//     var db = admin.database();
//     let uid = context.auth.uid

//     console.log('here')

//     return new Promise((resolve, reject) => {
//         var _getDetails = async () => {

//             var stripeIdQuery = db.ref('/app_private/user_stripe/' + uid + '/stripeid').once('value')
//             let snap = await stripeIdQuery
//             let stripeid = snap.val()

//             var __listSources = async () => {
//                 return new Promise ((resolve, reject) => {

                    
//                     stripe.customers.listSources(
//                       stripeid,
//                       {},
//                       function(err, cards) {
//                         if (err) {
//                             console.log('error!', err)
//                             reject(err)
//                         } else {
//                             console.log('cards')
//                             resolve(cards.data)
//                         }
//                       }
//                     );

//                 })
//             }
//             var __getDefaultSource = async () => {
//                 return new Promise ((resolve, reject) => {
//                     console.log('aa')
//                     stripe.customers.retrieve(
//                       stripeid,
//                       function(err, customer) {
//                         // asynchronously called
//                         if (err) {
//                             console.log('customer error', err)
//                             reject(err)
//                         } else {
//                             console.log('customer!', customer.default_source)
//                             resolve(customer.default_source)
//                         }
//                       }
//                     );

//                 })
//             }
//             try {
//                 var defaultSource = await __getDefaultSource()
//                 // console.log('***', defaultSource)
//                 var listOfSources = await __listSources()
//                 // console.log('***', listOfSources)
//                 resolve({'defaultSource': defaultSource, 'listOfSources': listOfSources})
//             } catch(error) {
//                 reject(error)
//             }
//         }
//         try {
//             _getDetails()
//         } catch(error) {
//             reject(error)
//         }
//     })
// })
// exports.deletePaymentSourceFromCustomer = functions.https.onCall((data, context) => {
//     let sourceid = data.sourceid
//     var db = admin.database();
//     let uid = context.auth.uid
//     console.log('delete source', sourceid)

//     return new Promise((resolve, reject) => {
        
//         let _deleteSource = async () => {
//             var stripeIdQuery = db.ref('/app_private/user_stripe/' + uid + '/stripeid').once('value')
//             let snap = await stripeIdQuery
//             let stripeid = snap.val()

//             stripe.customers.deleteSource(
//                 stripeid,
//                 sourceid,
//                 function(err, confirmation) {
//                     if (err) {
//                         reject('Error deleting payment source')
//                     } else {
//                         resolve(confirmation)
//                     }
//             }); 
//         }

//         try {
//             _deleteSource()
//         } catch (e) {
//             reject(e)
//         }
//     })
// })
// exports.getWagerbucks = functions.https.onCall((data, context) => {

//     console.log('stripe.getWagerbucks', data)
//     let uid = context.auth.uid
//     var db = admin.database();
    
//     return new Promise((resolve, reject) => {

//         var get_wagerbucks = async () => {

//             let a = db
//             .ref('app_private/user_balances/' + (uid || 'failed_id'))
//             .child('wagerbucks')
//             .set(firebase.database.ServerValue.increment(10), ()=> {      
//                 let proceed = async () => {
//                     let transactionObject = {
//                         description: 'Got 10 wagerbucks',
//                         currency: 'WBX',
//                         uid,
//                         time: (new Date()).getTime(),
//                         amount: 10,
//                         source: 'Add 10 WBX test button'
//                     }
//                     let addTransaction = await pushToTransactionHistory(transactionObject)
//                     resolve('Added wagerbucks')
//                 }
//                 proceed()
//             })
//             let b = await a
//         }

//         try {
//             get_wagerbucks()
//         } catch(error) {
//             reject(error)
//         }
//     })
// })

// //
// exports.saveCreditCardCustomerDetails = functions.https.onCall((data, context) => {
// })
// exports.makeDefaultPaymentMethod = functions.https.onCall((data, context) => {
// })