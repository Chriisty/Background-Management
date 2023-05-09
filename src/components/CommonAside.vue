<template>
   <el-menu
      :collapse="isCollapse"
     :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
        <h3 v-show="!isCollapse">我的学习后台</h3>
        <h3 v-show="isCollapse">我的</h3>
        <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        // 利用计算属性判断有没有children,来返回菜单
    computed:{
        noChildren(){
            // return this.asideMenu.filter(item => !item.children)//没有用vuex来获取，是用asidemenu来获取路径
            return this.menu.filter(item => !item.children) //用vuex来获取menu路径菜单
        },
        hasChildren(){
            // return this.asideMenu.filter(item => item.children)//没有用vuex来获取，是用asidemenu来获取路径
            return this.menu.filter(item => item.children) //用vuex来获取menu路径菜单
            
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        },
        menu(){
            return this.$store.state.tab.menu
        }
    },
        data(){
            return{
                asideMenu:[
                    {
                        path:'/',
                        name:'home',
                        label:"首页",
                        icon:'s-home'
                    },
                    {
                        path:'/video',
                        name:'video',
                        label:'视频管理',
                        icon:'video-play'
                    },
                    {
                        path:'/user',
                        name:'user',
                        label:'用户管理',
                        icon:'user'
                    },
                    // 二级菜单
                    {
                        label:'其他',
                        icon:'user',
                        children:[
                            {
                                path:'/page1',
                                name:'page1',
                                label:'页面1',
                                icon:'setting'
                            },
                            {
                                path:'path2',
                                name:'page2',
                                label:'页面2',
                                icon:'setting'
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            clickMenu(item){
                this.$router.push({name: item.name})
                this.$store.commit('selectMenu',item)
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-menu{
        height: 100%;
        border: none;
    }
    h3{
        color: #ffffff;
        text-align: center;
        line-height: 48px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  
</style>