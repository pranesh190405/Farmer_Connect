import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductForm from './ProductForm';
import api from '../../utils/api';

jest.mock('../../utils/api');

describe('ProductForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders add product form', () => {
    render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    expect(screen.getByText('Add New Product')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });

  it('renders edit product form with existing data', () => {
    const product = {
      _id: '123',
      name: 'Tomatoes',
      description: 'Fresh tomatoes',
      price: 50,
      quantity: 100,
      unit: 'kg',
      category: 'Vegetables',
      images: []
    };

    render(<ProductForm product={product} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    expect(screen.getByText('Edit Product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Tomatoes')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Fresh tomatoes')).toBeInTheDocument();
  });

  it('allows entering product details', async () => {
    const user = userEvent.setup();
    render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByLabelText(/name/i);
    const descInput = screen.getByLabelText(/description/i);
    const priceInput = screen.getByLabelText(/price/i);

    await user.type(nameInput, 'Carrots');
    await user.type(descInput, 'Fresh organic carrots');
    await user.type(priceInput, '40');

    expect(nameInput).toHaveValue('Carrots');
    expect(descInput).toHaveValue('Fresh organic carrots');
    expect(priceInput).toHaveValue(40);
  });

  it('allows selecting category', async () => {
    const user = userEvent.setup();
    render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const categorySelect = screen.getByLabelText(/category/i);
    await user.selectOptions(categorySelect, 'Fruits');

    expect(categorySelect).toHaveValue('Fruits');
  });

  it('submits new product successfully', async () => {
    const user = userEvent.setup();
    api.post.mockResolvedValue({ data: { success: true } });

    render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    await user.type(screen.getByLabelText(/name/i), 'Potatoes');
    await user.type(screen.getByLabelText(/description/i), 'Fresh potatoes');
    await user.type(screen.getByLabelText(/price/i), '30');
    await user.type(screen.getByLabelText(/quantity/i), '200');

    const submitButton = screen.getByRole('button', { name: /save product/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/products', expect.objectContaining({
        name: 'Potatoes',
        description: 'Fresh potatoes',
        price: '30',
        quantity: '200'
      }));
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('updates existing product successfully', async () => {
    const user = userEvent.setup();
    const product = {
      _id: '123',
      name: 'Tomatoes',
      description: 'Fresh tomatoes',
      price: 50,
      quantity: 100,
      unit: 'kg',
      category: 'Vegetables',
      images: []
    };
    api.put.mockResolvedValue({ data: { success: true } });

    render(<ProductForm product={product} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByLabelText(/name/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Cherry Tomatoes');

    const submitButton = screen.getByRole('button', { name: /save product/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.put).toHaveBeenCalledWith('/products/123', expect.objectContaining({
        name: 'Cherry Tomatoes'
      }));
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('displays error message on submit failure', async () => {
    const user = userEvent.setup();
    api.post.mockRejectedValue({
      response: { data: { message: 'Product already exists' } }
    });

    render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    await user.type(screen.getByLabelText(/name/i), 'Potatoes');
    await user.type(screen.getByLabelText(/description/i), 'Fresh potatoes');
    await user.type(screen.getByLabelText(/price/i), '30');
    await user.type(screen.getByLabelText(/quantity/i), '200');

    const submitButton = screen.getByRole('button', { name: /save product/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Product already exists')).toBeInTheDocument();
    });
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    api.post.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    await user.type(screen.getByLabelText(/name/i), 'Potatoes');
    await user.type(screen.getByLabelText(/description/i), 'Fresh potatoes');
    await user.type(screen.getByLabelText(/price/i), '30');
    await user.type(screen.getByLabelText(/quantity/i), '200');

    const submitButton = screen.getByRole('button', { name: /save product/i });
    await user.click(submitButton);

    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });

  it('renders all category options', () => {
    render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    expect(screen.getByRole('option', { name: 'Vegetables' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Fruits' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Grains' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Pulses' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Spices' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Flowers' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Other' })).toBeInTheDocument();
  });

  it('renders all unit options', () => {
    render(<ProductForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    expect(screen.getByRole('option', { name: 'kg' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'ton' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'piece' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'quintal' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'box' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'dozen' })).toBeInTheDocument();
  });
});
