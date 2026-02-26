import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ---- Async Thunks ----

// Login with phone + PIN
export const loginAsync = createAsyncThunk(
    'auth/login',
    async ({ mobile, pin, userType }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, pin, userType }),
            });
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.error);
            return data;
        } catch (err) {
            return rejectWithValue('Login failed');
        }
    }
);

// Register new user
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

// Forgot PIN — reset using Aadhaar last 4
export const forgotPinAsync = createAsyncThunk(
    'auth/forgotPin',
    async ({ mobile, aadharLast4, newPin, userType }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/auth/forgot-pin', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, aadharLast4, newPin, userType }),
            });
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.error);
            return data;
        } catch (err) {
            return rejectWithValue('PIN reset failed');
        }
    }
);

// Fetch current user
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

// Logout
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

// Admin login
export const adminLoginAsync = createAsyncThunk(
    'auth/adminLogin',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/auth/admin-login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) return rejectWithValue(data.error);
            return data;
        } catch (err) {
            return rejectWithValue('Login failed');
        }
    }
);

// ---- Slice ----

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    mobileNumber: '',
    error: null,
    userType: null, // 'farmer' | 'buyer' | 'admin'
    admin: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.userType = null;
            state.mobileNumber = '';
            state.admin = null;
            state.error = null;
        },
        sessionExpired(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.userType = null;
            state.mobileNumber = '';
            state.admin = null;
            state.error = 'Session expired. Please login again.';
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        resetAuthFlow(state) {
            state.mobileNumber = '';
            state.error = null;
            state.isLoading = false;
        },
        // Keep admin actions for compatibility (used by admin dashboard)
        approveUser: (state, action) => {
            // Handled by admin API now
        },
        rejectUser(state) {
            // Handled by admin API
        },
    },
    extraReducers: (builder) => {
        // loginAsync
        builder
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.userType = action.payload.user.type;
            })
            .addCase(loginAsync.rejected, (state, action) => {
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
                // Don't auto-login — user is PENDING approval
                state.user = action.payload.user;
                state.userType = action.payload.user.type;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // forgotPinAsync
        builder
            .addCase(forgotPinAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(forgotPinAsync.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(forgotPinAsync.rejected, (state, action) => {
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
                state.mobileNumber = '';
                state.admin = null;
                state.error = null;
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
    },
});

export const {
    setLoading,
    resetAuthFlow,
    logout,
    clearError,
    approveUser,
    rejectUser,
    sessionExpired
} = authSlice.actions;

export default authSlice.reducer;
