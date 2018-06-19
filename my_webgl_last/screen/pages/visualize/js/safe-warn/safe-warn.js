/**
 * Created by sean on 17/11/28.
 */
var SafeWarn = {
  init: function() {
    this.urlParam = base.urlDecode(window.location.search.substring(1));
    if(!this.searchBar) {
      this.searchBar = new ailpha.ui.SearchBar('id-searchBar', {
        submit: (v, date) => {
          parent.location.href = "?date=" + date["key"];
        }
      });
      this.searchBar.load([{
        key: '',
        value: this.urlParam["date"]
      }]).setValue('', this.urlParam["date"] || "7d");
    }
    this.autoScreen();
    var time = this.searchBar.getDateByShortcut(this.searchBar.getData()["key"]);
    this.search({
      startTime: base.transDate(time[0]),
      endTime: base.transDate(time[1])
    });
    //  定时刷新数据
    this.reloadTimer({
      startTime: base.transDate(time[0]),
      endTime: base.transDate(time[1])
    });
    var mySwiper = new Swiper ('.swiper-container', {
      // loop: true,
      // effect : 'coverflow',
      pagination : '.swiper-pagination',
      paginationClickable :true,
      spaceBetween : 20,
      autoplay: 10*1000
    })
    $(".swiper-container").mouseenter(function () {//滑过悬停
      mySwiper.stopAutoplay();//
    }).mouseleave(function(){//离开开启
      mySwiper.startAutoplay();
    });
  },
  autoScreen: function () {
    var oHtml = document.getElementsByTagName('html')[0];
    var htmlW = oHtml.clientWidth;
    oHtml.style.fontSize = htmlW / 1920 * 100 + 'px';
  },
  search: function(param) {
    //告警排行
    alert.search(param);
    //资源告警排行
    assetAlert.search(param);
    //安全域图
    areaChart.search(param);
    //安全域告警排行
    areaAlert.search(param);
    //资源告警排行
    timeGrid.search(param);


  },
  reloadTimer: function(param) {
    clearInterval(this.timer);
    this.timer = setInterval((p) => {
      var time = this.searchBar.getDateByShortcut(this.searchBar.getData()["key"]);
      var timeparam = {
        startTime: base.transDate(time[0]),
        endTime: base.transDate(time[1]),
      };
      this._alert(timeparam)
    }, 1000*60*2);
    this._alert = (param) => {
      this.param  = param;
      alert.search(param);
      setTimeout(() => {
        this._assetAlert(this.param);
      },5000)
    };
    this._assetAlert = (param) => {
      this.param = param;
      assetAlert.search(param);
      setTimeout(() => {
        this._areaAlert(this.param);
      },5000)
    };
    this._areaAlert = (param) => {
      this.param = param;
      areaAlert.search(param);
      setTimeout(() => {
        this._areaChart(this.param);
      },5000)
    };
    this._areaChart = (param) => {
      this.param = param;
      areaChart.search(param);
      setTimeout(() => {
        this._timeGrid(this.param);
      },5000)
    };
    this._timeGrid = (param) => {
      timeGrid.search(this.param);
    };
  }
}
SafeWarn.init()
