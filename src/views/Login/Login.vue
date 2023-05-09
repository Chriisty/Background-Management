<template>
    <el-form  :model="form" label-width="80px">
    <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>
    <!-- <el-form-item> -->
        <!-- @key.enter.native="handleLogin"> 回车登录事件 -->
      <!-- <el-input v-model="form.code" placeholder="验证码" @keyup.enter.native="handleLogin">
      </el-input> -->
      <!-- <div>
        <img :src="codeUrl" @click="getCode" class="login-coede-img"/>
      </div> -->
    <!-- </el-form-item> -->
    <el-form-item >
        <el-button type="primary" @click="login">登陆</el-button>
    </el-form-item>
    </el-form>
</template>

<script>
export default {
    data(){
        return{
            form:{
                username:'',
                password:'',
                // 验证码
                code:'',
                // 验证码图片
                codeUrl: ''
        }
        }
    },
    methods:{
        login(){
            this.$http.post('api/permission/getMenu', this.form).then(
                res => {
                    res = res.data
                    if(res.code === 20000){ //code为20000，意思就是用户密码正确才会才走这一步
                        this.$store.commit('clearMenu') //这里是为了防止再次登陆
                        this.$store.commit('setMenu',res.data.menu) //调用vuex setMenu方法，从后台拿取res.data.menu，将menu存到cookie
                        this.$store.commit('setToken',res.data.token)//在登陆 设置保存好token
                        // 触发 进行动态路由 加载 一个是在这里，另一个 是在 main.js的new vue刷新触发时机
                        this.$store.commit('addMenu', this.$router) //调用vuex addMenu方法,要传this.$router进行动态路由
                        this.$router.push({name:'home'})//最后用name来判断 跳转 首页
                    }else{
                        this.$message.warning(res.data.message)//调用elmet ui的warning方法，这个方法放到res.data.message里面去
                    }
                }
            )
        },
        handleLogin () {
            // 判断如果验证码的input框不为空，就将code码传送给后台
            // if (this.form.code) {
            //     this.$http.post('/api/xxx/xxx',this.form.code).then( res => {
            //     // 如果后台要前端判断 就让后台返回结果给前端，在点击login登录时判断自己输的和他返回的结果对不对
            //     })
            // } else {
            //     alert('验证码为空，请输入验证码！')
            // }
        },
        // 点击的时候就请求图片了
        getCode () {
        //   this.$http.get('/api/xxx/xxx').then( res => {
        //     console.log('res',res)
        //     if ( res.state == 200) {
        //         this.codeUrl = res.data.img
        //     }
        //   })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>