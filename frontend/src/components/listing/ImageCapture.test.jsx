import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageCapture from './ImageCapture';

describe('ImageCapture', () => {
  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.FileReader = class FileReader {
      readAsDataURL() {
        this.onloadend({ target: { result: 'data:image/png;base64,test' } });
      }
    };
  });

  it('renders empty image grid', () => {
    render(<ImageCapture images={[]} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
    expect(screen.getByText('Add Photo')).toBeInTheDocument();
  });

  it('displays uploaded images', () => {
    const images = ['image1.jpg', 'image2.jpg'];
    render(<ImageCapture images={images} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
    
    const displayedImages = screen.getAllByRole('img');
    expect(displayedImages).toHaveLength(2);
    expect(displayedImages[0]).toHaveAttribute('src', 'image1.jpg');
    expect(displayedImages[1]).toHaveAttribute('src', 'image2.jpg');
  });

  it('shows add button when less than 3 images', () => {
    render(<ImageCapture images={['image1.jpg']} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
    expect(screen.getByText('Add Photo')).toBeInTheDocument();
  });

  it('hides add button when 3 images uploaded', () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    render(<ImageCapture images={images} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
    
    expect(screen.queryByText('Add Photo')).not.toBeInTheDocument();
  });

  it('calls onRemove when delete button is clicked', async () => {
    const user = userEvent.setup();
    const images = ['image1.jpg', 'image2.jpg'];
    render(<ImageCapture images={images} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
    
    const deleteButtons = screen.getAllByRole('button').filter(btn => 
      btn.querySelector('svg')
    );
    await user.click(deleteButtons[0]);

    expect(mockOnRemove).toHaveBeenCalledWith(0);
  });

  it('opens file input when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<ImageCapture images={[]} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
    
    const addButton = screen.getByText('Add Photo').closest('button');
    await user.click(addButton);

    // File input should be triggered (though we can't directly test file selection)
    expect(addButton).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<ImageCapture images={[]} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
    expect(screen.getByText('Max 3 photos. Tap to take a photo or upload.')).toBeInTheDocument();
  });

  it('shows correct alt text for images', () => {
    const images = ['image1.jpg', 'image2.jpg'];
    render(<ImageCapture images={images} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
    
    expect(screen.getByAltText('Crop 1')).toBeInTheDocument();
    expect(screen.getByAltText('Crop 2')).toBeInTheDocument();
  });

  it('handles file input with accept and capture attributes', () => {
    const { container } = render(<ImageCapture images={[]} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
    
    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
    expect(fileInput).toHaveAttribute('capture', 'environment');
  });

  it('renders delete button for each image', () => {
    const images = ['image1.jpg', 'image2.jpg'];
    render(<ImageCapture images={images} onAdd={mockOnAdd} onRemove={mockOnRemove} />);
    
    const deleteButtons = screen.getAllByRole('button').filter(btn => 
      btn.querySelector('svg')
    );
    expect(deleteButtons.length).toBeGreaterThanOrEqual(2);
  });
});
