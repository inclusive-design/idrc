import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import eleventyImage, {eleventyImageTransformPlugin} from '@11ty/eleventy-img';
import {feedPlugin} from '@11ty/eleventy-plugin-rss';
import MarkdownIt from 'markdown-it';

import fluidPlugin from 'eleventy-plugin-fluid';
import parseTransform from './src/_transforms/parse.js';
import siteData from './src/_data/site.json' with {type: 'json'};

/**
 * @param {object} eleventyConfig The Eleventy configuration object.
 * @returns {object} Eleventy configuration.
 */
export default function eleventy(eleventyConfig) {
	const now = new Date();

	// Collections.
	const livePosts = post =>
		post.date <= now && !post.data.draft && !post.data.archived;

	eleventyConfig.addCollection('people', collection => collection
		.getFilteredByGlob('src/collections/people/*.md')
		.toSorted((a, b) => {
			const nameA = a.data.title;
			const nameB = b.data.title;

			if (nameA < nameB) {
				return -1;
			}

			if (nameA > nameB) {
				return 1;
			}

			return 0;
		}));

	for (const lang of ['en-CA', 'fr-CA']) {
		eleventyConfig.addCollection(`projects_${lang}`, collection => {
			const projects = [
				...collection.getFilteredByGlob(`src/collections/projects/${lang}/*.md`),
			];

			return projects.toSorted((a, b) => b.data.order - a.data.order).toReversed();
		});

		eleventyConfig.addCollection(`projectSubpages_${lang}`, collection => {
			const projectSubpages = [
				...collection.getFilteredByGlob(`src/collections/project-subpages/${lang}/*.md`),
			];

			return projectSubpages
				.toSorted((a, b) =>
					Number.parseInt(b.data.order, 10) - Number.parseInt(a.data.order, 10))
				.toReversed();
		});
	}

	eleventyConfig.addCollection('news', collection =>
		collection
			.getFilteredByGlob('./src/collections/news/*.md')
			.filter(post => livePosts(post))
			.toReversed());

	eleventyConfig.addCollection('ideas', collection =>
		collection
			.getFilteredByGlob('./src/collections/ideas/*.md')
			.filter(post => livePosts(post))
			.toReversed());

	eleventyConfig.addCollection('postFeed', collection =>
		collection
			.getFilteredByGlob(['./src/collections/news/*.md', './src/ideas/*.md'])
			.filter(post => livePosts(post))
			.toReversed()
			.slice(0, 10));

	eleventyConfig.addCollection('resources', collection => collection.getFilteredByGlob('src/collections/resources/*.md'));

	/** TODO: Swap this for renderContent("md") once https://github.com/11ty/eleventy/issues/3665 is addressed */
	eleventyConfig.addFilter('markdownFilter', value => {
		const md = new MarkdownIt({
			html: true,
			linkify: true,
		});

		return md.render(value);
	});

	eleventyConfig.addFilter('findByKey', (navItems, value, lang) => navItems.filter(item => {
		if (lang) {
			return item.key === value && item.lang === lang;
		}

		return item.key === value;
	}));

	eleventyConfig.addShortcode('ideaImage', async (source, alt) => {
		const html = await eleventyImage(`src/${source}`, {
			formats: ['avif', 'webp', 'jpeg'],
			returnType: 'html',
			outputDir: '_site/img/',
			htmlOptions: {
				imgAttributes: {
					alt,
					class: 'thumbnail',
					'eleventy:ignore': '',
					loading: 'lazy',
					decoding: 'async',
				},
			},
			transform(sharp) {
				sharp.resize(570, 382, {fit: 'cover'});
			},
		});

		return html;
	});

	// Plugins.
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		formats: ['avif', 'webp', 'jpeg'],
		htmlOptions: {
			imgAttributes: {
				loading: 'lazy',
				decoding: 'async',
			},
		},
	});
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(feedPlugin, {
		type: 'atom',
		outputPath: '/feed.xml',
		collection: {
			name: 'postFeed',
			limit: 10,
		},
		metadata: {
			language: 'en-CA',
			title: siteData.title,
			base: `${siteData.url}/`,
			author: {
				name: siteData.name,
				email: siteData.email,
			},
		},
	});
	eleventyConfig.addPlugin(fluidPlugin, {
		defaultLanguage: 'en-CA',
		supportedLanguages: {
			'en-CA': {
				slug: 'en',
				name: 'English',
			},
			'fr-CA': {
				slug: 'fr',
				name: 'Français',
				dir: 'ltr',
				uioSlug: 'fr',
			},
		},
		js: {
			target: 'es2022',
		},
	});

	// Transforms.
	eleventyConfig.addTransform('parse', parseTransform);

	// Passthrough file copy.
	eleventyConfig.addPassthroughCopy({'src/assets/fonts': 'assets/fonts'});
	eleventyConfig.addPassthroughCopy({'src/assets/images': 'assets/images'});
	eleventyConfig.addPassthroughCopy({'src/media': 'media'});
	eleventyConfig.addPassthroughCopy('src/admin/config.yml');
	eleventyConfig.addPassthroughCopy('_redirects');

	return {
		dir: {
			input: 'src',
		},
		passthroughFileCopy: true,
		markdownTemplateEngine: 'njk',
	};
}
