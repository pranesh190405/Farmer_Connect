const db = require('./config/db');

async function migrate() {
    try {
        console.log('Migrating database...');

        // Add PIN hash column for phone+PIN authentication
        await db.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS pin_hash VARCHAR(255) DEFAULT '',
            ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0,
            ADD COLUMN IF NOT EXISTS lock_until TIMESTAMP DEFAULT NULL;
        `);

        // Add existing buyer-specific columns (from previous migration)
        await db.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS business_name VARCHAR(100) DEFAULT '',
            ADD COLUMN IF NOT EXISTS tax_id VARCHAR(20) DEFAULT '',
            ADD COLUMN IF NOT EXISTS business_category VARCHAR(50) DEFAULT '',
            ADD COLUMN IF NOT EXISTS contact_name VARCHAR(100) DEFAULT '';
        `);

        console.log('Migration successful');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
