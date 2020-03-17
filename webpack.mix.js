const mix = require('laravel-mix');
require('laravel-mix-tailwind'); // eslint-disable-line import/no-unassigned-import
require('laravel-mix-purgecss'); // eslint-disable-line import/no-unassigned-import

mix.setPublicPath('./dist')
	.js('src/js/idrc.js', 'dist/js')
	.sass('src/scss/idrc.scss', 'dist/css')
	.tailwind()
	.purgeCss({
		content: ['src/_includes/**/*.njk']
	});
