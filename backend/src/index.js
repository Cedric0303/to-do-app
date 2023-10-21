require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const activityRouter = require("./routers/activityRouter");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
    cors({
        credentials: true,
        origin: "*",
    })
);
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());

app.get("/", (_, res) => {
    res.status(200);
    res.json({
        message: "Connection to API server successful",
    });
});

app.use("/api/activities", activityRouter);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports = app;
