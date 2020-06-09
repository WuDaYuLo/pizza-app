import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes.js';
import axios from 'axios'
import {store} from './store/store'

Vue.use(VueRouter)

//配置默认根路径
// axios.defaults.baseURL= 'https://wd6476367811srrfgf.wilddogio.com/'
axios.defaults.baseURL= 'http://localhost:4000'

//配置Vue原型（你在任何的组件都可以使用axios，如：this.http() http是你自己起名的 ）
Vue.prototype.http = axios



const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to,from,savePosition){
    // return{x:0,y:100}
    // return{selector:'.btn'}
    if(savePosition){
      return savePosition
    }else{
      return{x:0,y:100}
    }
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
