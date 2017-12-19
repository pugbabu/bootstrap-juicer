$(function(){

    setInterval(() => {
        var myChart = echarts.init(document.getElementById('bar'));
        var a = (Math.random()*30).toFixed(1),b = (Math.random()*70).toFixed(1)
        var data ={
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
    },2000)

    setInterval(() => {
        var myChartPhoto = echarts.init(document.getElementById('stopPhoto'));
        var a = (Math.random()*30).toFixed(1),b = (Math.random()*70).toFixed(1)
        var data ={
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
    },2000)
    getJson()
})


function getJson(){
    $.get('../../scripts/base/beijing.json',function(beijing){
        console.log(beijing)
        echarts.registerMap('beijing', beijing);
        var chart = echarts.init(document.getElementById('map'));
        chart.setOption({
            series: [{
                type: 'map',
                map: 'beijing',
                itemStyle: {
                    normal: {
                        areaColor: '#0c3b80',
                        borderColor: '#2d85ff',
                        borderType: 'dashed',
                        borderWidth: 1.3
                    }
                },
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
                                            image: '../../images/screenShow/tongzhou@2x.png'
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
                                            image: '../../images/screenShow/chaoyang@2x.png'
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
                                            image: '../../images/screenShow/haidian@2x.png'
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
                                            image: '../../images/screenShow/fengtai@2x.png'
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
                                            image: '../../images/screenShow/shijingshan@2x.png'
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
                                            image: '../../images/screenShow/xicheng@2x.png'
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
                                            image: '../../images/screenShow/dongcheng@2x.png'
                                        },
                                        width: 18,
                                        height: 18
                                    }
                                }
                            }
                        }
                    }
                ]
            }]
        });
    })
}