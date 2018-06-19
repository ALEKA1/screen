
(function(global) {
  global.assetAlert = {
    init: function() {
      $(".asset-alert .more").click(() => {
        this.loadMore();
      });
    },
    search: function(param, dateType) {

      this.param = this.extend(param, {size :5});

      if(!this.cmp) {
        this.cmp = new TopN(".asset-alert-rank");
      }
      this.cmp.dateType = dateType || "";
      this.cmp.startTime = this.param.startTime || "";
      this.cmp.endTime = this.param.endTime || "";
      this.req_getList(this.param);
    },
    extend: function(parama, paramb) {
      var newObj = {}
      for (item in parama) {
        newObj[item] = parama[item]
      };
      for (item in paramb) {
        newObj[item] = paramb[item]
      }
      return newObj;
    },
    loadMore: function() {
      let param = this.extend(this.param, {size :100});
      this.req_getList(param);
    },
    showData: function(data) {
      this.cmp.startTime = this.param.startTime || "";
      this.cmp.endTime = this.param.endTime || "";
      var el = $(".web-alert-rank");
      var newData = []
      if(data && data['data'] && data['data'].length > 0) {

        for(let i = 0; i<data['data'].length; i++){
          let ip = data['data'][i]['destAddress']
          newData.push({
            count: data['data'][i]['value'],
            name: data['data'][i]['name'],
            href: "/index.html#/alert_source?saveType=alert&conditions=type:web_alert&conditions=destAddress:"+ip+"&end="+this.cmp.endTime+"&start="+this.cmp.startTime
          })
        }
        this.cmp.chart = newData;
        this.cmp.load();
      } else {
        this.cmp.chart = [
          {
            "count": 0,
            "name": '暂无'
          }
        ];
        this.cmp.load();
      }
    },
    req_getList: function(param) {
      //
      $.ajax({
        traditional: true,
        type: 'post',
        url: '/api/es/deviceAlertCount',
        dataType: 'json',
        data: param,
        success: (data) => {
          this.showData(data);
        },
        error: (data) => {
          this.showData();
        }
      });
    }
  };
  global.assetAlert.init();
})(window);
