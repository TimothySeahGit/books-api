const uuid = require("uuid/v4");
const express = require("express");
const router = express.Router();
// const { suspects } = require("../data/db.json");

const Suspect = require("../models/suspect");
const Gang = require("../models/gang");

router.route("/");

module.exports = router;
