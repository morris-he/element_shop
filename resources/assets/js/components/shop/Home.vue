
<template>
    <div>
        <div id="main" style="width: 600px;height:400px;"></div>
        <div id="main1" style="width: 600px;height:400px;"></div>

        <!--本周订单图-->
        <!--<el-row>-->
            <!--<el-col :span="24">-->
                <!--<div id="sales_count" style="width: 100%;height:400px;"></div>-->
            <!--</el-col>-->
        <!--</el-row>-->

        <!--&lt;!&ndash;本周销量图&ndash;&gt;-->
        <!--<el-row>-->
            <!--<el-col :span="24">-->
                <!--<div id="sales_amount" style="width: 100%;height:400px;"></div>-->
            <!--</el-col>-->
        <!--</el-row>-->

        <!--&lt;!&ndash;本月热销商品Top图&ndash;&gt;-->
        <!--<el-row>-->
            <!--<el-col :span="24">-->
                <!--<div id="top" style="width: 100%;height:400px;"></div>-->
            <!--</el-col>-->
        <!--</el-row>-->


        <!--<el-row>-->
            <!--&lt;!&ndash;会员性别统计&ndash;&gt;-->
            <!--<el-col :span="12">-->
                <!--<div id="sex_count" style="width: 100%;height:400px;"></div>-->
            <!--</el-col>-->
            <!--&lt;!&ndash;会员省份统计&ndash;&gt;-->
            <!--<el-col :span="12">-->
                <!--<div id="customer_province" style="width: 100%;height:400px;"></div>-->
            <!--</el-col>-->
        <!--</el-row>-->
    </div>
</template>

