/* global describe, cy, it */

describe('Using backstopjs', () => {
	it('Generate report using Backstop JS', () => {
		cy.task('backstopTest', {folder: 'idrc'}, {timeout: 820000});
	});
});
