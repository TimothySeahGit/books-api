const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/", require("./routes/index"));
app.use("/api/v1/suspects", require("./routes/suspects"));
app.use("/api/v1/gangs", require("./routes/gangs"));

module.exports = app;
