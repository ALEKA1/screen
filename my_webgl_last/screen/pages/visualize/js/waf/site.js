(function(global) {
	global.site = {
    isMore: false,
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
	  	// this.param.size = 5;
			this.sizeChange = this.extend(this.param, {
				//size: 5
				size: 100
			});
			this.req_getList(this.sizeChange);
			this.isMore = false;
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
	  loadMore: function() {
	  	if(this.isMore) {
	  		return;
	  	}
			//let param = this.extend(this.param, {size :100});
	  	// let param = $.extend({}, this.param, {
    	// 	size: 100
    	// });
	  	//this.req_getList(param);
	  	this.cmp.chart = this.data;
      this.cmp.load();
	  	this.isMore = true;
	  },
	  showData: function(data) {
	  	var el = $("#host-loophole"), rs = [];
	  	if(data && data['data'] && data['data'].length) {
	  		el.removeClass('nodata_tip');
      	el.empty('');
      	this.data = data['data'];
        for(var i = 0; i < 5; i++) {
        	if(this.data[i]) {
        		rs.push(this.data[i]);
        	}
      	}
        this.cmp.chart = rs;
        this.cmp.load();
	  	} else {
	  		el.addClass('nodata_tip');
      	el.text('暂无数据');
	  	}
	  },
	  req_getList: function(param) {
	  	if(!this.cmp) {
	  		this.cmp = new TopN("#host-loophole");
	  	}
	    // 被攻击站点排行
	    $.ajax({
	      traditional: true,
	      type: 'post',
	      url: '/waf/screeen/attack/site',
	      dataType: 'json',
	      data: param,
	      success: (data) => {
	      	this.showData(data);
	      },
        error: (data) => {
        	this.showData();
        }
	    });
	  }
	};
})(window);