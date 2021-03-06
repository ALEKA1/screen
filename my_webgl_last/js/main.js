/**
 * Created by jianghaifeng on 2016/2/17.
 */
var __ROOT__=$("#rootPath").val();
var __WEBROOT__=__ROOT__;
var __PUBLIC__=$("#publicPath").val();
var __ECHART__=$("#echartPath").val();


var __GEO__={
    china_province:{
        '上海': [121.4648,31.2891],
        '广东': [113.8953,22.901],
        '山东': [118.7073,37.5513],
        '山西': [111.4783,36.1615],
        '辽宁': [124.541,40.4242],
        '新疆': [87.9236,43.5883],
        '河北': [115.0488,39.0948],
        '甘肃': [103.5901,36.3043],
        '内蒙': [110.3467,41.4899],
        '内蒙古': [110.3467,41.4899],
        '北京': [116.4551,40.2539],
        '广西': [109.314,21.6211],
        '江苏': [118.8062,31.9208],
        '江西': [116.0046,28.6633],
        '福建': [118.1689,24.6478],
        '安徽': [117.29,32.0581],
        '陕西': [108.4131,34.8706],
        '黑龙江': [127.9688,45.368],
        '天津': [117.4219,39.4189],
        '西藏': [91.1865,30.1465],
        '云南': [102.9199,25.4663],
        '浙江': [119.5313,29.8773],
        '湖南': [113.5327,27.0319],
        '湖北': [114.3896,30.6628],
        '海南': [110.3893,19.8516],
        '青海': [101.4038,36.8207],
        '贵州': [106.6992,26.7682],
        '河南': [113.4668,34.6234],
        '重庆': [107.7539,30.1904],
        '宁夏': [106.3586,38.1775],
        '吉林': [125.8154,44.2584],
        '中国':[116.4551,40.2539],
        '局域网':[116.4551,40.2539],
        '未知':[116.4551,40.2539],
        '四川':[103.9526,30.7617],
        '台湾':[121.31,25.03]
    },
    provincial_capital : {
        '北京': [116.4551,40.2539],
        '上海': [121.4648,31.2891],
        '天津': [117.4219,39.4189],
        '重庆': [107.7539,30.1904],
        '郑州': [113.4668,34.6234],
        '哈尔滨': [127.9688,45.368],
        '长春': [125.8154,44.2584],
        '长沙': [113.0823,28.2568],
        '沈阳': [123.1238,42.1216],
        '合肥': [117.29,32.0581],
        '呼和浩特': [111.4124,40.4901],
        '石家庄': [114.4995,38.1006],
        '福州': [119.4543,25.9222],
        '乌鲁木齐': [87.9236,43.5883],
        '兰州': [103.5901,36.3043],
        '西宁': [101.4038,36.8207],
        '西安': [109.1162,34.2004],
        '贵阳': [106.6992,26.7682],
        '银川': [106.3586,38.1775],
        '济南': [117.1582,36.8701],
        '太原': [112.3352,37.9413],
        '武汉': [114.3896,30.6628],
        '南京': [118.8062,31.9208],
        '南宁': [108.479,23.1152],
        '南昌': [116.0046,28.6633],
        '成都': [103.9526,30.7617],
        '昆明': [102.9199,25.4663],
        '拉萨': [91.1865,30.1465],
        '杭州': [119.5313,29.8773],
        '广州': [113.5107,23.2196],
        '海口': [110.3893,19.8516]
    }
}

