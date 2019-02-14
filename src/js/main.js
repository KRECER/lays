var phoneInputs = document.querySelectorAll('.js-phone-mask');
var birthdayInput = document.querySelector('.js-birthday-mask');
var phoneMask = ['+', '3', '8', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
var birthdayMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

vanillaTextMask.maskInput({
  inputElement: birthdayInput,
  mask: birthdayMask,
  guide: false
});


for (var i = 0; i < phoneInputs.length; i++) {
  vanillaTextMask.maskInput({
    inputElement: phoneInputs[i],
    mask: phoneMask,
    guide: false
  });
}



// #### general variables ####

var indexPreloader = document.querySelector('#index-preloader');
var isPopupOpen = false,
    isPopupOverPopup = false,
    isSecondScreenAnimationPlayed = false,
    isThirdScreenAnimationPlayed = false;


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

Snap.load('/img/prizes/megogo-content.svg', function(megogo) {
  Snap('#megogo-content').append(megogo);

  titleMegogo = $('#title-megogo'),
  iconMegogo  = $('#icon-megogo'),
  descMegogo  = $('#desc-megogo'),
  bgMegogo    = $('#bg-megogo');
});

Snap.load('/img/prizes/hollywood-content.svg', function(hollywood) {
  Snap('#hollywood-content').append(hollywood);

  bgHolly    = $('#bg-hollywood'),
  logoHolly    = $('#logo-hollywood'),
  movieHolly   = $('#movie-hollywood'),
  starHolly   = $('#star-hollywood'),
  titleHolly   = $('#title-hollywood'),
  descHolly   = $('#desc-hollywood');
});

Snap.load('/img/prizes/lg-content.svg', function(lg) {
  Snap('#lg-content').append(lg);

  titleLg = $('#title-lg'),
  iconLg  = $('#icon-lg'),
  descLg  = $('#desc-lg'),
  bgLg    = $('#bg-lg');
});

var prizes = document.querySelector('.prizes');
var prizesBtn = document.querySelector('.prizes__btn');
var width = document.body.getBoundingClientRect().width;
var height = document.body.getBoundingClientRect().height;


function animatePageHeader() {
  CSSPlugin.defaultTransformPerspective = 2000;

  var tl = new TimelineLite();

  tl.set('.room__sofa', {opacity: 0, rotationX: -80})
  .set('.room__people', {opacity: 0, rotationX: -40})
  .set('.instruction', {x: '-100%'})
  .set('.menu', {x: '-150'})
  .set('.mode', {x: '-150'})
  .set('.menu__lamp', {x: '-150'})
  .set('.page-header__btn', {x: '+800', opacity: 0})
  .set('.room__tv', {y: '100%', opacity: 0})
  .set('.tv__scroll-btn', {opacity: 0})
  .set('.tv__scroll-btn svg', {y: '0%'})
  .set('.btn__icon', {fill: '#fff'});

  tl.to('.room__sofa', 0.6, {opacity: 1, rotationX: 0, className: 'softUp room__sofa'})
  .to('.room__people', 0.6, {opacity: 1, rotationX: 0, className: 'softUp room__people'})
  .to('.instruction', 0.6, {x: '0%'}, '-=0.5')
  .staggerFrom('.instruction__item img, .instruction__icon', 0.3, {opacity: 0}, 0.1, '-=0.3')
  .to('.menu', 0.3, {x: '0'}, '-=0.3')
  .to('.mode', 0.3, {x: '0'}, '-=0.3')
  .to('.menu__lamp', 0.3, {x: '0'}, '-=0.3')
  .to('.page-header__btn', 0.3, {x: '20', opacity: 1}, '-=0.3')
  .to('.room__tv', 0.6, {y: '0%', opacity: 1})
  .to('.tv__scroll-btn', 0.1, {opacity: 1, onComplete: test})
  .to('.tv__scroll-btn svg', 0.4, {y: '15%', repeat: -1, yoyo: true, onComplete: test })
};

function test() {
  document.querySelector('.widget-button').classList.add('widget-button--show');
}

window.addEventListener('DOMContentLoaded', function() {
  isAuth();

  // if(width > 1200) {
  //   animatePageHeader();
  // }

  var toggleMode = document.querySelector('.mode__toggler');
  var pageHeaderBg = document.querySelector('.page-header__bg');
  var yellowBg = pageHeaderBg.style.backgroundImage;
  var sofa = document.querySelector('.room__sofa');
  var peopleSofa = document.querySelector('.room__people');
  var shadow = document.querySelector('.tv__shadow');
  var couple = document.querySelector('.room__shadow--couple');
  var superman = document.querySelector('.room__shadow--superman');
  var alien = document.querySelector('.room__shadow--alien');
  var lamp = document.querySelector('.menu__lamp');

  toggleMode.addEventListener('click', function(event) {
    pageHeaderBg.classList.toggle('page-header__bg--night');
    shadow.classList.toggle('tv__shadow--blue');
    pageHeaderBg.classList.toggle('page-header__bg--mobile-night');
    document.querySelector('.page-header').classList.toggle('page-header--shadow-night');
    document.querySelector('.instruction').classList.toggle('instruction--shadow');


    if (this.checked) {
      document.querySelector('.mode__state').innerHTML = 'OFF';
      document.querySelector('.mode__state').classList.add('mode__state--night');
      lamp.setAttribute('src', '/img/lamp-off.svg');
      sofa.setAttribute('src', '/img/sofa_cut_blue.png');
      peopleSofa.setAttribute('src', '/img/people_blueShadow.png');
      couple.setAttribute('src', '/img/blueScreen/couple.png');
      superman.setAttribute('src', '/img/blueScreen/superman.png');
      alien.setAttribute('src', '/img/blueScreen/ufo.png');
      document.querySelector('.page-header').style.backgroundColor = "#00a3de";

      $('.find-сode').css({color: '#ffffff'});
    } else {
      document.querySelector('.mode__state').innerHTML = 'ON';
      document.querySelector('.mode__state').classList.remove('mode__state--night');
      lamp.setAttribute('src', '/img/lamp-on.svg');
      sofa.setAttribute('src', '/img/sofa_cut.png');
      peopleSofa.setAttribute('src', '/img/people_yellowShadow.png');
      couple.setAttribute('src', '/img/shadows/couple.png');
      superman.setAttribute('src', '/img/shadows/superman.png');
      alien.setAttribute('src', '/img/shadows/ufo.png');
      document.querySelector('.page-header').style.backgroundColor = "#ffdf0c";
      $('.find-сode').css({color: '#DA1B21'});
    }
  });

  var rulesModal = document.querySelector('.rules'),
    rulesContent = document.querySelector('.rules__content'),
    rulesItem = document.querySelector('.rules-item'),
    rulesClose = document.querySelector('.rules__close'),
    registrationAgreementTextLink = document.querySelector('.registration__agreementText .underline');


  var winnersModal = document.querySelector('.winners'),
    winnersList = document.querySelector('.winners__list'),
    winnersItem = document.querySelector('.winners-item'),
    winnersClose = document.querySelector('.winners__close');



    xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/rules/', true);
    xhr.send();

    xhr.addEventListener('readystatechange', function() {
      if (xhr.status == 200 && xhr.readyState == 4) {
        var json = JSON.parse(xhr.response);
        rulesContent.innerHTML = json.content;
      }
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

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    js = d.createElement(s);
    js.id = id;
    js.src = "https://widget.sender.mobi/build/init.js";
    fjs.parentNode.insertBefore(js, fjs, 'sender-widget');
  })(document, 'script');

  indexPreloader.style.display = 'none';
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
    if (xhr.status == 200 && xhr.readyState == 4) {
      var json = JSON.parse(xhr.response);
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
var codeInput = document.getElementById("code-input");
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
    sendCode();
  }
});
document.getElementById('send-code').addEventListener('click', function (){
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
  if (!isCodeValid(codeInput.value)) {
    btnAnimation.classList.add('code--error');
    return;
  }
  btnAnimation.classList.remove('code--error');

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

var profileModal = document.querySelector('.profile'),
profileList = document.querySelector('.profile__list'),
profileItem = document.querySelector('#menu-cabinet'),
profileClose = document.querySelector('.profile__close');


profileItem.addEventListener('click', function() {
  profileModal.classList.add('profile--show');
  openProfile();
});

profileModal.addEventListener('click', function(event) {
  var target = event.target;

  if (target == profileClose || target == profileModal) {
    profileModal.classList.remove('profile--show');
    isPopupOpen = false;
  }
});

function openProfile() {
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
      }
      $('.profile__list').html(codesHtml);
    }
  });
}

