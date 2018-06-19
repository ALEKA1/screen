/**
 *@name
 *@author Sean.xiang
 *@date 2016/10/31
 *@example
 */

var refresh= {
  totalInfo: 1000*60*2,
  clickChange: 1000*10
};
var Setting ={
  'level': {
    'medium': '中危',
    'high': '高危',
    'low': '低危',
  }
};
var Menace = {
  init: function(){
    var w = this;
    w.json = Data.menace;
    w.initChart();
    w.initHtml();
    w.initEvent();
    w.shine();
    clearInterval(chartTime);
    var chartTime = setInterval(function(){
      w.initHtml();
    },refresh.totalInfo);

  },
  initChart: function(){
    var w = this;

    $('#levelChart').width($(window).height() *.15);
    $('#levelChart').height($(window).height() *.15);
    // $('.time-grid-scroll').height($(window).height() *.2);
    w.levelChart = echarts.init(document.getElementById('levelChart'));

  },
  initHtml: function(){
    var w =this;
    w.timeGrid();
    var trH = $('#trace-grid tbody tr').height();
    // $(".time-grid-scroll").height(trH*8)  ;
  },
  timeGrid: function() {
    var w = this;
    var param = $.setDate(3)
    $.ajax({
      'type': 'post',
      'url': '/es/sceneList',
      'data': param,
      'async': false,
      'success': function(json){
        if(json.code ==1){
          $('#trace-grid tbody').html('');
          var i =0;
          $.each(json.data, function(k,v){
            var time = v.processTime.substring(5,v.processTime.length);
            var attackAnalyze = {
              count: v.docCount,
              high: v.severityType,
              low: 0,
              medium: 0
            }
            var el = ' <tr index="'+(i++)+'">' +
              '<td>'+ time+'</td>' +
              '<td>'+ v.srcAddress+'</td>' +
              '<td>'+ v.destHostName+'</td>' +
              '<td>'+ v.warningTypeCN+'</td> ' +
              '<td class="grid-level">'+ v.severityType+'</td> ' +
              '<td style="display: none;">'+ v.srcArea+'</td> ' +
              '<td style="display: none;">'+ v.processTime+'</td> ' +
              '<td style="display: none;">'+ JSON.stringify(attackAnalyze)+'</td> ' +
              '</tr>';
            $('#trace-grid tbody').append(el);

          });
          //攻击者基本信息
          w.baseInfo(0);
          w.attacker(json.data[0].srcAddress);
        }
      }
    })
  },
  initEvent: function(){
    var w = this;
    $('#trace-grid tbody').ready(function(){
      $('#trace-grid tbody').on('click', 'tr', function(e){
        $('#trace-grid tbody tr').removeClass('active');
        var index = $(this).attr('index');
        var srcAddress = $(this).find('td').eq(1).text();
        w.baseInfo(index);
        w.attacker(srcAddress);
        e.stopPropagation();
      });

    });
  },
  baseInfo: function(index){//攻击者基本信息
    var w = this;
    var el = $('#trace-grid tr').eq(index);
    el.addClass('active');
    var level =el.children('td').eq(4).text();
    $('.j-ip').text(el.children('td').eq(1).text());
    $('.j-place').text(el.children('td').eq(5).text());
    $('.j-level').text(el.children('td').eq(4).text());
    $('.j-type').text(el.children('td').eq(3).text());
    $('.j-time').text(el.children('td').eq(6).text());
    if(level=='高危'){
      $('.j-level').removeClass('c-red c-orange c-yellow');
      $('.j-level').addClass('c-red');
    }
    if(level=='中危'){
      $('.j-level').removeClass('c-red c-orange c-yellow');
      $('.j-level').addClass('c-orange');
    }
    if(level=='低'){
      $('.j-level').removeClass('c-red c-orange c-yellow');
      $('.j-level').addClass('c-yellow');
    }
  },
  attacker: function(srcAddress){
    var w = this;
    var param = {
      "srcAddress":srcAddress
    }
    $.ajax({
      'type': 'post',
      'url': '/es/levelData',
      'data': param,
      'async': false,
      'success': function(json){
        if(json.code ==0){
          $('.j-user').text(json.data.count+'次');
          var high = json.data.high,mid= json.data.medium,low = json.data.low,
            pieData = [];
          var  levelData = {'高危':high,'中危':mid,'低危':low};
          var  levelData = [
            {'name': '高危','value': high,'color':'#e8200b'},
            {'name': '中危','value': mid,'color':'#fe863d'},
            {'name': '低危','value': low,'color':'#f9e400'},
          ];
          $.each(levelData,function (k,v) {
            if(v.value>0){
              pieData.push({'name': v.name,value: v.value,itemStyle:{normal:{color: v.color}}});
            }
          });
          w.levelChart.setOption(w.pieOption(pieData));
        }
      }
    })
  },
  drawChart: function(el,data){
    var w = this;
    el.setOption(w.pieOption(data))
  },
  pieOption: function(data){

    var option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          type:'pie',
          name:'危险等级',
          radius: ['0', '90%'],
          center: ['50%','50%'],
          hoverAnimation: false,
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{b}',
              textStyle: {
                color: '#fff'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data
        }

      ]
    };
    return option;
  },
  shine: function(){
    var w = this;
    var width = $('#scan').width();
    setInterval(function(){
      var d =[];
      d.push({
        r: Math.round(Math.random()*12 + 4),
        x: Math.round(Math.random() *300),
        y: Math.round(Math.random() *300),
        color: 'rgba(255,0,0,1)'
      });
      $.each(d, function(k,v){
        $('#scan').append('<i class="dot" style="width: '+ v.r+'px; height: '+ v.r+'px; top: '+ v.x+'px; left: '+ v.y+'px;background-color: '+ v.color+';"></i>');

      });
      var k =$('#scan').find('i');
      if(k.length>5){
        $('#scan').html('');
      }
    },5000);







  }





};
$(function(){
  Menace.init();
  // _fun.scroll('trace-grid');

});
