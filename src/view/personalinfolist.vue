<template>
  <div>
    <topbar :back-route="{path: '/main'}" :title="'个人信息'"></topbar>
    <div v-if="readFile" class="clip-mask" style="margin-top:50px;">
        <crop-wrapper :show.sync="readFile" :initial-file="readFile" :on-clip-data="onClipImg" ></crop-wrapper>
    </div>
    <div v-else class="mui-content" >
      <div class="tabbar-with-setting" style="margin-top:15px">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell">
            <a id="head" class="mui-navigate-right">头像
              <vue-core-image-upload :class="['pure-button','pure-button-primary','js-btn-crop']" :crop="false" url=""
              extensions="png,jpeg,gif,jpg" v-on:imageuploaded="imageuploaded"></vue-core-image-upload>
              <!-- <img ref="avatar" class="mui-action-preview mui-media-object mui-pull-right" id="head-img1" :src="Img"/>
              <input class="fileInput" type="file" accept="image/*" @change="onFileChange"> -->
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
  </div>
</template>

<script>
import topbar from 'src/components/topbar'
import R from 'src/common/request'
import VueCoreImgUpload from 'vue-core-image-upload'

const defaultpic = require('../assets/images/user-photo.png')

let reader = new FileReader()

export default {

  name: 'personalinfolist',

  data () {
    return {
      Name: null,
      Id_No: null,
      Img: defaultpic,
      AvatarSrc: '',
      Imgclip: null,
      readFile: null,
      src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'
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
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files

      if (!files.length) {
        return
      }

      let [ file ] = files
      this.readFile = file
    },
    onClipImg (data) {
      console.info(this)

      if (data) {
        this.Img = data
        this.readFile = null
      }
    },
    drawImg () {
      console.info(this.$els, this.$els.imageDrawer)
      let canvas = this.$els.imageDrawer, // document.getElementById('canvas'),
        image = document.getElementById('testImg'),
        ctx = canvas && canvas.getContext('2d')

      // ctx.drawImage(image,22,33,100,100,0,0,100,100)
      // console.info(ctx)
    }
  },

  events: {
    imageuploaded (res) {
      if (res.errcode === 0) {
        this.src = 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png'
      }
    }
  },

  components: {
    topbar,
    // CropWrapper,
    'vue-core-image-upload': VueCoreImgUpload
  }
}
</script>

<style lang="less" scoped>
html,body {
  padding: 0;
  margin: 0;
}

.mui-table-view .mui-media-object {
    margin-right: 20px;
}
</style>
