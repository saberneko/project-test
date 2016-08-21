<template>
	<div id="app">
		<div class="mui-content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
// import Vue from 'vue'

function requireAll (r) { r.keys().forEach(r) }
requireAll(require.context('./assets/images/', true, /\.png|ico$/))

var exampleData = {
	name: 'Vue.js'
}

var exampleVM = {
	name: 'App',
	data () {
		return exampleData
	}
}

export default exampleVM
</script>

<style lang="less">
@import './assets/css/mui.min.css';

body {
	font-family: Microsoft YaHei;
}

</style>
