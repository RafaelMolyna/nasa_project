const express = require("express");

const api = express.Router();

// Routes importing:
const planetsRouter = require("./planets/planets.router");
const launchesRouter = require("./launches/launches.router");
const testRouter = require("./test/test.router");

api.use("/planets", planetsRouter);
api.use("/launches", launchesRouter);
api.use("/ghost", testRouter);

module.exports = api;
