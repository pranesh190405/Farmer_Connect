'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, X } from 'lucide-react';
import styles from './Tutorial.module.css';

export default function Tutorial({ steps, tutorialId, onComplete }) {
    const { t } = useTranslation('common');
    const [currentStep, setCurrentStep] = useState(0);
    const [targetRect, setTargetRect] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    // Check if tutorial was already seen
    useEffect(() => {
        const seen = localStorage.getItem(`tutorial_${tutorialId}`);
        if (!seen) {
            // Delay start to allow rendering
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, [tutorialId]);

    // Update target position on step change or resize
    useEffect(() => {
        if (!isVisible || !steps[currentStep]) return;

        const updatePosition = () => {
            const selector = steps[currentStep].target;
            const element = document.querySelector(selector);

            if (element) {
                // Scroll into view if needed
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                const rect = element.getBoundingClientRect();
                setTargetRect({
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                });
            } else {
                // Skip step if element not found
                handleNext();
            }
        };

        // Retry a few times if element not found immediately (dynamic rendering)
        const timeout = setTimeout(updatePosition, 500);
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [currentStep, isVisible, steps]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem(`tutorial_${tutorialId}`, 'true');
        if (onComplete) onComplete();
    };

    if (!isVisible || !targetRect) return null;

    const step = steps[currentStep];
    const isLast = currentStep === steps.length - 1;

    // Calculate tooltip position (prefer bottom, fallback to top)
    const tooltipStyle = {};
    const spaceBelow = window.innerHeight - (targetRect.top + targetRect.height);

    if (spaceBelow > 250) {
        tooltipStyle.top = targetRect.top + targetRect.height + 20;
    } else {
        tooltipStyle.bottom = window.innerHeight - targetRect.top + 20;
    }

    // Center horizontally but keep within bounds
    let left = targetRect.left + (targetRect.width / 2) - 160; // 160 is half tooltip width
    if (left < 20) left = 20;
    if (left + 320 > window.innerWidth - 20) left = window.innerWidth - 340;
    tooltipStyle.left = left;

    return (
        <div className={styles.overlay}>
            {/* Spotlight Hole */}
            <div
                className={styles.spotlight}
                style={{
                    top: targetRect.top - 8,
                    left: targetRect.left - 8,
                    width: targetRect.width + 16,
                    height: targetRect.height + 16,
                }}
            />

            {/* Tooltip */}
            <div className={styles.tooltip} style={tooltipStyle}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{t(step.titleKey) || step.title}</h3>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <p className={styles.description}>
                    {t(step.descKey) || step.description}
                </p>

                <div className={styles.footer}>
                    <span className={styles.progress}>
                        {currentStep + 1} / {steps.length}
                    </span>
                    <div className={styles.actions}>
                        {!isLast && (
                            <button onClick={handleClose} className={styles.skipBtn}>
                                {t('tutorial.skip') || 'Skip'}
                            </button>
                        )}
                        <button onClick={handleNext} className={styles.nextBtn}>
                            {isLast ? (t('tutorial.finish') || 'Finish') : (t('tutorial.next') || 'Next')}
                            {!isLast && <ChevronRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
