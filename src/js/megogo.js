var submitBtn = document.querySelector("#submit-btn");
var formMegogo = document.querySelector("#code-registration-form");

formMegogo.addEventListener('submit', function(event) {
  event.preventDefault();

  var preloader = document.querySelector(".preloader");
  var formMegogo = document.querySelector("#code-registration-form");
  if (!validateForm(formMegogo)) return;
  else var data = new FormData(formMegogo);

  var request = new XMLHttpRequest();
  request.open('POST', '/api/megogo/', true);
  request.send(data);
  preloader.style.display = 'block'

  request.addEventListener('readystatechange', function() {
	preloader.style.display = 'none';
    if (request.status === 200 && request.readyState === 4) {
      var response = JSON.parse(request.response);
      if (response.status) {
				openMegagoTextModal({
					title: response.message.title,
					text: response.message.body,
					btn: {
						text: 'ПЕРЕЙТИ ДО ПЕРЕГЛЯДУ',
						link: 'https://megogo.net/ru/auth_login',
					}
				});
      }
      else {
				openMegagoTextModal({
					title: response.message.title,
					text: response.message.body,
				});
      }
    }
  });
});

var textModal = document.querySelector('.js-text-modal');

function openMegagoTextModal(param) {
  var title = textModal.querySelector('.js-title');
  var text = textModal.querySelector('.js-text');
  var modalImg = textModal.querySelector('.js-img');
  var modalBtn = textModal.querySelector('.js-btn');
  title.innerHTML = param.title || '';
  text.innerHTML = param.text || '';
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
  openMegagoModal(textModal);
}

function openMegagoModal(modal) {
  modal.style.display = 'flex';
  modal.style.zIndex = 23;
}

var closeTextModalBtn = textModal.querySelector('.js-close');

closeTextModalBtn.addEventListener('click', function (e) {
  textModal.style.display = 'none';
});


function validateForm(form) {
	var inputs = formMegogo.querySelectorAll('input');
  var formValid = true;

  var phoneValue = inputs[0].value;
  if (phoneValue === '') {
    formValid = false;
    inputs[0].classList.add('input--error');
  } else {
    inputs[0].classList.remove('input--error');
  }

  var codeValue = inputs[1].value;
  if (codeValue === '' || !isMegagoCodeValid(codeValue)) {
    formValid = false;
    inputs[1].classList.add('input--error');
  } else {
  	inputs[1].classList.remove('input--error');
  }

  return formValid;
}


function isMegagoCodeValid(str) {
  var localStr = str.replace(/^\ + |\ +$/g, '');

  if (!/[0-9]+/ig.test(localStr)) {
    return false;
  }

  if (localStr.length !== 12) {
    return false;
  }

  return !/[\\\/\%\;\.\№\#\»\@\*]/.test(localStr);
}
