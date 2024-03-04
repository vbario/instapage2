import router from '@/router'
import { firebase } from '@/util/firebase'
import { firebaseInstance } from '@/util/firebase'
import http from '@/util/http'
import axios from 'axios'
// let stripeKey = 'pk_live_51Je8m2I0NXyTXqSu5YYKVTw42hDzCWGOlKWGyEUUpWWUNMPnfN15sUxEMR8KwPvONvuWqZOgKrAFJqXZGUfWnj6800D9trFSFZ'
// test
// var stripe = Stripe(stripeKey)
var stripe = {}
// var stripe = {}
var connectId = 'ca_Kbn68u7RrJk45IAIkL5tLk38MmwcEQUY'
const docx2html=require("docx2html")


// prod
// var stripe = Stripe("pk_live_51Je8m2I0NXyTXqSu5YYKVTw42hDzCWGOlKWGyEUUpWWUNMPnfN15sUxEMR8KwPvONvuWqZOgKrAFJqXZGUfWnj6800D9trFSFZ");
// var connectId = 'ca_Kbn6zuRbwoytjDoEfRZKEVnehLJGojYt'

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
  // My Stripe Connect Id
  firebaseInstance.database().ref('userConnectIds/' + (uid || 'f')).on('value', (snap) => {
    let connectId = snap.val()
    console.log('connectId', connectId)
    if (connectId) {
      state.commit('AUTH.SET_CONNECT_ID', connectId)
    } else {
      state.commit('AUTH.SET_CONNECT_ID', connectId)
    }
    if (connectId && !connectId.verified) {
      // dispatch verification check
      var checkConnectOnboarding = firebase.functions().httpsCallable('checkConnectOnboarding')
      checkConnectOnboarding()
      .then(async (result) => {
        console.log('onboardingStatus', result)
        // var sanitizedMessage = result.data.text;
        // resolve(result)
      })
      .catch(async (error) => {
        // var code = error.code;
        // var message = error.message;
        // var details = error.details;
        // reject(error)
      })
    }
  })
  // let myProductsRef = 
  firebaseInstance.database().ref(my_products_path + (uid || 'failed')).on('value', async (snap) => {
    return new Promise(async (resolve, reject) => {
      let data = snap.val()
      if (data) {
     
      console.log('data', data)

      // for (let p in data) {
      //   let product = data[p]
      //   let productId = product.uniqueProductId

      //   let viewsRef = '/tracking/views/' + (productId || 'f')
      //   let _productViews = await firebaseInstance.database().ref(viewsRef).once('value')
      //   let productViews = _productViews.val()
      //   product.views = productViews

      //   let salesRef = '/tracking/sales/' + (productId || 'f')
      //   let _productSales = await firebaseInstance.database().ref(salesRef).once('value')
      //   let productSales = _productSales.val()
      //   product.sales = productSales
      //   data[p] = product
      // }

      // for (let p in data) {
      //   let product = data[p]
      //   let views = product.views || {}
      //   let sales = product.sales || {}
      //   let totalViewsForProduct = 0
      //   let totalSalesForProduct = 0

      //   for (let date in views) {
      //     let viewsOnThisDate = parseInt(views[date] ? views[date].totalCount : 0)
      //     let salesOnThisDate = parseInt(sales[date] ? sales[date].totalCount : 0)
      //     totalViewsForProduct += viewsOnThisDate
      //     totalSalesForProduct += salesOnThisDate
      //   }

      //   product.totalViews = totalViewsForProduct || 0
      //   product.totalSales = totalSalesForProduct || 0
      //   // data[p] = product
      // }

      console.log('====>', data)
        // let productId = item.productId
        // let fullPath = 'selectedGoogleSheets/' + selectedGoogleSheets
        // resolve(productViews)
        state.commit('AUTH.SET_MY_PRODUCTS', data)
      } else if (data === null) {
        state.commit('AUTH.CLEAR_MY_PRODUCTS', {})
      }
    })
  })
  // my inventory
  let inventoryRef = 'inventory/' + (uid || 'f')
  firebaseInstance.database().ref(inventoryRef).on('value', (snap) => {
    let data = snap.val()
    if (data) {
      console.log('inveotry data', data)
      state.commit('AUTH.SET_INVENTORY', data || {})
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
    state.commit('AUTH.SET_MY_INFO', {...data, loaded: true})
  })
  firebaseInstance.database().ref(customer_info_path2 + (uid || 'failed')).on('value', (snap) => {
    let data = snap.val() || {}
    console.log('my private customer info', data, data.type)
    state.commit('AUTH.SET_MY_PRIVATE_INFO', data)

    let pro = (data.type == 'pro') || (data.type == 'alpha')

    console.log('pro', pro)

    if (data) {
      if (pro) {
        state.commit('AUTH.SET_PLAN', {
          loaded: true,
          pro: true
        })
      } else if (data.type == 'cancelled') { // 2
        state.commit('AUTH.SET_PLAN', {
          loaded: true,
          pro: false,
          cancelled: true
        })
        if (
          (router.currentRoute.name !== 'LandingPage') &&
          (router.currentRoute.name !== 'LoginPage') &&
          (router.currentRoute.name !== 'DashboardPage')
        ) {
          // router.push('/plan')
        }
      } else { // 3
        state.commit('AUTH.SET_PLAN', {
          loaded: true,
          pro: false
        })
        console.log('ROUTE NAME', router.currentRoute.name)
        if (
          (router.currentRoute.name !== 'LandingPage') &&
          (router.currentRoute.name !== 'LoginPage')
        ) {
          // router.push('/plan')
        }
      }
    } else { // 3b
      state.commit('AUTH.SET_PLAN', {
        loaded: true,
        pro: false
      })
      if (
          (router.currentRoute.name !== 'LandingPage') &&
          (router.currentRoute.name !== 'LoginPage')
        ) {
        router.push('/plan')
      }
    }

  })
}

const getToken = async () => {
    return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      return idToken
    }).catch(function(error) {
      return false
    });
}

const login = async (email, password, state, then) => {
  return new Promise(async (resolve, reject) => {
  console.log('ep', email, password)
    var signIn = firebaseInstance.auth().signInWithEmailAndPassword(email, password)
    signIn.then((data) => {
      then && then()
      // go to Top
      window.scrollY = 0
      return resolve('ok')
    }).catch((error) => {
      console.log('Firebase Auth Error:', error)
      return resolve(error)
      state.commit('AUTH.SET_AUTH_ERROR', error)
    })
  })
}

