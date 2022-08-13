import Vue from 'vue'
import App from './App.vue'
import router from './router'
import directives from '@/directive'
import store from '@/store/index.js'
import '@/assets/font/iconfont.js'
import '@/assets/css/font.css'
import 'github-markdown-css'
import { Button, Input, Badge, Popover,Divider,Skeleton,SkeletonItem,Select,Option } from 'element-ui';
Vue.config.productionTip = false
Vue.use(directives)
Vue.use(Button)
Vue.use(Input)
Vue.use(Badge)
Vue.use(Popover)
Vue.use(Divider)
Vue.use(Skeleton)
Vue.use(SkeletonItem)
Vue.use(Select)
Vue.use(Option)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
