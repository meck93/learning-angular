describe('heroes', () => {
  beforeEach(() => cy.visit('/'));

  it('should check that 10 heroes are rendered', () => {
    cy.get('ul.heroes').children().should('have.length', 10);
  });

  it('should select first hero and change its name', () => {
    cy.get('ul')
      .contains('11 Dr Nice')
      .click()
      .should('have.class', 'selected');

    cy.get('h2')
      .contains('DR NICE Details')
      .parent()
      .children()
      .should(($children) => {
        expect($children).to.contain('id: ');
        expect($children).to.contain('11');
        expect($children).to.contain('Hero Name:');
      });

    cy.get('h2')
      .contains('DR NICE Details')
      .parent()
      .children()
      .get('input')
      .should('have.id', 'hero-name')
      .clear()
      .type('Dr Not Nice');

    cy.get('h2').contains('DR NOT NICE Details');
    cy.get('ul').children().contains('11 Dr Not Nice');
  });
});
