/**
 * Created by sean on 17/7/28.
 */


var Alert = {
  init: function(param){
    var w = this;
    w.param = param
    Alert.initChart.call(w, function(){
      Alert.drawChart.call(w)
    });
  },
  initChart: function(callback){
    var  w = this;
    /*require.config({
     paths: {
     echarts: '../../screen/js/plugins/echarts2.0/dist'
     }
     });
     require(
     [
     'echarts',
     'echarts/chart/wordCloud'
     ],
     function (ec) {
     w.alert = ec.init(document.getElementById('trace-alert'));
     callback&&callback.call(w,ec);
     })*/
    w.alert = echarts.init(document.getElementById('trace-alert'));
    callback&&callback.call(w,echarts);
  },
  drawChart: function(){
    var w = this;

    var option = {
      tooltip: {
        formatter: function(params, ticket, callback){
          return params.data['rename']+':'+params.data['value']
        }
      },
      series: [{
        name: '告警分布',
        type: 'wordCloud',
        sizeRange: [12, 24],
        rotationRange: [0, 0],
        shape: 'square',
        textStyle: {
          normal: {
            color: function() {
              return 'rgb(' + [
                  39,143,255
                ].join(',') + ')';
            }
          }
        },
        data: []
      }]
    };
    $.ajax({
      type: 'post',
      url: baseUrl+'/tracker/asset/alertInfo',
      data: w.param,
      dataType: 'json',
      success: function(json){
        if(json.code==0){
          var data = []
          if(json.data.length> 0){
            $.each(json.data, function (k,v) {
              var temName = String(v.name).length > 10 ? String(v.name).substring(0,10)+'...': v.name;
              data.push({
                name: $.trim(temName),
                value: v.value,
                rename: v.name
              })
            })
            option.series[0].data = data
            w.alert.setOption(option,true)
          }else{
            $('#trace-alert').html('<div class="dv-tip-inner dv-tip-info"><i class="dv-tip-icon"></i><span class="dv-tip-msg">暂无数据</span></div>')
          }

        }
      }
    })

  }


};
