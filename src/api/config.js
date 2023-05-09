// 请求拦截
import axios from 'axios'
// import store from '../store'
// import router from './router'


// 创建一个axios实例
const service = axios.create({
    // 请求时间
    timeout:3000
})

//添加请求拦截器
service.interceptors.request.use(
    // 成功回调的参数
    config =>{
          // 判断store是否存在token
    //  if (store.state.token) {
      // 将token给到请求头返回给到后端
      // config.headers.token = store.state.token
    // }
        return config
    },
    err => {
        console.log(err)
    }
)

// 响应的拦截器
service.interceptors.response.use(
    response => {
        let res = {}
        // if(202) 成功跳转 返回数据 如果返回404，则跳转404页面
        console.log('response',response)
        res.status = response.status
        res.data = response.data
        return res
    },
    err => console.log(err)
)

//每次请求有返回的，都是先经过这个拦截器先
// service.interceptors.response.use(
//   // 这里判断请求是否成功 p判断状态码s
//   response => {
//       if(response.status === 200){
//           //状态码200是请求成功了
//           const data = response.data
//           if(data.code == -1){
//               //登录过期，需要重新登录，清空vuex的token和 localstore的token 因为这里用本地存储存token,而不是用cookie
//               store.commit('settoken','')
//               localStorage.removeItem('token')
//               //跳转到login页面
//               router.replace({path:'/login'})
//           或者 router.push('/login')
//
//           }
//       }
//   }
// )

export default service