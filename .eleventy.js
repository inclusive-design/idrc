const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const eleventyRssPlugin = require('@11ty/eleventy-plugin-rss');
const errorOverlay = require('eleventy-plugin-error-overlay');
const eleventyPWA = require('eleventy-plugin-pwa');
const eleventySharp = require('eleventy-plugin-sharp');
const fs = require('fs');

const htmlMinTransform = require('./src/transforms/html-min.js');
const parseTransform = require('./src/transforms/parse.js');
const dateFilter = require('./src/filters/date-filter.js');
const limitFilter = require('./src/filters/limit-filter.js');
const markdownFilter = require('./src/filters/markdown-filter.js');
const slugFilter = require('./src/filters/slug-filter.js');
const splitFilter = require('./src/filters/split-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

const workboxOptions = {
	cacheId: 'idrc',
	swDest: './dist/sw.js',
	globPatterns: ['assets/fonts/*.{woff,woff2}', 'assets/images/*.{png,svg}'],
	globIgnores: ['admin/**/*', 'node_modules/**/*'],
	clientsClaim: true,
	skipWaiting: true
};

module.exports = eleventyConfig => {
	const now = new Date();

	// Collections.
	const livePosts = post => post.date <= now && !post.data.draft;

	eleventyConfig.addCollection('people', collection => {
		return collection.getFilteredByGlob('src/people/*.md').sort((a, b) => {
			const nameA = a.data.title;
			const nameB = b.data.title;

			if (nameA < nameB) {
				return -1;
			}

			if (nameA > nameB) {
				return 1;
			}

			return 0;
		  });
	});

	eleventyConfig.addCollection('projects', collection => {
		return [
			...collection.getFilteredByGlob('src/projects/*.md').sort((a, b) => b.data.order - a.data.order)
		].reverse();
	});

	eleventyConfig.addCollection('tools', collection => {
		return [
			...collection.getFilteredByGlob('src/tools/*.md').sort((a, b) => b.data.order - a.data.order)
		].reverse();
	});

	eleventyConfig.addCollection('news', collection => {
		return [
			...collection.getFilteredByGlob('./src/news/*.md').filter(post => livePosts(post))
		].reverse();
	});

	eleventyConfig.addCollection('ideas', collection => {
		return [
			...collection.getFilteredByGlob('./src/ideas/*.md').filter(post => livePosts(post))
		].reverse();
	});

	eleventyConfig.addCollection('postFeed', collection => {
		return [...collection.getFilteredByGlob(['./src/news/*.md', './src/ideas/*.md']).filter(post => livePosts(post))]
			.reverse()
			.slice(0, 10);
	});

	eleventyConfig.setUseGitIgnore(false);

	// Plugins.
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(errorOverlay);
	eleventyConfig.addPlugin(eleventyPWA, workboxOptions);
	eleventyConfig.addPlugin(eleventyRssPlugin);
	eleventyConfig.addPlugin(eleventySharp({
		urlPath: '/media',
		outputDir: 'dist/media/'
	}));

	// Transforms.
	eleventyConfig.addTransform('htmlmin', htmlMinTransform);
	eleventyConfig.addTransform('parse', parseTransform);

	// Filters.
	eleventyConfig.addFilter('dateFilter', dateFilter);
	eleventyConfig.addFilter('markdown', markdownFilter);
	eleventyConfig.addFilter('w3DateFilter', w3DateFilter);
	eleventyConfig.addFilter('limit', limitFilter);
	eleventyConfig.addFilter('slug', slugFilter);
	eleventyConfig.addFilter('split', splitFilter);

	// Passthrough file copy.
    eleventyConfig.addPassthroughCopy({"src/assets/fonts": "assets/fonts"});
    eleventyConfig.addPassthroughCopy({"src/assets/images": "assets/images"});
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
