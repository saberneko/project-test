<template>
	<p>This is from /main</p>
	<p>{{$route.name}}</p>
	<div v-bind:class="[classA, isB ? classB : '']">为class绑定 -数组语法</div>
	<div v-bind:class="classObject">为class绑定-对象语法</div>
	<div v-bind:style="styleObject">绑定内联样式</div>
</template>

<script>
export default {
	name: 'main',

	data () {
		return {
			classA: 'class-a',
			classB: 'class-b',
			isB: 'true',
			classObject: {
				'class-b': true
			},
			styleObject: {
				color: 'blue',
				fontSize: '13px'
			}
		}
	}
}
</script>

<style lang="css" scoped>
	.class-a{
		color: red;
	}
</style>
