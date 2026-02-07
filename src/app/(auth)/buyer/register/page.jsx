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
    resetAuthFlow,
} from '@/store/slices/authSlice';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import OTPInput from '@/components/ui/OTPInput';
import styles from './page.module.css';

// Registration steps
const STEPS = {
    MOBILE: 'mobile',
    BUSINESS_INFO: 'business', // Only for new users
    CATEGORY_SELECTION: 'category',
    OTP: 'otp',
    PENDING: 'pending',
};

// Business categories
const BUSINESS_CATEGORIES = [
    { value: 'retailer', label: 'Retailer' },
    { value: 'wholesaler', label: 'Wholesaler' },
    { value: 'cooperative', label: 'Cooperative' },
    { value: 'institution', label: 'Institution' },
    { value: 'processor', label: 'Food Processor' },
];

// Interest categories
const INTEREST_CATEGORIES = [
    { id: 'vegetables', label: 'Vegetables', icon: '🥦' },
    { id: 'fruits', label: 'Fruits', icon: '🍎' },
    { id: 'grains', label: 'Grains & Pulses', icon: '🌾' },
    { id: 'spices', label: 'Spices', icon: '🌶️' },
    { id: 'flowers', label: 'Flowers', icon: '🌸' },
    { id: 'dairy', label: 'Dairy', icon: '🥛' },
];

