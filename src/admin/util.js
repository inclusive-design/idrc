import dateFilter from '../filters/date-filter';
import markdownFilter from '../filters/markdown-filter';
import w3DateFilter from '../filters/w3-date-filter';
import site from '../_data/site.json';

import slugify from 'slugify';

const slugFilter = value => {
	return slugify(value.toLowerCase());
};

export {
	dateFilter,
	markdownFilter,
	slugFilter,
	w3DateFilter,
	site
};
