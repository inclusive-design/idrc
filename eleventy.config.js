const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const eleventyRssPlugin = require('@11ty/eleventy-plugin-rss');
const htmlMinTransform = require('./src/transforms/html-min.js');
const parseTransform = require('./src/transforms/parse.js');

module.exports = eleventyConfig => {
	// Plugins.
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(eleventyRssPlugin);

	// Transforms
	eleventyConfig.addTransform('htmlmin', htmlMinTransform);
	eleventyConfig.addTransform('parse', parseTransform);

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
