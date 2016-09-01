import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
Vue.use(Router)
Vue.use(Resource)

import VueTouch from 'vue-touch'
Vue.use(VueTouch)

import App from './App'

// 运行与 App 中
if (process.RUNTIME_ENV === 'app') {

}

// routing
let router = new Router({
	hashbang: false,// disable hashbang though in hash mode
	history: true, // enable history mode
	mode: 'history'
})

let emptyRouteNode = Vue.extend({
	name: 'Base',
	template:
		'<div class="current-area">' +
			'<router-view></router-view>' + // <- 嵌套的外链
		'</div>'
})

router.map({
	'/': {
		component: emptyRouteNode
	},
	'login': {
		component: function (resolve) {
			require(['./view/login'], resolve)
		}
	},
	'main': {
		component: function (resolve) {
			require(['./view/main'], resolve)
		}
	},
	'user/:userId/:userInfo': {
		name: 'user',
		component: function (resolve) {
			require(['./view/user'], resolve)
		}
	},
	'detail/:projectId': {
		name: 'hotItemDetail',
		component: function (resolve) {
			require(['./view/detail'], resolve)
		}
	},
	'smallclass/:bigId': {
		name: 'smallClasses',
		component: function (resolve) {
			require(['./view/smallclass'], resolve)
		}
	},
	'matterlist/:smallId': {
		name: 'matterLists',
		component: function (resolve) {
			require(['./view/matterlist'], resolve)
		}
	},
	'expertdetail/:expertId/:index': {
		name: 'expertDetail',
		component: function (resolve) {
			require(['./view/expertdetail'], resolve)
		}
	},
	'staticdetail/:index': {
		name: 'staticdetail',
		component: function (resolve) {
			require(['./view/staticdetail'], resolve)
		}
	},
	'personalinfolist': {
		name: 'personalinfolist',
		component: function (resolve) {
			require(['./view/personalinfolist'], resolve)
		}
	},
	'canvas': {
		name: 'personalinfolist',
		component: function (resolve) {
			require(['./view/canvas'], resolve)
		}
	}
	//, 'v-if_v-for': {
	// 	name: 'v-if_v-for',
	// 	component: function (resolve) {
	// 		require(['./view/v-if_v-for'], resolve)
	// 	}
	// },
	// 'event': {
	// 	component: function (resolve) {
	// 		require(['./view/event'], resolve)
	// 	}
	// },
	// 'class-style': {
	// 	component: function (resolve) {
	// 		require(['./view/class-style'], resolve)
	// 	}
	// }
})

router.beforeEach(function () {
	// 动态判定 router
	window.scrollTo(0, 0)
})

router.start(App, '#app')
