const axios = require("axios");
const planetsDB = require("./planets.mongo");
const {
  launches: launchesDB,
  launchesTest: launchesTestDB,
} = require("./launches.mongo");

const SPACE_X_API_LAUNCHES_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateSpaceXLaunchesData() {
  console.log("Loading SpaceX Launches data...");
  const {
    data: { docs: launchesData },
  } = await axios.post(SPACE_X_API_LAUNCHES_URL, {
    query: {},
    options: {
      pagination: false,
      // page: 2,
      // limit: 20,
      select: {
        rocket: 1, //rocket.name
        flight_number: 1, //flightNumber
        name: 1, //mission
        date_local: 1, //launchDate
        payloads: 1, //customers
        upcoming: 1,
        success: 1,
      },
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  launchesData.forEach((l) => {
    const launch = {
      rocket: l.rocket.name,
      flightNumber: l.flight_number,
      mission: l.name,
      launchDate: l.date_local,
      upcoming: l.upcoming,
      success: l.success,
      customers: l.payloads.map((e) => e.customers).flat(),
    };
    saveLaunch(launch);
  });
}

async function loadSpaceXLaunchesData() {
  const alreadyLoaded = await findLaunch({
    mission: "FalconSat",
    // flightNumber: 50,
  });

  if (alreadyLoaded) {
    console.log("SpaceX Launches: Data was Already loaded!");
  } else {
    await populateSpaceXLaunchesData();
  }
}

async function findLaunch(query) {
  return await launchesDB.findOne(query);
}

async function countLaunches(query) {
  return await launchesDB.find(query).countDocuments();
  // .select({ flightNumber: 1, _id: 0 })
  // .sort({ flightNumber: 1 });
}

async function addNewLaunch(launch) {
  // Validation: Planet
  const planet = await planetsDB.findOne({ keplerName: launch.target });
  if (!planet) {
    throw new Error("NO MATCHING Planet found!");
  }

  // Validation: FlightNumber
  const lastFlightNumber = await getLastLaunchNumber();
  const flightNumber = lastFlightNumber + 1;
  console.log(flightNumber);
  if (!flightNumber) {
    throw new Error("Error on flightNumber generation!");
  }

  const newLaunch = {
    ...launch,
    success: true,
    upcoming: true,
    customers: ["A", "B"],
    flightNumber,
  };

  await saveLaunch(newLaunch);
}

async function saveLaunch(launch) {
  const launchesDataBase = launch.mission.startsWith("TEST MISSION")
    ? launchesTestDB
    : launchesDB;

  await launchesDataBase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );

  console.log(`Launch SAVED: "${launch.mission} - ${launch.flightNumber}"`);
}

async function getAllLaunches(skip, limit) {
  console.log(countLaunches({}));
  return await launchesDB
    .find({}, { __v: 0, _id: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function getLastLaunchNumber() {
  const lastLaunch = await launchesDB.findOne().sort("-flightNumber");
  return lastLaunch.flightNumber;
}

async function abortLaunch(id) {
  const launch = await getLaunchById(id);

  if (!launch) {
    throw new Error(`NO FOUND launch with id ${id}!`);
  }

  const result = await launchesDB.updateOne(
    { flightNumber: id },
    { success: false, upcoming: false }
  );

  console.log("RESULT:", result);

  return result.modifiedCount === 1;
}

async function getLaunchById(id) {
  return await launchesDB.findOne({ flightNumber: id });
}

module.exports = {
  loadSpaceXLaunchesData,
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
  getLaunchById,
};
