'use strict';

const generateProjectPermalink = require('../utils/generateProjectPermalink.js');

module.exports = {
	layout: 'layouts/project.njk',
	headerBgColor: 'coral-500',
	headerBorderColor: 'coral-800',
	headerTextColor: 'black',
	eleventyComputed: {
		/* Set the translationKey, used for populating the language switcher, to the file slug. */
		translationKey: data => data.page.fileSlug,
		/* Configure navigation */
		eleventyNavigation: {
			key: data => data.title,
			parent: data => data.parentTitle || 'Projects',
			order: data => data.subPageOrder
		},
		/* Build a permalink using the title and language key if a custom permalink was not supplied. */
		permalink: generateProjectPermalink
	}
};
