export class SentMariosPage {
  checkListTitles(): void {
    cy.get('h4').should('have.text', 'SENT MARIOS:');
  }

  clickBackButton(): void {
    cy.contains(' BACK ').click();
  }

  checkFirstCardHaveAuthor(author: string): void {
    cy.get('app-marios-card')
      .first()
      .find('span.marios-card-author')
      .should('have.text', ' To: ' + author + ' ');
  }
}

export const onSentMariosPage = new SentMariosPage();
