/**
 *@name
 *@author Sean.xiang
 *@date 2016/11/1
 *@example
 */
var __ROOT__=$("#rootPath").val();
var __PUBLIC__=$("#publicPath").val();
var _fun = {
    numScoller:function(dom,numstart,numend){
        var w=this;
        var rate=1;
        startCount(dom,{
            speed:(function(){
                if(numend<1000){
                    return 1000;
                }
                else if(numend>1000&& numend<10000){
                    return 3000;
                }else if(numend>10000&& numend<100000){
                    return 5000;
                }else{
                    return 8000;
                }
            })(),
            from:numstart/rate,
            to:numend/rate
        });
    },
    flowScoller:function(dom,numstart,numend){
        startCount(dom,{
            speed:numend<1000?2000 : 4*1000,
            from: numstart,
            to: numend
        });
    },
    num: function(num){ /*数字3位分割*/
        return num.toString().replace(/(\d+?)(?=(?:\d{3})+$)/g, '$1,');
    },
    scroll:function(dom) {/*滚动效果*/
        var y = 0;
        var innerEl = $('#' + dom);
        var rollEl = innerEl.parent();
        var waitEl = innerEl.clone(true).removeAttr('id');
        rollEl.append(waitEl);

        d3.timer(function () {
            y = y - 0.1;
            innerEl.css({
                top: y
            });
            waitEl.css({
                top: y + innerEl.height()
            });

            if (y * -1 > innerEl.height()) {
                y = 0;
                var tmp = innerEl;

                innerEl = waitEl;
                waitEl = tmp;
            }
        });

    },
    numChange: function(dom,data){
        var start= this.prev;
        if(start<0){
            $(dom).text(data);
        }else{
            if(data>start){
                _fun.numScoller.call(this,$(dom),start,data);
            }else{
                $(dom).text(data);
            }
        }
        this.prev=data;
        //console.info();
    },
    getFormatDate: function (date){
        var day = new Date();
        var Year = 0;
        var Month = 0;
        var Day = 0;
        var CurrentDate = "";

        Year = date.getFullYear();
        Month = date.getMonth() + 1;
        Day = date.getDate();
        CurrentDate += Year + "-";
        if (Month >= 10) {
            CurrentDate += Month + "-";
        }
        else {
            CurrentDate += "0" + Month + "-";
        }
        if (Day >= 10) {
            CurrentDate += Day;
        }
        else {
            CurrentDate += "0" + Day;
        }
        return CurrentDate;
    },
    msg: function(type,msg){
        layer.msg(msg,{
            icon: type, //0警告1成功2失败
            offset: '15%',
            move: false,
            resize: false,
            title: false,
            time: 1000
        })
    },
    editText: function(url,pTitle){
        $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            success: function (json) {
                if(json.code){
                    $('.j-edit-text').html('<span>'+json.data[pTitle]+'</span><i class="fa fa-pencil j-edit"></i>')
                }
    
            }
        })
        // $.post(url).success(function (json) {
        //     if(json.code){
        //         $('.j-edit-text').html('<span>'+json.data[pTitle]+'</span><i class="fa fa-pencil j-edit"></i>')
        //     }

        // });
        $("body").on('click','.j-edit',function(){
            var txt =$(this).prev().text();
            var dom =$(this).parent('.j-edit-text');
            dom.attr('data',txt);
            dom.html('<input type="text"  value="'+txt+'"/>' +
                '<i class="fa fa-check j-ok"></i> <i class="fa fa-remove j-remove"></i>');

        });
        $("body").on('click','.j-ok',function(){
            var txt = $(this).parent('.j-edit-text').find('input').val();
            txt.replace("<","&lt;").replace(">","&gt;").replace("'", "");
            var title= $.trim(txt);
            if(title==''){
                _fun.msg(0,'标题不能为空');
            }else{
                var param ={};
                param[pTitle]=title;
                $.ajax({
                    type: 'post',
                    url: url,
                    data: param,
                    success: function (json) {
                        if(json.code){
                            _fun.msg(1,'修改成功');
                            $('.j-edit-text').html('<span>'+title+'</span><i class="fa fa-pencil j-edit"></i>')
                        }else{
                            _fun.msg(2,'修改失败');
                        }
    
    
                    }
                })
                // $.post(url,param).success(function (json) {
                //     if(json.code){
                //         _fun.msg(1,'修改成功');
                //         $('.j-edit-text').html('<span>'+title+'</span><i class="fa fa-pencil j-edit"></i>')
                //     }else{
                //         _fun.msg(2,'修改失败');
                //     }


                // });
            }

        });
        $("body").on('click','.j-remove',function(){
            var dom =$(this).parent('.j-edit-text');
            var title =dom.attr('data');
            dom.html('<span>'+title+'</span><i class="fa fa-pencil j-edit"></i>')
        });
    }
};
