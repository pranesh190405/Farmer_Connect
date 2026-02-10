'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Upload, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { MockService } from '@/services/mockData';
import { toast } from '@/components/ui/Toast/Toast';
import Button from '@/components/ui/Button';
import QualitySliders from '@/components/ui/QualitySliders';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

// ... (existing imports)

export default function NewListingPage() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

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
        quality: { size: 50, freshness: 80, ripeness: 60 } // Default
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.crop || !formData.quantity || !formData.price) {
            toast.error(t('common.fillFields') || 'Please fill all required fields');
            return;
        }

        setIsLoading(true);

        try {
            const newListing = {
                crop: `${formData.crop} ${formData.variety ? `(${formData.variety})` : ''}`.trim(),
                name: `${formData.crop} ${formData.variety ? `(${formData.variety})` : ''}`.trim(),
                quantity: `${formData.quantity} kg`,
                price: `₹${formData.price}/kg`,
                minQty: `${formData.minQty || 50} kg`,
                image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
                quality: formData.quality
            };

            await MockService.addListing(newListing);
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
            {/* Header omitted for brevity in replace tool */}
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
