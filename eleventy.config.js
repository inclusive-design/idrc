/* global fs */

const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const eleventyRssPlugin = require('@11ty/eleventy-plugin-rss');
const htmlMinTransform = require('./src/transforms/html-min.js');
const parseTransform = require('./src/transforms/parse.js');
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

module.exports = eleventyConfig => {
	const now = new Date();

	// Collections.
	const livePosts = post => post.date <= now && !post.data.draft;
	eleventyConfig.addCollection('posts', collection => {
		return [
			...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)
		].reverse();
	});

	eleventyConfig.addCollection('postFeed', collection => {
		return [...collection.getFilteredByGlob('./src/posts/*.md').filter(livePosts)]
			.reverse()
			.slice(0, 10);
	});

	// Plugins.
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(eleventyRssPlugin);

	// Transforms.
	eleventyConfig.addTransform('htmlmin', htmlMinTransform);
	eleventyConfig.addTransform('parse', parseTransform);

	// Filters.
	eleventyConfig.addFilter('dateFilter', dateFilter);
	eleventyConfig.addFilter('markdown', value => {
		const markdown = require('markdown-it')({
			html: true
		});
		return markdown.render(value);
	});
	eleventyConfig.addFilter('w3DateFilter', w3DateFilter);

	// Passthrough file copy.
	eleventyConfig.addPassthroughCopy({'src/_includes/static/css': 'css'});
	eleventyConfig.addPassthroughCopy({'src/_includes/static/fonts': 'fonts'});
	eleventyConfig.addPassthroughCopy({'src/_includes/static/images': 'images'});
	eleventyConfig.addPassthroughCopy({'src/_includes/static/js': 'js'});
	eleventyConfig.addPassthroughCopy({'src/media': 'media'});
	eleventyConfig.addPassthroughCopy('src/admin/config.yml');
	eleventyConfig.addPassthroughCopy('src/admin/previews.js');
	eleventyConfig.addPassthroughCopy('node_modules/nunjucks/browser/nunjucks-slim.js');

	// BrowserSync.
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: (error, browserSync) => {
				const content404 = fs.readFileSync('dist/404.html');

				browserSync.addMiddleware('*', (request, response) => {
				// Provides the 404 content without redirect.
					response.write(content404);
					response.writeHead(404);
					response.end();
				});
			}
		}
	});

	return {
		dir: {
			input: 'src',
			output: 'dist'
		},
		passthroughFileCopy: true
	};
};
