import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    otpSent: false,
    otpVerified: false,
    mobileNumber: '',
    error: null,
    userType: null, // 'farmer' or 'buyer'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Send OTP actions
        sendOtpStart: (state, action) => {
            state.isLoading = true;
            state.error = null;
            state.mobileNumber = action.payload;
        },
        sendOtpSuccess: (state) => {
            state.isLoading = false;
            state.otpSent = true;
        },
        sendOtpFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Verify OTP actions
        verifyOtpStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        verifyOtpSuccess: (state, action) => {
            state.isLoading = false;
            state.otpVerified = true;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.userType = action.payload.userType;
        },
        verifyOtpFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Reset flow
        resetAuthFlow: (state) => {
            state.otpSent = false;
            state.otpVerified = false;
            state.mobileNumber = '';
            state.error = null;
            state.isLoading = false;
        },

        // Logout
        logout: (state) => {
            return initialState;
        },

        // Clear error
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    sendOtpStart,
    sendOtpSuccess,
    sendOtpFailure,
    verifyOtpStart,
    verifyOtpSuccess,
    verifyOtpFailure,
    resetAuthFlow,
    logout,
    clearError,
} = authSlice.actions;

export default authSlice.reducer;
