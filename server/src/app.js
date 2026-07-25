const express = require("express");
const cors = require("cors");
require("dotenv").config();

const uploadRoutes = require("./routes/upload.routers");







const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", uploadRoutes);






module.exports = app;