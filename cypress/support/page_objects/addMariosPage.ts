export class AddMariosPage {
  checkSelectSectionExist() {
    cy.get('app-reaction-chip-list')
      .find('span.label')
      .should('have.text', 'Select Reaction:');
  }

  clickBackButton(): void {
    cy.contains(' BACK ').click();
  }
}

export const onAddMariosPage = new AddMariosPage();
