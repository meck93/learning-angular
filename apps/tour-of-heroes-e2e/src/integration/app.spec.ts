describe('tour-of-heroes', () => {
  beforeEach(() => cy.visit('/'));

  it('should display h1 and h2 titles', () => {
    cy.get('h1').contains('Welcome to Tour of Heroes!');
    cy.get('h2').contains('My Heroes');
  });
});
