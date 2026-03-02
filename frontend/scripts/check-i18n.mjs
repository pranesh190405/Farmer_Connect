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

function getKeys(obj, prefix = '') {
    let keys = [];
    for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            keys = keys.concat(getKeys(obj[key], fullKey));
        } else {
            keys.push({ key: fullKey, value: obj[key] });
        }
    }
    return keys;
}

const sourceKeys = getKeys(sourceData);
const targetLangs = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory() && f !== sourceLang);

console.log(`Checking ${targetLangs.length} languages against ${sourceLang}...\n`);

let totalMissing = 0;
let totalUntranslated = 0;

targetLangs.forEach(lang => {
    const targetFile = path.join(localesDir, lang, 'common.json');
    if (!fs.existsSync(targetFile)) {
        console.log(`[${lang}] File missing!`);
        return;
    }

    const targetData = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
    const targetKeysMap = new Map(getKeys(targetData).map(k => [k.key, k.value]));

    const missing = [];
    const untranslated = [];

    sourceKeys.forEach(({ key, value }) => {
        if (!targetKeysMap.has(key)) {
            missing.push(key);
        } else if (targetKeysMap.get(key) === value && value !== '') {
            // Note: Some values might legitimately be the same (e.g. brand names), 
            // but usually this indicates a missing translation.
            untranslated.push(key);
        }
    });

    if (missing.length > 0 || untranslated.length > 0) {
        console.log(`[${lang}]`);
        if (missing.length > 0) {
            console.log(`  Missing keys (${missing.length}):`);
            missing.slice(0, 10).forEach(k => console.log(`    - ${k}`));
            if (missing.length > 10) console.log(`    ... and ${missing.length - 10} more`);
            totalMissing += missing.length;
        }
        if (untranslated.length > 0) {
            console.log(`  Untranslated (same as English) (${untranslated.length}):`);
            untranslated.slice(0, 5).forEach(k => console.log(`    - ${k}`));
            if (untranslated.length > 5) console.log(`    ... and ${untranslated.length - 5} more`);
            totalUntranslated += untranslated.length;
        }
        console.log('');
    } else {
        console.log(`[${lang}] OK!`);
    }
});

console.log('Summary:');
console.log(`Total missing keys: ${totalMissing}`);
console.log(`Total untranslated keys: ${totalUntranslated}`);

if (totalMissing > 0) {
    console.log('\nRun "npm run i18n:sync" to backfill missing keys with English values.');
}
