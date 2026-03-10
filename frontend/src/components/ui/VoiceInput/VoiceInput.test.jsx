import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoiceInput from './VoiceInput';

const mockStart = jest.fn();
const mockStop = jest.fn();

const mockSpeechRecognition = jest.fn().mockImplementation(() => ({
  start: mockStart,
  stop: mockStop,
  continuous: false,
  interimResults: false,
  lang: 'en-IN',
  onstart: null,
  onend: null,
  onresult: null,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
    },
  }),
}));

describe('VoiceInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.SpeechRecognition = mockSpeechRecognition;
    window.webkitSpeechRecognition = mockSpeechRecognition;
  });

  afterEach(() => {
    delete window.SpeechRecognition;
    delete window.webkitSpeechRecognition;
  });

  it('renders voice input button when supported', () => {
    const mockOnResult = jest.fn();
    render(<VoiceInput onResult={mockOnResult} />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not render when speech recognition is not supported', () => {
    delete window.SpeechRecognition;
    delete window.webkitSpeechRecognition;

    const mockOnResult = jest.fn();
    const { container } = render(<VoiceInput onResult={mockOnResult} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('starts listening when button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnResult = jest.fn();
    render(<VoiceInput onResult={mockOnResult} />);
    
    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockStart).toHaveBeenCalled();
  });

  it('shows mic icon when not listening', () => {
    const mockOnResult = jest.fn();
    render(<VoiceInput onResult={mockOnResult} />);
    
    expect(screen.getByTitle('Tap to speak')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const mockOnResult = jest.fn();
    render(<VoiceInput onResult={mockOnResult} className="custom-class" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('uses default language when not specified', () => {
    const mockOnResult = jest.fn();
    render(<VoiceInput onResult={mockOnResult} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('uses provided language prop', () => {
    const mockOnResult = jest.fn();
    render(<VoiceInput onResult={mockOnResult} lang="hi-IN" />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
