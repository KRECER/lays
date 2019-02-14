var tabletMedia = window.matchMedia('(max-aspect-ratio:3/3)');
var slider = undefined;
// var arrows = document.querySelectorAll('.js-arrow');

function sliderInit() {
  slider = new Swiper('.instruction', {
    slidesPerView: 1,
    wrapperClass: 'slideshow-container',
    slideClass: 'instruction__item',
    centeredSlides: true,
    autoplay: {
      delay: 3000,
    },
  });
  console.log(slider);
}

// arrows

function sliderToggler(e) {
  if (tabletMedia.matches) {
    sliderInit();
  } else {
    slider && slider.destroy();
  }
}

tabletMedia.addListener(sliderToggler);
sliderToggler();
