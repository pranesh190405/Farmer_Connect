const request = require("supertest");
const app = require("../../server");

describe("Farmer Connect E2E Workflow", () => {

    const farmerMobile = "9000000001";
    const buyerMobile = "9000000002";

    let farmerAgent = request.agent(app);
    let buyerAgent = request.agent(app);
    let adminAgent = request.agent(app);

    let listingId;

    test("1. Register Farmer", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                mobile: farmerMobile,
                type: "farmer",
                pin: "1234",
                name: "E2E Farmer",
                aadharNumber: "123456789012",
                dateOfBirth: "1990-01-01",
                address: "Tamil Nadu"
            });

        expect([201,400]).toContain(res.statusCode);
    });

    test("2. Admin Login", async () => {
        const res = await adminAgent
            .post("/api/auth/admin-login")
            .send({
                email: "admin@farmerconnect.com",
                password: "admin123"
            });

        expect(res.statusCode).toBe(200);
    });

    test("3. Admin Approves Farmer", async () => {

        // fetch users
        const usersRes = await adminAgent.get("/api/admin/users");

        expect(usersRes.statusCode).toBe(200);

        const farmer = usersRes.body.users.find(
            u => u.mobile === farmerMobile
        );

        expect(farmer).toBeDefined();

        const approveRes = await adminAgent
            .put(`/api/admin/users/${farmer.id}/approve`)
            .send({ notes: "E2E approval" });

        expect([200,400]).toContain(approveRes.statusCode);
    });

    test("4. Farmer Login", async () => {

        const res = await farmerAgent
            .post("/api/auth/login")
            .send({
                mobile: farmerMobile,
                pin: "1234",
                userType: "farmer"
            });

        expect(res.statusCode).toBe(200);
    });

    test("5. Farmer Creates Listing", async () => {

        const res = await farmerAgent
            .post("/api/listings")
            .send({
                cropName: "Tomato",
                quantity: 100,
                unit: "kg",
                expectedPrice: 25
            });

        expect(res.statusCode).toBe(201);

        listingId = res.body.listing.id;
        expect(listingId).toBeDefined();
    });

    test("6. Register Buyer", async () => {

        const res = await request(app)
            .post("/api/auth/register")
            .send({
                mobile: buyerMobile,
                type: "buyer",
                pin: "1234",
                name: "E2E Buyer",
                address: "Chennai"
            });

        expect([201,400]).toContain(res.statusCode);
    });

    test("7. Buyer Login", async () => {

        const res = await buyerAgent
            .post("/api/auth/login")
            .send({
                mobile: buyerMobile,
                pin: "1234",
                userType: "buyer"
            });

        expect(res.statusCode).toBe(200);
    });

    test("8. Buyer Places Order", async () => {

        const res = await buyerAgent
            .post("/api/orders")
            .send({
                items: [
                    {
                        id: listingId,
                        quantity: 10
                    }
                ],
                deliveryAddress: "Chennai",
                paymentMethod: "cod",
                totalAmount: 250
            });

        expect(res.statusCode).toBe(201);
    });

});