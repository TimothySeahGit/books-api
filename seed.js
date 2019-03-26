const Suspect = require("./models/suspect");

const createSuspects = async () => {
  try {
    await Suspect.create([
      { name: "Scruffles", description: "Scruffy. Hasn't bathed in years" },
      { name: "Mad Cat", description: "Where did he get that Mech?" },
      { name: "The Lyin' King", description: "There he lies" }
    ]);
  } catch (err) {
    console.error(err);
  }
};

//somehow create books and authors here

module.exports = createSuspects;
