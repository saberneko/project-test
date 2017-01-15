<template>
	<h3>v-if:</h3>
	<span v-if="parentMessage === 'Parent'">Yes</span>
	<span v-else>No</span>
	<p v-show="ok">Hello!保持在dom中,display:none</p>
	<div v-if="Math.random() > 0.5">
		Sorry(if)
	</div>
	<div v-else>
		Not sorry(else)
	</div>
	<h3>v-for:</h3>
	<ul id="example-1">
		<li v-for="item in items" v-bind:class="[item.message]" track-by="$index">
			{{parentMessage}} - {{$index}} - {{item.message}}
		</li>
	</ul>
	<input type="text" v-model="newItem.message" placeholder="输入新元素">
	<button @click="changeArray">filter 'Foo' in items</button>
	<button @click="pushArray">push items</button>
	<h3>对象v-for="(key,val) in object"</h3>
	<ul>
		<template v-for="(key,val) in object">
			<li>{{ key }}: {{val}}</li>
			<li class="abc" v-bind:class="classObject">{{val}}</li>
		</template>
	</ul>
	<h3>filterBy 'Parent' in 'message' of item</h3>
	<ul id="example-1">
		<li v-for="item in items | filterBy parentMessage in 'message'" v-bind:class="[item.message]" track-by="$index">
			{{parentMessage}} - {{$index}} - {{item.message}}
		</li>
	</ul>
	<h4>输入提示</h4>
	<div>
		<input type="text" v-model="name">
		<ul>
			<li v-for="user in users | filterBy name in 'name'">
				{{user.name}}
			</li>
		</ul>>
	</div>
</template>

<script>
export default {

	name: 'v-if',

	data () {
		return {
			parentMessage: 'Parent',
			items: [
				{message: 'Foo'},
				{message: 'Bar'},
				{message: 'Parent'}
			],
			classObject: {
				'classb': true
			},
			newItem: {
				message: ''
			},
			object: {
				FirstName: 'John',
				LastName: 'Doe',
				Age: 30
			},
			name: '',
			users: [
				{name: 'Saber'},
				{name: 'Lancer'},
				{name: 'Archer'},
				{name: 'Rider'}
			]
		}
	},

	methods: {
		changeArray: function () {
			this.items = this.items.filter(function (item) {
				return item.message.match(/Foo/)
			},this)
		},
		pushArray: function () {
			this.items.push(this.newItem)
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
ul{
	list-style: none;
}
</style>
