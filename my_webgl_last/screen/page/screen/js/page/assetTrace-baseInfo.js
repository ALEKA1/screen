/**
 * Created by sean on 17/7/28.
 */


    var BaseInfo = {
        init: function(param){
            var w = this;
            w.param= param;
            w.initHtml();
        },
        initHtml: function(){
            var w = this;
          $(".basicInfo-value").html('');
          $(".basicInfo-key").html('');
          $.ajax({
            type: 'post',
            url: baseUrl+'/tracker/asset/baseInfo',
            data: {ip: w.param.ip},
            dataType: 'json',
            success: function(json){
                if(json.code==0){
                    var valueHtml = '';
                    var keyHtml = '';
                  for(var key in json.data){
                    valueHtml += ` <div title =`+json.data[key]+`>${json.data[key]}</div>`;
                    keyHtml +=`<div>${key}</div>`;
                  }
                    $(".basicInfo-value").html(valueHtml);
                    $(".basicInfo-key").html(keyHtml);
                }
            }
          })
        },


    };
