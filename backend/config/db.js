const { Pool } = require('pg');
require('dotenv').config();

const poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};

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