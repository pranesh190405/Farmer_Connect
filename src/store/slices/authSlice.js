import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    otpSent: false,
    otpVerified: false,
    mobileNumber: '',
    error: null,
    userType: null, // 'farmer' | 'buyer' | 'admin'
    admin: null,
    // Mock Database
    users: [
        { id: 'admin1', mobile: '9999999999', type: 'admin', status: 'APPROVED', name: 'System Admin' }
        // Example: { id: '1', mobile: '9876543210', type: 'farmer', status: 'PENDING', name: 'Ramesh' }
    ],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // --- Shared Actions ---
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.userType = null;
            state.otpSent = false;
            state.otpVerified = false;
            state.mobileNumber = '';
            state.admin = null;
            state.error = null;
        },
        sessionExpired: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.userType = null;
            state.otpSent = false;
            state.otpVerified = false;
            state.mobileNumber = '';
            state.admin = null;
            state.error = 'Session expired. Please login again.';
        },

        // --- Admin Actions ---
        adminLogin: (state, action) => {
            const { username, password } = action.payload;
            if (username === 'admin' && password === 'admin123') {
                state.isAuthenticated = true;
                state.userType = 'admin';
                state.admin = { username: 'admin' };
                state.error = null;
            } else {
                state.error = 'Invalid credentials';
            }
        },
        approveUser: (state, action) => {
            const userId = action.payload;
            const user = state.users.find(u => u.id === userId);
            if (user) {
                user.status = 'APPROVED';
            }
        },
        rejectUser: (state, action) => {
            const userId = action.payload;
            const user = state.users.find(u => u.id === userId);
            if (user) {
                user.status = 'REJECTED';
            }
        },

        // --- Auth Actions (Farmer/Buyer) ---
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
        verifyOtpStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        verifyOtpSuccess: (state, action) => {
            state.isLoading = false;
            state.otpVerified = true;

            const { mobile, userType, ...details } = action.payload;

            // Check if user exists
            let existingUser = state.users.find(u => u.mobile === mobile && u.type === userType);

            if (existingUser) {
                // Existing user - Check status
                if (existingUser.status === 'APPROVED') {
                    state.isAuthenticated = true;
                    state.user = existingUser;
                    state.userType = userType;
                } else if (existingUser.status === 'REJECTED') {
                    state.error = 'Your account has been rejected. Please contact support.';
                    state.otpVerified = false; // Reset to prevent login
                } else {
                    // PENDING
                    state.error = 'Your account is pending approval.';
                    state.otpVerified = false;
                }
            } else {
                // New User - Create as APPROVED (Bypass)
                const newUser = {
                    id: Date.now().toString(),
                    mobile,
                    type: userType,
                    status: 'APPROVED',
                    joinedAt: new Date().toISOString(),
                    ...details
                };
                state.users.push(newUser);
                state.user = newUser;
                state.isAuthenticated = true;
                state.error = null;
            }
        },
        verifyOtpFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        resetAuthFlow: (state) => {
            state.otpSent = false;
            state.otpVerified = false;
            state.mobileNumber = '';
            state.error = null;
            state.isLoading = false;
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
    adminLogin,
    approveUser,
    rejectUser,
    sessionExpired
} = authSlice.actions;

export default authSlice.reducer;
