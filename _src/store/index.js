import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

import state from './default_state'
import services from '@/services'

Vue.use(Vuex)

let debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {...state, ...services.state},
  actions: {...actions, ...services.actions},
  mutations: {...mutations, ...services.mutations},
  getters: {...getters, ...services.getters},
  strict: debug
})
