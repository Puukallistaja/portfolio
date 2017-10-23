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
      console.log(pos)
      $('#spacer').css({'top': `${pos}%`})

      if (ui.value > 50) {
        $('.top').height(`${pos}%`)
      } else {
        $('.bottom').height(`${100 - pos}%`)
      }
    }
  });
});