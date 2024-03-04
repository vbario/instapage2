const functions = require("firebase-functions")
const firebase = require('firebase')
const admin = require('firebase-admin')
const auth = require('firebase/auth')
require('dotenv').config()
admin.initializeApp()
firebase.initializeApp()

exports.firebase = firebase
exports.admin = admin