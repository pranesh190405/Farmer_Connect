'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './VoiceSearch.module.css';

export default function VoiceSearch({ onResult, placeholder = 'Search...' }) {
    const { t, i18n } = useTranslation('common');
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isSupported, setIsSupported] = useState(true);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        // Check if browser supports Web Speech API
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                setIsSupported(false);
                return;
            }

            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = true;

            // Map i18n language codes to speech recognition locale codes
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
            recognitionInstance.lang = langMap[i18n.language] || 'en-IN';

            recognitionInstance.onstart = () => {
                setIsListening(true);
            };

            recognitionInstance.onresult = (event) => {
                const current = event.resultIndex;
                const transcriptText = event.results[current][0].transcript;
                setTranscript(transcriptText);

                if (event.results[current].isFinal) {
                    onResult && onResult(transcriptText);
                }
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognitionInstance.onend = () => {
                setIsListening(false);
            };

            setRecognition(recognitionInstance);
        }
    }, [i18n.language, onResult]);

    const toggleListening = () => {
        if (!recognition) return;

        if (isListening) {
            recognition.stop();
        } else {
            setTranscript('');
            recognition.start();
        }
    };

    if (!isSupported) {
        return null; // Don't render if not supported
    }

    return (
        <div className={styles.voiceSearch}>
            <button
                onClick={toggleListening}
                className={`${styles.voiceButton} ${isListening ? styles.listening : ''}`}
                aria-label={isListening ? t('voice.stopListening') : t('voice.startListening')}
                title={isListening ? t('voice.stopListening') : t('voice.startListening')}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
                {isListening && (
                    <span className={styles.pulse}></span>
                )}
            </button>
            {isListening && transcript && (
                <div className={styles.transcript} aria-live="polite">
                    {transcript}
                </div>
            )}
        </div>
    );
}
