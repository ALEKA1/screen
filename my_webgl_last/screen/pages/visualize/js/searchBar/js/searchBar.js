(function(global) {
	function SearchBar(el, config) {
		this.el = el.get ? el.get(0) : (typeof el == "string" ? document.getElementById(el) : el);
		$.extend(this, config);
		this.init();
	}
	SearchBar.prototype = {
	  dateKeyMap: {
	  	key: 'key',
	  	value: 'value'
	  },
	  tp: `<div class="searchBar-wrap">
			    <div class="searchBar-item-wrap">
				    <div class="searchBar-item searchBar-item-inputbg searchBar-item-u">
				      <label class="searchBar-item-label"></label>
				      <input class="searchBar-item-input" type="text"/>
				      <a class="searchBar-item-trigger" href="javascript:;"><i class="fa fa-search"></i></a>
				      <ul class="searchBar-item-list"></ul>
				      <div class="searchBar-item-error" style="display: none;">
								<i class="fa fa-warning"></i><span class="searchBar-item-error-msg"></span>
							</div>
				    </div>
					  <div class="searchBar-item searchBar-item-inputbg searchBar-item-du">
					    <label class="searchBar-item-label">时间范围:</label>
					    <input class="searchBar-item-input" type="text" disabled="true"/>
					    <input class="searchBar-item-input-value" type="hidden"/>
					    <a class="searchBar-item-trigger" href="javascript:;"><i class="fa fa-calendar-check-o"></i></a>
					    <ul class="searchBar-item-list"></ul>
					  </div>
				    <div class="searchBar-item searchBar-item-download">下载报告</div>
				  </div>
				  <div class="searchBar-item searchBar-item-rote"><i class="fa fa-angle-right"></i></div>
				</div>`,
	  init: function() {
	  	this.el.innerHTML = this.tp;
	  	var label = this.el.querySelector(".searchBar-item-label");
	  	label.innerHTML = this.label + ":";
	  	this.itemWrap = this.el.querySelector(".searchBar-item-wrap");
	  	//this.$itemWrap = $(this.itemWrap);
	  	this.u = this.el.querySelector(".searchBar-item-u");
	  	this.uInput = this.u.querySelector(".searchBar-item-input");
	  	this.uList = this.u.querySelector(".searchBar-item-list");
	  	this.du = this.el.querySelector(".searchBar-item-du");
	  	this.duInput = this.du.querySelector(".searchBar-item-input");
	  	this.duInputValue = this.du.querySelector(".searchBar-item-input-value");
	  	this.duList = this.du.querySelector(".searchBar-item-list");
	  	this.rote = this.el.querySelector(".searchBar-item-rote");
	  	this.$error = $(this.el.querySelector(".searchBar-item-error"));
	  	this.errorMsg = this.el.querySelector(".searchBar-item-error-msg");
	  	$(this.rote).bind("click", e => {
	  		this.showWrap();
	  	});
	  	$(this.u).bind("click", e => {
	  		console.log(e.target);
	  		if(!this.hasClass(e.target, "searchBar-item-trigger") && !this.hasClass(e.target, "fa-search")) {
	  			this.expand(this.u, this.uList);
	  		} else {
	  			this.onSubmit();
	  		}
	  	});
	  	$(this.uInput).bind("keyup", e => {
	  		if(e.keyCode == 13) {
	  			this.onSubmit();
	  		}
	  	});
	    $(this.du).bind("click", e => {
	    	this.expand(this.du, this.duList);
	  	});
	    $(this.uList).bind("click", e => {
	    	this.choose(e);
	    	this.onSubmit();
	  	});
	    $(this.duList).bind("click", e => {
	      this.chooseDate(e);
	      this.onSubmit();
	  	});
	    $(this.el.querySelector(".searchBar-item-download")).bind("click", e => {
	    	this.onDownload();
	  	});
	    this.addItem(this.dateList, this.duList);
	  },
	  dateList: [{
	  	key: '1d',
	  	value: '最近24小时'
	  }, {
	  	key: '7d',
	  	value: '最近7天'
	  }, {
	  	key: '30d',
	  	value: '最近30天'
	  }, {
	  	key: '0d',
	  	value: '本日'
	  }, {
	  	key: '0w',
	  	value: '本周'
	  }, {
	  	key: '0m',
	  	value: '本月'
	  }],
	  getDateTextByKey: function(key) {
	  	var rs = "";
	  	for(var i = 0; i < this.dateList.length; i++) {
	  		if(this.dateList[i][this.dateKeyMap.key] == key) {
	  			return this.dateList[i][this.dateKeyMap.value];
	  		}
	  	}
	  },
	  hasClass : function(el, className) {
	    return className && (' ' + el.className + ' ').indexOf(' ' + className + ' ') != -1;
	  },
	  showError: function(error) {
	  	this.errorMsg.innerHTML = error;
	  	this.$error.fadeIn(() => {
	  		this.timeout = setTimeout(() => {
	  			clearTimeout(this.timeout);
	  			this.$error.fadeOut();
	  		}, 2000);
	  	});
	  },
	  showWrap: function() {
	  	if(this.hasClass(this.el, "searchBar-item-open")) {
	  		$(this.el).removeClass("searchBar-item-open");
				this.itemWrap.style.visibility = "hidden";
			} else {
				$(this.el).addClass("searchBar-item-open");
				this.itemWrap.style.visibility = "visible";
			}
	  },
	  expand : function(trigger, list) {
	  	if(this.hasClass(trigger, "searchBar-item-open")) {
	  		return;
	  	}
	  	$(list).slideDown();
	  	$(trigger).addClass("searchBar-item-open");
	    $(document).bind("mousedown", {scope : this, trigger: trigger, list: list}, this._collapseIf);
	  },
	  collapse : function(trigger, list) {
	    if(!this.hasClass(trigger, "searchBar-item-open")) {
	      return;
	    }
	    $(list).slideUp();
	    $(trigger).removeClass("searchBar-item-open");
	    $(document).unbind("mousedown", this._collapseIf);
	    $(document).unbind("mousewheel DOMMouseScroll", this._collapseIf);
	  },
	  _collapseIf : function(e) {
	  	var opt = e.data;
	  	if(opt && opt.scope) {
	  		opt.scope.collapseIf(e, e.target, opt);
	  	}
	  },
	  collapseIf : function(e, target, opt) {
	    if(!opt.trigger.contains(target) && !opt.list.contains(target)) {
	    	opt.scope.collapse(opt.trigger, opt.list);
	    }
	  },
	  chooseDate: function(e) {
	  	if(this.hasClass(e.target, "searchBar-item-choose")) {
	    	this.setDate(e.target.getAttribute(this.dateKeyMap.key));
	    }
	  },
	  choose: function(e) {
	  	if(this.hasClass(e.target, "searchBar-item-choose")) {
	    	this.setValue(e.target.getAttribute(this.dateKeyMap.key));
	    }
	  },
	  setDate: function(key) {
	  	this.duInputValue.value = key;
	  	this.duInput.value = this.getDateTextByKey(key);
	  },
	  getDateKey: function() {
	  	return this.duInputValue.value;
	  },
	  setValue: function(key, dateKey) {
	  	this.uInput.value = key;
	  	if(dateKey !== undefined) {
	  		this.setDate(dateKey);
	  	}
	  },
	  getData: function() {
	  	return {
	      v: this.uInput.value,
	  		key: this.duInputValue.value,
	  		value: this.duInput.value,
	  		time: this.getDateByShortcut(this.duInputValue.value)
	  	};
	  },
	  onSubmit: function() {
	  	this.submit(this.uInput.value, {
	  		key: this.duInputValue.value,
	  		value: this.duInput.value,
	  		time: this.getDateByShortcut(this.duInputValue.value)
	  	});
	  },
	  onDownload: function() {
	  	this.download(this.uInput.value, {
	  		key: this.duInputValue.value,
	  		value: this.duInput.value,
	  		time: this.getDateByShortcut(this.duInputValue.value)
	  	});
	  },
	  submit: function(v, date) {},
	  download: function(v, date) {},
	  addItem: function(ds, list) {
	  	var rs = [];
	  	ds = ds || [];
	  	for(var i = 0; i < ds.length; i++) {
	  		rs.push('<li><a class="searchBar-item-choose" href="javascript:;" key="' + ds[i][this.dateKeyMap.key] + '">' + (ds[i][this.dateKeyMap.value] === undefined ? "&nbsp;" : ds[i][this.dateKeyMap.value]) + '</a></li>');
	  	}
	  	list.innerHTML = rs.join("");
	  },
	  load: function(ds) {
	  	ds = ds || [];
	  	var rs = [];
	  	for(var i = 0; i < ds.length; i++) {
	  		var G, crs = [];
	  		if(ds[i][this.dateKeyMap.key]) {
	  			G = ds[i][this.dateKeyMap.key].split(",");
	  			for(var j = 0; j < G.length; j++) {
	  				crs.push('<li><a class="searchBar-item-choose" href="javascript:;" key="' + G[j] +  '">' + G[j] + '</a></li>');
	  			}
	  		}
	  		rs.push(
	  		  '<li><a class="searchBar-item-choose" href="javascript:;" key="' + ds[i][this.dateKeyMap.key] + '">' + (ds[i][this.dateKeyMap.value] === undefined ? "&nbsp;" : ds[i][this.dateKeyMap.value]) + '</a><ul class="searchBar-item-subList">' + crs.join("") + '</ul>' + '</li>'
	  		);
	  	}
	  	this.uList.innerHTML = rs.join("");
	  	return this;
	  },
	  getDateByShortcut(shortcut) {
	    var current = new Date(), start, end;
	    if(shortcut == '1d') {
	      starta = new Date(current.getTime() - 3600 * 1000 * 23).toString();
	       startb = starta.split(":");
	       startc =startb[0];
	       start = startc+':00:00';
	      end = current;
	    } else if(shortcut == '0d') {
	      start = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 0, 0, 0);
	      end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours(), current.getMinutes(), current.getSeconds());
	    } else if(shortcut == '0w') {
	      var nowDay = current.getDay();
	      if(nowDay === 0) {//周日
	        // console.log(0);
	        start = new Date(current.getFullYear(), current.getMonth(), current.getDate() - nowDay - 6, 0, 0, 0);
	        end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours(), current.getMinutes(), current.getSeconds());
	      } else if(nowDay === 1) {
	        // console.log(1);
	        start = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 0, 0, 0);
	        end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours(), current.getMinutes(), current.getSeconds());
	      } else {
	        start = new Date(current.getFullYear(), current.getMonth(), current.getDate() - nowDay + 1, 0, 0, 0);
	        end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours(), current.getMinutes(), current.getSeconds());
	      }
	    } else if(shortcut == '0m') {
	      start = new Date(current.getFullYear(), current.getMonth(), 1, 0, 0, 0);
	      end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours(), current.getMinutes(), current.getSeconds());
	    } else if(shortcut == 'curSeason') {
	      start = new Date(current.getFullYear(), current.getMonth(), 1, 0, 0, 0);
	      end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59);
	    } else if (shortcut == 'lastYear') {
	      start = new Date(current.getFullYear() - 1, 0, 1, 0, 0, 0);
	      end = new Date(current.getFullYear() - 1, 11, 31, 23, 59, 59);
	    } else if (shortcut == 'curYear') {
	      start = new Date(current.getFullYear(), 0, 1, 0, 0, 0);
	      end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59);
	    } else if (shortcut == '7d') {
	      start = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 6, 0, 0, 0);
	      end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours(), current.getMinutes(), current.getSeconds());
	    } else if (shortcut == '30d') {
	      start = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 29, 0, 0, 0);
	      end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours(), current.getMinutes(), current.getSeconds());
	    }
	    return [start, end];
	  }
	};
	global.SearchBar = SearchBar;
})(ailpha.ui);