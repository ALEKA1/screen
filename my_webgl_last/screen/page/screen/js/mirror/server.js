/**
 * Created by minxfeng on 2016/11/2.
 */

var refreshInterval = {
    staticvar: 1000 * 60 * 5,
    performance: 1000 * 60,
    table: 1000 * 60 * 5
};

var Server = {

    init: function() {
        var w = this;
        w.json = Data.server;
        // w.title();
        w.getStaticVars();
        w.drawGrid();
        w.initChart();
        _fun.scroll('alert-grid');

        $(window).resize(function() {
            w.initChart();
        });

        var interval1 = setInterval(function() {
            w.drawRealTime();
        }, refreshInterval.staticvar);

        var interval2 = setInterval(function() {
            w.getStaticVars();
        }, refreshInterval.performance);

        var interval3 = setInterval(function() {
            w.drawGrid();
        }, refreshInterval.table);

    },
    title: function() {
        var w = this;
        _fun.editText(__ROOT__ + '/Home/MirrorServer/title', 'p5title');
    },

    initChart: function() {
        var w = this;
        $('#realmon,#alertgrid').height($(window).height() * .4);
        $('#standforpos,#standforpos1,#standforpos2,#standforpos3').height($(window).height() * .2);
        w.realmon = echarts.init(document.getElementById('realmon'));
        w.drawRealTime();
    },
    drawRealTime: function() {
        var w = this;

        var servers = [];
        var cpu = [];
        var ram = [];
        var disk = [];

        /* servers.push('172.16.7.109');
         servers.push('172.16.7.106');
         servers.push('172.16.7.112');
         servers.push('172.16.7.100');
         servers.push('172.16.7.102');
         servers.push('172.16.7.166');*/

        $.ajaxSetup({
            async: false
        });

        // $.post('./data/mirror/server.json').success(function (json) {

        var data = w.json.data.hostinfo;
        /*$.each(data, function (k, v) {
            cpu.push(v.cpu);
            ram.push(v.memery);
            disk.push(v.disk);
        });*/
        servers = data.server;
        cpu = data.cpu;
        ram = data.memery;
        disk = data.disk;
        // });

        var barwidth = 18;

        Option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['CPU使用率', '内存使用率', '剩余磁盘容量'],
                textStyle: {
                    color: 'rgb(222,222,223)'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: servers,
                axisLabel: {
                    textStyle: {
                        color: 'rgb(222,222,223)'
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value} %',
                    textStyle: {
                        color: 'rgb(222,222,223)'
                    }
                },
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: 'rgb(21,41,96)'
                    }
                }
            }],
            series: [{
                    name: 'CPU使用率',
                    type: 'bar',
                    data: cpu,
                    itemStyle: {
                        normal: {
                            color: 'rgb(238, 108, 77)',
                            label: {
                                show: false,
                                position: 'top',
                                formatter: '{c} %',
                                textStyle: {
                                    color: 'rgb(222,222,223)'

                                }
                            }
                        }
                    },
                    barWidth: barwidth

                },
                {
                    name: '内存使用率',
                    type: 'bar',
                    data: ram,

                    itemStyle: {
                        normal: {
                            color: 'rgb(94, 125, 183)',
                            label: {
                                show: false,
                                position: 'top',
                                formatter: '{c} %',
                                textStyle: {
                                    color: 'rgb(222,222,223)'

                                }
                            }
                        }
                    },
                    barWidth: barwidth
                },
                {
                    name: '剩余磁盘容量',
                    type: 'bar',
                    symbolSize: 8,
                    data: disk,
                    itemStyle: {
                        normal: {
                            color: 'rgb(22, 187, 183)',
                            label: {
                                show: false,
                                position: 'top',
                                formatter: '{c} %',
                                textStyle: {
                                    color: 'rgb(222,222,223)'

                                }
                            }
                        }
                    },
                    barWidth: barwidth
                }
            ]
        };
        w.realmon.clear();
        w.realmon.setOption(Option, true);
    },

    drawGrid: function() {
        var w = this;
        // $.post('./data/mirror/server.json').success(function (json) {
        var data = w.json.data.alertCenter;
        $('#access-grid tbody').html('');

        for (var i = 0; i < data.length; i++) {
            var time = data[i].time.substring(5, 15);
            var state = data[i].state;
            if (state == "OK")
                state = "是";
            if (state == "PROBLEM")
                state = "否";
            var el = ' <tr>' +
                '<td>' + time + '</td>' +
                '<td>' + data[i].host + '</td>' +
                '<td>' + data[i].host + '</td>' +
                '<td>' + data[i].info + '</td> ' +
                '<td>' + state + '</td>' +
                '</tr>';
            $('#alert-grid tbody').append(el);
        }


        // });
    },
    getStaticVars: function() {
        var w = this;

        // $.post('./data/mirror/server.json').success(function (json) {

        var hostnum = (w.json.data.hostNum);
        // _fun.numChange.call(w,'#plugDevNum', hostnum);
        // $('#plugDevNum').text(hostnum);

        var spaceused = ((w.json.data.space_used / 1024 / 1024 / 1024)).toFixed(2);
        // _fun.numChange.call(w,'#spaceUsed', spaceused);
        $('#spaceUsed').text(spaceused);

        var logConut = ((w.json.data.logs / 10000).toFixed(2));
        // _fun.numChange.call(w,'#logCount', logConut);
        $('#logCount').text(logConut);

        var disconnected = w.json.data.disconnectNum;
        document.getElementById('deviceLostCount').innerHTML = _fun.num(Math.round(Math.sqrt(Math.sqrt(disconnected))));

        // });
    }
};

$(function() {
    Server.init();
});