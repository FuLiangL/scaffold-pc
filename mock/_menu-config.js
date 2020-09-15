const slideMenu = [
  {
    path: '/demo',
    title: 'demo',
    children: [
      {
        path: '/demo/detail',
        title: 'demoDetail',
      },
      {
        path: '/demo/form',
        title: 'demoForm',
      },
      {
        path: '/demo/table',
        title: 'demoForm',
      },
    ],
  },
  {
    path: '/eCommerceBackstage',
    title: '电商后台',
    icon: 'el-icon-s-shop',
    children: [
      {
        path: '/eCommerceBackstage/test1',
        title: '电商后台1',
        icon: 'el-icon-s-shop',
        children: [
          {
            path: '/eCommerceBackstage/test1/test2',
            title: '电商后台1-1',
            isHide: true,
            children: [],
          },
        ],
      },
      {
        path: '/eCommerceBackstage/businessManagement',
        icon: 'el-icon-s-shop',
        title: '电商后台2',
        children: [
          { path: '/eCommerceBackstage/businessManagement/test1', title: '电商后台2-1', children: [] },
          { path: '/eCommerceBackstage/businessManagement/test2', title: '电商后台2-2', children: [] },
          { path: '/eCommerceBackstage/businessManagement/test3', title: '电商后台2-3', children: [] },
        ],
      },
      {
        path: '/eCommerceBackstage/activityManagement', icon: 'el-icon-s-home', title: '电商后台3', children: [],
      },
      {
        path: '/eCommerceBackstage/test3', icon: 'el-icon-pie-chart', title: '电商后台4', children: [],
      },
      {
        path: '/eCommerceBackstage/test2', icon: 'el-icon-notebook-1', title: '电商后台5', children: [],
      },
      {
        path: '/eCommerceBackstage/demo', icon: 'el-icon-chat-line-round', title: '电商后台6', children: [],
      },
      {
        path: '/eCommerceBackstage/demo1', icon: 'el-icon-setting', title: '电商后台7', children: [],
      },
    ],
  },
  {
    path: '/customerServicePlatform',
    title: '客服平台',
    icon: 'el-icon-s-home',
    children: [
      {
        path: '/customerServicePlatform/test2', icon: 'el-icon-s-shop', title: '客服平台1', children: [],
      },
      {
        path: '/customerServicePlatform/systemSettings2', icon: 'el-icon-s-home', title: '客服平台2', children: [],
      },
      {
        path: '/customerServicePlatform/systemSettings3', icon: 'el-icon-pie-chart', title: '客服平台3', children: [],
      },
      {
        path: '/customerServicePlatform/systemSettings4', icon: 'el-icon-notebook-1', title: '客服平台4', children: [],
      },
      {
        path: '/customerServicePlatform/systemSettings5', icon: 'el-icon-chat-line-round', title: '客服平台5', children: [],
      },
      {
        path: '/customerServicePlatform/systemSettings6', icon: 'el-icon-setting', title: '客服平台6', children: [],
      },
    ],
  },
  {
    path: 'http://www.baidu.com',
    title: '跑腿平台',
    isBlank: true,
    children: [],
  },
  {
    path: '/systemSettings',
    title: '系统设置',
    icon: 'el-icon-setting',
    children: [
      {
        path: '/systemSettings/test1',
        icon: 'el-icon-s-shop',
        title: '系统设置1',
        children: [],
      },
      {
        path: '/systemSettings/systemSettings2', icon: 'el-icon-s-home', title: '系统设置2', children: [],
      },
      {
        path: '/systemSettings/systemSettings3', icon: 'el-icon-pie-chart', title: '系统设置3', children: [],
      },
      {
        path: '/systemSettings/systemSettings4', icon: 'el-icon-notebook-1', title: '系统设置4', children: [],
      },
      {
        path: '/systemSettings/systemSettings5', icon: 'el-icon-chat-line-round', title: '系统设置5', children: [],
      },
      {
        path: '/systemSettings/systemSettings6', icon: 'el-icon-setting', title: '系统设置6', children: [],
      },
    ],
  },
]
module.exports = { slideMenu }
