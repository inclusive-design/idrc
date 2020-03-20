const jsdom = require('@tbranyen/jsdom');
const {JSDOM} = jsdom;
const slugify = require('slugify');

module.exports = (value, outputPath) => {
	if (outputPath.endsWith('.html')) {
		const DOM = new JSDOM(value, {
			resources: 'usable'
		});

		const document = DOM.window.document;
		const images = [
			...document.querySelectorAll('main article img')
		];
		// const headings = [
		// 	...document.querySelectorAll('main article h2')
		// ];

		if (images.length > 0) {
			images.forEach(image => {
				image.setAttribute('loading', 'lazy');
			});
		}

		// if (headings.length > 0) {
		// 	// Loop each heading and add a little anchor and an ID to each one
		// 	headings.forEach(heading => {
		// 		const headingSlug = slugify(heading.textContent.toLowerCase());
		// 		heading.setAttribute('id', `${headingSlug}`);

		// 		// Function to create a node list
		// 		// of the content between this <h2> and the next
		// 		const getContent = element => {
		// 			const elems = [];
		// 			while (element.nextElementSibling && element.nextElementSibling.tagName !== 'H2') {
		// 				elems.push(element.nextElementSibling);
		// 				element = element.nextElementSibling;
		// 			}

		// 			// Delete the old versions of the content nodes
		// 			elems.forEach(node => {
		// 				node.remove();
		// 			});

		// 			return elems;
		// 		};

		// 		const contents = getContent(heading);

		// 		const wrapper = document.createElement('section');
		// 		wrapper.setAttribute('aria-labelledby', headingSlug);

		// 		const container = document.createElement('div');
		// 		container.className = 'container px-6 mx-auto';

		// 		wrapper.append(container);

		// 		// Add each element of `contents` to `wrapper`
		// 		contents.forEach(node => {
		// 			container.append(node);
		// 		});

		// 		// Add the wrapped content back into the DOM
		// 		// after the heading
		// 		heading.parentNode.insertBefore(wrapper, heading.nextElementSibling);
		// 		container.prepend(heading);
		// 	});
		// }

		return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML;
	}

	return value;
};
