'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Search, Filter, ShoppingCart, Heart, MapPin, Store, SlidersHorizontal, X, Star } from 'lucide-react';
import { addToCart, openCart } from '@/store/slices/cartSlice';
import { toast } from '@/components/ui/Toast/Toast';
import { MockService } from '@/services/mockData';

// Regions
const REGIONS = [
    { value: 'all', labelKey: 'market.filters.allIndia' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Gujarat', label: 'Gujarat' },
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
            const data = await MockService.getMarketCrops();
            // Assign random categories for demo if not present
            const enhancedData = data.map(item => ({
                ...item,
                category: item.category || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
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
        <div className="min-h-screen bg-gray-50 pb-24 font-sans">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-20 px-4 md:px-6 py-4 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{t('nav.market')}</h1>
                            <p className="text-gray-500 text-sm mt-1">{t('market.subtitle')}</p>
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            className="md:hidden p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto bg-gray-100 rounded-xl px-4 py-2 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-green-500 focus-within:bg-white transition-all">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('market.searchPlaceholder')}
                            className="bg-transparent border-none outline-none text-sm w-full md:w-80 text-gray-900 placeholder-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 md:p-6">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters - Desktop: Sticky, Mobile: Fixed Overlay */}
                    <aside className={`
                        fixed inset-0 z-30 bg-white lg:static lg:bg-transparent lg:w-64 lg:block
                        ${showFilters ? 'block' : 'hidden'}
                    `}>
                        <div className="h-full overflow-y-auto lg:h-auto lg:overflow-visible bg-white lg:bg-transparent p-6 lg:p-0">

                            {/* Mobile Close Button */}
                            <div className="flex justify-between items-center lg:hidden mb-6">
                                <h2 className="text-xl font-bold text-gray-900">{t('market.filters.title')}</h2>
                                <button onClick={() => setShowFilters(false)} className="p-2 bg-gray-100 rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Categories */}
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Filter className="w-4 h-4 text-green-600" />
                                        {t('market.filters.categories')}
                                    </h3>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => setSelectedCategory('all')}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                        >
                                            {t('market.filters.allCategories')}
                                        </button>
                                        {CATEGORIES.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${selectedCategory === cat ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                            >
                                                {t(`categories.${cat}`) || cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Regions */}
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-green-600" />
                                        {t('market.filters.region')}
                                    </h3>
                                    <div className="space-y-2">
                                        {REGIONS.map(r => (
                                            <label key={r.value} className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="region"
                                                        value={r.value}
                                                        checked={selectedRegion === r.value}
                                                        onChange={(e) => setSelectedRegion(e.target.value)}
                                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 checked:border-green-600 checked:bg-green-600 transition-all"
                                                    />
                                                </div>
                                                <span className={`text-sm ${selectedRegion === r.value ? 'text-green-700 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                                    {r.labelKey ? t(r.labelKey) : r.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range (Mock UI) */}
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-4">{t('market.filters.priceRange')}</h3>
                                    <div className="px-2">
                                        <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
                                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                                            <span>₹0</span>
                                            <span>₹1000+</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSelectedRegion('all');
                                        setSearchQuery('');
                                    }}
                                    className="w-full py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                                >
                                    {t('market.filters.reset')}
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {/* Active Filters Summary */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {(selectedCategory !== 'all' || selectedRegion !== 'all' || searchQuery) && (
                                <span className="text-sm text-gray-500 py-1.5">{t('market.filters.active')}</span>
                            )}
                            {selectedCategory !== 'all' && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {t(`categories.${selectedCategory}`) || selectedCategory}
                                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                                </span>
                            )}
                            {selectedRegion !== 'all' && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {(() => {
                                        const r = REGIONS.find(reg => reg.value === selectedRegion);
                                        return r ? (r.labelKey ? t(r.labelKey) : r.label) : selectedRegion;
                                    })()}
                                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedRegion('all')} />
                                </span>
                            )}
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100">
                                        <div className="h-48 bg-gray-200 w-full"></div>
                                        <div className="p-4 space-y-3">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                            <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredCrops.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{t('market.noCrops.title')}</h3>
                                <p className="text-gray-500 mt-2">{t('market.noCrops.desc')}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCrops.map((item) => (
                                    <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
                                                    <Heart className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {item.location}
                                            </div>
                                        </div>

                                        <div className="p-5 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-gray-900 text-lg truncate pr-2">{item.name}</h3>
                                                <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded text-xs font-bold text-green-700">
                                                    <Star className="w-3 h-3 fill-green-700" /> {item.rating}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                                                <Store className="w-3.5 h-3.5" />
                                                <span className="truncate">{item.farmer}</span>
                                            </div>

                                            <div className="mt-auto flex items-end justify-between gap-4">
                                                <div>
                                                    <p className="text-2xl font-bold text-green-700">{item.price}</p>
                                                    <p className="text-xs text-gray-400 font-medium">{t('market.card.min')} {item.minQty}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="bg-green-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 active:scale-95 transition-all shadow-lg shadow-green-100 flex items-center gap-2"
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
    );
}
