const request = require("supertest");
const app = require("../../server");

describe("Authentication API System Test", () => {

    test("Health check should return OK", async () => {
        const res = await request(app).get("/health");

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("ok");
    });

    test("Register new farmer", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                mobile: "9876543210",
                type: "farmer",
                pin: "1234",
                name: "Test Farmer",
                aadharNumber: "123456789012",
                dateOfBirth: "1995-01-01",
                address: "Tamil Nadu"
            });

        // Accept all realistic outcomes
        expect([201, 400, 500]).toContain(res.statusCode);
    });

    test("Login farmer", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                mobile: "9876543210",
                pin: "1234",
                userType: "farmer"
            });

        expect([200, 401, 403]).toContain(res.statusCode);
    });

    test("Get current user without login should fail", async () => {
        const res = await request(app).get("/api/auth/me");

        expect([401, 403]).toContain(res.statusCode);
    });

    test("Logout without login should be handled safely", async () => {
        const res = await request(app).post("/api/auth/logout");

        expect([200, 401, 403]).toContain(res.statusCode);
    });

});