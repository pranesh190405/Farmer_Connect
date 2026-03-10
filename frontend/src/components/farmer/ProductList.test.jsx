import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductList from './ProductList';
import api from '../../utils/api';

jest.mock('../../utils/api');
jest.mock('./ProductForm', () => {
  return function ProductForm({ product, onSuccess, onCancel }) {
    return (
      <div data-testid="product-form">
        <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
        <button onClick={onSuccess}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    );
  };
});

describe('ProductList', () => {
  const mockProducts = [
    {
      _id: '1',
      name: 'Tomatoes',
      description: 'Fresh red tomatoes',
      price: 50,
      quantity: 100,
      unit: 'kg',
      category: 'Vegetables'
    },
    {
      _id: '2',
      name: 'Apples',
      description: 'Sweet apples',
      price: 120,
      quantity: 50,
      unit: 'kg',
      category: 'Fruits'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    window.confirm = jest.fn();
    window.alert = jest.fn();
  });

  it('displays loading state initially', () => {
    api.get.mockImplementation(() => new Promise(() => {}));
    render(<ProductList />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('renders product list after loading', async () => {
    api.get.mockResolvedValue({ data: { data: mockProducts } });
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
      expect(screen.getByText('Apples')).toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    api.get.mockRejectedValue(new Error('Network error'));
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load products')).toBeInTheDocument();
    });
  });

  it('displays empty state when no products', async () => {
    api.get.mockResolvedValue({ data: { data: [] } });
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('No products listed yet.')).toBeInTheDocument();
    });
  });

  it('shows add product form when Add Product button is clicked', async () => {
    const user = userEvent.setup();
    api.get.mockResolvedValue({ data: { data: mockProducts } });
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
    });

    const addButton = screen.getByRole('button', { name: /add product/i });
    await user.click(addButton);

    expect(screen.getByTestId('product-form')).toBeInTheDocument();
    expect(screen.getByText('Add New Product')).toBeInTheDocument();
  });

  it('shows edit form when edit button is clicked', async () => {
    const user = userEvent.setup();
    api.get.mockResolvedValue({ data: { data: mockProducts } });
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
    });

    const editButtons = screen.getAllByTitle('Edit');
    await user.click(editButtons[0]);

    expect(screen.getByTestId('product-form')).toBeInTheDocument();
    expect(screen.getByText('Edit Product')).toBeInTheDocument();
  });

  it('deletes product when delete button is clicked and confirmed', async () => {
    const user = userEvent.setup();
    window.confirm.mockReturnValue(true);
    api.get.mockResolvedValue({ data: { data: mockProducts } });
    api.delete.mockResolvedValue({ data: { success: true } });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByTitle('Delete');
    await user.click(deleteButtons[0]);

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith('/products/1');
      expect(screen.queryByText('Tomatoes')).not.toBeInTheDocument();
    });
  });

  it('does not delete product when delete is cancelled', async () => {
    const user = userEvent.setup();
    window.confirm.mockReturnValue(false);
    api.get.mockResolvedValue({ data: { data: mockProducts } });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByTitle('Delete');
    await user.click(deleteButtons[0]);

    expect(api.delete).not.toHaveBeenCalled();
    expect(screen.getByText('Tomatoes')).toBeInTheDocument();
  });

  it('returns to list view after form cancel', async () => {
    const user = userEvent.setup();
    api.get.mockResolvedValue({ data: { data: mockProducts } });
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
    });

    const addButton = screen.getByRole('button', { name: /add product/i });
    await user.click(addButton);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(screen.queryByTestId('product-form')).not.toBeInTheDocument();
    expect(screen.getByText('Tomatoes')).toBeInTheDocument();
  });

  it('refreshes list after form save', async () => {
    const user = userEvent.setup();
    api.get.mockResolvedValue({ data: { data: mockProducts } });
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
    });

    const addButton = screen.getByRole('button', { name: /add product/i });
    await user.click(addButton);

    api.get.mockResolvedValue({ 
      data: { 
        data: [...mockProducts, { _id: '3', name: 'Carrots', description: 'Fresh carrots', price: 40, quantity: 80, unit: 'kg', category: 'Vegetables' }] 
      } 
    });

    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledTimes(2);
    });
  });

  it('displays product details correctly', async () => {
    api.get.mockResolvedValue({ data: { data: mockProducts } });
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Tomatoes')).toBeInTheDocument();
      expect(screen.getByText('Fresh red tomatoes')).toBeInTheDocument();
      expect(screen.getByText('₹50/kg')).toBeInTheDocument();
      expect(screen.getByText('Qty: 100 kg')).toBeInTheDocument();
      expect(screen.getByText('Vegetables')).toBeInTheDocument();
    });
  });
});
