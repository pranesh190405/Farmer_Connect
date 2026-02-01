'use client';

import { forwardRef } from 'react';
import styles from './Select.module.css';

/**
 * Select Component
 * Accessible dropdown select
 */
const Select = forwardRef(function Select({
    label,
    error,
    hint,
    options = [],
    placeholder = 'Select an option',
    id,
    disabled = false,
    required = false,
    className = '',
    ...props
}, ref) {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${selectId}-error` : undefined;
    const hintId = hint ? `${selectId}-hint` : undefined;

    return (
        <div className={`${styles.wrapper} ${className}`}>
            {label && (
                <label htmlFor={selectId} className={styles.label}>
                    {label}
                    {required && <span className={styles.required} aria-hidden="true"> *</span>}
                </label>
            )}

            <div className={`${styles.selectWrapper} ${error ? styles.hasError : ''} ${disabled ? styles.disabled : ''}`}>
                <select
                    ref={ref}
                    id={selectId}
                    disabled={disabled}
                    required={required}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
                    className={styles.select}
                    {...props}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <span className={styles.arrow} aria-hidden="true">▼</span>
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

export default Select;
