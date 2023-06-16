#!/usr/bin/env node
const { build } = require('estrella');

build({
	entry: 'src/admin/previews.js',
	outfile: 'dist/admin/previews.js',
	bundle: true,
	loader: {'.js': 'jsx'}
});
