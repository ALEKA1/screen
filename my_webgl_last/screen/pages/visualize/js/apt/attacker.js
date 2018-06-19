// 被攻击站点数
(function(global) {
	global.attacker = {
	  init: function() {},
	  search: function(param) {
	    $.ajax({
        traditional: true,
        type: 'post',
        url: '/apt/screen/attack/armnumber',
        dataType: 'json',
        data: param,
//		      data: {
//		        startTime: '2017-10-09 12:00:00',
//		        endTime: '2017-10-14 09:00:00',
//		        deviceAddress: ['192.168.30.93']
//		      },
        success: (data) => {
          $('.waf_center #site_num').text(data['data'][0]['attackedNumber']);
	      }
	    });
	  }
	};
})(window);