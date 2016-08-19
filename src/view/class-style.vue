<template>
	<p>This is from /main</p>
	<p>{{$route.name}}</p>
	<div v-bind:class="[classA, isB ? classB : '']">为class绑定 -数组语法</div>
	<div v-bind:class="classObject">为class绑定-对象语法</div>
	<div v-bind:style="styleObject">绑定内联样式</div>
	a={{a}},b={{b}}
	<div>计算属性fullName: {{fullName}}</div>
	<div>firstName: {{firstName}} / lastName: {{lastName}}</div>
	<input type="text" v-model="changeName">
	<p>changeName:{{changeName}}</p>
	<button @click="setProperty">赋值fullName</button>
</template>

<script>
export default {
	name: 'main',

	ready () {
		this.a = 3
	},

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
			},
			a: 1,
			firstName: 'Foo',
			lastName: 'Bar',
			changeName: null
		}
	},

	methods: {
		setProperty: function () {
			this.fullName = this.changeName
		}
	},

	computed: {
		b: function () {
			return this.a + 1
		},
		fullName: {
			// 计算属性默认getter
			get: function () {
				return this.firstName + ' ' + this.lastName// 依赖firstName和lastName
			},
			set: function (newValue) {
				let names = newValue.split(' ')
				this.firstName = names[0]
				this.lastName = names[names.length - 1]
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
