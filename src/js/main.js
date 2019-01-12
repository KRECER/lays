// Маска
$(document).ready(function() {
	$(".tel").mask("+38(999) 999-99-99");
});

// Модальное Вход
var modal = document.getElementsByClassName('enterform')[0];
var form = document.getElementsByClassName('enterform__wrapper')[0];
var closeSign = document.getElementsByClassName('enterform__close')[0];
var headerBg = document.getElementsByClassName('page-header')[0];

function signIn() {
	modal.style.display = 'block';
	modal.style.zIndex = '10';
	closeSign.style.zIndex = '10';
	headerBg.style.zIndex = '9';

	document.getElementById('menu-block').classList.remove('expanded');
	document.getElementById('menu-inner-block').classList.remove('expanded');
	document.getElementById('close-menu-bg').classList.remove('expanded');
}

function hideModalCloseButton() {
	modal.style.display = 'none';
	headerBg.style.zIndex = '1';
	document.body.style.position = 'static';
}

function hideModalOverlay() {
	modal.style.display = 'none';
	headerBg.style.zIndex = '1';
	document.body.style.position = 'static';
} 

// Модальное Регестрация
var modalReg = document.getElementsByClassName('registration')[0];
var formReg = document.getElementsByClassName('registration__wrapper')[0];
var closeSignReg = document.getElementsByClassName('registration__close')[0];
var headerBg = document.getElementsByClassName('page-header')[0];
var registrationBtn = document.getElementById('registrationBtn');

function getRegistration() {
	modalReg.style.display = 'block';
	modalReg.style.zIndex = '10';
	closeSignReg.style.zIndex = '10';
	headerBg.style.zIndex = '9';
	modal.style.display='none';
	console.log('asdkjasdnaskjdnsakjdnaskjn');
	document.body.style.position = 'fixed';
}

function hideModalRegistrationCloseButton() {
	modalReg.style.display = 'none';
	headerBg.style.zIndex = '1';
	document.body.style.position = 'static';
}

function hideModalRegistrationOverlay() {
	modalReg.style.display = 'none';
	headerBg.style.zIndex = '1';
	document.body.style.position = 'static';
} 


