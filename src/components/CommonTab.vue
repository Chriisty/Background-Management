<template>
    <div class="tabs">
        <el-tag 
        size="small"
        :key="tag.name"
        v-for="tag in tags"
        :closable ="tag.name !== 'home'"
        :disable-transitions="false"
        @close="handleClose(tag)"
        @click="changeMenu(tag)"
        :effect = "$route.name === tag.name ? 'dark' : 'plain'">
        {{tag.label}}
        </el-tag>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
    computed: {
        ...mapState({
            // tags是从vuex取出来 渲染出来的数据
            tags:state =>state.tab.tabsList //帮tags找到他的state里定义的变量tabsList,渲染出来
        })
    },
    data() {
      return {
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
    ...mapMutations({
        // 这里引入vuex关闭的方法
        close:'closeTab'
    }),
      handleClose(tag) {
        this.close(tag)
      },
      changeMenu(item){
        // 先进行路由跳转 后再进行选择菜单
        this.$router.push({name:item.name})
        // 调用store里面的选择菜单的方法
        this.$store.commit('selectMenu',item) //把参数item传进去
      }
    }
}
</script>

<style lang="less" scoped>
    .tabs{
        // 给个padding值 内部撑开
        padding:20px;
        .el-tag {
            margin-right: 15px;
            // 给个指针 小拇指
            cursor:pointer
        }
    }
</style>