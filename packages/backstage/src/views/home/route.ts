const home = () => import('./index.vue')
const noAuth = () => import('./no-auth.vue')
const error = () => import('./error.vue')

module.exports = [
  {
    path: 'home',
    name: 'home',
    meta: {
      layout: 'top-nav',
      title: '欢迎页面',
    },
    component: home,
  },
  {
    path: 'noAuth',
    name: 'noAuth',
    meta: {
      layout: 'top-nav',
      title: '无权限访问页面',
    },
    component: noAuth,
  },
  {
    path: '404',
    name: 'error',
    meta: {
      layout: 'top-nav',
      title: '无权限访问页面',
    },
    component: error,
  },
]
