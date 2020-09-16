const getSize = require('image-size');
const jsdom = require('@tbranyen/jsdom');
const {JSDOM} = jsdom;

module.exports = (value, outputPath) => {
	if (outputPath && outputPath.includes('.html')) {
		const DOM = new JSDOM(value, {
			resources: 'usable'
		});

		const document = DOM.window.document;
		const images = [
			...document.querySelectorAll('main article img')
		];
		const links = [
			...document.querySelectorAll('main a')
		];
		const subheads = [
			...document.querySelectorAll('[data-subsection-level="3"] h3, [data-subsection-level="4"] h4')
		];

		if (images.length > 0) {
			images.forEach(image => {
				image.setAttribute('loading', 'lazy');

				const file = image.getAttribute('src');

				if (!file.includes('http')) {
					const dimensions = getSize('src' + file);

					image.setAttribute('width', dimensions.width);
					image.setAttribute('height', dimensions.height);
				}

				// If an image has a title it means that the user added a caption
				// so replace the image with a figure containing that image and a caption
				if (image.hasAttribute('title')) {
					const figure = document.createElement('figure');
					const figCaption = document.createElement('figcaption');

					figCaption.innerHTML = image.getAttribute('title');

					image.removeAttribute('title');

					figure.append(image.cloneNode(true));
					figure.append(figCaption);

					image.replaceWith(figure);
				}
			});
		}

		if (links.length > 0) {
			links.forEach(link => {
				if (
					!link.href.startsWith('/') &&
					(!['localhost:3000', 'idrc.ocadu.ca'].includes(link.host) || !link.host.endsWith('idrc.netlify.app'))
				) {
					link.setAttribute('rel', 'external');
				}
			});
		}

		if (subheads.length > 0) {
			// Loop each heading and add a little anchor and an ID to each one
			subheads.forEach(heading => {
				// Function to create a node list
				// of the content between this <h2> and the next
				const getContent = element => {
					const elems = [];
					const headings = (element.tagName === 'H3') ? new Set(['H2', 'H3']) : new Set(['H2', 'H3', 'H4']);
					while (element.nextElementSibling && !headings.has(element.nextElementSibling.tagName)) {
						elems.push(element.nextElementSibling);
						element = element.nextElementSibling;
					}

					// Delete the old versions of the content nodes
					elems.forEach(node => {
						node.remove();
					});

					return elems;
				};

				const contents = getContent(heading);

				const wrapper = document.createElement('div');

				wrapper.className = 'subsection';

				// Add each element of `contents` to `wrapper`
				contents.forEach(node => {
					wrapper.append(node);
				});

				// Add the wrapped content back into the DOM
				// after the heading
				heading.parentNode.insertBefore(wrapper, heading.nextElementSibling);
				wrapper.prepend(heading);
			});
		}

		return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML;
	}

	return value;
};
