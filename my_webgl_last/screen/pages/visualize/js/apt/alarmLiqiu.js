// 告警统计
function AlarmLiqiu(allAlarmDom) {
  this.init(allAlarmDom);
}

AlarmLiqiu.prototype = {
  init: function(allAlarmDom) {
    if(!this.all_grade) {
      this.all_grade = echarts.init(allAlarmDom);
    }
    // if(!this.mid_grade) {
    //   this.mid_grade = echarts.init(midAlarmDom);
    // }
    // if(!this.min_grade) {
    //   this.min_grade = echarts.init(lowAlarmDom);
    // }
  },
  load: function(highAlarm, midAlarm, lowAlarm) {
    var all_option = {
      series: [
        {
          type: 'liquidFill',
          radius: '90%',
          data: [
            {
              value: 0.4,
              direction: 'left',
              itemStyle: {
                normal: {
                  color: '#591c28'
                }
              }
            }, {
              value: 0.3,
              direction: 'left',
              itemStyle: {
                normal: {
                  color: '#d93641'
                }
              }
            }
          ],
          backgroundStyle: {
            borderWidth: 2,
            borderColor: '#666',
            color: '#030816'
          },
          outline: {
            show: false
          },
          label: {
            normal: {
              formatter: function () {
                return highAlarm
              },
              textStyle: {
                color: '#d93641',
                fontSize: 12
              },
              position: ['50%', '40%']
            }
          },
          center: ['16%', '50%'],
          waveAnimation: false
        },{
          type: 'liquidFill',
          radius: '90%',
          data: [
            {
              value: 0.4,
              direction: 'left',
              itemStyle: {
                normal: {
                  color: '#665c2c'
                }
              }
            }, {
              value: 0.3,
              direction: 'left',
              itemStyle: {
                normal: {
                  color: '#e88434'
                }
              }
            }
          ],
          backgroundStyle: {
            borderWidth: 2,
            borderColor: '#666',
            color: '#030816'
          },
          outline: {
            show: false
          },
          label: {
            normal: {
              formatter: function () {
                return midAlarm
              },
              textStyle: {
                color: '#e88434',
                fontSize: 12
              },
              position: ['50%', '40%']
            }
          },
          center: ['49%', '50%'],
          waveAnimation: false
        },{
          type: 'liquidFill',
          radius: '90%',
          data: [
            {
              value: 0.4,
              direction: 'left',
              itemStyle: {
                normal: {
                  color: '#645a2a'
                }
              }
            }, {
              value: 0.3,
              direction: 'left',
              itemStyle: {
                normal: {
                  color: '#f5d348'
                }
              }
            }
          ],
          backgroundStyle: {
            borderWidth: 2,
            borderColor: '#666',
            color: '#030816'
          },
          outline: {
            show: false
          },
          label: {
            normal: {
              formatter: function () {
                return  lowAlarm
              },
              textStyle: {
                color: '#f5d348',
                fontSize: 12
              },
              position: ['50%', '40%']
            }
          },
          center: ['83%', '50%'],
          waveAnimation: false
        }
      ]
    }
    this.all_grade.setOption(all_option)
  }
};

window.number = {	
  init: function() {
  	
  },
  search: function(param) {
    var box = $('.item_border4').addClass('newanimated');
    setTimeout(function() {
      box.removeClass('newanimated');
      box = null;
    }, 2000);
    $.ajax({
      traditional: true,
      type: 'post',
      url: '/apt/screen/alarm/number',
      dataType: 'json',
      data: param,
      success: (data) => {
        if(!this.alarmliqiu) {
          this.alarmliqiu = new AlarmLiqiu(document.getElementById('all_grade'));
        }
        var allAlarm = data.data[0].allAlarm;
        var stopAlarm = data.data[0].stopAlarm;
        var highAlarm = data.data[0].highAlarm;
        var lowAlarm = data.data[0].lowAlarm;
        var midAlarm = data.data[0].midAlarm;
        $('#allAlarm').text(allAlarm);
        $('#stopAlarm').text(stopAlarm);
        this.alarmliqiu.load(highAlarm, midAlarm, lowAlarm);
      }
    });
    
    
  }
}