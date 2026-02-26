'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loginAsync } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { showToast } from '@/components/ui/Toast/Toast';
import Link from 'next/link';

export default function LoginPage() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const dispatch = useDispatch();
    const { isAuthenticated, user, error, isLoading } = useSelector((state) => state.auth);

    const [userType, setUserType] = useState('farmer'); // 'farmer' | 'buyer'
    const [mobile, setMobile] = useState('');
    const [pin, setPin] = useState('');

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.type === 'farmer') router.push('/farmer/dashboard');
            else if (user.type === 'buyer') router.push('/buyer/dashboard');
            else if (user.type === 'admin') router.push('/admin/dashboard');
        }
    }, [isAuthenticated, user, router]);

    useEffect(() => {
        if (error) {
            showToast(error, 'error');
        }
    }, [error]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (mobile.length !== 10) {
            showToast(t('auth.login.enterValidMobile'), 'error');
            return;
        }
        if (pin.length !== 4) {
            showToast(t('auth.login.enterValidPin'), 'error');
            return;
        }

        try {
            await dispatch(loginAsync({ mobile, pin, userType })).unwrap();
        } catch (err) {
            showToast(err || t('auth.login.loginFailed'), 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="text-4xl mb-3">🌾</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.login.welcome')}</h1>
                    <p className="text-gray-500">{t('auth.login.loginToContinue')}</p>
                </div>

                {/* Role Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button
                        className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${userType === 'farmer' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setUserType('farmer')}
                    >
                        🧑‍🌾 {t('auth.login.farmer')}
                    </button>
                    <button
                        className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${userType === 'buyer' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setUserType('buyer')}
                    >
                        🛒 {t('auth.login.buyer')}
                    </button>
                    <button
                        className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${userType === 'admin' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setUserType('admin')}
                    >
                        {t('auth.login.admin')}
                    </button>
                </div>

                {userType === 'admin' ? (
                    <div className="text-center">
                        <Link href="/admin/login" className="text-green-600 font-medium hover:underline">
                            {t('auth.login.goToAdminLogin')}
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="space-y-5">
                        <Input
                            label={t('auth.login.mobileLabel')}
                            placeholder={t('auth.login.mobilePlaceholder')}
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            type="tel"
                            inputMode="numeric"
                            prefix="+91"
                            required
                        />

                        <Input
                            label={t('auth.login.pinLabel')}
                            placeholder={t('auth.login.pinPlaceholder')}
                            value={pin}
                            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            type="password"
                            inputMode="numeric"
                            maxLength={4}
                            required
                        />

                        <Button type="submit" fullWidth isLoading={isLoading}>
                            {t('auth.login.loginButton')}
                        </Button>

                        <div className="text-center space-y-2">
                            <Link href={`/forgot-pin?type=${userType}`} className="text-sm text-green-600 font-medium hover:underline block">
                                {t('auth.login.forgotPin')}
                            </Link>
                            <p className="text-sm text-gray-500">
                                {t('auth.login.noAccount')}{' '}
                                <Link href={`/${userType}/register`} className="text-green-600 font-medium hover:underline">
                                    {t('auth.login.registerHere')}
                                </Link>
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
