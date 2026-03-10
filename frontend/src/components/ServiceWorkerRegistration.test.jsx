import { render } from '@testing-library/react';
import ServiceWorkerRegistration from './ServiceWorkerRegistration';

describe('ServiceWorkerRegistration', () => {
  let mockRegister;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockRegister = jest.fn().mockResolvedValue({
      update: jest.fn(),
      scope: '/test-scope',
    });
    
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: {
        register: mockRegister,
      },
      writable: true,
      configurable: true,
    });
    
    global.console.log = jest.fn();
  });

  it('renders without crashing', () => {
    const { container } = render(<ServiceWorkerRegistration />);
    expect(container.firstChild).toBeNull();
  });

  it('attempts to register service worker when supported', () => {
    render(<ServiceWorkerRegistration />);
    expect(mockRegister).toHaveBeenCalledWith('/sw.js');
  });

  it('does not throw error when service worker is not supported', () => {
    delete global.navigator.serviceWorker;
    
    expect(() => {
      render(<ServiceWorkerRegistration />);
    }).not.toThrow();
  });
});
