'use strict';

const config = require('../_data/config.json');
const slugFilter = require('../../node_modules/@11ty/eleventy/src/Filters/Slugify.js');

module.exports = (data) => {
	/* If this page is a "stub" with no localized title, we assume it does not exist and prevent it from building. */
	if (!Object.prototype.hasOwnProperty.call(data, 'title')) {
		return false;
	}

	const locale = data.locale;
	const localeSlug = config.languages[locale].slug || locale;
	const slug = data.permalink || slugFilter(data.page.fileSlug);
	const root = (locale === config.defaultLanguage) ? '/projects/' : `/projects/${localeSlug}/`;

	return `${root}/${slug}/`;
};
