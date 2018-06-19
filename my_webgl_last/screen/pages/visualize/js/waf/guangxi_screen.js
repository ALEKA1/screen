//var json_test = {};
//var datassa = [];
//var json = [];
//var x = [];

//攻击源ip排行

(function () {

	window.ipsource = {

	  init: function() {
	    $("#moreone").click(() => {
	    	this.loadMore();
	    });

	  },
	  search: function(param) {
      var box = $('.item_border1').addClass('newanimated');
      setTimeout(function() {
        box.removeClass('newanimated');
        box = null;
      }, 2000);
	  	this.param = param;
	  	this.param.size = 5;
	  	this.req_getList(this.param);
	  },
	  loadMore: function() {
	  	let param = $.extend({}, this.param, {
    		size: 100
    	});
	  	this.req_getList(param);
	  },
	  req_getList: function(param) {
		var rank = new Rank("#rank");
	  //攻击源ip排行
	    $.ajax({
	      traditional: true,
	      type: 'post',
	      url: '/waf/screen/attack/ipsource',
	      dataType: 'json',
	      data: param,
	      success: (data) => {
	        if(data.data.length>0) {
            $("#rank").removeClass('nodata_tip');
            $('#rank').text('');
            rank.chart = data['data'];
            rank.load();
          }else {
	          $("#rank").addClass('nodata_tip');
            $('#rank').text('暂无数据');
          }
    	  },
    	  error: (data) => {
            $("#rank").addClass('nodata_tip');
            $('#rank').text('暂无数据');
        }
  	  });
	  }
	};
	ipsource.init();
	window.site = {
	  init: function() {
	  	$("#more").click(() => {
	  		this.loadMore();
			});
	  },
	  search: function(param) {
      var box = $('.item_border3').addClass('newanimated');
      setTimeout(function() {
        box.removeClass('newanimated');
        box = null;
      }, 2000);
	  	this.param = param;
	  	this.param.size = 5;
	  	this.req_getList(this.param);
	  },
	  loadMore: function() {
	  	let param = $.extend({}, this.param, {
    		size: 100
    	});
	  	this.req_getList(param);
	  },
	  req_getList: function(param) {
			var host_loophole = new TopN("#host-loophole");
	 // 被攻击站点排行
	    $.ajax({
	      traditional: true,
	      type: 'post',
	      url: '/waf/screeen/attack/site',
	      dataType: 'json',
	      data: param,
	      success: (data) => {
          if(data.data.length>0) {
            $("#host-loophole").removeClass('nodata_tip');
            $('#host-loophole').text('');
            host_loophole.chart = data['data'];
            host_loophole.load();
          }else {
            $("#host-loophole").addClass('nodata_tip');
            $('#host-loophole').text('暂无数据');
          }
        },
        error: (data) => {
          $("#host-loophole").addClass('nodata_tip');
          $('#host-loophole').text('暂无数据');
	      }
	    });
	  }
	};
	site.init();
	window.slot = {
		init:function(){
			document.getElementById("alarm-trend-more").onclick = ()=>{
				this.loadMore();
			}
		},
		search: function(param) {
			var box = $('.item_border5').addClass('newanimated');
			setTimeout(function() {
				box.removeClass('newanimated');
				box = null;
			}, 2000);
			this.param = param;
			this.param.size = 5;
			this.req_getList(this.param);
		},
		loadMore:function(){
			let param = $.extend({}, this.param, {
				size: 100
			});
			this.req_getList(param);
		},
		req_getList: function(param) {
			var alarm_trend = new Alarm_trend(document.getElementById('alarm-trend-chart'));
			$.ajax({
				traditional: true,
				type: 'post',
				url: '/waf/screen/alarm/slot',
				dataType: 'json',
				data: param,
				success: (data) => {
					// 告警趋势
					alarm_trend.load(data.data[0]);
				}
			});
			
		}
	};
	slot.init();
})();

// $('.j-ip').css({'cursor':'pointer','color': '#01aaf9','textDecoration':
// 'underline'}) $('.j-ip').on('click',function(e){   var ip = $(this).text();
// window.location.href = '/screen/trace-v2.html?ip='+ip;   e.stopPropagation()
// })
