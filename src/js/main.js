$(".tel").mask("+38(999) 999-99-99");
$(".registration__inp [type=tel]").mask("+38(099) 999-99-99");
// $(".registration__inp [name=birthdate").mask("00-00-0000");

$(".registration__inp [name=birthdate]").mask("00-00-0000", {placeholder: "ДД-ММ-РРРР"});

$(".registration [name=phone]").mask("+38(999) 999-99-99");
$(".enterform__wrapper form [name=phone]").mask("+38(999) 999-99-99");

window.addEventListener('DOMContentLoaded', function() {
  isAuth();
});

var indexPreloader =  document.querySelector('#index-preloader');

window.addEventListener('load', function() {
 indexPreloader.style.display = 'none';  
});


// #### Nav menu ####

var menuLogin = document.querySelector('#menu-login');
var menuCabinet = document.querySelector('#menu-cabinet');
var menuExit = document.querySelector('#menu-exit');

menuLogin.addEventListener('click', signIn);
menuCabinet.addEventListener('click', openProfile);
menuExit.addEventListener('click', logout);

function logout() {
  $.get('/api/logout/', function( data ) {
    isLoggedIn = false;
    menuLogin.classList.remove("hide");
    menuCabinet.classList.add("hide");
    menuExit.classList.add("hide");
    window.location.reload();
  });
}


// #### Modal enter ####

var modal = document.querySelector('.enterform');
var form = document.querySelector('.enterform__wrapper');
var closeSign = document.querySelector('.enterform__close');
var headerBg = document.querySelector('.page-header');
var formEnter = document.querySelector('.enterform__wrapper form');

closeSign.addEventListener('click', hideEnterModal);
modal.addEventListener('click', hideEnterModal);

function signIn() {
  modal = document.querySelector('.enterform');  // так работает
  modal.style.display = 'block';
  modalReg.style.display = 'none';

  form.focus();
  document.getElementById('menu-block').classList.remove('expanded');
  document.getElementById('menu-inner-block').classList.remove('expanded');
  document.getElementById('close-menu-bg').classList.remove('expanded');
}

function hideEnterModal() {
  modal.style.display = 'none';
  document.body.style.position = 'static';
}

formEnter.addEventListener('submit', function(event) {
  event.preventDefault();
  var data = new FormData(formEnter);
  validateForm('/api/login/', data, formEnter, modal);
});


// #### Enter utils ####

var isLoggedIn = false;

function isAuth() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/is_authenticated/', true);
  xhr.send();

  xhr.addEventListener('readystatechange', function() {
    console.log('isAuth', xhr.response);
    var json = JSON.parse(xhr.response);
    console.log('isAuth', json);

    if (xhr.status == 200 && xhr.readyState == 4) {
      if (json.status) {
        isLoggedIn = true;
        menuLogin.classList.add("hide");
        menuCabinet.classList.remove("hide");
        menuExit.classList.remove("hide");
      }
    }
  });
}


// #### Modal Registration ####

var modalReg = document.querySelector('.registration');
var formReg = document.querySelector('.registration__wrapper');
var closeSignReg = document.querySelector('.registration__close');
var headerBg = document.querySelector('.page-header');
var registrationBtn = document.getElementById('registrationBtn');
var formReg = document.querySelector('.registration__wrapper form');
var modalFormReg = document.querySelector('.registration');

registrationBtn.addEventListener('click', getRegistration);
closeSignReg.addEventListener('click', hideRegModal);
modalReg.addEventListener('click', hideRegModal);

function getRegistration() {
    modalReg.focus();
    modalReg.style.display = 'block';
    modal.style.display = 'none';
}

function hideRegModal() {
    modalReg.style.display = 'none';
    document.body.style.position = 'static';
}

formReg.addEventListener('submit', function(event) {
  event.preventDefault();
  var data = new FormData(formReg);
  validateForm('/api/registration/', data, formReg, modalFormReg);
});

// #### Form utils ####

function validateForm(link, data, form, modal) {
  if (form.rules && form.rules2 && (!form.rules.checked || !form.rules2.checked)) {
      form.rules.parentNode.classList.add('error');
      form.rules2.parentNode.classList.add('error');
      // return;
  }

  
  var inputs = form.querySelectorAll('input');
  var request = new XMLHttpRequest();
  request.open('POST', link, true);
  request.send(data);

  indexPreloader.style.display = 'block';

  var isEmptyFields = false;
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      inputs[i].classList.add('input--error');
      isEmptyFields = true;
    } else {
      inputs[i].classList.remove('input--error');
    }
  }

  if (isEmptyFields) return;

  request.addEventListener('readystatechange', function() {
    
    indexPreloader.style.display = 'none';

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
        } else {
            document.querySelector('.js-reg-captcha').classList.remove('error');
        }
        grecaptcha.reset();
      } else {
        modal.style.display = 'none';

        // isAuth();
        menuLogin.classList.add("hide");
        menuCabinet.classList.remove("hide");
        menuExit.classList.remove("hide");

        isLoggedIn = true;
        if (codeInput.value) {
          console.log("validateForm: code = ", codeInput.value);
          sendCode();
        } else {
          openTextModal({
            title: 'Успіх',
            text: response.message,
          });
        }
      }
    }
  });
}


// #### Modal Forget Password ####

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

  $.post('/api/reset/password/', {email: forgetForm.email.value}, function(e) {
    if (e.status) {
      forgetModel.style.display = 'none';
      openTextModal({
          text: {
            title: e.message.title,
            body: e.message.body,
          }
      });
    } else {
      forgetModel.style.display = 'none';
      openTextModal({
          text: {
            title: 'Увага!',
            body: typeof e.message !== 'object' ? e.message : 'Невірний формат пошти',
          }
      });
    }
  });
});


// #### Code Registration ####

var openNextSignIn = false;
var codeInput = document.getElementById("super-puper-input-id");
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
function showActiveBtn() {
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
});

// listeners
codeInput.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    console.log('//send code e.keyCode');
    sendCode();
  }
});
document.getElementById('send-code').addEventListener('click', function (){
  console.log('//send code addEventListener');
  sendCode();
});


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

function sendCode() {
  console.log('sendCode: isCodeValid(codeInput.value) = ', isCodeValid(codeInput.value));
  if (!isCodeValid(codeInput.value)) {
    btnAnimation.classList.add('code--error');
    return;
  } 
  btnAnimation.classList.remove('code--error');

  console.log('sendCode: isLoggedIn = ', isLoggedIn);
  if (!isLoggedIn) {
    openNextSignIn = true;
    openTextModal({
      text: {
        title: 'ДЯКУЄМО!',
        body: 'Твій код прийнято!<br>Щоб дізнатися про свій приз, будь ласка, зареєструйся.',
      }
    });
    // signIn();
    return;
  }
  console.log('sendCode: $post code = ', codeInput.value);
  indexPreloader.style.display = 'block';

  $.post('/api/code/', {code: codeInput.value.toUpperCase()}, function(e) {
    hideRegModal();
    hideEnterModal();
    indexPreloader.style.display = 'none';

    if (e.status) {
      codeInput.value = '';
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
}


// #### Text modal ####

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

  if (param.hasOwnProperty('imagePath')) {
    modalImg.setAttribute('src', param.imagePath);
    modalImg.setAttribute('alt', param.imageAlt || '');
    modalImg.style.display = "block";
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
  if (openNextSignIn) {
    openNextSignIn = false;
    signIn();
  }
}


// #### Modal How To Find

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
