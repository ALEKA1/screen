window.ailpha = {
  ui: {}		
};
window.base = {
	urlDecode : function(string, overwrite) {
		if (!string || !string.length) {
			return {};
		}
		var obj = {};
		var pairs = string.split("&");
		var pair, name, value;
		for (var i = 0, len = pairs.length; i < len; i++) {
			pair = pairs[i].split("=");
			name = decodeURIComponent(pair[0]);
			value = decodeURIComponent(pair[1]);
			if (overwrite !== true) {
				if (typeof obj[name] == "undefined") {
					obj[name] = value;
				} else {
					if (typeof obj[name] == "string") {
						obj[name] = [obj[name]];
						obj[name].push(value);
					} else {
						obj[name].push(value);
					}
				}
			} else {
				obj[name] = value;
			}
		}
		return obj;
	},
	format(date, format) {
    var o = {
      "M+": date.getMonth() + 1, // month
      "D+": date.getDate(), // day
      "h+": date.getHours(), // hour
      "m+": date.getMinutes(), // minute
      "s+": date.getSeconds(), // second
      "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
      "S": date.getMilliseconds()
      // millisecond
    };
    if (/(Y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  },
  transDate(time, format) {
    if (!time) {
      return "";
    }
    return this.format(new Date(time), format || 'YYYY-MM-DD hh:mm:ss');
  }		
};