'use client';

import { forwardRef, useId } from 'react';
import styles from './Input.module.css';

/**
 * Input Component
 * Accessible, touch-friendly input field
 * 
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.error - Error message
 * @param {string} props.hint - Helper text
 * @param {React.ReactNode} props.prefix - Prefix element (e.g., +91)
 * @param {React.ReactNode} props.suffix - Suffix element (e.g., icon)
 */
const Input = forwardRef(function Input({
    label,
    error,
    hint,
    prefix,
    suffix,
    id,
    type = 'text',
    disabled = false,
    required = false,
    className = '',
    ...props
}, ref) {
    const uniqueId = useId();
    const inputId = id || `input-${uniqueId}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
        <div className={`${styles.wrapper} ${className}`}>
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                    {required && <span className={styles.required} aria-hidden="true"> *</span>}
                </label>
            )}

            <div className={`${styles.inputWrapper} ${error ? styles.hasError : ''} ${disabled ? styles.disabled : ''}`}>
                {prefix && (
                    <span className={styles.prefix} aria-hidden="true">
                        {prefix}
                    </span>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    type={type}
                    disabled={disabled}
                    required={required}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
                    className={styles.input}
                    {...props}
                />

                {suffix && (
                    <span className={styles.suffix}>
                        {suffix}
                    </span>
                )}
            </div>

            {error && (
                <p id={errorId} className={styles.error} role="alert">
                    {error}
                </p>
            )}

            {hint && !error && (
                <p id={hintId} className={styles.hint}>
                    {hint}
                </p>
            )}
        </div>
    );
});

export default Input;
