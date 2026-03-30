import {defineConfig} from 'eslint/config';
import eslintConfigInclusiveDesign from '@inclusive-design/eslint-config';

export default defineConfig([
	{
		extends: [eslintConfigInclusiveDesign],
		rules: {
			camelcase: ['error', {properties: 'never'}],
			'unicorn/prefer-top-level-await': 'off',
		},
	},
	{
		ignores: ['_site/**', 'backstop_data/**'],
	},
]);
