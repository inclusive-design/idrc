const mix = require('laravel-mix');

mix.setPublicPath('./src/_includes/static')
	.js('src/js/idrc.js', 'src/_includes/static/js')
	.sass('src/scss/idrc.scss', 'src/_includes/static/css')
	.options({
		processCssUrls: false
	})
	.copyDirectory('src/fonts', 'src/_includes/static/fonts')
	.copyDirectory('src/images', 'src/_includes/static/images');
