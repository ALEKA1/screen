(function(global) {
	global.slot = {
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
			// this.param.size = 5;
			this.sizeChange = this.extend(this.param, {
				size: 5
			});
			this.req_getList(this.sizeChange);
		},
		extend: function(parama, paramb) {
			var newObj = {};
			for (item in parama) {
			  newObj[item] = parama[item]
			};
			for (item in paramb) {
			  newObj[item] = paramb[item]
			}
			return newObj;
		},
		loadMore:function(){
			let param = this.extend(this.param, {size :100});
			// let param = $.extend({}, this.param, {
			// 	size: 100
			// });
			this.req_getList(param);
		},
		req_getList: function(param) {
			param.size = 100;
			if(!this.cmp) {
				this.cmp = new Alarm_trend(document.getElementById('alarm-trend-chart'));
			}
			$.ajax({
				traditional: true,
				type: 'post',
				url: '/apt/screen/alarm/slot',
				dataType: 'json',
				data: param,
				success: (data) => {
					// 告警趋势
					this.cmp.load(data['data'][0]);
				}
			});
		}
	};
	global.slot.init();
})(window);
