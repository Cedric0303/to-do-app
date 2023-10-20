const db = require("./databaseController.js");

import ActivityModel from "../models/activityModel";

const ActivitiesCollection = db.collection("activities");

const getActivities = async (_, res) => {};

const createActivity = async (req, rew) => {};

const updateActivity = async (req, rew) => {};

const deleteOneActivity = async (req, rew) => {};

const deleteAllActivities = async (req, rew) => {};

module.exports = {
    getActivities,
    createActivity,
    updateActivity,
    deleteOneActivity,
    deleteAllActivities,
};
