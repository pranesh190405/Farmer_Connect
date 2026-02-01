import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await api.get('/auth/me');
                if (res.data.success) {
                    setUser(res.data.user);
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth Check Failed:", error);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (mobileNumber, otp) => {
        try {
            const res = await api.post('/auth/verify-otp', { mobileNumber, otp });
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                setUser(res.data.user);
                setIsAuthenticated(true);
                return { success: true, isNewUser: res.data.user.isNewUser };
            }
        } catch (error) {
            throw error.response?.data?.message || 'Login Failed';
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (e) {
            console.error(e);
        }
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    const sendOtp = async (mobileNumber) => {
        try {
            const res = await api.post('/auth/send-otp', { mobileNumber });
            return res.data;
        } catch (error) {
            throw error.response?.data?.message || 'Failed to send OTP';
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAuthenticated,
            login,
            logout,
            sendOtp
        }}>
            {children}
        </AuthContext.Provider>
    );
};
