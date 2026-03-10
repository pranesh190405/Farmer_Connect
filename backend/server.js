require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const mainRouter = require('./routes');
const checkEnv = require('./scripts/check-env');

const app = express();
const PORT = process.env.PORT || 5001;

/*
Run environment validation only when NOT running tests
*/
if (process.env.NODE_ENV !== 'test') {
    checkEnv();
}

// Middleware
app.use(cors({
    origin: [
        'https://farmer-connect-omega.vercel.app',
        'http://localhost:3000',
    ],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
    next();
});

// API routes
app.use('/api', mainRouter);

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

// Root route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        error: message
    });
});

// Export Express app for testing
module.exports = app;

/*
Start server only if NOT running tests
*/
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 Farmer Connect API running on http://localhost:${PORT}`);
        console.log(`📡 Health check: http://localhost:${PORT}/health`);
    });
}
