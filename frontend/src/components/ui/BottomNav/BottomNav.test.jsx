import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import BottomNav from './BottomNav';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('BottomNav', () => {
  const mockT = (key) => key;

  beforeEach(() => {
    useTranslation.mockReturnValue({ t: mockT });
    usePathname.mockReturnValue('/');
  });

  it('does not render when user is not authenticated', () => {
    useSelector.mockReturnValue({ isAuthenticated: false, userType: null });
    
    const { container } = render(<BottomNav />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render on auth pages', () => {
    useSelector.mockReturnValue({ isAuthenticated: true, userType: 'farmer' });
    usePathname.mockReturnValue('/login');
    
    const { container } = render(<BottomNav />);
    expect(container.firstChild).toBeNull();
  });

  it('renders farmer navigation items', () => {
    useSelector.mockReturnValue({ isAuthenticated: true, userType: 'farmer' });
    usePathname.mockReturnValue('/farmer/dashboard');
    
    render(<BottomNav />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('nav.home')).toHaveAttribute('href', '/farmer/dashboard');
    expect(screen.getByLabelText('nav.market')).toHaveAttribute('href', '/market');
    expect(screen.getByLabelText('nav.profile')).toHaveAttribute('href', '/profile');
  });

  it('renders buyer navigation items', () => {
    useSelector.mockReturnValue({ isAuthenticated: true, userType: 'buyer' });
    usePathname.mockReturnValue('/buyer/dashboard');
    
    render(<BottomNav />);
    
    expect(screen.getByLabelText('nav.home')).toHaveAttribute('href', '/buyer/dashboard');
    expect(screen.getByLabelText('nav.market')).toHaveAttribute('href', '/market');
    expect(screen.getByLabelText('nav.profile')).toHaveAttribute('href', '/profile');
  });

  it('highlights active navigation item', () => {
    useSelector.mockReturnValue({ isAuthenticated: true, userType: 'farmer' });
    usePathname.mockReturnValue('/market');
    
    render(<BottomNav />);
    
    const marketLink = screen.getByLabelText('nav.market');
    expect(marketLink).toHaveAttribute('aria-current', 'page');
  });

  it('has correct accessibility attributes', () => {
    useSelector.mockReturnValue({ isAuthenticated: true, userType: 'farmer' });
    usePathname.mockReturnValue('/farmer/dashboard');
    
    render(<BottomNav />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });
});
