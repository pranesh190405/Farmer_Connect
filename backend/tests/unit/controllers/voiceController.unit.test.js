const voiceController = require('../../../controllers/voiceController');

describe('Voice Controller Unit Tests', () => {

    let req;
    let res;

    beforeEach(() => {

        req = {
            body: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    test('getSupportedLanguages → success', () => {

        voiceController.getSupportedLanguages(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('processCommand → missing text', () => {

        req.body = {};

        voiceController.processCommand(req, res);

        expect(res.status).toHaveBeenCalledWith(400);

    });


    test('processCommand → market intent', () => {

        req.body = {
            text: "open market",
            language: "en"
        };

        voiceController.processCommand(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('processCommand → search intent', () => {

        req.body = {
            text: "search tomato",
            language: "en"
        };

        voiceController.processCommand(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('processCommand → unknown command', () => {

        req.body = {
            text: "random text",
            language: "en"
        };

        voiceController.processCommand(req, res);

        expect(res.json).toHaveBeenCalled();

    });

});