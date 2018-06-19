
(function(global) {
  global.timeGrid = {
    init: function() {
      let w = this;
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
      //waf 操作
      $('.j-waf').on('click', function () {
        if($(this).hasClass('off')){
          w.wafHandle('/api/waf/deleteFrom?srcAddress=',1) //删除
        }else{
          w.wafHandle('/api/waf/addTo?srcAddress=',0) //添加
        }

      })
    },
    search: function(param) {
      let w = this;
      this.param = param;
      w.timeGrid.call(w, function(){
        // w.viewTimeGrid.call(w)
        w.baseInfo.call(w,0,function(){
          w.initWafStatus.call(w);
        })
        w.photoInfo.call(w,0)
        w.initModalAlert.call(w)
      })
    },
    timeGrid: function (callback) {
      // 实时场景
      var w = this
      $.ajax({
        'type': 'post',
        'url': '/api/es/senceListV2',
        'data': w.param,
        'success': function (json) {
          if (json.code >=0 ) {
            if(json.data && json.data.length > 0){
              $('.time-grid-body').html(' ')
              $.each(json.data, function (i, item) {
                var srcAddress = item.srcAddress==undefined?'-':item.srcAddress;
                var srcName = item.srcName==undefined?'-':item.srcName;
                var destName = item.destName==undefined?'-':item.destName;
                var destAddress = item.destAddress==undefined?'-':item.destAddress;
                var el = '<tr index="' + i + '" key="' + item.processTimeStamp + '">' +
                  ' <td class="processTime" time="'+item.processTime+'">' + item.processTime.substring(5,item.processTime.length) + '</td>' +
                  '<td class="srcName" title="' + srcName + '">' + srcName + '</td>' +
                  '<td title="' + destName + '" class="destName">' + destName + '</td>' +
                  '<td title="' + item.warningTypeCN + '" class="warningTypeCN">' + item.warningTypeCN + '</td>' +
                  '<td class="docCount">' + item.docCount + '</td>' +
                  '<td style="display: none" class="warningType">' + item.warningType + '</td>' +
                  '<td style="display: none" class="name">' + item.name + '</td>' +
                  '<td style="display: none" class="destAddress">' + destAddress + '</td>' +
                  '<td style="display: none" class="srcAddress">' + srcAddress + '</td>' +
                  '<td style="display: none" class="severityType">' + item.severityType + '</td>' +
                  '</tr>'
                $('.time-grid-body').append(el)
              })
            }else{
              $('.time-grid-body ').html('<tr><td colspan="5" align="center" style="cursor: auto;color: #e4e5e5">暂无数据</td></tr>')
            }
            callback && callback();
          } else {
            $('.time-grid-body ').html('<tr><td colspan="5" align="center" style="cursor: auto;color: #e4e5e5">暂无数据</td></tr>')
          }
        }
      })
    },
    baseInfo: function (index,callback) { // 攻击者基本信息
      var w = this
      var el = $('.time-grid-body tr').eq(index)
      var srcAddress = el.children('td.srcAddress').text();
      $('.j-level').removeClass('i-high i-mid i-low');
      if(srcAddress == '' || srcAddress=='-'){
        $('.j-level').text('-')
        $('.j-ip').html('-')
        $('.j-place').text('-')
        $('.j-web').text('-')
        $('.j-type').text('-')
        $('.j-time').text('-')
        $('.j-rep').text('-')
        $('.j-info').text('-')
        $('.handle-waf').hide()
      }else{
        $('.handle-waf').show()
        var level = el.children('td.severityType').text();
        $.ajax({
          type: 'post',
          url: '/api/es/attackBaseMsgV2?srcAddress='+srcAddress,
          success: function (json) {
            if(json.code==0){
              $('.j-ip').html('<a href="/screen/trace-v2.html?ip='+json.data.srcAddress+'">'+json.data.srcAddress+'</a>')
              $('.j-place').text(json.data.srcArea)
              $('.j-level').text(level)
              $('.j-rep').text(json.data.reputation)
              $('.j-type').text(json.data.warningType)
              $('.j-info').text(json.data.threatInfo)
              $('.j-time').text(json.data.nearAttackTime)
              if (level == '高危') {
                $('.j-level').addClass('i-high')
              }
              if (level == '中危') {
                $('.j-level').addClass('i-mid')
              }
              if (level == '低危') {
                $('.j-level').addClass('i-low')
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
      var name = el.children('td.name').text()
      var param = {}
      param['srcAddress'] = ip
      param['warningType'] = type
      param['name'] = name
      $.ajax({
        type: 'post',
        url: '/api/es/attackFigureV2',
        data: param,
        success: function (json) {
          if (json.code==0) {
            var json = json.data;
            var str = json.ipSiteCount==undefined?'暂无':'关联目标攻击 <strong class="c-red">' + json.ipSiteCount + '</strong> 个';

            $('.ipSiteCount').html(str)
            $('.ipAttackType').text(json.ipAttackType||'暂无')
            $('.ipAttackType').attr('title', json.ipAttackType||'暂无')
            $('.suggest').html(json.defence||'暂无')
            var title = json.defence||'暂无';
            if(title&&title!=''&&String(title).indexOf('</strong>')!= -1){
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
            this.tip= new ailpha.ui.tip(json.message, {type: 'info'});
          }
        })
      }
    },
    ipChart: function (data, link) {
      var w = this
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
        animation: true,
        animationDurationUpdate: 100,
        animationEasingUpdate: 'quinticInOut',
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
              repulsion: 200,
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
                    color: '#d93641'
                  }
                }
              },
              {
                name: '资产',
                itemStyle: {
                  normal: {
                    color: '#01e9ff'
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
      ipChart.setOption(option);
      $(window).resize(function(){
        ipChart.resize();
      });
    },
    modalAlert: function (index) {
      var w = this

      // 告警弹框触发
      var el = $('.time-grid-body tr').eq(index)
      var time = el.children('td.processTime').attr('time')
      var ip = el.children('td.srcAddress').text()
      var type = el.children('td.warningType').text()
      var destAddress = el.children('td.destAddress').text()
      var name = el.children('td.name').text()
      var param = {}
      param['processTime'] = time
      param['srcAddress'] = ip
      param['destAddress'] = destAddress
      param['warningType'] = type
      param['name'] = name
      if(ip && typeof ip != 'undefined' && ip!='-'){
        $.ajax({
          'type': 'post',
          'url': '/api/es/popupV2',
          'data': param,
          'success': function (json) {
            if(json.code==0){
              var json = json.data;
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
                  if(title&&title!=''&&String(title).indexOf('</a>')!= -1){
                    title = title.split('</a>')[0].split('>')[1]
                  }
                  var color = item.value==undefined?'style="color:#0b73de"':''
                  var tr = item.value==undefined?'':'<td title="'+title+'">' + item.value + '</td>' ;
                  var srcArea = String(item.srcArea).indexOf('<')!=-1?
                    base.htmlEncode(item.srcArea)
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
              $('.modal-title').text(el.children('td').eq(3).text());
              $('.principle').html(json.principle)
              if(!this.editDlg){
                this.editDlg = new ailpha.ui.Dialog('ideditDlg', {title: ''});
              }
              this.editDlg.show();
              clearTimeout(time);
              var time = setTimeout( ()=> {
                this.editDlg.hide()
              }, 1000 * 10)
            }else{
              new ailpha.ui.tip(json.message, {type: 'warn'});
            }
          }
        })
      }



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
    }
  };
  global.timeGrid.init();
})(window);
