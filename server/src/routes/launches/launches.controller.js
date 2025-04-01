const {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
  getLaunchById,
} = require("../../models/launches.model.js");
const { getPagination } = require("../../services/query.js");

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
  let { mission, rocket, target, launchDate } = req.body;

  if (!mission || !rocket || !target || !launchDate) {
    return res.status(400).json({
      error: "Missing required launch property.",
    });
  }

  launchDate = new Date(launchDate);
  if (isNaN(launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date.",
    });
  }

  const launch = {
    mission,
    rocket,
    target,
    launchDate,
  };

  await addNewLaunch(launch);

  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const id = parseInt(req.params.id);
  const launch = await getLaunchById(id);

  if (!launch) {
    console.log("404 abort failed");
    return res.status(404).json({
      error: "Launch NOT FOUND!",
    });
  }

  const succeeded = await abortLaunch(id);

  if (!succeeded) {
    console.log("400 abort failed");
    return res.status(400).json({
      error: "Launch abortion FAILED!",
    });
  }

  console.log("200 abort ok");
  return res.status(200).json({ ok: true });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
