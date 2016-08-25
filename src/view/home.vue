<template>
	<div id="subdiv_index">
		<div id="segmentedControl" class="mui-segmented-control" style="top:40px;z-index:999">
			<a class="mui-control-item mui-active" v-touch:tap="setDisplay('focus')" @click="setDisplay('focus')">
						我要关注
			</a>
			<a class="mui-control-item" v-touch:tap="setDisplay('expert')" @click="setDisplay('expert')">
						谁是大神
			</a>
			<a class="mui-control-item" v-touch:tap="setDisplay('statics')" @click="setDisplay('statics')">
						统计预测
			</a>
		</div>
		<div id="pullrefresh" class="mui-content mui-scroll-wrapper" style="background-color: #efeff4;top: 90px;">
			<div class="mui-scroll">
				<focus v-if="mode === 'focus'"></focus>
				<expert v-if="mode === 'expert'"></expert>
				<statics v-if="mode === 'statics'"></statics>
			</div>
		</div>
	</div>
</template>

<script>
import mui from '../lib/mui.js'
import focus from './focus.vue'
import expert from './expert.vue'
import statics from './statics.vue'

export default {

	name: 'home',

	ready () {
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005
		})

		var slider = mui('#slider')
		slider.slider({
			interval: 5000
		})
	},

	data () {
		return {
			mode: 'focus'
		}
	},

	components: {
		focus,
		expert,
		statics
	},

	methods: {
		setDisplay: function (info) {
			this.mode = info
		}
	}
}
</script>

<style lang="css" scoped>
@import '../assets/css/adding.css'
</style>
