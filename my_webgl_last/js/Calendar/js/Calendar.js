class Calendar {
	constructor(props) {
  	this.weeks = [7, 1, 2, 3, 4, 5, 6];
  	this.rows = 7;
    this.listAlign = "tl-bl?";
    this.shortcut = {
      "today": "本日",
      "curWeek": "本周",
      "curMonth": "本月",
      "curSeason": "本季度",
      "curYear": "本年",
      "lastYear": "去年",
      "near7day": "最近7天",
      "near30day": "最近30天"
    }
  	this.tp = `<div class="uxd-calendar-contain">
  		           <div class="uxd-calendar-startTime">
                   <div class="uxd-calendar-oper-wrap">
  	                 <div class="uxd-calendar-input-wrap">
  	                   <input class="uxd-calendar-input-date" type="text"/>
  	                   <input class="uxd-calendar-input-time" type="text"/>
  	                 </div>
                     <div class="uxd-calendar-oper">
                       <a class="uxd-calendar-pervYear"></a>
                       <a class="uxd-calendar-pervMonth"></a>
                       <span class="uxd-calendar-center">
                         <a class="year"></a>年
                         <a class="month"></a>月
                       </span>
                       <a class="uxd-calendar-nextMonth"></a>
                       <a class="uxd-calendar-nextYear"></a>
                     </div>
                   </div>
  			           <table border="0" cellpadding="0" cellspacing="0">
                     <thead></thead>
                     <tbody></tbody>
  			           </table>
  							 </div>
  						   <div class="uxd-calendar-endTime">
                   <div class="uxd-calendar-oper-wrap">
  	                 <div class="uxd-calendar-input-wrap">
  	                   <input class="uxd-calendar-input-date" type="text"/>
  	                   <input class="uxd-calendar-input-time" type="text"/>
  	                 </div>
                     <div class="uxd-calendar-oper">
  	                   <a class="uxd-calendar-pervYear"></a>
  	                   <a class="uxd-calendar-pervMonth"></a>
  	                   <span class="uxd-calendar-center">
  	                     <a class="year"></a>年
                         <a class="month"></a>月
  	                   </span>
  	                   <a class="uxd-calendar-nextMonth"></a>
  	                   <a class="uxd-calendar-nextYear"></a>
                     </div>
                   </div>
  			           <table border="0" cellpadding="0" cellspacing="0">
                     <thead></thead>
                     <tbody></tbody>
  			           </table>
  			         </div>
  			         <div class="uxd-calendar-shortcut">
  			           <ul>
  			             <li><a class="uxd-calendar-btn uxd-calendar-shortcut-link" rel="today">本日</a></li>
  			             <li><a class="uxd-calendar-btn uxd-calendar-shortcut-link" rel="curWeek">本周</a></li>
  			             <li><a class="uxd-calendar-btn uxd-calendar-shortcut-link" rel="curMonth">本月</a></li>
  			             <li><a class="uxd-calendar-btn uxd-calendar-shortcut-link" rel="curSeason">本季度</a></li>
  			             <li><a class="uxd-calendar-btn uxd-calendar-shortcut-link" rel="curYear">本年</a></li>
  			             <li><a class="uxd-calendar-btn uxd-calendar-shortcut-link" rel="lastYear">去年</a></li>
  			             <li><a class="uxd-calendar-btn uxd-calendar-shortcut-link" rel="near7day">最近7天</a></li>
  			             <li><a class="uxd-calendar-btn uxd-calendar-shortcut-link" rel="near30day">最近30天</a></li>
  			           </ul>
  			         </div>
  					   </div>
               <input class="uxd-calendar-el" type="hidden"/>
  					   <div class="uxd-calendar-btn-wrap">
  					     <a class="uxd-calendar-btn-clear" style="display: none;">清空</a>
  					     <a class="uxd-calendar-btn-ok">确定</a>
  					   </div>`;
  	this.apply(this, props);
  	this.el = this.el.get ? this.el.get(0) : (typeof this.el == "string" ? document.getElementById(this.el) : this.el);
  	this.createPick();
  }
	/**
  a对象复制b对象
  @memberof Calendar
  @method apply
  @param object a, object b
  @example apply(object a, object b)
  **/
	apply(a, b) {
    if(a && b && typeof b == 'object') {
      for(var p in b) {
        a[p] = b[p];
      }
    }
    return a;
  }
  /**
  创建面板
  @memberof Calendar
  @method createPick
  @param
  @example createPick()
  **/
  createPick() {
  	if(!this.calendar) {
  		this.calendar = document.createElement('div');
  		this.calendar.className = 'uxd-calendar';
  		this.calendar.innerHTML = this.tp;
  		document.body.appendChild(this.calendar);
      this.input = this.calendar.querySelector('.uxd-calendar-el');
  		this.startTimeDom = this.calendar.querySelector('.uxd-calendar-startTime');
  		this.endTimeDom = this.calendar.querySelector('.uxd-calendar-endTime');
      this.startTable = this.startTimeDom.querySelector('table');
      this.endTable = this.endTimeDom.querySelector('table');
  		this.startTbody = this.startTable.querySelector('tbody');
  		this.endTbody = this.endTable.querySelector('tbody');
  		this.startYearDom = this.startTimeDom.querySelector('.year');
  		this.endYearDom = this.endTimeDom.querySelector('.year');
  		this.startMonthDom = this.startTimeDom.querySelector('.month');
  		this.endMonthDom = this.endTimeDom.querySelector('.month');
  		this.startDateInput = this.startTimeDom.querySelector('.uxd-calendar-input-date');
  		this.endDateInput = this.endTimeDom.querySelector('.uxd-calendar-input-date');
  		this.startTimeInput = this.startTimeDom.querySelector('.uxd-calendar-input-time');
  		this.endTimeInput = this.endTimeDom.querySelector('.uxd-calendar-input-time');
  		
  		this.start_pervYearBtn = this.startTimeDom.querySelector('.uxd-calendar-pervYear');
  		this.start_nextYearBtn = this.startTimeDom.querySelector('.uxd-calendar-nextYear');
  		this.start_pervMonth = this.startTimeDom.querySelector('.uxd-calendar-pervMonth');
  		this.start_nextMonth = this.startTimeDom.querySelector('.uxd-calendar-nextMonth');
  		
  		this.end_pervYearBtn = this.endTimeDom.querySelector('.uxd-calendar-pervYear');
  		this.end_nextYearBtn = this.endTimeDom.querySelector('.uxd-calendar-nextYear');
  		this.end_pervMonth = this.endTimeDom.querySelector('.uxd-calendar-pervMonth');
  		this.end_nextMonth = this.endTimeDom.querySelector('.uxd-calendar-nextMonth');
  		
  		if(this.clear) {
  			this.calendar.querySelector(".uxd-calendar-btn-clear").style.display = "";
  		}
  		
  		this.addEvent();
  	}
  	let rs = [];
  	for(let i = 0; i < this.rows; i++) {
  		rs.push('<tr>');
  		for(let j = 0; j < this.weeks.length; j++) {
  			if(i === 0) {
  				rs.push('<th>' + this.getWeekText(this.weeks[j]) + '</th>');
  			} else {
  				rs.push('<td>&nbsp;</td>');
  			}
  		}
  		rs.push('</tr>');
  	}
  	this.startTbody.innerHTML = rs.join('');
  	this.endTbody.innerHTML = rs.join('');
    this.startCells = [];
    for(let i = 1; i < this.startTable.rows.length; i++) {
      for(let j = 0; j < this.startTable.rows[i].cells.length; j++) {
        this.startCells.push(this.startTable.rows[i].cells[j]);
        this.startTable.rows[i].cells[j].onclick = e => {
          if(this.hasCls(e.target, 'curMonth')) {
            //this.start = new Date(this.start.getFullYear(), this.start.getMonth(), e.target.rel);
            //this.startDateInput.value = this.transDate(this.start, 'YYYY-MM-DD');
          	/*let sd = this.calendar.querySelectorAll(".selectDate");
          	if(sd.length < 1) {
          		this.start = new Date(this.start.getFullYear(), this.start.getMonth(), e.target.rel);
          		this.startDateInput.value = this.transDate(this.start, 'YYYY-MM-DD');
          	} else {
          		this.end = new Date(this.start.getFullYear(), this.start.getMonth(), e.target.rel);
          		this.endDateInput.value = this.transDate(this.end, 'YYYY-MM-DD');
          	}
            this.setSelect();*/
          	let sd = this.calendar.querySelectorAll(".selectDate");
            if(sd.length < 1) {
            	this.addClass(e.target, "selectDate");
          	} else if(sd.length == 1) {
          		this.addClass(e.target, "selectDate");
          		if(e.target == sd[0]) {
          			this.start = new Date(sd[0].relDate.getFullYear(), sd[0].relDate.getMonth(), sd[0].relDate.getDate(), 0, 0, 0);
          			this.startDateInput.value = this.transDate(this.start, 'YYYY-MM-DD');
          			this.startTimeInput.value = this.transDate(this.start, 'hh:mm:ss');
          			this.end = new Date(sd[0].relDate.getFullYear(), sd[0].relDate.getMonth(), sd[0].relDate.getDate(), 23, 59, 59);
          			this.endDateInput.value = this.transDate(this.end, 'YYYY-MM-DD');
          			this.endTimeInput.value = this.transDate(this.end, 'hh:mm:ss');
          		} else {
          			let _sd = this.calendar.querySelectorAll(".selectDate");
            		if(_sd.length == 2) {
            			this.start = _sd[0].relDate;
              		this.startDateInput.value = this.transDate(this.start, 'YYYY-MM-DD');
              		this.end = _sd[1].relDate;
              		this.endDateInput.value = this.transDate(this.end, 'YYYY-MM-DD');
            		}
          		}
          	} else if(sd.length > 1) {
          		this.calendar.querySelectorAll(".curMonth").forEach(item => {
          			if(e.target == item) {
          				this.addClass(item, "selectDate");
          			} else {
          				this.removeClass(item, "selectDate");
          			}
          		});
          	}
          }
        }
      }
    }
    this.endCells = [];
    for(let i = 1; i < this.endTable.rows.length; i++) {
      for(let j = 0; j < this.endTable.rows[i].cells.length; j++) {
        this.endCells.push(this.endTable.rows[i].cells[j]);
        this.endTable.rows[i].cells[j].onclick = e => {
          if(this.hasCls(e.target, 'curMonth')) {
            /*//this.end = new Date(this.end.getFullYear(), this.end.getMonth(), e.target.rel);
            //this.endDateInput.value = this.transDate(this.end, 'YYYY-MM-DD');
          	let sd = this.calendar.querySelectorAll(".selectDate");  	
          	if(sd.length < 1) {
          		//this.start = new Date(this.start.getFullYear(), this.start.getMonth(), e.target.rel);
          		this.start = e.target.relDate;
          		this.startDateInput.value = this.transDate(this.start, 'YYYY-MM-DD');
          	} else if(sd.length == 1) {
          		//this.end = new Date(this.start.getFullYear(), this.start.getMonth(), e.target.rel);
          		this.end = e.target.relDate;
          		this.endDateInput.value = this.transDate(this.end, 'YYYY-MM-DD');
          	} else if(sd.length > 1) {
          		console.log(111);
          		sd.forEach(item => {
          			this.removeClass(item, "selectDate");
          		});
          	}
            this.setSelect();*/
          	let sd = this.calendar.querySelectorAll(".selectDate");
            if(sd.length < 1) {
            	this.addClass(e.target, "selectDate");
          	} else if(sd.length == 1) {
          		this.addClass(e.target, "selectDate");
          		if(e.target == sd[0]) {
          			this.start = new Date(sd[0].relDate.getFullYear(), sd[0].relDate.getMonth(), sd[0].relDate.getDate(), 0, 0, 0);
          			this.startDateInput.value = this.transDate(this.start, 'YYYY-MM-DD');
          			this.startTimeInput.value = this.transDate(this.start, 'hh:mm:ss');
          			this.end = new Date(sd[0].relDate.getFullYear(), sd[0].relDate.getMonth(), sd[0].relDate.getDate(), 23, 59, 59);
          			this.endDateInput.value = this.transDate(this.end, 'YYYY-MM-DD');
          			this.endTimeInput.value = this.transDate(this.end, 'hh:mm:ss');
          		} else {
          			let _sd = this.calendar.querySelectorAll(".selectDate");
            		if(_sd.length == 2) {
            			this.start = _sd[0].relDate;
              		this.startDateInput.value = this.transDate(this.start, 'YYYY-MM-DD');
              		this.end = _sd[1].relDate;
              		this.endDateInput.value = this.transDate(this.end, 'YYYY-MM-DD');
            		}
          		}
          	} else if(sd.length > 1) {
          		this.calendar.querySelectorAll(".curMonth").forEach(item => {
          			if(e.target == item) {
          				this.addClass(item, "selectDate");
          			} else {
          				this.removeClass(item, "selectDate");
          			}
          		});
          	}
          }  
        }
      }
    }
  }
  checkoutRange(start, end) {
  	return new Date(this.startDateInput.value + " " + this.startTimeInput.value).getTime() < new Date(this.endDateInput.value + " " + this.endTimeInput.value).getTime();
  }
  getValue() {
  	return [this.startDateInput.value + " " + this.startTimeInput.value, this.endDateInput.value + " " + this.endTimeInput.value];
  }
  afterSubmit(v) {}
  hide() {
    this.calendar.style.display = "none";
  }
  doClear() {
  	this.isClear = true;
		this.afterClear();
  }
  addEvent() {
  	/*this.startTimeDom.querySelector('.uxd-calendar-center').onclick = e => {
			this.startDateInput.focus();
		}
		this.endTimeDom.querySelector('.uxd-calendar-center').onclick = e => {
    	this.endDateInput.focus();
		}*/
  	this.el.onclick = e => {
  		this.show();
  	}
  	document.onmousedown = e => {
  		if(!this.calendar.contains(e.target)) {
  			this.hide();
  		}
  	}
  	this.calendar.querySelector(".uxd-calendar-btn-ok").onclick = e => {
  		this.isClear = false;
      this.currentShortcut = this.getShortcutTextByDate(this.getValue());
  		this.afterSubmit(this.getValue(), this.currentShortcut);
  	}
  	this.calendar.querySelector(".uxd-calendar-btn-clear").onclick = e => {
  		this.doClear();
  	}
    this.startDateInput.onblur = e => {
    	let v = e.target.value;
    	let de = new Date(v);
    	if (this.checkDate(v) && this.checkoutRange()) {
  			let deStr = this.transDate(de, 'YYYY-MM-DD');
    		if(deStr != this.transDate(this.start, 'YYYY-MM-DD')) {
    			e.target.value = deStr;
          this.setDate(de, null, true);
          this.setSelect();
    		}
      } else {
      	e.target.value = this.transDate(this.start, 'YYYY-MM-DD');
      }
    }
    this.startTimeInput.onblur = e => {
    	let v = e.target.value;
    	if(this.checkTime(v) && this.checkoutRange()) {
    		this.startTime = v;
    	} else {
    		e.target.value = this.startTime;
    	}
    }
    this.endDateInput.onblur = e => {
    	let v = e.target.value;
    	if (this.checkDate(v) && this.checkoutRange()) {
    		let de = new Date(v);
    		let deStr = this.transDate(de, 'YYYY-MM-DD');
    		if(deStr != this.transDate(this.end, 'YYYY-MM-DD')) {
    			e.target.value = deStr;
          this.setDate(null, de, true);
          this.setSelect();
    		}
      } else {
      	e.target.value = this.transDate(this.end, 'YYYY-MM-DD');
      }
    }
    this.endTimeInput.onblur = e => {
    	let v = e.target.value;
    	if(this.checkTime(v) && this.checkoutRange()) {
    		this.endTime = v;
    	} else {
    		e.target.value = this.endTime;
    	}
    }
		this.calendar.querySelectorAll('.uxd-calendar-shortcut-link').forEach(item => {
			item.onclick = e => { 
        this.setShortcute(item['rel']);
			}
		});
		this.start_pervYearBtn.onclick = e => {
			if(!this.hasCls(e.target, "uxd-calendar-disabled")) {
				this.setDate(new Date(this.start.getFullYear() - 1, this.start.getMonth(), this.start.getDate()), false);
			}
		}
		this.start_nextYearBtn.onclick = e => {
			if(!this.hasCls(e.target, "uxd-calendar-disabled")) {
			  this.setDate(new Date(this.start.getFullYear() + 1, this.start.getMonth(), this.start.getDate()), false);
			}
		}
		this.start_pervMonth.onclick = e => {
			if(!this.hasCls(e.target, "uxd-calendar-disabled")) {
			  this.setDate(new Date(this.start.getFullYear(), this.start.getMonth() - 1, this.start.getDate()), false);
			}
		}
		this.start_nextMonth.onclick = e => {
			if(!this.hasCls(e.target, "uxd-calendar-disabled")) {
				this.setDate(new Date(this.start.getFullYear(), this.start.getMonth() + 1, this.start.getDate()), false);
			}
		}
		this.end_pervYearBtn.onclick = e => {
			if(!this.hasCls(e.target, "uxd-calendar-disabled")) {
				this.setDate(false, new Date(this.end.getFullYear() - 1, this.end.getMonth(), this.end.getDate()));
			}
		}
		this.end_nextYearBtn.onclick = e => {
			if(!this.hasCls(e.target, "uxd-calendar-disabled")) {
				this.setDate(false, new Date(this.end.getFullYear() + 1, this.end.getMonth(), this.end.getDate()));
			}
		}
		this.end_pervMonth.onclick = e => {
			if(!this.hasCls(e.target, "uxd-calendar-disabled")) {
				this.setDate(false, new Date(this.end.getFullYear(), this.end.getMonth() - 1, this.end.getDate()));
			}
		}
		this.end_nextMonth.onclick = e => {
			if(!this.hasCls(e.target, "uxd-calendar-disabled")) {
				this.setDate(false, new Date(this.end.getFullYear(), this.end.getMonth() + 1, this.end.getDate()));
			}
		}
  }
  setShortcute(short) {
    let rs = this.getDateByShortcut(short);
    if(rs[0] && rs[1]) {
      this.setDate(rs[0], rs[1]);
      this.startDateInput.value = this.transDate(rs[0], 'YYYY-MM-DD');
      this.startTime = this.startTimeInput.value = this.transDate(rs[0], 'hh:mm:ss');

      this.endDateInput.value = this.transDate(rs[1], 'YYYY-MM-DD');
      this.endTime = this.endTimeInput.value = this.transDate(rs[1], 'hh:mm:ss');
    } else {
      if(rs[0]) {
        this.setDate(rs[0], null);
        this.startDateInput.value = this.transDate(rs[0], 'YYYY-MM-DD');
        this.startTime = this.startTimeInput.value = this.transDate(rs[0], 'hh:mm:ss');
      }
    }
    this.setSelect();
    this.currentShortcut = {
      "text": this.shortcut[short],
      "value": short
    };
  }
  getShortcutTextByDate(startEnd) {
    for(var n in this.shortcut) {
      let date = this.getDateByShortcut(n);
      if(startEnd[0] == this.transDate(date[0], 'YYYY-MM-DD hh:mm:ss') && startEnd[1] == this.transDate(date[1], 'YYYY-MM-DD hh:mm:ss')) {
        return {
          "text": this.shortcut[n],
          "value": n
        };
      }
    }
    return null;
  }
  setSelect() {
    let sDate = this.transDate(this.start, "YYYY-MM-DD");
    let eDate = this.transDate(this.end, "YYYY-MM-DD");
    /*this.calendar.querySelectorAll(".selectDate").forEach(item => {
    	this.removeClass(item, 'selectDate');
    });*/
    this.calendar.querySelectorAll(".curMonth").forEach(item => {
    	if(sDate == this.transDate(item.relDate, "YYYY-MM-DD") || eDate == this.transDate(item.relDate, "YYYY-MM-DD")) {
    		this.addClass(item, 'selectDate');
    	} else {
    		this.removeClass(item, 'selectDate');
    	}
    });
    /*for(let i = 1; i < this.startCells.length; i++) {
      if(this.hasCls(this.startCells[i], 'curMonth') && sDate == this.startCells[i].rel) {
        this.addClass(this.startCells[i], 'selectDate');
      } else {
        this.removeClass(this.startCells[i], 'selectDate');
      }
    }
    for(let i = 1; i < this.endCells.length; i++) {
      if(this.hasCls(this.endCells[i], 'curMonth') && eDate == this.endCells[i].rel) {
        this.addClass(this.endCells[i], 'selectDate');
      } else {
        this.removeClass(this.endCells[i], 'selectDate');
      }
    }*/
  }
  /*selectDate(sTd, eTd) {
  	if(sTd) {
  		for(let i = 1; i < this.startCells.length; i++) {
  			this.removeClass(this.startCells[i], 'selectDate');
      }
  		if(this.hasCls(sTd, 'curMonth')) {
    		this.addClass(sTd, 'selectDate');
    	}
  	}
  	if(eTd) {
  		for(let i = 1; i < this.endCells.length; i++) {
      	this.removeClass(this.endCells[i], 'selectDate');
      }
  		if(this.hasCls(eTd, 'curMonth')) {
    		this.addClass(eTd, 'selectDate');
    	}
  	}
  }*/
  checkTime(timeStr) {
  	if (/^([0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/.test(timeStr)) {
      if ((parseInt(RegExp.$1) < 24) && (parseInt(RegExp.$2) < 60) && (parseInt(RegExp.$3) < 60)) {
      	return true;
      }
    }
  	return false;
  }
  checkDate(dateStr) {
  	/* if(/^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/.test(dateStr)) {
  		return true;
    }
  	return false; */
  	return new Date(dateStr).getDate() == dateStr.substring(dateStr.length - 2);
  }
  hasCls(dom, className) {
  	return className && dom.className && (" " + dom.className + " ").indexOf(" " + className + " ") !== -1;
  }
  addClass(dom, className) {
    if(!this.hasCls(dom, className)) {
      dom.className = dom.className + " " + className;
    }
  }
  removeClass(dom, className) {
    if(className && dom.className){
      if(this.hasCls(dom, className)){
        dom.className = dom.className.replace(new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)', "g"), " ");
      }
    }
  }
  setStatus(type) {
  	if(!this.startLastDate || !this.endLastDate) {
			return;
		}
  	let start_year = this.startLastDate.getFullYear();
  	let start_month = this.startLastDate.getMonth();
  	
  	let end_year = this.endLastDate.getFullYear();
  	let end_month = this.endLastDate.getMonth();
  	
  	this.removeClass(this.start_nextYearBtn, "uxd-calendar-disabled");
		this.removeClass(this.start_nextMonth, "uxd-calendar-disabled");
		this.removeClass(this.end_pervYearBtn, "uxd-calendar-disabled");
		this.removeClass(this.end_pervMonth, "uxd-calendar-disabled");
  	if(start_year + 1 == end_year) {
  		if(start_month >= end_month) {
  			this.addClass(this.start_nextYearBtn, "uxd-calendar-disabled");
  			this.addClass(this.end_pervYearBtn, "uxd-calendar-disabled");
  		}
  		if(start_month == 11 && end_month == 0) {
  			this.addClass(this.start_nextMonth, "uxd-calendar-disabled");
  			this.addClass(this.end_pervMonth, "uxd-calendar-disabled");
  		}
  	} else if(start_year >= end_year) {
  		this.addClass(this.start_nextYearBtn, "uxd-calendar-disabled");
			this.addClass(this.end_pervYearBtn, "uxd-calendar-disabled");
			if(start_month + 1 >= end_month) {
				this.addClass(this.start_nextMonth, "uxd-calendar-disabled");
  			this.addClass(this.end_pervMonth, "uxd-calendar-disabled");
			}
  	}
  }
  /**
  某月第一天为星期几
  @memberof Calendar
  @method getWeekOfFirstDay
  @param
  @example getWeekOfFirstDay(new Date)
  **/
  /*getWeekOfFirstDay(date) {
  	let year = date.getFullYear();
  	let month = date.getMonth();
  	return new Date(year, parseInt(month, 10), 1).getDay();
  }*/
  /**
  计算某年某月有多少天,如果是二月，闰年28天否则29天
  @memberof Calendar
  @method getDaysOfMonth
  @param
  @example getDaysOfMonth(new Date)
  **/
  getDaysOfMonth(year, month) {
  	//let year = date.getFullYear();
  	//let month = date.getMonth();
  	//console.log(month);
    return [31, (year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }
  /**
  得到上个月补全的天数
  @memberof Calendar
  @method getDayOfLastMonth
  @param
  @example getDayOfLastMonth(new Date())
  **/
  /*getDayOfLastMonth(currentWeek) {
    if(currentWeek != 0) {
      return currentWeek;
    } else {
      return currentWeek + 7;
    }
  }*/
  getWeekText(num) {
  	return ['一', '二', '三', '四', '五', '六', '日'][num - 1];
  }
  getLastDateOfPervMonth(date) {
  	return new Date(date.getFullYear(), date.getMonth(), 0);
  }
	getFirstDateOfMonth(date) {
		return new Date(date.getFullYear(), date.getMonth(), 1);
	}
	getLastDateOfMonth(date) {
		let year = date.getFullYear();
		let month = date.getMonth();
		return new Date(year, month, this.getDaysOfMonth(year, month));
	}
  getPervMonthLastDays(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let currentWeek = new Date(year, parseInt(month, 10), 1).getDay();
    let pervNum = currentWeek != 0 ? currentWeek : currentWeek + 7;
    let rs = [];
    for(let i = 0; i < pervNum; i++) {
      //rs.unshift(new Date(year, month, 0 - i).toLocaleString());
      rs.unshift({type: 'pervMonth', value: new Date(year, month, 0 - i)});
    }
    let num = this.getDaysOfMonth(year, month);
    for(let i = 0; i < num; i++) {
      rs.push({type: 'curMonth', value: new Date(year, month, i + 1)});
      //console.log(new Date(year, month, nextNum).toLocaleString());
    }
    //console.log(new Date(year, month, num).toLocaleString());
    let nextNum = 42 - pervNum - num;
    for(let i = 0; i < nextNum; i++) {
      rs.push({type: 'nextMonth', value: new Date(year, month, num + i + 1)});
      //console.log(new Date(year, month, num + i + 1).toLocaleString());
    }
    return rs;
  	//let year = date.getFullYear();
  	//let month = date.getMonth();
    //return parseInt(new Date(year, month - 1, 0).getDate());
  }
  format(date, format) {
    var o = {
      "M+": date.getMonth() + 1, // month
      "D+": date.getDate(), // day
      "h+": date.getHours(), // hour
      "m+": date.getMinutes(), // minute
      "s+": date.getSeconds(), // second
      "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
      "S": date.getMilliseconds()
      // millisecond
    };
    if (/(Y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }
  transDate(time, format) {
    if (!time) {
      return "";
    }
    return this.format(new Date(time), format || 'YYYY-MM-DD hh:mm:ss');
  }
  getDateByShortcut(shortcut) {
  	var current = new Date(), start, end;
  	if(shortcut == 'today') {
  		start = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 0, 0, 0);
      end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59);
  	} else if(shortcut == 'curWeek') {
  		var nowDay = current.getDay();
      if(nowDay === 0) {//周日
        start = new Date(current.getFullYear(), current.getMonth(), current.getDate() - nowDay - 6, 0, 0, 0);
        end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59);
      } else if(nowDay === 1) {
      	start = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 0, 0, 0);
      	end = new Date(current.getFullYear(), current.getMonth(), current.getDate() - nowDay + 7, 0, 0, 0);
      } else {
        start = new Date(current.getFullYear(), current.getMonth(), current.getDate() - nowDay + 1, 0, 0, 0);
        end = new Date(current.getFullYear(), current.getMonth(), current.getDate() - nowDay + 7, 23, 59, 59);
      }
  	} else if(shortcut == 'curMonth') {
  		start = new Date(current.getFullYear(), current.getMonth(), 1, 0, 0, 0);
      //end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59);
      end = this.getLastDateOfMonth(start);
      end = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59);
  	} else if(shortcut == 'curSeason') {
      var getSeason = type => {
        if(type == 1) {
          return [new Date(current.getFullYear(), 0, 1, 0, 0, 0), new Date(current.getFullYear(), 2, 31, 23, 59, 59)];
        } else if(type == 2) {
          return [new Date(current.getFullYear(), 3, 1, 0, 0, 0), new Date(current.getFullYear(), 5, 30, 23, 59, 59)];
        } else if(type == 3) {
          return [new Date(current.getFullYear(), 6, 1, 0, 0, 0), new Date(current.getFullYear(), 8, 30, 23, 59, 59)];
        } else if(type == 4) {
          return [new Date(current.getFullYear(), 9, 1, 0, 0, 0), new Date(current.getFullYear(), 11, 31, 23, 59, 59)];
        }
      }
  		//start = new Date(current.getFullYear(), current.getMonth(), 1, 0, 0, 0);
      //end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59);
      if(current.getMonth() >= 0 && current.getMonth() <= 2) {
        return getSeason(1);
      } else if(current.getMonth() >= 3 && current.getMonth() <= 5) {
        return getSeason(2);
      } else if(current.getMonth() >= 6 && current.getMonth() <= 8) {
        return getSeason(3);
      } else if(current.getMonth() >= 9 && current.getMonth() <= 11) {
        return getSeason(4);
      }
  	} else if (shortcut == 'lastYear') {
      start = new Date(current.getFullYear() - 1, 0, 1, 0, 0, 0);
      end = new Date(current.getFullYear() - 1, 11, 31, 23, 59, 59);
    } else if (shortcut == 'curYear') {
      start = new Date(current.getFullYear(), 0, 1, 0, 0, 0);
      //end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59);
      end = new Date(current.getFullYear(), 11, 31, 23, 59, 59);
    } else if (shortcut == 'near7day') {
    	start = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 6, 0, 0, 0);
    	end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59);
    } else if (shortcut == 'near30day') {
    	start = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 29, 0, 0, 0);
    	end = new Date(current.getFullYear(), current.getMonth(), current.getDate(), 23, 59, 59);
    }
  	return [start, end];
  }
  refreshPick(date, cells, type) {
    let rs = this.getPervMonthLastDays(date), last;
    for(let i = 0; i < rs.length; i++) {
      cells[i].className = rs[i]['type'];
      cells[i].rel = rs[i]['value'].getDate();
      cells[i].relDate = rs[i]['value'];
      cells[i].innerHTML = rs[i]['value'].getDate();
      if(i == rs.length - 1) {
      	if(type == 0) {
      		this.startLastDate = date;
      	} else if(type == 1) {
      		this.endLastDate = date;
      	}
      	this.setStatus();
      }
    }
  }
  setDate(start, end) {
  	if(start) {
    	this.start = start;
      this.refreshPick(start, this.startCells, 0);
      this.startYearDom.innerHTML = this.transDate(start, 'YYYY');
      this.startMonthDom.innerHTML = this.transDate(start, 'MM');
      //this.startDateInput.value = this.transDate(start, 'YYYY-MM-DD');
      //if(!isNotSetTime) {
      	//this.startTimeInput.value = this.transDate(start, 'hh:mm:ss');
      	this.startTime = this.transDate(start, 'hh:mm:ss');
      //}
    }
  	if(end) {
  		this.end = end;
    	if(start && this.transDate(start, 'YYYY-MM') == this.transDate(end, 'YYYY-MM')) {
    		let year = end.getFullYear();
        let month = end.getMonth();
        let _end = new Date(year, parseInt(month, 10) + 1, 1);
        this.refreshPick(_end, this.endCells, 1);
        this.endYearDom.innerHTML = this.transDate(_end, 'YYYY');
        this.endMonthDom.innerHTML = this.transDate(_end, 'MM');
    	} else {
    		this.refreshPick(end, this.endCells, 1);
    		this.endYearDom.innerHTML = this.transDate(end, 'YYYY');
        this.endMonthDom.innerHTML = this.transDate(end, 'MM');
    	}
      //this.endDateInput.value = this.transDate(end, 'YYYY-MM-DD');
      //if(!isNotSetTime) {
      	//this.endTimeInput.value = this.transDate(end, 'hh:mm:ss');
      	this.endTime = this.transDate(end, 'hh:mm:ss');
      //}
    }
  }
  center(dom) {
    DBapp.Css.alignTo(this.calendar, this.el, this.listAlign);
		//var d, e = this.el.getBoundingClientRect();
		//dom.style.left = e.left + this.scroll(1) + "px";
		//d = e.bottom + dom.offsetHeight / 1.5 <= this.winarea() ? e.bottom - 1 : e.top > dom.offsetHeight / 1.5 ? e.top - dom.offsetHeight + 1 : this.winarea() - dom.offsetHeight, dom.style.top = d + this.scroll() + "px";
	}
  /*scroll(a) {
		return a = a ? "scrollLeft" : "scrollTop", document.body[a] | document.documentElement[a];
	}
  winarea(a) {
    return document.documentElement[a ? "clientWidth" : "clientHeight"];
  }*/
  show() {
  	this.calendar.style.display = "block";
  	this.center(this.calendar);
  	let value = this.getValue();
  	let se;
  	if(!value || !value[0] || !value[1]) {
  		se = this.getDateByShortcut("today");
  	} else {
  		se = value;
  	}
  	let start = new Date(se[0]);
		let end = new Date(se[1]);
  	this.setDate(start, end);
    this.startDateInput.value = this.transDate(this.start, 'YYYY-MM-DD');
    this.startTimeInput.value = this.transDate(this.start, 'hh:mm:ss');
    this.endDateInput.value = this.transDate(this.end, 'YYYY-MM-DD');
    this.endTimeInput.value = this.transDate(this.end, 'hh:mm:ss');
    this.setSelect();
    return this;
  }
  setValue(start, end) {
    let s = new Date(start);
    let e = new Date(end);
    this.setDate(s, e);
    this.startDateInput.value = this.transDate(this.start, 'YYYY-MM-DD');
    this.startTimeInput.value = this.transDate(this.start, 'hh:mm:ss');
    this.endDateInput.value = this.transDate(this.end, 'YYYY-MM-DD');
    this.endTimeInput.value = this.transDate(this.end, 'hh:mm:ss');
    this.setSelect();
    this.currentShortcut = this.getShortcutTextByDate([start, end]);
  }
}
DBapp.ui.Calendar = Calendar;