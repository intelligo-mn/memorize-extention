(function($) {

  var rdmtime;
  
  setInterval( function() {
    rdmtime = Math.floor(Math.random() * 400);
    $('#text').toggleClass('glitch');
  }, rdmtime);

})(jQuery);