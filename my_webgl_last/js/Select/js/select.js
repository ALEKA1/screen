(function() {
  function Select(opt) {
		this.apply(this, opt);
		this.init();
	};
	Select.prototype = {
		Event: {
			bind: function(dom, eventName, fn, scope, capture) {
				var hd = function(e) {
					fn.call(scope || dom, e);
				}
				fn.hd = hd;
		  	if(window.addEventListener) {
		  		dom.addEventListener(eventName, hd, !!capture || false);
		  	} else if(window.attachEvent) {
		  		dom.attachEvent("on" + eventName, hd);
		  	}
		  },
		  unbind: function(dom, eventName, fn, scope, capture) {
		  	if(window.removeEventListener) {
		  		dom.removeEventListener(eventName, fn.hd, !!capture || false);
		  	} else if(window.detachEvent) {
		  		dom.detachEvent("on" + eventName, fn.hd);
		    }
		  	delete fn.hd;
		  }
		},
		apply: function(a, b) {
	    if(a && b && typeof b == 'object') {
	      for(var p in b) {
	        a[p] = b[p];
	      }
	    }
	    return a;
	  },
	  init: function() {
	  	this.el = this.el.get ? this.el.get(0) : (typeof this.el == "string" ? document.getElementById(this.el) : this.el);
	    this.el.style.cursor = "Crosshair";
	    this.Event.bind(this.el, "mousedown", this.mouseDown, this);
	  },
	  mouseDown: function(e) {
	  	this.selectList = [];
	  	this.isMove = true;
	  	this.startX = (e.pageX || e.clientX); 
	  	this.startY = (e.pageY || e.clientY);
	  	if(!this.proxy) {
	  		this.proxy = document.createElement("div");
	  		this.proxy.className = "cls-select-proxy";
	  		this.proxy.style.cssText = "position:absolute;width:0;height:0;font-size:0;margin:0;padding:0;border:1px dashed #000;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;";
	  		document.body.appendChild(this.proxy);
	  	}
	  	this.Event.bind(document, "mousemove", this.mouseMove, this);
	  	this.Event.bind(document, "mouseup", this.mouseUp, this);
	  	this.afterMouseDown(e);
	  	this.stopEvent(e);
	  },
	  mouseMove: function(e) {
	  	if (this.isMove) { 
	      if (this.proxy && this.proxy.style.display == "none") { 
	      	this.proxy.style.display = "block"; 
	      } 
	      var dx = (e.pageX || e.clientX); 
	      var dy = (e.pageY || e.clientY); 
	      this.proxy.style.left = (Math.min(dx, this.startX) - 5) + "px"; 
	      this.proxy.style.top = (Math.min(dy, this.startY) - 5) + "px"; 
	      this.proxy.style.width = Math.abs(dx - this.startX) + "px"; 
	      this.proxy.style.height = Math.abs(dy - this.startY) + "px"; 
	      var left = this.proxy.offsetLeft;
	      var top = this.proxy.offsetTop;
	      var width = this.proxy.offsetWidth;
	      var height = this.proxy.offsetHeight;
	      for (var i = 0; i < this.selectList.length; i++) {
	        var sl = this.selectList[i].offsetWidth + this.selectList[i].offsetLeft;
	        var st = this.selectList[i].offsetHeight + this.selectList[i].offsetTop;
	        if (sl > left && st > top && this.selectList[i].offsetLeft < left + width && this.selectList[i].offsetTop < top + height) { 
	          if (this.selectList[i].className.indexOf("seled") == -1) { 
	            this.selectList[i].className = this.selectList[i].className + " seled"; 
	          } 
	        } else { 
	          if (this.selectList[i].className.indexOf("seled") != -1) { 
	            this.selectList[i].className = "fileDiv"; 
	          } 
	        }
	      }
	    }
	  	this.afterMouseMove(e);
	  	this.stopEvent(e);
	  },
	  mouseUp: function(e) { 
	    this.isMove = false; 
	    if (this.proxy) { 
	    	this.proxy.style.display = "none";
	    }
	    this.afterMouseUp(e);
	    //this.selectList = [];
	    //this.startX = 0;
	    //this.startY = 0;
	    this.Event.unbind(document, "mousemove", this.mouseMove);
	  	this.Event.unbind(document, "mouseup", this.mouseUp);
	    this.stopEvent(e);
	  },
	  stopEvent: function(e) {
	  	if(e.stopPropagation) {
	  		e.stopPropagation();
	  	} else {
	  		e.cancelBubble = true; 
	  	}
	  	if(e.preventDefault) {
	  		e.preventDefault();
	  	} else {
	  		e.returnValue = false;
	  	}
	  },
	  afterMouseDown: function(e) {},
	  afterMouseMove: function(e) {},
	  afterMouseUp: function(e) {}
	};
	DBapp.ui.Select = Select;
})();