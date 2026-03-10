const request = require("supertest");
const app = require("../../server");

describe("Listing API System Test", () => {

    test("GET /api/listings should require authentication", async () => {
        const res = await request(app).get("/api/listings");

        expect(res.statusCode).toBe(401);
    });

    test("POST /api/listings should require authentication", async () => {
        const res = await request(app)
            .post("/api/listings")
            .send({
                cropName: "Tomato",
                quantity: 100,
                unit: "kg",
                expectedPrice: 20
            });

        expect(res.statusCode).toBe(401);
    });

});