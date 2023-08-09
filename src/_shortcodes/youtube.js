const getId = require('../_utils/extract-youtube-id.js');

module.exports = (url) => {
	const id = getId(url);

	if (id) {
		return `<figure class="embed--youtube"><iframe class="video" src="https://www.youtube.com/embed/${id}/" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></figure>`;
	}
};
