const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

require('laravel-mix-purgecss'); // eslint-disable-line import/no-unassigned-import

const shadowColors = [
	'indigo-500',
	'red-500',
	'yellow-500'
];

const colors = [
	'black',
	'white',
	'indigo-100',
	'indigo-200',
	'indigo-500',
	'indigo-900',
	'logo',
	'blue-500',
	'red-500',
	'red-900',
	'yellow-200',
	'yellow-500'
];

const whitelist = [
	'#what-is-inclusive-design'
];

shadowColors.forEach(color => {
	whitelist.push(`shadow-${color}`);
});

colors.forEach(color => {
	whitelist.push(`bg-${color}`);
	whitelist.push(`border-${color}`);
	whitelist.push(`text-${color}`);
});

mix.setPublicPath('./src/_includes/static')
	.js('src/js/idrc.js', 'src/_includes/static/js')
	.sass('src/scss/idrc.scss', 'src/_includes/static/css')
	.options({
		processCssUrls: false,
		postCss: [tailwindcss('./tailwind.config.js')]
	})
	.copyDirectory('src/fonts', 'src/_includes/static/fonts')
	.copyDirectory('src/images', 'src/_includes/static/images');

if (mix.inProduction()) {
	mix.purgeCss({
		content: ['./src/_includes/**/*.njk', './src/_includes/svg/*.svg'],
		whitelist
	});
}
