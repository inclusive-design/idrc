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
		/* Build a permalink using the title and language key. */
		permalink: generateProjectPermalink
	}
};
