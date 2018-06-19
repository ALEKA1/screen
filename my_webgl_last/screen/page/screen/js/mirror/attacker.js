var refresh= {
    totalInfo: 1000*60*2,
    chart: 1000*60*5,
    week: 1000*60*10,
    web: 1000*60
};
var Attacker ={
    init: function(){
        var w =this;
        w.totalDayInfo();   // 日累计攻击数量
        w.attackerPer(); //攻击者数量环比
        w.totalTypeInfo();//日累计攻击类型
        w.attackerLevel();   //日累计攻击者等级
        w.weekType();
        w.initChart();
        $(window).resize(function(){
            w.initChart();
        });
        clearInterval(chartTime);
        var chartTime = setInterval(function(){
            w.totalDayInfo();
            w.attackerPer();
            w.totalTypeInfo();
            w.attackerLevel();
        },refresh.totalInfo);
    },
    //日累计攻击者
    totalDayInfo: function(){
        var w =this;
        var param = {domain: 'all',interval: '0d',isSingleDay: true}
        // $.get('/api/attack?url=attackCountEveryDay&domain=all&interval=0d&isSingleDay=true').success(function(json){
        $.ajax({
            type: 'post',
            url: '/api/attack?url=attackerCountBySevenDays',
            dataType: 'json',
            success: function(json){
                if(json.code==0){
                    var count =json.data.number||0;
                    // _fun.numChange.call(w,'.total-day span',count);
                    $('.total-day span').text(count);


                }
            }
        })
        // $.post('/api/attack?url=attackerCountBySevenDays').success(function(json){
        //     if(json.code==0){
        //         var count =json.data.number||0;
        //         // _fun.numChange.call(w,'.total-day span',count);
        //         $('.total-day span').text(count);


        //     }
        // });
    },
    //攻击者数量环比
    attackerPer: function(){
        var w =this;
        var param = {domain: 'all',interval: '0d',isSingleDay: true}
        $.ajax({
            type: 'post',
            url: '/api/attack?url=attackCountRatio',
            data: param,
            dataType: 'json',
            success: function(json){
                if(json.code==0){
                    var count =json.data.ratio;
                    var perc = json.data.result;
                    if (perc=='down') {
                        $('.total-arrow').html('<i class="fa fa-arrow-down c-green"></i>');
                    } else if (perc =='up') {
                        $('.total-arrow').html('<i class="fa fa-arrow-up c-red"></i>');
                    } else {
                        $('.total-arrow').html('');
                    }
                    //攻击者环比
                    $('.total_percen').text(count);
                }
            }
        });
        // $.post('/api/attack?url=attackCountRatio',param).success(function(json){
        //     if(json.code==0){
        //         var count =json.data.ratio;
        //        var perc = json.data.result;
        //         if (perc=='down') {
        //             $('.total-arrow').html('<i class="fa fa-arrow-down c-green"></i>');
        //         } else if (perc =='up') {
        //             $('.total-arrow').html('<i class="fa fa-arrow-up c-red"></i>');
        //         } else {
        //             $('.total-arrow').html('');
        //         }
        //         //攻击者环比
        //         $('.total_percen').text(count);
        //     }
        // });
    },
    //日累计攻击类型
    totalTypeInfo: function(){
        var w =this;
        var param = {domain: 'all',interval: '0d',isSingleDay: true}
        $.ajax({
            type: 'post',
            url: '/api/attack?url=attackTypeEveryDay',
            data: param,
            dataType: 'json',
            success: function(json){
                if(json.code==0){
                    var TypeNm =json.data.number||0;
                    $('.total-type span').text(TypeNm);
                }

            }
        })
        // $.post('/api/attack?url=attackTypeEveryDay',param).success(function(json){
        //     if(json.code==0){
        //         var TypeNm =json.data.number||0;
        //         $('.total-type span').text(TypeNm);
        //     }

        // });
    },
    weekType: function(){
        var w =this;
        var param = {domain: 'all',interval: '6d',isSingleDay: true}
        $.ajax({
            type: 'post',
            url: '/api/attack?url=attackTypeSituationSevenDays',
            data: param,
            dataType: 'json',
            success: function(json){
                if(json.code==0){
                    var  jData = json.data,total =0 ;
                    $('#weekType tbody').html('');
                    var i =0,j = 0;
                    $.each(jData, function(k,v){
                        total=v.num;
                    })
                    for (var k = 0; k < jData.length; k++) {
                        total = jData[0]['num']
                    }
                    $.each(jData, function(k,v){
                        var per = (v.num*100/total).toFixed(2);
                        var el ='<tr>' +
                            '<td>'+v.type+'</td> ' +
                            '<td><div class="progress"><div class="progress-bar" style="width: '+per+'%" ></div></div></td>' +
                            '<td>' + v.num + '</td> ' +
                            '</tr>';
                        // j++;
                        // if(j>8){
                        //     return false
                        // }
                        $('#weekType tbody').append(el);

                    });
                }


            }
        })
        // $.post('/api/attack?url=attackTypeSituationSevenDays',param).success(function(json){
        //     if(json.code==0){
        //         var  jData = json.data,total =0 ;
        //         $('#weekType tbody').html('');
        //         var i =0,j = 0;
        //         $.each(jData, function(k,v){
        //             total=v.num;
        //         })
        //         for (var k = 0; k < jData.length; k++) {
        //             total = jData[0]['num']
        //         }
        //         $.each(jData, function(k,v){
        //             var per = (v.num*100/total).toFixed(2);
        //             var el ='<tr>' +
        //                 '<td>'+v.type+'</td> ' +
        //                 '<td><div class="progress"><div class="progress-bar" style="width: '+per+'%" ></div></div></td>' +
        //                 '<td>' + v.num + '</td> ' +
        //                 '</tr>';
        //             // j++;
        //             // if(j>8){
        //             //     return false
        //             // }
        //             $('#weekType tbody').append(el);

        //         });
        //     }


        // });
    },

    //日累计攻击者高中低和频繁攻击者
    attackerLevel: function(){
        var w =this;
        var param = {domain: 'all',interval: '0d',isSingleDay: true}
        $.ajax({
            type: 'post',
            url: '/api/attack?url=attackerCountByLevel',
            data: param,
            dataType: 'json',
            success: function(json){
                if(json.code==0){
                    var data =json.data;
                    var high = data.high,
                        mid= data.medium,
                        low = data.low;
                    // _fun.numChange.call(w,'.high-risk span',high);
                    // _fun.numChange.call(w,'.middle-risk span',mid);
                    // _fun.numChange.call(w,'.low-risk span',low);
                    $('.high-risk span').text(high)
                    $('.middle-risk span').text(mid)
                    $('.low-risk span').text(low)
                }
            }
        })
        // $.post('/api/attack?url=attackerCountByLevel',param).success(function(json){
        //     if(json.code==0){
        //         var data =json.data;
        //         var high = data.high,
        //             mid= data.medium,
        //             low = data.low;
        //         // _fun.numChange.call(w,'.high-risk span',high);
        //         // _fun.numChange.call(w,'.middle-risk span',mid);
        //         // _fun.numChange.call(w,'.low-risk span',low);
        //         $('.high-risk span').text(high)
        //         $('.middle-risk span').text(mid)
        //         $('.low-risk span').text(low)
        //     }
        // });
        var param = {domain: 'all',interval: '6d',isSingleDay: false}
        $.ajax({
            type: 'post',
            url: '/api/attack?url=attackerCountByLevel',
            data: param,
            dataType: 'json',
            success: function(json){
                if(json.code==0){
                  var data = json.data;
                  var high = data.high,
                    mid= data.medium,
                    low = data.low;
                    $('.fre-risk span').text(high+mid+low);
                    // _fun.numChange.call(w,'.fre-risk span',data.num);
                }
            }
        })
        // $.post('/api/attack?url=attackerCountBySevenDays',param).success(function(json){
        //     console.info(json);
        //     if(json.code==0){
        //         $('.fre-risk span').text(json.data.number);
        //         // _fun.numChange.call(w,'.fre-risk span',data.num);
        //     }
        // });

    },
    initChart: function(){
        var w = this;
        $('#allDay').height($(window).height() *.2);//.35
        $('#weekNum').height($(window).height()*.175);
        $('#attackType').height($(window).height()*.175);
        w.allDay = echarts.init(document.getElementById('allDay'));
        w.weekNum = echarts.init(document.getElementById("weekNum"));
        // w.weekType = echarts.init(document.getElementById('weekType'));

        w.drawChart();

    },
    drawChart: function(){
        var w = this;
        w.allDayLine();
        w.attackerLine();
        // w.attackerBar();
       /* clearInterval(weekTime);
        var weekTime = setInterval(function(){
            w.attackerLine();
            w.attackerBar();
        },refresh.week);
        clearInterval(webTime);
        var webTime = setInterval(function(){
            w.allDayLine();
        },refresh.web);*/
    },
    allDayLine: function(){
        var w = this;
        $.ajax({
            type: 'post',
            url: '/api/screen?url=lastest/web/visit_attack/countlist',
            data: {domain: 'all'},
            dataType: 'json',
            success: function(json){
                var dataX=[], dataY= [];
                if(json.code==0){
                    var  jData = json.data;
                    $.each(jData.xAxis,function(k,v){
                        dataX.push(v.substr(11,v.length-1));
                    });
                    w.allDay.setOption(w.lineOption(dataX,jData.series[1].data));
                }
            }
        })
        // $.post('/api/screen?url=lastest/web/visit_attack/countlist',{domain: 'all'}).success(function(json){
        //     var dataX=[], dataY= [];
        //     if(json.code==0){
        //         var  jData = json.data;
        //         $.each(jData.xAxis,function(k,v){
        //             dataX.push(v.substr(11,v.length-1));
        //         });
        //         w.allDay.setOption(w.lineOption(dataX,jData.series[1].data));
        //     }


        // });
    },
    attackerLine: function(){
        var w =this;
        var param = {domain: 'all',interval: '6d',isSingleDay: false}
        $.ajax({
            type: 'post',
            url: '/api/attack?url=attackCountSituationSevenDays',
            data: param,
            dataType: 'json',
            success: function(json){
                if (json.code==0) {
                    var jData = json.data;
                    var weekNumE = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['攻击数量']
                        },
                        grid: {
                            top: 30,
                            left: '3%',
                            right: '4%',
                            bottom: '4%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                axisTick: {
                                    alignWithLabel: true
                                },
                                axisLabel: {
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        width: 2
                                    }
                                },
                                boundaryGap : true,
                                data: []
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name: '/次',
                                nameTextStyle: {
                                    color: '#fff'
                                },
                                axisTick: {
                                    show: false
                                },
                                splitLine: {
                                    show: false

                                },
                                axisLine: {
                                    show: false
                                },
                                axisLabel: {
                                    interval: 0,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            }
                        ],
                        series : [
                            {
                                name:' 攻击数量 ',
                                type:'line',
                                symbol: 'image://img/mirror/attacker/line-dot.png',
                                lineStyle: {
                                    normal: {
                                        color: '#054bd2',
                                        type: 'dotted',
                                        width: 2
                                    }

                                },
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'top'
                                    }

                                },
                                areaStyle: {normal: {
                                    color:'rgba(15,32,73,0.8)'}
                                },
                                //data:[6151545, 4561265, 3156565, 1655666, 8262655, 5151511,13220322],
                                data: []


                            }
                        ]

                    };
                    var xAxis = [];
                    for (var i = 0; i < jData.xList.length; i++) {
                        xAxis.push(jData.xList[i].substring(5,10));
                    }
                    weekNumE.xAxis[0].data = xAxis;
                    weekNumE.series[0]. data = jData.yList;
                    //近期频繁攻击者
                    // _fun.numChange('.fre-risk span', total);
                }
                w.weekNum.setOption(weekNumE);

            }
        })
        // $.post('/api/attack?url=attackCountSituationSevenDays',param).success(function(json){
        //     if (json.code==0) {
        //         var jData = json.data;
        //         var weekNumE = {
        //             tooltip : {
        //                 trigger: 'axis'
        //             },
        //             legend: {
        //                 data:['攻击数量']
        //             },
        //             grid: {
        //                 top: 30,
        //                 left: '3%',
        //                 right: '4%',
        //                 bottom: '4%',
        //                 containLabel: true
        //             },
        //             xAxis : [
        //                 {
        //                     type : 'category',
        //                     axisTick: {
        //                         alignWithLabel: true
        //                     },
        //                     axisLabel: {
        //                         interval: 0,
        //                         textStyle: {
        //                             color: '#fff'
        //                         }
        //                     },
        //                     axisLine: {
        //                         lineStyle: {
        //                             width: 2
        //                         }
        //                     },
        //                     boundaryGap : true,
        //                     data: []
        //                 }
        //             ],
        //             yAxis : [
        //                 {
        //                     type : 'value',
        //                     name: '/次',
        //                     nameTextStyle: {
        //                         color: '#fff'
        //                     },
        //                     axisTick: {
        //                         show: false
        //                     },
        //                     splitLine: {
        //                         show: false

        //                     },
        //                     axisLine: {
        //                         show: false
        //                     },
        //                     axisLabel: {
        //                         interval: 0,
        //                         textStyle: {
        //                             color: '#fff'
        //                         }
        //                     }
        //                 }
        //             ],
        //             series : [
        //                 {
        //                     name:' 攻击数量 ',
        //                     type:'line',
        //                     symbol: 'image://img/mirror/attacker/line-dot.png',
        //                     lineStyle: {
        //                         normal: {
        //                             color: '#054bd2',
        //                             type: 'dotted',
        //                             width: 2
        //                         }

        //                     },
        //                     stack: '总量',
        //                     label: {
        //                         normal: {
        //                             show: false,
        //                             position: 'top'
        //                         }

        //                     },
        //                     areaStyle: {normal: {
        //                         color:'rgba(15,32,73,0.8)'}
        //                     },
        //                     //data:[6151545, 4561265, 3156565, 1655666, 8262655, 5151511,13220322],
        //                     data: []


        //                 }
        //             ]

        //         };
        //         var xAxis = [];
        //         for (var i = 0; i < jData.xList.length; i++) {
        //             xAxis.push(jData.xList[i].substring(5,10));
        //         }
        //         weekNumE.xAxis[0].data = xAxis;
        //         weekNumE.series[0]. data = jData.yList;
        //         //近期频繁攻击者
        //         // _fun.numChange('.fre-risk span', total);
        //     }
        //     w.weekNum.setOption(weekNumE);

        // });

    },
    attackerBar: function(){
        var w =this;
        var weekTypeE = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                axisLine: {
                    lineStyle: { color: '#fff' }
                }
            },
            grid: {
                top: '5%',
                left: '0',
                right: '16%',
                bottom: '30%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    //data : [' SQL注入攻击', '跨站脚本攻击', '文件包含漏洞', '敏感目录访问', '漏洞防护', '特殊字符URL访问', '远程代码执行漏洞', '文件限制', '敏感文件探测'],
                    data : [],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: '#fff'
                        },
                        rotate: -45
                    },
                    axisLine: {
                        lineStyle: {
                            width: 2
                        }
                    }


                }
            ],
            yAxis : [
                {
                    type : 'value',
                    nameTextStyle: {
                        color: '#fff'
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: ['rgba(28,36,47,.6)']
                        }

                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        interval: 0,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                }
            ],
            series : [
                {
                    name:'攻击者类型',
                    type:'bar',
                    barWidth: '40%',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    //data:[53524,26687,16546,2670,1665,1625,1521,1009,962],
                    data:[],
                    itemStyle: {normal: {
                        color:'#2a61bb'}
                    }
                }
            ]
        };
        var param = {domain: 'all',interval: '6d',isSingleDay: false}
        $.ajax({
            type: 'post',
            url: '/api/attack?url=attackTypeSituationSevenDays',
            data: param,
            dataType: 'json',
            success: function(json){
                var dataX=[], dataY= [];
                if(json.code==0){
                    var  jData = json.data.ranklist,total= 0;
                    $.each(jData, function(k,v){
                        if(v!=0){
                            dataX.push(v.type);
                            dataY.push(v.num);
                        }
                    });
                    weekTypeE.xAxis[0].data=dataX;
                    weekTypeE.series[0].data=dataY;
                }
                w.weekType.setOption(weekTypeE);

            }
        })
        // $.post('/api/attack?url=attackTypeSituationSevenDays',param).success(function(json){
        //     var dataX=[], dataY= [];
        //     if(json.code==0){
        //         var  jData = json.data.ranklist,total= 0;
        //         $.each(jData, function(k,v){
        //             if(v!=0){
        //                 dataX.push(v.type);
        //                 dataY.push(v.num);
        //             }
        //         });
        //         weekTypeE.xAxis[0].data=dataX;
        //         weekTypeE.series[0].data=dataY;
        //     }
        //     w.weekType.setOption(weekTypeE);

        // });
    },
    lineOption: function(dataX,dataY){
        var w  = this;
        var option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'line'
                }
            },
            grid: {
                left: '0',
                right: '1%',
                bottom: '2%',
                top:30,
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data:dataX,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        interval: 'auto',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 2,
                            color: '#162962'
                        }
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name: '/次',
                    scale: true,
                    nameTextStyle: {
                        color: '#fff'
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                }
            ],
            series : [
                {
                    name:'次数',
                    type:'line',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#fea100'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: '#fea100'
                        }
                    },
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    data:dataY
                }
            ]
        };
        return option;
    }
};

$(function(){
    Attacker.init();

});
