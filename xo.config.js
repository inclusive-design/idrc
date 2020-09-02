module.exports = {
	settings: {
		react: {
			version: '16'
		}
	},
	rules: {
		'react/no-danger': 0
	},
	extends: 'xo-react',
	ignores: ['!.eleventy.js', 'backstop_data/engine_scripts/**/*.js']
};
