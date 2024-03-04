import services from './enabled_services.js'

let state = {}
let actions = {}
let mutations = {}
let getters = {}

for (let service in services) {
    let _state = {}
    let _actions = {}
    let _mutations = {}
    let _getters = {}
    for (let one in services[service].state) {
        _state[service + '.' + one] = services[service].state[one]
    }
    for (let one in services[service].actions) {
        _actions[service + '.' + one] = services[service].actions[one]
    }
    for (let one in services[service].mutations) {
        _mutations[service + '.' + one] = services[service].mutations[one]
    }
    for (let one in services[service].getters) {
        _getters[service + '.' + one] = services[service].getters[one]
    }

    state = {...state, ..._state}
    actions = {...actions, ..._actions}
    mutations = {...mutations, ..._mutations}
    getters = {...getters, ..._getters}
}

export default {
  state,
  actions,
  mutations,
  getters
}