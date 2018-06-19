
var Emery={
    init: function(){
        var w= this;
        w.initHtml();
    },
    initHtml: function(){
        var w = this;
        w.totalInfo();
        w.name();
        $('.safe_bg').height($(window).height() *1);
    },
    name: function(){
        var w = this;
        $.ajax({
            type: 'post',
            url: __ROOT__+'/Home/MirrorSafe/name',
            dataType: 'json',
            success: function(json){
                if(json.code){
                    $('.name-one').text(json.data[0]);
                    $('.name-two').text(json.data[1]);
                    $('.name-three').text(json.data[2]);
                    $('.name-four').text(json.data[3]);
                    $('.name-five').text(json.data[4]);
                }
            }
        })
        // $.post(__ROOT__+'/Home/MirrorSafe/name').success(function(json){
        //     if(json.code){
        //         $('.name-one').text(json.data[0]);
        //         $('.name-two').text(json.data[1]);
        //         $('.name-three').text(json.data[2]);
        //         $('.name-four').text(json.data[3]);
        //         $('.name-five').text(json.data[4]);
        //     }
        // })
    },
    totalInfo: function () {
        var w = this;
        $.ajax({
            type: 'post',
            url: __ROOT__+'/Home/MirrorSafe/info',
            dataType: 'json',
            success: function(json){
                if(json.code){
                    var dfe = _fun.num(json.data.dfe);//防护攻击次数
                    var act = _fun.num(json.data.act);//识别有效攻击数量
                    var total = _fun.num(json.data.total);//累计工单次数
                    var safe= _fun.num(json.data.safe);//保护主机次数
                    $('.defense').text(dfe);
                    $('.attack').text(act);
                    $('.total').text(total);
                    $('.safe').text(safe)
                }
            }
        })
        // $.post(__ROOT__+'/Home/MirrorSafe/info').success(function(json){
        //     if(json.code){
        //         var dfe = _fun.num(json.data.dfe);//防护攻击次数
        //         var act = _fun.num(json.data.act);//识别有效攻击数量
        //         var total = _fun.num(json.data.total);//累计工单次数
        //         var safe= _fun.num(json.data.safe);//保护主机次数
        //         $('.defense').text(dfe);
        //         $('.attack').text(act);
        //         $('.total').text(total);
        //         $('.safe').text(safe)
        //     }
        // })
    }
};



$(function(){
    Emery.init()
});