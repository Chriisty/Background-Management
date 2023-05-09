<template>
    <el-container style="height:100%">
  <el-aside width="auto"><common-aside></common-aside></el-aside>
  <el-container >
    <el-header><common-header></common-header></el-header>
    <common-tab></common-tab>
    <el-main>
        <router-view/>  <!-- 这个router view  显示侧边栏的内容-->
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTab from '../components/CommonTab.vue'

export default {
  components:{
    CommonAside,
    CommonHeader,
    CommonTab
  }        
}
</script>

<style lang="less" scoped>
 .el-header{
  background-color: #333;
 }
//  背景色
 .el-container .is-vertical{
  background-color: #f5f5f5
 }

 .el-main{
  padding: 0;
 }

</style>