'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { registerAsync, resetAuthFlow } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Link from 'next/link';

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
        if (!formData.businessName.trim()) newErrors.businessName = t('auth.buyer.errors.businessNameRequired');
        if (!formData.taxId.trim()) newErrors.taxId = t('auth.buyer.errors.taxIdRequired');
        if (!formData.category) newErrors.category = t('auth.buyer.errors.categoryRequired');
        if (!formData.contactName.trim()) newErrors.contactName = t('auth.buyer.errors.contactNameRequired');
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
                window.location.href = '/login?type=buyer';
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

    // Shared back button
    const BackButton = () => (
        <div style={{ position: 'relative', zIndex: 1 }}>
            <button onClick={handleBack} style={{
                background: 'none', border: 'none', color: '#78716c', fontSize: '0.875rem',
                cursor: 'pointer', padding: '0.5rem 0', transition: 'color 0.2s', marginBottom: '0.5rem'
            }}>← {t('common.back')}</button>
        </div>
    );

    // ── Step Renderers ──

    const renderMobileStep = () => (
        <>
            <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                <div className="animate-bounceIn" style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🛒</div>
                <h1 className="animate-fadeInUp delay-1" style={{
                    fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem'
                }}>{t('auth.buyer.title')}</h1>
                <p className="animate-fadeInUp delay-2" style={{ color: '#78716c', fontSize: '0.95rem' }}>
                    {t('auth.buyer.loginOrRegister')}
                </p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <form onSubmit={(e) => { e.preventDefault(); handleMobileSubmit(); }} className="animate-fadeInUp delay-3" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <Input
                        label={t('auth.buyer.mobileLabel')} type="tel" inputMode="numeric"
                        placeholder={t('auth.buyer.mobilePlaceholder')} value={mobile}
                        onChange={(e) => { setMobile(e.target.value.replace(/\D/g, '').slice(0, 10)); setMobileError(''); }}
                        prefix="+91" error={mobileError || error} required
                    />
                    <Button type="submit" isLoading={isLoading} fullWidth>
                        {t('auth.buyer.continue')}
                    </Button>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.875rem', color: '#78716c' }}>
                            {t('auth.login.alreadyHaveAccount') || 'Already have an account?'}{' '}
                            <Link href="/login?type=buyer" style={{
                                color: '#065f46', fontWeight: 600, textDecoration: 'none'
                            }}>
                                {t('auth.login.loginButton') || 'Log In'}
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );

    const renderAadharStep = () => (
        <>
            <BackButton />
            <div style={{ textAlign: 'center', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                <div className="animate-bounceIn" style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🪪</div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem' }}>
                    {t('auth.buyer.aadharTitle')}
                </h1>
                <p style={{ color: '#78716c', fontSize: '0.95rem' }}>{t('auth.buyer.aadharSubtitle')}</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <form onSubmit={(e) => { e.preventDefault(); handleAadharSubmit(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <Input
                        label={t('auth.buyer.aadharLabel')} type="tel" inputMode="numeric"
                        placeholder={t('auth.buyer.aadharPlaceholder')} value={aadharNumber}
                        onChange={(e) => { setAadharNumber(e.target.value.replace(/\D/g, '').slice(0, 12)); setAadharError(''); }}
                        error={aadharError} required maxLength={12}
                    />
                    <Button type="submit" disabled={aadharNumber.length !== 12} fullWidth>
                        {t('common.next')}
                    </Button>
                </form>
            </div>
        </>
    );

    const renderBusinessInfoStep = () => (
        <>
            <BackButton />
            <div style={{ textAlign: 'center', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem' }}>
                    {t('auth.buyer.businessDetails')}
                </h1>
                <p style={{ color: '#78716c', fontSize: '0.95rem' }}>{t('auth.buyer.completeProfile')}</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <form onSubmit={(e) => { e.preventDefault(); handleBusinessInfoSubmit(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                    <Button type="submit" fullWidth>
                        {t('common.next')}
                    </Button>
                </form>
            </div>
        </>
    );

    const renderPinStep = () => (
        <>
            <BackButton />
            <div style={{ textAlign: 'center', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                <div className="animate-bounceIn" style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🔐</div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem' }}>
                    {t('auth.pin.setupTitle')}
                </h1>
                <p style={{ color: '#78716c', fontSize: '0.95rem' }}>{t('auth.pin.setupSubtitle')}</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <form onSubmit={(e) => { e.preventDefault(); handlePinSubmit(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <Input label={t('auth.pin.enterPin')} type="password" inputMode="numeric"
                        placeholder="● ● ● ●" value={pin}
                        onChange={(e) => { setPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError(''); }}
                        maxLength={4} required />
                    <Input label={t('auth.pin.confirmPin')} type="password" inputMode="numeric"
                        placeholder="● ● ● ●" value={confirmPin}
                        onChange={(e) => { setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError(''); }}
                        error={pinError} maxLength={4} required />
                    <Button type="submit" disabled={pin.length !== 4 || confirmPin.length !== 4} fullWidth>
                        {t('common.next')}
                    </Button>
                </form>
            </div>
        </>
    );

    const renderCategorySelectionStep = () => (
        <>
            <BackButton />
            <div style={{ textAlign: 'center', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem' }}>
                    {t('auth.buyer.whatYouBuy')}
                </h1>
                <p style={{ color: '#78716c', fontSize: '0.95rem' }}>{t('auth.buyer.selectCategories')}</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem'
                }}>
                    {INTEREST_CATEGORIES.map((cat) => (
                        <button key={cat.id}
                            style={{
                                padding: '1rem', borderRadius: '12px',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                                transition: 'all 0.2s ease',
                                border: formData.interestedCategories.includes(cat.id)
                                    ? '2px solid #065f46' : '2px solid #e7e5e4',
                                background: formData.interestedCategories.includes(cat.id)
                                    ? '#f0fdf4' : 'white',
                                color: formData.interestedCategories.includes(cat.id)
                                    ? '#065f46' : '#57534e',
                                fontWeight: formData.interestedCategories.includes(cat.id) ? 600 : 400,
                                cursor: 'pointer'
                            }}
                            onClick={() => toggleCategory(cat.id)}
                        >
                            <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                            <span style={{ fontSize: '0.875rem' }}>{t(cat.label)}</span>
                        </button>
                    ))}
                </div>
                {errors.interestedCategories && (
                    <p style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem' }}>{errors.interestedCategories}</p>
                )}
                <Button onClick={handleCategorySubmit} isLoading={isLoading} fullWidth>
                    {t('auth.buyer.completeRegistration')}
                </Button>
            </div>
        </>
    );

    const renderSuccessStep = () => (
        <>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                <div className="animate-bounceIn" style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎉</div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981', marginBottom: '0.5rem' }}>
                    {t('auth.buyer.success')}
                </h1>
                <p style={{ color: '#78716c', fontSize: '0.95rem' }}>{t('auth.buyer.successMessage')}</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px',
                    padding: '1rem', marginBottom: '1.5rem'
                }}>
                    <p style={{ fontSize: '0.875rem', color: '#166534', textAlign: 'center' }}>{t('auth.buyer.successReady')}</p>
                </div>
                <Button onClick={() => { dispatch(resetAuthFlow()); router.push('/login?type=buyer'); }}
                    fullWidth>
                    {t('auth.buyer.backToLogin') || 'Go to Login'}
                </Button>
            </div>
        </>
    );

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, #fefce8 0%, #fffef5 30%, #fefce8 60%, #fef3c7 100%)'
        }}>

            {/* Animated Background Orbs */}
            <div style={{
                position: 'absolute', top: '-100px', right: '-80px',
                width: '350px', height: '350px',
                background: 'radial-gradient(circle, rgba(6,95,70,0.12) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(60px)',
                animation: 'orbFloat1 15s ease-in-out infinite'
            }} />
            <div style={{
                position: 'absolute', bottom: '-120px', left: '-100px',
                width: '400px', height: '400px',
                background: 'radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(60px)',
                animation: 'orbFloat2 18s ease-in-out infinite'
            }} />
            <div style={{
                position: 'absolute', top: '30%', right: '20%',
                width: '200px', height: '200px',
                background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(40px)',
                animation: 'orbFloat1 20s ease-in-out infinite reverse'
            }} />

            {/* Registration Card */}
            <div className="animate-scaleIn" style={{
                position: 'relative', width: '100%', maxWidth: '440px',
                background: 'rgba(255,254,245,0.9)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '24px', padding: '2.5rem',
                border: '1px solid rgba(231,229,228,0.5)',
                boxShadow: '0 20px 60px rgba(28,25,23,0.06), 0 4px 20px rgba(6,95,70,0.04)',
                overflow: 'hidden'
            }}>

                {/* Gold shimmer overlay */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.08), transparent)',
                    animation: 'shimmer 4s linear infinite', pointerEvents: 'none'
                }} />

                {step === STEPS.MOBILE && renderMobileStep()}
                {step === STEPS.AADHAR && renderAadharStep()}
                {step === STEPS.BUSINESS_INFO && renderBusinessInfoStep()}
                {step === STEPS.PIN_SETUP && renderPinStep()}
                {step === STEPS.CATEGORY_SELECTION && renderCategorySelectionStep()}
                {step === STEPS.SUCCESS && renderSuccessStep()}
            </div>
        </div>
    );
}
