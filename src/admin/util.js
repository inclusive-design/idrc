import formatDateFilter from 'eleventy-plugin-fluid/src/filters/format-date-filter.js';
import isoDateFilter from 'eleventy-plugin-fluid/src/filters/iso-date-filter.js';
import limitFilter from 'eleventy-plugin-fluid/src/filters/limit-filter.js';
import splitFilter from '../filters/split-filter.js';
import site from '../_data/site.json';

const slugifyFilter = function (str, options = {}) {
	return require('@sindresorhus/slugify')(
		'' + str,
		Object.assign(
			{
				decamelize: false
			},
			options
		)
	);
};

const markdownFilter = function (value) {
	const md = require('markdown-it')({
		html: true
	});
	return md.render(value);
};

export {
	formatDateFilter,
	isoDateFilter,
	limitFilter,
	markdownFilter,
	slugifyFilter,
	splitFilter,
	site
};
