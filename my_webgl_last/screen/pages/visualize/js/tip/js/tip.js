/**
 * @author Sean
 * @dec ui消息提示
 * @params
 * msg     string  ''
 * config  object  {}
 * @api
 * new ailpha.ui.tip('msg',
 *  {
 *    type: 'info', 默认info 可无
 *    timeout: 2000 默认2000 可无
 * })
 */

(function(global) {
   function tip(msg, config) {
    var type = config && config.type ? config.type : "info";
    if($('.dv-tip')&&$('.dv-tip').length){
      $('.dv-tip').remove()
    }
    var timeout = config && config.timeout ? config.timeout : 2000;
    var TipElement = $(document.createElement('div')).addClass('dv-tip ' + 'dv-tip-'+type).html("<i class='dv-tip-icon'></i><span class='dv-tip-msg'>"+msg+"</span>");
    // TipElement.css("zIndex", ++ global.zIndex);
     TipElement.prependTo($(document.body)).hide().slideDown();
    setTimeout(function() {
      TipElement.fadeOut(function() {
        this.remove();
      });
    }, timeout);
  }

  global.tip = tip;
})(ailpha.ui)
