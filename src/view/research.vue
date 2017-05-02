<template>
  <div class="migration">
<!--     <header class="mui-bar mui-bar-nav" v-link="{path:'/main'}">
    <a class="mui-icon mui-icon-left-nav mui-pull-left"></a>
    <a class="mui-icon mui-icon-reply mui-pull-right"></a>
    <h1 class="mui-title">成果记录申请</h1>
    </header> -->
    <form class="mui-input-group" style="margin-top:70px" >
      <div class="mui-table-view-cell">
        <a>学号<span id="TLM_no" class="mui-pull-right">{{Id_No}}</span></a>
      </div>
      <div class="card">
      <div class="mui-input-row">
      <label>申请大类</label>
        <bigpicker :bigmatter="'big'"></bigpicker>
        </div>
        </div>
        <div class="mui-input-row" >
        <label>申请事项</label>
        <input id='project' type="text" v-model="Project" class="mui-input-clear mui-input" placeholder="请填写申请事项名">
      </div>
      <div class="mui-input-row" >
        <label>分值</label>
        <input id='grade' type="text" v-model="Grade" class="mui-input-clear mui-input" placeholder="请填写分值">
      </div>
      <div class="card">
      <div class="mui-input-row">
      <label>获奖时间</label>
      <datepicker :time="'day'"></datepicker>
      </div>
        </div>
      <div class="mui-input-row" style="margin: 10px 5px;">
      <label>备注</label>
      <textarea id='reason' type="text" v-model="Reason" rows="5" placeholder="说明确定该分值的理由"></textarea>
      </div>
      <div class="mui-button-row">
        <button id='btnverify' class="mui-btn mui-btn-primary" @click.prevent="verify()">确认</button>&nbsp;&nbsp;
        <button id='btncancel' class="mui-btn mui-btn-primary" @click.prevent="cancel()">取消</button>
      </div>
    </form>
  </div>
</template>

<script>
import R from '../common/request'
import { GP } from '../common/index'
import datepicker from '../components/vue-datepicker-1'
import bigpicker from 'src/components/bigpicker'

export default {

  name: 'research',

  created () {
    window.mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
    this.getPersonalInfo()
  },

  data () {
    return {
      big:null,
      Id_No:null,
      Project:null,
      day:null,
      Grade: null,
      Reason:null
    }
  },
  components:{
    datepicker: datepicker,
    bigpicker:bigpicker
  },

  methods: {
    verify: function (Id) {
      let {Id_No,big,Project,day,Grade,Reason} = this.$data
      console.info('would post')
      return R.post('/Service/ApplyAchievement.aspx',{
        'GP_No':Id_No,
        'GP_Big':big,
        'GP_Project':Project,
        'GP_Day':day,
        'GP_Grade':Grade,
        'GP_Reason':Reason
      }).then(res => {
        let data = res.data
        if (data === 'Success') {
          window.mui.alert('申请成功')
        }
      })
    },

    cancel: function () {
      window.mui.alert('请重新申请')
    },

    getPersonalInfo: function () {
      return R.get('/Service/userinfo.ashx').then(data => {
        let info = data[0]
        this.Name = info.Name
        this.Id_No = info.GP_No
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
