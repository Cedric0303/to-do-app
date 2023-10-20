const express = require("express");

const activityController = require("../controllers/activityController");

const activityRouter = express.Router();

// long path = {url}/api/activities/

activityRouter.get("/", activityController.getActivities);

activityRouter.post("/create", activityController.createActivity);

activityRouter.post("/update/:id", activityController.updateActivity);

activityRouter.get("/delete/:id", activityController.deleteOneActivity);

activityRouter.get("/deleteAll", activityController.deleteAllActivities);

module.exports = activityRouter;
