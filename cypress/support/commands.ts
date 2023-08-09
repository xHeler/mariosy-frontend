Cypress.Commands.add('openHomePage', () => {
  cy.visit('/');
});

Cypress.Commands.add('openAddMariosPage', () => {
  cy.visit('/add-marios');
});

Cypress.Commands.add('openReceivedMariosPage', () => {
  cy.visit('/received-marios');
});

Cypress.Commands.add('openSentMariosPage', () => {
  cy.visit('/sent-marios');
});
