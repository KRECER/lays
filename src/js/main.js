
$(".tel").mask("+38(999) 999-99-99");
$(".registration__inp [type=tel]").mask("+38(999) 999-99-99");
// $(".registration__inp [name=birthdate").mask("1993-10-10");
$(".registration [name=phone]").mask("+38(999) 999-99-99");
$(".enterform__wrapper form [name=phone]").mask("+38(999) 999-99-99");

	// Модальное Вход
var modal = document.getElementsByClassName('enterform')[0];
var form = document.getElementsByClassName('enterform__wrapper')[0];
var closeSign = document.getElementsByClassName('enterform__close')[0];
var headerBg = document.getElementsByClassName('page-header')[0];

function signIn() {
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
} 

// Модальное Регестрация
var modalReg = document.getElementsByClassName('registration')[0];
var formReg = document.getElementsByClassName('registration__wrapper')[0];
var closeSignReg = document.getElementsByClassName('registration__close')[0];
var headerBg = document.getElementsByClassName('page-header')[0];
var registrationBtn = document.getElementById('registrationBtn');

registrationBtn.addEventListener('click', getRegistration);
closeSignReg.addEventListener('click', hideRegModal);
modalReg.addEventListener('click', hideRegModal);

function getRegistration() {
	modalReg.style.display = 'block';
	modal.style.display = 'none';
}

function hideRegModal() {
	modalReg.style.display = 'none';
} 


// Vilidation Form
function validateForm(link, data, form, modal) {

	if (form.hasOwnProperty('rules')) {
		if (!form.rules.checked || !form.rules2.checked) {
			// console.log('roor')
			form.rules.parentNode.classList.add('error');
			form.rules2.parentNode.classList.add('error');
			return;
		}
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

				if (response.message.captcha) {
					document.querySelector('.js-reg-captcha').classList.add('error');
				}
				grecaptcha.reset();
			} else {
				modal.style.display = 'none';
				isAuth();
				openTextModal({
					title: 'Успіх',
					text: response.message,
			});
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

function isAuth() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://lays-movie.dev.itcg.ua/api/is_authenticated/', true);
	xhr.send();

	xhr.addEventListener('readystatechange', function() {
		if (xhr.status === 200 && xhr.readyState === 4) {
			if (xhr.response.status) {
				var itemAuth = document.querySelector('.item._isAuth').parentElement;

				itemAuth.style.display = 'none';
			}
		}	
	});
}

window.addEventListener('DOMContentLoaded', function() {
	isAuth();
});
