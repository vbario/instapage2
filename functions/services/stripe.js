require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.stripe = stripe