var storm = {
    before_dialog_submit:function(dialog){
        dialog.enableButtons(false);
        dialog.setClosable(false);
    },
    dialog_submit:function(dialog,table,json){
        dialog.enableButtons(true);
        dialog.setClosable(true);
        if(json.code>0){
            dialog.close();
            if(dialog['options']['data']['row']){//修改
                var row = dialog['options']['data']['row'];
                row.data(json.item).draw(false );
            }else{
                table.row.add( json.item).draw(false );
            }
        }
        storm.alert(json.code?1:2, json.msg);
        //swal({   title: json.msg, type: json.code?"success":"error",   confirmButtonText: "确定" });
    },
    showMsg: function(title, msg, type){
        swal({
            title: title,
            text: msg,
            type: type? type : "success",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            //cancelButtonText: "让我在考虑一下",
            confirmButtonText: "确定",
            closeOnConfirm: false
        });
    },
    alert:function(type,msg){
        layer.msg(msg,{
            icon: type, //0警告1成功2失败
            offset: '15%',
            move: false,
            resize: false,
            title: false,
            time: 2000
        })

    },
    confirm:function(msg,callback){
        var index = layer.confirm(msg,{
            offset: '15%',
            btn: ['确定','取消'],
            move: false,
            resize: false
        },function(){
            callback&&callback();
            layer.close(index);
        })
    },
    form:{
        init:function(form, json){
            $.each(json,function(k,v){
                var o=$("[name='"+k+"']",form);
                if(o){
                    if(o.is(":input")&&o.attr("type")){
                        if(o.attr("type")=='password'){
                            //do nothing
                        }else if(o.attr("type")=='radio'){
                            $.each(o,function(j,radio){
                                if($(radio).val()==v){
                                    $(radio).click();
                                }
                            });
                        }else{
                            o.val(v);
                        }
                    }else if(o.is("select")){
                        if(o.attr("multiple")){
                            $.each(v,function(i,one){
                                $("[value='"+one+"']",o).attr("selected","selected");
                            });
                        }else{
                            o.val(v);
                        }
                        //o.val(v);
                    }
                }
            });

        },
        reset:function(form){

            form[0].reset();
            $("[name='_id']",form).val("");
            $("select",form).val("");
        },
        serialize:function(form){
            var text=form.serialize();
            var tmps=text.split("&");
            var params={};
            tmps.forEach(function(p){
                var _t= p.split("=");
                if(_t.length==2&&_t[1]){
                    if(params[_t[0]]){
                        params[_t[0]]= params[_t[0]]+","+_t[1];
                    }else{
                        params[_t[0]]=_t[1];
                    }
                }
            });
            var serialize='';
            $.each(params,function(k,v){
                serialize=serialize+k+"="+v+"&";
            });
            return serialize.substr(0,serialize.length-1);
        },
        simpleSerialize:function(form){
            var inputs=$("input,select",form);
            var param={};
            $.each(inputs,function(i,input){
                if(!$(input).attr("disabled")){
                    var name=$(input).attr("name");
                    var value=$(input).val();
                    if(value!=''){
                        param[name]=value;
                    }

                }
            });
            return param;
        }
    }
};
var main__init={
    _about:function(){
        $("#about_btn").bind("click",function(){
            $.post(__ROOT__+"/Admin/Login/about").success(function(json){
                storm.alert("版本:"+json.version);
            });
        });
    }

};
$(function(){
    /*widget折叠收起*/

    $('.collapse-link').click(function(){
        var o = $(this).closest(".widget"),
            e = $(this).find("i"),
            i = o.find('.widget-content');
        i.slideToggle(200);
        e.toggleClass('fa-angle-double-up').toggleClass('fa-angle-double-down')

    });

    /*滚动条事件*/

    $('.main').scroll( function() {
        var scrollValue=$(this).scrollTop();
        scrollValue > 50 ? $('.go-top').slideDown():$('.go-top').slideUp();
        if($(this).children().hasClass('m-header')){
            var navH = $(this).find(".m-header").offset().top;
            if(scrollValue >= navH&&scrollValue>0){
                $(this).find('.m-header').addClass('fixed');
            }else{
                $(this).find('.m-header').removeClass('fixed');
            }
        }



    });

    /*回到顶部*/

    $('.scroll').click(function(){
        $(".main").animate({scrollTop:0},200);
    });




    /*$('.side-menu-item').bind("click", function(){
        console.info('sean');
        var p=$(this).next("ul");
        console.info(p);
        if(p.hasClass("nav-second-level")){
            console.info('sean1');
            p.addClass("in");
            p.closest("li").addClass("active");
        }else{
            console.info('sean2');
            $(this).closest("li").addClass("active");
        }
    })*/


});

// main__init.region_switch();

main__init._about();

