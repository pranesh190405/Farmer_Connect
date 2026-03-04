'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Plus, Package, Clock, MoreVertical, Edit, Trash } from 'lucide-react';
import { ApiService } from '@/services/apiService';
import { toast } from '@/components/ui/Toast/Toast';
import { translateCropName } from '@/utils/translateCropName';

export default function FarmerDashboard() {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active');

    useEffect(() => {
        setMounted(true);
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const data = await ApiService.getFarmerListings();
            setListings(data);
        } catch (error) {
            console.error('Failed to fetch listings:', error);
            toast.error(t('common.error') || 'Failed to load listings');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm(t('common.confirmDelete') || 'Are you sure you want to delete this listing?')) {
            const success = await ApiService.deleteListing(id);
            if (success) {
                toast.success(t('common.deleteSuccess') || 'Listing deleted successfully');
                fetchListings(); // Refresh
            } else {
                toast.error(t('common.error') || 'Failed to delete');
            }
        }
    };

    if (!mounted) return null;

    const activeCount = listings.filter(l => l.status === 'active').length;

    return (
        <div className="min-h-screen pb-24 font-sans" style={{ background: 'linear-gradient(180deg, #fefce8 0%, #fffef5 50%, #fefce8 100%)' }}>
            <main className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Welcome + Actions — Gradient Banner */}
                <div style={{
                    background: 'linear-gradient(135deg, #065f46, #10b981)',
                    borderRadius: '20px', padding: '2rem', color: 'white',
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
                    alignItems: 'center', gap: '1rem',
                    boxShadow: '0 8px 30px rgba(6,95,70,0.3)'
                }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t('dashboard.welcomeFarmer')}</h1>
                        <p style={{ opacity: 0.85, fontSize: '0.875rem', marginTop: '0.25rem' }}>{t('dashboard.manageCrops')}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <Link
                            href="/farmer/listing/batch"
                            style={{
                                background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
                                color: 'white', padding: '0.625rem 1.25rem', borderRadius: '9999px',
                                fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem',
                                fontSize: '0.875rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            <Package className="w-4 h-4" />
                            {t('dashboard.batchMode') || 'Batch Mode'}
                        </Link>
                        <Link
                            href="/farmer/listing/new"
                            style={{
                                background: '#fbbf24', color: '#1c1917',
                                padding: '0.625rem 1.5rem', borderRadius: '9999px',
                                fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem',
                                fontSize: '0.875rem', textDecoration: 'none',
                                boxShadow: '0 4px 15px rgba(251,191,36,0.4)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            <Plus className="w-5 h-5" />
                            {t('dashboard.newListing')}
                        </Link>
                    </div>
                </div>

                {/* Stats Card — emerald gradient icon */}
                <div style={{
                    background: '#fffef5', borderRadius: '16px', padding: '1.5rem',
                    border: '1px solid #e7e5e4', display: 'flex', alignItems: 'center', gap: '1rem',
                    boxShadow: '0 4px 20px rgba(28,25,23,0.04)',
                    transition: 'box-shadow 0.3s'
                }}>
                    <div style={{
                        padding: '0.75rem', borderRadius: '14px',
                        background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                        color: '#065f46'
                    }}>
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p style={{ color: '#78716c', fontSize: '0.875rem', fontWeight: 500 }}>{t('dashboard.activeListings')}</p>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1c1917' }}>{activeCount}</h3>
                    </div>
                </div>

                {/* Tabs — emerald active states */}
                <div>
                    <div style={{ display: 'flex', gap: '2rem', borderBottom: '2px solid #e7e5e4' }}>
                        {['active', 'sold', 'expired'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    paddingBottom: '0.75rem', fontSize: '1rem', fontWeight: 600,
                                    textTransform: 'capitalize', position: 'relative', background: 'none',
                                    border: 'none', cursor: 'pointer',
                                    color: activeTab === tab ? '#065f46' : '#a8a29e',
                                    transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                {t(`dashboard.status.${tab}`) || tab}
                                <span style={{
                                    marginLeft: '0.5rem', fontSize: '0.75rem', padding: '0.125rem 0.5rem',
                                    borderRadius: '9999px',
                                    background: activeTab === tab ? '#ecfdf5' : '#f5f5f4',
                                    color: activeTab === tab ? '#065f46' : '#78716c'
                                }}>
                                    {listings.filter(l => l.status === tab).length}
                                </span>
                                {activeTab === tab && (
                                    <div style={{
                                        position: 'absolute', bottom: '-2px', left: 0, width: '100%',
                                        height: '3px', background: 'linear-gradient(90deg, #065f46, #10b981)',
                                        borderRadius: '3px 3px 0 0'
                                    }} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Listings Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                        <div className="animate-spin rounded-full h-12 w-12 mx-auto" style={{ borderBottom: '3px solid #065f46', borderLeft: '3px solid transparent', borderRight: '3px solid transparent', borderTop: '3px solid transparent' }}></div>
                        <p style={{ marginTop: '1rem', color: '#78716c' }}>{t('common.loading')}</p>
                    </div>
                ) : listings.filter(l => l.status === activeTab).length === 0 ? (
                    <div style={{
                        textAlign: 'center', padding: '5rem 0', background: '#fffef5',
                        borderRadius: '20px', border: '2px dashed #d6d3d1'
                    }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 1.5rem', color: '#10b981'
                        }}>
                            <Package className="w-10 h-10" style={{ opacity: 0.6 }} />
                        </div>
                        <h3 style={{ color: '#1c1917', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem' }}>{t('dashboard.noListings')}</h3>
                        <p style={{ color: '#78716c', fontSize: '0.875rem', maxWidth: '20rem', margin: '0 auto 1.5rem' }}>
                            {t('dashboard.startSellingDescription')}
                        </p>
                        <Link href="/farmer/listing/new" style={{ color: '#065f46', fontWeight: 700, textDecoration: 'none' }}>
                            + {t('dashboard.createFirstListing')}
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listings.filter(l => l.status === activeTab).map((item) => (
                            <div key={item.id} style={{
                                background: '#fffef5', borderRadius: '20px',
                                border: '1px solid #e7e5e4', overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(28,25,23,0.04)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(6,95,70,0.1)';
                                    e.currentTarget.style.borderColor = 'rgba(6,95,70,0.2)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(28,25,23,0.04)';
                                    e.currentTarget.style.borderColor = '#e7e5e4';
                                }}
                            >
                                <div style={{ position: 'relative', height: '12rem', overflow: 'hidden', background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)' }}>
                                    {item.image ? (
                                        <img src={item.image} alt={item.crop} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Package className="w-12 h-12" style={{ color: '#34d399' }} />
                                        </div>
                                    )}
                                    <div style={{
                                        position: 'absolute', top: '0.75rem', right: '0.75rem',
                                        background: 'rgba(255,254,245,0.9)', backdropFilter: 'blur(8px)',
                                        padding: '0.25rem 0.75rem', borderRadius: '9999px',
                                        fontSize: '0.75rem', fontWeight: 700, color: '#1c1917'
                                    }}>
                                        {item.quantity}
                                    </div>
                                </div>

                                <div style={{ padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontWeight: 700, color: '#1c1917', fontSize: '1.125rem' }}>{translateCropName(item.crop, t)}</h3>
                                        <button style={{ color: '#a8a29e', padding: '0.25rem', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div style={{ marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#065f46' }}>{item.price}</span>
                                    </div>

                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        fontSize: '0.875rem', color: '#78716c',
                                        paddingTop: '1rem', borderTop: '1px solid #e7e5e4'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                            <Clock className="w-4 h-4" />
                                            {item.date}
                                        </div>
                                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                                            <Link
                                                href={`/farmer/listing/edit/${item.id}`}
                                                style={{ padding: '0.5rem', color: '#0ea5e9', borderRadius: '0.5rem', transition: 'background 0.2s' }}
                                                title={t('common.edit')}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                style={{ padding: '0.5rem', color: '#dc2626', borderRadius: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                                                title={t('common.delete')}
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
