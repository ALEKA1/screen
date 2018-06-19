/**
 *@name
 *@author Sean.xiang
 *@date 17/4/12
 *@version
 *@desc
 */
(function () {
  var Setting = {
    timeInterval: 60 * 1000
  }
  var TIME = {
    '最近24小时': '1d',
    '最近7天': '7d',
    '最近30天': '30d',
    '本日': '0d',
    '本周': '0w',
    '本月': '0m',
  }
  var TIME_DATE = {
    '1d': 0,
    '7d': 1,
    '30d': 2,
    '0d': 3,
    '0w': 4,
    '0m': 5
  }
  var Vwarn = {
    init: function () {
      var w = this
      w.flagAlert = false

      w.initTimeHtml();
      w.initParam();
      w.initHtml()
      // 数据条数不足时，页面Height设置
      // w.viewSize()
      w.initEvent()

      clearInterval(timer)
      var timer = setInterval(function () {
        w.initParam();
        w.initHtml()
      }, Setting.timeInterval)
    },
    initTimeHtml: function(){
      var w = this;
      $('.drop-time .dv-drop-menu').html('')
      $.each(TIME, function(k,v){
        var el = '<li time="'+k+'" type="'+v+'"><a>'+k+'</a></li>';
        $('.drop-time .dv-drop-menu').append(el);
      })
    },
    initParam: function(){
      var w = this;

      var href = window.location.href;
      if(href.indexOf('type')!=-1){//判断是否在当前页面
        var hrefType = href.split('type=')[1]
        w.param = $.setDate( TIME_DATE[ hrefType ])
        //时间范围回显
        $('.drop-time .dv-drop-menu').find('li').each(function(){
          if(hrefType==$(this).attr('type')){
            $('.time').val( $(this).attr('time') );
            $('.drop-time .dv-drop-menu').find('li').removeClass('active');
            $(this).addClass('active');
          }
        })
      }else{
        //从外面跳转到当前页面，url上拼接上type
        if($('.drop-time .dv-drop-menu').find('li').size()>0) {
          var el = $('.drop-time .dv-drop-menu').find('li').eq(1);
          el.addClass('active')
          var time = el.attr('time'), type = el.attr('type')
          $('.time').val(time)
          w.param = $.setDate(TIME_DATE[type])
          window.history.pushState({},0, href.split('?')[0]+'?type='+type)
        }

      }
    },
    initHtml: function () {
      var w = this

      w.safeState.call(w, function(){
        w.signalDraw.call(w)
        w.safeStateEvent.call(w)
      })
      w.ruleModel()
      w.timeGrid.call(w, function(){
        w.viewTimeGrid.call(w)
        w.baseInfo.call(w,0,function(){
          w.initWafStatus.call(w);
        })
        w.photoInfo.call(w,0)
        w.initModalAlert.call(w)
      })
      w.clearModal();
    },
    initEvent: function () {
      var w = this
      $('.time-grid-body').ready(function () {
        $('.time-grid-body').on('click', 'tr', function (e) {
          $('.time-grid-body tr').removeClass('active')
          $(this).addClass('active')
          var index = $(this).attr('index')
          w.baseInfo.call(w,index,function(){
            w.initWafStatus.call(w);
          })
          w.photoInfo(index)
          w.modalAlert(index)
          e.stopPropagation()
        })
      })
      //下拉
      $('.drop-head-info').on('click', function(e){
        var name = $(this).parents('.dv-drop').hasClass('open');
        if(name){
          $(this).parent('.dv-drop-head').next('.dv-drop-menu').slideUp();
          $(this).parents('.dv-drop').removeClass('open')
        }else{
          $(this).parent('.dv-drop-head').next('.dv-drop-menu').slideDown();
          $(this).parents('.dv-drop').addClass('open')
        }
        e.stopPropagation()
      });
      $("body").on("click",function (e) {
        var $el = $(e.target);
        if($('.dv-drop').hasClass('open')){
          $('.dv-drop').removeClass('open');
          $('.dv-drop').find('.dv-drop-menu').slideUp();
        }
        e.stopPropagation()
      })
      //折叠
      $('.tool-toggle').on('click', function(){
        $('.drop-time').fadeToggle();
        $(this).toggleClass('open');
      })
      //时间范围选择事件
      $('.drop-time .dv-drop-menu li').on('click', function(){
        var time = $(this).attr('time'), type = $(this).attr('type')
        $('.time').val( time );
        $('.drop-time .dv-drop-menu').find('li').removeClass('active');
        $(this).addClass('active');
        w.param = $.setDate( TIME_DATE[ type ])
        var href = window.location.href
        window.location.href = href.split('?')[0]+'?type='+type

        return false
      })
      //  规则告警和模型 更多
      $('.rule-more').on('click', function(){
        w.ruleModelData.call(w,'/es/alertSubCount', '.rule-grid','100', function(){
          w.ruleModelEvent.call(w,'.rule-grid','alert')
        });
      })
      $('.scene-more').on('click', function(){
        w.ruleModelData.call(w,'/es/eventSubCount', '.scene-grid','100',function(){
          w.ruleModelEvent.call(w,'.scene-grid','scenes')
        });
      })

      //waf 操作
      $('.j-waf').on('click', function () {
        if($(this).hasClass('off')){
          w.wafHandle('/api/waf/deleteFrom?srcAddress=',1) //删除
        }else{
          w.wafHandle('/api/waf/addTo?srcAddress=',0) //添加
        }

      })
    },
    safeState: function (callback) {
      var w = this
      // 安全设备防御态势
      $.ajax({
        'type': 'post',
        'url': '/es/securityDevice',
        'async': false,
        'data': w.param,
        'success': function (json) {
          w.drawArea('边界防护区', json, 'visit-area')
          w.drawArea('应用区', json, 'apply-area')
          w.drawArea('数据区', json, 'data-area')
          w.drawArea('运维管理区', json, 'manage-area')
          callback && callback();
        }
      })
    },
    safeStateEvent: function () {
      var w = this;
      //安全设备防御态势相关事件
      var href = window.location.href;
      var hrefType = href.split('type=')[1]
      var time = $.setDate( TIME_DATE[ hrefType ])
      var start = time['startTime'];
      var end = time['endTime'];
      $('.apt-logs,.web_firewall-logs').parent('.info').css({
        'border': '1px solid #2769a1',
        'backgroundColor': 'rgba(15,79,152,.75)'
      })
      $('.server').find('.apt-logs').on('click', function(){
        window.open('/index.html#/alert_source?saveType=alert&conditions=_type:apt&start='+start+'&end='+end)
      })
      $('.server').find('.web_firewall-logs').on('click', function(){
        var end = time['endTime'];
        window.open('/index.html#/alert_source?saveType=alert&conditions=_type:waf&start='+start+'&end='+end)
      })
      $('.server').find('.apt-num').on('click', function(){
        window.open('/index.html#/asset?assetType=apt')
      })
      $('.server').find('.web_firewall-num').on('click', function(){
        window.open('/index.html#/asset?assetType=waf')
      })
    },
    signalDraw: function () {
      // 信号告警提示
      var w = this
      $.ajax({
        'type': 'post',
        'url': '/es/highLight',
        'success': function (json) {
          $('.sign1,.sign2').removeClass('sign-h-warn')
          $('.sign3').removeClass('sign-v-warn')
          $('.apply-area,.data-area').removeClass('warning')
          if (json && json != []) {
            $.each(json, function (i, v) {
              if (v == '应用区') {
                $('.apply-area').addClass('warning')
                $('.sign2').addClass('sign-h-warn')
              }
              if (v == '数据区') {
                $('.data-area').addClass('warning')
                $('.sign3').addClass('sign-v-warn')
              }
            })
          }
          $('.sign1').css({
            left: 0,
            top: $('.visit-area').height() / 2 + $('.sign1').height()
          })
          $('.sign2').css({
            left: $('.visit-area').width(),
            top: $('.visit-area').height() / 2 + $('.sign2').height() + 10
          })
          $('.sign3').css({
            left: $('.manage-area').width() + $('.data-area').width() / 2 + $('.sign3').width() * 2,
            top: $('.apply-area').height() - $('.sign3').height() / 3
          })
        }
      })
    },
    ipChart: function (data, link) {
      var w = this
      $('#ipChart').height($(window).height() * 0.3)
      var ipChart = echarts.init(document.getElementById('ipChart'))
      var option = {
        tooltip: {
          show: false
        },
        legend: {
          show: false,
          orient: 'vertical',
          x: 'right',
          data: ['攻击者', '资产'],
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        animation: false,
        // animationDurationUpdate: 100,
        // animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'force',
            draggable: true,
            tooltip: {
              show: false
            },
            animation: false,
            label: {
              normal: {
                show: true,
                position: 'inside',
                textStyle: {
                  color: '#fff'
                }
              }
            },
            force: {
              repulsion: 300,
              edgeLength: [10, 100],
              layoutAnimation: false
            },
            edgeSymbol: ['none', 'arrow'],
            /* symbolSize: (function(data){
             console.info(data) ;
             })(), */
            symbolSize: 20,
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 14
                }
              }
            },
            categories: [
              {
                name: '攻击者',
                itemStyle: {
                  normal: {
                    color: '#ff3232'
                  }
                }
              },
              {
                name: '资产',
                itemStyle: {
                  normal: {
                    color: '#f6bd10'
                  }
                }
              }
            ],
            data: data,
            links: link,
            lineStyle: {
              normal: {
                color: 'source',
                width: 2,
                curveness: 0
              }
            }

          }
        ]
      }
      ipChart.setOption(option)
    },
    timeGrid: function (callback) {
      // 实时场景
      var w = this
      $.ajax({
        'type': 'post',
        'url': '/es/sceneList',
        'data': w.param,
        'success': function (json) {
          if (json.code) {
            $('.time-grid-body').html(' ')
            $.each(json.data, function (i, item) {
              var srcAddress = item.srcAddress==undefined?'-':item.srcAddress;
              var destHostName = item.destHostName==undefined?'-':item.destHostName;
              var el = '<tr index="' + i + '" key="' + item.processTimeStamp + '">' +
                ' <td class="processTime" time="'+item.processTime+'">' + item.processTime.substring(5,item.processTime.length) + '</td>' +
                '<td class="srcAddress">' + srcAddress + '</td>' +
                '<td title="' + destHostName + '" class="destHostName">' + destHostName + '</td>' +
                '<td title="' + item.warningTypeCN + '" class="warningTypeCN">' + item.warningTypeCN + '</td>' +
                '<td class="docCount">' + item.docCount + '</td>' +
                '<td style="display: none" class="reputation">' + item.reputation + '</td>' +
                '<td style="display: none" class="severityType">' + item.severityType + '</td>' +
                '<td style="display: none" class="mprocessTime">' + item.mprocessTime + '</td>' +
                '<td style="display: none" class="srcArea">' + item.srcArea + '</td>' +
                '<td style="display: none" class="warningType">' + item.warningType + '</td>' +
                '<td style="display: none" class="name">' + item.name + '</td>' +
                '<td style="display: none" class="threatInfo">' + item.threatInfo + '</td>' +
                '</tr>'
              $('.time-grid-body').append(el)
            })
            callback && callback();

          } else {
            $('.time-grid-body ').html('<tr><td colspan="7">暂无数据</td></tr>')
          }
        }
      })
    },
    baseInfo: function (index,callback) { // 攻击者基本信息
      var w = this
      var el = $('.time-grid-body tr').eq(index)
      var srcAddress = el.children('td.srcAddress').text();
      if(srcAddress=='-'){
        $('.j-level').text('-')
        $('.j-ip').html('-')
        $('.j-place').text('')
        $('.j-web').text('-')
        $('.j-type').text('-')
        $('.j-time').text('-')
        $('.j-ip').css({'cursor':'auto','color': '#fff','textDecoration': 'none'})
        $('.handle-waf').hide()
      }else{
        $('.handle-waf').show()
        var level = el.children('td.severityType').text()
        $.ajax({
          type: 'post',
          url: '/es/attackBaseMsg?srcAddress='+srcAddress,
          success: function (json) {
            if(json.code){
              $('.j-ip').html('<a href="/screen/trace-v2.html?ip='+json.data.srcAddress+'">'+json.data.srcAddress+'</a>')
              $('.j-place').text(json.data.srcArea)
              $('.j-level').text(level)
              $('.j-web').text(json.data.reputation)
              $('.j-type').text(json.data.warningType)
              $('.j-time').text(json.data.threatInfo)
              $('.j-ip').css({'cursor':'pointer','color': '#01aaf9','textDecoration': 'underline'})
              if (level == '高危') {
                $('.j-level').removeClass('c-red c-orange c-yellow')
                $('.j-level').addClass('c-red')
              }
              if (level == '中危') {
                $('.j-level').removeClass('c-red c-orange c-yellow')
                $('.j-level').addClass('c-orange')
              }
              if (level == '低危') {
                $('.j-level').removeClass('c-red c-orange c-yellow')
                $('.j-level').addClass('c-yellow')
              }
              callback && callback();
            }
          },
          error: function(err){
            console.info(err)
          }
        })
      }

    },
    photoInfo: function (index) { // 攻击者画像信息
      var w = this
      var el = $('.time-grid-body tr').eq(index)
      var ip = el.children('td.srcAddress').text()
      var type = el.children('td.warningType').text()
      var destHostName = el.children('td.destHostName').text()
      var processTime = el.children('td.processTime').attr('time')
      var name = el.children('td.name').text()
      var param = {}
      param['ip'] = ip
      param['warningType'] = type
      param['destHostName'] = destHostName
      param['processTime'] = processTime
      param['name'] = name
      $.ajax({
        type: 'post',
        url: '/es/attackFigure',
        data: param,
        success: function (json) {
          if (json.code) {
            var str = json.ipSiteCount==undefined?'暂无':'关联目标攻击 <strong class="c-red">' + json.ipSiteCount + '</strong> 个';

            $('.ipSiteCount').html(str)
            $('.ipAttackType').text(json.ipAttackType||'暂无')
            $('.ipAttackType').attr('title', json.ipAttackType||'暂无')
            $('.suggest').html(json.defence||'暂无')
            var title = json.defence||'暂无';
            if(title&&title!=''&&title.indexOf('</strong>')!= -1){
              title = title.split('</strong>')[1]
            }
            $('.suggest').attr('title', title)
            /*$('.defence').html(json.defence||'暂无')
             $('.defence').attr('title', title)*/
            var ipSites = json.ipSites||{}
            var data = [], link = []
            data.push({
              name: ip,
              category: 0,
              symbolSize: 40
            })
            $.each(ipSites, function (k, v) {
              data.push({
                name: k,
                category: 1
              })
              link.push({
                source: ip,
                target: k
              })
            })
            w.ipChart(data, link)
          }
        }
      })
    },
    ruleModel: function () {
      var w = this
      // 规则告警和模型告警态势
      w.ruleModelData.call(w,'/es/alertSubCount', '.rule-grid','5', function () {
        w.viewRuleModel.call(w)
        w.ruleModelEvent.call(w,'.rule-grid','alert')
      });
      w.ruleModelData.call(w,'/es/eventSubCount', '.scene-grid','5',function(){
        w.viewRuleModel.call(w)
        w.ruleModelEvent.call(w,'.scene-grid','scenes')
      });

    },
    ruleModelData: function(url,dom,size,callback){
      /*
       * param 参数
       * url 请求url
       * dom 渲染htmldom
       * size 请求条数
       * */
      var w = this;
      w.param['size'] = size ;
      $.ajax({
        'type': 'post',
        'url': url,
        'data': w.param,
        'async': false,
        'success': function (json) {
          if (json.code) {
            $(dom + ' ' +'tbody').html(' ')
            for (var i = 0; i < json.data.length; i++) {
              var item = json.data[i]
              var max = json.data[0].value
              var percent = Math.ceil(100 * item.value / max)
              var el = '<tr key="' + item.warningType + '">' +
                '<td title="' + item.name + '">' + item.name + '</td>' +
                '<td><div class="progress">' +
                '<div class="progress-bar" style="width: ' + percent + '%;"></div>' +
                '</div></td>' +
                '<td title="' + item.value + '" align="right">' + item.value + '次</td>' +
                '</tr>'
              $( dom + ' ' + 'tbody').append(el)
            }
            callback && callback();
          } else {
            $(dom + ' ' + 'tbody').html('<tr><td colspan="3" style="text-align: center">暂无数据</td></tr>')
          }
        }
      })
    },
    ruleModelEvent: function (el,saveType) {
      var  w = this;
      /*
       * param 参数
       * el 事件节点
       * saveType 告警溯源中saveType类型
       * */
      var href = window.location.href;
      var hrefType = href.split('type=')[1]
      var time = $.setDate( TIME_DATE[ hrefType ])
      var start = time['startTime'];
      var end = time['endTime'];
      $(el).find('tr').on('click',function(){
        var type  = encodeURIComponent($(this).attr('key'))
        window.open('/index.html#/alert_source?saveType='+saveType+'&conditions=warningType:'+type+'&start='+start+'&end='+end)
      })

    },
    drawArea: function (name, json, dom) {
      var w = this
      var data = json[name]
      $('.' + dom + ' ' + '.area').html(' ')
      $('.' + dom + ' ' + '.server-group').html(' ')
      $.each(data, function (k, v) {
        var flag1 = v.eventCount == 0 ? 'none' : 'block',
          flag2 = v.assetCount == 0 ? 'none' : 'block',
          flag = (v.assetCount == 0 && v.eventCount == 0) ? '' : 'info'
        if (v.name != '应用服务器群' && v.name != '数据库服务器群') {
          var icon = '<div class="server ' + flag + '">' +
            '<div class="icon ' + v.icon + '"></div>' +
            '<div class="name">' + v.name + '</div>' +
            '<i class="logs '+v.icon+'-logs" style="display: ' + flag1 + ';">' + v.eventCount + '</i> ' +
            '<i class="num '+v.icon+'-num" style="display: ' + flag2 + ';">' + v.assetCount + '</i>' +
            '</div>'
          $('.' + dom + ' ' + '.area').append(icon)
        } else {
          var icon = '<div class="icon-group">' +
            '<div class="icon ' + v.icon + '""></div>' +
            '<div class="icon ' + v.icon + '""></div> ' +
            '<div class="icon ' + v.icon + '""></div></div>' +
            '<div class="name">' + v.name + '</div>' +
            '<i class="logs" style="display: ' + flag1 + ';">' + v.eventCount + '</i> ' +
            '<i class="num" style="display: ' + flag2 + ';">' + v.assetCount + '</i>'
          $('.' + dom + ' ' + '.server-group').append(icon)
        }
      })
    },
    modalAlert: function (index) {
      var w = this

      // 告警弹框触发
      /* $('#myModal').on('show.bs.modal', function (e) {

       }); */
      var el = $('.time-grid-body tr').eq(index)
      var time = el.children('td.processTime').attr('time')
      var ip = el.children('td.srcAddress').text()
      var type = el.children('td.warningType').text()
      var destHostName = el.children('td.destHostName').text()
      var name = el.children('td.name').text()
      var param = {}
      param['processTime'] = time
      param['srcAddress'] = ip
      param['destHostName'] = destHostName
      param['warningType'] = type
      param['name'] = name
      $.ajax({
        'type': 'post',
        'url': '/es/popup',
        'data': param,
        'success': function (json) {
          var ipData = json.attackers, urlData = json.attackUrl
          $('.ip-grid thead tr').html(' ')
          $('.ip-grid tbody').html(' ')
          $('.url-grid thead tr').html(' ')
          $('.url-grid tbody').html(' ')
          if (ipData != null) {
            $.each(ipData.tableth, function (i, item) {
              $('.ip-grid thead tr').append('<th>' + item + '</th>')
            })
            $.each(ipData.data, function (i, item) {
              var title = item.value
              if(title&&title!=''&&title.indexOf('</a>')!= -1){
                title = title.split('</a>')[0].split('>')[1]
              }
              var color = item.value==undefined?'style="color:#0b73de"':''
              var tr = item.value==undefined?'':'<td title="'+title+'">' + item.value + '</td>' ;
              var srcArea = String(item.srcArea).indexOf('<')!=-1?
                $.escapeHtml(item.srcArea)
                :item.srcArea
              $('.ip-grid tbody').append('<tr>' +
                '<td '+color+'>' + item.srcAddress + '</td>' +
                '<td title="' + srcArea + '">' + srcArea + '</td>' +
                tr+
                '</tr>')
            })
          }
          if (urlData != null) {
            $.each(urlData.tableth, function (i, item) {
              $('.url-grid thead tr').append('<th>' + item + '</th>')
            })
            $.each(urlData.data, function (i, item) {
              $('.url-grid tbody').append('<tr>' +
                '<td>' + item.ip + '</td>' +
                '<td title="'+item.url+'">' + item.url + '</td>' +
                '<td>' + item.urlValue + '</td>' +
                '</tr>')
            })
          }
          $('.modal-title').text(el.children('td').eq(3).text())
          $('.modal-time').text(el.children('td').eq(7).text())
          $('.principle').html(json.principle)
        }
      })
      $('#myModal').modal('show')
      clearTimeout(time)
      var time = setTimeout(function () {
        $('#myModal').modal('hide')
        // w.flagAlert = false;
      }, 1000 * 10)
    },
    initModalAlert: function(){
      //第一次弹出显示框
      var w = this
      var modalFlag = w.key || 0
      var key = $('.time-grid tbody tr:eq(0)').attr('key')
      w.key = key
      // 最新时间
      if (modalFlag < key) {
        w.modalAlert(0)
      }
      $('.time-grid-body tr:eq(0)').addClass('active')
    },
    viewRuleModel: function () {
      var w = this
      // 规则模型容器高度初始化
      var rulH = $('.rule-grid tbody').find('tr').height()
      $('.rule-grid-scroll,.scene-grid-scroll').height(rulH * 5+10)
    },
    viewTimeGrid: function () {
      var w = this
      // 实时场景分析容器高度初始化
      var theadH = $('.time-grid thead').height()
      var trH = $('.time-grid tbody').find('tr').height()
      $('.time-grid-scroll').height(trH * 10)
    },
    initWafStatus: function(){
      var w = this;
      var ip = $('.j-ip').text();
      if (ip && ip != ''&&ip!='-') {
        $.ajax({
          'type': 'post',
          'async': false,
          'url': '/api/waf/exists?srcAddress='+ip,
          'success': function (json) {
            if (json.code == 0) {
              if (json.data&&json.data!='') {
                $('.waf-icon').addClass('off')
              } else {
                $('.waf-icon').removeClass('off')
              }
            }
          },
          'error': function (err) {
            console.error(err)
          }
        })
      }
    },
    wafHandle: function(url,flag) {
      var w = this;
      var ip = $('.j-ip').text();
      if (ip && ip != '') {
        $.ajax({
          'type': 'post',
          'url': url + ip,
          'success': function (json) {
            if (json.code == 0) {
              flag ==0?$('.j-waf').addClass('off'):$('.j-waf').removeClass('off')
            }
            $('.waf-info').fadeIn()
            $('.waf-info').text(json.message)
            setTimeout(function () {
              $('.waf-info').fadeOut()
            }, 3000)
          }
        })
      }
    },
    clearModal: function(){
      var w = this;

      if($('body').find('.modal-backdrop').length>0){
        $('body').find('.modal-backdrop').remove()
      }

    }

  }
  $(function () {
    $(window).resize(function () {
      window.location.reload()
    })
    Vwarn.init()
  })


})()
