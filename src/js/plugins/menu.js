// menu
var closeMenuBtn = document.getElementById('close-menu'),
	openMenuBtn = document.getElementById('open-menu'),
	toggleMenuBtn = document.getElementById('toggle-menu'),
	menu = document.getElementById('menu-block'),
	bgMenu = document.getElementById('close-menu-bg'),
	menuInner = document.getElementById('menu-inner-block');

if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
if (bgMenu) bgMenu.addEventListener('click', closeMenu);
if (openMenuBtn) openMenuBtn.addEventListener('click', openMenu);
if (toggleMenuBtn) toggleMenuBtn.addEventListener('click', toggleMenu);

function closeMenu(e) {
	if (e) e.preventDefault();
		document.body.style.position = 'static';
		menu.classList.remove('expanded');
		menuInner.classList.remove('expanded');
		bgMenu.classList.remove('expanded');
	}
function openMenu(e) {
	if (e) e.preventDefault();
		if (window.matchMedia('(max-aspect-ratio:3/3)').matches) {
			document.body.style.position = 'fixed';
		}
		menu.classList.add('expanded');
		menuInner.classList.add('expanded');
		bgMenu.classList.add('expanded');
	}

function toggleMenu(e) {
	if (e) e.preventDefault();
		var classes = menu.classList.value;
	if (menu.classList.value !== null) {
		classes = allClasses(menu.classList);
	}
	if (~classes.indexOf('expanded')) closeMenu();
		else openMenu();
	}

function allClasses(d) {
	var a = '';
	for (var i = 0; i < d.length; i++) {
	  a += d[i];
	}
	return a;
}
