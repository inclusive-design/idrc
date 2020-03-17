const rssPlugin = require('@11ty/eleventy-plugin-rss');

module.exports = eleventyConfig => {
	eleventyConfig.addPlugin(rssPlugin);

	return {
		dir: {
			input: 'src',
			output: 'dist'
		},
		passthroughFileCopy: true
	};
};
