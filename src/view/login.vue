<template>
	<div style="text-align: center; margin:80px 0px 10px 0px">
		<img src="../assets/images/user-photo.png" style="width: 100px;height: 100px;max-height: 100%;max-width: 100%;"/>
	</div>
	<ul class="abc" >
		<li v-for="item in users" class="user" v-bind:class="[item.name]">
			{{item.name}}
		</li>
	</ul>
	<form class="mui-input-group">
		<ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-input-row">
				<label>学号</label>
				<input id='empno' type="text" class="mui-input-clear mui-input" placeholder="请输入学号">
			</li>
			<li class="mui-input-row">
				<label>密码</label>
				<input id='pwd' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
			</li>
			<li class="mui-table-view-cell">
				自动登录
				<div id="autoLogin" class="mui-switch">
					<div class="mui-switch-handle"></div>
				</div>
			</li>
		</ul>
	</form>
	<div class="mui-content-padded">
		<button id='btnLogin' class="mui-btn mui-btn-block" style="color:#FFFFFF;border:0px;background-color: #000000;">登录</button>
	</div>
	<div class="mui-content-padded">
		<button v-link="{path:'main'}" id='btnLogin' class="mui-btn mui-btn-block" style="color:#FFFFFF;border:0px;background-color: #000000;">测试跳转</button>
	</div>
</template>

<script>
export default {
	name: 'login',

	ready () {
		// this.$data.users = [
		// 	{
		// 		name: 'neko1' // 1
		// 	},
		// 	{
		// 		name: 'the secret life of pets' // 2
		// 	}
		// ].concat(this.$data.users).slice(0, 1)
	},

	data () {
		return {
			data: 123,
			users: [
				{
					name: 'neko' // 3
				},
				{
					name: 'neko\'s friend' // 4
				}
			]
		}
	},

	props: {
		name: {
			type: String,
			required: true,
			default: 'Mr. Chen'
		},
		female: {
			type: [String],
			default: 'Miss. Chen',
			required: false,
			twoWay: true
		}
	}
}
</script>

<style lang="css" scoped>
			.area {
				margin: 20px auto 0px auto;
			}
			.mui-input-group {
				margin-top: 10px;
			}
			.mui-input-group:first-child {
				margin-top: 20px;
			}
			.mui-input-group label {
				width: 22%;
			}
			.mui-input-row label~input,
			.mui-input-row label~select,
			.mui-input-row label~textarea {
				width: 78%;
			}
			.mui-checkbox input[type=checkbox],
			.mui-radio input[type=radio] {
				top: 6px;
			}
			.mui-content-padded {
				margin-top: 25px;
			}
			.mui-btn {
				padding: 10px;
			}
			.link-area {
				display: block;
				margin-top: 25px;
				text-align: center;
			}
			.spliter {
				color: #bbb;
				padding: 0px 8px;
			}
			.oauth-area {
				position: absolute;
				bottom: 20px;
				left: 0px;
				text-align: center;
				width: 100%;
				padding: 0px;
				margin: 0px;
			}
			.oauth-area .oauth-btn {
				display: inline-block;
				width: 50px;
				height: 50px;
				background-size: 30px 30px;
				background-position: center center;
				background-repeat: no-repeat;
				margin: 0px 20px;
				/*-webkit-filter: grayscale(100%); */

				border: solid 1px #ddd;
				border-radius: 25px;
			}
			.oauth-area .oauth-btn:active {
				border: solid 1px #aaa;
			}
			body,div{background:#fff;}
			.mui-content{background:#fff;}
</style>
