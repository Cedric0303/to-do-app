const request = require("supertest");

const app = require("../index");

jest.setTimeout(10000);

describe("Activity API server test", () => {
    let agent = request.agent(app);
    beforeAll(() => {
        agent.get("/");
    });

    test("Test 1: Get all activities", async () => {
        return agent.get("/api/activities").then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
            expect(res.text).toContain('"code":200');
        });
    });
});
