#!/usr/bin/env node
const { build } = require('estrella');

build({
	entry: 'src/admin/previews.js',
	outfile: '_site/admin/previews.js',
	bundle: true,
	loader: {'.js': 'jsx'}
});
