// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
import Vue from 'vue'
import Element from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import '../node_modules/element-ui/lib/theme-chalk/display.css'
import App from './App'
import router from './router'
import i18n from './assets/i18n/index'
import Echarts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import promise from 'es6-promise'
promise.polyfill()

Vue.use(Element)
Vue.component('chart', Echarts)
Vue.config.productionTip = false
// Vue.prototype.$i18n = i18n

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
