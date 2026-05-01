describe('Тестирование stellar-burger', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('http://localhost:4000');

    cy.wait('@getIngredients');

    cy.get('[data-testid="ingredient-card"]', { timeout: 10000 }).should(
      'have.length.greaterThan',
      0
    );
  });

  describe('Добавление ингредиентов:', () => {
    it('Добавление любого ингредиента в конструктор', () => {
      cy.get('[data-testid="ingredient-card"]')
        .first()
        .parents('li')
        .within(() => {
          cy.contains('Добавить').click();
        });
      cy.get('[data-testid="constructor"]').should('not.be.empty');
    });
  });

  describe('Тестирование модального окна:', () => {
    const openModal = () => {
      cy.get('[data-testid="ingredient-card"]').first().click();
      cy.get('[data-testid="modal"]').should('be.visible');
    };

    it('Открытие модального окна', () => {
      openModal();
    });

    it('Закрытие модального окна по клику на крестик', () => {
      openModal();

      cy.get('[data-testid="modal"] button').click();
      cy.get('[data-testid="modal"]').should('not.exist');
    });

    it('Закрытие модального окна по клику на overlay', () => {
      openModal();

      cy.get('[data-testid="overlay"]').click({ force: true });
      cy.get('[data-testid="modal"]').should('not.exist');
    });
  });
});
