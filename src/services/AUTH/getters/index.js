export default {
  myPages (state) {
    return state['AUTH.myPages']
  },
  uid (state) {
    return state['AUTH.uid']
  },
  email (state) {
    return state['AUTH.email']
  },
  loaded (state) {
    return state['AUTH.loaded']
  },
  username (state) {
    return state['AUTH.username']
  },
  profilePic (state) {
    return state['AUTH.profilePic']
  },




  cart (state) {
    return state['AUTH.cart']
  },
  globalPopup (state) {
    return state['AUTH.globalPopup']
  },
  onboaradingPopup (state) {
    return state['AUTH.onboardingPopup']
  },
  isProUser (state) {
    return state['AUTH.isProUser']
  },
  myProductsList (state) {
    return state['AUTH.myProductsList']
  },
  digitalOrderPopup (state) {
    return state['AUTH.digitalOrderPopup']
  },
  displayData (state) {
    return state['AUTH.displayData']
  },
  orderComplete (state) {
    return state['AUTH.orderComplete']
  },
  myInfo (state) {
    return state['AUTH.myInfo']
  },
  myPrivateInfo (state) {
    return state['AUTH.myPrivateInfo']
  },
  notifyFulfillments (state) {
    return state['AUTH.notifyFulfillments']
  },
  myConnectId (state) {
    return state['AUTH.myConnectId']
  },
  plan (state) {
    return state['AUTH.plan']
  },
  inventory (state) {
    return state['AUTH.inventory']
  },
  myWork (state) {
    return state['AUTH.myWork']
  },
  showHeaderShop (state) {
    return state['AUTH.showHeaderShop']
  },
  test (state) {
    return state['AUTH.test']
  },
  friendsData (state) {
    return state['AUTH.friendsData']
  },
  friendsDataArray (state) {
    return state['AUTH.friendsDataArray']
  },
  authError (state) {
    return state['AUTH.authError']
  }
}