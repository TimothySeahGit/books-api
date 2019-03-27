const uuid = require("uuid/v4");
const express = require("express");
const router = express.Router();
// const { suspects } = require("../data/db.json");

const Suspect = require("../models/suspect");
const Gang = require("../models/gang");

const filterSuspectsBy = (property, value) => {
  return suspects.filter(b => b[property] === value);
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.sendStatus(403);
  } else {
    if (authorization === "Bearer my-awesome-token") {
      next();
    } else {
      res.sendStatus(403);
    }
  }
};

router
  .route("/")
  .get((req, res) => {
    const { description, name } = req.query;

    if (name) {
      return Suspect.find({ name }).then(Suspect => res.json(Suspect));
    }

    if (description) {
      return Suspect.find({ description }).then(Suspect => res.json(Suspect));
    }

    // return Suspect.findOne({ name: "Scruffles" })
    //   .populate("gang")
    //   .then(Suspect => res.json(Suspect));

    // return Gang.findOne({ name: "Ku Klutz Katz" }).then(Gang => res.json(Gang));

    return Suspect.find()
      .populate("gang")
      .then(Suspect => res.json(Suspect));
  })
  .post((req, res) => {
    const suspect = new Suspect(req.body);
    suspect.save((err, suspect) => {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }
      return res.status(201).json(suspect);
    });
  });

router
  .route("/:id")
  .get((req, res) => {})
  .patch((req, res) => {
    Suspect.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, Suspect) => {
        return res.status(202).json(Suspect);
      }
    );
  })
  .delete((req, res) => {
    Suspect.findByIdAndDelete(req.params.id, (err, Suspect) => {
      if (err) {
        return res.sendStatus(500);
      }
      if (!Suspect) {
        return res.sendStatus(404);
      }
      return res.sendStatus(202);
    });
  });

module.exports = router;
