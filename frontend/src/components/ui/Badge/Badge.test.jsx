import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  it('renders with default status', () => {
    render(<Badge />);
    expect(screen.getByRole('status')).toHaveTextContent('Pending');
  });

  it('renders with different statuses', () => {
    const { rerender } = render(<Badge status="verified" />);
    expect(screen.getByRole('status')).toHaveTextContent('Verified');

    rerender(<Badge status="rejected" />);
    expect(screen.getByRole('status')).toHaveTextContent('Rejected');

    rerender(<Badge status="active" />);
    expect(screen.getByRole('status')).toHaveTextContent('Active');

    rerender(<Badge status="sold" />);
    expect(screen.getByRole('status')).toHaveTextContent('Sold');

    rerender(<Badge status="expired" />);
    expect(screen.getByRole('status')).toHaveTextContent('Expired');

    rerender(<Badge status="negotiating" />);
    expect(screen.getByRole('status')).toHaveTextContent('Negotiating');
  });

  it('renders with custom label', () => {
    render(<Badge status="pending" label="In Progress" />);
    expect(screen.getByRole('status')).toHaveTextContent('In Progress');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Badge size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('sm');

    rerender(<Badge size="md" />);
    expect(screen.getByRole('status')).toHaveClass('md');

    rerender(<Badge size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('lg');
  });

  it('applies status classes', () => {
    render(<Badge status="verified" />);
    expect(screen.getByRole('status')).toHaveClass('verified');
  });

  it('has correct aria-label', () => {
    render(<Badge status="verified" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Status: Verified');
  });

  it('uses custom label in aria-label', () => {
    render(<Badge status="pending" label="Custom Status" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Status: Custom Status');
  });

  it('displays status icon', () => {
    const { container } = render(<Badge status="verified" />);
    const icon = container.querySelector('.icon');
    
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
