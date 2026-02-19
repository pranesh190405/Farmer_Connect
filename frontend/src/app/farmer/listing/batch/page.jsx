'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, Save, ArrowLeft, Upload } from 'lucide-react';
import { ApiService } from '@/services/apiService';
import { showToast } from '@/components/ui/Toast/Toast';
import styles from './page.module.css';

const CROP_VALUES = ['', 'Potato', 'Onion', 'Tomato', 'Wheat', 'Rice', 'Cotton'];

export default function BatchListingPage() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const CROPS = CROP_VALUES.map(val => ({
        value: val,
        label: val ? (t(`listing.crops.${val.toLowerCase()}`) || val) : (t('listing.new.selectCrop') || 'Select Crop'),
    }));

    const [rows, setRows] = useState([
        { id: 1, crop: '', variety: '', quantity: '', price: '', minQty: '', image: '' }
    ]);

    const handleAddRow = () => {
        setRows([...rows, {
            id: Date.now(),
            crop: '',
            variety: '',
            quantity: '',
            price: '',
            minQty: '',
            image: ''
        }]);
    };

    const handleRemoveRow = (id) => {
        if (rows.length === 1) return;
        setRows(rows.filter(row => row.id !== id));
    };

    const handleChange = (id, field, value) => {
        setRows(rows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    // Generic function to mock image upload
    const handleImageUpload = (id) => {
        // In real app, this would trigger file input
        // Here we just set a dummy image based on crop type or generic
        const row = rows.find(r => r.id === id);
        if (!row.crop) {
            showToast('Select a crop first', 'error');
            return;
        }

        // Mock image URL
        const mockImage = `https://source.unsplash.com/400x300/?${row.crop.toLowerCase()},vegetable`;
        handleChange(id, 'image', mockImage);
        showToast('Image uploaded (simulated)', 'success');
    };

    const validate = () => {
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (!row.crop) return `Row ${i + 1}: Select a crop`;
            if (!row.quantity) return `Row ${i + 1}: Enter quantity`;
            if (!row.price) return `Row ${i + 1}: Enter price`;
        }
        return null;
    };

    const handleSubmit = async () => {
        const error = validate();
        if (error) {
            showToast(error, 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            // Submit all rows sequentially (or batch API if available)
            await Promise.all(rows.map(row => ApiService.addListing({
                cropName: `${row.crop} ${row.variety ? `(${row.variety})` : ''}`.trim(),
                category: 'vegetables',
                variety: row.variety || '',
                quantity: parseFloat(row.quantity),
                unit: 'kg',
                expectedPrice: parseFloat(row.price),
                minQty: parseFloat(row.minQty) || 1,
                imageUrl: row.image || '',
            })));

            showToast('All listings created successfully!', 'success');
            setTimeout(() => {
                router.push('/farmer/dashboard');
            }, 1000);
        } catch (err) {
            showToast('Failed to create listings', 'error');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b px-6 py-4 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">{t('listing.batch.title') || 'Batch Listing'}</h1>
                    </div>
                </div>
            </header>

            <main className={styles.container}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>{t('listing.batch.cropDetails') || 'Crop Details'}</th>
                                <th style={{ width: '15%' }}>{t('listing.batch.quantity') || 'Quantity (kg)'}</th>
                                <th style={{ width: '15%' }}>{t('listing.batch.pricePerKg') || 'Price (₹/kg)'}</th>
                                <th style={{ width: '15%' }}>{t('listing.batch.minOrder') || 'Min. Order'}</th>
                                <th style={{ width: '20%' }}>{t('listing.batch.photo') || 'Photo'}</th>
                                <th style={{ width: '10%' }}>{t('listing.batch.actions') || 'Actions'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.id}>
                                    <td>
                                        <div className="space-y-2">
                                            <select
                                                className={styles.select}
                                                value={row.crop}
                                                onChange={(e) => handleChange(row.id, 'crop', e.target.value)}
                                            >
                                                {CROPS.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                placeholder={t('listing.new.varietyPlaceholder') || 'Variety (Optional)'}
                                                value={row.variety}
                                                onChange={(e) => handleChange(row.id, 'variety', e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className={styles.input}
                                            placeholder={t('listing.batch.totalQty') || 'Total Qty'}
                                            value={row.quantity}
                                            onChange={(e) => handleChange(row.id, 'quantity', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className={styles.input}
                                            placeholder={t('listing.batch.price') || 'Price'}
                                            value={row.price}
                                            onChange={(e) => handleChange(row.id, 'price', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className={styles.input}
                                            placeholder={t('listing.batch.minQty') || 'Min Qty'}
                                            value={row.minQty}
                                            onChange={(e) => handleChange(row.id, 'minQty', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        {row.image ? (
                                            <div className="relative w-16 h-16 rounded overflow-hidden group">
                                                <img src={row.image} alt="Crop" className="w-full h-full object-cover" />
                                                <button
                                                    className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                                    onClick={() => handleChange(row.id, 'image', '')}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 text-xs flex flex-col items-center gap-1"
                                                onClick={() => handleImageUpload(row.id)}
                                            >
                                                <Upload className="w-4 h-4" />
                                                {t('listing.batch.addPhoto') || 'Add Photo'}
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        {rows.length > 1 && (
                                            <button
                                                className={styles.removeBtn}
                                                onClick={() => handleRemoveRow(row.id)}
                                                title="Remove row"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button className={styles.addBtn} onClick={handleAddRow}>
                    <Plus className="w-5 h-5 inline-block mr-2" />
                    {t('listing.batch.addAnother') || 'Add Another Crop'}
                </button>
            </main>

            <div className={styles.footer}>
                <button
                    className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => router.back()}
                >
                    {t('common.cancel') || 'Cancel'}
                </button>
                <button
                    className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span>{t('listing.batch.saving') || 'Saving...'}</span>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            {t('listing.batch.submitAll') || 'Submit All'}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
