/* global document, window */
import * as d3 from 'd3-selection';

const banner = document.querySelector('.banner');
const menuItems = document.querySelectorAll('#menu ul a');
const menuToggle = document.querySelector('#menu-toggle');

const dropdownLinks = [...document.querySelectorAll('.nav .submenu-parent > a')];
const dropdownButtons = [];

/**
 * Collapse the menu.
 */
const collapseMenu = () => {
	menuToggle.setAttribute('aria-expanded', false);
	banner.classList.remove('banner--menu-visible');
};

/**
 * Collapse the submenu corresponding to the toggle button `btn`.
 * @param {HTMLElement} btn The toggle button whose submenu should be collapsed.
 */
const collapseSubmenu = btn => {
	btn.setAttribute('aria-expanded', false);
	btn.parentNode.classList.remove('submenu-parent--submenu-visible');
};

/**
 * Collapse the menu and any open submenus.
 */
const collapseAll = () => {
	collapseMenu();
	dropdownButtons.forEach(btn => {
		collapseSubmenu(btn);
	});
};

// Create submenu buttons and submenus
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

	dropdownButtons.push(toggleButton);
});

// Handle click event on menu toggle button.
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

// Handle click event on submenu toggle button.
document.addEventListener('click', event => {
	if (!event.target.closest('.submenu-toggle')) {
		return;
	}

	const submenuToggle = event.target.closest('.submenu-toggle');

	const expanded = submenuToggle.getAttribute('aria-expanded') === 'true' || false;
	submenuToggle.setAttribute('aria-expanded', !expanded);

	dropdownButtons.forEach(btn => {
		if (btn !== submenuToggle) {
			collapseSubmenu(btn);
		}
	});

	if (expanded) {
		submenuToggle.parentNode.classList.remove('submenu-parent--submenu-visible');
	} else {
		submenuToggle.parentNode.classList.add('submenu-parent--submenu-visible');
	}
});

// Collapse menu and/or submenus if a click happens outside of the menu.
document.addEventListener('click', event => {
	if (menuToggle.getAttribute('aria-expanded' !== 'true') && document.querySelectorAll('.menu [aria-expanded="true"]').length === 0) {
		return;
	}

	if (!event.target.closest('#menu')) {
		collapseAll();
	}
});

// Collapse menu and/or submenus on <esc>.
document.addEventListener('keydown', event => {
	if (event.key === 'Escape') {
		collapseAll();
	}
});

// Handle blur on menu items.
menuItems.forEach(menuItem => {
	menuItem.addEventListener('blur', event => {
		if (event.target === menuItems[menuItems.length - 1] && event.relatedTarget && event.relatedTarget.parentNode.nodeName !== 'LI') {
			collapseAll();
		}
	});
});

if (document.querySelector('.timeline')) {
	const timeline = document.querySelector('.milestones');
	const milestones = [...timeline.querySelectorAll('dt')];
	const first = milestones[0];
	const last = milestones[milestones.length - 1];
	let distance = last.offsetTop - first.offsetTop;

	const lineContainer = d3.select('.line')
		.append('svg')
		.attr('width', 1)
		.attr('height', distance);

	const line = lineContainer.append('line')
		.attr('x1', 1)
		.attr('y1', 0)
		.attr('x2', 1)
		.attr('y2', distance)
		.attr('stroke-width', 1)
		.attr('stroke', 'black');

	window.addEventListener('resize', () => {
		distance = last.offsetTop - first.offsetTop;
		lineContainer.attr('height', distance);
		line.attr('y2', distance);
	});
}

