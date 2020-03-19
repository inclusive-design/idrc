const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

require('laravel-mix-purgecss'); // eslint-disable-line import/no-unassigned-import

mix.setPublicPath('./src/_includes/static')
	.js('src/js/idrc.js', 'src/_includes/static/js')
	.sass('src/scss/idrc.scss', 'src/_includes/static/css')
	.options({
		processCssUrls: false,
		postCss: [tailwindcss('./tailwind.config.js')]
	})
	.purgeCss({
		content: ['src/_includes/**/*.njk']
	})
	.version()
	.copyDirectory('src/fonts', 'src/_includes/static/fonts')
	.copyDirectory('src/images', 'src/_includes/static/images');
