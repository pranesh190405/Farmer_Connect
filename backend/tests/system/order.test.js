const request = require("supertest");
const app = require("../../server");

describe("Order API System Test", () => {

    test("POST /api/orders should require authentication", async () => {
        const res = await request(app)
            .post("/api/orders")
            .send({
                items: [
                    { id: 1, quantity: 5 }
                ],
                deliveryAddress: "Chennai"
            });

        expect(res.statusCode).toBe(401);
    });

    test("GET /api/orders/my should require authentication", async () => {
        const res = await request(app)
            .get("/api/orders/my");

        expect(res.statusCode).toBe(401);
    });

});