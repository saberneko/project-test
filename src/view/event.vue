<template>
	<div id="example">
		<button v-on:click="greet">Greet</button>
		<div @click="say('div1')" class="div1">
			<a v-on:click.stop="greet">stopPropagation</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'event',

	data () {
		return {
			name: 'Saberneko'
		}
	},

	methods: {
		greet: function (event) {
			console.log('Hello ' + this.name + '!')
			console.log(event.target.tagName)
		},
		say: function (msg) {
			console.log('Hello' + msg)
		}
	}
}
</script>

<style lang="css" scoped>
.div1{
	display:flex;
	width: 100%;
	height: 100px;
	background-color: rgba(12,45,87,0.8);
	justify-content: center;
	align-items: center;
}
</style>
