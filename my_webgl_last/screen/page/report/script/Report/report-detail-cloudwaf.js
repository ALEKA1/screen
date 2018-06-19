/**
 * Created by sean on 17/2/16.
 */
window.cloudwaf;
(function() {
    var __default_colors__ = ['#43aea8', '#60b1cc', '#d0a549', '#bac3d2', '#e1e4e9'];
    var tableBgColor = {
        "0": "bg-red",
        "1": "bg-orange",
        "2": "bg-yellow"
    };
    var attackWarnDetail = [];
    var __function__ = {
        numFormat: function(num) {
            if (!num && num != 0) {
                return '--'
            } else {
                return num.toString().replace(/(\d+?)(?=(?:\d{3})+$)/g, '$1,');

            }

        },
        pecentItem: function(pecent) {
            return "<div class='progress' style='margin-bottom: 0;'>" +
                "<div class='progress-bar' style='width: " + pecent + "%;'><span>" + pecent + "%</span></div></div>";
        },
        mapset: function(json, keySet) {
            var arr = [];
            $.each(json, function(k, v) {
                if (keySet) {
                    arr.push(k);
                } else {
                    arr.push(v);
                }

            });
            return arr;
        },
        setMapMaxData: function(option) {
            //var series=option.series;
            var max = 0;
            $.each(option.series, function(i, series) {
                var data = series.data;
                $.each(data, function(i, d) {
                    if (d.value > max) {
                        max = d.value;
                    }
                });
            });
            option.dataRange.max = max;

        },
        commonPie: function(title) {
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color: ['#00b7e5', '#e69136', '#db56d1', '#f2bd00', '#009e55', '#5acce8'],
                legend: {
                    orient: 'vertical',
                    left: '5%',
                    data: []
                },
                series: [{
                    name: title,
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '50%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        }
                    },
                    data: []
                }]
            };
            return option;

        },
        commonVBar: function(title) {
            var option = {
                grid: {
                    left: '2%',
                    right: '2%',
                    bottom: '2%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis'
                },
                color: ["#3AC2C3"],
                xAxis: [{
                    type: 'value'
                }],
                yAxis: [{
                    type: 'category',
                    //axisLabel:{
                    //    show:false
                    //},
                    data: []
                }],
                series: [{
                    name: title,
                    type: 'bar',
                    barMaxWidth: 60,
                    itemStyle: {
                        normal: {
                            color: '#43aea8'
                        }
                    },
                    data: []
                }]
            };
            return option;
        },
        commonMapOption: function() {
            var option = {
                dataRange: {
                    show: false,
                    min: 0,
                    max: 100,
                    text: ['高', '低'], // 文本，默认为数值文本
                    calculable: false,
                    x: 60,
                    y: 360,
                    color: __default_colors__
                },
                series: [{
                    name: '全国地图',
                    type: 'map',
                    mapType: 'china',
                    selectedMode: 'single',
                    showLegendSymbol: false,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    /* itemStyle: {

                     normal: {
                     label: {
                     show: true,
                     formatter: function (param, v) {
                     if (v < 0) {
                     v = '-';
                     }
                     return param + "\n" + v;
                     }
                     }
                     },
                     emphasis: {                 // 也是选中样式
                     borderWidth: 2,
                     borderColor: '#fff',
                     color: '#32cd32',
                     label: {
                     show: true,
                     textStyle: {
                     color: '#fff'
                     }
                     }
                     }
                     },*/
                    data: []
                }]
            };
            return option;
        },

        worldAreaRank: function(data, opt, pie, tableName) {
            var w = this;
            var arr = [];
            var total = 0;
            $.each(data || {}, function(c, v) {
                arr.push({ name: c, count: v });
                total += v;
            });
            arr.sort(function(a, b) { //倒叙排列
                return b.count - a.count;
            });
            var pieMap = {};
            $.each(arr, function(i, obj) { //top5
                if (i < 5) {
                    pieMap[obj.name] = obj.count;
                } else {
                    var tmp = pieMap['其他'] || 0;
                    pieMap['其他'] = tmp + obj.count;
                }
            });
            opt.series[0].data = [];
            $.each(pieMap, function(c, v) {
                opt.legend.data.push(c);
                opt.series[0].data.push({ name: c, value: v });
            });
            pie.setOption(opt);
            __function__.noData(pie, opt);

            //表单数据
            var tbody = $("tbody", $("#" + tableName));
            tbody.html("");
            $.each(arr, function(i, obj) {
                var color = tableBgColor[i + ""] || "bg-blue";
                var pecent = (obj.count * 100 / total).toFixed(2);
                var tr = $("<tr><td>" + obj.name + "</td><td>" + obj.count + "</td><td>" + __function__.pecentItem(pecent, color) + "</td></tr>");

                tr.appendTo(tbody);
            });
            $("#" + tableName).dataTable().fnDestroy();
            $("#" + tableName).DataTable(_dataTable_setting._report());

        },
        chinaAreaRank: function(data, opt, map, tableName) {
            var w = this;
            var arr = [];
            var total = 0;
            $.each(data, function(c, v) {
                arr.push({ name: c, value: v });
                total += v;
            });
            arr.sort(function(a, b) { //倒叙排列
                return b.value - a.value;
            });

            opt.series[0].data = arr;
            __function__.setMapMaxData(opt);
            __function__.noData(map, opt);
            map.setOption(opt);

            //表单数据
            var tbody = $("tbody", $("#" + tableName));
            tbody.html("");
            $.each(arr, function(i, obj) {
                var color = tableBgColor[i + ""] || "bg-blue";
                var pecent = (obj.value * 100 / total).toFixed(2);
                var tr = $("<tr><td>" + obj.name + "</td><td>" + obj.value + "</td><td>" + __function__.pecentItem(pecent, color) + "</td></tr>");

                tr.appendTo(tbody);
            });
            $("#" + tableName).dataTable().fnDestroy();
            $("#" + tableName).DataTable(_dataTable_setting._report());


        },
        //攻击ip
        ipSrcDetail: function(detail, total) {
            var trWrapper = $("<tr class='details'></tr>");
            var tdWrapper = $("<td colspan='4'></td>");
            var tableWrapper = $("<table class='dataTable'></table>");
            var theadWrapper = $("<thead></thead>");
            theadWrapper.html("<tr><th>攻击IP</th><th>攻击量</th><th>攻击量占比</th></tr>");
            tableWrapper.append(theadWrapper);
            var tbodyWrapper = $("<tbody></tbody>");
            detail.sort(function(a, b) {
                return b.count - a.count;
            });
            var i = 0;
            $.each(detail, function(point, item) {
                i++;
                if (i < 11) {
                    var pecent = (item.count * 100 / total).toFixed(2);
                    var tmpName = item.name;
                    var tr = $("<tr><td>" + tmpName + "</td><td>" + item.count + "</td><td>" + __function__.pecentItem(pecent) + "</td></tr>");
                    tbodyWrapper.append(tr);
                }

            });
            tableWrapper.append(tbodyWrapper);
            tdWrapper.append(tableWrapper);
            trWrapper.append(tdWrapper);
            return trWrapper;

        },
        //访问URL
        visitSrcDetail_real: function(data, theads, total) {
            var trWrapper = $("<tr class='details'></tr>");
            var tdWrapper = $("<td colspan='4'></td>");
            var tableWrapper = $("<table class='dataTable'></table>");
            var theadWrapper = $("<thead><tr></tr></thead>");
            //attack_type_table访问占比
            $.each(theads, function(point, item) {
                $("tr", theadWrapper).append("<th>" + item + "</th>");
            });
            tableWrapper.append(theadWrapper);
            var tbodyWrapper = $("<tbody></tbody>");
            var point = 0;
            data.sort(function(a, b) {
                return b['count'] - a['count'];
            });

            //展开显示
            $.each(data, function(k, v) {
                var color = tableBgColor[point + ""] || "bg-blue";
                var pecent = (v['count'] * 100 / total).toFixed(2);
                var tmpName = v['name'];
                if (tmpName.length > 30) {
                    tmpName = "<abbr title='" + tmpName + "'>" + tmpName.replace("<", "&lt;").replace(">", "&gt;").replace("'", "").substr(0, 30) + "...</abbr>";
                }
                var tr = $("<tr><td>" + tmpName + "</td><td>" + v['count'] + "</td><td>" + __function__.pecentItem(pecent, color) + "</td></tr>");
                //var ipSrcDetail=__function__.ipSrcDetail(v,v['count']);
                tbodyWrapper.append(tr);
                //ipSrcDetail.hide().appendTo(tbodyWrapper);
                point++;
            });
            tableWrapper.append(tbodyWrapper);
            tdWrapper.append(tableWrapper);
            trWrapper.append(tdWrapper);
            return trWrapper;
        },
        //攻击URL
        visitSrcDetail: function(data, theads, total) {
            var trWrapper = $("<tr class='details'></tr>");
            var tdWrapper = $("<td colspan='4'></td>");
            var tableWrapper = $("<table class='dataTable'></table>");
            var theadWrapper = $("<thead><tr><th></th></tr></thead>");
            //attack_type_table访问占比
            $.each(theads, function(point, item) {
                $("tr", theadWrapper).append("<th>" + item + "</th>");
            });
            tableWrapper.append(theadWrapper);
            var tbodyWrapper = $("<tbody></tbody>");
            var point = 0;
            data.sort(function(a, b) {
                return b['count'] - a['count'];
            });
            //展开显示
            $.each(data, function(k, v) {
                var color = tableBgColor[point + ""] || "bg-blue";
                var pecent = (v['count'] * 100 / total).toFixed(2);
                var tmpName = v['name'];
                if (tmpName.length > 30) {
                    tmpName = "<abbr title='" + tmpName + "'>" + tmpName.replace("<", "&lt;").replace(">", "&gt;").replace("'", "").substr(0, 30) + "...</abbr>";
                }
                var tr = $("<tr><td><span class='row-details row-details-close'></span></td><td>" + tmpName + "</td><td>" + v['count'] + "</td><td>" + __function__.pecentItem(pecent, color) + "</td></tr>");
                var ipSrcDetail = __function__.ipSrcDetail(v['srcIp'], v['count']);
                tbodyWrapper.append(tr);
                ipSrcDetail.hide().appendTo(tbodyWrapper);
                point++;
            });
            tableWrapper.append(tbodyWrapper);
            tdWrapper.append(tableWrapper);
            trWrapper.append(tdWrapper);
            return trWrapper;
        },
        //策略id
        attackDetailTable: function(data, theads, total) {
            var trWrapper = $("<tr class='details'></tr>");
            var tdWrapper = $("<td colspan='4'></td>");
            var tableWrapper = $("<table class='dataTable'></table>");
            var theadWrapper = $("<thead><tr><th></th></tr></thead>");
            $.each(theads, function(point, item) {
                $("tr", theadWrapper).append("<th>" + item + "</th>");
            });
            tableWrapper.append(theadWrapper);
            var tbodyWrapper = $("<tbody></tbody>");
            var point = 0;
            data.sort(function(a, b) {
                return b['count'] - a['count'];
            });
            //展开显示
            $.each(data, function(k, v) {
                var color = tableBgColor[point + ""] || "bg-blue";
                var pecent = (v['count'] * 100 / total).toFixed(2);
                var tr = $("<tr><td><span class='row-details row-details-close'></span></td><td>" + v['name'] + "</td><td>" + v['count'] + "</td><td>" + __function__.pecentItem(pecent, color) + "</td></tr>");
                var visitSrcDetail = __function__.visitSrcDetail(v['targetUrl'], ["攻击URL", "攻击量", "占比"], v['count']);
                tbodyWrapper.append(tr);
                visitSrcDetail.hide().appendTo(tbodyWrapper);
                point++;
            });
            tableWrapper.append(tbodyWrapper);
            tdWrapper.append(tableWrapper);
            trWrapper.append(tdWrapper);
            return trWrapper;


        },
        noData: function(chart, option) {
            var series = option.series;
            for (var i = 0; i < series.length; i++) {
                if (series[i].data && series[i].data.length > 0) {
                    chart.hideLoading();
                } else {
                    chart.showLoading('default', {
                        text: '\n暂无数据',
                        color: 'transparent',
                        maskColor: 'rgba(255, 255, 255, 1)',
                        fontSize: 14,
                        zlevel: 0
                    })
                }

            }
        }
    };
    cloudwaf = {
        init: function(domain, currentDateKey, report, callback) {
            var w = this;

            w.domain = domain;
            w.currentDateKey = currentDateKey;
            w.report = report;
            cloudwaf.loadData.call(w, w.domain, w.currentDateKey, w.report, function() {
                cloudwaf.view.load.call(w);
                callback && callback();
            });
        },
        loadData: function(domain, dateKey, report, callback) {
            var w = this;
            //var cloudwafDataValue = $.parseJSON($("#cloudwaf_data").text());
            //w.cloudwafData = cloudwafDataValue.data;
            $.ajax({
                type: "post",
                dataType: "json",
                data: {
                    domain: domain,
                    dateKey: dateKey,
                    report: report,
                },
                contentType: "application/json",
                url: '/logsaas/report/search?domain=' + domain + '&dateKey=' + dateKey + '&report=' + report,
                cache: false,
                async: false,
                success: function(data) {
                    //if (data['code'] == 1) {
                    cloudwafDataValue = data;
                    w.cloudwafData = cloudwafDataValue.data;
                    callback && callback();
                    //}
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {}
            });

        },
        options: {
            flow_line: {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    show: true,
                    data: ['攻击次数', '访问次数', '出流量', "进流量"]
                },
                dataZoom: {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }],
                yAxis: [{
                        name: '次',
                        type: 'value',
                        splitLine: {
                            show: false
                        }
                    },
                    {
                        name: 'KB', //M
                        type: 'value'
                    }
                ],
                series: [{
                        name: '攻击次数',
                        type: 'line',
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: '#db56d1'
                            }
                        },
                        symbol: 'none',
                        data: []
                    },
                    {
                        name: '访问次数',
                        type: 'line',
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: '#009e55'
                            }
                        },
                        symbol: 'none',
                        data: []
                    },
                    {
                        name: '出流量',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: '#5acce8'
                            }
                        },
                        yAxisIndex: 1,
                        symbol: 'none',
                        data: []
                    },
                    {
                        name: '进流量',
                        type: 'line',
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: '#00b7e5'
                            }
                        },
                        symbol: 'none',
                        data: []
                    }
                ]
            },
            world_visit_pie: __function__.commonPie("访问源区域"),
            china_visit_map: __function__.commonMapOption(),
            visitip_topn_bar: __function__.commonVBar("访问源IP"),
            visit_src_pie: __function__.commonPie("访问来源"),
            device_spread_pie: {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: '5%',
                    data: []
                },
                color: ['#00b7e5', '#e69136', '#db56d1', '#f2bd00', '#009e55', '#5acce8'],
                series: [{
                        name: '设备形式',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],

                        // for funnel
                        x: '20%',
                        width: '40%',
                        funnelAlign: 'left',
                        //max: 1548,

                        itemStyle: {
                            normal: {
                                label: {
                                    position: 'inner'
                                },
                                labelLine: {
                                    show: false
                                },
                                color: function(e) {
                                    if (e.dataIndex == 0) {
                                        return "#00c66b"
                                    } else {
                                        return "#f29939"
                                    }
                                }

                            }
                        },
                        data: [

                        ]
                    },
                    {
                        name: '操作系统',
                        type: 'pie',
                        radius: ['40%', '55%'],
                        // for funnel
                        x: '40%',
                        y: '40%',
                        width: '45%',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                }
                            }
                        },
                        data: []
                    }
                ]

            },
            browser_spread_pie: __function__.commonPie("设备浏览器"),
            mobile_spread_pie: __function__.commonPie("移动终端"),
            static_src_bar: __function__.commonVBar("静态资源"),
            http_code_pie: __function__.commonPie("状态码"),
            // attack_dest_pie: __function__.commonPie("攻击目标"),
            // attack_dest_leida: {
            //     tooltip: {
            //         trigger: 'axis'
            //     },
            //
            //     polar: [{
            //         indicator: [
            //
            //
            //         ]
            //     }],
            //     calculable: false,
            //     series: [{
            //         name: '攻击目标',
            //         type: 'radar',
            //         itemStyle: {
            //             normal: {
            //                 color: '#43aea8'
            //             }
            //         },
            //         data: [
            //
            //         ]
            //     }]
            // },
            world_attack_pie: __function__.commonPie("攻击源区域"),
            attack_topn_bar: __function__.commonVBar("攻击源IP"),
            china_attack_map: __function__.commonMapOption(),
            attack_type_pie: __function__.commonPie("攻击类型")
        },
        view: {
            load: function() {
                var w = this;
                cloudwaf.view.summary.call(w);
                cloudwaf.view.echarts_prepare.call(w, function() {
                    cloudwaf.view.daily_attack_visit_flow_line.call(w);
                    // cloudwaf.view.attack_dest.call(w);
                    cloudwaf.view.world_attack.call(w);
                    cloudwaf.view.china_attack.call(w);
                    cloudwaf.view.attack_topN.call(w);
                    cloudwaf.view.attack_type.call(w);
                    cloudwaf.view.world_visit.call(w);
                    cloudwaf.view.china_visit.call(w);
                    cloudwaf.view.visitip_topn.call(w);
                    cloudwaf.view.visitPageRank.call(w);
                    cloudwaf.view.spread_pie.call(w);
                    // cloudwaf.view.brokenLink.call(w);
                    // cloudwaf.view.static_src.call(w);
                    cloudwaf.view.http_code.call(w);

                    cloudwaf.view.visit_src.call(w);
                    cloudwaf.view.useAttack.call(w);
                });
                $(window).resize(function() {
                    cloudwaf.view.echarts_prepare.call(w, function() {
                        $(".echarts", $("#cloudwaf_id")).each(function(i, obj) {
                            var _id = $(obj).attr("id");
                            __function__.noData(w[_id], cloudwaf.options[_id]);
                            w[_id].setOption(cloudwaf.options[_id])
                        });


                    });
                });

            },
            echarts_prepare: function(callback) {
                var w = this;
                $(".echarts", $("#cloudwaf_id")).each(function(i, obj) {
                    var _id = $(obj).attr("id");
                    w[_id] = echarts.init(document.getElementById(_id));
                });
                callback && callback.call(w);
            },
            summary: function() {
                var w = this;
                var summary = w.cloudwafData.summary || {};
                if (!summary) {
                    return;
                }
                var data = {};
                data['visit_count'] = __function__.numFormat(summary.visit.count);
                data['visit_ip_count'] = __function__.numFormat(summary.visit.ipCount);
                data['attack_count'] = __function__.numFormat(summary.attack.count);
                data['attack_area_count'] = __function__.numFormat(summary.attack.areaCount);
                data['flow_in'] = summary.flow['in'] / 1024 / 1024 >= 1024 ? __function__.numFormat((Number)(summary.flow['in'] / 1024 / 1024 / 1024).toFixed(2)) : __function__.numFormat((Number)(summary.flow['in'] / 1024 / 1024).toFixed(2));
                data['flow_out'] = summary.flow['out'] / 1024 / 1024 >= 1024 ? __function__.numFormat((Number)(summary.flow['out'] / 1024 / 1024 / 1024).toFixed(2)) : __function__.numFormat((Number)(summary.flow['out'] / 1024 / 1024).toFixed(2));
                data['flow_attack'] = __function__.numFormat(((summary.flow.attack_flow || 0) / 1024 / 1024).toFixed(2));
                data['attck_src_count'] = __function__.numFormat(summary.attack.attackSrcCount);
                data['black_ip_count'] = __function__.numFormat(summary.attack.blacklist);
                $.each(data, function(k, v) {
                    $("." + k, $(".cloudwaf-summary")).text(v);
                });
                $(".cloudwaf-summary").find('b').html('');
                if ((summary.flow['in'] / 1024 / 1024) > 1024) {
                    $(".flow_in", $(".cloudwaf-summary")).parent("div").append("<b>GB</b>");
                } else {
                    $(".flow_in", $(".cloudwaf-summary")).parent("div").append("<b>MB</b>");
                }
                if ((summary.flow['out'] / 1024 / 1024) > 1024) {
                    $(".flow_out", $(".cloudwaf-summary")).parent("div").append("<b>GB</b>");
                } else {
                    $(".flow_out", $(".cloudwaf-summary")).parent("div").append("<b>MB</b>");
                }
            },
            daily_attack_visit_flow_line: function() {
                var w = this;
                var data = w.cloudwafData.dailyPoint || {};
                var visitMap = data.visit || {};
                var attackMap = data.attack || {};
                var flowOutMap = data.flowOut || {};
                var flowInMap = data.flowIn || {};
                var xAxis = [];

                var visit = __function__.mapset(visitMap, false);
                var attack = __function__.mapset(attackMap, false);
                var flowOut = __function__.mapset(flowOutMap, false);
                var flowIn = __function__.mapset(flowInMap, false);

                var _flowOut = [];
                $.each(flowOut, function(i, v) {
                    _flowOut.push((v / 1024).toFixed(2)); ///1024
                });
                var _flowIn = [];
                $.each(flowIn, function(i, v) {
                    _flowIn.push((v / 1024).toFixed(2)); ///1024
                });
                if (w.report == 'day') {
                    $.each(visitMap, function(k, v) {
                        xAxis.push(k.split(" ")[1]);
                    });
                } else {
                    $.each(visitMap, function(k, v) {
                        xAxis.push(k);
                    });
                }

                cloudwaf.options.flow_line.series[0].data = attack;
                cloudwaf.options.flow_line.series[1].data = visit;
                cloudwaf.options.flow_line.series[2].data = _flowOut;
                cloudwaf.options.flow_line.series[3].data = _flowIn;
                cloudwaf.options.flow_line.xAxis[0].data = xAxis;

                __function__.noData(w.flow_line, cloudwaf.options.flow_line);
                w.flow_line.setOption(cloudwaf.options.flow_line);
            },
            attack_dest: function() {
                var w = this;
                var data = w.cloudwafData.attackDest || {};
                var name_arr = [];
                var arr = [];
                var total = 0;
                $.each(data, function(k, v) {
                    name_arr.push(k);
                    arr.push({ name: k, value: v });
                    total += v;
                });

                cloudwaf.options.attack_dest_pie.legend.data = name_arr.reverse();
                cloudwaf.options.attack_dest_pie.series[0].data = arr.reverse();
                __function__.noData(w.attack_dest_leida, cloudwaf.options.attack_dest_pie);
                w.attack_dest_leida.setOption(cloudwaf.options.attack_dest_pie);

                //表单
                arr.sort(function(a, b) {
                    return b.value - a.value;
                });
                var tbody = $("tbody", $("#attack_dest_table"));
                tbody.html("");
                $.each(arr, function(i, obj) {
                    var pecent = (obj.value * 100 / total).toFixed(2);
                    var tr = $("<tr><td>" + obj.name + "</td><td>" + obj.value + "</td><td>" + __function__.pecentItem(pecent) + "</td></tr>");
                    tr.appendTo(tbody);
                });
                $("#attack_dest_table").dataTable().fnDestroy();
                $("#attack_dest_table").DataTable(_dataTable_setting._report());


            },
            world_attack: function() {
                var w = this;
                var data = w.cloudwafData.worldAreaRank || {};
                var visit = data.attack || {};
                __function__.worldAreaRank.call(w, visit, cloudwaf.options.world_attack_pie, w.world_attack_pie, "world_attack_table");

            },
            china_attack: function() {
                var w = this;
                var data = w.cloudwafData.chinaAreaRank || {};
                var visit = data.attack || {};
                __function__.chinaAreaRank.call(w, visit, cloudwaf.options.china_attack_map, w.china_attack_map, "china_attack_table");
            },
            attack_topN: function() {
                var w = this;
                var data = w.cloudwafData.attackTopN || [];
                var attackTotal = 0;
                cloudwaf.options.attack_topn_bar.yAxis[0].data = [];
                cloudwaf.options.attack_topn_bar.series[0].data = [];
                $.extend(cloudwaf.options.attack_topn_bar, {
                    grid: { // 控制图的大小，调整下面这些值就可以，
                        x: 100,
                        x2: 20
                    }
                });
                data['attact'] && data['attact'].sort(function(a, b) {
                    return a['count'] - b['count'];
                });
                $.each(data['attact'], function(point, item) {
                    cloudwaf.options.attack_topn_bar.yAxis[0].data.push(item['ip']);
                    cloudwaf.options.attack_topn_bar.series[0].data.push(item['count']);
                    attackTotal = attackTotal + item['count'];
                });
                __function__.noData(w.attack_topn_bar, cloudwaf.options.attack_topn_bar);
                w.attack_topn_bar.setOption(cloudwaf.options.attack_topn_bar);
                //表格
                data['attact'].sort(function(a, b) {
                    return b['count'] - a['count'];
                });
                $("tbody", $("#attack_topn_table")).html("");
                $.each(data['attact'], function(point, item) {
                    var color = tableBgColor[point + ""] || "bg-blue";
                    var pecent = (item.count * 100 / attackTotal).toFixed(2);
                    var tr = $("<tr><td>" + item.ip + "</td><td>" + item.location + "</td><td>" + item.count + "</td><td>" + __function__.pecentItem(pecent, color) + "</td></tr>");
                    $("tbody", $("#attack_topn_table")).append(tr);
                });
                $("#attack_topn_table").dataTable().fnDestroy();
                $("#attack_topn_table").DataTable(_dataTable_setting._report());

            },
            attack_type: function() {
                var w = this;

                // var attackTypeDetail= w.cloudwafData.ruleidUrlRank||{};
                var attackTypeDetail = w.cloudwafData.attackType || {};
                var arr = [];
                var arr2 = [];
                var name_arr = [];
                var total = 0;
                var data = {};
                var attackTpeData = {};
                /*$.each(attackTypeDetail['data'] || {},function(k,v){
                 $.each(v,function(key,value){
                 if(key!='count'){
                 data[key] = v['count'];
                 attackTpeData[key] = value;
                 }
                 });
                 });
                 $.each(data,function(k,v){
                 var value=Math.log(v);
                 arr.push({name:k,value: v});
                 arr2.push({name:k,value:v});
                 name_arr.push(k);
                 total+=v;
                 });*/
                $.each(attackTypeDetail, function(k, v) {
                    if (v > 0) {
                        name_arr.push(k);
                        arr.push({ name: k, value: v });
                        arr2.push({ name: k, value: v });
                        total += v;
                    }
                });

                cloudwaf.options.attack_type_pie.legend.data = name_arr;
                cloudwaf.options.attack_type_pie.series[0].data = arr;
                __function__.noData(w.attack_type_pie, cloudwaf.options.attack_type_pie);
                w.attack_type_pie.setOption(cloudwaf.options.attack_type_pie);
                //表单数据
                arr2.sort(function(a, b) {
                    return b.value - a.value;
                });

                var tbody = $("tbody", $("#attack_type_table"));
                tbody.html("");
                $.each(arr2, function(i, obj) {
                    var pecent = (obj.value * 100 / total).toFixed(2);
                    var color = tableBgColor[i + ""] || "bg-blue";
                    var tr = $("<tr><td>" + obj.name + "</td><td>" + obj.value + "</td><td>" + __function__.pecentItem(pecent, color) + "</td></tr>");
                    tr.appendTo(tbody);
                    // var detailTable = __function__.attackDetailTable(attackTpeData[obj.name],["策略ID","攻击量","占比"],obj.value);
                    $("tbody", $("#attack_type_table")).append(tr);
                });
                $("#attack_type_table").dataTable().fnDestroy();
                $("#attack_type_table").DataTable(_dataTable_setting._report());
                /*  $.each(arr2,function(i,obj){
                 var pecent= (obj.value*100/total).toFixed(2);
                 var color=tableBgColor[i+""]||"bg-blue";
                 var tr=$("<tr><td><span class='row-details row-details-close'></span></td><td>"+obj.name+"</td><td>"+obj.value+"</td><td>"+__function__.pecentItem(pecent,color)+"</td></tr>");
                 tr.appendTo(tbody);
                 var detailTable = __function__.attackDetailTable(attackTpeData[obj.name],["策略ID","攻击量","占比"],obj.value);
                 detailTable.hide().appendTo(tbody);

                 });*/

                //ada what 's mean?
                $(".row-details", tbody).bind("click", function() {
                    if ($(this).hasClass('row-details-close')) {
                        $('.collapse-grid tbody td .row-details').addClass("row-details-close").removeClass("row-details-open");
                        $('.collapse-grid tbody td .row-details').parents('tr').next('tr.details').hide();
                        $(this).addClass("row-details-open").removeClass("row-details-close");
                        $(this).parents('tr').next('tr').css("display", "table-row");
                    } else {
                        $('.collapse-grid tbody td .row-details').addClass("row-details-close").removeClass("row-details-open");
                        $('.collapse-grid tbody td .row-details').parents('tr').next('tr.details').hide();
                        $(this).addClass("row-details-close").removeClass("row-details-open");
                        $(this).parents('tr').next('tr.details').hide();
                    }
                });
            },
            world_visit: function() {
                var w = this;
                //访问源区域分布数据
                var data = w.cloudwafData.worldAreaRank || {};

                var visit = data.visit || {};
                __function__.worldAreaRank.call(w, visit, cloudwaf.options.world_visit_pie, w.world_visit_pie, "world_visit_table");
            },
            china_visit: function() {
                var w = this;
                var data = w.cloudwafData.chinaAreaRank || {};
                var visit = data.visit || {};
                __function__.chinaAreaRank.call(w, visit, cloudwaf.options.china_visit_map, w.china_visit_map, "china_visit_table");
            },
            visitip_topn: function() {
                var w = this;
                var data = w.cloudwafData.ipTopN || {};
                var arr = data.visit || [];
                if (arr.length > 10) {
                    var tmp = [];
                    for (var i = 0; i < 10; i++) {
                        tmp[i] = arr[i];
                    }
                    arr = tmp;
                }

                arr.sort(function(a, b) {
                    return a.count - b.count;

                });
                cloudwaf.options.visitip_topn_bar.yAxis[0].data = [];
                cloudwaf.options.visitip_topn_bar.series[0].data = [];
                $.extend(cloudwaf.options.visitip_topn_bar, {
                    grid: { // 控制图的大小，调整下面这些值就可以，
                        x: 100,
                        x2: 20
                    }
                });
                $.each(arr, function(i, obj) {
                    if (i < 10) {
                        cloudwaf.options.visitip_topn_bar.yAxis[0].data.push(obj.ip);
                        cloudwaf.options.visitip_topn_bar.series[0].data.push(obj.count);
                    }
                });
                __function__.noData(w.visitip_topn_bar, cloudwaf.options.visitip_topn_bar);
                w.visitip_topn_bar.setOption(cloudwaf.options.visitip_topn_bar);
                var revert = [];
                var total = 0;
                for (var i = arr.length - 1; i >= 0; i--) {
                    revert.push(arr[i]);
                    total += arr[i].count;
                }

                //下面写表单数据
                var tbody = $("tbody", $("#visitip_topn_table"));
                tbody.html("");
                $.each(revert, function(i, obj) {
                    var color = tableBgColor[i + ""] || "bg-blue";
                    var pecent = (obj.count * 100 / total).toFixed(2);
                    var tr = $("<tr><td>" + obj.ip + "</td><td>" + obj.location + "</td><td>" + obj.count + "</td><td>" + __function__.pecentItem(pecent, color) + "</td></tr>");

                    tr.appendTo(tbody);
                });
                $("#visitip_topn_table").dataTable().fnDestroy();
                $("#visitip_topn_table").DataTable(_dataTable_setting._report());
            },
            visitPageRank: function() {
                var w = this;
                var data = w.cloudwafData.visitPageRank || [];
                var tbody = $("tbody", $("#visitPageRank_table"));
                tbody.html("");
                $.each(data, function(i, d) {
                    var tr = $("<tr><td style='width: 80%' title='" + d.url + "'>" + d.url + "</td><td style='width: 20%'>" + d.pv + "</td></tr>");
                    tbody.append(tr);
                });
                $("#visitPageRank_table").dataTable().fnDestroy();
                $("#visitPageRank_table").DataTable(_dataTable_setting._report());
            },
            spread_pie: function() {
                var w = this;
                var data = w.cloudwafData.visitMethod || {};
                var _map = {};
                var name_device = [],
                    name_browser = [];
                $.each(data, function(key, map) {
                    $.each(map, function(k, v) {
                        if (!_map[key]) {
                            _map[key] = [];
                        }
                        if (key == 'device') {
                            name_device.push(k);
                        }
                        if (key == 'browser') {
                            name_browser.push(k);
                        }
                        if (v > 0) {
                            _map[key].push({ name: k, value: v });
                        }
                    });
                });
                name_device = name_device.length == 0 ? ['pc端'] : name_device;
                cloudwaf.options.device_spread_pie.series[0].data = _map['deviceGroup'] || [];
                cloudwaf.options.device_spread_pie.legend.data = name_device;
                cloudwaf.options.device_spread_pie.series[1].data = _map['device'] || [];
                __function__.noData(w.device_spread_pie, cloudwaf.options.device_spread_pie);
                w.device_spread_pie.setOption(cloudwaf.options.device_spread_pie);

                cloudwaf.options.browser_spread_pie.legend.data = name_browser;
                cloudwaf.options.browser_spread_pie.series[0].data = _map['browser'] || [];
                __function__.noData(w.browser_spread_pie, cloudwaf.options.browser_spread_pie);
                w.browser_spread_pie.setOption(cloudwaf.options.browser_spread_pie);

                cloudwaf.options.mobile_spread_pie.series[0].data = _map['mobile'] || [];
                //w.mobile_spread_pie.setOption(cloudwaf.options.mobile_spread_pie);
            },
            static_src: function() {
                var w = this;
                var data = w.cloudwafData.staticSrc || [];
                var map = {};
                var total = 0;
                $.each(data, function(i, obj) {
                    var type = obj.type;
                    if (!map[type]) {
                        map[type] = 1;
                    } else {
                        map[type] = map[type] + 1;
                    }
                    total += obj.pv;

                });
                var arr = [];
                $.each(map, function(k, v) {
                    arr.push({ name: k, value: v });
                });
                arr.sort(function(a, b) {
                    return a.value - b.value;
                });
                cloudwaf.options.static_src_bar.yAxis[0].data = [];
                cloudwaf.options.static_src_bar.series[0].data = [];
                $.each(arr, function(i, obj) {
                    cloudwaf.options.static_src_bar.yAxis[0].data.push(obj.name);
                    cloudwaf.options.static_src_bar.series[0].data.push(obj.value);
                });
                __function__.noData(w.static_src_bar, cloudwaf.options.static_src_bar);
                w.static_src_bar.setOption(cloudwaf.options.static_src_bar);

                //表单数据
                data.sort(function(a, b) {
                    return b.pv - a.pv;
                });
                var tbody = $("tbody", $("#static_src_table"));
                tbody.html("");
                var currentUrl = "";
                $.each(data, function(i, o) {
                    var pecent = (o.pv * 100 / total).toFixed(2);
                    var color = tableBgColor[i + ""] || "bg-blue";
                    currentUrl = o.url || "";
                    if (currentUrl.length > 50) {
                        currentUrl = currentUrl.substr(0, 50);
                    }
                    var tr = $("<tr><td>" + o.type + "</td><td title='" + o.url + "'>" + currentUrl + "</td><td>" + o.pv + "</td><td>" + __function__.pecentItem(pecent, color) + "</td></tr>");
                    tr.appendTo(tbody);
                });
                $("#static_src_table").dataTable().fnDestroy();
                $("#static_src_table").DataTable(_dataTable_setting._report());
                //__function__.fnDrawDataTable.call(w,"static_src_table",$("#static_src_table"),8);
            },
            brokenLink: function() {
                var w = this;
                var data = w.cloudwafData.brokenLinkRank || [];

                var total = 0;
                $.each(data, function(i, obj) {
                    total += obj.pv;
                });
                data.sort(function(a, b) {
                    return b.pv - a.pv;
                });
                var tbody = $("tbody", $("#brokenlink_table"));
                tbody.html("");

                $.each(data, function(i, o) {
                    var pecent = (o.pv * 100 / total).toFixed(2);
                    var color = tableBgColor[i + ""] || "bg-blue";

                    var tr = $("<tr><td>" + o.url + "</td><td>" + o.refer + "</td><td>" + o.pv + "</td><td>" + __function__.pecentItem(pecent, color) + "</td></tr>");
                    tr.appendTo(tbody);
                });
                $("#brokenlink_table").dataTable().fnDestroy();
                $("#brokenlink_table").DataTable(_dataTable_setting._report());
            },
            http_code: function() {
                var w = this;
                var data = w.cloudwafData.httpCode || {};
                var _map = {};
                var total = 0;
                $.each(data.group || {}, function(k, v) {
                    if (k != 0) {
                        var type = k.substr(0, 1) + "xx";
                        if (!_map[type]) {
                            _map[type] = v;
                        } else {
                            _map[type] = _map[type] + v;
                        }

                    }

                });

                cloudwaf.options.http_code_pie.series[0].data = [];
                $.each(_map, function(k, v) {
                    cloudwaf.options.http_code_pie.legend.data.push(k);
                    cloudwaf.options.http_code_pie.series[0].data.push({ name: k, value: v });
                });
                __function__.noData(w.http_code_pie, cloudwaf.options.http_code_pie);
                w.http_code_pie.setOption(cloudwaf.options.http_code_pie);
                //表单数据
                var _5xxData = data['_5xx_TopN'] || [];
                var tbody = $("tbody", $("#http_code_table"));
                tbody.html("");
                $.each(_5xxData, function(k, v) {
                    total += Number(v.pv);
                });
                $.each(_5xxData, function(i, o) {
                    var pecent = (o.pv * 100 / total).toFixed(2);
                    var color = tableBgColor[i + ""] || "bg-blue";
                    var tr = $("<tr><td style='width: 40%' title='" + o.url + "'>" + o.url + "</td><td style='width: 20%'>" + o.pv + "</td><td style='width: 40%'>" + __function__.pecentItem(pecent, color) + "</td></tr>");
                    tr.appendTo(tbody);
                });
                $("#http_code_table").dataTable().fnDestroy();
                $("#http_code_table").DataTable(_dataTable_setting._report());
            },
            visit_src: function() {
                var w = this;
                var data = w.cloudwafData.visitSrcRank || {};
                cloudwaf.options.visit_src_pie.series[0].data = [];
                var total = 0;
                $.each(data, function(t, o) {
                    if (o.count > 0) {
                        cloudwaf.options.visit_src_pie.legend.data.push(t);
                        cloudwaf.options.visit_src_pie.series[0].data.push({ name: t, value: o.count });
                        total += o.count;
                    }

                });
                __function__.noData(w.visit_src_pie, cloudwaf.options.visit_src_pie);
                w.visit_src_pie.setOption(cloudwaf.options.visit_src_pie);
                //表单数据
                var tbody = $("tbody", $("#visit_src_table"));
                tbody.html("");
                var i = 0;
                var arr = [];
                $.each(data, function(t, o) {
                    if (o.count) {
                        arr.push({ name: t, count: o.count, detail: o.detail });
                    }
                });
                arr.sort(function(a, b) {
                    return b.count - a.count;
                });

                $.each(arr, function(i, o) {
                    var detail = o.detail;
                    var pecent = total == 0 ? 0 : (o.count * 100 / total).toFixed(2);
                    var tr = $("<tr><td><span class='row-details row-details-close'></span></td><td>" + o.name + "</td><td>" + o.count + "</td><td>" + __function__.pecentItem(pecent) + "</td></tr>");
                    var detailTable = __function__.visitSrcDetail_real(detail, ["访问方式", "访问量", "访问占比"], o.count);
                    tr.appendTo(tbody);
                    detailTable.hide().appendTo(tbody);
                });

                $(".row-details", tbody).bind("click", function() {
                    if ($(this).hasClass('row-details-close')) {
                        $('.collapse-grid tbody td .row-details').addClass("row-details-close").removeClass("row-details-open");
                        $('.collapse-grid tbody td .row-details').parents('tr').next('tr.details').hide();
                        $(this).addClass("row-details-open").removeClass("row-details-close");
                        $(this).parents('tr').next('tr').css("display", "table-row");
                    } else {
                        $('.collapse-grid tbody td .row-details').addClass("row-details-close").removeClass("row-details-open");
                        $('.collapse-grid tbody td .row-details').parents('tr').next('tr.details').hide();
                        $(this).addClass("row-details-close").removeClass("row-details-open");
                        $(this).parents('tr').next('tr.details').hide();
                    }
                })
            },
            useAttack: function() {
                var w = this;

                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: {
                        destHostName: w.domain,
                        dateStr: w.currentDateKey
                    },
                    //contentType: "application/json",
                    url: '/es/sceneListByHostName',
                    cache: false,
                    async: false,
                    success: function(data) {
                        //if (data['code'] == 0) {
                        var json = data;
                        var tbody = $("tbody", $("#useAttack"));
                        tbody.html("");
                        $.each(json.data, function(i, item) {
                            var tr = $("<tr>" +
                                '<td>' + item.processTime + '</td>' +
                                '<td>' + item.srcAddress + '</td>' +
                                '<td title="' + item.destHostName + '">' + item.destHostName + '</td>' +
                                '<td>' + item.srcArea + '</td>' +
                                '<td>' + item.reputation + '</td>' +
                                '<td>' + item.severityType + '</td>' +
                                '<td>' + item.docCount + '</td>' +
                                '<td title="' + item.warningTypeCN + '">' + item.warningTypeCN + '</td>' +
                                "</tr>");
                            tbody.append(tr);
                        });
                        $("#useAttack").dataTable().fnDestroy();
                        $("#useAttack").DataTable(_dataTable_setting._report());
                        //}
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {}
                });
            }
        }

    };


})();
