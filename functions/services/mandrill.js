require('dotenv').config()
// const Mailchimp = require('mailchimp-api-v3')
const mandrill = require('node-mandrill')(process.env.MANDRILL_SECRET_KEY);

// exports.Mailchimp = Mailchimp
exports.mandrill = mandrill