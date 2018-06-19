(function(global) {
//累计攻击者
	global.ipnumber = {
    init: function() {
    },
    search: function(param) {
      $.ajax({
        traditional: true,
        type: 'post',
        url: '/apt/screen/attack/number',
        dataType: 'json',
        data: param,
  //	      data: {
  //	        startTime: '2017-10-09 12:00:00',
  //	        endTime: '2017-10-14 09:00:00',
  //	        deviceAddress: ['192.168.30.93']
  //	      },
        success: (data) => {
          $('.waf_center #cumulative_attacker').text(data['data'][0]['ipNumber']);
        }
      });
    }
  };
})(window);