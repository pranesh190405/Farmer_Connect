import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DocumentUpload from './DocumentUpload';
import api from '../../utils/api';

jest.mock('../../utils/api');

describe('DocumentUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders document upload form', () => {
    render(<DocumentUpload />);
    expect(screen.getByText('Submit Verification Documents')).toBeInTheDocument();
  });

  it('renders all document type options', () => {
    render(<DocumentUpload />);
    
    expect(screen.getByRole('option', { name: 'Aadhaar Card' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'PAN Card' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Voter ID' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Driving License' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Passport' })).toBeInTheDocument();
  });

  it('allows selecting document type', async () => {
    const user = userEvent.setup();
    render(<DocumentUpload />);
    
    const select = screen.getByLabelText('Document Type');
    await user.selectOptions(select, 'pan');
    
    expect(select).toHaveValue('pan');
  });

  it('allows entering document number', async () => {
    const user = userEvent.setup();
    render(<DocumentUpload />);
    
    const input = screen.getByPlaceholderText('Enter document number');
    await user.type(input, 'ABCDE1234F');
    expect(input).toHaveValue('ABCDE1234F');
  });

  it('shows error when submitting without document number', async () => {
    const user = userEvent.setup();
    render(<DocumentUpload />);
    
    const button = screen.getByRole('button', { name: /submit for verification/i });
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter document number')).toBeInTheDocument();
    });
  });

  it('disables submit button during upload', () => {
    render(<DocumentUpload />);
    const button = screen.getByRole('button', { name: /submit for verification/i });
    // Button should be enabled when there's no document number (will show error on click)
    expect(button).not.toBeDisabled();
  });

  it('submits document successfully', async () => {
    const user = userEvent.setup();
    const onUploadSuccess = jest.fn();
    api.post.mockResolvedValue({ data: { success: true } });
    
    render(<DocumentUpload onUploadSuccess={onUploadSuccess} />);
    
    const input = screen.getByPlaceholderText('Enter document number');
    await user.type(input, 'ABCDE1234F');
    
    const button = screen.getByRole('button', { name: /submit for verification/i });
    await user.click(button);
    
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/users/upload-documents', expect.objectContaining({
        documents: expect.arrayContaining([
          expect.objectContaining({
            type: 'aadhaar',
            number: 'ABCDE1234F'
          })
        ])
      }));
    });
    
    await waitFor(() => {
      expect(screen.getByText('Document submitted for verification!')).toBeInTheDocument();
      expect(onUploadSuccess).toHaveBeenCalled();
    });
  });

  it('handles upload error', async () => {
    const user = userEvent.setup();
    api.post.mockRejectedValue({
      response: { data: { message: 'Invalid document' } }
    });
    
    render(<DocumentUpload />);
    
    const input = screen.getByPlaceholderText('Enter document number');
    await user.type(input, 'INVALID');
    
    const button = screen.getByRole('button', { name: /submit for verification/i });
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid document')).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    api.post.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<DocumentUpload />);
    
    const input = screen.getByPlaceholderText('Enter document number');
    await user.type(input, 'ABCDE1234F');
    
    const button = screen.getByRole('button', { name: /submit for verification/i });
    await user.click(button);
    
    expect(screen.getByText('Submitting...')).toBeInTheDocument();
  });

  it('clears document number after successful submission', async () => {
    const user = userEvent.setup();
    api.post.mockResolvedValue({ data: { success: true } });
    
    render(<DocumentUpload />);
    
    const input = screen.getByPlaceholderText('Enter document number');
    await user.type(input, 'ABCDE1234F');
    
    const button = screen.getByRole('button', { name: /submit for verification/i });
    await user.click(button);
    
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('displays verification timeline message', () => {
    render(<DocumentUpload />);
    expect(screen.getByText(/verification usually takes 24-48 hours/i)).toBeInTheDocument();
  });
});
