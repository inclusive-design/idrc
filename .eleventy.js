const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const eleventyRssPlugin = require('@11ty/eleventy-plugin-rss');
const i18n = require('eleventy-plugin-i18n-gettext');
const errorOverlay = require('eleventy-plugin-error-overlay');
const eleventyPWA = require('eleventy-plugin-pwa');
const markdownFilter = require('./src/filters/markdown.js');
const eleventySharp = require('eleventy-plugin-sharp');
const fluidPlugin = require('eleventy-plugin-fluid');
const fs = require('fs');

const htmlMinTransform = require('./src/transforms/html-min.js');
const parseTransform = require('./src/transforms/parse.js');
const youtubeShortcode = require('./src/shortcodes/youtube.js');
const imagePositionWithTextShortcode = require('./src/shortcodes/image-position-with-text.js');

const workboxOptions = {
	cacheId: 'idrc',
	swDest: './dist/sw.js',
	globPatterns: ['assets/fonts/*.{woff,woff2}', 'assets/images/*.{png,svg}'],
	globIgnores: ['admin/**/*', 'node_modules/**/*'],
	clientsClaim: true,
	skipWaiting: true
};

// Import data files
const siteConfig = require('./src/_data/config.json');

module.exports = eleventyConfig => {
	const now = new Date();

	// Collections.
	const livePosts = post => post.date <= now && !post.data.draft && !post.data.archived;

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

	Object.keys(siteConfig.languages).forEach(lang => {
		eleventyConfig.addCollection(`projects_${lang}`, collection => {
			let projects = [...collection.getFilteredByGlob(`src/projects/${lang}/*.md`).sort((a, b) => b.data.order - a.data.order)].reverse(),
				uniqueProjects = [];

			// Skip project subpages.
			projects.forEach(project => {
				if (!project.data.parentTitle || project.data.parentTitle === '') {
					uniqueProjects.push(project);
				}
			});

			return uniqueProjects;
		});
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

	eleventyConfig.addCollection('resources', collection => {
		return collection.getFilteredByGlob('src/resources/*.md');
	});

	eleventyConfig.setUseGitIgnore(false);

	// Plugins.
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(errorOverlay);
	eleventyConfig.addPlugin(eleventyPWA, workboxOptions);
	eleventyConfig.addPlugin(eleventyRssPlugin);
	eleventyConfig.addPlugin(fluidPlugin);
	eleventyConfig.addPlugin(eleventySharp({
		urlPath: '/media',
		outputDir: 'dist/media/'
	}));
	eleventyConfig.addPlugin(i18n, {
		localesDirectory: 'src/locales'
	});

	// Transforms.
	eleventyConfig.addTransform('htmlmin', htmlMinTransform);
	eleventyConfig.addTransform('parse', parseTransform);

	// Filters.
	eleventyConfig.addFilter('markdownFilter', markdownFilter);

	// Add shortcodes.
	eleventyConfig.addPairedShortcode('imagePositionWithText', imagePositionWithTextShortcode);
	eleventyConfig.addShortcode('youtube', youtubeShortcode);
	eleventyConfig.addShortcode('gettext_var', (locale, str) => {
		return i18n._(locale, str);
	});

	// Passthrough file copy.
	eleventyConfig.addPassthroughCopy({'src/assets/fonts': 'assets/fonts'});
	eleventyConfig.addPassthroughCopy({'src/assets/images': 'assets/images'});
	eleventyConfig.addPassthroughCopy({'src/assets/scripts/resources-utils.js': 'assets/scripts/resources-utils.js'});
	eleventyConfig.addPassthroughCopy({'src/assets/scripts/resources-dynamic-handler.js': 'assets/scripts/resources-dynamic-handler.js'});
	eleventyConfig.addPassthroughCopy({'src/media': 'media'});
	eleventyConfig.addPassthroughCopy('src/admin/config.yml');
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

	eleventyConfig.on('beforeBuild', () => {
		if (!siteConfig.languages[siteConfig.defaultLanguage]) {
			process.exitCode = 1;
			throw new Error(`The default language, ${siteConfig.defaultLanguage}, configured in src/_data/config.json is not one of your site's supported languages.`);
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
