<template>
	<div id="item3" class="mui-control-content mui-active">
		<div class="mui-panel-view">
			<div class="mui-panel-cell-item" v-for="($index,static) in staticsList" v-link="{ path: '/staticdetail/' + $index }">
				<a >
					<img :src="'static/img/img-eg' + $index + '.jpg'" alt="home-img">
					<p class="mui-panel-cell-title">{{static.GP_name}}</p>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import mui from '../lib/mui.min.js'
import R from 'src/common/request'

export default {

	name: 'statics',

	data () {
		return {
			staticsList: null
		}
	},

	ready () {
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		})

		this.getStatics()
	},

	methods: {
		getStatics () {
			return R.post('/Service/GetStatistical.ashx').then(data => {
				this.staticsList = data
			})
		}
	}
}
</script>

<style lang="css" scoped>
</style>
