import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslation } from 'react-i18next';
import QualitySliders from './QualitySliders';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('QualitySliders', () => {
  const mockT = (key) => {
    const translations = {
      'quality.title': 'Quality Indicators',
      'quality.size': 'Size',
      'quality.freshness': 'Freshness',
      'quality.ripeness': 'Ripeness',
      'quality.small': 'Small',
      'quality.medium': 'Medium',
      'quality.large': 'Large',
      'quality.average': 'Average',
      'quality.fresh': 'Fresh',
      'quality.farmFresh': 'Farm Fresh',
      'quality.raw': 'Raw',
      'quality.semiRipe': 'Semi-Ripe',
      'quality.fullyRipe': 'Fully Ripe',
      'quality.ripe': 'Ripe',
      'quality.harvestedAgo': 'Harvested Ago',
      'quality.justHarvested': 'Just Harvested',
    };
    return translations[key] || key;
  };

  beforeEach(() => {
    useTranslation.mockReturnValue({ t: mockT });
  });

  it('renders all quality sliders', () => {
    render(<QualitySliders />);
    
    expect(screen.getByText('Quality Indicators')).toBeInTheDocument();
    expect(screen.getByText('Size')).toBeInTheDocument();
    expect(screen.getByText('Freshness')).toBeInTheDocument();
    expect(screen.getByText('Ripeness')).toBeInTheDocument();
  });

  it('renders with initial quality values', () => {
    const initialQuality = { size: 70, freshness: 90, ripeness: 40 };
    render(<QualitySliders initialQuality={initialQuality} />);
    
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toHaveValue('70');
    expect(sliders[1]).toHaveValue('90');
    expect(sliders[2]).toHaveValue('40');
  });

  it('uses default values when no initial quality provided', () => {
    render(<QualitySliders />);
    
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0]).toHaveValue('50');
    expect(sliders[1]).toHaveValue('80');
    expect(sliders[2]).toHaveValue('60');
  });

  it('updates slider value on change', async () => {
    const user = userEvent.setup();
    render(<QualitySliders />);
    
    const sizeSlider = screen.getAllByRole('slider')[0];
    await user.click(sizeSlider);
    
    // Simulate changing the slider value
    sizeSlider.value = '80';
    sizeSlider.dispatchEvent(new Event('change', { bubbles: true }));
    
    expect(sizeSlider).toHaveValue('80');
  });

  it('calls onChange when slider value changes', async () => {
    const handleChange = jest.fn();
    
    render(<QualitySliders onChange={handleChange} />);
    
    const sizeSlider = screen.getAllByRole('slider')[0];
    sizeSlider.value = '75';
    sizeSlider.dispatchEvent(new Event('change', { bubbles: true }));
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
    });
  });

  it('displays correct size label for small value', () => {
    render(<QualitySliders initialQuality={{ size: 20 }} />);
    const labels = screen.getAllByText('Small');
    expect(labels.length).toBeGreaterThan(0);
  });

  it('displays correct size label for medium value', () => {
    render(<QualitySliders initialQuality={{ size: 50 }} />);
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('displays correct size label for large value', () => {
    render(<QualitySliders initialQuality={{ size: 80 }} />);
    const labels = screen.getAllByText('Large');
    expect(labels.length).toBeGreaterThan(0);
  });

  it('displays correct freshness label for average value', () => {
    render(<QualitySliders initialQuality={{ freshness: 30 }} />);
    expect(screen.getByText('Average')).toBeInTheDocument();
  });

  it('displays correct freshness label for fresh value', () => {
    render(<QualitySliders initialQuality={{ freshness: 60 }} />);
    expect(screen.getByText('Fresh')).toBeInTheDocument();
  });

  it('displays correct freshness label for farm fresh value', () => {
    render(<QualitySliders initialQuality={{ freshness: 90 }} />);
    expect(screen.getByText('Farm Fresh')).toBeInTheDocument();
  });

  it('displays correct ripeness label for raw value', () => {
    render(<QualitySliders initialQuality={{ ripeness: 20 }} />);
    const labels = screen.getAllByText('Raw');
    expect(labels.length).toBeGreaterThan(0);
  });

  it('displays correct ripeness label for semi-ripe value', () => {
    render(<QualitySliders initialQuality={{ ripeness: 50 }} />);
    expect(screen.getByText('Semi-Ripe')).toBeInTheDocument();
  });

  it('displays correct ripeness label for fully ripe value', () => {
    render(<QualitySliders initialQuality={{ ripeness: 80 }} />);
    expect(screen.getByText('Fully Ripe')).toBeInTheDocument();
  });

  it('has correct slider attributes', () => {
    render(<QualitySliders />);
    
    const sliders = screen.getAllByRole('slider');
    sliders.forEach(slider => {
      expect(slider).toHaveAttribute('min', '0');
      expect(slider).toHaveAttribute('max', '100');
      expect(slider).toHaveAttribute('type', 'range');
    });
  });
});
