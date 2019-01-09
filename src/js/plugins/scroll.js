document.addEventListener("DOMContentLoaded", function() {
  var slider = document.getElementById('sliders');


  var rePrizes = new RegExp('/prizes/?');
  if (rePrizes.test(window.location.pathname)) {
    document.getElementById('bottom-block').classList.add('show')
  }

  var reHollywood = new RegExp('/hollywood/?');
  if (reHollywood.test(window.location.pathname)) {
    document.querySelector('.hollywood').classList.add('show')
  }

  // document.querySelector('.prizes__btn').addEventListener('click', function(){
    // console.log('prizes__btn');
    // window.history.pushState("", "", '/hollywood');
    // window.location.href = '/hollywood';
  // })
  // slider
  // if (slider) setInterval(nextSlide(), 3000);

  // Slider
  document.addEventListener('wheel', scrollDirection);

  function scrollDirection(e) {
      console.log("scrollDirection");
    if (document.querySelectorAll('.modal-wrapper.expanded').length === 0) {
      if ((e.deltaY > 0) && (document.getElementById('bottom-block'))) {
        document.getElementById('bottom-block').classList.add('show');
        window.history.pushState("", "", '/prize');
      } else if ((e.deltaY < -0) && (document.getElementById('bottom-block'))) {
        window.history.pushState("", "", '/');
        document.getElementById('bottom-block').classList.remove('show');
      }
    }
  }

  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
      } else {
        /* right swipe */
      }
    } else {
      if (document.querySelectorAll('.modal-wrapper.expanded').length === 0) {
        if (yDiff > 0) {

          document.getElementById('bottom-block').classList.add('show');
          window.history.pushState("", "", '/prize');
        } else {
          window.history.pushState("", "", '/');
          document.getElementById('bottom-block').classList.remove('show');
        }
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }


  var btnAnimation = document.getElementById('js-btn-animation');
  btnAnimation.addEventListener('click', function (event){
    this.classList.add('btn-animation');
  })

});  
