// 引入mock
import Mock from 'mockjs'
//引入需压mock的数据页面 例如 home页面 user用户的mock数据页面
import homeApi from './home'
import userApi from './user'
import permissionApi from './permission'
import videoApi from './video'

//设置秒数 延时
Mock.setup({
    timeout:'200-2000'
})

//首页相关
//拦截的是 /home/getData
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)

// 用户相关
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
// Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)

// // 权限相关
Mock.mock(/\/permission\/getMenu/, 'post', permissionApi.getMenu)

// url: '/api/get/news?pageindex=1&pagesize=30' 所以下面的地址用正则表达式来表示url地址,不然会报错
Mock.mock(/\/get\/news/, 'get', videoApi.getVideoList)
Mock.mock(/\/add\/news/, 'post', videoApi.creatVideo)
Mock.mock(/\/delete\/news/, 'post', videoApi.deleteVideo)

