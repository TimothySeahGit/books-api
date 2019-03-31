const mongoose = require("mongoose");
const Suspect = require("./models/suspect");
const Gang = require("./models/gang");
const fs = require("fs");
const gridfs = require("mongoose-gridfs");

const createSuspects = async () => {
  try {
    // // instantiate mongoose-gridfs
    // const { model: Attachment } = gridfs({
    //   collection: "attachments",
    //   model: "Attachment",
    //   mongooseConnection: mongoose.connection
    // });

    // // create or save a file to gridfs
    // const readStream = await fs.createReadStream("./Sedgewick.mp4");
    // const options = { filename: "sample.txt", contentType: "text/plain" };
    // const fileId = await Attachment.write(
    //   options,
    //   readStream,
    //   (error, file) => {
    //     console.log(file);
    //     return file._id;
    //   }
    // );

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
        description: "Scruffy. Hasn't bathed in years",
        mugshot: {
          data: Buffer(fs.readFileSync("./madcat.jpg", "base64"), "base64"),
          contentType: "image/jpg"
        }
      },
      {
        _id: new mongoose.Types.ObjectId(),
        gang: newGang._id,
        name: "Mad Cat",
        description: "Where did he get that Mech?",
        mugshot: {
          data: Buffer(fs.readFileSync("./Scruffles.png", "base64"), "base64"),
          contentType: "image/png"
        }
      }
    );

    await Gang.findOneAndUpdate(
      { name: "Ku Klutz Katz" },
      {
        members: [newGangSuspects[0]._id, newGangSuspects[1]._id],
        logo: {
          data: Buffer(
            fs.readFileSync("./kuklutzkatz.jpg", "base64"),
            "base64"
          ),
          contentType: "image/jpg"
        }

        // logo: mongoose.Types.ObjectId(fileId)
      }
    );

    // await Suspect.findOneAndUpdate(
    //   { name: "Scruffles" },
    //   { attachment: attache._id }
    // );

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
