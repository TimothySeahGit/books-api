const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suspectSchema = new mongoose.Schema({
  gang: { type: Schema.Types.ObjectId, ref: "Gang" },

  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Suspect = mongoose.model("Suspect", suspectSchema);

module.exports = Suspect;
