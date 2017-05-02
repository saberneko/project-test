<template>
  <div class="migration">
    <header class="mui-bar mui-bar-nav" v-link="{path:'/main'}">
      <a class="mui-icon mui-icon-left-nav mui-pull-left"></a>
      <a class="mui-icon mui-icon-reply mui-pull-right"></a>
      <h1 class="mui-title">修改密码</h1>
    </header>
    <p style="margin-top:60px">&nbsp;&nbsp;&nbsp;&nbsp;重要提示：建议密码采用数字与字母组合，增加安全性，并且不低于6位</p>
    <form class="mui-input-group">
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell">
          <a>学号<span id="TLM_no" class="mui-pull-right">{{Id_No}}</span></a>
        </li>
        <li class="mui-input-row" >
          <label>当前密码</label>
          <input id='pwd'type="password" v-model="Pwd" class="mui-input-clear mui-input" placeholder="请输入当前密码">
        </li>
        <li class="mui-input-row">
          <label>新密码</label>
          <input id='newpwd' type="password" v-model="NewPwd" class="mui-input-clear mui-input" placeholder="请输入新密码">
        </li>
        <li class="mui-input-row">
          <label>确认新密码</label>
          <input id='correctnewpwd' type="password" v-model="ConfirmNewPwd" class="mui-input-clear mui-input" placeholder="请确认新密码">
        </li>
      </ul>
      <div class="mui-button-row">
        <button id='btnconfirm' @click.prevent="confirm()" class="mui-btn mui-btn-primary">确认</button>
      </div>
    </form>
  </div>
</template>

<script>
import R from '../common/request'
import { GP } from '../common/index'

export default{
  name : 'modify',

  data () {
    return {
      Id_No:null,
      EmpNo:null,
      Pwd:null,
      NewPwd:null,
      ConfirmNewPwd:null
    }
  },

  ready () {
    this.getPersonalInfo()
  },

  methods:{
    confirm: function () {
      let { Id_No,EmpNo,Pwd,NewPwd,ConfirmNewPwd } = this.$data
      console.info('would post')
      return R.post('/Service/ChangePassword.aspx',{
        'GP_No': Id_No,
        'GP_Password': Pwd,
        'GP_NewPwd': NewPwd,
        'GP_ConfirmPwd': ConfirmNewPwd
      }).then(res => {
        let data = res.data
        switch (data) {
          case 'AmendSucceed' :
            window.mui.alert('修改成功')
            break

          case 'AmendFail' :
            window.mui.alert('当前密码错误或新密码不匹配')
            break

          default :
            window.mui.alert('其他错误')
            break
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
