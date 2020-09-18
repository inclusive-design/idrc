describe('Mobile menu', () => {
  it('Mobile menu expands when clicked', () => {
	cy.visit('http://localhost:3000')

	// Get an input, type into it and verify that the value has been updated
	cy.get('.menu-toggle')
	    .click()
	    .should('have.attr', 'aria-expanded', 'true')
  })
})