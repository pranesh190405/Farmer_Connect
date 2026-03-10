/**
 * Seed script — creates test farmer, buyer, and sample listings
 *
 * Farmer: mobile 1234567890, PIN 1904, aadhar 123456789012, name "Farmer 1"
 * Buyer:  mobile 1234567890, PIN 1904, aadhar 123456789012, name "Buyer 1"
 *
 * Run: node scripts/seed.js
 */

const db = require('../config/db');
const bcrypt = require('bcryptjs');

const LISTINGS = [
    {
        cropName: 'Tomato',
        category: 'vegetables',
        variety: 'Cherry',
        quantity: 500,
        unit: 'kg',
        expectedPrice: 45,
        qualityGrade: 'A',
        description: 'Fresh organic cherry tomatoes from our farm. Rich red color, perfect for salads and cooking.',
        imageUrl: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb8?auto=format&fit=crop&q=80&w=400&h=400',
        locationAddress: 'Nashik, Maharashtra',
        isOrganic: true,
        harvestDate: '2026-03-05',
        minQty: 5,
        rating: 4.5,
    },
    {
        cropName: 'Basmati Rice',
        category: 'grains',
        variety: 'Pusa 1121',
        quantity: 2000,
        unit: 'kg',
        expectedPrice: 85,
        qualityGrade: 'A',
        description: 'Premium aged Basmati rice, aromatic long grain. Perfect for biryani and pulao.',
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400&h=400',
        locationAddress: 'Karnal, Punjab',
        isOrganic: false,
        harvestDate: '2026-02-20',
        minQty: 10,
        rating: 4.8,
    },
    {
        cropName: 'Red Onion',
        category: 'vegetables',
        variety: 'Agrifound Dark Red',
        quantity: 800,
        unit: 'kg',
        expectedPrice: 30,
        qualityGrade: 'A',
        description: 'Fresh dark red onions with strong flavor. Ideal for everyday cooking.',
        imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=400&h=400',
        locationAddress: 'Lasalgaon, Maharashtra',
        isOrganic: false,
        harvestDate: '2026-03-01',
        minQty: 10,
        rating: 4.2,
    },
    {
        cropName: 'Alphonso Mango',
        category: 'fruits',
        variety: 'Hapus',
        quantity: 300,
        unit: 'kg',
        expectedPrice: 350,
        qualityGrade: 'A',
        description: 'Premium Alphonso mangoes from Ratnagiri. Sweet aroma, golden pulp, king of fruits!',
        imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400&h=400',
        locationAddress: 'Ratnagiri, Maharashtra',
        isOrganic: true,
        harvestDate: '2026-03-10',
        minQty: 2,
        rating: 4.9,
    },
    {
        cropName: 'Fresh Spinach',
        category: 'vegetables',
        variety: 'Palak',
        quantity: 200,
        unit: 'kg',
        expectedPrice: 25,
        qualityGrade: 'A',
        description: 'Tender organic spinach leaves harvested fresh every morning.',
        imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400&h=400',
        locationAddress: 'Pune, Maharashtra',
        isOrganic: true,
        harvestDate: '2026-03-06',
        minQty: 2,
        rating: 4.3,
    },
    {
        cropName: 'Green Chili',
        category: 'spices',
        variety: 'Jwala',
        quantity: 150,
        unit: 'kg',
        expectedPrice: 60,
        qualityGrade: 'B',
        description: 'Spicy green chilies perfect for pickles, chutneys, and Indian cooking.',
        imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&q=80&w=400&h=400',
        locationAddress: 'Guntur, Andhra Pradesh',
        isOrganic: false,
        harvestDate: '2026-03-04',
        minQty: 5,
        rating: 4.0,
    },
    {
        cropName: 'Wheat',
        category: 'grains',
        variety: 'Sharbati',
        quantity: 3000,
        unit: 'kg',
        expectedPrice: 28,
        qualityGrade: 'A',
        description: 'Golden Sharbati wheat grains from the heartland. Perfect for making roti and bread.',
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400&h=400',
        locationAddress: 'Indore, Madhya Pradesh',
        isOrganic: false,
        harvestDate: '2026-02-15',
        minQty: 25,
        rating: 4.6,
    },
    {
        cropName: 'Marigold Flowers',
        category: 'flowers',
        variety: 'African Marigold',
        quantity: 100,
        unit: 'kg',
        expectedPrice: 120,
        qualityGrade: 'A',
        description: 'Bright orange marigold flowers, ideal for decoration, garlands, and festivals.',
        imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?auto=format&fit=crop&q=80&w=400&h=400',
        locationAddress: 'Bangalore, Karnataka',
        isOrganic: true,
        harvestDate: '2026-03-06',
        minQty: 2,
        rating: 4.7,
    },
];

