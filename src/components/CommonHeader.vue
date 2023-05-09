<template>
    <header>
        <div class="l-content">
             <el-button type="plain" icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
             <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="current.path" v-if="current">
                    <!-- <a href="/">{{current.label}}</a> -->
                   {{current.label}}
                </el-breadcrumb-item>
              
                </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
            <span class="el-dropdown-link">
                <img :src="userImg" alt="" class="user"/>
            </span>
            <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item >个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                
            </el-dropdown-menu>
             </el-dropdown>
        </div>
    </header>
</template>

<script>
// vuex提高映射方法 mapState
import {mapState} from 'vuex'
export default {
    computed: {
      ...mapState({
        current:state => state.tab.currenMenu
      })
    },
    data(){
        return{
            // 对于要调用img用require方法来调
            userImg:require('../assets/images/user.png')
        }
    },
    methods:{
        collapseMenu(){
            this.$store.commit('collapseMenu')
        },
        logOut(){
            // 退出登录 1.清除token 2.清除menu菜单 3.登陆刷新
            this.$store.commit('clearToken')
            this.$store.commit('clearMenu')
            location.reload()
            
        }
    }
}
</script>

<style lang="less" scoped>
header{
    display: flex;
    align-items: center;
    // 没有垂直居中，高度没有给到100%，高度要给到100%
    height: 100%;
    // 使用flex布局中的两边布局
    justify-content: space-between;
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px;
    }
}
.r-content{
 .user{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    }
}
</style>

<style lang="less">
    // 组件里面的样式 要另起style来写 不能scode全局样式
    .el-breadcrumb__item:last-child .el-breadcrumb__inner{
        color: #666666;
        font-weight:normal;
    }
</style>