/**
 * Translates a crop name from the database (stored in English)
 * to the current website language using i18n translation keys.
 *
 * Handles variety suffixes e.g. "Potato (Red)" → "आलू (Red)" in Hindi
 * Also handles multi-word crop names like "Kufri Jyoti"
 *
 * @param {string} cropName - The raw crop name from the DB
 * @param {function} t - The i18next translation function
 * @returns {string} Translated crop name
 */
export function translateCropName(cropName, t) {
    if (!cropName || typeof cropName !== 'string') return cropName || '';

    // Extract base name and optional variety/parenthetical suffix
    // Supports: "Potato", "Potato (Red)", "Potato (Kufri Jyoti)"
    const match = cropName.match(/^([^(]+?)(?:\s*(\(.*\)))?$/);
    if (!match) return cropName;

    const baseName = match[1].trim(); // e.g. "Potato" or "Red Chili"
    const variety = match[2] || '';     // e.g. "(Red)"

    // Try exact match first, then try first word only
    const baseKey = `listing.crops.${baseName.toLowerCase().replace(/\s+/g, '')}`;
    let translated = t(baseKey);

    // If exact match failed, try the first word
    if (translated === baseKey) {
        const firstWord = baseName.split(/\s+/)[0];
        const firstWordKey = `listing.crops.${firstWord.toLowerCase()}`;
        const firstWordTranslated = t(firstWordKey);
        if (firstWordTranslated !== firstWordKey) {
            translated = firstWordTranslated;
        } else {
            return cropName; // No translation available, return original
        }
    }

    return variety ? `${translated} ${variety}` : translated;
}

export default translateCropName;
