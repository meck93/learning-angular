describe('Angular Tour of Heroes E2E Testing', () => {
  describe('Initial Smoke Test', () => {
    it('should display h1 and h2 titles', () => {
      cy.visit('/dashboard');
      cy.get('h1').contains('Welcome to Tour of Heroes!');
      cy.get('h2').contains('Top Heroes');
      cy.contains('Messages');
    });
  });

  // HEROES TESTS
  describe('Heroes Testing', () => {
    it('should check that 10 heroes are rendered', () => {
      cy.visit('/heroes');
      cy.get('ul.heroes').children().should('have.length', 10);
    });

    it('should select first hero and display detail component', () => {
      // perform login
      cy.visit('/heroes').get('button').contains('Login').click();

      // navigate to correct route
      cy.get('ul')
        .contains('11 Dr Nice')
        .click()
        .location()
        .should((loc) => {
          expect(loc.pathname).to.eq('/heroes/11');
        });

      cy.contains('DR NICE Details')
        .parent()
        .children()
        .should(($children) => {
          expect($children).to.contain('id: ');
          expect($children).to.contain('11');
          expect($children).to.contain('Hero Name:');
        });
    });

    it('should modify the name of a hero', () => {
      // perform login
      cy.visit('/heroes').get('button').contains('Login').click();

      // navigate to correct route
      cy.get('ul')
        .contains('11 Dr Nice')
        .click()
        .location()
        .should((loc) => {
          expect(loc.pathname).to.eq('/heroes/11');
        });

      cy.contains('DR NICE Details')
        .parent()
        .children()
        .get('input')
        .should('have.id', 'hero-name')
        .clear()
        .type('Dr Not Nice');

      cy.get('h2').contains('DR NOT NICE Details');
    });

    it('should add a new hero and remove another', () => {
      cy.visit('/heroes');

      // add a new hero
      cy.get('input').clear().type('Dr Not Nice');
      cy.get('button').contains('Add hero').click();
      cy.get('ul.heroes').children().should('have.length', 11);

      // remove another hero
      cy.get('li').contains('Dr Nice').parent().children('button').click();
      cy.get('ul.heroes').children().should('have.length', 10);
    });
  });

  // MESSAGES TESTS
  describe('Messages Testing', () => {
    it('[/dashboard]: single message initially', () => {
      cy.visit('/dashboard');

      cy.contains('Messages')
        .parent()
        .children()
        // 3 tags: h2 + 2x button + 1 message: div
        .should('have.length', 3 + 1);

      // remove all messages
      cy.get('button').contains('Clear Messages').click();
      cy.contains('Messages').should('not.exist');
    });

    it('[/heroes]: single message initially', () => {
      cy.visit('/heroes');

      cy.contains('Messages')
        .parent()
        .children()
        // 3 tags: h2 + 2x button + 1 message: div
        .should('have.length', 3 + 1);

      // remove all messages
      cy.get('button').contains('Clear Messages').click();
      cy.contains('Messages').should('not.exist');
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

  // SEARCH BAR TESTING
  describe('Search Testing', () => {
    it('[search]: find hero by name', () => {
      // perform login
      cy.visit('/dashboard').get('button').contains('Login').click();

      // search for hero: "Dr Nice"
      cy.get('label')
        .contains('Hero Search')
        .parent()
        .children()
        .get('input')
        .type('Dr Nice');

      // find one result for hero: "Dr Nice"
      // navigate to hero
      cy.get('label')
        .contains('Hero Search')
        .parent()
        .children()
        .get('ul')
        .children()
        .contains('a', 'Dr Nice')
        .click();

      // check that we're now on the /heroes/11 detail page
      cy.contains('DR NICE Details');
    });
  });

  // FORMS Testing
  describe('Contact Form Testing', () => {
    it('[/contact]: submit form', () => {
      // go to contact form
      cy.visit('/contact');

      // enter username = Moritz
      cy.get('label')
        .contains('Username')
        .parent()
        .children()
        .get('input')
        .type('Tester');

      // enter email = Moritz
      cy.get('label')
        .contains('Email')
        .parent()
        .children()
        .get('input')
        .type('test@test.ch');

      // enter textarea = Jimmy
      cy.get('textarea').type('Jimmy');

      // submit the form
      cy.get('button').click();

      // success should appear
      cy.get('p').contains('Success!');
    });
  });
});
