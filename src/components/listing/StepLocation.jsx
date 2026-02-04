'use client';

import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, nextStep, setLocation } from '@/lib/store/features/listingSlice';
import { MapPin, ArrowRight, Crosshair } from 'lucide-react';
import dynamic from 'next/dynamic';

// Leaflet CSS needs to be imported globally or in layout, but we can try injecting it here or ensuring it's in globals
// We'll trust standard Next.js leaflet setup, but since we haven't added CSS link, we might need to add it to layout later.
// For now, let's build the component.

export default function StepLocation() {
    const dispatch = useDispatch();
    const { formData } = useSelector((state) => state.listing);
    const [isLoadingLoc, setIsLoadingLoc] = useState(false);

    // Default to center of India if no loc
    const [position, setPosition] = useState(
        formData.location.lat
            ? [formData.location.lat, formData.location.lng]
            : [20.5937, 78.9629]
    );

    // Dynamically import Map container to avoid window undefined err
    const MapComponents = useMemo(() => dynamic(
        () => import('react-leaflet').then((mod) => {
            const { MapContainer, TileLayer, Marker, useMapEvents, useMap } = mod;

            // Component to update map center when position changes
            const Recenter = ({ lat, lng }) => {
                const map = useMap();
                useEffect(() => {
                    map.setView([lat, lng], map.getZoom());
                }, [lat, lng, map]);
                return null;
            };

            // Component to handle clicks
            const LocationMarker = () => {
                const map = useMapEvents({
                    click(e) {
                        const { lat, lng } = e.latlng;
                        setPosition([lat, lng]);
                        dispatch(setLocation({
                            lat: Number(lat.toFixed(6)),
                            lng: Number(lng.toFixed(6)),
                            address: 'Pinned Location' // Simple default
                        }));
                    },
                });

                return position === null ? null : (
                    <Marker position={position}></Marker>
                );
            };

            return ({ position }) => (
                <MapContainer center={position} zoom={5} style={{ height: '300px', width: '100%', borderRadius: '12px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                    />
                    <Recenter lat={position[0]} lng={position[1]} />
                    <LocationMarker />
                </MapContainer>
            );
        }),
        {
            ssr: false,
            loading: () => <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">Loading Map...</div>
        }
    ), []);

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsLoadingLoc(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const newPos = [latitude, longitude];
                setPosition(newPos);
                dispatch(setLocation({
                    lat: Number(latitude.toFixed(6)),
                    lng: Number(longitude.toFixed(6)),
                    address: 'My Current Location'
                }));
                setIsLoadingLoc(false);
            },
            (err) => {
                console.error(err);
                alert('Unable to retrieve your location');
                setIsLoadingLoc(false);
            }
        );
    };

    const handleNext = () => {
        if (formData.location.lat) {
            dispatch(nextStep());
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Farm Location</h2>
                <p className="text-gray-500 text-sm">Where is the produce located?</p>
            </div>

            <div className="space-y-4">
                <button
                    onClick={handleUseMyLocation}
                    disabled={isLoadingLoc}
                    className="w-full py-4 px-4 bg-blue-50 text-blue-700 rounded-xl border border-blue-200 font-semibold flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
                >
                    {isLoadingLoc ? (
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></span>
                    ) : (
                        <Crosshair className="w-5 h-5" />
                    )}
                    Use My Current Location
                </button>

                <div className="text-center text-gray-400 text-sm">- OR -</div>

                <div className="border rounded-xl shadow-sm z-0 relative">
                    <MapComponents position={position} />
                </div>

                {formData.location.lat && (
                    <p className="text-sm text-green-600 bg-green-50 p-2 rounded text-center font-medium">
                        ✓ Location Selected: {formData.location.lat}, {formData.location.lng}
                    </p>
                )}
            </div>

            <button
                onClick={handleNext}
                disabled={!formData.location.lat}
                className={`
                    w-full mt-6 font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all
                    ${formData.location.lat
                        ? 'bg-green-600 hover:bg-green-700 text-white active:scale-[0.98]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                `}
            >
                Review & Submit
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    );
}
