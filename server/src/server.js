require("dotenv").config({ override: true });

const { default: dateFormat } = require("dateformat");
const { loadPlanetsData } = require("./models/planets.model");
const { loadSpaceXLaunchesData } = require("./models/launches.model");
const { mongoConnect } = require("./services/mongo");
const app = require("./app");

const http = require("http");
const server = http.createServer(app);
// const fs = require("fs");
// const https = require("https");
// const server = https.createServer(
//   {
//     key: fs.readFileSync("key.pem"),
//     cert: fs.readFileSync("cert.pem"),
//   },
//   app
// );

const PORT = process.env.PORT; // const PORT = process.env.PORT || 8000; For bash shell: npm config set script-shell bash

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadSpaceXLaunchesData();

  // app.listen(PORT, () => {
  server.listen(PORT, () => {
    const now = dateFormat(Date(), "yyyy-mmmm-dd");
    console.log(
      `SERVER: Listening on port ${PORT}! ${now} ... -> http://localhost:${PORT}/`
    );
  });
}

startServer();

// Documentation:
// https://mongoosejs.com/docs/index.html
