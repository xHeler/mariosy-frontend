export class AddMariosPage {
  checkSelectSectionExist() {
    cy.get('app-reaction-chip-list')
      .find('span.label')
      .should('have.text', 'Select Reaction:');
  }

  clickBackButton(): void {
    cy.contains(' BACK ').click();
  }

  clickSendButton(): void {
    cy.contains(' SEND ').click();
  }

  enterSelectSearchValue(query: string) {
    cy.get('.ng-select-container').find('input').type(query);
    cy.get('.ng-option-marked').click();
  }

  enterChipReactionValue(reaction: string) {
    cy.contains(' ' + reaction + ' ').click();
  }

  enterTitleValue(title: string) {
    cy.get('app-title-text-area').find('textarea').type(title);
  }

  enterCommentValue(comment: string) {
    cy.get('app-comment-text-area').find('textarea').type(comment);
  }
}

export const onAddMariosPage = new AddMariosPage();
