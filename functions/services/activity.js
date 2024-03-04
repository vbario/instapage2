const firebaseService = require('./firebase')
const firebase = firebaseService.firebase
const admin = firebaseService.admin
const mandrillService = require('./mandrill')
const mandrill = mandrillService.mandrill
const paths = require('./paths').paths

/* ACTION TYPES */
// agent
    // account created
    // login
    // candidate created/updated/deleted
    // Agent/Candidate makes submission (submission_made)
    // submission changes status
    // earned some amount
    // payout requested
    // payout made/status/error
    // report
// as candidate
    // interview offered
    // job offer received
    // job offer status change
    // job offer accepted
// employer
    // account created
    // login
    // job created/updated/deleted
    // new candidate submission received (submission_received)
    // new candidate rejected
    // new candidate offered interview
    // application status change: go to next step
    // application status change: application stopped

/* HELPERS */
let generateActivityObjectTitle = (submission_type, data) => {
    if (submission_type == 'submission_made') {
        let candidate = data.candidate

        let candidateName = data.candidate.candidateNameAndEmail.name
        let jobTitle = data.post.heading

        if (candidate) {
            return `Submitted ${candidateName} to ${jobTitle}`
        } else {
            return false
        }
    } else if (submission_type == 'submission_next_step') {
        let candidate = data.candidate

        let candidateName = data.candidate.candidateNameAndEmail.name
        let jobTitle = data.post.heading

        if (candidate) {
            return `Submitted ${candidateName} to ${jobTitle}`
        } else {
            return false
        }
    }
    return 'abc'
}
let generateActivityObjectText = (submission_type, data) => {
    if (submission_type == 'submission_made') {
        let candidate = data.candidate
        
        let candidateName = data.candidate.candidateNameAndEmail.name
        let jobTitle = data.post.heading
        let company = '[company]'
        let earnMin = '[earnMin]'
        let earnMax = '[earnMax]'
        if (candidate) {
            return `Congratulations on submitting ${candidateName} to ${jobTitle} at ${company}. Earn between $${earnMin} and $${earnMax} when your candidate moves through the application process!`
        } else {
            return false
        }
    } else if (submission_type == 'submission_next_step') {
        let candidate = data.candidate
        
        let candidateName = data.candidate.candidateNameAndEmail.name
        let jobTitle = data.post.heading
        let company = '[company]'
        let earnMin = '[earnMin]'
        let earnMax = '[earnMax]'
        if (candidate) {
            return `Congratulations on submitting ${candidateName} to ${jobTitle} at ${company}. Earn between $${earnMin} and $${earnMax} when your candidate moves through the application process!`
        } else {
            return false
        }
    }
    return 'def'
}
let generateEmailObject = (type, uid, _data, agentEmail) => {
    let now = (new Date()).getTime()
    let templateSlug = ''
    let to = ''
    let data = {}
    if (type == 'submission_made') {
        templateSlug = 'submission-made'
        to = agentEmail

        data.candidateName = _data.candidate.candidateNameAndEmail.name || ' '
        data.jobTitle = _data.post.heading || ' '
        data.companyName = _data.post.companyData.name || ' '
        data.jobId = _data.post.uniqueProductId || ' '

        data.moreSubmissions = _data.postsRemaining || ' '
    } else if (type == 'submission_next_step') {
        templateSlug = 'submission-next-step'
        to = agentEmail

        data.candidateName = _data.candidate.candidateNameAndEmail.name || ' '
        data.jobTitle = _data.post.heading || ' '
        data.companyName = _data.post.companyData.name || ' '
        data.jobId = _data.post.uniqueProductId || ' '

        data.agentName = _data.agentName || ' '
        data.rewardAmount = _data.rewardAmount || ' '
        data.stageFrom = _data.stageFrom || ' '
        data.stageTo = _data.stageTo || ' '
    }  else if (type == 'candidate_submitted_first_time') {
        templateSlug = 'candidate_submitted_first_time'
        to = _data.candidate.candidateNameAndEmail.email || ' '
        data.candidateEmail = _data.candidate.candidateNameAndEmail.email || ' '
        data.candidateRandom = _data.candidate.candidateNameAndEmail.random || ' '
        // data.jobTitle = _data.post.heading || ' '
        // data.companyName = _data.post.companyData.name || ' '
        // data.jobId = _data.post.uniqueProductId || ' '

        // data.agentName = _data.agentName || ' '
        // data.rewardAmount = _data.rewardAmount || ' '
        // data.stageFrom = _data.stageFrom || ' '
        // data.stageTo = _data.stageTo || ' '
    } 
    return {
        time: now,
        type,
        uid,
        to,
        templateSlug,
        data
    }
}
let generateActivityObject = (type, uid, _data) => {
    let now = (new Date()).getTime()
    let data = {}
    if (type == 'submission_made') {
        templateSlug = 'submission-made'
        to = _data.candidate.candidateNameAndEmail.email
        data.candidateName = _data.candidate.candidateNameAndEmail.name
        data.jobTitle = _data.post.heading
    } else if (type == 'submission_next_step') {
        templateSlug = 'submission-next-step'
        to = _data.candidate.candidateNameAndEmail.email
        data.candidateName = _data.candidate.candidateNameAndEmail.name
        data.jobTitle = _data.post.heading
    } 
    return {
        time: now,
        type,
        uid,
        data,
        title: generateActivityObjectTitle(type, _data),
        text: generateActivityObjectText(type, _data)
    }
}
let sampleActivityObject = {
    type: 'account_created',
    uid: 'uid_of_user_who_sees_this_activity',
    data: {} // data with format matching type of activity (in this case account_created)
}

