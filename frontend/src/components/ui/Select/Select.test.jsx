import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from './Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Select', () => {
  it('renders with label', () => {
    render(<Select label="Choose option" options={mockOptions} />);
    expect(screen.getByLabelText(/choose option/i)).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Select label="Category" required options={mockOptions} />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select label="Select" options={mockOptions} />);
    
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
  });

  it('displays placeholder', () => {
    render(<Select label="Select" placeholder="Pick one" options={mockOptions} />);
    expect(screen.getByRole('option', { name: 'Pick one' })).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Select label="Category" error="Required field" options={mockOptions} />);
    const errorMessage = screen.getByRole('alert');
    
    expect(errorMessage).toHaveTextContent('Required field');
    expect(screen.getByLabelText(/category/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('displays hint text', () => {
    render(<Select label="Category" hint="Choose a category" options={mockOptions} />);
    expect(screen.getByText('Choose a category')).toBeInTheDocument();
  });

  it('hides hint when error is present', () => {
    render(
      <Select 
        label="Category" 
        hint="Choose a category" 
        error="Required" 
        options={mockOptions} 
      />
    );
    
    expect(screen.queryByText('Choose a category')).not.toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('handles selection change', async () => {
    const user = userEvent.setup();
    render(<Select label="Category" options={mockOptions} />);
    
    const select = screen.getByLabelText(/category/i);
    await user.selectOptions(select, 'option2');
    
    expect(select).toHaveValue('option2');
  });

  it('disables select when disabled prop is true', () => {
    render(<Select label="Category" disabled options={mockOptions} />);
    expect(screen.getByLabelText(/category/i)).toBeDisabled();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Select ref={ref} label="Test" options={mockOptions} />);
    
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('uses custom id when provided', () => {
    render(<Select id="custom-select" label="Test" options={mockOptions} />);
    expect(screen.getByLabelText(/test/i)).toHaveAttribute('id', 'custom-select');
  });

  it('links error message with aria-describedby', () => {
    render(<Select label="Category" error="Invalid" options={mockOptions} />);
    const select = screen.getByLabelText(/category/i);
    const errorId = select.getAttribute('aria-describedby');
    
    expect(errorId).toBeTruthy();
    expect(document.getElementById(errorId)).toHaveTextContent('Invalid');
  });
});
