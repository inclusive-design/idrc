/* eslint-disable camelcase */

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

module.exports = {
	id: 'backstop_default',
	viewports: [
		{
			label: 'phone',
			width: 320,
			height: 480
		},
		{
			label: 'tablet',
			width: 768,
			height: 1024
		},
		{
			label: 'desktop',
			width: 1024,
			height: 768
		}
	],
	onBeforeScript: 'puppet/onBefore.js',
	onReadyScript: 'puppet/onReady.js',
	scenarios: [
		{
			label: 'Home',
			url: `${baseUrl}/`,
			referenceUrl: 'https://dev--idrc.netlify.app/',
			hideSelectors: [
				'#latest-news .section__content .entry'
			]
		},
		{
			label: 'News',
			url: `${baseUrl}/news/`,
			referenceUrl: 'https://dev--idrc.netlify.app/news/'
		},
		{
			label: 'Ideas',
			url: `${baseUrl}/ideas/`,
			referenceUrl: 'https://dev--idrc.netlify.app/ideas/'
		},
		{
			label: 'Projects and tools',
			url: `${baseUrl}/projects-and-tools/`,
			referenceUrl: 'https://dev--idrc.netlify.app/projects-and-tools/'
		},
		{
			label: 'IDRC Consulting',
			url: `${baseUrl}/consulting/`,
			referenceUrl: 'https://dev--idrc.netlify.app/consulting/'
		},
		{
			label: 'Vision Technology Service',
			url: `${baseUrl}/vision-technology-service/`,
			referenceUrl: 'https://dev--idrc.netlify.app/vision-technology-service/'
		}
	],
	paths: {
		bitmaps_reference: 'backstop_data/bitmaps_reference',
		bitmaps_test: 'backstop_data/bitmaps_test',
		engine_scripts: 'backstop_data/engine_scripts',
		html_report: 'backstop_data/html_report',
		ci_report: 'backstop_data/ci_report'
	},
	report: ['browser', 'json'],
	engine: 'puppeteer',
	engineOptions: {
		args: ['--no-sandbox']
	},
	asyncCaptureLimit: 5,
	asyncCompareLimit: 50,
	debug: false,
	debugWindow: false
};
