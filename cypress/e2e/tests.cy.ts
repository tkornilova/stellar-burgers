type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

describe('Тестирование stellar-burger', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'Bearer test-access-token');
    localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.visit('/');

    cy.wait('@getIngredients');

    cy.get('[data-testid="ingredient-card"]', { timeout: 10000 }).should(
      'have.length.greaterThan',
      0
    );
  });

  afterEach(() => {
    cy.clearCookies();
    cy.window().then((win) => win.localStorage.clear());
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

  describe('Тестирование отправки заказа:', () => {
    it('Создание заказа', () => {
      cy.fixture<{ data: TIngredient[] }>('ingredients.json').then((data) => {
        const bun = data.data.find((i: TIngredient) => i.type === 'bun');
        const main = data.data.find((i: TIngredient) => i.type === 'main');

        if (!bun || !main) throw new Error('Нет нужных ингредиентов');

        cy.contains(bun.name)
          .parents('li')
          .within(() => {
            cy.contains('Добавить').click();
          });

        cy.contains(main.name)
          .parents('li')
          .within(() => {
            cy.contains('Добавить').click();
          });
      });

      cy.get('[data-testid="order-button"]').click();

      cy.wait('@createOrder');

      cy.get('[data-testid="modal"]').contains('12345');

      cy.get('[data-testid="modal"] button').click();
      cy.get('[data-testid="modal"]').should('not.exist');

      cy.get('[data-testid="constructor"]')
        .should('contain.text', 'Выберите начинку')
        .and('contain.text', 'Выберите булки');
    });
  });
});
