const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, 'public', 'locales');

const translations = {
    hi: {
        browseMarket: "बाज़ार ब्राउज़ करें",
        empty: { desc: "इस समय आपके पास कोई {{status}} ऑर्डर नहीं है।", startShopping: "खरीदारी शुरू करें", title: "कोई {{status}} ऑर्डर नहीं" },
        inProgress: "प्रगति पर है", orderId: "ऑर्डर #",
        stats: { activeOrders: "सक्रिय ऑर्डर", completed: "पूरी हो चुकी", totalOrders: "कुल ऑर्डर" },
        tabs: { active: "सक्रिय ऑर्डर", cancelled: "रद्द किए गए ऑर्डर", completed: "पूरे किए गए ऑर्डर" },
        trackOrder: "ऑर्डर ट्रैक करें", welcome: "स्वागत है, खरीदार", welcomeDesc: "अपने ऑर्डर प्रबंधित करें और डिलीवरी ट्रैक करें",
        raiseIssue: "समस्या दर्ज करें", issueType: "समस्या का प्रकार", issueDescription: "विवरण", issueDescPlaceholder: "कृपया ऑर्डर के साथ समस्या का वर्णन करें",
        issueSubmit: "समस्या सबमिट करें", issueSuccess: "समस्या सफलतापूर्वक दर्ज की गई। व्यवस्थापक जल्द ही इसकी समीक्षा करेंगे।", issueFailed: "समस्या दर्ज करने में विफल। कृपया बाद में पुनः प्रयास करें।",
        issueTypes: { quality: "गुणवत्ता की समस्या", delivery: "वितरण समस्या", quantity: "मात्रा बेमेल", other: "अन्य" }
    },
    ta: {
        browseMarket: "சந்தையை உலாவுக",
        empty: { desc: "தற்போது உங்களிடம் {{status}} ஆர்டர்கள் எதுவும் இல்லை.", startShopping: "ஷாப்பிங் தொடங்கவும்", title: "{{status}} ஆர்டர்கள் இல்லை" },
        inProgress: "செயலில் உள்ளது", orderId: "ஆர்டர் #",
        stats: { activeOrders: "செயலில் உள்ள ஆர்டர்கள்", completed: "முடிந்தவை", totalOrders: "மொத்த ஆர்டர்கள்" },
        tabs: { active: "செயலில் உள்ள ஆர்டர்கள்", cancelled: "ரத்து செய்யப்பட்ட ஆர்டர்கள்", completed: "முடிந்த ஆர்டர்கள்" },
        trackOrder: "ஆர்டரைக் கண்காணிக்கவும்", welcome: "வரவேற்கிறோம், வாங்குபவர்", welcomeDesc: "உங்கள் ஆர்டர்களை நிர்வகிக்கவும் மற்றும் விநியோகங்களை கண்காணிக்கவும்",
        raiseIssue: "சிக்கலை எழுப்பு", issueType: "சிக்கல் வகை", issueDescription: "விளக்கம்", issueDescPlaceholder: "ஆர்டரில் உள்ள சிக்கலை விவரிக்கவும்",
        issueSubmit: "சிக்கலை சமர்ப்பி", issueSuccess: "சிக்கல் வெற்றிகரமாக எழுப்பப்பட்டது. நிர்வாகி விரைவில் மதிப்பாய்வு செய்வார்.", issueFailed: "சிக்கலை எழுப்ப முடியவில்லை. பின்னர் மீண்டும் முயற்சிக்கவும்.",
        issueTypes: { quality: "தர சிக்கல்", delivery: "விநியோக சிக்கல்", quantity: "அளவு பொருந்தவில்லை", other: "மற்றவை" }
    },
    te: {
        browseMarket: "మార్కెట్ బ్రౌజ్ చేయండి",
        empty: { desc: "ప్రస్తుతం మీకు ఎలాంటి {{status}} ఆర్డర్‌లు లేవు.", startShopping: "షాపింగ్ ప్రారంభించండి", title: "{{status}} ఆర్డర్‌లు లేవు" },
        inProgress: "పురోగతిలో ఉంది", orderId: "ఆర్డర్ #",
        stats: { activeOrders: "యాక్టివ్ ఆర్డర్‌లు", completed: "పూర్తయినవి", totalOrders: "మొత్తం ఆర్డర్‌లు" },
        tabs: { active: "సక్రియ ఆర్డర్‌లు", cancelled: "రద్దు చేయబడిన ఆర్డర్‌లు", completed: "పూర్తయిన ఆర్డర్‌లు" },
        trackOrder: "ఆర్డర్ ట్రాక్ చేయండి", welcome: "స్వాగతం, కొనుగోలుదారు", welcomeDesc: "మీ ఆర్డర్‌లను నిర్వహించండి మరియు డెలివరీలను ట్రాక్ చేయండి",
        raiseIssue: "సమస్యను నివేదించండి", issueType: "సమస్య రకం", issueDescription: "వివరణ", issueDescPlaceholder: "దయచేసి ఆర్డర్‌తో ఉన్న సమస్యను వివరించండి",
        issueSubmit: "సమస్యను సమర్పించండి", issueSuccess: "సమస్య విజయవంతంగా నివేదించబడింది. అడ్మిన్ త్వరలో దీన్ని సమీక్షిస్తారు.", issueFailed: "సమస్యను నివేదించడంలో విఫలమైంది. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.",
        issueTypes: { quality: "నాణ్యత సమస్య", delivery: "డెలివరీ సమస్య", quantity: "పరిమాణం సరిపోలలేదు", other: "ఇతరం" }
    },
    kn: {
        browseMarket: "ಮಾರುಕಟ್ಟೆ ಬ್ರೌಸ್ ಮಾಡಿ",
        empty: { desc: "ಪ್ರಸ್ತುತ ನಿಮ್ಮಲ್ಲಿ ಯಾವುದೇ {{status}} ಆದೇಶಗಳಿಲ್ಲ.", startShopping: "ಶಾಪಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ", title: "ಯಾವುದೇ {{status}} ಆದೇಶಗಳಿಲ್ಲ" },
        inProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ", orderId: "ಆದೇಶ #",
        stats: { activeOrders: "ಸಕ್ರಿಯ ಆದೇಶಗಳು", completed: "ಪೂರ್ಣಗೊಂಡಿದೆ", totalOrders: "ಒಟ್ಟು ಆದೇಶಗಳು" },
        tabs: { active: "ಸಕ್ರಿಯ ಆದೇಶಗಳು", cancelled: "ರದ್ದುಗೊಳಿಸಿದ ಆದೇಶಗಳು", completed: "ಪೂರ್ಣಗೊಂಡ ಆದೇಶಗಳು" },
        trackOrder: "ಆದೇಶವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ", welcome: "ಸ್ವಾಗತ, ಖರೀದಿದಾರ", welcomeDesc: "ನಿಮ್ಮ ಆದೇಶಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ವಿತರಣೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
        raiseIssue: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿ", issueType: "ಸಮಸ್ಯೆಯ ಪ್ರಕಾರ", issueDescription: "ವಿವರಣೆ", issueDescPlaceholder: "ದಯವಿಟ್ಟು ಆದೇಶದೊಂದಿಗೆ ಇರುವ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ",
        issueSubmit: "ಸಮಸ್ಯೆಯನ್ನು ಸಲ್ಲಿಸಿ", issueSuccess: "ಸಮಸ್ಯೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ವರದಿ ಮಾಡಲಾಗಿದೆ. ನಿರ್ವಾಹಕರು ಶೀಘ್ರದಲ್ಲೇ ಪರಿಶೀಲಿಸುತ್ತಾರೆ.", issueFailed: "ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
        issueTypes: { quality: "ಗುಣಮಟ್ಟದ ಸಮಸ್ಯೆ", delivery: "ವಿತರಣಾ ಸಮಸ್ಯೆ", quantity: "ಪ್ರಮಾಣ ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ", other: "ಇತರೆ" }
    },
    bn: {
        browseMarket: "মার্কেট ব্রাউজ করুন",
        empty: { desc: "এই মুহূর্তে আপনার কোনো {{status}} অর্ডার নেই।", startShopping: "শপিং শুরু করুন", title: "কোনো {{status}} অর্ডার নেই" },
        inProgress: "চলমান", orderId: "অর্ডার #",
        stats: { activeOrders: "সক্রিয় অর্ডার", completed: "সম্পন্ন", totalOrders: "মোট অর্ডার" },
        tabs: { active: "সক্রিয় অর্ডার", cancelled: "বাতিল অর্ডার", completed: "সম্পন্ন অর্ডার" },
        trackOrder: "অর্ডার ট্র্যাক করুন", welcome: "স্বাগতম, ক্রেতা", welcomeDesc: "আপনার অর্ডার পরিচালনা করুন এবং ডেলিভারি ট্র্যাক করুন",
        raiseIssue: "সমস্যা রিপোর্ট করুন", issueType: "সমস্যার ধরন", issueDescription: "বিবরণ", issueDescPlaceholder: "অনুগ্রহ করে অর্ডারের সমস্যাটি বর্ণনা করুন",
        issueSubmit: "সমস্যা জমা দিন", issueSuccess: "সমস্যা সফলভাবে রিপোর্ট করা হয়েছে। অ্যাডমিন শীঘ্রই এটি পর্যালোচনা করবেন।", issueFailed: "সমস্যা রিপোর্ট করতে ব্যর্থ। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
        issueTypes: { quality: "মানের সমস্যা", delivery: "ডেলিভারি সমস্যা", quantity: "পরিমাণ অমিল", other: "অন্যান্য" }
    },
    mr: {
        browseMarket: "बाजार ब्राउझ करा",
        empty: { desc: "तुमच्याकडे सध्या कोणतेही {{status}} ऑर्डर्स नाहीत.", startShopping: "खरेदी सुरू करा", title: "कोणतेही {{status}} ऑर्डर्स नाहीत" },
        inProgress: "प्रगतीपथावर", orderId: "ऑर्डर #",
        stats: { activeOrders: "सक्रिय ऑर्डर्स", completed: "पूर्ण झाले", totalOrders: "एकूण ऑर्डर्स" },
        tabs: { active: "सक्रिय ऑर्डर्स", cancelled: "रद्द केलेले ऑर्डर्स", completed: "पूर्ण ऑर्डर्स" },
        trackOrder: "ऑर्डर ट्रॅक करा", welcome: "स्वागत आहे, खरेदीदार", welcomeDesc: "तुमच्या ऑर्डर्स व्यवस्थापित करा आणि डिलिव्हरी ट्रॅक करा",
        raiseIssue: "समस्या नोंदवा", issueType: "समस्येचा प्रकार", issueDescription: "वर्णन", issueDescPlaceholder: "कृपया ऑर्डरमधील समस्येचे वर्णन करा",
        issueSubmit: "समस्या सबमिट करा", issueSuccess: "समस्या यशस्वीरित्या नोंदवली गेली. प्रशासक लवकरच त्याचे पुनरावलोकन करतील.", issueFailed: "समस्या नोंदवण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.",
        issueTypes: { quality: "गुणवत्तेची समस्या", delivery: "डिलिव्हरीची समस्या", quantity: "प्रमाणातील तफावत", other: "इतर" }
    },
    gu: {
        browseMarket: "બજાર બ્રાઉઝ કરો",
        empty: { desc: "તમારી પાસે અત્યારે કોઈ {{status}} ઓર્ડર નથી.", startShopping: "ખરીદી શરૂ કરો", title: "કોઈ {{status}} ઓર્ડર નથી" },
        inProgress: "પ્રગતિમાં છે", orderId: "ઓર્ડર #",
        stats: { activeOrders: "સક્રિય ઓર્ડર", completed: "પૂર્ણ થયેલ", totalOrders: "કુલ ઓર્ડર" },
        tabs: { active: "સક્રિય ઓર્ડર", cancelled: "રદ કરેલ ઓર્ડર", completed: "પૂર્ણ થયેલ ઓર્ડર" },
        trackOrder: "ઓર્ડર ટ્રેક કરો", welcome: "સ્વાગત છે, ખરીદનાર", welcomeDesc: "તમારા ઓર્ડર્સ મેનેજ કરો અને ડિલિવરી ટ્રેક કરો",
        raiseIssue: "સમસ્યા નોંધાવો", issueType: "સમસ્યાનો પ્રકાર", issueDescription: "વર્ણન", issueDescPlaceholder: "કૃપા કરીને ઓર્ડર સાથેની સમસ્યાનું વર્ણન કરો",
        issueSubmit: "સમસ્યા સબમિટ કરો", issueSuccess: "સમસ્યા સફળતાપૂર્વક નોંધાઈ છે. એડમિન ટૂંક સમયમાં તેની સમીક્ષા કરશે.", issueFailed: "સમસ્યા નોંધાવવામાં નિષ્ફળ. કૃપા કરીને થોડા સમય પછી ફરી પ્રયાસ કરો.",
        issueTypes: { quality: "ગુણવત્તાની સમસ્યા", delivery: "ડિલિવરી સમસ્યા", quantity: "જથ્થામાં વિસંગતતા", other: "અન્ય" }
    },
    pa: {
        browseMarket: "ਬਾਜ਼ਾਰ ਬ੍ਰਾਊਜ਼ ਕਰੋ",
        empty: { desc: "ਇਸ ਸਮੇਂ ਤੁਹਾਡੇ ਕੋਲ ਕੋਈ {{status}} ਆਰਡਰ ਨਹੀਂ ਹੈ।", startShopping: "ਖਰੀਦਦਾਰੀ ਸ਼ੁਰੂ ਕਰੋ", title: "ਕੋਈ {{status}} ਆਰਡਰ ਨਹੀਂ" },
        inProgress: "ਪ੍ਰਗਤੀ ਵਿੱਚ ਹੈ", orderId: "ਆਰਡਰ #",
        stats: { activeOrders: "ਸਰਗਰਮ ਆਰਡਰ", completed: "ਮੁਕੰਮਲ", totalOrders: "ਕੁੱਲ ਆਰਡਰ" },
        tabs: { active: "ਸਰਗਰਮ ਆਰਡਰ", cancelled: "ਰੱਦ ਕੀਤੇ ਆਰਡਰ", completed: "ਮੁਕੰਮਲ ਆਰਡਰ" },
        trackOrder: "ਆਰਡਰ ਟਰੈਕ ਕਰੋ", welcome: "ਜੀ ਆਇਆਂ ਨੂੰ, ਖਰੀਦਦਾਰ", welcomeDesc: "ਆਪਣੇ ਆਰਡਰ ਪ੍ਰਬੰਧਿਤ ਕਰੋ ਅਤੇ ਡਿਲਿਵਰੀ ਟਰੈਕ ਕਰੋ",
        raiseIssue: "ਸਮੱਸਿਆ ਦਰਜ ਕਰੋ", issueType: "ਸਮੱਸਿਆ ਦੀ ਕਿਸਮ", issueDescription: "ਵਰਣਨ", issueDescPlaceholder: "ਕਿਰਪਾ ਕਰਕੇ ਆਰਡਰ ਨਾਲ ਸਮੱਸਿਆ ਦਾ ਵਰਣਨ ਕਰੋ",
        issueSubmit: "ਸਮੱਸਿਆ ਦਰਜ ਕਰੋ", issueSuccess: "ਸਮੱਸਿਆ ਸਫਲਤਾਪੂਰਵਕ ਦਰਜ ਕੀਤੀ ਗਈ। ਐਡਮਿਨ ਜਲਦੀ ਹੀ ਇਸਦੀ ਸਮੀਖਿਆ ਕਰੇਗਾ।", issueFailed: "ਸਮੱਸਿਆ ਦਰਜ ਕਰਨ ਵਿੱਚ ਅਸਫਲ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
        issueTypes: { quality: "ਗੁਣਵੱਤਾ ਦੀ ਸਮੱਸਿਆ", delivery: "ਡਿਲਿਵਰੀ ਦੀ ਸਮੱਸਿਆ", quantity: "ਮਾਤਰਾ ਬੇਮੇਲ", other: "ਹੋਰ" }
    }
};

// hr maps to hi
translations.hr = translations.hi;

// update each locale file
for (const [lang, data] of Object.entries(translations)) {
    const filePath = path.join(localesPath, lang, 'common.json');
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(fileContent);

        if (!json.dashboard) json.dashboard = {};
        if (!json.dashboard.buyer) {
            // copy from English if it lacks the whole structure first
            const enPath = path.join(localesPath, 'en', 'common.json');
            const enJson = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
            json.dashboard.buyer = JSON.parse(JSON.stringify(enJson.dashboard.buyer));
        }

        // Deep merge data into json.dashboard.buyer
        for (const [k, v] of Object.entries(data)) {
            if (typeof v === 'object') {
                json.dashboard.buyer[k] = { ...json.dashboard.buyer[k], ...v };
            } else {
                json.dashboard.buyer[k] = v;
            }
        }

        fs.writeFileSync(filePath, JSON.stringify(json, null, 4));
        console.log(`Updated ${lang}/common.json`);
    }
}
