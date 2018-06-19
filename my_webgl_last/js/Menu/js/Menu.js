class MainMenu {
	defaultIcon = "fa fa-circle"
	index = -1
  constructor(props) {
		//this.extend(this, props);
		this.props = props;
    this.state = {
      current: '',
      key: {
        id: "id",
        text: "name",
        icon: "icon",
        children: "menuList",
        link: "link",
        href: "href",
        url: "link"
      },
      temple: ""
    };
    //this.key = {
      //id: "id",
      //text: "name",
      //icon: "icon",
      //children: "menuList",
      //href: "href"
    //};
    //this.temple = "";
    let el = this.props['el'];
    if(!this.el) {
			this.el = el.get ? el.get(0) : (typeof el == "string" ? document.getElementById(el) : el);
			this.addClass(this.el, "dw-accordion-menu");
		}
  }
//	extend(o, c, defaults) {
//    if(defaults) {
//      this.apply(o, defaults);
//    }
//    if(o && c && typeof c == 'object') {
//      for(var p in c) {
//        o[p] = c[p];
//      }
//    }
//    return o;
//  }
	getIndex() {
		let index = ++this.index
		return index.toString();
	}
  hasClass(dom, cls) {
  	return (" " + dom.className + " ").indexOf(" " + cls + " ") != -1;
  }
  addClass(dom, cls) {
  	if(!this.hasClass(dom, cls)) {
      dom.className = dom.className + " " + cls;
    }
  }
  removeClass(dom, cls) {
    if(cls && dom.className) {
      if(this.hasClass(dom, cls)) {
        dom.className = dom.className.replace(new RegExp('(?:^|\\s+)' + cls + '(?:\\s+|$)', "g"), " ");
      }
    }
  }
  resoleLink(href) {
    if(href === undefined) {
      return '';
    }
  	return href.replace(/\.\w+$/, '');
  }
  createMenu(nodes, indexs) {
    let vdom = [];
    let list = [];
    let node;
    let index;
    //indexs = (indexs === undefined ? "0" : indexs);
    for(let i = 0, len = nodes.length; i < len; i++) {
      node = nodes[i];
      /*let href = this.resoleLink(node[this.state.key.href]);
      if(indexs === undefined) {
      	index = href;
      } else {
      	let arr = indexs.split(",");
      	arr.push(href);
      	index = arr.join(",");
      }*/
      let index = this.getIndex();
      let relIndex;
      if(indexs === undefined) {
      	indexs = "0";
      } else {
      	let arr = indexs.split(",");
      	arr.push(index);
      	relIndex = arr.join(",");
      }
      //console.log(indexs);
      let path = this.resoleLink(node[this.state.key.href]);
      if (node[this.state.key.children] instanceof Array && node[this.state.key.children].length) {
        list.push(
          '<li>' +
            '<a index="' + index + '" relIndex="' + indexs + '" class="dw-accordion-node dw-accordion-node-onClick" href="javascript:;" onClick={this.onClick} title="' + node[this.state.key.text] + '"><i class="' + (node[this.state.key.icon] || this.defaultIcon) + '"></i><span class="dw-accordion-node-text">' + node[this.state.key.text] + '</span><span class="submenu-indicator fa fa-angle-down"></span></a>' +
            this.createMenu(node[this.state.key.children], relIndex) +
          '</li>'
        );
      } else {

      	if(node[this.state.key.href]) {
          let urlConfig = this.props["screens"][this.indexOf(this.props["screens"], path)];
      		if(urlConfig !== undefined) {//大屏
      			list.push(
              '<li>' +
                '<a index="' + index + '" relIndex="' + indexs + '" class="dw-accordion-node" path="' + path + '" target="_blank" href="' + (urlConfig.length >= 2 ? urlConfig[1] : "/visualize/" + urlConfig[0] + ".html") + '" title="' + node[this.state.key.text] + '"><i class="' + (node[this.state.key.icon] || this.defaultIcon) + '"></i><span class="dw-accordion-node-text">' + node[this.state.key.text] + '</span><span class="submenu-indicator"></span></a>' +
              '</li>'
            );
          } else {//路由
      			list.push(
              '<li>' +
                '<a index="' + index + '" relIndex="' + indexs + '" class="dw-accordion-node dw-accordion-node-handle" path="' + path + '" href="javascript:;" title="' + node[this.state.key.text] + '"><i class="' + (node[this.state.key.icon] || this.defaultIcon) + '"></i><span class="dw-accordion-node-text">' + node[this.state.key.text] + '</span><span class="submenu-indicator"></span></a>' +
              '</li>'
            );
      		}
      	} else if(node[this.state.key.url]) {//定制化
      		list.push(
            '<li>' +
              '<a index="' + index + '" relIndex="' + indexs + '" class="dw-accordion-node dw-accordion-node-handle" path="kb" query="' + node[this.state.key.url] + '" href="javascript:;" title="' + node[this.state.key.text] + '"><i class="' + (node[this.state.key.icon] || this.defaultIcon) + '"></i><span class="dw-accordion-node-text">' + node[this.state.key.text] + '</span><span class="submenu-indicator"></span></a>' +
            '</li>'
          );
      	} else {//其他
      		list.push(
            '<li>' +
              '<a index="' + index + '" relIndex="' + indexs + '" class="dw-accordion-node dw-accordion-node-handle" path="' + path + '" href="#/' + node[this.state.key.href] + '" title="' + node[this.state.key.text] + '"><i class="' + (node[this.state.key.icon] || this.defaultIcon) + '"></i><span class="dw-accordion-node-text">' + node[this.state.key.text] + '</span><span class="submenu-indicator"></span></a>' +
            '</li>'
          );
      	}
//      	if(node[this.state.key.href]) {
//      		if(!node[this.state.key.url]) {//大屏
//      			list.push(
//              '<li>' +
//                '<a index="' + index + '" relIndex="' + indexs + '" class="dw-accordion-node dw-accordion-node-handle" href="/screen/' + node[this.state.key.href] + '" title="' + node[this.state.key.text] + '"><i class="' + (node[this.state.key.icon] || this.defaultIcon) + '"></i><span class="dw-accordion-node-text">' + node[this.state.key.text] + '</span><span class="submenu-indicator"></span></a>' +
//              '</li>'
//            );
//      		} else {//路由
//      			list.push(
//              '<li>' +
//                '<a index="' + index + '" relIndex="' + indexs + '" class="dw-accordion-node dw-accordion-node-handle" href="/#/' + node[this.state.key.href] + '" title="' + node[this.state.key.text] + '"><i class="' + (node[this.state.key.icon] || this.defaultIcon) + '"></i><span class="dw-accordion-node-text">' + node[this.state.key.text] + '</span><span class="submenu-indicator"></span></a>' +
//              '</li>'
//            );
//      		}
//      	} else {
//      		if(node[this.state.key.url]) {//kb定制
//      			list.push(
//              '<li>' +
//                '<a index="' + index + '" relIndex="' + indexs + '" class="dw-accordion-node dw-accordion-node-handle" href="javascript:;" title="' + node[this.state.key.text] + '"><i class="' + (node[this.state.key.icon] || this.defaultIcon) + '"></i><span class="dw-accordion-node-text">' + node[this.state.key.text] + '</span><span class="submenu-indicator"></span></a>' +
//              '</li>'
//            );
//      		}
//      	}
      }

    }
    vdom.push('<ul class="submenu" key="submenu">' + list.join("") + '</ul>');
    return vdom.join("");
  }
  indexOf(arr, C) {
  	if(!arr) return -1;
		for (var B = 0, A = arr.length; B < A; B++) {
			if (arr[B][0] == C) {
				return B;
			}
		}
		return -1;
	}
  load(data) {
    //this.vdom = [];
    //return this.createMenu(nodes);
  	this.data = data || [];
    this.el.innerHTML = this.createMenu(this.data);
    this.addEvent();
  }
  addEvent() {
  	this.el.querySelectorAll(".dw-accordion-node-onClick").forEach((item) => {
  		item.onclick = (e) => {
  			this.onClick(e);
  		}
      item.onmouseover = (e) => {
        this.onMouseover(e);
      }
      item.onmouseout = (e) => {
        this.onMouseout(e);
      }
  	});
  	this.el.querySelectorAll(".dw-accordion-node-handle").forEach((item) => {
  		item.onclick = (e) => {
  			this.onHandle(e);
  		}
  	});
  }
  onClick(ev) {
    let node = ev.currentTarget;
    if(!this.hasClass(node, "dw-accordion-node")) {
      node = node.parentElement;
    }
    let children = node.nextElementSibling;
    if(this.hasClass(children, "slidedown")) {
      this.removeClass(node, 'dw-accordion-open');
      this.removeClass(children, 'slidedown');
    } else {
      this.addClass(node, 'dw-accordion-open');
      this.addClass(children, 'slidedown');
    }
    this.stopEvent(ev);
  }
  onHandle(ev) {
  	if(this.afterOnHandle(ev.currentTarget)) {
  		this.setActive(ev.currentTarget);
  	}
  	this.stopEvent(ev);
  }
  onMouseover(ev) {
    if(this.isCollapse) {
      let node = ev.currentTarget;
      //if(node != this.currentMark.node && node != this.currentMark.children) {
      let children = node.nextElementSibling;
      this.addClass(node, 'dw-accordion-open');
      this.addClass(children, 'slidedown');
      this.addClass(children, 'dw-accordion-fixed');
      DBapp.Css.alignTo(children, node, 'l-r');
      //this.currentMark = {
        //node: node,
        //children: children
      //};
      //}
    }
    this.stopEvent(ev);
  }
  onMouseout(ev) {
    if(this.isCollapse) {
      let node = ev.currentTarget;
      //console.log([node != this.currentMark.node, node != this.currentMark.children]);
      //if(node != this.currentMark.node && node != this.currentMark.children) {
        let children = node.nextElementSibling;
        this.removeClass(node, 'dw-accordion-open');
        this.removeClass(children, 'slidedown');
        this.removeClass(children, 'dw-accordion-fixed');
        this.currentMark = null;
      //}
    }
    this.stopEvent(ev);
  }
  stopEvent(ev) {
    if(ev.preventDefault) {
      ev.preventDefault();
    } else {
      ev.returnValue = false;
    }
    if(ev.stopPropagation) {
      ev.stopPropagation();
    } else {
      ev.cancelBubble = true;
    }
  }
  collapse() {
  	if(this.hasClass(this.el, "dw-accordion-collapse")) {
  		this.removeClass(this.el, "dw-accordion-collapse");
  		this.isCollapse = false;
  	} else {
  		this.addClass(this.el, "dw-accordion-collapse");
  		this.isCollapse = true;
  	}
  	this.afterCollapse();
  }
  afterOnHandle(node) {}
  afterCollapse() {}
  setActive(dom) {
  	if(!dom) {
  		return;
  	}
  	//let dom = this.el.querySelector("[index='" + index + "']");
  	if(this.current) {
  		this.removeClass(this.current, "dw-accordion-active");
  	}
  	let rels = dom.getAttribute("relIndex").split(",");
  	this.addClass(dom, "dw-accordion-active");
  	for(let i = 0; i < rels.length; i++) {
  		let G = this.el.querySelector("[index='" + rels[i] + "']");
  		this.addClass(G, "dw-accordion-open");
      if(G.nextElementSibling && this.hasClass(G.nextElementSibling, "submenu")) {
      	this.addClass(G.nextElementSibling, "slidedown");
  		}
  	}
  	this.current = dom;
  }
  render() {
    this.load(this.data);
//      return (
//          <div className={"dw-accordion-menu " + this.state.temple}>{this.load(json)}</div>
//      )
  }
}

DBapp.ui.MainMenu = MainMenu;
