const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../index");

jest.setTimeout(10000);

describe("Activity API server test", () => {
    let agent = request.agent(app);

    test("Test 0: Ping API server", async () => {
        agent.get("/").then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
            expect(res.text).toContain("Connection to API server successful");
        });
    });

    test("Test 1: Create a new activity", async () => {
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

    test("Test 2: Update an existing activity", async () => {
        // setup existing activity
        let oldActivity = {
            _id: new mongoose.Types.ObjectId("updateupdate"),
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
        await agent
            .post(`/api/activities/${oldActivity._id.toString()}/update`)
            .set("Content-Type", "application/json")
            .send(newActivity)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.text).toContain(newActivity.content);
            });

        return agent.get(
            `/api/activities/${oldActivity._id.toString()}/delete`
        );
    });

    test("Test 3: Get all activities", async () => {
        return agent.get("/api/activities").then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });

    test("Test 4: Delete an existing activity", async () => {
        // setup existing activity
        let oldActivity = {
            _id: new mongoose.Types.ObjectId("deletedelete"),
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
            .get(`/api/activities/${oldActivity._id}/delete`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe("application/json");
                expect(res.text).toContain("Activity removal successful!");
            });
    });

    test("Test 5: Delete all activities", async () => {
        return agent.get("/api/activities/deleteAll").then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe("application/json");
        });
    });
});
