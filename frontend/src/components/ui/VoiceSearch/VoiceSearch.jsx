'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function VoiceSearch({ onResult, placeholder }) {
    const { t } = useTranslation('common');
    const [isListening, setIsListening] = useState(false);
    const [supported, setSupported] = useState(false);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            setSupported(true);
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const startListening = () => {
        setIsListening(true);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-US'; // Could be dynamic based on i18n language
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error('Voice search error', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const stopListening = () => {
        // Recognition stops automatically on end, but we can manage state here
        setIsListening(false);
    };

    if (!supported) return null;

    return (
        <button
            onClick={toggleListening}
            className={`
                p-2.5 rounded-full transition-all duration-300 relative
                ${isListening
                    ? 'bg-red-100 text-red-600 animate-pulse ring-2 ring-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
            `}
            title={isListening ? t('voice.stopListening') : t('voice.startListening')}
        >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
    );
}
