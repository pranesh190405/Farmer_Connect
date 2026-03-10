import { render, screen } from '@testing-library/react';
import Providers from './Providers';

// Mock Redux store
jest.mock('@/store/store', () => ({
  store: {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  },
}));

// Mock i18n
jest.mock('@/lib/i18n', () => ({}));

describe('Providers', () => {
  it('renders children', () => {
    render(
      <Providers>
        <div>Test Child</div>
      </Providers>
    );
    
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('wraps children with Redux Provider', () => {
    const { container } = render(
      <Providers>
        <div data-testid="child">Content</div>
      </Providers>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <Providers>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Providers>
    );
    
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });
});
