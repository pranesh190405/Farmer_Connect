'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
    sendOtpStart,
    sendOtpSuccess,
    sendOtpFailure,
    verifyOtpStart,
    verifyOtpSuccess,
    verifyOtpFailure,
    resetAuthFlow
} from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import OTPInput from '@/components/ui/OTPInput';

export default function AdminLoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isAuthenticated, userType, isLoading, otpSent, error } = useSelector((state) => state.auth);

    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');

    useEffect(() => {
        if (isAuthenticated && userType === 'admin') {
            router.push('/admin/dashboard');
        }
    }, [isAuthenticated, userType, router]);

    const handleSendOtp = async () => {
        if (mobile.length !== 10) return;

        dispatch(sendOtpStart(mobile));
        // Simulate API
        setTimeout(() => {
            dispatch(sendOtpSuccess());
        }, 1000);
    };

    const handleVerifyOtp = async (otpValue) => {
        if (otpValue.length !== 6) return;

        dispatch(verifyOtpStart());

        // Simulate API
        setTimeout(() => {
            // Check against the mock admin user we added in authSlice
            // We pass userType: 'admin' so verifyOtpSuccess looks for an admin with this mobile
            if (mobile === '9999999999') {
                dispatch(verifyOtpSuccess({
                    mobile,
                    userType: 'admin'
                }));
            } else {
                dispatch(verifyOtpFailure('Access Denied: Not an allowed admin number.'));
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
                    <p className="text-gray-500 text-sm">Secure Access</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                {!otpSent ? (
                    <div className="space-y-4">
                        <Input
                            label="Admin Mobile Number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            placeholder="Enter 10-digit mobile"
                            prefix="+91"
                            maxLength={10}
                        />
                        <Button
                            onClick={handleSendOtp}
                            disabled={mobile.length !== 10 || isLoading}
                            isLoading={isLoading}
                            fullWidth
                        >
                            Send OTP
                        </Button>
                        <div className="text-xs text-center text-gray-400 mt-4">
                            Default Admin: 9999999999
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* DEBUG OTP - Remove before production */}
                        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-md mb-4 text-sm font-mono text-center">
                            🔔 DEBUG OTP: 123456
                        </div>

                        <div className="text-center mb-4">
                            <p className="text-sm text-gray-600">Enter OTP sent to +91 {mobile}</p>
                        </div>

                        <OTPInput
                            length={6}
                            onChange={setOtp}
                            onComplete={handleVerifyOtp}
                            disabled={isLoading}
                        />

                        <Button
                            onClick={() => handleVerifyOtp(otp)}
                            disabled={otp.length !== 6 || isLoading}
                            isLoading={isLoading}
                            fullWidth
                        >
                            Verify & Login
                        </Button>

                        <button
                            onClick={() => dispatch(resetAuthFlow())}
                            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 underline"
                        >
                            Back to Mobile Entry
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