const getProductDetails = async (productId, state) => {
  return new Promise(async (resolve, reject) => {
    let run = async () => {
      let user = firebase.auth().currentUser
      if (user) {
        let uid = firebase.auth().currentUser.uid
        let productDetailsRef = my_products_path + (uid || 'f') + '/' + productId
        console.log('productDetailsRef', productDetailsRef)
        let _productDetails = await firebaseInstance.database().ref(productDetailsRef).once('value')
        let productDetails = _productDetails.val()
        console.log('productDetails', productDetails)
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
let global_news_path = 'globalNews/'

/* SERVICES */
const AUTH = {
  setGlobalPopup: (state, item) => {
    state.commit('AUTH.SET_GLOBAL_POPUP', item)
  },
  setOnboardingPopup: (state, item) => {
    state.commit('AUTH.SET_ONBOARDING_POPUP', item)
  },
  clearMyCartForSeller: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let sellerId = item.sellerId

      if (!sellerId) {return false}

      let defaultCart = {
        items: [],
        address: {},
        selectedPayment: {},
        loaded: true
      }

      let finalItems = []

      let myCart = localStorage.getItem('pushableCart') || defaultCart
      myCart = JSON.parse(myCart)

      for (let i in myCart.items) {
        let item = myCart.items[i]
        console.log('==> item in cart', item)
        if (myCart.items[i].ownerId !== sellerId) {
          finalItems.push({...item})
        }
      }
      myCart.items = finalItems

      console.log('my new cart', myCart)
      localStorage.setItem('pushableCart', JSON.stringify(myCart))
      state.commit('AUTH.SET_CART', myCart)

      // var addASchedule = firebase.functions().httpsCallable('addASchedule');
      // addASchedule(item)
      // .then((result) => {
      //   resolve(result.data)
      // })
      // .catch((error) => {
      //   console.log('error addASchedule', error.data)
      //   resolve({message: 'Could not addASchedule.'})
      // });
    })
  },
  navigateFromMe: (state, item) => {
    let tryToGoToMyPage = () => {
      console.log('tryToGoToMyPage', state.getters['AUTH.myInfo'])
      let displayName = state.getters['AUTH.myInfo'] && state.getters['AUTH.myInfo'].displayName
      // let myUsername = state.getters['AUTH.myPrivateInfo'] && state.getters['AUTH.myPrivateInfo'].displayName
      if (displayName) {
        router.push('/' + displayName.displayName)
      } else {
        setTimeout(() => {
          tryToGoToMyPage()
        }, 500)
      }
    }
    tryToGoToMyPage()
  },
  addASchedule: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var addASchedule = firebase.functions().httpsCallable('addASchedule');
      addASchedule(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error addASchedule', error.data)
        resolve({message: 'Could not addASchedule.'})
      });
    })
  },
  saveSchedules: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var saveSchedules = firebase.functions().httpsCallable('saveSchedules');
      saveSchedules(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error saveSchedules', error.data)
        resolve({message: 'Could not saveSchedules.'})
      });
    })
  },
  submitEmail: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var submitEmail = firebase.functions().httpsCallable('submitEmail');
      submitEmail(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error submitEmail', error.data)
        resolve({message: 'Could not submitEmail.'})
      });
    })
  },
  testWritingToSheet: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var addRowToGoogleSheet = firebase.functions().httpsCallable('addRowToGoogleSheet');
      addRowToGoogleSheet(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error addRowToGoogleSheet', error.data)
        resolve({message: 'Could not addRowToGoogleSheet.'})
      });
    })
  },
  countLinkClick: (state, item) => {
    console.log('countLinkClick')
    return new Promise(async (resolve, reject) => {
      var countLinkClick = firebase.functions().httpsCallable('countLinkClick');
      countLinkClick(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error countStoreView', error.data)
        resolve({message: 'Could not countStoreView.'})
      });
    })
  },
  countStoreView: (state, item) => {
    console.log('countStoreView2')
    return new Promise(async (resolve, reject) => {
      var countStoreView = firebase.functions().httpsCallable('countStoreView');
      countStoreView()
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error countStoreView', error.data)
        resolve({message: 'Could not countStoreView.'})
      });
    })
  },
  setDefaultViewForMyStore: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var setDefaultViewForMyStore = firebase.functions().httpsCallable('setDefaultViewForMyStore');
      setDefaultViewForMyStore(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error setDefaultViewForMyStore', error.data)
        resolve({message: 'Could not setDefaultViewForMyStore.'})
      });
    })
  },
  addNewLink: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var addNewLink = firebase.functions().httpsCallable('addNewLink');
      addNewLink(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing addNewLink', error.data)
        resolve({message: 'Could not addNewLink.'})
      });
    })
  },
  saveLink: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var saveLink = firebase.functions().httpsCallable('saveLink');
      saveLink(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing saveLink', error.data)
        resolve({message: 'Could not saveLink.'})
      });
    })
  },
  saveTitle: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var saveTitle = firebase.functions().httpsCallable('saveTitle');
      saveTitle(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing savesaveTitleLink', error.data)
        resolve({message: 'Could not saveTitle.'})
      });
    })
  },
  deleteLink: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var deleteLink = firebase.functions().httpsCallable('deleteLink');
      deleteLink(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing deleteLink', error.data)
        resolve({message: 'Could not deleteLink.'})
      });
    })
  },
  joinMailingList: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var joinMailingList = firebase.functions().httpsCallable('joinMailingList');
      joinMailingList(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing joinMailingList', error.data)
        resolve({message: 'Could not joinMailingList.'})
      });
    })
  },
  sendMessge: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var sendMessge = firebase.functions().httpsCallable('sendMessge');
      sendMessge(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing sendMessge', error.data)
        resolve({message: 'Could not sendMessge.'})
      });
    })
  },
  addProductToStore: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var addProductToStore = firebase.functions().httpsCallable('addProductToStore');
      addProductToStore(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing addProductToStore', error.data)
        resolve({message: 'Could not addProductToStore.'})
      });
    })
  },
  addTextToStore: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var addTextToStore = firebase.functions().httpsCallable('addTextToStore');
      addTextToStore(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing addTextToStore', error.data)
        resolve({message: 'Could not addTextToStore.'})
      });
    })
  },
  setBackgroundFade: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var setBackgroundFade = firebase.functions().httpsCallable('setBackgroundFade');
      setBackgroundFade(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing setBackgroundFade', error.data)
        resolve({message: 'Could not setBackgroundFade.'})
      });
    })
  },
  setBackgroundImageBlur: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var setBackgroundImageBlur = firebase.functions().httpsCallable('setBackgroundImageBlur');
      setBackgroundImageBlur(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing setBackgroundImageBlur', error.data)
        resolve({message: 'Could not setBackgroundImageBlur.'})
      });
    })
  },
  setMyStoreTheme: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var setMyStoreTheme = firebase.functions().httpsCallable('setMyStoreTheme');
      setMyStoreTheme(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing setMyStoreTheme', error.data)
        resolve({message: 'Could not setMyStoreTheme.'})
      });
    })
  },
  setScheduleData: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var setScheduleData = firebase.functions().httpsCallable('setScheduleData');
      setScheduleData(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing setScheduleData', error.data)
        resolve({message: 'Could not setScheduleData.'})
      });
    })
  },
  moveDownItem: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var moveDownItem = firebase.functions().httpsCallable('moveDownItem');
      moveDownItem(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing moveDownItem', error.data)
        resolve({message: 'Could not moveDownItem.'})
      });
    })
  },
  moveUpItem: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var moveUpItem = firebase.functions().httpsCallable('moveUpItem');
      moveUpItem(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing moveUpItem', error.data)
        resolve({message: 'Could not moveUpItem.'})
      });
    })
  },
  moveItemFromXtoY: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var moveItemFromXtoY = firebase.functions().httpsCallable('moveItemFromXtoY');
      moveItemFromXtoY(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing moveItemFromXtoY', error.data)
        resolve({message: 'Could not moveItemFromXtoY.'})
      });
    })
  },
  moveLinkFromXtoY: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var moveLinkFromXtoY = firebase.functions().httpsCallable('moveLinkFromXtoY');
      moveLinkFromXtoY(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing moveLinkFromXtoY', error.data)
        resolve({message: 'Could not moveLinkFromXtoY.'})
      });
    })
  },
  addZone: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var addZone = firebase.functions().httpsCallable('addZone');
      addZone()
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing removeZone', error.data)
        resolve({message: 'Could not addZone.'})
      });
    })
  },
  addCountryToZone: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var addCountryToZone = firebase.functions().httpsCallable('addCountryToZone');
      addCountryToZone(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing addCountryToZone', error.data)
        resolve({message: 'Could not addCountryToZone.'})
      });
    })
  },
  removeCountryFromZone: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var removeCountryFromZone = firebase.functions().httpsCallable('removeCountryFromZone');
      removeCountryFromZone(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing removeCountryFromZone', error.data)
        resolve({message: 'Could not removeCountryFromZone.'})
      });
    })
  },
  setRowPrice: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var setRowPrice = firebase.functions().httpsCallable('setRowPrice');
      setRowPrice(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing setRowPrice', error.data)
        resolve({message: 'Could not setRowPrice.'})
      });
    })
  },
  addPriceRow: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var addPriceRow = firebase.functions().httpsCallable('addPriceRow');
      addPriceRow(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing addPriceRow', error.data)
        resolve({message: 'Could not addPriceRow.'})
      });
    })
  },
  removePriceRow: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var removePriceRow = firebase.functions().httpsCallable('removePriceRow');
      removePriceRow(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing removePriceRow', error.data)
        resolve({message: 'Could not removePriceRow.'})
      });
    })
  },
  removeZone: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var removeZone = firebase.functions().httpsCallable('removeZone');
      removeZone(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing removeZone', error.data)
        resolve({message: 'Could not removeZone.'})
      });
    })
  },
  removeItemFromStore: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var removeItemFromStore = firebase.functions().httpsCallable('removeItemFromStore');
      removeItemFromStore(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing removeItemFromStore', error.data)
        resolve({message: 'Could not removeItemFromStore.'})
      });
    })
  },
  archiveItemInStore: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var archiveItemInStore = firebase.functions().httpsCallable('archiveItemInStore');
      archiveItemInStore(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing archiveItemInStore', error.data)
        resolve({message: 'Could not archiveItemInStore.'})
      });
    })
  },
  addLinkToStore: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var addLinkToStore = firebase.functions().httpsCallable('addLinkToStore');
      addLinkToStore(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing addLinkToStore', error.data)
        resolve({message: 'Could not addLinkToStore.'})
      });
    })
  },
  registerPayBoxView: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var registerPayBoxView = firebase.functions().httpsCallable('registerPayBoxView');
      registerPayBoxView(item)
      .then((result) => {
        console.log('paybox view registered')
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error registerPayBoxView', error.data)
        resolve({message: 'Could not registerPayBoxView.'})
      });
    })
  },
  getShippingForProduct: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var getShippingForProduct = firebase.functions().httpsCallable('getShippingForProduct');
      getShippingForProduct(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error getShippingForProduct', error.data)
        resolve({message: 'Could not getShippingForProduct.'})
      });
    })
  },
  getShippingForOrder: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var getShippingForOrder = firebase.functions().httpsCallable('getShippingForOrder');
      getShippingForOrder(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error getShippingForOrder', error.data)
        resolve({message: 'Could not getShippingForOrder.'})
      });
    })
  },
  getShippingForCartOrder: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var getShippingForCartOrder = firebase.functions().httpsCallable('getShippingForCartOrder');
      getShippingForCartOrder(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error getShippingForCartOrder', error.data)
        resolve({message: 'Could not getShippingForCartOrder.'})
      });
    })
  },
  setGoogleSheetId: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var setGoogleSheetId = firebase.functions().httpsCallable('setGoogleSheetId');
      setGoogleSheetId(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error setGoogleSheetId', error.data)
        resolve({message: 'Could not setGoogleSheetId.'})
      });
    })
  },
  selectSheet: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var selectSheet = firebase.functions().httpsCallable('selectSheet');
      selectSheet(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error selectSheet', error.data)
        resolve({message: 'Could not selectSheet.'})
      });
    })
  },
  startConnectingGoogleSheet: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var startConnectingGoogleSheet = firebase.functions().httpsCallable('startConnectingGoogleSheet');
      startConnectingGoogleSheet(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error startConnectingGoogleSheet', error.data)
        resolve({message: 'Could not startConnectingGoogleSheet.'})
      });
    })
  },
  sendGoogleSheetsCode: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var sendGoogleSheetsCode = firebase.functions().httpsCallable('sendGoogleSheetsCode');
      sendGoogleSheetsCode(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error sendGoogleSheetsCode', error.data)
        resolve({message: 'Could not sendGoogleSheetsCode.'})
      });
    })
  },
  startOnboarding: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var startOnboarding = firebase.functions().httpsCallable('startOnboarding');
      startOnboarding(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error startOnboarding', error.data)
        resolve({message: 'Could not startOnboarding.'})
      });
    })
  },
  finishOnboarding: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var finishOnboarding = firebase.functions().httpsCallable('finishOnboarding');
      finishOnboarding(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error finishOnboarding', error.data)
        resolve({message: 'Could not finishOnboarding.'})
      });
    })
  },
  addANewShipper: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var addANewShipper = firebase.functions().httpsCallable('addANewShipper');
      addANewShipper(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error addANewShipper', error.data)
        resolve({message: 'Could not addANewShipper.'})
      });
    })
  },
  activateMyStore: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var activateMyStore = firebase.functions().httpsCallable('activateMyStore');
      activateMyStore(item)
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        console.log('error activateMyStore', error.data)
        resolve({message: 'Could not activateMyStore.'})
      });
    })
  },
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
  getPage: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let fullPath = 'htmlStrings/' + item
      let _pageHtml = await firebaseInstance.database().ref(fullPath).once('value')
      let pageHtml = _pageHtml.val()

      // let fulfillmentsAsArray = Object.keys(myFulfillments || {}).map((v, i) => {
      //   return {...myFulfillments[v], orderId: v}
      // })

      resolve(pageHtml)
    })
  },
  getMySheetsData: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let fullPath = 'selectedGoogleSheets/' + uid
      let _shippingProviders = await firebaseInstance.database().ref(fullPath).once('value')
      let shippingProviders = _shippingProviders.val()

      // let fulfillmentsAsArray = Object.keys(myFulfillments || {}).map((v, i) => {
      //   return {...myFulfillments[v], orderId: v}
      // })

      resolve(shippingProviders)
    })
  },
  getBlog: (state, item) => {
    let sellerUsername = item.username.toLowerCase()
    return new Promise(async (resolve, reject) => {
      let snap = await firebaseInstance.database().ref('usernames/' + (sellerUsername || 'failed')).once('value')
      let sellerId = snap.val()
      let fullPath = 'blog/' + sellerId
      let _blog = await firebaseInstance.database().ref(fullPath).once('value')
      let blog = _blog.val()
      return resolve(blog)
    })
  },
  // getPage: (state, item) => {
  //   let sellerUsername = item.username.toLowerCase()
  //   return new Promise(async (resolve, reject) => {
  //     let snap = await firebaseInstance.database().ref('usernames/' + (sellerUsername || 'failed')).once('value')
  //     let sellerId = snap.val()
  //     let fullPath = 'pages/' + sellerId + '/' + item.pageid
  //     let _page = await firebaseInstance.database().ref(fullPath).once('value')
  //     let page = _page.val()
  //     return resolve(page)
  //   })
  // },
  getMySchedules: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let fullPath = 'schedules/' + (uid || 'f')
      let _schedules = await firebaseInstance.database().ref(fullPath).once('value')
      let schedules = _schedules.val()
      resolve(schedules)
    })
  },
  getWork: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let fullPath = 'workHistory'
      firebaseInstance.database().ref(fullPath).on('value', (res) => {
        let _res = res.val()
        let array = []
        for (let r in _res) {
          array.push({
            time: r,
            status: _res[r]
          })
        }
        state.commit('AUTH.SET_WORK', array)
      })
    })
  },
  getUserSchedule: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let path_schedule = 'schedules/' + (item.user || 'f') + '/' + (item.scheduleId || 'f')
      let _schedule = await firebaseInstance.database().ref(path_schedule).once('value')
      let schedule = _schedule.val()
      console.log('schedule', schedule)
      resolve({
        schedule
      })
    })
  },
  getUserBookings: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let path_bookings = 'bookings/' + (item.user || 'f')
      let _bookings = await firebaseInstance.database().ref(path_bookings).once('value')
      let bookings = _bookings.val()
      console.log('bookings', bookings)
      resolve({
        bookings
      })
    })
  },
  getMyShippingRates: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let path_zones = 'shippingZones/' + uid
      let _zones = await firebaseInstance.database().ref(path_zones).once('value')
      let zones = _zones.val()

      console.log('ZONES', zones)

      let path_rate_providers = 'shippingRateProviders/' + uid
      let _rate_providers = await firebaseInstance.database().ref(path_rate_providers).once('value')
      let rate_providers = _rate_providers.val()
      resolve({
        providers: rate_providers || {},
        zones: zones || {}
      })
    })
  },
  getMyShippingProviders: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let fullPath = 'shippingProvidersByUser/' + uid
      let _shippingProviders = await firebaseInstance.database().ref(fullPath).once('value')
      let shippingProviders = _shippingProviders.val()

      // let fulfillmentsAsArray = Object.keys(myFulfillments || {}).map((v, i) => {
      //   return {...myFulfillments[v], orderId: v}
      // })

      resolve(shippingProviders)
    })
  },
  getAllSales: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let s_path = '/fulfillmentsByUser'
      let _s = await firebaseInstance.database().ref(s_path).once('value')
      let s = _s.val() || {}
      return resolve(s)
    })
  },
  getCompletedOrders: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let s_path = '/completedOrdersByUser'
      let _s = await firebaseInstance.database().ref(s_path).once('value')
      let s = _s.val() || {}
      return resolve(s)
    })
  },
  getAllEmailsCollected: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let s_path = '/emailsCollected'
      let _s = await firebaseInstance.database().ref(s_path).once('value')
      let s = _s.val() || {}
      return resolve(s)
    })
  },
  getAllStores: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let s_path = '/stores'
      let _s = await firebaseInstance.database().ref(s_path).once('value')
      let s = _s.val() || {}
      return resolve(s)
    })
  },
  getAllProducts: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let s_path = '/myProducts'
      let _s = await firebaseInstance.database().ref(s_path).once('value')
      let s = _s.val() || {}
      return resolve(s)
    })
  },
  getAllUsernames: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let s_path = '/usernames'
      let _s = await firebaseInstance.database().ref(s_path).once('value')
      let s = _s.val() || {}
      return resolve(s)
    })
  },
  getAllConnectIds: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let s_path = '/userConnectIds'
      let _s = await firebaseInstance.database().ref(s_path).once('value')
      let s = _s.val() || {}
      return resolve(s)
    })
  },
  getAllUserEmails: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var getAllUsers = firebase.functions().httpsCallable('getAllUsers');
      getAllUsers()
      .then((result) => {
        console.log('success getAllUsers', result)
        resolve(result)
      })
      .catch((error) => {
        console.log('error getAllUsers', error)
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

      let fulfillmentsAsArray = Object.keys(myFulfillments || {}).map((v, i) => {
        return {...myFulfillments[v], orderId: v}
      })

      resolve(fulfillmentsAsArray)
    })
  },
  getMyNews: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      // let my_fulfillments_path = global_news_path
      let _globalNews = await firebaseInstance.database().ref(global_news_path).once('value')
      let globalNews = _globalNews.val()

      let globalNewsArray = Object.keys(globalNews).map((v,i) => {
        return {
          ...globalNews[v], orderId: v
        }
      })

      resolve(globalNewsArray)
    })
  },
  getMyContactFormMessages: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let data = item
      let _contactFormMessages = await firebaseInstance.database().ref('contactFormMessages/' + uid).once('value')
      let contactFormMessages = _contactFormMessages.val()
      return resolve(contactFormMessages || {})
    })
  },
  getMyAudience: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let data = item
      let _myAudience = await firebaseInstance.database().ref('allSales/' + uid).once('value')
      let myAudience = _myAudience.val()
      let _emailsCollected = await firebaseInstance.database().ref('emailsCollected/' + uid).once('value')
      let emailsCollected = _emailsCollected.val()
      let _mailingListSignups = await firebaseInstance.database().ref('mailingLists/' + uid).once('value')
      let mailingListSignups = _mailingListSignups.val()

      console.log('emailsCollected/' + uid, emailsCollected)
      return resolve({myAudience, emailsCollected, mailingListSignups} || {})
    })
  },
  getMyBalance: (state, item) => {
    return new Promise(async (resolve, reject) => {
      let data = item
      var getMyBalance = firebase.functions().httpsCallable('getMyBalance');
      getMyBalance(data)
      .then((result) => {
        console.log('success getMyBalance', result)
        resolve(result)
      })
      .catch((error) => {
        console.log('error', error)
      });
    })
  },
  startConfigureZones: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var startConfigureZones = firebase.functions().httpsCallable('startConfigureZones');
      startConfigureZones()
      .then((result) => {
        console.log('success startConfigureZones', result)
        resolve(result)
      })
      .catch((error) => {
        console.log('error', error)
      });
    })
  },
  getMyStoreClickStats: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let _storeItemClicks = await firebaseInstance.database().ref('storeItemClicks/' + (uid || 'f')).once('value')
      let storeItemClicks = _storeItemClicks.val()
      return resolve(storeItemClicks || {})
    })
  },
  getMyStoreStats: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let _myStoreViews = await firebaseInstance.database().ref('storeViews/' + (uid || 'f')).once('value')
      let myStoreViews = _myStoreViews.val()
      return resolve(myStoreViews || {})
    })
  },
  getMyPublicStore: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let _myStore = await firebaseInstance.database().ref('stores/' + (uid || 'f')).once('value')
      let myStore = _myStore.val()
      return resolve(myStore || {})
    })
  },
  getMyIncome: (state, item) => {
    var user = firebase.auth().currentUser
    let uid = user.uid
    return new Promise(async (resolve, reject) => {
      let my_orders_path = completed_orders_by_user_path + uid
      let _income = await firebaseInstance.database().ref(my_orders_path).once('value')
      let myIncome = _income.val()

      let myIncomeAsArray = Object.keys(myIncome || {}).map((v, i) => {
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

      let user = item.user 
      let uniqueid = item.uniqueid 


      let productDetailsRef = public_products_path + '/' + uniqueid

      console.log('user===>', user)

      let _productDetails = await firebaseInstance.database().ref(productDetailsRef).once('value')
      let productDetails = _productDetails.val()
      let ownerId = productDetails.ownerId
      
      let userPublicInfoRef = customer_info_path + ownerId
      let _userInfo = await firebaseInstance.database().ref(userPublicInfoRef).once('value')
      let userInfo = _userInfo.val() || {}
      productDetails = {...productDetails, userInfo}
      console.log('productDetails', productDetails)

      let displayName = userInfo.displayName && userInfo.displayName.displayName
      console.log('displayName', displayName.toLowerCase())
      console.log('user', user)
      if (!user || (displayName.toLowerCase() == user.toLowerCase())) {
        resolve(productDetails)
      } else {
        resolve({})
      }

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
        console.log('saved...')
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
  hidePushableBranding: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var user = firebase.auth().currentUser
      let uid = user.uid
      let hidePushableBranding = item.hidePushableBranding
      console.log('***', hidePushableBranding)

      let run = async () => {
        await firebaseInstance.database().ref('stores/' + (uid || 'f') + '/hidePushableBranding').set(hidePushableBranding)
        return resolve({
          message: 'Set hide pushable branding'
        })
      }

      try {
        await run()
      } catch (error) {
        reject ('Set hide pushable branding: error', error)
      }

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
  uploadedCustomLinkImage: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var user = firebase.auth().currentUser
      let uid = user.uid
      var user = firebase.auth().currentUser
      let file = item.file.target.files[0]
      var extension = file.name
      console.log('file stuff', file, extension)
      extension = extension.substr(extension.lastIndexOf('.'), extension.length)
      // let productId = item.productId

      let run = async () => {
        let snapshot = await firebaseInstance.storage().ref('uploadedCustomLinkImage').child(uid).child(file.name).put(file)
        let url = await firebaseInstance.storage().ref('uploadedCustomLinkImage').child(uid).child(file.name).getDownloadURL()

        console.log('==>', 'customer_info/public/' + (uid || 'f') +'/profileImageUrl')

        // await firebaseInstance.database().ref('customer_info/public/' + (uid || 'f') +'/profileImageUrl').update({profileImageUrl: url})

        console.log('uploadedCustomLinkImage uploaded to url:', url)

        return resolve({
          message: 'Image uploaded',
          url
        })
      }

      try {
        await run()
      } catch (error) {
        console.log('error', error)
        reject ('Image upload error', error)
      }

    })
  },
  uploadedPhotoImage: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var user = firebase.auth().currentUser
      let uid = user.uid
      var user = firebase.auth().currentUser
      let file = item.file.target.files[0]
      var extension = file.name
      console.log('file stuff', file, extension)
      extension = extension.substr(extension.lastIndexOf('.'), extension.length)
      // let productId = item.productId

      let run = async () => {
        let snapshot = await firebaseInstance.storage().ref('userProfileImages').child(uid).child(file.name).put(file)
        let url = await firebaseInstance.storage().ref('userProfileImages').child(uid).child(file.name).getDownloadURL()

        console.log('==>', 'customer_info/public/' + (uid || 'f') +'/profileImageUrl')

        await firebaseInstance.database().ref('customer_info/public/' + (uid || 'f') +'/profileImageUrl').update({profileImageUrl: url})

        console.log('userProfileImages uploaded to url:', url)

        return resolve({
          message: 'Image uploaded',
          url
        })
      }

      try {
        await run()
      } catch (error) {
        console.log('error', error)
        reject ('Image upload error', error)
      }

    })
  },
  uploadBannerImage: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var user = firebase.auth().currentUser
      let uid = user.uid
      let file = item.file.target.files[0]
      var extension = file.name
      console.log('file stuff', file, extension)
      extension = extension.substr(extension.lastIndexOf('.'), extension.length)
      // let productId = item.productId

      let run = async () => {
        let snapshot = await firebaseInstance.storage().ref('storeBannerImages').child(uid).child(file.name).put(file)
        let url = await firebaseInstance.storage().ref('storeBannerImages').child(uid).child(file.name).getDownloadURL()

        console.log('==>', 'stores/' + (uid || 'f') + '/banner', uid, url)

        await firebaseInstance.database().ref('stores/' + (uid || 'f') + '/banner').update({url})

        console.log('storeBannerImage uploaded to url:', url)

        return resolve({
          message: 'Image uploaded',
          url
        })
      }

      try {
        await run()
      } catch (error) {
        reject ('Image upload error', error)
      }

    })
  },
  setBannerImage: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var user = firebase.auth().currentUser
      let uid = user.uid
      let url = item.url
      let crop = item.crop

      let run = async () => {
        await firebaseInstance.database().ref('stores/' + (uid || 'f') + '/banner').update({url, crop})
        return resolve({
          message: 'Image uploaded',
          url
        })
      }

      try {
        await run()
      } catch (error) {
        reject ('Image upload error', error)
      }

    })
  },
  selectBrandColor: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var user = firebase.auth().currentUser
      let uid = user.uid
      // let url = item.url
      // let crop = item.crop

      let update = {
        brandColor: item.brandColor,
        useCustomBrandColor: item.useCustomBrandColor
      }

      console.log('updating', item.brandColor, item.useCustomBrandColor || false)

      let run = async () => {
        await firebaseInstance.database().ref('stores/' + (uid || 'f') + '/brandColor').set(item.brandColor)
        await firebaseInstance.database().ref('stores/' + (uid || 'f') + '/useCustomBrandColor').set(item.useCustomBrandColor || false)

        return resolve({
          message: 'Updated brand color'
        })
      }

      try {
        await run()
      } catch (error) {
        console.log('error', error)
        reject ('Update brand color error', error)
      }

    })
  },
  uploadPublicImage: (state, item) => {
    return new Promise(async (resolve, reject) => {

      var user = firebase.auth().currentUser
      let uid = user.uid
      let file = item.file
      var extension = file.name
      extension = extension.substr(extension.lastIndexOf('.'), extension.length)
      // let productId = item.productId

      let run = async () => {
        let snapshot = await firebaseInstance.storage().ref('userPublicImages').child(uid).child(file.name).put(file)
        let url = await firebaseInstance.storage().ref('userPublicImages').child(uid).child(file.name).getDownloadURL()
        // await firebaseInstance.database().ref('/app/user_public_info/' + uid + '/profilePic').set(url)
        console.log('url', url)

        return resolve({
          message: 'Image uploaded',
          url
        })
      }

      try {
        await run()
      } catch (error) {
        reject ('Image upload error', error)
      }

    })
  },
  uploadProfileImage: (state, item) => {
    return new Promise(async (resolve, reject) => {

      var user = firebase.auth().currentUser || {}
      let uid = user.uid || 'noUid'
      let file = item.file
      var extension = file.name
      extension = extension.substr(extension.lastIndexOf('.'), extension.length)
      // let productId = item.productId

      let el = document.getElementById('ooo')

      let htmlString = await docx2html(file, {container: el})
      let stringFull = htmlString.toString()

      var uploadHtml = firebase.functions().httpsCallable('uploadHtml')
      uploadHtml({htmlString: stringFull})
      .then(async (result) => {
        return resolve({result, htmlString: stringFull})
      })
      .catch(async (error) => {
        console.log('uploadHtml error', error)
        return reject(error)
      })
      

      // let run = async () => {
      //   let snapshot = await firebaseInstance.storage().ref('userProfileImages').child(uid).child(file.name).put(file)
      //   let url = await firebaseInstance.storage().ref('userProfileImages').child(uid).child(file.name).getDownloadURL()
      //   // await firebaseInstance.database().ref('/app/user_public_info/' + uid + '/profilePic').set(url)
      //   console.log('url', url)

      //   return resolve({
      //     message: 'Image uploaded',
      //     url
      //   })
      // }

    })
  },
  getNewPageId: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var getNewPageId = firebase.functions().httpsCallable('getNewPageId')
      getNewPageId({})
      .then(async (result) => {
        return resolve(result)
      })
      .catch(async (error) => {
        console.log('getNewPageId error', error)
        return reject(error)
      })
    })
  },
  publishPage: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var publishPage = firebase.functions().httpsCallable('publishPage')
      publishPage(item)
      .then(async (result) => {
        return resolve(result)
      })
      .catch(async (error) => {
        console.log('publishPage error', error)
        return reject(error)
      })
    })
  },
  unpublishPage: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var unpublishPage = firebase.functions().httpsCallable('unpublishPage')
      unpublishPage(item)
      .then(async (result) => {
        return resolve(result)
      })
      .catch(async (error) => {
        console.log('unpublishPage error', error)
        return reject(error)
      })
    })
  },
  savePage: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var savePage = firebase.functions().httpsCallable('savePage')
      savePage(item)
      .then(async (result) => {
        return resolve(result)
      })
      .catch(async (error) => {
        console.log('savePage error', error)
        return reject(error)
      })
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
    console.log('setFulfillmentMenu', item)
    state.commit('AUTH.SET_DIGITAL_ORDER_POPUP', item)
    if (item) {
      window.scroll(0, 0)
    }
  },
  mountCardForPlan: (state, item) => {
    return new Promise(async (resolve, reject) => {
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
      let after = (run) => {
        console.log('run', run)
        if (run) {
          console.log('card=>', card.id, run)
          stripe.createToken(card).then(async (result) => {
            if (result.error) {
              // Show error in your UI.
            } else {
              // Send the token to your server or directly use it
              console.log('card token', result)
              // addCardToCustomer(result.token);
              payWithCard(stripe, result.token);
            }
          });
        }
      }
      let payWithCard = (stripe, card, clientSecret) => {
        // loading(true)
        console.log('paying with card')
        var checkout = firebase.functions().httpsCallable('checkout');
          checkout({card})
          .then(async (result) => {
            // Read result of the Cloud Function.
            // var sanitizedMessage = result.data.text;
            // var sanitizedMessage = result;
            resolve(result)

            if (result.data && result.data.status == 200) {
              let tryToGoToMyPage = () => {
                let myUsername = state.getters['AUTH.myPrivateInfo'] && state.getters['AUTH.myPrivateInfo'].displayName
                if (myUsername) {
                  router.push('/' + myUsername.displayName)
                } else {
                  setTimeout(() => {
                    tryToGoToMyPage()
                  }, 500)
                }
              }
              tryToGoToMyPage()
              // router.push('/me')
            } else {
            }
            console.log('result', result)
            
            state.commit('AUTH.SET_AUTH_ERROR', {message: result.data.message})
            return resolve(result)
          })
          .catch(async (error) => {
            console.log('error', error)
            return reject(error)
          });
      };

      resolve({test: 1, after})
    })
  },
  resetAuthError: (state, item) => {
    state.commit('AUTH.SET_AUTH_ERROR', {})
  },
  checkout: (state, item) => {
    console.log('checkout', item)
    // return false
    return new Promise(async (resolve, reject) => {
      var exp_month = item.date.substr(0,2)
      var exp_year = item.date.substr(3,2)
      var exp_year = '20' + exp_year

      const data = item
      let ccData = {
            number: data.number, // 4242424242424242
            exp_month, // 12
            exp_year, // 2020
            cvc: data.cvv// 123
          }
      let ccOwner = {
        address : {
          city: data.addCCCity,
          country: data.addCCCountry,
          line1: data.addCCAddress,
          line2: data.addCCAddress2,
          postal_code: data.addCCPostalCode,
          state: data.addCCProvince,
        },
        name: data.addCCName || 'Test'
      }

      let _data = {
        password: item.password,
        createAccount: false,
        ccData,
        ccOwner,
        sourceid: 123,
        otherEmail: item.otherEmail,
        cart: {},
      }

      stripe.createPaymentMethod({
        type: 'card',
        card: ccData,
      }).then(function(result2) {
        if (result2.error) {
          // Show error to your customer
          console.log(result2.error.message);
        } else {
          // Send paymentMethod.id to your server
          // addPaymentMethodToCustomer(result.paymentMethod.id);
          var checkout = firebase.functions().httpsCallable('checkout');
          checkout({..._data, sourceId: result.paymentMethod.id})
          .then(async (result) => {
            // Read result of the Cloud Function.
            // var sanitizedMessage = result.data.text;
            // var sanitizedMessage = result;
            resolve(result)

            if (result.data && result.data.status == 400) {
              // state.commit('AUTH.SET_AUTH_ERROR', {message: result.data.message})
            } else {
              // state.commit('AUTH.CLEAR_AUTH_ERROR', {})
            }
            console.log('result', result)
          })
          .catch(async (error) => {
            // Getting the Error details.
            reject(error)
            console.log('error', error)
            // state.commit('AUTH.SET_AUTH_ERROR', {message: error.message})
            // var code = error.code;
            // var message = error.message;
            // var details = error.details;
            // ...
          });
        }
      });

      console.log('sending', _data)

    })
  },
  authStateChange: (state, item) => {
    firebaseInstance.auth().onAuthStateChanged(user => {
      let noPushPaths = [
        '/',
        '/login',
        '/logout',
        '/pay',
        '/plan',
        '/linkinbio',
        '/privacy',
        '/terms',
        '/start'
      ]
      // let defaultCart = {
      //   items: [],
      //   address: {},
      //   selectedPayment: {},
      //   loaded: true
      // }

      // // localStorage.getItem('pushableCart')
      // let getMyCart = async () => {
      //   let myCart = localStorage.getItem('pushableCart') || defaultCart
      //   console.log('GET MY CART => currentRoute =>', router.currentRoute)
      //   if (router.currentRoute.name == 'LinkInBioPage') {
      //     // only keep items for current seller
      //     let finalItems = []
      //     let sellerUsername = router.currentRoute.params.user
      //     // let sellerUid = 'd0d7CkG3XVZx99gZXkOxQrhjX8P2'
      //     console.log('path', 'usernames/' + (sellerUsername || 'failed'))
      //     let snap = await firebaseInstance.database().ref('usernames/' + (sellerUsername || 'failed').toLowerCase()).once('value')
      //     let sellerUid = snap.val()
      //     console.log('sellerUid', sellerUid)
      //     console.log('myCart', myCart)

      //     myCart = JSON.parse(myCart)
      //     for (let i in myCart.items) {
      //       let item = myCart.items[i]
      //       console.log('==> item in cart', item)
      //       if (myCart.items[i].ownerId == sellerUid) {
      //         finalItems.push({...item, cartIndex: i})
      //       }
      //     }
      //     myCart.items = finalItems
      //   }
      //   state.commit('AUTH.SET_CART', myCart)
      //   console.log('myCart (no user):')
      //   console.log(myCart)
      // }
      
      if (user) {
        var userAction = firebase.functions().httpsCallable('userAction')
        userAction({action: 'any'})
        console.log("AUTH status: logged in", user.uid, router.currentRoute.path)
        // if ((noPushPaths.indexOf(router.currentRoute.path) == -1) &&
        //   (router.currentRoute.name !== 'PayPage') &&
        //   (router.currentRoute.name !== 'LinkInBioPage')
        // ) {
        //   // router.push('/me')
        // }

        // if (router.currentRoute.name == 'StartPage') {
        //   let tryToGoToMyPage = () => {
        //     let myUsername = state.getters['AUTH.myPrivateInfo'] && state.getters['AUTH.myPrivateInfo'].displayName
        //     if (myUsername) {
        //       // router.push('/' + myUsername.displayName)
        //     } else {
        //       setTimeout(() => {
        //         // tryToGoToMyPage()
        //       }, 500)
        //     }
        //   }
        //   tryToGoToMyPage()
        // }
        console.log('user', user)
        state.commit('AUTH.CLEAR_AUTH_ERROR', {})
        state.commit('AUTH.SET_UID', user.uid)
        state.commit('AUTH.SET_EMAIL', user.email)

        // watchMyData(state, user.uid)
        let getMyPages = async () => {
          let _myPages = await firebaseInstance.database().ref('/myHtmlPages/' + (user.uid || 'f')).once('value')
          let myPages = _myPages.val() || {}
          state.commit('AUTH.SET_MY_PAGES', myPages)
          console.log('myPages (user):', myPages)
        }
        getMyPages()
      } else {
        console.log("AUTH status: not logged in.", router.currentRoute.name)
        if ((router.currentRoute.name == 'PayPage') || 
            (router.currentRoute.name == 'LinkInBioPage') ||
            (router.currentRoute.name == 'PlansPage')
          ) {
          if (router.currentRoute.name == 'LinkInBioPage') {
            // let getMyCart = async () => {
            //   let myCart = localStorage.getItem('pushableCart') || defaultCart
            //   state.commit('AUTH.SET_CART', JSON.parse(myCart))
            //   console.log('myCart (no user):')
            //   console.log(JSON.parse(myCart))
            // }
            // getMyCart()
          }
        } else if (noPushPaths.indexOf(router.currentRoute.path) < 0) {
          // router.push('/')
        }
      }
    });
  },
  reduceCartItemQuantity: (state, item) => {
    let index = item.i
    if (!index && !(index === 0)) {
      return false
    }
    return new Promise(async (resolve, reject) => {
      // let user = firebase.auth().currentUser
      // if (user) {
        // let uid = firebase.auth().currentUser.uid
        // var addToCart = firebase.functions().httpsCallable('addToCart')
        // addToCart(item.orderDetails)
        // .then((data) => {
        //   return resolve('ok')
        // })
        // .catch((error) => {
        //   return reject('no')
        // })
      // } else {
      let defaultCart = {
        items: [],
        address: {},
        selectedPayment: {},
        loaded: true
      }
      let myCart = localStorage.getItem('pushableCart') ? JSON.parse(localStorage.getItem('pushableCart')) : defaultCart
      let quantity = myCart.items[index].newItemQuantity
      if (!quantity || (quantity == 1)) {
        myCart.items.splice(index, 1)
      } else {
        myCart.items[index].newItemQuantity = myCart.items[index].newItemQuantity - 1
      }
      
      localStorage.setItem('pushableCart', JSON.stringify(myCart))
      // only keep items for current seller
      let finalItems = []
      let sellerUsername = router.currentRoute.params.user
      // let sellerUid = 'd0d7CkG3XVZx99gZXkOxQrhjX8P2'
      console.log('path', 'usernames/' + (sellerUsername || 'failed'))
      let snap = await firebaseInstance.database().ref('usernames/' + (sellerUsername || 'failed').toLowerCase()).once('value')
      let sellerUid = snap.val()
      console.log('sellerUid', sellerUid)

      // myCart = JSON.parse(myCart)
      for (let i in myCart.items) {
        let item = myCart.items[i]
        console.log('==> item in cart', item)
        if (myCart.items[i].ownerId == sellerUid) {
          finalItems.push({...item, cartIndex: i})
        }
      }
      myCart.items = finalItems
      state.commit('AUTH.SET_CART', myCart)
      return resolve('ok')
      // }

      // state.commit('AUTH.SHOW_HEADER_SHOP', item)
    })
  },
  increaseCartItemQuantity: (state, item) => {
    let index = item.i
    if (!index && !(index === 0)) {
      return false
    }
    return new Promise(async (resolve, reject) => {
      // let user = firebase.auth().currentUser
      // if (user) {
        // let uid = firebase.auth().currentUser.uid
        // var addToCart = firebase.functions().httpsCallable('addToCart')
        // addToCart(item.orderDetails)
        // .then((data) => {
        //   return resolve('ok')
        // })
        // .catch((error) => {
        //   return reject('no')
        // })
      // } else {
      let defaultCart = {
        items: [],
        address: {},
        selectedPayment: {},
        loaded: true
      }
      let myCart = localStorage.getItem('pushableCart') ? JSON.parse(localStorage.getItem('pushableCart')) : defaultCart
      myCart.items[index].newItemQuantity = (myCart.items[index].newItemQuantity || 1) + 1
      
      localStorage.setItem('pushableCart', JSON.stringify(myCart))
      // only keep items for current seller
      let finalItems = []
      let sellerUsername = router.currentRoute.params.user
      // let sellerUid = 'd0d7CkG3XVZx99gZXkOxQrhjX8P2'
      console.log('path', 'usernames/' + (sellerUsername || 'failed'))
      let snap = await firebaseInstance.database().ref('usernames/' + (sellerUsername || 'failed').toLowerCase()).once('value')
      let sellerUid = snap.val()
      console.log('sellerUid', sellerUid)

      // myCart = JSON.parse(myCart)
      for (let i in myCart.items) {
        let item = myCart.items[i]
        console.log('==> item in cart', item)
        if (myCart.items[i].ownerId == sellerUid) {
          finalItems.push({...item, cartIndex: i})
        }
      }
      myCart.items = finalItems
      state.commit('AUTH.SET_CART', myCart)
      return resolve('ok')
      // }

      // state.commit('AUTH.SHOW_HEADER_SHOP', item)
    })
  },
  addToCart: (state, item) => {
    return new Promise(async (resolve, reject) => {
      // let user = firebase.auth().currentUser
      // if (user) {
      //   let uid = firebase.auth().currentUser.uid
      //   var addToCart = firebase.functions().httpsCallable('addToCart')
      //   addToCart(item.orderDetails)
      //   .then((data) => {
      //     return resolve('ok')
      //   })
      //   .catch((error) => {
      //     return reject('no')
      //   })
      // } else {
      let defaultCart = {
        items: [],
        address: {},
        selectedPayment: {},
        loaded: true
      }
      let myCart = localStorage.getItem('pushableCart') ? JSON.parse(localStorage.getItem('pushableCart')) : defaultCart
      if (!myCart.items) {
        myCart = defaultCart
      }

      let itemExists = false
      let itemIndex = false
      let newQuantity = item.newItemQuantity

      for (let i in myCart.items) {
        let _item = myCart.items[i]
        if (
            item.productId == _item.productId &&
            item.newItemSize == _item.newItemSize
          ) {
          itemExists = true
          itemIndex = i 
          break
        }
      }

      if (itemExists) {
        myCart.items[itemIndex].newItemQuantity = (myCart.items[itemIndex].newItemQuantity || 1) + (parseInt(newQuantity) || 1)
      } else {
        myCart.items.push(item)
      }
      localStorage.setItem('pushableCart', JSON.stringify(myCart))
      // only keep items for current seller
      let finalItems = []
      let sellerUsername = router.currentRoute.params.user
      // let sellerUid = 'd0d7CkG3XVZx99gZXkOxQrhjX8P2'
      console.log('path', 'usernames/' + (sellerUsername || 'failed'))
      let snap = await firebaseInstance.database().ref('usernames/' + (sellerUsername || 'failed').toLowerCase()).once('value')
      let sellerUid = snap.val()
      console.log('sellerUid', sellerUid)

      // myCart = JSON.parse(myCart)
      for (let i in myCart.items) {
        let item = myCart.items[i]
        console.log('==> item in cart', item)
        if (myCart.items[i].ownerId == sellerUid) {
          finalItems.push({...item, cartIndex: i})
        }
      }
      myCart.items = finalItems
      state.commit('AUTH.SET_CART', myCart)
      return resolve('ok')
      // }

      // state.commit('AUTH.SHOW_HEADER_SHOP', item)
    })
  },
  showHeaderShop: (state, item) => {
    state.commit('AUTH.SHOW_HEADER_SHOP', item)
  },
  resetMyPassword: (state, item) => {
    let emailAddress = item.email
    return new Promise(async (resolve, reject) => {
      firebaseInstance.auth().sendPasswordResetEmail(emailAddress).then(async () => {
        console.log('Password reset email sent.')
        return resolve('ok')
      }).catch(async (error) => {
        console.error('Error sending password reset email:', error)
        return resolve({error})
      })
    })
  },
  updateInventoryCount: (state, item) => {
    var updateInventoryCount = firebase.functions().httpsCallable('updateInventoryCount')
    updateInventoryCount(item)
  },
  getMyPages: (state, item) => {
    console.log('=> getMyPages')
    let getMyPages = async () => {
      console.log('=> getMyPages 2')
      let uid = firebase.auth().currentUser.uid
      let _myPages = await firebaseInstance.database().ref('/myHtmlPages/' + (uid || 'f')).once('value')
      let myPages = _myPages.val() || {}
      console.log('myPages (user):', myPages)
      state.commit('AUTH.SET_MY_PAGES', myPages)
    }
    getMyPages()
  },
  setPreOrderDetailsAndPay: (state, item) => {

    return new Promise(async (resolve, reject) => {
      var setPreOrderDetails = firebase.functions().httpsCallable('setPreOrderDetails')
      setPreOrderDetails(item.orderDetails)
      .then(async (_data) => {
        let data = _data.data
        let orderId = data.orderId
        let status = data.status
        console.log('data', data)
        console.log('orderId', orderId)
        console.log('status', status)

        if (item.noPay) {
          console.log('noPay -- complete checkout')
          // console.log('ITEM', item)
          // freeCheckout({orderNumber: item.orderDetails.orderId})

          var freeCheckout = firebase.functions().httpsCallable('freeCheckout')
          freeCheckout({orderNumber: orderId}).then((data2) => {
            console.log('freeCheckout', data2)
            return resolve(data)
          })
        } else {
          console.log('pay -- complete checkout')
          item.then()
        }
      })
      .catch((error) => {
        console.log('error', error)
      });
    })
  },
  getPaymentIntentForOrder: (state, item) => {
    // let myConnectId = 
    // console.log('STATE', state.getters['AUTH.myConnectId'].id)

    console.log('getPaymentIntentForOrder', item)

    return new Promise(async (resolve, reject) => {
      var purchase = {
        order: item.order,
        noPay: item.noPay,
        shipping: item.shipping
      }
      let requestData = JSON.stringify(purchase)

      var getPaymentIntentForOrder = firebase.functions().httpsCallable('getPaymentIntentForOrder');
      getPaymentIntentForOrder(requestData)
      .then((_data) => {
        let data = _data.data
        console.log('==>data', data)

        if (!data) {
          return resolve(false)
        }

        let orderNumber

        let watchOrder = () => {
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
        }

        if (item.noPay) {
          orderNumber = data.orderNumber
          watchOrder()
          return resolve({orderNumber})
        } else {
          let accountid = data.accountid || ''

          let _stripe = Stripe(stripeKey, {
            stripeAccount: accountid
          })

          orderNumber = data.orderNumber
          var elements = _stripe.elements();
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
            // Disable the Pay button if th ere are no card details in the Element
            document.querySelector("button").disabled = event.empty;
            document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
          });
          var form = document.getElementById("payment-form");

          let after = () => {
            payWithCard(_stripe, card, data.clientSecret);
          }

          watchOrder()
          resolve({orderNumber, after})
        }
      })
      .catch((error) => {
        console.log('error', error)
      });



      // Calls stripe.confirmCardPayment
      // If the card requires authentication Stripe shows a pop-up modal to
      // prompt the user to enter authentication details without leaving your page.
      var payWithCard = function(stripe, card, clientSecret) {
        loading(true);
        stripe
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: card
            },
          })
          .then(function(result) {
            if (result.error) {
              // Show error to your customer
              showError(result.error.message);
            } else {
              // The payment succeeded!
              console.log('RESULT!', result)
              orderComplete(result.paymentIntent.id);

              // ,,,

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
  getPaymentIntent: (state, item) => {
    // let myConnectId = 
    // console.log('STATE', state.getters['AUTH.myConnectId'].id)

    console.log('getPaymentIntent', item)

    return new Promise(async (resolve, reject) => {
      var purchase = {
            noPay: item.noPay,
            items: item.items,
            quantities: item.quantities,
            shipping: item.shipping
          }
      let requestData = JSON.stringify(purchase)

        var getPaymentIntent = firebase.functions().httpsCallable('getPaymentIntent');
        getPaymentIntent(requestData)
        .then((_data) => {
          let data = _data.data
          console.log('==>data', data)
          let orderNumber

          let watchOrder = () => {
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
          }

          if (item.noPay) {
            orderNumber = data.orderNumber
            watchOrder()
            return resolve({orderNumber})
          } else {
            let accountid = data.accountid || ''

            let _stripe = Stripe(stripeKey, {
              stripeAccount: accountid
            })

            orderNumber = data.orderNumber
            var elements = _stripe.elements();
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
              // Disable the Pay button if th ere are no card details in the Element
              document.querySelector("button").disabled = event.empty;
              document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
            });
            var form = document.getElementById("payment-form");

            let after = () => {
              payWithCard(_stripe, card, data.clientSecret);
            }

            watchOrder()
            resolve({orderNumber, after})
          }


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
            },
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
        // document.querySelector(".result-message").classList.remove("hidden");
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
  skipIntro: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var skipIntro = firebase.functions().httpsCallable('skipIntro');
      skipIntro()
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error skipIntro', error)
      });
    })
  },
  cancelSubscription: (state, item) => {
    let data = item
    return new Promise(async (resolve, reject) => {
      var cancelSubscription = firebase.functions().httpsCallable('cancelSubscription');
      cancelSubscription(data)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error cancelSubscription', error)
      });
    })
  },
  getRandomPhotos: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var getRandomPhotos = firebase.functions().httpsCallable('getRandomPhotos');
      getRandomPhotos(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing getRandomPhotos', error.data)
        resolve({message: 'Could not getRandomPhotos.'})
      });
    })
  },
  getPhotosBy: (state, item) => {
    return new Promise(async (resolve, reject) => {
      var getPhotosBy = firebase.functions().httpsCallable('getPhotosBy');
      getPhotosBy(item)
      .then((result) => {
        resolve(result.data)
      })
      .catch((error) => {
        console.log('error doing getPhotosBy', error.data)
        resolve({message: 'Could not getPhotosBy.'})
      });
    })
  },
  checkUsername: (state, item) => {
    return new Promise(async (resolve, reject) => {
        var checkIfUsernameExists = firebase.functions().httpsCallable('checkIfUsernameExists')
        checkIfUsernameExists(item)
        .then(async (result) => {
          console.log('checkIfUsernameExists result', result)
          return resolve(result)
          // var sanitizedMessage = result.data.text;
          // resolve(result)
        })
        .catch(async (error) => {
          return reject(result)
          // var code = error.code;
          // var message = error.message;
          // var details = error.details;
          // reject(error)
        })
    })
  },
  checkEmail: (state, item) => {
    return new Promise(async (resolve, reject) => {
        var checkIfUserExists = firebase.functions().httpsCallable('checkIfUserExists')
        checkIfUserExists(item)
        .then(async (result) => {
          return resolve(result)
          console.log('onboardingStatus', result)
          // var sanitizedMessage = result.data.text;
          // resolve(result)
        })
        .catch(async (error) => {
          return reject(result)
          // var code = error.code;
          // var message = error.message;
          // var details = error.details;
          // reject(error)
        })
    })
  },
  registerFromOnlyEmail: (state, item) => {
    return new Promise(async (resolve, reject) => {
      // let anon = item.anon
      // if (anon && firebase.auth().currentUser) {

        // var credential = firebase.auth.EmailAuthProvider.credential(item.email, item.password);
        // firebase.auth().currentUser.linkWithCredential(credential)
        //   .then((usercred) => {
        //     var user = usercred.user;
        //     console.log("Anonymous account successfully upgraded", user);
        //     router.push('/me')
        //   }).catch((error) => {
        //     console.log("Error upgrading anonymous account", error);
        //     return reject(error)
        //   });

      // } else {
        let _ = Math.floor(Math.random() * 100000000000).toString()
        var register = firebaseInstance.auth().createUserWithEmailAndPassword(item.email, _)
        register.then((user) => {
          console.log('user', user)
        }).catch((message) => {
          return reject(message)
        })   
      // }
    })
  },
  register: (state, item) => {
    return new Promise(async (resolve, reject) => {
      // let anon = item.anon
      // if (anon && firebase.auth().currentUser) {

        // var credential = firebase.auth.EmailAuthProvider.credential(item.email, item.password);
        // firebase.auth().currentUser.linkWithCredential(credential)
        //   .then((usercred) => {
        //     var user = usercred.user;
        //     console.log("Anonymous account successfully upgraded", user);
        //     router.push('/me')
        //   }).catch((error) => {
        //     console.log("Error upgrading anonymous account", error);
        //     return reject(error)
        //   });

      // } else {
        var register = firebaseInstance.auth().createUserWithEmailAndPassword(item.email, item.password)
        register.then((user) => {
          return resolve(user)
          console.log('user', user)
        }).catch((error) => {
          return resolve({
            ...error,
            error: true
          })
        })   
      // }
    })
  },
  loginWithGoogle: async (state, item) => {
    var provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope(`https://www.googleapis.com/auth/contacts.readonly`)
    // firebase.auth().languageCode = 'it'
    provider.setCustomParameters({
      // 'login_hint': 'user@example.com'
    });
    return new Promise(async (resolve, reject) => {
      console.log('loginWithGoogle')
      firebaseInstance.auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log('signed in with google', result)
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken
          // The signed-in user info.
          var user = result.user
          // IdP data available in result.additionalUserInfo.profile.
            // ...
        }).catch((error) => {
          console.log('error signing in with google', error)
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
          // ...
        })

      // console.log('item', item)
      // let result = await login(item.email, item.password, state)
      // console.log('login result', result)
      // return resolve(result)
    })
  },
  login: async (state, item) => {
    return new Promise(async (resolve, reject) => {
      console.log('item', item)
      let result = await login(item.email, item.password, state)
      console.log('login result', result)
      return resolve(result)
    })
  },
  logout: (state, item) => {
    firebaseInstance.auth().signOut().then(() => {
      state.commit('AUTH.CLEAR_STATE', {})
      console.log('Signed out')
      router.push('/')
    }, (error) => {
      console.log('Error when logging out', error)
    })
  },
  getStoreData: async (state, item) => {
    let sellerUsername = item.sellerUsername.toLowerCase()
    
    let snap = await firebaseInstance.database().ref('usernames/' + (sellerUsername || 'failed')).once('value')
    let sellerId = snap.val()

    let snap2 = await firebaseInstance.database().ref('customer_info/public/' + (sellerId || 'failed')).once('value')
    let data2 = snap2.val()

    let snap3 = await firebaseInstance.database().ref('stores/' + (sellerId || 'failed')).once('value')
    if (!snap3) {
      return {retry: true}
    }
    let data3 = snap3.val()

    if (!data3) {
      return {retry: true}
    }
    return {
      sellerId,
      ...data2,
      ...data3
    }
      // state.commit('AUTH.SET_MY_INFO', data)
  },
  getSellerData: async (state, item) => {
    let sellerUsername = item.sellerUsername
    
    let snap = await firebaseInstance.database().ref('usernames/' + (sellerUsername || 'failed')).once('value')
    let sellerId = snap.val()
    let snap2 = await firebaseInstance.database().ref(customer_info_path + (sellerId || 'failed')).once('value')
    let data2 = snap2.val()
    let snap3 = await firebaseInstance.database().ref('collections/' + (sellerId || 'failed')).once('value')
    let data3 = snap3.val()
    return {
      ...data2,
      products: {
        ...data3
      }
    }
      // state.commit('AUTH.SET_MY_INFO', data)
  }
}

export default AUTH