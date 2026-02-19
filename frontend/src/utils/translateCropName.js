/**
 * Translates a crop name from the database (stored in English)
 * to the current website language using i18n translation keys.
 *
 * Handles variety suffixes e.g. "Potato (Red)" → "आलू (Red)" in Hindi
 *
 * @param {string} cropName - The raw crop name from the DB
 * @param {function} t - The i18next translation function
 * @returns {string} Translated crop name
 */
export function translateCropName(cropName, t) {
    if (!cropName || typeof cropName !== 'string') return cropName || '';

    // Extract base name and optional variety suffix
    const match = cropName.match(/^(\w+)\s*(\(.*\))?$/);
    if (!match) return cropName;

    const baseName = match[1]; // e.g. "Potato"
    const variety = match[2] || ''; // e.g. "(Red)"

    // Look up translation key: listing.crops.potato
    const key = `listing.crops.${baseName.toLowerCase()}`;
    const translated = t(key);

    // If the key doesn't exist, i18next returns the key itself — fall back to original
    if (translated === key) {
        return cropName;
    }

    return variety ? `${translated} ${variety}` : translated;
}

export default translateCropName;
