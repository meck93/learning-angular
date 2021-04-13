describe('Messages Tests', () => {
  it('[/dashboard]: single message initially', () => {
    cy.visit('/dashboard');

    cy.get('h2')
      .contains('Messages')
      .parent()
      .children()
      // 2 tags: h2 + button + 1 message: div
      .should('have.length', 2 + 1);
  });

  it('[/heroes]: single message initially', () => {
    cy.visit('/heroes');

    cy.get('h2')
      .contains('Messages')
      .parent()
      .children()
      // 2 tags: h2 + button + 1 message: div
      .should('have.length', 2 + 1);
  });

  it('[/heroes/11]: single message initially', () => {
    cy.visit('/heroes/11');

    cy.get('h2')
      .contains('Messages')
      .parent()
      .children()
      // 2 tags: h2 + button + 1 message: div
      .should('have.length', 2 + 1);
  });

  it('[navigation]: check number of messages correct after navigating', () => {
    // navigate from /dashboard to /heroes
    cy.visit('/dashboard').get('a').contains('Heroes').click();

    // navigate from /heroes to /heroes/10
    cy.get('ul').contains('11 Dr Nice').click();

    // check that the number of messages is correct
    cy.get('h2')
      .contains('Messages')
      .parent()
      .children()
      // 2 tags: h2 + button + 3 messages: div
      .should('have.length', 2 + 3);
  });
});
