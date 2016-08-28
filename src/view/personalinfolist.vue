<template>
	<topbar :back-route="{path: '/main'}" :title="'个人信息'"></topbar>
	<div class="mui-content" >
		<div class="tabbar-with-setting" style="margin-top:15px">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a id="head" class="mui-navigate-right">头像
						<img class="mui-action-preview mui-media-object mui-pull-right" id="head-img1" :src="Img"/>
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
			<p><input type="file" accept="image/*" v-model="file" v-on:change="onFileChange">file:{{file}}</p>
			<img  alt="">
	</div>
</template>

<script>
import topbar from 'src/components/topbar'
import R from 'src/common/request'

export default {

	name: 'personalinfolist',

	data () {
		return {
			Name: null,
			Id_No: null,
			Img: '../assets/images/user-photo.png',
			file: null
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
			console.log(this)
			reader.onload = e => {
				self.Img = e.target.result
			}
			reader.readAsDataURL(file)
		}
	},

	components: {
		topbar
	}
}
</script>

<style lang="css" scoped>
.mui-table-view .mui-media-object.mui-pull-right {
    margin-right: 20px;
}
</style>
