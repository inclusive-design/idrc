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
			label: 'IDRC / Home',
			url: `${baseUrl}/`,
			referenceUrl: 'https://idrc.ocadu.ca/',
			hideSelectors: [
				'#latest-news .section__content .entry'
			]
		},
		{
			label: 'IDRC / News',
			url: `${baseUrl}/news/`,
			referenceUrl: 'https://idrc.ocadu.ca/news/'
		},
		{
			label: 'IDRC / Ideas',
			url: `${baseUrl}/ideas/`,
			referenceUrl: 'https://idrc.ocadu.ca/ideas/'
		},
		{
			label: 'IDRC / Projects and tools',
			url: `${baseUrl}/projects-and-tools/`,
			referenceUrl: 'https://idrc.ocadu.ca/projects-and-tools/'
		},
		{
			label: 'IDRC / IDRC Consulting',
			url: `${baseUrl}/consulting/`,
			referenceUrl: 'https://idrc.ocadu.ca/consulting/'
		},
		{
			label: 'IDRC / Vision Technology Service',
			url: `${baseUrl}/vision-technology-service/`,
			referenceUrl: 'https://idrc.ocadu.ca/vision-technology-service/'
		}
	],
	paths: {
		bitmaps_reference: 'backstop_data/bitmaps_reference',
		bitmaps_test: 'backstop_data/bitmaps_test',
		engine_scripts: 'backstop_data/engine_scripts',
		html_report: 'backstop_data/html_report',
		ci_report: 'backstop_data/ci_report'
	},
	report: ['browser'],
	engine: 'puppeteer',
	engineOptions: {
		args: ['--no-sandbox']
	},
	asyncCaptureLimit: 5,
	asyncCompareLimit: 50,
	debug: false,
	debugWindow: false
};
