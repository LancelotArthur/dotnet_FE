// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import FishUI from 'fish-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './vuex/store'
import $ from 'jquery'
import { Message } from 'element-ui'
const message = Message
Vue.prototype.$message = message


Vue.use(ElementUI)
Vue.use(FishUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
