const demo = () => import('./index.vue')
const demoDetail = () => import('./detail.vue')
const demoForm = () => import('./form.vue')
const demoTable = () => import('./table.vue')

module.exports = [
  {
    path: 'demo',
    name: 'demo',
    component: demo,
    redirect: 'demo/detail',
    children: [
      {
        path: 'detail',
        name: 'demoDetail',
        component: demoDetail,
      },
      {
        path: 'form',
        name: 'demoForm',
        component: demoForm,
      },
      {
        path: 'table',
        name: 'demoForm',
        component: demoTable,
      },
    ],
  },
]
