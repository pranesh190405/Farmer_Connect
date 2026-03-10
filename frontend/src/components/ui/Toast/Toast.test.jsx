import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastContainer, toast, showToast } from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders toast container', () => {
    const { container } = render(<ToastContainer />);
    expect(container).toBeInTheDocument();
  });

  it('displays success toast', async () => {
    render(<ToastContainer />);
    
    act(() => {
      toast.success('Operation successful');
    });
    
    await waitFor(() => {
      expect(screen.getByText('Operation successful')).toBeInTheDocument();
    });
  });

  it('displays error toast', async () => {
    render(<ToastContainer />);
    
    act(() => {
      toast.error('Something went wrong');
    });
    
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  it('displays info toast', async () => {
    render(<ToastContainer />);
    
    act(() => {
      toast.info('Information message');
    });
    
    await waitFor(() => {
      expect(screen.getByText('Information message')).toBeInTheDocument();
    });
  });

  it('displays toast using showToast function', async () => {
    render(<ToastContainer />);
    
    act(() => {
      showToast('Test message', 'success');
    });
    
    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  it('displays multiple toasts', async () => {
    render(<ToastContainer />);
    
    act(() => {
      toast.success('First message');
      toast.error('Second message');
    });
    
    await waitFor(() => {
      expect(screen.getByText('First message')).toBeInTheDocument();
      expect(screen.getByText('Second message')).toBeInTheDocument();
    });
  });

  it('dismisses toast when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<ToastContainer />);
    
    act(() => {
      toast.info('Dismissible message');
    });
    
    await waitFor(() => {
      expect(screen.getByText('Dismissible message')).toBeInTheDocument();
    });
    
    const closeButton = screen.getAllByRole('button')[0];
    await user.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Dismissible message')).not.toBeInTheDocument();
    });
  });

  it('auto-dismisses toast after timeout', async () => {
    render(<ToastContainer />);
    
    act(() => {
      toast.success('Auto dismiss');
    });
    
    await waitFor(() => {
      expect(screen.getByText('Auto dismiss')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.queryByText('Auto dismiss')).not.toBeInTheDocument();
    }, { timeout: 3500 });
  });

  it('renders correct icon for success toast', async () => {
    render(<ToastContainer />);
    
    act(() => {
      toast.success('Success');
    });
    
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument();
    });
  });

  it('applies correct styling for different toast types', async () => {
    render(<ToastContainer />);
    
    act(() => {
      toast.success('Success message');
    });
    
    await waitFor(() => {
      const toastElement = screen.getByText('Success message').closest('div');
      expect(toastElement).toHaveClass('border-green-200');
    });
  });
});
