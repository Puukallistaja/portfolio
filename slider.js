$(document).ready(function(){

  // alignElements();

  const sl = $('#slider').slider({
    orientation: "vertical",
    min: 12,
    max: 88,
    value: 34,
    create: function( event, ui ) {
      alignElements()
    },
    slide: function( event, ui ) {
      alignElements()
    }
  });

  function alignElements() {

    // element coordinates and dimensions
    let slHandleY = $('.ui-slider-handle').offset().top;
    let spacerY = $('.spacer').offset().top;
    let spacerHeight = $('.spacer').height() -1;
    let baseY = $('.base').height();

    // glue spacer to slider handle
    // glue top and bottom to spacer
    $('.spacer').offset({ top: slHandleY });
    $('.top').height(`${slHandleY}`);
    $('.bottom').height(`${baseY - slHandleY - spacerHeight}`);
  }


  // when scrolled, move the slider
  $('body').on( 'DOMMouseScroll mousewheel', function ( event ) {
    let currHeight = sl.slider('option', 'value');
    let newHeight;
    let step = 2

    if ( event.originalEvent.detail     > 0 
      || event.originalEvent.wheelDelta < 0 ) {
      //scroll down
                  // stop scrolling if getting out of bounds
      moveSlider( currHeight >= 14 ? currHeight - step
                                   : currHeight );
    } else {
      //scroll up
      moveSlider( currHeight <= 86 ? currHeight + step
                                   : currHeight );
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