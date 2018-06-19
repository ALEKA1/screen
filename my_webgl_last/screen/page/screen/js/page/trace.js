(function(){
    var baseUrl = ""
    var direction;
    var Tool = {
        renderTree: function(arr,container){
            var ul = document.createElement('ul');
            ul.className = "listCell";
            var html = '';
            arr.forEach((item) => {
                if(item.name&&item.name!=''){
                    if(item.children !=undefined){
                        html += `<li><span class="textNode">${item.name}</span></li>`;
                    }
                    else{
                        html += `<li><span class="noBorder textNode">${item.name}</span></li>`;
                    }
                }
            });
            $(ul).append(html);
            $(container).append(ul);
            var children = $(ul).children();
            var fun = arguments.callee;
            children.each((index,dom) => {
                if(arr[index].children != undefined){
                    fun(arr[index].children,dom);
                }
            });
        },
        getStartPoint: function(elem){
            var w = this
            elem = elem instanceof jQuery ? elem : $(elem);
            var start_y = elem.position().top;
            var start_x = elem.position().left;
            if(direction =='vertical'){
                var adjust_x = parseFloat(elem.css("marginLeft"))+parseFloat(elem.css("paddingLeft"))+parseFloat(elem.css("width"))/2;
                var adjust_y = parseFloat(elem.css("marginTop"))+parseFloat(elem.css("paddingTop"))+parseFloat(elem.css("height"))+parseFloat(elem.css("paddingBottom"))+parseFloat(elem.css("borderBottomWidth")+parseFloat(elem.css("borderTopWidth")));
                return {x:start_x+adjust_x,y:start_y+adjust_y};
            }else{
                var adjust_x = parseFloat(elem.css("marginLeft")) + parseFloat(elem.css("paddingLeft")) + parseFloat(elem.css("width")) + parseFloat(elem.css("paddingRight"));
                var adjust_y = parseFloat(elem.css("marginTop")) + parseFloat(elem.css("paddingTop")) + parseFloat(elem.css("height")) / 2 + parseFloat(elem.css("borderTopWidth"));
                return {x: start_x + adjust_x + 6, y: start_y + adjust_y};
            }
        },
        getEndPoint: function(elem){
            elem = elem instanceof jQuery ? elem : $(elem);
            var start_x = elem.position().left;
            var start_y = elem.position().top;
            if(direction =='vertical'){
                var adjust_x = parseFloat(elem.css("marginLeft"))+parseFloat(elem.css("paddingLeft"))+parseFloat(elem.css("width"))/2;
                var adjust_y = parseFloat(elem.css("marginTop"));
                return {x:start_x+adjust_x,y:start_y+adjust_y-2}
            }else{
                var adjust_x = parseFloat(elem.css("marginLeft"));
                var adjust_y = parseFloat(elem.css("marginTop")) + parseFloat(elem.css("paddingTop")) + parseFloat(elem.css("height")) / 2;
                return {x: start_x + adjust_x - 2, y: start_y + adjust_y - 2};
            }
        },
        drawPolyLine: function(start,end,transform,svgId){
            var w = this;
            /*var transform1 = {x:start.x,y:transform_y};
             var transform2 = {x:end.x,y:transform_y};

             var polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline');
             polyline.setAttribute('points',`${start.x},${start.y+6} ${transform1.x},${transform1.y} ${transform2.x},${transform2.y} ${end.x},${end.y}`);
             polyline.setAttribute('style','fill:none;stroke:#2d9ae0;stroke-width:1;');
             polyline.setAttribute('marker-end','url(#arrow)');
             document.getElementById(svgId).appendChild(polyline);
             return polyline;*/
            var transform1,transform2;
            var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            if(direction =='vertical'){
                transform1 = {x: start.x, y: transform};
                transform2 = {x: end.x, y: transform};
                polyline.setAttribute('points', `${start.x},${start.y + 6} ${transform1.x},${transform1.y} ${transform2.x},${transform2.y} ${end.x},${end.y}`);
            }else{
                transform1 = {x: transform, y: start.y};
                transform2 = {x: transform, y: end.y};
                polyline.setAttribute('points', `${start.x},${start.y} ${transform1.x},${transform1.y} ${transform2.x},${transform2.y} ${end.x},${end.y}`);
            }
            polyline.setAttribute('style', 'fill:none;stroke:#2d9ae0;stroke-width:1;');
            polyline.setAttribute('marker-end', 'url(#arrow)');
            document.getElementById(svgId).appendChild(polyline);
            return polyline;
        },
        drawLine: function(startElem,endElem,svgId){
            var w = this;
            var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            if(direction =='vertical'){
                var start = w.getStartPoint(startElem);
                endElem = endElem instanceof jQuery ? endElem : $(endElem);
                var end = {x: start.x, y: endElem.position().top + parseFloat(endElem.css("marginTop"))};
                polyline.setAttribute('points', `${start.x},${start.y} ${end.x},${end.y}`);
            }else{
                var end = w.getEndPoint(endElem);
                var start = w.getStartPoint(startElem);
                end = {x: end.x, y: start.y};
                polyline.setAttribute('points', `${start.x - 3},${start.y} ${end.x + 2},${end.y}`);
            }

            polyline.setAttribute('style', 'fill:none;stroke:#2d9ae0;stroke-width:1;');
            polyline.setAttribute('marker-end', 'url(#arrow)');
            document.getElementById(svgId).appendChild(polyline);
        },
        drawTriangle: function(point,svgId){
            var point1 = {x: point.x - 2, y: point.y - 2};
            var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            polyline.setAttribute('points', `${point1.x},${point1.y - 7} ${point1.x},${point1.y} ${point1.x - 7},${point1.y}`);
            polyline.setAttribute('style', 'fill:#2d9ae0;stroke-width:1;');
            document.getElementById(svgId).appendChild(polyline);
            var polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline');
            if(direction =='vertical'){
                var point2 = {x: point.x + 2, y: point.y - 2};
                polyline.setAttribute('points', `${point2.x},${point2.y - 7} ${point2.x},${point2.y} ${point2.x + 7},${point2.y}`);
            }else{
                var point2 = {x: point.x - 2, y: point.y + 2};
                polyline.setAttribute('points', `${point2.x - 7},${point2.y} ${point2.x},${point2.y} ${point2.x},${point2.y + 7}`);
            }
            polyline.setAttribute('style', 'fill:#2d9ae0;stroke-width:1;');
            document.getElementById(svgId).appendChild(polyline);
        },
        drawTree: function(ul,svgId){
            var w = this;
            if (ul.previousElementSibling) {
                if ($(ul).children('li').length != 1) {
                    var transform;
                    if(direction =='vertical'){
                        transform = (w.getStartPoint(ul.previousElementSibling).y + w.getEndPoint($(ul).children('li')[0].firstElementChild).y) / 2;
                    }else{
                        transform = (w.getStartPoint(ul.previousElementSibling).x + w.getEndPoint($(ul).children('li')[0].firstElementChild).x) / 2;
                    }
                    var start = w.getStartPoint(ul.previousElementSibling);
                    for (var i = 0, len = $(ul).children('li').length; i < len; i++) {
                        if (i == 0) {
                            var polyline = w.drawPolyLine(start, w.getEndPoint($(ul).children('li')[i].firstElementChild), transform, svgId);
                            polyline.setAttribute('marker-start', 'url(#arrow)');
                        }
                        else {
                            w.drawPolyLine(start, w.getEndPoint($(ul).children('li')[i].firstElementChild), transform, svgId);
                        }
                    }
                    if(direction =='vertical'){
                        w.drawTriangle({x: start.x, y: transform}, svgId);

                    }else{
                        w.drawTriangle({x: transform, y: start.y}, svgId);
                    }
                }
                else {
                    w.drawLine(ul.previousElementSibling, ul.firstElementChild.firstElementChild, svgId);
                    $(ul.firstElementChild).css("width", "100%");
                }
            }
        }
    }
    var Trace = {
        init: function(){
            var w = this;
            w.setDate(5);
            w.renderId();
            w.param = {
                ip : w.queryId,
                startTime : w.start,
                endTime : w.end
            }
            w.initHtml();
            // w.renderRectangle();
            w.initEvent();

        },
        initHtml: function(){
            var w = this;
            w.infoThreat();
            w.baseInfo();
            w.weakness();
            w.teamAnalysis();
            w.attackAnalysis();
            w.proof();

        },
        initEvent: function(){
            var w = this;
            $(".time").find("li").on("click",function () {
                if($(this).text()==$(".selectDate").text()){
                    return
                }
                $(".selectDate").text($(this).text());
                $(this).addClass("on")
                $(this).siblings().removeClass("on")
                w.setDate($(this).attr("type"));
                $(".time").fadeOut(100)
                w.param = {
                    ip : w.queryId,
                    startTime : w.start,
                    endTime : w.end
                }
                w.reload()
            })
          $('.ip-select').ready(function(){
            $('.ip-select').on('click', '.id_list li', function(){
              if($(this).text()==$(".id_info").val()){
                return
              }
              $(".id_info").val($(this).text());
              w.queryId = $(this).text();
              $(this).addClass("on")
              $(this).siblings().removeClass("on")
              $(".id_list_container").fadeOut(100)
              w.param = {
                ip : w.queryId,
                startTime : w.start,
                endTime : w.end
              }
              w.reload()
            })
          })

            /*$(".head").delegate(".id_list li","click",function () {
                if($(this).text()==$(".id_info").val()){
                    return
                }
                $(".id_info").val($(this).text());
                w.queryId = $(this).text();
                $(this).addClass("on")
                $(this).siblings().removeClass("on")
                $(".id_list_container").fadeOut(100)
                w.param = {
                    ip : w.queryId,
                    startTime : w.start,
                    endTime : w.end
                }
                w.reload()
            })*/
            $(".selectDate").on("click",function () {
                $(".time").fadeToggle()
            })
            $(".id_info").on("focus",function () {
                $(".id_list_container").fadeIn(500)
            })
            $(".id_info").on("blur",function () {
                $(".id_list_container").fadeOut(100)
            })
            $("body").on("click",function (e) {
                var $el = $(e.target);
                if($el[0].className.indexOf("selectDate")==-1){
                    $(".time").fadeOut(100)
                }
            })
            $('.report-download').on("click", function(){
              $(this).attr("href","/report/attacker?ip="+w.param['ip']+"&startTime="+w.param['startTime']+"&endTime="+w.param['endTime'])
            })
            $(document).keydown(function(e){
                if(e.keyCode == 13){

                }
            })

        },
        baseInfo: function(){
            var w = this;
            //向下树状结构
            var basicInfo = [{
                    "name": "基础信息"
                }
            ];
            setTimeout(function(){
                $.post(baseUrl+"/trace/basic_info",w.param,function (data) {
                    if(data.code==0){
                        basicInfo = data.data;
                        start()
                    }
                })
            },3000)
            function start(){
                direction = 'vertical';
                $(".down .container").html("");
                $('.down polyline').remove()
                $(".down").removeClass("a-rotateDownDom")
                $(".down").parents(".background").removeClass("a-rotateDown");
                Tool.renderTree(basicInfo,$(".down .container")[0]);
                $('.down .svg').css({width:$('.down .container').width(),height:$('.down .container').height()});
                var lists = $(".down ul");
                for(var i = 0,len = lists.length;i<len;i++){
                    Tool.drawTree(lists[i],"svgContainer_down");
                }
                var rootNode = $($(".down span")[0]);
                var rootWidth = $(rootNode).position().left + parseFloat($(rootNode).css("marginLeft"))+parseFloat($(rootNode).css("paddingLeft"))+parseFloat($(rootNode).width())/2;
                var bodyWidth = parseFloat($("body").width())/2;
                $(".down").css("left",bodyWidth-rootWidth+"px");
                // $(".down").css("top",parseFloat($(".center_icon").css("marginTop"))+parseFloat($(".center_icon").css("paddingTop"))+parseFloat($(".center_icon").height())+parseFloat($(".center_icon").css("paddingBottom")));
                $(".down").css("top","210px");
                $(".down").addClass("a-rotateDownDom")
                $(".down").parents(".background").addClass("a-rotateDown");
            }
            start()

        },
        weakness: function(){
            var w = this;
            var weaknessAnalysis = [{
                name: "弱点分析"
            }]
            setTimeout(function(){
                 $.post(baseUrl+"/trace/issue_analysis",w.param,function (data) {
                     if(data.code=="0"){
                         weaknessAnalysis = data.data
                         start();
                     }
                 })
             },3000)

            function start(){
                direction = 'vertical';
                $(".up .container").html("");
                $('.up polyline').remove()
                $(".up").css("transform", "rotate(0deg)");
                $(".up .textNode").css("transform", "rotate(0deg)");
                $(".up").css("left", 0);
                $(".up").css("bottom",0);
                $(".up").removeClass("a-rotateUpDom")
                $(".up").parents(".background").removeClass("a-rotateUp");
                Tool.renderTree(weaknessAnalysis, $(".up .container")[0]);
                $('.up .svg').css({width: $('.up .container').width(), height: $('.up .container').height()});
                var lists = $(".up ul");
                for (var i = 0, len = lists.length; i < len; i++) {
                    Tool.drawTree(lists[i], "svgContainer_up");
                }
                $(".up").css("transform", "rotate(180deg)");
                $(".up .textNode").css("transform", "rotate(180deg)");
                var rootNode = $($(".up span")[0]);
                var rootWidth = $(rootNode).position().left + parseFloat($(rootNode).css("marginLeft")) + parseFloat($(rootNode).css("paddingLeft")) + parseFloat($(rootNode).width()) / 2;
                var bodyWidth = parseFloat($("body").width()) / 2;
                $(".up").css("left", bodyWidth - rootWidth + "px");
                $(".up").css("bottom","200px");
                $(".up").addClass("a-rotateUpDom")
                $(".up").parents(".background").addClass("a-rotateUp");
            }
            start();
        },
        teamAnalysis: function(){
            var w = this;
            var teamAnalysis = [{
                "name": "团伙分析"
            }]
            setTimeout(function(){
                $.post(baseUrl+"/trace/gangs_analysis",w.param,function (data) {
                    if(data.code==0){
                        teamAnalysis = data.data
                        start()
                    }
                })
            },3000)
            function start(){
                direction ='horizontal';
                $(".right .container").html("");
                $('.right polyline').remove()
                $(".right").css("transform", "rotate3d(0,0,0,180deg)");
                $(".right .textNode").css("transform", "rotate3d(0,0,0,-180deg)");
                $(".right").css({
                    left:0,
                    top: 0
                });
                $(".right").removeClass("a-rotateDom")
                $(".right").parents(".background").removeClass("a-rotateRight");
                Tool.renderTree(teamAnalysis,$(".right .container")[0]);
                $(".right span").each(function(){
                    if(parseFloat($(this).height())<parseFloat($(this.nextElementSibling).height())) {
                        $(this).css("marginTop", parseFloat($(this.parentNode).height()) / 2 -parseFloat($(this).height())/2);
                    }
                    else{
                        $(this.nextElementSibling).css("marginTop", parseFloat($(this.parentNode).height()) / 2 -parseFloat($(this.nextElementSibling).height())/2);
                    }
                });
                $('.right .svg').css({width:$('.right .container').width(),height:$('.right .container').height()});
                var lists = $(".right ul");
                for(var i = 0,len = lists.length;i<len;i++){
                    Tool.drawTree(lists[i],"svgContainer_right");
                }
                $(".right").css("transform", "rotate3d(1,0,0,180deg)");
                $(".right .textNode").css("transform", "rotate3d(1,0,0,-180deg)");
                //设置向右方向树状结构位置
                var rootNode = $(".right span")[0];
                $(".right").css({
                    left:"244px",
                    // left:parseFloat($(".center_icon").css("marginLeft"))+parseFloat($(".center_icon").css("width")),
                    top:parseFloat($(".center_icon").css("marginTop"))-parseFloat($(rootNode).css("height"))/2+20
                });
                $(".right").addClass("a-rotateDom")
                $(".right").parents(".background").addClass("a-rotateRight");
            }
            start();
        },
        attackAnalysis: function(){
            var w = this;
            var attack = [
                {
                    "name": "攻击分析"
                }
            ];
            setTimeout(function(){
                $.post(baseUrl+"/trace/attack_analysis",w.param,function (data) {
                    if(data.code==0){
                        attack = data.data;
                        start()
                    }
                })
            },3000)
             function start () {
                 direction ='horizontal';
                 $(".right_bottom .container").html("");
                 $('.right_bottom polyline').remove()
                 $(".right_bottom").removeClass("a-rotateDom")
                 Tool.renderTree(attack, $(".right_bottom .container")[0]);
                 $(".right_bottom span").each(function () {
                     if (parseFloat($(this).height()) < parseFloat($(this.nextElementSibling).height())) {
                         $(this).css("marginTop", parseFloat($(this.parentNode).height()) / 2 - parseFloat($(this).height()) / 2);
                     }
                     else {
                         $(this.nextElementSibling).css("marginTop", parseFloat($(this.parentNode).height()) / 2 - parseFloat($(this.nextElementSibling).height()) / 2);
                     }
                 });
                 $('.right_bottom .svg').css({
                     width: $('.right_bottom .container').width(),
                     height: $('.right_bottom .container').height()
                 });

                 var lists = $(".right_bottom ul");
                 for (var i = 0, len = lists.length; i < len; i++) {
                     Tool.drawTree(lists[i], "svgContainer_right_bottom");
                 }
                 //右下方单元的位置
                 var rootNode = $(".right_bottom span")[0];
                 $(".right_bottom").css("left","244px");
                 // $(".right_bottom").css("left", parseFloat($(".center_icon").css("marginLeft")) + parseFloat($(".center_icon").width()));
                 $(".right_bottom").css("top", parseFloat($(".center_icon").css("marginTop")) + parseFloat($(".center_icon").css("height"))- parseFloat($(rootNode).css("height"))/2);
                 $(".right_bottom").addClass("a-rotateDom")
            }
            start()
        },
        infoThreat: function(){
            var w = this;
            var inforThread = [{
                "name": "威胁情报"
            }];
            setTimeout(function(){
                $.post(baseUrl+"/api/querythreat",w.param,function (data) {
                    if(data.code==0){
                        inforThread = data.data;
                        start()
                    }
                })

            },3000)
            function start(){
                direction = 'horizontal';
                $(".left .container").html("");
                $('.left polyline').remove()
                $(".left").css("transform", "rotate3d(0,0,0,180deg)");
                $(".left .textNode").css("transform", "rotate3d(0,0,0,-180deg)");
                $(".left").css({
                    right:0,
                    top: 0
                });
                $(".left").removeClass("a-rotateDom")
                $(".left").parents(".background").removeClass("a-rotateLeft");
                Tool.renderTree(inforThread, $(".left .container")[0]);
                $(".left span").each(function () {
                    if (parseFloat($(this).height()) < parseFloat($(this.nextElementSibling).height())) {
                        $(this).css("marginTop", parseFloat($(this.parentNode).height()) / 2 - parseFloat($(this).height()) / 2);
                    }
                    else {
                        $(this.nextElementSibling).css("marginTop", parseFloat($(this.parentNode).height()) / 2 - parseFloat($(this.nextElementSibling).height()) / 2);
                    }
                });
                $('.left .svg').css({width: $('.left .container').width(), height: $('.left .container').height()});
                var lists = $(".left ul");
                for (var i = 0, len = lists.length; i < len; i++) {
                    Tool.drawTree(lists[i], "svgContainer_left");
                }
                $(".left").css("transform", "rotate3d(0,1,0,180deg)");
                $(".left .textNode").css("transform", "rotate3d(0,1,0,-180deg)");
                $(".left").css({
                    right:"237px",
                    top: parseFloat($(".center_icon").css("marginTop")) - parseFloat($(".left").css("height"))/2+20
                });
                $(".left").addClass("a-rotateDom")
                $(".left").parents(".background").addClass("a-rotateLeft");
            }
            start()
        },
        proof: function(){
            var w = this;
            direction ='horizontal';
            var rootNode = $(".left-down span")[0];
            $(".left-down").css({
                left:parseFloat($(".center_icon").css("marginLeft"))-parseFloat($(".left-down").css("width")),
                top:parseFloat($(".center_icon").css("marginTop"))+parseFloat($(".center_icon").css("height"))-parseFloat($(rootNode).css("height"))/2
            });
            // Tool.renderTree(proof, $(".left-down .container")[0]);
            $(".rectangle").css({
                left:-parseFloat($(".rectangle").width())-70,
                top:-parseFloat($(".rectangle").height())/2+20
            })
            function start(){
                var start = Tool.getStartPoint(rootNode)
                start = {x:start.x+parseFloat($(".left-down span").width()),y:start.y}
                var end = {x:start.x+parseFloat($(".left-down span").width()),y:start.y}
                var polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline');
                polyline.setAttribute('points',`${start.x-3},${start.y} ${end.x-10},${end.y}`);
                polyline.setAttribute('style','fill:none;stroke:#2d9ae0;stroke-width:1;');
                polyline.setAttribute('marker-end','url(#arrow)');
                document.getElementById("svgContainer_left_down").appendChild(polyline);
                $(".left-down").find(".svg").css({
                    left: "-79px",
                    transform: "rotate(180deg)",
                    top: "-54px",
                    right: "-79px"
                })
            }
            setTimeout(function(){
                start()
                $('.rectangle').show();
                w.renderRectangle();

            },3000)

        },
        renderRectangle : function () {
            var w = this;
            $.post(baseUrl+"/trace/proof",w.param,function (json) {
                if(json.code==0){
                    var proof = json.data
                    $(".rectangle .container").html("");
                    var dom = "<ul class='msgList'>";
                    $.each(proof,function (i, item) {
                        dom += "<li><p class='proof-msg'>"+item.msg+"</p><i class='icon-circle'></i><i class='icon-line'></i><span>"+item.time+"</span></li>";
                    })
                    dom += "</ul>";
                    $(".rectangle").find(".container").append(dom);
                }
            })
        },
        scrollList : function () {
            var top  = $(".msgList").css("top").substr(0, $(".msgList").css("top").length-2);
            top--
            $(".msgList").css("top",top+"px");
        },
        renderId : function () {
            var w = this
            $.ajax({
                url: baseUrl+"/trace/ip_list",
                type: 'post',
                dataType: 'json',
                async: false,
                success: function(data){
                    if(data.code==0){
                        var ipList = data.data
                        // w.queryId = ipList[0].key
                         w.queryId = '61.144.227.33';
                        // $(".id_info").val(ipList[0].key)
                        $(".id_info").val('61.144.227.33')
                        var dom = "<div class='id_list_container'><ul class='id_list'>"
                        $.each(ipList,function (i, item) {
                            var className = i==0?"class='on'":""
                            dom += "<li "+className+">"+item.key+"</li>"
                        })
                        dom += "</ul></div>"
                        $(".ip-select").append(dom);
                    }
                }
            })
        },
        setDate : function(type){
            var sd, ed, d, minusDay, lastMonthDay;
            d = new Date();
            minusDay = d.getDay();
            if(type == 0) {//lastWeek
                minusDay = $.getDay(d,1);
                sd = d.getTime() - (minusDay + 7) * 24 * 3600 * 1000;
                ed = d.getTime() - (minusDay + 1) * 24 * 3600 * 1000;
            } else if(type == 1) {//lastTwoWeek
                minusDay = $.getDay(d,1);
                sd = d.getTime() - (minusDay + 14) * 24 * 3600 * 1000;
                ed = d.getTime() - (minusDay + 1) * 24 * 3600 * 1000;
            } else if(type == 2) {//lastMonth
                minusDay = d.getDate() - 1;
                lastMonthDay = getDaysInMonth(d.getFullYear().toString(), d.getMonth());
                sd = d.getTime() - (minusDay + lastMonthDay) * 24 * 3600 * 1000;
                ed = d.getTime() - (minusDay + 1) * 24 * 3600 * 1000;
            } else if(type == 3) {//thisMonth
                minusDay = d.getDate() - 1;
                sd = d.getTime() - (minusDay) * 24 * 3600 * 1000;
                ed = d.getTime();
            } else if(type == 4) {//lastThreeMonth
                minusDay = d.getDate() - 1;
                lastMonthDay = getDaysInMonth(d.getMonth()>0?d.getFullYear().toString():(d.getFullYear().toString()-1), d.getMonth()>0?d.getMonth():(d.getMonth()+12)) + getDaysInMonth((d.getMonth()-1>0)?d.getFullYear().toString():(d.getFullYear().toString()-1), (d.getMonth() - 1)>0?(d.getMonth() - 1):(d.getMonth() - 1+12)) + getDaysInMonth((d.getMonth()-2>0)?d.getFullYear().toString():(d.getFullYear().toString()-1), (d.getMonth() - 2)>0?(d.getMonth() - 2):(d.getMonth() - 2+12));
                sd = d.getTime() - (minusDay + lastMonthDay) * 24 * 3600 * 1000;
                ed = d.getTime() - (minusDay + 1) * 24 * 3600 * 1000;
            }else if(type == 5){//近7天
                minusDay = 6;
                sd = d.getTime() - (minusDay) * 24 * 3600 * 1000;
                ed = d.getTime();
            }else if(type == 6){//近30天
                minusDay = 29;
                sd = d.getTime() - (minusDay) * 24 * 3600 * 1000;
                ed = d.getTime();
            }else if(type == 7){//today
                sd = d.getTime(d.getFullYear()+"."+(d.getMonth()+1)+"."+(d.getDay()+1));
                ed = d.getTime();
            }else if(type == 8){//thisWeek
                sd = d.getTime() - (d.getDay()) * 24 * 3600 * 1000;
                ed = d.getTime();
            }
            var ptn = type!=7?"yyyy-MM-dd":"yyyy-MM-dd hh:mm:ss";
            // this.start = type!=7?$.formatDate(new Date(sd),"yyyy-MM-dd"):$.formatDate(new Date(sd),"yyyy-MM-dd")+" 00:00:00";
            this.start = $.formatDate(new Date(sd),"yyyy-MM-dd")+" 00:00:00";
            this.end = $.formatDate(new Date(ed), "yyyy-MM-dd hh:mm:ss");
        },
        reload : function () {
            var w = this;
            w.infoThreat();
            w.baseInfo();
            w.weakness();
            w.teamAnalysis();
            w.attackAnalysis();
            w.renderRectangle();
        }
    };

    $(function(){
        Trace.init();
        window.onresize = function () {
            location.reload();
        }
    })
})();
$.getDay = function(date,weekStart){
    weekStart = (weekStart || 0) - 0;  //
    if(isNaN(weekStart) || weekStart > 6)  //
        weekStart = 0;
    date = new Date(date);
    //var year = date.getFullYear();
    //var firstDay = new Date(year, 0, 1);
    var firstWeekDays = date.getDay() - weekStart;//
    //var dayOfYear = (((new Date(year, date.getMonth(), date.getDate())) - firstDay) / (24 * 3600 * 1000)) + 1;
    return firstWeekDays < 0 ? firstWeekDays+7:firstWeekDays;
}
/**
 * @param date(Date)
 *            	(Date对象) 需要格式化的时间
 *
 * @param ptn(string)
 * 				格式化标准，如yyyy-MM-dd hh:mm:ss
 *            	支持
 *            	1. yyyy 	年份
 *            	2. MM 		月份
 *            	3. dd		日期
 *            	4. hh		小时
 *            	5. mm		分
 *            	6. ss		秒
 *            	7. SSS		毫秒
 *            	8. q		季度
 *
 * @return(string)
 * 				返回格式化字符串
 */
