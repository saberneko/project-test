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
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"></li>
		</ul>
		<ul class="mui-table-view " id="Hot5ProjectList">

		</ul>
	</div>
</template>

<script>
import mui from '../lib/mui.min.js'
import R from '../common/request'
import { GP } from '../common/index'

export default {

	name: 'focus',

	ready () {
		// let self = this

		R.post('/Service/GetBigMatterList.ashx').then(function (data) {
			// this.$data.list = data
			console.log(data)
		})
	},

	data () {
		return {
			// list: ''
		}
	}

}
</script>

<style lang="css" scoped>
</style>
