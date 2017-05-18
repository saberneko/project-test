<template>
<div class="migration">
  <topbar :back-route="{path: '/main'}" :title="'点滴记录'">
    <router-link tag="button" slot="button" class=" mui-pull-right mui-btn-link mui-back-color" :to="{path:'/research'}">成果添加</router-link>
  </topbar>
  <div class="topbar-two-column">
    <div class="mui-segmented-control">
      <a class="mui-control-item mui-active" @click="setDisplay('myfocus')">
        我的关注
      </a>
      <a class="mui-control-item" @click="setDisplay('achivement')">
        成果记录
      </a>
    </div>
  </div>
  <div v-show="mode === 'myfocus'" id="pullrefresh" class="mui-content mui-scroll-wrapper">
    <div class="mui-scroll">
      <div id="item1" class="mui-control-content mui-active">
        <!--数据列表-->
        <ul class="mui-table-view" style="margin-top:40px">
          <li v-for="(matter, index) in matterLists" class="mui-table-view-cell mui-media" :key="matter.GP_ProjectId">
              <img class="mui-media-object mui-pull-left hot-list-img" src="static/images/top.net.ico">
              <div class="mui-media-body mui-ellipsis">
                {{matter.GP_name}}
                <p class="mui-ellipsis hot-list-p" >关注度:{{matter.GP_hot}}</p>
                <p class="mui-ellipsis hot-list-p" >截止时间:{{matter.GP_Time}}</p>
              </div>
              <button class="mui-btn mui-icon btn-focus" :class="[matter.GP_IsMy === 1 ? 'mui-icon-star' : 'mui-icon-star-filled']" @click="removeFocus(matter.GP_ProjectId, index)"></button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <ulview v-show="mode === 'achivement'" :msg="'GetAchievement'" class="mui-table-view"></ulview>
</div>
</template>

<script>
import topbar from 'src/components/topbar'
import R from 'src/common/request'
import ulview from 'src/components/ulview'

export default {

  name: 'myrecord',

  created () {
    // window.mui('.mui-scroll-wrapper').scroll({
    //   deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    // })
    this.getFocusList()
  },

  data () {
    return {
      mode: 'myfocus',
      Id_No:null,
      matterLists:null,
      isRemove: false
    }
  },

  components: {
    topbar,
    ulview
  },

  methods:{
    // 获取关注列表
    getFocusList: function () {
      let {Id_No} = this.$data
      R.get('/Service/GetMyProjectList.ashx').then(res => {
        this.matterLists = res
      })
    },
    // 切换关注和成果列表
    setDisplay : function (info) {
      this.mode = info
    },
    // 移除关注项
    removeFocus: function (pid, index) {
      let e = event
      R.post('/Service/FocusProject.ashx', {
        'Id': pid
      }).then((res) => {
        let data = res.data
        switch (data) {
          case 'addSuccess':
            console.log('added')

            break
          case 'cancelSuccess':
            e.target.parentNode.classList.add('remove')
            setTimeout(() => {
              this.matterLists.splice(index, 1)
            }, 300)
            // remove matter
            break
          default:
            console.warn('wrong info')

            break
        }
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

.mui-table-view-cell div{
  font-size:0.9em;
}
.topbar-two-column{
  background-color: #efeff4;
  position:fixed;
  top: 44px;
  z-index: 999;
}
.btn-focus{
  font-size:20px;
  color: #0086C8;
  border: 0px;
}
.remove{
  -webkit-transform:transition3d(0,0,0);
  transform: transition3d(0,0,0);
  transform-origin: top;
  animation: remove_li 350ms ease-out 0s 1;
}
 @keyframes remove_li {
    from {
      transform: scaleY(1);
      opacity: 1;
    }
    to {
      transform: scaleY(0);
      opacity: 0;
    }
  }
</style>
