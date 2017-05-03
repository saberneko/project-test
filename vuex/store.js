import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
// import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
  projectMap: new Map()
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})