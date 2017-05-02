<template>
<div>
  <header class="mui-bar mui-bar-nav">
    <a id="back" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left mui-back-color"></a>
    <h1 id="title" class="mui-title">小类</h1>
  </header>
  <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
    <div class="mui-scroll">
      <!--数据列表-->
      <ul class="mui-table-view">
        <router-link tag="li" class="mui-table-view-cell" v-for="smallItem in lists" :key="smallItem.GP_Matter_smallId" :to="{ path: '/matterlist/' + smallItem.GP_Matter_smallId }">
          <a class="mui-navigate-right" href="">{{smallItem.GP_name}}</a>
        </router-link>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import R from 'src/common/request'

export default {

  name: 'smallclasses',

  data () {
    return {
      lists: null
    }
  },

  created () {
    window.mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005
    })

    this.getSmallClass()
  },

  methods: {
    getSmallClass () {
      let FirstTime = '2016-01-01',
        bigClassId = this.$route.params.bigId

      return R.post('/Service/GetSmallMatterList.ashx', {
        Id: bigClassId,
        CreatedOn: FirstTime,
        _flag: 're'

      }).then(data => {
        this.lists = data
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
