$(".tel").mask("+38(999) 999-99-99");
$(".registration__inp [type=tel]").mask("+38(099) 999-99-99");
// $(".registration__inp [name=birthdate").mask("00-00-0000");

$(".registration__inp [name=birthdate]").mask("00-00-0000", {placeholder: "ДД-ММ-РРРР"});

$(".registration [name=phone]").mask("+38(999) 999-99-99");
$(".enterform__wrapper form [name=phone]").mask("+38(999) 999-99-99");


// #### general variables ####

var indexPreloader = document.querySelector('#index-preloader');
var isPopupOpen = false,
    isPopupOverPopup = false;

window.addEventListener('DOMContentLoaded', function() {
  isAuth();

  var rulesModal = document.querySelector('.rules'),
    rulesContent = document.querySelector('.rules__content'),
    rulesItem = document.querySelector('.rules-item'),
    rulesClose = document.querySelector('.rules__close'),
    registrationAgreementTextLink = document.querySelector('.registration__agreementText .underline');

  console.log('DOMContentLoaded: registrationAgreementTextLink', registrationAgreementTextLink);

  var winnersModal = document.querySelector('.winners'),
    winnersList = document.querySelector('.winners__list'),
    winnersItem = document.querySelector('.winners-item'),
    winnersClose = document.querySelector('.winners__close');

  var profileModal = document.querySelector('.profile'),
    profileList = document.querySelector('.profile__list'),
    profileItem = document.querySelector('.profile-item'),
    profileClose = document.querySelector('.profile__close');

    xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/rules/', true);
    xhr.send();

    xhr.addEventListener('readystatechange', function() {
      var json = JSON.parse(xhr.response);
      rulesContent.innerHTML = json.content;
    });

    xhr2 = new XMLHttpRequest();
    xhr2.open('GET', '/api/winners/', true);
    xhr2.send();

    xhr2.addEventListener('readystatechange', function() {
      if (xhr2.status == 200 && xhr2.readyState == 4) {
        var json = JSON.parse(xhr2.response);
        var html = '';

        for (var i = 0; i < json.winners.length; i++) {
          html += '<li class="winners__item">' + '<span class="winners__date">' + json.winners[i].date + '</span>' + '<span class="winners__name">' + json.winners[i].name + '</span>';
        }

        winnersList.innerHTML = html;

      }
    });


    // #### Rules Popup ####

    rulesItem.addEventListener('click', function() {
      document.getElementById('menu-block').classList.remove('expanded');
      document.getElementById('menu-inner-block').classList.remove('expanded');
      document.getElementById('close-menu-bg').classList.remove('expanded');
      rulesModal.classList.toggle('rules--show');

      if (rulesModal.classList.contains('rules--show')) {
        isPopupOpen = true;
      } else if (!isPopupOverPopup) {
        isPopupOpen = false;
      }
    });

    rulesModal.addEventListener('click', function(event) {
      var target = event.target;

      if (target == rulesClose || target == rulesModal) {
        rulesModal.classList.toggle('rules--show');
      }

      if (rulesModal.classList.contains('rules--show')) {
        isPopupOpen = true;
      } else if (!isPopupOverPopup) {
        isPopupOpen = false;
        document.body.style.position = 'static';
      }

      if (!rulesModal.classList.contains('rules--show')) {
        isPopupOverPopup = false; // over registration popup
      }
    });

    registrationAgreementTextLink.addEventListener('click', function(event) {
      event.preventDefault();
      rulesModal.classList.toggle('rules--show');

      if (rulesModal.classList.contains('rules--show')) {
        isPopupOverPopup = true; // over registration popup
      } else {
        isPopupOverPopup = false; // over registration popup
      }
    });


     // #### Winner Popup ####

    winnersItem.addEventListener('click', function() {
      document.getElementById('menu-block').classList.remove('expanded');
      document.getElementById('menu-inner-block').classList.remove('expanded');
      document.getElementById('close-menu-bg').classList.remove('expanded');
      winnersModal.classList.toggle('winners--show');

      if (winnersModal.classList.contains('winners--show')) {
        isPopupOpen = true;
      } else {
        isPopupOpen = false;
      }
    });

    winnersModal.addEventListener('click', function(event) {
      isPopupOpen = false;
      var target = event.target;

      if (target == winnersClose || target == winnersModal) {
        winnersModal.classList.toggle('winners--show');
      }

      if (winnersModal.classList.contains('winners--show')) {
        isPopupOpen = true;
      } else {
        isPopupOpen = false;
        document.body.style.position = 'static';
      }
    });

});

window.addEventListener('load', function() {
  indexPreloader.style.display = 'none';
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    js = d.createElement(s);
    js.id = id;
    js.src = "https://widget.sender.mobi/build/init.js";
    fjs.parentNode.insertBefore(js, fjs, 'sender-widget');
  })(document, 'script');
});


// #### Nav menu ####

var menuLogin = document.querySelector('#menu-login');
var menuCabinet = document.querySelector('#menu-cabinet');
var menuExit = document.querySelector('#menu-exit');

