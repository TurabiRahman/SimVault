const express = require("express");
const router = express.Router();

const citizenController = require("../controllers/citizen.controller");

router.get(
        "/citizens/:voterId", 
        citizenController.getCitizenByVoterId
);

module.exports = router;