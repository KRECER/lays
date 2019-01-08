document.addEventListener("DOMContentLoaded", function() {
    var slider = document.getElementById('sliders');

if (window.location.pathname === '/prizes/') document.getElementById('bottom-block').classList.add('show');

  // slider
//   if (slider) setInterval(nextSlide(), 3000);

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
})  