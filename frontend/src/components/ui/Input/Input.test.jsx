import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Input label="Email" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input label="Email" error="Invalid email" />);
    const errorMessage = screen.getByRole('alert');
    
    expect(errorMessage).toHaveTextContent('Invalid email');
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('displays hint text', () => {
    render(<Input label="Password" hint="Must be 8 characters" />);
    expect(screen.getByText('Must be 8 characters')).toBeInTheDocument();
  });

  it('hides hint when error is present', () => {
    render(<Input label="Email" hint="Enter your email" error="Invalid email" />);
    
    expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('renders prefix element', () => {
    render(<Input label="Phone" prefix="+91" />);
    expect(screen.getByText('+91')).toBeInTheDocument();
  });

  it('renders suffix element', () => {
    render(<Input label="Search" suffix={<span>🔍</span>} />);
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input label="Name" />);
    
    const input = screen.getByLabelText(/name/i);
    await user.type(input, 'John Doe');
    
    expect(input).toHaveValue('John Doe');
  });

  it('disables input when disabled prop is true', () => {
    render(<Input label="Email" disabled />);
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
  });

  it('sets correct input type', () => {
    const { rerender } = render(<Input label="Email" type="email" />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');

    rerender(<Input label="Password" type="password" />);
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Input ref={ref} label="Test" />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('uses custom id when provided', () => {
    render(<Input id="custom-id" label="Test" />);
    expect(screen.getByLabelText(/test/i)).toHaveAttribute('id', 'custom-id');
  });

  it('links error message with aria-describedby', () => {
    render(<Input label="Email" error="Invalid" />);
    const input = screen.getByLabelText(/email/i);
    const errorId = input.getAttribute('aria-describedby');
    
    expect(errorId).toBeTruthy();
    expect(document.getElementById(errorId)).toHaveTextContent('Invalid');
  });
});