var CN_ZH_PATTERN = /[\u4E00-\u9FBF]/;
$.formatDate = function(date, ptn) {
    if (typeof date === 'string') {
        ptn = date;
        date = new Date();
    }
    ptn = ptn || "yyyy年MM月dd日 hh:mm";
    date = date || new Date();
    var dt = {
        // 年份
        "yyyy" : date.getFullYear(),
        // 月份
        "MM" : date.getMonth() + 1,
        // 日
        "dd" : date.getDate(),
        // 小时
        "hh" : date.getHours(),
        // 分
        "mm" : date.getMinutes(),
        // 秒
        "ss" : date.getSeconds(),
        // 季度
        "q" : Math.floor((date.getMonth() + 3) / 3),
        // 毫秒
        "SSS" : date.getMilliseconds()
    };
    function padLeft(s, l, c) {
        s = '' + s;
        if (l < s.length)
            return s;
        else
            return Array(l - s.length + 1).join(c || ' ') + s;
    }
    dt.mm = padLeft(dt.mm, 2, '0');
    if (!CN_ZH_PATTERN.test(ptn)) {
        dt.MM = padLeft(dt.MM, 2, '0');
        dt.dd = padLeft(dt.dd, 2, '0');
    }
    for ( var key in dt) {
        ptn = ptn.replace(key, dt[key]);
    }
    return ptn;
};
function isLeapYear(year) {
    return(((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
}
function getDaysInMonth(year, month) {
    return [null,31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
}
