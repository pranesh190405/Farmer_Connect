'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { registerAsync, resetAuthFlow } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import styles from './page.module.css';

// Registration steps
const STEPS = {
    MOBILE: 'mobile',
    AADHAR: 'aadhar',
    BUSINESS_INFO: 'business',
    PIN_SETUP: 'pin',
    CATEGORY_SELECTION: 'category',
    SUCCESS: 'success',
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
    { id: 'vegetables', label: 'categories.vegetables', icon: '🥦' },
    { id: 'fruits', label: 'categories.fruits', icon: '🍎' },
    { id: 'grains', label: 'categories.grains', icon: '🌾' },
    { id: 'spices', label: 'categories.spices', icon: '🌶️' },
    { id: 'flowers', label: 'categories.flowers', icon: '🌸' },
    { id: 'dairy', label: 'categories.dairy', icon: '🥛' },
];

export default function BuyerRegisterPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const { isLoading, isAuthenticated, user, error } = useSelector((state) => state.auth);

    const [step, setStep] = useState(STEPS.MOBILE);
    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [aadharError, setAadharError] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [pinError, setPinError] = useState('');

    // Form data
    const [formData, setFormData] = useState({
        businessName: '',
        taxId: '',
        category: '',
        contactName: '',
        interestedCategories: [],
    });
    const [errors, setErrors] = useState({});

    // Redirect if authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/buyer/dashboard');
        }
    }, [isAuthenticated, router]);

    // Update form field
    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
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
        if (errors.interestedCategories) setErrors(prev => ({ ...prev, interestedCategories: '' }));
    };

    // Step: Mobile → Aadhaar
    const handleMobileSubmit = () => {
        if (mobile.length !== 10) {
            setMobileError(t('auth.login.enterValidMobile'));
            return;
        }
        setStep(STEPS.AADHAR);
    };

    // Step: Aadhaar → Business Info
    const handleAadharSubmit = () => {
        if (aadharNumber.length !== 12) {
            setAadharError(t('auth.errors.invalidAadhar'));
            return;
        }
        setStep(STEPS.BUSINESS_INFO);
    };

    // Validate business info
    const validateBusinessInfo = () => {
        const newErrors = {};
        if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
        if (!formData.taxId.trim()) newErrors.taxId = 'Tax ID / GST Number is required';
        if (!formData.category) newErrors.category = 'Please select a business category';
        if (!formData.contactName.trim()) newErrors.contactName = 'Contact person name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Step: Business Info → PIN Setup
    const handleBusinessInfoSubmit = () => {
        if (validateBusinessInfo()) setStep(STEPS.PIN_SETUP);
    };

    // Step: PIN Setup → Category Selection
    const handlePinSubmit = () => {
        if (pin.length !== 4) { setPinError(t('auth.login.enterValidPin')); return; }
        if (pin !== confirmPin) { setPinError(t('auth.errors.pinMismatch')); return; }
        setStep(STEPS.CATEGORY_SELECTION);
    };

    // Final registration
    const handleCategorySubmit = async () => {
        if (formData.interestedCategories.length === 0) {
            setErrors({ ...errors, interestedCategories: t('auth.buyer.selectOneCategory') });
            return;
        }

        try {
            await dispatch(registerAsync({
                mobile,
                type: 'buyer',
                pin,
                aadharNumber,
                businessName: formData.businessName,
                taxId: formData.taxId,
                businessCategory: formData.category,
                contactName: formData.contactName,
            })).unwrap();
            setStep(STEPS.SUCCESS);
        } catch (err) {
            if (String(err).includes('already exists')) {
                alert(t('auth.buyer.userExists'));
                dispatch(resetAuthFlow());
                window.location.href = '/login';
                return;
            }
        }
    };

    // Handle back
    const handleBack = () => {
        if (step === STEPS.AADHAR) setStep(STEPS.MOBILE);
        else if (step === STEPS.BUSINESS_INFO) setStep(STEPS.AADHAR);
        else if (step === STEPS.PIN_SETUP) { setStep(STEPS.BUSINESS_INFO); setPin(''); setConfirmPin(''); }
        else if (step === STEPS.CATEGORY_SELECTION) setStep(STEPS.PIN_SETUP);
        else if (step === STEPS.SUCCESS) { setStep(STEPS.MOBILE); dispatch(resetAuthFlow()); }
    };

    // ── Mobile Step ──
    const renderMobileStep = () => (
        <div className={styles.stepContent}>
            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon} role="img" aria-label="buyer">🛒</span>
                </div>
                <h1 className={styles.title}>{t('auth.buyer.title')}</h1>
                <p className={styles.subtitle}>{t('auth.buyer.loginOrRegister')}</p>
            </div>
            <div className={styles.form}>
                <Input
                    label={t('auth.farmer.mobileLabel')} type="tel" inputMode="numeric"
                    placeholder={t('auth.farmer.mobilePlaceholder')} value={mobile}
                    onChange={(e) => { setMobile(e.target.value.replace(/\D/g, '').slice(0, 10)); setMobileError(''); }}
                    prefix="+91" error={mobileError || error} required
                />
                <Button onClick={handleMobileSubmit} isLoading={isLoading} fullWidth>
                    {t('auth.buyer.continue')}
                </Button>
            </div>
        </div>
    );

    // ── Aadhaar Step ──
    const renderAadharStep = () => (
        <div className={styles.stepContent}>
            <button className={styles.backButton} onClick={handleBack}>← {t('common.back')}</button>
            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon} role="img" aria-label="aadhar">🪪</span>
                </div>
                <h1 className={styles.title}>{t('auth.farmer.aadharTitle')}</h1>
                <p className={styles.subtitle}>{t('auth.farmer.aadharSubtitle')}</p>
            </div>
            <div className={styles.form}>
                <Input
                    label={t('auth.farmer.aadharLabel')} type="tel" inputMode="numeric"
                    placeholder={t('auth.farmer.aadharPlaceholder')} value={aadharNumber}
                    onChange={(e) => { setAadharNumber(e.target.value.replace(/\D/g, '').slice(0, 12)); setAadharError(''); }}
                    error={aadharError} required maxLength={12}
                />
                <Button onClick={handleAadharSubmit} disabled={aadharNumber.length !== 12} fullWidth>
                    {t('common.next')}
                </Button>
            </div>
        </div>
    );

    // ── Business Info Step ──
    const renderBusinessInfoStep = () => (
        <div className={styles.stepContent}>
            <button className={styles.backButton} onClick={handleBack}>← {t('common.back')}</button>
            <div className={styles.header}>
                <h1 className={styles.title}>{t('auth.buyer.businessDetails')}</h1>
                <p className={styles.subtitle}>{t('auth.buyer.completeProfile')}</p>
            </div>
            <div className={styles.form}>
                <Input label={t('auth.buyer.businessName')} placeholder={t('auth.buyer.businessNamePlaceholder')}
                    value={formData.businessName} onChange={(e) => updateField('businessName', e.target.value)}
                    error={errors.businessName} required />
                <Input label={t('auth.buyer.taxId')} placeholder={t('auth.buyer.taxIdPlaceholder')}
                    value={formData.taxId} onChange={(e) => updateField('taxId', e.target.value.toUpperCase())}
                    error={errors.taxId} hint={t('auth.buyer.gstHint')} required />
                <Select label={t('auth.buyer.category')} placeholder={t('auth.buyer.selectBusinessType')}
                    options={BUSINESS_CATEGORIES} value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)} error={errors.category} required />
                <Input label={t('auth.buyer.contactPerson')} placeholder={t('auth.buyer.contactPlaceholder')}
                    value={formData.contactName} onChange={(e) => updateField('contactName', e.target.value)}
                    error={errors.contactName} required />
                <Button onClick={handleBusinessInfoSubmit} fullWidth>
                    {t('common.next')}
                </Button>
            </div>
        </div>
    );

    // ── PIN Setup Step ──
    const renderPinStep = () => (
        <div className={styles.stepContent}>
            <button className={styles.backButton} onClick={handleBack}>← {t('common.back')}</button>
            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon} role="img" aria-label="pin">🔐</span>
                </div>
                <h1 className={styles.title}>{t('auth.pin.setupTitle')}</h1>
                <p className={styles.subtitle}>{t('auth.pin.setupSubtitle')}</p>
            </div>
            <div className={styles.form}>
                <Input label={t('auth.pin.enterPin')} type="password" inputMode="numeric"
                    placeholder="● ● ● ●" value={pin}
                    onChange={(e) => { setPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError(''); }}
                    maxLength={4} required />
                <Input label={t('auth.pin.confirmPin')} type="password" inputMode="numeric"
                    placeholder="● ● ● ●" value={confirmPin}
                    onChange={(e) => { setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError(''); }}
                    error={pinError} maxLength={4} required />
                <Button onClick={handlePinSubmit} disabled={pin.length !== 4 || confirmPin.length !== 4} fullWidth>
                    {t('common.next')}
                </Button>
            </div>
        </div>
    );

    // ── Category Selection Step ──
    const renderCategorySelectionStep = () => (
        <div className={styles.stepContent}>
            <button className={styles.backButton} onClick={handleBack}>← {t('common.back')}</button>
            <div className={styles.header}>
                <h1 className={styles.title}>{t('auth.buyer.whatYouBuy')}</h1>
                <p className={styles.subtitle}>{t('auth.buyer.selectCategories')}</p>
            </div>
            <div className={styles.form}>
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {INTEREST_CATEGORIES.map((cat) => (
                        <button key={cat.id}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.interestedCategories.includes(cat.id)
                                ? 'border-green-600 bg-green-50 text-green-700 font-medium ring-1 ring-green-600'
                                : 'border-gray-200 hover:border-green-400 hover:bg-gray-50 text-gray-600'}`}
                            onClick={() => toggleCategory(cat.id)}>
                            <span className="text-2xl">{cat.icon}</span>
                            <span className="text-sm">{t(cat.label)}</span>
                        </button>
                    ))}
                </div>
                {errors.interestedCategories && (
                    <p className="text-red-500 text-sm text-center mb-4">{errors.interestedCategories}</p>
                )}
                <Button onClick={handleCategorySubmit} isLoading={isLoading} fullWidth>
                    {t('auth.buyer.completeRegistration')}
                </Button>
            </div>
        </div>
    );

    // ── Success Step ──
    const renderSuccessStep = () => (
        <div className={styles.stepContent}>
            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon} role="img" aria-label="success">🎉</span>
                </div>
                <h1 className={styles.title} style={{ color: '#10b981' }}>{t('auth.farmer.success')}</h1>
                <p className={styles.subtitle}>{t('auth.farmer.successMessage')}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <p className="text-sm text-green-800 text-center">Your account is ready. You can now login to your dashboard.</p>
            </div>
            <Button onClick={() => { dispatch(resetAuthFlow()); router.push('/login'); }}
                fullWidth>
                {t('auth.farmer.backToLogin') || 'Go to Login'}
            </Button>
        </div>
    );

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                {step === STEPS.MOBILE && renderMobileStep()}
                {step === STEPS.AADHAR && renderAadharStep()}
                {step === STEPS.BUSINESS_INFO && renderBusinessInfoStep()}
                {step === STEPS.PIN_SETUP && renderPinStep()}
                {step === STEPS.CATEGORY_SELECTION && renderCategorySelectionStep()}
                {step === STEPS.SUCCESS && renderSuccessStep()}
            </div>
        </main>
    );
}
