<template>
	<topbar :back-route="{path: '/main'}" :title="'个人信息'"></topbar>
	<div v-if="Imgclip" class="clip-mask">
		<!-- <div class="clip-mask-transparent"></div> -->
		<div style="" class="clip-imgblock"><Img id="source" :src="Imgclip"
		v-touch:pan="onTouchStart" /></div>
		<canvas id="canvas" width="100" height="100"></canvas>
	</div>
	<div v-else class="mui-content" >
		<div class="tabbar-with-setting" style="margin-top:15px">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a id="head" class="mui-navigate-right">头像
						<img class="mui-action-preview mui-media-object mui-pull-right" id="head-img1" :src="Img"/>
						<input class="hidden" type="file" accept="image/*" v-on:change="onFileChange">
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a>姓名<span id="TLM_name" class="mui-pull-right">{{Name}}</span></a>
				</li>
				<li class="mui-table-view-cell">
					<a>性别<span id="TLM_sex" class="mui-pull-right"></span></a>
				</li>
			</ul>

			<ul class="mui-table-view" style="margin-top: 15px;">
				<li class="mui-table-view-cell">
					<a>班级<span id="TLM_class" class="mui-pull-right"></span></a>
				</li>
				<li class="mui-table-view-cell">
					<a>学号<span id="TLM_no" class="mui-pull-right">{{Id_No}}</span></a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">关键词<span class="mui-pull-right" style="margin-right: 17px;" id="">肉</span></a>
				</li>
			</ul>
	</div>
</template>

<script>
import topbar from 'src/components/topbar'
import R from 'src/common/request'

const defaultpic = require('../assets/images/user-photo.png')

export default {

	name: 'personalinfolist',

	data () {
		return {
			Name: null,
			Id_No: null,
			Img: defaultpic,
			Imgclip: null
		}
	},

	ready () {
		this.getPersonalInfo()
	},

	methods: {
		getPersonalInfo () {
			return R.get('/Service/userinfo.ashx?r=' + Date.now().toString()).then(data => {
				let info = data[0]
				this.Name = info.Name
				this.Id_No = info.GP_No
			})
		},
		onFileChange (e) {
			var files = e.target.files || e.dataTransfer.files
			if (!files.length) {
				return
			}
			this.upLoadImg(files[0])
		},
		upLoadImg (file) {
			let reader = new FileReader(),
				self = this
			reader.onload = e => {
				self.Imgclip = e.target.result
			}
			reader.readAsDataURL(file)
		},
		onTouchStart (e) {
			console.log(e)
			console.log(e.pointers[0].pageX)
		},
		drawImg () {
			let canvas = document.getElementById('canvas'),
				ctx = canvas.getContext('2d'),
				image = document.getElementById('source')
			ctx.drawImage(image,22,33,100,100,0,0,100,100)
		}
	},

	components: {
		topbar
	}
}
</script>

<style lang="less" scoped>
html,body {
	padding: 0;
	margin: 0;
}
.mui-table-view .mui-media-object {
    margin-right: 20px;
}
.hidden {
	opacity: 0;
	height: 42px;
}
.clip-mask-transparent {
	position: fixed;
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;
	background: rgb(100,100,100);
}
.clip-mask {
	position: relative;
	width: 100%;
	height: 250px;
	top: 50vh;
	margin-top: -125px;
}
.clip-imgblock {
	position: absolute;
	width: 100%;
	height: 100%;
	text-align: center;

	img {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		// opacity: 0.5;
	}
}
</style>
