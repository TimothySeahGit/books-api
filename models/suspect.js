const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suspectSchema = new mongoose.Schema({
  gang: { type: Schema.Types.ObjectId, ref: "Gang" },
  //convert this to string: so that when someone adds a suspect to database, he just needs to type in Gang.
  // It should suggest a preexisting gang to add him to.
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  mugshot: {
    data: Buffer,
    contentType: String
  },
  attachment: { type: Schema.Types.ObjectId, ref: "Attachment" }
});

const Suspect = mongoose.model("Suspect", suspectSchema);

module.exports = Suspect;
