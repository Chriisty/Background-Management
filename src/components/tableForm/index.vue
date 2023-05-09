<template>
    <div>
       <el-form :model="form" :rules="rules">
                                                                                <!-- prop="item.prop" 是校验规则 -->
          <el-form-item v-for="item in formLable" :key="item.model" :label="item.label" label-width="100px">
                <el-input v-model="form[item.model]" v-if="!item.type"></el-input>
                
                  <!-- 三级联动数据 -->
                                                                                <!--注意点  @change 它后面跟的方法不能加() -->
                  <el-select class="cityClass" v-model="form[item.model]"  v-if="item.type === 'select'" @change= "handleProvince">
                      <el-option  v-for="(item, index) of provinceData" :key="index" :label="item.name" :value="item.id" >
                      </el-option>
                  </el-select>
                  <el-select class="cityClass" v-model="form[item.model]"  v-if="item.type === 'select1'" @change= "handleCity">
                      <el-option  v-for="(item,index) of cityArr" :key="index" :label="item.name" :value="item.id">
                      </el-option>
                  </el-select>
                  <el-select class="cityClass" v-model="form[item.model]"  v-if="item.type === 'select2'" >
                      <!-- 这里的 v-for 的值可以借鉴  写死的数据-->
                      <!-- <el-option  v-for="item in item.districtArr" :key="item.label" :label="item.label" :value="item.value"></el-option> -->
                       <el-option  v-for="(item,index) of regionarrData" :key="index" :label="item.name" :value="item.id">
                       </el-option>
                  </el-select>
              

                <el-date-picker v-model="form[item.model]" v-if="item.type === 'date'" value-format="yyyy-MM-dd"></el-date-picker>
                <el-switch  v-model="form[item.model]" v-if="item.type === 'switch'" ></el-switch>



                <el-checkbox-group  v-model="form[item.model]" v-if="item.type === 'checkbox'">
                <el-checkbox v-for="item in item.checkboxs" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
                </el-checkbox-group>

               
                <el-radio-group  v-model="form[item.model]" v-if="item.type === 'radio'">
                <el-radio v-for="item in item.radios" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              
                <el-input type="textarea"  v-model="form[item.model]" v-if="item.type === 'textarea'"></el-input>
                <el-upload
                    v-if="item.type === 'upload'"
                    class="avatar-uploader"
                    :multiple="true"
                    drag
                    webkitdirectory
                    accept=".JPG,.png,.GIF"
                    :action="action"
                    list-type = "picture"
                    :header="headers"
                    :on-change="handleChange"
                    :on-preview ="handlePicturePreview"
                    :on-exceed = "onExceedLimit"
                    :http-request ="handleSuccess"
                    :limit="limit"
                    :file-list="fileLists"
                    >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                  
                </el-upload>
          </el-form-item>
       </el-form>
    </div>
</template>

<script>

export default {
props:{
    cityArr: Array,
    regionarrData: Array,
    provinceData:Array,
    form:Object,
    formLable:Array,
    headers:Object,
    imageUrl:String, 
    // 两种写法都行
    rules:{
        type:Object,
        default:function(){
            return {}
        }
    },
    // 第二种写法 rules:Object
    action: String,     // 必选参数，上传的地址  baseUrl + '后台接口'
    // 最大允许上传个数
    limit:Number,
     // 上传文件列表
    fileLists: Array
},
data () {
  return {  
    
    // 获取上传图片的url
    uploadUrl:'',
   }
 },
 methods:{
    // 获取文件路径 
    handleChange () {
      this.$emit('handlePictureUrl')
      console.log(document.getElementsByClassName("el-upload__input"))
      // var js = document.scripts;
      // js = js[js.length-1].src.substring(0,js[js.length-1].src.lastIndexOf("/")+1);
      // console.log('js',js)
      // var url = null
      // let path = document.getElementsByClassName("el-upload__input")[0].files[0]
      // if(window.createObjectURL != undefined) {
      //   url = window.createObjectURL(path)
      //   console.log('url1',url)
      // } else if (window.URL != undefined) {
      //   url = window.URL.createObjectURL(path)
      //   console.log('url2',url)
      // } else if (window.webkitURL != undefined) {
      //   url = window.webkitURL.createObjectURL(path)
      //   console.log('url3',url)
      // }
     
    },
    handlePicturePreview(file) {
      // this.$http.get('api/xxx/xxx').then( res => {
      //   // 封装 Blob, 创建 下载链接
      //   Blob blob = new Blob(res.data, {type: 'multipary/form-data'})
      //   // 通过创建的blob创建下载的链接
      //   const href = window.URL.createURL(blob)
      //   // 创建 a 标签
      //   const link = document.createElement('a')
      //   // 设置a标签参数
      //   link.href = href
      //   // 下载后的文件名是后端接口相应中设置了response,headers()参数
      //   link.download = docodeURIComponent(decodeURIComponent(res.headers['filename']))
      //   // 把a标签加入到body中去
      //   document.appendChild(link)
      //   // 触发标签的点击事件，直接执行下载
      //   link.click()
      //   // 下载完成后要移除相应的标签
      //   document.body.removeChild(link)
      //   // 释放blob对象创建的链接地址
      //   window.URL.revokeObjectURL(href)
      // }).catch( res => {
      //     this.$message({
      //       message:'下载失败',
      //       type: 'error'
      //     })
      // })

       // 第二种
      // var a = document.createElement('a')
      // var event = new MouseEvent('click')
      // a.download = file.name
      // a.href = file.url
      // a.href = file.url
      // a.dispatchEvent(event)
      // console.log(file)
},
    // 自定义成功上传图片
    handleSuccess(file){
        this.$emit('uploadImg',file)
    },
    // 文件数量限制
    onExceedLimit(file){
        this.$emit('onExceedLimits',file)
    },
    handleProvince (id) {
        this.$emit('selectProvinceData', id)
    },
    handleCity (id) {
      this.$emit('selectCityData', id)
    },
    // handleCheckbox () {
    //   this.$emit('selectcheckboxData')
    // }
  
 }     
}
</script>

<style lang="less" scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #e2d8d8;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background-color: white;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /deep/.el-upload-dragger{
    width: 100px;
    height: 100px;
  }
 
</style>
