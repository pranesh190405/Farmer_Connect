const requiredEnvVars = [
    'DB_USER',
    'DB_HOST',
    'DB_NAME',
    'DB_PASSWORD',
    'DB_PORT',
    'JWT_SECRET'
];

function checkEnv() {
    const missing = requiredEnvVars.filter(key => !process.env[key]);

    if (missing.length > 0) {
        console.error('❌ FATAL ERROR: Missing required environment variables:');
        missing.forEach(key => console.error(`   - ${key}`));
        console.error('Please check your .env file.');
        process.exit(1);
    }

    console.log('✅ Environment check passed');
}

module.exports = checkEnv;
