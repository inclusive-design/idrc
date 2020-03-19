module.exports = {
	extends: 'stylelint-config-standard-scss',
	plugins: [
		'stylelint-order'
	],
	rules: {
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['tailwind']
			}
		],
		'order/order': [
			'custom-properties',
			'declarations'
		],
		'order/properties-alphabetical-order': true
	}
};
