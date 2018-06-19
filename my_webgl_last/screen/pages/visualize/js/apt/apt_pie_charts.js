/* 攻击来源区域分布 */
(function(global){
	var chart={
		search: function(param) {
			var box = $('.item_border2').addClass('newanimated');
			setTimeout(function() {
			  box.removeClass('newanimated');
			  box = null;
			}, 2000);
			this.refresh('sourceArea', param);
		},
		refresh: function(dom, param){
			$.ajax({
				type: 'post',
				url: '/apt/screen/attack/sourcearea',
				dataType: 'json',
				data: param,
				success: data => {
					$('#sourceArea_noData .noData').hide();
					if(data['code']==0){
						if(!this.pie){
							this.pie=echarts.init(document.getElementById("sourceArea"));
						}
						this.pie.setOption(this.getOption(data['data']));
						this.animate(data['data'],dom);
					}
					else {
						$('#sourceArea_noData .noData').show();
					}
				}
			})
		},
		getOption: function(d){
			var legend_data=[];
			var legend_type='scroll';
			for(var i=0;i<d.length;i++){
				legend_data.push(d[i]['name']);
			}
			if(screen.width<=1366){
				legend_type='scroll';
			}
			else {
				legend_type='plain';
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
          radius: ['30%', '60%'],
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
			                		fontSize: '18',
			                		fontWeight: 'bold'
			                	},
			                	labelName: {
			                		fontSize: '14',
			                		color: '#e4e5e5'
			                	}
			                },
			                formatter: function(param){
			                	return '{labelValue|'+param.value+'}'+'\n'+'{labelName|'+param.name+'}';
			                }
			              }
					},
					data: d
				}
			}
		},
		animate: function(d,dom) {
			var self=this;
			var isMove=true;
			var i=0;
			var len=d.length;
			$('#'+dom).on('mouseover',function(){
				isMove=false;
				self.pie.dispatchAction({
					type:'downplay',
					seriesIndex: 0
				});
			});
			$('#'+dom).on('mouseout',function(){
				isMove=true;
			});
			clearInterval(self.time);
			self.time=setInterval(function(){
				if(isMove){
						if(i==len){
							i=0;
						}
						for(var k=0;k<len;k++){
							if(k==i){
								self.pie.dispatchAction({
									type:'highlight',
									seriesIndex: 0, 
									dataIndex: i
								});
							}
							else {
								self.pie.dispatchAction({
									type:'downplay',
									seriesIndex: 0, 
									dataIndex: k
								});
							}
						}
					i++;
				}
				else { i=0 }
			},2000);
		}
	};
	global.sourceArea=chart;
})(window);

/* 告警类型分布 */
(function(global) {
	var chart={
		search: function(param) {
			var box = $('.item_border6').addClass('newanimated');
			setTimeout(function() {
			  box.removeClass('newanimated');
			  box = null;
			}, 2000);
			this.refresh(param);
		},
		refresh: function(param){
			$.ajax({
				type: 'post',
				url: '/apt/screen/alarm/type',
				dataType: 'json',
				data: param,
				success: data => {
					$('#alarmType_noData .noData').hide();
					if(data['code']==0){
						if(!this.pie){
							this.pie=echarts.init(document.getElementById("alarmType"));
						}
						this.pie.setOption(this.getOption(data['data']));
					}
					else {
						$('#alarmType_noData .noData').show();
					}
				}
			})
		},
		getOption: function(d){
			var legend_data=[];
			for(var i=0;i<d.length;i++){
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
					radius: ['0', '90%'],
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
	global.alarmType=chart;
})(window);


