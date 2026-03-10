import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(<Modal isOpen={false}>Content</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(<Modal isOpen={true}>Content</Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('displays title', () => {
    render(<Modal isOpen={true} title="Test Modal">Content</Modal>);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('displays children content', () => {
    render(<Modal isOpen={true}>Test Content</Modal>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('shows close button by default', () => {
    render(<Modal isOpen={true} onClose={jest.fn()}>Content</Modal>);
    expect(screen.getByRole('button', { name: /close modal/i })).toBeInTheDocument();
  });

  it('hides close button when showCloseButton is false', () => {
    render(<Modal isOpen={true} showCloseButton={false}>Content</Modal>);
    expect(screen.queryByRole('button', { name: /close modal/i })).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = jest.fn();
    const user = userEvent.setup();
    
    render(<Modal isOpen={true} onClose={handleClose}>Content</Modal>);
    await user.click(screen.getByRole('button', { name: /close modal/i }));
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', async () => {
    const handleClose = jest.fn();
    const user = userEvent.setup();
    
    render(<Modal isOpen={true} onClose={handleClose}>Content</Modal>);
    const backdrop = screen.getByRole('dialog');
    await user.click(backdrop);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when modal content is clicked', async () => {
    const handleClose = jest.fn();
    const user = userEvent.setup();
    
    render(<Modal isOpen={true} onClose={handleClose}>Content</Modal>);
    await user.click(screen.getByText('Content'));
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', async () => {
    const handleClose = jest.fn();
    
    render(<Modal isOpen={true} onClose={handleClose}>Content</Modal>);
    const dialog = screen.getByRole('dialog');
    
    // Simulate Escape key press on the dialog
    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    dialog.dispatchEvent(event);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('applies size classes', () => {
    const { rerender } = render(<Modal isOpen={true} size="sm">Content</Modal>);
    expect(screen.getByRole('dialog').querySelector('.sm')).toBeInTheDocument();

    rerender(<Modal isOpen={true} size="md">Content</Modal>);
    expect(screen.getByRole('dialog').querySelector('.md')).toBeInTheDocument();

    rerender(<Modal isOpen={true} size="lg">Content</Modal>);
    expect(screen.getByRole('dialog').querySelector('.lg')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<Modal isOpen={true} title="Test">Content</Modal>);
    const dialog = screen.getByRole('dialog');
    
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });
});
