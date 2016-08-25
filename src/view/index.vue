<template>
	<nav class="mui-bar mui-bar-tab" style="z-index: 999;">
		<a id="tab_index" class="mui-tab-item mui-active" href="subdiv_index" v-touch:tap="setDisplay('home')">
			<span class="mui-icon mui-icon-home"></span>
			<span onclick="getHot5ProjectList()" class="mui-tab-label">豆芽</span>
		</a>
		<a id="tab_setting" class="mui-tab-item" href="subdiv_setting" v-touch:tap="setDisplay('personal')">
			<span class="mui-icon mui-icon-gear"></span>
			<span class="mui-tab-label">个人</span>
		</a>
	</nav>
	<component :is="currentView"></component>
</template>

<script>
import mui from '../lib/mui.js'
import home from './home'
import personal from './personal'

export default {

	name: 'index',

	data () {
		return {
			currentView: 'home'
		}
	},

	components: {
		home,
		personal
	},

	methods: {
		setDisplay: function (info) {
			this.currentView = info
			console.log(this.currentView + '/' + info)
		}
	}
}
</script>

<style lang="css" scoped>
@import '../assets/css/adding.css'
</style>
