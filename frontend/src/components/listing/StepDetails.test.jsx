import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import StepDetails from './StepDetails';
import listingReducer from '@/store/slices/listingSlice';

jest.mock('../ui/VoiceInput/VoiceInput', () => {
  return function VoiceInput({ onResult }) {
    return (
      <button onClick={() => onResult('Test Voice Input')}>
        Voice Input
      </button>
    );
  };
});

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      listing: listingReducer,
    },
    preloadedState: initialState,
  });
};

describe('StepDetails', () => {
  it('renders crop details form', () => {
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepDetails />
      </Provider>
    );

    expect(screen.getByText('Crop Details')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. Potato/i)).toBeInTheDocument();
  });

  it('displays all required fields', () => {
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepDetails />
      </Provider>
    );

    expect(screen.getByText(/Prop \/ Crop Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Variety \(Optional\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByText(/Expected Price/i)).toBeInTheDocument();
  });

  it('allows entering crop name', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepDetails />
      </Provider>
    );

    const cropInput = screen.getByPlaceholderText(/e.g. Potato/i);
    await user.type(cropInput, 'Tomatoes');

    expect(cropInput).toHaveValue('Tomatoes');
  });

  it('allows entering quantity', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepDetails />
      </Provider>
    );

    const quantityInput = screen.getByPlaceholderText('00');
    await user.type(quantityInput, '100');

    expect(quantityInput).toHaveValue(100);
  });

  it('allows entering expected price', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepDetails />
      </Provider>
    );

    const priceInput = screen.getByPlaceholderText('0.00');
    await user.type(priceInput, '50');

    expect(priceInput).toHaveValue(50);
  });

  it('shows validation errors when required fields are empty', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepDetails />
      </Provider>
    );

    const nextButton = screen.getByRole('button', { name: /next step/i });
    await user.click(nextButton);

    await waitFor(() => {
      const errors = screen.getAllByText(/Required \/ आवश्यक/i);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  it('allows selecting unit', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepDetails />
      </Provider>
    );

    const unitSelect = screen.getByRole('combobox');
    await user.selectOptions(unitSelect, 'quintal');

    expect(unitSelect).toHaveValue('quintal');
  });

  it('displays all unit options', () => {
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepDetails />
      </Provider>
    );

    expect(screen.getByRole('option', { name: 'kg' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'quintal' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'ton' })).toBeInTheDocument();
  });

  it('proceeds to next step when form is valid', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepDetails />
      </Provider>
    );

    await user.type(screen.getByPlaceholderText(/e.g. Potato/i), 'Tomatoes');
    await user.type(screen.getByPlaceholderText('00'), '100');
    await user.type(screen.getByPlaceholderText('0.00'), '50');

    const nextButton = screen.getByRole('button', { name: /next step/i });
    await user.click(nextButton);

    // Give time for async state updates
    await new Promise(resolve => setTimeout(resolve, 100));

    const state = store.getState();
    // Verify form data was updated
    expect(state.listing.formData.cropName).toBe('Tomatoes');
    expect(state.listing.formData.quantity).toBe('100');
    expect(state.listing.formData.expectedPrice).toBe('50');
    // Step should advance
    expect(state.listing.currentStep).toBeGreaterThanOrEqual(1);
  });

  it('renders voice input buttons', () => {
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepDetails />
      </Provider>
    );

    const voiceButtons = screen.getAllByText('Voice Input');
    expect(voiceButtons.length).toBeGreaterThan(0);
  });

  it('populates form with existing data', () => {
    const store = createMockStore({
      listing: {
        formData: {
          cropName: 'Potatoes',
          variety: 'Kufri',
          quantity: '200',
          unit: 'kg',
          expectedPrice: '40',
        },
        currentStep: 1,
      },
    });

    render(
      <Provider store={store}>
        <StepDetails />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/e.g. Potato/i)).toHaveValue('Potatoes');
    expect(screen.getByPlaceholderText(/e.g. Kufri Jyoti/i)).toHaveValue('Kufri');
    expect(screen.getByPlaceholderText('00')).toHaveValue(200);
    expect(screen.getByPlaceholderText('0.00')).toHaveValue(40);
  });
});
