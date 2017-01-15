<template>
	<header class="mui-bar mui-bar-nav" v-link="{path:'/main'}">
	<a class="mui-icon mui-icon-left-nav mui-pull-left"></a>
	<a class="mui-icon mui-icon-reply mui-pull-right"></a>
	<h1 class="mui-title">成果记录申请</h1>
	</header>
	<form class="mui-input-group" style="margin-top:70px" >
		<div class="mui-input-row">
		<label>申请事项{{selecttd}}</label>
		<select v-model="selected" v-for="matter in matterlists">
	    <option>{{matter.GP_ProjectId}}</option>
	    </select>
		</div>
		<div class="mui-input-row" >
			<label>分数</label>
			<input type="text" placeholder="请填写综测分值">
		</div>
		<div class="card">
		<div class="mui-input-row">
		<label>获奖时间</label>
		<datepicker></datepicker>
		</div>
    </div>
		<div class="mui-input-row" style="margin: 10px 5px;">
		<label>备注</label>
		<textarea rows="5" placeholder="说明确定该分值的理由"></textarea>
		</div>
		<div class="mui-button-row">
			<button class="mui-btn mui-btn-primary" onclick="return false;">确认</button>&nbsp;&nbsp;
			<button class="mui-btn mui-btn-primary" onclick="return false;">取消</button>
		</div>
	</form>
</template>   

<script>
import R from '../common/request'
import { GP } from '../common/index'
import datepicker from 'vue-datepicker/vue-datepicker-1'

export default {

	name: 'research',

	ready () {
		window.mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		})

		this.getMatterList()
	},

	data () {
		return {
			matterlists: null
		}
	},
	components:{
		datepicker: datepicker
	},

	methods: {
		getMatterList () {
			let FirstTime = '2016-01-01'

			return R.post('/Service/GetProjectList.ashx', {
				Id: this.$route.params.smallId,
				CreatedOn: FirstTime,
				_flag: 're'
			}).then(data => {
				this.matterLists = data
			})
		}
	}
}
</script>

<style lang="css" scoped>
</style>
