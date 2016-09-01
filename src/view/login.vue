<template>
	<div style="text-align: center; margin:80px 0px 10px 0px">
		<img src="../assets/images/user-photo.png" style="width: 100px;height: 100px;max-height: 100%;max-width: 100%;"/>
	</div>
	<form class="mui-input-group">
		<ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-input-row">
				<label>学号</label>
				<input id='empno' type="text" v-model="EmpNo" class="mui-input-clear mui-input" placeholder="请输入学号">
			</li>
			<li class="mui-input-row">
				<label>密码</label>
				<input id='pwd' type="password" v-model="Pwd" class="mui-input-clear mui-input" placeholder="请输入密码">
			</li>
		</ul>
	</form>
	<div class="mui-content-padded">
		<button id='btnLogin' @click="toMain()" class="mui-btn mui-btn-block" style="color:#FFFFFF;border:0px;background-color: #000000;">登录</button>
	</div>
</template>

<script>
import mui from '../lib/mui'
import R from '../common/request'

export default {
	name: 'login',

	ready () {
		// let self = this

		mui.init({

		})

		mui.plusReady(function () {
			let { plus } = window

			// 仅支持竖屏显示
			plus.screen.lockOrientation('portrait-primary')

			if (window.localStorage.autoLogin === 'true') {
				// NewOpenWindow('main.html')
				// 延时关闭 splash
				// setTimeout(function () {plus.navigator.closeSplashscreen()}, 600)
			} else {
				// 关闭 splash
				plus.navigator.closeSplashscreen()
			}

			// var loginButton = document.getElementById('btnLogin')
			// loginButton.addEventListener('tap', function (event) {
			// 	toMain()
			// })

			// 返回按钮
			mui.back = function (event) {
				if (!mui.os.ios) {
					if (confirm('确认退出？')) {
						plus.runtime.quit()
					}
				}
				return false
			}
		})
	},

	methods: {
		toMain : function () {
			let { EmpNo, Pwd } = this.$data, self = this

			if (EmpNo === '' || Pwd === '') {
				mui.toast('请输入学号和密码')
				return
			}

			// let plus = {}
			// var wa = plus.nativeUI && plus.nativeUI.showWaiting()

			// console.info(mui)

			R.post('/Service/Login/Login.ashx?r=' + Date.now().toString(), {
				'GP_No':EmpNo,
				'GP_Password':Pwd
			}).then(function (dat) {
				if ((!dat.ErrorMessage) && dat.LoginResult === 'Success') {
					window.localStorage.empno = EmpNo
					// window.localStorage.autoLogin = ((document.getElementById('autoLogin').className.indexOf('mui-active')>-1)?'true':'false')
					// clicked('index.html')
					self.$router.go('/main')
					// NewOpenWindow('main.html')
					// mui.openWindow({
					// 	id: 'main',
					// 	url: 'main.html'
					// })
				} else {
					mui.alert('工号或密码错误')
				}
			})

			// mui.ajax({
			// 	url: GP.ServiceUrl + '/Service/Login/Login.ashx?r=' + Date.now().toString(),
			// 	type: 'POST',
			// 	data: {'GP_No':EmpNo,'GP_Password':Pwd},
				// dataType:'json',
				// success:function (dat) {
				// 	if ((!dat.ErrorMessage) && dat.LoginResult === 'Success') {
				// 		window.localStorage.empno = EmpNo
				// 		// window.localStorage.autoLogin = ((document.getElementById('autoLogin').className.indexOf('mui-active')>-1)?'true':'false')
				// 		// clicked('index.html')
				// 		// NewOpenWindow('main.html')
				// 		mui.openWindow({
				// 			id: 'main',
				// 			url: 'main.html'
				// 		})
				// 	} else {
				// 		mui.alert('工号或密码错误')
				// 	}
				// },
				// error:function (e) {
				// 	// mui.alert('发生错误，登录失败！'+e.responseText)
				// },
				// complete:function () {
				// 	// wa.close()
				// }
			// })
		}
	},

	data () {
		return {
			EmpNo: '1311040103',
			Pwd: '123456'
		}
	}

	//  props: {
	// 	name: {
	// 		type: String,
	// 		required: true,
	// 		default: 'Mr. Chen'
	// 	},
	// 	female: {
	// 		type: [String],
	// 		default: 'Miss. Chen',
	// 		required: false,
	// 		twoWay: true
	// 	}
	// }
}
</script>

<style lang='less' scoped>

body,div{background:#fff;}

.area {
	margin: 20px auto 0px auto;
}
.mui-input-group {

	margin-top: 10px;

	&:not(:first-child) {
		margin-top: 20px;
	}

	label {
		width: 22%;
	}
}

.mui-input-row {

	label~input, label~select, label~textarea{
		width: 78%;
	}
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

	.oauth-btn {
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

		&:active {
			border: solid 1px #aaa;
		}
	}

}
.mui-content{background:#fff;}
</style>
