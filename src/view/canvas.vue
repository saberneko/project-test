<template>
	<img id="testImg" src="../assets/images/shuijiao.jpg" height="333" width="500">
	<canvas id="canvas" width="333" height="500"></canvas>
</template>

<script>
export default {

	name: 'canvas',

	data () {
		return {

		}
	},

	ready () {
		this.drawImg()
	},

	methods: {
		drawImg () {
			var canvas = document.getElementById('canvas'),
				image = document.getElementById('testImg')
			if (canvas.getContext) {
				console.log('getcontext Y')
				var ctx = canvas.getContext('2d')
			}
			ctx.drawImage(image,22,33,100,100,0,0,100,100)
		}
	}
}
</script>

<style lang="css" scoped>
</style>
