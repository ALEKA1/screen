/**
 * Created by pc on 2017/9/27.
 */
class TopN{
  constructor(elem){
    this.elem = elem;
  }
  set chart(data){
    this.data = data.sort((a,b)=>{
        return b.num- a.num;
    });
    if(this.data.length<=0) {
      this.max = 0;
    }else {
      this.max = this.data[0].num;
    }
  }
  load(){
    this.elem = this.elem instanceof jQuery ? this.elem : $(this.elem);
    let html = '';
    let i=0;
    let delay = 0;
    this.data.forEach((item)=>{
      i++;
    delay+=0.2;
    let width = (item.num/this.max)*100 +'%';
    let ip = item.armIP;
    html += ` <div class="rank-item">
                              <div style="width: 100%;height: 70%;font-size: 0.14rem;position: relative;top: 0.03rem;">
                                  <div class="ani" style="display: inline-block;animation-delay:`+delay+`s;"><span style="color: rgb(214,224,226);">NO.`+i+`</span></div>
                                  <div class="ani goto" style="display: inline-block;animation-delay:`+delay+`s;"><span style="color: rgb(214,224,226);">${item.armIP}</span></div>
                                  <span class="items-num ani" style="right: 1%;animation-delay:`+delay+`s;"><i class="count areaCount timer c-yellow">${item.num}</i></span>
                              </div>
                              <div class="light" style="animation-delay:`+delay+`s;"></div>
                              <div class="items-progress">
                                  <span class="items-bar" style="width:`+width+`"></span>
                              </div>

                          </div>`
  });
    this.elem.html(html);
  }
}
class Rank{
  constructor(elem){
    this.elem = elem;
  }
  set chart(datas){
    this.datas = datas.sort((a,b)=>{
        return b.number- a.number;
    });
    if(this.datas.length<=0) {
      this.max = 0;
    }else {
      this.max = this.datas[0].number;
    }
  }
  load(){
    this.elem = this.elem instanceof jQuery ? this.elem : $(this.elem);
    let html = '';
    let i=0;
    let delay = 0;
    var __PROVINCES__=[
      '浙江','广东','山东','山西','辽宁','新疆','河北','甘肃','内蒙古','北京','广西','江苏','四川',
      '江西','福建','安徽','陕西','黑龙江','天津','西藏','云南','湖南','湖北','海南','青海','贵州','河南','重庆','宁夏','吉林','上海'
    ];
    this.datas.forEach((items)=>{
      delay+=0.2;
    i++;
    var flag="default";
    if($.inArray(items.area,__PROVINCES__)!=-1 || "中国" == items.area){
      flag="中国";
    }
    if(countryReflects[items.area]&&countryReflects[items.area]['f']){
      flag= countryReflects[items.area]['f'];
    }else if(countryReflects[items.area]){
      flag=items.area;
    }
    let ip = items.attackip;
    let width = (items.number/this.max)*100 +'%';
    html += ` <div class="rank-item">
                              <div class="top" style="width: 100%;height: 70%;font-size: 0.14rem;position: relative;top: 0.03rem;">
                                  <div class="ani" style="width: 30px; height: 17px; display: inline-block;animation-delay:`+delay+`s;"><span style="color: rgb(214,224,226);">NO.`+i+`</span></div>
                                  <span class="area-icon ani" style="animation-delay:`+delay+`s;"><img src="images/flag/`+flag+`.png" /></span>
                                  <div class="ani" style="display: inline-block;animation-delay:`+delay+`s;margin-left: 12%;"><span style="color: rgb(214,224,226);">${items.area}</span></div>
                                  <div class="ani goto" style="display: inline-block;animation-delay:`+delay+`s;"><span style=" color: rgb(214,224,226);"><a target="_blank" href='/screen/trace-v2.html?ip=`+ip+`'>${items.attackip}</a></span></div>
                                  <span class="items-num ani" style="right: 0.1%;animation-delay:`+delay+`s;"><i class="count flow_in_count c-yellow" data-decimals="2" >${items.number}</i></span>
                              </div>
                              <div class="light" style="animation-delay:`+delay+`s;"></div>
                              <div class="items-progress">
                                  <span class="items-bar" style="width:`+width+`"></span>
                              </div>

                          </div>`
  });
    this.elem.html(html);
  }
}
class Alarm_trend {
  constructor(elem) {
    if(!this.chart) {
      this.chart = echarts.init(elem);
    }
  }
  load(obj) {
    if(window.timer) {
      clearInterval(timer);
      window.timer = null;
    }
    let isMove = true;
    let option = {
      tooltip : {
        trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter:'{a}:{c}次'
        },
        grid: {
          top: "20px",
          left: '3%',
          right: '4%',
          bottom: '30px',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }],
        yAxis: [{
          axisTick: {
            show: false
          },
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#333333"]
            }
          },
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          }
        }],
        textStyle:{
          color: "#999999"
        },
        series: [{
          name: 'ip',
          type: 'line',
          lineStyle: {
            normal: {
              color: 'rgb(8,121,223)'
            }
          },
          itemStyle: {
            normal: {
              color: "rgb(8,121,223)"
            }
          },
          areaStyle: {
          	normal: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(8,121,223,0.8)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(8,121,223,0)' // 100% 处的颜色
                }]
              }
            }
          },
          data:[120, 132, 101, 134, 90, 230, 210]
        }]
       };
       $("#alarm-trend-menu").html('');
       for(let i =0;i<obj.series.length;i++) {
         if((obj.series[i].alarmHigh+obj.series[i].alarmMid+obj.series[i].alarmLow)!=0){
           var width_high = obj.series[i].alarmHigh/(obj.series[i].alarmHigh+obj.series[i].alarmMid+obj.series[i].alarmLow);
           var width_mid = obj.series[i].alarmMid/(obj.series[i].alarmHigh+obj.series[i].alarmMid+obj.series[i].alarmLow);
           var width_low = obj.series[i].alarmLow/(obj.series[i].alarmHigh+obj.series[i].alarmMid+obj.series[i].alarmLow);
         } else {
           var width_high = 0;
           var width_mid = 0;
           var width_low = 0;
         }
         let menuHtml = `<div class="trend-menu-item-outer">
                          <div class="trend-menu-item">
                            <span class="trend-menu-rank">
                              <span class="trend-menu-rank-value">
                                ${i == 0 ? '':i<10 ? '0'+i : i}
                              </span>
                            </span>
                            <span class="trend-menu-ip">
                              <span class="trend-ip-value">${obj.series[i].ip}</span>
                            </span>
                            <span class="trend-menu-count">
                              <span class="trend-menu-count-value">${obj.series[i].alarmHigh+obj.series[i].alarmMid+obj.series[i].alarmLow}<span style="color:#8D929B;">次</span></span>
                            </span>
                            <span class="trend-menu-level">
                              <span class="trend-menu-level-value">
                                <span class="trend-level-container">
                                  <span class="trend-level-high" style="width:${width_high*100}%;left:0;"></span>
                                  <span class="trend-level-mid" style="width:${width_mid*100}%;left:${width_high*100}%"></span>
                                  <span class="trend-level-low" style="width:${width_low*100}%;left:${(width_high+width_mid)*100}%"></span>
                                </span>
                              </span>
                              <span class="level-left-top"></span>
                              <span class="level-left-bottom"></span>
                              <span class="level-right-top"></span>
                              <span class="level-right-bottom"></span>
                            </span>
                          </div>
                      </div>`;
         $("#alarm-trend-menu").append(menuHtml);
         $(".trend-menu-item-outer:last-child>.trend-menu-item")[0].alarmData = obj.series[i].alarm;
         $(".trend-menu-item-outer:last-child>.trend-menu-item")[0].ip = obj.series[i].ip;
       }
       $(".trend-menu-item-outer:first-child>.trend-menu-item").addClass("current-item");
         if(obj.series.length == 0) {
           $("#alarm-trend-chart").css("display", "none");
           $("#alarm-noData").css("display", "inline");
           $("#menu-header").css("display", "none");
           $("#alarm-trend-menu").css("display", "none");
         }
         if(obj.series.length == 2) {
           $("#alarm-trend-chart").css("display", "block");
           $("#alarm-noData").css("display", "none");
           $("#alarm-trend-chart").css("height", "100%");
           $("#alarm-trend-menu").css("display", "none");
           $("#menu-header").css("display", "none");
           this.chart.resize();
           option.xAxis[0].data = obj.xAxis;
           option.series[0].data = $(".current-item")[0].alarmData;
           option.series[0].name = $(".current-item")[0].ip;
           this.chart.setOption(option);
         }
         if(obj.series.length > 2) {
           $("#alarm-trend-chart").css("display", "block");
           $("#alarm-noData").css("display", "none");
           $("#alarm-trend-chart").css({"height": "50%"});
           $("#alarm-trend-menu").css({"height": "50%", "display": "block"});
           $("#menu-header").css("display", "block");
           this.chart.resize();
           option.xAxis[0].data = obj.xAxis;
           option.series[0].data = $(".current-item")[0].alarmData;
           option.series[0].name = $(".current-item")[0].ip;
           this.chart.setOption(option);
           $("#alarm-trend-chart")[0].onmouseover = function() {
             isMove = false;
           };
           $("#alarm-trend-chart")[0].onmouseout = function() {
             isMove = true;
           };
           $("#alarm-trend-menu").on("mouseover",".trend-menu-item",(e) => {
             isMove = false;
             $(".current-item").removeClass("current-item");
             let target = e.target;
             while(!$(target).hasClass("trend-menu-item")) {
               target = target.parentNode;
             }
             $(".current-item").removeClass("current-item");
             $(target).addClass("current-item");
             option.series[0].data = $(".current-item")[0].alarmData;
             option.series[0].name = $(".current-item")[0].ip;
             this.chart.setOption(option);
           });
           $("#alarm-trend-menu").on("mouseout",".trend-menu-item",()=>{
             isMove = true;
           });
          window.timer = setInterval(() => {
            if(isMove) {
              if($(".current-item").parent(".trend-menu-item-outer").next().length != 0) {
                $(".current-item").removeClass("current-item").parent(".trend-menu-item-outer").next().find(".trend-menu-item").addClass("current-item");
              } else {
                $(".current-item").removeClass("current-item");
                $(".trend-menu-item-outer:first-child>.trend-menu-item").addClass("current-item");
              }
              option.series[0].data = $(".current-item")[0].alarmData;
              option.series[0].name = $(".current-item")[0].ip;
              this.chart.setOption(option);
            }
          }, 3000);
    }
  }
}