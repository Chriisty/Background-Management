<template>
    <div class="manage">
        <!-- form表單 -->
        <el-dialog :title="operateType === 'add' ? '新增用戶' : '更新用戶'" :visible.sync="isShow" width="60%">
         <!-- @selectcheckboxData = "checkboxData" -->
         <table-form 

            @selectProvinceData ="selectProvince"
            @selectCityData ="selectcity"
            :cityArr ="cityarr"
            :regionarrData ="regionarr"
            :provinceData ="provincearr"
            :form="form" 
            :formLable = "formLable" 
            :rules="rules"
            :fileList = "fileLists"
            :imageUrl = imgUrl
            :headers="headerObj"
            :fileLists="fileList"
            :action="action" 
            @uploadImg ="uploadVideoImg"
            @onExceedLimits ="onExceedVideoLimits"
            :limit="limit"
            
            >
        </table-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
        </el-dialog>

        <!-- 按鈕 -->
        <div class="manage-header">
          <el-button type="primary" @click="addData">+ 新增</el-button>
        </div>
        <!-- table列表 -->
        <video-table :tableData="tableData" :tableLabel="tableLabel" @download = "downloadVideo" :config = "config" @changePage="getVideoList()"></video-table>
    </div>
</template>

<script>
import tableForm from '../../components/tableForm/index.vue'
import videoTable from '../../components/table/index.vue'
import { province,city,region } from '../../js/area'

