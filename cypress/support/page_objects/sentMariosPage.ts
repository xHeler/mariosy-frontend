export class SentMariosPage {
  checkListTitles(): void {
    cy.get('h4').should('have.text', 'SENT MARIOS:');
  }
}

export const onSentMariosPage = new SentMariosPage();
