const mongoose = require("mongoose");
const Suspect = require("./models/suspect");
const Gang = require("./models/gang");

const createSuspects = async () => {
  try {
    const newGang = await Gang.create({
      _id: new mongoose.Types.ObjectId(),
      name: "Ku Klutz Katz",
      description: "Cats in White"
    });

    const newGangSuspects = await Suspect.create(
      {
        _id: new mongoose.Types.ObjectId(),
        gang: newGang._id,
        name: "Scruffles",
        description: "Scruffy. Hasn't bathed in years"
      },
      {
        _id: new mongoose.Types.ObjectId(),
        gang: newGang._id,
        name: "Mad Cat",
        description: "Where did he get that Mech?"
      }
    );

    await Gang.findOneAndUpdate(
      { name: "Ku Klutz Katz" },
      {
        members: [newGangSuspects[0]._id, newGangSuspects[1]._id]
      }
    );

    // newGang.members.push(newGangSuspects[0].name);
    // newGang.members.push(newGangSuspects[1].name);
    // await newGang.save();

    // newGang.set(members, [newGangSuspects[0]._id, newGangSuspects[1]._id]);
    // await newGang.save();

    const rivalGang = await Gang.create({
      _id: new mongoose.Types.ObjectId(),
      name: "The Lyin' Kings",
      description: "Just lying around"
    });

    const rivalGangSuspects = await Suspect.create([
      {
        _id: new mongoose.Types.ObjectId(),
        gang: rivalGang._id,
        name: "Robert",
        description: "Ordinary cat"
      }
    ]);

    await Gang.findOneAndUpdate(
      { name: "The Lyin' Kings" },
      {
        members: [rivalGangSuspects[0]._id]
      }
    );
  } catch (err) {
    console.error(err);
  }
};

//somehow create books and authors here

module.exports = createSuspects;
