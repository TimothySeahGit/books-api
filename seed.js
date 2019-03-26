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

    // var item = new Item({ name: 'Foo' });
    // item.save(function (err) {

    //   store.itemsInStore.push(item);
    //   store.save(function (err) {
    //     // todo
    //   });
    // });

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

    // newGang.members.push(newGangSuspects[0].name);
    // newGang.members.push(newGangSuspects[1].name);
    // await newGang.save();

    const rivalGang = await Gang.create({
      _id: new mongoose.Types.ObjectId(),
      name: "The Lyin' Kings",
      description: "Just lying around"
    });

    const rivalGangSuspects = await Suspect.create([
      { gang: rivalGang._id, name: "Robert", description: "Ordinary cat" }
    ]);

    // rivalGang.members.push(rivalGangSuspects[0].name);
    // await rivalGang.save();
  } catch (err) {
    console.error(err);
  }
};

//somehow create books and authors here

module.exports = createSuspects;
