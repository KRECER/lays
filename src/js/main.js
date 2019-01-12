
	$(".tel").mask("+38(999) 999-99-99");
	$(".registration__inp [type=tel]").mask("+38(999) 999-99-99");
	$(".registration__inp [name=birthdate").mask("1993-10-10");

	// Модальное Вход
var modal = document.getElementsByClassName('enterform')[0];
var form = document.getElementsByClassName('enterform__wrapper')[0];
var closeSign = document.getElementsByClassName('enterform__close')[0];
var headerBg = document.getElementsByClassName('page-header')[0];
function signIn(){
	modal.style.display = 'block';
	modal.style.zIndex = '10';
	closeSign.style.zIndex = 
	'10';
	headerBg.style.zIndex = '9';
}
function hideModalCloseButton(){
	modal.style.display = 'none';
	headerBg.style.zIndex = '1';
}
function hideModalOverlay(){
	modal.style.display = 'none';
	headerBg.style.zIndex = '1';
} 

// Модальное Регестрация
var modalReg = document.getElementsByClassName('registration')[0];
var formReg = document.getElementsByClassName('registration__wrapper')[0];
var closeSignReg = document.getElementsByClassName('registration__close')[0];
var headerBg = document.getElementsByClassName('page-header')[0];
var registrationBtn = document.getElementById('registrationBtn');
function getRegistration(){
	modalReg.style.display = 'block';
	modalReg.style.zIndex = '10';
	closeSignReg.style.zIndex = '10';
	headerBg.style.zIndex = '9';
	modal.style.display='none';

}
function hideModalRegistrationCloseButton(){
	modalReg.style.display = 'none';
	headerBg.style.zIndex = '1';
}
function hideModalRegistrationOverlay(){
	modalReg.style.display = 'none';
	headerBg.style.zIndex = '1';
}

var formReg = document.querySelector('.registration__wrapper form');

formReg.addEventListener('submit', function(event) {
	event.preventDefault();

	var data = new FormData(formReg);

	var request = new XMLHttpRequest();
	request.open('POST', 'http://lays-movie.dev.itcg.ua/api/registration/', true);
	request.send(data);
	

	request.addEventListener('readystatechange', function() {
		if (request.status === 200 && request.readyState === 4) {
			console.log(request.response);
		}
	});
});