import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cart from './Cart';
import cartReducer, { closeCart, removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import authReducer from '@/store/slices/authSlice';

jest.mock('next/link', () => {
  return function Link({ children, href, onClick }) {
    return <a href={href} onClick={onClick}>{children}</a>;
  };
});

jest.mock('next/image', () => {
  return function Image({ src, alt }) {
    return <img src={src} alt={alt} />;
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
    },
    preloadedState: initialState,
  });
};

describe('Cart', () => {
  it('does not render when cart is closed', () => {
    const store = createMockStore({
      cart: { items: [], isOpen: false },
      auth: { user: null, isAuthenticated: false },
    });

    const { container } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders empty cart message when no items', () => {
    const store = createMockStore({
      cart: { items: [], isOpen: true },
      auth: { user: null, isAuthenticated: false },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText('cart.empty')).toBeInTheDocument();
    expect(screen.getByText('cart.emptyDesc')).toBeInTheDocument();
  });

  it('renders cart items', () => {
    const store = createMockStore({
      cart: {
        items: [
          { id: '1', name: 'Tomatoes', price: '₹50/kg', quantity: 2, farmer: 'John Doe', image: '/test.jpg' },
          { id: '2', name: 'Potatoes', price: '₹30/kg', quantity: 5, farmer: 'Jane Smith', image: '/test2.jpg' },
        ],
        isOpen: true,
      },
      auth: { user: { aadharVerified: true }, isAuthenticated: true },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText('Tomatoes')).toBeInTheDocument();
    expect(screen.getByText('Potatoes')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('calculates total correctly', () => {
    const store = createMockStore({
      cart: {
        items: [
          { id: '1', name: 'Tomatoes', price: '₹50/kg', quantity: 2, farmer: 'John Doe' },
          { id: '2', name: 'Potatoes', price: '₹30/kg', quantity: 5, farmer: 'Jane Smith' },
        ],
        isOpen: true,
      },
      auth: { user: { aadharVerified: true }, isAuthenticated: true },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText('₹250.00')).toBeInTheDocument();
  });

  it('shows verification warning when user is not verified', () => {
    const store = createMockStore({
      cart: {
        items: [{ id: '1', name: 'Tomatoes', price: '₹50/kg', quantity: 2, farmer: 'John Doe' }],
        isOpen: true,
      },
      auth: { user: { aadharVerified: false }, isAuthenticated: true },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText('cart.verificationRequired')).toBeInTheDocument();
    expect(screen.getByText('cart.pendingVerification')).toBeInTheDocument();
  });

  it('disables checkout button when user is not verified', () => {
    const store = createMockStore({
      cart: {
        items: [{ id: '1', name: 'Tomatoes', price: '₹50/kg', quantity: 2, farmer: 'John Doe' }],
        isOpen: true,
      },
      auth: { user: { aadharVerified: false }, isAuthenticated: true },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const checkoutButton = screen.getByRole('button', { name: /cart.checkout/i });
    expect(checkoutButton).toBeDisabled();
  });

  it('enables checkout button when user is verified', () => {
    const store = createMockStore({
      cart: {
        items: [{ id: '1', name: 'Tomatoes', price: '₹50/kg', quantity: 2, farmer: 'John Doe' }],
        isOpen: true,
      },
      auth: { user: { aadharVerified: true }, isAuthenticated: true },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const checkoutLink = screen.getByRole('link', { name: /cart.checkout/i });
    expect(checkoutLink).toHaveAttribute('href', '/checkout');
  });

  it('closes cart when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      cart: { items: [], isOpen: true },
      auth: { user: null, isAuthenticated: false },
    });

    const { container } = render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const backdrop = container.querySelector('.fixed.inset-0.bg-black\\/50');
    await user.click(backdrop);

    const state = store.getState();
    expect(state.cart.isOpen).toBe(false);
  });

  it('displays quantity controls for each item', () => {
    const store = createMockStore({
      cart: {
        items: [{ id: '1', name: 'Tomatoes', price: '₹50/kg', quantity: 2, farmer: 'John Doe' }],
        isOpen: true,
      },
      auth: { user: { aadharVerified: true }, isAuthenticated: true },
    });

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText('2 kg')).toBeInTheDocument();
  });
});
