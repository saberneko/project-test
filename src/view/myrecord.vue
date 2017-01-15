<template>
	<topbar :back-route="{path: '/main'}" :title="'点滴记录'">
		<button slot="button" id='setting' class=" mui-pull-right mui-btn-link mui-back-color" >＋</button>
	</topbar>
	<div class="topbar-two-column">
		<div class="mui-segmented-control">
			<a class="mui-control-item mui-active" v-touch:tap="setDisplay('myfocus')">
				我的关注
			</a>
			<a class="mui-control-item" v-touch:tap="setDisplay('myrecord')" v-link="{path:'/research'}">
				成果记录
			</a>
		</div>
	</div>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll" style="background-color: #efeff4;top: 90px;">
			<div id="item1" class="mui-control-content mui-active">
				<ulview v-if="mode === 'myfocus'" :msg="'SaveOrDelteteMyFocus'"></ulview>
				<ulview v-if="mode === 'myrecord'"  class="mui-table-view">
				</ulview>
			</div>
<!-- 			<div id="item2" class="mui-control-content">
			</div> -->
		</div>
	</div>
</template>

<script>
import topbar from 'src/components/topbar'
import ulview from 'src/components/ulview'
import R from 'src/common/request'

export default {

	name: 'myrecord',

	data () {
		return {
			mode: null
		}
	},

	methods: {
		setDisplay: function (info) {
			this.mode = info
		}
	},

	components: {
		topbar,
		ulview
	}
}
</script>

<style lang="css" scoped>
.topbar-two-column{
	background-color: #efeff4;
	position:fixed;
	top: 44px;
	z-index: 999;
}
</style>
