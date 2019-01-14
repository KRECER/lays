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
  btnAnimation.addEventListener('click', function(event) {
    this.classList.add('btn-animation');
    setTimeout(function() {
      codeInput.focus();
      //show block mob-Apps
      var tabletMedia = window.matchMedia('(max-aspect-ratio:3/3)');
      if (tabletMedia.matches) {
        document.getElementById('js-show-mob-app').classList.add('showApps');
      }
      
    }, 1000);
  });

  

  codeInput.addEventListener('click', function (){
    document.getElementById('js-show-mob-app').classList.add('showApps');
  })

  // show active button registration
  function showActiveBtn (){
    window.history.pushState("", "", '/main');
    document.getElementById('bottom-block').classList.remove('show');
    document.getElementById('js-scroll-hollywood').classList.remove('show');
    btnAnimation.classList.add('btn-animation');
    codeInput.style.transition = 'none';
    document.getElementById('send-code').style.transition = 'none';
    document.querySelector('.animationSvg').style.animation = 'none';
    codeInput.focus();
    document.getElementById('js-show-mob-app').classList.add('showApps');
  }
  // show active button registration hollywood

  document.getElementById('js-hollywood-btn').addEventListener('click', function (e){
    e.preventDefault();
    showActiveBtn();
  })

  // show active button registration menu

  document.getElementById('js-menu-code').addEventListener('click', function (e){
    e.preventDefault();
    showActiveBtn();
    closeMenu();
  })
  

  //send code
  if (codeInput !== null) {
  codeInput.addEventListener('keyup', function(e) {
    document.getElementById('send-code').addEventListener('click', function (){
      sendCode();
    })
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
      $.post('http://lays-movie.dev.itcg.ua/api/code/', {code: codeInput.value}, function(e) {
        // alert(e.status + ' ' + e.message);
        if (e.status) {
          // popup success
          openTextModal({
            title: 'Успіх',
            text: e.message,
          });
          //hide block apps
          if(document.getElementById('js-show-mob-app').classList.contains('showApps')){
            document.getElementById('js-show-mob-app').classList.remove('showApps');
          }
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

closeTextModalBtn.addEventListener('click', function (e) {
  closeModal(textModal);
});

function openTextModal(param) {
  var title = textModal.querySelector('.js-title');
  var text = textModal.querySelector('.js-text');
  var modalImg = textModal.querySelector('.js-img');
  var modalBtn = textModal.querySelector('.js-btn');
  title.innerHTML = param.text.title || '';
  text.innerHTML = param.text.body || '';
  console.log(param);
  if (param.hasOwnProperty('imagePath')) {
    modalImg.setAttribute('src', param.imagePath);
    modalImg.setAttribute('alt', param.imageAlt || '');
  } else {
    modalImg.style.display = "none";
  }

  if (param.hasOwnProperty('btn')) {
    modalBtn.style.display = "flex";
    modalBtn.innerHTML = param.btn.text;
    modalBtn.setAttribute('href', param.btn.link);
  } else {
    modalBtn.style.display = "none";
  }
  openModal(textModal);
}

function openModal(modal) {
  modal.style.display = 'flex';
  modal.style.zIndex = 250;
}

function closeModal(modal) {
  modal.style.display = 'none';
}


document.getElementById('show-find-modal').addEventListener('click', function (){
   openTextModal({
      text: {
        title: 'ЯК ЗНАЙТИ КОД?',
        body: 'Акційний код нанесено всередині пачки поверх склейки швів безкольоровою лазерною гравіровкою.'
      },
      imagePath: '/img/find-code.png',
      imageAlt: 'find code',
   });
})
