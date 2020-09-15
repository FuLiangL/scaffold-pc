const login = () => import('./index.vue')

module.exports = [
  {
    path: 'login',
    name: 'login',
    meta: {
      layout: 'pop',
      title: '登录',
    },
    component: login,
  },
]
