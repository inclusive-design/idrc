const slugify = require('slugify');

module.exports = string => {
	return slugify(string, {
		replacement: '-',
		lower: true,
		strict: true
	});
};
