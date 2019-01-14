
$(".tel").mask("+38(999) 999-99-99");
$(".registration__inp [type=tel]").mask("+38(099) 999-99-99");
// $(".registration__inp [name=birthdate").mask("00-00-0000");

// $(".registration__inp [name=birthdate").mask("00-00-0000", {placeholder: "ДД-ММ-РРРР"});
$(".registration__inp [name=birthdate").mask("0000-00-00", {placeholder: "ДД-ММ-РРРР"});

$(".registration [name=phone]").mask("+38(999) 999-99-99");
$(".enterform__wrapper form [name=phone]").mask("+38(999) 999-99-99");

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
						if (inputs[i].name == key) {
							inputs[i].classList.add('input--error');
						} else {
							inputs[i].classList.remove('input--error');
						}


					}
				}

				if (response.message && response.message.captcha) {
					document.querySelector('.js-reg-captcha').classList.add('error');
				}
				grecaptcha.reset();
			} else {
				modal.parentNode.style.display = 'none';
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
var modalFormReg = document.querySelector('.registration__wrapper');

formReg.addEventListener('submit', function(event) {
	event.preventDefault();

	var data = new FormData(formReg);

	validateForm('http://lays-movie.dev.itcg.ua/api/registration/', data, formReg, modalFormReg);
});


var formEnter = document.querySelector('.enterform__wrapper form');

formEnter.addEventListener('submit', function(event) {
	event.preventDefault();
	var data = new FormData(formEnter);

	validateForm('http://lays-movie.dev.itcg.ua/api/login/', data, formEnter, form);
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
