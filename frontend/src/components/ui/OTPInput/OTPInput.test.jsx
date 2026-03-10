import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OTPInput from './OTPInput';

describe('OTPInput', () => {
  it('renders correct number of input fields', () => {
    render(<OTPInput length={6} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('renders custom length', () => {
    render(<OTPInput length={4} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
  });

  it('accepts single digit input', async () => {
    const user = userEvent.setup();
    render(<OTPInput length={6} />);
    
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '5');
    
    expect(inputs[0]).toHaveValue('5');
  });

  it('auto-focuses next input after entering digit', async () => {
    const user = userEvent.setup();
    render(<OTPInput length={6} />);
    
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '1');
    
    expect(inputs[1]).toHaveFocus();
  });

  it('handles backspace navigation', async () => {
    const user = userEvent.setup();
    render(<OTPInput length={6} />);
    
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '1');
    await user.type(inputs[1], '2');
    
    // Focus on second input and press backspace
    inputs[1].focus();
    await user.keyboard('{Backspace}');
    
    // After backspace, the value should be cleared
    expect(inputs[1]).toHaveValue('');
  });

  it('moves to previous input on backspace when current is empty', async () => {
    const user = userEvent.setup();
    render(<OTPInput length={6} />);
    
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '1');
    await user.click(inputs[1]);
    await user.keyboard('{Backspace}');
    
    expect(inputs[0]).toHaveFocus();
  });

  it('handles arrow key navigation', async () => {
    const user = userEvent.setup();
    render(<OTPInput length={6} />);
    
    const inputs = screen.getAllByRole('textbox');
    inputs[2].focus();
    
    await user.keyboard('{ArrowLeft}');
    expect(inputs[1]).toHaveFocus();
    
    await user.keyboard('{ArrowRight}');
    expect(inputs[2]).toHaveFocus();
  });

  it('handles paste event', async () => {
    const user = userEvent.setup();
    render(<OTPInput length={6} />);
    
    const inputs = screen.getAllByRole('textbox');
    await user.click(inputs[0]);
    await user.paste('123456');
    
    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[2]).toHaveValue('3');
    expect(inputs[3]).toHaveValue('4');
    expect(inputs[4]).toHaveValue('5');
    expect(inputs[5]).toHaveValue('6');
  });

  it('calls onChange on each digit change', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    
    render(<OTPInput length={6} onChange={handleChange} />);
    
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '1');
    
    expect(handleChange).toHaveBeenCalledWith(expect.stringContaining('1'));
  });

  it('calls onComplete when all digits are filled', async () => {
    const handleComplete = jest.fn();
    const user = userEvent.setup();
    
    render(<OTPInput length={4} onComplete={handleComplete} />);
    
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '1234');
    
    expect(handleComplete).toHaveBeenCalledWith('1234');
  });

  it('displays error message', () => {
    render(<OTPInput error="Invalid OTP" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid OTP');
  });

  it('disables all inputs when disabled prop is true', () => {
    render(<OTPInput length={6} disabled />);
    const inputs = screen.getAllByRole('textbox');
    
    inputs.forEach(input => {
      expect(input).toBeDisabled();
    });
  });

  it('only accepts numeric input', async () => {
    const user = userEvent.setup();
    render(<OTPInput length={6} />);
    
    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], 'abc');
    
    expect(inputs[0]).toHaveValue('');
  });

  it('has correct accessibility attributes', () => {
    render(<OTPInput length={6} />);
    const inputs = screen.getAllByRole('textbox');
    
    expect(inputs[0]).toHaveAttribute('aria-label', 'Digit 1 of 6');
    expect(inputs[5]).toHaveAttribute('aria-label', 'Digit 6 of 6');
  });

  it('has correct input attributes', () => {
    render(<OTPInput length={6} />);
    const inputs = screen.getAllByRole('textbox');
    
    inputs.forEach(input => {
      expect(input).toHaveAttribute('inputMode', 'numeric');
      expect(input).toHaveAttribute('maxLength', '1');
    });
  });
});
