<template>
	<div class="mui-content">
		<header class="mui-bar mui-bar-nav" style="padding-right: 15px;">
			<h1 class="mui-title">豆芽儿</h1>
			<button id='setting' onclick="NewApplication();" class=" mui-pull-right mui-btn-link">创建</button>
		</header>
	</div>
</template>

<script>
import mui from '../lib/mui.min.js'

export default {

	name: 'component_name',

	ready () {
		mui.init({
			gestureConfig: {
				doubletap: true
			},
			subpages: [{
				url: 'lndex.html',
				id: 'Index',
				createNew: true,
				extras: {
					contentData: '1'
				},
				styles: {
					top: '45px',
					bottom: '0px'
				}
			}]
		})
		// 返回按钮
		mui.back = function (event) {
			if (!mui.os.ios) {
				// if (confirm('确认退出？')) {
				// 	plus.runtime.quit()
				// }
			}
			return false
		}
		var contentWebview = null
		document.querySelector('header').addEventListener('doubletap', function () {
			if (contentWebview == null) {
				// contentWebview = plus.webview.currentWebview().children()[0]
			}
			contentWebview.evalJS("mui('#pullrefresh').pullRefresh().scrollTo(0,0,100)")
		})
	},

	data () {
		return {

		}
	}
}

</script>

<style lang="css" scoped>
.content-text {
	padding: 40px 15px;
}
</style>
