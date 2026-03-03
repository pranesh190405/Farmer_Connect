require('dotenv').config();
const checkEnv = require('./scripts/check-env');

// ✅ UPDATE: Run environment check only if NOT in test mode
// This prevents failures during integration testing (Jest)
if (process.env.NODE_ENV !== 'test') {
    // Check environment variables before starting
    checkEnv();
}

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const mainRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Serve uploaded files (documents, photos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
    next();
});

// Main router — all API routes under /api
app.use('/api', mainRouter);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({ error: message });
});

//UPDATE: Start server only if NOT in test mode
// Prevents port conflict during integration testing (Supertest)
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 Farmer Connect API running on http://localhost:${PORT}`);
        console.log(`📡 Health check: http://localhost:${PORT}/health`);
    });
}

// UPDATE: Export app for integration testing
module.exports = app;