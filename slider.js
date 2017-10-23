$(document).ready(function(){
  const sliderOrigninalOffset = 64

  const sl = $('#slider').slider({
    orientation: "vertical",
    // range: "max",
    min: 12,
    max: 88,
    value: 36,
    slide: function( event, ui ) {
      //position of the spacer in %
      let pos = 100 - ui.value;
      console.log(pos)
      $('#spacer').css({'top': `${pos}%`})

      //move the cover divs with the slider
      //===================================
      if (pos < sliderOrigninalOffset) {

        $('.top').height(`${pos - 2}%`)
      } else if (pos === sliderOrigninalOffset) {
        //this is getting ugly
        // when its the orignal position, both sliders need to adjust
        // else there will be a gap
        $('.top').height(`${pos - 2}%`)
        $('.bottom').height(`${98 - pos}%`)
      } else {

        $('.bottom').height(`${98 - pos}%`)
      }

      
    }
  });
  // when scrolled, move the spacer
  $('body').on( 'DOMMouseScroll mousewheel', function ( event ) {
    let currHeight = sl.slider('option', 'value');
    let newHeight;
    console.log("curr" + currHeight)
    function slideWithScroll(height) {
      console.log(`new${height}`)
      sl.slider('option', 'value', height);
      sl.slider('option','slide')
          .call(sl, null, { handle: $('.ui-slider-handle', sl), value: height });
    }

    if ( event.originalEvent.detail     > 0 
      || event.originalEvent.wheelDelta < 0 ) {
      //scroll down

      //check if we can scroll more 
      newHeight = currHeight >= 14 ? currHeight -2
                                   : currHeight
      slideWithScroll(newHeight);

    } else {
      //scroll up
      newHeight = currHeight <= 86 ? currHeight + 2
                                   : currHeight
      slideWithScroll(newHeight);
    }
    //prevent page fom scrolling
    return false;
  });
});