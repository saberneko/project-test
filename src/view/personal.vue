<template>
  <div id="subdiv_setting" class="mui-content">
    <div class="tabbar-with-setting">
      <ul class="mui-table-view mui-table-view-chevron" style="margin:10px 0px 15px 0px;">
        <router-link class="mui-table-view-cell mui-media mui-table-view-cellExt" tag="li" to="/personalinfolist">
          <a class="mui-navigate-right">
            <img id="userimg" class="mui-media-object mui-pull-left" src="static/images/user-photo.png">
            <div class="mui-media-body">
              <label>{{userName}}</label>
              <p class='mui-ellipsis'>{{userNo}}</p>
            </div>
          </a>
        </router-link>
      </ul>
      <ul class="mui-table-view" style="margin-top: 15px;">
        <router-link id="MyProjectListA" class="mui-table-view-cell mui-table-view-cellExt" tag="li" to="/myrecord">
            <a class="mui-navigate-right" id="MyProjectList">
              点滴记录
            </a>
        </router-link>
        <!--add yours-->
        <router-link class="mui-table-view-cell mui-table-view-cellExt" tag="li" to="/gradeinquiry">
          <a class="mui-navigate-right" id="MySeekScoreList">
            成绩查询
          </a>
        </router-link>
      </ul>

      <ul class="mui-table-view" style="margin-top: 15px;">
        <router-link class="mui-table-view-cell mui-table-view-cellExt" tag="li" to="/message">
          <a class="mui-navigate-right" id="MyApplicationList">
            系统消息
          </a>
        </router-link>
        <router-link class="mui-table-view-cell mui-table-view-cellExt" tag="li" to="/feedback">
          <a class="mui-navigate-right" id="My/feedback.html">
            意见反馈
          </a>
        </router-link>
      </ul>

      <ul class="mui-table-view" style="margin-top: 15px;">
        <router-link class="mui-table-view-cell mui-table-view-cellExt" tag="li" to="/aboutus">
          <a class="mui-navigate-right" id="My/aboutus.html">
            关于我们
          </a>
        </router-link>
        <router-link class="mui-table-view-cell mui-table-view-cellExt" tag="li" to="/modify">
          <a class="mui-navigate-right" id="My/modify.html">
            修改密码
          </a>
        </router-link>
      </ul>

      <ul class="mui-table-view" style="margin-top: 25px;">
        <router-link class="mui-table-view-cell mui-table-view-cellExt" tag="li" to="/login">
          <a id="exit" style="text-align: center;color: #FF3B30;">
            退出
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import R from '../common/request'

export default {

  name: 'personal',

  data () {
    return {
      userName: null,
      userNo: null,
      userId: null
    }
  },

  created () {
    this.showPersonalInfo()
  },

  methods: {
    showPersonalInfo () {
      return R.post('/Service/userinfo.ashx?r=' + Date.now().toString()).then(data => {
        window.localStorage.user = JSON.stringify(data[0])
        window.localStorage.SystemUserId = data[0].SystemUserId
        this.userName = data[0].Name
        this.userNo = data[0].GP_No
      })
    }
  }
}
</script>

<style lang="css" scoped>
.tabbar-with-setting {
  margin-top: 44px;
}
</style>
