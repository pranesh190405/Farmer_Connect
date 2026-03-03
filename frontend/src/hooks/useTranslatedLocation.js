'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Cache for reverse-geocoded addresses to avoid redundant network calls.
 * Key format: "lat,lng,lang"
 */
const geocodeCache = new Map();

/**
 * Reverse-geocode a single coordinate pair via Nominatim.
 * Returns the address string in the requested language.
 */
async function reverseGeocode(lat, lng, lang) {
    const cacheKey = `${parseFloat(lat).toFixed(4)},${parseFloat(lng).toFixed(4)},${lang}`;
    if (geocodeCache.has(cacheKey)) return geocodeCache.get(cacheKey);

    try {
        // Map Haryanvi to Hindi for Nominatim compatibility
        const nominatimLang = lang === 'hr' ? 'hi' : lang;

        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
            { headers: { 'Accept-Language': nominatimLang || 'en' } }
        );
        const data = await res.json();
        const addr = data.address || {};
        const parts = [
            addr.village || addr.town || addr.city || addr.suburb || '',
            addr.county || addr.state_district || '',
            addr.state || '',
        ].filter(Boolean);

        const addressStr = parts.join(', ') || data.display_name || '';
        geocodeCache.set(cacheKey, addressStr);
        return addressStr;
    } catch (err) {
        console.warn('Reverse geocode failed:', err);
        return null; // caller falls back to original
    }
}

/**
 * React hook that translates location addresses for an array of items.
 *
 * Each item should have `locationLat`, `locationLng` (coordinates) and
 * `location` or `locationAddress` (fallback text).
 *
 * Returns a Map<itemId, translatedAddress> that updates when language changes.
 *
 * Usage:
 *   const translatedLocations = useTranslatedLocation(listings);
 *   // then: translatedLocations.get(item.id) || item.location
 */
export function useTranslatedLocation(items = []) {
    const { i18n } = useTranslation();
    const [locationMap, setLocationMap] = useState(new Map());
    const abortRef = useRef(null);

    useEffect(() => {
        // Only translate when not English (English addresses are stored as-is)
        const lang = i18n.language;
        if (lang === 'en' || !items || items.length === 0) {
            setLocationMap(new Map());
            return;
        }

        // Abort any previous batch
        if (abortRef.current) abortRef.current.aborted = true;
        const thisRun = { aborted: false };
        abortRef.current = thisRun;

        const translateAll = async () => {
            const newMap = new Map();

            // Process in small batches to respect Nominatim rate limits (~1 req/sec)
            for (const item of items) {
                if (thisRun.aborted) return;

                const lat = item.locationLat || item.location_lat;
                const lng = item.locationLng || item.location_lng;

                if (lat && lng) {
                    const translated = await reverseGeocode(lat, lng, lang);
                    if (translated && !thisRun.aborted) {
                        newMap.set(item.id, translated);
                    }
                }
            }

            if (!thisRun.aborted) {
                setLocationMap(new Map(newMap));
            }
        };

        translateAll();

        return () => { thisRun.aborted = true; };
    }, [i18n.language, items]);

    return locationMap;
}

export default useTranslatedLocation;