<script>
    import echarts from 'echarts';
    import 'echarts/theme/macarons.js'
    import 'echarts/map/js/china.js'

    export default {
        data(){
            return{
                lists:[]
            }
        },
    // mounted 是生命周期，在DOM事件渲染完成之后执行，相当于调用
        created(){

        },
        mounted() {
            this.init()
            this.init1()
            // this.map_x();
            // this.sales_count();
            // this.sales_amount();
            // this.top();
            // this.sex_count();
            // this.customer_province();
        },
        methods: {
            init(){
                var myChart = echarts.init(document.getElementById('main'));

                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                                {value: 1548, name: '搜索引擎'}
                            ]
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                // var myChart = echarts.init(document.getElementById('sales_count'));
                //
                // // 指定图表的配置项和数据
                // var option = {
                //     xAxis: {
                //         type: 'category',
                //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                //     },
                //     yAxis: {
                //         type: 'value'
                //     },
                //     series: [{
                //         data: [820, 932, 901, 934, 1290, 1330, 1320],
                //         type: 'line'
                //     }]
                // };


                // 使用刚指定的配置项和数据显示图表。
                // myChart.setOption(option);
            },
            init1(){
                var myChat = echarts.init(document.getElementById('main1'))

                var option = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                };
                myChat.setOption(option)
            }

            // 地图
            // map_x(){
            //     axios.get("http://localhost:8000/api/sales_count").then(response => {
            //         var data = response.data;
            //         var hStep = 300 / (data.length - 1);
            //         var busLines = [].concat.apply([], data.map(function (busLine, idx) {
            //             var prevPt;
            //             var points = [];
            //             for (var i = 0; i < busLine.length; i += 2) {
            //                 var pt = [busLine[i], busLine[i + 1]];
            //                 if (i > 0) {
            //                     pt = [
            //                         prevPt[0] + pt[0],
            //                         prevPt[1] + pt[1]
            //                     ];
            //                 }
            //                 prevPt = pt;
            //                 points.push([pt[0] / 1e4, pt[1] / 1e4]);
            //             }
            //             return {
            //                 coords: points,
            //                 lineStyle: {
            //                     normal: {
            //                         color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
            //                     }
            //                 }
            //             };
            //         }));
            //         var myChart = echarts.init(document.getElementById('sales_count'), 'macarons');
            //
            //         myChart.setOption(
            //             {
            //                 bmap: {
            //                     center: [116.46, 39.92],
            //                     zoom: 10,
            //                     roam: true,
            //                     mapStyle: {
            //                         'styleJson': [
            //                             {
            //                                 'featureType': 'water',
            //                                 'elementType': 'all',
            //                                 'stylers': {
            //                                     'color': '#031628'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'land',
            //                                 'elementType': 'geometry',
            //                                 'stylers': {
            //                                     'color': '#000102'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'highway',
            //                                 'elementType': 'all',
            //                                 'stylers': {
            //                                     'visibility': 'off'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'arterial',
            //                                 'elementType': 'geometry.fill',
            //                                 'stylers': {
            //                                     'color': '#000000'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'arterial',
            //                                 'elementType': 'geometry.stroke',
            //                                 'stylers': {
            //                                     'color': '#0b3d51'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'local',
            //                                 'elementType': 'geometry',
            //                                 'stylers': {
            //                                     'color': '#000000'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'railway',
            //                                 'elementType': 'geometry.fill',
            //                                 'stylers': {
            //                                     'color': '#000000'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'railway',
            //                                 'elementType': 'geometry.stroke',
            //                                 'stylers': {
            //                                     'color': '#08304b'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'subway',
            //                                 'elementType': 'geometry',
            //                                 'stylers': {
            //                                     'lightness': -70
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'building',
            //                                 'elementType': 'geometry.fill',
            //                                 'stylers': {
            //                                     'color': '#000000'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'all',
            //                                 'elementType': 'labels.text.fill',
            //                                 'stylers': {
            //                                     'color': '#857f7f'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'all',
            //                                 'elementType': 'labels.text.stroke',
            //                                 'stylers': {
            //                                     'color': '#000000'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'building',
            //                                 'elementType': 'geometry',
            //                                 'stylers': {
            //                                     'color': '#022338'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'green',
            //                                 'elementType': 'geometry',
            //                                 'stylers': {
            //                                     'color': '#062032'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'boundary',
            //                                 'elementType': 'all',
            //                                 'stylers': {
            //                                     'color': '#465b6c'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'manmade',
            //                                 'elementType': 'all',
            //                                 'stylers': {
            //                                     'color': '#022338'
            //                                 }
            //                             },
            //                             {
            //                                 'featureType': 'label',
            //                                 'elementType': 'all',
            //                                 'stylers': {
            //                                     'visibility': 'off'
            //                                 }
            //                             }
            //                         ]
            //                     }
            //                 },
            //                 series: [{
            //                     type: 'lines',
            //                     coordinateSystem: 'bmap',
            //                     polyline: true,
            //                     data: busLines,
            //                     silent: true,
            //                     lineStyle: {
            //                         normal: {
            //                             // color: '#c23531',
            //                             // color: 'rgb(200, 35, 45)',
            //                             opacity: 0.2,
            //                             width: 1
            //                         }
            //                     },
            //                     progressiveThreshold: 500,
            //                     progressive: 200
            //                 }, {
            //                     type: 'lines',
            //                     coordinateSystem: 'bmap',
            //                     polyline: true,
            //                     data: busLines,
            //                     lineStyle: {
            //                         normal: {
            //                             width: 0
            //                         }
            //                     },
            //                     effect: {
            //                         constantSpeed: 20,
            //                         show: true,
            //                         trailLength: 0.1,
            //                         symbolSize: 1.5
            //                     },
            //                     zlevel: 1
            //                 }]
            //             }
            //             );
            //     })
            // },
            //
            //
            //
            //
            // //本周订单图
            // sales_count() {
            //     // 现请求接口
            //     axios.get("http://localhost:8000/api/sales_count").then(response => {
            //                 var data = response.data;
            //             var myChart = echarts.init(document.getElementById('sales_count'), 'macarons');
            //
            //             myChart.setOption({
            //                 tooltip: {
            //                     trigger: 'item',
            //                     formatter: "{a} <br/>{b}: {c} ({d}%)"
            //                 },
            //                 legend: {
            //                     orient: 'vertical',
            //                     x: 'left',
            //                 data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            //             },
            //             series: [
            //                 {
            //                     name:'访问来源',
            //                     type:'pie',
            //                     radius: ['50%', '70%'],
            //                     avoidLabelOverlap: false,
            //                     label: {
            //                         normal: {
            //                             show: false,
            //                             position: 'center'
            //                         },
            //                         emphasis: {
            //                             show: true,
            //                             textStyle: {
            //                                 fontSize: '30',
            //                                 fontWeight: 'bold'
            //                             }
            //                         }
            //                     },
            //                     labelLine: {
            //                         normal: {
            //                             show: false
            //                         }
            //                     },
            //                     data:[
            //                         {value:335, name:'直接访问'},
            //                         {value:310, name:'邮件营销'},
            //                         {value:234, name:'联盟广告'},
            //                         {value:135, name:'视频广告'},
            //                         {value:1548, name:'搜索引擎'}
            //                     ]
            //                 }
            //             ]
            //         }
            //     );
            //
            //     })
            // },
            //
            // //    本周销量图
            // sales_amount() {
            //     axios.get("http://localhost:8000/api/sales_amount").then(response => {
            //         var data = response.data;
            //         var myChart = echarts.init(document.getElementById('sales_amount'), 'macarons');
            //         myChart.setOption({
            //             title: {
            //                 text: '本周销售额',
            //                 subtext: data.week_start + ' ~ ' + data.week_end
            //             },
            //             tooltip: {
            //                 trigger: 'axis'
            //             },
            //             legend: {
            //                 data: ['未付款', '已付款']
            //             },
            //             toolbox: {
            //                 show: true,
            //                 feature: {
            //                     dataZoom: {},
            //                     dataView: {
            //                         readOnly: false
            //                     },
            //                     magicType: {
            //                         type: ['line', 'bar']
            //                     },
            //                     restore: {},
            //                     saveAsImage: {}
            //                 }
            //             },
            //             xAxis: {
            //                 type: 'category',
            //                 data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            //             },
            //             yAxis: {
            //                 type: 'value',
            //                 axisLabel: {
            //                     formatter: '{value}'
            //                 }
            //             },
            //             series: [{
            //                     name: '未付款',
            //                     type: 'line',
            //                     data: data.amount.create,
            //                 },
            //                 {
            //                     name: '已付款',
            //                     type: 'line',
            //                     data: data.amount.pay,
            //                 }
            //             ]
            //         })
            //     })
            // },
            //
            //
            // //    本月热销商品Top图
            // top() {
            //     axios.get("http://localhost:8000/api/top").then(response => {
            //         var data = response.data;
            //         var myChart = echarts.init(document.getElementById('top'), 'macarons');
            //
            //         let sell = [];     //数据
            //         let type=[];       //类型
            //
            //         data.products.forEach((v) => {
            //             sell.push({
            //                 value: v.sum_num,
            //                 name: v.product.name
            //             }),
            //             type.push(v.name)
            //         })
            //
            //         myChart.setOption({
            //             title: {
            //                 text: '本月热销商品Top图',
            //                 subtext: data.month_start + ' ~ ' + data.month_end,
            //                 x: 'center'
            //             },
            //             tooltip: {
            //                 trigger: 'item',
            //                 formatter: "{a} <br/>{b} : {c} ({d}%)"
            //             },
            //             legend: {
            //                 orient: 'vertical',
            //                 left: 'left',
            //                 data:type,
            //                 },
            //             series: [{
            //                 name: '销售量',
            //                 type: 'pie',
            //                 radius: '75%',   //调整效果大小直径
            //                 center: ['50%', '60%'],
            //                 data: sell,
            //                 itemStyle: {
            //                     emphasis: {
            //                         shadowBlur: 10,
            //                         shadowOffsetX: 0,
            //                         shadowColor: 'rgba(0, 0, 0, 0.5)'
            //                     }
            //                 }
            //             }]
            //         });
            //     })
            // },
            //
            // // 会员性别统计
            // sex_count() {
            //     axios.get("http://localhost:8000/api/sex_count").then(response => {
            //         var data = response.data;
            //         var myChart = echarts.init(document.getElementById('sex_count'), 'macarons');
            //         myChart.setOption({
            //             title: {
            //                 text: '会员性别统计',
            //                 x: 'center'
            //             },
            //             tooltip: {
            //                 trigger: 'item',
            //                 formatter: "{a} <br/>{b} : {c} ({d}%)"
            //             },
            //             legend: {
            //                 orient: 'vertical',
            //                 left: 'left',
            //                 data: ['男', '女']
            //             },
            //             series: [{
            //                 name: '访问来源',
            //                 type: 'pie',
            //                 radius: '60%',
            //                 center: ['50%', '60%'],
            //                 data: [{
            //                         value: data.male,
            //                         name: '男'
            //                     },
            //                     {
            //                         value: data.female,
            //                         name: '女'
            //                     }
            //                 ],
            //                 itemStyle: {
            //                     emphasis: {
            //                         shadowBlur: 10,
            //                         shadowOffsetX: 0,
            //                         shadowColor: 'rgba(0, 0, 0, 0.5)'
            //                     }
            //                 }
            //             }]
            //         });
            //     })
            // },
            //
            // // 会员省份统计
            // customer_province() {
            //     axios.get("http://localhost:8000/api/customer_province").then(response => {
            //
            //         console.log(response.data)
            //         var data = response.data;
            //         var myChart = echarts.init(document.getElementById('customer_province'), 'macarons');
            //         myChart.setOption({
            //
            //             title: {
            //                 text: '会员省份统计',
            //                 x: 'center'
            //             },
            //             tooltip: {
            //                 trigger: 'item'
            //             },
            //
            //             dataRange: {
            //                 min: 0,
            //                 max: 100,
            //                 x: 'left',
            //                 y: 'bottom',
            //                 text: ['高', '低'], // 文本，默认为数值文本
            //                 calculable: true,
            //                 splitNumber: 0,
            //                 // color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096', ]
            //             },
            //             toolbox: {
            //                 show: true,
            //                 orient: 'vertical',
            //                 x: 'right',
            //                 y: 'center',
            //                 feature: {
            //                     mark: {
            //                         show: true
            //                     },
            //                     dataView: {
            //                         show: true,
            //                         readOnly: false
            //                     },
            //                     dataZoom: {
            //                         show: true
            //                     },
            //                     restore: {
            //                         show: true
            //                     },
            //                     saveAsImage: {
            //                         show: true
            //                     }
            //                 }
            //             },
            //             roamController: {
            //                 show: true,
            //                 x: 'right',
            //                 mapTypeControl: {
            //                     'china': true
            //                 }
            //             },
            //             series: [{
            //                 name: '会员',
            //                 type: 'map',
            //                 mapType: 'china',
            //                 roam: false,
            //                 itemStyle: {
            //                     normal: {
            //                         label: {
            //                             show: true
            //                         }
            //                     },
            //                     emphasis: {
            //                         label: {
            //                             show: true
            //                         }
            //                     }
            //                 },
            //                 data: data,
            //             }]
            //         });
            //     })
            // }
        }
    }
</script>

<style scoped>
    .el-main>div {
        margin: 35px;
    }
</style>
