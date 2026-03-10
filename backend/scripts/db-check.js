require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

console.log('Testing database connection with connection string...');

client.connect()
    .then(() => {
        console.log('✅ Connection successful!');
        return client.end();
    })
    .catch(err => {
        console.error('❌ Connection failed:', err.message);
        if (err.code) console.error('Error code:', err.code);
        if (err.detail) console.error('Detail:', err.detail);
        if (err.hint) console.error('Hint:', err.hint);
        process.exit(1);
    });
