'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Search, Heart, MapPin, Store, ShoppingCart } from 'lucide-react';
import { addToCart, openCart } from '@/store/slices/cartSlice';
import { showToast } from '@/components/ui/Toast/Toast';
import { MockService } from '@/services/mockData';
import VoiceSearch from '@/components/ui/VoiceSearch/VoiceSearch';
import Tutorial from '@/components/ui/Tutorial/Tutorial';

export default function BuyerDashboard() {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [crops, setCrops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchCrops();
    }, []);

    const fetchCrops = async () => {
        try {
            setIsLoading(true);
            const data = await MockService.getMarketCrops();
            setCrops(data);
        } catch (error) {
            console.error('Failed to fetch crops:', error);
            toast.error(t('common.error') || 'Failed to load market data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToCart = (item) => {
        dispatch(addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            farmer: item.farmer,
            minQty: item.minQty,
            quantity: parseInt(item.minQty.replace(/\D/g, '')) || 1
        }));
        showToast(t('cart.added'), 'success');
        setTimeout(() => dispatch(openCart()), 300);
    };

    const handleBuy = async (id, name) => {
        try {
            await MockService.buyProduct(id);
            toast.success(`${t('common.buySuccess') || 'Order placed for'} ${name}!`);
        } catch (error) {
            toast.error(t('common.error') || 'Failed to place order');
        }
    };

    const handleVoiceResult = (text) => {
        setSearchQuery(text);
        toast.success(t('voice.listening') + ' ' + text);
    };

    if (!mounted) return null;

    const tutorialSteps = [
        {
            target: 'header', // Point to header generally
            title: 'Welcome to the Market!',
            description: 'This is your dashboard where you can find fresh produce from farmers.',
        },
        {
            target: '[data-tour="search"]', // We need to add this attribute
            title: 'Smart Search',
            description: 'Search for crops by name, or use Voice Search for hands-free experience.',
        },
        {
            target: '[data-tour="filters"]',
            title: 'Filter Categories',
            description: 'Quickly filter by Vegetables, Fruits, Grains, and more.',
        },
        {
            target: '[data-tour="cart-btn"]', // In header
            title: 'Your Cart',
            description: 'View your selected items and proceed to checkout here.',
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans">
            <Tutorial steps={tutorialSteps} tutorialId="buyer_dashboard_v1" />

            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.welcomeBuyer')}</h1>
                        <p className="text-gray-500 text-sm mt-1">{t('dashboard.findFreshProduce')}</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto" data-tour="search">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t('common.searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                            />
                        </div>
                        <VoiceSearch onResult={(text) => setSearchTerm(text)} />
                        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600 transition-colors">
                            <Filter className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 bg-green-50 rounded-full hover:bg-green-100 transition-colors relative" data-tour="cart-btn">
                            <ShoppingCart className="w-5 h-5 text-green-600" />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Categories (Mock) */}
                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                    {['vegetables', 'fruits', 'grains', 'spices'].map((cat) => (
                        <button key={cat} className="px-5 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-green-500 hover:text-green-600 transition-all whitespace-nowrap shadow-sm">
                            {t(`categories.${cat}`)}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                        <p className="mt-4 text-gray-500">{t('common.loading')}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {crops.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-all">
                                        <Heart className="w-4 h-4" />
                                    </button>
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
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-green-700 transition-colors shadow-lg flex items-center gap-2"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            {t('cart.addToCart')}
                                        </button>
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
