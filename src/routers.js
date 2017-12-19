import Vue from 'vue';
import VueRouter from 'vue-router'
const path = require('path');

VueRouter.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1);
}

Vue.use(VueRouter);
export default new VueRouter({
  base: path.resolve(__dirname),
  app: "/",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/router/login'], resolve),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      component: resolve => require(['@/router/home'], resolve),
      name: '',
      children: [{
        path: '',
        component: resolve => require(['@/router/index'], resolve),
        meta: ["主页"],
      },
      {
        path: '/addadmin',
        component: resolve => require(['@/router/addadmin'], resolve),
        meta: ["数据管理","添加管理员"],
      },
      {
        path: '/closeprice',
        component: resolve => require(['@/router/closeprice'], resolve),
        meta: ["数据管理","开盘价"],
      }
    ],
    }
  ]
})







































