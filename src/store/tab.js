import Cookie from 'js-cookie'
// import router from '../router'
export default{
    // 将tab 作为一个模块 引入 
    state: {
        // 是否折叠的变量
        isCollapse:false,
        menu:[], //存储后台返回的路由菜单
        // 点击的菜单
        currenMenu:null,
        tabsList:[ //给tablist一个初始页面
            {
                path:'/',
                name:'home',
                label:"首页",
                icon:'home'
            }
        ]
      },
      mutations: {
        //从后台返回来的 动态路由 在sotre里用setMenu方法存储起来
        setMenu(state, val){ //val是后台返回的值
            state.menu = val
          
            Cookie.set('menu',JSON.stringify(val)) //JSON.stringify() 方法将一个 JavaScript 对象或值转换为 JSON 字符串
            
        },
        clearMenu(state,val){//清除菜单
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router){//动态添加路由方法 动态路由要用到 router这个参数，因为他有个router.add动态路由的方法
            // 首先判断有没有menu,有往下走，没有 直接return不用往下走
            if(!Cookie.get('menu')){
                return
            }
            // 从cookie拿路由
            let menu = JSON.parse(Cookie.get('menu')) 
            console.log('menu',menu)
            // 将拿到的路由 保存在 vuex的state里
            state.menu = menu
            // 定义当前路由
            let currentMenu= [
                {
                    path:'/',
                    component: () => import(`@/views/main`),
                    children:[]

                }
            ]
            // 循环menu的每一项,然后push进去 currenMenu
            menu.forEach(item => {
                // 循环 判断有没有children
                if(item.children){
                    // 有children通过映射map方法找到children的路由
                   item.children = item.children.map(item => {
                    //这里是拼接componen的部分
                    item.component = () => import(`@/views/${item.url}`) //${item.url} es6拼接方法
                    return item
                   })
                   //这里才是开始拼接 children内容的部分
                   currentMenu[0].children.push(...item.children) //...item.children表示扩展开来，只要item.children这部分，其他的不要
                }else{
                    item.component = () => import(`@/views/${item.url}`)//${item.url} es6拼接方法
                    currentMenu[0].children.push(item)
                }
                })
                // console.log(currentMenu,'cur')
                // 对路由追加动态路由操作
                router.addRoutes(currentMenu)
            },
         // 点击菜单方法 将点击菜单的这个值 给到当前currenMenu
         selectMenu(state,val){
            if(val.name !== 'home'){
                // 将当前点击的值 赋予给到 currenMenu中
                state.currenMenu = val
                
                // 寻找失败会返回-1的 寻找tablist标签有没有重复值
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result === -1 ? state.tabsList.push(val) : ''
                console.log('state.tabsList',state.tabsList)
            }else{
                state.currenMenu = null
            }
            // val.name === 'home' ? state.currenMenu = null : state.currenMenu = val
        },
        getMenu(state) {
            if (Cookie.get('tagList')) {
              let tagList = JSON.parse(Cookie.get('tagList'))
              console.log('tagList',tagList)
              state.tabsList = tagList
            }
          },
        closeTab(state, val){
            // 关闭标签 利用findIndex的方法寻找他的索引 来删除
            let result = state.tabsList.findIndex(item => item.name === val.name) //判断标签的索引是否和 val值的索引相等
            state.tabsList.splice(result,1)

        },
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        }
        },
       
      actions: {
      },
      modules: {
      }
}
