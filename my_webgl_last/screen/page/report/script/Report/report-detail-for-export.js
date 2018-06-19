(function(){
        var inited={
            monitor:false,
            vuls:false,
            cloudwaf:false
        }
    var cloudFlag = true;
    var vulsFlag = true;
    var app={
        init:function(){
            var w=this;
            w.currentDateKey=$("#currentDateKey").val();
            w.domain=$("#currentDomain").val();
            w.report=$("#report").val();
            cloudwaf.init(w.domain, w.currentDateKey,w.report);
        }

    };
$(document).ready(function(){
    app.init();

    $('.m-header').html('');
});


})();