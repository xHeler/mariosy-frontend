describe('My First Test', () => {
  it('Visits the initial project page', () => {
    //cy.viewport()
    cy.visit('/')
    cy.contains('app is running!')
  })
})
