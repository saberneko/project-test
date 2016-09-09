<template>
	<topbar :back-route="{path: '/main'}" :title="'个人信息'"></topbar>
	<div v-if="readFile" class="clip-mask" style="margin-top:50px;">
			<crop-wrapper :show.sync="readFile" :initial-file="readFile" :on-clip-data="onClipImg" ></crop-wrapper>
	</div>
	<div v-else class="mui-content" >
		<div class="tabbar-with-setting" style="margin-top:15px">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a id="head" class="mui-navigate-right">头像
						<img v-el:avatar class="mui-action-preview mui-media-object mui-pull-right" id="head-img1" :src="Img"/>
						<input class="fileInput" type="file" accept="image/*" @change="onFileChange">
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
					<a class="mui-navigate-right">关键�span class="mui-pull-right" style="margin-right: 17px;" id="">�/span></a>
				</li>
			</ul>
	</div>
</template>

<script>
import topbar from 'src/components/topbar'
import R from 'src/common/request'
import CropWrapper from 'src/components/image-crop/wrapper'

const defaultpic = require('../assets/images/user-photo.png')

let reader = new FileReader()

export default {

	name: 'personalinfolist',

	data () {
		return {
			Name: null,
			Id_No: null,
			Img: defaultpic,
			AvatarSrc: '',
			Imgclip: null,
			readFile: null
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
			let files = e.target.files || e.dataTransfer.files

			if (!files.length) {
				return
			}

			let [ file ] = files
			this.readFile = file
		},
		onClipImg (data) {
			console.info(this)

			if (data) {
				this.Img = data
				this.readFile = null
			}
		},
		drawImg () {
			console.info(this.$els, this.$els.imageDrawer)
			let canvas = this.$els.imageDrawer, // document.getElementById('canvas'),
				image = document.getElementById('testImg'),
				ctx = canvas && canvas.getContext('2d')

			// ctx.drawImage(image,22,33,100,100,0,0,100,100)
			// console.info(ctx)
		}
	},

	components: {
		topbar,
		CropWrapper
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

.fileInput {
	opacity: 0;
    right: 35px;
    height: 42px;
    position: absolute;
    width: 42px;
    float: right;
    cursor: pointer;
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
	// height: 250px;
	// top: 50vh;
	// margin-top: -125px;
	text-align: center;
}

.clip-imgblock {
	position: absolute;
	width: 100%;
	height: 100%;
	// text-align: center;

	img {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
	}

	.sourceImg {
		opacity: 0.5;
	}

	.destinationImg {
		position: absolute;
		top: 0;
		left: 0;
		// clip:rect(0,100px,100px,0)
	}

	.clip-main {
		position: absolute;
		top:0;
		left:0;
		width: 100px;
		height: 100px;
		border:1px solid #008844
	}

	.clip-handle {
		position: absolute;
		width: 6px;
		height: 6px;
		background: #008844
	}
	.clip-handle-nw {
		top: -3px;
		left: -3px;
	}
	.clip-handle-ne {
		top: -3px;
		right: -3px;
	}
	.clip-handle-se {
		bottom: -3px;
		right: -3px;
	}
	.clip-handle-sw {
		bottom: -3px;
		left: -3px;
	}
}
</style>
