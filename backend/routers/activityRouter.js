const express = require("express");

const activityController = require("../controllers/activityController");

const activityRouter = express.Router();

activityRouter.get("/", activityController.getActivities);

// UNUSED
// activityRouter.get("/:id", activityController.getOneActivity);

activityRouter.post("/create", activityController.createActivity);

activityRouter.post("/:id/update", activityController.updateActivity);

activityRouter.get("/:id/delete", activityController.deleteOneActivity);

activityRouter.get("/deleteAll", activityController.deleteAllActivities);

module.exports = activityRouter;
