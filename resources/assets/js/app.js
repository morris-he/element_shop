/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './components/App'
import router from './router'
// import JsonExcel from 'vue-json-excel'

window.Vue = require('vue');
Vue.use(ElementUI);
// Vue.component('downloadExcel', JsonExcel)
Vue.prototype.axios=axios

// const originalPush = router.prototype.push
// router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

const app = new Vue({
    el: '#main',
    router,
    store,
    components: {App},
    template: '<App/>'
});
