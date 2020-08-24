/* global document */

const banner = document.querySelector('.banner');
const menuItems = document.querySelectorAll('#menu ul a');
const menuToggle = document.querySelector('#menu-toggle');

const dropdownLinks = [...document.querySelectorAll('.nav .submenu-parent > a')];

dropdownLinks.forEach(link => {
	const toggleButton = document.createElement('button');
	const dropdown = link.nextElementSibling;

	if (link.getAttribute('href') !== '#') {
		const overviewLink = link.cloneNode();
		overviewLink.dataset.parent = false;
		overviewLink.textContent = 'Overview';
		dropdown.insertBefore(overviewLink, dropdown.firstElementChild);
	}

	toggleButton.classList.add('submenu-toggle');
	toggleButton.setAttribute('aria-expanded', 'false');
	toggleButton.innerHTML = `${link.textContent} <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.912109 0.990478L5.91211 5.99048L10.9121 0.990477" stroke="currentColor" stroke-width="2"/></svg>`;

	if (link.dataset.parent || link.getAttribute('aria-current') === 'page') {
		toggleButton.dataset.parent = true;
	}

	link.replaceWith(toggleButton);
});

document.addEventListener('click', event => {
	if (!event.target.closest('#menu-toggle')) {
		return;
	}

	const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
	menuToggle.setAttribute('aria-expanded', !expanded);

	if (expanded) {
		banner.classList.remove('banner--menu-visible');
	} else {
		banner.classList.add('banner--menu-visible');
	}
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

document.addEventListener('click', event => {
	if (!event.target.closest('.submenu-toggle')) {
		return;
	}

	const submenuToggle = event.target.closest('.submenu-toggle');

	const expanded = submenuToggle.getAttribute('aria-expanded') === 'true' || false;
	submenuToggle.setAttribute('aria-expanded', !expanded);

	if (expanded) {
		submenuToggle.parentNode.classList.remove('submenu-parent--submenu-visible');
	} else {
		submenuToggle.parentNode.classList.add('submenu-parent--submenu-visible');
	}
});
