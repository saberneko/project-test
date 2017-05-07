<template>
  <div>
    <topbar :back-route="{path: '/main'}" :title="'个人信息'"></topbar>
    <div class="mui-content" >
      <div class="tabbar-with-setting" style="margin-top:15px">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell">
            <a id="head" class="mui-navigate-right" @click="triggerClipImg($event)">头像
              <img class="mui-action-preview mui-media-object mui-pull-right" :src="clipUrl"></img>
              <input class="file" type="file" accept="imags/*" @change="clipImg($event)" ref="input">
            </a>
          </li>
          <li class="mui-table-view-cell">
            <a>姓名<span id="TLM_name" class="mui-pull-right">{{Name}}</span></a>
          </li>
          <li class="mui-table-view-cell">
            <a>性别<span id="TLM_sex" class="mui-pull-right"></span></a>
          </li>
        </ul>

        <ul class="mui-table-view" style="margin-top: 15px;">
          <li class="mui-table-view-cell">
            <a>班级<span id="TLM_class" class="mui-pull-right"></span></a>
          </li>
          <li class="mui-table-view-cell">
            <a>学号<span id="TLM_no" class="mui-pull-right">{{Id_No}}</span></a>
          </li>
          <li class="mui-table-view-cell">
            <a class="mui-navigate-right">关键词<span class="mui-pull-right" style="margin-right: 17px;" id="">肉</span></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="clip-wp" id="clip-wp" v-show="isClip">
      <div id="container">
        <canvas id="image-box"></canvas>
        <canvas id="cover-box"></canvas>
      </div>
      <div class="clip-ft">
        <button class="btn btn-cancel" id="cancel-img" @click.stop="cancelImg">取消</button>
        <button class="btn btn-save" id="save-img" @click.stop="saveImg">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import topbar from 'src/components/topbar'
import R from 'src/common/request'
import Clip from 'src/common/clip'
// import VueCoreImgUpload from 'vue-core-image-upload'

const defaultpic = require('../assets/images/user-photo.png')

let reader = new FileReader()

export default {

  name: 'personalinfolist',

  data () {
    return {
      Name: null,
      Id_No: null,
      isClip: false,
      clipUrl: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'
    }
  },

  created () {
    this.getPersonalInfo()
  },

  methods: {
    getPersonalInfo () {
      return R.get('/Service/userinfo.ashx?r=' + Date.now().toString()).then(data => {
        let info = data[0]
        this.Name = info.Name
        this.Id_No = info.GP_No
      })
    },
    triggerClipImg () {
      this.$refs.input.click()
    },
    clipImg (e) {
      this.clip = new Clip('container', 'image-box', 'cover-box', this)
      this.clip.init(e.target.files[0])
      this.isClip = true
    },
    saveImg () {
      this.isClip = false
      this.clip.saveImg()
    },
    cancelImg () {
      this.clip.cancelImg()
    }
  },

  components: {
    topbar
  }
}
</script>

<style lang="less" scoped>
html,body {
  padding: 0;
  margin: 0;
}

div{
  border: 0;
}

input {
  display: none
}

button {
  outline: none;
  border: 0;
  background-color: inherit;
  color: inherit;
  font-size: inherit;
}

.mui-table-view .mui-media-object {
    margin-right: 20px;
}
.clip-wp {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #000;
  text-align: center;
  #container {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    top: 20px;
    bottom: 80px;
    background-color: #000;
  }
  .clip-ft {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    bottom: 0;
    height: 80px;
    background-color: #000;
    color: #ffffff;
    font-size: 0.9em;
    .btn {
      width: 30%;
      height: 35px;
      margin: 0 20px;
      text-align: center;
      &:active {
        color: #777777;
      }
    }
    .btn-save {
      background-color: #4285f4;
      &:active {
        background-color: #376ec7;
      }
    }
    .btn-cancel {
      background-color: #c74d3e;
      &:active {
        background-color: #bb3f30;
      }
    }
  }
}
#image-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
#cover-box{
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  margin: auto;
}
</style>
