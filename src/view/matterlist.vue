<template>
	<header class="mui-bar mui-bar-nav mui-headerExt">
		<a id="back" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left mui-back-color"></a>
		<h1 id="title" class="mui-title">事项</h1>
	</header>
	<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<!--数据列表-->
			<ul class="mui-table-view">
				<li v-for="matter in matterLists" v-link="{ path: '/detail/' + matter.GP_ProjectId }"class='mui-table-view-cell mui-media'>
					<a>
						<img class="mui-media-object mui-pull-left hot-list-img" src="../assets/images/top.net.ico">
						<div class="mui-media-body mui-ellipsis">
							{{matter.GP_name}}
							<p class="mui-ellipsis hot-list-p" >关注度:{{matter.GP_hot}}</p>
							<p class="mui-ellipsis hot-list-p" >截止时间:{{matter.GP_Time}}</p>
						</div>
						<button class="mui-btn mui-icon btn-focus" v-bind:class="[matter.IsMy ? 'mui-icon-star' : 'mui-icon-star-filled']" @click.prevent="focusProject(matter.GP_ProjectId)"></button>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import mui from '../lib/mui.js'
import R from 'src/common/request'

export default {

	name: 'matterlist',

	ready () {
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		})

		this.getMatterList()
	},

	data () {
		return {
			matterLists: null
		}
	},

	methods: {
		getMatterList () {
			let FirstTime = '2016-01-01'

			return R.post('/Service/GetProjectList.ashx', {
				Id: this.$route.params.smallId,
				CreatedOn: FirstTime,
				_flag: 're'
			}).then(data => {
				this.matterLists = data
			})
		},
		focusProject (pid) {
			return R.post('/Service/FocusProject.ashx', {
				Id: pid
			}).then(() => {
				this.getMatterList()
			})
		}
	}
}
</script>

<style lang="less" scoped>
.hot-list-img{
	width:30px;
	height: 32px;
	margin-top: 10px;
	margin-right: 15px;
}
.hot-list-fontsize{
	font-size:15px;
}
.hot-list-p{
	margin-right: 30px;
	font-size:12px;
}
.btn-focus{
	font-size:20px;
	color: #0086C8;
	border: 0px;
}
</style>
