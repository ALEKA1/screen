//(function(global) {
	var main = {
		autoScreen: function() {
	  	var oHtml = document.getElementsByTagName('html')[0];
	  	var htmlW = oHtml.clientWidth;
	  	oHtml.style.fontSize = htmlW / 1920 * 100 + 'px';
	  },
	  req_getMapData: function(param) {
      param["size"] = 30;
			$.ajax({
		    type: 'post',
		    url: '/apt/screen/alarm/map',
		    data: param,
		    success: (data) => {
		    	var json = [];
		    	if(data &&  data['code'] >= 0) {
		    	  if(data && data['data'] && data['data'][0]['attackrout']) {
		    	  	json = data['data'][0]['attackrout']
		    	  }
		    	}		    	
		    	this.globalMap.load(json);
		    }
			});
		},
		alert_show: true,
		initAptReport: function() {
	  	$('#stopAlarm').on('click', e => {
	      if(this.alert_show) {
	        $('.apt_alert').fadeIn(400);
	        this.alert_show = false
	      }
	      var param = this.searchBar.getData();
//	      var se = this.searchBar.getDateByShortcut(w.param.timeStr);
//	      if($('.ip').val() == w.wafName) {
//	        param = {
//	          deviceAddress: param['v'],
//	          startTime: page.transDate(param['time'][0]),
//	          endTime: page.transDate(param['time'][1])
//	        }
//	      } else {
//	        param = {
//	          deviceAddress: w.param.ip,
//	          startTime: page.transDate(se[0]),
//	          endTime: page.transDate(se[1])
//	        }
//	      }
	      $.ajax({
	          type: 'post',
	          url: ' /apt/screen/file/number',
	          dataType: 'json',
	          data: {
		          deviceAddress: param['v'],
		          startTime: base.transDate(param['time'][0]),
		          endTime: base.transDate(param['time'][1])
		        },
	          success: (data) => {
	            if(data.code == 0) {
	              var text = data.data;
	              var name = '';
	              var value = '';
	              $.each(text, (index, item) => {
	                var num = index + 1;
	                if(num <= 10) {
	                  num = '0' + num;
	                }
	                name += '<ul class="table_tr"><li class="table_num">' + num + '</li><li class="table_file">' + item.name + '</li><li class="table_active"><i class="fa fa-download"></i>' + item.value + '</li></ul>'
	              })
	              $('#table_body').html(name)
	            } else {
	              $('#table_body').html('<div style="font-size: .3rem;color: #e4e5e5;text-align: center">暂无数据</div>')
	            }
	          }
	      });
	      return false;
	    });
	    //关闭弹出框
	    $('#alert_close').on('click', e => {
	      if(!this.alert_show){
	        $('.apt_alert').fadeOut(400);
	        this.alert_show = true;
	      }
	    })
      $('body').on('click', e => {
      	var apt_alert = $('.apt_alert');
      	if(!apt_alert.get(0).contains(e.target)) {
      		apt_alert.fadeOut(400);
          this.alert_show = true;
      	}
      })
	  },
	  init: function() {
	  	this.urlParam = base.urlDecode(window.location.search.substring(1));
	  	this.autoScreen();
			var urlIp, urlpa, ips;
			// this.urlIp = new Array(this.urlParam["ip"]);
			urlIp = this.urlParam["ip"].split(',');
			urlPa = urlIp.sort();
			this.urlParam["ip"] = urlPa.toString();
			if(this.urlParam["group"]) {
  			ips = ((this.urlParam["group"].split(',')).sort()).toString();
  		} else {
  			ips = this.urlParam["ip"];
  		}
	  	/*初始化头部搜索*/
	  	if(!this.searchBar) {
	  		this.searchBar = new ailpha.ui.SearchBar('id-searchBar', {
	  			label: 'APT资产',
	  			submit: (v, date) => {
	  				//console.log([v, date]);
	  				var vaIP = function (value) {
	  			    var regIp = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
	  			    if (!regIp.test(value)) return false;
	  			    return true;
	  			  }
	  				var arr = v.split(",");
	  				for(var i = 0; i < arr.length; i++) {
	  					if(!vaIP(arr[i])) {
	  						this.searchBar.showError("ip格式错误");
	  						return;
	  					}
	  				}
	  				parent.location.href = "?ip=" + v + "&date=" + date['key'] + "&name=" + this.urlParam["name"] + "&group=" + ips;
	  			},
	  			download: (v, date) => {
	  				var vaIP = function (value) {
	  			    var regIp = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
	  			    if (!regIp.test(value)) return false;
	  			    return true;
	  			  }
	  				var arr = v.split(",");
	  				for(var i = 0; i < arr.length; i++) {
	  					if(!vaIP(arr[i])) {
	  						this.searchBar.showError("ip格式错误");
	  						return;
	  					}
	  				}
	  				parent.location.href = "/apt/asset/report?deviceAddress=" + v + "&startDate=" + base.transDate(date['time'][0]) + "&endDate=" + base.transDate(date['time'][1]) + "&assetName=" + this.urlParam["name"];
	  			}
				});
	  		this.searchBar.load([{
	  			key: ips,
	  			value: this.urlParam["name"]
	  		}]).setValue(this.urlParam["ip"], this.urlParam["date"] || "7d");
	  	}

	  	/*初始化地球*/
	  	if(!this.globalMap) {
	  		this.globalMap = earth;
	  	}
	  	ipsource.init();//攻击源ip排行
	  	site.init();//被攻击站点排行
	  	slot.init();//告警趋势
	  	realtime.init();//滚动列表
	  	sourceArea.init();//攻击来源区域分布
	  	alarmType.init();//告警类型分布
	  	number.init();//告警统计
	  	ipnumber.init();//累计攻击者
	  	attacker.init();// 被攻击站点数

	  	this.initAptReport();

	  	var time = this.searchBar.getDateByShortcut(this.searchBar.getData()["key"]);
	  	this.search({
	  		deviceAddress: this.urlParam["ip"],
        startTime: base.transDate(time[0]),
        endTime: base.transDate(time[1])
	  	});

	  	//  定时刷新数据
      this.reloadTimer({
        deviceAddress: this.urlParam["ip"],
        startTime: base.transDate(time[0]),
        endTime: base.transDate(time[1])
      });
	  },
	  search: function(param) {
	  	this.req_getMapData(param);//中间球
	  	ipsource.search(param, this.searchBar.getData()["key"]);//攻击源ip排行
	  	site.search(param);//被攻击站点排行
	  	slot.search(param);//告警趋势
	  	realtime.search(param);//滚动列表
	  	sourceArea.search(param);//攻击来源区域分布
	  	alarmType.search(param);//告警类型分布
	  	number.search(param);//告警统计
	  	ipnumber.search(param);//累计攻击者
	  	attacker.search(param);//被攻击站点数
	  },
    reloadTimer: function(param) {
		  clearInterval(this.timer);
      // this.param = param;
		  this.timer = setInterval((p) => {
					var time = this.searchBar.getDateByShortcut(this.searchBar.getData()["key"]);
					var timeparam = {
					deviceAddress: this.urlParam["ip"],
					startTime: base.transDate(time[0]),
					endTime: base.transDate(time[1])
					};
          this.a_attacker(timeparam);
      }, 1000*60*2);
      this.a_attacker = (param) => {
        this.param  = param;
        attacker.search(param);
        setTimeout(() => {
            this.a_ipnumber(this.param);
        },5000)
      };
      this.a_ipnumber = (param) => {
        ipnumber.search(param);
          setTimeout(() => {
            this.a_realtime(this.param);
        },5000)
      }
      this.a_realtime = (param) => {
        this.param = param;
        realtime.search(param);
        setTimeout(() => {
          this.a_ipsource(this.param);
      },5000)
      };
		  this.a_ipsource = (param) => {
        this.param = param;
		    ipsource.search(this.param, this.searchBar.getData()["key"]);
		    setTimeout(() => {
          this.a_sourceArea(this.param);
        },5000)
      };
      this.a_sourceArea = (param) => {
        sourceArea.search(param);
        setTimeout(() => {
          this.a_site(this.param);
      },5000)
      };
      this.a_site = (param) => {
        this.param = param;
        console.log(param)
        site.search(param);
        setTimeout(() => {
          this.a_number(this.param);
        },5000)
      };
      this.a_number = (param) => {
        number.search(param);
        setTimeout(() => {
          this.a_slot(this.param);
      },5000)
      };
      this.a_slot = (param) => {
        this.param = param;
        slot.search(param);
        setTimeout(() => {
          this.a_alarmType(this.param);
        },5000)
      };
      this.a_alarmType = (param) => {
        alarmType.search(param);
      };



    }
	}
//})(window);
main.init();
