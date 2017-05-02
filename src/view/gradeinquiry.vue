<template>
  <div class="migration">
    <header class="mui-bar mui-bar-nav" v-link="{path:'/main'}">
      <a class="mui-icon mui-icon-left-nav mui-pull-left"></a>
      <a class="mui-icon mui-icon-reply mui-pull-right"></a>
      <h1 class="mui-title">成绩查询</h1>
    </header>
    <form class="mui-input-group" style="margin-top:70px" >
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell">
          <a>姓名<span id="TLM_name" class="mui-pull-right">{{Name}}</span></a>
        </li>
        <li class="mui-table-view-cell">
          <a>学号<span id="TLM_no" class="mui-pull-right">{{Id_No}}</span></a>
        </li>
        <li class="mui-table-view-cell">
          <a>成绩总分<span id="TLM_grade" class="mui-pull-right">{{Grade}}</span></a>
        </li>
        <li class="mui-table-view-cell">
          <a>综测总分<span id="TLM_zcgrade" class="mui-pull-right">{{ZcGrade}}</span></a>
        </li>
        <li class="mui-table-view-cell">
          <a>专业排名<span id="TLM_rank" class="mui-pull-right">{{Rank}}</span></a>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import R from 'src/common/request'
import { GP } from '../common/index'

export default {
  name : 'inquiry',

  data () {
    return {
      Id_No : null,
      Name : null,
      Grade :null,
      ZcGrade :null,
      Rank : null
    }
  },

  ready () {
    this.getPersonalInfo()
    this.getfinalgrade()
  },

  methods: {
    getPersonalInfo: function () {
      return R.get('/Service/userinfo.ashx').then(data => {
        let info = data[0]
        this.Name = info.Name
        this.Id_No = info.GP_No
      })
    },

    getfinalgrade: function () {
      let {Id_No} = this.$data
      return R.get('/Service/GradeInquery.aspx',{
        'GP_No':Id_No
      }).then(data => {
        let info = data[0]
        this.Rank = info.GP_AriRank
        this.Grade = info.GP_Totalscore
      })
    }
  }
}
</script>
