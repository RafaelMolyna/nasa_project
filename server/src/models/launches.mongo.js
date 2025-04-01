const { Schema, model } = require("mongoose");

const launchesSchema = new Schema({
  flightNumber: { type: Number, required: true },
  launchDate: { type: Date, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  target: { type: String },
  upcoming: { type: Boolean, required: true },
  success: { type: Boolean, required: true, default: true },
  customers: [String],
});

const launches = model("Launch", launchesSchema);
const launchesTest = model("LaunchTest", launchesSchema);

module.exports = { launches, launchesTest };
