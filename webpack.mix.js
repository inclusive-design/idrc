const mix = require('laravel-mix');

mix.setPublicPath('./src/_includes/static')
	.js('src/js/idrc.js', 'src/_includes/static/js');
