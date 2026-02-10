'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './OTPInput.module.css';

/**
 * OTPInput Component
 * 6-digit OTP input with auto-focus switching
 * 
 * @param {Object} props
 * @param {number} props.length - Number of OTP digits (default: 6)
 * @param {function} props.onComplete - Called when all digits are filled
 * @param {function} props.onChange - Called on each digit change
 * @param {string} props.error - Error message to display
 * @param {boolean} props.disabled - Disable input
 */
export default function OTPInput({
    length = 6,
    onComplete,
    onChange,
    error,
    disabled = false,
}) {
    const [otp, setOtp] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

    // Focus first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    // Notify parent when OTP is complete
    useEffect(() => {
        const otpValue = otp.join('');
        if (onChange) {
            onChange(otpValue);
        }
        if (otpValue.length === length && onComplete) {
            onComplete(otpValue);
        }
    }, [otp, length, onComplete, onChange]);

    const handleChange = (index, value) => {
        // Only accept single digit
        const digit = value.slice(-1);
        if (digit && !/^\d$/.test(digit)) return;

        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        // Auto-focus next input
        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                // Move to previous input on backspace if current is empty
                inputRefs.current[index - 1]?.focus();
            }
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split('').forEach((digit, index) => {
            if (index < length) {
                newOtp[index] = digit;
            }
        });
        setOtp(newOtp);

        // Focus last filled input or last input
        const lastFilledIndex = Math.min(pastedData.length, length) - 1;
        inputRefs.current[lastFilledIndex]?.focus();
    };

    return (
        <div className={styles.wrapper}>
            <div
                className={`${styles.inputGroup} ${error ? styles.hasError : ''}`}
                role="group"
                aria-label="OTP input"
            >
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={1}
                        value={digit}
                        disabled={disabled}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className={`${styles.input} ${digit ? styles.filled : ''}`}
                        aria-label={`Digit ${index + 1} of ${length}`}
                    />
                ))}
            </div>

            {error && (
                <p className={styles.error} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
