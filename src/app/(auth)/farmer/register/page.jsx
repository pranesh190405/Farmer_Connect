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
    AADHAR: 'aadhar',
    CONFIRM: 'confirm',
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
    const [aadharNumber, setAadharNumber] = useState('');
    const [aadharError, setAadharError] = useState('');
    const [extractedData, setExtractedData] = useState({ name: '', dateOfBirth: '', address: '' });
    const [isExtracting, setIsExtracting] = useState(false);

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

            // OTP verified - proceed to Aadhar step
            setStep(STEPS.AADHAR);
            dispatch(sendOtpSuccess()); // Reset loading state

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

    // Validate Aadhar number (12 digits)
    const validateAadhar = (value) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length !== 12) {
            return t('auth.errors.invalidAadhar');
        }
        return '';
    };

    // Handle Aadhar input
    const handleAadharChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 12);
        setAadharNumber(value);
        if (aadharError) setAadharError('');

        // Auto-extract data when 12 digits entered
        if (value.length === 12) {
            extractAadharDetails(value);
        } else {
            setExtractedData({ name: '', dateOfBirth: '', address: '' });
        }
    };

    // Mock Aadhar data extraction
    const extractAadharDetails = async (aadhar) => {
        setIsExtracting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock extraction logic (same as in authSlice)
        const lastFourDigits = aadhar.slice(-4);
        const mockNames = ['Ramesh Kumar', 'Suresh Patil', 'Amit Singh', 'Priya Sharma', 'Vijay Kumar'];
        const mockStates = ['Maharashtra', 'Punjab', 'Karnataka', 'Tamil Nadu', 'Gujarat'];

        const nameIndex = parseInt(lastFourDigits.charAt(0)) % mockNames.length;
        const stateIndex = parseInt(lastFourDigits.charAt(1)) % mockStates.length;
        const year = 1960 + (parseInt(lastFourDigits.charAt(2)) * 5);
        const month = (parseInt(lastFourDigits.charAt(3)) % 12) + 1;

        setExtractedData({
            name: mockNames[nameIndex],
            dateOfBirth: `${year}-${month.toString().padStart(2, '0')}-15`,
            address: `Village/City, District, ${mockStates[stateIndex]}`
        });

        setIsExtracting(false);
    };

    // Handle Aadhar submission
    const handleAadharSubmit = () => {
        const validationError = validateAadhar(aadharNumber);
        if (validationError) {
            setAadharError(validationError);
            return;
        }

        if (!extractedData.name) {
            setAadharError(t('auth.errors.aadharRequired'));
            return;
        }

        setStep(STEPS.CONFIRM);
    };

    // Handle final registration
    const handleConfirmRegistration = async () => {
        dispatch(verifyOtpStart());

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Create user with Aadhar data
            dispatch(verifyOtpSuccess({
                mobile: mobile,
                userType: 'farmer',
                aadharNumber: aadharNumber,
                name: extractedData.name,
                dateOfBirth: extractedData.dateOfBirth,
                address: extractedData.address
            }));

        } catch (err) {
            dispatch(verifyOtpFailure('Registration failed. Please try again.'));
        }
    };

    // Handle back button
    const handleBack = () => {
        if (step === STEPS.CONFIRM) {
            setStep(STEPS.AADHAR);
        } else if (step === STEPS.AADHAR) {
            setStep(STEPS.OTP);
            setAadharNumber('');
            setExtractedData({ name: '', dateOfBirth: '', address: '' });
        } else {
            dispatch(resetAuthFlow());
            setStep(STEPS.MOBILE);
            setOtp('');
            setOtpError('');
        }
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

    // Render Aadhar Input Step
    const renderAadharStep = () => (
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
                    <span className={styles.icon} role="img" aria-label="aadhar">🪪</span>
                </div>
                <h1 className={styles.title}>{t('auth.farmer.title')}</h1>
                <p className={styles.subtitle}>Enter your Aadhar for verification</p>
            </div>

            <div className={styles.form}>
                <Input
                    label={t('auth.farmer.aadharLabel')}
                    type="tel"
                    inputMode="numeric"
                    placeholder={t('auth.farmer.aadharPlaceholder')}
                    value={aadharNumber}
                    onChange={handleAadharChange}
                    error={aadharError}
                    required
                    maxLength={12}
                />

                {isExtracting && (
                    <div className="text-center py-4">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                        <p className="text-sm text-gray-600 mt-2">{t('auth.farmer.extractingData')}</p>
                    </div>
                )}

                {extractedData.name && !isExtracting && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4 space-y-2">
                        <p className="text-sm font-semibold text-green-800 mb-3">
                            {t('auth.farmer.detailsExtracted')}
                        </p>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t('auth.farmer.nameLabel')}:</span>
                                <span className="font-medium text-gray-900">{extractedData.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t('auth.farmer.dobLabel')}:</span>
                                <span className="font-medium text-gray-900">{extractedData.dateOfBirth}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t('auth.farmer.addressLabel')}:</span>
                                <span className="font-medium text-gray-900 text-right max-w-xs">{extractedData.address}</span>
                            </div>
                        </div>
                    </div>
                )}

                <Button
                    onClick={handleAadharSubmit}
                    disabled={aadharNumber.length !== 12 || !extractedData.name || isExtracting}
                    fullWidth
                >
                    {t('common.next')}
                </Button>
            </div>
        </div>
    );

    // Render Confirmation Step
    const renderConfirmStep = () => (
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
                    <span className={styles.icon} role="img" aria-label="check">✓</span>
                </div>
                <h1 className={styles.title}>{t('auth.farmer.confirmDetails')}</h1>
                <p className={styles.subtitle}>Please review your information</p>
            </div>

            <div className={styles.form}>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 space-y-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Mobile Number</label>
                        <p className="text-base font-semibold text-gray-900 mt-1">+91 {mobile}</p>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t('auth.farmer.aadharLabel')}</label>
                        <p className="text-base font-semibold text-gray-900 mt-1">{aadharNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')}</p>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t('auth.farmer.nameLabel')}</label>
                        <p className="text-base font-semibold text-gray-900 mt-1">{extractedData.name}</p>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t('auth.farmer.dobLabel')}</label>
                        <p className="text-base font-semibold text-gray-900 mt-1">{extractedData.dateOfBirth}</p>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t('auth.farmer.addressLabel')}</label>
                        <p className="text-base font-semibold text-gray-900 mt-1">{extractedData.address}</p>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <p className="text-xs text-yellow-800">
                        {t('auth.farmer.canBrowse')}
                    </p>
                </div>

                <Button
                    onClick={handleConfirmRegistration}
                    isLoading={isLoading}
                    fullWidth
                >
                    {t('common.submit')}
                </Button>
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
                {step === STEPS.AADHAR && renderAadharStep()}
                {step === STEPS.CONFIRM && renderConfirmStep()}
                {step === STEPS.PENDING && renderPendingStep()}
            </div>
        </main>
    );
}

