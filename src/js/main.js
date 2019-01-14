$(".tel").mask("+38(999) 999-99-99");
$(".registration__inp [type=tel]").mask("+38(099) 999-99-99");
// $(".registration__inp [name=birthdate").mask("00-00-0000");

$(".registration__inp [name=birthdate]").mask("00-00-0000", {placeholder: "ДД-ММ-РРРР"});

$(".registration [name=phone]").mask("+38(999) 999-99-99");
$(".enterform__wrapper form [name=phone]").mask("+38(999) 999-99-99");
var isCodeEntered = false;
var code;
// Модальное Вход
var modal = document.querySelector('.enterform');
var form = document.querySelector('.enterform__wrapper');
var closeSign = document.querySelector('.enterform__close');
var headerBg = document.querySelector('.page-header');
// var signInBtn = document.getElementById('signIn');

// Модальное Регестрация
var modalReg = document.querySelector('.registration');
var formReg = document.querySelector('.registration__wrapper');
var closeSignReg = document.querySelector('.registration__close');
var headerBg = document.querySelector('.page-header');
var registrationBtn = document.getElementById('registrationBtn');
// alert('asd');

// signInBtn.addEventListener('click', signIn);
function signIn() {
    modal = document.querySelector('.enterform');  // так работает
    modal.style.display = 'block';
    modalReg.style.display = 'none';

    document.getElementById('menu-block').classList.remove('expanded');
    document.getElementById('menu-inner-block').classList.remove('expanded');
    document.getElementById('close-menu-bg').classList.remove('expanded');
}

closeSign.addEventListener('click', hideEnterModal);
modal.addEventListener('click', hideEnterModal);

function hideEnterModal() {
    modal.style.display = 'none';
    document.body.style.position = 'static';
}

registrationBtn.addEventListener('click', getRegistration);
closeSignReg.addEventListener('click', hideRegModal);
modalReg.addEventListener('click', hideRegModal);

function getRegistration() {
    modalReg.style.display = 'block';
    modal.style.display = 'none';
}

function hideRegModal() {
    modalReg.style.display = 'none';
    document.body.style.position = 'static';
}


// Vilidation Form
function validateForm(link, data, form, modal) {

    if (form.rules && form.rules2 && (!form.rules.checked || !form.rules2.checked)) {
        // console.log('roor')
        form.rules.parentNode.classList.add('error');
        form.rules2.parentNode.classList.add('error');
        return;
    }

    var request = new XMLHttpRequest();
    request.open('POST', link, true);
    request.send(data);

    var inputs = form.querySelectorAll('input');
    request.addEventListener('readystatechange', function() {


        if (request.status === 200 && request.readyState === 4) {
            var response = JSON.parse(request.response);
            
            if (!response.status) {
                for (var i = 0; i < inputs.length; i++) {
                    for (var key in response.message) {
                        if (key == 'body') {
                            openTextModal({text: response.message});
                        } else {
                            if (inputs[i].name == key) {
                                
                                inputs[i].classList.add('input--error');
                            } else {
                                inputs[i].classList.remove('input--error');
                            }
                        }
                    }
                }

                if (response.message && response.message.captcha) {
                    document.querySelector('.js-reg-captcha').classList.add('error');
                }
                grecaptcha.reset();
            } else {
                modal.style.display = 'none';
                // isAuth();
                openTextModal({
                    title: 'Успіх',
                    text: response.message,
                });
            console.log('isCodeEntered', isCodeEntered);
                if (isCodeEntered) {
                    sendCode();
                }
            }
        }
    });
}

// -- End Validation Form --

var formReg = document.querySelector('.registration__wrapper form');
var modalFormReg = document.querySelector('.registration');

formReg.addEventListener('submit', function(event) {
    event.preventDefault();

    var data = new FormData(formReg);

    validateForm('http://lays-movie.dev.itcg.ua/api/registration/', data, formReg, modalFormReg);
});


var formEnter = document.querySelector('.enterform__wrapper form');

formEnter.addEventListener('submit', function(event) {
    event.preventDefault();
    var data = new FormData(formEnter);
    validateForm('http://lays-movie.dev.itcg.ua/api/login/', data, formEnter, modal);
});

function isAuth(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://lays-movie.dev.itcg.ua/api/is_authenticated/', true);
    xhr.send();

    xhr.addEventListener('readystatechange', function() {
        var json = JSON.parse(xhr.response);

        if (xhr.status == 200 && xhr.readyState == 4) {
            if (json.status) {
                var itemAuth = document.querySelector('.item._isAuth').parentElement;

                itemAuth.style.display = 'none';
                $("#menu-cabinet").removeClass("hide");
                $("#menu-exit").removeClass("hide");
                callback && callback(true);
                return true;
            } else {
                callback && callback(false);
                return false;
            }
        } else {
            return false;
        }   
    });
}

window.addEventListener('DOMContentLoaded', function() {
    isAuth();
});

var forgetModel = document.querySelector('.js-modal-forget');
var forgetModelClose = forgetModel.querySelector('.js-close');
var forgetForm = document.querySelector('.js-forget-form');

document.querySelector('.js-forget').addEventListener('click', function (){
    hideEnterModal();
    forgetModel.style.display = 'flex';
});

forgetModelClose.addEventListener('click', function() {
    forgetModel.style.display = 'none';
});

forgetForm.addEventListener('submit', function(e) {
    e.preventDefault();

    $.post('http://lays-movie.dev.itcg.ua/api/reset/password/', {email: forgetForm.email.value}, function(e) {
        if (e.status) {
            forgetModel.style.display = 'none';

            openTextModal({
                text: {
                    body: e.message,
                    title: 'Успіх!',
                }
            })
        } else {
            forgetModel.style.display = 'none';
            openTextModal({
                text: {
                    body: typeof e.message !== 'object' ? e.message : 'Невірний формат пошти',
                    title: 'Увага!',
                }
            })
        }
    });
});


// scroll.js
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


function sendCode(login) {
    if (login === undefined) {
        return isAuth(sendCode);
    }

    console.log('login', login);

    if (login !== true) {
        console.log('login')
        code = codeInput.value;
        isCodeEntered = true;
        signIn();
        return;
    }

    if (isCodeValid(codeInput.value)) {
      $.post('http://lays-movie.dev.itcg.ua/api/code/', {code: codeInput.value}, function(e) {
        isCodeEntered = false;
        hideRegModal();
        hideEnterModal();
        // alert(e.status + ' ' + e.message);
        if (e.status) {
          // popup success
          openTextModal({
            text: {
                title: e.message.title,
                body: e.message.body,
            }
          });
          //hide block apps
          if(document.getElementById('js-show-mob-app').classList.contains('showApps')){
            document.getElementById('js-show-mob-app').classList.remove('showApps');
          }
        } else {
          // popup error
          openTextModal({
            text: {
                title: e.message.title,
                body: e.message.body,
            }
          });
        }
      });
    } else {
      console.log('error');
    }
  }

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
  // modal.style.zIndex = 250;
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

