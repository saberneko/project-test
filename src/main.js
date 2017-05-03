/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Resource from 'vue-resource'
import store from '../vuex/store'

Vue.use(VueRouter)
Vue.use(Resource)

// import VueTouch from 'vue-touch'
// Vue.use(VueTouch)

// require('file-loader?name=static/common/js/mui.js&limit=1000000!./assets/js/mui.js')
// require('file-loader?name=static/common/fonts/mui.ttf&limit=100000000!./assets/fonts/mui.ttf')
// require('file-loader?name=static/common/css/mui.min.css!./assets/css/mui.min.css')

import App from './App'

// 运行与 App 中
if (process.env.NODE_ENV === 'develpoment') {

}

// routing
// let router = new Router({
// 	hashbang: false,// disable hashbang though in hash mode
// 	history: true, // enable history mode
// 	mode: 'history'
// })

let emptyRouteNode = Vue.extend({
	name: 'Base',
	template:
		'<div class="current-area">' +
			'<router-view></router-view>' + // <- 嵌套的外链
		'</div>'
})

let router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['./view/login'], resolve)
    },
    {
      path: '/home',
      component: resolve => require(['./view/main'], resolve)
    },
    {
      path: '/detail/:projectId',
      name: 'detail', // 命名路由
      component: resolve => require(['./view/detail'], resolve)
    },
    {
      path: '/myrecord',
      component: resolve => require(['./view/myrecord'], resolve)
    },
    {
      path: '/gradeinquiry',
      component: resolve => require(['./view/gradeinquiry'], resolve)
    },
    {
      path: '/research',
      component: resolve => require(['./view/research'], resolve)
    },
    {
      path: '/smallclass/:bigId',
      component: resolve => require(['./view/smallclass'], resolve)
    },
    {
      path: '/matterlist/:smallId',
      component: resolve => require(['./view/matterlist'], resolve)
    },
    {
      path: '/personalinfolist',
      component: resolve => require(['./view/personalinfolist'], resolve)
    },
    {
      path: '*',
      component: resolve => require(['./view/404'], resolve)
    }
  ]
})

router.beforeEach(function (to, from, next) {
	// 动态判定 router
	window.scrollTo(0, 0)
  next()
})

export default new Vue({

  el: '#app',

  components: {
    App
  },

  store,

  router,

  template: '<app />'
})
// router.start(App, '#app')
