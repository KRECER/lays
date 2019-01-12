document.addEventListener("DOMContentLoaded", function() {
  var rePrizes = new RegExp('^/prizes/?$');
  if (rePrizes.test(window.location.pathname)) {
    document.querySelector('.prizes').classList.add('show');
  }

  var reHollywood = new RegExp('^/hollywood/?$');
  if (reHollywood.test(window.location.pathname)) {
    document.querySelector('.hollywood').classList.add('show');
    document.querySelector('.prizes').classList.add('show');
  }

  var reMain = new RegExp('^/main/?(\\?.+)?$');
  var reRoot = new RegExp('^/(\\?.+)?$');

  // Slider
  document.addEventListener('wheel', scrollDirection);

  var lastScrollDate = new Date();
  function scrollDirection(e) {
    closeMenu();
    if (new Date() - lastScrollDate <= 500) {
      return;
    } else {
      lastScrollDate = new Date();
    }
    if ((e.deltaY > 0)) {
      if (document.getElementById('bottom-block') && (reMain.test(window.location.pathname) || reRoot.test(window.location.pathname)) ) {
        window.history.pushState("", "", '/prizes');
        document.getElementById('bottom-block').classList.add('show');
      } else if (document.getElementById('js-scroll-hollywood') && rePrizes.test(window.location.pathname)) {
        window.history.pushState("", "", '/hollywood');
        document.getElementById('js-scroll-hollywood').classList.add('show');
      }
    } else {
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

  var codeInput = document.getElementById("super-puper-input-id");
  //btn main
  var isAnimationClicked = false;
  var btnAnimation = document.getElementById('js-btn-animation');
  btnAnimation.addEventListener('click', function (event){
    this.classList.add('btn-animation');
    setTimeout(function() {codeInput.focus();}, 1000);
  });


  //send code
  if (codeInput !== null) {
  codeInput.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
      sendCode();
      }
    });
  }

  function isCodeValid(str) {
  var localStr = str.replace(/^\ + |\ +$/g, '');

  if (/[а-я]+/ig.test(localStr)) {
    return false;
  }

  if (localStr.length !== 11) {
    return false;
  }

  return !/[\\\/\%\;\.\№\#\»\@\*]/.test(localStr);
}

  function sendCode () {
    if (isCodeValid(codeInput.value)) {
      $.post('http://lays-movie.dev.itcg.ua/api/code/', function(e) {
        console.log(e);
        if (e.status) {
          // popup success
          openTextModal({
            title: 'Успіх',
            text: e.message,
          });
        } else {
          // popup error
          openTextModal({
            title: 'Увага',
            text: e.message,
          });
        }
      });
    } else {
      console.log('error');
    }
  }
});

var textModal = document.querySelector('.js-text-modal');
var closeTextModalBtn = textModal.querySelector('.js-close');

console.log(closeTextModalBtn);

closeTextModalBtn.addEventListener('click', function (e) {
  console.log('asdasdsaa');
  closeModal(textModal);
});

function openTextModal(param) {
  var title = textModal.querySelector('.js-title');
  var text = textModal.querySelector('.js-text');
  title.innerHTML = param.title || '';
  text.innerHTML = param.text || '';
  openModal(textModal);
}

function openModal(modal) {
  modal.style.display = 'flex';
  modal.style.zIndex = 23;
}

function closeModal(modal) {
  modal.style.display = 'none';
}

