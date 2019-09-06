import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// firebaseui css
require('../node_modules/firebaseui/dist/firebaseui.js')
require('../node_modules/firebaseui/dist/firebaseui.css')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
