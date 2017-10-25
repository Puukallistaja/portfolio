$(document).ready(function(){

  // $('#spacer').addClass('animated lightSpeedIn');
  $('#spacer').addClass('animated slideInRight');
  $('ul').addClass('animated fadeInDown');

  const MAX   = 40;
  const MIN   = 00;
  const START = 10;

  const sl = $('#slider').slider({
    orientation: "vertical",
    min: MIN,
    max: MAX,
    value: START,
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
    let spacerHeight = $('.spacer').height() - 1; // -1px cus calc gives float and it can leave a small gap
    let baseY = $('.base').height();

    // glue spacer to slider handle
    // glue top and bottom to spacer
    $('.spacer').offset($('.ui-slider-handle').offset());
    $('.top').height(`${slHandleY}`);
    $('.bottom').height(`${baseY - slHandleY - spacerHeight}`);
  }


  // when scrolled, move the slider
  $('body').on( 'DOMMouseScroll mousewheel', function ( event ) {
    let currHeight = sl.slider('option', 'value');
    let step = 1; //scrolling step
    // console.log(currHeight)
    if ( event.originalEvent.detail     > 0 
      || event.originalEvent.wheelDelta < 0 ) {
      //scroll down
                  // stop scrolling if getting out of bounds
      moveSlider( currHeight >= (MIN + step) ? currHeight - step
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
          $(this).css('transition', '');
    });

    sl.slider('option', 'value', height);
    sl.slider('option','slide')
        .call(sl, null, { handle: $('.ui-slider-handle', sl), value: height });
  }
  // look if either cover is open
        // bit messy and checks are all around the place. should be only in here
  function coverOpen() {

    let slVal = sl.slider('option', 'value');

    let topOpen = slVal >= 35 ? true : false
    let botOpen = slVal <=  5 ? true : false

    return {
      top: topOpen,
      bottom: botOpen
    }
  }
  
  // open or close each cover
  // 
  $('#words, #name').on('click', function() {
    let target;

    if ( $(this).is( $('#words') ) ) {
      target = coverOpen().top ? START : MAX
      moveSlider(target, .5)
    } else {
      target = coverOpen().bottom ? START : MIN
      moveSlider(target, .5)
    }
  });



});