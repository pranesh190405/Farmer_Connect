import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileUpload from './FileUpload';

describe('FileUpload', () => {
  it('renders with label', () => {
    render(<FileUpload label="Upload Document" />);
    expect(screen.getByText('Upload Document')).toBeInTheDocument();
  });

  it('displays default upload text', () => {
    render(<FileUpload />);
    expect(screen.getByText(/click to upload/i)).toBeInTheDocument();
    expect(screen.getByText(/drag and drop/i)).toBeInTheDocument();
  });

  it('displays hint text', () => {
    render(<FileUpload hint="Upload your ID proof" />);
    expect(screen.getByText('Upload your ID proof')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<FileUpload error="File too large" />);
    expect(screen.getByRole('alert')).toHaveTextContent('File too large');
  });

  it('handles file selection', async () => {
    const handleUpload = jest.fn();
    const user = userEvent.setup();
    
    render(<FileUpload onUpload={handleUpload} />);
    
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByRole('button', { name: /upload file/i }).querySelector('input');
    
    await user.upload(input, file);
    
    await waitFor(() => {
      expect(handleUpload).toHaveBeenCalled();
    });
  });

  it('validates file size', async () => {
    const handleUpload = jest.fn();
    const user = userEvent.setup();
    
    render(<FileUpload onUpload={handleUpload} maxSize={1} />);
    
    // Create a file larger than 1MB
    const largeFile = new File(['x'.repeat(2 * 1024 * 1024)], 'large.pdf', { type: 'application/pdf' });
    const input = screen.getByRole('button', { name: /upload file/i }).querySelector('input');
    
    await user.upload(input, largeFile);
    
    await waitFor(() => {
      expect(handleUpload).toHaveBeenCalledWith(null, expect.stringContaining('File size must be less than'));
    });
  });

  it('disables upload when disabled prop is true', () => {
    render(<FileUpload disabled />);
    const input = screen.getByRole('button', { name: /upload file/i }).querySelector('input');
    expect(input).toBeDisabled();
  });

  it('displays preview when provided', () => {
    const previewUrl = 'data:image/png;base64,test';
    render(<FileUpload preview={previewUrl} />);
    
    const img = screen.getByAltText('Document preview');
    expect(img).toHaveAttribute('src', previewUrl);
  });

  it('shows file type and size limit', () => {
    render(<FileUpload accept="image/*,.pdf" maxSize={5} />);
    expect(screen.getByText(/IMAGE\/\*,PDF \(Max 5MB\)/i)).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<FileUpload label="Upload" />);
    const dropzone = screen.getByRole('button', { name: /upload/i });
    
    expect(dropzone).toHaveAttribute('tabIndex', '0');
  });
});
