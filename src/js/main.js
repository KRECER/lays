// Маска
$(document).ready(function() {
	$(".tel").mask("+38(999) 999-99-99");
});

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
function getRegistration(){
	modalReg.style.display = 'block';
	modalReg.style.zIndex = '10';
	closeSignReg.style.zIndex = '10';
	headerBg.style.zIndex = '9';
}
function hideModalRegistrationCloseButton(){
	modalReg.style.display = 'none';
	headerBg.style.zIndex = '1';
}
function hideModalRegistrationOverlay(){
	modalReg.style.display = 'none';
	headerBg.style.zIndex = '1';
} 