export default function BuyerRegisterPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const { isLoading, mobileNumber, isAuthenticated, user, users } = useSelector((state) => state.auth);

    const [step, setStep] = useState(STEPS.MOBILE);
    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState('');

    // Form data
    const [formData, setFormData] = useState({
        businessName: '',
        taxId: '',
        category: '',
        contactName: '',
        interestedCategories: [], // New field
        email: '',
    });

    // Form errors
    const [errors, setErrors] = useState({});
    const [otp, setOtp] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

    // Redirect if authenticated
    useEffect(() => {
        if (isAuthenticated && user?.status === 'APPROVED') {
            router.push('/buyer/dashboard');
        } else if (user?.status === 'PENDING') {
            setStep(STEPS.PENDING);
        }
    }, [isAuthenticated, user, router]);

    // Update form field
    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Toggle category selection
    const toggleCategory = (catId) => {
        setFormData(prev => {
            const current = prev.interestedCategories || [];
            if (current.includes(catId)) {
                return { ...prev, interestedCategories: current.filter(id => id !== catId) };
            } else {
                return { ...prev, interestedCategories: [...current, catId] };
            }
        });
        if (errors.interestedCategories) {
            setErrors(prev => ({ ...prev, interestedCategories: '' }));
        }
    };

    // Handle Mobile Submit
    const handleMobileSubmit = () => {
        if (mobile.length !== 10) {
            setMobileError('Enter valid 10-digit mobile number');
            return;
        }

        // Check if user exists in mock DB
        // In real app, this would be an API call to check existence
        const existingUser = users.find(u => u.mobile === mobile && u.type === 'buyer');

        if (existingUser) {
            // Existing user -> Go to OTP
            dispatch(sendOtpStart(mobile));
            // Simulate API
            setTimeout(() => {
                dispatch(sendOtpSuccess());
                setStep(STEPS.OTP);
                startResendTimer();
            }, 1000);
        } else {
            // New user -> Go to Business Info
            setStep(STEPS.BUSINESS_INFO);
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
        }

        if (!formData.category) {
            newErrors.category = 'Please select a business category';
        }

        if (!formData.contactName.trim()) {
            newErrors.contactName = 'Contact person name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Business Info Submit
    const handleBusinessInfoSubmit = () => {
        if (validateBusinessInfo()) {
            setStep(STEPS.CATEGORY_SELECTION);
        }
    };

    // Handle Category Submit
    const handleCategorySubmit = async () => {
        if (formData.interestedCategories.length === 0) {
            setErrors({ ...errors, interestedCategories: 'Please select at least one category' });
            return;
        }

        // Send OTP
        dispatch(sendOtpStart(mobile));
        await new Promise(resolve => setTimeout(resolve, 1500));
        dispatch(sendOtpSuccess());
        setStep(STEPS.OTP);
        startResendTimer();
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

        // Pass all details if new user, or just mobile if existing
        dispatch(verifyOtpSuccess({
            mobile: mobile,
            userType: 'buyer',
            ...formData // Will be ignored by reducer if user exists
        }));

        // useEffect handles redirect
    };

    // Handle back
    const handleBack = () => {
        if (step === STEPS.BUSINESS_INFO) setStep(STEPS.MOBILE);
        else if (step === STEPS.CATEGORY_SELECTION) setStep(STEPS.BUSINESS_INFO);
        else if (step === STEPS.OTP) {
            // If we came from category (new user), go back there. 
            if (!users.find(u => u.mobile === mobile && u.type === 'buyer')) {
                setStep(STEPS.CATEGORY_SELECTION);
            } else {
                setStep(STEPS.MOBILE);
                dispatch(resetAuthFlow());
            }
        }
    };

    // Render Mobile Step
    const renderMobileStep = () => (
        <div className={styles.stepContent}>
            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon} role="img" aria-label="buyer">🛒</span>
                </div>
                <h1 className={styles.title}>{t('auth.buyer.title')}</h1>
                <p className={styles.subtitle}>Login or Register</p>
            </div>

            <div className={styles.form}>
                <Input
                    label="Mobile Number"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter 10-digit mobile"
                    value={mobile}
                    onChange={(e) => {
                        setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                        setMobileError('');
                    }}
                    prefix="+91"
                    error={mobileError}
                    required
                />
                <Button onClick={handleMobileSubmit} fullWidth>
                    Continue
                </Button>
            </div>
        </div>
    );

    // Render Business Info Step
    const renderBusinessInfoStep = () => (
        <div className={styles.stepContent}>
            <button className={styles.backButton} onClick={handleBack}>
                ← Back
            </button>
            <div className={styles.header}>
                <h1 className={styles.title}>Business Details</h1>
                <p className={styles.subtitle}>Complete your profile to continue</p>
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
                    hint="GST Number"
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

                <Input
                    label="Contact Person"
                    placeholder="Enter contact person name"
                    value={formData.contactName}
                    onChange={(e) => updateField('contactName', e.target.value)}
                    error={errors.contactName}
                    required
                />

                <Button onClick={handleBusinessInfoSubmit} fullWidth>
                    Continue to Interests
                </Button>
            </div>
        </div>
    );

    // Render Category Selection Step
    const renderCategorySelectionStep = () => (
        <div className={styles.stepContent}>
            <button className={styles.backButton} onClick={handleBack}>
                ← Back
            </button>
            <div className={styles.header}>
                <h1 className={styles.title}>What do you buy?</h1>
                <p className={styles.subtitle}>Select categories you are interested in</p>
            </div>

            <div className={styles.form}>
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {INTEREST_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.interestedCategories.includes(cat.id)
                                ? 'border-green-600 bg-green-50 text-green-700 font-medium ring-1 ring-green-600'
                                : 'border-gray-200 hover:border-green-400 hover:bg-gray-50 text-gray-600'
                                }`}
                            onClick={() => toggleCategory(cat.id)}
                        >
                            <span className="text-2xl">{cat.icon}</span>
                            <span className="text-sm">{cat.label}</span>
                        </button>
                    ))}
                </div>

                {errors.interestedCategories && (
                    <p className="text-red-500 text-sm text-center mb-4">{errors.interestedCategories}</p>
                )}

                <Button onClick={handleCategorySubmit} isLoading={isLoading} fullWidth>
                    Send OTP to Verify
                </Button>
            </div>
        </div>
    );

    // Render OTP Step
    const renderOtpStep = () => (
        <div className={styles.stepContent}>
            {/* DEBUG OTP - Remove before production */}
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-md mb-4 text-sm font-mono text-center">
                🔔 DEBUG OTP: 123456
            </div>
            <button className={styles.backButton} onClick={handleBack}>
                ← Back
            </button>

            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon} role="img" aria-label="verify">🔐</span>
                </div>
                <h1 className={styles.title}>{t('auth.farmer.otpTitle')}</h1>
                <p className={styles.subtitle}>
                    Enter the 6-digit code sent to <strong>+91 {mobile}</strong>
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

    // Render Pending Step
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
                {step === STEPS.BUSINESS_INFO && renderBusinessInfoStep()}
                {step === STEPS.CATEGORY_SELECTION && renderCategorySelectionStep()}
                {step === STEPS.OTP && renderOtpStep()}
                {step === STEPS.PENDING && renderPendingStep()}
            </div>
        </main>
    );
}

