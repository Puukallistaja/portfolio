$(document).ready(function(){
  const sl = $('#slider').slider({
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

      //move the cover divs with the slider
      if (ui.value > 50) {
        $('.top').height(`${pos}%`)
      } else {
        $('.bottom').height(`${100 - pos}%`)
      }

      
    }
  });

  $('body').on( 'DOMMouseScroll mousewheel', function ( event ) {
    let currHeight = sl.slider('option', 'value');
    let newHeight;

    function slideWithScroll(height) {
      console.log(currHeight, height)
      sl.slider('option', 'value', height);
      sl.slider('option','slide')
          .call(sl, null, { handle: $('.ui-slider-handle', sl), value: height });
    }

    if ( event.originalEvent.detail     > 0 
      || event.originalEvent.wheelDelta < 0 ) {
      //scroll down
      newHeight = currHeight >= 12 ? currHeight -2
                                  : currHeight
      slideWithScroll(newHeight);

    } else {
      //scroll up
      newHeight = currHeight <= 88 ? currHeight + 2
                                   : currHeight
      slideWithScroll(newHeight);
    }
    //prevent page fom scrolling
    return false;
  });
});