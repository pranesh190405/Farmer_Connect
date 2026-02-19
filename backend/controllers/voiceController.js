const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English', speechLocale: 'en-IN' },
    { code: 'hi', name: 'Hindi', speechLocale: 'hi-IN' },
    { code: 'ta', name: 'Tamil', speechLocale: 'ta-IN' },
    { code: 'te', name: 'Telugu', speechLocale: 'te-IN' },
    { code: 'kn', name: 'Kannada', speechLocale: 'kn-IN' },
    { code: 'bn', name: 'Bengali', speechLocale: 'bn-IN' },
    { code: 'mr', name: 'Marathi', speechLocale: 'mr-IN' },
    { code: 'gu', name: 'Gujarati', speechLocale: 'gu-IN' },
    { code: 'pa', name: 'Punjabi', speechLocale: 'pa-IN' },
    { code: 'hr', name: 'Haryanvi', speechLocale: 'hi-IN' },
];

// Multilingual command keywords for voice navigation
const COMMAND_KEYWORDS = {
    market: {
        en: ['market', 'buy', 'shop', 'browse'],
        hi: ['बाज़ार', 'खरीद', 'दुकान'],
        ta: ['சந்தை', 'வாங்க'],
        te: ['మార్కెట్', 'కొనుగోలు'],
        kn: ['ಮಾರುಕಟ್ಟೆ', 'ಖರೀದಿ'],
        bn: ['বাজার', 'কেনা'],
        mr: ['बाजार', 'खरेदी'],
        gu: ['બજાર', 'ખરીદી'],
        pa: ['ਮੰਡੀ', 'ਖਰੀਦ'],
    },
    dashboard: {
        en: ['home', 'dashboard', 'main'],
        hi: ['होम', 'डैशबोर्ड', 'घर'],
        ta: ['முகப்பு', 'டாஷ்போர்டு'],
        te: ['హోమ్', 'డాష్‌బోర్డ్'],
        kn: ['ಮುಖಪುಟ', 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'],
        bn: ['হোম', 'ড্যাশবোর্ড'],
        mr: ['होम', 'डॅशबोर्ड'],
        gu: ['હોમ', 'ડેશબોર્ડ'],
        pa: ['ਘਰ', 'ਡੈਸ਼ਬੋਰਡ'],
    },
    cart: {
        en: ['cart', 'basket', 'bag'],
        hi: ['कार्ट', 'टोकरी'],
        ta: ['கார்ட்'],
        te: ['కార్ట్'],
        kn: ['ಕಾರ್ಟ್'],
        bn: ['কার্ট'],
        mr: ['कार्ट'],
        gu: ['કાર્ટ'],
        pa: ['ਕਾਰਟ'],
    },
    profile: {
        en: ['profile', 'account', 'settings'],
        hi: ['प्रोफ़ाइल', 'खाता', 'सेटिंग'],
        ta: ['சுயவிவரம்', 'கணக்கு'],
        te: ['ప్రొఫైల్', 'ఖాతా'],
        kn: ['ప్రొఫైల్', 'ಖಾತೆ'],
        bn: ['প্রোফাইল', 'অ্যাকাউন্ট'],
        mr: ['प्रोफाइल', 'खाते'],
        gu: ['પ્રોફાઇલ', 'ખાતું'],
        pa: ['ਪ੍ਰੋਫਾਈਲ', 'ਖਾਤਾ'],
    },
    search: {
        en: ['search', 'find', 'look for'],
        hi: ['खोज', 'ढूंढ'],
        ta: ['தேடு'],
        te: ['శోధన', 'వెతుకు'],
        kn: ['ಹುಡುಕಿ'],
        bn: ['খোঁজ'],
        mr: ['शोध'],
        gu: ['શોધો'],
        pa: ['ਖੋਜ'],
    },
};

/**
 * GET /api/voice/languages
 * Returns supported voice recognition languages
 */
const getSupportedLanguages = (req, res) => {
    res.json({
        languages: SUPPORTED_LANGUAGES,
        defaultLanguage: 'en',
    });
};

/**
 * POST /api/voice/command
 * Parses a voice command text and returns the intent
 * Body: { text: string, language?: string }
 */
const processCommand = (req, res) => {
    const { text, language = 'en' } = req.body;

    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'text is required' });
    }

    const command = text.toLowerCase().trim();
    let intent = null;
    let params = {};

    // Check each command category
    for (const [action, langKeywords] of Object.entries(COMMAND_KEYWORDS)) {
        const keywords = langKeywords[language] || langKeywords['en'] || [];
        for (const keyword of keywords) {
            if (command.includes(keyword.toLowerCase())) {
                intent = action;

                // For search, extract the query
                if (action === 'search') {
                    const searchKeywords = langKeywords[language] || langKeywords['en'];
                    let query = command;
                    for (const kw of searchKeywords) {
                        query = query.replace(kw.toLowerCase(), '').trim();
                    }
                    // Also remove common filler words
                    query = query.replace(/\bfor\b/gi, '').replace(/\bthe\b/gi, '').trim();
                    params.query = query;
                }

                break;
            }
        }
        if (intent) break;
    }

    if (!intent) {
        return res.json({
            recognized: false,
            intent: null,
            message: 'Command not recognized',
            originalText: text,
        });
    }

    // Map intents to routes
    const routeMap = {
        market: '/market',
        dashboard: '/farmer/dashboard',
        cart: '/cart',
        profile: '/profile',
        search: '/market',
    };

    res.json({
        recognized: true,
        intent,
        route: routeMap[intent],
        params,
        originalText: text,
    });
};

module.exports = {
    getSupportedLanguages,
    processCommand,
};
