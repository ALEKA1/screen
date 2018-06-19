/**
 * @author Sean
 * @dec ui弹框
 * @params
 * el     string  ''   id
 * config  object  {}
 * @api
 * new ailpha.ui.Dialog('idDlg',
 *  {
 *    title: '', 默认可无
 * })
 * html 结构
 * 分为modal-box-info（暂无）  modal-box-warn 2个风格
 * <div id="idDlg" class="modal-box modal-box-warn" style="display: none;">
 *  <div class="modal-inner animated">
 *    <span class="modal-title"></span>
 *    <button class="modal-close"></button>
 *    <div class="modal-content"></div>
 *  </div>
 *</div>
 */
(function(global) {
  function Dialog (el, config) {
    this.init(el, config);
  }
  Dialog.prototype = {
    openAnimationDuration : 500,
    closeAnimationDuration : 500,
    openAnimationEffect : 'default-in',
    closeAnimationEffect : 'default-out',
    //openAnimationEffect : 'rollIn',
    //closeAnimationEffect : 'rollOut',
    //openAnimationEffect : "fadeInLeft",
    //closeAnimationEffect : "fadeOutRight",
    setTimeout : null,
    autoClose : false,
    defaultWidth : 560,
    autoCloseDelay : 3000,
    closeText : "&times;",
    buttonAlign : "center",
    template :
    '<div class="modal-box" style="display: none;">'+
    '<div class="modal-inner"><span class="modal-title"></span><button class="modal-close"></button>'+
    '<div class="modal-content"></div>'+
    //'<div class="button-wrap">'+
    '</div>'+
    '</div>'+
    '</div>',
    init : function(el, config) {
      jQuery.extend(this, config);
      var self = this;
      var id;
      if(typeof el == "string") {
        id = el;
      }
      self.el = el && el.get ? el.get(0) : (typeof el == "string" ? document.getElementById(el) : el);
      if(!self.el) {
        self.$el = jQuery(self.template);
        self.el = self.$el.get(0);
        if(id) {
          self.el.id = id;
        }
        jQuery('body').append(self.$el);
      } else {
        self.$el = jQuery(self.el);
      }
      self.$close = self.$el.find(".modal-close");
      if(self.$close) {
        self.close = self.$close.get(0);
        if(self.close) {
          self.close.innerHTML = self.closeText;
        }
        self.$close.bind("click", function(e) {
          self.hide();
        });
      }
      self.$inner = self.$el.find(".modal-inner");
      self.inner = self.$inner.get(0);
      self.$titleWrap = self.$el.find(".modal-title");
      self.titleWrap = self.$titleWrap.get(0);
      self.$content = self.$el.find(".modal-content");
      self.content = self.$content.get(0);
      if(self.title) {
        self.setTitle(self.title);
      }
      if(self.msg) {
        self.setContent(self.msg);
      }
      //self.setSize(self.width, self.height);
      if(!self.mask) {
        self.mask = document.createElement("div");
        self.mask.className = "modal-box-mask";
        //document.body.appendChild(self.mask);
        self.el.parentNode.appendChild(self.mask);
        self.$mask = jQuery(self.mask);
        self.$mask.hide();
      }
      self.$mask.bind("keydown", function(e) {
        if (e.keyCode == 27) {
          self.$close.trigger("click");
        }
      });
      self.$mask.click(function(e) {
        if (jQuery(e.target).closest(".modal-inner").length) {//也可用阻止冒泡
          return;
        }
        self.$close.trigger("click");
      });
      self.transitionDuration(self.$el, self.openAnimationDuration);
      self.animationDuration(jQuery(".modal-inner", self.$el), self.openAnimationDuration);
    },
    createButtonWrap : function() {
      this.$buttonWrap = this.$el.find(".button-wrap");
      this.buttonWrap = this.$buttonWrap.get(0);
      if(!this.buttonWrap) {
        this.buttonWrap = document.createElement('div');
        this.buttonWrap.className = "button-wrap";
        this.inner.appendChild(this.buttonWrap);
        this.$buttonWrap = jQuery(this.buttonWrap);
        this.setButtonAlign(this.buttonAlign);
      }
    },
    setButtonAlign : function(pos) {
      if(this.buttonWrap) {
        this.buttonWrap.className = "button-wrap" + (pos ? " " + pos : "");
        //this.buttonAlign = pos;
        //this.$buttonWrap.addClass(this.buttonAlign);
      }
    },
    setWidth : function(width) {
      if(width) {
        this.width = width;
        this.$el.css("width", this.width);
      }
    },
    setHeight : function(height) {
      if(height) {
        this.height = height;
        this.$content.css("height", this.height);
      }
    },
    setSize : function(width, height) {
      this.setWidth(width);
      this.setHeight(height);
    },
    setTitle : function(title) {
      if(this.titleWrap) {
        this.title = title || "";
        this.titleWrap.innerHTML = this.title || "";
      }
    },
    setContent : function(html) {
      if(this.content) {
        this.html = html || "";
        this.content.innerHTML = this.html;
      }
    },
    clearButton : function() {
      if(this.buttonWrap) {
        this.$buttonWrap.html("");
      }
    },
    addButton : function(btns) {
      this.createButtonWrap();
      if(this.buttonWrap) {
        for(var i=0;i<btns.length;i++) {
          var btn = jQuery('<a class="button" href="javascript:;">' + btns[i].text + '</a>');
          this.$buttonWrap.append(btn);
          if(btns[i].cls) {
            btn.addClass(btns[i].cls);
          }
          if((btns[i].handle && Object.prototype.toString.apply(btns[i].handle) === '[object Function]') || (btns[i].handdle && Object.prototype.toString.apply(btns[i].handdle) === '[object Function]')) {
            btn.bind("click", {scope : this, config : btns[i]}, this._handleClick);
          }
        }
      }
    },
    _handleClick : function(e) {
      var opt = e.data;
      if(opt && opt.scope) {
        var fn = (opt.config.handle || opt.config.handdle);
        fn.apply(opt.config.scope ? opt.config.scope : opt.scope, arguments || []);
      }
    },
    isVisible : function() {
      return this.$el.css("visibility") != "hidden";
      //return this.hasClass(this.el, "active");
    },
    hasClass : function(el, className) {
      return className && (' ' + el.className + ' ').indexOf(' ' + className + ' ') != -1;
    },
    show : function() {
      var self = this;
      self.$mask.css("zIndex", global.getZIndex());
      self.$el.css("zIndex", global.getZIndex());
      if(self.setTimeout) {
        self.clearTimeout(self.setTimeout);
      }
      /*if(self.isVisible()) {
       self.hide();
       return;
       }*/
      self.$el.css("visibility", "visible");
      self.$el.show();
      self.$mask.show();
      //DBapp.Css.center(self.inner);
      self.transitionDuration(self.$el, self.openAnimationDuration);
      self.animationDuration(jQuery(".modal-inner", self.$el), self.openAnimationDuration);
      self.animate(self.openAnimationEffect, function() {
        //self.$close.focus();
        return;
      });
      if (self.autoClose) {
        self.setTimeout = setTimeout(function() {
          self.hide();
        }, self.autoCloseDelay);
      }
    },
    hide : function() {
      var self = this;
      if(self.setTimeout) {
        self.clearTimeout(self.setTimeout);
      }
      //self.$el.removeClass("active");
      self.$el.css("visibility", "hidden");
      self.$mask.hide();
      self.hideFn && self.hideFn()
      self.transitionDuration(self.$el, self.closeAnimationDuration);
      self.animationDuration(jQuery(".modal-inner", self.$el), this.closeAnimationDuration);
      self.animate(self.closeAnimationEffect, function() {
        return;
      });
    },
    animate : function(effect, callback) {
      jQuery(".modal-inner", this.$el).addClass(effect + " animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
        jQuery(this).removeClass(effect);
        if (typeof callback != "undefined") {
          callback.call(this);
        }
      });
    },
    animationDuration : function(el, duration) {
      el.css({
        "animation-duration" : duration + "ms"
      });
    },
    transitionDuration : function(el, duration) {
      el.css({
        "transition-duration" : duration + "ms"
      });
    }
  };
  global.Dialog = Dialog;

})(ailpha.ui);
