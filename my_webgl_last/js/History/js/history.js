class History {
	constructor(props) {
		this.input = props["input"];
		this.listAlign = "tl-bl?";
		this.key = props["key"] || '';
		this.max = props["max"] || 10;
		this.count = 0;
		this.init();
	}
	init() {
//		var delay = (function(){
//      var timer = 0;
//      return function(callback, ms) {
//        clearTimeout(timer);
//        timer = setTimeout(callback, ms);
//      };
//    })();
		for(var i = 0; i < this.input.length; i++) {
			this.input[i].onkeyup = (e) => {
		    this.source = e.target;
		    if(this.isSpecialKey(e)) {
		    	//delay(() => {
						this.doQuery(this.source.value);
		        //return false;
		      //}, 200);
		    }
			}
			this.input[i].onfocus = (e) => {
		    this.source = e.target;
		    if(this.isSpecialKey(e)) {
		    	//delay(() => {
						this.doQuery(this.source.value);
		        //return false;
		      //}, 200);
		    }
			}
			this.input[i].onblur = (e) => {
				clearTimeout(this.clearTime);
				this.clearTime = setTimeout(() => {
					this.hide();
				}, 500);
			}
		}
	}
	isSpecialKey(e) {
		var k = e.keyCode;
    return k == 8 || !((e.type == 'keypress' && (e.ctrlKey || e.metaKey)) || k == 9 || k == 13  || k == 40 || k == 27 || (k == 16) || (k == 17) || (k >= 18 && k <= 20) || (k >= 33 && k <= 35) || (k >= 36 && k <= 39) || (k >= 44 && k <= 45));
  }
	show() {
		this.list.style.visibility = "visible";
	}
	hide() {
		this.list.style.visibility = "hidden";
		DBapp.Event.unbind(document, "mousedown", this.collapse);
	}
  collapse(e) {
  	if(!this.list.contains(e.target) && !this.source.contains(e.target)) {
			this.hide();
			//this.setHistory(this.count++);
		}
  }
	doQuery(value) {
		if(!this.list) {
			this.list = document.createElement("ul");
      this.list.className = "cls-history-menu";
      this.list.innerHTML = '';
      document.body.appendChild(this.list);
      this.hide();
      this.list.onclick = (e) => {
		    if(DBapp.Css.hasClass(e.target, "cls-history-menu-choose")) {
		    	this.setValue(e.target.getAttribute("value"));
		    	this.hide();
		    } else if(DBapp.Css.hasClass(e.target, "cls-history-menu-choose-ico")) {
		    	this.removeHistory(e.target.parentNode.getAttribute("value"));
		    	this.list.removeChild(e.target.parentNode);
		    }
			}
		}
		DBapp.Event.bind(document, "mousedown", this.collapse, this);
		this.show();
		this.list.style.width = (DBapp.Css.getWidth(this.source) - DBapp.Css.getBorderWidth(this.source, "lr")) + "px";
		DBapp.Css.alignTo(this.list, this.source, this.listAlign);
		//console.log(localStorage.getItem('history'));
		//localStorage.setItem('history', "");
		//console.log(this.getHistory());
		var data = this.getHistory(), rs = [];
		for(var i = 0; i < data.length; i++) {
			if(data[i].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
				rs.push('<li class="cls-history-menu-choose" value="' + data[i] + '">' + data[i] + '<i class="cls-history-menu-choose-ico"></i></li>');
			}
		}
		this.list.innerHTML = rs.join("");
	}
	setValue(v) {
		if(this.source) {
			this.source.value = v;
			this.afterSetValue(v);
		}
	}
	getValue() {
		if(this.source) {
			return this.source.value;
		}
		return null;
	}
	submit() {
		this.setHistory(this.getValue());
	}
	getHistory() {
		var rs = localStorage.getItem(this.key);
		if(rs == null || rs == "") {
			return [];
		}
		return JSON.parse(localStorage.getItem(this.key));
	}
	setHistory(v) {
		if(DBapp.isBlank(v)) {
			return;
		}
		var rs = this.getHistory();
		if(rs.length >= this.max) {
			rs.pop();
		}
		DBapp.remove(rs, v);
		rs.unshift(v);
		localStorage.setItem(this.key, JSON.stringify(rs));
	}
	removeHistory(v) {
		var rs = this.getHistory();
		DBapp.remove(rs, v);
		localStorage.setItem(this.key, JSON.stringify(rs));
	}
	afterSetValue(v) {}
}
DBapp.ui.History = History;