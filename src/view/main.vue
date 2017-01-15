<template>
	<header class="mui-bar mui-bar-nav" style="padding-right: 15px;position:fixed">
		<h1 class="mui-title">豆芽儿</h1>	
	</header>
	<index></index>
</template>

//<button class=" mui-pull-right mui-btn-link mui-back-color">搜索</button>

<script>
import index from './index.vue'
export default {

	name: 'component_name',

	ready () {
		// mui.init({
		// 	gestureConfig: {
		// 		doubletap: true
		// 	}
		// })
		// // 返回按钮
		// mui.back = function (event) {
		// 	if (!mui.os.ios) {
		// 		// if (confirm('确认退出？')) {
		// 		// 	plus.runtime.quit()
		// 		// }
		// 	}
		// 	return false
		// }
		// var contentWebview = null
		// document.querySelector('header').addEventListener('doubletap', function () {
		// 	if (contentWebview == null) {
		// 		// contentWebview = plus.webview.currentWebview().children()[0]
		// 	}
		// 	contentWebview.evalJS("window.mui('#pullrefresh').pullRefresh().scrollTo(0,0,100)")
		// })
	},

	data () {
		return {

		}
	},

	components: {
		index
	}
}

</script>

<style lang="css" scoped>
.content-text {
	padding: 40px 15px;
}
.sub-page {
	top: 45px;
	bottom: 0px;
}
</style>
