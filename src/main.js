import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '@/api/config'
import './mock'


Vue.use(ElementUI)
Vue.prototype.$http = http

Vue.config.productionTip = false

// 路由守卫 路由拦截 即是退出登录时，会自动返回登录页面的操作 登陸有問題解決這個問題
router.beforeEach((to, from, next) => {
  // 1.拿取token 2. 拿取token 放到定义 token变量里 3判断是否没有token 以及不是登陆页面 ，就next()跳转到登录页面
  store.commit('getToken')
  store.commit('getMenu')
  let token = store.state.user.token
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
