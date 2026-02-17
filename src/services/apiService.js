/**
 * ApiService — Calls real backend API endpoints
 */

// Helper for API calls
async function apiFetch(url, options = {}) {
    const res = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'API request failed');
    }

    return data;
}

export class ApiService {
    // === Listings ===

    static async getMarketCrops(filters = {}) {
        try {
            const params = new URLSearchParams();
            if (filters.search) params.set('search', filters.search);
            if (filters.category && filters.category !== 'all') params.set('category', filters.category);
            if (filters.region && filters.region !== 'all') params.set('region', filters.region);
            params.set('status', 'active');

            const data = await apiFetch(`/api/listings?${params.toString()}`);
            return data.listings || [];
        } catch (err) {
            console.error('getMarketCrops error:', err);
            return [];
        }
    }

    static async getFarmerListings() {
        try {
            const data = await apiFetch('/api/listings/my');
            return data.listings || [];
        } catch (err) {
            console.error('getFarmerListings error:', err);
            return [];
        }
    }

    static async addListing(listingData) {
        try {
            const data = await apiFetch('/api/listings', {
                method: 'POST',
                body: JSON.stringify(listingData),
            });
            return data.listing;
        } catch (err) {
            console.error('addListing error:', err);
            throw err;
        }
    }

    static async updateListing(id, listingData) {
        try {
            const data = await apiFetch(`/api/listings/${id}`, {
                method: 'PUT',
                body: JSON.stringify(listingData),
            });
            return data.listing;
        } catch (err) {
            console.error('updateListing error:', err);
            throw err;
        }
    }

    static async updateListingStatus(id, status) {
        try {
            const data = await apiFetch(`/api/listings/${id}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status }),
            });
            return data.listing;
        } catch (err) {
            console.error('updateListingStatus error:', err);
            throw err;
        }
    }

    static async getListingById(id) {
        try {
            const data = await apiFetch(`/api/listings/${id}`);
            return data.listing;
        } catch (err) {
            console.error('getListingById error:', err);
            return null;
        }
    }

    static async deleteListing(id) {
        try {
            await apiFetch(`/api/listings/${id}`, { method: 'DELETE' });
            return true;
        } catch (err) {
            console.error('deleteListing error:', err);
            return false;
        }
    }

    // === Orders ===

    static async placeOrder(orderData) {
        try {
            const data = await apiFetch('/api/orders', {
                method: 'POST',
                body: JSON.stringify(orderData),
            });
            return data.order;
        } catch (err) {
            console.error('placeOrder error:', err);
            throw err;
        }
    }

    static async getMyOrders() {
        try {
            const data = await apiFetch('/api/orders/my');
            return data.orders || [];
        } catch (err) {
            console.error('getMyOrders error:', err);
            return [];
        }
    }

    // === User Profile ===

    static async getProfile() {
        try {
            const data = await apiFetch('/api/users/profile');
            return data.profile;
        } catch (err) {
            console.error('getProfile error:', err);
            return null;
        }
    }

    static async updateProfile(profileData) {
        try {
            const data = await apiFetch('/api/users/profile', {
                method: 'PUT',
                body: JSON.stringify(profileData),
            });
            return data;
        } catch (err) {
            console.error('updateProfile error:', err);
            throw err;
        }
    }

    static async updateLocation(locationData) {
        try {
            const data = await apiFetch('/api/users/location', {
                method: 'PUT',
                body: JSON.stringify(locationData),
            });
            return data;
        } catch (err) {
            console.error('updateLocation error:', err);
            throw err;
        }
    }

    static async updatePreferences(preferences) {
        try {
            const data = await apiFetch('/api/users/preferences', {
                method: 'PUT',
                body: JSON.stringify(preferences),
            });
            return data;
        } catch (err) {
            console.error('updatePreferences error:', err);
            throw err;
        }
    }

    // === Admin ===

    static async getAdminStats() {
        try {
            const data = await apiFetch('/api/admin/stats');
            return data.stats;
        } catch (err) {
            console.error('getAdminStats error:', err);
            return null;
        }
    }

    static async getAdminUsers() {
        try {
            const data = await apiFetch('/api/admin/users');
            return data.users || [];
        } catch (err) {
            console.error('getAdminUsers error:', err);
            return [];
        }
    }

    static async approveUser(userId) {
        try {
            const data = await apiFetch(`/api/admin/users/${userId}/approve`, {
                method: 'PUT',
            });
            return data;
        } catch (err) {
            console.error('approveUser error:', err);
            throw err;
        }
    }

    static async rejectUser(userId) {
        try {
            const data = await apiFetch(`/api/admin/users/${userId}/reject`, {
                method: 'PUT',
            });
            return data;
        } catch (err) {
            console.error('rejectUser error:', err);
            throw err;
        }
    }
}

export default ApiService;
