<template>
	<div id="app">
		<div class="mui-content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { store } from 'src/vuex'
import { getHot5ProjectList } from 'src/vuex/actions'

function requireAll (r) { r.keys().forEach(r) }
requireAll(require.context('./assets/images/', true, /\.png|ico$/))
requireAll(require.context('./assets/fonts/', true))

var exampleData = {
	name: 'Vue.js'
}

var exampleVM = {
	name: 'App',
	data () {
		return exampleData
	},
	store,

	vuex: {
		actions: {
			getHot5ProjectList
		}
	},

	ready () {
		this.$router.go('/login')
		this.getHot5ProjectList() // 获取首页需要的 5 列表
	}
}

export default exampleVM
</script>

<style lang="sass">
@import './assets/sass/mui.scss'
</style>

<style lang="less">
body {
	font-family: Microsoft YaHei;
}
</style>
