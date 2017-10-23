$(document).ready(function(){
  $('#slider').slider({
    orientation: "vertical",
    // range: "max",
    min: 10,
    max: 90,
    value: 50,
    slide: function( event, ui ) {
      //position of the spacer in %
      let pos = 100 - ui.value;
      $('#spacer').css({'top': `${pos}%`})

      if (ui.value > 50) {
        $('.blue').height(event.pageY)
      }
    }
  });
});