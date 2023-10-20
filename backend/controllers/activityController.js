const db = require("./databaseController.js");

const ActivityModel = require("../models/activityModel");

const ActivitiesCollection = db.collection("activities");

// return all activites from database
const getActivities = async (_, res) => {
    const activities = await ActivitiesCollection.find(
        {},
        {},
        { sort: { timeCreated: 1 } }
    );
    res.status(200);
    res.json({
        activities: activities,
    });
};

const createActivity = async (req, res) => {};

const updateActivity = async (req, res) => {};

const deleteOneActivity = async (req, res) => {};

const deleteAllActivities = async (req, res) => {};

module.exports = {
    getActivities,
    createActivity,
    updateActivity,
    deleteOneActivity,
    deleteAllActivities,
};
