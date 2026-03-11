import { render, screen } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import AuthGuard from './AuthGuard';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('AuthGuard', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush });
    usePathname.mockReturnValue('/dashboard');
  });

  it('renders children when authenticated', () => {
    useSelector.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    useSelector.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(mockPush).toHaveBeenCalledWith('/login');
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('shows nothing while loading', () => {
    useSelector.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });

    const { container } = render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(container.firstChild).toBeNull();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('does not redirect when loading', () => {
    useSelector.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('shows nothing when not authenticated', () => {
    useSelector.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    const { container } = render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(container.firstChild).toBeNull();
  });
});
