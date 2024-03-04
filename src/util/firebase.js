// import * as _firebase from 'firebase'
// import app from 'firebase/app'
import _firebase from 'firebase/app'
import 'firebase/functions'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'
// import state from '../store'

var config = {
  apiKey: "AIzaSyAbADLBnlO9j4ldlRY4sfcyMRG-5dE3BkM",
  authDomain: "launch6-e5fd5.firebaseapp.com",
  databaseURL: "https://launch6-e5fd5.firebaseio.com",
  projectId: "launch6-e5fd5",
  storageBucket: "launch6-e5fd5.appspot.com",
  messagingSenderId: "51643600854",
  appId: "1:51643600854:web:e310b0fb768d21c17bde77"
}
const _firebaseInstance = _firebase.initializeApp(config)

if (process.env.NODE_ENV !== 'production') {
    _firebase.functions().useFunctionsEmulator('http://localhost:5001');
}

export const firebaseInstance = _firebaseInstance
export const firebase = _firebase
// var common = {firebaseInstance}
// export default common