const http = require('http');

const BASE_URL = 'http://localhost:5001/api';

async function request(method, path, body = null, token = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5001,
            path: '/api' + path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ status: res.statusCode, body: json });
                } catch (e) {
                    resolve({ status: res.statusCode, body: data });
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function runTests() {
    console.log('🧪 Starting API Verification Tests...');

    // 1. Health Check
    try {
        const health = await request('GET', '/health'); // Note: /health is likely at root, not /api/health based on server.js
        // actually server.js has app.get('/health') so it's at root.
    } catch (e) {
        // ignore
    }

    // Let's correct the request function to handle root paths if needed, or just manually check root health
    const healthCheck = new Promise((resolve) => {
        http.get('http://localhost:5001/health', (res) => {
            resolve(res.statusCode);
        }).on('error', () => resolve(500));
    });

    const healthStatus = await healthCheck;
    if (healthStatus === 200) console.log('✅ Health Check Passed');
    else console.log('❌ Health Check Failed:', healthStatus);

    // 2. Auth - Register/Login (Simulated)
    // Test Validation with invalid mobile
    const invalidAuth = await request('POST', '/auth/send-otp', { mobile: '123' }); // Invalid mobile
    if (invalidAuth.status === 400) console.log('✅ Validation Middleware Working (400 received for invalid mobile)');
    else console.log('❌ Validation Middleware Failed:', invalidAuth.status, JSON.stringify(invalidAuth.body));

    // Since we don't have a real phone number to OTP flow easily automatable without mocking, 
    // we will try to login with a known test user if exists, or just skip to checking public endpoints first.
    // For now, let's just check if we can hit the listings endpoint (should be 401 unauth)

    const unauthListings = await request('GET', '/listings');
    if (unauthListings.status === 401) console.log('✅ Auth Middleware Working (401 received)');
    else console.log('❌ Auth Middleware Failed:', unauthListings.status);

    console.log('Tests completed.');
}

runTests();
