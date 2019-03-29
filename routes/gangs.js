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

router.route("/:id").get((req, res) => {
  const identity = req.params.id;
  return Gang.findOne({ name: identity })
    .populate("members")
    .then(Gang => res.json(Gang));
});

router.route("/:id/members").get((req, res) => {
  const identity = req.params.id;
  return Gang.findOne({ name: identity })
    .populate("members")
    .then(Gang => res.json(Gang.members));
});

router.route("/:id/logo").get((req, res) => {
  const identity = req.params.id;
  return "../madcat.jpg";
  return Gang.findOne({ name: identity }).then(Gang => res.json(Gang.logo));
});

module.exports = router;
