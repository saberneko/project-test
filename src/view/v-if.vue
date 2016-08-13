<template>
	<h1 v-if="ok">Yes</h1>
	<h1 v-else>No</h1>
	<p v-show="ok">Hello!保持在dom中,display:none</p>
	<div v-if="Math.random() > 0.5">
		Sorry
	</div>
	<div v-else>
		Not sorry
	</div>
	<ul id="example-1">
		<li v-for="item in items" v-bind:class="[item.message]">
			{{parentMessage}} - {{$index}} - {{item.message}}
		</li>
	</ul>
	<ul>
		<template v-for="item in items">
			<li>{{ item.message }}</li>
			<li class="abc" v-bind:class="classObject"></li>
		</template>
	</ul>
</template>

<script>
export default {

	name: 'v-if',

	data () {
		return {
			parentMessage: 'Parent',
			items: [
				{message: 'Foo'},
				{message: 'Bar'}
			],
			classObject: {
				'classb': true
			}
		}
	}
}
</script>

<style lang="css" scoped>
.classb{
	background-color: rgba(12,45,87,0.5);
}
.Foo{
	background-color: rgba(12,34,76,0.5);
}
.Bar{
	background-color: rgba(23,54,76,0.5);
}
</style>
