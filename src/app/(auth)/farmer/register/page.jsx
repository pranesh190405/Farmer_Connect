'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
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
    SUCCESS: 'success',
};

export default function FarmerRegisterPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isLoading, mobileNumber, error } = useSelector((state) => state.auth);

    const [step, setStep] = useState(STEPS.MOBILE);
    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

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

            // Simulate OTP verification (accept any 6-digit OTP for demo)
            dispatch(verifyOtpSuccess({
                user: { id: '1', mobile: mobile },
                userType: 'farmer',
            }));
            setStep(STEPS.SUCCESS);
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
                    error={otpError}
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

    // Render Success Step
    const renderSuccessStep = () => (
        <div className={styles.stepContent}>
            <div className={styles.header}>
                <div className={`${styles.iconWrapper} ${styles.successIcon}`}>
                    <span className={styles.icon} role="img" aria-label="success">✅</span>
                </div>
                <h1 className={styles.title}>{t('auth.farmer.success')}</h1>
                <p className={styles.subtitle}>{t('auth.farmer.successMessage')}</p>
            </div>

            <Button
                onClick={() => window.location.href = '/farmer/dashboard'}
                fullWidth
            >
                {t('auth.farmer.continue')}
            </Button>
        </div>
    );

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                {/* Progress indicator */}
                <div className={styles.progress}>
                    <div
                        className={`${styles.progressStep} ${step === STEPS.MOBILE ? styles.active : step !== STEPS.MOBILE ? styles.completed : ''}`}
                    >
                        <span className={styles.progressDot}>1</span>
                        <span className={styles.progressLabel}>Mobile</span>
                    </div>
                    <div className={styles.progressLine} />
                    <div
                        className={`${styles.progressStep} ${step === STEPS.OTP ? styles.active : step === STEPS.SUCCESS ? styles.completed : ''}`}
                    >
                        <span className={styles.progressDot}>2</span>
                        <span className={styles.progressLabel}>Verify</span>
                    </div>
                    <div className={styles.progressLine} />
                    <div
                        className={`${styles.progressStep} ${step === STEPS.SUCCESS ? styles.active : ''}`}
                    >
                        <span className={styles.progressDot}>3</span>
                        <span className={styles.progressLabel}>Done</span>
                    </div>
                </div>

                {/* Step content */}
                {step === STEPS.MOBILE && renderMobileStep()}
                {step === STEPS.OTP && renderOtpStep()}
                {step === STEPS.SUCCESS && renderSuccessStep()}
            </div>
        </main>
    );
}
