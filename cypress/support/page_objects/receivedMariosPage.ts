export class ReceivedMariosPage {
  checkListTitles(): void {
    cy.get('h4').should('have.text', 'RECEIVED MARIOS:');
  }

  clickBackButton(): void {
    cy.contains(' BACK ').click();
  }
}

export const onReceivedMariosPage = new ReceivedMariosPage();
