<template>
	<header class="mui-bar mui-bar-nav mui-headerExt">
		<a id="back" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left mui-back-color"></a>
		<h1 id="title" class="mui-title">小类</h1>
	</header>
	<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
			<!--数据列表-->
			<ul id="list" class="mui-table-view">
				<li v-for="Item in lists" class="mui-table-view-cell">
					<a class="mui-navigate-right" href="">{{Item.GP_name}}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import R from 'src/common/request'

export default {

	name: 'smallclasses',

	data () {
		return {
			lists: null
		}
	},

	ready () {
		this.getSmallClass()
	},

	methods: {
		getSmallClass () {
			let FirstTime = '2016-01-01'

			return R.post('/Service/GetSmallMatterList.ashx', {
				Id: this.$route.params.bigId,
				CreatedOn: FirstTime,
				_flag: 're'

			}).then(data => {
				console.log(data)
				this.lists = data
			})
		}
	}
}
</script>

<style lang="css" scoped>
</style>