/* PUBLIC FUNCTIONS */
let sendActivityAlert = async (_activityObject) => {
    console.log('sendActivityAlert => ', _activityObject)
    let db = admin.database()
    let type = _activityObject.type
    let uid = _activityObject.uid
    let _data = _activityObject.data
    // return false
    return new Promise(async (resolve, reject) => {
        let activityObject = generateActivityObject(type, uid, _data)

        let data = activityObject.data
        let candidateName = data.candidateName
        let jobTitle = data.jobTitle

        let newActivityObjectRef = paths.USER_ACTIVITY_PATH + (uid || 'f')
        await db.ref(newActivityObjectRef).push(activityObject)
        return resolve(true)
    })
}
let sendEmailAlert = async (activityObject) => {
    let db = admin.database()
    console.log('sendEmailAlert =>', activityObject)
    return new Promise(async (resolve, reject) => {
        let type = activityObject.type
        let uid = activityObject.uid
        let agentEmail = activityObject.agentEmail
        let _data = activityObject.data
        let emailObject = generateEmailObject(type, uid, _data, agentEmail)
        let templateSlug = emailObject.templateSlug

        // make agent's email
        let to = emailObject.to
        console.log('templateSlug', templateSlug, to)
        let data = emailObject.data
        let candidateName = data.candidateName
        let jobTitle = data.jobTitle
        let companyName = data.companyName
        let jobId = data.jobId
        let moreSubmissions = data.moreSubmissions
        let agentName = data.agentName
        let rewardAmount = data.rewardAmount
        let stageFrom = data.stageFrom
        let stageTo = data.stageTo
        let candidateEmail = data.candidateEmail
        let candidateRandom = data.candidateRandom

        if (to && data) {

            let emailData = {
                "async": true,
                template_content: [
                    {
                        name: 'abc', // ??
                        content: 'def' // ??
                    }
                ],
                template_name: templateSlug,
                message: {
                    from_email: 'noreply@pushableapp.com',
                    merge: true,
                    global_merge_vars: [
                        {
                            name: 'candidateName',
                            content: candidateName
                        },
                        {
                            name: 'jobTitle',
                            content: jobTitle
                        },
                        {
                            name: 'companyName',
                            content: companyName
                        },
                        {
                            name: 'jobId',
                            content: jobId
                        },
                        {
                            name: 'moreSubmissions',
                            content: moreSubmissions
                        },
                        {
                            name: 'agentName',
                            content: agentName
                        },
                        {
                            name: 'rewardAmount',
                            content: rewardAmount
                        },
                        {
                            name: 'stageFrom',
                            content: stageFrom
                        },
                        {
                            name: 'stageTo',
                            content: stageTo
                        },
                        {
                            name: 'candidateEmail',
                            content: candidateEmail
                        },
                        {
                            name: 'candidateRandom',
                            content: candidateRandom
                        },
                    ],
                    to: [
                        {
                            email: to,
                            type: 'to'
                        }
                    ],
                    // "attachments": [
                      // {}
                    // ],
                    // "bcc_address": "",
                    // "merge_vars": [
                    //   {}
                    // ],
                    // "google_analytics_campaign": "",
                    // "google_analytics_domains": [
                    //   ""
                    // ],
                    // "headers": {
                    //   "Reply-To": ""
                    // },
                    // "html": "",
                    // "images": [
                    //   {}
                    // ],
                    // "important": true,
                    // "metadata": {
                    //   "website": ""
                    // },
                    // "recipient_metadata": [
                    //   {}
                    // ],
                    // "subaccount": "",
                    // "subject": "",
                    // "tags": [
                    //   ""
                    // ],
                    // "text": ""
                },
                // "ip_pool": "",
                // "key": "",
                // "send_at": "",
            }

            let originalContent = {
                template_name: templateSlug,
                message: {
                    merge_language: 'handlebars',
                    from_email: 'noreply@pushableapp.com',
                    // subject: config.subject,
                    // to: [{email: data.to}],
                    // from_email: data.from,
                    // subject: data.subject,
                    // text: data.emailText
                    to: [{
                        email: to,
                        type: 'to'
                    }],
                    global_merge_vars: [{
                        name: 'test',
                        content: 'works!!'
                    }]
                }
                // message: {
                // }
            }

            /* 1 */
            await mandrill('/messages/send-template', emailData, (error, response) => {
                if ('mandrill error', error) {
                    console.log( JSON.stringify(error) )
                    return resolve({status: 400})
                } else {
                    console.log('mandrill ok', response)
                    return resolve({status: 200})
                }
            })
            /* 2 */
            // var config = {
            //         templateSlug,
            //         toEmail: data.to,
            //         // subject: 'Thank you for your order!',
            //         // toEmail: email,
            //         // cart,
            //         // test: '123456'
            //     }

            //     const params = {
            //         template_name: config.templateSlug,
            //         template_content: [],
            //         message: {
            //             merge_language: 'handlebars',
            //             // subject: config.subject,
            //             to: [{
            //                 email: config.toEmail,
            //                 type: 'to'
            //             }],
            //             global_merge_vars: [{
            //                 name: 'test',
            //                 content: 'works!!'
            //             }]
            //         },
            //         async: false
            //     };

            //     await mandrill.messages.sendTemplate(params, result => {
            //         console.log('Email sent:', result);
            //         return resolve({status: 200})
            //     }, e => {
            //         console.log(`'A mandrill error occurred: ${e.name} - ${e.message}`);
            //         return resolve({status: 400})
            //     });
            /* 3 */
        } else {
            return resolve({
                status: 400,
                message: 'Could not generate email object data'
            })
        }


        // let newActivityObjectRef = USER_ACTIVITY_PATH + (uid || 'f')
        // await db.ref(newActivityObjectRef).push(activityObject)
        // return resolve(true)
    })
}
let sendOrderReceipt = async (fullOrder) => {
    let db = admin.database()
    console.log('sendOrderReceipt =>', fullOrder)

    // NEED orderId

    /*<a href="http://specialagentapp.com/n/*|candidateEmail*|/*|candidateRandom|*" class="cta mb20">
        Join our platform to get in on
    </a>*/
    let orderPlaced = fullOrder.created 
    let orderId = fullOrder.fulfillmentDetails.orderId
    let buyerEmail = fullOrder.fulfillmentDetails.email || '[[buyerEmail]]'
    let order = fullOrder.order[0] || '[[order]]'
    let itemName = order.heading || '[[itemName]]'
    let itemPrice = order.price || ['itemPrice']

    return new Promise(async (resolve, reject) => {

        if (buyerEmail && fullOrder) {
            let emailData = {
                "async": true,
                template_content: [
                    {
                        name: 'abc', // ??
                        content: 'def' // ??
                    }
                ],
                template_name: 'momentum-order-receipt',
                message: {
                    from_email: 'noreply@pushableapp.com',
                    merge: true,
                    global_merge_vars: [
                        {
                            name: 'orderId',
                            content: orderId
                        },
                        {
                            name: 'itemName',
                            content: itemName
                        },
                        {
                            name: 'itemPrice',
                            content: itemPrice
                        },
                    ],
                    to: [
                        {
                            email: buyerEmail,
                            type: 'to'
                        }
                    ],
                    // "attachments": [
                      // {}
                    // ],
                    // "bcc_address": "",
                    // "merge_vars": [
                    //   {}
                    // ],
                    // "google_analytics_campaign": "",
                    // "google_analytics_domains": [
                    //   ""
                    // ],
                    // "headers": {
                    //   "Reply-To": ""
                    // },
                    // "html": "",
                    // "images": [
                    //   {}
                    // ],
                    // "important": true,
                    // "metadata": {
                    //   "website": ""
                    // },
                    // "recipient_metadata": [
                    //   {}
                    // ],
                    // "subaccount": "",
                    // "subject": "",
                    // "tags": [
                    //   ""
                    // ],
                    // "text": ""
                },
                // "ip_pool": "",
                // "key": "",
                // "send_at": "",
            }

            /* 1 */
            await mandrill('/messages/send-template', emailData, (error, response) => {
                if ('mandrill error', error) {
                    console.log(JSON.stringify(error) )
                    return resolve({status: 400})
                } else {
                    console.log('mandrill ok', response)
                    return resolve({status: 200})
                }
            })
        } else {
            return resolve({
                status: 400,
                message: 'Could not generate email object data'
            })
        }
        // let newActivityObjectRef = USER_ACTIVITY_PATH + (uid || 'f')
        // await db.ref(newActivityObjectRef).push(activityObject)
        // return resolve(true)
    })
}

