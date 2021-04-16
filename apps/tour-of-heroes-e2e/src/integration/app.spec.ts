describe('Dashboard Route Tests', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('should display h1 and h2 titles', () => {
    cy.get('h1').contains('Welcome to Tour of Heroes!');
    cy.get('h2').contains('Top Heroes');
    cy.get('h2').contains('Messages');
  });

  // HEROES TESTS
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

  // MESSAGES TESTS
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
