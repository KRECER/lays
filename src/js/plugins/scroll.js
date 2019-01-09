document.addEventListener("DOMContentLoaded", function() {
  var slider = document.getElementById('sliders');


  var rePrizes = new RegExp('^/prizes/?$');
  if (rePrizes.test(window.location.pathname)) {
    document.querySelector('.prizes').classList.add('show')
  }

  var reHollywood = new RegExp('^/hollywood/?$');
  if (reHollywood.test(window.location.pathname)) {
    document.querySelector('.hollywood').classList.add('show')
  }

  var reMain = new RegExp('^/main/?(\\?.+)?$');
  var reRoot = new RegExp('^/(\\?.+)?$');

  // Slider
  document.addEventListener('wheel', scrollDirection);

  function scrollDirection(e) {
    if (document.querySelectorAll('.modal-wrapper.expanded').length === 0) {
      if ((e.deltaY > 0)) {
        if (document.getElementById('bottom-block') && (reMain.test(window.location.pathname) || reRoot.test(window.location.pathname)) ) {
          console.log("render prizes");
          window.history.pushState("", "", '/prizes');
          document.getElementById('bottom-block').classList.add('show');
        } else if (document.getElementById('js-scroll-hollywood') && rePrizes.test(window.location.pathname)) {
          console.log("render hollywood");
          window.history.pushState("", "", '/hollywood');
          document.getElementById('js-scroll-hollywood').classList.add('show');
        }
      } 
      else if (e.deltaY <= -100) {
        if (document.getElementById('bottom-block') && reHollywood.test(window.location.pathname)) {
          window.history.pushState("", "", '/prizes');
          document.getElementById('js-scroll-hollywood').classList.remove('show');
        }
        else if (rePrizes.test(window.location.pathname)) {
          window.history.pushState("", "", '/main');
          document.getElementById('bottom-block').classList.remove('show');
        }
      }
    }
  }

  //btn main
  var btnAnimation = document.getElementById('js-btn-animation');
  btnAnimation.addEventListener('click', function (event){
    this.classList.add('btn-animation');
  })

});  
