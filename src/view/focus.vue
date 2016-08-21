<template>
	<div class="mui-control-content mui-active">
		<div id="slider" class="mui-slider">
			<div class="mui-slider-group mui-slider-loop">
				<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
				<div class="mui-slider-item mui-slider-item-duplicate">
					<a href="#">
						<img src="../assets/images/img1.png">
					</a>
				</div>
				<!-- 第一张 -->
				<div class="mui-slider-item">
					<a href="#">
						<img src="../assets/images/img1.png">
					</a>
				</div>
				<!-- 第二张 -->
				<div class="mui-slider-item">
					<a href="#">
						<img src="../assets/images/img1.png">
					</a>
				</div>
				<!-- 第三张 -->
				<div class="mui-slider-item">
					<a href="#">
						<img src="../assets/images/img1.png">
					</a>
				</div>
				<!-- 第四张 -->
				<div class="mui-slider-item">
					<a href="#">
						<img src="../assets/images/img1.png">
					</a>
				</div>
				<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
				<div class="mui-slider-item mui-slider-item-duplicate">
					<a href="#">
						<img src="../assets/images/img1.png">
					</a>
				</div>
			</div>
		</div>
		<ul class="mui-table-view mui-grid-view mui-grid-9" style="background-color: #FFFFFF;">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" v-for="($index,topItem) in lists">
				<a>
					<img class="img-icon" :src="'/static/img/img'+$index+'.ico'">
					<div class="font-color img-icon-title">{{topItem.GP_name}}</div>
				</a>
			</li>
		</ul>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="hotItem in hotLists">
				<a >
					<img class="mui-media-object mui-pull-left hot-list-img" src="../assets/images/top.net.ico">
					<div class="mui-media-body mui-ellipsis hot-list-fontsize" style="font-size:15px">{{hotItem.GP_name}}
					<p class="mui-ellipsis hot-list-p" >关注度:{{hotItem.GP_hot}}</p>
					<p class="mui-ellipsis hot-list-p" >截止时间:{{hotItem.GP_Time}}</p>
					</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
import mui from '../lib/mui.min.js'
import R from '../common/request'
import { GP } from '../common/index'

function requireAll (r) { r.keys().forEach(r) }
requireAll(require.context('../assets/images/', true, /\.jpe?g|png|ico$/))

export default {

	name: 'focus',

	ready () {
		let self = this

		R.post('/Service/GetBigMatterList.ashx').then(function (data) {
			self.lists = data
		})

		R.post('/Service/GetHot5ProjectList.ashx',{
			'_flag': 're'
		}).then(function (data) {
			self.hotLists = data
		})
	},

	data () {
		return {
			lists: null,
			hotLists: null
		}
	}

}
</script>

<style lang="css" scoped>
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
</style>
