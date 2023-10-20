const db = require("./databaseController.js");

const ActivityModel = require("../models/activityModel");

const ActivitiesCollection = db.collection("activities");

const getActivities = async (_, res) => {
    const activities = await ActivitiesCollection.find({})
        .sort({ timeCreated: -1 })
        .toArray();
    res.json({
        message: "Hi",
        activities: activities,
    });
};

const createActivity = async (req, rew) => {};

const updateActivity = async (req, rew) => {};

const deleteOneActivity = async (req, rew) => {};

const deleteAllActivities = async (req, rew) => {};

module.exports = {
    getActivities,
    // createActivity,
    // updateActivity,
    // deleteOneActivity,
    // deleteAllActivities,
};
