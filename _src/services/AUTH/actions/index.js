import router from '@/router'
import { firebase } from '@/util/firebase'
import { firebaseInstance } from '@/util/firebase'
import http from '@/util/http'
import axios from 'axios'

// test
// var stripe = Stripe("pk_test_51Je8m2I0NXyTXqSuL3lQKdk7ryZczD7xczKta8i0LGru2YqkIZJcCwpmWeWEDzWPP2IV2KcI6t89doFRYrW2Y2Cd00DHaz3nhG");

// prod
var stripe = Stripe("pk_live_51Je8m2I0NXyTXqSu5YYKVTw42hDzCWGOlKWGyEUUpWWUNMPnfN15sUxEMR8KwPvONvuWqZOgKrAFJqXZGUfWnj6800D9trFSFZ");

let unAuthedPaths = [
  '/',
  '/login',
  '/signup',
]

let my_products_path = 'myProducts/'
let public_products_path = 'publicProducts/'
let my_display_data = 'displayDataByUser/'
let order_update_path = 'orderUpdates/'
let customer_info_path = 'customer_info/public/'
let customer_info_path2 = 'customer_info/private/'

const watchMyData = (state, uid) => {
  // let myProductsRef = 
  firebaseInstance.database().ref(my_products_path + (uid || 'failed')).on('child_added', (snap) => {
    let data = snap.val()
    if (data) {
      state.commit('AUTH.ADD_MY_PRODUCT', data)
    }
    else if (data === null) {
      state.commit('AUTH.CLEAR_MY_PRODUCTS', {})
    }
  })
  // let myProductsRef = 
  firebaseInstance.database().ref(my_display_data + (uid || 'failed')).on('value', (snap) => {
    let data = snap.val()
    if (data) {
      state.commit('AUTH.SET_DISPLAY_DATA', data)
    } else if (data === null) {
      state.commit('AUTH.CLEAR_MY_DISPLAY_DATA', {})
    }
  })
  // let myProductsRef = 
  firebaseInstance.database().ref(customer_info_path + (uid || 'failed')).on('value', (snap) => {
    let data = snap.val()
    console.log('my customer info', data)
    state.commit('AUTH.SET_MY_INFO', data)
  })
  firebaseInstance.database().ref(customer_info_path2 + (uid || 'failed')).on('value', (snap) => {
    let data = snap.val()
    console.log('my private customer info', data)
    state.commit('AUTH.SET_MY_PRIVATE_INFO', data)
  })
}

const getToken = async () => {
    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      return idToken
    }).catch(function(error) {
      return false
    });
}

const login = (email, password, state, then) => {
  console.log('ep', email, password)
    var signIn = firebaseInstance.auth().signInWithEmailAndPassword(email, password)
    signIn.then((data) => {
      then && then()
    }).catch((error) => {
      console.log('Firebase Auth Error:', error)
      state.commit('AUTH.SET_AUTH_ERROR', error)
    })
}

const getProductDetails = async (productId, state) => {
  return new Promise(async (resolve, reject) => {
    let run = async () => {
      let user = firebase.auth().currentUser
      if (user) {
        let uid = firebase.auth().currentUser.uid
        let productDetailsRef = my_products_path + '/' + uid + '/' + productId
        let _productDetails = await firebaseInstance.database().ref(productDetailsRef).once('value')
        let productDetails = _productDetails.val()
        let uniqueProductId = productDetails.uniqueProductId
        let productFullDetailsRef = public_products_path + '/' + uniqueProductId
        let _productFullDetails = await firebaseInstance.database().ref(productFullDetailsRef).once('value')
        let productFullDetails = _productFullDetails.val()
        resolve(productFullDetails)
      } else {
        setTimeout(() => {
          run()
        }, 300)
      }
    }
    run()
  })
}

let completed_orders_by_user_path = 'completedOrdersByUser/'
let fullmillments_by_user_path = 'fulfillmentsByUser/'

