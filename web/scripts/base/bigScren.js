$(function(){
    shisi()
    jiaona()
    setInterval(() => {
        shisi()
        jiaona()
    },2000)
    getJson()
    bj()
})
function jiaona(){
    let myChartPhoto = echarts.init(document.getElementById('stopPhoto'));
    let a = (Math.random()*30).toFixed(1),b = (Math.random()*70).toFixed(1)
    let data ={
        kong:a ,
        zan:b,
        total: Math.floor(Number(a) + Number(b))
    }
    optionPhoto = {
        title: {
            text: '今天收费缴纳比例图',  // title
            textStyle: {
                color: '#FFFFFF',  // 颜色
                align: 'center',          // 左右
            },
            top: 15,
            left: 10,
            subtext: data.total + '(个)',
            subtextStyle: {
                fontSize:14,
                color: '#02F6FF',
                lineHeight: 15
            }
        },
        tooltip: {          // 鼠标移上去时候  显示小窗口
            show: false,
        },
        legend: {
            show: false,
        },
        grid: {
            button: 0
        },
        series: [
            {
                type: 'pie',  // 饼状图
                legendHoverLink: false,
                hoverAnimation: false,  // 不放大
                stillShowZeroSum: false,
                radius: ['30%', '60%'],   //圆角   空心半径 / 边框粗细
                avoidLabelOverlap: true,
                center: ['50%', '60%'],  // 位置  X Y
                label: {
                    normal: {
                        show: false  // 不显示小标题
                    }
                },
                markPoint: {
                    data: [
                        {
                            value: data.zan,
                            name: '占用',
                            percent: (data.zan / data.total).toFixed(1)*100, // 占用百分比
                            x: '82%',               //位置
                            y: '70%'
                        }, {
                            value: data.kong ,
                            name: '空闲',
                            percent: (data.kong / data.total).toFixed(1)*100,
                            x: '20%',
                            y: '90%',
                            label: {
                                normal: {
                                    align: 'right'
                                }
                            }
                        }
                    ],
                    symbolSize: 1,
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            formatter: function (params) {
                                if (params.data.percent === 'NaN') {
                                    params.data.percent = 0.0
                                }
                                if (params.data.name === '占用') {
                                    return [
                                        '{inDian| }',
                                        '{in|' + params.data.name + '}',
                                        '{in|' + params.data.value + '}',
                                        '{in|' + params.data.percent + '%}'
                                    ].join('\n')
                                } else if (params.data.name === '空闲') {
                                    return [
                                        '{outDian| }',
                                        '{out|' + params.data.name + '}',
                                        '{out|' + params.data.value + '}',
                                        '{out|' + params.data.percent + '%}'
                                    ].join('\n')
                                }
                            },
                            lineHeight: 18,
                            rich: {
                                inDian: {
                                    backgroundColor: {
                                        image: '../../images/lvse.png'
                                    },
                                    width: 8,
                                    height: 9
                                },
                                in: {
                                    color: '#02F6FF',
                                    fontSize:14
                                },
                                outDian: {
                                    backgroundColor: {
                                        image: '../../images/lvsekong.png'
                                    },
                                    width: 8,
                                    height: 9
                                },
                                out: {
                                    color: '#FFFFFF',
                                    fontSize:14
                                }
                            }
                        },
                        emphasis: {
                            show: true,
                            position: 'outside'
                        }
                    }

                },
                data: [
                    {
                        value: data.zan,
                        name: '缴纳',
                        itemStyle: {
                            normal: {
                                color: '#02F6FF'
                            }
                        }
                    },
                    {
                        value: data.kong,
                        name: '代缴',
                        itemStyle: {
                            normal: {
                                color: '#065377'
                            }
                        }
                    },
                ]
            }
        ]
    };
    myChartPhoto.setOption(optionPhoto);
}
function shisi(){
    let myChart = echarts.init(document.getElementById('bar'));
    let a = (Math.random()*30).toFixed(1),b = (Math.random()*70).toFixed(1)
    let data ={
        kong:a ,
        zan:b,
        total: Math.floor(Number(a) + Number(b))
    }
    option = {
        title: {
            text: '实时利用率',  // title
            textStyle: {
                color: '#FFFFFF',  // 颜色
                align: 'center',          // 左右
            },
            top: 15,
            left: 10,
            subtext: data.total + '(个)',
            subtextStyle: {
                fontSize:14,
                color: '#12fa84',
                lineHeight: 15
            }
        },
        tooltip: {          // 鼠标移上去时候  显示小窗口
            show: false,
        },
        legend: {
            show: false,
        },
        grid: {
            button: 0
        },
        series: [
            {
                type: 'pie',  // 饼状图
                legendHoverLink: false,
                hoverAnimation: false,  // 不放大
                stillShowZeroSum: false,
                radius: ['30%', '60%'],   //圆角   空心半径 / 边框粗细
                avoidLabelOverlap: true,
                center: ['50%', '60%'],  // 位置  X Y
                label: {
                    normal: {
                        show: false  // 不显示小标题
                    }
                },
                markPoint: {
                    data: [
                        {
                            value: data.zan,
                            name: '占用',
                            percent: (data.zan / data.total).toFixed(1)*100, // 占用百分比
                            x: '82%',               //位置
                            y: '70%'
                        }, {
                            value: data.kong ,
                            name: '空闲',
                            percent: (data.kong / data.total).toFixed(1)*100,
                            x: '20%',
                            y: '90%',
                            label: {
                                normal: {
                                    align: 'right'
                                }
                            }
                        }
                    ],
                    symbolSize: 1,
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            formatter: function (params) {
                                if (params.data.percent === 'NaN') {
                                    params.data.percent = 0.0
                                }
                                if (params.data.name === '占用') {
                                    return [
                                        '{inDian| }',
                                        '{in|' + params.data.name + '}',
                                        '{in|' + params.data.value + '}',
                                        '{in|' + params.data.percent + '%}'
                                    ].join('\n')
                                } else if (params.data.name === '空闲') {
                                    return [
                                        '{outDian| }',
                                        '{out|' + params.data.name + '}',
                                        '{out|' + params.data.value + '}',
                                        '{out|' + params.data.percent + '%}'
                                    ].join('\n')
                                }
                            },
                            lineHeight: 18,
                            rich: {
                                inDian: {
                                    backgroundColor: {
                                        image: '../../images/lvse.png'
                                    },
                                    width: 8,
                                    height: 9
                                },
                                in: {
                                    color: '#12fa84',
                                    fontSize:14
                                },
                                outDian: {
                                    backgroundColor: {
                                        image: '../../images/lvsekong.png'
                                    },
                                    width: 8,
                                    height: 9
                                },
                                out: {
                                    color: '#FFFFFF',
                                    fontSize:14
                                }
                            }
                        },
                        emphasis: {
                            show: true,
                            position: 'outside'
                        }
                    }

                },
                data: [
                    {
                        value: data.zan,
                        name: '占用',
                        itemStyle: {
                            normal: {
                                color: '#12fa84'
                            }
                        }
                    },
                    {
                        value: data.kong,
                        name: '空闲',
                        itemStyle: {
                            normal: {
                                color: '#055957'
                            }
                        }
                    },
                ]
            }
        ]
    };
    myChart.setOption(option);
}
function bj() {
    setInterval(() => {
        let a = random();
        $('.bj .loadWidth').css('width',a+'%')
        $('.bj .precentLoad').html(a + '%')
    },2000)
    setInterval(() => {
        let a = random();
        $('.sjs .loadWidth').css('width',a+'%')
        $('.sjs .precentLoad').html(a + '%')
    },2000)
    setInterval(() => {
        let a = random();
        $('.cy .loadWidth').css('width',a+'%')
        $('.cy .precentLoad').html(a + '%')
    },2000)
    setInterval(() => {
        let a = random();
        $('.tz .loadWidth').css('width',a+'%')
        $('.tz .precentLoad').html(a + '%')
    },2000)
    setInterval(() => {
        let a = random();
        $('.ft .loadWidth').css('width',a+'%')
        $('.ft .precentLoad').html(a + '%')
    },2000)
    setInterval(() => {
        let a = random();
        $('.dc .loadWidth').css('width',a+'%')
        $('.dc .precentLoad').html(a + '%')
    },2000)
    setInterval(() => {
        let a = random();
        $('.xc .loadWidth').css('width',a+'%')
        $('.xc .precentLoad').html(a + '%')
    },2000)
    setInterval(() => {
        let a = random();
        $('.hd .loadWidth').css('width',a+'%')
        $('.hd .precentLoad').html(a + '%')
    },2000)
}
function random() {
    return (Math.random()* 100).toFixed(2)
}
function getJson(){
    $.get('/scripts/base/beijing.json',function(beijing){
        echarts.registerMap('beijing', beijing);
        let chart = echarts.init(document.getElementById('map'));
        chart.setOption({
            tooltip: {
                show: false
            },
            hoverLayerThreshold:false,
            animation: false,
            geo: {
                map: 'beijing',
                itemStyle: {
                    normal: {
                        areaColor: '#0c3b80',
                        borderColor: '#2d85ff',
                        borderType: 'dashed',
                        borderWidth: 1.3
                    }
                },
                label:{
                    normal:{
                        fontSize:13
                    }
                },
                top: '12%',
                bottom: '17%',
                regions: [
                    {
                        name: '通州区',
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return ['{a| }', '{cc|' + params.name + '}'].join('\n');
                                },
                                rich: {
                                    cc: {
                                        color: '#FFFFFF',
                                    },
                                    a: {
                                        backgroundColor: {
                                            image: '../../images/tongzhou@2x.png'
                                        },
                                        width: 20,
                                        height: 20
                                    }
                                }
                            }
                        }
                    },
                    {
                        name: '朝阳区',
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return ['{a| }', '{cc|' + params.name + '}'].join('\n');
                                },
                                rich: {
                                    cc: {
                                        color: '#FFFFFF'
                                    },
                                    a: {
                                        backgroundColor: {
                                            image: '../../images/chaoyang@2x.png'
                                        },
                                        width: 20,
                                        height: 20
                                    }
                                }
                            }
                        }
                    },
                    {
                        name: '海淀区',
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return ['{a| }', '{cc|' + params.name + '}'].join('\n');
                                },
                                rich: {
                                    cc: {
                                        color: '#FFFFFF'
                                    },
                                    a: {
                                        backgroundColor: {
                                            image: '../../images/haidian@2x.png'
                                        },
                                        width: 20,
                                        height: 20
                                    }
                                }
                            }
                        }
                    },
                    {
                        name: '丰台区',
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return ['{a| }', '{cc|' + params.name + '}'].join('\n');
                                },
                                rich: {
                                    cc: {
                                        color: '#FFFFFF',
                                    },
                                    a: {
                                        backgroundColor: {
                                            image: '../../images/fengtai@2x.png'
                                        },
                                        width: 20,
                                        height: 20
                                    }
                                }
                            }
                        }
                    },
                    {
                        name: '石景山区',
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return ['{a| }', '{cc|' + params.name + '}'].join('\n');
                                },
                                rich: {
                                    cc: {
                                        color: '#FFFFFF',
                                    },
                                    a: {
                                        backgroundColor: {
                                            image: '../../images/shijingshan@2x.png'
                                        },
                                        width: 20,
                                        height: 20
                                    }
                                }
                            }
                        }
                    },
                    {
                        name: '西城区',
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return ['{a| }', '{cc|' + params.name + '}'].join('\n');
                                },
                                rich: {
                                    cc: {
                                        color: '#FFFFFF'
                                    },
                                    a: {
                                        backgroundColor: {
                                            image: '../../images/xicheng@2x.png'
                                        },
                                        width: 20,
                                        height: 40
                                    }
                                }
                            }
                        }
                    },
                    {
                        name: '东城区',
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return ['{a| }', '{cc|' + params.name + '}'].join('\n');
                                },
                                rich: {
                                    cc: {
                                        color: '#FFFFFF'
                                    },
                                    a: {
                                        backgroundColor: {
                                            image: '../../images/dongcheng@2x.png'
                                        },
                                        width: 18,
                                        height: 18
                                    }
                                }
                            }
                        }
                    }
                ]

            },
            series: [{
                type: 'scatter',
                coordinateSystem: 'geo',
                rippleEffect: {
                    brushType: 'stroke',
                    period: 2,
                    scale: 8
                },
                hoverAnimation: false,
                label: {
                    show: false
                },
                itemStyle: {
                    normal: {
                        areaColor: '#0c3b80',
                        borderColor: '#2d85ff',
                        borderType: 'dashed',
                        borderWidth: 1.3
                    }
                },
                zlevel: 1
            }]
        });
    })
}