(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/SEM6/SE/Farmer_Connect/src/components/ui/Button/Button.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "button": "Button-module__Ld164q__button",
  "fullWidth": "Button-module__Ld164q__fullWidth",
  "hiddenText": "Button-module__Ld164q__hiddenText",
  "lg": "Button-module__Ld164q__lg",
  "loading": "Button-module__Ld164q__loading",
  "md": "Button-module__Ld164q__md",
  "outline": "Button-module__Ld164q__outline",
  "primary": "Button-module__Ld164q__primary",
  "secondary": "Button-module__Ld164q__secondary",
  "sm": "Button-module__Ld164q__sm",
  "spin": "Button-module__Ld164q__spin",
  "spinner": "Button-module__Ld164q__spinner",
});
}),
"[project]/SEM6/SE/Farmer_Connect/src/components/ui/Button/Button.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Button/Button.module.css [app-client] (css module)");
'use client';
;
;
function Button({ children, variant = 'primary', size = 'lg', isLoading = false, disabled = false, fullWidth = false, type = 'button', onClick, ariaLabel, className = '', ...props }) {
    const classNames = [
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button,
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][variant],
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][size],
        fullWidth ? __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fullWidth : '',
        isLoading ? __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loading : '',
        className
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: type,
        className: classNames,
        disabled: disabled || isLoading,
        onClick: onClick,
        "aria-label": ariaLabel,
        "aria-busy": isLoading,
        ...props,
        children: [
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].spinner,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/Button/Button.jsx",
                lineNumber: 50,
                columnNumber: 17
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: isLoading ? __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hiddenText : '',
                children: children
            }, void 0, false, {
                fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/Button/Button.jsx",
                lineNumber: 52,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/Button/Button.jsx",
        lineNumber: 40,
        columnNumber: 9
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SEM6/SE/Farmer_Connect/src/components/ui/Button/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Button/Button.jsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "disabled": "Input-module__5rI_1a__disabled",
  "error": "Input-module__5rI_1a__error",
  "hasError": "Input-module__5rI_1a__hasError",
  "hint": "Input-module__5rI_1a__hint",
  "input": "Input-module__5rI_1a__input",
  "inputWrapper": "Input-module__5rI_1a__inputWrapper",
  "label": "Input-module__5rI_1a__label",
  "prefix": "Input-module__5rI_1a__prefix",
  "required": "Input-module__5rI_1a__required",
  "suffix": "Input-module__5rI_1a__suffix",
  "wrapper": "Input-module__5rI_1a__wrapper",
});
}),
"[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
 */ const Input = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(function Input({ label, error, hint, prefix, suffix, id, type = 'text', disabled = false, required = false, className = '', ...props }, ref) {
    _s();
    const uniqueId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const inputId = id || `input-${uniqueId}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper} ${className}`,
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: inputId,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                children: [
                    label,
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].required,
                        "aria-hidden": "true",
                        children: " *"
                    }, void 0, false, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.jsx",
                        lineNumber: 40,
                        columnNumber: 34
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.jsx",
                lineNumber: 38,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper} ${error ? __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hasError : ''} ${disabled ? __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].disabled : ''}`,
                children: [
                    prefix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].prefix,
                        "aria-hidden": "true",
                        children: prefix
                    }, void 0, false, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.jsx",
                        lineNumber: 46,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                        ...props
                    }, void 0, false, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.jsx",
                        lineNumber: 51,
                        columnNumber: 17
                    }, this),
                    suffix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].suffix,
                        children: suffix
                    }, void 0, false, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.jsx",
                        lineNumber: 64,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.jsx",
                lineNumber: 44,
                columnNumber: 13
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: errorId,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.jsx",
                lineNumber: 71,
                columnNumber: 17
            }, this),
            hint && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: hintId,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hint,
                children: hint
            }, void 0, false, {
                fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.jsx",
                lineNumber: 77,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.jsx",
        lineNumber: 36,
        columnNumber: 9
    }, this);
}, "j7NPILheLIfrWAvm8S/GM4Sml/8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
})), "j7NPILheLIfrWAvm8S/GM4Sml/8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c1 = Input;
const __TURBOPACK__default__export__ = Input;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.jsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SEM6/SE/Farmer_Connect/src/components/ui/OTPInput/OTPInput.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "error": "OTPInput-module__mqNHnG__error",
  "filled": "OTPInput-module__mqNHnG__filled",
  "hasError": "OTPInput-module__mqNHnG__hasError",
  "input": "OTPInput-module__mqNHnG__input",
  "inputGroup": "OTPInput-module__mqNHnG__inputGroup",
  "wrapper": "OTPInput-module__mqNHnG__wrapper",
});
}),
"[project]/SEM6/SE/Farmer_Connect/src/components/ui/OTPInput/OTPInput.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OTPInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/OTPInput/OTPInput.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function OTPInput({ length = 6, onComplete, onChange, error, disabled = false }) {
    _s();
    const [otp, setOtp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Array(length).fill(''));
    const inputRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Focus first input on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OTPInput.useEffect": ()=>{
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        }
    }["OTPInput.useEffect"], []);
    // Notify parent when OTP is complete
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OTPInput.useEffect": ()=>{
            const otpValue = otp.join('');
            if (onChange) {
                onChange(otpValue);
            }
            if (otpValue.length === length && onComplete) {
                onComplete(otpValue);
            }
        }
    }["OTPInput.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputGroup} ${error ? __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hasError : ''}`,
                role: "group",
                "aria-label": "OTP input",
                children: otp.map((digit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input} ${digit ? __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].filled : ''}`,
                        "aria-label": `Digit ${index + 1} of ${length}`
                    }, index, false, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/OTPInput/OTPInput.jsx",
                        lineNumber: 102,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/OTPInput/OTPInput.jsx",
                lineNumber: 96,
                columnNumber: 13
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/OTPInput/OTPInput.jsx",
                lineNumber: 121,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/SEM6/SE/Farmer_Connect/src/components/ui/OTPInput/OTPInput.jsx",
        lineNumber: 95,
        columnNumber: 9
    }, this);
}
_s(OTPInput, "2k/2+EADhvXzb92d7+9U8a7TCTo=");
_c = OTPInput;
var _c;
__turbopack_context__.k.register(_c, "OTPInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SEM6/SE/Farmer_Connect/src/components/ui/OTPInput/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/OTPInput/OTPInput.jsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/store/slices/authSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Button/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Button/Button.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/OTPInput/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/OTPInput/OTPInput.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function AdminLoginPage() {
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, userType, isLoading, otpSent, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "AdminLoginPage.useSelector": (state)=>state.auth
    }["AdminLoginPage.useSelector"]);
    const [mobile, setMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [otp, setOtp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLoginPage.useEffect": ()=>{
            if (isAuthenticated && userType === 'admin') {
                router.push('/admin/dashboard');
            }
        }
    }["AdminLoginPage.useEffect"], [
        isAuthenticated,
        userType,
        router
    ]);
    const handleSendOtp = async ()=>{
        if (mobile.length !== 10) return;
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendOtpStart"])(mobile));
        // Simulate API
        setTimeout(()=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendOtpSuccess"])());
        }, 1000);
    };
    const handleVerifyOtp = async (otpValue)=>{
        if (otpValue.length !== 6) return;
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyOtpStart"])());
        // Simulate API
        setTimeout(()=>{
            // Check against the mock admin user we added in authSlice
            // We pass userType: 'admin' so verifyOtpSuccess looks for an admin with this mobile
            if (mobile === '9999999999') {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyOtpSuccess"])({
                    mobile,
                    userType: 'admin'
                }));
            } else {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyOtpFailure"])('Access Denied: Not an allowed admin number.'));
            }
        }, 1000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-gray-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-8 rounded-lg shadow-md w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-gray-800",
                            children: "Admin Portal"
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                            lineNumber: 67,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 text-sm",
                            children: "Secure Access"
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                            lineNumber: 68,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                    lineNumber: 66,
                    columnNumber: 17
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm text-center",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                    lineNumber: 72,
                    columnNumber: 21
                }, this),
                !otpSent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            label: "Admin Mobile Number",
                            value: mobile,
                            onChange: (e)=>setMobile(e.target.value.replace(/\D/g, '').slice(0, 10)),
                            placeholder: "Enter 10-digit mobile",
                            prefix: "+91",
                            maxLength: 10
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                            lineNumber: 79,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: handleSendOtp,
                            disabled: mobile.length !== 10 || isLoading,
                            isLoading: isLoading,
                            fullWidth: true,
                            children: "Send OTP"
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                            lineNumber: 87,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-center text-gray-400 mt-4",
                            children: "Default Admin: 9999999999"
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                            lineNumber: 95,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                    lineNumber: 78,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-md mb-4 text-sm font-mono text-center",
                            children: "🔔 DEBUG OTP: 123456"
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                            lineNumber: 102,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600",
                                children: [
                                    "Enter OTP sent to +91 ",
                                    mobile
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                                lineNumber: 107,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                            lineNumber: 106,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            length: 6,
                            onChange: setOtp,
                            onComplete: handleVerifyOtp,
                            disabled: isLoading
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                            lineNumber: 110,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: ()=>handleVerifyOtp(otp),
                            disabled: otp.length !== 6 || isLoading,
                            isLoading: isLoading,
                            fullWidth: true,
                            children: "Verify & Login"
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                            lineNumber: 117,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetAuthFlow"])()),
                            className: "w-full text-center text-sm text-gray-500 hover:text-gray-700 underline",
                            children: "Back to Mobile Entry"
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                            lineNumber: 126,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
                    lineNumber: 100,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
            lineNumber: 65,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/admin/login/page.jsx",
        lineNumber: 64,
        columnNumber: 9
    }, this);
}
_s(AdminLoginPage, "RmCsjOkuhc75T/bG1ocLwa+DpfA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = AdminLoginPage;
var _c;
__turbopack_context__.k.register(_c, "AdminLoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=SEM6_SE_Farmer_Connect_src_73dfce43._.js.map