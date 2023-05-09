<template>
<!-- 封装的table表格 -->
    <div class="common-table">
        <el-table :data="tableData"  height="90%" stripe  v-loading="config.loading">
            <el-table-column label="序号" width="85">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ (config.page - 1) *20 + scope.$index + 1}}</span>
            </template>
            </el-table-column>
            <!-- show-overflow-tooltip 少了这个 table的数据没办法下拉 和展示出全部的数据 -->
              <el-table-column show-overflow-tooltip  v-for="item in tableLabel" :key="item.prop" :label="item.label" >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
                </template>
                </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" @click="handleLook(scope.row)">查看</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>                                                                 <!-- sync是会同步给到父组件 -->
           <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage" :page-size="20"></el-pagination>
    </div>
</template>

<script>
export default {
    props:{
        tableData:Array,
        tableLabel:Array,
        config:Object,// 接收到的config,也可以调用他的孩子，例如上面用到了config.page config.total等等
    },
   methods:{
    handleEdit(row){
        // $emit() 自组件向父组件传值 ,'edit'是传值自定义事件的参数
        this.$emit('edit' , row)
    },
    handleLook(row){
        this.$emit('look', row)
    },
    handleDelete(row){
        this.$emit('del', row)
    },
    changePage (page) {
      this.$emit('changePage', page)
    }
   },
}
</script>

<style lang="less" scoped>
   .common-table{
     height: calc(100% - 62px);
      background-color: #fff;
   
   }
  
</style>