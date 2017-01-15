<template>
<header class="mui-bar mui-bar-nav">
	<a class="main mui-icon mui-icon-left-nav mui-pull-left mui-back-color" @click="$router.go(backRoute)"></a>
	<slot name="title">
		<h1 class="mui-title">{{title ? title : ''}}</h1>
	</slot>
	<slot name="button"></slot>
</header>
</template>

<script>
export default {

	name: 'topbar',

	props: {
		title: {
			default: '标题',
			type: String
		},

		backRoute: {
			type: Object,
			default: function () {
				return {
					path: '/login'
				}
			}
		}
	}
}
</script>

<style lang="css" scoped>
</style>
