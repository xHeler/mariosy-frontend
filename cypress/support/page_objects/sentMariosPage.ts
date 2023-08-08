export class SentMariosPage {
  checkListTitles(): void {
    cy.get('h4').should('have.text', 'SENT MARIOS:');
  }

  clickBackButton(): void {
    cy.contains(' BACK ').click();
  }
}

export const onSentMariosPage = new SentMariosPage();
