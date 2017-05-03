/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'

import Resource from 'vue-resource'
Vue.use(Resource)

import App from './App'

// 运行与 App 中
if (process.env.NODE_ENV === 'develpoment') {

}

import { router } from './routes'

export default new Vue({
  el: '#app',
  components: {
    App
  },
  store,
  router,
  template: '<app />'
})
