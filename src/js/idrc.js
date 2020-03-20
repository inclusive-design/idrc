/* global document */

document.addEventListener('click', event => {
	if (event.target.id !== 'menu-toggle') {
		return;
	}

	const expanded = event.target.getAttribute('aria-expanded') === 'true' || false;
	event.target.setAttribute('aria-expanded', !expanded);
});
