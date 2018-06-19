/**
 * Created by sean on 17/7/30.
 */

var Proof = {
  init: function(param){
    var w = this;
    w.param = param;
    w.initHtml();
    w.initEvent();

  },
  initHtml: function(){
    var w = this;
    var settingColor = {
      '扫描探查': 'blue',
      '渗透攻击': 'cyan',
      '获取权限': 'orange',
      '命令控制': 'yellow',
      '资产破坏': 'red'
    }
    $(".prove-list").html('');
    $.ajax({
      url: baseUrl+'/tracker/proof',
      type: 'post',
      dataType: 'json',
      data: w.param,
      success: function(data){
        if(data.code == 0){
          var html = '';
          if(data.data.length >0){
            data.data.forEach((item=>{
              var msg = String(item.msg).replace(/[ ]/g,"")
              html += ` <div class="prove-item">
                                    <span class="time">${item.time}
                                         <span class="circle"></span>
                                         <span class="innerCircle"></span>
                                    </span>
                                    <div class="message" title=`+msg+`><span class="sign `+settingColor[item.sign]+`">${item.sign}</span><span>${item.msg}</span></div>  
                                </div>`;
            }));
            $(".prove-list").html(html);
          }else{
            $(".prove-list").html('<div class="dv-tip-inner dv-tip-info"><i class="dv-tip-icon"></i><span class="dv-tip-msg">暂无数据</span></div>')
            $(".prove .boundary").hide();
          }

        }
      }
    })

  },
  initEvent: function(){
    var w = this;

  }

};
