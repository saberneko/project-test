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

// router.map({
// 	'login': {
// 		component: function (resolve) {
// 			require(['./view/login'], resolve)
// 		}
// 	},
// 	'main': {
// 		component: function (resolve) {
// 			require(['./view/main'], resolve)
// 		}
// 	},
// 	'user/:userId/:userInfo': {
// 		name: 'user',
// 		component: function (resolve) {
// 			require(['./view/user'], resolve)
// 		}
// 	},
// 	'detail/:projectId': {
// 		name: 'hotItemDetail',
// 		component: function (resolve) {
// 			require(['./view/detail'], resolve)
// 		}
// 	},
// 	'smallclass/:bigId': {
// 		name: 'smallClasses',
// 		component: function (resolve) {
// 			require(['./view/smallclass'], resolve)
// 		}
// 	},
// 	// 此处如果访问路径为 matterlist/123, 才会正确
// 	// 如果直接访问 matterlist, 会找不到这个路由,
// 	// 为了说明这一点, 我在这配置项最底部, 加了一个 404 路由,
// 	// 即"找不到路由时的路由", 请看第 147 行.
// 	'matterlist/:smallId': {
// 		name: 'matterLists',
// 		component: function (resolve) {
// 			require(['./view/matterlist'], resolve)
// 		}
// 	},
// 	'expertdetail/:expertId/:index': {
// 		name: 'expertDetail',
// 		component: function (resolve) {
// 			require(['./view/expertdetail'], resolve)
// 		}
// 	},
// 	'staticdetail/:index': {
// 		name: 'staticdetail',
// 		component: function (resolve) {
// 			require(['./view/staticdetail'], resolve)
// 		}
// 	},
// 	'personalinfolist': {
// 		name: 'personalinfolist',
// 		component: function (resolve) {
// 			require(['./view/personalinfolist'], resolve)
// 		}
// 	},
// 	'myrecord': {
// 		name: 'myrecord',
// 		component: function (resolve) {
// 			require(['./view/myrecord'],resolve)
// 		}
// 	},
// 	'research': {
// 		name: 'research',
// 		component: function (resolve) {
// 			require(['./view/research'],resolve)
// 		}
// 	},
// 	// 'canvas': {
// 	// 	name: 'personalinfolist',
// 	// 	component: function (resolve) {
// 	// 		require(['./view/canvas'], resolve)
// 	// 	}
// 	// },
// 	// 'v-if_v-for': {
// 	// 	name: 'v-if_v-for',
// 	// 	component: function (resolve) {
// 	// 		require(['./view/v-if_v-for'], resolve)
// 	// 	}
// 	// },
// 	// 'event': {
// 	// 	component: function (resolve) {
// 	// 		require(['./view/event'], resolve)
// 	// 	}
// 	// },
// 	// 'class-style': {
// 	// 	component: function (resolve) {
// 	// 		require(['./view/class-style'], resolve)
// 	// 	}
// 	// },
// 	'feedback': {
// 		component: function (resolve) {
// 			require(['./view/feedback'], resolve)
// 		}
// 	},
// 	'aboutus': {
// 		component: function (resolve) {
// 			require(['./view/aboutus'], resolve)
// 		}
// 	},
// 	'gradeinquiry': {
// 		component: function (resolve) {
// 			require(['./view/gradeinquiry'], resolve)
// 		}
// 	},
// 	'modify': {
// 		component: function (resolve) {
// 			require(['./view/modify'], resolve)
// 		}
// 	},
// 	'message': {
// 		component: function (resolve) {
// 			require(['./view/message'], resolve)
// 		}
// 	},
// 	'*' :{
// 		component: function (resolve) {
// 			require(['./view/404'], resolve)
// 		}
// 	}
// })

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
