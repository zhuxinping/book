import Vue from 'vue'
import Router from 'vue-router'
/*import Home from '../components/Home.vue';
import List from '../components/List.vue';
import Detail from '../components/Detail.vue';
import Collect from '../components/Collect.vue';
import Add from '../components/Add.vue';*/

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/home',
    },
    {
      path:'/home',
      component:()=>import('../components/Home.vue'),
      meta:{keepAlive:true}//this.$route.meta.keepAlive
    },
    {
      path:'/list',
      component:()=>import('../components/List.vue')
    },
    {
      //detail {bid:1}路径参数 必须有但是随机
      path:'/detail/:bid',
      component:()=>import('../components/Detail.vue'),
      name:'detail'
    },
    {
      path:'/add',
      component:()=>import('../components/Add.vue')
    },
    {
      path:'/collect',
      component:()=>import('../components/Collect.vue')
    },
    {
      path:'*',redirect:'/home'
    }
  ]
})
