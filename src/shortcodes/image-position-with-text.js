const markdownFilter = require('../filters/markdown.js');

module.exports = (content, image, alt, imagePosition, scale, maxHeight, verticalAlignment) => {
	content = content.trim();
	maxHeight = maxHeight.trim() === 'auto' ? 'auto' : maxHeight + 'px';

	let output;
	output = `<style>:root {--image-position-max-height: ${maxHeight}; --image-position-width: ${scale};}</style>`;
	if (content === '') {
		output += `<img src="${image}" alt="${alt}" class="image-position--${imagePosition} image-position--image-height" />`;
	} else {
		imagePosition = imagePosition.trim() === 'center' ? 'left' : imagePosition;
		output += `<div class="image-and-text image-and-text--image-${imagePosition} image-and-text--vertical-${verticalAlignment}"><figure class="image-and-text__media"><img src="${image}" alt="${alt}" class="image-position--image-height" /></figure><div class="image-and-text__content">${markdownFilter(content)}</div></div>`;
	}
	return output;
};
