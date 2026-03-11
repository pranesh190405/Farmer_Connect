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

async function seedUser() {
    try {
        console.log('Seeding specific user and fixing all images...');

        // Fix all existing images to be valid Unsplash URLs
        const allListingsData = await db.query('SELECT id, crop_name FROM listings');
        for (let row of allListingsData.rows) {
            let validUrl = 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=400&h=400'; // default agriculture
            const match = LISTINGS.find(l => l.cropName.toLowerCase() === row.crop_name.toLowerCase());
            if (match) {
                validUrl = match.imageUrl;
            } else {
                validUrl = LISTINGS[row.id % LISTINGS.length].imageUrl;
            }
            await db.query('UPDATE listings SET image_url = $1 WHERE id = $2', [validUrl, row.id]);
        }
        console.log('✅ Updated all existing listings with valid images');

        // Now handle user 8856816772
        const mobile = '8856816772';
        const pinHash = await bcrypt.hash('1904', 10);

        const farmerResult = await db.query(
            `INSERT INTO users (
                mobile, name, type, status, pin_hash, aadhar_number, aadhar_verified,
                address, trust_score
            ) VALUES ($1, $2, $3, 'APPROVED', $4, $5, TRUE, $6, 45)
            ON CONFLICT (mobile, type) DO UPDATE 
                SET pin_hash = $4, status = 'APPROVED'
            RETURNING id, name, type`,
            [mobile, 'User 8856816772', 'farmer', pinHash, '885681677212', 'Delhi, India']
        );
        const farmer = farmerResult.rows[0];
        console.log(`✅ Farmer ensured: ${farmer.name} (ID: ${farmer.id})`);

        await db.query('INSERT INTO user_locations (user_id, state, district) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO NOTHING', [farmer.id, 'Delhi', 'Delhi']);
        await db.query('INSERT INTO user_preferences (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING', [farmer.id]);

        // Insert new listings for this farmer
        await db.query('DELETE FROM listings WHERE farmer_id = $1', [farmer.id]);
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
        }
        console.log(`✅ ${LISTINGS.length} listings created for user ${mobile}`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
seedUser();
