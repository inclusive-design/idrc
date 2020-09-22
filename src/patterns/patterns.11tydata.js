module.exports = {
	eleventyComputed: {
		eleventyNavigation: {
			parent: 'Patterns',
			key: data => data.title
		}
	}
};
