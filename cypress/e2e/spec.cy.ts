/// <reference types="cypress" />

describe('Mariosy E2E Tests', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  describe('Routing', () => {
    it('Redirect from home page to received marios', () => {
      cy.openHomePage();
      cy.contains('RECEIVED MARIOS:').click();
      cy.url().should('include', '/received-marios');
      //todo: should chech title
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
  });

  describe('Home Page', () => {
    it('Clicking and closing modal', () => {
      cy.visit('/');
      cy.contains('From:').click();

      cy.get('.mat-mdc-dialog-container').should('be.visible');

      cy.get('.container-fluid.dialog-container').find('button').click();
      cy.get('.mat-mdc-dialog-container').should('be.visible');
    });
  });

    
});
