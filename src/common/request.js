'use strict'

import Vue from 'vue'
import Resource from 'vue-resource'
import { GP } from './index'

if (!Vue.http) {
	Vue.use(Resource)
}

if (!Vue.http.options.emulateJSON) {
	Vue.http.options.emulateJSON = true
}

export default {
	get: (url, params) => {
		return Vue.http.get(url, params, {
			headers: {
				// 'Accept': 'application/json',
			 	'Access-Control-Allow-Origin': GP.ServiceUrl,
        'Content-Type': 'application/json'
			}
		}).then(response => {
			if (response.ok) {
				return response.data
			}
			return response
		})
	},
	post: (url, params) => {
		return Vue.http.post(url, params, {
			headers: {
				// 'Accept': 'application/json',
				'Access-Control-Allow-Origin': GP.ServiceUrl,
        'Content-Type': 'application/json'
			}
		}).then(response => {
			if (response.ok) {
				return response.data
			}
			return response
		})
	}
}
