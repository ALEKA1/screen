class Scroll{
	constructor(elem,count){
	   this.elem = elem instanceof jQuery ? elem :$(elem);
	   this.count = count;
	   this.isMove = true;
	   this.handlerEvent();
	}
	set gridRow(callback){
		this.rendFn = callback;
	}
	handlerEvent(){
		let e = this.elem[0];
		e.onmouseover= ()=>{
			this.isMove = false;
		};
		e.onmouseout = ()=>{
			this.isMove = true;
		};
		let transitionEvent = this.whichTransitionEvent();
   	transitionEvent && e.addEventListener(transitionEvent,() => {
	   	this.elem.find(".scroll_list:first-child").remove();
	    this.elem.append('<div class="scroll_list"></div>');
	    this.elem.find(".scroll_list:last-child").html(this.getGrid());
   });
	}
	load(data,start_time,end_time){
	   this.start_time = start_time;
	   this.end_time = end_time;
	   if(this.timer){
	       clearInterval(this.timer);
	       this.timer = null;
	   }
	   if(data.length<=this.count){
	       let html = '';
	       html='<div class="scroll_list"></div>';
	       this.elem.html(html);
	       let rowHtml =[];
		   for(let i=0;i<data.length;i++){
			   rowHtml.push(this.rendFn(data[i],this.start_time,this.end_time));
		   }
		   $(".scroll_list:first-child").html('<table cellspacing=0>'+rowHtml.join('')+'</table>');
	   }
	   else{
	       this.pointer = 0;
	       this.data = data;
	       let html = `<div class="scroll_list"></div>
	                    <div class="scroll_list"></div>`;
	       this.elem.html(html);
	       $(".scroll_list:first-child").html(this.getGrid());
	       $(".scroll_list:last-child").html(this.getGrid());
	       this.timer = setInterval(()=>{
	       		if(this.isMove){
	       			this.animation();
	       		}
	       },5000);
	   }
	}
	whichTransitionEvent(){
   var t,
   el = document.createElement('surface'),
   transitions = {
	   'transition':'transitionend',
	   'OTransition':'oTransitionEnd',
	   'MozTransition':'transitionend',
	   'WebkitTransition':'webkitTransitionEnd'
   }
   for(t in transitions){
	   if( el.style[t] !== undefined ){
	       return transitions[t];
	   }
   }
 	}
	animation(){
		this.elem.find(".scroll_list:first-child").css({
	   		'transform':"scaleY(0)",
	      'height': 0,
	      'transform-origin': 'left top',
	      'transition': '0.7s'
	   });
	}
	getGrid(){
	   let array = [];
	   while(array.length<this.count){
	       array.push(this.data[this.pointer]);
	       if(++this.pointer == this.data.length){
	           this.pointer = 0;
	       }
	   }
	   let gridHtml = '';
	   for(let i=0;i<array.length;i++){
		   gridHtml+= this.rendFn(array[i],this.start_time,this.end_time);
	   }
	   return '<table cellspacing=0>'+gridHtml+'</table>';
	}
}


(function(global){
	var scrollList={
		isFirst: true,
		isMove: true,
		init: function(){
			if(this.isFirst){
				$('#grid-title').html('<tr><td>攻击时间</td><td>危险等级</td><td>攻击源IP</td><td>被攻击目标IP</td><td>攻击类型</td><td>来源区域</td></tr>');
				this.isFirst=false;
			}
			this.grid=new Scroll("#grid-list",5);
			this.grid.gridRow = function(obj,start,end){
				var fontColor;
				if(obj['levelType']=='高危'){
					fontColor='high';
				}
				else if(obj['levelType']=='中危'){
					fontColor='middle';
				}
				else if(obj['levelType']=='低危'){
					fontColor='low';
				}
        var aTag = "<a target='_blank' href='/index.html#/alert_source?saveType=alert&conditions=srcAddress:"+obj['attackSource']+"&conditions=destAddress:"+obj['destAddress']+"&conditions=warningType:"+obj['attakType']+"&start="+start+"&end="+end+"'></a>";
        return '<tr><td>'+aTag+obj['time']+'</td>'
					+'<td class='+fontColor+'>'+aTag+obj['levelType']+'</td>'
					+'<td>'+aTag+obj['attackSource']+'</td>'
					+'<td>'+aTag+obj['destAddress']+'</td>'
					+'<td>'+aTag+obj['attakType']+'</td>'
					+'<td>'+aTag+obj['sourceArea']+'</td></tr>';
			}
		},
		search: function(param) {
			this.refresh(param);
		},
		refresh: function(param){
			$.ajax({
				type: 'post',
				url: '/apt/screen/alarm/realtime',
				dataType: 'json',
				data: param,
				success: data => {
					$('#attack_noData .noData').hide();
					if(data['code']==0){
						var start = param['startTime'];
            var end = param['endTime'];
						this.grid.load(data['data'],start,end);
					}
					else {
						$('#attack_noData .noData').show();
					}
				}
			})
		}
	}
	global.realtime=scrollList;
})(window);
