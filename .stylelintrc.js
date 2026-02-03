export default {
	extends: '@inclusive-design/stylelint-config',
	ignoreFiles: ['_site/**'],
	rules: {
		'custom-property-pattern': undefined,
		'no-descending-specificity': undefined,
		'property-no-deprecated': [true, {ignoreProperties: ['clip']}],
		'selector-class-pattern': undefined,
	},
};
