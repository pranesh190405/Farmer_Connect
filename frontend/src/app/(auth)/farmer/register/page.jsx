'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { registerAsync, resetAuthFlow } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

// Registration steps
const STEPS = {
    MOBILE: 'mobile',
    AADHAR: 'aadhar',
    PIN_SETUP: 'pin',
    CONFIRM: 'confirm',
    SUCCESS: 'success',
};

export default function FarmerRegisterPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const { isLoading, error, isAuthenticated, user } = useSelector((state) => state.auth);

    const [step, setStep] = useState(STEPS.MOBILE);
    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [aadharError, setAadharError] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [pinError, setPinError] = useState('');

    // Redirect if authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/farmer/dashboard');
        }
    }, [isAuthenticated, router]);

    // Handle mobile input
    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setMobile(value);
        if (mobileError) setMobileError('');
    };

    // Step 1 → Step 2
    const handleMobileSubmit = () => {
        if (mobile.length !== 10) {
            setMobileError(t('auth.errors.invalidMobile'));
            return;
        }
        setStep(STEPS.AADHAR);
    };

    // Handle Aadhaar input
    const handleAadharChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 12);
        setAadharNumber(value);
        if (aadharError) setAadharError('');
    };

    // Step 2 → Step 3
    const handleAadharSubmit = () => {
        if (aadharNumber.length !== 12) {
            setAadharError(t('auth.errors.invalidAadhar'));
            return;
        }
        setStep(STEPS.PIN_SETUP);
    };

    // Step 3 → Step 4
    const handlePinSubmit = () => {
        if (pin.length !== 4) {
            setPinError(t('auth.login.enterValidPin'));
            return;
        }
        if (pin !== confirmPin) {
            setPinError(t('auth.errors.pinMismatch'));
            return;
        }
        setStep(STEPS.CONFIRM);
    };

    // Final registration
    const handleConfirmRegistration = async () => {
        try {
            await dispatch(registerAsync({
                mobile,
                type: 'farmer',
                name: name || '',
                pin,
                aadharNumber,
                address: address || '',
            })).unwrap();
            // Success → Show success step
            setStep(STEPS.SUCCESS);
        } catch (err) {
            if (String(err).includes('already exists')) {
                alert(t('auth.buyer.userExists'));
                dispatch(resetAuthFlow());
                window.location.href = '/login?type=farmer';
                return;
            }
        }
    };

    // Handle back
    const handleBack = () => {
        if (step === STEPS.CONFIRM) setStep(STEPS.PIN_SETUP);
        else if (step === STEPS.PIN_SETUP) { setStep(STEPS.AADHAR); setPin(''); setConfirmPin(''); }
        else if (step === STEPS.AADHAR) { setStep(STEPS.MOBILE); setAadharNumber(''); }
        else { dispatch(resetAuthFlow()); setStep(STEPS.MOBILE); }
    };

    // ── Step renderers ──

    const renderMobileStep = () => (
        <>
            <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                <div className="animate-bounceIn" style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🌾</div>
                <h1 className="animate-fadeInUp delay-1" style={{
                    fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem'
                }}>{t('auth.farmer.title')}</h1>
                <p className="animate-fadeInUp delay-2" style={{ color: '#78716c', fontSize: '0.95rem' }}>
                    {t('auth.farmer.subtitle')}
                </p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <form onSubmit={(e) => { e.preventDefault(); handleMobileSubmit(); }} className="animate-fadeInUp delay-3" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <Input
                        label={t('auth.farmer.mobileLabel')}
                        type="tel" inputMode="numeric"
                        placeholder={t('auth.farmer.mobilePlaceholder')}
                        value={mobile} onChange={handleMobileChange}
                        prefix="+91" error={mobileError || error}
                        required autoComplete="tel"
                    />
                    <Input
                        label={t('auth.farmer.nameLabel')}
                        placeholder={t('auth.farmer.namePlaceholder')}
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <Button type="submit" disabled={mobile.length !== 10} fullWidth>
                        {t('common.next')}
                    </Button>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.875rem', color: '#78716c' }}>
                            {t('auth.login.alreadyHaveAccount') || 'Already have an account?'}{' '}
                            <Link href="/login?type=farmer" style={{
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
            <div style={{ position: 'relative', zIndex: 1 }}>
                <button onClick={handleBack} style={{
                    background: 'none', border: 'none', color: '#78716c', fontSize: '0.875rem',
                    cursor: 'pointer', padding: '0.5rem 0', transition: 'color 0.2s', marginBottom: '0.5rem'
                }}>← {t('common.back')}</button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                <div className="animate-bounceIn" style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🪪</div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem' }}>
                    {t('auth.farmer.aadharTitle')}
                </h1>
                <p style={{ color: '#78716c', fontSize: '0.95rem' }}>{t('auth.farmer.aadharSubtitle')}</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <form onSubmit={(e) => { e.preventDefault(); handleAadharSubmit(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <Input
                        label={t('auth.farmer.aadharLabel')}
                        type="tel" inputMode="numeric"
                        placeholder={t('auth.farmer.aadharPlaceholder')}
                        value={aadharNumber} onChange={handleAadharChange}
                        error={aadharError} required maxLength={12}
                    />
                    <Input
                        label={t('auth.farmer.addressLabel')}
                        placeholder={t('auth.farmer.addressPlaceholder')}
                        value={address} onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button type="submit" disabled={aadharNumber.length !== 12} fullWidth>
                        {t('common.next')}
                    </Button>
                </form>
            </div>
        </>
    );

    const renderPinStep = () => (
        <>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <button onClick={handleBack} style={{
                    background: 'none', border: 'none', color: '#78716c', fontSize: '0.875rem',
                    cursor: 'pointer', padding: '0.5rem 0', transition: 'color 0.2s', marginBottom: '0.5rem'
                }}>← {t('common.back')}</button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                <div className="animate-bounceIn" style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🔐</div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem' }}>
                    {t('auth.pin.setupTitle')}
                </h1>
                <p style={{ color: '#78716c', fontSize: '0.95rem' }}>{t('auth.pin.setupSubtitle')}</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <form onSubmit={(e) => { e.preventDefault(); handlePinSubmit(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <Input
                        label={t('auth.pin.enterPin')}
                        type="password" inputMode="numeric"
                        placeholder="● ● ● ●"
                        value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError(''); }}
                        maxLength={4} required
                    />
                    <Input
                        label={t('auth.pin.confirmPin')}
                        type="password" inputMode="numeric"
                        placeholder="● ● ● ●"
                        value={confirmPin} onChange={(e) => { setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError(''); }}
                        error={pinError} maxLength={4} required
                    />
                    <Button type="submit" disabled={pin.length !== 4 || confirmPin.length !== 4} fullWidth>
                        {t('common.next')}
                    </Button>
                </form>
            </div>
        </>
    );

    const renderConfirmStep = () => (
        <>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <button onClick={handleBack} style={{
                    background: 'none', border: 'none', color: '#78716c', fontSize: '0.875rem',
                    cursor: 'pointer', padding: '0.5rem 0', transition: 'color 0.2s', marginBottom: '0.5rem'
                }}>← {t('common.back')}</button>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                <div className="animate-bounceIn" style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>✓</div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem' }}>
                    {t('auth.farmer.confirmDetails')}
                </h1>
                <p style={{ color: '#78716c', fontSize: '0.95rem' }}>{t('auth.farmer.reviewInfo')}</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    background: '#f5f5f4', border: '1px solid #e7e5e4', borderRadius: '12px',
                    padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem'
                }}>
                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('auth.farmer.mobileLabel')}</label>
                        <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1c1917', marginTop: '0.25rem' }}>+91 {mobile}</p>
                    </div>
                    {name && (
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('auth.farmer.nameLabel')}</label>
                            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1c1917', marginTop: '0.25rem' }}>{name}</p>
                        </div>
                    )}
                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('auth.farmer.aadharLabel')}</label>
                        <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1c1917', marginTop: '0.25rem' }}>XXXX XXXX {aadharNumber.slice(-4)}</p>
                    </div>
                    {address && (
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('auth.farmer.addressLabel')}</label>
                            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1c1917', marginTop: '0.25rem' }}>{address}</p>
                        </div>
                    )}
                    <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 500, color: '#78716c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('auth.pin.label')}</label>
                        <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1c1917', marginTop: '0.25rem' }}>● ● ● ●</p>
                    </div>
                </div>

                {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center' }}>{error}</p>}

                <Button onClick={handleConfirmRegistration} isLoading={isLoading} fullWidth>
                    {t('common.submit')}
                </Button>
            </div>
        </>
    );

    const renderSuccessStep = () => (
        <>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                <div className="animate-bounceIn" style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎉</div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981', marginBottom: '0.5rem' }}>
                    {t('auth.farmer.success')}
                </h1>
                <p style={{ color: '#78716c', fontSize: '0.95rem' }}>{t('auth.farmer.successMessage')}</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px',
                    padding: '1rem', marginBottom: '1.5rem'
                }}>
                    <p style={{ fontSize: '0.875rem', color: '#166534', textAlign: 'center' }}>{t('auth.farmer.successReady')}</p>
                </div>
                <Button
                    onClick={() => { dispatch(resetAuthFlow()); router.push('/login?type=farmer'); }}
                    fullWidth
                >
                    {t('auth.farmer.backToLogin') || 'Go to Login'}
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
                {step === STEPS.PIN_SETUP && renderPinStep()}
                {step === STEPS.CONFIRM && renderConfirmStep()}
                {step === STEPS.SUCCESS && renderSuccessStep()}
            </div>
        </div>
    );
}
