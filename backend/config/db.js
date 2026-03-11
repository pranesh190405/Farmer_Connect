const { Pool } = require('pg');
require('dotenv').config();

const poolConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
};

if (process.env.DB_SSL === 'true') {
    poolConfig.ssl = {
        require: true,
        rejectUnauthorized: false,
    };
}

let pool;

/*
During tests we DO NOT connect to the database
*/
if (process.env.NODE_ENV !== 'test') {

    pool = new Pool(poolConfig);

    pool.query('SELECT NOW()')
        .then(() => console.log('✅ PostgreSQL connected'))
        .catch((err) =>
            console.error('❌ PostgreSQL connection error:', err.message)
        );

} else {

    // Mock pool for tests
    pool = {
        query: async () => ({
            rows: [],
        })
    };

}

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};