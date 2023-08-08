/// <reference types="cypress" />

import '../support/commands';
import { onHomePage } from '../support/page_objects/homePage';
import { onAddMariosPage } from 'cypress/support/page_objects/addMariosPage';
import { onReceivedMariosPage } from 'cypress/support/page_objects/receivedMariosPage';
import { onSentMariosPage } from 'cypress/support/page_objects/sentMariosPage';

describe('Navigation', () => {
  beforeEach('open application, setup viewport', () => {
    cy.viewport(1920, 1080);
    cy.openHomePage();
  });

  it('Visit home page', () => {
    cy.openHomePage();
    onHomePage.checkListTitles();
    onHomePage.checkAddMariosButton();
  });

  it('Switch to add marios page', () => {
    onHomePage.clickAddMariosButton();
    onAddMariosPage.checkSelectSectionExist();
  });

  it('Switch to sent marios page', () => {
    onHomePage.clickSentMariosButton();
    onSentMariosPage.checkListTitles();
  });

  it('Switch to received marios page', () => {
    onHomePage.clickReceivedMariosButton();
    onReceivedMariosPage.checkListTitles();
  });
});
