<template>
  <div>
    <topbar :back-route="{path: '/home'}" :title="detail_name"></topbar>
    <div class="mui-content content-text" v-html="content">
    </div>
    <button id="adding" type="button" class="mui-btn mui-btn-block mui-btn-adding" v-bind:class="[isFocused ? 'mui-btn-danger' : 'mui-btn-blue']" @click="focusProject">{{isFocused ? '取消关注' : '关注'}}</button>
  </div>
</template>

<script>
import topbar from 'src/components/topbar'
import R from 'src/common/request'
import { GP } from '../common/index'

export default {

  name: 'detail',

  components: {
    topbar
  },

  data () {
    return {
      UserId: null,
      content: null,
      detail_name: null,
      sub_name: null,
      isFocused: null
    }
  },

  created () {
    this.getDetail()
    this.getPersonalInfo()
  },

  methods: {
    getDetail () {
      let Id = this.$route.params.projectId

      if (!Id) {
        console.warn('Id required')
        return
      }

      return R.post('/Service/GetProjectDetail.ashx', {
        'Id': Id
      }).then(data => {
        if (data[0]['GP_ContentHTML'] != null) {
          data[0]['GP_ContentHTML'] = decodeURIComponent(data[0]['GP_ContentHTML'].replace(/src%3D%22%2Fueditor/g, ('src%3D%22' + encodeURIComponent(GP.ServiceUrl) + '%2Fueditor')))
        }

        let project = data[0]

        this.content = project.GP_ContentHTML
        this.detail_name = project.GP_name
        this.sub_name = project.GP_SubName

        // update the store
        // this.projectMap.set(Id, project)
        // this.$store.dispatch('SET_STORE', 'projectMap', this.projectMap)
        this.isFocused = project.IsMy === 0
      })
    },

    focusProject () {
      // let {UserId} = this.$data
      let pid = this.$route.params.projectId

      return R.post('/Service/FocusProject.ashx', {
        'Id': pid
      }).then(res => {
        let data = res.data
        switch (data) {
          case 'addSuccess':
            this.isFocused = true

            break
          case 'cancelSuccess':
            this.isFocused = false

            break
          default:
            console.warn('wrong data')

            break
        }
      })
    },

    queryList () {
      this.$store.dispatch('getHot5ProjectList').then(data => {
        // never use this to update `IsMy` it due to the lack in backend
        this.getDetail()
      })
    },

    getPersonalInfo () {
      return R.get('/Service/userinfo.ashx').then(data => {
        let info = data[0]
        this.Name = info.Name
        this.UserId = info.SystemUserId
      })
    }
  }
}
</script>

<style lang="css" scoped>
  body {
    overflow-x: hidden;
    background-color: #ffffff;
  }

  .top-content {
    position: relative;
    width: 100%;
    height: 150px;
    text-align: center;
    line-height: 150px;
    color: #434343;
  }

  .top-content img {
    vertical-align: middle;
  }

  .title {
    position: relative;
    margin: 0;
    color: #434343;
  }

  .middle {
    text-align: center;
  }

  .subtitle {
    font-size: 14px;
  }

  .item-info {
    color: #434343;
  }

  .item-icon {
    font-size: 19px;
    margin-right: 8px;
  }

  .mui-btn-adding {
    width: 90%;
    margin: 0 auto;
    padding: 10px 0;
    margin-top: 40px;
    margin-bottom: 50px;
  }

  .content-text {
    background-color: #FFFFFF;
    padding: 20px 15px;
    margin-top: 44px;
  }
</style>
