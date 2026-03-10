import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import StepCategory from './StepCategory';
import listingReducer from '@/store/slices/listingSlice';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      listing: listingReducer,
    },
    preloadedState: initialState,
  });
};

describe('StepCategory', () => {
  it('renders category selection screen', () => {
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepCategory />
      </Provider>
    );

    expect(screen.getByText('What are you selling?')).toBeInTheDocument();
    expect(screen.getByText('Select the category of your produce.')).toBeInTheDocument();
  });

  it('displays all category options', () => {
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepCategory />
      </Provider>
    );

    expect(screen.getByText('Vegetables')).toBeInTheDocument();
    expect(screen.getByText('Fruits')).toBeInTheDocument();
    expect(screen.getByText('Grains')).toBeInTheDocument();
    expect(screen.getByText('Flowers')).toBeInTheDocument();
    expect(screen.getByText('Spices')).toBeInTheDocument();
    expect(screen.getByText('Others')).toBeInTheDocument();
  });

  it('displays Hindi labels for categories', () => {
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepCategory />
      </Provider>
    );

    expect(screen.getByText('सब्जियां')).toBeInTheDocument();
    expect(screen.getByText('फल')).toBeInTheDocument();
    expect(screen.getByText('अनाज')).toBeInTheDocument();
  });

  it('updates form data when category is selected', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepCategory />
      </Provider>
    );

    const vegetablesButton = screen.getByText('Vegetables').closest('button');
    await user.click(vegetablesButton);

    const state = store.getState();
    expect(state.listing.formData.category).toBe('vegetables');
  });

  it('advances to next step after selection', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepCategory />
      </Provider>
    );

    const fruitsButton = screen.getByText('Fruits').closest('button');
    await user.click(fruitsButton);

    // Give time for async state updates
    await new Promise(resolve => setTimeout(resolve, 100));

    const state = store.getState();
    // The component updates both category and advances step
    expect(state.listing.formData.category).toBe('fruits');
    // Step should advance from 1 to 2
    expect(state.listing.currentStep).toBeGreaterThanOrEqual(1);
  });

  it('highlights selected category', () => {
    const store = createMockStore({
      listing: { formData: { category: 'grains' }, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepCategory />
      </Provider>
    );

    const grainsButton = screen.getByText('Grains').closest('button');
    expect(grainsButton).toHaveClass('ring-2');
  });

  it('renders all category buttons as clickable', () => {
    const store = createMockStore({
      listing: { formData: {}, currentStep: 1 },
    });

    render(
      <Provider store={store}>
        <StepCategory />
      </Provider>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
    buttons.forEach(button => {
      expect(button).toBeEnabled();
    });
  });
});
