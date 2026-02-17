// src/services/mockData.js

const STORAGE_KEYS = {
    CROPS: 'dam_crops',
    USER: 'dam_user',
    ORDERS: 'dam_orders'
};

// Initial Data
const INITIAL_CROPS = [
    {
        id: 1,
        crop: 'Potato (Kufri Jyoti)',
        name: 'Potato (Kufri Jyoti)', // Unified name/crop field
        farmer: 'Ramesh Kumar',
        quantity: '500 kg',
        price: '₹12/kg',
        priceValue: 12, // Numeric for sorting/calculations
        date: '2 Feb 2026',
        status: 'active',
        location: 'Nashik, Maharashtra',
        rating: 4.5,
        minQty: '50 kg',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82a6b696?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        crop: 'Onion (Red)',
        name: 'Onion (Red)',
        farmer: 'Suresh Patil',
        quantity: '100 kg',
        price: '₹25/kg',
        priceValue: 25,
        date: '28 Jan 2026',
        status: 'sold',
        location: 'Indore, MP',
        rating: 4.8,
        minQty: '100 kg',
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        crop: 'Tomato (Hybrid)',
        name: 'Tomato (Hybrid)',
        farmer: 'Ramesh Kumar', // Same farmer as ID 1
        quantity: '250 kg',
        price: '₹18/kg',
        priceValue: 18,
        date: '5 Feb 2026',
        status: 'active',
        location: 'Nashik, Maharashtra',
        rating: 4.5,
        minQty: '20 kg',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        crop: 'Wheat Sharbati',
        name: 'Wheat Sharbati',
        farmer: 'Amit Singh',
        quantity: '1000 kg',
        price: '₹32/kg',
        priceValue: 32,
        date: '6 Feb 2026',
        status: 'active',
        location: 'Punjab',
        rating: 4.9,
        minQty: '500 kg',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop'
    }
];

// Helper to get data from local storage
const getStorageData = (key, initialValue) => {
    if (typeof window === 'undefined') return initialValue;
    const stored = localStorage.getItem(key);
    if (!stored) {
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
    }
    return JSON.parse(stored);
};

// Set data to local storage
const setStorageData = (key, data) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(data));
};

export const MockService = {
    // Get all crops (Marketplace view)
    getMarketCrops: async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const allCrops = getStorageData(STORAGE_KEYS.CROPS, INITIAL_CROPS);
        // Return only active listings for market
        return allCrops.filter(c => c.status === 'active');
    },

    // Get listings for a specific farmer (Farmer Dashboard view)
    getFarmerListings: async (farmerName = 'Ramesh Kumar') => {
        // In a real app, this would use ID. For mock, we use name or just return all for demo if name matches default user
        await new Promise(resolve => setTimeout(resolve, 500));
        const allCrops = getStorageData(STORAGE_KEYS.CROPS, INITIAL_CROPS);
        // Filter for "Ramesh Kumar" as the logged-in farmer for demo purposes
        // Or if we want to show all created by current user session
        return allCrops.filter(c => c.farmer === farmerName);
    },

    // Add a new listing
    addListing: async (listingData) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        const allCrops = getStorageData(STORAGE_KEYS.CROPS, INITIAL_CROPS);
        const newListing = {
            id: Date.now(),
            ...listingData,
            status: 'active',
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            rating: 0, // New listing
            farmer: 'Ramesh Kumar', // Hardcoded logged-in user for demo
            location: 'Nashik, Maharashtra'
        };
        const updatedCrops = [newListing, ...allCrops];
        setStorageData(STORAGE_KEYS.CROPS, updatedCrops);
        return newListing;
    },

    // Update listing status (e.g., mark as sold)
    updateListingStatus: async (id, status) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const allCrops = getStorageData(STORAGE_KEYS.CROPS, INITIAL_CROPS);
        const updatedCrops = allCrops.map(crop =>
            crop.id === id ? { ...crop, status } : crop
        );
        setStorageData(STORAGE_KEYS.CROPS, updatedCrops);
        return true;
    },

    // Get single listing by ID
    getListingById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const allCrops = getStorageData(STORAGE_KEYS.CROPS, INITIAL_CROPS);
        return allCrops.find(c => c.id.toString() === id.toString());
    },

    // Update listing details
    updateListing: async (id, updates) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        const allCrops = getStorageData(STORAGE_KEYS.CROPS, INITIAL_CROPS);
        const updatedCrops = allCrops.map(crop =>
            crop.id.toString() === id.toString() ? { ...crop, ...updates } : crop
        );
        setStorageData(STORAGE_KEYS.CROPS, updatedCrops);
        return true;
    },

    // Delete listing
    deleteListing: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const allCrops = getStorageData(STORAGE_KEYS.CROPS, INITIAL_CROPS);
        const updatedCrops = allCrops.filter(crop => crop.id !== id);
        setStorageData(STORAGE_KEYS.CROPS, updatedCrops);
        return true;
    },

    // Simulate buying a product
    buyProduct: async (productId) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In real app, create order. Here just simulated success.
        return true;
    }
};
