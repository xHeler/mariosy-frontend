/// <reference types="cypress" />

import '../support/commands';
import { onAddMariosPage } from 'cypress/support/page_objects/addMariosPage';
import { onSentMariosPage } from 'cypress/support/page_objects/sentMariosPage';

describe('Add marios', () => {
  beforeEach('open application on add marios, setup viewport', () => {
    cy.viewport(1920, 1080);
    cy.openAddMariosPage();
  });

  it('Add marios', () => {
    const firstName = 'Adam';
    const lastName = 'Wartt';
    const reaction = 'Good job!';
    const title = 'Test title';
    const comment = 'Test comment';

    onAddMariosPage.enterSelectSearchValue(firstName);
    onAddMariosPage.enterChipReactionValue(reaction);
    onAddMariosPage.enterTitleValue(title);
    onAddMariosPage.enterCommentValue(comment);
    onAddMariosPage.clickSendButton();

    cy.openSentMariosPage();
    onSentMariosPage.checkFirstCardHaveAuthor(firstName + ' ' + lastName);
  });
});
