import types from './types'
import default_state from '../state'
import enabled_services from '../../enabled_services.js'


export default {
  [types.ADD_MY_PRODUCT] (state, item) {
    // let data = state['AUTH.myProductsList'] || []
    // data.push(item)
    // state['AUTH.myProductsList'] = data
  },
  [types.SET_MY_PRODUCTS] (state, item) {
    // let data = state['AUTH.myProductsList'] || []
    let data = []
    for (let one in item) {
      data.push(item[one])
    }
    console.log('DATA', data)
    state['AUTH.myProductsList'] = data
  },
  [types.SET_CART] (state, item) {
    state['AUTH.cart'] = item
  },
  [types.SET_MY_PAGES] (state, item) {
    state['AUTH.myPages'] = item
  },
  [types.SET_CONNECT_ID] (state, item) {
    state['AUTH.myConnectId'] = item
  },
  [types.SET_PLAN] (state, item) {
    state['AUTH.plan'] = item
  },
  [types.SET_INVENTORY] (state, item) {
    state['AUTH.inventory'] = item
  },
  [types.SET_ONBOARDING_POPUP] (state, item) {
    state['AUTH.onboardingPopup'] = item
  },
  [types.CLEAR_MY_PRODUCTS] (state, item) {
    state['AUTH.myProductsList'] = []
  },
  [types.NOTIFY_FULFILLMENTS] (state, item) {
    state['AUTH.notifyFulfillments'] = Math.random()*1000000000000000
  },
  [types.SET_EMAIL] (state, item) {
    state['AUTH.email'] = item
  },
  [types.SET_DIGITAL_ORDER_POPUP] (state, item) {
    state['AUTH.digitalOrderPopup'] = item
  },
  [types.SET_DISPLAY_DATA] (state, item) {
    state['AUTH.displayData'] = item
  },
  [types.CLEAR_MY_DISPLAY_DATA] (state, item) {
    state['AUTH.displayData'] = null
  },
  [types.SET_ORDER_COMPLETE] (state, item) {
    state['AUTH.orderComplete'] = true
  },
  [types.SET_MY_INFO] (state, item) {
    state['AUTH.myInfo'] = item
  },
  [types.SET_MY_PRIVATE_INFO] (state, item) {
    state['AUTH.myPrivateInfo'] = item
  },
  [types.SET_WORK] (state, item) {
    state['AUTH.myWork'] = item
  },




  [types.SHOW_HEADER_SHOP] (state, item) {
    state['AUTH.showHeaderShop'] = item
  },
  [types.SET_LOADED] (state, item) {
    state['AUTH.loaded'] = item
  },
  [types.SET_PROFILE_PIC] (state, item) {
    state['AUTH.profilePic'] = item
  },
  [types.SET_USERNAME] (state, item) {
    state['AUTH.username'] = item
  },
  [types.SET_UID] (state, item) {
    state['AUTH.uid'] = item
  },
  [types.SET_FRIENDS] (state, item) {
    state['AUTH.friends'] = item
  },
  [types.SET_IS_PRO_USER] (state, item) {
    state['AUTH.isProUser'] = item
  },
  [types.SET_GLOBAL_POPUP] (state, item) {
    state['AUTH.globalPopup'] = item
  },
  [types.SET_FRIEND_DATA] (state, item) {
    let data = state['AUTH.friendsDataArray'] || []
    data.push({id: item.friend, data:item.friendData})
    state['AUTH.friendsDataArray'] = data
  },
  [types.SET_DATE_CREATED] (state, item) {
    state['AUTH.accountCreated'] = item
  },
  [types.CLEAR_STATE] (state, item) {
    for (let service in enabled_services) {
      let _state = enabled_services[service].state
      for (let one in _state) {
        state[service + '.' + one] = enabled_services[service].state.defaultState[one]
      }
    }
  },
  [types.SET_AUTH_ERROR] (state, item) {
    state['AUTH.authError'] = (item.code && item.code.message) || item.message
  },
  [types.CLEAR_AUTH_ERROR] (state, item) {
    state['AUTH.authError'] = false
  },
}