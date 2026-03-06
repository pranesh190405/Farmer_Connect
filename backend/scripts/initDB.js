/**
 * ============================================================================
 * Farmer Connect — Database Seed Script
 * ============================================================================
 * Run AFTER schema.sql has been applied.
 * Usage:  node scripts/initDB.js
 *
 * Seeds:
 *   • 3 Farmers  (PIN: 1234 for all)
 *   • 3 Buyers   (PIN: 1234 for all)
 *   • 3 Admins   (Password: admin123 for all)
 *   • Locations & Preferences for every user
 *   • 6 Listings (2 per farmer)
 *   • 3 Orders   (1 per buyer)
 *   • Order Items linking orders ↔ listings
 *   • 2 Complaints
 * ============================================================================
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
});

// ─── Helpers ─────────────────────────────────────────────────
const PIN_HASH = bcrypt.hashSync('1234', 10);                       // All farmer/buyer PINs
const ADMIN_PASS_HASH = bcrypt.hashSync('admin123', 10);           // All admin passwords

async function seed() {
  const client = await pool.connect();

  try {
    console.log('🌱 Seeding Farmer Connect database …\n');
    await client.query('BEGIN');

    // ════════════════════════════════════════════════════════
    // 1.  ADMINS  (3)
    // ════════════════════════════════════════════════════════
    const admins = [
      {
        mobile: '9999999999', email: 'admin@farmerconnect.com',
        name: 'Vikram Sharma', address: 'Block A, Connaught Place, New Delhi 110001',
        aadhar: '998877665544', dob: '1985-06-15',
      },
      {
        mobile: '9999888801', email: 'ops@farmerconnect.com',
        name: 'Ananya Iyer', address: '42 MG Road, Indiranagar, Bengaluru 560038',
        aadhar: '887766554433', dob: '1990-02-28',
      },
      {
        mobile: '9999888802', email: 'support@farmerconnect.com',
        name: 'Rohit Menon', address: '15 Park Street, Kolkata 700016',
        aadhar: '776655443322', dob: '1988-11-10',
      },
    ];

    const adminIds = [];
    for (const a of admins) {
      const res = await client.query(
        `INSERT INTO users
                    (mobile, email, name, type, status, password_hash, pin_hash,
                     aadhar_number, aadhar_verified, date_of_birth, address,
                     trust_score, profile_photo_url, document_type, admin_notes, verified_at)
                 VALUES ($1,$2,$3,'admin','APPROVED',$4,'',$5,TRUE,$6,$7,
                         100,'','govt_id','System administrator',NOW())
                 ON CONFLICT (mobile, type) DO UPDATE SET email = EXCLUDED.email
                 RETURNING id`,
        [a.mobile, a.email, a.name, ADMIN_PASS_HASH,
        a.aadhar, a.dob, a.address]
      );
      adminIds.push(res.rows[0].id);
    }
    console.log(`  ✅ Admins seeded   (IDs: ${adminIds.join(', ')})`);

    // ════════════════════════════════════════════════════════
    // 2.  FARMERS  (3)
    // ════════════════════════════════════════════════════════
    const farmers = [
      {
        mobile: '9876543210', email: 'rajesh.patel@gmail.com',
        name: 'Rajesh Patel',
        aadhar: '234567890123', dob: '1978-03-22',
        address: 'Village Sundarpur, Taluk Mandvi, Kutch, Gujarat 370465',
        trust: 75,
      },
      {
        mobile: '8765432109', email: 'lakshmi.naidu@gmail.com',
        name: 'Lakshmi Naidu',
        aadhar: '345678901234', dob: '1982-08-14',
        address: 'Paddy Fields Road, Nellore, Andhra Pradesh 524001',
        trust: 60,
      },
      {
        mobile: '7654321098', email: 'gurpreet.singh@yahoo.com',
        name: 'Gurpreet Singh',
        aadhar: '456789012345', dob: '1975-12-05',
        address: 'Khasra No 45, Village Khanna, Ludhiana, Punjab 141401',
        trust: 85,
      },
    ];

    const farmerIds = [];
    for (const f of farmers) {
      const res = await client.query(
        `INSERT INTO users
                    (mobile, email, name, type, status, pin_hash,
                     aadhar_number, aadhar_verified, date_of_birth, address,
                     trust_score, profile_photo_url, document_url, document_type,
                     verified_at)
                 VALUES ($1,$2,$3,'farmer','APPROVED',$4,
                         $5,TRUE,$6,$7,
                         $8,'','/uploads/aadhar_sample.jpg','aadhar_photo',
                         NOW())
                 ON CONFLICT (mobile, type) DO UPDATE SET name = EXCLUDED.name
                 RETURNING id`,
        [f.mobile, f.email, f.name, PIN_HASH,
        f.aadhar, f.dob, f.address, f.trust]
      );
      farmerIds.push(res.rows[0].id);
    }
    console.log(`  ✅ Farmers seeded  (IDs: ${farmerIds.join(', ')})`);

    // ════════════════════════════════════════════════════════
    // 3.  BUYERS  (3)
    // ════════════════════════════════════════════════════════
    const buyers = [
      {
        mobile: '9988776655', email: 'procurement@freshmart.in',
        name: 'Arjun Mehra',
        aadhar: '567890123456', dob: '1986-01-18',
        address: '23 Crawford Market, Fort, Mumbai 400001',
        businessName: 'FreshMart Pvt Ltd',
        taxId: '27AABCF1234E1ZQ',
        businessCategory: 'Wholesale',
        contactName: 'Arjun Mehra',
        trust: 70,
      },
      {
        mobile: '8877665544', email: 'buying@southspices.com',
        name: 'Kavitha Rajan',
        aadhar: '678901234567', dob: '1991-05-30',
        address: '88 Mint Street, Sowcarpet, Chennai 600079',
        businessName: 'South Spices Traders',
        taxId: '33AADCS5678F1ZR',
        businessCategory: 'Retail',
        contactName: 'Kavitha Rajan',
        trust: 55,
      },
      {
        mobile: '7766554433', email: 'orders@greenbasket.co.in',
        name: 'Deepak Joshi',
        aadhar: '789012345678', dob: '1994-09-12',
        address: '5th Cross, Jayanagar 4th Block, Bengaluru 560041',
        businessName: 'GreenBasket Organics',
        taxId: '29AABCG9012H1ZS',
        businessCategory: 'Organic Retail',
        contactName: 'Deepak Joshi',
        trust: 65,
      },
    ];

    const buyerIds = [];
    for (const b of buyers) {
      const res = await client.query(
        `INSERT INTO users
                    (mobile, email, name, type, status, pin_hash,
                     aadhar_number, aadhar_verified, date_of_birth, address,
                     business_name, tax_id, business_category, contact_name,
                     trust_score, document_url, document_type, verified_at)
                 VALUES ($1,$2,$3,'buyer','APPROVED',$4,
                         $5,TRUE,$6,$7,
                         $8,$9,$10,$11,
                         $12,'/uploads/gst_sample.pdf','gst_certificate',NOW())
                 ON CONFLICT (mobile, type) DO UPDATE SET name = EXCLUDED.name
                 RETURNING id`,
        [b.mobile, b.email, b.name, PIN_HASH,
        b.aadhar, b.dob, b.address,
        b.businessName, b.taxId, b.businessCategory, b.contactName,
        b.trust]
      );
      buyerIds.push(res.rows[0].id);
    }
    console.log(`  ✅ Buyers seeded   (IDs: ${buyerIds.join(', ')})`);

    // ════════════════════════════════════════════════════════
    // 4.  USER LOCATIONS  (all 9 users)
    // ════════════════════════════════════════════════════════
    const locations = [
      // Admins
      { userId: adminIds[0], state: 'Delhi', district: 'New Delhi', lat: 28.6315, lng: 77.2167 },
      { userId: adminIds[1], state: 'Karnataka', district: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
      { userId: adminIds[2], state: 'West Bengal', district: 'Kolkata', lat: 22.5726, lng: 88.3639 },
      // Farmers
      { userId: farmerIds[0], state: 'Gujarat', district: 'Kutch', lat: 23.2420, lng: 69.6669 },
      { userId: farmerIds[1], state: 'Andhra Pradesh', district: 'Nellore', lat: 14.4426, lng: 79.9865 },
      { userId: farmerIds[2], state: 'Punjab', district: 'Ludhiana', lat: 30.9010, lng: 75.8573 },
      // Buyers
      { userId: buyerIds[0], state: 'Maharashtra', district: 'Mumbai', lat: 18.9388, lng: 72.8354 },
      { userId: buyerIds[1], state: 'Tamil Nadu', district: 'Chennai', lat: 13.0827, lng: 80.2707 },
      { userId: buyerIds[2], state: 'Karnataka', district: 'Bengaluru', lat: 12.9279, lng: 77.5831 },
    ];

    for (const loc of locations) {
      await client.query(
        `INSERT INTO user_locations (user_id, state, district, lat, lng, updated_at)
                 VALUES ($1,$2,$3,$4,$5,NOW())
                 ON CONFLICT (user_id) DO UPDATE SET
                    state = EXCLUDED.state, district = EXCLUDED.district,
                    lat = EXCLUDED.lat, lng = EXCLUDED.lng, updated_at = NOW()`,
        [loc.userId, loc.state, loc.district, loc.lat, loc.lng]
      );
    }
    console.log('  ✅ Locations seeded (9 users)');

    // ════════════════════════════════════════════════════════
    // 5.  USER PREFERENCES  (farmers + buyers = 6)
    // ════════════════════════════════════════════════════════
    const preferences = [
      // Farmers
      { userId: farmerIds[0], crops: ['cotton', 'groundnut', 'cumin'], sms: true, price: true, pub: true, loc: true, contact: false },
      { userId: farmerIds[1], crops: ['rice', 'sugarcane', 'chili'], sms: true, price: true, pub: true, loc: true, contact: true },
      { userId: farmerIds[2], crops: ['wheat', 'mustard', 'potato'], sms: true, price: false, pub: true, loc: false, contact: false },
      // Buyers
      { userId: buyerIds[0], crops: ['tomato', 'onion', 'potato', 'rice'], sms: true, price: true, pub: false, loc: true, contact: true },
      { userId: buyerIds[1], crops: ['chili', 'turmeric', 'pepper', 'tea'], sms: false, price: true, pub: true, loc: true, contact: true },
      { userId: buyerIds[2], crops: ['spinach', 'carrot', 'mango', 'banana'], sms: true, price: true, pub: true, loc: true, contact: false },
    ];

    for (const p of preferences) {
      await client.query(
        `INSERT INTO user_preferences
                    (user_id, crop_interests, sms_alerts, price_alerts,
                     profile_public, show_location, show_contact, updated_at)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
                 ON CONFLICT (user_id) DO UPDATE SET
                    crop_interests = EXCLUDED.crop_interests,
                    sms_alerts = EXCLUDED.sms_alerts,
                    price_alerts = EXCLUDED.price_alerts,
                    profile_public = EXCLUDED.profile_public,
                    show_location = EXCLUDED.show_location,
                    show_contact = EXCLUDED.show_contact,
                    updated_at = NOW()`,
        [p.userId, p.crops, p.sms, p.price, p.pub, p.loc, p.contact]
      );
    }
    console.log('  ✅ Preferences seeded (6 users)');

    // ════════════════════════════════════════════════════════
    // 6.  LISTINGS  (2 per farmer = 6 total)
    // ════════════════════════════════════════════════════════
    const listings = [
      // — Rajesh Patel (Gujarat) —
      {
        farmerId: farmerIds[0], cropName: 'Cotton', category: 'cash_crops',
        variety: 'Shankar-6 (Bt Cotton)', quantity: 500, unit: 'kg',
        price: 62, grade: 'A',
        desc: 'Premium quality Bt Cotton, hand-picked and sun-dried. Low moisture content, ready for ginning.',
        addr: 'Mandvi APMC Yard, Kutch, Gujarat', lat: 23.2420, lng: 69.6669,
        organic: false, harvest: '2026-02-15', minQty: 50, rating: 4.5, status: 'active',
      },
      {
        farmerId: farmerIds[0], cropName: 'Groundnut', category: 'oilseeds',
        variety: 'GG-20', quantity: 300, unit: 'kg',
        price: 55, grade: 'A',
        desc: 'Fresh harvest groundnuts, bold kernel type. Ideal for oil extraction or direct consumption.',
        addr: 'Bhuj Mandi, Kutch, Gujarat', lat: 23.2519, lng: 69.6696,
        organic: false, harvest: '2026-01-20', minQty: 25, rating: 4.2, status: 'active',
      },
      // — Lakshmi Naidu (Andhra Pradesh) —
      {
        farmerId: farmerIds[1], cropName: 'Rice', category: 'grains',
        variety: 'Sona Masoori', quantity: 2000, unit: 'kg',
        price: 38, grade: 'A',
        desc: 'Aromatic Sona Masoori rice, freshly milled. Low GI variety, preferred across South India.',
        addr: 'Nellore Agricultural Market, AP', lat: 14.4426, lng: 79.9865,
        organic: false, harvest: '2026-02-01', minQty: 100, rating: 4.7, status: 'active',
      },
      {
        farmerId: farmerIds[1], cropName: 'Chili', category: 'spices',
        variety: 'Guntur Sannam S4', quantity: 150, unit: 'kg',
        price: 180, grade: 'A',
        desc: 'Fiery red Guntur chillies, ASTA colour value 80+. Sun-dried, minimal seeds. Export quality.',
        addr: 'Guntur Mirchi Yard, AP', lat: 16.3067, lng: 80.4365,
        organic: true, harvest: '2026-01-10', minQty: 10, rating: 4.8, status: 'active',
      },
      // — Gurpreet Singh (Punjab) —
      {
        farmerId: farmerIds[2], cropName: 'Wheat', category: 'grains',
        variety: 'HD-3086 (Pusa Gautam)', quantity: 5000, unit: 'kg',
        price: 26, grade: 'A',
        desc: 'Premium Punjab wheat, high protein content. Golden grain, zero pest damage. MSP-grade quality.',
        addr: 'Khanna Grain Market, Punjab', lat: 30.6942, lng: 76.2180,
        organic: false, harvest: '2026-03-01', minQty: 500, rating: 4.6, status: 'active',
      },
      {
        farmerId: farmerIds[2], cropName: 'Potato', category: 'vegetables',
        variety: 'Kufri Jyoti', quantity: 800, unit: 'kg',
        price: 14, grade: 'B',
        desc: 'Fresh Kufri Jyoti potatoes, medium-sized, clean skin. Suitable for chips and curries.',
        addr: 'Ludhiana Sabzi Mandi, Punjab', lat: 30.9010, lng: 75.8573,
        organic: false, harvest: '2026-02-20', minQty: 50, rating: 3.9, status: 'active',
      },
    ];

    const listingIds = [];
    for (const l of listings) {
      const res = await client.query(
        `INSERT INTO listings
                    (farmer_id, crop_name, category, variety, quantity, unit,
                     expected_price, quality_grade, description, image_url,
                     location_address, location_lat, location_lng,
                     status, is_organic, harvest_date, min_qty, rating)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'',$10,$11,$12,$13,$14,$15,$16,$17)
                 RETURNING id`,
        [l.farmerId, l.cropName, l.category, l.variety, l.quantity, l.unit,
        l.price, l.grade, l.desc,
        l.addr, l.lat, l.lng,
        l.status, l.organic, l.harvest, l.minQty, l.rating]
      );
      listingIds.push(res.rows[0].id);
    }
    console.log(`  ✅ Listings seeded (IDs: ${listingIds.join(', ')})`);

    // ════════════════════════════════════════════════════════
    // 7.  ORDERS  (1 per buyer = 3)
    // ════════════════════════════════════════════════════════
    const orders = [
      {
        buyerId: buyerIds[0], total: 11200, status: 'delivered',
        addr: 'FreshMart Warehouse, Vashi APMC, Navi Mumbai 400703',
        payment: 'upi',
      },
      {
        buyerId: buyerIds[1], total: 2700, status: 'shipped',
        addr: '88 Mint Street, Sowcarpet, Chennai 600079',
        payment: 'cod',
      },
      {
        buyerId: buyerIds[2], total: 1300, status: 'placed',
        addr: '5th Cross, Jayanagar 4th Block, Bengaluru 560041',
        payment: 'bank_transfer',
      },
    ];

    const orderIds = [];
    for (const o of orders) {
      const res = await client.query(
        `INSERT INTO orders
                    (buyer_id, total_amount, status, delivery_address, payment_method)
                 VALUES ($1,$2,$3,$4,$5)
                 RETURNING id`,
        [o.buyerId, o.total, o.status, o.addr, o.payment]
      );
      orderIds.push(res.rows[0].id);
    }
    console.log(`  ✅ Orders seeded   (IDs: ${orderIds.join(', ')})`);

    // ════════════════════════════════════════════════════════
    // 8.  ORDER ITEMS
    // ════════════════════════════════════════════════════════
    const orderItems = [
      // Order 1 — FreshMart buys Rice + Potato
      { orderId: orderIds[0], listingId: listingIds[2], qty: 200, price: 38 },   // 200 kg Rice  @ ₹38
      { orderId: orderIds[0], listingId: listingIds[5], qty: 300, price: 14 },   // 300 kg Potato @ ₹14

      // Order 2 — South Spices buys Chili
      { orderId: orderIds[1], listingId: listingIds[3], qty: 15, price: 180 },  // 15 kg Chili   @ ₹180

      // Order 3 — GreenBasket buys Wheat
      { orderId: orderIds[2], listingId: listingIds[4], qty: 50, price: 26 },   // 50 kg Wheat   @ ₹26
    ];

    for (const oi of orderItems) {
      await client.query(
        `INSERT INTO order_items (order_id, listing_id, quantity, price)
                 VALUES ($1,$2,$3,$4)`,
        [oi.orderId, oi.listingId, oi.qty, oi.price]
      );
    }
    console.log('  ✅ Order items seeded (4 items)');

    // ════════════════════════════════════════════════════════
    // 9.  ORDER COMPLAINTS  (2)
    // ════════════════════════════════════════════════════════
    await client.query(
      `INSERT INTO order_complaints
                (order_id, raised_by, issue_type, description, status, admin_response)
             VALUES ($1, $2, 'Quality Issue',
                     'Received potatoes had some green spots and sprouting. About 15% of the batch was unusable.',
                     'RESOLVED',
                     'Refund of ₹630 processed. Farmer has been notified about quality standards.')`,
      [orderIds[0], buyerIds[0]]
    );

    await client.query(
      `INSERT INTO order_complaints
                (order_id, raised_by, issue_type, description, status)
             VALUES ($1, $2, 'Delivery Delay',
                     'Order was supposed to arrive by March 1st but shipment has not been dispatched yet. Need urgent delivery for store inventory.',
                     'OPEN')`,
      [orderIds[2], buyerIds[2]]
    );
    console.log('  ✅ Complaints seeded (2)');

    // ────────────────────────────────────────────────────────
    await client.query('COMMIT');
    console.log('\n🎉 Database seeded successfully!\n');

    // Print login cheatsheet
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║              LOGIN CREDENTIALS CHEATSHEET               ║');
    console.log('╠══════════════════════════════════════════════════════════╣');
    console.log('║  FARMERS (PIN: 1234)                                    ║');
    console.log('║    Rajesh Patel      →  9876543210                      ║');
    console.log('║    Lakshmi Naidu     →  8765432109                      ║');
    console.log('║    Gurpreet Singh    →  7654321098                      ║');
    console.log('║                                                         ║');
    console.log('║  BUYERS  (PIN: 1234)                                    ║');
    console.log('║    Arjun Mehra       →  9988776655                      ║');
    console.log('║    Kavitha Rajan     →  8877665544                      ║');
    console.log('║    Deepak Joshi      →  7766554433                      ║');
    console.log('║                                                         ║');
    console.log('║  ADMINS  (Password: admin123)                           ║');
    console.log('║    Vikram Sharma     →  admin@farmerconnect.com         ║');
    console.log('║    Ananya Iyer       →  ops@farmerconnect.com           ║');
    console.log('║    Rohit Menon       →  support@farmerconnect.com       ║');
    console.log('╚══════════════════════════════════════════════════════════╝');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('\n❌ Seeding failed:', err.message);
    console.error(err.stack);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();