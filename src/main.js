import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
Vue.use(Router)
Vue.use(Resource)

import App from './App'

// routing
let router = new Router({
  hashbang: false, // disable hashbang though in hash mode
  // history: true // enable history mode
})

let emptyBase = Vue.extend({
  name: 'Base',
  template:
    '<div class="current-area">' +
      '<router-view></router-view>' + // <- 嵌套的外链
    '</div>'
})

// import * as Widgets from './views/widgets'

router.map({
  '/': {
    component: emptyBase
  }
})

router.beforeEach(function () {
  // 动态判定 router
  window.scrollTo(0, 0)
})

router.start(App, '#app')
