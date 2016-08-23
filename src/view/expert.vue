<template>
	<div id="item2" class="mui-control-content mui-active">
		<ul class="mui-table-view">
			<li class="'mui-table-view-cell mui-media'" v-for="expert in expertsInfo">
				<img class="mui-media-object mui-pull-left hot-list-img" src="../assets/images/user-photo.png">
				<div class="mui-media-body mui-ellipsis person-fontsize">{{expert.GP_name}}
					<p style="width: 50%;margin-top:5px;white-space: nowrap;text-overflow:ellipsis;"><span class="mui-ellipsis mui-label">{{expert.GP_SubName}}</span></p>
				</div>
				<button class="mui-btn mui-good-btn mui-text-primaryColor" style="font-size:14px; border: 0px;float:right;margin-top:10px">
						<img  class="mui-img-good" src="../assets/images/good.png" />
						<span>{{expert.GP_LikeNumber}}</span>
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import mui from '../lib/mui.min.js'
import R from '../common/request'
import { GP } from '../common/index'

export default {

	name: 'expert',

	data () {
		return {
			expertsInfo: null
		}
	},

	ready () {
		this.getExpertsInfoList()
	},

	methods: {
		getExpertsInfoList () {
			return R.post('/Service/GetManito.ashx').then(data => {
				this.expertsInfo = data
			})
		}
	}
}
</script>

<style lang="less" scoped>
.hot-list-img{
	width:30px;
	height: 32px;
	margin-top: 15px;
	margin-right: 20px;
	margin-left: 10px;
}
.person-fontsize {
	text-overflow: ellipsis;
	font-size: 15px;
	display: inline-block;
	margin-top: 6px;
}

</style>
