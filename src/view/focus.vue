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
			<li v-link="{ path: '/smallclass/' + topItem.GP_Matter_bigId }" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" v-for="($index,topItem) in lists">
				<a>
					<img class="img-icon" :src="'/static/img/img'+$index+'.ico'">
					<div class="font-color img-icon-title">{{topItem.GP_name}}</div>
				</a>
			</li>
		</ul>
		<!-- <pre>{{hotLists | json}}</pre> -->
		<ul class="mui-table-view">
			<li v-link="{ path: '/detail/' + hotItem.GP_ProjectId }"class="mui-table-view-cell mui-media" v-for="hotItem in hotLists">
				<a >
					<img class="mui-media-object mui-pull-left hot-list-img" src="../assets/images/top.net.ico">
					<div class="mui-media-body mui-ellipsis">{{hotItem.GP_name}}
					<p class="mui-ellipsis hot-list-p" >关注度:{{hotItem.GP_hot}}</p>
					<p class="mui-ellipsis hot-list-p" >截止时间:{{hotItem.GP_Time}}</p>
					</div>
					<button class="mui-btn mui-icon btn-focus" v-bind:class="[hotItem.IsMy ? 'mui-icon-star' : 'mui-icon-star-filled']" @click.prevent="focusProject(hotItem.GP_ProjectId)"></button>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
import mui from '../lib/mui.min.js'
import R from '../common/request'
import { GP } from '../common/index'
import { getHot5ProjectList } from 'src/vuex/actions'

function requireAll (r) { r.keys().forEach(r) }
requireAll(require.context('../assets/images/', true, /\.jpe?g|png|ico$/))

export default {

	name: 'focus',

	vuex: {
		actions: {
			getHot5ProjectList
		},
		getters: {
			projectMap: ({projectMap}) => projectMap
		}
	},

	ready () {
		R.post('/Service/GetBigMatterList.ashx').then(data => {
			this.lists = data
		})

		this.queryList()
	},

	data () {
		return {
			lists: null,
			hotLists: null
		}
	},

	methods: {
		focusProject (pid) {
			return R.post('/Service/FocusProject.ashx', {
				Id: pid
			}).then(() => {
				this.queryList()
			})
		},
		queryList () {
			this.getHot5ProjectList().then(data => {
				this.hotLists = data
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
.mui-table-view-cell a div{
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
