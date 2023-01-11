module.exports = (image, alt, imagePosition, scale, maxHeight) => {
	return `  <style>
	:root {
	  --image-position-max-height: ${maxHeight}px;
	  --image-position-width: ${scale};
	}
  </style>
  <img src="${image}" alt="${alt}" class="image-position--${imagePosition} image-position--image-height" />
`;
};
