const rssPlugin = require('@11ty/eleventy-plugin-rss');

module.exports = eleventyConfig => {
	// Plugins.
	eleventyConfig.addPlugin(rssPlugin);

	// Passthrough file copy.
	eleventyConfig.addPassthroughCopy('src/admin');
	eleventyConfig.addPassthroughCopy({'src/_includes/static/css': 'css'});
	eleventyConfig.addPassthroughCopy({'src/_includes/static/fonts': 'fonts'});
	eleventyConfig.addPassthroughCopy({'src/_includes/static/images': 'images'});
	eleventyConfig.addPassthroughCopy({'src/_includes/static/js': 'js'});

	return {
		dir: {
			input: 'src',
			output: 'dist'
		},
		passthroughFileCopy: true
	};
};
