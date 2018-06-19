(function () {
  var __GEO__ = {
    china_province: {
      '上海': [
        121.4648, 31.2891
      ],
      '广东': [
        113.8953, 22.901
      ],
      '山东': [
        118.7073, 37.5513
      ],
      '山西': [
        111.4783, 36.1615
      ],
      '辽宁': [
        124.541, 40.4242
      ],
      '新疆': [
        87.9236, 43.5883
      ],
      '河北': [
        115.0488, 39.0948
      ],
      '甘肃': [
        103.5901, 36.3043
      ],
      '内蒙': [
        110.3467, 41.4899
      ],
      '内蒙古': [
        110.3467, 41.4899
      ],
      '北京': [
        116.4551, 40.2539
      ],
      '广西': [
        109.314, 21.6211
      ],
      '江苏': [
        118.8062, 31.9208
      ],
      '江西': [
        116.0046, 28.6633
      ],
      '福建': [
        118.1689, 24.6478
      ],
      '安徽': [
        117.29, 32.0581
      ],
      '陕西': [
        108.4131, 34.8706
      ],
      '黑龙江': [
        127.9688, 45.368
      ],
      '天津': [
        117.4219, 39.4189
      ],
      '西藏': [
        91.1865, 30.1465
      ],
      '云南': [
        102.9199, 25.4663
      ],
      '浙江': [
        119.5313, 29.8773
      ],
      '湖南': [
        113.5327, 27.0319
      ],
      '湖北': [
        114.3896, 30.6628
      ],
      '海南': [
        110.3893, 19.8516
      ],
      '青海': [
        101.4038, 36.8207
      ],
      '贵州': [
        106.6992, 26.7682
      ],
      '河南': [
        113.4668, 34.6234
      ],
      '重庆': [
        107.7539, 30.1904
      ],
      '宁夏': [
        106.3586, 38.1775
      ],
      '吉林': [
        125.8154, 44.2584
      ],
      '中国': [
        116.4551, 40.2539
      ],
      '四川': [
        103.9526, 30.7617
      ],
      '台湾': [
        121.31, 25.03
      ],
      '台北': [
        121.31, 25.03
      ],
      '高雄': [
        121.31, 25.03
      ],
      '香港': [
        114.08, 22.2
      ],
      '澳门': [
        113.33, 22.13
      ],
      '钓鱼岛': [
        123.142517, 25.530413
      ],
      '赤尾屿': [124.661039, 25.969209]
    },
    provincial_capital: {
      '北京': [
        116.4551, 40.2539
      ],
      '上海': [
        121.4648, 31.2891
      ],
      '天津': [
        117.4219, 39.4189
      ],
      '重庆': [
        107.7539, 30.1904
      ],
      '郑州': [
        113.4668, 34.6234
      ],
      '哈尔滨': [
        127.9688, 45.368
      ],
      '长春': [
        125.8154, 44.2584
      ],
      '长沙': [
        113.0823, 28.2568
      ],
      '沈阳': [
        123.1238, 42.1216
      ],
      '合肥': [
        117.29, 32.0581
      ],
      '呼和浩特': [
        111.4124, 40.4901
      ],
      '石家庄': [
        114.4995, 38.1006
      ],
      '福州': [
        119.4543, 25.9222
      ],
      '乌鲁木齐': [
        87.9236, 43.5883
      ],
      '兰州': [
        103.5901, 36.3043
      ],
      '西宁': [
        101.4038, 36.8207
      ],
      '西安': [
        109.1162, 34.2004
      ],
      '贵阳': [
        106.6992, 26.7682
      ],
      '银川': [
        106.3586, 38.1775
      ],
      '济南': [
        117.1582, 36.8701
      ],
      '太原': [
        112.3352, 37.9413
      ],
      '武汉': [
        114.3896, 30.6628
      ],
      '南京': [
        118.8062, 31.9208
      ],
      '南宁': [
        108.479, 23.1152
      ],
      '南昌': [
        116.0046, 28.6633
      ],
      '成都': [
        103.9526, 30.7617
      ],
      '昆明': [
        102.9199, 25.4663
      ],
      '拉萨': [
        91.1865, 30.1465
      ],
      '杭州': [
        119.5313, 29.8773
      ],
      '广州': [
        113.5107, 23.2196
      ],
      '海口': [110.3893, 19.8516]
    },
    "geoCoordMap": {
      'northAmerica': [
        147.0742, 50.8753
      ],
      'southAmerica': [
        153.5722, 40.1345
      ],
      'oceania': [
        148.3652, 29.4056
      ],
      'asia': [
        53.4195, 50.8677
      ],
      'europe': [
        57.2734, 39.8292
      ],
      'africa': [59.0390, 30.3858]
    }
  }
  var __PROVINCES__ = [
    '浙江',
    '广东',
    '山东',
    '山西',
    '辽宁',
    '新疆',
    '河北',
    '甘肃',
    '内蒙古',
    '北京',
    '广西',
    '江苏',
    '四川',
    '江西',
    '福建',
    '安徽',
    '陕西',
    '黑龙江',
    '天津',
    '西藏',
    '云南',
    '湖南',
    '湖北',
    '海南',
    '青海',
    '贵州',
    '河南',
    '重庆',
    '宁夏',
    '吉林',
    '上海'
  ];
  var domain_title = {};
  var _thresholds = {
    flow_max: 200, //流量带宽的值
    flow_mid: [
      60, 80
    ], //CC攻击的阈值 flow_mid[1]M以上告警
    remainDangerSeverity: 4, //残余风险的定义级别(多少级以上定义为残余风险)
    cpu_danger: 80, //主机健康cpu阈值
    memory_danger: 80 //主机健康内存阈值
  };
  var _intervals = {
    modalDisplay: 5 *1000, //弹出层的消失时间
    availRefresh: 30 *1000, //可用性刷新时间
    mapRefresh: 15 *1000, //地图刷新时间
    lineChartRefresh: 60 *1000, //折线图刷新时间
    lineTabChange: 60 *1000, //这线图中的流量视角和访问攻击量视角切换时间
    visitAreaRankRefresh: 60 *1000, //访问排行的刷新时间
    attackIpRankRefresh: 60 *1000, //攻击IP排行的刷新时间
    attackUrlRankRefresh: 60 *1000, //受攻击URL排行的刷新时间
    sortInterval: 500, //排行榜的排序间隔
    flowRealTimeRefresh: 60 *1000, //顶部流量的刷新时间
    flowRealTimeToggle: 3000, //顶部流量的切换时间
    hostHealthRefresh: 10 *1000, //cpu和memory的刷新时间
    todayVisitAndAttackCountRefresh: 10 *1000, //当天整体的访问量和攻击量的刷新事件
    useAttackRefresh: 60 *1000,
    alertModalRefresh: 60 *1000 //告警刷新时间
  };
  var lineColor = {
    0: 'red',
    1: 'orange',
    2: 'yellow'
  };
  var attackLevel = {
    0: {
      text: '低',
      color: 'yellow'
    },
    1: {
      text: '低',
      color: 'yellow'
    },
    2: {
      text: '低',
      color: 'yellow'
    },
    3: {
      text: '低',
      color: 'yellow'
    },
    4: {
      text: '中',
      color: 'orange'
    },
    5: {
      text: '中',
      color: 'orange'
    },
    6: {
      text: '中',
      color: 'orange'
    },
    7: {
      text: '中',
      color: 'orange'
    },
    8: {
      text: '高',
      color: 'red'
    },
    9: {
      text: '高',
      color: 'red'
    },
    10: {
      text: '高',
      color: 'red'
    },
    11: {
      text: '高',
      color: 'red'
    },
    12: {
      text: '高',
      color: 'red'
    }

  }
  var layAlert = function (msg, type) {
    layer.msg(msg, {
      icon: type, //0警告1成功2失败
      offset: '15%',
      move: false,
      resize: false,
      title: false,
      time: 2000
    })
  };
  var WebMonitor = {
    init: function () {
      var that = this;
      if (window.location.href.indexOf('domain=') != -1) {
        this.domain = window
          .location
          .href
          .split('domain=')[1];
      }
      this.clientModel = 0;
      this.ddosModel = 1;
      this.clientDomain = '';
      this.clientProvince = '浙江';
      $.ajax({
        type: "post",
        dataType: 'json',
        async: false,
        url: '/api/config',
        success: function (json) {
          if (json.code == 0) {
            that.clientDomain = json.data.clientDomain;
            that.clientProvince = json.data.clientProvince;
          }
        }

      });
      view
        .init
        .call(this);
      scoller
        .init
        .call(this);
      echartsDraw
        .init
        .call(this);
    }

  };
  var view = {
    init: function () {
      var w = this;
      var width = $(window).width();
      var height = $(window).height();
      $('#mapVail').height(height * .175); // 网站可用性

      $('#attackLine').height(height * .3); // 网站攻击趋势
      $('#flowLine').height(height * .3); // 网站流量趋势
      $('#risk').height(height * .175); // 安全告警信息
      //$('#attackInfo').height(height * .175);//

      $('#info-grid').height(height * .22); // 攻击信息滚动table

      // 组成世界地图
      $('.map').height(height * .385);
      $('#chinaMap').width(width * .5);
      $('#chinaMap').height(height * .35);
      $('#asia, #africa, #europe, #northAmerica, #southAmerica').width(width * .15);
      $('#asia, #africa, #europe, #northAmerica, #southAmerica').height(height * .15);
      $('#oceania').width(width * .2);
      $('#oceania').height(height * .2);

      //$('#shenzhen').width(width * .06); $('#shenzhen').height(height * .06); 自适应

      $('.avail').height(height * .244); // 服务质量 安全告警
      $('.attackUrl').height(height * .28);
      $('.visitArea').height(height * .311); // 区域访问排行 攻击url排行
      $('.visitIp, .analyze').height(height * .35); // 访问ip排行 分析

      $('.hole').height(height * .275);

      $('.map-main').height(height * .61); // 信息攻击table
      $('.attack').height(height * .3); // 网站攻击趋势
    }

  };
  var scoller = {
    init: function () {
      var w = this;
      $.ajax({
        type: "post",
        dataType: 'json',
        async: false,
        url: '/api/site/list',
        success: function (json) {
          if (json) {
            $
              .each(json.data.items, function (k, v) {
                domain_title[v.domain] = v.sitename;
              })
          }

        }

      });
      if (w.clientModel == 0) {
        $('.box-title2').text('访问区域排行');
        $('#grid-thead').html('<thead><th>时间</th><th>地区/源IP</th><th>攻击域名</th><th>攻击URL</th><th>攻击类型</th><th>风险等' +
          '级</th></thead>');
        $('.visitArea .box-body').html('<div id="areaRank"><table class="grid grid-rank"><tbody></tbody></table></div>');
        scoller
          .visitareaTopN
          .call(w);
      }
      if (w.clientModel == 1) {
        $('#info-grid').addClass('grid-ip');
        $('#grid-thead').html('<thead><th>时间</th><th>IP</th><th>访问网站</th><th>访问URL</th><th>异常类型</th><th>风险等级</t' +
          'h></thead>');
        $('.box-title2').text('访问网站排行');
        $('.visitArea .box-body').html('<div id="visitSite"><table class="grid grid-rank"><tbody></tbody></table></div>');
        scoller
          .visitWebTopN
          .call(w);
      }
      scoller
        .visitIpTopN
        .call(w);
      var title = $('.header .title span').text();
      if (w.domain == 'all') {
        scoller
          .attackSiteTopN
          .call(w);
        $(".box-title4").text("攻击网站排行");
        $('.header .title span').text(w.clientDomain)
      } else {
        scoller
          .attackUrlTopN
          .call(w);
        $(".box-title4").text("攻击URL排行");
        $('.header .title span').text(domain_title[title] || w.domain)
      }

      scoller
        .attackType
        .call(w);
      scoller
        .attackIpTopN
        .call(w);
      scoller
        .header_visit_count
        .call(w);
      scoller
        .realList
        .call(w);
      scoller
        .alertModal
        .call(w);

      // scoller.useAttack.call(w);
    },
    visitareaTopN: function () {
      var w = this;
      $("tbody", $('#areaRank')).itemScoller({
        ajaxUrl: '/api/screen?url=topN/web/visit/area&domain=' + w.domain,
        // items:"dataList",
        key: "area",
        value: "num",
        refresh_interval: _intervals.visitAreaRankRefresh, //刷新间隔
        interval: _intervals.sortInterval, //排序间隔
        draw: function (index, item, json) {
          if (item.num != ' ') {
            var el = $('<tr style="display: block;"><td><img src="../../screen/img/screen/flag/' + __function__.getFlag(item.area) + '.png" /></td><td>' + item.area + '</td><td class="people"></td><td class="count"><span class="pecent">' + item.num + '</span></td></tr>');
            var peopeCount = Math.floor(item.percent / 10);
            console.info(peopeCount)
            for (var i = 1; i <= 10; i++) {
              var color = i <=peopeCount
                ? "male-color"
                : "";
              $(".people", el).append('<i class="fa fa-male ' + color + '"></i>');
            }
            return el;
          }
        },
        compare: function (v1, v2) {
          return v2 > v1
            ? true
            : false; //降序排列
        },
        /*vauleScoller:function(line,start,end,prev,current){
         var o=$(".pecent",line);
         var _start=0;
         console.info(prev,current)
         if(prev){
         _start=start*100/(prev.size);
         }
         startCount(o,{
         from:_start,
         to:end*100/(current.size),
         speed:_intervals.visitAreaRankRefresh-5000,
         formatter: function(b, a) {
         return b.toFixed(2);
         }
         });
         }*/
        vauleScoller: function (line, start, end) {
          var o = $("td:eq(3)", line);
          startCount(o, {
            from: start,
            to: end,
            speed: _intervals.visitAreaRankRefresh - 5000,
            formatter: function (b, a) {
              return Number(b).toFixed(0);
            }
          });

        }

      });
    },
    visitWebTopN: function () {
      var w = this;
      $("tbody", $('#visitSite')).itemScoller({
        ajaxUrl: '/api/screen?url=topN/web/visit/destHostName&domain=' + w.domain,
        // items:"dataList",
        key: "ip",
        value: "count",
        refresh_interval: _intervals.visitUrlRankRefresh, //刷新间隔
        interval: _intervals.sortInterval, //排序间隔
        //auto_refresh:false,
        draw: function (index, item, json) {
          if (item.num != ' ') {
            var el = $('<tr style="display: block;"><td><i class="index">' + (++index) + '</i></td><td>' + item.count + '</td><td>' + item.destHostName + '</td></tr>');
            return el;
          }
        },
        compare: function (v1, v2) {
          return v2 - v1 > 0
            ? true
            : false;
        },
        vauleScoller: function (line, start, end) {
          var o = $("td:eq(3)", line);
          startCount(o, {
            from: start,
            to: end,
            speed: _intervals.attackIpRankRefresh - 5000,
            formatter: function (b, a) {
              return b.toFixed(0);
            }
          });

        }
      });
    },
    visitIpTopN: function () {
      var w = this;
      $("tbody", $('#visitIp')).itemScoller({
        ajaxUrl: '/api/screen?url=topN/web/visit/ip&domain=' + w.domain,
        // items:"dataList",
        key: "ip",
        value: "num",
        refresh_interval: _intervals.attackIpRankRefresh, //刷新间隔
        interval: _intervals.sortInterval, //排序间隔
        draw: function (index, item, json) {
          if (item.num != ' ') {
            var area = item
              .area
              .replace('省', '')
              .replace('市', '');
            var el = $('<tr style="display: block"><td><img src="../../screen/img/screen/flag/' + __function__.getFlag(area) + '.png" /></td><td>' + item.area + '</td><td><div class="progress" style="margin-bottom: 0;"><div class="progress-ba' +
              'r"  style="width: ' + item.percent + '%;"><span>' + item.ip + '</span></div></div></td><td>' + Number(item.num) + '</td></tr>');
            return el;
          }
        },
        compare: function (v1, v2) {
          return v2 - v1 > 0
            ? true
            : false;
        },
        vauleScoller: function (line, start, end) {
          var o = $("td:eq(3)", line);
          startCount(o, {
            from: start,
            to: end,
            speed: _intervals.attackIpRankRefresh - 5000,
            formatter: function (b, a) {
              return Number(b).toFixed(0);
            }
          });

        }
      });
    },
    attackIpTopN: function () {
      var w = this;
      $("tbody", $('#attackIp')).itemScoller({
        ajaxUrl: '/api/screen?url=topN/web/attack/ip&domain=' + w.domain,
        // items:"dataList",
        key: "ip",
        value: "num",
        refresh_interval: _intervals.attackIpRankRefresh, //
        interval: _intervals.sortInterval, //
        //auto_refresh:false,
        draw: function (index, item, json) {
          if (item.num != ' ') {
            var area = item
              .area
              .replace('省', '')
              .replace('市', '');
            var el = $('<tr style="display: block"><td><img src="../../screen/img/screen/flag/' + __function__.getFlag(area) + '.png" /></td><td>' + item.area + '</td><td><div class="progress" style="margin-bottom: 0;"><div class="progress-ba' +
              'r"  style="width: ' + item.percent + '%;"><span>' + item.ip + '</span></div></div></td><td>' + Number(item.num) + '</td></tr>');
            return el;
          }
        },
        compare: function (v1, v2) {
          return v2 - v1 > 0
            ? true
            : false;
        },
        vauleScoller: function (line, start, end) {
          var o = $("td:eq(3)", line);
          startCount(o, {
            from: start,
            to: end,
            speed: _intervals.attackIpRankRefresh - 5000,
            formatter: function (b, a) {
              return b.toFixed(0);
            }
          });

        },
        externals: [function (prev, current) {
          w.ccIps = current.dataList;
        }
        ]
      });
    },
    attackUrlTopN: function () {
      var w = this;
      $("tbody", $('#attackUrl')).itemScoller({
        ajaxUrl: '/api/screen?url=topN/web/attack/url&domain=' + w.domain,
        // items:"dataList",
        key: "link",
        value: "num",
        refresh_interval: _intervals.attackUrlRankRefresh, //刷新间隔
        interval: _intervals.sortInterval, //排序间隔
        draw: function (index, item, json) {
          if (item.num != ' ') {
            var el = $('<tr style="display: block;"><td><i class="index">' + (++index) + '</i></td><td>' + item.num + '</td><td>' + item.link + '</td></tr>');
            return el;
          }

        },
        compare: function (v1, v2) {
          return v2 > v1
            ? true
            : false; //降序排列
        },
        afterSort: function (lines) {
          var i = 0;
          $.each(lines, function (i, line) {
            $(".index", $(line)).text(++i);
          });

        },
        vauleScoller: function (line, start, end) {
          var o = $("td:eq(1)", line);
          startCount(o, {
            from: start,
            to: end,
            speed: _intervals.attackUrlRankRefresh - 5000,
            formatter: function (b, a) {
              return b.toFixed(0);
            }
          });

        },
        externals: [function (prev, current) {
          w.ccUrls = current.dataList;
        }
        ]

      });
    },
    //攻击网站排行
    attackSiteTopN: function () {
      var w = this;
      $("tbody", $('#attackUrl')).itemScoller({
        ajaxUrl: '/api/screen?url=mirror/web/domainattack/list&domain=' + w.domain,
        // items:"dataList",
        key: "link",
        value: "num",
        refresh_interval: _intervals.attackUrlRankRefresh, //刷新间隔
        interval: _intervals.sortInterval, //排序间隔
        draw: function (index, item, json) {
          if (item.num != ' ' && item.num != 0) {
            var title = domain_title[item.link] || "-";
            var el = $('<tr style="display: block; cursor:pointer;" domain="' + item.link + '"><td><i class="index">' + (++index) + '</i></td><td>' + item.num + '</td><td>' + item.link + '</td><td>' + title + '</td></tr>');
            return el;
          }
        },
        compare: function (v1, v2) {
          return v2 > v1
            ? true
            : false; //降序排列
        },
        afterSort: function (lines) {
          var i = 0;
          $.each(lines, function (i, line) {
            $(".index", $(line)).text(++i);
          });
        },
        vauleScoller: function (line, start, end) {
          var o = $("td:eq(1)", line);
          startCount(o, {
            from: start,
            to: end,
            speed: _intervals.attackUrlRankRefresh - 5000,
            formatter: function (b, a) {
              return b.toFixed(0);
            }
          });

        },
        externals: [function (prev, current) {
          w.ccUrls = current.dataList;
        }
        ]

      });
    },
    attackType: function () {
      var w = this;
      $("tbody", $('#hole-type')).itemScoller({
        ajaxUrl: '/api/screen?url=topN/web/attack/type&domain=' + w.domain,
        // items:"dataList",
        key: "type",
        value: "num",
        refresh_interval: _intervals.attackUrlRankRefresh, //刷新间隔
        interval: _intervals.sortInterval, //排序间隔
        draw: function (index, item, json) {
          if (item.num != ' ') {
            var el = $('<tr style="display: block;"><td ><i class="index">' + (++index) + '</i></td><td>' + item.num + '</td><td>' + item.type + '</td><td>' + item.riskLevel + '</td></tr>');
            return el;
          }

        },
        compare: function (v1, v2) {
          return v2 > v1
            ? true
            : false; //降序排列
        },
        afterSort: function (lines) {
          var i = 0;
          $.each(lines, function (i, line) {
            $(".index", $(line)).text(++i);
          });

        },
        vauleScoller: function (line, start, end) {
          var o = $("td:eq(1)", line);
          startCount(o, {
            from: start,
            to: end,
            speed: _intervals.attackUrlRankRefresh - 5000,
            formatter: function (b, a) {
              return b.toFixed(0);
            }
          });

        },
        externals: [function (prev, current) {
          //w.ccUrls=current.dataList;
        }
        ]

      });
    },
    header_visit_count: function () {
      var w = this;
      var start = function () {
        $.ajax({
          type: 'post',
          url: '/api/screen?url=lastest/web/total/counter',
          dataType: 'json',
          data: {"domain": w.domain},
          success: function (json) {
            var data = json.data.value;
            var visitStart = w.todayVisitPrev || 0;
            if (data && data.visitNum) {
              if (visitStart < 0) {
                $(".areaCount").text(__function__.numFormat(data.visitNum));
              } else {
                if (data.visitNum > visitStart) {
                  __function__
                    .numScoller
                    .call(w, $(".areaCount"), visitStart, data.visitNum);
                } else {
                  $(".areaCount").text(__function__.numFormat(data.visitNum));
                }
              }
              w.todayVisitPrev = data.visitNum;
            }

            //------
            var attackStart = w.todayAttackPrev || 0;
            if (data && data.attackNum) {
              if (attackStart < 0) {
                $(".ipCount").text(__function__.numFormat(data.attackNum));
              } else {
                if (json.data.attackNum > attackStart) {
                  __function__
                    .numScoller
                    .call(w, $(".ipCount"), attackStart, data.attackNum);
                } else {
                  $(".ipCount").text(__function__.numFormat(data.attackNum));
                }
              }
              w.todayAttackPrev = data.attackNum;
            }
            //---
            if (data.exportNum) {
              data.exportNum = (data.exportNum / 1024 / 1024).toFixed(2);
            }
            var flowOutStart = w.todayFlowOut || 0;
            if (data.exportNum > 1024) {
              data.exportNum = (data.exportNum / 1024).toFixed(2);
              $(".flow_out_count")
                .next("span")
                .text("GB");
            }
            if (data.exportNum > flowOutStart) {
              __function__
                .flowScoller
                .call(w, $(".flow_out_count"), flowOutStart, data.exportNum);
            } else {
              $(".flow_out_count").text(__function__.numFormat(data.exportNum));
            }

            w.todayFlowOut = json.data.exportNum;
            //--
            if (w.ddosModel == 0) {
              $.ajax({
                url: __ROOT__ + "/Home/Screen/ddosIO",
                type: 'post',
                dataType: 'json',
                async: false,
                success: function (json) {
                  if (json.code) {
                    w.ddosValue = json.thresholdValue;
                    $('#ddosNum').val(w.ddosValue);
                    $('.ddosValue').text(w.ddosValue)
                  }
                }
              });
              if (data.importNum > w.ddosValue * 1024 * 1024) {
                $('.ddosValue').val(w.ddosValue);
                $('#myModal').modal('show');
                setTimeout(function () {
                  $('#myModal').modal('hide');
                }, 5000);
              }
            }

            if (data.importNum) {
              data.importNum = (data.importNum / 1024 / 1024).toFixed(2);
            }
            var flowInStart = w.todayFlowIn || 0;
            if (data.importNum > 1024) {
              data.importNum = (data.importNum / 1024).toFixed(2);
              $(".flow_in_count")
                .next("span")
                .text("GB");
            }
            if (data.importNum > flowInStart) {
              __function__
                .flowScoller
                .call(w, $(".flow_in_count"), Number(flowInStart), data.importNum);
            } else {
              $(".flow_in_count").text(__function__.numFormat(data.importNum));
            }
            w.todayFlowIn = data.importNum;

          }
        })
      };
      start();
      setInterval(start, _intervals.todayVisitAndAttackCountRefresh);
    },
    useAttack: function () {
      var w = this;

      //    有效攻击

      var tbody = $('#useAttack tbody');

      var start = function () {
        var i = 1;
        tbody.html('');
        $.ajax({
          type: 'post',
          url: '/api/lastest/web/item/list',
          dataType: 'json',
          data: {
            'keys': w.domain,
            "points": 30
          },
          success: function (json) {
            if (json && json.code && json.data.attack) {
              var data = json
                .data
                .attack
                .reverse();
              $.each(data, function (k, v) {
                if (v.warning == '3') {
                  var srcRegion = v.srcGeoRegion;
                  if (srcRegion.length > 3) {
                    srcRegion = srcRegion.substr(0, 3);
                  }
                  var protocal = v.name || v.appProtocol;
                  if (protocal.indexOf('扫描目录') == 0) {
                    protocal = '扫描目录';
                  }

                  var tr = $("<tr><td>" + __function__.formatTime(v.collectorReceiptTime) + "</td><td>" + v.srcAddress + "</td><td>" + (spec[v.srcAddress]
                      ? spec[v.srcAddress]
                      : srcRegion) + "</td><td>" + v.destHostName + v.requestUrl + "</td><td>" + protocal + "</td><td>" + (attackLevel[v.severity]['text'] || "低") + "</td></tr>");
                  tbody.append(tr);
                  i++;
                  if (i > 3) {
                    return false;
                  }
                }

              })
            }

          }
        })
      }
      start();
      setInterval(start, _intervals.useAttackRefresh);
    },
    realList: function () {
      var w = this;
      var start = function () {
        $(".waf-items").html("");
        $.ajax({
          type: 'post',
          url: '/api/screen?url=lastest/web/item/list',
          dataType: 'json',
          data: {
            domain: w.domain
          },
          success: function (json) {
            $
              .each(json.data, function (k, v) {
                if (v.attackUrl && v.attackUrl != ' ') {
                  var url = v.attackUrl;
                  url = url
                    .replace("<", "&lt;")
                    .replace(">", "&gt;")
                    .replace("'", "");
                  var tr = $("<tr><td>" + v.time + "</td><td>" + v.attackSource + "</td><td>" + v.attacked + "</td><td>" + url + "</td><td>" + v.attackType + "</td><td>" + v.riskLevel + "</td></tr>");
                  var time = moment(moment().format('YYYY-MM-DD') + ' ' + v.time).unix();
                  var now = moment(moment().format('YYYY-MM-DD HH:mm:ss')).unix();
                  if (now - time >= 30 * 60) {
                    $("td", tr).css("color", 'grey');
                  } else {
                    $("td", tr).css("color", 'orange');
                  }
                  tr.appendTo($(".waf-items"));
                }

              })

          }
        })
      }
      start();
      setInterval(start, _intervals.useAttackRefresh);

    },
    alertModal: function () {
      var w = this;
      var start = function () {
        $.ajax({
          type: 'post',
          url: '/es/alarmPopup',
          data: {
            destHostName: w.domain
          },
          dataType: 'json',
          success: function (json) {
            var modalFlag = w.key || 0;
            if (json.code) {
              var ipData = json.attackers,
                urlData = json.attackUrl;
              $('.ip-grid thead tr').html(' ');
              $('.ip-grid tbody').html(' ');
              $('.url-grid thead tr').html(' ');
              $('.url-grid tbody').html(' ');
              if (ipData != null) {
                $
                  .each(ipData.tableth, function (i, item) {
                    $('.ip-grid thead tr').append('<th>' + item + '</th>')
                  });
                $.each(ipData.data, function (i, item) {
                  var title = item.value
                  if(title&&title!=''&&title.indexOf('</a>')!= -1){
                    title = title.split('</a>')[0].split('>')[1]
                  }
                  var color = item.value==undefined?'style="color:#0b73de"':''
                  var tr = item.value==undefined?'':'<td title="'+title+'">' + item.value + '</td>' ;
                  $('.ip-grid tbody').append('<tr key="' + item.isFirst + '">' +
                    '<td '+color+'>' + item.srcAddress + '</td>' +
                    '<td>' + item.srcArea + '</td>' +
                    tr+
                    '</tr>')
                });
              }
              if (urlData != null) {
                $
                  .each(urlData.tableth, function (i, item) {
                    $('.url-grid thead tr').append('<th>' + item + '</th>')
                  });
                $.each(urlData.data, function (i, item) {
                  $('.url-grid tbody').append('<tr><td>' + item.ip + '</td><td>' + item.url + '</td><td>' + item.urlValue + '</td></tr>')
                });
              }
              $('.modal-title').text(json.warningTypeCN);
              $('.modal-time').text(json.mprocessTime);
              $('.principle').html(json.principle);
              w.key = json.processTimeStamp;
              if (modalFlag < w.key) {
                $('#alertModal').modal('show');
                clearTimeout(time);
                var time = setTimeout(function () {
                  $('#alertModal').modal('hide');
                }, 1000 * 10);
              }

            }

          }
        })
        // $
        //   .post('/es/alarmPopup', {destHostName: w.domain})
        //   .success(function (json) {
        //     var modalFlag = w.key || 0;
        //     if (json.code) {
        //       var ipData = json.attackers,
        //         urlData = json.attackUrl;
        //       $('.ip-grid thead tr').html(' ');
        //       $('.ip-grid tbody').html(' ');
        //       $('.url-grid thead tr').html(' ');
        //       $('.url-grid tbody').html(' ');
        //       if (ipData != null) {
        //         $
        //           .each(ipData.tableth, function (i, item) {
        //             $('.ip-grid thead tr').append('<th>' + item + '</th>')
        //           });
        //         $.each(ipData.data, function (i, item) {
        //           $('.ip-grid tbody').append('<tr key="' + item.isFirst + '"><td>' + item.srcAddress + '</td><td>' + item.srcArea + '</td><td>' + item.value + '</td></tr>');
        //         });
        //       }
        //       if (urlData != null) {
        //         $
        //           .each(urlData.tableth, function (i, item) {
        //             $('.url-grid thead tr').append('<th>' + item + '</th>')
        //           });
        //         $.each(urlData.data, function (i, item) {
        //           $('.url-grid tbody').append('<tr><td>' + item.ip + '</td><td>' + item.url + '</td><td>' + item.urlValue + '</td></tr>')
        //         });
        //       }
        //       $('.modal-title').text(json.warningTypeCN);
        //       $('.modal-time').text(json.mprocessTime);
        //       $('.principle').html(json.principle);
        //       w.key = json.processTimeStamp;
        //       if (modalFlag < w.key) {
        //         $('#alertModal').modal('show');
        //         clearTimeout(time);
        //         var time = setTimeout(function () {
        //           $('#alertModal').modal('hide');
        //         }, 1000 * 10);
        //       }

        //     }

        //   });
      };
      start();
      setInterval(start, _intervals.alertModalRefresh);
    }

  }
  var echartsDraw = {
    init: function () {
      var w = this;
      echartsDraw
        .initView
        .call(w, function (ec) {

          echartsDraw
            .availMap
            .call(w);
          echartsDraw
            .chart_line
            .call(w);
          echartsDraw
            .continents
            .call(w, ec);
          echartsDraw
            .chinaMap
            .call(w);
          echartsDraw
            .chinaMapLines
            .call(w);
        });
      echartsDraw
        .attackScoller
        .call(w, 'info');
    },
    initView: function (callback) {
      var w = this;
      require.config({
        paths: {
          echarts: '../../screen/js/plugins/echarts2.0/dist'
        }
      });
      require([
        'echarts', 'echarts/chart/map', 'echarts/chart/line'
      ], function (ec) {
        var ecConfig = require('echarts/config');
        w.mapVail = ec.init(document.getElementById('mapVail'));

        w.attack = ec.init(document.getElementById('attackLine'));
        w.flow = ec.init(document.getElementById('flowLine'));
        //中间的世界地图
        w.chinaMap = ec.init(document.getElementById('chinaMap'));
        callback && callback.call(w, ec);
      });
    },
    availMap: function () {
      var w = this;
      var option = {
        tooltip: {
          trigger: 'item'
        },
        dataRange: {
          show: true,
          textStyle: {
            color: '#eee'
          },
          x: -10,
          y: 'bottom',
          calculable: false,
          "splitList": [
            {
              "end": 0,
              "label": "无访问记录",
              "color": "#95a3cb"
            }, {
              "start": 0,
              "end": "1000",
              "label": "0-0.1w",
              "color": "#60a9c8"
            }, {
              "start": "1000",
              "end": "10000",
              "label": "0.1w-1w",
              "color": "#0e90ff"
            }, {
              "start": "10000",
              "end": "100000",
              "label": "1w-10w",
              "color": "#3d56a7"
            }, {
              "start": "1000000",
              "label": ">10w",
              "color": "#1c327a"
            }
          ]
        },
        series: [
          {
            type: 'map',
            mapType: 'china',
            name: '访问量',
            hoverable: false,
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                borderColor: '#001320',
                borderWidth: 0.5,
                areaStyle: {
                  color: '#95a3cb'
                }
              }
            },
            data: [],
            geoCoord: []
          },
          {
            name: '',
            type: 'map',
            mapType: 'china',
            data: [],
            geoCoord: [],
            tooltip: {
              show: false
            },
            markPoint: {
              symbol: 'circle',
              symbolSize: 1,
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  borderColor: '#95a3cb',
                  borderWidth: 0.5,
                  areaStyle: {
                    color: '#95a3cb'
                  }
                },
                emphasis: {
                  label: {
                    show: false
                  }
                }
              },
              data: [
                {
                  name: '钓鱼岛',
                  value: .03
                }, {
                  name: '赤尾屿',
                  value: .02
                }

              ]
            }
          }

        ]
      };
      var start = function () {
        $.ajax({
          type: 'post',
          url: '/api/screen?url=topN/web/visit/mapArea',
          data: {
            domain: w.domain
          },
          dataType: 'json',
          success: function (json) {
            var json = json.data;
            option.series[0].data = json['hotdata'];
            var geoCoord = $.extend(json['geoCoordMap'], {
              '钓鱼岛': [
                123.142517, 25.530413
              ],
              '赤尾屿': [124.661039, 25.969209]
            })
            option.series[1].geoCoord = geoCoord;
            option.dataRange.splitList = json['visualMap']['splitList'];
            w.mapVail.setOption(option);
          }
        })
      };
      start();
      setInterval(start, _intervals.availRefresh);
    },
    chart_line: function () {
      var w = this;
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          y: 20,
          data: ['访问次数', '攻击次数']
        },
        grid: {
          borderWidth: 0,
          x: '10%'
        },
        calculable: false,
        xAxis: [
          {
            type: 'category',
            name: '/分钟',
            boundaryGap: true,
            // boundaryGap: false,
            axisLabel: { //坐标轴文本
              show: true,
              /*formatter : function(s) {
               return s.slice(13, 21);
               },*/
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            },
            axisLine: { // 坐标轴线
              show: true
            },
            axisTick: { //坐标轴小标记
              show: true
            },
            splitLine: { // 网格线
              show: false
            },
            data: []

          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '/次',
            axisLabel: { //坐标轴文本
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            },
            axisLine: { // 坐标轴线
              show: true
            },
            axisTick: { //坐标轴小标记
              show: true
            },
            splitLine: { // 网格线
              show: false,
              lineStyle: {
                type: 'dashed'
              }
            }

          }
        ],
        series: [
          {
            name: '访问次数',
            type: 'line',
            dataFilter: 'nearst',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: 'green'
              }

            }

          }, {
            name: '攻击次数',
            type: 'line',
            dataFilter: 'nearst',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: 'red'
              }

            }

          }
        ]

      };
      var option2 = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          y: 20,
          data: ['输入流量', '输出流量']
        },
        grid: {
          borderWidth: 0
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisLabel: { //坐标轴文本

              /* formatter : function(s) {
               return s.slice(13, 21);
               },*/
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            },
            axisLine: { // 坐标轴线
              show: true
            },
            axisTick: { //坐标轴小标记
              show: true
            },
            splitLine: { // 网格线
              show: false
            },
            data: []

          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '/M',
            axisLabel: { //坐标轴文本
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            },
            axisLine: { // 坐标轴线
              show: true
            },
            axisTick: { //坐标轴小标记
              show: true
            },
            splitLine: { // 网格线
              show: false,
              lineStyle: {
                type: 'dashed'
              }
            }

          }
        ],
        series: [
          {
            name: '输入流量',
            type: 'line',
            dataFilter: 'nearst',
            symbol: 'none',
            data: []
          }, {
            name: '输出流量',
            type: 'line',
            dataFilter: 'nearst',
            symbol: 'none',
            data: []
          }
        ]

      };
      var start = function () {
        $.ajax({
          type: 'post',
          url: '/api/screen?url=lastest/web/visit_attack/countlist',
          data: {
            domain: w.domain
          },
          dataType: 'json',
          success: function (json) {
            var json = json.data;
            var visitMap = json.visit || {};
            var attackMap = json.attack || {};
            var xAxis = [];
            $.each(json.xAxis, function (k, v) {
              xAxis.push(v.split(" ")[1]);
            });

            xAxis.sort(); //more than needed
            var visit = __function__.mapset(visitMap, false);
            var attack = __function__.mapset(attackMap, false);

            option.series[0].data = json.series[0].data;
            option.series[1].data = json.series[1].data;
            option.xAxis[0].data = xAxis;

            w
              .attack
              .setOption(option);
          }
        })
        // $
        //   .post('/api/screen?url=lastest/web/visit_attack/countlist', {domain: w.domain})
        //   .success(function (json) {
        //     var json = json.data;
        //     var visitMap = json.visit || {};
        //     var attackMap = json.attack || {};
        //     var xAxis = [];
        //     $.each(json.xAxis, function (k, v) {
        //       xAxis.push(v.split(" ")[1]);
        //     });

        //     xAxis.sort(); //more than needed
        //     var visit = __function__.mapset(visitMap, false);
        //     var attack = __function__.mapset(attackMap, false);

        //     option.series[0].data = json.series[0].data;
        //     option.series[1].data = json.series[1].data;
        //     option.xAxis[0].data = xAxis;

        //     w
        //       .attack
        //       .setOption(option);
        //   });
        $.ajax({
          type: 'post',
          url: '/api/screen?url=lastest/web/flow/countlist',
          data: {
            domain: w.domain
          },
          dataType: 'json',
          success: function (json) {

            var json = json.data;
            var xAxis = [];
            $.each(json.xAxis, function (k, v) {
              xAxis.push(__function__.formatTime(v));
            });
            var flowIn = json.series[0].data || [];
            var flowOut = json.series[1].data || [];
            for (var i = 0; i < flowIn.length; i++) {
              flowIn[i] = (flowIn[i] / 1024 / 1024).toFixed(2);
            }
            for (var i = 0; i < flowOut.length; i++) {
              flowOut[i] = (flowOut[i] / 1024 / 1024).toFixed(2);
            }
            option2.series[0].data = flowIn;
            option2.series[1].data = flowOut;
            option2.xAxis[0].data = xAxis;
            w
              .flow
              .setOption(option2);

          }
        })
        // $
        //   .post('/api/screen?url=lastest/web/flow/countlist', {domain: w.domain})
        //   .success(function (json) {

        //     var json = json.data;
        //     var xAxis = [];
        //     $.each(json.xAxis, function (k, v) {
        //       xAxis.push(__function__.formatTime(v));
        //     });
        //     var flowIn = json.series[0].data || [];
        //     var flowOut = json.series[1].data || [];
        //     for (var i = 0; i < flowIn.length; i++) {
        //       flowIn[i] = (flowIn[i] / 1024 / 1024).toFixed(2);
        //     }
        //     for (var i = 0; i < flowOut.length; i++) {
        //       flowOut[i] = (flowOut[i] / 1024 / 1024).toFixed(2);
        //     }
        //     option2.series[0].data = flowIn;
        //     option2.series[1].data = flowOut;
        //     option2.xAxis[0].data = xAxis;
        //     w
        //       .flow
        //       .setOption(option2);

        //   });
      };
      start();
      setInterval(start, _intervals.todayVisitAndAttackCountRefresh);
    },
    continents: function (ec) {
      var continents = [
        'asia',
        'africa',
        'europe',
        'northAmerica',
        'southAmerica',
        'oceania'
      ]; //,'shenzhen'
      for (var i = 0; i < continents.length; i++) {
        var oneMap = ec.init(document.getElementById(continents[i]));
        require('echarts/util/mapData/params').params[continents[i]] = {
          getGeoJson: function (callback) {
            $.getJSON('../../screen/source/geo/continents/' + continents[i] + '.geo', callback);
          }
        };
        var opt = {
          series: [
            {
              name: '',
              type: 'map',
              hoverable: false,
              roam: false,
              mapType: continents[i], // èªå®ä¹æ©å±å¾è¡¨ç±»å
              data: [],
              textFixed: {
                '亚洲': [
                  0, -10
                ],
                '北美洲': [
                  10, 0
                ],
                '非洲': [
                  10, 0
                ],
                '大洋洲': [
                  100, 0
                ],
                '欧洲': [100, 0]
                //'深圳市':[20,0]
              },
              itemStyle: {
                normal: {
                  label: {
                    show: true
                  },
                  borderColor: 'rgba(19, 105,167, 1)',
                  borderWidth: .5,
                  areaStyle: {
                    color: 'rgba(2, 89,255, .2)'
                  }
                }
              }
            }
          ]
        };

        oneMap.setOption(opt);
      }
    },
    chinaMap: function () {
      var w = this;
      var chinaMapOption = {
        tooltip: {
          show: false,
          trigger: 'item'
        },
        dataRange: {
          min: 1,
          max: 2,
          show: false,
          calculable: true,
          color: [
            "red", "green"
          ],
          //['#fe5f5f', 'orange', '#ffe26c','#70d1fe','#90ff8b'],
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            type: 'map',
            mapType: 'china',
            hoverable: false,
            itemStyle: {
              normal: {
                borderColor: 'rgba(19, 105,167, 1)',
                borderWidth: .5,
                areaStyle: {
                  color: 'rgba(0, 135,230, .4)'
                }
              }

            },
            data: [], //json.data,
            geoCoord: __GEO__.china_province,
            markLine: {
              smooth: true,
              effect: {
                show: false,
                scaleSize: 1,
                period: 10,
                color: '#fff',
                shadowBlur: 10
              },
              itemStyle: {
                normal: {
                  //color: 'green',
                  borderWidth: 1,
                  lineStyle: {
                    type: 'solid',
                    shadowBlur: 10
                  },
                  label: {
                    show: false
                  }
                }
              },
              data: [] //json.markLineData
            },
            markPoint: {
              symbol: 'emptyCircle',
              symbolSize: function (v) {
                return 10 + v / 100
              },
              effect: {
                show: true,
                shadowBlur: 0
              },
              itemStyle: {
                normal: {
                  color: 'red',
                  label: {
                    show: false
                  }
                }
              },
              data: [] //json.markPointData
            }
          }, {
            type: 'map',
            mapType: 'china',
            hoverable: false,
            data: [],
            itemStyle: {
              normal: {
                borderColor: 'rgba(19, 105,167, 1)',
                borderWidth: .5,
                areaColor: {
                  color: 'rgba(0, 135,230, .4)'
                }
              }

            },
            markPoint: {
              clickable: false,
              symbol: 'circle',
              symbolSize: 1,
              itemStyle: {
                normal: {
                  borderColor: 'rgba(19, 105,167, 1)',
                  borderWidth: .5,
                  areaStyle: {
                    color: 'rgba(2, 89,255, .2)'
                  },
                  label: {
                    show: false
                  }
                },
                emphasis: {
                  label: {
                    show: false
                  },
                  borderWidth: 0
                }
              },
              data: [
                {
                  name: '钓鱼岛',
                  value: .5
                }, {
                  name: '赤尾屿',
                  value: .4
                }
              ]
            }
          }
        ]
      };
      w
        .chinaMap
        .setOption(chinaMapOption);
      var mapGeo = __GEO__.china_province;
      $.each(echartsDraw.getContinentsGeo.call(w), function (k, v) {
        var _geo = w
          .chinaMap
          .chart
          .map
          .getGeoByPos("china", [v.x, v.y]);
        mapGeo[k] = _geo;
      });
      chinaMapOption.series[0].geoCoord = mapGeo;
      w
        .chinaMap
        .setOption(chinaMapOption);
    },
    getContinentsGeo: function () {
      var w = this;

      var continents = [
        'asia',
        'africa',
        'europe',
        'northAmerica',
        'southAmerica',
        'oceania'
      ]; // ,'shenzhen'
      var json = {};
      var worldMapLeft = $("#worldMap")
        .offset()
        .left;

      var worldMapTop = $("#worldMap")
        .offset()
        .top;
      var _offset = {};
      if (!w.simple) {
        _offset = { //地图位置偏移量
          asia: {
            x: 10,
            y: -20
          },
          africa: {
            x: 30,
            y: 0
          },
          europe: {
            x: 0,
            y: 0
          },
          southAmerica: {
            x: 20,
            y: 0
          },
          northAmerica: {
            x: 20,
            y: 0
          },
          oceania: {
            x: 120,
            y: 0
          } //,
          //shenzhen:{x:10, y:-10}
        };

      } else {
        _offset = { //å°å¾ä½ç½®åç§»é
          asia: {
            x: 10,
            y: 0
          },
          africa: {
            x: 0,
            y: 0
          },
          europe: {
            x: 0,
            y: 0
          },
          southAmerica: {
            x: 0,
            y: 0
          },
          northAmerica: {
            x: 0,
            y: 0
          },
          oceania: {
            x: 120,
            y: 0
          } //,
          //shenzhen:{x:10, y:-10}
        };
      }
      for (var i = 0; i < continents.length; i++) {
        var _map = $("#" + continents[i]);

        var x = _map
            .offset()
            .left + _map.width() / 2 - worldMapLeft + _offset[continents[i]]['x'];

        var y = _map
            .offset()
            .top + _map.height() / 2 - worldMapTop + _offset[continents[i]]['y'];

        json[continents[i]] = {
          "x": x,
          "y": y
        };

      }
      return json;
    },
    chinaMapLines: function () {
      var w = this;
      var checkMarkLineNumberGt = function (count) {
        var series = w
          .chinaMap
          .getSeries();
        var datas = series[0].markLine.data;
        return datas.length > count;
      };
      var delLine = function () {
        var series = w
          .chinaMap
          .getSeries();
        //删除最早加载的点
        var lines = series[0].markLine.data;
        //删除最早加载的线条
        var delStr = lines[0][0].name + ' > ' + lines[0][1].name;
        w
          .chinaMap
          .delMarkLine(0, delStr);
      };
      var drawLine = function (item, value) {

        var from = countryReflects[item.from]
          ? countryReflects[item.from].c
          : item.from;

        if (from.length > 20) {
          from = "africa"; //防止解析成乱码的时候线划到外面
        }
        var to = item.to;
        if (from && to) {
          if (w.clientModel == 0) {
            w
              .chinaMap
              .addMarkLine(0, {
                data: [
                  [
                    {
                      name: from,
                      value: value
                    }, {
                    name: to
                  }
                  ]
                ]
              });
          }
          if (w.clientModel == 1) {
            w
              .chinaMap
              .addMarkLine(0, {
                data: [
                  [
                    {
                      name: to,
                      value: value
                    }, {
                    name: from
                  }
                  ]
                ]
              });
          }

          while (checkMarkLineNumberGt(50)) {
            delLine();
          }
        }

      }
      var itemScoller = function (items) {
        $(".waf-items").html("");
        var listData = [];
        var data = items.reverse();
        $.each(data, function (k, v) {
          if (v.warning == '0') {
            var protocal = v.name || v.appProtocol;
            if (protocal.indexOf('扫描目录') == 0) {
              protocal = '扫描目录';
            }
            var srcRegion = v.srcGeoRegion;
            if (srcRegion.length > 3) {
              srcRegion = srcRegion.substr(0, 3);
            }
            var tr = $("<tr><td>" + __function__.formatTime(v.collectorReceiptTime) + "</td><td>" + v.srcAddress + "</td><td>" + (spec[v.srcAddress]
                ? spec[v.srcAddress]
                : srcRegion) + "</td><td>" + v.destHostName + v.requestUrl + "</td><td>" + protocal + "</td><td>" + (attackLevel[v.severity]['text'] || "低") + "</td></tr>");
            $("td", tr).css("color", attackLevel[v.severity]['color'] || "green");
            tr.appendTo($(".waf-items"));

          }

        })

      }
      var start = function () {
        $.ajax({
          type: 'post',
          url: '/api/screen?url=lastest/web/worldMapData/list',
          data: {
            domain: w.domain
          },
          dataType: 'json',
          success: function (json) {
            var json = json.data;
            var dataV = {},
              dataA = {};
            $.each(json.visit, function (k, v) {
              dataV[v[0]['name']] = v[1]['value'];
            });
            $.each(json.attack, function (k, v) {
              dataA[v[0]['name']] = v[1]['value'];
            });
            var attacks = __function__
              .powerData
              .call(w, dataA);
            var visits = __function__
              .powerData
              .call(w, dataV);
            if (visits.length == 0 && attacks.length == 0) {
              setTimeout(start, 5000);
            } else {
              var attRate = (100 * visits.length / attacks.length).toFixed(0);
              var flag1 = false;
              var flag2 = false;
              if (attacks.length == 0) {
                flag2 = true;
              }
              if (visits.length == 0) {
                flag1 = true;
              }
              $
                .each(visits, function (i, item) {
                  setTimeout(function () {
                    if (i >= visits.length - 1) {
                      flag1 = true;
                    } else {
                      drawLine(item, 1);
                    }
                  }, i * 100);

                });
              $.each(attacks, function (i, item) {
                setTimeout(function () {
                  if (i >= attacks.length - 1) {
                    flag2 = true;
                  } else {
                    drawLine(item, 2);
                  }

                }, i * 100);
              });
              var ins = setInterval(function () {
                if (flag1 && flag2) {
                  clearInterval(ins);
                  setTimeout(start, 200);
                }
              }, 1000);
              /*var tmpItem=[];
               if(json.items.length>20)
               for(var i=19;i>=0;i--)
               tmpItem.push(json.items[i]);
               else
               for(var i=json.items.length-1;i>0;i--)
               tmpItem.push(json.items[i]);
               itemScoller( tmpItem);*/
            }
          }
        })
        // $
        //   .post('/api/screen?url=lastest/web/worldMapData/list', {domain: w.domain})
        //   .success(function (json) {
        //     var json = json.data;
        //     var dataV = {},
        //       dataA = {};
        //     $.each(json.visit, function (k, v) {
        //       dataV[v[0]['name']] = v[1]['value'];
        //     });
        //     $.each(json.attack, function (k, v) {
        //       dataA[v[0]['name']] = v[1]['value'];
        //     });
        //     var attacks = __function__
        //       .powerData
        //       .call(w, dataA);
        //     var visits = __function__
        //       .powerData
        //       .call(w, dataV);
        //     if (visits.length == 0 && attacks.length == 0) {
        //       setTimeout(start, 5000);
        //     } else {
        //       var attRate = (100 * visits.length / attacks.length).toFixed(0);
        //       var flag1 = false;
        //       var flag2 = false;
        //       if (attacks.length == 0) {
        //         flag2 = true;
        //       }
        //       if (visits.length == 0) {
        //         flag1 = true;
        //       }
        //       $
        //         .each(visits, function (i, item) {
        //           setTimeout(function () {
        //             if (i >= visits.length - 1) {
        //               flag1 = true;
        //             } else {
        //               drawLine(item, 1);
        //             }
        //           }, i * 100);

        //         });
        //       $.each(attacks, function (i, item) {
        //         setTimeout(function () {
        //           if (i >= attacks.length - 1) {
        //             flag2 = true;
        //           } else {
        //             drawLine(item, 2);
        //           }

        //         }, i * 100);
        //       });
        //       var ins = setInterval(function () {
        //         if (flag1 && flag2) {
        //           clearInterval(ins);
        //           setTimeout(start, 200);
        //         }
        //       }, 1000);
        //       /*var tmpItem=[];
        //      if(json.items.length>20)
        //      for(var i=19;i>=0;i--)
        //      tmpItem.push(json.items[i]);
        //      else
        //      for(var i=json.items.length-1;i>0;i--)
        //      tmpItem.push(json.items[i]);
        //      itemScoller( tmpItem);*/
        //     }
        //   });
      }
      start();

    },
    attackScoller: function (dom) {
      var w = this;

      var y = 0;
      var innerEl = $('#' + dom);
      var rollEl = innerEl.parent();
      var waitEl = innerEl
        .clone(true)
        .removeAttr('id');
      rollEl.append(waitEl);

      clearInterval(time);
      var time = setInterval(function () {
        y = y - 0.8;
        innerEl.css({top: y});
        waitEl.css({
          top: y + innerEl.height()
        });

        if (y * -1 > innerEl.height()) {
          y = 0;
          var tmp = innerEl;

          innerEl = waitEl;
          waitEl = tmp;
        }
      }, 200)
    }
  }

  var __function__ = {
    getFlag: function (location) {
      var flag = "default";
      if ($.inArray(location, __PROVINCES__) != -1 || "中国" == location) {
        flag = "中国";
      }
      if (countryReflects[location] && countryReflects[location]['f']) {
        flag = countryReflects[location]['f'];
      } else if (countryReflects[location]) {
        flag = location;
      }
      return flag;

    },
    mapset: function (json, keySet) {
      var arr = [];
      var keysets = [];
      $.each(json, function (k, v) {
        keysets.push(k);
      });
      keysets.sort();
      $.each(keysets, function (k, v) {
        if (keySet) {
          arr.push(v);
        } else {
          arr.push(json[v]);
        }

      });
      return arr;
    },
    getLast30Mins: function () {
      var times = [];
      var date = new Date();
      var hour = date.getHours();
      var min = date.getMinutes();
      for (var i = min - 29; i <= min; i++) {
        var _h = hour;
        var _m = i;
        if (i < 0) {
          _h = hour - 1;
          if (_h < 0) {
            _h = 23;
          }
          _m = 60 + i;
        }
        _h = _h < 10
          ? ("0" + _h)
          : _h;
        _m = _m < 10
          ? ("0" + _m)
          : _m;
        times.push(_h + ":" + _m);

      }
      return times;
    },
    numScoller: function (dom, numstart, numend) {
      var w = this;
      var rate = 1;
      dom
        .next("span")
        .text("次");
      startCount(dom, {
        speed: (function () {
          if (numend < 1000) {
            return 1000;
          } else if (numend > 1000 && numend < 10000) {
            return 3000;
          } else if (numend > 10000 && numend < 100000) {
            return 5000;
          } else {
            return 8000;
          }
        })(),
        from: numstart / rate,
        to: numend / rate
      });
    },
    flowScoller: function (dom, numstart, numend) {
      startCount(dom, {
        speed: numend < 1000
          ? 2000
          : 4 *1000,
        from: numstart,
        to: numend
      });
    },
    audioplayer: function (id, file, loop) {
      var audioplayer = document.getElementById(id);
      if (audioplayer != null) {
        document
          .body
          .removeChild(audioplayer);
      }

      if (typeof(file) != 'undefined') {
        if (navigator.userAgent.indexOf("MSIE") > 0) { // IE

          var player = document.createElement('bgsound');
          player.id = id;
          player.src = file['mp3'];
          player.setAttribute('autostart', 'true');
          if (loop) {
            player.setAttribute('loop', 'infinite');
          }
          document
            .body
            .appendChild(player);

        } else { // Other FF Chome Safari Opera

          var player = document.createElement('audio');
          player.id = id;
          player.setAttribute('autoplay', 'autoplay');
          if (loop) {
            player.setAttribute('loop', 'loop');
          }
          document
            .body
            .appendChild(player);

          var mp3 = document.createElement('source');
          mp3.src = file['mp3'];
          mp3.type = 'audio/mpeg';
          player.appendChild(mp3);

          var ogg = document.createElement('source');
          ogg.src = file['ogg'];
          ogg.type = 'audio/ogg';
          player.appendChild(ogg);

        }
      }
    },
    circle: function (circle, num, alarm) {

      var colorCls = "green";
      var _text = "正常";
      if (alarm) {
        colorCls = 'red';
        _text = "告警";
      }
      $(".value", circle).text(num);
      circle
        .removeClass("bg-orange")
        .removeClass("bg-green")
        .removeClass("bg-red")
        .addClass("bg-" + colorCls);
      $(".mask", circle)
        .removeClass("orange")
        .removeClass("green")
        .removeClass("red")
        .addClass(colorCls);
      $(".msg-info", circle.next(".alarm-info"))
        .removeClass("orange")
        .removeClass("green")
        .removeClass("red")
        .addClass(colorCls);
      $(".a-num", circle.next(".alarm-info"))
        .removeClass("orange")
        .removeClass("green")
        .removeClass("red")
        .addClass(colorCls);

      $(".msg-info", circle.next(".alarm-info")).text(_text);
      var ang = num * 3.6;
      ang = (ang > 360
        ? 360
        : ang);
      if (ang <= 180) {
        $('.right', circle).css({
          '-moz-transform': 'rotate(' + ang + 'deg)',
          '-webkit-transform': 'rotate(' + ang + 'deg)',
          '-o-transform': 'rotate(' + ang + 'deg)',
          'transform': 'rotate(' + ang + 'deg)'
        });
        $('.left', circle).css({
          '-moz-transform': 'rotate(' + (0) + 'deg)',
          '-webkit-transform': 'rotate(' + (0) + 'deg)',
          '-o-transform': 'rotate(' + (0) + 'deg)',
          'transform': 'rotate(' + (0) + 'deg)'
        });
      } else {
        $('.right', circle).css({'-moz-transform': 'rotate(180deg)', '-webkit-transform': 'rotate(180deg)', '-o-transform': 'rotate(180deg)', 'transform': 'rotate(180deg)'});
        $('.left', circle).css({
          '-moz-transform': 'rotate(' + (ang - 180) + 'deg)',
          '-webkit-transform': 'rotate(' + (ang - 180) + 'deg)',
          '-o-transform': 'rotate(' + (ang - 180) + 'deg)',
          'transform': 'rotate(' + (ang - 180) + 'deg)'
        });
      };
    },
    xData: function (arr) {
      var w = this;
      var res = [];
      for (var i = 0; i < arr.length; i++) {
        res.push(arr[i] * 1);
      }
      return res;
    },
    powerData: function (json) {
      var w = this;
      var res = [];
      var arr = [];
      $.each(json || {}, function (k, v) {
        if (k && k != '' && k.length > 1 && k != 'IANA' && k != 'IANA机构') {
          if (v > 1000) {
            v = 1000;
          }
          for (var i = 0; i < v; i++) {
            if (__GEO__.geoCoordMap[k] == undefined && __GEO__.china_province[k] == undefined && __GEO__.provincial_capital[k] == undefined && countryReflects[k] == undefined) {
              // console.error('worldMap地点解析错误',k)
            } else {
              arr.push({"from": k, to: w.clientProvince});
            }
          }
        }

      });
      for (var i = 0; i < 3; i++) {
        res = $.merge(res, arr);
      }
      //随机打乱
      res
        .sort(function (a, b) {
          return 0.5 - Math.random();
        });
      return res;

    },
    powerArray: function (arr, n) {
      if (n == 0) {
        return arr;
      }
      var res = [];
      for (var i = 0; i < n; i++) {
        res = $.merge(res, arr);
      }
      return res;
    },
    formatTime: function (time) {
      return time.substr(11, time.length - 1);
    },
    numFormat: function (num) {
      return num
        .toString()
        .replace(/(\d+?)(?=(?:\d{3})+$)/g, '$1,');
    }
  }
  Date.prototype.format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
          ? (o[k])
          : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  };
  $(document).ready(function () {
    WebMonitor.init();
    var href = window.location.href;
    var flag = href.split('domain=')[1];
    if (flag == 'all') {
      $('#attackUrl tbody')
        .ready(function () {
          $('#attackUrl tbody')
            .on('click', 'tr', function (e) {
              var domain = $(this).attr('domain');
              var href = window.location.href;
              window.location.href = href.split('?')[0] + '?domain=' + domain;

            })
        })
    }
    if ($("#ddosModel").val() == 0) {
      $('#ddosModal')
        .on('shown.bs.modal', function () {
          $('.j-save')
            .on('click', function () {
              var param = {};
              param['ddosIO'] = $('#ddosNum').val();
              $.ajax({
                type: 'post',
                url: '/config',
                dataType: 'json',
                data: param,
                success: function (json) { //"/config?value="
                  layAlert(json.code
                    ? '设置成功'
                    : '设置失败', json.code);
                }
              })
              // $.post("/config", param)
              //   .success(function (json) { //"/config?value="
              //     layAlert(json.code
              //       ? '设置成功'
              //       : '设置失败', json.code);
              //   })

            })

        });
      $('#myModal').on('shown.bs.modal', function () {
        $('.alert-time').text(new Date().format('yyyy-MM-dd hh:mm:ss'));
      });
    }

  });
})();
