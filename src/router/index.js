
import Vue from 'vue'
import Router from 'vue-router'
import hateDapp from '@/components/dapp'
Vue.use(Router)
export default new Router({
 routes: [
 {
 path: '/',
 name: 'hatedapp',
 component: hateDapp
 }
 ]
})