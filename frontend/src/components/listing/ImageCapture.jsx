'use client';

import { useState, useRef } from 'react';
import { Camera, X, Image as ImageIcon } from 'lucide-react';

export default function ImageCapture({ images = [], onAdd, onRemove }) {
    const fileInputRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsProcessing(true);

        // Create preview URL immediately
        const reader = new FileReader();
        reader.onloadend = () => {
            // In a real app, we might upload this to a server or cloud storage
            // For this demo, we'll store the base64 string
            const result = reader.result;

            // TODO: Add canvas watermark logic here for timestamp/location

            onAdd(result);
            setIsProcessing(false);

            // Reset input so same file can be selected again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-4">
            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-3">
                {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                        <img
                            src={img}
                            alt={`Crop ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={() => onRemove(index)}
                            className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}

                {/* Add Button */}
                {images.length < 3 && (
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all active:scale-95"
                    >
                        {isProcessing ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                        ) : (
                            <>
                                <Camera className="w-8 h-8" />
                                <span className="text-xs font-medium">Add Photo</span>
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Hidden Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment" // Opens camera directly on mobile
                onChange={handleFileChange}
                className="hidden"
            />

            <p className="text-xs text-center text-gray-400">
                Max 3 photos. Tap to take a photo or upload.
            </p>
        </div>
    );
}
