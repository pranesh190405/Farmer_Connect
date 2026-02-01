'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    sendOtpStart,
    sendOtpSuccess,
    verifyOtpStart,
    verifyOtpSuccess,
    resetAuthFlow,
} from '@/store/slices/authSlice';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import OTPInput from '@/components/ui/OTPInput';
import styles from './page.module.css';

// Registration steps
const STEPS = {
    BUSINESS_INFO: 'business',
    CONTACT: 'contact',
    OTP: 'otp',
    SUCCESS: 'success',
};

// Business categories
const BUSINESS_CATEGORIES = [
    { value: 'retailer', label: 'Retailer' },
    { value: 'cooperative', label: 'Cooperative' },
    { value: 'institution', label: 'Institution' },
];

export default function BuyerRegisterPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isLoading, mobileNumber } = useSelector((state) => state.auth);

    const [step, setStep] = useState(STEPS.BUSINESS_INFO);

    // Form data
    const [formData, setFormData] = useState({
        businessName: '',
        taxId: '',
        category: '',
        contactName: '',
        mobile: '',
        email: '',
    });

    // Form errors
    const [errors, setErrors] = useState({});
    const [otp, setOtp] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

    // Update form field
    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Validate business info step
    const validateBusinessInfo = () => {
        const newErrors = {};

        if (!formData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        }

        if (!formData.taxId.trim()) {
            newErrors.taxId = 'Tax ID / GST Number is required';
        } else if (!/^[A-Z0-9]{15}$/.test(formData.taxId.toUpperCase())) {
            newErrors.taxId = 'Enter a valid 15-character GST Number';
        }

        if (!formData.category) {
            newErrors.category = 'Please select a business category';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validate contact step
    const validateContact = () => {
        const newErrors = {};

        if (!formData.contactName.trim()) {
            newErrors.contactName = 'Contact person name is required';
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Enter a valid 10-digit mobile number';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle next step
    const handleNext = async () => {
        if (step === STEPS.BUSINESS_INFO) {
            if (validateBusinessInfo()) {
                setStep(STEPS.CONTACT);
            }
        } else if (step === STEPS.CONTACT) {
            if (validateContact()) {
                // Send OTP
                dispatch(sendOtpStart(formData.mobile));
                await new Promise(resolve => setTimeout(resolve, 1500));
                dispatch(sendOtpSuccess());
                setStep(STEPS.OTP);
                startResendTimer();
            }
        }
    };

    // Start resend timer
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
        if (otpValue.length !== 6) return;

        dispatch(verifyOtpStart());
        await new Promise(resolve => setTimeout(resolve, 1500));
        dispatch(verifyOtpSuccess({
            user: {
                id: '1',
                mobile: formData.mobile,
                businessName: formData.businessName,
                category: formData.category,
            },
            userType: 'buyer',
        }));
        setStep(STEPS.SUCCESS);
    };

    // Handle back
    const handleBack = () => {
        if (step === STEPS.CONTACT) setStep(STEPS.BUSINESS_INFO);
        else if (step === STEPS.OTP) setStep(STEPS.CONTACT);
    };

    // Render Business Info Step
    const renderBusinessInfoStep = () => (
        <div className={styles.stepContent}>
            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon} role="img" aria-label="business">🏢</span>
                </div>
                <h1 className={styles.title}>{t('auth.buyer.title')}</h1>
                <p className={styles.subtitle}>Tell us about your business</p>
            </div>

            <div className={styles.form}>
                <Input
                    label={t('auth.buyer.businessName')}
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) => updateField('businessName', e.target.value)}
                    error={errors.businessName}
                    required
                />

                <Input
                    label={t('auth.buyer.taxId')}
                    placeholder="e.g., 22AAAAA0000A1Z5"
                    value={formData.taxId}
                    onChange={(e) => updateField('taxId', e.target.value.toUpperCase())}
                    error={errors.taxId}
                    hint="15-character GST Number"
                    required
                />

                <Select
                    label={t('auth.buyer.category')}
                    placeholder="Select business type"
                    options={BUSINESS_CATEGORIES}
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    error={errors.category}
                    required
                />

                <Button onClick={handleNext} fullWidth>
                    {t('common.next')}
                </Button>
            </div>
        </div>
    );

    // Render Contact Step
    const renderContactStep = () => (
        <div className={styles.stepContent}>
            <button className={styles.backButton} onClick={handleBack}>
                ← {t('common.back')}
            </button>

            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon} role="img" aria-label="contact">📞</span>
                </div>
                <h1 className={styles.title}>Contact Details</h1>
                <p className={styles.subtitle}>How can we reach you?</p>
            </div>

            <div className={styles.form}>
                <Input
                    label="Contact Person"
                    placeholder="Enter contact person name"
                    value={formData.contactName}
                    onChange={(e) => updateField('contactName', e.target.value)}
                    error={errors.contactName}
                    required
                />

                <Input
                    label="Mobile Number"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter 10-digit mobile"
                    value={formData.mobile}
                    onChange={(e) => updateField('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    prefix="+91"
                    error={errors.mobile}
                    required
                />

                <Input
                    label="Email (Optional)"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    error={errors.email}
                />

                <Button onClick={handleNext} isLoading={isLoading} fullWidth>
                    Send OTP
                </Button>
            </div>
        </div>
    );

    // Render OTP Step
    const renderOtpStep = () => (
        <div className={styles.stepContent}>
            <button className={styles.backButton} onClick={handleBack}>
                ← {t('common.back')}
            </button>

            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon} role="img" aria-label="verify">🔐</span>
                </div>
                <h1 className={styles.title}>{t('auth.farmer.otpTitle')}</h1>
                <p className={styles.subtitle}>
                    Enter the 6-digit code sent to <strong>+91 {formData.mobile}</strong>
                </p>
            </div>

            <div className={styles.form}>
                <OTPInput
                    length={6}
                    onChange={setOtp}
                    onComplete={handleVerifyOtp}
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
                        <p className={styles.resendTimer}>Resend in {resendTimer}s</p>
                    ) : (
                        <button className={styles.resendButton} onClick={startResendTimer}>
                            Resend OTP
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
                <h1 className={styles.title}>Registration Complete!</h1>
                <p className={styles.subtitle}>
                    Welcome to Digital Agri Market, <strong>{formData.businessName}</strong>
                </p>
            </div>

            <div className={styles.summaryCard}>
                <h3>Account Summary</h3>
                <div className={styles.summaryRow}>
                    <span>Business:</span>
                    <strong>{formData.businessName}</strong>
                </div>
                <div className={styles.summaryRow}>
                    <span>Category:</span>
                    <strong>{formData.category}</strong>
                </div>
                <div className={styles.summaryRow}>
                    <span>GST:</span>
                    <strong>{formData.taxId}</strong>
                </div>
            </div>

            <Button
                onClick={() => window.location.href = '/buyer/dashboard'}
                fullWidth
            >
                Go to Dashboard
            </Button>
        </div>
    );

    // Get current step number
    const getStepNumber = () => {
        switch (step) {
            case STEPS.BUSINESS_INFO: return 1;
            case STEPS.CONTACT: return 2;
            case STEPS.OTP: return 3;
            case STEPS.SUCCESS: return 4;
            default: return 1;
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                {/* Progress indicator */}
                <div className={styles.progress}>
                    {['Business', 'Contact', 'Verify', 'Done'].map((label, index) => (
                        <div key={label} className={styles.progressItem}>
                            <div
                                className={`${styles.progressStep} ${getStepNumber() > index + 1 ? styles.completed : ''} ${getStepNumber() === index + 1 ? styles.active : ''}`}
                            >
                                <span className={styles.progressDot}>
                                    {getStepNumber() > index + 1 ? '✓' : index + 1}
                                </span>
                                <span className={styles.progressLabel}>{label}</span>
                            </div>
                            {index < 3 && <div className={styles.progressLine} />}
                        </div>
                    ))}
                </div>

                {/* Step content */}
                {step === STEPS.BUSINESS_INFO && renderBusinessInfoStep()}
                {step === STEPS.CONTACT && renderContactStep()}
                {step === STEPS.OTP && renderOtpStep()}
                {step === STEPS.SUCCESS && renderSuccessStep()}
            </div>
        </main>
    );
}