/* NEW */
let sendWelcomeEmailAsBuyer = async (buyerId, email) => {
    let db = admin.database()
    console.log('sendWelcomeEmailAsBuyer =>', buyerId, email)

    return new Promise(async (resolve, reject) => {
        console.log(`Sending welcome email to buyer`)
        return resolve('Ok')
    })
}
let sendWelcomeEmailAsSeller = async (email) => {
    let db = admin.database()
    console.log('sendWelcomeEmailAsSeller =>', email)
    return new Promise(async (resolve, reject) => {
        console.log(`Sending welcome email to seller`)
        let emailData = {
            "async": true,
            template_content: [
                {
                    name: 'abc', // ??
                    content: 'def' // ??
                }
            ],
            template_name: 'pushable-welcome-seller',
            message: {
                from_email: 'noreply@pushableapp.com',
                merge: true,
                global_merge_vars: [
                    {
                        name: 'email',
                        content: email
                    },
                ],
                to: [
                    {
                        email: email,
                        type: 'to'
                    }
                ],
            },
        }

        /* 1 */
        await mandrill('/messages/send-template', emailData, (error, response) => {
            if ('mandrill error', error) {
                console.log(JSON.stringify(error) )
                return resolve({status: 400})
            } else {
                console.log('mandrill ok', response)
                return resolve({status: 200})
            }
        })
    })
}
let minutesToHhMm = (mm) => {
    let hours = Math.floor(mm/60)
    let minutes = mm % 60
    if (hours < 10) {
        hours = '0' + hours
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    return hours + ':' + minutes
}
let sendCartOrderReceipt = async (newOrder, buyerEmail, sellerUsername) => {
    let db = admin.database()
    console.log('sendCartOrderReceipt =>', newOrder)
    let items = (newOrder.cart && newOrder.cart.items) || newOrder.fulfillmentDetails.cart.items

    let name = ''
    let phoneNumber = ''
    let address = ''

    let _newOrder = newOrder

    if (newOrder.fulfillmentDetails) { // paid order
        _newOrder = newOrder.fulfillmentDetails
    } else { // free order
        //
    }
    name = _newOrder.shipToName
    phoneNumber = _newOrder.shipToPhoneNumber
    let a = _newOrder.shippingAddress
    if (a) {
    address = a.address1 + ', ' +
        (a.address2 ? a.address2 + ', ' : '') +
        (a.city ? a.city + ', ' : '') +
        (a.state ? a.state + ', ' : '') +
        (a.postalCode ? a.postalCode + ', ' : '') +
        (a.country ? a.country: '')
    }

    // let orderPlaced = fullOrder.created 
    // let orderId = fullOrder.fulfillmentDetails.orderId
    // let buyerEmail = fullOrder.fulfillmentDetails.email
    // let order = fullOrder.order[0]
    // let itemName = order.heading
    // let itemPrice = order.price

    return new Promise(async (resolve, reject) => {
        let cartHtml = ''
        cartHtml = cartHtml + `<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">`
        cartHtml = cartHtml + `<tbody>`
        cartHtml = cartHtml + `<h4 style="margin-bottom:15px;">Order Summary</h4>`
        
        // <td style="padding-top:0;padding-bottom:0" class="m_-2142074048349026323mceColumn" valign="top" colspan="12" width="100%">

        let cartTotal = 0

        for (let i in items) {
            let item = items[i]

            cartHtml = cartHtml + `<tr>`

            cartHtml = cartHtml + `<td style="padding-top:15px;padding-bottom:0" valign="top" colspan="12" width="80%">` + item.title + `</td>`

            let itemPrice = item.price

            if (item.productType == 'physical-product') {
                itemPrice = item.sizes[item.newItemSize].price * item.newItemQuantity
            } else if (item.productType == 'calendar-event') {
                itemPrice = item.appointmentLengths[item.newAppointment.selectedAppointmentTime].price
            }

            cartTotal = cartTotal + parseFloat(itemPrice)

            cartHtml = cartHtml + `<td style="padding-top:15px;padding-bottom:0" valign="top" colspan="12" width="20%">` + (itemPrice ? ('$' + itemPrice) : 'free') + `</td>`

            cartHtml = cartHtml + `</tr>`
            
            cartHtml = cartHtml + `<tr>`

            let itemOwnerId = item.ownerId
        
            if (item.productType == 'physical-product') {
                // console.log('ITEM', i, 'physical-product', item)
                let size = item.sizes[item.newItemSize].name
                let quantity = item.newItemQuantity
                cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12">`
                cartHtml = cartHtml + size + ' x ' 
                cartHtml = cartHtml + quantity
                cartHtml = cartHtml + `</td>`
            } else if (item.productType == 'digital-download') { // send the buyer instructions for downloading the file
                // console.log('ITEM', i, 'digital-download', item)
                let _itemToDownload = await db.ref('publicProducts/' + (item.productId || 'f') + '/productDeliveryFile').once('value')
                let itemToDownload = _itemToDownload.val()
                let filePath = itemToDownload ? itemToDownload.url : '[itemToDownload]'
                let fileName = itemToDownload ? itemToDownload.name : '[itemToDownload]'.name
                cartHtml = cartHtml + `<a href="` + filePath + `">`
                cartHtml = cartHtml + 'Download your file'
                cartHtml = cartHtml + `</a>`
            } else if (item.productType == 'custom-service') {
                // console.log('ITEM', i, 'digital-service', item)
                // tell the buyer with how to proceed with the service
            } else if (item.productType == 'calendar-event') { // send email to buyer regarding their booking
                let newAppointment = item.newAppointment
                console.log('ITEM', i, 'calendar-event', item, newAppointment.times)
                let duration = item.appointmentLengths[newAppointment.selectedAppointmentTime].time
                let time = newAppointment.times[newAppointment.selectedAppointmentTime]
                let day = newAppointment.selectedCalendarDay
                cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12">`
                cartHtml = cartHtml + duration + ' minutes on ' 
                cartHtml = cartHtml + day + ' at ' + minutesToHhMm(newAppointment.appointmentStartTime)
                cartHtml = cartHtml + `</td>`
            }
            // cartHtml = cartHtml + `<hr/>`
            cartHtml = cartHtml + `</tr>`
        }



        cartHtml = cartHtml + `<tr>`
        cartHtml = cartHtml + `<td style="padding-top:20px;padding-bottom:0" valign="top" colspan="12" width="80%"><h5 style="margin-bottom:0;">Subtotal</h5></td>`
        cartHtml = cartHtml + `<td style="padding-top:20px;padding-bottom:0" valign="top" colspan="12" width="20%">`
        cartHtml = cartHtml + (cartTotal ? '$' + cartTotal : 'free')
        cartHtml = cartHtml + `</td>`
        cartHtml = cartHtml + `</tr>`

        let shippingAmount = 0
        if (newOrder.fulfillmentDetails) {
            if (newOrder.fulfillmentDetails.quotedShipping) {
                shippingAmount = newOrder.fulfillmentDetails.quotedShipping.price
            }
        }

        if (address) {
            cartHtml = cartHtml + `<tr>`
            cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="80%"><h5 style="margin-bottom:0;">Shipping</h5></td>`
            cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="20%">`
            cartHtml = cartHtml + (shippingAmount ? '$' + shippingAmount : 'free')
            cartHtml = cartHtml + `</td>`
            cartHtml = cartHtml + `</tr>`
        }

        // cartHtml = cartHtml + `<span class="totals-line totals-taxes">`
        // cartHtml = cartHtml + `<p>Taxes</p>`
        // cartHtml = cartHtml + `<p>$-</p>`
        // cartHtml = cartHtml + `</span>`

        cartHtml = cartHtml + `<tr>`
        cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="80%"><h5>Total</h5></td>`
        cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="20%">`
        cartHtml = cartHtml + (cartTotal ? '$' + cartTotal : 'free')
        cartHtml = cartHtml + `</td>`
        cartHtml = cartHtml + `</tr>`


        if (address) {
            cartHtml = cartHtml + `<hr/>`
            cartHtml = cartHtml + `<h4>Shipping Info</h4>`
            cartHtml = cartHtml + `<tr>`
            cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="100%">`
            cartHtml = cartHtml + name
            cartHtml = cartHtml + `</td>`
            cartHtml = cartHtml + `</tr>`
            cartHtml = cartHtml + `<tr>`
            cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="100%">`
            cartHtml = cartHtml + phoneNumber
            cartHtml = cartHtml + `</td>`
            cartHtml = cartHtml + `</tr>`
            cartHtml = cartHtml + `<tr>`
            cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="100%">`
            cartHtml = cartHtml + address
            cartHtml = cartHtml + `</td>`
            cartHtml = cartHtml + `</tr>`
        }

        cartHtml = cartHtml + `</tbody>`
        cartHtml = cartHtml + `</table>`

        console.log('cartHtml', cartHtml)

        console.log('Sending cart order receipt')
        if (newOrder && buyerEmail) {
            let emailData = {
                "async": true,
                template_content: [
                    {
                        name: 'abc', // ??
                        content: 'def' // ??
                    }
                ],
                template_name: 'pushable-cart-order-receipt',
                message: {
                    from_name: '@' + sellerUsername,
                    from_email: 'noreply@pushableapp.com',
                    merge: true,
                    global_merge_vars: [
                        {
                            name: 'cart',
                            content: cartHtml
                        },
                        {
                            name: 'orderId',
                            content: _newOrder.orderNumber || '-'
                        },
                        {
                            name: 'sellerUsername',
                            content: sellerUsername || '-'
                        }
                    ],
                    to: [
                        {
                            email: buyerEmail,
                            type: 'to'
                        }
                    ],
                    subject: 'Order #' + _newOrder.orderNumber + ' confirmed',
                }
            }
            await mandrill('/messages/send-template', emailData, (error, response) => {
                if ('mandrill error', error) {
                    console.log(JSON.stringify(error) )
                    return resolve({status: 400})
                } else {
                    console.log('mandrill ok', response)
                    return resolve({status: 200})
                }
            })
        } else {
            return resolve({
                status: 400,
                message: 'Could not send order confirmation to seller'
            })
        }
        return resolve('Ok')
    })
}
let sendCartOrderToSeller = async (newOrder, sellerEmail, sellerUsername, buyerEmail) => {
    let db = admin.database()
    console.log('sendCartOrderToSeller =>', newOrder)
    let items = (newOrder.cart && newOrder.cart.items) || newOrder.fulfillmentDetails.cart.items

    let name = ''
    let phoneNumber = ''
    let address = ''

    let _newOrder = newOrder

    if (newOrder.fulfillmentDetails) { // paid order
        _newOrder = newOrder.fulfillmentDetails
    } else { // free order
        //
    }
    name = _newOrder.shipToName
    phoneNumber = _newOrder.shipToPhoneNumber
    let a = _newOrder.shippingAddress
    if (a) {
    address = a.address1 + ', ' +
        (a.address2 ? a.address2 + ', ' : '') +
        (a.city ? a.city + ', ' : '') +
        (a.state ? a.state + ', ' : '') +
        (a.postalCode ? a.postalCode + ', ' : '') +
        (a.country ? a.country: '')
    }

    // let orderPlaced = fullOrder.created 
    // let orderId = fullOrder.fulfillmentDetails.orderId
    // let buyerEmail = fullOrder.fulfillmentDetails.email
    // let order = fullOrder.order[0]
    // let itemName = order.heading
    // let itemPrice = order.price

    return new Promise(async (resolve, reject) => {
        let cartHtml = ''
        cartHtml = cartHtml + `<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">`
        cartHtml = cartHtml + `<tbody>`
        cartHtml = cartHtml + `<h4 style="margin-bottom:15px;">Order Summary</h4>`
        
        // <td style="padding-top:0;padding-bottom:0" class="m_-2142074048349026323mceColumn" valign="top" colspan="12" width="100%">

        let cartTotal = 0

        for (let i in items) {
            let item = items[i]

            cartHtml = cartHtml + `<tr>`

            cartHtml = cartHtml + `<td style="padding-top:15px;padding-bottom:0" valign="top" colspan="12" width="80%">` + item.title + `</td>`

            let itemPrice = item.price

            if (item.productType == 'physical-product') {
                itemPrice = item.sizes[item.newItemSize].price * item.newItemQuantity
            } else if (item.productType == 'calendar-event') {
                itemPrice = item.appointmentLengths[item.newAppointment.selectedAppointmentTime].price
            }

            cartTotal = cartTotal + parseFloat(itemPrice)

            cartHtml = cartHtml + `<td style="padding-top:15px;padding-bottom:0" valign="top" colspan="12" width="20%">` + (itemPrice ? ('$' + itemPrice) : 'free') + `</td>`

            cartHtml = cartHtml + `</tr>`
            
            cartHtml = cartHtml + `<tr>`

            let itemOwnerId = item.ownerId
        
            if (item.productType == 'physical-product') {
                // console.log('ITEM', i, 'physical-product', item)
                let size = item.sizes[item.newItemSize].name
                let quantity = item.newItemQuantity
                cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12">`
                cartHtml = cartHtml + size + ' x ' 
                cartHtml = cartHtml + quantity
                cartHtml = cartHtml + `</td>`
            } else if (item.productType == 'digital-download') { // send the buyer instructions for downloading the file
                // console.log('ITEM', i, 'digital-download', item)
            } else if (item.productType == 'custom-service') {
                // add instructions
                // add file to download
                let _itemToDownload = await db.ref('publicProducts/' + (item.productId || 'f') + '/productDeliveryFile').once('value')
                let itemToDownload = _itemToDownload.val()
                let instructions_ = item.serviceInstructions
                let filePath_ = item.serciceInstructionsFiles ? item.serciceInstructionsFiles.url : false

                cartHtml = cartHtml + `</tr>`
                cartHtml = cartHtml + `<tr>`
                cartHtml = cartHtml + `<td style="padding-top:0px;padding-bottom:0" valign="top" colspan="12" width="100%">`
                cartHtml = cartHtml + `<p>Order from: `
                cartHtml = cartHtml + buyerEmail
                cartHtml = cartHtml + `</p>`
                cartHtml = cartHtml + `</td>`   
                cartHtml = cartHtml + `</tr>`
                cartHtml = cartHtml + `<tr>`
                cartHtml = cartHtml + `<td style="padding-top:0px;padding-bottom:0" valign="top" colspan="12" width="100%">`
                cartHtml = cartHtml + instructions_
                cartHtml = cartHtml + `</td>`

                if (filePath_) {
                    cartHtml = cartHtml + `</tr>`
                    cartHtml = cartHtml + `<tr>`
                    cartHtml = cartHtml + `<td style="padding-top:0px;padding-bottom:0" valign="top" colspan="12" width="100%">`
                    cartHtml = cartHtml + `<a href="` + filePath_ + `">Download the reference file.</a>`
                    cartHtml = cartHtml + `</td>`
                }
                // tell the buyer with how to proceed with the service
            } else if (item.productType == 'calendar-event') { // send email to buyer regarding their booking
                let newAppointment = item.newAppointment
                console.log('ITEM', i, 'calendar-event', item, newAppointment.times)
                let duration = item.appointmentLengths[newAppointment.selectedAppointmentTime].time
                let time = newAppointment.times[newAppointment.selectedAppointmentTime]
                let day = newAppointment.selectedCalendarDay
                cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12">`
                cartHtml = cartHtml + duration + ' minutes on ' 
                cartHtml = cartHtml + day + ' at ' + minutesToHhMm(newAppointment.appointmentStartTime)
                cartHtml = cartHtml + `</td>`
            }
            // cartHtml = cartHtml + `<hr/>`
            cartHtml = cartHtml + `</tr>`
        }



        cartHtml = cartHtml + `<tr>`
        cartHtml = cartHtml + `<td style="padding-top:20px;padding-bottom:0" valign="top" colspan="12" width="80%"><h5 style="margin-bottom:0;">Subtotal</h5></td>`
        cartHtml = cartHtml + `<td style="padding-top:20px;padding-bottom:0" valign="top" colspan="12" width="20%">`
        cartHtml = cartHtml + (cartTotal ? '$' + cartTotal : 'free')
        cartHtml = cartHtml + `</td>`
        cartHtml = cartHtml + `</tr>`

        let shippingAmount = 0
        if (newOrder.fulfillmentDetails) {
            if (newOrder.fulfillmentDetails.quotedShipping) {
                shippingAmount = newOrder.fulfillmentDetails.quotedShipping.price
            }
        }

        if (address) {
            cartHtml = cartHtml + `<tr>`
            cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="80%"><h5 style="margin-bottom:0;">Shipping</h5></td>`
            cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="20%">`
            cartHtml = cartHtml + (shippingAmount ? '$' + shippingAmount : 'free')
            cartHtml = cartHtml + `</td>`
            cartHtml = cartHtml + `</tr>`
        }

        // cartHtml = cartHtml + `<span class="totals-line totals-taxes">`
        // cartHtml = cartHtml + `<p>Taxes</p>`
        // cartHtml = cartHtml + `<p>$-</p>`
        // cartHtml = cartHtml + `</span>`

        cartHtml = cartHtml + `<tr>`
        cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="80%"><h5>Total</h5></td>`
        cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="20%">`
        cartHtml = cartHtml + (cartTotal ? '$' + cartTotal : 'free')
        cartHtml = cartHtml + `</td>`
        cartHtml = cartHtml + `</tr>`


        if (address) {
            cartHtml = cartHtml + `<hr/>`
            cartHtml = cartHtml + `<h4>Shipping Info</h4>`
            cartHtml = cartHtml + `<tr>`
            cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="100%">`
            cartHtml = cartHtml + name
            cartHtml = cartHtml + `</td>`
            cartHtml = cartHtml + `</tr>`
            cartHtml = cartHtml + `<tr>`
            cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="100%">`
            cartHtml = cartHtml + phoneNumber
            cartHtml = cartHtml + `</td>`
            cartHtml = cartHtml + `</tr>`
            cartHtml = cartHtml + `<tr>`
            cartHtml = cartHtml + `<td style="padding-top:0;padding-bottom:0" valign="top" colspan="12" width="100%">`
            cartHtml = cartHtml + address
            cartHtml = cartHtml + `</td>`
            cartHtml = cartHtml + `</tr>`
        }

        cartHtml = cartHtml + `</tbody>`
        cartHtml = cartHtml + `</table>`

        console.log('cartHtml', cartHtml)

        console.log('Sending cart order receipt')
        if (newOrder && sellerEmail) {
            let emailData = {
                "async": true,
                template_content: [
                    {
                        name: 'abc', // ??
                        content: 'def' // ??
                    }
                ],
                template_name: 'pushable-new-order-email',
                message: {
                    from_name: 'Pushable',
                    from_email: 'noreply@pushableapp.com',
                    merge: true,
                    global_merge_vars: [
                        {
                            name: 'cart',
                            content: cartHtml
                        },
                        {
                            name: 'orderId',
                            content: _newOrder.orderNumber || '-'
                        },
                        {
                            name: 'sellerUsername',
                            content: sellerUsername || '-'
                        }
                    ],
                    to: [
                        {
                            email: sellerEmail,
                            type: 'to'
                        }
                    ],
                    subject: 'You have a new order:  #' + _newOrder.orderNumber
                }
            }
            await mandrill('/messages/send-template', emailData, (error, response) => {
                if ('mandrill error', error) {
                    console.log(JSON.stringify(error) )
                    return resolve({status: 400})
                } else {
                    console.log('mandrill ok', response)
                    return resolve({status: 200})
                }
            })
        } else {
            return resolve({
                status: 400,
                message: 'Could not send cart order receipt'
            })
        }
        return resolve('Ok')
    })
}
let sendPhysicalOrderEmail = async (newOrder, orderEmail) => {
    let db = admin.database()
    console.log('sendPhysicalOrderEmail =>', newOrder)
    // let orderPlaced = fullOrder.created 
    // let orderId = fullOrder.fulfillmentDetails.orderId
    // let buyerEmail = fullOrder.fulfillmentDetails.email
    // let order = fullOrder.order[0]
    // let itemName = order.heading
    // let itemPrice = order.price

    return new Promise(async (resolve, reject) => {
        console.log('Sending physical order email')
        // if (buyerEmail && fullOrder) {
        //     let emailData = {
        //         "async": true,
        //         template_content: [
        //             {
        //                 name: 'abc', // ??
        //                 content: 'def' // ??
        //             }
        //         ],
        //         template_name: 'momentum-order-receipt',
        //         message: {
        //             from_email: 'noreply@pushableapp.com',
        //             merge: true,
        //             global_merge_vars: [
        //                 {
        //                     name: 'orderId',
        //                     content: orderId
        //                 },
        //                 {
        //                     name: 'itemName',
        //                     content: itemName
        //                 },
        //                 {
        //                     name: 'itemPrice',
        //                     content: itemPrice
        //                 },
        //             ],
        //             to: [
        //                 {
        //                     email: buyerEmail,
        //                     type: 'to'
        //                 }
        //             ],
        //             // "attachments": [
        //               // {}
        //             // ],
        //             // "bcc_address": "",
        //             // "merge_vars": [
        //             //   {}
        //             // ],
        //             // "google_analytics_campaign": "",
        //             // "google_analytics_domains": [
        //             //   ""
        //             // ],
        //             // "headers": {
        //             //   "Reply-To": ""
        //             // },
        //             // "html": "",
        //             // "images": [
        //             //   {}
        //             // ],
        //             // "important": true,
        //             // "metadata": {
        //             //   "website": ""
        //             // },
        //             // "recipient_metadata": [
        //             //   {}
        //             // ],
        //             // "subaccount": "",
        //             // "subject": "",
        //             // "tags": [
        //             //   ""
        //             // ],
        //             // "text": ""
        //         },
        //         // "ip_pool": "",
        //         // "key": "",
        //         // "send_at": "",
        //     }

        //     /* 1 */
        //     await mandrill('/messages/send-template', emailData, (error, response) => {
        //         if ('mandrill error', error) {
        //             console.log(JSON.stringify(error) )
        //             return resolve({status: 400})
        //         } else {
        //             console.log('mandrill ok', response)
        //             return resolve({status: 200})
        //         }
        //     })
        // } else {
        //     return resolve({
        //         status: 400,
        //         message: 'Could not generate email object data'
        //     })
        // }
        return resolve('Ok')
    })
}
let addOrderToBuyerPurchases = async (buyerId, newOrder) => {
    let db = admin.database()
    console.log('addOrderToBuyerPurchases =>', newOrder)
    // let orderPlaced = fullOrder.created 
    // let orderId = fullOrder.fulfillmentDetails.orderId
    // let buyerEmail = fullOrder.fulfillmentDetails.email
    // let order = fullOrder.order[0]
    // let itemName = order.heading
    // let itemPrice = order.price

    return new Promise(async (resolve, reject) => {
        console.log(`Adding order to the buyer's purchase list`)
        return resolve('Ok')
    })
}

exports.sendActivityAlert = sendActivityAlert
exports.sendEmailAlert = sendEmailAlert
exports.sendOrderReceipt = sendOrderReceipt
exports.sendWelcomeEmailAsBuyer = sendWelcomeEmailAsBuyer
exports.sendWelcomeEmailAsSeller = sendWelcomeEmailAsSeller
exports.sendCartOrderReceipt = sendCartOrderReceipt
exports.sendCartOrderToSeller = sendCartOrderToSeller
exports.sendPhysicalOrderEmail = sendPhysicalOrderEmail
exports.addOrderToBuyerPurchases = addOrderToBuyerPurchases


