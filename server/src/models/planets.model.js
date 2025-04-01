const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "../../data/kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await addPlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject();
      })
      .on("end", async () => {
        const planetsList = await getAllPlanets();
        console.log(`${planetsList.length} habitable planets found!`);
        resolve();
      });
  });
}

async function addPlanet(planetData) {
  await planets.updateOne(
    {
      keplerName: planetData.kepler_name,
    },
    {
      keplerName: planetData.kepler_name,
    },
    {
      upsert: true,
    }
  );
}

async function getAllPlanets() {
  return await planets.find({}, { __v: 0, _id: 0 });
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
