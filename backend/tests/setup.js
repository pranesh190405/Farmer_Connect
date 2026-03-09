afterAll(async () => {
    try {
        const db = require('../config/db');
        if (db.pool) {
            await db.pool.end();
        }
    } catch (err) {
        // ignore if db not used
    }
});