describe('Dashboard Route Tests', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('should display h1 and h2 titles', () => {
    cy.get('h1').contains('Welcome to Tour of Heroes!');
    cy.get('h2').contains('Top Heroes');
    cy.get('h2').contains('Messages');
  });
});
