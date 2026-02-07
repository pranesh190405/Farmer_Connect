'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/slices/authSlice';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import styles from './page.module.css';

// Indian states
const STATES = [
    { value: 'ap', label: 'Andhra Pradesh' },
    { value: 'ka', label: 'Karnataka' },
    { value: 'mh', label: 'Maharashtra' },
    { value: 'tn', label: 'Tamil Nadu' },
    { value: 'up', label: 'Uttar Pradesh' },
    { value: 'mp', label: 'Madhya Pradesh' },
    { value: 'gj', label: 'Gujarat' },
    { value: 'rj', label: 'Rajasthan' },
    { value: 'pb', label: 'Punjab' },
    { value: 'hr', label: 'Haryana' },
];

// Sample crop interests
const CROP_OPTIONS = [
    { value: 'rice', label: 'Rice' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'cotton', label: 'Cotton' },
    { value: 'sugarcane', label: 'Sugarcane' },
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'pulses', label: 'Pulses' },
    { value: 'oilseeds', label: 'Oilseeds' },
];

export default function ProfileSettingsPage() {
    const { t, i18n } = useTranslation('common');
    const dispatch = useDispatch();
    const router = useRouter();
    const { user: authUser } = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        name: authUser?.name || 'Ramesh Kumar',
        mobile: authUser?.mobile || '9876543210',
        userType: authUser?.role || 'farmer',
        verificationStatus: 'verified',
    });

    const [location, setLocation] = useState({
        state: '',
        district: '',
        autoDetect: false,
    });

    const [preferences, setPreferences] = useState({
        cropInterests: [],
        smsAlerts: true,
        priceAlerts: true,
    });

    const [privacy, setPrivacy] = useState({
        profilePublic: true,
        showLocation: true,
        showContact: false,
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);

    // Auto-detect location
    const handleAutoDetect = () => {
        if (!navigator.geolocation) {
            alert(t('profile.locationError') || 'Geolocation is not supported by your browser');
            return;
        }

        setLocationLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // In production, reverse geocode the coordinates
                // For demo, just set a sample location
                setLocation(prev => ({
                    ...prev,
                    state: 'ka',
                    district: 'Bangalore Rural',
                    autoDetect: true,
                }));
                setLocationLoading(false);
            },
            () => {
                alert(t('profile.locationRetrieveError') || 'Unable to retrieve your location');
                setLocationLoading(false);
            }
        );
    };

    // Toggle crop interest
    const toggleCropInterest = (crop) => {
        setPreferences(prev => ({
            ...prev,
            cropInterests: prev.cropInterests.includes(crop)
                ? prev.cropInterests.filter(c => c !== crop)
                : [...prev.cropInterests, crop],
        }));
    };

    // Handle save
    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{t('profile.title') || 'Profile Settings'}</h1>
                    <Badge status={user.verificationStatus} />
                </header>

                {/* Profile Info */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>👤 {t('profile.accountInfo') || 'Account Information'}</h2>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <Input
                                label={t('profile.name') || 'Name'}
                                value={user.name}
                                onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        <div className={styles.infoItem}>
                            <Input
                                label={t('profile.mobile') || 'Mobile'}
                                value={user.mobile}
                                onChange={(e) => setUser(prev => ({ ...prev, mobile: e.target.value }))}
                            />
                        </div>
                        <div className={styles.infoItem}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.type') || 'Account Type'}</label>
                            <div className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium capitalize">
                                {user.userType}
                            </div>
                        </div>
                    </div>

                </section>

                {/* Location */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>📍 {t('profile.location') || 'Location'}</h2>

                    <div className={styles.locationRow}>
                        <Select
                            label={t('profile.state') || 'State'}
                            placeholder={t('profile.selectState') || 'Select state'}
                            options={STATES}
                            value={location.state}
                            onChange={(e) => setLocation(prev => ({ ...prev, state: e.target.value }))}
                        />
                        <Input
                            label={t('profile.district') || 'District'}
                            placeholder={t('profile.enterDistrict') || 'Enter district'}
                            value={location.district}
                            onChange={(e) => setLocation(prev => ({ ...prev, district: e.target.value }))}
                        />
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAutoDetect}
                        isLoading={locationLoading}
                    >
                        📍 {t('profile.autoDetect') || 'Auto-detect Location'}
                    </Button>
                </section>

                {/* Crop Interests */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>🌾 {t('profile.cropInterests') || 'Crop Interests'}</h2>
                    <p className={styles.sectionHint}>{t('profile.cropInterestsHint') || "Select crops you're interested in buying or selling"}</p>

                    <div className={styles.chipGrid}>
                        {CROP_OPTIONS.map(crop => (
                            <button
                                key={crop.value}
                                className={`${styles.chip} ${preferences.cropInterests.includes(crop.value) ? styles.chipSelected : ''}`}
                                onClick={() => toggleCropInterest(crop.value)}
                                type="button"
                            >
                                {crop.label}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Alerts */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>🔔 {t('profile.notifications') || 'Notifications'}</h2>

                    <div className={styles.toggleList}>
                        <div className={styles.toggleItem}>
                            <div>
                                <strong>{t('profile.smsAlerts') || 'SMS Alerts'}</strong>
                                <p>{t('profile.smsAlertsDesc') || 'Receive important updates via SMS'}</p>
                            </div>
                            <label className={styles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={preferences.smsAlerts}
                                    onChange={(e) => setPreferences(prev => ({ ...prev, smsAlerts: e.target.checked }))}
                                />
                                <span className={styles.toggleSlider}></span>
                            </label>
                        </div>

                        <div className={styles.toggleItem}>
                            <div>
                                <strong>{t('profile.priceAlerts') || 'Price Alerts'}</strong>
                                <p>{t('profile.priceAlertsDesc') || 'Get notified when prices change'}</p>
                            </div>
                            <label className={styles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={preferences.priceAlerts}
                                    onChange={(e) => setPreferences(prev => ({ ...prev, priceAlerts: e.target.checked }))}
                                />
                                <span className={styles.toggleSlider}></span>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Language */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>🌐 {t('profile.language') || 'Language'}</h2>
                    <div className="max-w-xs">
                        <Select
                            label={t('profile.selectLanguage') || 'Select Language'}
                            options={[
                                { value: 'en', label: 'English' },
                                { value: 'hi', label: 'Hindi' },
                                { value: 'mr', label: 'Marathi' },
                                { value: 'pa', label: 'Punjabi' },
                                { value: 'ta', label: 'Tamil' },
                            ]}
                            value={i18n.language || 'en'}
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                        />
                    </div>
                </section>

                {/* Privacy */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>🔒 {t('profile.privacy') || 'Privacy'}</h2>

                    <div className={styles.toggleList}>
                        <div className={styles.toggleItem}>
                            <div>
                                <strong>{t('profile.publicProfile') || 'Public Profile'}</strong>
                                <p>{t('profile.publicProfileDesc') || 'Allow others to view your profile'}</p>
                            </div>
                            <label className={styles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={privacy.profilePublic}
                                    onChange={(e) => setPrivacy(prev => ({ ...prev, profilePublic: e.target.checked }))}
                                />
                                <span className={styles.toggleSlider}></span>
                            </label>
                        </div>

                        <div className={styles.toggleItem}>
                            <div>
                                <strong>{t('profile.showLocation') || 'Show Location'}</strong>
                                <p>{t('profile.showLocationDesc') || 'Display your location on listings'}</p>
                            </div>
                            <label className={styles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={privacy.showLocation}
                                    onChange={(e) => setPrivacy(prev => ({ ...prev, showLocation: e.target.checked }))}
                                />
                                <span className={styles.toggleSlider}></span>
                            </label>
                        </div>

                        <div className={styles.toggleItem}>
                            <div>
                                <strong>{t('profile.showContact') || 'Show Contact'}</strong>
                                <p>{t('profile.showContactDesc') || 'Make phone number visible to buyers'}</p>
                            </div>
                            <label className={styles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={privacy.showContact}
                                    onChange={(e) => setPrivacy(prev => ({ ...prev, showContact: e.target.checked }))}
                                />
                                <span className={styles.toggleSlider}></span>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Save Button */}
                <div className={styles.saveBar}>
                    {saved && <span className={styles.savedMessage}>✓ {t('profile.saved') || 'Settings saved!'}</span>}
                    <Button onClick={handleSave} isLoading={isSaving} fullWidth>
                        {t('profile.saveChanges') || 'Save Changes'}
                    </Button>
                    <Button onClick={handleLogout} variant="outline" className="mt-4 text-red-600 border-red-200 hover:bg-red-50" fullWidth>
                        {t('profile.logout') || 'Logout'}
                    </Button>
                </div>
            </div>
        </main>
    );
}
