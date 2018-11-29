// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import 'jquery/dist/jquery.min.js'

 import 'bootstrap-vue/dist/bootstrap-vue.css'
 import 'bootstrap/dist/css/bootstrap.min.css'

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.prototype.$eventHub = new Vue(); // Global event bus




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})