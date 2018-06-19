(function() {
    var inited = {
        monitor: false,
        vuls: false,
        cloudwaf: false
    }
    var cloudFlag = true;
    var vulsFlag = true;
    var app = {
        prepare: function() {
            $.post("/api/site/list").success(function(json) {
                if (json && json['data'] && json['data']['items']) {
                    var data = [];
                    $.each(json['data']['items'], function(k, v) {
                        data.push({
                            id: v.domain,
                            text: v.domain
                        });
                    });
                    data.unshift({
                    	id: 'all',
                    	text: '全部站点'
                    });
                    $('#domainSelector').select2({
                        placeholder: '请选择',
                        data: data
                    });
                    var currentDomain = $("#currentDomain").val();
                    $('#domainSelector').select2().val(currentDomain).trigger('change');
                }

            });

        },
        urlDecode : function(string, overwrite) {
    			if (!string || !string.length) {
    				return {};
    			}
    			var obj = {};
    			var pairs = string.split("&");
    			var pair, name, value;
    			for (var i = 0, len = pairs.length; i < len; i++) {
    				pair = pairs[i].split("=");
    				name = decodeURIComponent(pair[0]);
    				value = decodeURIComponent(pair[1]);
    				if (overwrite !== true) {
    					if (typeof obj[name] == "undefined") {
    						obj[name] = value;
    					} else {
    						if (typeof obj[name] == "string") {
    							obj[name] = [obj[name]];
    							obj[name].push(value);
    						} else {
    							obj[name].push(value);
    						}
    					}
    				} else {
    					obj[name] = value;
    				}
    			}
    			return obj;
    		},
    		format: function(date, format) {
    			var o = {
    				"M+" : date.getMonth() + 1, // month
    				"D+" : date.getDate(), // day
    				"h+" : date.getHours(), // hour
    				"m+" : date.getMinutes(), // minute
    				"s+" : date.getSeconds(), // second
    				"q+" : Math.floor((date.getMonth() + 3) / 3), // quarter
    				"S" : date.getMilliseconds()
    			// millisecond
    			};
    			if (/(Y+)/.test(format)) {
    				format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    			}
    			for ( var k in o) {
    				if (new RegExp("(" + k + ")").test(format)) {
    					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    				}
    			}
    			return format;
    		},
        init: function() {
            var w = this;
            var urlParam = w.urlDecode(window.location.search.substring(1));
            var current = w.format(new Date(), 'YYYY-MM-DD');
            
            var currentDomain = $("#currentDomain");
            var currentDateKey = $("#currentDateKey");
            var report = $("#report");
            
          	currentDomain.val(urlParam.domain !== undefined ? urlParam.domain : "");
          	$("#domainSelector").val(urlParam.domain !== undefined ? urlParam.domain : "");
          	
          	currentDateKey.val(urlParam.dateKey !== undefined ? urlParam.dateKey : current);
          	$(".WdateMax").val(urlParam.dateKey !== undefined ? urlParam.dateKey : current);
          	
          	report.val(urlParam.report !== undefined ? urlParam.report : "day");
            w.domain = currentDomain.val();
            w.currentDateKey = currentDateKey.val();
            w.report = report.val();
            
            
            /*var urlParam = w.urlDecode(window.location.search.substring(1));
            var current = w.format(new Date(), 'YYYY-MM-DD');
            
            
            $("#currentDateKey").val(urlParam.dateKey !== undefined ? urlParam.dateKey : current);
            $(".WdateMax").val(urlParam.dateKey !== undefined ? urlParam.dateKey : current);
            
            $("#report").val(urlParam.report !== undefined ? urlParam.report : "week");*/
            
            w.handler();
        },
        showDatas: function() {
            var w = this;
            cloudwaf.init(w.domain, w.currentDateKey, w.report);
        },
        handler: function() {
            var w = this;

            function reportSearch() {
                var domain = $("#domainSelector").val();
                var dateKey = $("#currentDateKey").val();
                var report = $("#report").val();
                if (domain == '' || dateKey == '') {
                    alert("网站和日期不能为空!");
                    return;
                }
                //var href = "http://localhost:8080/views/dailyReport.html#/" + domain + "/dateKey/" + dateKey + "/report/" + report;
                var url = location.href.split('?');
                url = url[0] + "?domain=" + domain + "&dateKey=" + dateKey + "&report=" + report;
                location.href = url;
            }
            function reportExp(type) {
            	var domain = $("#domainSelector").val();
              var dateKey = $("#currentDateKey").val();
              //var report = $("#report").val();
              if (domain == '' || dateKey == '') {
                  alert("网站和日期不能为空!");
                  return;
              }
              window.location.href="/logsaas/report/download?domain=" + domain + "&dateKey=" + dateKey + "&type=" + type;
            }
            Date.prototype.format = function(fmt) {
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            };
            $("#btn-search").bind("click", function() {
                reportSearch();
            });
            $(".report-download").bind("click", function() {
            	reportExp($(this).attr('datatype'));
            });

            function dateToString(date) {
                var strdate = "";
                strdate = strdate + date.y + "-";
                var M = date.M >= 10 ? date.M : ("0" + date.M);
                strdate = strdate + M;
                var d = date.d >= 10 ? date.d : ("0" + date.d);
                strdate = strdate + "-" + d;
                return strdate;
            }
            //报告类型回显
            $("li", $("#report-type")).each(function() {
                var data = $('#report').val();
                if ($(this).attr('data') == data) {
                    $("li", $("#report-type")).removeClass("active");
                    $(this).addClass("active");
                    $('.date-input').hide();
                    $('.date-' + data).toggle();
                }
            });

            $("li", $("#report-type")).bind("click", function() {
                $("li", $("#report-type")).removeClass("active");
                $(this).addClass("active");
                var data = $(this).attr('data');
                $('#report').val(data);
                $('.date-input').hide();
                $('.date-' + data).toggle();
            });
            $('.date-day input').click(function() {
                WdatePicker({
                    readOnly: true,
                    dateFmt: 'yyyy-MM-dd',
                    oncleared: false,
                    maxDate: '%y-%M-%d',
                    onpicked: function() {
                        var datetime = $dp.cal.getDateStr();
                        $(this).val(datetime);
                        $("#currentDateKey").val(datetime);
                    }
                })
            });
            $('.date-week input').click(function() {
                WdatePicker({
                    readOnly: true,
                    dateFmt: 'yyyy-MM-dd',
                    maxDate: '%y-%M-%d',
                    firstDayOfWeek: 1,
                    isShowWeek: true,
                    onpicked: function() {
                        var datetime = $dp.cal.getDateStr();
                        var dstart = -$dp.cal.getP('w', 'w') + 1;
                        var dend = dstart + 6;
                        var datestart = $dp.$DV(datetime, {
                            d: dstart
                        });
                        var dateend = $dp.$DV(datetime, {
                            d: dend
                        });
                        $(this).val(dateToString(datestart) + '_' + dateToString(dateend));
                        $("#currentDateKey").val(dateToString(datestart) + '_' + dateToString(dateend));
                    }
                })
            });
            $('.date-month input').click(function() {
                WdatePicker({
                    readOnly: true,
                    dateFmt: 'yyyy-MM',
                    maxDate: '%y-%M-%d',
                    onpicked: function() {
                        function getFirstAndLastDay(year, month) {
                            var firstdate = year + '-' + month + '-01';
                            var day = new Date(year, month, 0);
                            var lastdate = year + '-' + month + '-' + day.getDate(); //获取当月最后一天日期
                            return firstdate + '_' + lastdate;
                        }
                        var datetime = $dp.cal.getDateStr();
                        var year = datetime.split('-')[0],
                            month = datetime.split('-')[1];
                        var date = getFirstAndLastDay(year, month);
                        $(this).val(datetime);
                        $("#currentDateKey").val(date);
                    }
                })
            });
            //导出报告
            //html
            // $(".report-html").bind("click", function() {
            //     location.href = __ROOT__ + "/Home/DailyReport/exportReport?domain=" + w.domain + "&dateKey=" + w.currentDateKey + "&report=" + w.report;
            // });
            // //pdf word
            // $(".report-download").bind("click", function() {
            //     var format = $(this).attr('dataType');
            //     location.href = __ROOT__ + "/Home/DailyReport/reportDownload?format=" + format + "&domain=" + w.domain + "&dateKey=" + w.currentDateKey + "&reportType=" + w.report;

            // });


        }

    };
    $(document).ready(function() {
        app.init();
        app.prepare();
        app.showDatas();



    });


})();