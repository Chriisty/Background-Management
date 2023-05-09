import Cookie from 'js-cookie'
// import router from '../router'
export default{
    // 将tab 作为一个模块 引入 
    state: {
      token: ''
    },
    mutations: {
       setToken(state,val){
        state.token = val //获取保存 后台传过来的token
        console.log( state.token,'token')
        Cookie.set('token', val) //cookie 也设置保存 token

       },
        //清除token
       clearToken(state){
        state.token = ''
        Cookie.remove('token')
        },
        // 拿取token 从cookie里面拿取
        getToken(state){ 
            state.token = Cookie.get('token')
            console.log('state.token',state.token)
            
        }    
        },
       
      actions: {
      },
      modules: {
      }
}
