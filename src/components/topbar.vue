<template>
<header class="mui-bar mui-bar-nav">
<!--   <a class="main mui-icon mui-icon-left-nav mui-pull-left mui-back-color" @click="goBack"></a>
 -->
  <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left mui-back-color"></a>
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
  },

  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
