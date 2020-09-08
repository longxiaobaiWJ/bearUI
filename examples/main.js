import Vue from 'vue'
// 导入组件库
import BuUI from './../packages'
import App from './App.vue'

Vue.use(BuUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
