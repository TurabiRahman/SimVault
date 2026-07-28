const express = require("express");
const cors = require("cors");
require("dotenv").config();

const uploadRoutes = require("./routes/upload.route");
const citizenRoutes = require("./routes/citizen.route");







const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", uploadRoutes);
app.use("/api", citizenRoutes);






module.exports = app;