'use client';

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@/store/store';
import { fetchMe } from '@/store/slices/authSlice';
import '@/lib/i18n';

// Restores auth state from server session cookie after page reload
function AuthRestorer({ children }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMe());
    }, [dispatch]);
    return children;
}

export default function Providers({ children }) {
    return (
        <Provider store={store}>
            <AuthRestorer>
                {children}
            </AuthRestorer>
        </Provider>
    );
}
