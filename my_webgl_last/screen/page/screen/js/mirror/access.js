/**
 *@name
 *@author Sean.xiang
 *@date 2016/10/31
 *@example
 */
var Setting ={
    color:[
      ['#14a0df','#0ac0e1','#09b6d5','#08d3d6','#7cffff','#b6fbfb','#c9fbfb','#72ccf5','#34aae9','#c4e6f9'],
      ['#72ccf5','#1b2656','#00a2fd','#e23483','#c4e6f9','#6a5ac5','#153db7','#001b42']
    ],
    httpcode:{
        '2xx': '正常访问',
        '3xx': '重定向',
        '4xx': '客户端错误',
        '5xx': '服务器错误'

    }
};
var refresh= {
    totalInfo: 1000*60,
    access: 1000*60*2,
    chart: 1000*60*5

};
var param = {
    timeType: "hour",
    timeNum: "24",
    domain: "ALL"
};
var Access = {
    init: function(){
        var w = this;
        w.json = Data.access;
        w.totalInfo();
        w.accessGrid();
        w.initChart();
        $(window).resize(function(){
            w.accessGrid();
            w.initChart();
        });
        clearInterval(totalInfoTime);
        var totalInfoTime = setInterval(function(){
            w.totalInfo();
        },refresh.totalInfo);
        clearInterval(accessTime);
        var accessTime = setInterval(function(){
            w.accessGrid();
        },refresh.access);
        clearInterval(chartTime);
        var chartTime = setInterval(function(){
            w.initChart();
        },refresh.chart);
        _fun.scroll('access-grid');

    },
    initChart: function(){
        var w = this;
        $('#source,#device,#terminal,#code').height($(window).height() *.3);
        // w.source = echarts.init(document.getElementById('source'));
        // w.device = echarts.init(document.getElementById('device'));
        w.terminal = echarts.init(document.getElementById('terminal'));
        w.code = echarts.init(document.getElementById('code'));
        w.drawPie();
    },
    totalInfo: function(){
        var w = this;
            if(w.json.code){
                var count =w.json.data.count||0;
               _fun.numChange.call(w,'.j-count',count);
            }
    },
    accessGrid: function(){
        var w= this;
        $('.real-access').height($(window).height() *.35);
        $('.access-body').height($(window).height() *.3);

        var param = {domain: 'all',interval: '0d',isSingleDay: true}
        $.ajax({
            url: '/api/attack?url=realtime/visit',
            type: 'post',
            data: param,
            dataType: 'json',
            async: false,
            success: function(json){
                if(json.code==0){
                    var data = json.data;
                    $('#access-grid tbody').html('');
                    $.each(data, function(k,v){
                        var time = v.collectorReceiptTime.substring(11,19);
                        var el = ' <tr>' +
                            '<td>'+ time+'</td>' +
                            '<td>'+ v.srcGeoRegion+'</td>' +
                            '<td>'+ v.srcAddress+'</td>' +
                            '<td>'+ (v.requestUrl?v.requestUrl.replace("<","&lt;").replace(">","&gt;").replace("'", ""):'-')+'</td> ' +
                            '<td>'+ v.responseCode+'</td> ' +
                            '</tr>';
                        $('#access-grid tbody').append(el);

                    });

                }
            }
        })
    },
    drawPie: function(){
        var w = this;
        // w.sourcePie();
        // w.devicePie();
        w.terminalPie();
        w.codePie();

    },
    sourcePie: function(){
        var w = this;

        // $.getJSON('./data/mirror/access.json',function(json){
            var data=[];
            var legend= [];
            if(w.json.code){
                var i= 0;
                $.each(w.json.data.chinaAreaRank.visit, function(k,v){
                    if(k!='中国'){
                        legend.push(k);
                        data.push({
                            'name': k,
                            'value': v
                        });
                    }

                });
                $.each(w.json.data.worldAreaRank.visit, function(k,v){
                    if(k!='中国'){
                        legend.push(k);
                        data.push({
                            'name': k,
                            'value': v
                        });
                    }

                });

            }

            w.source.setOption(w.pieOption(legend,data,Setting.color[0]));
        // });
    },
    devicePie: function(){
        var w = this;

            var data=[];
            var legend= [];
            if(w.json.code){
                var i= 0;
                var  jData = w.json.data.visitMethod.browser;
                $.each(jData, function(k,v){
                    if(k!='other'){
                        legend.push(k);
                        data.push({
                            'name': k,
                            'value': v
                        });
                    }
                    i++;
                    if(i>7){
                        return ;
                    }

                });
            }

            w.device.setOption(w.pieOption(legend,data,Setting.color[1]));
    },
    terminalPie: function(){
        var w = this;
        $.ajax({
            type: 'post',
            url: '/index/chart',
            data: param,
            dataType: 'json',
            success: function(json){
                var data=[];
                var legend= [];
                if(json.code){
                    $.each(json.types, function(k,v){
                        legend.push(k);
                        data.push({
                            'name': k,
                            'value': v
                        });
                    });
                }
                w.terminal.setOption(w.pieOption('访问终端分析',legend,data,Setting.color[0]));
            }
        })
        // $.post('/index/chart',param).success(function(json){
        //     var data=[];
        //     var legend= [];
        //     if(json.code){
        //         $.each(json.types, function(k,v){
        //             legend.push(k);
        //             data.push({
        //                 'name': k,
        //                 'value': v
        //             });
        //         });
        //     }
        //     w.terminal.setOption(w.pieOption('访问终端分析',legend,data,Setting.color[0]));
        // });
    },
    codePie: function(){
        var w = this;
        $.ajax({
            type: 'post',
            url: '/index/request',
            data: param,
            dataType: 'json',
            success: function(json){
                var data=[];
                var legend= [];
                if(json.code){
                    $.each(json.types, function(k,v){
                        data.push({
                            'name': Setting.httpcode[k],
                            'value': v
                        });
                    });
                    data.sort(function(a, b) {
                        return b['value'] - a['value'];
                    });
                    $.each(data, function(k,v){
                        legend.push(v['name']);
                    });
                }
                w.code.setOption(w.pieOption('响应码分析',legend,data,Setting.color[1]));
            }
        })
        // $.post('/index/request',param).success(function(json){
        //     var data=[];
        //     var legend= [];
        //     if(json.code){
        //         $.each(json.types, function(k,v){
        //             data.push({
        //                 'name': Setting.httpcode[k],
        //                 'value': v
        //             });
        //         });
        //         data.sort(function(a, b) {
        //             return b['value'] - a['value'];
        //         });
        //         $.each(data, function(k,v){
        //             legend.push(v['name']);
        //         });
        //     }
        //     w.code.setOption(w.pieOption('响应码分析',legend,data,Setting.color[1]));
        // });

    },
    pieOption: function(name,legend,data,color){
        var w  = this;

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: legend,
                textStyle: {
                    color: '#fff'
                }
            },
            series: [
                {
                    name: name,
                    type:'pie',
                    radius: ['40%', '60%'],
                    center: ['50%','60%'],

                    label: {
                        normal: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                // build a color map as your need.
                               /* var colorList = [
                                    '#72ccf5','#C6E579','#00a2fd','#e23483','#c3e5f8',
                                    '#6a5ac5','#153db7','#26C0C0','#F3A43B','#D7504B',
                                    '#C6E579','#F4E001','#F0805A'
                                ];*/
                                var colorList = color;
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    data: data
                }

            ]
        };
        return option;
    },
    deviceOption: function(legend,data1,data2,color){
        var option = {
            color: color,
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: legend,
                textStyle: {
                    color: '#fff'
                }
            },
            series: [
                {
                    name:'终端',
                    type:'pie',
                    radius: [0, '30%'],
                    center: ['50%','60%'],
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: data1
                },
                {
                    name:'设备名',
                    type:'pie',
                    radius: ['50%', '65%'],
                    center: ['50%','60%'],
                    label: {
                        normal: {
                            show: false

                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    /*itemStyle: {
                        normal: {
                            color: function(params) {
                                // build a color map as your need.
                                *//* var colorList = [
                                 '#72ccf5','#C6E579','#00a2fd','#e23483','#c3e5f8',
                                 '#6a5ac5','#153db7','#26C0C0','#F3A43B','#D7504B',
                                 '#C6E579','#F4E001','#F0805A'
                                 ];*//*
                                var colorList = color;
                                return colorList[params.dataIndex]
                            }
                        }
                    },*/
                    data:data2
                }


            ]
        };
        return option;
    }




};
$(function(){
    Access.init();
});
