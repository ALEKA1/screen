/**
 * Created by sean on 17/7/30.
 */

    var Attack = {
        init: function(param){
            var w = this;
            w.param = param;
            w.initHtml();
        },
        initHtml: function(){
            var w = this;
          $(".attack-details").html('');
          $.ajax({
                url:baseUrl+'/tracker/attackInfo',
                type: 'post',
                data: w.param,
                dataType: 'json',
                success: function(data){
                    if(data.code == 0){
                        var html = '';
                        if(data.data.length>0){
                            var value = data.data[0].value
                                data.data.forEach(((item)=>{
                                    html +=`<tr><td>${item.key}</td>
                                        <td></td>
                                        <td>
                                            <div class="progress">
                                                <div class="progress-bar" style="width: `+(item.value/value)*100+`%;">
                                                    <span>${item.value}</span>
                                                </div>
                                            </div>
                                        </td></tr>`
                                }));
                                $(".attack-details").html(html);
                        }else{
                          $(".attack-details").html('<div class="dv-tip-inner dv-tip-info"><i class="dv-tip-icon"></i><span class="dv-tip-msg">暂无数据</span></div>');
                        }

                    }
                }
            })

        }
    };
