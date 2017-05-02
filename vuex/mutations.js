import Vue from 'vue'

export default {
  SET_STORE (state, {key, value}){
    Vue.set(state, key, value)
  }
}
