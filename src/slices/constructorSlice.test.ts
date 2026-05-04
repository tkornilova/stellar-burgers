import {
  constructorSlice,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';
import { TConstructorIngredient } from '@utils-types';

const bun: TConstructorIngredient = {
  _id: '1',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  id: 'bun-id'
};

const ingredient1: TConstructorIngredient = {
  _id: '2',
  name: 'Говяжий метеорит',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  id: 'ing-1'
};

const ingredient2: TConstructorIngredient = {
  ...ingredient1,
  id: 'ing-2',
  name: 'Соус Spicy-X'
};

describe('constructorSlice reducer', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    }
  };

  it('Добавляет булку', () => {
    const state = constructorSlice.reducer(initialState, addIngredient(bun));

    expect(state.constructorItems.bun).toEqual(bun);
  });

  it('Добавляет начинку', () => {
    const state = constructorSlice.reducer(
      initialState,
      addIngredient(ingredient1)
    );

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual(ingredient1);
  });

  it('Удаляет ингредиент', () => {
    const stateWithItems = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      }
    };

    const state = constructorSlice.reducer(
      stateWithItems,
      removeIngredient('ing-1')
    );

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0].id).toBe('ing-2');
  });

  it('Меняет порядок ингредиентов', () => {
    const stateWithItems = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2]
      }
    };

    const state = constructorSlice.reducer(
      stateWithItems,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.constructorItems.ingredients[0].id).toBe('ing-2');
    expect(state.constructorItems.ingredients[1].id).toBe('ing-1');
  });

  // it('Очищает конструктор', () => {
  //   const stateWithItems = {
  //     constructorItems: {
  //       bun,
  //       ingredients: [ingredient1]
  //     }
  //   };

  //   const state = constructorSlice.reducer(stateWithItems, clearConstructor());

  //   expect(state.constructorItems.bun).toBeNull();
  //   expect(state.constructorItems.ingredients).toHaveLength(0);
  // });
});
