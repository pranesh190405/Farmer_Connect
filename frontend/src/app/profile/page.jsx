'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/slices/authSlice';
import ApiService from '@/services/apiService';
import { ShieldCheck, AlertTriangle, MapPin, User, Phone, Globe, Bell, Lock, LogOut } from 'lucide-react';

import Button from '@/components/ui/Button';
import AuthGuard from '@/components/AuthGuard';

import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import styles from './page.module.css';

// All Indian states and union territories
const STATES = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
    { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
    { value: 'Ladakh', label: 'Ladakh' },
    { value: 'Lakshadweep', label: 'Lakshadweep' },
    { value: 'Puducherry', label: 'Puducherry' },
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
    const { user: authUser, isAuthenticated } = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        name: authUser?.name || '',
        mobile: authUser?.mobile || '',
        userType: authUser?.type || 'farmer',
        aadharNumber: authUser?.aadharNumber || '',
        aadharVerified: authUser?.aadharVerified || false
    });

    const [location, setLocation] = useState({
        state: '',
        district: '',
        lat: null,
        lng: null,
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
    const [profileLoading, setProfileLoading] = useState(true);

    const [initialUser, setInitialUser] = useState(null);
    const [initialLocation, setInitialLocation] = useState(null);
    const [initialPreferences, setInitialPreferences] = useState(null);
    const [initialPrivacy, setInitialPrivacy] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) router.push('/login');
    }, [isAuthenticated, router]);

    // Load saved profile data (including location) on mount
    useEffect(() => {
        async function loadProfile() {
            try {
                const profile = await ApiService.getProfile();
                if (profile) {
                    // Populate location from saved data
                    const locData = {
                        state: profile.location?.state || '',
                        district: profile.location?.district || '',
                        lat: profile.location?.lat || null,
                        lng: profile.location?.lng || null,
                        autoDetect: false,
                    };
                    setLocation(locData);
                    setInitialLocation(locData);

                    // Populate preferences from saved data
                    const prefData = {
                        cropInterests: profile.preferences?.cropInterests || [],
                        smsAlerts: profile.preferences?.smsAlerts !== undefined ? profile.preferences.smsAlerts : true,
                        priceAlerts: profile.preferences?.priceAlerts !== undefined ? profile.preferences.priceAlerts : true,
                    };
                    setPreferences(prefData);
                    setInitialPreferences(prefData);

                    // Populate privacy from saved data
                    const privData = {
                        profilePublic: profile.preferences?.profilePublic !== undefined ? profile.preferences.profilePublic : true,
                        showLocation: profile.preferences?.showLocation !== undefined ? profile.preferences.showLocation : true,
                        showContact: profile.preferences?.showContact !== undefined ? profile.preferences.showContact : false,
                    };
                    setPrivacy(privData);
                    setInitialPrivacy(privData);

                    const userData = {
                        name: profile.name || authUser?.name || '',
                        mobile: profile.mobile || authUser?.mobile || '',
                        userType: profile.type || authUser?.type || 'farmer',
                        aadharNumber: profile.aadharNumber || authUser?.aadharNumber || '',
                        aadharVerified: profile.aadharVerified || authUser?.aadharVerified || false
                    };
                    setUser(userData);
                    setInitialUser(userData);
                }
            } catch (err) {
                console.error('Failed to load profile:', err);
            } finally {
                setProfileLoading(false);
            }
        }

        if (isAuthenticated) {
            loadProfile();
        } else {
            setProfileLoading(false);
        }
    }, [isAuthenticated]);

    // Auto-detect location using browser geolocation + reverse geocoding
    const handleAutoDetect = () => {
        if (!navigator.geolocation) {
            alert(t('profile.locationError') || 'Geolocation is not supported by your browser');
            return;
        }

        setLocationLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;

                    // Use OpenStreetMap Nominatim for reverse geocoding
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
                        {
                            headers: {
                                'Accept-Language': 'en',
                            },
                        }
                    );
                    const data = await response.json();

                    const detectedState = data.address?.state || '';
                    const detectedDistrict = data.address?.state_district || data.address?.county || '';

                    setLocation({
                        state: detectedState,
                        district: detectedDistrict,
                        lat: latitude,
                        lng: longitude,
                        autoDetect: true,
                    });
                } catch (err) {
                    console.error('Reverse geocoding failed:', err);
                    alert(t('profile.locationRetrieveError') || 'Unable to determine your location. Please set it manually.');
                } finally {
                    setLocationLoading(false);
                }
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

    // Handle save — saves profile, location, and preferences
    const handleSave = async () => {
        if (!/^\d{10}$/.test(user.mobile)) {
            alert(t('profile.invalidMobile') || 'Mobile number must be exactly 10 digits.');
            return;
        }
        setIsSaving(true);
        try {
            // Save profile (name, mobile)
            await ApiService.updateProfile({
                name: user.name,
                mobile: user.mobile,
            });

            // Save location (state, district, lat, lng)
            await ApiService.updateLocation({
                state: location.state,
                district: location.district,
                lat: location.lat || null,
                lng: location.lng || null,
            });

            // Save preferences
            await ApiService.updatePreferences({
                cropInterests: preferences.cropInterests,
                smsAlerts: preferences.smsAlerts,
                priceAlerts: preferences.priceAlerts,
                profilePublic: privacy.profilePublic,
                showLocation: privacy.showLocation,
                showContact: privacy.showContact,
            });

            // Update initial state to match the freshly saved ones
            setInitialUser({ ...user });
            setInitialLocation({ ...location });
            setInitialPreferences({ ...preferences });
            setInitialPrivacy({ ...privacy });

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error('Failed to save profile:', err);
            alert(t('profile.saveFailed') || 'Failed to save profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    if (profileLoading) {
        return (
            <AuthGuard>
                <main className="min-h-screen pb-24 font-sans p-4 md:p-6" style={{ background: '#fefce8' }}>
                    <div className="max-w-2xl mx-auto flex items-center justify-center py-20">
                        <div className="text-center" style={{ color: '#78716c' }}>
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-3" style={{ borderBottomColor: '#065f46' }}></div>
                            <p>{t('profile.loading') || 'Loading profile...'}</p>
                        </div>
                    </div>
                </main>
            </AuthGuard>
        );
    }

    return (
        <AuthGuard>
            <main className="min-h-screen pb-24 font-sans p-4 md:p-6" style={{ background: '#fefce8' }}>
                <div className="max-w-2xl mx-auto space-y-6">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold" style={{ color: '#1c1917' }}>{t('profile.title') || 'Profile Settings'}</h1>
                            <p className="text-sm" style={{ color: '#78716c' }}>{t('profile.manageAccount') || 'Manage your account and preferences'}</p>
                        </div>
                        {user.aadharVerified ? (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm" style={{ background: '#ecfdf5', color: '#065f46' }}>
                                <ShieldCheck className="w-4 h-4" />
                                {user.userType === 'buyer' ? (t('profile.verifiedBuyer') || 'Verified Buyer') : (t('profile.verifiedFarmer') || 'Verified Farmer')}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm" style={{ background: '#fef3c7', color: '#92400e' }}>
                                <AlertTriangle className="w-4 h-4" />
                                {t('profile.verificationPending') || 'Verification Pending'}
                            </div>
                        )}
                    </div>

                    {/* Profile Info */}
                    <section className="rounded-2xl shadow-sm overflow-hidden" style={{ background: '#fffef5', border: '1px solid #e7e5e4' }}>
                        <div className="p-6" style={{ borderBottom: '1px solid #e7e5e4' }}>
                            <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: '#1c1917' }}>
                                <User className="w-5 h-5" style={{ color: '#065f46' }} />
                                {t('profile.accountInfo') || 'Account Information'}
                            </h2>
                        </div>
                        <div className="p-6 grid gap-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    label={t('profile.name') || 'Name'}
                                    value={user.name}
                                    onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                                    prefix={<User className="w-4 h-4 text-gray-400" />}
                                />
                                <Input
                                    label={t('profile.mobile') || 'Mobile'}
                                    value={user.mobile}
                                    onChange={(e) => {
                                        const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        setUser(prev => ({ ...prev, mobile: digits }));
                                    }}
                                    prefix={<Phone className="w-4 h-4 text-gray-400" />}
                                    maxLength={10}
                                    placeholder={t('profile.mobilePlaceholder')}
                                />
                            </div>

                            {/* Aadhar Section */}
                            <div className="rounded-xl p-4" style={{ background: '#fefce8', border: '1px solid #e7e5e4' }}>
                                <div className="flex justify-between items-start mb-2">
                                    <label className="text-sm font-medium" style={{ color: '#44403c' }}>{t('profile.aadharNumber') || 'Aadhar Number'}</label>
                                    {user.aadharVerified ? (
                                        <span className="text-xs font-bold flex items-center gap-1" style={{ color: '#065f46' }}>
                                            <ShieldCheck className="w-3 h-3" /> {t('profile.verified') || 'Verified'}
                                        </span>
                                    ) : (
                                        <span className="text-xs font-bold flex items-center gap-1" style={{ color: '#d97706' }}>
                                            <AlertTriangle className="w-3 h-3" /> {t('profile.pendingAdminApproval') || 'Pending Admin Approval'}
                                        </span>
                                    )}
                                </div>
                                <div className="font-mono text-lg font-medium tracking-wider" style={{ color: '#1c1917' }}>
                                    {user.aadharNumber ? user.aadharNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1 **** $3') : (t('profile.notProvided') || 'Not Provided')}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-1" style={{ color: '#44403c' }}>{t('profile.type') || 'Account Type'}</label>
                                    <div className="px-4 py-2.5 rounded-lg font-medium capitalize" style={{ background: '#fefce8', color: '#44403c', border: '1px solid #e7e5e4' }}>
                                        {user.userType}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Location */}
                    <section className="rounded-2xl shadow-sm overflow-hidden" style={{ background: '#fffef5', border: '1px solid #e7e5e4' }}>
                        <div className="p-6" style={{ borderBottom: '1px solid #e7e5e4' }}>
                            <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: '#1c1917' }}>
                                <MapPin className="w-5 h-5" style={{ color: '#065f46' }} />
                                {t('profile.location') || 'Location'}
                            </h2>
                            <p className="text-sm mt-1" style={{ color: '#78716c' }}>
                                {t('profile.locationHint') || 'Auto-detect your location or set it manually. You can change this anytime to sell crops from a different location.'}
                            </p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Select
                                    label={t('profile.state') || 'State'}
                                    placeholder={t('profile.selectState') || 'Select state'}
                                    options={STATES}
                                    value={location.state}
                                    onChange={(e) => setLocation(prev => ({ ...prev, state: e.target.value, autoDetect: false }))}
                                />
                                <Input
                                    label={t('profile.district') || 'District'}
                                    placeholder={t('profile.enterDistrict') || 'Enter district'}
                                    value={location.district}
                                    onChange={(e) => setLocation(prev => ({ ...prev, district: e.target.value, autoDetect: false }))}
                                />
                            </div>

                            {/* Show detected coordinates if auto-detected */}
                            {location.autoDetect && location.lat && (
                                <div className="text-xs text-gray-400 flex items-center gap-1">
                                    📍 {t('profile.autoDetected', { lat: location.lat.toFixed(4), lng: location.lng.toFixed(4) })}
                                </div>
                            )}

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleAutoDetect}
                                isLoading={locationLoading}
                                className="w-full md:w-auto"
                            >
                                📍 {t('profile.autoDetect') || 'Auto-detect Location'}
                            </Button>
                        </div>
                    </section>

                    {/* Alerts */}
                    <section className="rounded-2xl shadow-sm overflow-hidden" style={{ background: '#fffef5', border: '1px solid #e7e5e4' }}>
                        <div className="p-6" style={{ borderBottom: '1px solid #e7e5e4' }}>
                            <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: '#1c1917' }}>
                                <Bell className="w-5 h-5" style={{ color: '#065f46' }} />
                                {t('profile.notifications') || 'Notifications'}
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#fefce8' }}>
                                <div>
                                    <strong className="block" style={{ color: '#1c1917' }}>{t('profile.smsAlerts') || 'SMS Alerts'}</strong>
                                    <p className="text-sm" style={{ color: '#78716c' }}>{t('profile.smsAlertsDesc') || 'Receive important updates via SMS'}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={preferences.smsAlerts}
                                        onChange={(e) => setPreferences(prev => ({ ...prev, smsAlerts: e.target.checked }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Language */}
                    <section className="rounded-2xl shadow-sm overflow-hidden" style={{ background: '#fffef5', border: '1px solid #e7e5e4' }}>
                        <div className="p-6" style={{ borderBottom: '1px solid #e7e5e4' }}>
                            <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: '#1c1917' }}>
                                <Globe className="w-5 h-5" style={{ color: '#065f46' }} />
                                {t('profile.language') || 'Language'}
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="max-w-xs">
                                <Select
                                    label={t('profile.selectLanguage') || 'Select Language'}
                                    options={[
                                        { value: 'en', label: 'English' },
                                        { value: 'hi', label: 'Hindi (हिन्दी)' },
                                        { value: 'ta', label: 'Tamil (தமிழ்)' },
                                        { value: 'te', label: 'Telugu (తెలుగు)' },
                                        { value: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
                                        { value: 'bn', label: 'Bengali (বাংলা)' },
                                        { value: 'mr', label: 'Marathi (मराठी)' },
                                        { value: 'gu', label: 'Gujarati (ગુજરાતી)' },
                                        { value: 'pa', label: 'Punjabi (ਪੰਜਾਬੀ)' },
                                        { value: 'hr', label: 'Haryanvi (हरियाणवी)' },
                                    ]}
                                    value={(() => {
                                        const match = typeof document !== 'undefined' && document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
                                        return match ? match[1] : 'en';
                                    })()}
                                    onChange={(e) => {
                                        const langCode = e.target.value;
                                        const domain = window.location.hostname;
                                        const cookieDomain = domain === 'localhost' ? '' : `; domain=${domain}`;
                                        if (langCode === 'en') {
                                            document.cookie = `googtrans=/en/en; path=/${cookieDomain}`;
                                            document.cookie = `googtrans=/en/en; path=/`;
                                        } else {
                                            document.cookie = `googtrans=/en/${langCode}; path=/${cookieDomain}`;
                                            document.cookie = `googtrans=/en/${langCode}; path=/`;
                                        }
                                        setTimeout(() => window.location.reload(), 100);
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Save Button */}
                    <div className="mt-6 pt-6" style={{ borderTop: '1px solid #e7e5e4' }}>
                        <div className="flex flex-col gap-3">
                            {(() => {
                                const hasChanges = initialUser ? (
                                    JSON.stringify(user) !== JSON.stringify(initialUser) ||
                                    JSON.stringify(location) !== JSON.stringify(initialLocation) ||
                                    JSON.stringify(preferences) !== JSON.stringify(initialPreferences) ||
                                    JSON.stringify(privacy) !== JSON.stringify(initialPrivacy)
                                ) : false;

                                return (
                                    <Button
                                        onClick={handleSave}
                                        isLoading={isSaving}
                                        disabled={!hasChanges && !saved}
                                        fullWidth
                                        className="shadow-lg"
                                    >
                                        {saved ? `✓ ${t('profile.changesSaved') || 'Changes Saved'}` : t('profile.saveChanges') || 'Save Changes'}
                                    </Button>
                                );
                            })()}
                            <Button onClick={handleLogout} variant="danger" fullWidth>
                                <LogOut className="w-4 h-4 mr-2" />
                                {t('profile.logout') || 'Logout'}
                            </Button>
                        </div>
                    </div>

                </div>
            </main>
        </AuthGuard>
    );
}
