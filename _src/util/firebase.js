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
  apiKey: "AIzaSyBEtqiwjdluZViyJmGc4MJm-09MW5lWWgw",
  authDomain: "tap-in-7704f.firebaseapp.com",
  databaseURL: "https://tap-in-7704f-default-rtdb.firebaseio.com",
  projectId: "tap-in-7704f",
  storageBucket: "tap-in-7704f.appspot.com",
  messagingSenderId: "490363472770",
  appId: "1:490363472770:web:dc205d55dc2b71df029d9b",
  measurementId: "G-X991SW99VF"
}
const _firebaseInstance = _firebase.initializeApp(config)

if (process.env.NODE_ENV !== 'production') {
    _firebase.functions().useFunctionsEmulator('http://localhost:5001');
}

export const firebaseInstance = _firebaseInstance
export const firebase = _firebase
