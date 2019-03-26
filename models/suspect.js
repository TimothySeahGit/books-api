const mongoose = require("mongoose");

const suspectSchema = new mongoose.Schema({
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
