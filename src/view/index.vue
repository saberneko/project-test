<template>
	<nav class="mui-bar mui-bar-tab" style="z-index: 999;">
		<a id="tab_index" class="mui-tab-item mui-active" href="subdiv_index">
			<span class="mui-icon mui-icon-home"></span>
			<span onclick="getHot5ProjectList()" class="mui-tab-label">豆芽</span>
		</a>
		<a id="tab_setting" class="mui-tab-item" href="subdiv_setting">
			<span class="mui-icon mui-icon-gear"></span>
			<span class="mui-tab-label">个人</span>
		</a>
	</nav>
	<div id="subdiv_index">
		<div id="segmentedControl" class="mui-segmented-control" style="top:40px;z-index: 999;">
			<a class="mui-control-item mui-active" v-on:click="setDisplay('focus')">
						我要关注
			</a>
			<a class="mui-control-item" v-on:click="setDisplay('expert')">
						谁是大神
			</a>
			<a class="mui-control-item" v-on:click="setDisplay('statics')">
						统计预测
			</a>
		</div>
		<div id="pullrefresh" class="mui-content mui-scroll-wrapper" style="background-color: #efeff4;top: 90px;">
			<div class="mui-scroll">
				<focus v-if="mode === 'focus'"></focus>
				<expert v-if="mode === 'expert'"></expert>
				<statics v-if="mode === 'statics'"></statics>
			</div>
		</div>
	</div>

	<div id="subdiv_setting" class="mui-control-content">
		<div id="tabbar-with-setting">
			<ul class="mui-table-view mui-table-view-chevron" style="margin:10px 0px 15px 0px;">
				<li class="mui-table-view-cell mui-media mui-table-view-cellExt">
					<a class="mui-navigate-right" id="My/MyProfile.html" onclick="NewOpenWindow(this.id)">
						<img id="userimg" class="mui-media-object mui-pull-left" src="../assets/images/user-photo.png">
						<div class="mui-media-body">
							<label id="TLM_name"></label>
							<p class='mui-ellipsis' id="TLM_gh"></p>
						</div>
					</a>
				</li>
			</ul>
			<ul class="mui-table-view" style="margin-top: 15px;">
				<li id="MyProjectListA" class="mui-table-view-cell mui-table-view-cellExt">
					<a class="mui-navigate-right" id="MyProjectList" onclick="">
						点滴记录
					</a>
				</li>
				<!--add yours-->
				<li class="mui-table-view-cell mui-table-view-cellExt">
					<a class="mui-navigate-right" id="My/SeekScore.html" onclick="NewOpenWindow(this.id);">
						成绩查询
					</a>
				</li>
				<li class="mui-table-view-cell mui-table-view-cellExt">
					<a class="mui-navigate-right" id="My/MyRank.html" onclick="NewOpenWindow(this.id);">
						我的排名
					</a>
				</li>
			</ul>

			<ul class="mui-table-view" style="margin-top: 15px;">
				<li class="mui-table-view-cell mui-table-view-cellExt">
					<a class="mui-navigate-right" id="My/MyApplicationList.html" onclick="">
						系统消息
					</a>
				</li>
				<li class="mui-table-view-cell mui-table-view-cellExt">
					<a class="mui-navigate-right" id="My/MyApplicationList.html" onclick="">
						意见反馈
					</a>
				</li>
			</ul>

			<ul class="mui-table-view" style="margin-top: 15px;">
				<li class="mui-table-view-cell mui-table-view-cellExt">
					<a class="mui-navigate-right" id="My/aboutus.html" onclick="NewOpenWindow(this.id);">
						关于我们
					</a>
				</li>
			</ul>

			<ul class="mui-table-view" style="margin-top: 25px;">
				<li class="mui-table-view-cell mui-table-view-cellExt">
					<a id="exit" style="text-align: center;color: #FF3B30;">
						退出
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import mui from '../lib/mui.min.js'
import focus from './focus.vue'
import expert from './expert.vue'
import statics from './statics.vue'

export default {

	name: 'index',

	ready () {
		var slider = mui('#slider')
		slider.slider({
			interval: 5000
		})
	},

	data () {
		return {
			mode: 'focus'
		}
	},

	methods: {
		setDisplay: function (info) {
			this.mode = info
		}
	},

	components: {
		focus,
		expert,
		statics
	}
}
</script>

<style lang="css" scoped>
@import '../assets/css/adding.css'
</style>
