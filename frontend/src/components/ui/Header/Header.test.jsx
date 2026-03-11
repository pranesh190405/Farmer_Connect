import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import authReducer from '@/store/slices/authSlice';
import cartReducer from '@/store/slices/cartSlice';

jest.mock('next/link', () => {
  return function Link({ children, href }) {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.mock('@/components/ui/LanguageSwitcher/LanguageSwitcher', () => {
  return function LanguageSwitcher() {
    return <div data-testid="language-switcher">Language Switcher</div>;
  };
});

jest.mock('@/components/ui/VoiceSearch/VoiceSearch', () => {
  return function VoiceSearch({ onResult }) {
    return <div data-testid="voice-search">Voice Search</div>;
  };
});

jest.mock('@/components/ui/CartButton/CartButton', () => {
  return function CartButton() {
    return <div data-testid="cart-button">Cart Button</div>;
  };
});

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
    },
    preloadedState: initialState,
  });
};

describe('Header', () => {
  it('renders header with logo', () => {
    const store = createMockStore({
      auth: { user: null, isAuthenticated: false },
      cart: { items: [], isOpen: false },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText('app.name')).toBeInTheDocument();
    expect(screen.getByText('app.tagline')).toBeInTheDocument();
  });

  it('shows login button when user is not logged in', () => {
    const store = createMockStore({
      auth: { user: null, isAuthenticated: false },
      cart: { items: [], isOpen: false },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByRole('link', { name: /auth.login.loginButton/i })).toBeInTheDocument();
  });

  it('does not show login button when user is logged in', () => {
    const store = createMockStore({
      auth: { user: { id: '1', type: 'buyer' }, isAuthenticated: true },
      cart: { items: [], isOpen: false },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.queryByRole('link', { name: /auth.login.loginButton/i })).not.toBeInTheDocument();
  });

  it('shows cart button for buyer users', () => {
    const store = createMockStore({
      auth: { user: { id: '1', type: 'buyer' }, isAuthenticated: true },
      cart: { items: [], isOpen: false },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByTestId('cart-button')).toBeInTheDocument();
  });

  it('does not show cart button for non-buyer users', () => {
    const store = createMockStore({
      auth: { user: { id: '1', type: 'farmer' }, isAuthenticated: true },
      cart: { items: [], isOpen: false },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.queryByTestId('cart-button')).not.toBeInTheDocument();
  });

  it('shows voice search when showVoiceSearch is true', () => {
    const store = createMockStore({
      auth: { user: null, isAuthenticated: false },
      cart: { items: [], isOpen: false },
    });

    render(
      <Provider store={store}>
        <Header showVoiceSearch={true} />
      </Provider>
    );

    expect(screen.getByTestId('voice-search')).toBeInTheDocument();
  });

  it('does not show voice search by default', () => {
    const store = createMockStore({
      auth: { user: null, isAuthenticated: false },
      cart: { items: [], isOpen: false },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.queryByTestId('voice-search')).not.toBeInTheDocument();
  });

  it('always shows language switcher', () => {
    const store = createMockStore({
      auth: { user: null, isAuthenticated: false },
      cart: { items: [], isOpen: false },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });
});
