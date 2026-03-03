/**
 * Transliterates a name from Latin script to the target language script.
 * Uses Google Input Tools (free, no API key needed).
 *
 * Example: transliterateName("Rajesh Kumar", "hi") → "राजेश कुमार"
 *
 * Results are cached to avoid redundant network calls.
 */

const translitCache = new Map();

/**
 * Language code → Google transliteration language ID mapping.
 */
const LANG_MAP = {
    hi: 'hi-t-i0-und',   // Hindi
    mr: 'mr-t-i0-und',   // Marathi
    ta: 'ta-t-i0-und',   // Tamil
    te: 'te-t-i0-und',   // Telugu
    kn: 'kn-t-i0-und',   // Kannada
    bn: 'bn-t-i0-und',   // Bengali
    gu: 'gu-t-i0-und',   // Gujarati
    pa: 'pa-t-i0-und',   // Punjabi
    hr: 'hi-t-i0-und',   // Haryanvi → fallback to Hindi
};

/**
 * Transliterate a single name string.
 * @param {string} name - The name in Latin/English script
 * @param {string} lang - Target language code (e.g. 'hi', 'mr')
 * @returns {Promise<string>} Transliterated name, or original on failure
 */
export async function transliterateName(name, lang) {
    if (!name || typeof name !== 'string') return name || '';
    if (lang === 'en' || !lang) return name;

    const cacheKey = `${name}:${lang}`;
    if (translitCache.has(cacheKey)) return translitCache.get(cacheKey);

    const itc = LANG_MAP[lang];
    if (!itc) return name; // unsupported language

    try {
        // Split into words and transliterate each
        const words = name.trim().split(/\s+/);
        const transliteratedWords = [];

        for (const word of words) {
            const url = `https://inputtools.google.com/request?text=${encodeURIComponent(word)}&itc=${itc}&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8`;
            const res = await fetch(url);
            const data = await res.json();

            if (data[0] === 'SUCCESS' && data[1]?.[0]?.[1]?.[0]) {
                transliteratedWords.push(data[1][0][1][0]);
            } else {
                transliteratedWords.push(word); // Keep original if transliteration fails
            }
        }

        const result = transliteratedWords.join(' ');
        translitCache.set(cacheKey, result);
        return result;
    } catch (err) {
        console.warn('Transliteration failed for:', name, err);
        translitCache.set(cacheKey, name); // cache the failure too
        return name;
    }
}

/**
 * React-friendly batch transliteration.
 * Takes an array of names and returns a Map<originalName, transliteratedName>.
 */
export async function transliterateNames(names, lang) {
    if (lang === 'en' || !lang || !names?.length) return new Map();

    const results = new Map();
    const uniqueNames = [...new Set(names.filter(Boolean))];

    for (const name of uniqueNames) {
        const translated = await transliterateName(name, lang);
        results.set(name, translated);
    }

    return results;
}

export default transliterateName;
