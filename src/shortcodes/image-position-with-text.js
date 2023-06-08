const markdownFilter = require('../filters/markdown.js');

module.exports = (content, image, alt, imagePosition, scale, verticalAlignment) => {
	content = content.trim();
	let output = '';

	if (content === '') {
		output += `<p><img src="${image}" alt="${alt}" class="image-position--${imagePosition} image-position--image-height  image-and-text__scale--${scale}" /></p>`;
	} else {
		scale = scale === '100' ? '75' : scale;
		imagePosition = imagePosition.trim() === 'center' ? 'left' : imagePosition;
		output += `<div class="image-and-text image-and-text--image-${imagePosition}--${scale} image-and-text--vertical-${verticalAlignment}"><figure class="image-and-text__media"><img src="${image}" alt="${alt}" class="image-position--image-height image-and-text__scale--100" /></figure><div class="image-and-text__content">${markdownFilter(content)}</div></div>`;
	}
	return output;
};
