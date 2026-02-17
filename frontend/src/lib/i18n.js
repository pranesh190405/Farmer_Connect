import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enCommon from '../../public/locales/en/common.json';
import hiCommon from '../../public/locales/hi/common.json';
import taCommon from '../../public/locales/ta/common.json';
import teCommon from '../../public/locales/te/common.json';
import knCommon from '../../public/locales/kn/common.json';
import bnCommon from '../../public/locales/bn/common.json';
import mrCommon from '../../public/locales/mr/common.json';
import guCommon from '../../public/locales/gu/common.json';
import paCommon from '../../public/locales/pa/common.json';
import hrCommon from '../../public/locales/hr/common.json';

const resources = {
    en: { common: enCommon },
    hi: { common: hiCommon },
    ta: { common: taCommon },
    te: { common: teCommon },
    kn: { common: knCommon },
    bn: { common: bnCommon },
    mr: { common: mrCommon },
    gu: { common: guCommon },
    pa: { common: paCommon },
    hr: { common: hrCommon },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        defaultNS: 'common',
        ns: ['common'],

        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },

        interpolation: {
            escapeValue: false, // React already escapes
        },
    });

export default i18n;
