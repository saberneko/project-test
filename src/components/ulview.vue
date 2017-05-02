<template>
  <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
    <div class="mui-scroll">
      <div id="item1" class="mui-control-content mui-active">
        <!--数据列表-->
        <ul class="mui-table-view" style="margin-top:40px" >
          <li v-for="matter in hotLists" class='mui-table-view-cell mui-media'>
              <img class="mui-media-object mui-pull-left hot-list-img" src="static/images/top.net.ico">
              <div class="mui-media-info">
                <div class="mui-media-body">
                  {{matter.GP_name}}
                </div>
                <p class="mui-ellipsis hot-list-p">分值:{{matter.GP_Score}}</p>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import R from '../common/request'
import { GP } from '../common/index'

export default {

  name: 'ulview',

  data () {
    return {
      hotLists: null
    }
  },

  props: {
    msg: {
      type: String
    }
  },

  created () {
    this.getPersonalInfo()
  },

  methods:{
    getPersonalInfo () {
      return R.get('/Service/userinfo.ashx').then(data => {
        return data[0].GP_No
      }).then(res => {
        this.setDisplay(res)
      })
    },
    //获取关注事项更新视图
    setDisplay: function (Id_No) {
      R.post('/Service/GetAchievement.ashx', {
          'GP_No': Id_No
        }).then(data => {
          this.hotLists = data
        })
    }
  }
}
</script>

<style lang="css" scoped>
.hot-list-img{
  width:30px;
  height: 32px;
}
.mui-media-info{
  overflow: hidden;
}
.mui-table-view-cell div{
  font-size:0.9em;
}
.hot-list-p{
  font-size:13px;
}
.btn-focus{
  font-size:20px;
  color: #0086C8;
  border: 0px;
}
</style>
