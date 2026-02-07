'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, ShoppingCart, Heart, MapPin, Store } from 'lucide-react';

import { MockService } from '@/services/mockData';

// Regions
const REGIONS = [
    { value: 'all', label: 'All India' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'MP', label: 'Madhya Pradesh' },
    { value: 'Karnataka', label: 'Karnataka' },
];

export default function MarketPage() {
    const { t } = useTranslation('common');
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [region, setRegion] = useState('all');
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
            setCrops(data);
            setFilteredCrops(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let result = crops;

        // Filter by Region
        if (region !== 'all') {
            result = result.filter(item => item.location.includes(region));
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
    }, [region, searchQuery, crops]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans">
            <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{t('nav.market')}</h1>
                            <p className="text-gray-500 text-sm mt-1">{t('dashboard.findFreshProduce')}</p>
                        </div>
                        <Link
                            href="/market/map"
                            className="bg-white border border-gray-200 text-gray-700 p-2.5 rounded-lg hover:bg-gray-50 hover:border-green-500 hover:text-green-600 transition-all shadow-sm ml-4"
                            title="Map View"
                        >
                            <MapPin className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                            <select
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className="pl-9 pr-8 py-2 bg-green-50 text-green-700 font-medium rounded-lg border-none focus:ring-2 focus:ring-green-500 cursor-pointer appearance-none"
                            >
                                {REGIONS.map(r => (
                                    <option key={r.value} value={r.value}>{r.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 space-y-8">
                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                    {['vegetables', 'fruits', 'grains', 'spices'].map((cat) => (
                        <button key={cat} className="px-5 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-green-500 hover:text-green-600 transition-all whitespace-nowrap shadow-sm">
                            {t(`categories.${cat}`)}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCrops.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {item.location}
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-gray-900 text-lg truncate">{item.name}</h3>
                                    <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded text-xs font-bold text-green-700">
                                        ★ {item.rating}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                                    <Store className="w-3 h-3" />
                                    {item.farmer}
                                </div>

                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-green-700">{item.price}</p>
                                        <p className="text-xs text-gray-400">Min. {item.minQty}</p>
                                    </div>
                                    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-green-600 transition-colors shadow-lg shadow-gray-200">
                                        {t('common.buyNow') || 'Buy Now'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
