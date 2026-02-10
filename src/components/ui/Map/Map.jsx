'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon in Leaflet with Next.js
const icon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

export default function Map({ listings }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                Loading Map...
            </div>
        );
    }

    // Default center (Center of India approx)
    const center = [20.5937, 78.9629];

    return (
        <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {listings.map((item) => {
                // Mock coordinates based on location string or random nearby
                // In real app, item.coordinates would exist
                // For demo, we'll hash the location string to get consistent pseudo-random coords
                const lat = 20 + (item.location.length % 10) - 5;
                const lng = 78 + (item.id % 10) - 5;

                return (
                    <Marker key={item.id} position={[lat, lng]} icon={icon}>
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-sm">{item.name}</h3>
                                <p className="text-xs text-gray-600">{item.location}</p>
                                <p className="text-green-600 font-bold mt-1">{item.price}</p>
                                <div className="mt-2">
                                    <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded" />
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}
