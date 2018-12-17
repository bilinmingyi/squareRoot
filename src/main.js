// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import filters from './assets/js/filters'
import components from './assets/js/components'
import store from './store/index'


import 'iview/dist/styles/iview.css';


import iView from '../node_modules/iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Object.keys(components).forEach(key => {
  Vue.component(key,components[key])
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
