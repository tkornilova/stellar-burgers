import { ingredientsSlice, fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const initialState = {
    items: [],
    isLoading: false,
    errorMessage: null
  };

  const mockIngredients: TIngredient[] = [
    {
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
    }
  ];

  it('Устанавливает isLoading = true при pending', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.errorMessage).toBeNull();
  });

  it('Записывает ингредиенты при fulfilled', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
  });

  it('Записывает ошибку при rejected', () => {
    const errorMessage = 'Ошибка загрузки';

    const state = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.rejected(new Error(errorMessage), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.errorMessage).toBe(errorMessage);
  });
});
