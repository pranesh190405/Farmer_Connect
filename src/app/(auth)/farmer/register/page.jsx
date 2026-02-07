'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
    sendOtpStart,
    sendOtpSuccess,
    sendOtpFailure,
    verifyOtpStart,
    verifyOtpSuccess,
    verifyOtpFailure,
    resetAuthFlow,
} from '@/store/slices/authSlice';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import OTPInput from '@/components/ui/OTPInput';
import styles from './page.module.css';

// Registration steps
const STEPS = {
    MOBILE: 'mobile',
    OTP: 'otp',
    PENDING: 'pending',
};

export default function FarmerRegisterPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const { isLoading, mobileNumber, error, isAuthenticated, user } = useSelector((state) => state.auth);

    const [step, setStep] = useState(STEPS.MOBILE);
    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

    // Redirect if authenticated
    useEffect(() => {
        if (isAuthenticated && user?.status === 'APPROVED') {
            router.push('/farmer/dashboard');
        } else if (user?.status === 'PENDING') {
            setStep(STEPS.PENDING);
        }
    }, [isAuthenticated, user, router]);

    // Validate mobile number (10 digits)
    const validateMobile = (value) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length !== 10) {
            return t('auth.errors.invalidMobile');
        }
        return '';
    };

    // Handle mobile input change
    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setMobile(value);
        if (mobileError) setMobileError('');
    };

    // Handle Send OTP
    const handleSendOtp = async () => {
        const validationError = validateMobile(mobile);
        if (validationError) {
            setMobileError(validationError);
            return;
        }

        dispatch(sendOtpStart(mobile));

        // Simulate API call - In production, replace with actual API
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            dispatch(sendOtpSuccess());
            setStep(STEPS.OTP);
            startResendTimer();
        } catch (err) {
            dispatch(sendOtpFailure('Failed to send OTP. Please try again.'));
        }
    };

    // Start resend timer (30 seconds)
    const startResendTimer = () => {
        setResendTimer(30);
        const interval = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Handle OTP verification
    const handleVerifyOtp = async (otpValue) => {
        if (otpValue.length !== 6) {
            setOtpError(t('auth.errors.invalidOtp'));
            return;
        }

        dispatch(verifyOtpStart());

        // Simulate API call - In production, replace with actual API
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Verify OTP Logic (Action will handle user creation/status check)
            dispatch(verifyOtpSuccess({
                mobile: mobile,
                userType: 'farmer',
            }));

            // Note: The reducer updates state.user.status which triggers useEffect redirect or step change
        } catch (err) {
            dispatch(verifyOtpFailure('Invalid OTP. Please try again.'));
            setOtpError('Invalid OTP. Please try again.');
        }
    };

    // Handle resend OTP
    const handleResendOtp = () => {
        if (resendTimer > 0) return;
        handleSendOtp();
    };

    // Handle back button
    const handleBack = () => {
        dispatch(resetAuthFlow());
        setStep(STEPS.MOBILE);
        setOtp('');
        setOtpError('');
    };

    // Render Mobile Input Step
    const renderMobileStep = () => (
        <div className={styles.stepContent}>
            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon} role="img" aria-label="farmer">🌾</span>
                </div>
                <h1 className={styles.title}>{t('auth.farmer.title')}</h1>
                <p className={styles.subtitle}>{t('auth.farmer.subtitle')}</p>
            </div>

            <div className={styles.form}>
                <Input
                    label={t('auth.farmer.mobileLabel')}
                    type="tel"
                    inputMode="numeric"
                    placeholder={t('auth.farmer.mobilePlaceholder')}
                    value={mobile}
                    onChange={handleMobileChange}
                    prefix="+91"
                    error={mobileError || error}
                    required
                    autoComplete="tel"
                />

                <Button
                    onClick={handleSendOtp}
                    isLoading={isLoading}
                    disabled={mobile.length !== 10}
                    fullWidth
                >
                    {t('auth.farmer.sendOtp')}
                </Button>
            </div>
        </div>
    );

    // Render OTP Verification Step
    const renderOtpStep = () => (
        <div className={styles.stepContent}>
            {/* DEBUG OTP - Remove before production */}
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-md mb-4 text-sm font-mono text-center">
                🔔 DEBUG OTP: 123456
            </div>
            <button
                className={styles.backButton}
                onClick={handleBack}
                aria-label={t('common.back')}
            >
                ← {t('common.back')}
            </button>

            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon} role="img" aria-label="verification">🔐</span>
                </div>
                <h1 className={styles.title}>{t('auth.farmer.otpTitle')}</h1>
                <p className={styles.subtitle}>
                    {t('auth.farmer.otpSubtitle')} <strong>+91 {mobileNumber}</strong>
                </p>
            </div>

            <div className={styles.form}>
                <OTPInput
                    length={6}
                    onChange={setOtp}
                    onComplete={handleVerifyOtp}
                    error={otpError || error}
                    disabled={isLoading}
                />

                <Button
                    onClick={() => handleVerifyOtp(otp)}
                    isLoading={isLoading}
                    disabled={otp.length !== 6}
                    fullWidth
                >
                    {t('auth.farmer.verifyOtp')}
                </Button>

                <div className={styles.resendWrapper}>
                    {resendTimer > 0 ? (
                        <p className={styles.resendTimer}>
                            {t('auth.farmer.resendIn')} {resendTimer} {t('auth.farmer.seconds')}
                        </p>
                    ) : (
                        <button
                            className={styles.resendButton}
                            onClick={handleResendOtp}
                            disabled={isLoading}
                        >
                            {t('auth.farmer.resendOtp')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    // Render Pending Approval Step
    const renderPendingStep = () => (
        <div className={styles.stepContent}>
            <div className={styles.header}>
                <div className={`${styles.iconWrapper} ${styles.pendingIcon}`}>
                    <span className={styles.icon} role="img" aria-label="pending">⏳</span>
                </div>
                <h1 className={styles.title} style={{ color: '#d97706' }}>Verification Pending</h1>
                <p className={styles.subtitle}>
                    Your account is currently under review by the administrator.
                </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                <p className="text-sm text-yellow-800 text-center">
                    Please wait for admin approval. You can try logging in later to check your status.
                </p>
            </div>

            <Button
                onClick={() => {
                    dispatch(resetAuthFlow());
                    setStep(STEPS.MOBILE);
                    setMobile('');
                    setOtp('');
                }}
                variant="outline"
                fullWidth
            >
                Back to Login
            </Button>
        </div>
    );

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                {step === STEPS.MOBILE && renderMobileStep()}
                {step === STEPS.OTP && renderOtpStep()}
                {step === STEPS.PENDING && renderPendingStep()}
            </div>
        </main>
    );
}

