const express = require('express');
const router = express.Router();
const { getSupportedLanguages, processCommand } = require('../controllers/voiceController');

/**
 * @swagger
 * /api/voice/languages:
 *   get:
 *     summary: Get supported voice recognition languages
 *     tags: [Voice]
 *     description: Returns all languages supported for voice navigation (English, Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati, Punjabi, Haryanvi).
 *     responses:
 *       200:
 *         description: Supported languages list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 languages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: "hi"
 *                       name:
 *                         type: string
 *                         example: "Hindi"
 *                       speechLocale:
 *                         type: string
 *                         example: "hi-IN"
 *                 defaultLanguage:
 *                   type: string
 *                   example: "en"
 */
router.get('/languages', getSupportedLanguages);

/**
 * @swagger
 * /api/voice/command:
 *   post:
 *     summary: Process a voice command and return navigation intent
 *     tags: [Voice]
 *     description: |
 *       Parses voice command text and matches it to navigation intents.
 *       Supported intents: `market`, `dashboard`, `cart`, `profile`, `search`.
 *       Works in all 10 supported Indian languages.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [text]
 *             properties:
 *               text:
 *                 type: string
 *                 example: "take me to the market"
 *                 description: Voice command text
 *               language:
 *                 type: string
 *                 example: "en"
 *                 default: "en"
 *                 description: Language code of the voice input
 *     responses:
 *       200:
 *         description: Parsed command result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recognized:
 *                   type: boolean
 *                 intent:
 *                   type: string
 *                   nullable: true
 *                   enum: [market, dashboard, cart, profile, search, null]
 *                 route:
 *                   type: string
 *                   nullable: true
 *                   example: "/market"
 *                 params:
 *                   type: object
 *                 originalText:
 *                   type: string
 *       400:
 *         description: Text is required
 */
router.post('/command', processCommand);

module.exports = router;