/* SERVICES */
const AUTH = {
  setNewPassword: (state, item) => {
    let user = firebase.auth().currentUser;
    let email = user.email

    return new Promise(async (resolve, reject) => {
      let then = () => {
        user.updatePassword(item.p2).then(() => {
          console.log('password set')
          resolve('ok')
        }, (error) => {
          console.log('ee', error)
        })
      }
      var signIn = firebaseInstance.auth().signInWithEmailAndPassword(email, item.p)
      signIn.then((data) => {
        then && then()
      }).catch((error) => {
        then()
      })
    })

  },
  getMyFulfillments: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let my_fulfillments_path = fullmillments_by_user_path + uid
      let _fulfillments = await firebaseInstance.database().ref(my_fulfillments_path).once('value')
      let myFulfillments = _fulfillments.val()

      let fulfillmentsAsArray = Object.keys(myFulfillments).map((v, i) => {
        return {...myFulfillments[v], orderId: v}
      })

      resolve(fulfillmentsAsArray)
    })
  },
  getMyIncome: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let my_orders_path = completed_orders_by_user_path + uid
      let _income = await firebaseInstance.database().ref(my_orders_path).once('value')
      let myIncome = _income.val()

      let myIncomeAsArray = Object.keys(myIncome).map((v, i) => {
        return {...myIncome[v], orderId: v}
      })

      resolve(myIncomeAsArray)
    })
  },
  getProductDetails: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let productDetails = await getProductDetails(item, state)
      resolve(productDetails)
    })
  },
  getProductById: (state, item) => {
    return new Promise(async (resolve, reject) => {
      // let productDetails = await getProductDetails(item, state)
      let productDetailsRef = public_products_path + '/' + item
      console.log('productDetailsRef', productDetailsRef)
      let _productDetails = await firebaseInstance.database().ref(productDetailsRef).once('value')
      let productDetails = _productDetails.val()
      let ownerId = productDetails.ownerId
      let userPublicInfoRef = customer_info_path + ownerId
      let _userInfo = await firebaseInstance.database().ref(userPublicInfoRef).once('value')
      let userInfo = _userInfo.val()
      productDetails = {...productDetails, userInfo}

      resolve(productDetails)
    })
  },
  notifyFulfillments: (state, item) => {
    state.commit('AUTH.NOTIFY_FULFILLMENTS', {})
  },
  saveFulfillmentData: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let data = item
      var saveFulfillmentData = firebase.functions().httpsCallable('saveFulfillmentData');
      saveFulfillmentData(data)
      .then((result) => {
        console.log('success saveFulfillmentData', result)
        resolve('Test')
      })
      .catch((error) => {
        console.log('error', error)
      });
    })
  },
  finishFulfillment: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let data = item
      var finishFulfillment = firebase.functions().httpsCallable('finishFulfillment');
      finishFulfillment(data)
      .then((result) => {
        console.log('success finishFulfillment', result)
        resolve('ok')
      })
      .catch((error) => {
        console.log('error', error)
      });
    })
  },
  saveProfile: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let data = item
      var saveProfile = firebase.functions().httpsCallable('saveProfile');
      saveProfile(data)
      .then((result) => {
        console.log('RES', result)
        resolve(result.data.updatedProfileData)
      })
      .catch((error) => {
        console.log('error', error)
      });
    })
  },
  saveProduct: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let data = item
      var saveProduct = firebase.functions().httpsCallable('saveProduct');
      saveProduct(data)
      .then((result) => {
        resolve(result.data.updatedProductData)
      })
      .catch((error) => {
        console.log('error', error)
      });
    })
  },
  unfulfill: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let data = item
      var unfulfill = firebase.functions().httpsCallable('unfulfill');
      unfulfill(data)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error', error)
      });
    })
  },
  deleteFulfilledProduct: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let data = item
      var deleteFulfilledProduct = firebase.functions().httpsCallable('deleteFulfilledProduct');
      deleteFulfilledProduct(data)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error', error)
      });
    })
  },
  deleteProduct: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let data = item
      var deleteProduct = firebase.functions().httpsCallable('deleteProduct');
      deleteProduct(data)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error', error)
      });
    })
  },
  deactivateProduct: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let data = item
      var saveProduct = firebase.functions().httpsCallable('deactivateProduct');
      saveProduct(data)
      .then((result) => {
        resolve(result.data.message)
      })
      .catch((error) => {
        console.log('error deactivateProduct', error)
      });
    })
  },
  uploadClientOrderFile: (state, item) => {
    return new Promise(async (resolve, reject) => {

      // var user = firebase.auth().currentUser
      // let uid = user.uid
      let file = item.file
      let name = file.name
      var extension = file.name
      extension = extension.substr(extension.lastIndexOf('.'), extension.length)
      let productId = item.productId.toString()
      let randomNumber = Math.floor(Math.random() * 100000000000)
      name = randomNumber+ '_' + name
      console.log('file', productId)
      console.log('file', name)

      let run = async () => {
        let snapshot = await firebaseInstance.storage().ref('clientOrderFiles').child(productId).child(name).put(file)
        let url = await firebaseInstance.storage().ref('clientOrderFiles').child(productId).child(name).getDownloadURL()
        console.log('url', url)

        resolve({
          message: 'File uploaded',
          name: file.name,
          url,
        })
      }

      try {
        run()
      } catch (error) {
        reject ('File upload error', error)
      }

    })
  },
  uploadProductDeliveryFile: (state, item) => {
    return new Promise(async (resolve, reject) => {

      var user = firebase.auth().currentUser
      let uid = user.uid
      let file = item.file
      var extension = file.name
      extension = extension.substr(extension.lastIndexOf('.'), extension.length)
      let productId = item.productId

      let run = async () => {
        let snapshot = await firebaseInstance.storage().ref('userProductDeliveryFiles').child(uid).child(productId + extension).put(file)
        let url = await firebaseInstance.storage().ref('userProductDeliveryFiles').child(uid).child(productId + extension).getDownloadURL()
        // await firebaseInstance.database().ref('/app/user_public_info/' + uid + '/profilePic').set(url)
        console.log('url', url)

        resolve({
          message: 'File uploaded',
          name: file.name,
          url,
        })
      }

      try {
        run()
      } catch (error) {
        reject ('File upload error', error)
      }

    })
  },
  uploadProductFulfillmentFile: (state, item) => {
    return new Promise(async (resolve, reject) => {

      var user = firebase.auth().currentUser
      let uid = user.uid
      let file = item.file
      var extension = file.name
      extension = extension.substr(extension.lastIndexOf('.'), extension.length)
      let productId = item.productId

      let run = async () => {
        let snapshot = await firebaseInstance.storage().ref('userProductFulfillmentFiles').child(uid).child(productId + extension).put(file)
        let url = await firebaseInstance.storage().ref('userProductFulfillmentFiles').child(uid).child(productId + extension).getDownloadURL()
        // await firebaseInstance.database().ref('/app/user_public_info/' + uid + '/profilePic').set(url)
        console.log('url', url)

        resolve({
          message: 'File uploaded',
          name: file.name,
          url,
        })
      }

      try {
        run()
      } catch (error) {
        reject ('File upload error', error)
      }

    })
  },
  uploadProfileImage: (state, item) => {
    return new Promise(async (resolve, reject) => {

      var user = firebase.auth().currentUser
      let uid = user.uid
      let file = item.file
      var extension = file.name
      extension = extension.substr(extension.lastIndexOf('.'), extension.length)
      // let productId = item.productId

      let run = async () => {
        let snapshot = await firebaseInstance.storage().ref('userProfileImages').child(uid).child(file.name).put(file)
        let url = await firebaseInstance.storage().ref('userProfileImages').child(uid).child(file.name).getDownloadURL()
        // await firebaseInstance.database().ref('/app/user_public_info/' + uid + '/profilePic').set(url)
        console.log('url', url)

        resolve({
          message: 'Image uploaded',
          url
        })
      }

      try {
        run()
      } catch (error) {
        reject ('Image upload error', error)
      }

    })
  },
  uploadProductImage: (state, item) => {
    return new Promise(async (resolve, reject) => {

      var user = firebase.auth().currentUser
      let uid = user.uid
      let file = item.file
      var extension = file.name
      extension = extension.substr(extension.lastIndexOf('.'), extension.length)
      let productId = item.productId

      let run = async () => {
        let snapshot = await firebaseInstance.storage().ref('userProductImages').child(uid).child(productId + extension).put(file)
        let url = await firebaseInstance.storage().ref('userProductImages').child(uid).child(productId + extension).getDownloadURL()
        // await firebaseInstance.database().ref('/app/user_public_info/' + uid + '/profilePic').set(url)
        console.log('url', url)

        resolve({
          message: 'Image uploaded',
          url
        })
      }

      try {
        run()
      } catch (error) {
        reject ('Image upload error', error)
      }

    })
  },
  setFulfillmentMenu: (state, item) => {
    state.commit('AUTH.SET_DIGITAL_ORDER_POPUP', item)
  },
  authStateChange: (state, item) => {
    firebaseInstance.auth().onAuthStateChanged(user => {
      let noPushPaths = [
        '/',
        '/login',
        '/pay'
      ]
      if (user) {
        console.log("AUTH status: logged in", user.uid, router.currentRoute.path)
        if (noPushPaths.indexOf(router.currentRoute.path) > -1) {
          router.push('/me')
        }
        console.log('user', user)
        state.commit('AUTH.CLEAR_AUTH_ERROR', {})
        state.commit('AUTH.SET_UID', user.uid)
        state.commit('AUTH.SET_EMAIL', user.email)
        watchMyData(state, user.uid)
      } else {
        console.log("AUTH status: not logged in.", router.currentRoute.name)
        if (router.currentRoute.name == 'PayPage') {
          //
        } else if (noPushPaths.indexOf(router.currentRoute.path) < 0) {
          router.push('/')
        }
      }
    });
  },
  showHeaderShop: (state, item) => {
    state.commit('AUTH.SHOW_HEADER_SHOP', item)
  },
  setPreOrderDetailsAndPay: (state, item) => {
    var setPreOrderDetails = firebase.functions().httpsCallable('setPreOrderDetails');
        setPreOrderDetails(item.orderDetails)
        .then((data) => {
          item.then()
        })
        .catch((error) => {
          console.log('error', error)
        });
  },
  getPaymentIntent: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var purchase = {
            items: item
          }
      let requestData = JSON.stringify(purchase)

        var getPaymentIntent = firebase.functions().httpsCallable('getPaymentIntent');
        getPaymentIntent(requestData)
        .then((_data) => {
          let data = _data.data
          console.log('==>data', data)
          let orderNumber = data.orderNumber
          var elements = stripe.elements();
          var style = {
            base: {
              color: "#32325d",
              fontFamily: 'Arial, sans-serif',
              fontSmoothing: "antialiased",
              fontSize: "16px",
              "::placeholder": {
                color: "#32325d"
              }
            },
            invalid: {
              fontFamily: 'Arial, sans-serif',
              color: "#fa755a",
              iconColor: "#fa755a"
            }
          };
          var card = elements.create("card", { style: style });
          // Stripe injects an iframe into the DOM
          card.mount("#card-element");
          card.on("change", (event) => {
            // Disable the Pay button if there are no card details in the Element
            document.querySelector("button").disabled = event.empty;
            document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
          });
          var form = document.getElementById("payment-form");
          // form.addEventListener("submit", (event) => {
            // event.preventDefault();
            // Complete payment when the submit button is clicked
            // console.log('...', data.clientSecret)
            let after = () => {
              payWithCard(stripe, card, data.clientSecret);
            }
            // watch for order completion
            let watch_order_path = order_update_path + (orderNumber || 'f')
            firebaseInstance.database().ref(watch_order_path).on('value', (snap) => {
              let data = snap.val()
              if (data) {
                if (data.downloadFile) {
                  // show order complete
                  let downloadURI = function(uri, name) {
                    var link = document.createElement("a");
                    link.download = name;
                    link.href = uri;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    // delete link;
                  }
                  downloadURI(data.downloadFile)
                }

                if (data.completed) {
                  if (data.goToUrl) {
                    window.location = data.goToUrl
                  } else {
                    // show order complete
                    state.commit('AUTH.SET_ORDER_COMPLETE', {})
                  }
                }

              }
            })

            resolve({orderNumber, after})
          // });
        })
        .catch((error) => {
          console.log('error', error)
        });









      // // The items the customer wants to buy
      // var purchase = {
      //   items: [{ id: "xl-tshirt" }]
      // };
      // // Disable the button until we have Stripe set up on the page
      // document.querySelector("button").disabled = true;
      // fetch("http://localhost:4242/create-payment-intent", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(purchase)
      // })
      //   .then(function(result) {
      //     return result.json();
      //   })
      //   .then(function(data) {
      //     var elements = stripe.elements();
      //     var style = {
      //       base: {
      //         color: "#32325d",
      //         fontFamily: 'Arial, sans-serif',
      //         fontSmoothing: "antialiased",
      //         fontSize: "16px",
      //         "::placeholder": {
      //           color: "#32325d"
      //         }
      //       },
      //       invalid: {
      //         fontFamily: 'Arial, sans-serif',
      //         color: "#fa755a",
      //         iconColor: "#fa755a"
      //       }
      //     };
      //     var card = elements.create("card", { style: style });
      //     // Stripe injects an iframe into the DOM
      //     card.mount("#card-element");
      //     card.on("change", function (event) {
      //       // Disable the Pay button if there are no card details in the Element
      //       document.querySelector("button").disabled = event.empty;
      //       document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
      //     });
      //     var form = document.getElementById("payment-form");
      //     form.addEventListener("submit", function(event) {
      //       event.preventDefault();
      //       // Complete payment when the submit button is clicked
      //       payWithCard(stripe, card, data.clientSecret);
      //     });
      //   });





      // Calls stripe.confirmCardPayment
      // If the card requires authentication Stripe shows a pop-up modal to
      // prompt the user to enter authentication details without leaving your page.
      var payWithCard = function(stripe, card, clientSecret) {
        loading(true);
        stripe
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: card
            }
          })
          .then(function(result) {
            if (result.error) {
              // Show error to your customer
              showError(result.error.message);
            } else {
              // The payment succeeded!
              console.log('RESULT!', result)
              orderComplete(result.paymentIntent.id);
            }
          });
      };
      /* ------- UI helpers ------- */
      // Shows a success message when the payment is complete
      var orderComplete = function(paymentIntentId) {

        // get

        loading(false);
        document
          .querySelector(".result-message a")
          .setAttribute(
            "href",
            "https://dashboard.stripe.com/test/payments/" + paymentIntentId
          );
        document.querySelector(".result-message").classList.remove("hidden");
        document.querySelector("button").disabled = true;
      };
      // Show the customer the error from Stripe if their card fails to charge
      var showError = function(errorMsgText) {
        loading(false);
        var errorMsg = document.querySelector("#card-error");
        errorMsg.textContent = errorMsgText;
        setTimeout(function() {
          errorMsg.textContent = "";
        }, 4000);
      };
      // Show a spinner on payment submission
      var loading = function(isLoading) {
        if (isLoading) {
          // Disable the button and show a spinner
          document.querySelector("button").disabled = true;
          document.querySelector("#spinner").classList.remove("hidden");
          document.querySelector("#button-text").classList.add("hidden");
        } else {
          document.querySelector("button").disabled = false;
          document.querySelector("#spinner").classList.add("hidden");
          document.querySelector("#button-text").classList.remove("hidden");
        }
      };

    })
  },
  login: (state, item) => {
    console.log('item', item)
    login (item.email, item.password, state)
  },
  logout: (state, item) => {
    firebaseInstance.auth().signOut().then(() => {
      state.commit('AUTH.CLEAR_STATE', {})
      console.log('Signed out')
    }, (error) => {
      console.log('Error when logging out', error)
    })
  },
}

export default AUTH