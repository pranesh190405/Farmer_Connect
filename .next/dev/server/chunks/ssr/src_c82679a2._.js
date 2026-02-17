module.exports = [
"[project]/src/components/ui/Button/Button.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "button": "Button-module__xDwtkW__button",
  "fullWidth": "Button-module__xDwtkW__fullWidth",
  "hiddenText": "Button-module__xDwtkW__hiddenText",
  "lg": "Button-module__xDwtkW__lg",
  "loading": "Button-module__xDwtkW__loading",
  "md": "Button-module__xDwtkW__md",
  "outline": "Button-module__xDwtkW__outline",
  "primary": "Button-module__xDwtkW__primary",
  "secondary": "Button-module__xDwtkW__secondary",
  "sm": "Button-module__xDwtkW__sm",
  "spin": "Button-module__xDwtkW__spin",
  "spinner": "Button-module__xDwtkW__spinner",
});
}),
"[project]/src/components/ui/Button/Button.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button/Button.module.css [app-ssr] (css module)");
'use client';
;
;
function Button({ children, variant = 'primary', size = 'lg', isLoading = false, disabled = false, fullWidth = false, type = 'button', onClick, ariaLabel, className = '', ...props }) {
    const classNames = [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].button,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"][variant],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"][size],
        fullWidth ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].fullWidth : '',
        isLoading ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loading : '',
        className
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: type,
        className: classNames,
        disabled: disabled || isLoading,
        onClick: onClick,
        "aria-label": ariaLabel,
        "aria-busy": isLoading,
        ...props,
        children: [
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].spinner,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Button/Button.jsx",
                lineNumber: 50,
                columnNumber: 17
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: isLoading ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hiddenText : '',
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Button/Button.jsx",
                lineNumber: 52,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Button/Button.jsx",
        lineNumber: 40,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/Button/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button/Button.jsx [app-ssr] (ecmascript)");
