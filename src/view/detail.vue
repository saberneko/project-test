<template>
<!-- 	<span>{{$route.params.projectId}}</span> -->
	<header class="mui-bar mui-bar-nav">
		<a id="back" backId="main" class="main mui-icon mui-icon-left-nav mui-pull-left mui-back-color" onclick="goBack(this)"></a>
		<h1 id="title" class="mui-title">{{detail_name ? detail_name : ''}}</h1>
	</header>
	<div v-if="content" class="mui-content content-text">
		{{{ content.GP_ContentHTML }}}
	</div>
	<button id="adding" type="button" class="mui-btn mui-btn-block mui-btn-adding" v-bind:class="[isFocused ? 'mui-btn-danger' : 'mui-btn-primary']" @click="setFocus">{{isFocused ? '取消关注' : '关注'}}</button>
</template>

<script>
import R from 'src/common/request'
import { GP } from '../common/index'
import { getHot5ProjectList } from 'src/vuex/actions'

export default {

	name: 'detail',

	data () {
		return {
			content: null,
			detail_name: null,
			sub_name: null,
			isFocused: null
		}
	},

	ready () {
		this.getDetail()
	},

	vuex: {
		actions: {
			getHot5ProjectList
		},
		getters: {
			projectMap: ({projectMap}) => projectMap
		}
	},

	methods: {
		getDetail () {
			return R.post('/Service/GetProjectDetail.ashx', {
				Id: this.$route.params.projectId
			}).then(data => {
				if (data[0]['GP_ContentHTML'] != null) {
					data[0]['GP_ContentHTML'] = decodeURIComponent(data[0]['GP_ContentHTML'].replace(/src%3D%22%2Fueditor/g, ('src%3D%22' + encodeURIComponent(GP.ServiceUrl) + '%2Fueditor')))
				}

				this.content = data[0]
				this.detail_name = data[0].GP_name
				this.sub_name = data[0].GP_SubName

				let { projectId } = this.$route.params,
					project = this.projectMap.get(projectId)

				this.isFocused = project.IsMy === 0
			})
		},
		setFocus () {
			return R.post('/Service/FocusProject.ashx', {
				Id: this.$route.params.projectId
			}).then(data => {
				if (data === 'addSuccess') {
					this.isFocused = true
				} else if (data === 'cancelSuccess') {
					this.isFocused = false
				}
				// this.queryList()
			})
		},
		queryList () {
			this.getHot5ProjectList().then(data => {
				this.getDetail()
			})
		}
	}
}
</script>

<style lang="css" scoped>
	body {
		overflow-x: hidden;
		background-color: #ffffff;
	}

	.top-content {
		position: relative;
		width: 100%;
		height: 150px;
		text-align: center;
		line-height: 150px;
		color: #434343;
	}

	.top-content img {
		vertical-align: middle;
	}

	.title {
		position: relative;
		margin: 0;
		color: #434343;
	}

	.middle {
		text-align: center;
	}

	.subtitle {
		font-size: 14px;
	}

	.item-info {
		color: #434343;
	}

	.item-icon {
		font-size: 19px;
		margin-right: 8px;
	}

	.mui-btn-adding {
		width: 90%;
		margin: 0 auto;
		padding: 10px 0;
		margin-top: 40px;
		margin-bottom: 50px;
	}

	.content-text {
		background-color: #FFFFFF;
		padding: 0px 15px;
		margin-top: 55px;
	}
</style>
