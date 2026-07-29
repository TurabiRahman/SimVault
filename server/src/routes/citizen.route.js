const express = require("express");
const router = express.Router();

const citizenController = require("../controllers/citizen.controller");

router.get(
        "/citizens/:voterId", 
        citizenController.getCitizenByVoterId
);

router.get(
        "/citizens/:voterId/export", 
        citizenController.exportCitizenCSV
);      

module.exports = router;