;
}),
"[project]/src/components/ui/Input/Input.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "disabled": "Input-module__Tl1jgW__disabled",
  "error": "Input-module__Tl1jgW__error",
  "hasError": "Input-module__Tl1jgW__hasError",
  "hint": "Input-module__Tl1jgW__hint",
  "input": "Input-module__Tl1jgW__input",
  "inputWrapper": "Input-module__Tl1jgW__inputWrapper",
  "label": "Input-module__Tl1jgW__label",
  "prefix": "Input-module__Tl1jgW__prefix",
  "required": "Input-module__Tl1jgW__required",
  "suffix": "Input-module__Tl1jgW__suffix",
  "wrapper": "Input-module__Tl1jgW__wrapper",
});
}),
"[project]/src/components/ui/Input/Input.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/Input/Input.module.css [app-ssr] (css module)");
'use client';
;
;
;
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
 */ const Input = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(function Input({ label, error, hint, prefix, suffix, id, type = 'text', disabled = false, required = false, className = '', ...props }, ref) {
    const uniqueId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const inputId = id || `input-${uniqueId}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].wrapper} ${className}`,
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: inputId,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label,
                children: [
                    label,
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].required,
                        "aria-hidden": "true",
                        children: " *"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Input/Input.jsx",
                        lineNumber: 40,
                        columnNumber: 34
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Input/Input.jsx",
                lineNumber: 38,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputWrapper} ${error ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hasError : ''} ${disabled ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].disabled : ''}`,
                children: [
                    prefix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].prefix,
                        "aria-hidden": "true",
                        children: prefix
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Input/Input.jsx",
                        lineNumber: 46,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: ref,
                        id: inputId,
                        type: type,
                        disabled: disabled,
                        required: required,
                        "aria-invalid": error ? 'true' : 'false',
                        "aria-describedby": [
                            errorId,
                            hintId
                        ].filter(Boolean).join(' ') || undefined,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].input,
                        ...props
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Input/Input.jsx",
                        lineNumber: 51,
                        columnNumber: 17
                    }, this),
                    suffix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].suffix,
                        children: suffix
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Input/Input.jsx",
                        lineNumber: 64,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Input/Input.jsx",
                lineNumber: 44,
                columnNumber: 13
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: errorId,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].error,
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Input/Input.jsx",
                lineNumber: 71,
                columnNumber: 17
            }, this),
            hint && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: hintId,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hint,
                children: hint
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Input/Input.jsx",
                lineNumber: 77,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Input/Input.jsx",
        lineNumber: 36,
        columnNumber: 9
    }, this);
});
const __TURBOPACK__default__export__ = Input;
}),
"[project]/src/components/ui/Input/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Input/Input.jsx [app-ssr] (ecmascript)");
;
}),
"[project]/src/components/ui/OTPInput/OTPInput.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "error": "OTPInput-module__jEqhYa__error",
  "filled": "OTPInput-module__jEqhYa__filled",
  "hasError": "OTPInput-module__jEqhYa__hasError",
  "input": "OTPInput-module__jEqhYa__input",
  "inputGroup": "OTPInput-module__jEqhYa__inputGroup",
  "wrapper": "OTPInput-module__jEqhYa__wrapper",
});
}),
"[project]/src/components/ui/OTPInput/OTPInput.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OTPInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/OTPInput/OTPInput.module.css [app-ssr] (css module)");
'use client';
;
;
;
function OTPInput({ length = 6, onComplete, onChange, error, disabled = false }) {
    const [otp, setOtp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(Array(length).fill(''));
    const inputRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Focus first input on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);
    // Notify parent when OTP is complete
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const otpValue = otp.join('');
        if (onChange) {
            onChange(otpValue);
        }
        if (otpValue.length === length && onComplete) {
            onComplete(otpValue);
        }
    }, [
        otp,
        length,
        onComplete,
        onChange
    ]);
    const handleChange = (index, value)=>{
        // Only accept single digit
        const digit = value.slice(-1);
        if (digit && !/^\d$/.test(digit)) return;
        const newOtp = [
            ...otp
        ];
        newOtp[index] = digit;
        setOtp(newOtp);
        // Auto-focus next input
        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    const handleKeyDown = (index, e)=>{
        if (e.key === 'Backspace') {
            if (!otp[index] && index > 0) {
                // Move to previous input on backspace if current is empty
                inputRefs.current[index - 1]?.focus();
            }
            const newOtp = [
                ...otp
            ];
            newOtp[index] = '';
            setOtp(newOtp);
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    const handlePaste = (e)=>{
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length);
        if (!/^\d+$/.test(pastedData)) return;
        const newOtp = [
            ...otp
        ];
        pastedData.split('').forEach((digit, index)=>{
            if (index < length) {
                newOtp[index] = digit;
            }
        });
        setOtp(newOtp);
        // Focus last filled input or last input
        const lastFilledIndex = Math.min(pastedData.length, length) - 1;
        inputRefs.current[lastFilledIndex]?.focus();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].wrapper,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputGroup} ${error ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].hasError : ''}`,
                role: "group",
                "aria-label": "OTP input",
                children: otp.map((digit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: (el)=>inputRefs.current[index] = el,
                        type: "text",
                        inputMode: "numeric",
                        pattern: "\\d*",
                        maxLength: 1,
                        value: digit,
                        disabled: disabled,
                        onChange: (e)=>handleChange(index, e.target.value),
                        onKeyDown: (e)=>handleKeyDown(index, e),
                        onPaste: handlePaste,
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].input} ${digit ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].filled : ''}`,
                        "aria-label": `Digit ${index + 1} of ${length}`
                    }, index, false, {
                        fileName: "[project]/src/components/ui/OTPInput/OTPInput.jsx",
                        lineNumber: 102,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/OTPInput/OTPInput.jsx",
                lineNumber: 96,
                columnNumber: 13
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].error,
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/ui/OTPInput/OTPInput.jsx",
                lineNumber: 121,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/OTPInput/OTPInput.jsx",
        lineNumber: 95,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/ui/OTPInput/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/OTPInput/OTPInput.jsx [app-ssr] (ecmascript)");
;
}),
"[project]/src/app/(auth)/farmer/register/page.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "page-module__tQfbiq__active",
  "backButton": "page-module__tQfbiq__backButton",
  "card": "page-module__tQfbiq__card",
  "completed": "page-module__tQfbiq__completed",
  "container": "page-module__tQfbiq__container",
  "form": "page-module__tQfbiq__form",
  "header": "page-module__tQfbiq__header",
  "icon": "page-module__tQfbiq__icon",
  "iconWrapper": "page-module__tQfbiq__iconWrapper",
  "progress": "page-module__tQfbiq__progress",
  "progressDot": "page-module__tQfbiq__progressDot",
  "progressLabel": "page-module__tQfbiq__progressLabel",
  "progressLine": "page-module__tQfbiq__progressLine",
  "progressStep": "page-module__tQfbiq__progressStep",
  "pulse": "page-module__tQfbiq__pulse",
  "resendButton": "page-module__tQfbiq__resendButton",
  "resendTimer": "page-module__tQfbiq__resendTimer",
  "resendWrapper": "page-module__tQfbiq__resendWrapper",
  "stepContent": "page-module__tQfbiq__stepContent",
  "subtitle": "page-module__tQfbiq__subtitle",
  "successIcon": "page-module__tQfbiq__successIcon",
  "title": "page-module__tQfbiq__title",
});
}),
"[project]/src/app/(auth)/farmer/register/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FarmerRegisterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/useTranslation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/authSlice.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Button/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button/Button.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/Input/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Input/Input.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OTPInput$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/OTPInput/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/OTPInput/OTPInput.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/(auth)/farmer/register/page.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
;
;
;
;
;
;
// Registration steps
const STEPS = {
    MOBILE: 'mobile',
    OTP: 'otp',
    AADHAR: 'aadhar',
    CONFIRM: 'confirm',
    PENDING: 'pending'
};
function FarmerRegisterPage() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isLoading, mobileNumber, error, isAuthenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state.auth);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(STEPS.MOBILE);
    const [mobile, setMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [mobileError, setMobileError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [otp, setOtp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [otpError, setOtpError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [resendTimer, setResendTimer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [aadharNumber, setAadharNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [aadharError, setAadharError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [extractedData, setExtractedData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        dateOfBirth: '',
        address: ''
    });
    const [isExtracting, setIsExtracting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Redirect if authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isAuthenticated && user?.status === 'APPROVED') {
            router.push('/farmer/dashboard');
        } else if (user?.status === 'PENDING') {
            setStep(STEPS.PENDING);
        }
    }, [
        isAuthenticated,
        user,
        router
    ]);
    // Validate mobile number (10 digits)
    const validateMobile = (value)=>{
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length !== 10) {
            return t('auth.errors.invalidMobile');
        }
        return '';
    };
    // Handle mobile input change
    const handleMobileChange = (e)=>{
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setMobile(value);
        if (mobileError) setMobileError('');
    };
    // Handle Send OTP
    const handleSendOtp = async ()=>{
        const validationError = validateMobile(mobile);
        if (validationError) {
            setMobileError(validationError);
            return;
        }
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendOtpStart"])(mobile));
        // Simulate API call - In production, replace with actual API
        try {
            await new Promise((resolve)=>setTimeout(resolve, 1500));
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendOtpSuccess"])());
            setStep(STEPS.OTP);
            startResendTimer();
        } catch (err) {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendOtpFailure"])('Failed to send OTP. Please try again.'));
        }
    };
    // Start resend timer (30 seconds)
    const startResendTimer = ()=>{
        setResendTimer(30);
        const interval = setInterval(()=>{
            setResendTimer((prev)=>{
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };
    // Handle OTP verification
    const handleVerifyOtp = async (otpValue)=>{
        if (otpValue.length !== 6) {
            setOtpError(t('auth.errors.invalidOtp'));
            return;
        }
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verifyOtpStart"])());
        // Simulate API call - In production, replace with actual API
        try {
            await new Promise((resolve)=>setTimeout(resolve, 1500));
            // OTP verified - proceed to Aadhar step
            setStep(STEPS.AADHAR);
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sendOtpSuccess"])()); // Reset loading state
        } catch (err) {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verifyOtpFailure"])('Invalid OTP. Please try again.'));
            setOtpError('Invalid OTP. Please try again.');
        }
    };
    // Handle resend OTP
    const handleResendOtp = ()=>{
        if (resendTimer > 0) return;
        handleSendOtp();
    };
    // Validate Aadhar number (12 digits)
    const validateAadhar = (value)=>{
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length !== 12) {
            return t('auth.errors.invalidAadhar');
        }
        return '';
    };
    // Handle Aadhar input
    const handleAadharChange = (e)=>{
        const value = e.target.value.replace(/\D/g, '').slice(0, 12);
        setAadharNumber(value);
        if (aadharError) setAadharError('');
        // Auto-extract data when 12 digits entered
        if (value.length === 12) {
            extractAadharDetails(value);
        } else {
            setExtractedData({
                name: '',
                dateOfBirth: '',
                address: ''
            });
        }
    };
    // Mock Aadhar data extraction
    const extractAadharDetails = async (aadhar)=>{
        setIsExtracting(true);
        // Simulate API call
        await new Promise((resolve)=>setTimeout(resolve, 1000));
        // Mock extraction logic (same as in authSlice)
        const lastFourDigits = aadhar.slice(-4);
        const mockNames = [
            'Ramesh Kumar',
            'Suresh Patil',
            'Amit Singh',
            'Priya Sharma',
            'Vijay Kumar'
        ];
        const mockStates = [
            'Maharashtra',
            'Punjab',
            'Karnataka',
            'Tamil Nadu',
            'Gujarat'
        ];
        const nameIndex = parseInt(lastFourDigits.charAt(0)) % mockNames.length;
        const stateIndex = parseInt(lastFourDigits.charAt(1)) % mockStates.length;
        const year = 1960 + parseInt(lastFourDigits.charAt(2)) * 5;
        const month = parseInt(lastFourDigits.charAt(3)) % 12 + 1;
        setExtractedData({
            name: mockNames[nameIndex],
            dateOfBirth: `${year}-${month.toString().padStart(2, '0')}-15`,
            address: `Village/City, District, ${mockStates[stateIndex]}`
        });
        setIsExtracting(false);
    };
    // Handle Aadhar submission
    const handleAadharSubmit = ()=>{
        const validationError = validateAadhar(aadharNumber);
        if (validationError) {
            setAadharError(validationError);
            return;
        }
        if (!extractedData.name) {
            setAadharError(t('auth.errors.aadharRequired'));
            return;
        }
        setStep(STEPS.CONFIRM);
    };
    // Handle final registration
    const handleConfirmRegistration = async ()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verifyOtpStart"])());
        try {
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            // Create user with Aadhar data
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verifyOtpSuccess"])({
                mobile: mobile,
                userType: 'farmer',
                aadharNumber: aadharNumber,
                name: extractedData.name,
                dateOfBirth: extractedData.dateOfBirth,
                address: extractedData.address
            }));
        } catch (err) {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["verifyOtpFailure"])('Registration failed. Please try again.'));
        }
    };
    // Handle back button
    const handleBack = ()=>{
        if (step === STEPS.CONFIRM) {
            setStep(STEPS.AADHAR);
        } else if (step === STEPS.AADHAR) {
            setStep(STEPS.OTP);
            setAadharNumber('');
            setExtractedData({
                name: '',
                dateOfBirth: '',
                address: ''
            });
        } else {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resetAuthFlow"])());
            setStep(STEPS.MOBILE);
            setOtp('');
            setOtpError('');
        }
    };
    // Render Mobile Input Step
    const renderMobileStep = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stepContent,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconWrapper,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].icon,
                                role: "img",
                                "aria-label": "farmer",
                                children: "🌾"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 245,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 244,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                            children: t('auth.farmer.title')
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 247,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitle,
                            children: t('auth.farmer.subtitle')
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 248,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 243,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].form,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: t('auth.farmer.mobileLabel'),
                            type: "tel",
                            inputMode: "numeric",
                            placeholder: t('auth.farmer.mobilePlaceholder'),
                            value: mobile,
                            onChange: handleMobileChange,
                            prefix: "+91",
                            error: mobileError || error,
                            required: true,
                            autoComplete: "tel"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 252,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onClick: handleSendOtp,
                            isLoading: isLoading,
                            disabled: mobile.length !== 10,
                            fullWidth: true,
                            children: t('auth.farmer.sendOtp')
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 265,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 251,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
            lineNumber: 242,
            columnNumber: 9
        }, this);
    // Render OTP Verification Step
    const renderOtpStep = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stepContent,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-md mb-4 text-sm font-mono text-center",
                    children: "🔔 DEBUG OTP: 123456"
                }, void 0, false, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 281,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backButton,
                    onClick: handleBack,
                    "aria-label": t('common.back'),
                    children: [
                        "← ",
                        t('common.back')
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 284,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconWrapper,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].icon,
                                role: "img",
                                "aria-label": "verification",
                                children: "🔐"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 294,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 293,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                            children: t('auth.farmer.otpTitle')
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 296,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitle,
                            children: [
                                t('auth.farmer.otpSubtitle'),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        "+91 ",
                                        mobileNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 298,
                                    columnNumber: 52
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 297,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 292,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].form,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            length: 6,
                            onChange: setOtp,
                            onComplete: handleVerifyOtp,
                            error: otpError || error,
                            disabled: isLoading
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 303,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onClick: ()=>handleVerifyOtp(otp),
                            isLoading: isLoading,
                            disabled: otp.length !== 6,
                            fullWidth: true,
                            children: t('auth.farmer.verifyOtp')
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 311,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resendWrapper,
                            children: resendTimer > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resendTimer,
                                children: [
                                    t('auth.farmer.resendIn'),
                                    " ",
                                    resendTimer,
                                    " ",
                                    t('auth.farmer.seconds')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 322,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resendButton,
                                onClick: handleResendOtp,
                                disabled: isLoading,
                                children: t('auth.farmer.resendOtp')
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 326,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 320,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 302,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
            lineNumber: 279,
            columnNumber: 9
        }, this);
    // Render Aadhar Input Step
    const renderAadharStep = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stepContent,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backButton,
                    onClick: handleBack,
                    "aria-label": t('common.back'),
                    children: [
                        "← ",
                        t('common.back')
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 342,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconWrapper,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].icon,
                                role: "img",
                                "aria-label": "aadhar",
                                children: "🪪"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 352,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 351,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                            children: t('auth.farmer.title')
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 354,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitle,
                            children: "Enter your Aadhar for verification"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 355,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 350,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].form,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: t('auth.farmer.aadharLabel'),
                            type: "tel",
                            inputMode: "numeric",
                            placeholder: t('auth.farmer.aadharPlaceholder'),
                            value: aadharNumber,
                            onChange: handleAadharChange,
                            error: aadharError,
                            required: true,
                            maxLength: 12
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 359,
                            columnNumber: 17
                        }, this),
                        isExtracting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 373,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mt-2",
                                    children: t('auth.farmer.extractingData')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 374,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 372,
                            columnNumber: 21
                        }, this),
                        extractedData.name && !isExtracting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-green-50 border border-green-200 rounded-md p-4 space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-green-800 mb-3",
                                    children: t('auth.farmer.detailsExtracted')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 380,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: [
                                                        t('auth.farmer.nameLabel'),
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                                    lineNumber: 385,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-gray-900",
                                                    children: extractedData.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                                    lineNumber: 386,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 384,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: [
                                                        t('auth.farmer.dobLabel'),
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                                    lineNumber: 389,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-gray-900",
                                                    children: extractedData.dateOfBirth
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                                    lineNumber: 390,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 388,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: [
                                                        t('auth.farmer.addressLabel'),
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                                    lineNumber: 393,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-gray-900 text-right max-w-xs",
                                                    children: extractedData.address
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                                    lineNumber: 394,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 392,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 383,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 379,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onClick: handleAadharSubmit,
                            disabled: aadharNumber.length !== 12 || !extractedData.name || isExtracting,
                            fullWidth: true,
                            children: t('common.next')
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 400,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 358,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
            lineNumber: 341,
            columnNumber: 9
        }, this);
    // Render Confirmation Step
    const renderConfirmStep = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stepContent,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backButton,
                    onClick: handleBack,
                    "aria-label": t('common.back'),
                    children: [
                        "← ",
                        t('common.back')
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 414,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconWrapper,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].icon,
                                role: "img",
                                "aria-label": "check",
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 424,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 423,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                            children: t('auth.farmer.confirmDetails')
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 426,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitle,
                            children: "Please review your information"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 427,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 422,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].form,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 border border-gray-200 rounded-lg p-5 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-500 uppercase tracking-wide",
                                            children: "Mobile Number"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 433,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base font-semibold text-gray-900 mt-1",
                                            children: [
                                                "+91 ",
                                                mobile
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 434,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 432,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-500 uppercase tracking-wide",
                                            children: t('auth.farmer.aadharLabel')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 437,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base font-semibold text-gray-900 mt-1",
                                            children: aadharNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 438,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 436,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-500 uppercase tracking-wide",
                                            children: t('auth.farmer.nameLabel')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 441,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base font-semibold text-gray-900 mt-1",
                                            children: extractedData.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 442,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 440,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-500 uppercase tracking-wide",
                                            children: t('auth.farmer.dobLabel')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 445,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base font-semibold text-gray-900 mt-1",
                                            children: extractedData.dateOfBirth
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 446,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 444,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-500 uppercase tracking-wide",
                                            children: t('auth.farmer.addressLabel')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 449,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base font-semibold text-gray-900 mt-1",
                                            children: extractedData.address
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 450,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 448,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 431,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-yellow-50 border border-yellow-200 rounded-md p-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-yellow-800",
                                children: t('auth.farmer.canBrowse')
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 455,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 454,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            onClick: handleConfirmRegistration,
                            isLoading: isLoading,
                            fullWidth: true,
                            children: t('common.submit')
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 460,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 430,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
            lineNumber: 413,
            columnNumber: 9
        }, this);
    // Render Pending Approval Step
    const renderPendingStep = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].stepContent,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconWrapper} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].pendingIcon}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].icon,
                                role: "img",
                                "aria-label": "pending",
                                children: "⏳"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 476,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 475,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                            style: {
                                color: '#d97706'
                            },
                            children: "Verification Pending"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 478,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitle,
                            children: "Your account is currently under review by the administrator."
                        }, void 0, false, {
                            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 479,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 474,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-yellow-800 text-center",
                        children: "Please wait for admin approval. You can try logging in later to check your status."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                        lineNumber: 485,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 484,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onClick: ()=>{
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resetAuthFlow"])());
                        setStep(STEPS.MOBILE);
                        setMobile('');
                        setOtp('');
                    },
                    variant: "outline",
                    fullWidth: true,
                    children: "Back to Login"
                }, void 0, false, {
                    fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 490,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
            lineNumber: 473,
            columnNumber: 9
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card,
            children: [
                step === STEPS.MOBILE && renderMobileStep(),
                step === STEPS.OTP && renderOtpStep(),
                step === STEPS.AADHAR && renderAadharStep(),
                step === STEPS.CONFIRM && renderConfirmStep(),
                step === STEPS.PENDING && renderPendingStep()
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
            lineNumber: 507,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(auth)/farmer/register/page.jsx",
        lineNumber: 506,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=src_c82679a2._.js.map