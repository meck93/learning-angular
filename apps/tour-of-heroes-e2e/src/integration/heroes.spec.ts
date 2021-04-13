describe('Heroes Route Tests', () => {
  it('should check that 10 heroes are rendered', () => {
    cy.visit('/heroes');

    cy.get('ul.heroes').children().should('have.length', 10);
  });

  it('should select first hero and display detail component', () => {
    cy.visit('/heroes');

    cy.get('ul')
      .contains('11 Dr Nice')
      .click()
      .location()
      .should((loc) => {
        expect(loc.pathname).to.eq('/heroes/11');
      });

    cy.get('h2')
      .contains('DR NICE Details')
      .parent()
      .children()
      .should(($children) => {
        expect($children).to.contain('id: ');
        expect($children).to.contain('11');
        expect($children).to.contain('Hero Name:');
      });
  });

  it('should modify the name of a hero', () => {
    cy.visit('/heroes/11');

    cy.get('h2')
      .contains('DR NICE Details')
      .parent()
      .children()
      .get('input')
      .should('have.id', 'hero-name')
      .clear()
      .type('Dr Not Nice');

    cy.get('h2').contains('DR NOT NICE Details');
  });
});