// 样式
// import UserManage from '@/assets/css/common.css'
export default {
components:{
    tableForm,
    videoTable
},
data () {
   return {
    pic: [
      {
        uid: '',
        lastModified: '',
        lastModifiedDate: '',
        size:'',
        type:''
      }
    ],
    // 上传文件列表
    fileLists: [],
     // 上传图片的路径 
     imgUrl:'',
     fileList: [
        {
          name: '',
          url:''
        }
     ],
      img: [],
    // 图片的预览路径
      previewPath: '',
      // 图片预览的弹框
      previewVisible: false,
     addForm: {
     // 图片的数组
        pics: [],
      },
     // 图片上传组件的headers请求头对象
    headerObj:{
      Authorization: this.$store.commit('getToken')
    },
    // 新增 更新 查看的判斷
    operateType:'add',
    isShow:false,
    // js文件的城市数据
    // arr:area.arrAll,
    arr: [1, 3, 4],
    provincearr: [],
    // province: [],
    cityarr: [],
    regionarr: [],
    config:{
        page: 1,
        total: 20,
        loading: false
    },
       //  baseUrl + '后台接口',
    action:"http://localhost:3334/#/video" + "/api/add/news", //上传图片的url
    limit:4, // 最大允许上传个数
    tableData:[],
    tableLabel:[
        {
            prop:'name',
            label:'活动区域'
        },
        {
            prop:'region',
            label:'省会',
        },
        {
            prop:'cities',
            label:'城市'
        },
        {
            prop:'district',
            label:'地区'
        },
        {
            prop:'date',
            label:'活动时间'
        },
        {
            prop: 'delivery',
            label: '即时配送',
            type:'switch', // 這裏table加個判斷 是為顯示switch按鍵在table上顯示
            
        },
        {
            prop: 'types',
            label: '活动性质',
        },
        {
            prop: 'resource',
            label: '特殊资源',
        },
        {
            prop: 'desc',
            label:'活动形式',
        },
        {
            prop:'picture',
            label:'照片',
        }
    ],
    // 这里的form表单 如果上面给了个值 那么就会显示在 选填框里 相当于是给了个默认值
     form:{
        name:'',
        // 省会
        region:'',
        // 城市
        cities:'',
        // 地区
        district:'',
        date:'',
        delivery: false,
        // types:'', 这里是传送给后台的值，而v-model是选中的值form[formlabel.model]
        // ，如果这里是‘’字符串形式，那么点一个就变成了全选了，所以要改成array[]数组形式
        types:[],
        // 与types的数据结构array相比，传送给后台的装着的数据用''表示
        checkbox:'',
        resource:'',
        desc:'',
        picture: ''
     },
     // formLable 是代表着label这一行，还有可以设定里面下拉框数据 控制显示在填入框的数据 由form里面的字段决定
     formLable:[
        {
            model: 'name',
            label: '活动区域'
        },
        {
            model: 'region',
            label: '省份',
            type:'select',
            arr:this.provincearr
            // prov:[
            //     {
            //         label:'广东省',
            //         value:0
            //     },
            //      {
            //         label:'西藏自治区',
            //         value:1
            //     },
            //     {
            //         label:'新疆',
            //         value:2
            //     }
            // ],
        },
        {
            model: 'cities',
            label: '城市',
            type: 'select1',
            cityArr:this.cityarr,
        },
        {
            model:'district',
            label:'地区',
            type:'select2',
            districtArr:this.regionarr
            //  districtArr:[
            //     {
            //          label:'广东省',
            //          value:0
            //      },
            //       {
            //          label:'西藏自治区',
            //          value:1
            //      },
            //      {
            //          label:'新疆',
            //          value:2
            //      }
            //  ],
        },
        {
            model: 'date',
            label: '活动时间',
            type:'date'
        },
        {
            model: 'delivery',
            label: '即时配送',
            type:'switch',
        },
        {
            model: 'types',
            label: '活动性质',
            type:'checkbox',
            checkboxs:[
                {

                    label:'美食/餐厅线上活动',
                    
                    value:1
                },
                {
                    label:'地推活动',
                    
                    value:2
                },
                {
                    label:'线下主题活动',
                    
                     value:3
                },
                {
                    label:'单纯品牌曝光',
                    
                     value:4
                },
                {
                    label:'主題樂園',
                   
                     value:5
                }
            ]
        },
        {
            model: 'resource',
            label: '特殊资源',
            type:'radio',
            radios:[
                {
                    label: '线上品牌商赞助',
                    value: 1
                    // value: '1' 這裏是傳給後台是字符串，而不是數字，一般後台給到前端是 數字
                },
                 {
                    label:'线下场地免费',
                    value: 0
                },
            ]
        },
         {
            model: 'desc',
            label:'活动形式',
            
            type: 'textarea'
        },
        {
            model:'picture',
            label:'照片',
            type:'upload'
        }
     ],
    //  表单的校验规则
    rules:{
        name:[
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 至 5 个字符', trigger: 'blur'}
        ],
        region: [
            { required: true, message: '请选择活动区域',trigger: 'change' }
        ],
        date: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        type: [
            {type:'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
        ],
        resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
        ],
        desc: [
            {required: true,message:'请填写活动形式', trigger: 'blur'}
        ]
    }
   }
 },
 methods:{
    // radioData () {
    //     debugger
    //   this.form.resource = this.form[this.formLable.model]
    //   console.log(this.form.resource)
    // },
    // checkbox勾选的值传送给到后台 
    // checkboxData () {
    // 这里的checkbox判断是多余的，不用checkbox判断也行得通
    //   if (this.formLable.type === 'checkbox') {
        // console.log(111)
        // this.form.checkbox = this.form[this.formLable.model]
        // console.log('this.form.checkbox',this.form.types)
    //   }

    // },
    // 下载图片
    downloadVideo (row) {
    //   axios({
    //     url: this.action,
    //     method: "get",
    //   }).then(function (response) {
    //     const link = document.createElement("a")
    //     let blob = new Blob([response.data], {type: response.data.type})
    //     let url = URL.createObjectURL(blob)
    //     link.href = url
    //     link.download = `实际需要的文件名.${response.data.type.split('/')[1]}`
    //     link.click()
    //     document.body.removeChild(link)
    //   })
    },
    // 新增 按钮方法
    addData (row) {
        // 這裏是置空操作 本來寫this.form {},可是這樣寫checkbox的選項沒了，只能一個個屬性置空
        this.form.name = ''
        this.form.region = ''
        this.form.cities = ''
        this.form.district = ''
        this.form.delivery= false
        this.form.date = ''
        this.form.types = []
        this.form.resource = ''
        this.form.desc = ''
        this.picture = ''
        this.operateType = 'add'
        this.isShow = true

    },
    // 确认提交
    confirm () {
      if(this.operateType === 'add'){
        this.$http.post('/api/add/news',
      this.form).then(res => {
        console.log('this.form',this.form)
        this.isShow = false
        this.getVideoList()
        console.log(222)
      })
      } else {
        console.log(111)
      }
    },
    // 获取后台数据 渲染table
    getVideoList (){
      this.config.loading = true
      this.$http.get('/api/get/news',{
        params: {
            pageindex: this.config.page, // 1
            pagesize: this.config.total // 20
        }
      }).then(res => {
       this.tableData = res.data.list.map(item => {
         item.region = item.province
         item.cities = item.city
         item.resource = item.radios === 0 ? '线下场地免费' : '线上品牌商赞助'
        
    
         item.types = item.type
         
        
        //  console.log('item.types',item.types)
        //  arr.forEach(item => {
        //     console.log('item',item)
        //     if(item === 1){
        //         item = "美食/餐厅线上活动"
                
        //     } else if( item === 2) {
        //          item = "地推活动"
        //     }else if(item === 3){
        //         item = "线下主题活动"
        //  } else if ( item === 4) {
        //      item = "单纯品牌曝光"
        //  } else {
        //     item = "主題樂園"
        //  }
        //  })
        for(let i = 0 ;i < item.types.length; i++){
                 if(item.types[i] === 1){
                item.types[i]= "美食/餐厅线上活动"
                
            } else if( item.types[i] === 2) {
                 item.types[i] = "地推活动"
            }else if(item.types[i] === 3){
                item.types[i] = "线下主题活动"
         } else if ( item.types[i] === 4) {
             item.types[i] = "单纯品牌曝光"
         } else {
            item.types[i] = "主題樂園"
         }
        //   console.log('item.types[i]',item.types[i])
        }
     
         item.delivery = item.delivery
         console.log()
        //  if (item.delivery === 0) {
        //     item.delivery = true
        //     // console.log('item.delivery',item.delivery)
        //  } else {
        //     item.delivery = false
        //     // console.log('item.delivery',item.delivery)
        //  }

        // 下面是錯誤的，除了item.checkbox 不知錯在哪裡
        //  item.types = item.type === 1 ? '美食/餐厅线上活动' : 2 ? '地推活动' : 3 ? '线下主题活动' : 4 ? '单纯品牌曝光' : '美食/餐厅线上活动1'
        //  if(item.types = item.type === 1) {
        //     item.checkbox = '美食/餐厅线上活动'
        //  } else if (item.types = item.type === 2) {
        //     item.types = '地推活动'
        //  } else if (item.types = item.type === 3) {
        //     item.types =  '线下主题活动'
        //  } else if (item.types = item.type === 4 ) {
        //     item,types = '单纯品牌曝光'
        //  } else {
        //     item.types = '品牌曝光22'
        //  }
        
        return item
       })
       this.config.total = res.data.total
    //    console.log('this.config.total',this.config.total)
    //    console.log('res.data.total',res.data.total)
       this.config.loading = false
      })
    },
    // 上传图片 从自组件获取file参数
    uploadVideoImg (response) {
    // response：服务器返回的数据
    console.log('response',response)
      // 1. 拼接得到一个图片信息对象(后台需要返回一个图片信息对象)
    //   const picInfo = { pic: response.file }
     
    //   // 2. 将图片信息对象，push 到pics数组中
    //   this.addForm.pics.push(picInfo)
    //   let picarr = ''
    //   this.addForm.pics.forEach( item => {
    //    this.fileList.name = item.pic.name
    //    this.fileList.url = item.pic.webkitRelativePath
      
    //    this.pic.uid = item.pic.uid
    //    this.pic.lastModified = item.pic.lastModified
    //    this.pic.lastModifiedDate = item.pic.lastModifiedDate
    //    this.pic.size = item.pic.size
    //    this.pic.type = item.pic.type
       // 下面部分用formData 传两个参数给到上传图片的接口
    //   })
        var formData = new FormData ()
        formData.append('response.files',response.file)
        console.log(formData.get('response.files'))
        this.$http.post('/api/add/news',{
            data:formData,
            headers: {
                credentials: 'same-origin',
                // 'Content-Type': 'multipart/form-data' //听说写这个会报错，不知真假
            },
            Authorization: this.$store.commit('getToken')
        }).then( res => {
            if(res.code == xxx) {
                console.log('识别成功')
            }else {
                _vm.$message({
                    message: "图片识别失败，请重新上传！",
                    type: "error"
                })
            }
        })
    
   
    },
    // 限制图片上传
    onExceedVideoLimits () {

    },
    // 這裏傳入 id的值，是由 :value="item.id"綁帶的決定的，如果綁帶的事name,則傳進來的name
    selectProvince (id) {
        this.cityarr = []
        this.regionarr = []
        // this.form.region = ''
        // this.form.cities = ''
        // this.form.district = ''
        this.provincearr.forEach((item, index) => {
            // console.log('item',item)
            // console.log('item.children',item.children)
            // 将点击下拉框的数据 给到 this.form.region 为什么获取的是id值，而不是name或者children？
            this.form.region = id // 好像这一步的赋值也不是必须的 下面方法的就直接可以 用id来判断了
            // console.log('id',id)
            if (this.form.region == item.id) {
                this.cityarr = item.children
                // console.log('this.cityarr',this.cityarr)
                // this.form.region = ''
            }
            // 为什么有这一步 是因为每次改变省份 城市的时候，城市的框会遗留上一个选择城市的id 显示在框内，所以要把他清楚掉
            this.form.cities = ''

        })
    },
    selectcity (id) {
        this.regionarr = []
        // this.form.district = ''
        this.cityarr.forEach((item,index) => {
          if (id == item.id) {
            this.regionarr = item.children
            // console.log('regionarr',regionarr)
          }
            this.form.district = ''
        })
    }
    
 },
    created (){
      this.getVideoList ()
      this.provincearr = province
    },
    mounted () {
      this.selectProvince ()  
    }   

}
</script>

<style lang="less" scoped>

</style>