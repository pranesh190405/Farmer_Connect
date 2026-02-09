'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/slices/authSlice';
import { ShieldCheck, AlertTriangle, MapPin, User, Phone, Globe, Bell, Lock, LogOut } from 'lucide-react';

import Button from '@/components/ui/Button';
import AuthGuard from '@/components/AuthGuard';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
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

    useEffect(() => {
        if (!isAuthenticated) router.push('/login');
    }, [isAuthenticated, router]);

    // Auto-detect location
    const handleAutoDetect = () => {
        if (!navigator.geolocation) {
            alert(t('profile.locationError') || 'Geolocation is not supported by your browser');
            return;
        }

        setLocationLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Mock location set
                setTimeout(() => {
                    setLocation(prev => ({
                        ...prev,
                        state: 'ka',
                        district: 'Bangalore Rural',
                        autoDetect: true,
                    }));
                    setLocationLoading(false);
                }, 1000);
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
        <AuthGuard>
            <main className="min-h-screen bg-gray-50 pb-24 font-sans p-4 md:p-6">
                <div className="max-w-2xl mx-auto space-y-6">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{t('profile.title') || 'Profile Settings'}</h1>
                            <p className="text-gray-500 text-sm">Manage your account and preferences</p>
                        </div>
                        {user.aadharVerified ? (
                            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium text-sm">
                                <ShieldCheck className="w-4 h-4" />
                                Verified Farmer
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium text-sm">
                                <AlertTriangle className="w-4 h-4" />
                                Verification Pending
                            </div>
                        )}
                    </div>

                    {/* Profile Info */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <User className="w-5 h-5 text-green-600" />
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
                                    onChange={(e) => setUser(prev => ({ ...prev, mobile: e.target.value }))}
                                    prefix={<Phone className="w-4 h-4 text-gray-400" />}
                                    disabled
                                />
                            </div>

                            {/* Aadhar Section */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                    <label className="text-sm font-medium text-gray-700">Aadhar Number</label>
                                    {user.aadharVerified ? (
                                        <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                                            <ShieldCheck className="w-3 h-3" /> Verified
                                        </span>
                                    ) : (
                                        <span className="text-xs font-bold text-yellow-600 flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3" /> Pending Admin Approval
                                        </span>
                                    )}
                                </div>
                                <div className="font-mono text-lg font-medium text-gray-900 tracking-wider">
                                    {user.aadharNumber ? user.aadharNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1 **** $3') : 'Not Provided'}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.type') || 'Account Type'}</label>
                                    <div className="px-4 py-2.5 bg-gray-100 rounded-lg text-gray-700 font-medium capitalize border border-gray-200">
                                        {user.userType}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Location */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-green-600" />
                                {t('profile.location') || 'Location'}
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
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
                                className="w-full md:w-auto"
                            >
                                📍 {t('profile.autoDetect') || 'Auto-detect Location'}
                            </Button>
                        </div>
                    </section>

                    {/* Alerts */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-green-600" />
                                {t('profile.notifications') || 'Notifications'}
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div>
                                    <strong className="text-gray-900 block">{t('profile.smsAlerts') || 'SMS Alerts'}</strong>
                                    <p className="text-sm text-gray-500">{t('profile.smsAlertsDesc') || 'Receive important updates via SMS'}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={preferences.smsAlerts}
                                        onChange={(e) => setPreferences(prev => ({ ...prev, smsAlerts: e.target.checked }))}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* Language */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-green-600" />
                                {t('profile.language') || 'Language'}
                            </h2>
                        </div>
                        <div className="p-6">
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
                        </div>
                    </section>

                    {/* Save Button */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4 md:static md:bg-transparent md:border-0 md:p-0 md:mx-0">
                        <div className="flex flex-col gap-3">
                            <Button onClick={handleSave} isLoading={isSaving} fullWidth className="shadow-lg">
                                {saved ? '✓ Changes Saved' : t('profile.saveChanges') || 'Save Changes'}
                            </Button>
                            <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300" fullWidth>
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
