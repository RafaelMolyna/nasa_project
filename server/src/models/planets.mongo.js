const { Schema, model } = require("mongoose");

const planetsSchema = new Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

// will connect to planets collection
const planets = model("Planet", planetsSchema);

module.exports = planets;
