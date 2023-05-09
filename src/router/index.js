import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routes = [
//  {
//   path:'/',
//   component:() => import('@/views/main.vue'),
//   // 侧边栏作为 他的children里的路由
//   children:[//下面的是前端写死的路由,改为用动态路由
//     {
//       path:'/',
//       name:'home',
//       component:() =>import('@/views/Home/Home')
//     },
//     {
//       path:'/video',
//       name:'video',
//       component:() =>import('@/views/VideoManage/VideoManage')
//     },
//     {
//       path:'/user',
//       name:'user',
//       component:() =>import('@/views/UserManage/UserManage')
//     },
//     {
//       path:'/page1',
//       name:'page1',
//       component:() =>import('@/views/Other/PageOne')
//     },
//     {
//       path:'/page2',
//       name:'page2',
//       component:() =>import('@/views/Other/PageTwo')
//     }
//   ]
//  },
 {
  path:'/login',
  name:'login',
  component:() => import('@/views/Login/Login')
 }
]

const router = new Router({
  routes
})

export default router
