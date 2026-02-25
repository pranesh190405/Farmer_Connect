'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { registerAsync, resetAuthFlow } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from './page.module.css';

// Registration steps
const STEPS = {
    MOBILE: 'mobile',
    AADHAR: 'aadhar',
    PIN_SETUP: 'pin',
    CONFIRM: 'confirm',
    PENDING: 'pending',
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

    // Redirect if authenticated and approved
    useEffect(() => {
        if (isAuthenticated && user?.status === 'APPROVED') {
            router.push('/farmer/dashboard');
        } else if (user?.status === 'PENDING') {
            setStep(STEPS.PENDING);
        }
    }, [isAuthenticated, user, router]);

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
            // Success → PENDING step will show via useEffect
            setStep(STEPS.PENDING);
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
        if (step === STEPS.CONFIRM) setStep(STEPS.PIN_SETUP);
        else if (step === STEPS.PIN_SETUP) { setStep(STEPS.AADHAR); setPin(''); setConfirmPin(''); }
        else if (step === STEPS.AADHAR) { setStep(STEPS.MOBILE); setAadharNumber(''); }
        else { dispatch(resetAuthFlow()); setStep(STEPS.MOBILE); }
    };

    // ── Render: Mobile Step ──
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
                <Button onClick={handleMobileSubmit} disabled={mobile.length !== 10} fullWidth>
                    {t('common.next')}
                </Button>
            </div>
        </div>
    );

    // ── Render: Aadhaar Step ──
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
                <Button onClick={handleAadharSubmit} disabled={aadharNumber.length !== 12} fullWidth>
                    {t('common.next')}
                </Button>
            </div>
        </div>
    );

    // ── Render: PIN Setup Step ──
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
                <Button onClick={handlePinSubmit} disabled={pin.length !== 4 || confirmPin.length !== 4} fullWidth>
                    {t('common.next')}
                </Button>
            </div>
        </div>
    );

    // ── Render: Confirm Step ──
    const renderConfirmStep = () => (
        <div className={styles.stepContent}>
            <button className={styles.backButton} onClick={handleBack}>← {t('common.back')}</button>
            <div className={styles.header}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon} role="img" aria-label="check">✓</span>
                </div>
                <h1 className={styles.title}>{t('auth.farmer.confirmDetails')}</h1>
                <p className={styles.subtitle}>{t('auth.farmer.reviewInfo')}</p>
            </div>
            <div className={styles.form}>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 space-y-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t('auth.farmer.mobileLabel')}</label>
                        <p className="text-base font-semibold text-gray-900 mt-1">+91 {mobile}</p>
                    </div>
                    {name && (
                        <div>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t('auth.farmer.nameLabel')}</label>
                            <p className="text-base font-semibold text-gray-900 mt-1">{name}</p>
                        </div>
                    )}
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t('auth.farmer.aadharLabel')}</label>
                        <p className="text-base font-semibold text-gray-900 mt-1">XXXX XXXX {aadharNumber.slice(-4)}</p>
                    </div>
                    {address && (
                        <div>
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t('auth.farmer.addressLabel')}</label>
                            <p className="text-base font-semibold text-gray-900 mt-1">{address}</p>
                        </div>
                    )}
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t('auth.pin.label')}</label>
                        <p className="text-base font-semibold text-gray-900 mt-1">● ● ● ●</p>
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <Button onClick={handleConfirmRegistration} isLoading={isLoading} fullWidth>
                    {t('common.submit')}
                </Button>
            </div>
        </div>
    );

    // ── Render: Pending Step ──
    const renderPendingStep = () => (
        <div className={styles.stepContent}>
            <div className={styles.header}>
                <div className={`${styles.iconWrapper} ${styles.pendingIcon}`}>
                    <span className={styles.icon} role="img" aria-label="pending">⏳</span>
                </div>
                <h1 className={styles.title} style={{ color: '#d97706' }}>{t('auth.farmer.verificationPendingTitle')}</h1>
                <p className={styles.subtitle}>{t('auth.farmer.verificationPendingDesc')}</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                <p className="text-sm text-yellow-800 text-center">{t('auth.farmer.verificationPendingHint')}</p>
            </div>
            <Button
                onClick={() => { dispatch(resetAuthFlow()); setStep(STEPS.MOBILE); setMobile(''); }}
                variant="outline" fullWidth
            >
                {t('auth.farmer.backToLogin')}
            </Button>
        </div>
    );

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                {step === STEPS.MOBILE && renderMobileStep()}
                {step === STEPS.AADHAR && renderAadharStep()}
                {step === STEPS.PIN_SETUP && renderPinStep()}
                {step === STEPS.CONFIRM && renderConfirmStep()}
                {step === STEPS.PENDING && renderPendingStep()}
            </div>
        </main>
    );
}
