<template>
<div v-show="show" class="cropper-modal">
  <div class="overlay"></div>
  <div class="modal">
    <div class="modal-content clearfix">
      <div class="img-clip-wrap">
        <div class="container-bg">
          <div class="img-container">
            <img id="clip_src_img" @load="srcImgLoaded">
            <div class="shadow-box"></div>
            <Select-Box v-ref:box :radio="radio" :img="img"></Select-Box>
          </div>
        </div>
        <!-- <div class="reset-img">
          <i class="icon-reset"></i>
          <span>select image</span>
          <input type="file" id="file_input" accept="image/*" @change="fileChange">
        </div> -->
      </div>
      <!-- <div class="img-preview-wrap">
        <div class="pre-container">
          <img id="clip_res_img">
        </div>
        <div class="pre-info">preview</div>
      </div> -->
    </div>
    <div class="modal-footer">
      <a class="modal-btn btn-confirm" @click.prevent="selectClip()">裁剪</a>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */

// copy from the existed project vue-image-clip , thx to the author of it : )
import SelectBox from './selectbox'
let fd = new FileReader()

export default {
  components: {
    SelectBox
  },

  props: {
    show: {
      type: Boolean,
      default: false,
      twoway: true,
      coerce: function (val) {
        return !!val // 将值转换为字符串
      }
    },
    initialFile: {
      type: [Boolean, File],
      default () {
        return null
      }
    },

    onClipData: {
      type: Function,
      default () {
        return (data) => {}
      }
    }
  },

  data () {
    return {
      $srcImg: null,
      $resImg: null,
      img: null,
      $input: null,
      $imgContainer: null,
      $preContainer: null,
      nw: 0,
      nh: 0,
      clipData: null,
      radio: 16 / 10
    }
  },
  events: {
    selectChange () {
      let rec = this.$refs.box.rec
      if (rec.w > 0 && rec.h > 0) {
        // this.updatePreview()
      }
    },
    selectEnd () {
      let rec = this.$refs.box.rec
      if (rec.w > 0 && rec.h > 0) {
        this.clip()
      }
    }
  },

  watch: {
    img (img) {
      this.$srcImg.src = img
      // this.$resImg.src = img
      return img
    }
  },

  ready () {
    this.$input = this.$el.querySelector('#file_input')
    this.$srcImg = this.$el.querySelector('#clip_src_img')
    // this.$resImg = this.$el.querySelector('#clip_res_img')
    this.$imgContainer = this.$el.querySelector('.img-container')
    this.$preContainer = this.$el.querySelector('.pre-container')
    this.$containerBox = this.$el.querySelector('.container-bg')

    fd.onloadend = () => {
      this.img = fd.result
    }

    if (this.initialFile) {
      fd.readAsDataURL(this.initialFile)
    }
  },

  beforeDestroy () {
  },

  methods: {
    fileChange () {
      if (this.$input.files && this.$input.files[0]) {
        fd.readAsDataURL(this.$input.files[0])
      }
    },
    srcImgLoaded () {
      this.nw = this.$srcImg.naturalWidth
      this.nh = this.$srcImg.naturalHeight
      this.clearSelect()
      this.setImgSize()
      // this.updatePreview()
      this.clip()
    },
    setImgSize () {
      let nr = this.nw / this.nh,
        scw = this.$containerBox.offsetWidth,
        sch = this.$containerBox.offsetHeight,
        w = 0,
        h = 0,
        mt = 0,
        rw = 0,
        rh = 0

      if (nr >= this.radio) {
        //  宽撑满
        w = scw
        h = scw / nr
        mt = (sch - h) / 2
        rh = h
        rw = rh * this.radio
      } else {
        //  高撑满
        h = sch
        w = sch * nr
        rw = w
        rh = rw / this.radio
      }
      console.info(scw, sch)
      this.$imgContainer.setAttribute('style', `width:${w}px;height:${h}px;top:${mt}px;`)
      this.$refs.box.rec = { w: rw, h: rh, l: 0, t: 0 }
      this.$broadcast('imgSizeChange', { w, h })
    },
    clearSelect () {
      let box = this.$refs.box
      if (box) {
        box.clearRec()
      }
      this.clipData = null
    },
    getComputedRec (r) {
      let cw = this.$imgContainer.offsetWidth
      let ch = this.$imgContainer.offsetHeight
      let wr = cw / this.nw
      let hr = ch / this.nh
      return { l: r.l / wr, t: r.t / hr,
        w: r.w / wr, h: r.h / hr }
    },
    updatePreview () {
      let rec = this.$refs.box.rec
      let pcw = this.$preContainer.offsetWidth
      let pch = this.$preContainer.offsetHeight
      let wr = pcw / rec.w
      let hr = pch / rec.h
      let w = wr * this.$imgContainer.offsetWidth
      let h = hr * this.$imgContainer.offsetHeight
      let l = -rec.l * wr
      let t = -rec.t * hr
      this.$resImg.setAttribute('style',`width:${w}px;height:${h}px;top:${t}px;left:${l}px;`)
    },
    clip () {
      let rec = this.$refs.box.rec
      if (!rec.w || !rec.h) {
        return
      }

      let bufferCanvas = document.createElement('canvas')
      let bfx = bufferCanvas.getContext('2d')
      let computedRec = this.getComputedRec(rec)
      bufferCanvas.width = computedRec.w
      bufferCanvas.height = computedRec.h
      bfx.drawImage(this.$srcImg, -computedRec.l, -computedRec.t, this.nw, this.nh)
      this.clipData = bufferCanvas.toDataURL('image/jpeg', 1)
    },
    selectClip () {
      if (this.onClipData && typeof this.onClipData === 'function') {
        this.onClipData(this.clipData)
        this.show = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.cropper-modal .modal {
  // width: 840px
  // height: 524px
  height 100vh
  background-color: #fff
}
.modal-head {
  position: relative
  text-align: center
  padding: 0 16px 0 40px
}
.head-wrap {
  position: relative
  font-size: 14px
  color: #222
  height: 50px
  line-height: 50px
  border-bottom: 1px solid #e5e9ef
}
.modal-content {
  // padding: 30px 40px 40px
}
.img-clip-wrap {
  width 100%
  border-right: 1px solid #e5e9ef
  float: left
}
.container-bg {
  // width: 480px
  width 100%
  height 100%
  min-height: 300px
  overflow hidden
  background-color: #000
  border-radius: 4px
}

.img-container {
  position: relative
  height: 0
  margin: auto
}

.img-container img{
  position: relative
  width: 100%
  height: 100%
}

.img-container .shadow-box {
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, .5)
  z-index: 1
}

.reset-img {
  position: relative
  display: inline-block
  margin-top: 16px
  color: #6d757a
  font-size: 12px
  cursor: pointer
  overflow: hidden
}

.reset-img input {
  position: absolute
  font-size: 100px
  right: 0
  top: 0
  opacity: 0
  cursor: pointer
}

.reset-img:hover {
  color: #00b5e5
}

.img-preview-wrap {
  width: 240px
  // float: right
  display block
}

.pre-container {
  width: 240px
  height: 150px
  background-color: #000
  overflow: hidden
  border-radius: 4px
}

.pre-container img {
  position: relative
  width: 100%
  height: 100%
  border-radius: 4px
}

.pre-info {
  margin-top: 20px
  font-size: 12px
  color: #99a2aa
}

.clearfix:before,.clearfix:after {
  content: ' '
  display: table
}

.clearfix:after {
  clear: both
}

.modal-footer {
  margin-top 2em
  text-align: center
}

.modal-btn {
  display: inline-block
  width: 110px
  height: 32px
  font-size: 14px
  line-height: 32px
  border-radius: 4px
  cursor: pointer
  text-decoration: none
}

.btn-confirm {
  border: 1px solid #00a1d6
  color: #fff
  background-color: #00a1d6
}

.btn-confirm:hover {
  background-color: #00b5e5
}

</style>
