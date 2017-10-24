$(document).ready(function(){

  const MIN = 12;
  const MAX = 88;

  const sl = $('#slider').slider({
    orientation: "vertical",
    min: MIN,
    max: MAX,
    value: 33,
    create: function( event, ui ) {
      // alignElements()
    },
    slide: function( event, ui ) {
      alignElements()
    },
    stop: function( event, ui ) {
      moveSlider(ui.value, .5)
    },
  });

  function alignElements() {

    // element coordinates and dimensions
    let slHandleY = $('.ui-slider-handle').offset().top;
    let spacerY = $('.spacer').offset().top;
    let spacerHeight = $('.spacer').height() -1;
    let baseY = $('.base').height();
    console.log(`=======================
    ${spacerY}
    ----
    ${slHandleY}`)
    // glue spacer to slider handle
    // glue top and bottom to spacer
    $('.spacer').offset($('.ui-slider-handle').offset());
    $('.top').height(`${slHandleY}`);
    $('.bottom').height(`${baseY - slHandleY - spacerHeight}`);
  }


  // when scrolled, move the slider
  $('body').on( 'DOMMouseScroll mousewheel', function ( event ) {
    let currHeight = sl.slider('option', 'value');
    let newHeight;
    let step = 4;

    if ( event.originalEvent.detail     > 0 
      || event.originalEvent.wheelDelta < 0 ) {
      //scroll down
                  // stop scrolling if getting out of bounds
      moveSlider( currHeight >= (MIN - step) ? currHeight - step
                                             : currHeight );
    } else {
      //scroll up
      moveSlider( currHeight <= (MAX - step) ? currHeight + step
                                             : currHeight );
    }
    //prevent page fom scrolling
    return false;
  });

  function moveSlider(height, speed = .3, easing = 'linear') {
    // console.log(`new${height}`)
    $('.spacer, .top, .bottom')
    .css('transition', `all ${speed}s ${easing}`)
    .on(`webkitTransitionEnd 
        mozTransitionEnd 
        MSTransitionEnd 
        oTransitionend 
        Transitionend`,
        function() {
          alignElements();
          $(this).css('transition', '');
    });

    sl.slider('option', 'value', height);
    sl.slider('option','slide')
        .call(sl, null, { handle: $('.ui-slider-handle', sl), value: height });
  }
  // click events on name and words
  $('.words, #name').on('click', function() {
    let target = $(this).is($('.words')) === true ? MAX : MIN
    moveSlider(target, .8, 'ease-in-out');


  });

});