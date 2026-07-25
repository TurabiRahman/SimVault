const express = require("express");

const router = express.Router();

const uploadController = require("../controllers/upload.controller");
const upload = require("../middlewares/upload.middleware");

router.post(
    "/upload", 
    upload.single("csvfile"), 
    uploadController.uploadCSV
);

module.exports = router;