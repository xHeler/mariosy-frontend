describe('My First Test', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  // testing routing

  it('Redirect from home page to received marios', () => {
    cy.visit('/');
    cy.contains('RECEIVED MARIOS:').click();
    cy.url().should('include', '/received-marios');
  });

  it('Redirect from home page to sent marios', () => {
    cy.visit('/');
    cy.contains('SENT MARIOS:').click();
    cy.url().should('include', '/sent-marios');
  });

  it('Redirect from home page to add marios', () => {
    cy.visit('/');
    cy.contains('ADD MARIOS').click();
    cy.url().should('include', '/add-marios');
  });

  it('Redirect from add marios page to home', () => {
    cy.visit('/add-marios');
    cy.contains('BACK').click();
    cy.url().should('include', '/');
  });

  it('Redirect from sent marios page to home', () => {
    cy.visit('/sent-marios');
    cy.contains('BACK').click();
    cy.url().should('include', '/');
  });

  it('Redirect from received marios page to home', () => {
    cy.visit('/received-marios');
    cy.contains('BACK').click();
    cy.url().should('include', '/');
  });

  // testing home page
  it('Clicking and closing modal', () => {
    cy.visit('/');
    cy.contains('From:').click();

    cy.get('.mat-mdc-dialog-container').should('be.visible');

    cy.get('.container-fluid.dialog-container').find('button').click();
    cy.get('.mat-mdc-dialog-container').should('be.visible');
  });

  // testing add marios
  it('Add example marios', () => {
    const title = 'Add example marios';
    const message = 'Create example message';

    cy.visit('/add-marios');

    cy.get('.ng-select-container').find('input').type('Adam');
    cy.get('.ng-option-marked').click();

    cy.contains(' Good job! ').click();
    cy.get('app-title-text-area').find('textarea').type(title);

    cy.get('app-comment-text-area').find('textarea').type(message);

    cy.contains('SEND').click();
    cy.url().should('include', '/home');

    cy.contains(message).click();
    cy.get('.mat-mdc-dialog-container').should('be.visible');
  });
});
