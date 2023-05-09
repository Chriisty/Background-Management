<template>
    <div class="common-table">
      <el-table :data="tableData" height="90%" stripe v-loading="config.loading">
        <el-table-column
          label="排序"
          width="85">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (config.page - 1) *20 + scope.$index + 1}}</span>
        </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip  v-for="item in tableLabel" :key="item.prop" :label="item.label" width="180">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
         <!-- // 這裏加個switch,是為顯示switch按鍵在table上顯示  成功顯示在table上卻點擊不了是因為 沒有加 v-model-->
         <el-switch v-if="item.type === 'switch'" v-model="scope.row[item.prop]"></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
          size="mini"
          @click="handleDownload(scope.$index, scope.row)">下载</el-button>
      </template>
    </el-table-column>
  </el-table>
       <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage" :page-size="20"></el-pagination>
    </div>
</template>

<script>
export default {
  props:{
    tableData:Array,
    tableLabel:Array,
    config: Object
  },
  methods:{
    // 下载图片
    handleDownload (row) {
      this.$emit('download',row)
    },
    changePage(page) {
      this.$emit('changePage',page)
    }
  }
}
</script>

<style lang="less" scoped>
.common-table{
     height: calc(100% - 62px);
      background-color: #fff;
   
   }
</style>