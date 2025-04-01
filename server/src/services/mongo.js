const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log(`======\nSUCCESSFULLY Connected to MongoDB!!!\n======`);
});

mongoose.connection.on("error", (err) => {
  console.log(`========\nFAILED to Connected to MongoDB!!!\n========`);
});

async function mongoConnect() {
  // await mongoose.connect(MONGO_URL);

  if (mongoose.connection.readyState === 1) {
    console.log("No need to connect to MongoDB. Already connected.");
  } else {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URL);
  }
}

async function mongoDisconnect() {
  // await mongoose.connect(MONGO_URL);

  if (mongoose.connection.readyState === 1) {
    console.log("Disconnecting from MongoDB...");
    await mongoose.disconnect();
  } else {
    console.log("Mongo was already disconnected.");
  }
}

module.exports = { mongoConnect, mongoDisconnect };
