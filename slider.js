$(document).ready(function(){
  const sliderOrigninalOffset = 64

  const sl = $('#slider').slider({
    orientation: "vertical",
    min: 12,
    max: 88,
    value: 36,
    slide: function( event, ui ) {
      //position of the spacer in %
      let pos = 100 - ui.value;
      $('#spacer').css({'top': `${pos}%`})

      // element coordinates and dimensions
      let spacerPos = $('.spacer').offset();
      let spacerHeight = $('.spacer').height();
      let container = $('.base').height();
      // glue top and bottom to spacer
      $('.top').height(`${spacerPos.top}px`)
      $('.bottom').height(`${container - spacerPos.top - spacerHeight}px`)
    }
  });
  // when scrolled, move the spacer
  $('body').on( 'DOMMouseScroll mousewheel', function ( event ) {
    let currHeight = sl.slider('option', 'value');
    let newHeight;
    // console.log("curr" + currHeight)

    if ( event.originalEvent.detail     > 0 
      || event.originalEvent.wheelDelta < 0 ) {
      //scroll down

      // stop scrolling if getting out of bounds
      newHeight = currHeight >= 14 ? currHeight -2
                                   : currHeight
      moveSlider(newHeight);

    } else {
      //scroll up
      newHeight = currHeight <= 86 ? currHeight + 2
                                   : currHeight
      moveSlider(newHeight);
    }
    //prevent page fom scrolling
    return false;
  });

  function moveSlider(height) {
    // console.log(`new${height}`)
    sl.slider('option', 'value', height);
    sl.slider('option','slide')
        .call(sl, null, { handle: $('.ui-slider-handle', sl), value: height });
  }
  // click events on name and words
  $('.words').on('click', function() {

  });

});