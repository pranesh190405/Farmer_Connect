require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

console.log('Testing database connection with following config:');
console.log(`User: ${process.env.DB_USER}`);
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`Database: ${process.env.DB_NAME}`);
console.log(`Port: ${process.env.DB_PORT}`);
// Intentionally not logging password

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
