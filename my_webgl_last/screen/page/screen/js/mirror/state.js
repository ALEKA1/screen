/**
 *@name
 *@author Sean.xiang
 *@date 2016/10/31
 *@example
 */
var refresh = {
  totalInfo: 1000 * 60 * 3,
  zMap: 1000 * 60 * 5,
  attack: 1000 * 60,
  sortInterval: 500
};
var State = {
  init: function() {
    var w = this;
    // w.province =$('#province').val('浙江');
    w.clientProvince = '浙江';
    $.ajax({
      type: "post",
      dataType: 'json',
      async: false,
      url: '/api/config',
      success: function(json){
        if(json.code==0){
          w.clientProvince = json.data.clientProvince;
        }
      }

    });
    w.param = {};
    w.param['domain'] = 'all';
    w.param['interval'] = '0d';
    w.param['isSingleDay'] = true;
    w.time();
    w.initHtml();
    w.initEvent();
  },
  initHtml: function() {
    var w = this;
    w.totalInfo();
    w.initMap();
    w.attackArea();
    w.attackSource();
    w.viewChart();

    w.zMap();
    $(window).resize(function() {
      w.initMap();
      w.viewChart();
      w.zMap();
    });
    clearInterval(totalInfoTime);
    var totalInfoTime = setInterval(function() {
      w.totalInfo();
      w.attackArea();
      w.attackSource();
      w.viewChart();
    }, refresh.totalInfo);
    clearInterval(zMapTime);
    var zMapTime = setInterval(function() {
      w.zMap();
    }, refresh.zMap);
  },
  initEvent: function() {
    var w = this;
    $('.menu-item-button').click(function(index) {
      $('.menu-item-button').removeClass('active');
      $(this).addClass('active');
      var time = $(this).attr('time')
      w.param['interval'] = time;
      if (time != '0d') {
        w.param['isSingleDay'] = false
      }
      $('.toggle-text').text($(this).find('span').text());
      w.initHtml();
    })
  },
  totalInfo: function() {
    var w = this;
    $.ajax({
      type: "post",
      dataType: 'json',
      url: '/api/screen?url=lastest/web/total/counter',
      data: w.param,
      success: function(json) {
        var data = json.data.value;
  
        if (data.importNum) {
          data.importNum = (data.importNum / 1024 / 1024).toFixed(2);
        }
        var flowInStart = w.todayFlowIn || 0;
        $(".flowIn").next("span").text("MB");
        if (data.importNum > 1024) {
          data.importNum = (data.importNum / 1024).toFixed(2);
          $(".flowIn").next("span").text("GB");
        }
        if (data.importNum > flowInStart) {
          _fun.flowScoller.call(w, $(".flowIn"), Number(flowInStart), data.importNum);
        } else {
          $(".flowIn").text(_fun.num(data.importNum));
        }
        w.todayFlowIn = data.importNum;
  
        //--
        if (data.exportNum) {
          data.exportNum = (data.exportNum / 1024 / 1024).toFixed(2);
        }
        var flowOutStart = w.todayFlowOut || 0;
        $(".flowOut").next("span").text("MB");
        if (data.exportNum > 1024) {
          data.exportNum = (data.exportNum / 1024).toFixed(2);
          $(".flowOut").next("span").text("GB");
        }
        if (data.exportNum > flowOutStart) {
          _fun.flowScoller.call(w, $(".flowOut"), Number(flowOutStart), data.exportNum);
        } else {
          $(".flowOut").text(_fun.num(data.exportNum));
        }
        w.todayFlowOut = data.exportNum;
  
  
        var visitStart = w.todayVisitPrev || 0;
        $(".visitNum").next("span").text("次");
        if (data.visitNum > 10000 && (data.visitNum / 10000) > 100) {
          data.visitNum = (data.visitNum / 10000).toFixed(2);
          $(".visitNum").next("span").text("万次");
        }
        if (data.visitNum > visitStart) {
          _fun.numScoller.call(w, $(".visitNum"), Number(flowInStart), data.visitNum);
        } else {
          $(".visitNum").text(_fun.num(data.visitNum))
        }
        w.todayVisitPrev = data.visitNum;
  
  
        //------
        var attackStart = w.todayAttackPrev || 0;
        $(".attackNum").next("span").text("次");
        if (data.attackNum > 10000 && data.attackNum / 10000 > 100) {
          data.attackNum = (data.attackNum / 10000).toFixed(2);
          $(".attackNum").next("span").text("万次");
        }
        if (data.attackNum > attackStart) {
          _fun.numScoller.call(w, $(".attackNum"), Number(attackStart), data.attackNum);
        } else {
          $(".attackNum").text(_fun.num(data.attackNum));
        }
        w.todayAttackPrev = data.attackNum;
      }

    });
    // $.post('/api/screen?url=lastest/web/total/counter', w.param).success(function(json) {
    //   var data = json.data.value;

    //   if (data.importNum) {
    //     data.importNum = (data.importNum / 1024 / 1024).toFixed(2);
    //   }
    //   var flowInStart = w.todayFlowIn || 0;
    //   $(".flowIn").next("span").text("MB");
    //   if (data.importNum > 1024) {
    //     data.importNum = (data.importNum / 1024).toFixed(2);
    //     $(".flowIn").next("span").text("GB");
    //   }
    //   if (data.importNum > flowInStart) {
    //     _fun.flowScoller.call(w, $(".flowIn"), Number(flowInStart), data.importNum);
    //   } else {
    //     $(".flowIn").text(_fun.num(data.importNum));
    //   }
    //   w.todayFlowIn = data.importNum;

    //   //--
    //   if (data.exportNum) {
    //     data.exportNum = (data.exportNum / 1024 / 1024).toFixed(2);
    //   }
    //   var flowOutStart = w.todayFlowOut || 0;
    //   $(".flowOut").next("span").text("MB");
    //   if (data.exportNum > 1024) {
    //     data.exportNum = (data.exportNum / 1024).toFixed(2);
    //     $(".flowOut").next("span").text("GB");
    //   }
    //   if (data.exportNum > flowOutStart) {
    //     _fun.flowScoller.call(w, $(".flowOut"), Number(flowOutStart), data.exportNum);
    //   } else {
    //     $(".flowOut").text(_fun.num(data.exportNum));
    //   }
    //   w.todayFlowOut = data.exportNum;


    //   var visitStart = w.todayVisitPrev || 0;
    //   $(".visitNum").next("span").text("次");
    //   if (data.visitNum > 10000 && (data.visitNum / 10000) > 100) {
    //     data.visitNum = (data.visitNum / 10000).toFixed(2);
    //     $(".visitNum").next("span").text("万次");
    //   }
    //   if (data.visitNum > visitStart) {
    //     _fun.numScoller.call(w, $(".visitNum"), Number(flowInStart), data.visitNum);
    //   } else {
    //     $(".visitNum").text(_fun.num(data.visitNum))
    //   }
    //   w.todayVisitPrev = data.visitNum;


    //   //------
    //   var attackStart = w.todayAttackPrev || 0;
    //   $(".attackNum").next("span").text("次");
    //   if (data.attackNum > 10000 && data.attackNum / 10000 > 100) {
    //     data.attackNum = (data.attackNum / 10000).toFixed(2);
    //     $(".attackNum").next("span").text("万次");
    //   }
    //   if (data.attackNum > attackStart) {
    //     _fun.numScoller.call(w, $(".attackNum"), Number(attackStart), data.attackNum);
    //   } else {
    //     $(".attackNum").text(_fun.num(data.attackNum));
    //   }
    //   w.todayAttackPrev = data.attackNum;
    // });
  },
  attackArea: function() {
    var w = this;
    $.ajax({
      type: "post",
      dataType: 'json',
      url: '/api/screen?url=mirror/web/domainattack/list',
      data: w.param,
      success: function(json) {
        if (json.code == 0) {
          var data = json['data'][0]['ranklist'];
          $("tbody", $('.area')).html('');
          $.each(data, function(k, item) {
            var el = $(' <tr class="r-info">' +
              '<td class="r-name" title="' + item.link + '">' + item.link + '</td> ' +
              // '<td class="r-chart"><div class="r-chart-title" title="' + item.href + '">' + item.href + '</div></td>' +
              '<td class="r-count">' + item.num + '</td>' +
              '</tr>');
            $("tbody", $('.area')).append(el);
          })
        }
      }
    })
    // $.post('/api/screen?url=mirror/web/domainattack/list', w.param).success(function(json) {
    //   if (json.code == 0) {
    //     var data = json['data'][0]['ranklist'];
    //     $("tbody", $('.area')).html('');
    //     $.each(data, function(k, item) {
    //       var el = $(' <tr class="r-info">' +
    //         '<td class="r-name" title="' + item.link + '">' + item.link + '</td> ' +
    //         // '<td class="r-chart"><div class="r-chart-title" title="' + item.href + '">' + item.href + '</div></td>' +
    //         '<td class="r-count">' + item.num + '</td>' +
    //         '</tr>');
    //       $("tbody", $('.area')).append(el);
    //     })
    //   }
    // })
  },
  attackSource: function() {
    var w = this;
    $.ajax({
      type: "post",
      dataType: 'json',
      url: '/api/screen?url=topN/web/attack/ip',
      data: w.param,
      success: function(json) {
        if (json.code == 0) {
          var data = json['data'][0]['ranklist'];
          $("tbody", $('.source')).html('');
          $.each(data, function(k, item) {
            var el = $(' <tr class="r-info">' +
              '<td class="r-name">' + item.area + '</td> ' +
              '<td class="r-chart"><div class="progress"><div class="progress-bar" style="width: ' + item.percent + '%;">' + item.ip + '</div></div></td>' +
              '<td class="r-count">' + item.num + '</td>' +
              '</tr>');
            $("tbody", $('.source')).append(el);
          })
        }
  
      }
    })
    // $.post('/api/screen?url=topN/web/attack/ip', w.param).success(function(json) {
    //   if (json.code == 0) {
    //     var data = json['data'][0]['ranklist'];
    //     $("tbody", $('.source')).html('');
    //     $.each(data, function(k, item) {
    //       var el = $(' <tr class="r-info">' +
    //         '<td class="r-name">' + item.area + '</td> ' +
    //         '<td class="r-chart"><div class="progress"><div class="progress-bar" style="width: ' + item.percent + '%;">' + item.ip + '</div></div></td>' +
    //         '<td class="r-count">' + item.num + '</td>' +
    //         '</tr>');
    //       $("tbody", $('.source')).append(el);
    //     })
    //   }

    // })
  },
  initMap: function() {
    var w = this;

    var globalOffsetForRow1 = '23px';
    var globalOffsetForRow2 = '33%';
    var globalOffsetForRow3 = '66%';
    var itemStyle = {
      normal: {
        label: { show: false },
        areaColor: 'rgba(2, 89,255, .2)',
        borderColor: 'rgba(19, 105,167, 1)'
      },
      emphasis: {
        label: { show: false },
        areaColor: 'rgba(2, 89,255, .2)'
      }
    };
    $('#map').width($(window).width() * .8);
    $('#map').height($(window).height() * .6);

    w.map = echarts.init(document.getElementById('map'));

    w.mapOption = {
      legend: {
        show: true,
        showContent: true,
        trigger: 'item',
        position: ['50%', '50%']
      },

      geo: [
        {
          show: false,
          name: '',
          type: 'map',
          map: 'asia',
          itemStyle: itemStyle,
          left: '0%',
          top: globalOffsetForRow1,
          width: "25%",
          height: "33%"

        },
        //欧洲
        {
          show: false,
          name: '',
          type: 'map',
          map: 'europe',
          itemStyle: itemStyle,
          left: '0%',
          top: globalOffsetForRow2,
          width: "25%",
          height: "33%"
        }, //非洲
        {
          show: false,
          name: '',
          type: 'map',
          map: 'africa',
          itemStyle: itemStyle,
          left: '0%',
          top: globalOffsetForRow3,
          width: "25%",
          height: "34%"
        }, //主地图
        {
          show: false,
          name: '',
          type: 'map',
          map: 'china',
          itemStyle: {
            normal: {
              borderColor: 'rgba(19, 105,167, 1)',
              borderWidth:.5,
              areaColor: 'rgba(0, 135,230, .4)',
            },
            emphasis: {
              areaColor: 'rgba(0, 135,230, .4)'
            }
          }
        }, //北美洲
        {
          show: false,
          name: '',
          type: 'map',
          map: 'northamerica',
          itemStyle: itemStyle,
          left: '75%',
          top: globalOffsetForRow1,
          width: "25%",
          height: "33%"
        }, //南美洲
        {
          show: false,
          name: '',
          type: 'map',
          map: 'southamerica',
          itemStyle: itemStyle,
          left: '75%',
          top: globalOffsetForRow2,
          width: "25%",
          height: "33%"
        }, //大洋洲
        {
          show: false,
          name: '',
          type: 'map',
          map: 'oceania',
          left: '75%',
          top: globalOffsetForRow3,
          width: "25%",
          height: "34%"
        }
      ],
      series: [ //亚洲
        {
          show: false,
          name: '',
          type: 'map',
          map: 'asia',
          itemStyle: itemStyle,
          silent: true,
          left: '0%',
          top: '15%',
          width: "15%",
          height: "15%"
        },
        //欧洲
        {
          show: false,
          name: '',
          type: 'map',
          map: 'europe',
          itemStyle: itemStyle,
          silent: true,
          left: '-20%',
          top: '40%',
          width: "40%",
          height: "15%"
        }, //非洲
        {
          show: false,
          name: '',
          type: 'map',
          map: 'africa',
          itemStyle: itemStyle,
          silent: true,
          left: '7%',
          top: '60%',
          width: "8%",
          height: "15%"
        }, //主地图
        {
          show: true,
          name: '',
          type: 'map',
          map: 'china',
          silent: true,
          itemStyle: {
            normal: {
              borderColor: 'rgba(19, 105,167, 1)',
              borderWidth:.5,
              areaColor: 'rgba(0, 135,230, .4)',
            },
            emphasis: {
              areaColor: 'rgba(0, 135,230, .4)'
            }
          },
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          }

        }, //北美洲
        {
          show: false,
          name: '',
          type: 'map',
          map: 'northamerica',
          itemStyle: itemStyle,
          silent: true,
          left: '77%',
          top: '15%',
          width: "13%",
          height: "15%%"
        }, //南美洲
        {
          show: false,
          name: '',
          type: 'map',
          map: 'southamerica',
          itemStyle: itemStyle,
          silent: true,
          left: '85%',
          top: '40%',
          width: "8%",
          height: "13%"
        }, //大洋洲
        {
          show: false,
          name: '',
          type: 'map',
          map: 'oceania',
          itemStyle: itemStyle,
          silent: true,
          left: '20%',
          top: '60%',
          width: "75%",
          height: "20%"
        }
      ]

    };
    w.map.clear();
    w.map.setOption(w.mapOption);
    w.drawMap();
  },
  drawMap: function() {
    var w = this;
    var color = ['#3ab852', '#ff0000'];

    function markDirectionalLine(pairs) {
      var directions = [];
      for (var i = 0; i < pairs.length; i++) {
        var coordpair = [];
        if (typeof pairs[i] != "undefined" && typeof geoCoordMap[pairs[i]['from']] != "undefined" && typeof geoCoordMap[pairs[i]['to']] != "undefined") {
          coordpair.push(geoCoordMap[pairs[i]['from']]);
          coordpair.push(geoCoordMap[pairs[i]['to']]);
          directions.push({
            name: pairs[i]['from'] + "->" + pairs[i]['to'],
            coords: coordpair
          });
        }

      }

      w.mapOption.series.push({
        name: '',
        type: 'lines',
        zlevel: 1,
        geoIndex: 3,
        effect: {
          show: true,
          period: 0.5
        },
        lineStyle: {
          normal: {
            width: 1,
            curveness: 0.2
          }
        },
        data: directions
      });
    }

    function plotScatter(citynames) {
      var coords = [];
      for (var i = 0; i < citynames.length; i++) {
        if (typeof citynames[i] != "undefined" && typeof geoCoordMap[citynames[i]['from']] != "undefined" && typeof geoCoordMap[citynames[i]['to']] != "undefined") {
          coords.push({
            value: geoCoordMap[citynames[i]['from']],
            symbolSize: 0
          });
          coords.push({
            value: geoCoordMap[citynames[i]['to']],
            symbolSize: 0
          });
        }

      }

      w.mapOption.series.push({
        name: 'source',
        type: 'scatter',
        coordinateSystem: 'geo',
        geoIndex: 3,
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        symbolSize: 0,
        itemStyle: {
          normal: {
            borderType: 'solid',
            opacity: 0.6,
          }
        },
        data: coords
      });
    }

    var visitArr = [];
    var attackArr = [];

    $.ajaxSetup({
      async: false
    });
    var province = $('#province').val();
    $.ajax({
      type: "post",
      dataType: 'json',
      url: '/api/screen?url=lastest/web/worldMapData/list',
      data: w.param,
      success: function(json) {
        if (json.code == 0) {
          var visit = json.data.visit;
          var attack = json.data.attack;
          $.each(visit, function(k, v) {
            visitArr.push({
              from: v[0].name,
              // to: v[1].name
              to: w.clientProvince
            });
          });
  
  
          $.each(attack, function(k, v) {
            attackArr.push({
              from: v[0].name,
              // to: v[1].name
              to: w.clientProvince
            });
          });
          w.zMapAttack = attack;
  
        }
      }
    })
    // $.post('/api/screen?url=lastest/web/worldMapData/list', w.param).success(function(json) {
    //   if (json.code == 0) {
    //     var visit = json.data.visit;
    //     var attack = json.data.attack;
    //     $.each(visit, function(k, v) {
    //       visitArr.push({
    //         from: v[0].name,
    //         // to: v[1].name
    //         to: w.clientProvince
    //       });
    //     });


    //     $.each(attack, function(k, v) {
    //       attackArr.push({
    //         from: v[0].name,
    //         // to: v[1].name
    //         to: w.clientProvince
    //       });
    //     });
    //     w.zMapAttack = attack;

    //   }
    // });

    var cloneObj = function(obj) {
      var str, newobj = obj.constructor === Array ? [] : {};
      if (typeof obj !== 'object') {
        return;
      } else if (window.JSON) {
        str = JSON.stringify(obj), //系列化对象
          newobj = JSON.parse(str); //还原
      } else {
        for (var i in obj) {
          newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
        }
      }
      return newobj;
    };

    animation();

    function animation() {

      var option = cloneObj(w.mapOption);

      w.map.clear();

      function TmarkDirectionalLine(pairs, color) {
        var directions = [];
        for (var i = 0; i < pairs.length; i++) {
          var coordpair = [];
          if (typeof pairs[i] != "undefined" && typeof geoCoordMap[pairs[i]['from']] != "undefined" && typeof geoCoordMap[pairs[i]['to']] != "undefined") {
            coordpair.push(geoCoordMap[pairs[i]['from']]);
            coordpair.push(geoCoordMap[pairs[i]['to']]);
            directions.push({
              name: pairs[i]['from'] + "->" + pairs[i]['to'],
              coords: coordpair
            });
          }

        }

        option.series.push({
          name: '',
          type: 'lines',
          zlevel: 1,
          geoIndex: 3,
          effect: {
            show: true,
            period: 4.5
          },
          lineStyle: {
            normal: {
              color: color,
              width: 0,
              curveness: 0.2
            }
          },
          data: directions
        });
      }

      function TplotScatter(citynames) {
        var coords = [];
        for (var i = 0; i < citynames.length; i++) {
          if (typeof citynames[i] != "undefined" && typeof geoCoordMap[citynames[i]['from']] != "undefined" && typeof geoCoordMap[citynames[i]['to']] != "undefined") {
            coords.push({
              value: geoCoordMap[citynames[i]['from']],
              symbolSize: 0
            });
            coords.push({
              value: geoCoordMap[citynames[i]['to']],
              symbolSize: 0
            });
          }

        }

        option.series.push({
          name: 'source',
          type: 'scatter',
          coordinateSystem: 'geo',
          geoIndex: 3,
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          symbolSize: 0,
          itemStyle: {
            normal: {
              borderType: 'solid',
              opacity: 1
            }
          },
          data: coords
        });
      }

      var visit1 = [];
      var attack1 = [];

      for (var i = 0; i < 20; i++) {
        visit1.push(visitArr[Math.floor(visitArr.length * Math.random())]);
        attack1.push(attackArr[Math.floor(attackArr.length * Math.random())]);
      }

      TmarkDirectionalLine(visit1, color[0]);
      TplotScatter(visit1);

      TmarkDirectionalLine(attack1, color[1]);
      TplotScatter(attack1);

      w.map.setOption(option, true);
    }

    setInterval(animation, 10000 * 3);
  },
  time: function() {
    var w = this;

    setInterval(function() {
      var time = moment().format('YYYY年MM月DD日 HH:mm:ss dddd');
      $('.time').text(time);
    }, 1000);

  },
  viewChart: function() {
    var w = this;

    $('#viewChart').height($(window).height() * .2);
    var viewChart = echarts.init(document.getElementById('viewChart'));

    $.ajax({
      type: 'post',
      url: '/api/screen?url=lastest/web/visit_attack/countlist',
      data: w.param,
      dataType: 'json',
      success: function(json) {
        if (json.code == 0) {
          var data = json.data;
          var xAxis = [];
          if (w.param['isSingleDay']) {
            $.each(data.xAxis, function(k, v) {
              xAxis.push(v.substring(11, 16));
            })
          } else {
            xAxis = data.xAxis
          }
  
          var option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'line'
              }
            },
            legend: {
              align: 'right',
              data: ['访问次数', '攻击次数'],
              itemHeight: 6,
              itemWidth: 20,
              textStyle: {
                color: '#fff'
              }
            },
            grid: {
              left: '0',
              right: '4%',
              bottom: '2%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: [],
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
            }],
            yAxis: [{
              type: 'value',
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
            }],
            series: [{
              name: '访问次数',
              type: 'line',
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#0aefee'
                }
              },
              label: {
                normal: {
                  show: false
                }
              },
              data: []
            },
              {
                name: '攻击次数',
                type: 'line',
                symbol: 'none',
                itemStyle: {
                  normal: {
                    color: '#d6a137'
                  }
                },
                label: {
                  normal: {
                    show: false
                  }
                },
                data: []
              }
            ]
          };
          option.xAxis[0].data = xAxis;
          option.series[0].data = data.series[0].data;
          option.series[1].data = data.series[1].data;
          viewChart.setOption(option, true);
        }
  
  
      }
    })
    // $.post('/api/screen?url=lastest/web/visit_attack/countlist', w.param).success(function(json) {
    //   if (json.code == 0) {
    //     var data = json.data;
    //     var xAxis = [];
    //     if (w.param['isSingleDay']) {
    //       $.each(data.xAxis, function(k, v) {
    //         xAxis.push(v.substring(11, 16));
    //       })
    //     } else {
    //       xAxis = data.xAxis
    //     }

    //     var option = {
    //       tooltip: {
    //         trigger: 'axis',
    //         axisPointer: {
    //           type: 'line'
    //         }
    //       },
    //       legend: {
    //         align: 'right',
    //         data: ['访问次数', '攻击次数'],
    //         itemHeight: 6,
    //         itemWidth: 20,
    //         textStyle: {
    //           color: '#fff'
    //         }
    //       },
    //       grid: {
    //         left: '0',
    //         right: '4%',
    //         bottom: '2%',
    //         containLabel: true
    //       },
    //       xAxis: [{
    //         type: 'category',
    //         data: [],
    //         axisTick: {
    //           alignWithLabel: true
    //         },
    //         axisLabel: {
    //           interval: 'auto',
    //           textStyle: {
    //             color: '#fff'
    //           }
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             width: 2,
    //             color: '#162962'
    //           }
    //         }
    //       }],
    //       yAxis: [{
    //         type: 'value',
    //         name: '/次',
    //         scale: true,
    //         nameTextStyle: {
    //           color: '#fff'
    //         },
    //         axisTick: {
    //           show: false
    //         },
    //         splitLine: {
    //           show: false
    //         },
    //         axisLine: {
    //           show: false
    //         },
    //         axisLabel: {
    //           textStyle: {
    //             color: '#fff'
    //           }
    //         }
    //       }],
    //       series: [{
    //         name: '访问次数',
    //         type: 'line',
    //         symbol: 'none',
    //         itemStyle: {
    //           normal: {
    //             color: '#0aefee'
    //           }
    //         },
    //         label: {
    //           normal: {
    //             show: false
    //           }
    //         },
    //         data: []
    //       },
    //         {
    //           name: '攻击次数',
    //           type: 'line',
    //           symbol: 'none',
    //           itemStyle: {
    //             normal: {
    //               color: '#d6a137'
    //             }
    //           },
    //           label: {
    //             normal: {
    //               show: false
    //             }
    //           },
    //           data: []
    //         }
    //       ]
    //     };
    //     option.xAxis[0].data = xAxis;
    //     option.series[0].data = data.series[0].data;
    //     option.series[1].data = data.series[1].data;
    //     viewChart.setOption(option, true);
    //   }


    // })
  },
  zMap: function() {
    var w = this;

    $('.focus-contain,.focus-map').width($(window).height() * .25);
    $('.focus-contain,.focus-map').height($(window).height() * .25);
    $('#zMap').width($(window).height() * .25 - 20);
    $('#zMap').height($(window).height() * .25 - 20);
    var zMap = echarts.init(document.getElementById('zMap'));
    var data = [];

    $.each(w.zMapAttack, function(k, v) {
      if (cityCoordMap[v[0].name] != undefined&&( v[2].province!= undefined )&&( v[2].province==w.clientProvince)) {
        data.push({
          name: v[0].name,
          value: cityCoordMap[v[0].name].concat(Math.log(v[1].value))
        })

      }
    });

    zMap.setOption(w.zMapOption(data));
  },
  zMapOption: function(data) {
    var w = this;
    var option = {
      tooltip: {
        show: false,
        trigger: 'item',
        formatter: '{b}'
      },
      geo: {
        map: w.clientProvince,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#2763b4',
            borderColor: '#3874c3',
            borderWidth: 2
          },
          emphasis: {
            areaColor: '#2763b4'
          }
        },
        silent: true
      },
      series: [
        {
          name: '攻击',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          symbolSize: function(val) {
            return val[2];
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{b}',
              position: 'bottom',
              show: true
            }
          },
          layoutCenter: ['50%','50%'],
          layoutSize: '100%',
          itemStyle: {
            normal: {
              color: '#ff0000',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          //data: [{name: '台北',value:[121.5,25.03]},{name: '基隆',value:[121.73,25.13]},{name: '台中',value:[120.67,24.15]}]
          data: data
        },
        {
          name: "",
          type: 'effectScatter',
          coordinateSystem: 'geo',
          symbolSize: .5,
          label:{
            normal: {
              show: true,
              position: [5,-10],
              formatter: '{b}'
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#2763b4',
              borderColor: '#3874c3',
              borderWidth: 2
            },
            emphasis: {
              areaColor: '#ff0000'
            }
          },
          data: [
            {name: '', value: [123.142517,25.530413,.8]},
            {name: '', value: [124.661039,25.969209 ,.6]},
          ]
        }
      ]
    };
    return option;
  }


};
$(function() {
  State.init();
  var wave = 0;
  clearInterval(water);
  var water = setInterval(function() {
    $('.water-wave').css('transform', 'rotate(' + wave + 'deg)');
    wave += 1.15;
  }, 20);
});
