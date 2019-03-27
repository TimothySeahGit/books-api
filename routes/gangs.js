const uuid = require("uuid/v4");
const express = require("express");
const router = express.Router();
// const { suspects } = require("../data/db.json");

const Suspect = require("../models/suspect");
const Gang = require("../models/gang");

router.route("/").get((req, res) => {
  const { name } = req.query;

  if (name) {
    return Gang.find({ name }).then(Gang => res.json(Gang));
  }

  return Gang.find()
    .populate("members")
    .then(Gang => res.json(Gang));
});

module.exports = router;
