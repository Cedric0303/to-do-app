require("dotenv").config();
import mongoose from "mongoose";

const DB_URL = process.env.MONGO_URL;

// Connect to mongoDB database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", function (err) {
    console.log("Failed to connect to database");
    process.exit(err);
});

db.once("open", function () {
    console.log("Connected to database");
});

module.exports = db;
