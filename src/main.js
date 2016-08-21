import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
Vue.use(Router)
Vue.use(Resource)

import App from './App'

// routing
let router = new Router({
	hashbang: false,// disable hashbang though in hash mode
	history: true, // enable history mode
	mode: 'html5'
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
		component: require('./view/login')
	},
	'main': {
		component: require('./view/main')
	},
	'user/:userId': {
		name: 'user',
		component: require('./view/user')
	},
	'v-if_v-for': {
		name: 'v-if_v-for',
		component: require('./view/v-if_v-for')
	},
	'event': {
		component: require('./view/event')
	},
	'class-style': {
		component: require('./view/class-style')
	}
})

router.beforeEach(function () {
	// 动态判定 router
	window.scrollTo(0, 0)
})

router.start(App, '#app')
