const express = require("express");

const activityController = require("../controllers/activityController");

const activityRouter = express.Router();

activityRouter.get("/", activityController.getActivities);

module.exports = activityRouter;
