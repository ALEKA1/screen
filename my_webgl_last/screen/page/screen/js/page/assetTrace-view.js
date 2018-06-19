/**
 * Created by sean on 17/7/28.
 */
var View = {
  init: function(param){
    var w = this;
    w.param = param;
    w.initHtml();
  },
  initHtml: function(){
    var w = this;
    var ip= $('.ip').val();
    var view = echarts.init(document.getElementById('trace-view'));
    var node = [], link  =[];
    // var color = '#74f2f4'
    var color = '#fff'
    $.ajax({
      type: 'post',
      url: baseUrl+'/tracker/asset/traceView',
      data: w.param,
      success: function(json){
        if(json.code==0){
          node =json.data.node;
          link = json.data.link;
          node.push(
            {
              name: ip,
              x: '50%',
              y: '50%',
              symbolSize: [130,130],
              symbol: 'image://img/assetTrace/asset.png',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  offset: [0,30],
                  textStyle: {
                    color: color
                  }
                }
              }
            },
            {
              name: '攻击来源',
              x: '20%',
              y: '20%',
              symbolSize: [80,80],
              symbol: 'image://img/assetTrace/attacker.png',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  offset: [0,15],
                  textStyle: {
                    color: color
                  }
                }
              }
            },
            {
              name: '攻击类型',
              x: '20%',
              y: '80%',
              symbolSize: [88,88],
              symbol: 'image://img/assetTrace/type.png',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  offset: [0,15],
                  textStyle: {
                    color: color
                  }
                }
              }
            },
            {
              name: '相似资产',
              x: '80%',
              y: '20%',
              symbolSize: [80,80],
              symbol: 'image://img/assetTrace/host.png',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  offset: [0,15],
                  textStyle: {
                    color: color
                  }
                }
              }
            },
            {
              name: '弱点',
              x: '50%',
              y: '80%',
              symbolSize: [80,80],
              symbol: 'image://img/assetTrace/weakness.png',
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  offset: [0,15],
                  textStyle: {
                    color: color
                  }
                }
              }
            },
          )
          link.push(
            {
              source: ip,
              target: '攻击类型'
            },
            {
              source: ip,
              target: '攻击来源'
            },
            {
              source: ip,
              target: '相似资产'
            },
            {
              source: ip,
              target: '弱点'
            }
          )
          var option = {
            tooltip: {
              show: false
            },
            legend: {
              show: false
            },
            animationDurationUpdate: 100,
            animationEasingUpdate: 'quinticInOut',
            series : [
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
                    position: 'bottom',
                    textStyle: {
                      color: color,
                      fontSize: 14
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: color,
                  }
                },
                categories: [{
                  name: '',
                  itemStyle: {
                    color: color
                  },
                  label: {
                    normal: {
                      show: true,
                      position: 'bottom',
                      textStyle: {
                        color: color
                      }
                    }
                  }
                },
                  {
                    name: '有效',
                    itemStyle: {
                      // color: '#e9bc21'
                      color: '#ff612a'
                    },
                    label: {
                      normal: {
                        show: true,
                        position: 'bottom',
                        textStyle: {
                          color: "#ff612a"
                        }
                      }
                    }
                  },],
                force: {
                  // repulsion: 300,
                  // edgeLength: [30,50],
                  edgeLength: 100,
                  repulsion: 100,
                  gravity: 0.01,
                  layoutAnimation: true
                },
                edgeSymbol: ['none', 'none'],
                /*symbolSize: (function(data){
                 console.info(data) ;
                 })(),*/
                symbolSize: 10,
                edgeLabel: {
                  normal: {
                    textStyle: {
                      fontSize: 14,
                      color: '#02ecff'
                    }
                  }
                },
                data: node,
                links: link,
                lineStyle: {
                  normal: {
                    color: '#02ecff',
                    width: 2,
                    curveness: 0
                  }
                }

              }
            ]
          };
          view.setOption(option,true)
        }
      }
    })

  },


};
