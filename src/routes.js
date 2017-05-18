import Vue from 'vue'
Vue.use(VueRouter)
import VueRouter from 'vue-router'

export let emptyRouteNode = Vue.extend({
  name: 'Base',
  template:
    '<div class="current-area">' +
      '<router-view></router-view>' + // <- 嵌套的外链
    '</div>'
})

export let router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['./view/login'], resolve)
    },
    // {
    //   path: '/index',
    //   component: resolve => require(['./view/index'], resolve),
    //   children: [
    //     {path: '', component: resolve => require(['./view/login'], resolve)},
    //     {path: 'personal', component: personal}
    //   ]
    // },
    {
      path: '/home',
      component: resolve => require(['./view/main'], resolve)
    },
    {
      path: '/detail/:projectId',
      name: 'detail', // 命名路由
      component: resolve => require(['./view/detail'], resolve)
    },
    {
      path: '/myrecord',
      component: resolve => require(['./view/myrecord'], resolve)
    },
    {
      path: '/gradeinquiry',
      component: resolve => require(['./view/gradeinquiry'], resolve)
    },
    {
      path: '/research',
      component: resolve => require(['./view/research'], resolve)
    },
    {
      path: '/smallclass/:bigId',
      component: resolve => require(['./view/smallclass'], resolve)
    },
    {
      path: '/matterlist/:smallId',
      component: resolve => require(['./view/matterlist'], resolve)
    },
    {
      path: '/personalinfolist',
      component: resolve => require(['./view/personalinfolist'], resolve)
    },
    {
      path: '/expertdetail/:index',
      component: resolve => require(['./view/expertdetail'], resolve)
    },
    {
      path: '*',
      component: resolve => require(['./view/404'], resolve)
    }
  ]
})

router.beforeEach(function (to, from, next) {
  // 动态判定 router
  window.scrollTo(0, 0)
  next()
})
