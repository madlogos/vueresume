// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import App from './App'
import router from './router'
import i18n from './assets/i18n/index'
import promise from 'es6-promise'
promise.polyfill()

Vue.use(Element)
Vue.config.productionTip = false
// Vue.prototype.$i18n = i18n

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
