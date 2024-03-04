export default {
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
  email (state) {
    return state['AUTH.email']
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

  
  showHeaderShop (state) {
    return state['AUTH.showHeaderShop']
  },
  loaded (state) {
    return state['AUTH.loaded']
  },
  uid (state) {
    return state['AUTH.uid']
  },
  username (state) {
    return state['AUTH.username']
  },
  profilePic (state) {
    return state['AUTH.profilePic']
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