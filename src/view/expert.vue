<template>
	<div id="item2" class="mui-control-content mui-active">
		<ul class="mui-table-view">
			<li class="'mui-table-view-cell mui-media'" v-for="($index,expert) in expertsInfo" v-link="{ path: '/expertdetail/' + expert.GP_ManitoId + '/' + $index}">
				<img class="mui-media-object mui-pull-left hot-list-img" src="../assets/images/user-photo.png">
				<div class="mui-media-body mui-ellipsis person-fontsize">{{expert.GP_name}}
					<p style="width: 50%;margin-top:5px;white-space: nowrap;text-overflow:ellipsis;"><span class="mui-ellipsis mui-label">{{expert.GP_SubName}}</span></p>
				</div>
				<button class="mui-btn mui-good-btn" style="font-size:14px; border: 0px;float:right;margin-top:10px" v-bind:class="[expert.IsMy ? 'mui-text-primaryColor' : 'mui-text-goodColor']" v-on:click="setLike(expert.GP_ManitoId)">
						<!-- <img  class="mui-img-good" :src="'static/img/' + expert.like + '.png'" /> -->
						<img class="mui-img-good" :src="expert.IsMy === 1 ? thumbdown : thumbup" />
						<span>{{expert.GP_LikeNumber}}</span>
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import mui from '../lib/mui.js'
import R from '../common/request'
import { GP } from '../common/index'

let thumbup = require('../assets/images/good-filled.png')// zan
let thumbdown = require('../assets/images/good.png')// no zan

// console.info(thumbdown, thumbup)
// ok ， 刚才的 thumbdown 在 template 里面不能被正确解析， 因为它没有被正确赋值给组件，而模板里面只能解析组件中的 props 或 data 或 computed-> 这个没有用过吧

// 请听题：
// 已知，上述两个分别是对应的两张图片的绝对路径
//
// get 到了？你来
//
// 求：
// 正确的用三目运算符表达对应的赞状态的代码
// your time
//
// 提示： 这两个路径只要直接赋值到 :src 中即是正确的路径

export default {

	name: 'expert',

	props: {
		thumbup: {
			default: thumbup,
			type: String
		},
		thumbdown: {
			default: thumbdown,
			type: String
		}
	},

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
		},
		setLike (pid) {
			return R.post('/Service/FocusManito.ashx', {
				GP_ManitoId: pid
			}).then(() => {
				this.getExpertsInfoList()
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
