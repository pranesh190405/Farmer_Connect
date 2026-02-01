'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    const [user, setUser] = useState({
        name: 'Ramesh Kumar',
        mobile: '9876543210',
        userType: 'farmer',
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
            alert('Geolocation is not supported by your browser');
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
                alert('Unable to retrieve your location');
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

    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Profile Settings</h1>
                    <Badge status={user.verificationStatus} />
                </header>

                {/* Profile Info */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>👤 Account Information</h2>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <label>Name</label>
                            <span>{user.name}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Mobile</label>
                            <span>+91 {user.mobile}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Account Type</label>
                            <span className={styles.capitalize}>{user.userType}</span>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => window.location.href = '/profile/kyc'}>
                        Update KYC Documents
                    </Button>
                </section>

                {/* Location */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>📍 Location</h2>

                    <div className={styles.locationRow}>
                        <Select
                            label="State"
                            placeholder="Select state"
                            options={STATES}
                            value={location.state}
                            onChange={(e) => setLocation(prev => ({ ...prev, state: e.target.value }))}
                        />
                        <Input
                            label="District"
                            placeholder="Enter district"
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
                        📍 Auto-detect Location
                    </Button>
                </section>

                {/* Crop Interests */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>🌾 Crop Interests</h2>
                    <p className={styles.sectionHint}>Select crops you're interested in buying or selling</p>

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
                    <h2 className={styles.sectionTitle}>🔔 Notifications</h2>

                    <div className={styles.toggleList}>
                        <div className={styles.toggleItem}>
                            <div>
                                <strong>SMS Alerts</strong>
                                <p>Receive important updates via SMS</p>
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
                                <strong>Price Alerts</strong>
                                <p>Get notified when prices change</p>
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

                {/* Privacy */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>🔒 Privacy</h2>

                    <div className={styles.toggleList}>
                        <div className={styles.toggleItem}>
                            <div>
                                <strong>Public Profile</strong>
                                <p>Allow others to view your profile</p>
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
                                <strong>Show Location</strong>
                                <p>Display your location on listings</p>
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
                                <strong>Show Contact</strong>
                                <p>Make phone number visible to buyers</p>
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
                    {saved && <span className={styles.savedMessage}>✓ Settings saved!</span>}
                    <Button onClick={handleSave} isLoading={isSaving} fullWidth>
                        Save Changes
                    </Button>
                </div>
            </div>
        </main>
    );
}
