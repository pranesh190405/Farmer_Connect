'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Upload, MapPin, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ApiService } from '@/services/apiService';
import { toast } from '@/components/ui/Toast/Toast';
import Button from '@/components/ui/Button';
import QualitySliders from '@/components/ui/QualitySliders';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

export default function NewListingPage() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Location state
    const [location, setLocation] = useState({
        address: '',
        lat: null,
        lng: null,
        status: 'detecting', // 'detecting' | 'detected' | 'denied' | 'error'
    });

    const CROP_TYPES = [
        { value: 'Potato', label: t('listing.crops.potato') || 'Potato' },
        { value: 'Onion', label: t('listing.crops.onion') || 'Onion' },
        { value: 'Tomato', label: t('listing.crops.tomato') || 'Tomato' },
        { value: 'Wheat', label: t('listing.crops.wheat') || 'Wheat' },
        { value: 'Rice', label: t('listing.crops.rice') || 'Rice' },
        { value: 'Cotton', label: t('listing.crops.cotton') || 'Cotton' },
    ];

    const [formData, setFormData] = useState({
        crop: '',
        variety: '',
        quantity: '',
        price: '',
        minQty: '',
        quality: { size: 50, freshness: 80, ripeness: 60 }
    });

    // Auto-detect location on mount
    useEffect(() => {
        if (typeof window === 'undefined' || !navigator.geolocation) {
            setLocation(prev => ({ ...prev, status: 'error' }));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation(prev => ({ ...prev, lat: latitude, lng: longitude }));

                // Reverse geocode using OpenStreetMap Nominatim (free, no API key)
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
                        { headers: { 'Accept-Language': 'en' } }
                    );
                    const data = await res.json();
                    const addr = data.address || {};
                    // Build a short readable address: village/city, district, state
                    const parts = [
                        addr.village || addr.town || addr.city || addr.suburb || '',
                        addr.county || addr.state_district || '',
                        addr.state || '',
                    ].filter(Boolean);
                    const addressStr = parts.join(', ') || data.display_name || '';

                    setLocation({
                        address: addressStr,
                        lat: latitude,
                        lng: longitude,
                        status: 'detected',
                    });
                } catch {
                    // Geocoding failed but we still have coordinates
                    setLocation({
                        address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
                        lat: latitude,
                        lng: longitude,
                        status: 'detected',
                    });
                }
            },
            (err) => {
                console.warn('Geolocation error:', err.message);
                if (err.code === 1) {
                    setLocation(prev => ({ ...prev, status: 'denied' }));
                    toast.warning?.('Location access denied. Listing will be created without location.') ||
                        toast.error?.('Location access denied');
                } else {
                    setLocation(prev => ({ ...prev, status: 'error' }));
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.crop || !formData.quantity || !formData.price) {
            toast.error(t('common.fillFields') || 'Please fill all required fields');
            return;
        }

        setIsLoading(true);

        try {
            const newListing = {
                cropName: `${formData.crop} ${formData.variety ? `(${formData.variety})` : ''}`.trim(),
                category: 'vegetables',
                variety: formData.variety || '',
                quantity: parseFloat(formData.quantity),
                unit: 'kg',
                expectedPrice: parseFloat(formData.price),
                minQty: parseFloat(formData.minQty) || 50,
                // Location data (auto-detected)
                locationAddress: location.address || '',
                locationLat: location.lat || null,
                locationLng: location.lng || null,
            };

            await ApiService.addListing(newListing);
            toast.success(t('common.listingCreated') || 'Listing created successfully!');
            router.push('/farmer/dashboard');
        } catch (error) {
            console.error(error);
            toast.error(t('common.error') || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 shadow-sm flex items-center gap-4">
                <Link href="/farmer/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <h1 className="text-xl font-bold text-gray-900">{t('dashboard.newListing')}</h1>
            </header>

            <main className="max-w-2xl mx-auto p-6">
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">

                    {/* Image Upload Placeholder */}
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-green-500 hover:bg-green-50 hover:text-green-600 transition-all cursor-pointer group">
                        <div className="bg-gray-100 p-4 rounded-full mb-3 group-hover:bg-white">
                            <Upload className="w-6 h-6" />
                        </div>
                        <p className="font-medium text-sm">{t('listing.new.uploadImage')}</p>
                        <p className="text-xs text-gray-400 mt-1">{t('listing.new.imageSupport')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                            label={t('listing.new.cropType')}
                            placeholder={t('listing.new.selectCrop')}
                            options={CROP_TYPES}
                            value={formData.crop}
                            onChange={(e) => setFormData(prev => ({ ...prev, crop: e.target.value }))}
                        />
                        <Input
                            label={t('listing.new.variety')}
                            placeholder={t('listing.new.varietyPlaceholder')}
                            value={formData.variety}
                            onChange={(e) => setFormData(prev => ({ ...prev, variety: e.target.value }))}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label={t('listing.new.totalQuantity')}
                            placeholder={t('listing.new.quantityPlaceholder')}
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                        />
                        <Input
                            label={t('listing.new.minQuantity')}
                            placeholder={t('listing.new.minQuantityPlaceholder')}
                            type="number"
                            value={formData.minQty}
                            onChange={(e) => setFormData(prev => ({ ...prev, minQty: e.target.value }))}
                        />
                    </div>

                    <Input
                        label={t('listing.new.pricePerKg')}
                        placeholder={t('listing.new.pricePlaceholder')}
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    />

                    <QualitySliders
                        initialQuality={formData.quality}
                        onChange={(q) => setFormData(prev => ({ ...prev, quality: q }))}
                    />

                    {/* Auto-Detected Location Display */}
                    <div className="rounded-xl border border-gray-200 p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <MapPin className="w-4 h-4 inline-block mr-1 -mt-0.5" />
                            Location
                        </label>
                        {location.status === 'detecting' && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Detecting your location...
                            </div>
                        )}
                        {location.status === 'detected' && (
                            <div className="flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-sm text-gray-700">{location.address}</span>
                            </div>
                        )}
                        {location.status === 'denied' && (
                            <p className="text-sm text-amber-600">
                                📍 Location access was denied. Your listing will be created without location.
                            </p>
                        )}
                        {location.status === 'error' && (
                            <p className="text-sm text-gray-500">
                                📍 Could not detect location. Your listing will be created without location.
                            </p>
                        )}
                    </div>

                    <div className="pt-4">
                        <Button type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
                            {isLoading ? t('listing.new.creating') : t('listing.new.createButton')}
                        </Button>
                    </div>

                </form>
            </main>
        </div>
    );
}
