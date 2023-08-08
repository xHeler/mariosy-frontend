export class ReceivedMariosPage {
  checkListTitles(): void {
    cy.get('h4').should('have.text', 'RECEIVED MARIOS:');
  }
}

export const onReceivedMariosPage = new ReceivedMariosPage();
