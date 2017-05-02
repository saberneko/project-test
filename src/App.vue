<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
// import { store } from 'src/vuex'
// import { getHot5ProjectList } from 'src/vuex/actions'

function requireAll (r) { r.keys().forEach(r) }
requireAll(require.context('url-loader?name=static/images/[name].[ext]!./assets/images/', true, /\.png|ico$/))

export default {

  name: 'App',

  data () {
    return {

    }
  },

  created () {
    // console.info(this.$router)
  }

}
</script>

<style lang="less">
// @import './assets/css/mui.min.css';

body {
  font-family: Microsoft YaHei;
}

</style>
