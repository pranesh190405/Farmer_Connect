import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ---- Async Thunks ----

export const sendOtpAsync = createAsyncThunk(
    'auth/sendOtp',
    async (mobile, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/auth/send-otp', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile }),
            });
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.error);
            return data;
        } catch (err) {
            return rejectWithValue('Failed to send OTP');
        }
    }
);

export const verifyOtpAsync = createAsyncThunk(
    'auth/verifyOtp',
    async ({ mobile, otp, userType }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, otp, userType }),
            });
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.error);
            return data;
        } catch (err) {
            return rejectWithValue('Failed to verify OTP');
        }
    }
);

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.error);
            return data;
        } catch (err) {
            return rejectWithValue('Registration failed');
        }
    }
);

export const fetchMe = createAsyncThunk(
    'auth/fetchMe',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/auth/me', { credentials: 'include' });
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.error);
            return data;
        } catch (err) {
            return rejectWithValue('Failed to fetch user');
        }
    }
);

export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
            return {};
        } catch (err) {
            return rejectWithValue('Logout failed');
        }
    }
);

export const adminLoginAsync = createAsyncThunk(
    'auth/adminLogin',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/auth/admin-login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.error);
            return data;
        } catch (err) {
            return rejectWithValue('Login failed');
        }
    }
);

export const approveUserAsync = createAsyncThunk(
    'auth/approveUser',
    async (userId, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/admin/users/${userId}/approve`, {
                method: 'PUT',
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.error);
            return data;
        } catch (err) {
            return rejectWithValue('Failed to approve user');
        }
    }
);

export const rejectUserAsync = createAsyncThunk(
    'auth/rejectUser',
    async (userId, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/admin/users/${userId}/reject`, {
                method: 'PUT',
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.error);
            return data;
        } catch (err) {
            return rejectWithValue('Failed to reject user');
        }
    }
);

// ---- Slice ----

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
    isNewUser: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
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
            state.isNewUser = false;
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
            const { user } = action.payload;
            if (user) {
                state.isAuthenticated = true;
                state.user = user;
                state.userType = user.type;
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
            state.isNewUser = false;
        },
        // Keep admin actions for compatibility
        adminLogin: (state, action) => {
            // Handled by async thunk now
        },
        approveUser: (state, action) => {
            // Handled by admin API now
        },
        rejectUser: (state, action) => {
            // Handled by admin API now
        },
    },
    extraReducers: (builder) => {
        // sendOtpAsync
        builder
            .addCase(sendOtpAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendOtpAsync.fulfilled, (state) => {
                state.isLoading = false;
                state.otpSent = true;
            })
            .addCase(sendOtpAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // verifyOtpAsync
        builder
            .addCase(verifyOtpAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyOtpAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.otpVerified = true;
                if (action.payload.isNewUser) {
                    state.isNewUser = true;
                } else if (action.payload.user) {
                    state.isAuthenticated = true;
                    state.user = action.payload.user;
                    state.userType = action.payload.user.type;
                }
            })
            .addCase(verifyOtpAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // registerAsync
        builder
            .addCase(registerAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.userType = action.payload.user.type;
                state.otpVerified = true;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // fetchMe
        builder
            .addCase(fetchMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.userType = action.payload.user.type;
            })
            .addCase(fetchMe.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            });

        // logoutAsync
        builder
            .addCase(logoutAsync.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.userType = null;
                state.otpSent = false;
                state.otpVerified = false;
                state.mobileNumber = '';
                state.admin = null;
                state.error = null;
                state.isNewUser = false;
            });

        // adminLoginAsync
        builder
            .addCase(adminLoginAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(adminLoginAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.userType = 'admin';
                state.admin = { username: 'admin' };
            })
            .addCase(adminLoginAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // approveUserAsync
        builder.addCase(approveUserAsync.fulfilled, (state, action) => {
            if (state.users) {
                const index = state.users.findIndex(u => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            }
        });

        // rejectUserAsync
        builder.addCase(rejectUserAsync.fulfilled, (state, action) => {
            if (state.users) {
                const index = state.users.findIndex(u => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            }
        });
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
    sessionExpired,
} = authSlice.actions;

export default authSlice.reducer;
