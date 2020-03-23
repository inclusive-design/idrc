/* global document */

const menuItems = document.querySelectorAll('#menu ul a');
const menuToggle = document.querySelector('#menu-toggle');

document.addEventListener('click', event => {
	if (event.target.id !== 'menu-toggle') {
		return;
	}

	const expanded = event.target.getAttribute('aria-expanded') === 'true' || false;
	event.target.setAttribute('aria-expanded', !expanded);
});

document.addEventListener('click', event => {
	if (menuToggle.getAttribute('aria-expanded' !== 'true')) {
		return;
	}

	if (!event.target.closest('#menu')) {
		menuToggle.setAttribute('aria-expanded', false);
	}
});

document.addEventListener('keydown', event => {
	if (event.key === 'Escape') {
		menuToggle.setAttribute('aria-expanded', false);
	}
});

menuItems.forEach(menuItem => {
	menuItem.addEventListener('blur', event => {
		if (event.target === menuItems[menuItems.length - 1] && event.relatedTarget && event.relatedTarget.parentNode.nodeName !== 'LI') {
			menuToggle.setAttribute('aria-expanded', false);
		}
	});
});
