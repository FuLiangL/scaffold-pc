const layout = () => import('@/views/layout/index.vue')
const test1 = () => import('./index.vue')
const test3 = () => import('./test3.vue')
const testPage = () => import('./page.vue')

module.exports = [
  {
    path: 'eCommerceBackstage',
    name: 'eCommerceBackstage',
    component: layout,
    redirect: 'eCommerceBackstage/test1',
    children: [
      {
        path: 'test1',
        name: 'testkeepAlive',
        component: test1,
        children: [
          {
            path: 'test2',
            name: 'test2keepAlive',
            component: testPage,
          },
        ],
      },
      {
        path: 'test3',
        name: 'test3',
        component: test3,
      },
    ],
  },
  {
    path: 'systemSettings',
    name: 'systemSettings',
    component: layout,
    redirect: 'systemSettings/test1',
    children: [
      {
        path: 'test1',
        name: 'test',
        component: test1,
        children: [],
      },
      {
        path: 'test2',
        name: 'test2',
        component: testPage,
      },
    ],
  },
  {
    path: 'customerServicePlatform',
    name: 'customerServicePlatform',
    component: layout,
    redirect: 'customerServicePlatform/test2',
    children: [
      {
        path: 'test1',
        name: 'test',
        component: test1,
        children: [],
      },
      {
        path: 'test2',
        name: 'test2',
        component: testPage,
      },
      {
        path: 'test3',
        name: 'test3',
        component: test3,
      },
    ],
  },
]
