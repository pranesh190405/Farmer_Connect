jest.mock('../../../modules/orderModule', () => ({
    createOrder: jest.fn(),
    getMyOrders: jest.fn(),
    getOrderById: jest.fn(),
    updateOrderStatus: jest.fn(),
    createComplaint: jest.fn()
}));

const orderController = require('../../../controllers/orderController');
const orderModule = require('../../../modules/orderModule');

describe('Order Controller Unit Tests', () => {

    let req;
    let res;

    beforeEach(() => {

        req = {
            params: {},
            body: {},
            user: { id: 1, type: "buyer" }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    test('createOrder → success', async () => {

        req.body = {
            items: [{ id: 1, quantity: 2 }],
            deliveryAddress: "Test address"
        };

        orderModule.createOrder.mockResolvedValue({ id: 1 });

        await orderController.createOrder(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();

    });


    test('createOrder → missing items', async () => {

        req.body = { items: [] };

        await orderController.createOrder(req, res);

        expect(res.status).toHaveBeenCalledWith(400);

    });


    test('getMyOrders → success', async () => {

        orderModule.getMyOrders.mockResolvedValue([]);

        await orderController.getMyOrders(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('getOrderById → found', async () => {

        req.params.id = 1;

        orderModule.getOrderById.mockResolvedValue({ id: 1 });

        await orderController.getOrderById(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('getOrderById → not found', async () => {

        req.params.id = 2;

        orderModule.getOrderById.mockResolvedValue(null);

        await orderController.getOrderById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);

    });


    test('updateOrderStatus → missing status', async () => {

        req.params.id = 1;
        req.body = {};

        await orderController.updateOrderStatus(req, res);

        expect(res.status).toHaveBeenCalledWith(400);

    });


    test('updateOrderStatus → success', async () => {

        req.params.id = 1;
        req.body = { status: "shipped" };

        orderModule.updateOrderStatus.mockResolvedValue({ id: 1 });

        await orderController.updateOrderStatus(req, res);

        expect(res.json).toHaveBeenCalled();

    });


    test('createComplaint → success', async () => {

        req.params.id = 1;
        req.body = {
            issueType: "DAMAGED",
            description: "Product damaged"
        };

        orderModule.createComplaint.mockResolvedValue({ id: 1 });

        await orderController.createComplaint(req, res);

        expect(res.status).toHaveBeenCalledWith(201);

    });

});