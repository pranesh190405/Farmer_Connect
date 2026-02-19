'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { sendOtpAsync, verifyOtpAsync } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import OTPInput from '@/components/ui/OTPInput';
import { showToast } from '@/components/ui/Toast/Toast';
import Link from 'next/link';

export default function LoginPage() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const dispatch = useDispatch();
    const { isAuthenticated, user, error, isLoading } = useSelector((state) => state.auth);

    const [userType, setUserType] = useState('farmer'); // 'farmer' | 'buyer'
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('mobile'); // mobile | otp

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

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (mobile.length !== 10) {
            showToast(t('auth.login.enterValidMobile'), 'error');
            return;
        }

        try {
            const result = await dispatch(sendOtpAsync(mobile)).unwrap();
            setStep('otp');
            showToast(t('auth.login.otpSent'), 'success');
        } catch (err) {
            showToast(err || t('auth.login.failedSendOtp'), 'error');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (otp.length < 4) {
            showToast(t('auth.login.enterValidOtp'), 'error');
            return;
        }

        try {
            const result = await dispatch(verifyOtpAsync({ mobile, otp, userType })).unwrap();
            if (result.isNewUser) {
                showToast(t('auth.login.noAccountFound'), 'error');
                router.push(`/${userType}/register`);
            }
        } catch (err) {
            showToast(err || t('auth.login.invalidOtp'), 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.login.welcome')}</h1>
                    <p className="text-gray-500">{t('auth.login.loginToContinue')}</p>
                </div>

                {/* Role Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${userType === 'farmer' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setUserType('farmer')}
                        disabled={step === 'otp'}
                    >
                        {t('auth.login.farmer')}
                    </button>
                    <button
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${userType === 'buyer' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setUserType('buyer')}
                        disabled={step === 'otp'}
                    >
                        {t('auth.login.buyer')}
                    </button>
                    <button
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${userType === 'admin' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
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
                    <form onSubmit={step === 'mobile' ? handleSendOtp : handleVerifyOtp} className="space-y-6">
                        {step === 'mobile' ? (
                            <Input
                                label={t('auth.farmer.mobileLabel')}
                                placeholder={t('auth.farmer.mobilePlaceholder')}
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                type="tel"
                                required
                            />
                        ) : (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">{t('auth.login.enterOtp')}</label>
                                <OTPInput length={6} value={otp} onChange={setOtp} />
                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => setStep('mobile')}
                                        className="text-xs text-green-600 hover:underline"
                                    >
                                        {t('auth.login.changeMobile')}
                                    </button>
                                </div>
                            </div>
                        )}

                        <Button type="submit" fullWidth isLoading={isLoading}>
                            {step === 'mobile' ? t('auth.farmer.sendOtp') : t('auth.login.verifyLogin')}
                        </Button>

                        {step === 'mobile' && (
                            <p className="text-center text-sm text-gray-500 mt-4">
                                {t('auth.login.noAccount')}{' '}
                                <Link href={`/${userType}/register`} className="text-green-600 font-medium hover:underline">
                                    {t('auth.login.registerHere')}
                                </Link>
                            </p>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}
