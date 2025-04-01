const express = require("express");
const { getGhost, getGhostX, myJson } = require("./test.controller");

const testRouter = express.Router();

testRouter.get("/", getGhost);
testRouter.get("/x", getGhostX);
testRouter.get("/my_json", myJson);

module.exports = testRouter;
