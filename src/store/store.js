import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import listingReducer from '../lib/store/features/listingSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        listing: listingReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});
