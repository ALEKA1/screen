/**
 * Created by sean on 17/7/21.
 */

// window.screen =  {};
window.screen.width && $('body').css('width', window.screen.width);
window.screen.height && $('body').css('height', window.screen.height);
$('head').append('<meta name="viewport" content="width='+window.screen.width+'"/>');
$(window, document).resize(function(){
    resize();
}).load(function(){
    resize();
});
function resize() {
    console.info(window.screen.width,window.screen.height)
    console.info($(window).width(),$(window).height())
    /*if (window.screen.display == 2) {
        resizeCenter();
    } else if (window.screen.display == 3) {
        resizeFull();
    } else {
        resizeWidth();
    }*/
    resizeCenter();
}
function resizeWidth() {
    var ratio = $(window).width()/(window.screen.width||$('body').width());
    $('body').css({
        transform: "scale("+ratio+")",
        transformOrigin: "left top",
        backgroundSize: "100%"
    });
}
function resizeCenter() {
    if(!window.screen.height||!window.screen.width) return resizeCenterBak();
    var ratio = $(window).height()/window.screen.height;
    $('body').css({
        transform: "scale("+ratio+")",
        transformOrigin: "left top",
        backgroundSize: 100*(window.screen.width/$(window).width() * ratio)+"%" + ' 100%',
        backgroundPosition: ($(window).width()-$('body').width()*ratio)/2+"px top",
        marginLeft: ($(window).width()-$('body').width()*ratio)/2
    });
}
function resizeFull() {
    if(!window.screen.height||!window.screen.width) return resizeFullBak();
    var ratioX = $(window).width()/window.screen.width;
    var ratioY = $(window).height()/window.screen.height;
    $('body').css({
        transform: "scale("+ratioX+", "+ratioY+")",
        transformOrigin: "left top",
        backgroundSize: "100% 100%",
    });
}

function resizeCenterBak() {
    var ratioX = $(window).width()/$('body').width();
    var ratioY = $(window).height()/$('body').height();
    var ratio = Math.min(ratioX, ratioY);
    $('body').css({
        transform: "scale("+ratio+")",
        transformOrigin: "left top",
        backgroundSize: (1/ratioX)*100*ratio+"%",
        backgroundPosition: ($(window).width()-$('body').width()*ratio)/2+"px top",
        marginLeft: ($(window).width()-$('body').width()*ratio)/2
    });
}
function resizeFullBak() {
    var ratioX = $(window).width()/$('body').width();
    var ratioY = $(window).height()/$('body').height();
    $('body').css({
        transform: "scale("+ratioX+", "+ratioY+")",
        transformOrigin: "left top",
        backgroundSize: "100% "+ratioY*100+"%",
    });
}