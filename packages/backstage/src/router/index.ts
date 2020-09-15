import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import { MenuInterFace } from '@/common/interfaces'
import { redirectUrl, noAuthUrl } from './config'
import whiteList from './white'
import getMenuInfo from './api'

const context = require.context('@/views/', true, /\/*\/route\.ts$/)
const keys = context.keys()
const routes: Array<any> = keys.reduce((initial, key) => {
  const module = context(key)
  return initial.concat(module instanceof Array ? module : module.default)
}, [])

// 平铺出来的路由，进行对应的划分
const allRoute: Array<any> = [] // 所有的路由界面
interface rouerObj {
  path: string,
  name: string,
  component: any,
  children?: this[],
}
function getPageRoute (arr: Array<rouerObj>) {
  arr.forEach((item) => {
    const copyItem = { ...item }
    if (copyItem.children && copyItem.children.length > 0) {
      copyItem.children.forEach((childItem: rouerObj) => {
        if (childItem.path.indexOf('/') !== 0) {
          // eslint-disable-next-line no-param-reassign
          childItem.path = `${copyItem.path}/${childItem.path}`
        }
      })
      getPageRoute(copyItem.children)
    }
    allRoute.push(copyItem)
  })
}

// 调用
getPageRoute(routes)
Vue.use(VueRouter)

const BaseRoutes = [
  {
    path: '/',
    name: 'indexLayout',
    redirect: redirectUrl,
    component: () => import(/* webpackChunkName: "indexLayout" */ '@/views/layout/index.vue'),
    children: [ ...allRoute ],
  },
  {
    path: '*',
    name: 'Error',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/home/error.vue'),
  },
]
const router = new VueRouter({
  routes: BaseRoutes,
})

function isJoinFun (url: string, arr: MenuInterFace[]) {
  let isJoin = false
  const loopFun = (loopArr: MenuInterFace[]) => {
    loopArr.forEach((item) => {
      if (item.path === url) {
        isJoin = true
      }
      if (url.indexOf(item.path) >= 0 && item.children) {
        loopFun(item.children)
      }
    })
  }
  loopFun(arr)
  return isJoin
}

router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    next()
  } else if (store.state.user.token) {
    if (store.state.user.menu && store.state.user.menu.length > 0) { // 非白名单，有菜单的详情
      if (isJoinFun(to.path, store.state.user.menu)) {
        next()
      } else if (whiteList.indexOf(to.path) >= 0) { // 白名单的直接让进入
        next()
      } else {
        next({ path: noAuthUrl })
      }
    } else {
      // TODO: 预留进行拉取菜单路由的接口
      const res = await getMenuInfo()
      const resMenuArr = res.data.slideMenu
      if (resMenuArr && resMenuArr.length > 0) {
        store.dispatch('user/setMenu', resMenuArr)
        if (isJoinFun(to.path, store.state.user.menu)) {
          next()
        } else if (whiteList.indexOf(to.path) >= 0) {
          next()
        } else {
          next({ path: noAuthUrl })
        }
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        })
      }
    }
  } else {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  }
})

export default router
