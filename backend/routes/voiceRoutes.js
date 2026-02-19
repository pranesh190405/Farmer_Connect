const express = require('express');
const router = express.Router();
const { getSupportedLanguages, processCommand } = require('../controllers/voiceController');

// GET /api/voice/languages — list supported voice recognition languages
router.get('/languages', getSupportedLanguages);

// POST /api/voice/command — parse voice command text into intent
router.post('/command', processCommand);

module.exports = router;
