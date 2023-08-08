export class AddMariosPage {
  checkSelectSectionExist() {
    cy.get('app-reaction-chip-list')
      .find('span.label')
      .should('have.text', 'Select Reaction:');
  }
}

export const onAddMariosPage = new AddMariosPage();
