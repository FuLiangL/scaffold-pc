import Vue from 'vue'

import Element from 'element-ui'
import 'element-ui/packages/theme-chalk/src/index.scss'
import BaiduMap from 'vue-baidu-map'
import 'core/src/style/index.scss'

import commonLayout from './views/layout/common.vue'
import popLayout from './views/layout/pop.vue'
import topNavLayout from './views/layout/top-nav.vue'
import router from './router'
import store from './store'
import App from './App.vue'
// import './registerServiceWorker'
// layout页面布局
Vue.component('common-layout', commonLayout)
Vue.component('pop-layout', popLayout)
Vue.component('top-nav-layout', topNavLayout)

Vue.config.productionTip = false
Vue.use(BaiduMap, {
  ak: 'wmARf9CGRix3HxnxUUo7db9DCqI4ELSI',
})
Vue.use(Element)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
