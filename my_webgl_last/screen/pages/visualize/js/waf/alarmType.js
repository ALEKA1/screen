/* 告警类型分布 */
(function(global) {
	var alarmType = {
    init: function() {
    	this.pie = echarts.init(document.getElementById("alarmType"));
    },
		search: function(param) {
			var box = $('.item_border6').addClass('newanimated');
			setTimeout(function() {
			  box.removeClass('newanimated');
			  box = null;
			}, 2000);
			this.refresh(param);
		},
		refresh: function(param) {
			var el = $('#alarmType_noData .noData');
			$.ajax({
				type: 'post',
				url: '/waf/screen/alarm/type',
				dataType: 'json',
				data: param,
				success: data => {
					el.hide();
					if(data['code'] == 0) {
						this.pie.setOption(this.getOption(data['data'] || []));
					}
					else {
						el.show();
					}
				}
			})
		},
		getOption: function(d) {
			var legend_data = [];
			for(var i = 0; i < d.length; i++) {
				legend_data.push(d[i]['name']);
			}
			return {
				tooltip: {
					trigger: 'item',
					formatter: '{b} : {c}'
				},
				legend: {
					type: 'scroll',
					left: '60%',
					orient: 'vertical',
					x: 'left',
					y: 'center',
					textStyle: {
						fontSize: 12,
						color: '#e4e5e5'
					},
					itemGap: 5,
					itemWidth: 10,
					itemHeight: 10,
					pageIconColor: '#e4e5e5',
					pageIconInactiveColor: '#2f4554',
					pageIconSize: 10,
					pageTextStyle: {
						color: '#e4e5e5'
					},
					data: legend_data
				},
				color: ['#49d5d4','#4ab7f1','#3d97cc','#3076a4','#23557d','#b2565c','#3f79c8','#30a7e0','#bfae6a','#b9d6df'],
				series: {
					type: 'pie',
					roseType: 'radius',
					center: ['30%', '50%'],
					radius: ['0', '85%'],
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: false
						}
					},
					data: d
				}
			}		
		}
	};
	global.alarmType = alarmType;
})(window);