async function seed() {
    try {
        console.log('🌱 Seeding database...\n');

        const pinHash = await bcrypt.hash('1904', 10);

        // 1. Create Farmer
        const farmerResult = await db.query(
            `INSERT INTO users (
                mobile, name, type, status, pin_hash, aadhar_number, aadhar_verified,
                address, trust_score
            ) VALUES ($1, $2, $3, 'APPROVED', $4, $5, TRUE, $6, 45)
            ON CONFLICT (mobile, type) DO UPDATE 
                SET name = $2, pin_hash = $4, aadhar_number = $5, 
                    aadhar_verified = TRUE, status = 'APPROVED', trust_score = 45
            RETURNING id, name, type`,
            ['1234567890', 'Farmer 1', 'farmer', pinHash, '123456789012', 'Nashik, Maharashtra']
        );
        const farmer = farmerResult.rows[0];
        console.log(`✅ Farmer created: ${farmer.name} (ID: ${farmer.id})`);

        // Create farmer location & preferences
        await db.query(
            'INSERT INTO user_locations (user_id, state, district) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO NOTHING',
            [farmer.id, 'Maharashtra', 'Nashik']
        );
        await db.query(
            'INSERT INTO user_preferences (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING',
            [farmer.id]
        );

        // 2. Create Buyer
        const buyerResult = await db.query(
            `INSERT INTO users (
                mobile, name, type, status, pin_hash, aadhar_number, aadhar_verified,
                business_name, business_category, contact_name, address, trust_score
            ) VALUES ($1, $2, $3, 'APPROVED', $4, $5, TRUE, $6, $7, $8, $9, 45)
            ON CONFLICT (mobile, type) DO UPDATE
                SET name = $2, pin_hash = $4, aadhar_number = $5,
                    aadhar_verified = TRUE, status = 'APPROVED', trust_score = 45,
                    business_name = $6, business_category = $7, contact_name = $8
            RETURNING id, name, type`,
            ['1234567890', 'Buyer 1', 'buyer', pinHash, '123456789012',
                'Fresh Mart', 'retailer', 'Buyer 1', 'Mumbai, Maharashtra']
        );
        const buyer = buyerResult.rows[0];
        console.log(`✅ Buyer created: ${buyer.name} (ID: ${buyer.id})`);

        // Create buyer location & preferences
        await db.query(
            'INSERT INTO user_locations (user_id, state, district) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO NOTHING',
            [buyer.id, 'Maharashtra', 'Mumbai']
        );
        await db.query(
            'INSERT INTO user_preferences (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING',
            [buyer.id]
        );

        // 3. Delete existing listings for this farmer (clean slate)
        await db.query('DELETE FROM listings WHERE farmer_id = $1', [farmer.id]);

        // 4. Insert listings
        for (const item of LISTINGS) {
            await db.query(
                `INSERT INTO listings (
                    farmer_id, crop_name, category, variety, quantity, unit,
                    expected_price, quality_grade, description, image_url,
                    location_address, is_organic, harvest_date, min_qty, rating, status
                ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,'active')`,
                [
                    farmer.id, item.cropName, item.category, item.variety,
                    item.quantity, item.unit, item.expectedPrice, item.qualityGrade,
                    item.description, item.imageUrl, item.locationAddress,
                    item.isOrganic, item.harvestDate, item.minQty, item.rating,
                ]
            );
            console.log(`  📦 Listing: ${item.cropName} — ₹${item.expectedPrice}/${item.unit}`);
        }

        console.log(`\n🎉 Seed complete!`);
        console.log(`   Farmer: mobile 1234567890, PIN 1904`);
        console.log(`   Buyer:  mobile 1234567890, PIN 1904`);
        console.log(`   ${LISTINGS.length} listings created\n`);

        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err);
        process.exit(1);
    }
}

seed();
