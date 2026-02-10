'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { sendOtpStart, sendOtpSuccess, verifyOtpSuccess, verifyOtpFailure } from '@/store/slices/authSlice';
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
            showToast('Enter valid 10-digit mobile number', 'error');
            return;
        }

        dispatch(sendOtpStart(mobile));

        // Simulate API call
        setTimeout(() => {
            dispatch(sendOtpSuccess());
            setStep('otp');
            showToast('OTP sent: 1234', 'success');
        }, 1000);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (otp.length !== 4) {
            showToast('Enter valid 4-digit OTP', 'error');
            return;
        }

        if (otp !== '1234') {
            showToast('Invalid OTP', 'error');
            dispatch(verifyOtpFailure('Invalid OTP'));
            return;
        }

        // Simulate verification
        dispatch(verifyOtpSuccess({ mobile, userType }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-500">Login to continue</p>
                </div>

                {/* Role Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${userType === 'farmer' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setUserType('farmer')}
                        disabled={step === 'otp'}
                    >
                        Farmer
                    </button>
                    <button
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${userType === 'buyer' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setUserType('buyer')}
                        disabled={step === 'otp'}
                    >
                        Buyer
                    </button>
                    <button
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${userType === 'admin' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setUserType('admin')} // Admin needs separate login? Or maybe mobile too?
                    // Admin uses username/pass in existing logic. 
                    // But let's create a link or just allow admin here if we want simplified.
                    // For now, keep it simple: Link to Admin Login
                    >
                        Admin
                    </button>
                </div>

                {userType === 'admin' ? (
                    <div className="text-center">
                        <Link href="/admin/login" className="text-green-600 font-medium hover:underline">
                            Go to Admin Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={step === 'mobile' ? handleSendOtp : handleVerifyOtp} className="space-y-6">
                        {step === 'mobile' ? (
                            <Input
                                label="Mobile Number"
                                placeholder="Enter 10-digit mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                type="tel"
                                required
                            />
                        ) : (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                                <OTPInput length={4} value={otp} onChange={setOtp} />
                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => setStep('mobile')}
                                        className="text-xs text-green-600 hover:underline"
                                    >
                                        Change Mobile Number
                                    </button>
                                </div>
                            </div>
                        )}

                        <Button type="submit" fullWidth isLoading={isLoading}>
                            {step === 'mobile' ? 'Send OTP' : 'Verify & Login'}
                        </Button>

                        {step === 'mobile' && (
                            <p className="text-center text-sm text-gray-500 mt-4">
                                Don't have an account?{' '}
                                <Link href={`/${userType}/register`} className="text-green-600 font-medium hover:underline">
                                    Register here
                                </Link>
                            </p>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}
