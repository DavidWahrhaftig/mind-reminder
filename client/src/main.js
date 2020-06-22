import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';
import App from './App.vue';
import axios from 'axios';
import router from './router'; // since router folder contains a file called index.js, can just import folder instead of file
import {store} from './store';


//Vue.config.productionTip = false

// Setting up default vue's http modules for api calls
Vue.prototype.$http = axios; 
// Load the token from the localStorage (for session appearance)
const token  = localStorage.getItem("token");
// If there is any token then we will simply append default axios authorization headers
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}



Vue.use(VueScrollTo)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
