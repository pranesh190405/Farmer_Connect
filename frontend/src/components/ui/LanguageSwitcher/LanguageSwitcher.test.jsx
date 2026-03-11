import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSwitcher from './LanguageSwitcher';

const mockChangeLanguage = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage,
    },
    t: (key) => key,
  }),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn(),
        getItem: jest.fn(),
      },
      writable: true,
    });
  });

  it('renders language switcher button', async () => {
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /common.changeLanguage/i })).toBeInTheDocument();
    });
  });

  it('displays current language', async () => {
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      expect(screen.getByText('English')).toBeInTheDocument();
    });
  });

  it('opens dropdown when button is clicked', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('हिन्दी')).toBeInTheDocument();
    expect(screen.getByText('தமிழ்')).toBeInTheDocument();
  });

  it('displays all language options', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getAllByText('English').length).toBeGreaterThan(0);
    expect(screen.getByText('हिन्दी')).toBeInTheDocument();
    expect(screen.getByText('தமிழ்')).toBeInTheDocument();
    expect(screen.getByText('తెలుగు')).toBeInTheDocument();
    expect(screen.getByText('ಕನ್ನಡ')).toBeInTheDocument();
    expect(screen.getByText('বাংলা')).toBeInTheDocument();
    expect(screen.getByText('मराठी')).toBeInTheDocument();
    expect(screen.getByText('ગુજરાતી')).toBeInTheDocument();
    expect(screen.getByText('ਪੰਜਾਬੀ')).toBeInTheDocument();
    expect(screen.getByText('हरियाणवी')).toBeInTheDocument();
  });

  it('changes language when option is selected', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    await user.click(button);

    const hindiOption = screen.getAllByText('हिन्दी')[0];
    await user.click(hindiOption);

    expect(mockChangeLanguage).toHaveBeenCalledWith('hi');
    expect(localStorage.setItem).toHaveBeenCalledWith('i18nextLng', 'hi');
  });

  it('closes dropdown after language selection', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    await user.click(button);

    const tamilOption = screen.getAllByText('தமிழ்')[0];
    await user.click(tamilOption);

    await waitFor(() => {
      expect(screen.queryByText('Hindi')).not.toBeInTheDocument();
    });
  });

  it('closes dropdown when backdrop is clicked', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const button = screen.getByRole('button');
    await user.click(button);

    const backdrop = document.querySelector('[aria-hidden="true"]');
    await user.click(backdrop);

    await waitFor(() => {
      expect(screen.queryByText('Hindi')).not.toBeInTheDocument();
    });
  });

  it('shows down arrow when closed and up arrow when open', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    expect(screen.getByText('▼')).toBeInTheDocument();

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('▲')).toBeInTheDocument();
  });

  it('applies variant class when provided', async () => {
    const { container } = render(<LanguageSwitcher variant="header" />);
    
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    const switcher = container.firstChild;
    expect(switcher).toHaveClass('header');
  });
});
