'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { adminLoginAsync, clearError } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { showToast } from '@/components/ui/Toast/Toast';

export default function AdminLoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation('common');
    const { isAuthenticated, user, isLoading, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAuthenticated && user?.type === 'admin') {
            router.push('/admin/dashboard');
        }
    }, [isAuthenticated, user, router]);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            showToast(t('auth.login.enterValidInfo') || 'Please enter email and password', 'error');
            return;
        }

        try {
            await dispatch(adminLoginAsync({ email, password })).unwrap();
        } catch (err) {
            showToast(err || t('auth.login.loginFailed'), 'error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">{t('admin.portal') || 'Admin Portal'}</h1>
                    <p className="text-gray-500 text-sm">{t('admin.secureAccess') || 'Secure Admin Access'}</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <Input
                        label={t('admin.emailLabel') || 'Admin Email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@farmerconnect.com"
                        type="email"
                        required
                    />

                    <Input
                        label={t('admin.passwordLabel') || 'Password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        type="password"
                        required
                    />

                    <Button
                        type="submit"
                        disabled={!email || !password || isLoading}
                        isLoading={isLoading}
                        fullWidth
                    >
                        {t('auth.login.loginButton') || 'Login'}
                    </Button>

                    <div className="text-center pt-4">
                        <Link href="/login" className="text-sm text-gray-500 hover:text-green-600 underline">
                            {t('admin.backToMobile') || 'Back to User Login'}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
