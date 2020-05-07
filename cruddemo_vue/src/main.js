import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import i18n from './lang/i18n'
import { createRouter } from './router'


Vue.use(ElementUI)

Vue.prototype.$http=axios

const router = createRouter() 

new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})
