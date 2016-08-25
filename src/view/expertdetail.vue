<template>
	<header class="mui-bar mui-bar-nav">
		<a class="main mui-icon mui-icon-left-nav mui-pull-left mui-back-color"></a>
		<h1 class="mui-title">{{name}}</h1>
	</header>
	<div class="mui-content mui-scroll-wrapper content-text">
		<div class="mui-scroll">{{{content}}}</div>
	</div>
</template>

<script>
import mui from '../lib/mui.js'
import R from 'src/common/request'
import { GP } from '../common/index'

export default {

	name: 'expertdetail',

	data () {
		return {
			content: null,
			name: null
		}
	},

	ready () {
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		})

		this.getExpertDetail()
	},

	methods: {
		getExpertDetail () {
			return R.post('/Service/GetManito.ashx').then(data => {
				let contentText = data[this.$route.params.index].GP_ContentHTML
				this.name = data[this.$route.params.index].GP_name
				if (contentText) {
					this.content = decodeURIComponent(contentText.replace(/src%3D%22%2Fueditor/g, ('src%3D%22' + encodeURIComponent(GP.ServiceUrl) + '%2Fueditor')))
				}
			})
		}
	}
}
</script>

<style lang="css" scoped>
	.content-text{
		overflow-x: hidden;
		padding: 40px 10px;
		background-color: #ffffff;
	}
</style>
