const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const eleventyRssPlugin = require('@11ty/eleventy-plugin-rss');
const htmlMinTransform = require('./src/transforms/html-min.js');
const parseTransform = require('./src/transforms/parse.js');

module.exports = eleventyConfig => {
	// Plugins.
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(eleventyRssPlugin);

	// Transforms.
	eleventyConfig.addTransform('htmlmin', htmlMinTransform);
	eleventyConfig.addTransform('parse', parseTransform);

	// Filters.

	eleventyConfig.addFilter('markdown', value => {
		const markdown = require('markdown-it')({
			html: true
		});
		return markdown.render(value);
	});

	// Passthrough file copy.
	eleventyConfig.addPassthroughCopy({'src/_includes/static/css': 'css'});
	eleventyConfig.addPassthroughCopy({'src/_includes/static/fonts': 'fonts'});
	eleventyConfig.addPassthroughCopy({'src/_includes/static/images': 'images'});
	eleventyConfig.addPassthroughCopy({'src/_includes/static/js': 'js'});
	eleventyConfig.addPassthroughCopy('src/admin/config.yml');
	eleventyConfig.addPassthroughCopy('src/admin/previews.js');
	eleventyConfig.addPassthroughCopy('node_modules/nunjucks/browser/nunjucks-slim.js');

	return {
		dir: {
			input: 'src',
			output: 'dist'
		},
		passthroughFileCopy: true
	};
};
