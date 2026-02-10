'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, MicOff, Loader2 } from 'lucide-react';

export default function VoiceInput({ onResult, lang = 'en-IN', className = '' }) {
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const recognitionRef = useRef(null);
    const { i18n } = useTranslation();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                setIsSupported(false);
                return;
            }
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
        }
    }, []);

    const startListening = () => {
        if (!recognitionRef.current) return;

        try {
            // Map i18n language to speech locale or use prop
            const langMap = {
                'en': 'en-IN',
                'hi': 'hi-IN',
                'ta': 'ta-IN',
                'te': 'te-IN',
                'kn': 'kn-IN',
                'bn': 'bn-IN',
                'mr': 'mr-IN',
                'gu': 'gu-IN'
            };

            recognitionRef.current.lang = langMap[i18n.language] || lang;

            recognitionRef.current.onstart = () => setIsListening(true);
            recognitionRef.current.onend = () => setIsListening(false);

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (transcript) {
                    onResult(transcript);
                }
            };

            recognitionRef.current.start();
        } catch (error) {
            console.error("Speech recognition error:", error);
            setIsListening(false);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    };

    if (!isSupported) return null;

    return (
        <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`
                p-3 rounded-full transition-all duration-200 flex-shrink-0
                ${isListening
                    ? 'bg-red-100 text-red-600 animate-pulse ring-2 ring-red-400 ring-offset-2'
                    : 'bg-green-50 text-green-600 hover:bg-green-100 active:bg-green-200'
                }
                ${className}
            `}
            title={isListening ? "Stop listening" : "Tap to speak"}
        >
            {isListening ? (
                <MicOff className="w-5 h-5" />
            ) : (
                <Mic className="w-5 h-5" />
            )}
        </button>
    );
}
