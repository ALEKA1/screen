
(function(global) {
  global.areaAlert = {
    init: function() {
    },
    search: function(param, dateType) {

      this.param = this.extend(param, {size :5});

      if(!this.cmp) {
        this.cmp = new AreaN(".area-alert-rank");
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
    showData: function(data, dateType, type,projectQss,startTime,endTime) {
      var el = $(".area-alert-rank");
      var newData = []
      if(data && data['data'] && data['data'].length > 0) {

        for(let i = 0; i<data['data'].length; i++){
          let id = data['data'][i]['customerId']
          newData.push({
            count: data['data'][i]['value'],
            name: data['data'][i]['name'],
            high: data['data'][i]['high'],
            medium: data['data'][i]['medium'],
            low: data['data'][i]['low'],
            href: "/index.html#/alert_source?saveType=alert&conditions=type:web_alert&conditions=customerId:"+id+"&end="+this.cmp.endTime+"&start="+this.cmp.startTime
          })
        }
        this.cmp.chart = newData;
        this.cmp.load();
      } else {
        this.cmp.chart = [
          {
            "name": "暂无",
            "count": 0,
            "ip": ""
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
        url: '/api/es/customerAlertCount',
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
  global.areaAlert.init();
})(window);
