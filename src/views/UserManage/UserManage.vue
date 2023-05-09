<template>
    <div class="manage">
        <!-- 一般是 edit 编辑的对话框会写在最上面的 -->
        <el-dialog :title="operateType === 'add' ? '新增用户' : (operateType=== 'look' ? '查看' : '更新用户')"  :visible.sync="isShow">
             <!-- form 表单 -->
            <common-form :formLabel="operateFormLabel" :form="operateForm" ref="form" :disabled="disabled"></common-form>
        <!-- 这里放进的插槽 是 确定 取消 两个按钮 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
         </div>
        </el-dialog>

       <!-- 新增 搜索等等按钮 -->
        <div class="manage-header">
            <el-button type="primary" @click="addUser">+ 新增</el-button>
             <el-input class ="input-name" v-model="searchFrom.name" placeholder="请输入名字" ></el-input>
             <el-date-picker v-model="searchFrom.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
             <el-select v-model="searchFrom.sex" placeholder="请选择"  v-for="item in formLabel" :key="item.value" @change ="changeData">
                     <!-- :value="item.label" 这里value绑定的是 当点击下拉框的label值时会自动添加进去输入框里的值 -->
                <el-option v-for ="item in item.opts" :key="item.value" :value="item.label">{{item.label}}</el-option>
                
            </el-select>  
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" @click="clear">重置</el-button>
        </div>
        <!-- table 表单 -->
            <common-table :tableData= "tableData" :tableLabel = "tableLabel" :config = "config" @changePage="getList()" @edit="editUser" @del="delUser" @look="lookUser"></common-table> 
    </div>
</template>

<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/CommonTable.vue'
// 样式
import UserManage from '@/assets/css/common.css'
    export default {
        components:{
            CommonForm,
            CommonTable
        },
        data(){
            return{
                //查看置灰操作
                disabled:false,
                // 操作类型
                operateType: 'add',
                // 显示 common form 新增 更新的表单 为关闭状态，只要点击按钮才会促发表单的显示
                isShow: false,
                  // table 的数据 字段
                tableData:[],
                tableLabel:[
                    {
                        prop:'name',
                        label:'姓名'
                    },
                       {
                        prop:'age',
                        label:'年龄'
                    },
                       {
                        prop:'sexLabel',
                        label:'性别'
                    },
                       {
                        prop:'birth',
                        label:'出生日期'
                    },
                       {
                        prop:'addr',
                        label:'地址'
                    },
                ],
                //table 的扩展参数
                config:{
                    page:1,
                    total:30,
                    loading:false
                },
                // operateForm 表单的左边标题 commonform是表单的 右边 
                operateForm :{ //这个是操作表单 edit确定时候 传送给后台的表单,这也确定了表单是按照 name addr ...这样的顺序排下去。
                    name:'',
                    addr:'',
                    age:'',
                    birth:'',
                    sex:''
                },
                operateFormLabel:[
                    {
                        model:'name',
                        label:'姓名'
                    },
                     {
                        model:'addr',
                        label:'地址'
                    },
                     {
                        model:'age',
                        label:'年龄'
                    },
                     {
                        model:'birth',
                        label:'出生日期',
                        // 出生日期是个选择器 ，所以这里需要一个日期type
                        type:'date'
                    },
                     {
                        model:'sex',
                        label:'性别',
                        type:'select',
                        opts:[
                            {
                                label: '男',
                                value:1,
                            },
                            {
                                label: '女',
                                value:0
                            }
                        ]
                    },
                ],
                // 拿到后台的总数据
                searchData:[],
                // 筛选过的数据
                filterData:[],
                // 搜索框 字段
               searchFrom: {
                 name: '',
                 addr:'',
                 age:'',
                 birth:'',
                 sex:''
               },
                // form表单的数据 这个formLabel的数据是表单的左边提示项 例如 性名：xxxx, 性别：xxx
                formLabel:[
                     {
                        model:'sex',
                        label:'性别',
                        type:'select',
                        opts:[
                            {
                                label: '男',
                                value:1,
                            },
                            {
                                label: '女',
                                value:0
                            }
                        ]
                    },
                ],
            }
        },
        methods:{
            clear(){
                this.searchFrom.name = '',
                this.searchFrom.sex = '',
                this.searchFrom.birth = ''
                this.getList()
            },
            // 获取到点击到下拉框的那个值
            changeData(val){
                this.searchFrom.sex = val
                console.log(val,'val')
            },
            search(){
              const searchData = JSON.parse(JSON.stringify(this.tableData))
              const filterData = this.tableData.filter(item => {
                console.log(this.searchFrom.name,'this.searchFrom.name')
                return item.name.indexOf(this.searchFrom.name) > -1
                    && item.sexLabel.indexOf(this.searchFrom.sex) > -1
                    && item.birth.indexOf(this.searchFrom.birth) > -1
              })
                this.tableData = filterData
            },
            getList(){
                this.config.loading = true
                this.$http
                    .get('/api/user/getUser',{
                    params:{
                        page: this.config.page,//得到当前页的参数
                    }
                })
                 .then(res => {
                    this.tableData = res.data.list.map(item => {
                        console.log(res)
                        item.sexLabel = item.sex === 0 ? '女' : '男'
                        return item
                    })
                    this.config.total = res.data.count
                    console.log('res.data.count',res.data.count)
                    this.config.loading = false
                })
            },
            addUser(row){
                // 邏輯 1: 將表單置空，這樣子是為了解決 上次填寫遺留下來的痕跡 將其清空
                //     2: 判斷 表單的文字為 新增
                //     3: 是否顯示為true 即打開表單
                this.operateForm = {},
                this.operateType = 'add',
                this.isShow = true
            },
            editUser(row){
                this.operateType = 'edit'
                this.isShow = true
                this.operateForm = row
                console.log(row)
            },
            lookUser(row){
               this.operateType = 'look',
               this.isShow = true
               if( this.operateType === 'look'){
                 this.disabled ='true'
                 this.operateForm = row
               }else{
                 this.disabled ='false'
               }
            },

            confirm(){
                // 邏輯 1: 確認提交的數據 有add 和 edit兩部分 用if else判斷
                //编辑成功后 isShow设为false关闭,然后再重新获取列表数据
                if(this.operateType === 'edit'){
                    this.$http.post('/api/user/edit',
                    //operateForm给后台传送表单
                    this.operateForm).then(res => {
                        console.log(res.data)
                        this.isShow = false 
                        this.getList()
                    })
                }else{
                    this.$http.post('api/user/add',
                    this.operateForm).then(res => {
                        console.log('this.operateForm',this.operateForm)
                        this.isShow = false
                        this.getList()
                    })
                }
            },
            delUser(row){
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let id = row.id
                    this.$http.get('/api/user/del',{
                        params: {
                         id
                    }
                    }).then(res => {
                        console.log(res.data)
                     this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                        // 删除后要刷新下页面list数据
                        this.getList()
                    })
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
            },
        },
        created() {
                //上面写了ggetList 拿取了api的数据，需要在created这里，才有数据显示出来
                this.getList()
            }
    }
</script>

<style lang="less" scoped>
    .input-name {
        width: 15%;
    }
</style>