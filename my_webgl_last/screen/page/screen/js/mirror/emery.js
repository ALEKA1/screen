var Emery = {
    init: function () {
        var w = this;
        w.initHtml();
        w.initChart()
    },
    initHtml: function () {
        var w = this;
        w.totalInfo();
        w.total();
        w.event();
        w.grid()
    },
    // 第一行：已知系统漏洞+最新0day漏洞+已修复完漏洞
    totalInfo: function () {
        var w = this;
        $.ajax({
            type: 'post',
            url: __ROOT__ + '/Home/MirrorEmergency/bug',
            dataType: 'json',
            success: function (json) {
                if (json.code) {
                    var sysHole = _fun.num(json.data.sysHole);
                    var zeroHole = _fun.num(json.data.zeroHole);
                    var fixed = _fun.num(json.data.fixed);
                    $('.j-bug-num').text(sysHole);
                    $('.j-bug-day').text(zeroHole);
                    $('.j-bug-rep').text(fixed)
                }
            }
        })
        // $.post(__ROOT__+'/Home/MirrorEmergency/bug').success(function(json){
        // if(json.code){         var sysHole = _fun.num(json.data.sysHole);         var
        // zeroHole = _fun.num(json.data.zeroHole);         var fixed =
        // _fun.num(json.data.fixed);         $('.j-bug-num').text(sysHole);
        // $('.j-bug-day').text(zeroHole);         $('.j-bug-rep').text(fixed)     } })
    },

    // 双环：日新增漏洞数+影响系统数
    total: function () {
        var w = this;
        $.ajax({
            type: 'post',
            url: __ROOT__ + '/Home/MirrorEmergency/count',
            dataType: 'json',
            success: function (json) {
                // console.info(json);
                if (json.code) {
                    var dayHole = _fun.num(json.data.dayHole);
                    var sysAffect = _fun.num(json.data.sysAffect);
                    $('.j-hole-day').text(dayHole);
                    $('.j-affect').text(sysAffect)
                }
            }
        })
        // $.post(__ROOT__+'/Home/MirrorEmergency/count').success(function(json) {
        // // console.info(json);     if (json.code) {         var dayHole =
        // _fun.num(json.data.dayHole);         var sysAffect =
        // _fun.num(json.data.sysAffect);         $('.j-hole-day').text(dayHole);
        //  $('.j-affect').text(sysAffect)     } })
    },
    // 页面抓取：互联网最新威胁事件
    event: function () {
        var w = this;
        $.ajax({
            type: 'post',
            url: __ROOT__ + '/Home/MirrorEmergency/event',
            dataType: 'json',
            success: function (json) {

                if (json.code) {
                    var data = json.data;
                    $('.threat .swiper-wrapper').html('');
                    $.each(data, function (k, v) {
                        var el = ' <div class="swiper-slide"><div class="threat-inner"><div class="t-img"><img src' +
                                '="' + __PUBLIC__ + v.img + '" alt=""><div class="t-tag">' + v.type + '</div></div><div class="t-text"><span>' + v.date + '&nbsp;</span><span>' + v.province + v.city + v.net + '</span><p>' + v.htp + '</p></div></div> </div>';

                        $('.threat .swiper-wrapper').append(el)
                    });
                    var k = new Swiper('.swiper-container', {
                        loop: true,
                        autoplay: 1550,
                        speed: 1600,
                        autoplayDisableOnInteraction: false
                    })
                }
            }
        })
        // $.post(__ROOT__+'/Home/MirrorEmergency/event').success(function(json) {
        // if (json.code) {         var data = json.data;         $('.threat
        // .swiper-wrapper').html('');         $.each(data, function (k, v) {
        //  var el = ' <div class="swiper-slide">' +                 '<div
        // class="threat-inner">' +                 '<div class="t-img"><img src="' +
        // __PUBLIC__ + v.img + '" alt="">' +                 '<div class="t-tag">' +
        // v.type + '</div></div>' +                 '<div class="t-text"><span>' +
        // v.date + '&nbsp;</span><span>' + v.province + v.city + v.net +'</span><p>' +
        // v.htp + '</p></div>' +                 '</div> ' +                 '</div>';
        //            $('.threat .swiper-wrapper').append(el)         });         var k
        // = new Swiper('.swiper-container', {             loop: true,
        // autoplay : 1550,             speed: 1600,
        // autoplayDisableOnInteraction : false         })     } })
    },
    // 滚动列表：最新漏洞曝光
    grid: function () {
        var w = this;
        $
            .post(__ROOT__ + '/Home/MirrorEmergency/grid')
            .success(function (json) {
                if (json.code) {
                    var data = json.data;
                    $('#hole-grid tbody').html('');
                    $.each(data, function (k, v) {
                        var el = ' <tr><td>' + v.date + '</td><td>' + v.holeName + '</td><td>' + v.source + '</td></tr>';
                        $('#hole-grid tbody').append(el);
                    });
                    _fun.scroll('hole-grid')
                }
            })
    },
    initChart: function () {
        var w = this;
        $('.box1').height($(window).height() * .28);
        $('#tend-line,#top5,#total-bar,.box').height($(window).height() * .25);
        w.totalBar = echarts.init(document.getElementById('total-bar'));
        w.tendLine = echarts.init(document.getElementById('tend-line'));
        w.topBar = echarts.init(document.getElementById('top5'));
        w.danger();
        w.hole();
        w.top();

        $(window).resize(function () {
            w
                .totalBar
                .resize();
            w
                .tendLine
                .resize();
            w
                .topBar
                .resize()
        })
    },

    // 柱状图：最新互联网威胁统计
    danger: function () {
        var w = this;
        $.ajax({
            type: 'post',
            url: __ROOT__ + '/Home/MirrorEmergency/danger',
            dataType: 'json',
            success: function (json) {
                if (json.code) {
                    var legend = json.legend;
                    var data = json.data;
                    var ahDataX = [],
                        data1 = [],
                        data2 = [];
                    $.each(data, function (k, v) {
                        ahDataX.push(k);
                        data1.push(v[0]);
                        data2.push(v[1])
                    });
                    w
                        .totalBar
                        .setOption(w.dangerBar(legend, ahDataX, data1, data2))
                }
            }
        })
        // $
        //     .post(__ROOT__ + '/Home/MirrorEmergency/danger')
        //     .success(function (json) {
        //         if (json.code) {
        //             var legend = json.legend;
        //             var data = json.data;
        //             var ahDataX = [],
        //                 data1 = [],
        //                 data2 = [];
        //             $.each(data, function (k, v) {
        //                 ahDataX.push(k);
        //                 data1.push(v[0]);
        //                 data2.push(v[1])
        //             });
        //             w
        //                 .totalBar
        //                 .setOption(w.dangerBar(legend, ahDataX, data1, data2))
        //         }
        //     })
    },
    dangerBar: function (dataleg, dataX, ahDataX, wfDataX) {
        var w = this;
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            textStyle: {
                color: '#fff',
                fontFamily: 'SimSun',
                fontWeight: 'bold',
                fontSize: '12'
            },
            legend: {
                orient: 'horizontal',
                data: dataleg,
                itemGap: 80,
                left: 'center',
                top: '-5px',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'normal'
                }
            },
            grid: {
                show: true,
                borderWidth: '1',
                borderColor: '#15275d',
                left: '5px',
                right: '4px',
                top: '10%',
                bottom: '14%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    data: dataX
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#15275d',
                            type: 'solid'
                        }
                    }
                }
            ],
            series: [
                {
                    name: dataleg[0],
                    type: 'bar',
                    barWidth: '20px',
                    barGap: '60%',
                    data: ahDataX,
                    itemStyle: {
                        normal: {
                            color: '#ED6F46'
                        }
                    }
                }, {
                    name: dataleg[1],
                    type: 'bar',
                    barWidth: '20px',
                    barGap: '60%',
                    data: wfDataX,
                    itemStyle: {
                        normal: {
                            color: '#4AC9CF'
                        }
                    }
                }
            ]
        };
        return option;
    },
    // 面积图：近7日互联网漏洞曝光趋势
    hole: function () {
        var w = this;
        $.ajax({
            type:'post',
            url: __ROOT__ + '/Home/MirrorEmergency/hole',
            dataType: 'json',
            success: function (json) {
                if (json.code) {
                    var name = json.name;
                    var data = json.data;
                    var data1 = [],
                        data2 = [];
                    $.each(data, function (k, v) {
                        data1.push(v[0]);
                        data2.push(v[1])
                    });
                    // console.info(data2);
                    w
                        .tendLine
                        .setOption(w.holeLine(name, data1, data2))
                }
            }
        })
        // $
        //     .post(__ROOT__ + '/Home/MirrorEmergency/hole')
        //     .success(function (json) {
        //         if (json.code) {
        //             var name = json.name;
        //             var data = json.data;
        //             var data1 = [],
        //                 data2 = [];
        //             $.each(data, function (k, v) {
        //                 data1.push(v[0]);
        //                 data2.push(v[1])
        //             });
        //             // console.info(data2);
        //             w
        //                 .tendLine
        //                 .setOption(w.holeLine(name, data1, data2))
        //         }
        //     })
    },
    holeLine: function (Name, dataX, dataY) {
        var w = this;
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            textStyle: {
                color: '#fff',
                fontFamily: 'SimSun',
                fontWeight: 'normal',
                fontSize: '12'
            },
            grid: {
                left: '10px',
                right: '40px',
                top: '10%',
                bottom: '12%',
                containLabel: true
            },
            xAxis: [
                {
                    axisLine: {
                        show: true,
                        color: '#15275d'
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0
                    },
                    type: 'category',
                    boundaryGap: false,
                    data: dataX

                }
            ],
            yAxis: [
                {
                    axisLine: {
                        show: true,
                        color: '#15275d'
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    splitNumber: '5',
                    min: '0',
                    type: 'value'
                }
            ],
            series: [
                {
                    showSymbol: false,
                    hoverAnimation: false,
                    name: Name,
                    type: 'line',
                    symbolSize: '0',
                    label: {
                        normal: {
                            position: 'top'
                        }
                    },
                    lineStyle: {
                        normal: {
                            opacity: '0'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: '#4AC9CF'
                        },
                        smoothMonotone: 'x'
                    },
                    data: dataY
                }
            ]
        };
        return option;
    },
    // 柱状图：0day漏洞分布TOP5
    top: function () {
        var w = this;
        $.ajax({
            type: 'post',
            url: __ROOT__ + '/Home/MirrorEmergency/top',
            dataType: 'json',
            success: function (json) {
                if (json.code) {
                    var data = json.data;
                    var name = json.name;
                    var data1 = [],
                        data2 = [];
                    $.each(data, function (k, v) {
                        data1.push(v[0]);
                        data2.push(v[1])
                    });
                    w
                        .topBar
                        .setOption(w.spreadBar(name, data1, data2))
                }
            }
        })
        // $
        //     .post(__ROOT__ + '/Home/MirrorEmergency/top')
        //     .success(function (json) {
        //         if (json.code) {
        //             var data = json.data;
        //             var name = json.name;
        //             var data1 = [],
        //                 data2 = [];
        //             $.each(data, function (k, v) {
        //                 data1.push(v[0]);
        //                 data2.push(v[1])
        //             });
        //             w
        //                 .topBar
        //                 .setOption(w.spreadBar(name, data1, data2))
        //         }
        //     })
    },
    spreadBar: function (name, dataX, dataY) {
        var w = this;
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            textStyle: {
                color: '#fff',
                fontFamily: 'SimSun',
                fontWeight: 'normal',
                fontSize: '12'
            },
            grid: {
                left: '-42px',
                right: '4px',
                top: '0%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                position: 'top',
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: dataX
            },
            series: [
                {
                    name: name,
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: [
                                '0', '-16px'
                            ],
                            formatter: '{b} {c}'
                        }
                    },
                    barWidth: '15px',
                    data: dataY,
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                // build a color map as your need.
                                var colorList = ['#2C75A6', '#6F73C2', '#51ADC2', '#AB4646', '#B36643'];
                                return colorList[params.dataIndex]
                            }
                        }
                    }
                }
            ]
        };
        return option;
    }

};

$(function () {
    Emery.init()
});