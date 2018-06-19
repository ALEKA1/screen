/**
 *@name
 *@author Sean.xiang
 *@date 2016/10/31
 *@example
 */
var Setting = {
    color: [['#ca3678', '#7da2f8'], ['#f5ab0b', '#72ccf5']]

};
var refresh= {
    totalInfo: 1000*60,
    chart: 1000*60*5
};
var Attack = {
    init: function () {
        var w = this;
        w.json = Data.attack;
        // w.title();
        w.totalInfo();
        w.initChart();
        $(window).resize(function () {
            w.initChart();
        });
        clearInterval(totalInfoTime);
        var totalInfoTime = setInterval(function(){
            w.totalInfo();
        },refresh.totalInfo);
        clearInterval(chartTime);
        var chartTime = setInterval(function(){
            w.initChart();
        },refresh.chart);
    },
    initChart: function () {
        var w = this;


        $('.area').height($(window).height() * .7);
        $('#attackArea').height($(window).height() * .7);
        $('#attackType,#attackSource,#attackState').height($(window).height() * .2);

        w.attackType = echarts.init(document.getElementById('attackType'));
        w.attackSource = echarts.init(document.getElementById('attackSource'));
        w.attackState = echarts.init(document.getElementById('attackState'));
        w.attackArea = echarts.init(document.getElementById('attackArea'));
        w.drawChart();


    },
    title: function(){
        var w = this;
        _fun.editText(__ROOT__ + '/Home/MirrorAttack/title','p3title');

    },
    totalInfo: function () {
        var w = this;
        // $.post('./data/mirror/attack.json').success(function (json) {
            // console.info('count', json);
            if (w.json.code) {
                var total = w.json.data.attack, count = w.json.data.innerCounter;
                _fun.numChange.call(w, '.j-total', total);
                _fun.numChange.call(w, '.j-count', count);

            }
        // });
    },

    drawChart: function () {
        var w = this;
        w.attackBar();
        //w.sourceBar();
        w.stateLine();
        w.areaMap();

    },
    attackBar: function () {
        var w = this;
        // $.post('./data/mirror/attack.json').success(function (json) {
            var typeX = [], typeY = [], areaX = [], areaY = [];
            var dataobj = [];
            if (w.json.code) {
                var jData = w.json.data.attackType;
                $.each(jData, function (k, v) {
                    typeX.push(k);
                    typeY.push(v);
                });
               /* $.each(w.json.data.worldAreaRank.attack, function (k, v) {
                    if (k != "中国") {
                        dataobj.push({
                            name: k,
                            value: v
                        })
                    }

                });*/
                $.each(w.json.data.chinaAreaRank.attack, function (k, v) {
                    dataobj.push({
                        name: k,
                        value: v
                    })
                });
            }

            function keysrt(key, desc) {
                return function (a, b) {
                    return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
                }
            }

            dataobj = dataobj.sort(keysrt('value', true));
            // console.log(dataobj);
            for (var i = 0; i < dataobj.length; i++) {
                areaX.push(dataobj[i].name);
                areaY.push(dataobj[i].value);
            }


            w.attackType.setOption(w.barOption1(typeX, typeY, Setting.color[0], -15));
            w.attackSource.setOption(w.barOption(areaX, areaY, Setting.color[1], 0));
        // });
    },
    sourceBar: function () {
        var w = this;
        // $.ajaxSetup({
        //     async: false
        // });
        // $.post('./data/mirror/attack.json').success(function (json) {
            var dataX = [], dataY = [];
            if (w.json.code) {
                var jData = w.json.data;
                $.each(jData, function (k, v) {
                    dataX.push(k);
                    dataY.push(v);
                });
            }


        // });
    },
    stateLine: function () {
        var w = this;
        // $.ajaxSetup({
        //     async: false
        // });
        // $.post('./data/mirror/attack.json').success(function (json) {
            var dataX = [], dataY = [];
            var objarr = [];
            if (w.json.code) {
                var jData = w.json.data.attackLine;
                $.each(jData, function (k, v) {
                    objarr.push({
                        name: k,
                        value: v
                    });
                });
            }
          /*  objarr = objarr.sort(function (a, b) {
                return a.name > b.name ? 1 : -1;
            });*/
            for (var i = 0; i < objarr.length; i++) {
                // console.info(_fun.getFormatDate(objarr[i].name));
                // dataX.push(_fun.getFormatDate(objarr[i].name).substring(11,19));
                dataX.push(objarr[i].name.substring(11,19));
                dataY.push(objarr[i].value);
            }


            w.attackState.setOption(w.lineOption(dataX, dataY));
        // });
    },
    areaMap: function () {
        var w = this;
        // $.ajaxSetup({
        //     async: false
        // });
        // $.post('./data/mirror/attack.json').success(function (json) {
            if (w.json.code) {
                var data = [];
                $.each(w.json.data.area, function (k, v) {
                    /*if(v.area=='嘉兴市桐乡市'){
                        v.area='桐乡市';
                    }
                    v.area = v.area.replace('市', '');*/

                    data.push({
                        name: k,
                        value: cityCoordMap[k].concat(Math.log(v))
                    })

                });
                w.attackArea.setOption(w.mapOption(data));
            }
        // })

    },
    barOption: function (dataX, dataY, color, param) {
        var w = this;

        var option = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '0%',
                right: '10%',
                bottom: '0',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    //data:['一区','二区','三区','四区','五区','会展中心','篁园','生产资料' ],
                    data: dataX,
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: '#fff'
                        },
                        rotate: param
                    },
                    axisLine: {
                        lineStyle: {
                            width: 1,
                            color: '#162962'
                        }
                    }


                }
            ],
            yAxis: [
                {
                    type: 'value',
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
                        show: false
                    }
                }
            ],
            series: [
                {
                    type: 'bar',
                    barMaxWidth: 60,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: color[0]
                            }, {
                                offset: .25,
                                color: color[1]
                            }])
                        }
                    },
                    //data:[10, 52, 200, 334, 390, 330, 220,150]
                    data: dataY
                }
            ]
        };

        return option;
    },
    barOption1: function (dataX, dataY, color, param) {
        var w = this;
        var option = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '0%',
                right: '10%',
                bottom: '20%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    //data:['一区','二区','三区','四区','五区','会展中心','篁园','生产资料' ],
                    data: dataX,
                    axisLabel: {
                        interval: 0,
                        textStyle: {
                            color: '#fff',
                            fontSize: 10
                        },
                        rotate: param
                        // formatter: function (val) {
                        //     return val.split("").join("\n");
                        // }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 1,
                            color: '#162962'

                        }
                    }


                }
            ],
            yAxis: [
                {
                    type: 'value',
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
                        show: false
                    }
                }
            ],
            series: [
                {
                    type: 'bar',
                    name: '攻击类型',
                    barMaxWidth: 60,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: color[0]
                            }, {
                                offset: .25,
                                color: color[1]
                            }])
                        }
                    },
                    //data:[10, 52, 200, 334, 390, 330, 220,150]
                    data: dataY
                }
            ]
        };

        return option;
    },
    lineOption: function (dataX, dataY) {
        var w = this;
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            grid: {
                left: '0',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: dataX,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        // interval: 0,
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
            yAxis: [
                {
                    type: 'value',
                    //name: '/次',
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
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '人数',
                    type: 'line',
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
                            show: false,
                            position: 'top'
                        }
                    },
                    data: dataY
                }
            ]
        };

        return option;
    },
    mapOption: function (data) {
        var option = {
            tooltip: {
                show: false,
                trigger: 'item',
                formatter: '{b}'
            },
            geo: {
                map: '浙江',
                itemStyle: {
                    normal: {
                        show: true,
                        areaColor: 'rgba(16,25,52, 1)',
                        borderColor: 'rgba(126,198,217, 1)',
                        borderWidth: 2,
                        shadowBlur: 20,
                        shadowColor: 'rgba(73,201,206, .75)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    },
                    emphasis: {
                        show: true,
                        areaColor: 'rgba(16,25,52, 1)',
                        borderColor: 'rgba(126,198,217, 1)',
                        borderWidth: 2,
                        shadowBlur: 20,
                        shadowColor: 'rgba(73,201,206, .75)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }
            },
            series: [
                {
                    name: '攻击',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    symbolSize: function (val) {
                        return val[2] * 1.5;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }

                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#e3e86a',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1,
                    //data: [{name: '杭州',value: [120.19,30.26,100]}]
                    data: data
                }
            ]
        };
        return option;
    }


};
$(function () {
    Attack.init();


});