import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.resolve(__dirname, '../public/locales');
const sourceLang = 'en';
const sourceFile = path.join(localesDir, sourceLang, 'common.json');

if (!fs.existsSync(sourceFile)) {
    console.error(`Source file not found: ${sourceFile}`);
    process.exit(1);
}

const sourceData = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));

function mergeObjects(source, target) {
    const result = { ...target };
    for (const key in source) {
        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
            result[key] = mergeObjects(source[key], target[key] || {});
        } else if (target[key] === undefined) {
            result[key] = source[key];
        }
    }
    return result;
}

const targetLangs = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory() && f !== sourceLang);

console.log(`Syncing ${targetLangs.length} languages from ${sourceLang}...\n`);

targetLangs.forEach(lang => {
    const targetFile = path.join(localesDir, lang, 'common.json');
    let targetData = {};

    if (fs.existsSync(targetFile)) {
        targetData = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
    }

    const mergedData = mergeObjects(sourceData, targetData);

    // Sort keys to maintain consistency (optional but helpful for git diffs)
    const sortedData = sortObject(mergedData);

    fs.writeFileSync(targetFile, JSON.stringify(sortedData, null, 4), 'utf8');
    console.log(`[${lang}] Synced.`);
});

function sortObject(obj) {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return obj;
    const sorted = {};
    Object.keys(obj).sort().forEach(key => {
        sorted[key] = sortObject(obj[key]);
    });
    return sorted;
}

console.log('\nSync complete.');
