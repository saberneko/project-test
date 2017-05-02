<template>
<div class="migration">
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <button id="submit" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @click="submit()">发送</button>
    <h1 class="mui-title" v-link="{path:'/main'}">问题反馈</h1>
  </header>
  <div class="mui-content">
    <div class="mui-content-padded">
      <div class="mui-inline">标题</div>
    </div>
  </div>
  <div class="mui-input-row">
    <textarea id='title' type="text" style="height:80px" v-model="Title" class="mui-input-clear title" placeholder="请输入反馈意见的标题"></textarea>
  </div>
  <div class="mui-content">
    <div class="mui-content-padded">
      <div class="mui-inline">问题和意见</div>
    </div>
  </div>
  <div class="mui-input-row">
    <textarea id='question' type="text" style="height:150px" v-model="Question" class="mui-input-clear" placeholder="请详细描述你的问题和意见..."></textarea>
  </div>
  <div class="mui-input-row" >
    <label>QQ/邮箱</label>
    <div class="mui-input-row">
      <input id='contact' type="text" v-model="Contact" class="mui-input-clear contact" placeholder="(选填,方便我们联系你 )" />
    </div>
  </div>
</div>
</template>

<script>
import R from '../common/request'
import { GP } from '../common/index'

export default {
  name: 'feedback',

  data () {
    return {
      Id_No: null,
      Title: null,
      Question: null,
      Contact: null
    }
  },

  ready () {
    this.getPersonalInfo()
  },

  methods:{
    submit: function () {
      let {Id_No,Title,Question,Contact} = this.$data

      if (Title === '' || Question === '' || Contact === '') {
        window.mui.alert('请输入标题和问题及意见')
        return
      }

      return R.post('/Service/GetFeedback.aspx', {
        'GP_No': Id_No,
        'GP_Title': Title,
        'GP_question': Question,
        'GP_Contact': Contact
      }).then(res => {
        let data = res.data
        if (data === 'FeedbackSucceed') {
          window.mui.alert('意见反馈成功')
        } else if (data === 'FeedbackFail') {
          window.mui.alert('请重新添加意见')
        } else {
          window.mui.alert('其他错误')
        }
      })
    },

    getPersonalInfo () {
      return R.get('/Service/userinfo.ashx').then(data => {
        let info = data[0]
        this.Name = info.Name
        this.Id_No = info.GP_No
      })
    }
  }
}
</script>

