const mongoose = require("mongoose");

// Specify format the todo activity stored in database
const activitySchema = new mongoose.Schema({
    timeCreated: { type: Date, required: true },
    content: { type: String, required: true },
    done: { type: Boolean, required: true },
});

const ActivityModel = mongoose.model("activity", activitySchema);

module.exports = ActivityModel;
