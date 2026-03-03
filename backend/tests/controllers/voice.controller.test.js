const { getSupportedLanguages, processCommand } = require('../../controllers/voiceController');

describe('Voice Controller Tests', () => {

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    test('getSupportedLanguages → returns language list', () => {
        const req = {};
        const res = mockResponse();

        getSupportedLanguages(req, res);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                languages: expect.any(Array),
                defaultLanguage: 'en'
            })
        );
    });

    test('processCommand → 400 if no text', () => {
        const req = { body: {} };
        const res = mockResponse();

        processCommand(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: 'text is required'
        });
    });

    test('processCommand → recognizes market intent (English)', () => {
        const req = { body: { text: 'Go to market', language: 'en' } };
        const res = mockResponse();

        processCommand(req, res);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                recognized: true,
                intent: 'market',
                route: '/market'
            })
        );
    });

    test('processCommand → recognizes dashboard intent (Hindi)', () => {
        const req = { body: { text: 'डैशबोर्ड खोलो', language: 'hi' } };
        const res = mockResponse();

        processCommand(req, res);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                recognized: true,
                intent: 'dashboard'
            })
        );
    });

    test('processCommand → recognizes search intent and extracts query', () => {
        const req = { body: { text: 'search for tomato', language: 'en' } };
        const res = mockResponse();

        processCommand(req, res);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                recognized: true,
                intent: 'search',
                route: '/market',
                params: { query: 'tomato' }
            })
        );
    });

    test('processCommand → returns not recognized for unknown command', () => {
        const req = { body: { text: 'play music', language: 'en' } };
        const res = mockResponse();

        processCommand(req, res);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                recognized: false,
                intent: null,
                message: 'Command not recognized'
            })
        );
    });

});