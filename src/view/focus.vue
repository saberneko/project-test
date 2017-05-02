 <template>
  <div class="mui-control-content mui-active">
    <div id="slider" class="mui-slider">
      <div class="mui-slider-group mui-slider-loop">
        <!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
        <div class="mui-slider-item mui-slider-item-duplicate">
          <a href="#">
            <img :src="'static/images/img1.png'">
          </a>
        </div>
        <!-- 第一张 -->
        <div class="mui-slider-item">
          <a href="#">
            <img :src="'static/images/img1.png'">
          </a>
        </div>
        <!-- 第二张 -->
        <div class="mui-slider-item">
          <a href="#">
            <img :src="'static/images/img1.png'">
          </a>
        </div>
        <!-- 第三张 -->
        <div class="mui-slider-item">
          <a href="#">
            <img :src="'static/images/img1.png'">
          </a>
        </div>
        <!-- 第四张 -->
        <div class="mui-slider-item">
          <a href="#">
            <img :src="'static/images/img1.png'">
          </a>
        </div>
        <!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
        <div class="mui-slider-item mui-slider-item-duplicate">
          <a href="#">
            <img :src="'static/images/img1.png'">
          </a>
        </div>
      </div>
    </div>
    <ul class="mui-table-view mui-grid-view mui-grid-9" style="background-color: #FFFFFF;">
    <!-- v-link="{ path: '/smallclass/' + topItem.GP_Matter_bigId }" -->
      <router-link  tag="li" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" v-for="(topItem, index) in lists" :key="topItem.GP_Matter_bigId" :to="{ path: '/smallclass/' + topItem.GP_Matter_bigId }">
        <!-- <a> -->
          <img class="img-icon" :src="'/static/images/img' + index + '.ico'">
          <div class="font-color img-icon-title">{{topItem.GP_name}}</div>
        <!-- </a> -->
      </router-link>
    </ul>
    <!-- <pre>{{hotLists | json}}</pre> -->
    <ul class="mui-table-view">
    <!-- v-link="{ path: '/detail/' + hotItem.GP_ProjectId }" -->
      <router-link tag="li" class="mui-table-view-cell mui-media" v-for="hotItem in hotLists" :key="hotItem.GP_ProjectId" :to="{ name: 'detail', params: { projectId: hotItem.GP_ProjectId} }">
          <img class="mui-media-object mui-pull-left hot-list-img" src="../assets/images/top.net.ico">
          <div class="mui-media-body mui-ellipsis hot-list-div">{{hotItem.GP_name}}
          <p class="mui-ellipsis hot-list-p" >关注度:{{hotItem.GP_hot}}</p>
          <p class="mui-ellipsis hot-list-p" >截止时间:{{hotItem.GP_Time}}</p>
          </div>
          <button class="mui-btn mui-icon btn-focus" v-bind:class="[!!hotItem.IsMy ? 'mui-icon-star' : 'mui-icon-star-filled']" @click.prevent="focusProject(hotItem.GP_ProjectId)"></button>
      </router-link>
    </ul>
<!--     {{ hotLists }} -->
  </div>
</template>

<script>
/* eslint-disable */
import R from '../common/request'
import { GP } from '../common/index'

function requireAll (r) { r.keys().forEach(r) }
requireAll(require.context('../assets/images/', true, /\.jpe?g|png|ico$/))

export default {

  name: 'focus',

  created () {
    R.post('/Service/GetBigMatterList.ashx').then(data => {
      this.lists = data
    })
    this.queryList()
  },

  data () {
    return {
      lists: null,
      hotLists: null
    }
  },

  methods: {
    focusProject (pid) {
      return R.post('/Service/FocusProject.ashx', {
        'Id': pid
      }).then(res => {
        let data = res.data
        switch (data) {
          case 'addSuccess':
          // case 'AddFocusSucceed':
            window.mui.alert('关注成功')
            this.queryList()

            break
          case 'cancelSuccess':
          // case 'CancelFocusSucceed':
            window.mui.alert('取消成功')
            this.queryList()

            break
          case 'AddFocusFail':
            window.mui.alert('添加失败')

            break
          case 'CancelFocusFail':
            window.mui.alert('取消失败')

            break
          default:
            console.warn('wrong data.')

            break
        }
      })
    },

    queryList () {
      // 取得热门事项
      this.$store.dispatch('getHot5ProjectList').then(data => {
        this.hotLists = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.hot-list-img{
  width:30px;
  height: 32px;
}
.hot-list-div {
  font-size:0.9em;
}
.hot-list-p{
  font-size:13px;
}
.btn-focus{
  font-size:20px;
  color: #0086C8;
  border: 0px;
}
</style>
