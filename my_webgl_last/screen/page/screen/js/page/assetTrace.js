/**
 * Created by sean on 17/7/28.
 */


var baseUrl = '';
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
var Trace = {
  init: function(){
    var w = this;

    /* $('#trace-view').height($(window).height() * .65);
     $('.baseInfo-data').height($(window).height() * .15);
     $('.attack-info').height($(window).height() * .25);
     $('.prove').height($(window).height() * .2);
     $('#trend').height($(window).height() * .2);
     $('#trace-alert').height($(window).height() * .2);
     if(window.screen.width>1280){
     $('.attack-info').height($(window).height() * .31);
     }*/

    $('#trace-view').height(720);
    $('.baseInfo-data').height(190);
    $('.attack-info').height(320);
    $('.prove').height(200);
    $('#trend').height(200);
    $('#trace-alert').height(200);

    w.initHtml();
    w.initEvent();

  },
  initHtml: function(){
    var w = this;
    //初始化IP列表
    $.ajax({
      url: '/tracker/asset/ip_list',
      type: 'post',
      dataType: 'json',
      data: {size: 10},
      async: false,
      success: function(json){
        if(json.code==0){
          $.each(json.data, function(k,v){
            var el = '<li ip="'+v.key+'"><a>'+v.key+'</a></li>';
            $('.drop-ip .dv-drop-menu').append(el);
          })
        }
      }
    })
    $.each(TIME, function(k,v){
      var el = '<li time="'+k+'"><a>'+k+'</a></li>';
      $('.drop-time .dv-drop-menu').append(el);
    })

    w.getUrlParam();
    w.initWafStatus();
    w.load();

  },
  initEvent: function(){
    var w = this;

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
      $('.dv-header-info').fadeToggle();
      $(this).toggleClass('open');
    })
    //    ip选择
    $('.drop-ip .dv-drop-menu').find('li').on('click', function(){
      $('.ip').val( $(this).attr('ip') );
      $('.drop-ip .dv-drop-menu').find('li').removeClass('active');
      $(this).addClass('active');
      w.initWafStatus();
      w.load();
    })
    //ip输入框
    $('.dv-header-info').find('.ip').on('change', function(){
      w.initWafStatus();
    })
    //    时间选择
    $('.drop-time .dv-drop-menu').find('li').on('click', function(){
      $('.time').val( $(this).attr('time') );
      $('.drop-time .dv-drop-menu').find('li').removeClass('active');
      $(this).addClass('active');
      w.load();
    })
    $('.ip-search').on('click',function(e){
      w.load();
      e.stopPropagation()
    })
    $('.report-download').on("click", function(){
      w.initParam();
      var reportIP = w.param['ip'];
      var timeType =TIME_DATE[ w.param['timeStr'] ];
      var dateTime = $.setDate(timeType);
      $(this).attr("href","/report/attacker?ip="+reportIP+"&startTime="+dateTime.startTime+"&endTime="+dateTime.endTime)

    })
    $(window).resize(function(){
      clearTimeout(e);
      var e = setTimeout(function () {
        location.reload()
      }, 500)
    })
    $('.j-waf').on('click', function () {
      if($(this).hasClass('off')){
        w.wafHandle('/api/waf/deleteFrom?srcAddress=',1) //删除
      }else{
        w.wafHandle('/api/waf/addTo?srcAddress=',0) //添加
      }

    })


  },
  load: function(){
    var w = this;
    w.initParam();
    Proof.init(w.param);
    Trend.init(w.param);
    View.init(w.param);
    Alert.init(w.param);
    BaseInfo.init(w.param);
    Attack.init(w.param);
  },
  initParam: function(){
    var w = this;
    var ip = $('.ip').val();
    var time = $('.time').val();
    if(ip==''){
      $('.waf-icon').attr('disabled','true')
      $('.dv-tip').removeClass('dv-tip-info dv-tip-warn')
      $('.dv-tip').addClass('dv-tip-warn')
      $('.dv-tip .dv-tip-msg').text('IP不能为空');
      $('.dv-tip').fadeIn('slow');
      setTimeout(function(){
        $('.dv-tip').fadeOut('slow');
      },2000);
      return false;
    }
    if(!w.vaIP(ip)){
      $('.waf-icon').attr('disabled','true')
      $('.dv-tip').removeClass('dv-tip-info dv-tip-warn')
      $('.dv-tip').addClass('dv-tip-warn')
      $('.dv-tip .dv-tip-msg').text('IP格式不合法');
      $('.dv-tip').fadeIn('slow');
      setTimeout(function(){
        $('.dv-tip').fadeOut('slow');
      },2000);
      return false;
    }
    $('.waf-icon').removeAttr('disabled')
    $('.ip-value').text(ip);
    var timeType = TIME_DATE[ TIME[time] ];
    var dateTime = $.setDate(timeType);
    w.param = {
      ip: ip,
      // timeStr: TIME[time]
      startTime: dateTime.startTime,
      endTime: dateTime.endTime
    }
  },
  getUrlParam: function(){
    var w = this;
    var href = window.location.href;
    if(href.indexOf('ip=')!=-1){
      //url中有ip参数
      var  ip= $.getQueryString('ip');
      $('.ip').val(ip);

    }else{
      if($('.drop-ip .dv-drop-menu').find('li').size()>0){
        var ip = $('.drop-ip .dv-drop-menu').find('li').eq(0);
        ip.addClass('active');
        $('.ip').val(ip.attr('ip'))
      }
    }
    if(href.indexOf('type=')!=-1){
      //url中有type参数
      var type = $.getQueryString('type');
      $('.drop-time .dv-drop-menu').find('li').each(function(){
        if(type == TIME[$(this).attr('time')]){
          $('.time').val( $(this).attr('time') );
          $('.drop-time .dv-drop-menu').find('li').removeClass('active');
          $(this).addClass('active');
        }
      })
    }else{
      if($('.drop-time .dv-drop-menu').find('li').size()>0){
        var time = $('.drop-time .dv-drop-menu').find('li').eq(1);
        time.addClass('active')
        $('.time').val(time.attr('time'))
        $('.timeStr').val($('.time').val())

      }
    }
  },
  vaIP: function (value) {
    var regIp = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
    if (!regIp.test(value)) return false;
    return true;
  },
  initWafStatus: function(){
    var w = this;
    w.initParam()
    var ip = $('.ip').val();
    if (ip && ip != '') {
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
    w.initParam()
    var ip = w.param['ip'];
    if (ip && ip != '') {
      $.ajax({
        'type': 'post',
        'url': url + ip,
        'success': function (json) {
          if (json.code == 0) {
            flag ==0?$('.j-waf').addClass('off'):$('.j-waf').removeClass('off')
          }
          $('.dv-tip').removeClass('dv-tip-info dv-tip-warn')
          $('.dv-tip').addClass('dv-tip-info')
          $('.dv-tip .dv-tip-msg').text(json.message);
          $('.dv-tip').fadeIn('slow');
          setTimeout(function(){
            $('.dv-tip').fadeOut('slow');
          },2000);
        }
      })
    }
  }

};
$(function(){
  Trace.init()
})
window.onresize = function () {
  var BodyStyle = document.getElementsByTagName('body')[0].style
  BodyStyle['margin'] = '0px'
  BodyStyle['width'] = '1920px'
  BodyStyle['height'] = '1080px'
  BodyStyle['transform-origin'] = 'left top 0px'
  BodyStyle['transform'] = 'translateZ(0) scale(' + window.innerWidth / 1920 + ',' + window.innerHeight / 1080 + ')'
  // BodyStyle['background'] = ' url("/screen/img/trace-v3/bg.png") repeat scroll 0% 0% / 100% 100%'
  BodyStyle['overflow'] = 'hidden'
}
window.onresize()
