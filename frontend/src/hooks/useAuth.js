'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const WARNING_TIME = 5 * 60 * 1000; // Show warning 5 minutes before timeout

/**
 * useAuth Hook
 * Manages authentication state and session timeout
 */
export function useAuth() {
    const dispatch = useDispatch();
    const { user, isAuthenticated, userType } = useSelector((state) => state.auth);

    const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [lastActivity, setLastActivity] = useState(Date.now());

    // Update last activity on user interaction
    const updateActivity = useCallback(() => {
        setLastActivity(Date.now());
        setShowTimeoutWarning(false);
    }, []);

    // Check session timeout
    useEffect(() => {
        if (!isAuthenticated) return;

        const checkSession = () => {
            const now = Date.now();
            const timeSinceActivity = now - lastActivity;
            const timeUntilTimeout = SESSION_TIMEOUT - timeSinceActivity;

            if (timeUntilTimeout <= 0) {
                // Session expired
                handleLogout();
            } else if (timeUntilTimeout <= WARNING_TIME) {
                // Show warning
                setShowTimeoutWarning(true);
                setTimeRemaining(Math.ceil(timeUntilTimeout / 1000));
            }
        };

        const interval = setInterval(checkSession, 1000);

        // Listen for user activity
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => {
            window.addEventListener(event, updateActivity);
        });

        return () => {
            clearInterval(interval);
            events.forEach(event => {
                window.removeEventListener(event, updateActivity);
            });
        };
    }, [isAuthenticated, lastActivity, updateActivity]);

    // Handle logout
    const handleLogout = useCallback(() => {
        // Clear auth token cookie
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        dispatch(logout());
        window.location.href = '/';
    }, [dispatch]);

    // Extend session
    const extendSession = useCallback(() => {
        updateActivity();
    }, [updateActivity]);

    // Login function (sets cookie)
    const login = useCallback((token) => {
        document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
        updateActivity();
    }, [updateActivity]);

    return {
        user,
        isAuthenticated,
        userType,
        showTimeoutWarning,
        timeRemaining,
        extendSession,
        handleLogout,
        login,
    };
}

export default useAuth;
