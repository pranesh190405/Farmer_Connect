'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LogOut, AlertTriangle } from 'lucide-react';
import { logout } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';

export default function SessionExpiredPage() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        // Ensure user is verified as logged out in state
        dispatch(logout());
    }, [dispatch]);

    const handleLogin = () => {
        router.push('/');
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center border bordered-gray-100">
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-orange-500" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {t('auth.sessionExpired') || 'Session Expired'}
                </h1>

                <p className="text-gray-500 mb-8 leading-relaxed">
                    {t('auth.sessionExpiredDesc') || 'Your session has timed out for security reasons. Please log in again to continue.'}
                </p>

                <Button
                    onClick={handleLogin}
                    fullWidth
                    className="flex items-center justify-center gap-2"
                >
                    <LogOut className="w-4 h-4" />
                    {t('auth.loginAgain') || 'Login Again'}
                </Button>
            </div>
        </main>
    );
}
