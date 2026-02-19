'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Mic, MicOff, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { showToast } from '@/components/ui/Toast/Toast';

const LANG_MAP = {
    'en': 'en-IN',
    'hi': 'hi-IN',
    'ta': 'ta-IN',
    'te': 'te-IN',
    'kn': 'kn-IN',
    'bn': 'bn-IN',
    'mr': 'mr-IN',
    'gu': 'gu-IN',
    'pa': 'pa-IN',
    'hr': 'hi-IN', // Haryanvi falls back to Hindi
};

export default function VoiceAgent() {
    const { t, i18n } = useTranslation('common');
    const router = useRouter();
    const pathname = usePathname();

    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = LANG_MAP[i18n.language] || 'en-IN';

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setTranscript('');
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.onresult = (event) => {
                const text = event.results[0][0].transcript.toLowerCase();
                setTranscript(text);
                processCommand(text);
            };

            recognitionRef.current.onerror = (event) => {
                setIsListening(false);
                switch (event.error) {
                    case 'not-allowed':
                        showToast(t('voice.micDenied'), 'error');
                        break;
                    case 'network':
                        // Web Speech API requires internet (sends audio to Google).
                        // Silently ignore on localhost or show a subtle warning.
                        console.warn('Speech recognition requires an internet connection.');
                        showToast(t('voice.requiresInternet'), 'warning');
                        break;
                    case 'no-speech':
                        // User didn't say anything — not a real error.
                        break;
                    case 'aborted':
                        // User or code stopped recognition — not a real error.
                        break;
                    default:
                        console.error('Speech recognition error:', event.error);
                        showToast(t('voice.voiceError'), 'error');
                }
            };
        }
    }, [router]);

    const processCommand = (command) => {
        showToast(t('voice.heard', { command }), 'info');

        // Simple command parsing logic
        if (command.includes('market') || command.includes('buy')) {
            router.push('/market');
        } else if (command.includes('home') || command.includes('dashboard')) {
            if (pathname.includes('farmer')) router.push('/farmer/dashboard');
            else router.push('/buyer/dashboard');
        } else if (command.includes('cart')) {
            router.push('/cart'); // Or trigger openCart action
        } else if (command.includes('profile') || command.includes('account')) {
            router.push('/profile');
        } else if (command.includes('search') || command.includes('find')) {
            // "Search for tomato" -> extract "tomato"
            const query = command.replace('search', '').replace('find', '').replace('for', '').trim();
            if (query) {
                // Navigate to market with query? Or just focus search bar?
                // For now, simple navigation
                // Need to pass query param, but we don't have search page query implementation yet fully
                // Assume market search
                // Use custom event or Redux?
                // Let's just toast for now and route
                showToast(t('voice.searchingFor', { query }), 'success');
                // Could implement URL param search later
            }
        } else if (command.includes('logout')) {
            // Trigger logout? Maybe too dangerous for voice
            showToast(t('voice.useMenuLogout'), 'info');
        } else {
            showToast(t('voice.commandNotRecognized'), 'warning');
        }
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            showToast(t('voice.notSupported'), 'error');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    // Don't show on login/register pages
    if (pathname.includes('/auth') || pathname === '/') return null;

    return (
        <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-2">
            {transcript && isListening && (
                <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm mb-2 animate-fade-in">
                    {transcript || t('voice.listening')}
                </div>
            )}

            <button
                onClick={toggleListening}
                className={`p-4 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center ${isListening
                    ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200'
                    : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                title={t('voice.voiceAssistant')}
            >
                {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
        </div>
    );
}
