const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const eleventyRssPlugin = require('@11ty/eleventy-plugin-rss');
const errorOverlay = require('eleventy-plugin-error-overlay');
const eleventyPWA = require('eleventy-plugin-pwa');
const fs = require('fs');

const htmlMinTransform = require('./src/transforms/html-min.js');
const parseTransform = require('./src/transforms/parse.js');
const dateFilter = require('./src/filters/date-filter.js');
const markdownFilter = require('./src/filters/markdown-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

const workboxOptions = {
	cacheId: 'idrc',
	swDest: './dist/sw.js',
	globPatterns: ['index.html', 'js/idrc.js', 'css/idrc.css'],
	globIgnores: ['admin/**/*', 'node_modules/**/*'],
	skipWaiting: false
};

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

	eleventyConfig.setUseGitIgnore(false);

	// Plugins.
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(errorOverlay);
	eleventyConfig.addPlugin(eleventyPWA, workboxOptions);
	eleventyConfig.addPlugin(eleventyRssPlugin);

	// Transforms.
	eleventyConfig.addTransform('htmlmin', htmlMinTransform);
	eleventyConfig.addTransform('parse', parseTransform);

	// Filters.
	eleventyConfig.addFilter('dateFilter', dateFilter);
	eleventyConfig.addFilter('markdownFilter', markdownFilter);
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
	eleventyConfig.addPassthroughCopy('_redirects');

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
