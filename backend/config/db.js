// Import PostgreSQL connection pool
const { Pool } = require('pg');

// Load environment variables from .env file
require('dotenv').config();

// Create a new PostgreSQL connection pool
const poolConfig = {
    user: process.env.DB_USER,        // Database username
    host: process.env.DB_HOST,        // Database host (e.g., localhost)
    database: process.env.DB_NAME,    // Database name
    password: process.env.DB_PASSWORD,// Database password
    port: parseInt(process.env.DB_PORT, 10), // Convert port to number
};

// Use SSL only in production or when explicitly enabled
if (process.env.NODE_ENV === 'production' || process.env.DB_SSL === 'true') {
    poolConfig.ssl = {
        require: true,
        rejectUnauthorized: false,
    };
}

const pool = new Pool(poolConfig);

// Test database connection when server starts
pool.query('SELECT NOW()')
    .then(() => console.log('✅ PostgreSQL connected'))
    .catch((err) =>
        console.error('❌ PostgreSQL connection error:', err.message)
    );

// Export query function for executing SQL queries
module.exports = {
    query: (text, params) => pool.query(text, params), // Reusable query method
    pool, // Export pool if direct access is needed
};
