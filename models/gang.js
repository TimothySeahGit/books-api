const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gangSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  members: [{ type: Schema.Types.ObjectId, ref: "Suspect" }]
  // members: { type: Schema.Types.Array, ref: "Suspect" }
});

const Gang = mongoose.model("Gang", gangSchema);

module.exports = Gang;
