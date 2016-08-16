<template>
	<div id="app">
		<div class="mui-content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
// import Vue from 'vue'

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

<style>
@import './assets/css/mui.min.css';

</style>
