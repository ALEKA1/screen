/* 攻击来源区域分布 */
(function(global){
	var sourceArea = {
    time: null,
    isFirst: true,
    init: function() {
    	this.pie = echarts.init(document.getElementById("sourceArea"));
    },
		search: function(param) {
			var box = $('.item_border2').addClass('newanimated');
			setTimeout(function() {
			  box.removeClass('newanimated');
			  box = null;
			}, 2000);
			this.refresh('sourceArea', param);
		},
		refresh: function(dom, param) {
			var el = $('#sourceArea_noData .noData'); 
			$.ajax({
				type: 'post',
				url: '/waf/screen/attack/sourcearea',
				dataType: 'json',
				data: param,
				success: data => {
					el.hide();
					if(data['code'] == 0) {
						this.pie.setOption(this.getOption(data['data']));
						this.animate(data['data'], dom);
					}
					else {
						el.show();
					}
				}
			})
		},
		getOption: function(d) {
			var legend_data = [];
			var legend_type = 'scroll';
			for(var i = 0; i < d.length; i++) {
			  legend_data.push(d[i]['name']);
			}
			if(screen.width < 1800) {
			  legend_type = 'scroll';
			} else {
			  legend_type = 'plain';
			}
			return {
				legend: {
			    type: legend_type,
					orient: 'horizontal',
					top: '80%',
					itemWidth: 10,
					itemHeight: 10,
					x: 'center',
					y: 'top',
					textStyle: {
						fontSize: 12,
						color: '#e4e5e5'
					},
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
					center: ['50%', '40%'],
          radius: ['35%', '60%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
			        show: false,
              position: 'center'
          	},
          	emphasis: {
              show: true,
              rich: {
              	labelValue: {
              		lineHeight: '30',
              		fontSize: 18,
              		fontWeight: 'bold'
              	},
              	labelName: {
              		fontSize: 14,
              		color: '#e4e5e5'
              	}
              },
              formatter: function(param){
              	return '{labelValue|' + param.value + '}' + '\n' + '{labelName|' + param.name + '}';
              }
            }
					},
					data: d
				}
			}
		},
		animate: function(d, dom) {
			var self = this;
			if(self.isFirst) {
				self.isMove = true;
				$('#' + dom).on('mouseover', function() {
					self.isMove = false;
					self.pie.dispatchAction({
						type: 'downplay',
						seriesIndex: 0
					});
				});
				$('#' + dom).on('mouseout', function() {
					self.isMove = true;
				});
				self.isFirst = false;
			}
			var len = d.length;
			self.count = 0;
			clearInterval(self.time);	
			self.time = setInterval(function() {
				if(self.isMove) {
					if(self.count == len) {
						self.count = 0;
					}
					for(var k = 0; k < len; k++) {
						if(k == self.count) {
							self.pie.dispatchAction({
								type:'highlight',
								seriesIndex: 0, 
								dataIndex: self.count
							});
						} else {
							self.pie.dispatchAction({
								type:'downplay',
								seriesIndex: 0, 
								dataIndex: k
							});
						}
					}
					self.count++;
				} else {
					self.count = 0;
				}
			}, 2000);
		}
	};
	global.sourceArea = sourceArea;
})(window);