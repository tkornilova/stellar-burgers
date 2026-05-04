import { rootReducer } from './store';

describe('rootReducer', () => {
  it('Корректная инициализация состояния', () => {
    const state = rootReducer(undefined, { type: '' });

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('burgerConstructor');
  });
});
