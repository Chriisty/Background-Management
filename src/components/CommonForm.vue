<template>
<!-- 封装的 form表单 -->
   <!-- :inline="inline" 是elment ui的一个行内属性  -->
    <el-form :inline="inline" :model="form" ref="form" label-width="100px" :disabled="disabled">
                                <!-- 这个formLabel的数据是表单的左边提示项 例如 性名：xxxx, 性别：xxx  -->
    <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label">
 <!-- 这里form表单做了一个封装 所以这里有个v-if type类型的判断,如果没有这个判断，那么 每个item都会照着下面的渲染6次，就会有重复，所以才要加个v-if判断，判断如果不是这个类型 就不渲染出来-->
                                <!-- v-if="!item.type" 不是设置type的话就让他默认显示 input -->
        <el-input v-model="form[item.model]" :placeholder="'请输入'+ item.label" v-if="!item.type"></el-input>
        <el-select v-model="form[item.model]" placeholder="请选择" v-if="item.type === 'select'"><!-- 如果type不是 select的话就 不会显示 -->
            <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-switch v-model="form[item.model]" v-if="item.type ==='switch'"></el-switch>
        <!-- 日期选择器 -->
         <el-date-picker v-model="form[item.model]" type="date" placeholder="选择日期" v-if="item.type === 'date'" value-format="yyyy-MM-dd"></el-date-picker>
  </el-form-item>
  <!-- 插槽  放进按钮-->
  <el-form-item>
    <slot></slot>
  </el-form-item>
 
</el-form>
</template>

<script>
export default {
    //这里props定义接受哪些字段 需要从父组件那里拿过来 再然后通过v-for形式渲染出来,比如label,v-model要接收的字段
    props:{
        inline: Boolean,
        form: Object,
        formLabel:Array,
        disabled: Boolean
       
    } 
}
</script>

<style lang="scss" scoped>

</style>