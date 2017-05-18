 <template>
   <div class="mui-content">
    <div class="img-box">
      <img class="img" :src="'static/images/user-photo.png'"/>
    </div>
    <form class="mui-input-group">
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-input-row">
          <label>学号</label>
          <input id='empno' type="text" v-model="EmpNo" class="mui-input-clear mui-input" placeholder="请输入学号">
        </li>
        <li class="mui-input-row">
          <label>密码</label>
          <input id='pwd' type="password" v-model="Pwd" class="mui-input-clear mui-input" placeholder="请输入密码">
        </li>
      </ul>
    </form>
    <div class="mui-content-padded">
      <button id='btnLogin' @click="login()" class="mui-btn mui-btn-block mui-btn-default">登录</button>
    </div>
    <div class="checkbox">
      <div class="checkbox-item">
        <input type="checkbox" value="记住密码" v-model="checkNames">
        <label for="记住密码">记住密码 </label>
      </div>
      <div class="checkbox-item">
        <input type="checkbox" value="忘记密码" v-model="code">
        <label for="忘记密码">忘记密码 </label>
      </div>
    </div>
    <p class="footer">浙江工商大学智慧教育工作室<br/>All Rrights Reserved</p>
  </div>
</template>
<script>
import R from '../common/request'
import { GP } from '../common/index'

export default {

  name: 'login',

  methods: {
    login : function () {
      let { EmpNo, Pwd } = this.$data

      if (EmpNo === '' || Pwd === '') {
        window.mui.toast('请输入学号和密码')
        return
      }

      console.log(Pwd)

      return R.post('/Service/Login/Login.ashx?r=' + Date.now().toString(), {
        'GP_No':EmpNo,
        'GP_Password':Pwd
      }).then(dat => {
        if ((!dat.ErrorMessage) && dat.LoginResult === 'Success') {
          window.localStorage.empno = EmpNo

          this.$router.push({path: '/home'})
        } else {
          window.mui.alert('工号或密码错误')
        }
      })
    }
  },

  data () {
    return {
      EmpNo: '',
      Pwd: '',
      checkNames:[],
      code:''
    }
  }
}
</script>

<style lang="less" scoped>

.mui-checkbox input[type=checkbox],
.mui-radio input[type=radio] {
  top: 6px;
}
.mui-content-padded {
  margin-top: 25px;
  margin-bottom: 25px;
}
.mui-btn {
  padding: 10px;
}
.link-area {
  display: block;
  margin-top: 25px;
  text-align: center;
}

.mui-content{
  width: 100vw;
  height: 100vh;
  background:#fff;
}

.fonts{font-size:40px;
       margin:40px 1200px 20px 10px;}

.content-text {
  padding: 40px 15px;
}
.sub-page {
  top: 45px;
  bottom: 0px;
}
.img-box{
  text-align: center;
  padding:80px 0px 10px 0px;
}
.img-box{
  .img {
    width: 100px;
    height: 100px;
    max-height: 100%;
    max-width: 100%;
  }
}

.mui-btn-default {
  color: #ffffff;
  border: 0;
  background-color: #333;
}
.checkbox{
  display: flex;
  justify-content: center;
  margin-bottom: 40%;
}
.checkbox-item{
  margin-right: 8px;
  margin-left: 8px;
}
.footer{
  position: absolute;
  bottom: 30px;
  left: 50%;
  margin-left: -90px;
  text-align: center;
}
</style>
