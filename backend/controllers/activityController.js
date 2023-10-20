const mongoose = require("mongoose");

const db = require("./databaseController.js");

const ActivityModel = require("../models/activityModel");

const ActivitiesCollection = db.collection("activities");

// return all activites from database
const getActivities = async (_, res) => {
    const activities = await ActivitiesCollection.find(
        {},
        {},
        { sort: { timeCreated: 1 } }
    ).toArray();
    res.status(200);
    res.json({
        message: "Get all activities successful!",
        activities: activities,
    });
};

// UNUSED
// get a single activity from database
// const getOneActivity = async (req, res) => {
//     const activity = await ActivitiesCollection.findOne({
//         _id: new mongoose.Types.ObjectId(req.params.id),
//     });
//     console.log(activity);
//     res.status(200);
//     res.json({
//         activities: activity,
//     });
// };

// create a single activity in database
const createActivity = async (req, res) => {
    const newActivity = new ActivityModel({
        _id: req.body._id,
        timeCreated: req.body.timeCreated,
        content: req.body.content,
        done: req.body.done,
    });
    await ActivitiesCollection.insertOne(newActivity);
    const activities = await ActivitiesCollection.find(
        {},
        {},
        { sort: { timeCreated: 1 } }
    ).toArray();
    res.status(201);
    res.json({
        message: "Create activity successful!",
        activities: activities,
    });
};

// update a single activity in database
const updateActivity = async (req, res) => {
    await ActivitiesCollection.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(req.params.id) },
        {
            $set: {
                timeCreated: req.body.timeCreated,
                content: req.body.content,
                done: req.body.done,
            },
        },
        {
            returnDocument: "after",
        },
        (err, doc) => {
            if (err) {
                res.json({
                    message: err,
                });
            }
            res.json({
                message: "Update activity successful!",
                activity: doc.value,
            });
        }
    );
};

// delete a single activity from database
const deleteOneActivity = async (req, res) => {
    await ActivitiesCollection.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(req.params.id),
    });
    res.status(200);
    res.json({
        message: "Activity removal successful!",
    });
};

// delete all activitites from database
const deleteAllActivities = async (_, res) => {
    await ActivitiesCollection.deleteMany({});
    const activities = await ActivitiesCollection.find(
        {},
        {},
        { sort: { timeCreated: 1 } }
    ).toArray();
    res.status(200);
    res.json({
        message: "Delete all activities successful!",
        activities: activities,
    });
};

module.exports = {
    getActivities,
    // getOneActivity,
    createActivity,
    updateActivity,
    deleteOneActivity,
    deleteAllActivities,
};
