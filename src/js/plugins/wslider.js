var tabletMedia = window.matchMedia('(max-aspect-ratio:3/3)');
var slider = undefined;

function sliderInit() {
  var swiper = new Swiper('.instruction', {
    slidesPerView: 1,
    wrapperClass: 'slideshow-container',
  });
}

function sliderToggler(e) {
  console.log('tabletMedia', tabletMedia);
  if (tabletMedia.matches) {
    !slider && sliderInit();
  } else {
    slider && slider.destroy();
  }
}

tabletMedia.addListener(sliderToggler);
sliderToggler();
