<template>
	<span>This is from /user</span>
	<p>当前路由对象的路径：{{$route.path}}</p>
	<p>当前路径名：{{$route.name}}</p>
	<p>当前路由参数: {{$route.params | json}}</p>
	<p>{{$route.params.userId}}</p>
	<a v-link="{ path: 'bar'}">Go to /user/bar</a>
	<a v-link="{ path: '/bar'}">Go to /bar</a>
</template>

<script>
// export default {
// 	name: 'subman',

// 	data () {
//     	return {

//     	}
// 	}
// }
export default {
	name: 'user'
	// data () {
	// 	return {

	// 	}
	// }
}
</script>

<style lang="css" scoped>
</style>
