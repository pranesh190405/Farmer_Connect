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

        // Add email for admin login
        await db.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS email VARCHAR(255) UNIQUE;
        `);

        // Re-run the admin seed to set the email
        await db.query(`
            INSERT INTO users (
                mobile, email, name, type, status, password_hash,
                aadhar_number, aadhar_verified, date_of_birth, address
            )
            VALUES (
                '9999999999', 'admin@farmerconnect.com', 'System Admin', 'admin', 'APPROVED',
                '$2a$10$7a1LsWIfoLsSoKAgbwQsDOymw.LTr0K6xTSksNM50W/7jUN3Eevq6',
                '999999999999', TRUE, '1980-01-01', 'Admin Office, New Delhi'
            )
            ON CONFLICT (mobile, type) DO UPDATE SET email = 'admin@farmerconnect.com';
        `);

        console.log('Migration successful');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
