const authModule = require('../modules/authModule');

/**
 * POST /api/auth/send-otp
 */
async function sendOtp(req, res) {
    try {
        const { mobile } = req.body;

        if (!mobile || mobile.length !== 10) {
            return res.status(400).json({ error: 'Valid 10-digit mobile number required' });
        }

        const result = await authModule.sendOtp(mobile);
        res.json(result);
    } catch (err) {
        console.error('sendOtp error:', err);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
}

/**
 * POST /api/auth/verify-otp
 * Body: { mobile, otp, userType? }
 */
async function verifyOtp(req, res) {
    try {
        const { mobile, otp, userType } = req.body;

        if (!mobile || !otp) {
            return res.status(400).json({ error: 'Mobile and OTP are required' });
        }

        let result;
        if (userType) {
            result = await authModule.verifyOtpWithType(mobile, otp, userType);
        } else {
            result = await authModule.verifyOtp(mobile, otp);
        }

        if (!result.valid) {
            return res.status(400).json({ error: result.error });
        }

        if (result.error) {
            return res.status(403).json({ error: result.error, status: result.user?.status });
        }

        if (result.isNewUser) {
            return res.json({ isNewUser: true, message: 'OTP verified. Please complete registration.' });
        }

        // Set JWT cookie
        res.cookie('auth_token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ user: result.user, isNewUser: false });
    } catch (err) {
        console.error('verifyOtp error:', err);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }
}

/**
 * POST /api/auth/register
 * Body: { mobile, type, name, aadharNumber, dateOfBirth, address }
 */
async function register(req, res) {
    try {
        console.log('📝 Register Request Body:', req.body);
        const {
            mobile, type, aadharNumber, dateOfBirth, address,
            businessName, taxId, businessCategory, contactName
        } = req.body;

        // Use contactName as name for buyers if name is missing
        const name = req.body.name || contactName;

        if (!mobile || !type) {
            return res.status(400).json({ error: 'Mobile and type are required' });
        }

        const result = await authModule.registerUser({
            mobile, type, name, aadharNumber, dateOfBirth, address,
            businessName, taxId, businessCategory, contactName
        });

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        // Set JWT cookie
        res.cookie('auth_token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({ user: result.user });
    } catch (err) {
        console.error('register error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
}

/**
 * POST /api/auth/admin-login
 * Body: { username, password }
 */
async function adminLogin(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const result = await authModule.adminLogin(username, password);

        if (result.error) {
            return res.status(401).json({ error: result.error });
        }

        // Set JWT cookie
        res.cookie('auth_token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ user: result.user });
    } catch (err) {
        console.error('adminLogin error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
}

/**
 * GET /api/auth/me
 * Returns current user from JWT token
 */
async function getMe(req, res) {
    try {
        const user = await authModule.getUserById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (err) {
        console.error('getMe error:', err);
        res.status(500).json({ error: 'Failed to get user' });
    }
}

/**
 * POST /api/auth/logout
 */
async function logout(req, res) {
    res.clearCookie('auth_token');
    res.json({ message: 'Logged out successfully' });
}

module.exports = {
    sendOtp,
    verifyOtp,
    register,
    adminLogin,
    getMe,
    logout,
};
