/**
 * Migration: Add bidding support
 * - Adds bidding_enabled and bidding_end_time columns to listings
 * - Creates bids table
 *
 * Usage: node scripts/migrate_bids.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
});

async function migrate() {
    const client = await pool.connect();
    try {
        console.log('🔄 Running bidding migration …\n');
        await client.query('BEGIN');

        // 1. Add columns to listings
        await client.query(`
            ALTER TABLE listings
                ADD COLUMN IF NOT EXISTS bidding_enabled BOOLEAN DEFAULT FALSE,
                ADD COLUMN IF NOT EXISTS bidding_end_time TIMESTAMP;
        `);
        console.log('  ✅ Added bidding_enabled & bidding_end_time to listings');

        // 2. Create bids table
        await client.query(`
            CREATE TABLE IF NOT EXISTS bids (
                id          SERIAL PRIMARY KEY,
                listing_id  INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
                buyer_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                amount      DECIMAL(10, 2) NOT NULL,
                created_at  TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log('  ✅ Created bids table');

        // 3. Create indexes for performance
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_bids_listing_id ON bids(listing_id);
            CREATE INDEX IF NOT EXISTS idx_bids_buyer_id ON bids(buyer_id);
            CREATE INDEX IF NOT EXISTS idx_listings_bidding ON listings(bidding_enabled) WHERE bidding_enabled = TRUE;
        `);
        console.log('  ✅ Created indexes');

        await client.query('COMMIT');
        console.log('\n🎉 Bidding migration completed successfully!\n');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('\n❌ Migration failed:', err.message);
        console.error(err.stack);
    } finally {
        client.release();
        await pool.end();
    }
}

migrate();
