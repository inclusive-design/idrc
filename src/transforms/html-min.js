const htmlmin = require('html-minifier');

module.exports = function (value, outputPath) {
	if (outputPath.includes('.html')) {
		const minified = htmlmin.minify(value, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true,
			minifyCSS: true
		});
		return minified;
	}

	return value;
};