menuLogin.addEventListener('click', signIn);
menuCabinet.addEventListener('click', openProfile);
menuExit.addEventListener('click', logout);


// #### Logout ####

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
  isPopupOpen = true;
  modal = document.querySelector('.enterform');  // так работает
  modal.style.display = 'block';
  modalReg.style.display = 'none';

  form.focus();
  document.getElementById('menu-block').classList.remove('expanded');
  document.getElementById('menu-inner-block').classList.remove('expanded');
  document.getElementById('close-menu-bg').classList.remove('expanded');
}

function hideEnterModal(event, isNewPopupOpen) {
  if (isNewPopupOpen !== undefined) {
    isPopupOpen = true;
  } else {
    isPopupOpen = false;
    document.body.style.position = 'static';
  }
  modal.style.display = 'none';
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
  hideEnterModal(null, true);
  isPopupOpen = true;
  modalReg.focus();
  modalReg.style.display = 'block';
  modal.style.display = 'none';
}

function hideRegModal() {
  isPopupOpen = false;
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
  var isEmptyFields = false;
  var inputs = form.querySelectorAll('input');

  if (form.rules && form.rules2 && (!form.rules.checked || !form.rules2.checked)) {
      form.rules.parentNode.classList.add('error');
      form.rules2.parentNode.classList.add('error');
      isEmptyFields = true;
  }

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      inputs[i].classList.add('input--error');
      isEmptyFields = true;
    } else {
      inputs[i].classList.remove('input--error');
    }
  }

  if (isEmptyFields) return;

  indexPreloader.style.display = 'block';
  var request = new XMLHttpRequest();
  request.open('POST', link, true);
  request.send(data);

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
var forgetForm = document.querySelector('.js-forget-form');

document.querySelector('.js-forget').addEventListener('click', displayForgetModal);
forgetModel.querySelector('.js-close').addEventListener('click', hideForgetModel);

function displayForgetModal() {
  hideEnterModal(null, true);
  isPopupOpen = true;
  forgetModel.style.display = 'flex';

  forgetForm.focus();
}

function hideForgetModel() {
  isPopupOpen = false;
  document.body.style.position = 'static';
  forgetModel.style.display = 'none';
}

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
  isPopupOpen = true;
  modal.style.display = 'flex';
}

function closeModal(modal) {
  isPopupOpen = false;
  modal.style.display = 'none';
  document.body.style.position = 'static';
  if (openNextSignIn) {
    openNextSignIn = false;
    signIn();
  }
}


// #### Modal How To Find ####

document.getElementById('show-find-modal').addEventListener('click', function (){
  openTextModal({
    text: {
      title: 'ЯК ЗНАЙТИ КОД?',
      body: 'Акційний код нанесено всередині пачки поверх склейки швів безкольоровою лазерною гравіровкою.'
    },
    imagePath: '/img/find-code.png',
    imageAlt: 'find code',
  });
});


// #### Profile Popup #####

var modalPr = document.getElementsByClassName('profile')[0];
var formPr = document.getElementsByClassName('profile__wrapper')[0];
var closeSignPr = document.getElementsByClassName('profile__close')[0];
var headerBg = document.getElementsByClassName('page-header')[0];
var profileBtn = document.getElementById('profileBtn');

modalPr.addEventListener('click', hideModalProfile);
closeSignPr.addEventListener('click', hideModalProfile);

function openProfile() {
  indexPreloader.style.display = 'block';
  isPopupOpen = true;
  $.get( '/api/cabinet/', function( data ) {
    indexPreloader.style.display = 'none';
    if (data.hasOwnProperty('status') && data.status == false) {
      // popup error
      hideModalProfile();
      openTextModal({
        title: 'Увага',
        text: data.message,
      });
    } else {
      $( '.profile__name' ).html(data.name);
      $( '.profile__phone' ).html(data.phone);
      $( '.profile__email' ).html(data.email);

      var codesHtml = '';
      for (var i = 0; i < data.codes.length; i++) {
        var code = data.codes[i];
        codesHtml += '<div class="profile__item">' + '<div class="profile__left">' + '<div class="profile__code">' + code.code + "</div>" + '<div class="profile__date">' + code.date + "</div>" +  "</div>" + '<div class="profile__right">' + '<div class="profile__prize">' + code.prize + '</div>' +  "</div>" + '</div>';
        // codesHtml += '<div class="profile__item">' + '<span class="profile__code">' +code.code + '</span>' + '<span class="profile__prize">' +  code.prize + ' </span> ' + '<span class="profile__date">' + code.date + '</span>' + '</div>';
      }
      $('.profile__list').html(codesHtml);
      modalPr.style.display = 'block';
      modalPr.style.zIndex = '3000';
      closeSignPr.style.zIndex = '3000';
      headerBg.style.zIndex = '2999';
      // modalPr.style.display='none';
    }
  });
}

function hideModalProfile(){
  isPopupOpen = false;
  modalPr.style.display = 'none';
  headerBg.style.zIndex = '1';
}


// #### Super Custom Scroll ####

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
  console.log('scrollDirection: isPopupOpen = ' + isPopupOpen);
  if (isPopupOpen) return;
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
