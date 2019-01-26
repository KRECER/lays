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


// SVG Layers
var title,
    icon,
    desc,
    bg;

var titleLg,
    iconLg,
    descLg,
    bgLg;

var bgHolly,
    logoHolly,
    movieHolly,
    starHolly,
    shadowHolly,
    titleHolly,
    descHolly;

// end SVG Layers

var prizes = document.querySelector('.prizes');
var prizesBtn = document.querySelector('.prizes__btn');
var width = document.body.getBoundingClientRect().width;
var height = document.body.getBoundingClientRect().height;

window.addEventListener('DOMContentLoaded', function() {
  Snap.load('img/prizes/megogo.svg', function(megogo) {
    Snap('#megogo').append(megogo);

    titleMegogo = $('#title-megogo'),
    iconMegogo  = $('#icon-megogo'),
    descMegogo  = $('#desc-megogo'),
    bgMegogo    = $('#bg-megogo');
  });

  Snap.load('img/prizes/hollywood.svg', function(hollywood) {
    Snap('#hollywood').append(hollywood);

    bgHolly    = $('#bg-hollywood'),
    logoHolly    = $('#logo-hollywood'),
    movieHolly   = $('#movie-hollywood'),
    starHolly   = $('#star-hollywood'),
    titleHolly   = $('#title-hollywood'),
    descHolly   = $('#desc-hollywood');
  });

  Snap.load('img/prizes/lg.svg', function(lg) {
    Snap('#lg').append(lg);

    titleLg = $('#title-lg'),
    iconLg  = $('#icon-lg'),
    descLg  = $('#desc-lg'),
    bgLg    = $('#bg-lg');
  });

  isAuth();

  CSSPlugin.defaultTransformPerspective = 2000;
//transformPerspective:500
/*TweenMax.from("#box1", 0.8, { rotationY:90, transformOrigin:"0% 50%", ease:Quint.easeOut})*/

var tl = new TimelineLite();

tl.set('.room__sofa', {opacity: 0, rotationX: -80})
  .set('.room__people', {opacity: 0, rotationX: -40})
  .set('.page-header__bg', {opacity: 0})
  .set('.instruction', {x: '-100%'})
  .set('.menu', {x: '-100%'})
  .set('.logan-fhd', {opacity: 0})
  .set('.logo-lays', {opacity: 0})
  .set('.hamburger-menu-icon', {opacity: 0})
  .set('.page-header__btn', {x: '+800', opacity: 0})
  .set('.room__tv', {y: '100%', opacity: 0})
  .set('.tv__scroll-btn', {opacity: 0})
  .set('.widget-button', {opacity: 0});

tl.to('.room__sofa', 0.6, {opacity: 1, rotationX: 0, className: 'softUp room__sofa'}, 1)
  .to('.room__people', 0.6, {opacity: 1, rotationX: 0, className: 'softUp room__people'}, 1.6)
  .to('.page-header__bg', 0.6, {opacity: 1}, 2.1)
  .to('.instruction', 1, {x: '0%'}, 2.6)
  .staggerFrom('.instruction__item img, .instruction__icon', 2, {opacity: 0}, 0.1, '-=0.5')
  .to('.menu', 0.3, {x: '0%', ease: Elastic.easeOut.config(1.3, 0.5)}, 3.8)
  .to('.logan-fhd', 0.3, {opacity: 1, ease: Power3.easeOut}, 4.2)
  .to('.logo-lays', 0.3, {opacity: 1, ease: Power3.easeOut}, 4.5)
  .to('.hamburger-menu-icon', 0.3, {opacity: 1, ease: Power3.easeOut}, 4.4)
  .to('.page-header__btn', 0.6, {x: '20', opacity: 1, ease: Elastic.easeOut.config(1.3, 0.5)}, 3.9)
  .to('.room__tv', 0.6, {y: '0%', opacity: 1, ease: Elastic.easeOut.config(0.6, 0.6)}, 4.9)
  .to('.tv__scroll-btn', 0.6, {opacity: 1}, 5.6)
  .to('.widget-button', 1, {opacity: 1}, 5.9);




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

      animateSecondScreen();

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



function animateSecondScreen() {

  if (width < 1200) return;

  var tl = new TimelineMax();

  tl.set('.prizes__chips', {opacity: 0})
    .set('.prizes__title', {opacity: 0, scale: 0.5})
    .set('.prizes__item--megogo', {x: '-100%'})
    .set(iconMegogo, {opacity: 0})
    .set(titleMegogo, {opacity: 0})
    .set(descMegogo, {opacity: 0})
    .set(bgMegogo, {opacity: 0})
    .set('.prizes__item--lg', {x: '100%'})
    .set(iconLg, {opacity: 0})
    .set(titleLg, {opacity: 0})
    .set(descLg, {opacity: 0})
    .set(bgLg, {opacity: 0})
    .set('.prizes__item--hollywood', {y: '100%'})
    .set(logoHolly, {opacity: 0})
    .set(starHolly, {opacity: 0, rotation: 200})
    .set(movieHolly, {opacity: 0})
    .set(titleHolly, {opacity: 0})
    .set(descHolly, {opacity: 0})
    .set(bgHolly, {opacity: 0})
    .set('.prizes__btn', {marginBottom: '-50'})
    .set('.prizes__btn', {color: '#ffffff'});

  tl.to('.prizes__chips', 1, {opacity: 1, ease: Back.easeOut.config(1.7)}, 0.6)
    .to('.prizes__title', 0.6, {opacity: 1, scale: 1, ease: Elastic.easeOut.config(1, 0.4)}, 1)
    .to('.prizes__item--megogo', 0.6, {x: '0%', ease: Back.easeOut.config(1.7)}, 1.3)
    .to('.prizes__item--lg', 0.6, {x: '0%', ease: Back.easeOut.config(1.7)}, 1.6)
    .to(iconMegogo, 1, {opacity: 1}, 1.9)
    .to(titleMegogo, 0.3, {opacity: 1}, 2.2)
    .to(descMegogo, 0.3, {opacity: 1}, 2.5)
    .to(bgMegogo, 0.3, {opacity: 1}, 2.8)
    .to('.prizes__item--hollywood', 0.8, {y: '0%'}, 2.2)
    .to(iconLg, 0.3, {opacity: 1}, 2.2)
    .to(titleLg, 0.3, {opacity: 1}, 2.5)
    .to(descLg, 0.3, {opacity: 1}, 2.8)
    .to(bgLg, 0.3, {opacity: 1}, 3.1)
    .to(logoHolly, 0.4, {opacity: 1}, 2.5)
    .to(starHolly, 1, {opacity: 1, rotation: 0, ease: Elastic.easeOut.config(1, 0.4)}, 2.8)
    .to(movieHolly, 0.4, {opacity: 1}, 3.1)
    .to(titleHolly, 0.4, {opacity: 1}, 3.4)
    .to(descHolly, 0.4, {opacity: 1}, 3.7)
    .to(bgHolly, 0.3, {opacity: 1}, 4)
    .to('.prizes__btn', 0.3, {marginBottom: '20px', onComplete: parallaxInit}, 4.3)
    .to('.prizes__btn', 1, {color: '#FDE619', repeat: -1, ease: Linear.easeNone}, 4.3);
}

function parallaxInit() {
  prizes.addEventListener('mousemove', parallaxIt);
}

var messiImg = prizes.querySelectorAll('img');

function parallaxIt(e) {
  var relX = (e.pageX - width / 2) / (width/2);
  var relY = (e.pageY - height / 2) / (height/2);

  if (width < 1000) return;

  TweenLite.to(messiImg[1], 0.5, { x: relX * 10, y: relY * 10, rotation: 0.0001 }, 0.3);
}
