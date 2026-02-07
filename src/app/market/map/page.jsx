'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, List } from 'lucide-react';
import Link from 'next/link';
import { MockService } from '@/services/mockData';

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import('@/components/ui/Map/Map'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse" />
});

export default function MarketMapPage() {
    const { t } = useTranslation('common');
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadListings();
    }, []);

    const loadListings = async () => {
        try {
            const data = await MockService.getMarketCrops();
            setListings(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <header className="bg-white border-b z-10 px-6 py-4 shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/market" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Map View</h1>
                </div>
                <Link
                    href="/market"
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-600 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    <List className="w-4 h-4" />
                    List View
                </Link>
            </header>

            <div className="flex-1 bg-gray-100 relative">
                <Map listings={listings} />

                {/* Floating legend or info */}
                <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg z-[1000] max-w-xs">
                    <h3 className="font-bold text-gray-900">Explore Nearby</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Showing {listings.length} active listings across regions. Click on pins to see details.
                    </p>
                </div>
            </div>
        </div>
    );
}
