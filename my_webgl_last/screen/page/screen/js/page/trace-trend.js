/**
 * Created by sean on 17/7/28.
 */


var Trend = {
  init: function(param){
    var w = this;
    w.param = param;
    w.initHtml();
  },
  initHtml: function(){
    var w = this;
    var trend = echarts.init(document.getElementById('trend'));
    var option = {
      // color: ['#0effff','#e00ed0'],
      color: ['#097ffd','#ff612a'],
      tooltip : {
        trigger: 'axis',
        axisPointer : {
          type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        show: true,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          fontSize: 14
        },
        data: [
          {
            name: '攻击者访问趋势',
            icon: 'rect',
            textStyle: {
              color: '#097ffd'
            }
          },
          {
            name: '攻击者攻击趋势',
            icon: 'rect',
            textStyle: {
              color: '#ff612a'
            }
          }
        ],
      },
      grid: {
        left: '0',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap: false,
          // data : ['周一','周二','周三','周四','周五','周六','周日'],
          data : [],
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            textStyle: {
              color: '#3e3d47'
            }
          },
          axisLine: {
            lineStyle: {
              width: 2,
              color: '#3e3d47',
              type: 'dotted'
            }
          }


        }
      ],
      yAxis : [
        {
          type : 'value',
          nameTextStyle: {
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          splitNumber: 4,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#3e3d47',
              type: 'dotted'
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#097ffd'
            }
          }
        },
        {
          type : 'value',
          nameTextStyle: {
            color: '#fff'
          },
          splitNumber: 4,
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#3e3d47',
              type: 'dotted'
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#ff612a'
            }
          }
        }
      ],
      series : [
        {
          name:'攻击者访问趋势',
          type:'line',
          symbol: 'none',
          lineStyle: {
            normal: {
              color: '#097ffd',
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(9,93,183,1)'
              }, {
                offset:1,
                color: 'rgba(9,93,183,.1)'
              }])
            }
          },
          // data:[120, 132, 101, 134, 90, 230, 210]
          data:[]
        },
        {
          name:'攻击者攻击趋势',
          type:'line',
          symbol: 'none',
          yAxisIndex: 1,
          lineStyle: {
            normal: {
              color: '#ff612a',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255,97,42,1)'
              }, {
                offset:1,
                color: 'rgba(255,97,42,.1)'
              }])
            }
          },
          // data:[220, 182, 191, 234, 290, 330, 310]
          data:[]
        }
      ]
    };
    $.ajax({
      type: 'post',
      url: baseUrl+'/tracker/accessState',
      data: w.param,
      dataType: 'json',
      success: function(json){
        if(json.code==0){
          option.xAxis[0].data= json.data.xAxis;
          option.series[0].data= json.data.series[0].data;
          trend.setOption(option,true)
  
        }
      }
    })
    // $.post(baseUrl+'/tracker/accessState',w.param).success(function(json){
    //   if(json.code==0){
    //     option.xAxis[0].data= json.data.xAxis;
    //     option.series[0].data= json.data.series[0].data;
    //     trend.setOption(option,true)

    //   }
    // })
    $.ajax({
      type: 'post',
      url: baseUrl+'/tracker/attackState',
      data: w.param,
      dataType: 'json',
      success: function(json){
        if(json.code==0){
          option.series[1].data= json.data.series[0].data;
          trend.setOption(option,true)
  
        }
      }
    })
    // $.post(baseUrl+'/tracker/attackState',w.param).success(function(json){
    //   if(json.code==0){
    //     option.series[1].data= json.data.series[0].data;
    //     trend.setOption(option,true)

    //   }
    // })
  },


};
