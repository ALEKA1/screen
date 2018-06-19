
(function(global) {
  global.areaChart = {
    init: function() {

    },
    search: function(param) {

      this.param = param;

      this.startTime = this.param.startTime || "";
      this.endTime = this.param.endTime || "";

      this.req_getList(this.param);
    },
    extend: function(parama, paramb) {
      var newObj = {}
      for (item in parama) {
        newObj[item] = parama[item]
      };
      for (item in paramb) {
        newObj[item] = paramb[item]
      }
      return newObj;
    },
    showData: function(data) {
      let areaName = {
        'user': '会员接入区',
        'network': '核心网络区',
        'monitor': '模拟和监控区',
        'device': '终端接入区',
        'business': '业务核心区'
      }
      let alerts = {
        'user': 0,
        'network': 0,
        'monitor': 0,
        'device': 0,
        'business': 0
      }
      if(data && data['data']) {
        $.each(areaName, (k,v)=>{
          $("."+k+"-label").html('');
          if(typeof data['data'][v]!= 'undefined'){
            //区域名称
            $("."+k+"-name").text(v)
            //区域信息（资产、告警）
            let href = `/index.html#/alert_source?saveType=alert&`+`conditions=type:web_alert&conditions=customerId:`+data['data'][v]['customerId']+`&start=`+this.startTime+`&end=`+this.endTime;
            let label = `<div class="fadeInUp">
                            <a class="asset" href="javascript:;">资产：<span>${data['data'][v]['assetTotal']}</span></a>
                            <a class="alert" href='`+href+`'>告警:<span>${data['data'][v]['alertTotal']}</span></a>
                        </div>`
            $("."+k+"-label").html(label);
            //区域告警提示
            alerts[k] = this[k] || 0;
            this[k] = data['data'][v]['alertTotal'];
          }

        })
        if(data['data']['会员接入区']['alertTotal'] > alerts['user']){
          $(".user-panel").addClass('tools-user-warn').removeClass('tools-user-info').addClass('warn-ani');
          $('.all-info').show();
          setTimeout(()=>{
            $(".user-panel").removeClass('tools-user-warn').addClass('tools-user-info').removeClass('warn-ani');
            $('.all-info').hide();
          },1000*60)
        }
        if(data['data']['核心网络区']['alertTotal'] > alerts['network']){
          $(".network-panel").addClass('tools-network-warn').removeClass('tools-network-info').addClass('warn-ani');
          $('.all-info').show();
          setTimeout(()=>{
            $(".network-panel").removeClass('tools-network-warn').addClass('tools-network-info').removeClass('warn-ani');
            $('.all-info').hide();
          },1000*60)
        }
        if(data['data']['模拟和监控区']['alertTotal'] > alerts['monitor']){
          $(".monitor-panel").addClass('tools-monitor-warn').removeClass('tools-monitor-info').addClass('warn-ani');
          $('.all-info').show();
          $('.tools-panel6-info').addClass('tools-panel6-warn');
          $('.tools-panel8-info').addClass('tools-panel8-warn');
          setTimeout(()=>{
            $(".monitor-panel").removeClass('tools-monitor-warn').addClass('tools-monitor-info').removeClass('warn-ani');
            $('.all-info').hide();
            $('.tools-panel6-info').removeClass('tools-panel6-warn');
            $('.tools-panel8-info').removeClass('tools-panel8-warn');
          },1000*60)
        }
        if(data['data']['业务核心区']['alertTotal'] > alerts['business']){
          $(".business-panel").addClass('tools-business-warn').removeClass('tools-business-info').addClass('warn-ani');
          $('.all-info').show();
          $('.tools-panel4-info').addClass('tools-panel4-warn');
          $('.tools-panel5-info').addClass('tools-panel5-warn');

          setTimeout(()=>{
            $(".business-panel").removeClass('tools-business-warn').addClass('tools-business-info').removeClass('warn-ani');
            $('.all-info').hide();
            $('.tools-panel4-info').removeClass('tools-panel4-warn');
            $('.tools-panel5-info').removeClass('tools-panel5-warn');
          },1000*60)
        }
        if(data['data']['终端接入区']['alertTotal'] > alerts['device']){
          $(".device-panel").addClass('tools-device-warn').removeClass('tools-device-info').addClass('warn-ani');
          $('.all-info').show();
          setTimeout(()=>{
            $(".device-panel").removeClass('tools-device-warn').addClass('tools-device-info').removeClass('warn-ani');
            $('.all-info').hide();
          },1000*60)
        }

      }

    },
    req_getList: function(param) {
      //
      $.ajax({
        traditional: true,
        type: 'post',
        url: '/api/es/securityDeviceV2',
        dataType: 'json',
        data: param,
        success: (data) => {
          if(data.code==0){
            this.showData(data);
          }
        },
        error: (data) => {
          this.showData();
        }
      });
    }
  };
  global.areaChart.init();
})(window);
