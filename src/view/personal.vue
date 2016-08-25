<template>
	<div id="subdiv_setting" class="mui-content">
		<div id="tabbar-with-setting">
			<ul class="mui-table-view mui-table-view-chevron" style="margin:10px 0px 15px 0px;">
				<li class="mui-table-view-cell mui-media mui-table-view-cellExt">
					<a class="mui-navigate-right" id="My/MyProfile.html">
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
export default {

	name: 'personal',

	data () {
		return {

		}
	}
}
</script>

<style lang="css" scoped>
</style>
