import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SessionTimeout from './SessionTimeout';
import useAuth from '@/hooks/useAuth';

jest.mock('@/hooks/useAuth');
jest.mock('@/components/ui/Modal', () => {
  return function Modal({ isOpen, children, title }) {
    if (!isOpen) return null;
    return (
      <div data-testid="modal">
        <h2>{title}</h2>
        {children}
      </div>
    );
  };
});
jest.mock('@/components/ui/Button', () => {
  return function Button({ children, onClick, variant, fullWidth }) {
    return (
      <button onClick={onClick} data-variant={variant} data-fullwidth={fullWidth?.toString()}>
        {children}
      </button>
    );
  };
});

describe('SessionTimeout', () => {
  const mockExtendSession = jest.fn();
  const mockHandleLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      showTimeoutWarning: false,
      timeRemaining: 0,
      extendSession: mockExtendSession,
      handleLogout: mockHandleLogout,
    });
  });

  it('does not render modal when showTimeoutWarning is false', () => {
    render(<SessionTimeout />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders modal when showTimeoutWarning is true', () => {
    useAuth.mockReturnValue({
      showTimeoutWarning: true,
      timeRemaining: 120,
      extendSession: mockExtendSession,
      handleLogout: mockHandleLogout,
    });

    render(<SessionTimeout />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Session Expiring')).toBeInTheDocument();
  });

  it('displays formatted time remaining', () => {
    useAuth.mockReturnValue({
      showTimeoutWarning: true,
      timeRemaining: 125,
      extendSession: mockExtendSession,
      handleLogout: mockHandleLogout,
    });

    render(<SessionTimeout />);
    expect(screen.getByText('2:05')).toBeInTheDocument();
  });

  it('formats time with leading zero for seconds', () => {
    useAuth.mockReturnValue({
      showTimeoutWarning: true,
      timeRemaining: 65,
      extendSession: mockExtendSession,
      handleLogout: mockHandleLogout,
    });

    render(<SessionTimeout />);
    expect(screen.getByText('1:05')).toBeInTheDocument();
  });

  it('calls extendSession when Stay Logged In button is clicked', async () => {
    const user = userEvent.setup();
    useAuth.mockReturnValue({
      showTimeoutWarning: true,
      timeRemaining: 60,
      extendSession: mockExtendSession,
      handleLogout: mockHandleLogout,
    });

    render(<SessionTimeout />);
    const stayButton = screen.getByRole('button', { name: /stay logged in/i });
    await user.click(stayButton);

    expect(mockExtendSession).toHaveBeenCalledTimes(1);
  });

  it('calls handleLogout when Log Out button is clicked', async () => {
    const user = userEvent.setup();
    useAuth.mockReturnValue({
      showTimeoutWarning: true,
      timeRemaining: 60,
      extendSession: mockExtendSession,
      handleLogout: mockHandleLogout,
    });

    render(<SessionTimeout />);
    const logoutButton = screen.getByRole('button', { name: /log out/i });
    await user.click(logoutButton);

    expect(mockHandleLogout).toHaveBeenCalledTimes(1);
  });

  it('displays warning message', () => {
    useAuth.mockReturnValue({
      showTimeoutWarning: true,
      timeRemaining: 60,
      extendSession: mockExtendSession,
      handleLogout: mockHandleLogout,
    });

    render(<SessionTimeout />);
    expect(screen.getByText('Your session will expire in')).toBeInTheDocument();
    expect(screen.getByText('Click below to stay logged in')).toBeInTheDocument();
  });
});
