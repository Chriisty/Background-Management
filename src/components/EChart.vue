<template>
    <div style="height:100%" ref="echart">
        echart
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    // 定义一个props接收父组件传来的数据 父组件是Home.vue
    props:{
        chartData:{
            type:Object,
            default(){
                return{
                    xData:[],
                    series:[]
                }
            }
        },
        // 判断是否有坐标轴图表
        isAxisChart:{
            type:Boolean,
            default:true
        }
    },
    computed: {
        options() {
            // 通过计算属性来判断选 哪一个属性
            return this.isAxisChart ? this.axisOption : this.normalOption 
        },
        // 在computed这里通过计算属性来获取 是否折叠的状态 下面通过watch来监听
        isCollapse(){
            return this.$store.state.tab.isCollapse
        }
    },
    // 在处理initChar这个数据，可以监听
    watch:{
        chartData:{
          handler: function() {
          this.initChart()
      },
      deep: true
        },
        isCollapse(){
            setTimeout(() => {
                this.resizeChart()
            },300)
        }
    },
    data(){
        return{
            echart:null,
            // 有坐标轴图表
            axisOption:{
                // 图例
                legend:{
                    textStyle:{
                        color:'#333'
                    }
                },
                // grid:{
                //     left:'20%'
                // },
                // 悬浮提示
                tooltip:{
                     trigger: 'axis'
                },
                xAxis:  {
                        type: 'category',
                        data:[],
                        axisLine:{
                             lineStyle: {
                              color: '#17b3a3'
                                }   
                        },
                        axisLabel:{
                            color:'#333' //x轴上的颜色数据的颜色
                        }
                        },
                    
                yAxis: [
                        {
                        type: 'value',
                         axisLine:{
                             lineStyle: {
                             color: '#17b3a3' //y轴上的数据显示
                            }  
                        }
                        }
                    ],
                    color:[
                        '#2ec7c9',
                        '#b6a2de',
                        '#5ab1ef',
                        '#ffb980',
                        '#d87a80',
                        '#8d98b3',
                        '#e5cf0d',
                        '#97b552',
                        '#95706d',
                        '#dc69aa',
                        '#07a2a4',
                        '#9a7fd1',
                        '#588dd5',
                        '#f5994e',
                        '#c05050',
                        '#59678c',
                        '#c9ab00',
                        '#7eb00a',
                        '#6f5553',
                        '#c14089'
                    ],
                series:[]
            },
            // 没有坐标轴的图表 也就是饼状图
            normalOption:{
                 tooltip: {
                 trigger: 'item'
                },
                color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
                series:[]
            }
        }
    },
    methods:{
        // 需要两个方法 一个是初始化图表 另一个是初始化传过来的数据
        initChart(){
            this.initCharData() //渲染初始化时处理这个数据
            if(this.echart){//如果这个容器存在的话
                this.echart.setOption(this.options)
            }else{//如果不存在，则先初始化init容器,再setOption
                this.echart = echarts.init(this.$refs.echart)
                 this.echart.setOption(this.options)
            }
        },
        initCharData(){
            if(this.isAxisChart){
                this.axisOption.xAxis.data = this.chartData.xData
                this.axisOption.series = this.chartData.series
            }else{
                this.normalOption.series = this.chartData.series
            }
        },
        // echart自适应图表方法
        resizeChart(){
            // echart是否存在
            this.echart ? this.echart.resize() : ''
        }
    },
    mounted(){
        // 通过window来监听来触发这个resize事件 下面涌过销毁减少内存泄露
        window.addEventListener('resize',this.resizeChart)
    },
    // 涌过销毁减少内存泄露
    destroyed(){
        window.removeEventListener('resize',this.resizeChart)
    }

}
</script>

<style lang="scss" scoped>

</style>