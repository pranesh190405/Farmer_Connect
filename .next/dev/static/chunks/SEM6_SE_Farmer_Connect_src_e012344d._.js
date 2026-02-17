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
"[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "page-module__xGAElW__active",
  "backButton": "page-module__xGAElW__backButton",
  "card": "page-module__xGAElW__card",
  "completed": "page-module__xGAElW__completed",
  "container": "page-module__xGAElW__container",
  "form": "page-module__xGAElW__form",
  "header": "page-module__xGAElW__header",
  "icon": "page-module__xGAElW__icon",
  "iconWrapper": "page-module__xGAElW__iconWrapper",
  "progress": "page-module__xGAElW__progress",
  "progressDot": "page-module__xGAElW__progressDot",
  "progressLabel": "page-module__xGAElW__progressLabel",
  "progressLine": "page-module__xGAElW__progressLine",
  "progressStep": "page-module__xGAElW__progressStep",
  "pulse": "page-module__xGAElW__pulse",
  "resendButton": "page-module__xGAElW__resendButton",
  "resendTimer": "page-module__xGAElW__resendTimer",
  "resendWrapper": "page-module__xGAElW__resendWrapper",
  "stepContent": "page-module__xGAElW__stepContent",
  "subtitle": "page-module__xGAElW__subtitle",
  "successIcon": "page-module__xGAElW__successIcon",
  "title": "page-module__xGAElW__title",
});
}),
"[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FarmerRegisterPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/react-i18next/dist/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/react-i18next/dist/es/useTranslation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/store/slices/authSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Button/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Button/Button.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/Input/Input.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/OTPInput/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/components/ui/OTPInput/OTPInput.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.module.css [app-client] (css module)");
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
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isLoading, mobileNumber, error, isAuthenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "FarmerRegisterPage.useSelector": (state)=>state.auth
    }["FarmerRegisterPage.useSelector"]);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(STEPS.MOBILE);
    const [mobile, setMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [mobileError, setMobileError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [otp, setOtp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [otpError, setOtpError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [resendTimer, setResendTimer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [aadharNumber, setAadharNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [aadharError, setAadharError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [extractedData, setExtractedData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        dateOfBirth: '',
        address: ''
    });
    const [isExtracting, setIsExtracting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Redirect if authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FarmerRegisterPage.useEffect": ()=>{
            if (isAuthenticated && user?.status === 'APPROVED') {
                router.push('/farmer/dashboard');
            } else if (user?.status === 'PENDING') {
                setStep(STEPS.PENDING);
            }
        }
    }["FarmerRegisterPage.useEffect"], [
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
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendOtpStart"])(mobile));
        try {
            await dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendOtpAsync"])(mobile)).unwrap();
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendOtpSuccess"])());
            setStep(STEPS.OTP);
            startResendTimer();
        } catch (err) {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendOtpFailure"])(err || 'Failed to send OTP. Please try again.'));
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
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyOtpStart"])());
        try {
            const res = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile,
                    otp: otpValue
                })
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyOtpFailure"])(data.error || 'Invalid OTP'));
                setOtpError(data.error || 'Invalid OTP');
                return;
            }
            // OTP verified - proceed to Aadhar step for registration
            setStep(STEPS.AADHAR);
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendOtpSuccess"])()); // Reset loading state
        } catch (err) {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyOtpFailure"])('Invalid OTP. Please try again.'));
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
        console.log('🔘 Submit button clicked');
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyOtpStart"])());
        try {
            console.log('📤 Dispatching registerAsync with:', {
                mobile: mobile,
                type: 'farmer',
                name: extractedData.name,
                aadharNumber: aadharNumber,
                dateOfBirth: extractedData.dateOfBirth,
                address: extractedData.address
            });
            const result = await dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerAsync"])({
                mobile: mobile,
                type: 'farmer',
                name: extractedData.name,
                aadharNumber: aadharNumber,
                dateOfBirth: extractedData.dateOfBirth,
                address: extractedData.address
            })).unwrap();
            console.log('✅ Registration successful:', result);
        // Registration successful — user is logged in
        // The extraReducers handler will set isAuthenticated
        } catch (err) {
            console.error('❌ Registration failed:', err);
            console.log('Error Type:', typeof err);
            console.log('Error Value:', JSON.stringify(err));
            // Handle "User already exists" gracefully
            if (String(err).includes('User already exists') || String(err).includes('already exists')) {
                alert('User account already exists. Redirecting to login...');
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetAuthFlow"])());
                window.location.href = '/login';
                return;
            }
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyOtpFailure"])(err || 'Registration failed. Please try again.'));
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
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetAuthFlow"])());
            setStep(STEPS.MOBILE);
            setOtp('');
            setOtpError('');
        }
    };
    // Render Mobile Input Step
    const renderMobileStep = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stepContent,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconWrapper,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon,
                                role: "img",
                                "aria-label": "farmer",
                                children: "🌾"
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 285,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 284,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            children: t('auth.farmer.title')
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 287,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            children: t('auth.farmer.subtitle')
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 288,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 283,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 292,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: handleSendOtp,
                            isLoading: isLoading,
                            disabled: mobile.length !== 10,
                            fullWidth: true,
                            children: t('auth.farmer.sendOtp')
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 305,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 291,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
            lineNumber: 282,
            columnNumber: 9
        }, this);
    // Render OTP Verification Step
    const renderOtpStep = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stepContent,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-md mb-4 text-sm font-mono text-center",
                    children: "🔔 DEBUG OTP: 123456"
                }, void 0, false, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 321,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backButton,
                    onClick: handleBack,
                    "aria-label": t('common.back'),
                    children: [
                        "← ",
                        t('common.back')
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 324,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconWrapper,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon,
                                role: "img",
                                "aria-label": "verification",
                                children: "🔐"
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 334,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 333,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            children: t('auth.farmer.otpTitle')
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 336,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            children: [
                                t('auth.farmer.otpSubtitle'),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        "+91 ",
                                        mobileNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 338,
                                    columnNumber: 52
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 337,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 332,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$OTPInput$2f$OTPInput$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            length: 6,
                            onChange: setOtp,
                            onComplete: handleVerifyOtp,
                            error: otpError || error,
                            disabled: isLoading
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 343,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: ()=>handleVerifyOtp(otp),
                            isLoading: isLoading,
                            disabled: otp.length !== 6,
                            fullWidth: true,
                            children: t('auth.farmer.verifyOtp')
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 351,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resendWrapper,
                            children: resendTimer > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resendTimer,
                                children: [
                                    t('auth.farmer.resendIn'),
                                    " ",
                                    resendTimer,
                                    " ",
                                    t('auth.farmer.seconds')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 362,
                                columnNumber: 25
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].resendButton,
                                onClick: handleResendOtp,
                                disabled: isLoading,
                                children: t('auth.farmer.resendOtp')
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 366,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 360,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 342,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
            lineNumber: 319,
            columnNumber: 9
        }, this);
    // Render Aadhar Input Step
    const renderAadharStep = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stepContent,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backButton,
                    onClick: handleBack,
                    "aria-label": t('common.back'),
                    children: [
                        "← ",
                        t('common.back')
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 382,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconWrapper,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon,
                                role: "img",
                                "aria-label": "aadhar",
                                children: "🪪"
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 392,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 391,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            children: t('auth.farmer.title')
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 394,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            children: "Enter your Aadhar for verification"
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 395,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 390,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Input$2f$Input$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 399,
                            columnNumber: 17
                        }, this),
                        isExtracting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"
                                }, void 0, false, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 413,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600 mt-2",
                                    children: t('auth.farmer.extractingData')
                                }, void 0, false, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 414,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 412,
                            columnNumber: 21
                        }, this),
                        extractedData.name && !isExtracting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-green-50 border border-green-200 rounded-md p-4 space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-green-800 mb-3",
                                    children: t('auth.farmer.detailsExtracted')
                                }, void 0, false, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 420,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: [
                                                        t('auth.farmer.nameLabel'),
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                                    lineNumber: 425,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-gray-900",
                                                    children: extractedData.name
                                                }, void 0, false, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                                    lineNumber: 426,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 424,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: [
                                                        t('auth.farmer.dobLabel'),
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                                    lineNumber: 429,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-gray-900",
                                                    children: extractedData.dateOfBirth
                                                }, void 0, false, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                                    lineNumber: 430,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 428,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-600",
                                                    children: [
                                                        t('auth.farmer.addressLabel'),
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                                    lineNumber: 433,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-gray-900 text-right max-w-xs",
                                                    children: extractedData.address
                                                }, void 0, false, {
                                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                                    lineNumber: 434,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 432,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 423,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 419,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: handleAadharSubmit,
                            disabled: aadharNumber.length !== 12 || !extractedData.name || isExtracting,
                            fullWidth: true,
                            children: t('common.next')
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 440,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 398,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
            lineNumber: 381,
            columnNumber: 9
        }, this);
    // Render Confirmation Step
    const renderConfirmStep = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stepContent,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backButton,
                    onClick: handleBack,
                    "aria-label": t('common.back'),
                    children: [
                        "← ",
                        t('common.back')
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 454,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconWrapper,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon,
                                role: "img",
                                "aria-label": "check",
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 464,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 463,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            children: t('auth.farmer.confirmDetails')
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 466,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            children: "Please review your information"
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 467,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 462,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 border border-gray-200 rounded-lg p-5 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-500 uppercase tracking-wide",
                                            children: "Mobile Number"
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 473,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base font-semibold text-gray-900 mt-1",
                                            children: [
                                                "+91 ",
                                                mobile
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 474,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 472,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-500 uppercase tracking-wide",
                                            children: t('auth.farmer.aadharLabel')
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 477,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base font-semibold text-gray-900 mt-1",
                                            children: aadharNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3')
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 478,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 476,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-500 uppercase tracking-wide",
                                            children: t('auth.farmer.nameLabel')
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 481,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base font-semibold text-gray-900 mt-1",
                                            children: extractedData.name
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 482,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 480,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-500 uppercase tracking-wide",
                                            children: t('auth.farmer.dobLabel')
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 485,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base font-semibold text-gray-900 mt-1",
                                            children: extractedData.dateOfBirth
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 486,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 484,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-500 uppercase tracking-wide",
                                            children: t('auth.farmer.addressLabel')
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 489,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base font-semibold text-gray-900 mt-1",
                                            children: extractedData.address
                                        }, void 0, false, {
                                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                            lineNumber: 490,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                    lineNumber: 488,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 471,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-yellow-50 border border-yellow-200 rounded-md p-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-yellow-800",
                                children: t('auth.farmer.canBrowse')
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 495,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 494,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onClick: handleConfirmRegistration,
                            isLoading: isLoading,
                            fullWidth: true,
                            children: t('common.submit')
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 500,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 470,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
            lineNumber: 453,
            columnNumber: 9
        }, this);
    // Render Pending Approval Step
    const renderPendingStep = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stepContent,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconWrapper} ${__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pendingIcon}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].icon,
                                role: "img",
                                "aria-label": "pending",
                                children: "⏳"
                            }, void 0, false, {
                                fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                                lineNumber: 516,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 515,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            style: {
                                color: '#d97706'
                            },
                            children: "Verification Pending"
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 518,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            children: "Your account is currently under review by the administrator."
                        }, void 0, false, {
                            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                            lineNumber: 519,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 514,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-yellow-800 text-center",
                        children: "Please wait for admin approval. You can try logging in later to check your status."
                    }, void 0, false, {
                        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                        lineNumber: 525,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 524,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$components$2f$ui$2f$Button$2f$Button$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    onClick: ()=>{
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetAuthFlow"])());
                        setStep(STEPS.MOBILE);
                        setMobile('');
                        setOtp('');
                    },
                    variant: "outline",
                    fullWidth: true,
                    children: "Back to Login"
                }, void 0, false, {
                    fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
                    lineNumber: 530,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
            lineNumber: 513,
            columnNumber: 9
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$src$2f$app$2f28$auth$292f$farmer$2f$register$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
            children: [
                step === STEPS.MOBILE && renderMobileStep(),
                step === STEPS.OTP && renderOtpStep(),
                step === STEPS.AADHAR && renderAadharStep(),
                step === STEPS.CONFIRM && renderConfirmStep(),
                step === STEPS.PENDING && renderPendingStep()
            ]
        }, void 0, true, {
            fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
            lineNumber: 547,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/SEM6/SE/Farmer_Connect/src/app/(auth)/farmer/register/page.jsx",
        lineNumber: 546,
        columnNumber: 9
    }, this);
}
_s(FarmerRegisterPage, "VewYIwNYgnVFhVADMrAE5c743PQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$SEM6$2f$SE$2f$Farmer_Connect$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = FarmerRegisterPage;
var _c;
__turbopack_context__.k.register(_c, "FarmerRegisterPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=SEM6_SE_Farmer_Connect_src_e012344d._.js.map