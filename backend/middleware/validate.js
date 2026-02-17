// Import validationResult to collect validation errors
const { validationResult } = require('express-validator');

/**
 * Custom validation middleware wrapper
 * Accepts an array of validation rules
 */
const validate = (validations) => {
    return async (req, res, next) => {

        // Run all validation rules on request
        await Promise.all(
            validations.map(validation => validation.run(req))
        );

        // Collect validation results
        const errors = validationResult(req);

        // If no validation errors → continue to next middleware
        if (errors.isEmpty()) {
            return next();
        }

        // Format validation errors into readable structure
        const extractedErrors = [];
        errors.array().map(err =>
            extractedErrors.push({ [err.path]: err.msg })
        );

        // Return 400 Bad Request with formatted errors
        return res.status(400).json({
            error: 'Validation Error',
            details: extractedErrors
        });
    };
};

// Export middleware
module.exports = validate;
