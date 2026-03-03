const { Pool } = require('pg');
require('dotenv').config();

let pool = null;

// Only create real DB connection if NOT running tests
if (process.env.NODE_ENV !== 'test') {
    pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT, 10),
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    });

    // Test DB connection only in non-test environments
    pool.query('SELECT NOW()')
        .then(() => console.log('✅ PostgreSQL connected'))
        .catch((err) =>
            console.error('❌ PostgreSQL connection error:', err.message)
        );
}

// Safe query wrapper
const query = async (text, params) => {
    if (!pool) {
        throw new Error('Database not initialized (test mode)');
    }
    return pool.query(text, params);
};

module.exports = {
    query,
    pool
};