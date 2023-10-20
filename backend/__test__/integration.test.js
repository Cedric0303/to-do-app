const request = require("supertest");

const app = require("../index");

jest.setTimeout(10000);

describe("Activity API server test", () => {
    let agent = request.agent(app);

    test("Test 1: Get all activities", async () => {
        return agent.get("/api/activities").then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    test("Test 2: Create a new activity", async () => {
        let newActivity = {
            timeCreated: new Date(),
            content: "TODO: test activity",
            done: false,
        };
        return agent
            .post("/api/activities/create")
            .set("Content-Type", "application/json")
            .send(newActivity)
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.type).toBe("application/json");
                expect(res.text).toContain(newActivity.content);
            });
    });

    test("Test 3: Update an existing acticity", async () => {
        //setup existing activity
        let oldActivity = {
            _id: "6532433eupdateda93560909",
            timeCreated: new Date(),
            content: "TODO: update activity (old)",
            done: false,
        };
        await agent
            .post("/api/activities/create")
            .set("Content-Type", "application/json")
            .send(oldActivity)
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.type).toBe("application/json");
                expect(res.text).toContain(oldActivity.content);
            });

        // test update activity
        let newActivity = {
            timeCreated: new Date(),
            content: "TODO: update activity (new)",
            done: true,
        };
        return agent
            .post(`/api/activities/update/${oldActivity._id}`)
            .set("Content-Type", "application/json")
            .send(newActivity)
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.type).toBe("application/json");
                expect(res.text).toContain(oldActivity._id);
                expect(res.text).toContain(newActivity.content);
            });
    });

    test("Test 4: Delete an existing activity", async () => {
        //setup existing activity
        let oldActivity = {
            _id: "6532433edeleteda93560909",
            timeCreated: new Date(),
            content: "TODO: delete activity",
            done: false,
        };
        await agent
            .post("/api/activities/create")
            .set("Content-Type", "application/json")
            .send(oldActivity)
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.type).toBe("application/json");
                expect(res.text).toContain(oldActivity.content);
            });

        // test delete activity
        await agent
            .get(`/api/activities/delete/${oldActivity._id}`)
            .set("Content-Type", "application/json")
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
            });

        return agent.get("/api/activities").then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
            expect(res.text).not.toContain(oldActivity._id);
            expect(res.text).not.toContain(oldActivity.content);
        });
    });

    test("Test 5: Delete all activities", async () => {
        return agent.get("/api/activities/deleteAll").then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });
});
