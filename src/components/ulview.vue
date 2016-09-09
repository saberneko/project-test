<template>
	<ul class="mui-table-view">
		<li v-link="{ path: '/detail/' + lists.GP_ProjectId }" class="mui-table-view-cell mui-media" v-for="lists in hotLists">
			<a >
				<img class="mui-media-object mui-pull-left hot-list-img" src="../assets/images/top.net.ico">
				<div class="mui-media-body mui-ellipsis">{{lists.GP_name}}
				<p class="mui-ellipsis hot-list-p" >关注度:{{lists.GP_hot}}</p>
				<p class="mui-ellipsis hot-list-p" >截止时间:{{lists.GP_Time}}</p>
				</div>
				<button class="mui-btn mui-icon btn-focus" v-bind:class="[lists.IsMy ? 'mui-icon-star' : 'mui-icon-star-filled']"></button>
			</a>
		</li>
		{{msg}}
	</ul>
</template>

<script>
import R from '../common/request'

const user = window.localStorage.user

export default {

	name: 'ulview',

	data () {
		return {
			lists: null
		}
	},

	props: {
		msg: {
			type: String
		}
	},

	ready () {
		console.log(user)
		// R.post('/Service/' + this.msg + '.ashx', {
		// 	GP_No: user
		// }).then(data => {
		// 	this.lists = data
		// 	console.log(this.lists)
		// })
	}
}
</script>

<style lang="css" scoped>
</style>
