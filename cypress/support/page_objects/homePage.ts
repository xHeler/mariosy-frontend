export class HomePage {
  checkListTitles(): void {
    cy.get('h4').should('have.text', 'LAST MARIOS:');
  }

  checkAddMariosButton(): void {
    cy.get('app-button').find('button').should('have.text', ' ADD MARIOS ');
  }

  checkAnyCardExist(): void {
    cy.get('.app-marios-card').should('exist');
  }

  checkFirstCardHaveAuthor(author: string): void {
    cy.get('.app-marios-card')
      .first()
      .find('span')
      .should('have.text', 'From: ' + author);
  }

  clickAddMariosButton() {
    cy.get('app-button').find('button').click();
  }

  clickReceivedMariosButton() {
    cy.contains('RECEIVED MARIOS:').click();
  }

  clickSentMariosButton() {
    cy.contains('SENT MARIOS:').click();
  }
}

export const onHomePage = new HomePage();
