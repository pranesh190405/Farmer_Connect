import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CartButton from './CartButton';
import cartReducer from '@/store/slices/cartSlice';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: initialState,
  });
};

describe('CartButton', () => {
  it('renders cart button', () => {
    const store = createMockStore({
      cart: { items: [], isOpen: false },
    });

    render(
      <Provider store={store}>
        <CartButton />
      </Provider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not show badge when cart is empty', () => {
    const store = createMockStore({
      cart: { items: [], isOpen: false },
    });

    render(
      <Provider store={store}>
        <CartButton />
      </Provider>
    );

    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
  });

  it('shows item count badge when cart has items', () => {
    const store = createMockStore({
      cart: {
        items: [
          { id: '1', quantity: 2 },
          { id: '2', quantity: 3 },
        ],
        isOpen: false,
      },
    });

    render(
      <Provider store={store}>
        <CartButton />
      </Provider>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows 9+ when item count exceeds 9', () => {
    const store = createMockStore({
      cart: {
        items: [
          { id: '1', quantity: 5 },
          { id: '2', quantity: 6 },
        ],
        isOpen: false,
      },
    });

    render(
      <Provider store={store}>
        <CartButton />
      </Provider>
    );

    expect(screen.getByText('9+')).toBeInTheDocument();
  });

  it('toggles cart when clicked', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      cart: { items: [], isOpen: false },
    });

    render(
      <Provider store={store}>
        <CartButton />
      </Provider>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    const state = store.getState();
    expect(state.cart.isOpen).toBe(true);
  });

  it('calculates total quantity correctly', () => {
    const store = createMockStore({
      cart: {
        items: [
          { id: '1', quantity: 1 },
          { id: '2', quantity: 2 },
          { id: '3', quantity: 3 },
        ],
        isOpen: false,
      },
    });

    render(
      <Provider store={store}>
        <CartButton />
      </Provider>
    );

    expect(screen.getByText('6')).toBeInTheDocument();
  });
});
