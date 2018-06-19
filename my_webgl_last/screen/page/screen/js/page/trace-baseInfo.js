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
            url: baseUrl+'/tracker/baseInfo',
            data: w.param,
            dataType: 'json',
            success: function(json){
                if(json.code==0){
                    var valueHtml = '';
                    var keyHtml = '';
                    json.data.forEach((item)=>{
                        for(var key in item){
                            valueHtml += ` <div title =`+item[key]+`>${item[key]}</div>`;
                            keyHtml +=`<div>${key}</div>`;
                        }
                    });
                    $(".basicInfo-value").html(valueHtml);
                    $(".basicInfo-key").html(keyHtml);
                }
            }
          })
            // $.post(baseUrl+'/tracker/baseInfo',w.param).success(function(json){
            //     if(json.code==0){
            //         var valueHtml = '';
            //         var keyHtml = '';
            //         json.data.forEach((item)=>{
            //             for(var key in item){
            //                 valueHtml += ` <div title =`+item[key]+`>${item[key]}</div>`;
            //                 keyHtml +=`<div>${key}</div>`;
            //             }
            //         });
            //         $(".basicInfo-value").html(valueHtml);
            //         $(".basicInfo-key").html(keyHtml);
            //     }
            // })
        },


    };