function hideModalProfile(){
  isPopupOpen = false;
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
var menuLamp = document.querySelector('.menu__lamp');
var menuMode = document.querySelector('.menu__mode');

// Slider
document.addEventListener('wheel', scrollDirection);


if (document.querySelector('.prizes').classList.contains('show') || document.querySelector('.hollywood').classList.contains('show')) {
    // document.querySelector('.menu__lamp').style.display = 'none';
    // document.querySelector('.menu__mode').style.display = 'none';
}

var lastScrollDate = new Date();
function scrollDirection(e) {
  console.log('aaaaaaa');
  // closeMenu();
  if (isPopupOpen) return;
  if (new Date() - lastScrollDate <= 500) {
    return;
  } else {
    lastScrollDate = new Date();
  }

  var menuLamp = document.querySelector('.menu__lamp'),
      menuMode = document.querySelector('.menu__mode');

  if ((e.deltaY > 0)) {
    if (document.getElementById('bottom-block') && (reMain.test(window.location.pathname) || reRoot.test(window.location.pathname)) ) {
      window.history.pushState("", "", '/prizes');
      document.getElementById('bottom-block').classList.add('show');
      // menuLamp.style.display = 'none';
      // menuMode.style.display = 'none';
      if (!isSecondScreenAnimationPlayed) {
        // animateSecondScreen();
        isSecondScreenAnimationPlayed = true;
      }
    } else if (document.getElementById('js-scroll-hollywood') && rePrizes.test(window.location.pathname)) {
      window.history.pushState("", "", '/hollywood');
      document.getElementById('js-scroll-hollywood').classList.add('show');
      // menuLamp.style.display = 'none';
      // menuMode.style.display = 'none';

      if (!isThirdScreenAnimationPlayed) {
        // animateThirdScreen();
        isThirdScreenAnimationPlayed = true;
      }
    }
  } else {
    if (document.getElementById('bottom-block') && reHollywood.test(window.location.pathname)) {
      window.history.pushState("", "", '/prizes');
      document.getElementById('js-scroll-hollywood').classList.remove('show');
      // menuLamp.style.display = 'none';
      // menuMode.style.display = 'none';
    }
    else if (rePrizes.test(window.location.pathname)) {
      window.history.pushState("", "", '/main');
      document.getElementById('bottom-block').classList.remove('show');
      // menuLamp.style.display = 'block';
      // menuMode.style.display = 'flex';
    }
  }
}



function animateSecondScreen() {
  if (width > 1200) {
    var tl = new TimelineMax();

    tl.set('.prizes__chips', {opacity: 0, scale: 0.5})
    .set('.prizes__title', {opacity: 0})
    .set('.prizes__item--megogo', {x: '-100%'})
    .set(iconMegogo, {opacity: 0})
    .set(titleMegogo, {opacity: 0})
    .set(descMegogo, {opacity: 0})
    .set('#megogo-bg', {opacity: 0})
    .set('.prizes__item--lg', {x: '100%'})
    .set(iconLg, {opacity: 0})
    .set(titleLg, {opacity: 0})
    .set(descLg, {opacity: 0})
    .set('#lg-bg', {opacity: 0})
    .set('.prizes__item--hollywood', {y: '100%'})
    .set(logoHolly, {opacity: 0})
    .set(starHolly, {opacity: 0})
    .set(movieHolly, {opacity: 0})
    .set(titleHolly, {opacity: 0})
    .set(descHolly, {opacity: 0})
    .set('#hollywood-bg', {opacity: 0})
    .set('.prizes__btn', {y: '100'})
    .set('.prizes__btn', {color: '#ffffff'});


  tl.to('.prizes__chips', 1, {opacity: 1, scale: 1, ease: Elastic.easeOut.config(1, 0.4)}, 0.6)
    .to('.prizes__title', 3, {opacity: 1}, 1)
    .to('.prizes__item--megogo', 0.3, {x: '0%'}, 1.3)
    .to(iconMegogo, 1, {opacity: 1}, 1.9)
    .to('.prizes__item--lg', 0.3, {x: '0%'}, 1.9)
    .to(titleMegogo, 0.3, {opacity: 1}, 2.2)
    .to(descMegogo, 0.3, {opacity: 1}, 2.5)
    .to('#megogo-bg', 0.3, {opacity: 1}, 2.8)
    .to('.prizes__item--hollywood', 0.6, {y: '0%'}, 2.2)
    .to(iconLg, 0.3, {opacity: 1}, 2.2)
    .to(titleLg, 0.3, {opacity: 1}, 2.5)
    .to(descLg, 0.3, {opacity: 1}, 2.8)
    .to('#lg-bg', 0.3, {opacity: 1}, 3.1)
    .to(logoHolly, 0.4, {opacity: 1}, 2.5)
    .to(starHolly, 1, {opacity: 1}, 2.8)
    .to(movieHolly, 0.4, {opacity: 1}, 3.1)
    .to(titleHolly, 0.4, {opacity: 1}, 3.4)
    .to(descHolly, 0.4, {opacity: 1}, 3.7)
    .to('#hollywood-bg', 0.3, {opacity: 1}, 4)
    .to('.prizes__btn', 0.3, {y: '20px', onComplete: parallaxInit}, 4.3)
  }

}


function parallaxInit() {
  prizes.addEventListener('mousemove', parallaxIt);
}

var messiImg = prizes.querySelectorAll('img');

function parallaxIt(e) {
  var relX = (e.pageX - width / 2) / (width/2);
  var relY = (e.pageY - height / 2) / (height/2);

  if (width < 1000) return;

  if ( !e.target.classList.contains('prizes__btn') ) {
    TweenLite.to(messiImg[1], 0.5, { x: relX * 10, y: relY * 10, rotation: 0.0001 }, 0.3);
  }
}





var holl = document.querySelector('.hollywood');
var rays = document.querySelectorAll('.ray');
var degs = [36, -35, 16, -25, 33, -37];
var rotats = [];

for(var i = 0; i < rays.length; i++) {
      rays[i].style.transform = 'rotate(' + degs[i] + 'deg)';
   }

function animateThirdScreen() {

  if (width > 1200) {

    var tl = new TimelineMax();

    tl.from('.hollywood__houses--dark', .6, {y: 800, ease: Power0.ease}, 0.3)
      .from('.hollywood__houses--light', .6, {y: 800, ease: Power0.ease}, 0.8)
      .from('.hollywood__montains', .6, {y: -50, opacity: 0, ease: Power0.ease}, 1.1)
      .from('.hollywood__hero', .6, {x: -1000, scale: 2, ease: Power0.ease}, 1.6)
      .from('.hollywood__btn', .6, {y: 250, ease: Power0.ease}, 2)
      .from('.hollywood__description, .hollywood__text', 1, {opacity: 0, ease: Power0.ease}, 2.5)
      .from('.ray1', 0.1, {opacity: 0, ease: Power0.ease}, 3)
      .from('.ray2', 0.1, {opacity: 0, ease: Power0.ease}, 3)
      .from('.ray3', 0.1, {opacity: 0, ease: Power0.ease}, 3.3)
      .from('.ray4', 0.1, {opacity: 0, ease: Power0.ease}, 3.3)
      .from('.ray5', 0.1, {opacity: 0, ease: Power0.ease}, 3.6)
      .from('.ray6', 0.1, {opacity: 0, ease: Power0.ease}, 3.6)
      .to('.ray1', 5, {ease: Linear.easeNone, rotation: 40, repeat: -1, yoyo: true}, 4)
      .to('.ray2', 5, {ease: Linear.easeNone, rotation: -40, repeat: -1, yoyo: true}, 4)
      .to('.ray3', 5, {ease: Linear.easeNone, rotation: 20, repeat: -1, yoyo: true}, 4)
      .to('.ray4', 5, {ease: Linear.easeNone, rotation: -30, repeat: -1, yoyo: true}, 4)
      .to('.ray5', 5, {ease: Linear.easeNone, rotation: 28, repeat: -1, yoyo: true}, 4)
      .to('.ray6', 5, {ease: Linear.easeNone, rotation: -30, repeat: -1, yoyo: true}, 4);
  }
}




function parallaxLights() {
  holl.addEventListener('mousemove', parallaxItto);
}

var raysArr = holl.querySelectorAll('.ray');

function parallaxItto(e) {
  // if (width < 1000) return

  //   var relX = (width / 10) / e.pageX ;

  //   for(var i = 0; i < rays.length; i++) {
  //     rays[i].style.transform = 'rotate(' + degs[i] + relX  + 'deg)';
  //  }

}
