const markdownFilter = require('../filters/markdown.js');

module.exports = (content, image, alt, imagePosition, scale, maxHeight, verticalAlignment) => {
	content = content.trim();
	let output = '';

	if (content === '') {
		output += `<p><img src="${image}" alt="${alt}" class="image-position--${imagePosition} image-position--image-height  image-and-text__scale--${scale} image-and-text__max-height--${maxHeight}" /></p>`;
	} else {
		scale = scale === '100' ? '75' : scale; // Reduce to 75% width to allow content to be shown beside it.
		imagePosition = imagePosition.trim() === 'center' ? 'left' : imagePosition; // Center align to left so content can be shown
		output += `<div class="image-and-text image-and-text--image-${imagePosition} image-and-text--image-${imagePosition}--${scale} image-and-text--vertical-${verticalAlignment}"><figure class="image-and-text__media"><img src="${image}" alt="${alt}" class="image-position--image-height image-and-text__scale--100 image-and-text__max-height--${maxHeight}" /></figure><div class="image-and-text__content">${markdownFilter(content)}</div></div>`;
	}
	return output;
};
