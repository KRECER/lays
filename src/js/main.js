
	$(".tel").mask("+38(999) 999-99-99");
	$(".registration__inp [type=tel]").mask("+38(999) 999-99-99");
	$(".registration__inp [name=birthdate").mask("1993-10-10");
	$(".registration [name=phone").mask("+38(999) 999-99-99");

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

var formReg = document.querySelector('.registration__wrapper form');

formReg.addEventListener('submit', function(event) {
	event.preventDefault();

	var data = new FormData(formReg);

	var request = new XMLHttpRequest();
	request.open('POST', 'http://lays-movie.dev.itcg.ua/api/registration/', true);
	request.send(data);
	

	request.addEventListener('readystatechange', function() {
		if (request.status === 200 && request.readyState === 4) {
			$('.registration').hide();
		}
	});
});





var formEnter = document.querySelector('.enterform__wrapper form');

formEnter.addEventListener('submit', function(event) {
	event.preventDefault();
	var data = new FormData(formEnter);
	
	// var request = new XMLHttpRequest();
	// request.open('POST', 'http://lays-movie.dev.itcg.ua/api/login/', true);
	// request.send(data);
	// request.addEventListener('readystatechange', function () {
	// if (request.status === 200 && request.readyState === 4) {
	//   $('.enterform').hide();
	// }
	// });

	$.ajax({
        type: 'POST',
        url: "http://lays-movie.dev.itcg.ua/api/login/",
        data: data,
        processData: false,
        contentType: false,
    }).done(function(data) {
        $('.enterform').hide();
        if (data.status == true) {
	        openTextModal({
	            title: 'Успіх',
	            text: data.message,
	      	});
        	
        } else {
	      	openTextModal({
	            title: 'Увага',
	            text: data.message,
	      	});
        }
    }).fail(function(data) {
        openTextModal({
            title: 'Увага',
            text: data.message,
      	});
    });
	
});
