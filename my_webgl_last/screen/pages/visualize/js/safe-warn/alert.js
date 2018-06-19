
(function(global) {
  global.alert = {
    init: function() {
      $(".web-alert .more").click(() => {
        this.loadMore();
      });
    },
    search: function(param, dateType) {

      this.param = this.extend(param, {size :5});

      if(!this.cmp) {
        this.cmp = new TopN(".web-alert-rank");
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
      var el = $(".web-alert-rank");
      var newData = []
      if(data && data['data'] && data['data'].length>0) {

        for(let i = 0; i<data['data'].length; i++){
          let warningType = encodeURIComponent(data['data'][i]['warningType'])
          newData.push({
            count: data['data'][i]['value'],
            name: data['data'][i]['name'],
            href: '/index.html#/alert_source?saveType='+data['data'][i]['saveType']+'&conditions=warningType:'+warningType+'&start='+this.cmp.startTime+'&end='+this.cmp.endTime
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
      $.ajax({
        traditional: true,
        type: 'post',
        url: '/api/es/alertCount',
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
  global.alert.init();
})(window);
