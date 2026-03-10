import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AdminLayout from './AdminLayout';
import authReducer from '@/store/slices/authSlice';

const mockPush = jest.fn();
const mockPathname = '/admin/dashboard';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('next/link', () => {
  return function Link({ children, href, onClick }) {
    return <a href={href} onClick={onClick}>{children}</a>;
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

describe('AdminLayout', () => {
  let store;

  beforeEach(() => {
    store = createMockStore();
    mockPush.mockClear();
  });

  it('renders admin layout with sidebar', () => {
    render(
      <Provider store={store}>
        <AdminLayout>
          <div>Test Content</div>
        </AdminLayout>
      </Provider>
    );

    expect(screen.getByText('FarmerConnect')).toBeInTheDocument();
    expect(screen.getByText('Admin Portal')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(
      <Provider store={store}>
        <AdminLayout>
          <div>Content</div>
        </AdminLayout>
      </Provider>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Listings')).toBeInTheDocument();
    expect(screen.getByText('Complaints')).toBeInTheDocument();
  });

  it('renders logout button', () => {
    render(
      <Provider store={store}>
        <AdminLayout>
          <div>Content</div>
        </AdminLayout>
      </Provider>
    );

    expect(screen.getByText('common.logout')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Provider store={store}>
        <AdminLayout>
          <div data-testid="child-content">Child Component</div>
        </AdminLayout>
      </Provider>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('displays admin avatar', () => {
    render(
      <Provider store={store}>
        <AdminLayout>
          <div>Content</div>
        </AdminLayout>
      </Provider>
    );

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });
});
