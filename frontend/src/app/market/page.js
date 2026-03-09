'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import AuthGuard from '@/components/AuthGuard';
import { Search, Filter, ShoppingCart, Heart, MapPin, Store, SlidersHorizontal, X, Star } from 'lucide-react';
import { addToCart, openCart } from '@/store/slices/cartSlice';
import { toast } from '@/components/ui/Toast/Toast';
import { ApiService } from '@/services/apiService';
import { translateCropName } from '@/utils/translateCropName';

// Regions
const REGIONS = [
    { value: 'all', labelKey: 'market.filters.allIndia' },
    { value: 'Maharashtra', labelKey: 'market.regions.maharashtra' },
    { value: 'Punjab', labelKey: 'market.regions.punjab' },
    { value: 'Madhya Pradesh', labelKey: 'market.regions.madhyaPradesh' },
    { value: 'Karnataka', labelKey: 'market.regions.karnataka' },
    { value: 'Tamil Nadu', labelKey: 'market.regions.tamilNadu' },
    { value: 'Gujarat', labelKey: 'market.regions.gujarat' },
];

const CATEGORIES = ['vegetables', 'fruits', 'grains', 'spices', 'flowers'];

export default function MarketPage() {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle

    const [crops, setCrops] = useState([]);
    const [filteredCrops, setFilteredCrops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        loadCrops();
    }, []);

    const loadCrops = async () => {
        try {
            const data = await ApiService.getMarketCrops();
            // Assign random categories for demo if not present
            const enhancedData = data.map(item => ({
                ...item,
                category: item.category || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
                image: item.image || 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=400&h=400' // Fallback image
            }));
            setCrops(enhancedData);
            setFilteredCrops(enhancedData);
        } catch (error) {
            console.error(error);
            toast.error(t('common.error') || "Failed to load market data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let result = crops;

        // Filter by Region
        if (selectedRegion !== 'all') {
            result = result.filter(item => item.location.includes(selectedRegion));
        }

        // Filter by Category
        if (selectedCategory !== 'all') {
            result = result.filter(item => item.category === selectedCategory);
        }

        // Filter by Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(item =>
                item.name.toLowerCase().includes(q) ||
                item.farmer.toLowerCase().includes(q)
            );
        }

        setFilteredCrops(result);
    }, [selectedRegion, selectedCategory, searchQuery, crops]);

    const handleAddToCart = (item) => {
        dispatch(addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            farmer: item.farmer,
            minQty: item.minQty,
            quantity: 1 // Default to 1 unit
        }));
        toast.success(t('cart.added') || `${item.name} added to cart!`);
        dispatch(openCart());
    };

    if (!mounted) return null;

    return (
        <AuthGuard>
            <div className="min-h-screen pb-24 font-sans" style={{ background: 'linear-gradient(180deg, #fefce8 0%, #fffef5 50%, #fefce8 100%)' }}>
                <main className="max-w-7xl mx-auto p-4 md:p-6">
                    {/* Page Title + Search */}
                    <div style={{
                        background: 'linear-gradient(135deg, #065f46, #10b981)',
                        borderRadius: '20px', padding: '1.5rem 2rem', marginBottom: '1.5rem',
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
                        alignItems: 'center', gap: '1rem',
                        boxShadow: '0 8px 30px rgba(6,95,70,0.3)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <div>
                                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{t('nav.market')}</h1>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{t('market.subtitle')}</p>
                            </div>

                            {/* Mobile Filter Toggle */}
                            <button
                                className="md:hidden"
                                onClick={() => setShowFilters(!showFilters)}
                                style={{
                                    padding: '0.5rem', background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '0.5rem', color: 'white', border: 'none', cursor: 'pointer'
                                }}
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                            </button>
                        </div>

                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%',
                            maxWidth: '24rem', background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(10px)', borderRadius: '12px',
                            padding: '0.625rem 1rem', border: '1px solid rgba(255,255,255,0.25)'
                        }}>
                            <Search className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.7)' }} />
                            <input
                                type="text"
                                placeholder={t('market.searchPlaceholder')}
                                style={{
                                    background: 'transparent', border: 'none', outline: 'none',
                                    fontSize: '0.875rem', width: '100%', color: 'white'
                                }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <aside className={`fixed inset-0 z-30 lg:static lg:w-64 lg:block ${showFilters ? 'block' : 'hidden'} h-full overflow-y-auto lg:h-auto lg:overflow-visible shadow-xl lg:shadow-none transition-all duration-300`}
                            style={{
                                background: showFilters ? '#fffef5' : 'transparent',
                                padding: showFilters ? '1rem' : '0'
                            }}
                        >
                            <div className="flex justify-between items-center lg:hidden" style={{ marginBottom: '1rem' }}>
                                <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: '#1c1917' }}>{t('market.filters.title') || 'Filters'}</h3>
                                <button onClick={() => setShowFilters(false)} style={{
                                    padding: '0.5rem', background: '#f5f5f4', borderRadius: '50%',
                                    border: 'none', cursor: 'pointer'
                                }}>
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {/* Categories */}
                                <div style={{
                                    background: '#fffef5', borderRadius: '16px',
                                    padding: '1.25rem', border: '1px solid #e7e5e4'
                                }}>
                                    <h3 style={{ fontWeight: 700, color: '#1c1917', marginBottom: '0.75rem' }}>{t('market.filters.categories')}</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === 'all'}
                                                onChange={() => setSelectedCategory('all')}
                                                style={{ accentColor: '#065f46' }}
                                            />
                                            <span style={{ color: '#44403c' }}>{t('market.filters.allCategories')}</span>
                                        </label>
                                        {CATEGORIES.map(cat => (
                                            <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    checked={selectedCategory === cat}
                                                    onChange={() => setSelectedCategory(cat)}
                                                    style={{ accentColor: '#065f46' }}
                                                />
                                                <span style={{ color: '#44403c', textTransform: 'capitalize' }}>{t('categories.' + cat)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Regions */}
                                <div style={{
                                    background: '#fffef5', borderRadius: '16px',
                                    padding: '1.25rem', border: '1px solid #e7e5e4'
                                }}>
                                    <h3 style={{ fontWeight: 700, color: '#1c1917', marginBottom: '0.75rem' }}>{t('market.filters.regions')}</h3>
                                    <select
                                        style={{
                                            width: '100%', padding: '0.625rem',
                                            background: '#fefce8', border: '1px solid #e7e5e4',
                                            borderRadius: '12px', outline: 'none', color: '#1c1917',
                                            fontSize: '0.875rem'
                                        }}
                                        value={selectedRegion}
                                        onChange={(e) => setSelectedRegion(e.target.value)}
                                    >
                                        {REGIONS.map(region => (
                                            <option key={region.value} value={region.value}>
                                                {region.label || t(region.labelKey)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </aside>

                        {/* Grid Content */}
                        <div className="flex-1">
                            {isLoading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} style={{
                                            background: '#fffef5', borderRadius: '20px',
                                            height: '20rem', border: '1px solid #e7e5e4'
                                        }} className="animate-pulse"></div>
                                    ))}
                                </div>
                            ) : filteredCrops.length === 0 ? (
                                <div style={{
                                    textAlign: 'center', padding: '5rem 0', background: '#fffef5',
                                    borderRadius: '20px', border: '2px dashed #d6d3d1'
                                }}>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1c1917' }}>{t('market.noCrops.title')}</h3>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredCrops.map((item) => (
                                        <div key={item.id} style={{
                                            background: '#fffef5', borderRadius: '20px',
                                            border: '1px solid #e7e5e4', overflow: 'hidden',
                                            boxShadow: '0 4px 20px rgba(28,25,23,0.04)',
                                            display: 'flex', flexDirection: 'column',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.transform = 'translateY(-4px)';
                                                e.currentTarget.style.boxShadow = '0 16px 40px rgba(6,95,70,0.12)';
                                                e.currentTarget.style.borderColor = 'rgba(6,95,70,0.2)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(28,25,23,0.04)';
                                                e.currentTarget.style.borderColor = '#e7e5e4';
                                            }}
                                        >
                                            {/* Image */}
                                            <div style={{ position: 'relative', height: '12rem', overflow: 'hidden', background: '#f5f5f4' }}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover"
                                                    style={{ transition: 'transform 0.7s' }}
                                                />
                                                <div style={{
                                                    position: 'absolute', bottom: '0.75rem', left: '0.75rem',
                                                    background: 'rgba(6,95,70,0.85)', backdropFilter: 'blur(8px)',
                                                    padding: '0.25rem 0.75rem', borderRadius: '9999px',
                                                    fontSize: '0.75rem', fontWeight: 700, color: 'white',
                                                    display: 'flex', alignItems: 'center', gap: '0.25rem'
                                                }}>
                                                    <MapPin className="w-3 h-3" />
                                                    {item.location}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                                    <h3 style={{ fontWeight: 700, color: '#1c1917', fontSize: '1.125rem' }}>{translateCropName(item.name, t)}</h3>
                                                    <div style={{
                                                        display: 'flex', alignItems: 'center', gap: '0.25rem',
                                                        background: '#fef3c7', padding: '0.125rem 0.5rem',
                                                        borderRadius: '6px', fontSize: '0.75rem',
                                                        fontWeight: 700, color: '#92400e'
                                                    }}>
                                                        <Star className="w-3 h-3" style={{ fill: '#d97706' }} /> {item.rating}
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#78716c', marginBottom: '1rem' }}>
                                                    <Store className="w-3.5 h-3.5" />
                                                    <span>{item.farmer}</span>
                                                </div>

                                                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem' }}>
                                                    <div>
                                                        <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#065f46' }}>{item.price}</p>
                                                        <p style={{ fontSize: '0.75rem', color: '#a8a29e', fontWeight: 500 }}>{t('market.card.min')} {item.minQty} {item.unit}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleAddToCart(item)}
                                                        style={{
                                                            background: 'linear-gradient(135deg, #065f46, #10b981)',
                                                            color: 'white', padding: '0.625rem 1rem',
                                                            borderRadius: '12px', fontWeight: 700, fontSize: '0.875rem',
                                                            border: 'none', cursor: 'pointer',
                                                            boxShadow: '0 4px 15px rgba(6,95,70,0.3)',
                                                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                                        }}
                                                    >
                                                        <ShoppingCart className="w-4 h-4" />
                                                        {t('market.card.add')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}
