var Ajax = $.ajax;
$.ajax = function(D) {
  D.complete = function(XMLHttpRequest, textStatus) {
    var req_status = XMLHttpRequest.status;
    switch(req_status) {
      case 404: 
          parent.location.href = "#/noFound";
          break;
      case 403:
          parent.location.href = "#/noPermission";
          break;
    }
    if (XMLHttpRequest.getResponseHeader("sessionstatus") == "loginout") {
      var arr = parent.location.href.split("/");
      var loca = arr[0];
      var len = arr.length;
      var str = arr[len-1];
      if (str != "login") {
        window.location.href = "/index.html#/login";
      }
    }
  }
  Ajax(D);
}